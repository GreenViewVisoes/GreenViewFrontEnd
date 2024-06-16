import { Image, View } from "react-native";

export default function IconProfile({ url }: { url: string }) {
  return (
    <Image
      src={url}
      style={{ width: 150, height: 150 }}
      resizeMode="contain"
      className="rounded-full w-36 h-36 m-3"
    />
  );
}
