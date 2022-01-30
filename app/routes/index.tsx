import siteUnderConstructionUrl from "../assets/images/building_site.svg";

export default function Index() {
  return (
    <div className="bg-gray-400">
      <img
        src={siteUnderConstructionUrl}
        alt="Graphic depicting man constructing web site"
      ></img>
      <h1>
        KANCELARIA PODATKOWO-UBEZPIECZENIOWA
        <br />
        BIURO RACHUNKOWE
        <br />
        Alfreda Sobierajska
      </h1>
    </div>
  );
}
