import { ImageSourcePropType, PressableProps } from "react-native";

declare interface ButtonProps extends PressableProps {
  title: string;
  variant:
    | "red"
    | "white"
    | "black"
    | "transparent"
    | "transparent-black"
    | string;
  height?: number;
  bold?: boolean;
  textStyle?: string;
  onPress: () => void;
  IconRight?: React.ComponentType<any>;
  IconLeft?: React.ComponentType<any>;
  className?: string;
  textClassName?: string;
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
  buttonVariant?:
    | "red"
    | "white"
    | "black"
    | "transparent"
    | "transparent-black"
    | string;
}

declare interface SlidingLayoutProps {
  buttonNames: string[];
  children: React.ReactNode[];
}

declare interface HorizontalScrollContainerProps {
  sectionNames: string[];
  scrollViewRef: React.RefObject<ScrollView>;
  scrollX: Animated.Value;
  screenWidth: number;
  onScrollIndexChange: (index: number) => void;
}

declare interface IconButtonProps {
  icon: ImageSourcePropType;
  title?: string;
  width?: string;
  textProps?: string;
  iconStyle?: string;
  style?: string;
}

declare interface Genre {
  id: number;
  name: string;
}

declare interface Movie {
  id: number;
  backdropPath?: string;
  genres?: Genre[];
  title?: string;
  synopsis?: string;
  release_date?: string;
  runtime?: string;
  tagline?: string;
  status?: string;
  vote_average?: number;
  poster_path?: string;
}

declare interface Screen {
  number: number;
  movie: Movie;
  type: ScreenType;
  features: string[];
  showtimes: string[];
}

declare interface ScreenType {
  projector: string;
  logo: ImageSourcePropType;
  tagline: string;
  seatCount: number;
}

declare interface ScreenTypesMap {
  laser: ScreenType;
  reald: ScreenType;
  dolby: ScreenType;
  imax: ScreenType;
}

declare interface Theatre {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  vicinity: string;
  compound_code: string;
  screens: Screen[];
  movies: Movie[];
}

declare interface NearbyTheatre {
  place_id: string;
  name: string;
  vicinity: string;
  plus_code: {
    compound_code: string;
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
