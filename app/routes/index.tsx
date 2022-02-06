import { LoaderFunction, useLoaderData } from "remix";
import { readPage } from "../utils/read-cms-files";

export const loader: LoaderFunction = async () => {
  const data = await readPage("landing_page.md");
  return data;
};

export default function Index() {
  const { data } = useLoaderData();

  const { title, mainWelcome, actionContent } = data;

  return (
    <div className=" m-10 text-2xl  ">
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
