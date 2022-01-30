export const SiteUnderConstruction = ({
  rightImage,
}: {
  rightImage: { url: string; alt: string };
}) => {
  return (
    <div className="bg-zinc-100 ">
      <div className="min-h-screen w-screen  py-4 relative flex flex-col max-w-screen-2xl mx-auto">
        <div className="px-4 mr-auto md:z-10 md:my-auto">
          <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Alfreda Sobierajska
          </h1>
          <h2 className="text-2xl font font-bold tracking-tight text-gray-900 sm:text-4xl">
            KANCELARIA <br /> PODATKOWO-UBEZPIECZENIOWA
          </h2>
          <h2 className="text-2xl font font-bold tracking-tight text-gray-900 sm:text-4xl">
            BIURO RACHUNKOWE
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            Nowa odsłona strony jest w trakcie przygotowania
          </p>

          <a
            href="http://alfredasbiuro.wix.com/alfredasobierajska"
            className="mt-4 inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
          >
            Aktualna strona
          </a>
        </div>

        <div className="mt-4 xl:mt-0 xl:absolute xl:right-0  top-0 bottom-0 flex flex-col justify-center">
          <div aria-hidden="true" className="pointer-events-none">
            <img
              className="h-full w-full"
              src={rightImage.url}
              alt={rightImage.alt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
