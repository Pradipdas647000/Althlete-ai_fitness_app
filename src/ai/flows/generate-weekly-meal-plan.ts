'use server';
/**
 * @fileOverview A Genkit flow for generating personalized weekly meal plans based on user input.
 *
 * - generateWeeklyMealPlan - A function that handles the generation of a weekly meal plan.
 * - GenerateWeeklyMealPlanInput - The input type for the generateWeeklyMealPlan function.
 * - GenerateWeeklyMealPlanOutput - The return type for the generateWeeklyMealPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateWeeklyMealPlanInputSchema = z.object({
  dietaryPreferences: z
    .array(z.string())
    .describe('User\'s dietary preferences (e.g., "vegetarian", "vegan", "paleo", "keto").'),
  allergies: z
    .array(z.string())
    .describe('User\'s allergies to consider (e.g., "gluten", "dairy", "nuts", "shellfish").'),
  calorieTarget: z.number().describe('Daily calorie target for the meal plan.'),
  goal: z
    .string()
    .describe('User\'s fitness goal (e.g., "lose weight", "gain muscle", "maintain weight").'),
  weightKg: z.number().describe('User\'s current weight in kilograms.'),
  heightCm: z.number().describe('User\'s current height in centimeters.'),
  age: z.number().int().min(1).describe('User\'s age in years.'),
  gender: z.enum(['male', 'female']).describe('User\'s gender.'),
  activityLevel: z
    .enum(['sedentary', 'lightly active', 'moderately active', 'very active', 'extremely active'])
    .describe('User\'s physical activity level.'),
});
export type GenerateWeeklyMealPlanInput = z.infer<typeof GenerateWeeklyMealPlanInputSchema>;

const MealSchema = z.object({
  name: z.string().describe('Meal name (e.g., "Breakfast", "Lunch", "Dinner", "Snack").'),
  description: z
    .string()
    .describe('Detailed description of the meal, including ingredients and preparation instructions.'),
  calories: z.number().describe('Estimated calorie count for the meal.'),
  proteinGrams: z.number().describe('Estimated protein in grams.'),
  fatGrams: z.number().describe('Estimated fat in grams.'),
  carbGrams: z.number().describe('Estimated carbohydrates in grams.'),
});

const DailyPlanSchema = z.object({
  day: z.string().describe('Day of the week (e.g., "Monday").'),
  meals: z.array(MealSchema).describe('List of meals for the day.'),
});

const GenerateWeeklyMealPlanOutputSchema = z.object({
  mealPlan: z.array(DailyPlanSchema).describe('A personalized weekly meal plan.'),
});
export type GenerateWeeklyMealPlanOutput = z.infer<typeof GenerateWeeklyMealPlanOutputSchema>;

export async function generateWeeklyMealPlan(
  input: GenerateWeeklyMealPlanInput
): Promise<GenerateWeeklyMealPlanOutput> {
  return generateWeeklyMealPlanFlow(input);
}

const generateWeeklyMealPlanPrompt = ai.definePrompt({
  name: 'generateWeeklyMealPlanPrompt',
  input: { schema: GenerateWeeklyMealPlanInputSchema },
  output: { schema: GenerateWeeklyMealPlanOutputSchema },
  prompt: `You are an expert nutritionist and meal planner. Your task is to generate a personalized and balanced 7-day weekly meal plan based on the user's provided information.

User Profile:
- Dietary Preferences: {{{dietaryPreferences}}}
- Allergies: {{{allergies}}}
- Daily Calorie Target: {{{calorieTarget}}} kcal
- Fitness Goal: {{{goal}}}
- Current Weight: {{{weightKg}}} kg
- Current Height: {{{heightCm}}} cm
- Age: {{{age}}} years
- Gender: {{{gender}}}
- Activity Level: {{{activityLevel}}}

Strictly adhere to the user's dietary preferences and avoid all specified allergens. Ensure the total daily calorie intake for each day is close to the calorie target. The meal plan should be balanced in terms of macronutrients (protein, fat, carbohydrates) to support the user's fitness goal. Provide clear descriptions for each meal, including main ingredients and simple preparation notes.

Generate the output in JSON format as defined by the output schema, with a \"mealPlan\" array containing 7 daily plans.`,
});

const generateWeeklyMealPlanFlow = ai.defineFlow(
  {
    name: 'generateWeeklyMealPlanFlow',
    inputSchema: GenerateWeeklyMealPlanInputSchema,
    outputSchema: GenerateWeeklyMealPlanOutputSchema,
  },
  async (input) => {
    const { output } = await generateWeeklyMealPlanPrompt(input);
    return output!;
  }
);
