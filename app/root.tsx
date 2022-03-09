import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import { SiteUnderConstruction } from "./components/site-under-construction";
import siteUnderConstructionUrl from "./assets/images/building_site.svg";

export const meta: MetaFunction = () => {
  return { title: "Biuro Sobierajska" };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async () => {
  // if (process.env.NODE_ENV === "production") {
  //   throw new Response("Not Found", {
  //     status: 404,
  //   });
  // }
  return {
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
    },
  };
};

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SiteUnderConstruction
          rightImage={{
            url: siteUnderConstructionUrl,
            alt: "Grafika przedstawiająca osobę budującą stronę internetową",
          }}
        ></SiteUnderConstruction>
      </body>
    </>
  );
}
