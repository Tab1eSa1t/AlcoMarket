

// Global styles for the app
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  // Main app container
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },

  // LocationPicker styles
  locationPickerContainer: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  locationPickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#252525ff",
    marginHorizontal: 4,
  },
  locationPickerSelected: {
    backgroundColor: "#007AFF",
  },
  locationPickerText: {
    color: "#ffffffff",
    fontWeight: "bold",
  },

  // Arrow and distance display styles (used in index.tsx)
  arrowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  distanceText: {
      marginTop: 30,
      fontSize: 36,
      fontWeight: 'bold',
      color: '#25292cff',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      letterSpacing: 1.2,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 12,
      overflow: 'hidden',
    },
});

export default styles;
