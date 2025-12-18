import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useStore } from "@/store/user.store";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState } from "react";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.7;

export default function HomeScreen() {
  const {
    currentDay,
    todayCompleted,
    currentVariation,
    completeToday,
    loadTodayStatus,
  } = useStore();
  const translateX = useSharedValue(0);

  const logWorkout = async () => {
    try {
      const now = new Date();
      const startDate = new Date(now.getTime() - 5 * 60 * 1000);

      /*  await AppleHealthKit.saveWorkoutAsync({
        workoutActivityType:
          AppleHealthKit.WorkoutActivityType.TRADITIONAL_STRENGTH_TRAINING,

      });
      */

      console.log({
        startDate,
        endDate: now,
        totalEnergyBurned: currentDay * 0.5,
        totalEnergyBurnedUnit: "kcal",
      });
    } catch (error) {
      console.log("Failed to log workout:", error);
    }
  };

  const handleComplete = async () => {
    await completeToday(currentDay, currentVariation);
    await logWorkout();
    await loadTodayStatus();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (todayCompleted) return;
      translateX.value = Math.max(0, Math.min(e.translationX, SWIPE_THRESHOLD));
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SWIPE_THRESHOLD);
        runOnJS(handleComplete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    opacity: todayCompleted ? 0.3 : 1,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>DAY {currentDay}</Text>
        <Text style={styles.number}>{currentDay}</Text>
        <Text style={styles.variation}>{currentVariation} Push-ups</Text>
      </View>

      {todayCompleted ? (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>✓ Completed</Text>
          <Text style={styles.completedSubtext}>See you tomorrow</Text>
        </View>
      ) : (
        <GestureDetector gesture={panGesture}>
          <View style={styles.sliderContainer}>
            <Animated.View style={[styles.track, trackStyle]}>
              <Text style={styles.trackText}>Swipe to complete →</Text>
            </Animated.View>
            <Animated.View style={[styles.thumb, animatedStyle]}>
              <Text style={styles.thumbText}>→</Text>
            </Animated.View>
          </View>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    paddingTop: 120,
    paddingBottom: 60,
  },
  content: {
    alignItems: "center",
  },
  label: {
    color: "#666",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 20,
  },
  number: {
    color: "#fff",
    fontSize: 120,
    fontWeight: "200",
    marginBottom: 10,
  },
  variation: {
    color: "#999",
    fontSize: 18,
  },
  completedContainer: {
    alignItems: "center",
    padding: 40,
  },
  completedText: {
    color: "#4ade80",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 8,
  },
  completedSubtext: {
    color: "#666",
    fontSize: 16,
  },
  sliderContainer: {
    marginHorizontal: 20,
    height: 70,
    position: "relative",
  },
  track: {
    height: 70,
    backgroundColor: "#1a1a1a",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  trackText: {
    color: "#666",
    fontSize: 16,
  },
  thumb: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbText: {
    fontSize: 24,
  },
});
