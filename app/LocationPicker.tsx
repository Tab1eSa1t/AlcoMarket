import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <View style={styles.container}>
      <FlatList
        horizontal
        data={LOCATIONS}
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, selected && selected.label === item.label && styles.selected]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.text}>{item.label}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: "#007AFF",
  },
  text: {
    color: "#333",
    fontWeight: "bold",
  },
});
