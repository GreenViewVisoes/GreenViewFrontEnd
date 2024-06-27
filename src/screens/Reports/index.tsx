import PieCharts from "@components/PieCharts";
import { useAuth } from "@hooks/useAuth";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export function Reports() {
  const { AuthUser } = useAuth();
  return (
    <ScrollView>
      <SafeAreaView className="items-center flex-1">
        <View className="w-3/4 h-36 bg-[#FFFFFF] rounded-md mt-20 shadow-md">
          <Text className="text-center text-base font-bold mt-5 text-[#059A3F]">
            Total de Análises Geradas
          </Text>
          <Text className="text-center text-7xl font-bold mt-3 text-main ">
            {AuthUser.quantidade_consultas}
          </Text>
        </View>
        <View className="w-3/4 h-80 bg-[#FFFFFF] items-center rounded-md mt-10 shadow-md">
          <Text className="text-center text-base font-bold mt-5 text-[#059A3F] ">
            Total de Análises por Cultivo
          </Text>
          <PieCharts />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
