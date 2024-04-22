import { TextInput } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface SearchInputProps {
  placeholder: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <View className="flex-row justify-start items-center rounded-xl bg-[#FFFFFF] p-3 h-14 w-52">
      <Icon className="p-3 " name="search" size={19} color="#A3A3A3" />
      <TextInput
        className="bg-[#FFFFFF] p-1 pl-2 w-36 text-lg"
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
      ></TextInput>
    </View>
  );
}
