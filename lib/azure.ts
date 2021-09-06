const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_CONNECTION_STRING;
const blobSasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL;
const containerNameForRead = process.env.AZURE_CONTAINER_NAME_FOR_READ;
const containerNameForWrite =
  process.env.NEXT_PUBLIC_AZURE_CONTAINER_NAME_FOR_WRITE;

export const getAllAzureBlobFiles = async () => {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  // const blobServiceClient = new BlobServiceClient(blobSasUrl);
  const containerClient =
    blobServiceClient.getContainerClient(containerNameForRead);

  const fileName = [];
  try {
    const iter = containerClient.listBlobsFlat();
    let blobItem = await iter.next();
    while (!blobItem.done) {
      const blobClient = containerClient.getBlobClient(
        `${blobItem.value.name}`
      );
      const blockBlobClient = blobClient.getBlockBlobClient();

      fileName.push({ name: blobItem.value.name, url: blockBlobClient.url });
      // eslint-disable-next-line no-await-in-loop
      blobItem = await iter.next();
    }
    return fileName;
  } catch (error) {
    return error;
  }
};

export const getThreeLatestAzureBlobFileName: any = async () => {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  // const blobServiceClient = new BlobServiceClient(blobSasUrl);
  const containerClient =
    blobServiceClient.getContainerClient(containerNameForRead);

  const fileName = [];
  try {
    const iter = containerClient.listBlobsFlat();
    let blobItem = await iter.next();
    while (!blobItem.done) {
      fileName.push(blobItem.value.name);
      // eslint-disable-next-line no-await-in-loop
      blobItem = await iter.next();
    }
    const filtered = fileName.filter((f) => f.includes("output")).sort();
    return filtered.slice(filtered.length - 3);
  } catch (error) {
    return error;
  }
};

export const uploadFilesToAzureContainer = async (files: any) => {
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  const containerClient = blobServiceClient.getContainerClient(
    containerNameForWrite
  );

  try {
    const promises = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const blockBlobClient = containerClient.getBlockBlobClient(file.name);
      promises.push(blockBlobClient.uploadBrowserData(file));
    }
    await Promise.all(promises);
    return true;
  } catch (error) {
    return error;
  }
};

export const deleteFilefromAzureContainer = async (fileName: string) => {
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  const containerClient = blobServiceClient.getContainerClient(
    containerNameForWrite
  );
  const blobClient = containerClient.getBlobClient(fileName);
  const blockBlobClient = blobClient.getBlockBlobClient();

  try {
    await blockBlobClient.delete();
    return true;
  } catch (error) {
    return error;
  }
};

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

export const downloadFilefromAzureContainer = async (fileName: string) => {
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  const containerClient =
    blobServiceClient.getContainerClient(containerNameForRead);
  const blobClient = containerClient.getBlobClient(fileName);
  const blockBlobClient = blobClient.getBlockBlobClient();

  try {
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    return await streamToString(downloadBlockBlobResponse.readableStreamBody);
  } catch (error) {
    return error;
  }
};
