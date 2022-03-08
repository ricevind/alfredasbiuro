import React from "react";
import { joinClassNames } from "~/utils";

function unescapeUnicode(str: string) {
  return str.replace(/\\u([a-fA-F0-9]{4})/g, (_, m1) =>
    String.fromCharCode(parseInt(m1, 16))
  );
}

type FormatMessageProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
};

export function FormatMessage(props: FormatMessageProps): JSX.Element {
  const { children, as: As = "span", className = "" } = props;
  const parsedString = unescapeUnicode(children);

  return <As className={joinClassNames(className)}>{parsedString}</As>;
}
