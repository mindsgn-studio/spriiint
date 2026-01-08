export type ExerciseStructure = {
  sets: number;
  reps_per_set: number;
  rest_seconds: number;
};

export type Exercise = {
  name: string;
  total_reps: number;
  structure: ExerciseStructure;
};

export type WorkoutDay = {
  day: number;
  status: "active" | "rest";
  exercises: Exercise[];
  note?: string;
  phase?: string;
};

const PHASES = [
  {
    name: "Phase 1: Foundation",
    description: "Building tendon strength and habit formation.",
    range: [1, 30],
    pushup: ["Wall Pushups", "Incline Pushups", "Knee Pushups"],
    squat: ["Box Squats", "Air Squats"],
  },
  {
    name: "Phase 2: Strength",
    description: "Standard variations and increased density.",
    range: [31, 60],
    pushup: ["Standard Pushups", "Wide Grip Pushups"],
    squat: ["Sumo Squats", "Walking Lunges"],
  },
  {
    name: "Phase 3: Performance",
    description: "Explosive power and advanced unilateral work.",
    range: [61, 90],
    pushup: ["Diamond Pushups", "Archer Pushups (Assisted)", "Decline Pushups"],
    squat: ["Jump Squats", "Bulgarian Split Squats"],
  },
];

const getPhase = (day: number) => {
  if (day <= 30) return PHASES[0];
  if (day <= 60) return PHASES[1];
  return PHASES[2];
};

const generateWorkoutForDay = (day: number): WorkoutDay => {
  // Day 0 or negative
  if (day < 1) {
    return {
      day,
      status: "active",
      phase: "Onboarding",
      exercises: [
        {
          name: "Wall Pushups (Assessment)",
          total_reps: 50,
          structure: { sets: 5, reps_per_set: 10, rest_seconds: 60 },
        },
        {
          name: "Box Squats (Assessment)",
          total_reps: 50,
          structure: { sets: 5, reps_per_set: 10, rest_seconds: 60 },
        },
      ],
      note: "Welcome! Let's start slow to check your form.",
    };
  }

  const phase = getPhase(day);
  // Cycle: 1=Mod, 2=Hard, 3=Recovery, 4=Mod, 5=Peak, 6=Rest, 7=Rest (0 in mod)
  const cycleDay = day % 7;

  let status: "active" | "rest" = "active";
  let exercises: Exercise[] = [];
  let note = "";

  if (cycleDay === 6 || cycleDay === 0) {
    // Weekend Rest (Day 6 and 7 in a 1-based week logic usually land on 6,0 mod)
    status = "rest";
    note = "Active Recovery: Go for a walk or stretch.";
  } else {
    // Pick exercises based on Phase
    // Simple logic to rotate variations within the phase
    const pushupName = phase.pushup[day % phase.pushup.length];
    const squatName = phase.squat[day % phase.squat.length];

    let structure: ExerciseStructure = {
      sets: 10,
      reps_per_set: 10,
      rest_seconds: 60,
    };
    let intensityLabel = "";

    switch (cycleDay) {
      case 1: // Monday
        intensityLabel = "(Moderate)";
        structure = { sets: 5, reps_per_set: 20, rest_seconds: 90 }; // Higher reps per set, longer rest
        break;
      case 2: // Tuesday
        intensityLabel = "(Hard)";
        structure = { sets: 10, reps_per_set: 10, rest_seconds: 45 }; // Dense, short rest
        break;
      case 3: // Wednesday
        intensityLabel = "(Recovery)";
        // Easier variation for recovery if possible, or just lighter volume structure
        structure = { sets: 4, reps_per_set: 25, rest_seconds: 60 };
        break;
      case 4: // Thursday
        intensityLabel = "(Moderate)";
        structure = { sets: 5, reps_per_set: 20, rest_seconds: 60 };
        break;
      case 5: // Friday
        intensityLabel = "(Peak Challenge)";
        structure = { sets: 10, reps_per_set: 10, rest_seconds: 30 }; // Very short rest, cardio intensive
        break;
    }

    exercises = [
      {
        name: `${pushupName}`, //`${pushupName} ${intensityLabel}`,
        total_reps: 100,
        structure,
      },
      {
        name: `${squatName}`,
        total_reps: 100,
        structure,
      },
    ];
  }

  // Special case for Phase transitions
  if (day === 31 || day === 61) {
    note = `Welcome to ${phase.name}! Intensity is increasing.`;
  }

  return {
    day,
    status,
    phase: phase.name,
    exercises,
    note,
  };
};

// Generate 90 days of workouts
const generateProgram = () => {
  const program: WorkoutDay[] = [];
  for (let i = 0; i <= 90; i++) {
    program.push(generateWorkoutForDay(i));
  }
  return program;
};

export const workouts = generateProgram();

// Helper to get workout safely for any day (even beyond 90)
export const getWorkout = (day: number): WorkoutDay => {
  if (day <= 90) {
    return workouts[day] || workouts[0];
  }
  // For days beyond 90, just maintain Phase 3 logic forever
  return generateWorkoutForDay(day);
};
