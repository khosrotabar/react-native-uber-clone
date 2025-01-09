import { icons } from "@/constants";
import { router } from "expo-router";
import { ReactNode, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

const RideLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const BottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="h-full bg-blue-500">
          <View
            className="flex-row absolute z-10 top-16 
            items-center justify-start px-5"
          >
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>

          <Map />
        </View>

        <BottomSheet
          keyboardBehavior="extend"
          ref={BottomSheetRef}
          snapPoints={["40%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            <SafeAreaView
              className="mb-10"
              edges={["bottom"]}
              style={{ flex: 1 }}
            >
              {children}
            </SafeAreaView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
