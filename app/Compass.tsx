import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function Arrow({ rotation = 0, length = 180, width = 30 }) {
  // Reanimated shared value for rotation
  const animatedRotation = useSharedValue(rotation);

  useEffect(() => {
    animatedRotation.value = withSpring(rotation, {
      damping: 15,
      stiffness: 120,
      mass: 0.8,
      overshootClamping: false,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
    });
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${animatedRotation.value}deg` }],
  }));

  return (
    <View
      style={{
        width: length,
        height: length,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          zIndex: 1,
          width: length + 20,
          height: length + 20,
          borderRadius: 100,
          backgroundColor: "#969696ff",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <View
          style={{
            position: 'absolute',
            width: length,
            height: length,
            borderRadius: 100,
            backgroundColor: "#3994d9ff",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        {/* Static center circle: half green, half black */}
        <View
          style={{
            position: 'absolute',
            width: width-10,
            height: width-10,
            borderRadius: 20,
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: width-10,
              height: (width-10)/2,
              backgroundColor: '#969696ff',
            }}
          />
          <View
            style={{
              width: width-10,
              height: (width-10)/2,
              backgroundColor: '#616161ff',
            }}
          />
        </View>

        {/* Animated pointer */}
        <Animated.View
          style={[{
            width: length,
            height: length,
            alignItems: "center",
            justifyContent: "center",
          }, animatedStyle]}
        >
          {/* Upward pointing arrow */}
          {/* Left half of red arrow (darker) */}
          <View
            style={{
              position: "absolute",
              top: length/30,
              left: length / 2 - width / 2, // center left half
              width: 0,
              height: 0,
              borderLeftWidth: width / 2,
              borderRightWidth: 0,
              borderBottomWidth: length / 2.2,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#b70000ff", // darker red
              zIndex: 2,
            }}
          />
          {/* Right half of red arrow (normal) */}
          <View
            style={{
              position: "absolute",
              top: length/30,
              left: length / 2, // center right half
              width: 0,
              height: 0,
              borderLeftWidth: 0,
              borderRightWidth: width / 2,
              borderBottomWidth: length / 2.2,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "red",
              zIndex: 2,
            }}
          />
          {/* Downward pointing arrow - left half (darker) */}
          <View
            style={{
              position: "absolute",
              bottom: length/30,
              left: length / 2 - width / 2, // center left half
              width: 0,
              height: 0,
              borderLeftWidth: width / 2,
              borderRightWidth: 0,
              borderTopWidth: length / 2.2,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "#b0b0b0", // darker white/gray
              zIndex: 2,
            }}
          />
          {/* Downward pointing arrow - right half (white) */}
          <View
            style={{
              position: "absolute",
              bottom: length/30,
              left: length / 2, // center right half
              width: 0,
              height: 0,
              borderLeftWidth: 0,
              borderRightWidth: width / 2,
              borderTopWidth: length / 2.2,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "white",
              zIndex: 2,
            }}
          />
        </Animated.View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: -18,
          width: length + 20,
          height: length + 20,
          borderRadius: 100,
          backgroundColor: "#616161ff",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </View>
  );
}
