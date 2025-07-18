// Custom hook to get device heading (compass direction)
export function useHeading() {
	const [heading, setHeading] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let subscription: Location.LocationSubscription | null = null;
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					throw new Error('Location permission not granted');
				}
				subscription = await Location.watchHeadingAsync((headingData) => {
					setHeading(headingData.trueHeading ?? headingData.magHeading);
				});
			} catch (e: any) {
				setError(e.message || 'Failed to get heading');
			}
		})();
		return () => {
			if (subscription) {
				subscription.remove();
			}
		};
	}, []);

	return { heading, error };
}
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLatLong() {
	const [coords, setCoords] = useState<{ longitude: number; latitude: number } | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let subscription: Location.LocationSubscription | null = null;
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					throw new Error('Location permission not granted');
				}
				subscription = await Location.watchPositionAsync(
					{ distanceInterval: 50 },
					(location) => {
						const { longitude, latitude } = location.coords;
						setCoords({ longitude, latitude });
					}
				);
			} catch (e: any) {
				setError(e.message || 'Failed to get location');
			}
		})();
		return () => {
			if (subscription) {
				subscription.remove();
			}
		};
	}, []);

	return { longitude: coords?.longitude, latitude: coords?.latitude, error };
}
