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
    <nav className="nav sticky_nav border-b dark:border-gray-700">
      <div>
        <h2 className="font-handwriting">Robond</h2>
      </div>
      <div className="flex">
        <NextLink href="/">
          <a className="p-4">
            {router.pathname === "/" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M21.743 12.331l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 00-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 001 1h3a1 1 0 001-1v-4h4v4a1 1 0 001 1h3a1 1 0 001-1v-7h2a.998.998 0 00.743-1.669z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 00.707-1.707l-9-9a.999.999 0 00-1.414 0l-9 9A1 1 0 003 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"
                />
              </svg>
            )}
          </a>
        </NextLink>
        <NextLink href="/analytics">
          <a className="p-4">
            {router.pathname === "/analytics" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M13 6c2.507.423 4.577 2.493 5 5h4c-.471-4.717-4.283-8.529-9-9v4z"
                />
                <path
                  fill="currentColor"
                  d="M18 13c-.478 2.833-2.982 4.949-5.949 4.949-3.309 0-6-2.691-6-6C6.051 8.982 8.167 6.478 11 6V2c-5.046.504-8.949 4.773-8.949 9.949 0 5.514 4.486 10 10 10 5.176 0 9.445-3.903 9.949-8.949h-4z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-3.032A5.013 5.013 0 0013 7.102V4.069A8.008 8.008 0 0119.931 11zM12 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 11c-4.411 0-8-3.589-8-8 0-4.072 3.061-7.436 7-7.931v3.032A5.009 5.009 0 007 12c0 2.757 2.243 5 5 5a5.007 5.007 0 004.898-4h3.032c-.494 3.939-3.858 7-7.93 7z"
                />
              </svg>
            )}
          </a>
        </NextLink>
        <NextLink href="/robot">
          <a className="p-4">
            {router.pathname === "/robot" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M20 3H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14H5v-2h6v2zm8-4H5v-2h14v2zm0-4H5V7h14v2z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"
                />
                <path
                  fill="currentColor"
                  d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"
                />
              </svg>
            )}
          </a>
        </NextLink>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-4"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
            >
              {resolvedTheme === "dark" ? (
                <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759L4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605l-1.414 1.414-2.122-2.122 1.414-1.414z" />
              ) : (
                <path d="M20.742 13.045a8.088 8.088 0 01-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 01-2.064-7.723A1 1 0 009.73 2.034a10.014 10.014 0 00-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 007.072 2.93 9.93 9.93 0 007.07-2.929 10.007 10.007 0 002.583-4.491 1.001 1.001 0 00-1.224-1.224zm-2.772 4.301a7.947 7.947 0 01-5.656 2.343 7.953 7.953 0 01-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 012.06-1.483 10.027 10.027 0 002.89 7.848 9.972 9.972 0 007.848 2.891 8.036 8.036 0 01-1.484 2.059z" />
              )}
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
