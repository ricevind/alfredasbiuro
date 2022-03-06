import { joinClassNames } from "~/utils";

export interface FormHTMLAttributes {
  netlify: boolean;
}

export const ContactForm = ({ className }: { className?: string }) => {
  return (
    <form
      name="contact"
      data-netlify="true"
      className={joinClassNames("w-full max-w-lg", className)}
    >
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-first-name"
          >
            Imię
          </label>
          <input
            required
            autoComplete="given-name"
            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-first-name"
            type="text"
            placeholder="Jan"
          ></input>
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-last-name"
          >
            Nazwisko
          </label>
          <input
            required
            autoComplete="family-name"
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-last-name"
            type="text"
            placeholder="Kowalski"
          ></input>
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-password"
          >
            E-mail
          </label>
          <input
            required
            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="email"
            type="email"
          ></input>
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-password"
          >
            Wiadomość
          </label>
          <textarea
            className="mb-3 block h-48 w-full resize-none appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="message"
          ></textarea>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="focus:shadow-outline rounded bg-amber-300 py-2 px-4 font-bold text-white shadow hover:bg-amber-400 focus:outline-none"
            type="submit"
          >
            Send
          </button>
        </div>
        <div className="md:w-2/3"></div>
      </div>
    </form>
  );
};