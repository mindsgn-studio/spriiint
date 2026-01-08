import {
  HKWorkoutActivityType,
  HKWorkoutTypeIdentifier,
  useHealthkitAuthorization,
  saveWorkout as hkSaveWorkout,
} from "@kingstinct/react-native-healthkit";

const permissions = [HKWorkoutTypeIdentifier];

export function useHealthKit() {
  const [authorizationStatus, requestAuthorization] =
    useHealthkitAuthorization(permissions);

  const saveWorkout = async (
    startDate: Date,
    endDate: Date,
    calories: number,
  ) => {
    // If we don't have permission, we can't save.
    // However, sometimes status might be 'notDetermined' or similar.
    // It's often better to try and let the OS handle the error,
    // but checking status is good practice.
    if (authorizationStatus !== "sharingAuthorized") {
      console.warn("HealthKit permission not granted or undetermined");
      // You might want to return false here, or try anyway depending on the flow
    }

    try {
      await hkSaveWorkout({
        activityType: HKWorkoutActivityType.traditionalStrengthTraining,
        startDate,
        endDate,
        energyBurned: calories,
        energyBurnedUnit: "kcal",
      });
      return true;
    } catch (error) {
      console.error("Failed to save workout to HealthKit:", error);
      return false;
    }
  };

  return {
    isAuthorized: authorizationStatus === "sharingAuthorized",
    status: authorizationStatus,
    requestAuthorization,
    saveWorkout,
  };
}
