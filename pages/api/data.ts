import { BlobServiceClient } from "@azure/storage-blob";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "papaparse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function streamToString(readableStream: any) {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      readableStream.on("data", (data: any) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }
  const Comparator = (prop: string) => {
    return (a: { [x: string]: number }, b: { [x: string]: number }) => {
      if (a[prop] < b[prop]) {
        return 1;
      }
      if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  };
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid" });
  }
  // eg. month = "Nov 2021"
  // number = "5" or "All"
  const { month, returnType } = req.body;

  const blobSasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL;
  const containerName = process.env.NEXT_PUBLIC_AZURE_CONTAINER_NAME;
  // @ts-ignore
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  // @ts-ignore
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(`hello/${month}.csv`);
  const blockBlobClient = blobClient.getBlockBlobClient();
  try {
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const text = await streamToString(
      downloadBlockBlobResponse.readableStreamBody
    );
    // @ts-ignore
    let { data } = parse(text, { header: true });

    // @ts-ignore
    data = data.filter((d) => d["ISIN CODE"] !== undefined);

    if (returnType === "All") {
      // @ts-ignore
      const result = data.sort(Comparator("BOND RETURN"));
      // eslint-disable-next-line no-console
      // console.log(result);
      return res.json({ result });
    }
    if (typeof Number(returnType) === "number") {
      // @ts-ignore
      data.sort(Comparator("BOND RETURN"));
      // eslint-disable-next-line no-case-declarations
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      const result = data.slice(0, Number(returnType));

      return res.json({ result });
    }
    if (typeof returnType === "string") {
      // eslint-disable-next-line no-console
      console.log("hi");

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      const result = data.find((d) => d?.["ISIN CODE"] === returnType);
      return res.json({ result });
    }

    return res.status(400).json({ error: "invalid" });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
