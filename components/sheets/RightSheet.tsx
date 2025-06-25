import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import SideMenu from "react-native-side-menu";

type ItemData = {
  title: string;
  link: string;
};

const DATA: ItemData[] = [
  {
    title: "Feedback & Support",
    link: ""
  },
  {
    title: "Careers",
    link: ""
  },
  {
    title: "Terms & Conditions",
    link: ""
  },
  {
    title: "Privacy Policy",
    link: ""
  },
  {
    title: "Request Refund",
    link: ""
  },
  {
    title: "Buy Gift Cards",
    link: ""
  },
  {
    title: "Gift an A-List Membership",
    link: ""
  },
  {
    title: "Buy Movie Merchandise",
    link: ""
  },
  {
    title: "Notifications",
    link: ""
  }
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <Pressable
    onPress={onPress}
    className={`flex-row ${backgroundColor} items-center h-16`}
  >
    <Text className={`${textColor} font-garamond-regular text-lg pl-4`}>
      {item.title}
    </Text>
  </Pressable>
);

const Menu = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = "bg-black";
    const textColor = "text-blue-100";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.title);
        }}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    );
  };

  const renderFooter = () => {
    const item: ItemData = { title: "Sign In", link: "" };
    const backgroundColor = "bg-black";
    const textColor = "text-blue-100";

    return (
      <View className="border-t border-gray-300">
        <Item
          item={item}
          onPress={() => {
            console.log("Log Out pressed");
          }}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        ListHeaderComponent={<View className="h-36" />}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const menu = <Menu />;

type RightSheetProps = {
  children: React.ReactNode;
};

const RightSheet: React.FC<RightSheetProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideMenu
      menu={menu}
      isOpen={isMenuOpen}
      onChange={(isOpen: boolean) => setIsMenuOpen(isOpen)}
      menuPosition="right"
    >
      {children}
    </SideMenu>
  );
};

export default RightSheet;
