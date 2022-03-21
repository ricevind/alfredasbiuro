import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useTransition } from "remix";
import { joinClassNames } from "~/utils";

export interface FormHTMLAttributes {
  netlify: boolean;
}

export const ContactForm = ({
  handlePolicyClick,
  className,
}: {
  handlePolicyClick: () => void;
  className?: string;
}) => {
  const transition = useTransition();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const lastTransitionState = useRef(transition.state);

  useEffect(() => {
    if (lastTransitionState.current === "submitting") {
      setWasSubmitted(true);
    }

    lastTransitionState.current = transition.state;
  }, [transition]);

  const onPolicyClick = () => {
    handlePolicyClick();
    document.querySelector("#policy")?.scrollIntoView();
  };

  const submitButtonLabel = wasSubmitted ? "Wysłano" : "Wyślij";
  const isTransitioning = transition.state !== "idle";

  return (
    <Form
      method="post"
      className={joinClassNames("mb-2 w-full max-w-lg", className)}
    >
      <fieldset disabled={isTransitioning || wasSubmitted}>
        <input type="hidden" name="form-name" value="contact" />
        <input name="bot-field" type="text" className="sr-only" />
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="name"
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
              name="name"
            ></input>
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="ast-name"
            >
              Nazwisko
            </label>
            <input
              required
              autoComplete="family-name"
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="last-name"
              type="text"
              placeholder="Kowalski"
              name="last-name"
            ></input>
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              required
              className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="email"
              type="email"
              name="email"
            ></input>
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="message"
            >
              Wiadomość
            </label>
            <textarea
              className="mb-3 block h-48 w-full resize-none appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="message"
              name="message"
            ></textarea>
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <input
              required
              className="mr-[1ch] h-6 w-6 rounded-md border-0 align-bottom text-green-600 focus:ring-0"
              type="checkbox"
              name="personal-data-processing-agreement"
            ></input>
            <span className="leading-tight text-gray-700">
              Wyrażam zgodę na przetwarzanie danych zgodnie z{" "}
              <span
                className="cursor-pointer text-blue-300 hover:text-blue-400"
                onClick={onPolicyClick}
              >
                polityką prywatności
              </span>
            </span>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              className={joinClassNames(
                "focus:shadow-outline rounded py-2 px-4 font-bold text-white shadow focus:outline-none",
                { "bg-amber-300 hover:bg-amber-400": !wasSubmitted },
                { "bg-green-300": wasSubmitted }
              )}
              type="submit"
            >
              {isTransitioning ? <Loader></Loader> : submitButtonLabel}
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </fieldset>
    </Form>
  );
};

function Loader() {
  return <span className="loader inline-block h-4 w-4"></span>;
}
