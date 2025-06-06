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

declare interface SlidingHeaderProps {
  sectionNames: string[];
  currentSectionIndex: number;
  onSectionChange: (index: number) => void;
  className?: string;
}


declare interface MovieCardProps {
  id: string;
  poster_path: ImageSourcePropType;
  title: string;
  release_date: string;
  onPress: () => void;
}

declare interface HorizontalScrollContainerProps {
  sectionNames: string[];
  scrollViewRef: React.RefObject<ScrollView>;
  scrollX: Animated.Value;
  screenWidth: number;
  onScrollIndexChange: (index: number) => void;
}
