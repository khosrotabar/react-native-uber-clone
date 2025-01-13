import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ProfileInput from "@/components/ProfileInput";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await fetchAPI("/(api)/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        clerkUserId: userId,
      }),
    });

    try {
      await user?.update({ firstName, lastName });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <ProfileInput
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              image={images.edit}
              value={firstName}
              onChange={setFirstName}
            />

            <ProfileInput
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              image={images.edit}
              value={lastName}
              onChange={setLastName}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            {/* <ProfileInput
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              image={images.edit}
              value={phone}
              onChange={setPhone}
            /> */}

            <CustomButton
              title="Save chagnes"
              className="w-full mt-5"
              activeOpacity={0.7}
              onPress={handleSubmit}
              disabled={loading || !firstName || !lastName}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
