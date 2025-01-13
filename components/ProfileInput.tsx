import { View, Text, TouchableOpacity, Image } from "react-native";
import InputField from "./InputField";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  label: string;
  placeholder: string;
  image: any;
  value: string;
  onChange: Dispatch<React.SetStateAction<string>>;
};

const ProfileInput = ({
  label,
  placeholder,
  image,
  value,
  onChange,
}: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(true);

  const handlePress = () => {
    setIsEditable(true);
    onChange(placeholder);
    setShowEdit(false);
  };

  return (
    <View className="w-full relative h-fit items-end justify-center">
      <InputField
        label={label}
        placeholder={placeholder}
        containerStyle="w-full bg-[#F6F8FA]"
        inputStyle="p-3.5"
        editable={isEditable}
        value={value}
        onChange={(e) => onChange(e.nativeEvent.text)}
      />
      <TouchableOpacity
        activeOpacity={1}
        className={`absolute top-[55px] right-4 ${!showEdit && "hidden"}`}
        onPress={handlePress}
      >
        <Image source={image} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInput;
