import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity>
        <Ionicons name="grid" size={28} color="black" a/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="bar-chart" size={28} color="black" a/>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="account-cog" size={28} color="black" a/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#01694D',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Footer;
