import { useState } from "react";
import { Text, View } from "react-native";
import Arrow from "./Compass";
import { useHeading, useLatLong } from "./location";
import LocationPicker, { LocationType } from "./LocationPicker";
import styles from "./styles";
// Helper to convert degrees to radians
function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
// Helper to convert radians to degrees
function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}
// Calculate bearing from current location to target
function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δλ = toRad(lon2 - lon1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return (toDeg(θ) + 360) % 360;
}

// Calculate distance in meters between two lat/lon points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000; // Earth radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function App() {
  // No default target, null means no place chosen
  const [target, setTarget] = useState<LocationType | null>(null);
  const { longitude, latitude, error } = useLatLong();
  const { heading, error: headingError } = useHeading();

  let bearing = null;
  let arrowRotation = 0;
    let distance = null;
  if (
    target &&
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    typeof heading === "number"
  ) {
    bearing = calculateBearing(latitude, longitude, target.latitude, target.longitude);
    // The arrow should rotate by the difference between bearing and heading
    arrowRotation = bearing - heading;
      distance = calculateDistance(latitude, longitude, target.latitude, target.longitude);
  } else if (typeof heading === "number") {
    // No target: arrow points straight ahead (0 deg relative to device)
    arrowRotation = 0;
  }

  return (
    <View style={styles.container}>
      <LocationPicker selected={target} onSelect={setTarget} />
      <View style={styles.arrowContainer}>
        <Arrow rotation={arrowRotation} />
        <Text style={styles.distanceText}>
          {distance !== null ? distance.toFixed(2) : "420"}
        </Text>
      </View>
    </View>
  );
}
