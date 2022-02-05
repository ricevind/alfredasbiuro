import { LoaderFunction, useLoaderData } from "remix";
import { readPage } from "../utils/read-cms-files";

export const loader: LoaderFunction = async () => {
  const data = await readPage("landing_page.md");
  return data;
};

export default function Index() {
  const data = useLoaderData();

  return <div>Development...</div>;
}
