import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type YesNoModalProps = {
  visible?: boolean;
  onYes?: () => void;
  onNo?: () => void;
  title?: string;
  body?: string;
};

const YesNoModal = ({ visible, onYes, onNo, title, body }: YesNoModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onNo}
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <BlurView
          intensity={100}
          tint="dark"
          className="bg-opacity-95 rounded-xl w-80  shadow-lg overflow-hidden "
        >
          <View className="pt-6 px-4">
            {title && (
              <Text className="text-white text-center text-2xl font-bold mb-2">
                {title}
              </Text>
            )}

            <View className="mb-8">
              <Text className="text-center text-white">{body}</Text>
            </View>
          </View>

          <View
            className="flex-row justify-between space-x-8"
            style={{ borderTopWidth: 0.5, borderTopColor: "#2B2B2B" }}
          >
            <Pressable
              onPress={onNo}
              className="w-[50%] h-[40px] self-center items-center justify-center "
              style={{ borderRightWidth: 0.5, borderRightColor: "#2B2B2B" }}
            >
              <Text className="text-blue-100 font-semibold text-xl text-center">
                No
              </Text>
            </Pressable>
            <Pressable
              onPress={onYes}
              className="w-[50%] h-[40px] self-center items-center justify-center"
              style={{ borderRightWidth: 0.5, borderLeftColor: "#2B2B2B" }}
            >
              <Text className="text-blue-100 font-semibold text-xl text-center">
                Yes
              </Text>
            </Pressable>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

export default YesNoModal;
