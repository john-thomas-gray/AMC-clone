import { ImageSourcePropType, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant: "red" | "white" | "black" | "transparent" | "transparent-black" | string;
  onPress: () => void;
  IconRight?: React.ComponentType<any>;
  IconLeft?: React.ComponentType<any>;
  className?: string;
}

declare interface HeaderProps {
  title: string;
  showSettings?: boolean;
}

declare interface HeaderButtonProps {
  icon: ImageSourcePropType;
  link: string;
  additionalStyles?: string;
}

declare interface StubsCardProps {
  backgroundImage: ImageSourcePropType;
  logoColor: string;
  membershipType: string;
  headline: string;
  textBody: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "red" | "white" | "black" | "transparent" | "transparent-black" | string;
}
