import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const LOCATIONS = [
  { label: "Resedinta Vlas", latitude: 46.94631788254242, longitude: 28.790050541185515 },
  { label: "Resedinta Slim", latitude: 46.9467372038549, longitude: 28.789744769357817 },
  { label: "AlcoMarket", latitude: 46.950312301301715, longitude: 28.767621909402983 },
];

export type LocationType = typeof LOCATIONS[number];

export default function LocationPicker({ selected, onSelect }: {
  selected: LocationType | null;
  onSelect: (loc: LocationType) => void;
}) {
  return (
  <View style={styles.locationPickerContainer}>
      <FlatList
        horizontal
        data={LOCATIONS}
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.locationPickerButton, selected && selected.label === item.label && styles.locationPickerSelected]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.locationPickerText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

import styles from "./styles";

