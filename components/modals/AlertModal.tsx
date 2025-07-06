import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type AlertModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
};

const AlertModal = ({ visible, onClose, title, body }: AlertModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <BlurView
          intensity={100}
          tint="dark"
          className="bg-opacity-95 rounded-xl w-80 pt-6 pb-4 px-4 shadow-lg overflow-hidden"
        >
          {title && (
            <Text className="text-white text-center text-2xl font-bold mb-2">
              {title}
            </Text>
          )}

          <View className="mb-8">
            <Text className="text-center text-white text-center ">{body}</Text>
          </View>

          <Pressable onPress={onClose} className="px-8 self-center">
            <Text className="text-blue-100 uppercase text-xl text-center">
              OK
            </Text>
          </Pressable>
        </BlurView>
      </View>
    </Modal>
  );
};

export default AlertModal;
