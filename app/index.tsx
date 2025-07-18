import { useState } from "react";
import { View } from "react-native";
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

export default function App() {
  // No default target, null means no place chosen
  const [target, setTarget] = useState<LocationType | null>(null);
  const { longitude, latitude, error } = useLatLong();
  const { heading, error: headingError } = useHeading();

  let bearing = null;
  let arrowRotation = 0;
  if (
    target &&
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    typeof heading === "number"
  ) {
    bearing = calculateBearing(latitude, longitude, target.latitude, target.longitude);
    // The arrow should rotate by the difference between bearing and heading
    arrowRotation = bearing - heading;
  } else if (typeof heading === "number") {
    // No target: arrow points straight ahead (0 deg relative to device)
    arrowRotation = 0;
  }

  return (
    <View style={styles.container}>
      <LocationPicker selected={target} onSelect={setTarget} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
        <Arrow rotation={arrowRotation} />
      </View>
    </View>
  );
}
