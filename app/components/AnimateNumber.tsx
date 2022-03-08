import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { joinClassNames } from "~/utils";

interface AnimateNumberProps {
  start: number;
  end: number;
  prefix?: string;
  suffix?: string;
  duration: number;
  className?: string;
}

function easeOutCirc(x: number): number {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

function clamp(val: number) {
  return Math.min(Math.max(val, 0), 1);
}

export const AnimateNumber = ({
  start,
  end,
  prefix,
  suffix,
  duration,
  className,
}: AnimateNumberProps) => {
  const [currentValue, setCurrentValue] = useState(start);
  const [render, setRender] = useState(0);
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const startTime = useRef(Date.now());

  const calcAnimationProgress = (value: number) => {
    const fraction = (value - start) / (end - start);
    return easeOutCirc(clamp(fraction));
  };

  const calcTimeProgress = () => {
    const elapsed = Date.now() - startTime.current;

    return clamp(elapsed / duration);
  };

  const calcCurrentValue = () => {
    const timeProgress = calcTimeProgress();
    const progressedValue = Math.ceil(start + (end - start) * timeProgress);

    return progressedValue;
  };

  useEffect(() => {
    if (inView) {
      startTime.current = Date.now();
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (currentValue === end) {
      return;
    }

    const a = calcAnimationProgress(currentValue + Math.ceil(end / 30));
    const b = calcAnimationProgress(currentValue);
    const nextTimeout = (a - b) * duration;

    const timeoutHandle = setTimeout(() => {
      requestAnimationFrame(() => {
        const calculatedCurrentValue = calcCurrentValue();
        if (calculatedCurrentValue === currentValue) {
          setRender(render + 1);
          return;
        }
        setCurrentValue(calcCurrentValue());
      });
    }, nextTimeout);

    return () => clearTimeout(timeoutHandle);
  }, [currentValue, render, inView]);

  return (
    <span ref={ref} className={joinClassNames(className)}>
      {prefix}
      {currentValue}
      {suffix}
    </span>
  );
};
