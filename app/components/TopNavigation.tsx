import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Menuitem } from "~/models";
import { joinClassNames } from "~/utils/join-class-names";

type Props = {
  logo: React.ReactNode;
  links: Menuitem[];
} & React.ComponentPropsWithoutRef<"div">;

export const TopNavigation = ({ logo, className, links, ...props }: Props) => {
  return (
    <div
      className={joinClassNames(
        "relative flex w-full flex-row items-center justify-between bg-white px-4",
        className
      )}
      {...props}
    >
      <div className="h-1/2 md:h-1/2">{logo}</div>

      <Popover className="sm:hidden">
        {({ open }) => (
          <>
            <Popover.Button className="relative z-50 block cursor-pointer items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 hover:outline-none hover:ring-2 hover:ring-inset hover:ring-amber-500">
              {open ? <MenuCloseIcon></MenuCloseIcon> : <MenuIcon></MenuIcon>}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-y-0 -inset-x-2 flex items-center bg-white p-10"
              >
                <div className="relative h-full w-full">
                  <MenuList
                    links={links}
                    className="absolute w-full space-y-2 overflow-hidden rounded-lg bg-white p-10 shadow-md ring-1 ring-black ring-opacity-5"
                  ></MenuList>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <MenuList
        links={links}
        className="ml-10 hidden space-x-8 pr-4 sm:flex"
      ></MenuList>
    </div>
  );
};

const MenuList = ({
  className,
  links,
}: React.ComponentPropsWithoutRef<"ul"> & {
  links: Menuitem[];
}) => {
  return (
    <ul className={className}>
      {links.map((link) => (
        <a key={link.slug} href={`#${link.slug}`}>
          <li
            className={joinClassNames(
              "cursor-pointer rounded-md p-4 font-medium text-gray-500 hover:bg-amber-400  hover:text-gray-900",
              { "bg-amber-300": link.isActive }
            )}
            tabIndex={1}
          >
            {link.label}
          </li>
        </a>
      ))}
    </ul>
  );
};

const MenuIcon = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={joinClassNames("h-10 w-10", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

const MenuCloseIcon = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={joinClassNames("h-10 w-10", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
