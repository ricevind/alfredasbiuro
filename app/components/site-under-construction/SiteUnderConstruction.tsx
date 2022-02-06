export const SiteUnderConstruction = ({
  rightImage,
}: {
  rightImage: {
    url: string;
    alt: string;
  };
}) => {
  return (
    <div className="bg-zinc-100">
      <div className="relative mx-auto flex  min-h-screen  w-screen max-w-screen-2xl flex-col py-4">
        <div className="mr-auto px-4 md:z-10 md:my-auto">
          <h1 className="font text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Alfreda Sobierajska
          </h1>
          <h2 className="font text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            KANCELARIA <br /> PODATKOWO-UBEZPIECZENIOWA
          </h2>
          <h2 className="font text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            BIURO RACHUNKOWE
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            Nowa odsłona strony jest w trakcie przygotowania
          </p>

          <a
            href="http://alfredasbiuro.wix.com/alfredasobierajska"
            className="mt-4 inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
          >
            Aktualna strona
          </a>
        </div>
      </div>

      <div className="top-0 bottom-0 mt-4 flex  flex-col justify-center xl:absolute xl:right-0 xl:mt-0">
        <div aria-hidden="true" className="pointer-events-none">
          <img
            className="h-full w-full"
            src={rightImage.url}
            alt={rightImage.alt}
          />
        </div>
      </div>
    </div>
  );
};
