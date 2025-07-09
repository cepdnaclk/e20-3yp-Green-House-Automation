// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   RefreshControl,
//   Dimensions,
// } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { themeAuth } from "../../../Contexts/ThemeContext";

// // Get screen dimensions
// const { width } = Dimensions.get("window");

// // Define DataType interface
// type DataType = {
//   id: number;
//   humidity: number;
//   soilMoisture: number;
//   temp: number;
//   nitrogenLevel: number;
//   phosphorusLevel: number;
//   potassiumLevel: number;
//   updatedAt: string;
// };

// // Define data types for the chart
// const dataTypes = [
//   { key: "temp", name: "Temperature", unit: "°C" },
//   { key: "humidity", name: "Humidity", unit: "%" },
//   { key: "soilMoisture", name: "Soil Moisture", unit: "%" },
//   { key: "nitrogenLevel", name: "Nitrogen", unit: "ppm" },
//   { key: "phosphorusLevel", name: "Phosphorus", unit: "ppm" },
//   { key: "potassiumLevel", name: "Potassium", unit: "ppm" },
// ];

// const StatisticsDisplay: React.FC = () => {
//   const { theme } = themeAuth();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stats, setStats] = useState({ avg: 0, min: 0, max: 0, trend: 0 });
//   const [refreshing, setRefreshing] = useState(false);
  
//   // Mock Data (same as your original data)
//   const [datas, setDatas] = useState<DataType[]>([ 
//     {
//     id: 1,
//     humidity: 49.61,
//     soilMoisture: 49.04,
//     temp: 29.94,
//     nitrogenLevel: 8.95,
//     phosphorusLevel: 6.53,
//     potassiumLevel: 1.43,
//     updatedAt: "2/9/2025",
//   },
//   {
//     id: 2,
//     humidity: 91.88,
//     soilMoisture: 11.33,
//     temp: 21.64,
//     nitrogenLevel: 7.86,
//     phosphorusLevel: 4.54,
//     potassiumLevel: 6.42,
//     updatedAt: "2/12/2025",
//   },
//   {
//     id: 3,
//     humidity: 70.26,
//     soilMoisture: 91.62,
//     temp: 26.08,
//     nitrogenLevel: 7.78,
//     phosphorusLevel: 4.52,
//     potassiumLevel: 8.49,
//     updatedAt: "2/27/2025",
//   },
//   {
//     id: 4,
//     humidity: 46.37,
//     soilMoisture: 53.24,
//     temp: 21.24,
//     nitrogenLevel: 9.68,
//     phosphorusLevel: 7.53,
//     potassiumLevel: 5.04,
//     updatedAt: "2/19/2025",
//   },
//   {
//     id: 5,
//     humidity: 45.8,
//     soilMoisture: 16.18,
//     temp: 23.25,
//     nitrogenLevel: 1.4,
//     phosphorusLevel: 7.66,
//     potassiumLevel: 2.26,
//     updatedAt: "2/22/2025",
//   },
//   {
//     id: 6,
//     humidity: 83.86,
//     soilMoisture: 86.51,
//     temp: 24.82,
//     nitrogenLevel: 3.62,
//     phosphorusLevel: 2.16,
//     potassiumLevel: 1.95,
//     updatedAt: "2/16/2025",
//   },
//   {
//     id: 7,
//     humidity: 21.36,
//     soilMoisture: 86.59,
//     temp: 26.91,
//     nitrogenLevel: 8.3,
//     phosphorusLevel: 1.75,
//     potassiumLevel: 2.86,
//     updatedAt: "2/5/2025",
//   },
//   {
//     id: 8,
//     humidity: 32.55,
//     soilMoisture: 30.59,
//     temp: 23.68,
//     nitrogenLevel: 7.65,
//     phosphorusLevel: 9.21,
//     potassiumLevel: 3.17,
//     updatedAt: "2/23/2025",
//   },
//   {
//     id: 9,
//     humidity: 70.85,
//     soilMoisture: 93.75,
//     temp: 29.14,
//     nitrogenLevel: 8.02,
//     phosphorusLevel: 6.63,
//     potassiumLevel: 8.76,
//     updatedAt: "2/17/2025",
//   },
//   {
//     id: 10,
//     humidity: 28.99,
//     soilMoisture: 48.96,
//     temp: 28.98,
//     nitrogenLevel: 4.05,
//     phosphorusLevel: 8.9,
//     potassiumLevel: 3.85,
//     updatedAt: "2/5/2025",
//   },
//   {
//     id: 11,
//     humidity: 54.62,
//     soilMoisture: 33.62,
//     temp: 28.25,
//     nitrogenLevel: 1.84,
//     phosphorusLevel: 2.35,
//     potassiumLevel: 4.52,
//     updatedAt: "2/19/2025",
//   },
//   {
//     id: 12,
//     humidity: 22.78,
//     soilMoisture: 60.59,
//     temp: 22.15,
//     nitrogenLevel: 4.4,
//     phosphorusLevel: 3.21,
//     potassiumLevel: 4.17,
//     updatedAt: "2/15/2025",
//   },
//   {
//     id: 13,
//     humidity: 41.94,
//     soilMoisture: 57.47,
//     temp: 22.34,
//     nitrogenLevel: 1.88,
//     phosphorusLevel: 6.86,
//     potassiumLevel: 4.1,
//     updatedAt: "2/22/2025",
//   },
//   {
//     id: 14,
//     humidity: 22.3,
//     soilMoisture: 77.05,
//     temp: 23.78,
//     nitrogenLevel: 6.9,
//     phosphorusLevel: 6.93,
//     potassiumLevel: 2.31,
//     updatedAt: "2/22/2025",
//   },
//   {
//     id: 15,
//     humidity: 86.53,
//     soilMoisture: 74.15,
//     temp: 25.19,
//     nitrogenLevel: 5.0,
//     phosphorusLevel: 5.81,
//     potassiumLevel: 1.56,
//     updatedAt: "2/28/2025",
//   },
//   {
//     id: 16,
//     humidity: 83.3,
//     soilMoisture: 52.74,
//     temp: 25.85,
//     nitrogenLevel: 5.5,
//     phosphorusLevel: 2.84,
//     potassiumLevel: 1.75,
//     updatedAt: "2/3/2025",
//   },
//   {
//     id: 17,
//     humidity: 28.66,
//     soilMoisture: 81.59,
//     temp: 26.26,
//     nitrogenLevel: 4.98,
//     phosphorusLevel: 5.46,
//     potassiumLevel: 2.2,
//     updatedAt: "2/23/2025",
//   },
//   {
//     id: 18,
//     humidity: 47.29,
//     soilMoisture: 93.52,
//     temp: 28.87,
//     nitrogenLevel: 3.61,
//     phosphorusLevel: 1.65,
//     potassiumLevel: 2.01,
//     updatedAt: "2/14/2025",
//   },
//   {
//     id: 19,
//     humidity: 48.6,
//     soilMoisture: 56.55,
//     temp: 29.79,
//     nitrogenLevel: 6.96,
//     phosphorusLevel: 4.18,
//     potassiumLevel: 9.15,
//     updatedAt: "2/15/2025",
//   },
//   {
//     id: 20,
//     humidity: 38.7,
//     soilMoisture: 45.78,
//     temp: 22.84,
//     nitrogenLevel: 4.22,
//     phosphorusLevel: 5.0,
//     potassiumLevel: 7.85,
//     updatedAt: "2/25/2025",
//   },
//   {
//     id: 21,
//     humidity: 46.58,
//     soilMoisture: 99.5,
//     temp: 28.38,
//     nitrogenLevel: 6.32,
//     phosphorusLevel: 6.08,
//     potassiumLevel: 6.94,
//     updatedAt: "2/11/2025",
//   },
//   {
//     id: 22,
//     humidity: 82.43,
//     soilMoisture: 85.25,
//     temp: 28.02,
//     nitrogenLevel: 8.27,
//     phosphorusLevel: 5.06,
//     potassiumLevel: 2.31,
//     updatedAt: "2/4/2025",
//   },
//   {
//     id: 23,
//     humidity: 79.48,
//     soilMoisture: 71.99,
//     temp: 21.94,
//     nitrogenLevel: 6.1,
//     phosphorusLevel: 6.37,
//     potassiumLevel: 2.38,
//     updatedAt: "2/3/2025",
//   },
//   {
//     id: 24,
//     humidity: 84.87,
//     soilMoisture: 49.77,
//     temp: 25.85,
//     nitrogenLevel: 7.03,
//     phosphorusLevel: 5.1,
//     potassiumLevel: 4.97,
//     updatedAt: "2/15/2025",
//   },
//   {
//     id: 25,
//     humidity: 29.34,
//     soilMoisture: 58.95,
//     temp: 25.77,
//     nitrogenLevel: 3.52,
//     phosphorusLevel: 6.76,
//     potassiumLevel: 7.13,
//     updatedAt: "2/22/2025",
//   },
// ]); 

//   useEffect(() => {
//     analyzeData(datas, dataTypes[currentIndex].key as keyof DataType);
//   }, [currentIndex, datas]);

//   const analyzeData = (data: DataType[], type: keyof DataType) => {
//     if (data.length === 0) return;

//     const values = data.map((item) => item[type] as number);
//     const sum = values.reduce((a, b) => a + b, 0);
//     const avg = sum / values.length;
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const trend = values[values.length - 1] - values[0];
//     setStats({ avg, min, max, trend });
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % dataTypes.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + dataTypes.length) % dataTypes.length);
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1500);
//   };

//   return (
//     <ScrollView 
//       contentContainerStyle={[styles.container, {backgroundColor: theme.colors.background}]}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       <View style={styles.contentContainer}>
//         <Text style={[styles.title, {color: theme.colors.text}]}>
//           Live Data Statistics
//         </Text>

//         {/* Data Type Selector */}
//         <View style={styles.selectorContainer}>
//           <TouchableOpacity 
//             onPress={handlePrev} 
//             style={[styles.arrowButton, {backgroundColor: theme.colors.primary}]}
//           >
//             <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
//           </TouchableOpacity>

//           <View style={styles.dataTypeContainer}>
//             <Text style={[styles.dataTypeName, {color: theme.colors.text}]}>
//               {dataTypes[currentIndex].name}
//             </Text>
//             <Text style={[styles.dataTypeUnit, {color: theme.colors.text}]}>
//               ({dataTypes[currentIndex].unit})
//             </Text>
//           </View>

//           <TouchableOpacity 
//             onPress={handleNext} 
//             style={[styles.arrowButton, {backgroundColor: theme.colors.primary}]}
//           >
//             <Ionicons name="arrow-forward" size={20} color={theme.colors.text} />
//           </TouchableOpacity>
//         </View>

//         {/* Statistical Summary */}
//         <View style={[styles.summaryContainer, {backgroundColor: theme.colors.cardBackground}]}>
//           <View style={styles.statItem}>
//             <Ionicons name="stats-chart" size={20} color="#4CAF50" />
//             <Text style={[styles.statText, {color: theme.colors.text}]}>
//               Avg: {stats.avg.toFixed(2)}
//             </Text>
//           </View>
          
//           <View style={styles.statItem}>
//             <Ionicons name="trending-up" size={20} color="#FF5722" />
//             <Text style={[styles.statText, {color: theme.colors.text}]}>
//               Max: {stats.max.toFixed(2)}
//             </Text>
//           </View>
          
//           <View style={styles.statItem}>
//             <Ionicons name="trending-down" size={20} color="#2196F3" />
//             <Text style={[styles.statText, {color: theme.colors.text}]}>
//               Min: {stats.min.toFixed(2)}
//             </Text>
//           </View>
          
//           <View style={styles.statItem}>
//             <Ionicons 
//               name={stats.trend > 0 ? "arrow-up" : "arrow-down"} 
//               size={20} 
//               color={stats.trend > 0 ? "#4CAF50" : "#F44336"} 
//             />
//             <Text style={[styles.statText, {color: theme.colors.text}]}>
//               Trend: {stats.trend > 0 ? "Increasing" : "Decreasing"}
//             </Text>
//           </View>
//         </View>

//         {/* Line Chart */}
//         <View style={styles.chartContainer}>
//           <LineChart
//             data={{
//               labels: datas.map((_, i) => (i + 1).toString()),
//               datasets: [
//                 {
//                   data: datas.map(
//                     (item) => item[dataTypes[currentIndex].key as keyof DataType] as number
//                   ),
//                 },
//               ],
//             }}
//             width={width * 0.9} // 90% of screen width
//             height={300}
//             yAxisSuffix={dataTypes[currentIndex].unit === "°C" ? "°" : dataTypes[currentIndex].unit}
//             yAxisInterval={1}
//             chartConfig={{
//               backgroundColor: theme.colors.cardBackground,
//               backgroundGradientFrom: theme.colors.primary,
//               backgroundGradientTo: theme.colors.primary,
//               decimalPlaces: 2,
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               style: {
//                 borderRadius: 16,
//               },
//               propsForDots: {
//                 r: "4",
//                 strokeWidth: "2",
//                 stroke: "#fff",
//               },
//             }}
//             bezier
//             style={styles.chart}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   selectorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 20,
//     paddingHorizontal: 20,
//   },
//   arrowButton: {
//     padding: 10,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   dataTypeContainer: {
//     flex: 1,
//     alignItems: "center",
//     marginHorizontal: 10,
//   },
//   dataTypeName: {
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   dataTypeUnit: {
//     fontSize: 14,
//     marginTop: 4,
//   },
//   summaryContainer: {
//     width: "100%",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     elevation: 3,
//   },
//   statItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "48%",
//     marginVertical: 8,
//   },
//   statText: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   chartContainer: {
//     width: "auto",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   chart: {
//     borderRadius: 16,
//     marginVertical: 8,
//   },
// });

// export default StatisticsDisplay;




import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { themeAuth } from "../../../Contexts/ThemeContext";

const screenWidth = Dimensions.get("window").width;

type DataType = {
  id: number;
  humidity: number;
  soilMoisture: number;
  temp: number;
  nitrogenLevel: number;
  phosphorusLevel: number;
  potassiumLevel: number;
  updatedAt: string; // date string in ISO or yyyy-mm-dd format
};

const dataTypes = [
  { key: "temp", name: "Temperature", unit: "°C" },
  { key: "humidity", name: "Humidity", unit: "%" },
  { key: "soilMoisture", name: "Soil Moisture", unit: "%" },
  { key: "nitrogenLevel", name: "Nitrogen", unit: "ppm" },
  { key: "phosphorusLevel", name: "Phosphorus", unit: "ppm" },
  { key: "potassiumLevel", name: "Potassium", unit: "ppm" },
];

const StatisticsDisplay: React.FC = () => {
  const { theme } = themeAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ avg: 0, min: 0, max: 0, trend: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(""); // Expect yyyy-mm-dd format
  const [endDate, setEndDate] = useState("");
  const [datas, setDatas] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  // Static data for development/testing
  const staticData: DataType[] = [
    {
      id: 1,
      humidity: 49.61,
      soilMoisture: 49.04,
      temp: 29.94,
      nitrogenLevel: 8.95,
      phosphorusLevel: 6.53,
      potassiumLevel: 1.43,
      updatedAt: "2/9/2025",
    },
    {
      id: 2,
      humidity: 91.88,
      soilMoisture: 11.33,
      temp: 21.64,
      nitrogenLevel: 7.86,
      phosphorusLevel: 4.54,
      potassiumLevel: 6.42,
      updatedAt: "2/12/2025",
    },
    {
      id: 3,
      humidity: 70.26,
      soilMoisture: 91.62,
      temp: 26.08,
      nitrogenLevel: 7.78,
      phosphorusLevel: 4.52,
      potassiumLevel: 8.49,
      updatedAt: "2/27/2025",
    },
    {
      id: 4,
      humidity: 46.37,
      soilMoisture: 53.24,
      temp: 21.24,
      nitrogenLevel: 9.68,
      phosphorusLevel: 7.53,
      potassiumLevel: 5.04,
      updatedAt: "2/19/2025",
    },
    {
      id: 5,
      humidity: 45.8,
      soilMoisture: 16.18,
      temp: 23.25,
      nitrogenLevel: 1.4,
      phosphorusLevel: 7.66,
      potassiumLevel: 2.26,
      updatedAt: "2/22/2025",
    },
    {
      id: 6,
      humidity: 83.86,
      soilMoisture: 86.51,
      temp: 24.82,
      nitrogenLevel: 3.62,
      phosphorusLevel: 2.16,
      potassiumLevel: 1.95,
      updatedAt: "2/16/2025",
    },
    {
      id: 7,
      humidity: 21.36,
      soilMoisture: 86.59,
      temp: 26.91,
      nitrogenLevel: 8.3,
      phosphorusLevel: 1.75,
      potassiumLevel: 2.86,
      updatedAt: "2/5/2025",
    },
    {
      id: 8,
      humidity: 32.55,
      soilMoisture: 30.59,
      temp: 23.68,
      nitrogenLevel: 7.65,
      phosphorusLevel: 9.21,
      potassiumLevel: 3.17,
      updatedAt: "2/23/2025",
    },
    {
      id: 9,
      humidity: 70.85,
      soilMoisture: 93.75,
      temp: 29.14,
      nitrogenLevel: 8.02,
      phosphorusLevel: 6.63,
      potassiumLevel: 8.76,
      updatedAt: "2/17/2025",
    },
    {
      id: 10,
      humidity: 28.99,
      soilMoisture: 48.96,
      temp: 28.98,
      nitrogenLevel: 4.05,
      phosphorusLevel: 8.9,
      potassiumLevel: 3.85,
      updatedAt: "2/5/2025",
    },
    {
      id: 11,
      humidity: 54.62,
      soilMoisture: 33.62,
      temp: 28.25,
      nitrogenLevel: 1.84,
      phosphorusLevel: 2.35,
      potassiumLevel: 4.52,
      updatedAt: "2/19/2025",
    },
    {
      id: 12,
      humidity: 22.78,
      soilMoisture: 60.59,
      temp: 22.15,
      nitrogenLevel: 4.4,
      phosphorusLevel: 3.21,
      potassiumLevel: 4.17,
      updatedAt: "2/15/2025",
    },
    {
      id: 13,
      humidity: 41.94,
      soilMoisture: 57.47,
      temp: 22.34,
      nitrogenLevel: 1.88,
      phosphorusLevel: 6.86,
      potassiumLevel: 4.1,
      updatedAt: "2/22/2025",
    },
    {
      id: 14,
      humidity: 22.3,
      soilMoisture: 77.05,
      temp: 23.78,
      nitrogenLevel: 6.9,
      phosphorusLevel: 6.93,
      potassiumLevel: 2.31,
      updatedAt: "2/22/2025",
    },
    {
      id: 15,
      humidity: 86.53,
      soilMoisture: 74.15,
      temp: 25.19,
      nitrogenLevel: 5.0,
      phosphorusLevel: 5.81,
      potassiumLevel: 1.56,
      updatedAt: "2/28/2025",
    },
    {
      id: 16,
      humidity: 83.3,
      soilMoisture: 52.74,
      temp: 25.85,
      nitrogenLevel: 5.5,
      phosphorusLevel: 2.84,
      potassiumLevel: 1.75,
      updatedAt: "2/3/2025",
    },
    {
      id: 17,
      humidity: 28.66,
      soilMoisture: 81.59,
      temp: 26.26,
      nitrogenLevel: 4.98,
      phosphorusLevel: 5.46,
      potassiumLevel: 2.2,
      updatedAt: "2/23/2025",
    },
    {
      id: 18,
      humidity: 47.29,
      soilMoisture: 93.52,
      temp: 28.87,
      nitrogenLevel: 3.61,
      phosphorusLevel: 1.65,
      potassiumLevel: 2.01,
      updatedAt: "2/14/2025",
    },
    {
      id: 19,
      humidity: 48.6,
      soilMoisture: 56.55,
      temp: 29.79,
      nitrogenLevel: 6.96,
      phosphorusLevel: 4.18,
      potassiumLevel: 9.15,
      updatedAt: "2/15/2025",
    },
    {
      id: 20,
      humidity: 38.7,
      soilMoisture: 45.78,
      temp: 22.84,
      nitrogenLevel: 4.22,
      phosphorusLevel: 5.0,
      potassiumLevel: 7.85,
      updatedAt: "2/25/2025",
    },
    {
      id: 21,
      humidity: 46.58,
      soilMoisture: 99.5,
      temp: 28.38,
      nitrogenLevel: 6.32,
      phosphorusLevel: 6.08,
      potassiumLevel: 6.94,
      updatedAt: "2/11/2025",
    },
    {
      id: 22,
      humidity: 82.43,
      soilMoisture: 85.25,
      temp: 28.02,
      nitrogenLevel: 8.27,
      phosphorusLevel: 5.06,
      potassiumLevel: 2.31,
      updatedAt: "2/4/2025",
    },
    {
      id: 23,
      humidity: 79.48,
      soilMoisture: 71.99,
      temp: 21.94,
      nitrogenLevel: 6.1,
      phosphorusLevel: 6.37,
      potassiumLevel: 2.38,
      updatedAt: "2/3/2025",
    },
    {
      id: 24,
      humidity: 84.87,
      soilMoisture: 49.77,
      temp: 25.85,
      nitrogenLevel: 7.03,
      phosphorusLevel: 5.1,
      potassiumLevel: 4.97,
      updatedAt: "2/15/2025",
    },
    {
      id: 25,
      humidity: 29.34,
      soilMoisture: 58.95,
      temp: 25.77,
      nitrogenLevel: 3.52,
      phosphorusLevel: 6.76,
      potassiumLevel: 7.13,
      updatedAt: "2/22/2025",
    },
  ];
  
  // Fetch your data here or replace with your own data fetching logic
  useEffect(() => {
    // For development, use static data:
    setDatas(staticData);
    setFilteredData([]);
    // To use backend, uncomment below:
    // fetchData();
  }, []);

  // Analyze data on index or data change
  useEffect(() => {
    const activeData = filteredData.length > 0 ? filteredData : datas;
    if (activeData.length > 0) {
      analyzeData(activeData, dataTypes[currentIndex].key as keyof DataType);
    } else {
      setStats({ avg: 0, min: 0, max: 0, trend: 0 });
    }
  }, [currentIndex, filteredData, datas]);

  const analyzeData = (data: DataType[], type: keyof DataType) => {
    const values = data.map((item) => item[type] as number);
    if (values.length === 0) {
      setStats({ avg: 0, min: 0, max: 0, trend: 0 });
      return;
    }
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const trend = values[values.length - 1] - values[0];
    setStats({ avg, min, max, trend });
  };

  // Replace URL below with your backend URL or use static data import
  const fetchData = async () => {
    try {
      const res = await fetch("https://your-backend-api.com/api/data");
      const json = await res.json();
      setDatas(json);
      setFilteredData([]); // Show all data by default
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Filter data by date range input
  const applyDateFilter = () => {
    if (!startDate || !endDate) {
      setFilteredData([]); // reset filter if incomplete
      return;
    }
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (isNaN(start) || isNaN(end) || start > end) {
      alert("Please enter valid start and end dates (yyyy-mm-dd) with start <= end.");
      return;
    }
    const result = datas.filter((item) => {
      const itemTime = new Date(item.updatedAt).getTime();
      return itemTime >= start && itemTime <= end;
    });
    setFilteredData(result);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  const displayedData = filteredData.length > 0 ? filteredData : datas;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Live Data Statistics</Text>

          {/* Date Filter */}
          <View style={styles.dateFilterContainer}>
            <TextInput
              placeholder="Start Date (yyyy-mm-dd)"
              placeholderTextColor={theme.colors.secondaryText}
              style={[styles.dateInput, { color: theme.colors.text, borderColor: theme.colors.primary }]}
              value={startDate}
              onChangeText={setStartDate}
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              placeholder="End Date (yyyy-mm-dd)"
              placeholderTextColor={theme.colors.secondaryText}
              style={[styles.dateInput, { color: theme.colors.text, borderColor: theme.colors.primary }]}
              value={endDate}
              onChangeText={setEndDate}
              keyboardType="numeric"
              maxLength={10}
            />
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
              onPress={applyDateFilter}
              activeOpacity={0.8}
            >
              <Text style={{ color: theme.colors.text, fontWeight: "600" }}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Selector */}
          <View style={styles.selectorContainer}>
            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => (prev - 1 + dataTypes.length) % dataTypes.length)}
              style={[styles.arrowButton, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
            </TouchableOpacity>

            <View style={styles.dataTypeContainer}>
              <Text style={[styles.dataTypeName, { color: theme.colors.text }]}>
                {dataTypes[currentIndex].name}
              </Text>
              <Text style={[styles.dataTypeUnit, { color: theme.colors.secondaryText }]}>
                ({dataTypes[currentIndex].unit})
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => (prev + 1) % dataTypes.length)}
              style={[styles.arrowButton, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-forward" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Summary */}
          <View style={[styles.summaryContainer, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.statItem}>
              <Ionicons name="stats-chart" size={20} color="#4CAF50" />
              <Text style={[styles.statText, { color: theme.colors.text }]}>Avg: {stats.avg.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trending-up" size={20} color="#FF5722" />
              <Text style={[styles.statText, { color: theme.colors.text }]}>Max: {stats.max.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trending-down" size={20} color="#2196F3" />
              <Text style={[styles.statText, { color: theme.colors.text }]}>Min: {stats.min.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name={stats.trend > 0 ? "arrow-up" : "arrow-down"}
                size={20}
                color={stats.trend > 0 ? "#4CAF50" : "#F44336"}
              />
              <Text style={[styles.statText, { color: theme.colors.text }]}>
                Trend: {stats.trend > 0 ? "Increasing" : "Decreasing"}
              </Text>
            </View>
          </View>

          {/* Chart */}
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: displayedData.map((_, i) => (i + 1).toString()),
                datasets: [
                  {
                    data: displayedData.map(
                      (item) => item[dataTypes[currentIndex].key as keyof DataType] as number
                    ),
                  },
                ],
              }}
              width={screenWidth - 32} // padding fix
              height={300}
              yAxisSuffix={dataTypes[currentIndex].unit}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: theme.colors.cardBackground,
                backgroundGradientFrom: theme.colors.primary,
                backgroundGradientTo: theme.colors.primary,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#fff",
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dateFilterContainer: {
    width: "100%",
    marginBottom: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  applyButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  arrowButton: {
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  dataTypeContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  dataTypeName: {
    fontSize: 20,
    fontWeight: "600",
  },
  dataTypeUnit: {
    fontSize: 14,
    marginTop: 4,
  },
  summaryContainer: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    elevation: 3,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginVertical: 8,
  },
  statText: {
    fontSize: 16,
    marginLeft: 8,
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
});

export default StatisticsDisplay;
