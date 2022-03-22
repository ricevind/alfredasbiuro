import React, { useEffect, useRef, useState } from "react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import { AnimateNumber } from "~/components/AnimateNumber";
import { ContactForm } from "~/components/ContactForm";
import { ContactInfo } from "~/components/ContactInfo";
import { Footer } from "~/components/Footer";
import { OfferList } from "~/components/OfferList";
import { Reveal } from "~/components/Reveal";
import { TopNavigation } from "~/components/TopNavigation";
import { FormatMessage } from "~/components/utils/FormatMessage";
import { LandingPage, Menuitem, OffersList, OfficeInNumbers } from "~/models";
import { joinClassNames, readPage } from "~/utils";

type LoaderData = {
  landingPage: LandingPage;
  offers: OffersList;
  officeInNumbers: OfficeInNumbers;
};

export const loader: LoaderFunction = async () => {
  const landingPageFile = await readPage("landing_page.md");
  const offersFile = await readPage("offers.md");
  const officeInNumbers = await readPage("office-in-numbers.md");

  return {
    landingPage: landingPageFile.data,
    offers: offersFile.data,
    officeInNumbers: officeInNumbers.data,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  await fetch(`${process.env.URL!}/form`, {
    method: "post",
    body: formData,
  });

  return redirect("/");
};

function Block({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={joinClassNames(
        "mx-auto max-w-7xl scroll-mt-24 px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function useMenu(
  menu: LandingPage["menu"],
  menuOrder: LandingPage["menuOrder"]
): Menuitem[] {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = document.location.hash;
      if (hash) {
        setHash(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return menuOrder.map(({ value: key }) => {
    const menuItem = menu[key];
    const isActive = hash.includes(menuItem.slug);
    return { ...menuItem, isActive };
  });
}

export default function Index() {
  const { landingPage, offers, officeInNumbers } = useLoaderData<LoaderData>();

  const {
    mainWelcome,
    description,
    logoImage,
    menu,
    menuOrder,
    address,
    phones,
    contactLabel,
  } = landingPage;

  const menuItems = useMenu(menu, menuOrder);
  const [markRodo, setMarkRodo] = useState(false);
  const rodoLock = useRef(false);

  useEffect(() => {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style>
        html {
          scroll-behavior: smooth;
        }
      </style>`
    );
  }, []);

  const handlePolicyClick = () => {
    if (rodoLock.current) {
      return;
    }
    setMarkRodo(true);
    rodoLock.current = true;

    setTimeout(() => {
      setMarkRodo(false);
      rodoLock.current = false;
    }, 3000);
  };

  return (
    <>
      <TopNavigation
        links={menuItems}
        className="sticky top-0 z-10 h-24 bg-white"
        logo={<img className="h-full  object-cover" src={logoImage}></img>}
      ></TopNavigation>
      <div className="relative overflow-hidden bg-white">
        <div className="lg:absolute lg:inset-0">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={mainWelcome.heroImage}
            alt=""
          />
          <svg
            className="absolute bottom-0 hidden h-24 w-full text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon
              fill="currentColor"
              stroke="currentColor"
              points="0,100 100,100 100,0"
            />
          </svg>
        </div>

        <Block className="relative mt-8 space-y-8 lg:flex lg:h-96 lg:items-center">
          <div className="flex-row lg:max-w-fit lg:rounded-2xl  lg:bg-opacity-60 lg:bg-clip-padding lg:p-8 lg:py-4 lg:backdrop-blur-xl lg:backdrop-filter">
            <FormatMessage
              as="h1"
              className="text-center text-3xl font-extrabold tracking-tight text-gray-900 lg:text-left lg:text-zinc-200"
            >
              {mainWelcome.header1}
            </FormatMessage>
            <FormatMessage
              as="h2"
              className="text-center text-3xl font-extrabold tracking-tight text-gray-900 lg:text-left lg:text-zinc-200"
            >
              {mainWelcome.header2}
            </FormatMessage>
          </div>
        </Block>
      </div>

      <Block className="relative mt-8 lg:mt-12" id={menu.about.slug}>
        <FormatMessage
          as="p"
          className="text-center text-xl font-medium tracking-wide text-black antialiased"
        >
          {description}
        </FormatMessage>
      </Block>

      <div className="bg-neutral-100">
        <Block className="mt-16 flex flex-wrap gap-y-2.5 p-4 md:flex-nowrap lg:mt-12 lg:p-8">
          {officeInNumbers.elements.map((element) => (
            <div
              key={element.label}
              className="flex w-1/2 flex-col flex-nowrap"
            >
              <AnimateNumber
                className="text-center text-4xl tabular-nums tracking-wider"
                start={0}
                end={element.value}
                duration={2000}
                suffix={element?.percents ? "%" : undefined}
              ></AnimateNumber>
              <span className="mt-2 text-center text-xl">{element.label}</span>
            </div>
          ))}
        </Block>
      </div>

      <Block className="mt-16 lg:mt-12" id={menu.offer.slug}>
        <OfferList {...offers}></OfferList>
      </Block>

      <div className="relative mt-16  bg-neutral-100">
        <svg
          className="absolute top-0 hidden h-24 w-full -translate-y-full text-neutral-100 lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            fill="currentColor"
            stroke="currentColor"
            points="0,100 100,100 100,0"
          />
        </svg>
        <Block className="py-4 lg:flex lg:flex-row" id={menu.contact.slug}>
          <Reveal from="left" className=" lg:mx-auto lg:flex-auto">
            <ContactInfo
              contactLabel={contactLabel}
              phones={phones}
              address={address}
              className="m-auto"
            ></ContactInfo>
          </Reveal>
          <Reveal className="mt-4 lg:mt-0  lg:flex-auto" from="right">
            <ContactForm
              handlePolicyClick={handlePolicyClick}
              className="mx-auto rounded-lg bg-white p-4 shadow-md"
            ></ContactForm>
          </Reveal>
        </Block>
      </div>
      <div className="mt-4">
        <iframe
          className="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.6129853515663!2d16.02374791595272!3d50.78274747124599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470efa33f4aa4c03%3A0x527e2372888be008!2sJana%20Paw%C5%82a%20II%2011A%2C%2058-400%20Kamienna%20G%C3%B3ra!5e0!3m2!1spl!2spl!4v1646575489040!5m2!1spl!2spl"
          style={{ border: 0 }}
          loading="lazy"
          height="560"
        ></iframe>
      </div>
      <div className="mt-4">
        <Footer markRodo={markRodo}></Footer>
      </div>
    </>
  );
}
