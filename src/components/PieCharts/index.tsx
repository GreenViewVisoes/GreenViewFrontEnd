import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

function DonutCharts() {
  const data = [
    { color: "#85DE60", value: 50 },
    { color: "#059A3F", value: 80 },
    { color: "#0C632E", value: 90, focused: true },
  ];
  return (
    <View className="mt-3 flex justify-center items-center">
      <PieChart
        data={data}
        donut
        sectionAutoFocus
        innerRadius={60}
        radius={90}
        centerLabelComponent={() => {
          return (
            <View className="flex items-center justify-center">
              <Text className="text-center text-5xl font-bold text-main">
                20
              </Text>
            </View>
          );
        }}
      />

      <View className="flex items-center justify-around flex-row w-full mt-5">
        <View className="flex flex-row gap-2">
          <View className="h-6 w-6 bg-[#85DE60] rounded-full"></View>
          <Text className="text-base">Feijão</Text>
        </View>
        <View className="flex flex-row gap-2">
          <View className="h-6 w-6 bg-[#059A3F] rounded-full"></View>
          <Text className="text-base">Milho</Text>
        </View>
        <View className="flex flex-row gap-2">
          <View className="h-6 w-6 bg-[#0C632E] rounded-full"></View>
          <Text className="text-base">Soja</Text>
        </View>
      </View>
    </View>
  );
}

export default DonutCharts;
