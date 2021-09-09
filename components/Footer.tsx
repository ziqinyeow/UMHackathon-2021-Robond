const Footer = () => {
  return (
    <div className="flex items-center justify-between w-full pt-12 pb-8 text-gray-500 border-t dark:border-gray-700 dark:text-gray-300">
      <div>
        <h5>Made with ❤ by TEAM JOM in Malaysia</h5>
      </div>
      <div className="flex">
        <div className="p-1 mx-2 rounded hover:bg-gray-100 dark:hover:bg-transparent">
          <a
            href="https://github.com/ziqinyeow/finance-bond-prediction-app-v2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="font-medium text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <path
                fill="currentColor"
                d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"
              />
              <path
                fill="currentColor"
                d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z"
              />
            </svg>
          </a>
        </div>
        <div className="p-1 mx-2 rounded hover:bg-gray-100 dark:hover:bg-transparent">
          <a
            href="https://github.com/chunfang2001/RobondAzure"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="font-medium text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <path
                fill="currentColor"
                d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
