interface ClassNameOptionSegment {
  [key: string]: boolean;
}

type ClassNamesSegment = ClassNameOptionSegment | string | undefined;

export function joinClassNames(...classNamesSegments: ClassNamesSegment[]) {
  const classNamesStrings = classNamesSegments.map((classNamesSegment) => {
    if (typeof classNamesSegment === "string") {
      return classNamesSegment;
    }

    return classNamesSegment
      ? handleOptionSegment(classNamesSegment)
      : undefined;
  });

  return classNamesStrings.join(" ");
}

function handleOptionSegment(optionSegment: ClassNameOptionSegment): string[] {
  return Object.entries(optionSegment)
    .filter(([_, isSet]) => isSet)
    .map(([className]) => className);
}
