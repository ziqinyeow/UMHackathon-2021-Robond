/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { BlobServiceClient } from "@azure/storage-blob";
import { getThreeLatestAzureBlobFileName } from "lib/azure";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "papaparse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid" });
  }
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

  // returnType = "5" or "All" or "STOCK CODE"
  const { returnType } = req.body;

  const blobSasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL;
  const containerName = process.env.AZURE_CONTAINER_NAME_FOR_READ;
  // @ts-ignore
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  // @ts-ignore
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const latestData = await getThreeLatestAzureBlobFileName();

  const blobClient1 = containerClient.getBlobClient(latestData[0]);
  const blockBlobClient1 = blobClient1.getBlockBlobClient();
  const blobClient2 = containerClient.getBlobClient(latestData[1]);
  const blockBlobClient2 = blobClient2.getBlockBlobClient();
  const blobClient3 = containerClient.getBlobClient(latestData[2]);
  const blockBlobClient3 = blobClient3.getBlockBlobClient();

  const month = latestData[0];

  try {
    const downloadBlockBlobResponse1 = await blockBlobClient1.download(0);
    const text = await streamToString(
      downloadBlockBlobResponse1.readableStreamBody
    );
    // @ts-ignore
    const { data } = parse(text, { header: true });

    // @ts-ignore
    // data = data.filter((d) => d["STOCK CODE"] !== undefined);

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(returnType)) {
      const result = data.slice(0, Number(returnType));
      return res.json({ month, result });
    }

    if (typeof returnType === "string") {
      if (returnType === "All") {
        // eslint-disable-next-line @typescript-eslint/no-redeclare
        const result = data;
        return res.json({ month, result });
      }

      const downloadBlockBlobResponse2 = await blockBlobClient2.download(0);
      const allBondPriceHistoryText = await streamToString(
        downloadBlockBlobResponse2.readableStreamBody
      );
      // @ts-ignore
      const { data: allBondPriceHistory } = parse(allBondPriceHistoryText, {
        header: true,
      });
      const bondPriceHistoryInJSON: any = allBondPriceHistory.find(
        // @ts-ignore
        (d) => d?.["STOCK CODE"] === returnType
      );

      let bondPriceMonth = [];
      let bondPriceValue = [];
      for (const value in bondPriceHistoryInJSON) {
        bondPriceMonth.push(value);
        bondPriceValue.push(Number(bondPriceHistoryInJSON[value]));
      }
      bondPriceMonth = bondPriceMonth.slice(1);
      bondPriceValue = bondPriceValue.slice(1);
      const bondPriceHistory = { bondPriceMonth, bondPriceValue };

      const downloadBlockBlobResponse3 = await blockBlobClient3.download(0);
      const allBondReturnHistoryText = await streamToString(
        downloadBlockBlobResponse3.readableStreamBody
      );
      // @ts-ignore
      const { data: allBondReturnHistory } = parse(allBondReturnHistoryText, {
        header: true,
      });
      const bondReturnHistoryInJSON: any = allBondReturnHistory.find(
        // @ts-ignore
        (d) => d?.["STOCK CODE"] === returnType
      );

      let bondReturnMonth = [];
      let bondReturnValue = [];
      for (const value in bondReturnHistoryInJSON) {
        bondReturnMonth.push(value);
        bondReturnValue.push(Number(bondReturnHistoryInJSON[value]));
      }
      bondReturnMonth = bondReturnMonth.slice(1);
      bondReturnValue = bondReturnValue.slice(1);
      const bondReturnHistory = { bondReturnMonth, bondReturnValue };

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      const result = data.find((d) => d?.["STOCK CODE"] === returnType);
      return res.json({ month, result, bondPriceHistory, bondReturnHistory });
    }

    return res.status(400).json({ error: "invalid" });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
