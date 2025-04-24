import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
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

type DeviceDetailScreenProps = {
  route: RouteProp<{ params: { device: Device } }, 'params'>;
  navigation: NativeStackNavigationProp<any>;
};

const DeviceDetailScreen: React.FC<DeviceDetailScreenProps> = ({ route, navigation }) => {
  const { device: initialDevice } = route.params;
  const [device, setDevice] = useState<Device>(initialDevice);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    console.log('Saved:', device);
    setIsEditing(false);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Device Details</Text>
        {isEditing ? (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>ID</Text>
          <Text style={styles.fieldValue}>{device.id}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>MAC Address</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={device.mac}
              onChangeText={(text) => setDevice({ ...device, mac: text })}
              placeholder="Enter MAC address"
            />
          ) : (
            <Text style={styles.fieldValue}>{device.mac}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Added At</Text>
          <Text style={styles.fieldValue}>{formatDate(device.addedAt)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Information</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Name (Alias)</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={device.name}
              onChangeText={(text) => setDevice({ ...device, name: text })}
              placeholder="Enter device name"
            />
          ) : (
            <Text style={styles.fieldValue}>{device.name}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Zone Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={device.zoneName}
              onChangeText={(text) => setDevice({ ...device, zoneName: text })}
              placeholder="Enter zone name"
            />
          ) : (
            <Text style={styles.fieldValue}>{device.zoneName}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Location</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={device.location}
              onChangeText={(text) => setDevice({ ...device, location: text })}
              placeholder="Enter location description"
            />
          ) : (
            <Text style={styles.fieldValue}>{device.location}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Information</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Assigned User</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={device.user}
              onChangeText={(text) => setDevice({ ...device, user: text })}
              placeholder="Enter user name"
            />
          ) : (
            <Text style={styles.fieldValue}>{device.user}</Text>
          )}
        </View>
      </View>

      {device.mac.includes('efid65b12') && (
        <View style={styles.verseContainer}>
          <Text style={styles.verseText}>He who keeps you will not slumber</Text>
          <Text style={styles.verseReference}>Psalms 121:3</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  field: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  verseContainer: {
    backgroundColor: '#e8f4f8',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#333',
  },
  verseReference: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default DeviceDetailScreen;
