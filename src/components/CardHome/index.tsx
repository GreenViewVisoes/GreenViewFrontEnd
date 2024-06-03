import { Image, Text, View } from "react-native";

type CardHomeProps = {
  data: string;
  cultura: string;
  img?: string;
};

export function CardHome({ data, cultura, img }: CardHomeProps) {
  return (
    <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl mr-3 flex items-end justify-center">
      {img ? (
        <Image
          source={
            img ? { uri: img } : { uri: "https://via.placeholder.com/150" }
          }
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      ) : (
        <View className="bg-[#000000] w-full justify-center items-center rounded-t-xl flex-1">
          <Text className="text-[#FFFFFF]">Imagem não encontrada</Text>
        </View>
      )}
      <View className="flex w-full items-center justify-center">
        <Text className="text-base">Data: {data}</Text>
        <Text className="text-base">Cultura: {cultura}</Text>
      </View>
    </View>
  );
}
