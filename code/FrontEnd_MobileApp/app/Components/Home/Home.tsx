import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  FlatList 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../common/Footer";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const [selectedZone, setSelectedZone] = useState("ZONE 1");
  const [modalVisible, setModalVisible] = useState(false);

  const zones = ["ZONE 1", "ZONE 2", "ZONE 3", "ZONE 4", "ZONE 5", "ZONE 6"];

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="notifications" size={26} color="white" />
        </TouchableOpacity>

        <View style={styles.zoneSelector}>
          <Text style={styles.zoneText}>{selectedZone}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Ionicons name="settings" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={zones}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedZone(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <Image source={require("../../../assets/download.jpeg")} style={styles.image} />

      <View style={styles.optionsContainer}>
        {zones.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(4,38,28)",
    alignItems: "center",
    paddingTop: height * 0.05,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#01694D",
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  zoneSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  zoneText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
  },
  dropdownArrow: {
    fontSize: 25,
    color: "#16F08B",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "50%",
    padding: 5,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 15,
    textAlign: "center",
  },
  image: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 10,
    marginTop: 80,
    marginBottom: 15,
  },
  optionsContainer: {
    width: "90%",
    backgroundColor: "#1B5E20",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  optionButton: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#388E3C",
    borderRadius: 10,
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
