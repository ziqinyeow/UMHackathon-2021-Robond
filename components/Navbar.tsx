import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-white border-b nav sticky_nav dark:border-gray-700 dark:bg-gray-900">
      <div>
        <NextLink href="/">
          <a>
            <h3 className="font-bold font-handwriting">Robond</h3>
          </a>
        </NextLink>
      </div>
      <div className="flex">
        <NextLink href="/">
          <a className="m-3">
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className={
                  router.pathname === "/"
                    ? "text-primary-100 dark:text-primary-300"
                    : "text-gray-300 dark:text-gray-600"
                }
              >
                <path
                  fill="currentColor"
                  d="M21.743 12.331l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 00-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 001 1h3a1 1 0 001-1v-4h4v4a1 1 0 001 1h3a1 1 0 001-1v-7h2a.998.998 0 00.743-1.669z"
                />
              </svg>
            )}
          </a>
        </NextLink>
        <NextLink href="/analytics">
          <a className="m-3">
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className={
                  router.pathname === "/analytics"
                    ? "text-primary-100 dark:text-primary-300"
                    : "text-gray-300 dark:text-gray-600"
                }
              >
                <path
                  fill="currentColor"
                  d="M13 6c2.507.423 4.577 2.493 5 5h4c-.471-4.717-4.283-8.529-9-9v4z"
                />
                <path
                  fill="currentColor"
                  d="M18 13c-.478 2.833-2.982 4.949-5.949 4.949-3.309 0-6-2.691-6-6C6.051 8.982 8.167 6.478 11 6V2c-5.046.504-8.949 4.773-8.949 9.949 0 5.514 4.486 10 10 10 5.176 0 9.445-3.903 9.949-8.949h-4z"
                />
              </svg>
            )}
          </a>
        </NextLink>
        <NextLink href="/robot">
          <a className="m-3">
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className={
                  router.pathname === "/robot"
                    ? "text-primary-100 dark:text-primary-300"
                    : "text-gray-300 dark:text-gray-600"
                }
              >
                <path
                  fill="currentColor"
                  d="M20 3H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14H5v-2h6v2zm8-4H5v-2h14v2zm0-4H5V7h14v2z"
                />
              </svg>
            )}
          </a>
        </NextLink>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="m-3"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="text-gray-500 dark:text-gray-400"
            >
              {resolvedTheme === "dark" ? (
                <path
                  fill="currentColor"
                  d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759L4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605l-1.414 1.414-2.122-2.122 1.414-1.414z"
                />
              ) : (
                <path
                  fill="currentColor"
                  d="M12 11.807A9.002 9.002 0 0110.049 2a9.942 9.942 0 00-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 002.735-5.119A9.003 9.003 0 0112 11.807z"
                />
              )}
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
