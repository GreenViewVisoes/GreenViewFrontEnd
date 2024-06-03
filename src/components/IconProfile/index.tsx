import { Image, View } from "react-native";

export default function IconProfile() {
  return (
    <Image
      src="https://via.placeholder.com/150"
      style={{ width: 150, height: 150 }}
      resizeMode="contain"
      className="rounded-full w-36 h-36"
    />
  );
}
