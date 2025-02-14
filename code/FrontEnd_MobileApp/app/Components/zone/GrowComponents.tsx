import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GrowComponentsProps {
  isEnabled: boolean[];
  toggleStatus: (index: number) => void;
}

const GrowComponents: React.FC<GrowComponentsProps> = ({ isEnabled, toggleStatus }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>GROW COMPONENTS</Text>
      <View style={styles.growContainer}>
        {[
          { name: 'Fan', icon: 'flower', isOn: isEnabled[0] },
          { name: 'Nutrients', icon: 'flask', isOn: isEnabled[1] },
          { name: 'Water', icon: 'water', isOn: isEnabled[2] },
          { name: 'Light', icon: 'bulb', isOn: isEnabled[3] },
        ].map((item, index) => (
          <View key={index} style={styles.growItem}>
            <Text style={styles.growLabel}>{item.name}</Text>
            <View style={[styles.circle, isEnabled[index] ? styles.activeCircle : styles.inactiveCircle]}>
              <Ionicons name={item.icon as any} size={32} color={isEnabled[index] ? '#16F08B' : '#5F6E67'} />
            </View>

            <TouchableOpacity
              style={[styles.statusButton, isEnabled[index] ? styles.statusOn : styles.statusOff]}
              onPress={() => toggleStatus(index)}
            >
              <Ionicons name="checkmark-circle" size={18} color={isEnabled[index] ? '#16F08B' : '#555'} />
              <Text style={[styles.statusText, { color: isEnabled[index] ? '#16F08B' : 'gray' }]}>
                {isEnabled[index] ? 'On' : 'Off'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#01694D', 
    padding: 15,
    borderRadius: 20,
    alignItems: 'stretch',
    marginBottom: 28,
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  growContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  growItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  growLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16F08B', 
    marginBottom: 5,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  activeCircle: {
    backgroundColor: '#1F3C34',
  },
  inactiveCircle: {
    backgroundColor: '#264B44',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 5,
  },
  statusOn: {
    backgroundColor: '#123E2D',
  },
  statusOff: {
    backgroundColor: '#2B4240',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default GrowComponents;

