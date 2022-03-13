import React from "react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import { AnimateNumber } from "~/components/AnimateNumber";
import { ContactForm } from "~/components/ContactForm";
import { OfferList } from "~/components/OfferList";
import { Reveal } from "~/components/Reveal";
import { TopNavigation } from "~/components/TopNavigation";
import { FormatMessage } from "~/components/utils/FormatMessage";
import { LandingPage, OffersList } from "~/models";
import { joinClassNames, readPage } from "~/utils";

type LoaderData = {
  landingPage: LandingPage;
  offers: OffersList;
};

export const loader: LoaderFunction = async () => {
  const landingPageFile = await readPage("landing_page.md");
  const offersFile = await readPage("offers.md");

  return { landingPage: landingPageFile.data, offers: offersFile.data };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  await fetch(`${process.env.URL!}/form`, {
    method: "post",
    body: formData,
  });

  return redirect("/");
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

        <Block className="relative mt-8 space-y-8 lg:mt-12 lg:h-80">
          <div className="flex-row">
            <FormatMessage
              as="h1"
              className="text-center text-3xl font-extrabold tracking-tight  text-gray-900 lg:text-left"
            >
              {mainWelcome.header1}
            </FormatMessage>
            <FormatMessage
              as="h2"
              className="text-center text-3xl font-extrabold tracking-tight text-gray-900 lg:text-left"
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

      <Block className="relative mt-8 lg:mt-12">
        <FormatMessage
          as="p"
          className="text-center text-xl font-medium tracking-wide text-black antialiased"
        >
          {description}
        </FormatMessage>
      </Block>

      <div className="bg-neutral-100">
        <Block className="mt-8 flex flex-wrap gap-y-2.5 p-4 md:flex-nowrap lg:mt-12 lg:p-8">
          <div className="flex w-1/2 flex-col flex-nowrap">
            <AnimateNumber
              className="text-center font-mono text-4xl tracking-wider"
              start={0}
              end={100}
              duration={2000}
            ></AnimateNumber>
            <span className="mt-2 text-center text-xl">Klientów</span>
          </div>
          <div className="flex w-1/2 flex-col flex-nowrap">
            <AnimateNumber
              className="text-center font-mono text-4xl tracking-wider"
              start={0}
              end={100}
              duration={2000}
              suffix="%"
            ></AnimateNumber>
            <span className="mt-2 text-center text-xl">Zadowolenia</span>
          </div>
          <div className="flex w-1/2 flex-col flex-nowrap">
            <AnimateNumber
              className="text-center font-mono text-4xl tracking-wider"
              start={0}
              end={20}
              duration={2000}
            ></AnimateNumber>
            <span className="mt-2 text-center text-xl">Lat doświadczenia</span>
          </div>
          <div className="flex w-1/2 flex-col flex-nowrap">
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
      </div>

      <Block className="mt-8 lg:mt-12">
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
        <Block className="py-4">
          <Reveal from="left">
            <ContactForm className="mx-auto rounded-lg bg-white p-4 shadow-md"></ContactForm>
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
      <Block className="h-8">footer</Block>
    </>
  );
}
