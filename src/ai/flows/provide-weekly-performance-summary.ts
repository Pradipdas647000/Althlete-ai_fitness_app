'use server';
/**
 * @fileOverview A Genkit flow for generating a weekly performance summary for AIthlete users.
 *
 * - provideWeeklyPerformanceSummary - A function that handles the generation of the weekly performance summary.
 * - ProvideWeeklyPerformanceSummaryInput - The input type for the provideWeeklyPerformanceSummary function.
 * - ProvideWeeklyPerformanceSummaryOutput - The return type for the provideWeeklyPerformanceSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WeeklyWorkoutSessionSchema = z.object({
  date: z.string().describe('The date of the workout session in YYYY-MM-DD format.'),
  workoutName: z.string().describe('The name of the workout performed (e.g., "Leg Day", "Full Body Strength").'),
  durationMinutes: z.number().describe('The duration of the workout session in minutes.'),
  exercises: z.array(z.string().describe('A list of exercises performed, including sets, reps, and weight. e.g., "Bench Press: 3 sets of 8 reps @ 100kg"')),
  caloriesBurned: z.number().optional().describe('Optional: Calories burned during the workout session.'),
});

const ProvideWeeklyPerformanceSummaryInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting the summary.'),
  weeklyWorkoutData: z.array(WeeklyWorkoutSessionSchema).describe('An array of workout sessions performed during the week.'),
  userGoals: z.string().optional().describe('Optional: User\'s overall fitness goals (e.g., "gain muscle", "lose weight", "improve endurance").'),
  previousWeekSummary: z.string().optional().describe('Optional: Summary of the previous week\'s performance for continuity.'),
});
export type ProvideWeeklyPerformanceSummaryInput = z.infer<typeof ProvideWeeklyPerformanceSummaryInputSchema>;

const ProvideWeeklyPerformanceSummaryOutputSchema = z.object({
  summary: z.string().describe('An AI-generated summary of the weekly workout performance, highlighting progress, trends, and suggestions for improvement or focus for the upcoming week.'),
});
export type ProvideWeeklyPerformanceSummaryOutput = z.infer<typeof ProvideWeeklyPerformanceSummaryOutputSchema>;

export async function provideWeeklyPerformanceSummary(input: ProvideWeeklyPerformanceSummaryInput): Promise<ProvideWeeklyPerformanceSummaryOutput> {
  return provideWeeklyPerformanceSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weeklyPerformanceSummaryPrompt',
  input: { schema: ProvideWeeklyPerformanceSummaryInputSchema },
  output: { schema: ProvideWeeklyPerformanceSummaryOutputSchema },
  prompt: `You are an AIthlete fitness coach, dedicated to helping users achieve their fitness goals.
Analyze the provided weekly workout data to generate a personalized performance summary.
Your summary should be encouraging, insightful, and actionable.

Here's the user's weekly workout data:
{{#if weeklyWorkoutData}}
  {{#each weeklyWorkoutData}}
    - Date: {{{date}}}
    - Workout Name: {{{workoutName}}}
    - Duration: {{{durationMinutes}}} minutes
    - Exercises:
      {{#each exercises}}
        -- {{{this}}}
      {{/each}}
    {{#if caloriesBurned}}
      - Calories Burned: {{{caloriesBurned}}}
    {{/if}}
  {{/each}}
{{else}}
  No workout data provided for the week.
{{/if}}

{{#if userGoals}}
The user's primary fitness goals are: "{{{userGoals}}}".
{{/if}}

{{#if previousWeekSummary}}
Last week's summary: "{{{previousWeekSummary}}}".
{{/if}}

Based on this information, please provide a comprehensive weekly performance summary.
The summary should:
1.  **Highlight Progress**: Point out any improvements, personal bests, or consistent efforts.
2.  **Identify Trends**: Describe patterns in their workouts (e.g., consistency, focus on certain muscle groups, recovery habits).
3.  **Suggest Areas for Improvement**: Gently recommend specific areas where they could improve or diversify their routine.
4.  **Recommend Focus for the Upcoming Week**: Provide clear, actionable advice for the next week's training, aligning with their goals if provided.

Structure your response as a motivational narrative.
`,
});

const provideWeeklyPerformanceSummaryFlow = ai.defineFlow(
  {
    name: 'provideWeeklyPerformanceSummaryFlow',
    inputSchema: ProvideWeeklyPerformanceSummaryInputSchema,
    outputSchema: ProvideWeeklyPerformanceSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
