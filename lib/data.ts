/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { BlobServiceClient } from "@azure/storage-blob";
import { parse } from "papaparse";
import { getThreeLatestAzureBlobFileName } from "./azure";

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

export const getBond = async (number: number) => {
  const blobSasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL;
  const containerName = process.env.AZURE_CONTAINER_NAME_FOR_READ;
  // @ts-ignore
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  // @ts-ignore
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const latestData = await getThreeLatestAzureBlobFileName();

  const blobClient1 = containerClient.getBlobClient(latestData[0]);
  const blockBlobClient1 = blobClient1.getBlockBlobClient();

  const month = latestData[0];

  try {
    const downloadBlockBlobResponse1 = await blockBlobClient1.download(0);
    const text = await streamToString(
      downloadBlockBlobResponse1.readableStreamBody
    );

    // @ts-ignore
    const { data } = parse(text, { header: true });

    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const processedMonth = `${
      monthList[Number(month.slice(11, 13)) - 1]
    }  ${month.slice(7, 11)}`;

    const result = data.slice(0, number);

    return { processedMonth, result };
  } catch (error) {
    return error;
  }
};

export const getBondByStockCode = async (stockCode: string) => {
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

    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const processedMonth = `${
      monthList[Number(month.slice(11, 13)) - 1]
    }  ${month.slice(7, 11)}`;
    // @ts-ignore
    const result = data.find((d) => d?.["STOCK CODE"] === stockCode);

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
      (d) => d?.["STOCK CODE"] === stockCode
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
      (d) => d?.["STOCK CODE"] === stockCode
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

    return { processedMonth, result, bondPriceHistory, bondReturnHistory };
  } catch (error) {
    return error;
  }
};

export const getModelMetrics = async () => {
  const blobSasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL;
  const containerName = process.env.AZURE_CONTAINER_NAME_FOR_READ;
  // @ts-ignore
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  // @ts-ignore
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobClient = containerClient.getBlobClient("metrics/metrics.csv");
  const blockBlobClient = blobClient.getBlockBlobClient();

  try {
    const downloadBlockBlobResponse1 = await blockBlobClient.download(0);
    const text = await streamToString(
      downloadBlockBlobResponse1.readableStreamBody
    );

    // @ts-ignore
    const { data } = parse(text, { header: true });

    const result = data[0];

    // @ts-ignore
    const meanAbs = result?.["Mean Absolute Error"];
    // @ts-ignore
    const meanSqr = result?.["Mean Squared Error"];
    // @ts-ignore
    const rootMeanSqr = result?.["Root Mean Squared Error"];

    return { meanAbs, meanSqr, rootMeanSqr };
  } catch (error) {
    return error;
  }
};
