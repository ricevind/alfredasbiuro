import { SiteUnderConstruction } from "~/components/site-under-construction";
import siteUnderConstructionUrl from "../assets/images/building_site.svg";

export default function Index() {
  return (
    <SiteUnderConstruction
      rightImage={{
        url: siteUnderConstructionUrl,
        alt: "Grafika przedstawiająca osobę budującą stronę internetową",
      }}
    ></SiteUnderConstruction>
  );
}
