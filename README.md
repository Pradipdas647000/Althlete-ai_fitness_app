
# AIthlete | AI-Powered Peak Performance

AIthlete is a next-generation fitness ecosystem designed to optimize human performance through precision-engineered training, nutrition, and biological data analysis. Powered by **Google Genkit** and **Firebase**, it provides a hyper-personalized coaching experience.

## 🚀 Key Features

- **AI Fitness Architect**: Generate 7-day workout and recovery protocols tailored to your biometrics and goals.
- **AI Vision Food Scanner**: Upload meal photos for instant nutritional breakdown (calories, macros) and dietary suitability assessment.
- **Precision Nutrition**: Personalized weekly meal planning that respects dietary restrictions and caloric targets.
- **Performance Analytics Lab**: High-fidelity tracking of training volume, consistency metrics, and biometric trends.
- **Training Lab**: Design, manage, and execute custom workout routines with real-time Firestore synchronization.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Google Genkit](https://github.com/firebase/genkit) (Gemini 2.5 Flash)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore & Firebase Auth)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## ⚠️ CRITICAL: Enabling AI Features

For the AI Coach, Food Scanner, and Performance Summaries to work, you **must** configure your Google Gemini API Key.

### 1. Obtain an API Key
Get your free API key from the [Google AI Studio](https://aistudio.google.com/).

### 2. Configure Environment Variables
- **Local Development**: Create a `.env` file in the root directory and add:
  ```env
  GOOGLE_GENAI_API_KEY=your_api_key_here
  ```
- **Vercel Deployment**: Add the environment variable in your Vercel Project Settings.

## 🌍 Vercel Deployment Guide

1. **Push to GitHub**: Push your local repository to a new GitHub repository.
2. **Import to Vercel**: Go to [vercel.com/new](https://vercel.com/new) and import your project.
3. **Configure Environment Variables**:
   In the Vercel project settings, you **MUST** add:
   - `GOOGLE_GENAI_API_KEY`: Your Gemini API key.
   *Note: If this key is missing or incorrect, all AI features will fail.*
4. **Increase Timeouts**:
   Since AI processing can take time, the project is configured to use a 2-minute timeout for Server Actions. Ensure your Vercel plan supports this or monitor for "Function Timeout" errors.
5. **Deploy**: Click "Deploy".

## 🛡️ Security & Privacy

AIthlete leverages Firebase Security Rules to ensure all biometric and training data is isolated per user. Only you have access to your personal lab.

---
Built for those who demand precision. ⚡
