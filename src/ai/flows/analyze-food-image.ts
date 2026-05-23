'use server';
/**
 * @fileOverview A Genkit flow for analyzing food images to determine nutritional content and dietary suitability.
 *
 * - analyzeFoodImage - A function that handles the food image analysis process.
 * - AnalyzeFoodImageInput - The input type for the analyzeFoodImage function.
 * - AnalyzeFoodImageOutput - The return type for the analyzeFoodImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeFoodImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of food, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userGoal: z.string().optional().describe("The user's fitness goal to help tailor the advice."),
});
export type AnalyzeFoodImageInput = z.infer<typeof AnalyzeFoodImageInputSchema>;

const AnalyzeFoodImageOutputSchema = z.object({
  foodName: z.string().describe('The name of the identified food.'),
  nutrition: z.object({
    calories: z.number().describe('Estimated total calories.'),
    proteinGrams: z.number().describe('Estimated protein in grams.'),
    fatGrams: z.number().describe('Estimated fat in grams.'),
    carbGrams: z.number().describe('Estimated carbohydrates in grams.'),
  }),
  assessment: z.object({
    rating: z.enum(['excellent', 'good', 'neutral', 'poor']).describe('A rating of how good this food is for the user\'s diet.'),
    verdict: z.string().describe('A short verdict (e.g., "Good for muscle gain").'),
    reasoning: z.string().describe('The detailed reasoning for the assessment based on the nutritional content and user goals.'),
  }),
});
export type AnalyzeFoodImageOutput = z.infer<typeof AnalyzeFoodImageOutputSchema>;

export async function analyzeFoodImage(input: AnalyzeFoodImageInput): Promise<AnalyzeFoodImageOutput> {
  return analyzeFoodImageFlow(input);
}

const analyzeFoodPrompt = ai.definePrompt({
  name: 'analyzeFoodPrompt',
  input: { schema: AnalyzeFoodImageInputSchema },
  output: { schema: AnalyzeFoodImageOutputSchema },
  prompt: `You are an expert nutritionist. Analyze the provided image of food.
  
Identify the food and estimate its nutritional content (calories, protein, carbs, fats).

Then, provide a dietary assessment. Consider the user's goal if provided: "{{{userGoal}}}".
Determine if this food is "excellent", "good", "neutral", or "poor" for their diet and explain why.

Image: {{media url=photoDataUri}}`,
});

const analyzeFoodImageFlow = ai.defineFlow(
  {
    name: 'analyzeFoodImageFlow',
    inputSchema: AnalyzeFoodImageInputSchema,
    outputSchema: AnalyzeFoodImageOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeFoodPrompt(input);
    if (!output) {
      throw new Error('Failed to analyze food image.');
    }
    return output;
  }
);
