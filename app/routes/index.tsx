import { LoaderFunction, useLoaderData } from "remix";
import { LandingPage, OffersList } from "~/models";
import { readPage } from "../utils/read-cms-files";

export const loader: LoaderFunction = async () => {
  const landingPageFile = await readPage("landing_page.md");
  const offersFile = await readPage("offers.md");

  return { landingPage: landingPageFile.data, offers: offersFile.data };
};

type LoaderData = {
  landingPage: LandingPage;
  offers: OffersList;
};

export default function Index() {
  const { landingPage, offers } = useLoaderData<LoaderData>();

  const { mainWelcome, actionContent } = landingPage;

  return (
    <div className=" m-10 text-2xl  ">
      <pre>{JSON.stringify(landingPage, null, 2)}</pre>
      <pre>{JSON.stringify(offers, null, 2)}</pre>

      <h1>{mainWelcome.header1}</h1>
      <h3>{mainWelcome.header2}</h3>
      <img src={mainWelcome.heroImage}></img>
      <div className="text-xl ">
        <h3>{actionContent.question}</h3>
        <h4>{actionContent.subQuestion}</h4>
        <p>{actionContent.summary}</p>
      </div>
    </div>
  );
}
