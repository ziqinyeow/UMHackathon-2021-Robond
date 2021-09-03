import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  // downloadFilefromAzureContainer,
  getAllAzureBlobFiles,
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

const Admin: NextPage = ({ filesFromAzure }: any) => {
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
        <h4 className="mb-6 font-bold">Model Accuracy</h4>
        <div className="flex flex-col items-center justify-center w-full px-6 pt-5 pb-6 mt-1 mb-10 border-2 border-gray-300 border-dashed rounded-md">
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
          <div className="mt-4">
            {/* Model Updated: {new Date().toLocaleDateString()} */}
          </div>
        </div>
        <h4 className="mb-6 font-bold">Data</h4>
        <div className="w-full mb-10">
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
                setUploading(true);
                await uploadFilesToAzureContainer(uploadedFiles);
                setUploading(false);
                refreshData();
              }}
              className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md"
            >
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
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative font-medium cursor-pointer text-primary-100 dark:text-primary-300"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="application/vnd.ms-excel,.csv"
                      className="sr-only"
                      multiple
                      onChange={async (e) => {
                        const uploadedFiles = await e.target.files;
                        setUploading(true);
                        await uploadFilesToAzureContainer(uploadedFiles);
                        setUploading(false);
                        refreshData();
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">csv or xlsx</p>
              </div>
            </div>
          )}
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2">
          {filesFromAzure?.map((file: any) => (
            <div key={file} className="flex items-center justify-between group">
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
                <h5 className="break-all">{file}</h5>
              </div>
              <div className="opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();

                    // eslint-disable-next-line no-console
                    console.log(file);

                    // const res = await downloadFilefromAzureContainer(file);
                    // eslint-disable-next-line no-console
                    // console.log(res);
                  }}
                  className="p-1 text-gray-400 rounded cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
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
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasicLayout>
  );
};

export default Admin;

export async function getStaticProps() {
  const filesFromAzure = await getAllAzureBlobFiles();
  // const data = await fetch(
  //   "http://20.37.40.201:80/api/v1/service/myservice/score",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer lH5jefeVKSXaA7iTBJ5W2y8w9bzEspP7",
  //     },
  //     body: JSON.stringify([
  //       {
  //         "STOCK CODE": "123",
  //         AINTEREST: 123,
  //         "COUPON FREQUENCY": 2,
  //         "EVAL MID PRICE": 123,
  //         "EVAL MID YIELD": 123,
  //         "MODIFIED DURATION": 123,
  //         "NEXT COUPON RATE": 0,
  //         "DAYS TO MATURITY": 123,
  //         "CREDIT SPREAD": 12,
  //         "OPR MOVEMENT": 3,
  //         RATING: "AAA",
  //       },
  //       {
  //         "STOCK CODE": "1234",
  //         AINTEREST: 123,
  //         "COUPON FREQUENCY": 2,
  //         "EVAL MID PRICE": 123,
  //         "EVAL MID YIELD": 123,
  //         "MODIFIED DURATION": 123,
  //         "NEXT COUPON RATE": 0,
  //         "DAYS TO MATURITY": 123,
  //         "CREDIT SPREAD": 12,
  //         "OPR MOVEMENT": 3,
  //         RATING: "AAA",
  //       },
  //     ]),
  //   }
  // );
  // const res = await data.json();

  return {
    props: { filesFromAzure },
  };
}
