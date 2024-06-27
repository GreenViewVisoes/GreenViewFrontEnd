import { useAuth } from "@hooks/useAuth";
import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

function BarCharts() {
  const { AuthUser } = useAuth();

  const barData = [
    {
      value: AuthUser.plants_counts.Saudável,
      frontColor: "#85DE60",
      label: "Saudável",
      labelWidth: 50,
    },
    {
      value: AuthUser.plants_counts.ferrugem,
      frontColor: "#059A3F",
      label: "Ferrugem",
      labelWidth: 50,
    },
    {
      value: AuthUser.plants_counts.mildio,
      frontColor: "#0C632E",
      label: "Míldio",
      labelWidth: 50,
    },
    {
      value: AuthUser.plants_counts.potassio,
      label: "Potassio",
      frontColor: "#85DE60",
      labelWidth: 50,
    },
  ];

  return (
    <View className="mt-3 flex justify-center items-center w-full">
      <BarChart
        data={barData}
        barWidth={30}
        noOfSections={3}
        barBorderRadius={4}
        spacing={32}
        yAxisThickness={0}
        hideYAxisText
        xAxisThickness={0}
        hideRules
        isAnimated
      />
    </View>
  );
}

export default BarCharts;
