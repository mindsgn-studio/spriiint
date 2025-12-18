import { create } from "zustand";
import { db } from "../db/client";
import { completions } from "../db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

interface StoreState {
  currentDay: number;
  todayCompleted: boolean;
  currentVariation: string;
  loadTodayStatus: () => Promise<void>;
  completeToday: (pushups: number, variation: string) => Promise<void>;
}

const VARIATIONS = [
  "Standard",
  "Wide",
  "Diamond",
  "Decline",
  "Incline",
  "Close Grip",
];

export const useStore = create<StoreState>((set, get) => ({
  currentDay: 1,
  todayCompleted: false,
  currentVariation: "Standard",
  loadTodayStatus: async () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const allCompletions = db.select().from(completions).all();
    const todayCompletion = allCompletions.find((c) => c.date === today);

    if (todayCompletion) {
      set({
        todayCompleted: true,
        currentDay: todayCompletion.pushups,
        currentVariation: todayCompletion.variation,
      });
    } else {
      const day = allCompletions.length + 1;
      const variation = VARIATIONS[(day - 1) % VARIATIONS.length];
      set({
        todayCompleted: false,
        currentDay: day,
        currentVariation: variation,
      });
    }
  },
  completeToday: async (pushups: number, variation: string) => {
    const today = format(new Date(), "yyyy-MM-dd");

    db.insert(completions)
      .values({
        date: today,
        pushups,
        variation,
        completedAt: new Date().toISOString(),
      })
      .run();

    set({ todayCompleted: true });
  },
}));
