import React from "react";
import { OffersList } from "~/models";
import { joinClassNames } from "~/utils";
import { Reveal } from "./Reveal";

type Props = OffersList & React.ComponentPropsWithoutRef<"div">;

export const OfferList = ({
  className,
  description,
  offers,
  ...props
}: Props) => {
  return (
    <div className={joinClassNames(className)} {...props}>
      <p className="text-2xl">{description}</p>

      <ul className="mt-2 space-y-2 sm:grid sm:grid-cols-2 sm:gap-x-6">
        {offers.map((offer) => (
          <Reveal from="right" key={offer.description}>
            <li>
              <CheckMark className="inline text-green-800"></CheckMark>{" "}
              {offer.description}
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
};

const CheckMark = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={joinClassNames("h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};
