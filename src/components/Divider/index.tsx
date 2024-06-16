import { View } from "react-native";

type DividerProps = {
  classStyle?: string;
};

export default function Divider({ classStyle }: DividerProps) {
  return <View className={`border border-[#6d6d6d69] ${classStyle}`}></View>;
}
