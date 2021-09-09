import { useEffect, useState } from "react";

const Banner: React.FC = () => {
  const [display, setDisplay] = useState("false");
  useEffect(() => {
    if (window.sessionStorage.getItem("robond-banner-display") !== "false") {
      setDisplay("true");
    }
  }, []);

  return (
    <div>
      {display === "true" && (
        <div className="py-6 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-300 dark:to-primary-400">
          <div className="tracking-wide nav">
            <div className="w-full text-center">
              <h4 className="text-gray-50 dark:text-gray-900">
                Malaysia UMHackthon 2021 Finalist
                <strong> TEAM JOM</strong> Presented 🎉🥳🎈
              </h4>
            </div>
            <button
              onClick={() => {
                window.sessionStorage.setItem("robond-banner-display", "false");
                setDisplay("false");
              }}
              type="button"
            >
              <svg
                className="text-gray-50"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M16.192 6.344l-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
