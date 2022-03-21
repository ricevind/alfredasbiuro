import React from "react";

import { joinClassNames } from "~/utils";
import { FormatMessage } from "./utils/FormatMessage";

interface ContactInfoProps {
  className?: string;
  contactLabel: string;
  address: { line1: string; line2: string };
  phones: {
    label: string;
    phone: string;
    type: "cell" | "land";
  }[];
}

export const ContactInfo = ({
  className,
  address,
  phones,
  contactLabel,
}: ContactInfoProps) => {
  return (
    <div className={joinClassNames(className)}>
      <div className="mx-auto max-w-max text-xl tracking-wider subpixel-antialiased">
        <FormatMessage>{contactLabel}</FormatMessage>
      </div>
      <div className="mx-auto mt-4 max-w-max">
        <div className="flex flex-row items-center">
          <LocationIcon></LocationIcon>
          <div>
            <span className="block sm:inline">
              <FormatMessage>{address.line1}</FormatMessage>
            </span>
            <span className="block sm:inline">
              <FormatMessage>{address.line2}</FormatMessage>
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
          {phones.map((phone) => (
            <PhoneInfo key={phone.phone} {...phone}></PhoneInfo>
          ))}
        </div>
      </div>
    </div>
  );
};

const PhoneInfo = ({
  label,
  type,
  phone,
}: {
  label: string;
  phone: string;
  type: "cell" | "land";
}) => {
  const iconMap: Record<typeof type, React.JSXElementConstructor<any>> = {
    cell: CellPhoneIcon,
    land: PhoneIcon,
  };

  const Icon = iconMap[type];

  return (
    <div className="flex flex-row items-center">
      <Icon></Icon>
      <a href={`tel:${phone}`} className="block cursor-pointer">
        {label}
      </a>
    </div>
  );
};

const PhoneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={joinClassNames("mr-[1ch] inline-block h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
};

const CellPhoneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={joinClassNames("mr-[1ch] inline-block h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
};

const LocationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={joinClassNames("mr-[1ch] inline-block h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};
