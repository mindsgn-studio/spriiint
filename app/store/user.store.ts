import { create } from "zustand";
import { db } from "../db/client";
import { completions } from "@/db/schema";
import { format } from "date-fns";
import { getWorkout, WorkoutDay } from "@/constants/workouts";

interface StoreState {
  dayIndex: number;
  currentWorkout: WorkoutDay | null;
  todayCompleted: boolean;

  // Progress Tracking
  currentExerciseIndex: number;
  currentSetIndex: number;
  isResting: boolean;

  loadTodayStatus: () => Promise<void>;
  completeSet: () => void;
  skipRest: () => void;
  completeToday: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  dayIndex: 1,
  currentWorkout: null,
  todayCompleted: false,

  currentExerciseIndex: 0,
  currentSetIndex: 0,
  isResting: false,

  loadTodayStatus: async () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const allCompletions = db.select().from(completions).all();
    const completedCount = allCompletions.length;

    const todayEntry = allCompletions.find((c) => c.date === today);
    const hasCompletedToday = !!todayEntry;

    // If we have completed today, show the current day (count).
    // If we haven't, show the next day (count + 1).
    const currentDayIndex = hasCompletedToday
      ? completedCount
      : completedCount + 1;

    const workout = getWorkout(currentDayIndex);

    set({
      todayCompleted: hasCompletedToday,
      dayIndex: currentDayIndex,
      currentWorkout: workout,
      // Reset progress
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      isResting: false,
    });
  },

  completeSet: () => {
    const {
      currentWorkout,
      currentExerciseIndex,
      currentSetIndex,
      completeToday,
    } = get();
    if (!currentWorkout) return;

    // If it's a rest day, just complete it
    if (currentWorkout.status === "rest") {
      completeToday();
      return;
    }

    const currentExercise = currentWorkout.exercises[currentExerciseIndex];
    const totalSets = currentExercise.structure.sets;
    const totalExercises = currentWorkout.exercises.length;

    // Check if this was the last set of the exercise
    const isLastSetOfExercise = currentSetIndex + 1 >= totalSets;
    // Check if this was the last exercise of the workout
    const isLastExercise = currentExerciseIndex + 1 >= totalExercises;

    if (isLastSetOfExercise && isLastExercise) {
      // Workout Complete!
      completeToday();
    } else {
      // Go to Rest Mode
      set({ isResting: true });
    }
  },

  skipRest: () => {
    const { currentWorkout, currentExerciseIndex, currentSetIndex } = get();
    if (!currentWorkout) return;

    const currentExercise = currentWorkout.exercises[currentExerciseIndex];
    const totalSets = currentExercise.structure.sets;

    if (currentSetIndex + 1 < totalSets) {
      // Move to next set of same exercise
      set({
        currentSetIndex: currentSetIndex + 1,
        isResting: false,
      });
    } else {
      // Move to next exercise, first set
      set({
        currentExerciseIndex: currentExerciseIndex + 1,
        currentSetIndex: 0,
        isResting: false,
      });
    }
  },

  completeToday: async () => {
    const { currentWorkout, todayCompleted } = get();
    if (todayCompleted || !currentWorkout) return;

    const today = format(new Date(), "yyyy-MM-dd");

    // Handle Rest Days or Active Days for DB recording
    const isRest = currentWorkout.status === "rest";
    // Use the first exercise for the DB record (as "primary" movement), or defaults for rest
    const primaryExercise = currentWorkout.exercises[0];

    const pushups = isRest ? 0 : primaryExercise?.total_reps || 0;
    const variation = isRest
      ? "Rest Day"
      : primaryExercise?.name || "Unknown Variation";

    db.insert(completions)
      .values({
        date: today,
        pushups,
        variation,
        completedAt: new Date().toISOString(),
      })
      .run();

    set({ todayCompleted: true, isResting: false });
  },
}));
