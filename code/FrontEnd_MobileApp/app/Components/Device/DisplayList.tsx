import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Device = {
  id: string;
  mac: string;
  name: string;
  zoneName: string;
  location: string;
  addedAt: string;
  user: string;
};

type DeviceListScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const DeviceListScreen: React.FC<DeviceListScreenProps> = ({ navigation }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const sampleDevices: Device[] = [
      {
        id: '1',
        mac: '2_6h60i60i6',
        name: 'ESP32 zone1',
        zoneName: 'zone1',
        location: 'Above tank',
        addedAt: '2023-05-15T10:30:00Z',
        user: 'John ',
      },
      {
        id: '2',
        mac: '6hf66d5f9a0jf',
        name: 'ESP32 zone2',
        zoneName: 'zone2',
        location: 'Near nutrition tank',
        addedAt: '2023-05-10T14:15:00Z',
        user: 'Jane ',
      },
      {
        id: '3',
        mac: '2_fp6dsbfjf',
        name: 'ESP32 zone3',
        zoneName: 'zone3',
        location: 'rod',
        addedAt: '2023-05-05T09:00:00Z',
        user: 'John ',
      },
    ];
    setDevices(sampleDevices);
  }, []);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.mac.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.zoneName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Device }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DeviceDetails', { deviceId: item.id })}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceDetails}>MAC: {item.mac}</Text>
      <Text style={styles.deviceDetails}>Zone: {item.zoneName}</Text>
      <Text style={styles.deviceDetails}>Location: {item.location}</Text>
      <Text style={styles.deviceDetails}>User: {item.user}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search devices..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDevices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#01694D',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default DeviceListScreen;
