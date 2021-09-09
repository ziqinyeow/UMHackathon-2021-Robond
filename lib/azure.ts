const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_CONNECTION_STRING;
const blobSasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL;
const containerNameForRead = process.env.AZURE_CONTAINER_NAME_FOR_READ;
const containerNameForWrite =
  process.env.NEXT_PUBLIC_AZURE_CONTAINER_NAME_FOR_WRITE;

export const getAllAzureOutputBlobFiles = async () => {
  const blobServiceClient1 =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient1 =
    blobServiceClient1.getContainerClient(containerNameForRead);
  const blobServiceClient2 = new BlobServiceClient(blobSasUrl);
  const containerClient2 =
    blobServiceClient2.getContainerClient(containerNameForRead);

  const fileName = [];
  try {
    const iter = containerClient1.listBlobsFlat();
    let blobItem = await iter.next();
    while (!blobItem.done) {
      const blobClient = containerClient2.getBlobClient(
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

export const getAllAzureInputBlobFiles = async () => {
  const blobServiceClient1 =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient1 = blobServiceClient1.getContainerClient(
    containerNameForWrite
  );
  const blobServiceClient2 = new BlobServiceClient(blobSasUrl);
  const containerClient2 = blobServiceClient2.getContainerClient(
    containerNameForWrite
  );

  const fileName = [];
  try {
    const iter = containerClient1.listBlobsFlat();
    let blobItem = await iter.next();
    while (!blobItem.done) {
      const blobClient = containerClient2.getBlobClient(
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

    const first = filtered.slice(filtered.length - 3)[0];
    const processedFirst = first.slice(7, 13);
    const second = filtered.slice(filtered.length - 3)[1];
    const processedSecond = second.slice(7, 13);

    if (processedFirst === processedSecond) {
      return filtered.slice(filtered.length - 3);
    }

    return filtered.slice(filtered.length - 5, filtered.length - 2);
  } catch (error) {
    return error;
  }
};
