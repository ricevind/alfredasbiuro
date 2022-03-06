import React from "react";
import { useInView } from "react-intersection-observer";
import { joinClassNames } from "~/utils";

const slideFromLeft = {
  start: "-translate-x-full",
  end: "translate-x-0",
};

const slideFromRight = {
  start: "-translate-x-full",
  end: "translate-x-0",
};

const variants = {
  left: slideFromLeft,
  right: slideFromRight,
} as const;

type Variants = keyof typeof variants;

export const Reveal = ({
  children,
  className,
  from,
}: React.PropsWithChildren<{ from: Variants; className?: string }>) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  const variant = variants[from];

  return (
    <div ref={ref} className={className}>
      <div
        className={joinClassNames(
          "transition duration-1000",
          { [variant.start]: !inView },
          { [variant.end]: inView }
        )}
      >
        {children}
      </div>
    </div>
  );
};
