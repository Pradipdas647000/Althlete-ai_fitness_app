'use server';
/**
 * @fileOverview A Genkit flow for generating a personalized week-long workout plan and recovery schedule.
 *
 * - generatePersonalizedWorkoutPlan - A function that handles the workout plan generation process.
 * - GenerateWorkoutPlanInput - The input type for the generatePersonalizedWorkoutPlan function.
 * - GenerateWorkoutPlanOutput - The return type for the generatePersonalizedWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateWorkoutPlanInputSchema = z.object({
  age: z.number().int().positive().describe('The user\'s age in years.'),
  weightKg: z.number().positive().describe('The user\'s weight in kilograms.'),
  heightCm: z.number().positive().describe('The user\'s height in centimeters.'),
  gender: z.enum(['male', 'female', 'other']).describe('The user\'s gender.'),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The user\'s current fitness level.'),
  goals: z.string().min(1).describe('The user\'s fitness goals, e.g., "lose weight", "build muscle", "improve endurance".'),
  availableDaysPerWeek: z.number().int().min(1).max(7).describe('The number of days the user can workout per week.'),
  preferredWorkoutDurationMinutes: z.number().int().positive().describe('The preferred duration for each workout session in minutes.'),
  equipmentAvailable: z.string().min(1).describe('Description of available equipment, e.g., "full gym access", "bodyweight only", "dumbbells and resistance bands".'),
  healthConsiderations: z.string().optional().describe('Any health considerations or limitations, e.g., "knee pain", "back issues".'),
});
export type GenerateWorkoutPlanInput = z.infer<typeof GenerateWorkoutPlanInputSchema>;

// Output Schema
const ExerciseSchema = z.object({
  name: z.string().describe('The name of the exercise.'),
  sets: z.number().int().positive().describe('The number of sets for the exercise.'),
  reps: z.string().describe('The repetition range or duration for the exercise (e.g., "8-12 reps", "30 seconds").'),
  notes: z.string().optional().describe('Additional notes or form cues for the exercise.'),
});

const DayPlanSchema = z.object({
  day: z.string().describe('The day of the week (e.g., "Monday", "Tuesday", "Rest Day").'),
  focus: z.string().optional().describe('The main focus of the workout for the day (e.g., "Legs & Glutes", "Upper Body", "Cardio").'),
  exercises: z.array(ExerciseSchema).optional().describe('A list of exercises for the workout, if it is not a rest day.'),
});

const WorkoutPlanSchema = z.object({
  weekPlan: z.array(DayPlanSchema).length(7).describe('A 7-day workout plan.'),
});

const RecoveryScheduleSchema = z.object({
  recommendations: z.array(z.string()).describe('General recovery recommendations.'),
  activeRecoveryDays: z.array(z.string()).optional().describe('Days designated for active recovery activities.'),
});

const GenerateWorkoutPlanOutputSchema = z.object({
  workoutPlan: WorkoutPlanSchema.describe('A personalized week-long workout plan.'),
  recoverySchedule: RecoveryScheduleSchema.describe('A personalized recovery schedule.'),
});
export type GenerateWorkoutPlanOutput = z.infer<typeof GenerateWorkoutPlanOutputSchema>;

// Exported wrapper function
export async function generatePersonalizedWorkoutPlan(input: GenerateWorkoutPlanInput): Promise<GenerateWorkoutPlanOutput> {
  return generatePersonalizedWorkoutPlanFlow(input);
}

// Prompt definition
const workoutPlanPrompt = ai.definePrompt({
  name: 'workoutPlanPrompt',
  input: { schema: GenerateWorkoutPlanInputSchema },
  output: { schema: GenerateWorkoutPlanOutputSchema },
  prompt: `You are an expert fitness coach and personal trainer. Your task is to create a personalized, week-long workout plan and a recovery schedule for a user based on their biometrics, fitness level, and goals.\n\nHere are the user's details:\n- Age: {{{age}}} years old\n- Weight: {{{weightKg}}} kg\n- Height: {{{heightCm}}} cm\n- Gender: {{{gender}}}\n- Fitness Level: {{{fitnessLevel}}}\n- Goals: {{{goals}}}\n- Available Days per Week for Workout: {{{availableDaysPerWeek}}} days\n- Preferred Workout Duration: {{{preferredWorkoutDurationMinutes}}} minutes per session\n- Equipment Available: {{{equipmentAvailable}}}\n{{#if healthConsiderations}}- Health Considerations: {{{healthConsiderations}}}{{/if}}\n\nPlease create a detailed 7-day workout plan. For each workout day, specify the focus (e.g., "Legs & Glutes", "Upper Body", "Cardio", "Full Body", "Rest Day") and a list of exercises with sets, reps/duration, and any important notes. Ensure the plan includes an appropriate number of rest days given the available days for workout.\n\nAlso, provide a recovery schedule including general recommendations and specify any active recovery days.\n\nThe output MUST be a JSON object conforming to the GenerateWorkoutPlanOutputSchema.`,
});

// Flow definition
const generatePersonalizedWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedWorkoutPlanFlow',
    inputSchema: GenerateWorkoutPlanInputSchema,
    outputSchema: GenerateWorkoutPlanOutputSchema,
  },
  async (input) => {
    const { output } = await workoutPlanPrompt(input);
    if (!output) {
      throw new Error('Failed to generate workout plan.');
    }
    return output;
  }
);
