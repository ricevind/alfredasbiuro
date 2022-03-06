import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { AnimateNumber } from "~/components/AnimateNumber";
import { ContactForm } from "~/components/ContactForm";
import { OfferList } from "~/components/OfferList";
import { Reveal } from "~/components/Reveal";
import { TopNavigation } from "~/components/TopNavigation";
import { FormatMessage } from "~/components/utils/FormatMessage";
import { LandingPage, OffersList } from "~/models";
import { joinClassNames, readPage } from "~/utils";

export const loader: LoaderFunction = async () => {
  const landingPageFile = await readPage("landing_page.md");
  const offersFile = await readPage("offers.md");

  return { landingPage: landingPageFile.data, offers: offersFile.data };
};

type LoaderData = {
  landingPage: LandingPage;
  offers: OffersList;
};

function Block({ children, className }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={joinClassNames("mx-auto max-w-7xl px-4", className)}>
      {children}
    </div>
  );
}

export default function Index() {
  const { landingPage, offers } = useLoaderData<LoaderData>();

  const { mainWelcome, actionContent, description } = landingPage;

  return (
    <>
      <TopNavigation
        className="sticky top-0 z-10 h-24 bg-white"
        logo={
          <img
            className="h-full w-full object-cover"
            src={landingPage.logoImage}
          ></img>
        }
      ></TopNavigation>
      <div className="relative overflow-hidden bg-white">
        <div className="lg:absolute lg:inset-0">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full lg:opacity-50 lg:blur-sm lg:brightness-100"
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

        <Block className="relative mt-8 space-y-8">
          <div className="flex-row text-center">
            <FormatMessage
              as="h1"
              className="text-3xl font-extrabold tracking-tight text-gray-900"
            >
              {mainWelcome.header1}
            </FormatMessage>
            <FormatMessage
              as="h2"
              className="text-3xl font-extrabold tracking-tight text-gray-900"
            >
              {mainWelcome.header2}
            </FormatMessage>
          </div>
          <div className="text-2xl font-extrabold tracking-tight text-gray-900">
            <FormatMessage as="p">{actionContent.question}</FormatMessage>
            <FormatMessage as="p">{actionContent.subQuestion}</FormatMessage>
            <FormatMessage as="p">{actionContent.summary}</FormatMessage>
          </div>
        </Block>
      </div>

      <Block className="relative mt-8">
        <FormatMessage
          as="p"
          className="text-center text-xl font-medium tracking-wide text-black antialiased"
        >
          {description}
        </FormatMessage>
      </Block>

      <Block className="mt-8 flex flex-wrap gap-y-2.5 bg-neutral-100 p-4">
        <div className="flex flex-1 flex-col flex-nowrap">
          <AnimateNumber
            className="text-center font-mono text-4xl tracking-wider"
            start={0}
            end={100}
            duration={2000}
          ></AnimateNumber>
          <span className="mt-2 text-center text-xl">Klientów</span>
        </div>
        <div className="flex flex-1 flex-col flex-nowrap">
          <AnimateNumber
            className="text-center font-mono text-4xl tracking-wider"
            start={0}
            end={100}
            duration={2000}
            suffix="%"
          ></AnimateNumber>
          <span className="mt-2 text-center text-xl">Zadowolenia</span>
        </div>
        <div className="flex flex-1 flex-col flex-nowrap">
          <AnimateNumber
            className="text-center font-mono text-4xl tracking-wider"
            start={0}
            end={20}
            duration={2000}
          ></AnimateNumber>
          <span className="mt-2 text-center text-xl">Lat doświadczenia</span>
        </div>
        <div className="flex flex-1 flex-col flex-nowrap">
          <AnimateNumber
            className="text-center font-mono text-4xl tracking-wider"
            start={0}
            end={8500}
            duration={2000}
          ></AnimateNumber>
          <span className="mt-2 text-center text-xl">
            dokumentów miesięcznie
          </span>
        </div>
      </Block>

      <Block className="mt-8">
        <OfferList {...offers}></OfferList>
      </Block>

      <div className="relative mt-16  bg-neutral-100">
        <svg
          className="absolute top-0 h-24 w-full -translate-y-full text-neutral-100"
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
        <Block className="pt-4">
          <Reveal from="left">
            <ContactForm className="mx-auto rounded-lg bg-white p-4 shadow-md"></ContactForm>
          </Reveal>
        </Block>
      </div>
      <Block className="h-8">footer</Block>
    </>
  );
}
