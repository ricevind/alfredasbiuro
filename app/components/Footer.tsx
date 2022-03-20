import React from "react";
import { joinClassNames } from "~/utils";

export const Footer = ({ markRodo = false }: { markRodo: boolean }) => {
  return (
    <footer className="bg-gray-700 py-6 px-4">
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-300 sm:text-center">
          © {new Date().getFullYear()} Alfredasbiuro. All Rights Reserved.{" "}
        </span>
        <div className="flex space-x-6 ">
          <a
            href="https://www.facebook.com/sobierajskapl/?locale=pl_PL"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      <div
        id="policy"
        className={joinClassNames("mt-4", {
          "rounded ring-2 ring-red-300 ring-offset-4 ring-offset-gray-700":
            markRodo,
        })}
      >
        <p className="mt-2 text-sm text-gray-300">
          Administratorem danych osobowych jest{" "}
          <span className="font-semibold">
            Sobierajska Alfreda Doradztwo Podatkowe
          </span>
          , ul. Jana Pawła II 11a, 58-400 Kamienna Góra
        </p>
        <p className="mt-2 text-sm  text-gray-300">
          Podanie danych jest dobrowolne. W dowolnej chwili możesz żądać
          usunięcia lub modyfikacji swoich danych.
          <br /> W tym celu należy przesłać na e-mail:{" "}
          <a
            className="cursor-pointer font-semibold text-blue-300 hover:text-blue-400"
            href="mailto:alfredasbiuro@gmail.com"
          >
            alfredasbiuro@gmail.com
          </a>{" "}
          informacje niezbędne do podjęcia przez nas wymienionych działań.
        </p>
      </div>
    </footer>
  );
};
