import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getAllAzureInputBlobFiles,
  getAllAzureOutputBlobFiles,
  uploadFilesToAzureContainer,
} from "lib/azure";
import Loader from "react-loader-spinner";
import BasicLayout from "@/layouts/BasicLayout";

const meta = {
  type: "",
  title: "Admin",
  description: "",
  image: "",
};

const Admin: NextPage = ({
  inputFilesFromAzure,
  outputFilesFromAzure,
}: any) => {
  const [fileName, setFileName] = useState<string[]>();
  const [files, setFiles] = useState<FileList | File[] | null>();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    const key = window.localStorage.getItem(
      "3638da96-aea7-4d16-ab8f-0ea9309f78ce"
    );
    if (!key || key !== process.env.NEXT_PUBLIC_VERIFIED_VALUE) {
      router.push("/");
    }
  }, [router]);

  return (
    <BasicLayout meta={meta}>
      <div className="layout">
        <h3 className="mb-6 font-bold">Admin</h3>
        <h4 className="mb-6 font-bold">AI Model Accuracy</h4>
        <div className="flex flex-col items-center justify-center w-full px-6 pt-5 pb-6 mt-1 mb-5 border-2 border-gray-300 border-dashed rounded-md">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              className="text-gray-400"
            >
              <path
                fill="currentColor"
                d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 00-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 001.99 12v2a1 1 0 001 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 001-1v-1.938a1.006 1.006 0 00-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"
              />
              <ellipse fill="currentColor" cx="8.5" cy="12" rx="1.5" ry="2" />
              <ellipse fill="currentColor" cx="15.5" cy="12" rx="1.5" ry="2" />
              <path fill="currentColor" d="M8 16h8v2H8z" />
            </svg>
          </div>
        </div>
        <div className="w-full mb-16">
          <button
            type="button"
            className="w-full px-4 py-3 border-2 rounded-md"
            onClick={async () => {
              await fetch(
                "https://financetrigger.azurewebsites.net:443/api/triggerTrain/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Cc9khRY4TQFQQQamqs2J40g6lK5eoAyGzwQ6ZHUgeak",
                {
                  method: "POST",
                }
              );
            }}
          >
            Retrain the AI Model
          </button>
        </div>
        <h4 className="mb-6 font-bold">AI Model Data</h4>
        <div className="grid w-full grid-cols-1 gap-5 mb-24 md:grid-cols-2">
          <div>
            {uploading ? (
              <div className="flex flex-col items-center justify-center h-90">
                <Loader type="TailSpin" color="black" height={100} width={50} />
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  const uploadedFiles = Array.from(e.dataTransfer.files).filter(
                    (file) =>
                      file.type === "text/csv" ||
                      file.type === "application/vnd.ms-excel"
                  );
                  setFiles(uploadedFiles);
                  setFileName([]);
                  Promise.all(
                    // @ts-ignore
                    [...uploadedFiles].map((file) =>
                      // @ts-ignore
                      setFileName((prev) => [file.name, ...prev])
                    )
                  );
                }}
                className="flex flex-col h-full px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md"
              >
                <h4 className="mb-10 font-bold">Input</h4>
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex justify-center w-full text-sm text-gray-600">
                    <div className="font-medium cursor-pointer text-primary-100 dark:text-primary-300">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="file-upload">Upload files</label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="application/vnd.ms-excel,.csv"
                        className="sr-only"
                        multiple
                        onChange={async (e) => {
                          const uploadedFiles = await e.target.files;
                          setFiles(uploadedFiles);
                          setFileName([]);
                          Promise.all(
                            // @ts-ignore
                            [...uploadedFiles].map((file) =>
                              // @ts-ignore
                              setFileName((prev) => [file.name, ...prev])
                            )
                          );
                        }}
                      />
                    </div>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    BPAMERP & BPAMERS .csv file
                  </p>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setUploading(true);
              await uploadFilesToAzureContainer(files);
              setUploading(false);
              // post request
              refreshData();
            }}
          >
            <div className="px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
              <h4 className="font-bold">File</h4>
              {!files && (
                <div className="flex flex-col items-center justify-center w-full p-4 mt-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="36"
                    height="36"
                    className="mb-2"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M11 15h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355zM15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992z"
                    />
                  </svg>
                  No file Uploaded
                </div>
              )}
              {fileName?.length === 1 && (
                <div className="mt-1 mb-3">
                  Please input 2 .csv files (BPAMERP & BPAMERS) directly
                </div>
              )}
              {files && (
                <div>
                  {fileName?.map((file) => (
                    <div
                      key={file}
                      className="flex items-center justify-between py-2"
                    >
                      <h4>{file}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 mt-7 gap-7">
              <button
                type="submit"
                className="px-3 py-2 border "
                disabled={
                  !files ||
                  files?.length !== 2 ||
                  fileName?.every(
                    (f) => !f.includes("BPAMER") || !f.includes(".csv")
                  )
                }
              >
                Upload to Blob
              </button>
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                type="reset"
                className="px-3 py-2 border"
                onClick={async (e) => {
                  e.preventDefault();
                  setFileName([]);
                  setFiles(null);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="w-full mb-20">
          <h4 className="mb-6 font-bold">Output Data</h4>
          <div className="grid w-full gap-4 md:grid-cols-2">
            {outputFilesFromAzure?.map((file: any) => (
              <div
                key={file.url}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    className="m-2 text-gray-500"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z"
                    />
                  </svg>
                  <h5 className="break-all">{file.name}</h5>
                </div>
                <div className="opacity-0 group-hover:opacity-100">
                  <a
                    href={file?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 rounded cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-10">
          <h4 className="mb-6 font-bold">Input Data</h4>
          <div className="grid w-full gap-4 md:grid-cols-2">
            {inputFilesFromAzure?.map((file: any) => (
              <div
                key={file.url}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    className="m-2 text-gray-500"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z"
                    />
                  </svg>
                  <h5 className="break-all">{file.name}</h5>
                </div>
                <div className="opacity-0 group-hover:opacity-100">
                  <a
                    href={file?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 rounded cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Admin;

export async function getStaticProps() {
  const inputFilesFromAzure = await getAllAzureInputBlobFiles();
  const outputFilesFromAzure = await getAllAzureOutputBlobFiles();

  return {
    props: { inputFilesFromAzure, outputFilesFromAzure },
  };
}
