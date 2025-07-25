import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

type GorditaTextProps = {
  children: ReactNode;
  className?: string;
} & TextProps;

const removeClassesByPrefix = (classList: string[], prefixes: string[]) => {
  return classList.filter(
    cls => !prefixes.some(prefix => cls.startsWith(prefix))
  );
};

const GorditaText = ({
  children,
  className = "",
  ...props
}: GorditaTextProps) => {
  const defaultClasses = ["font-gordita-regular", "text-white"];
  const customClasses = className.trim().split(/\s+/);

  const hasFontOverride = customClasses.some(cls => cls.startsWith("font-"));
  const hasTextOverride = customClasses.some(cls => cls.startsWith("text-"));

  let baseClasses = [...defaultClasses];
  if (hasFontOverride) {
    baseClasses = removeClassesByPrefix(baseClasses, ["font-"]);
  }
  if (hasTextOverride) {
    baseClasses = removeClassesByPrefix(baseClasses, ["text-"]);
  }

  const finalClassName = [...baseClasses, ...customClasses].join(" ");

  return (
    <Text className={finalClassName} {...props}>
      {children}
    </Text>
  );
};

export default GorditaText;
