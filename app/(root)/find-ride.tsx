import RideLayout from "@/components/RideLayout";
import { useLocationStore } from "@/store";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout>
      <Text>{userAddress}</Text>
    </RideLayout>
  );
};

export default FindRide;
