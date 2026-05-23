
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

## 🌍 Vercel Deployment

Deploying AIthlete to Vercel is straightforward:

1. **Push to GitHub**: Push your local repository to a new GitHub repository.
2. **Import to Vercel**: Go to [vercel.com/new](https://vercel.com/new) and import your project.
3. **CRITICAL: Configure Environment Variables**:
   In the Vercel project settings, add the following environment variable:
   - `GOOGLE_GENAI_API_KEY`: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/).
   *Note: Ensure the name is exactly `GOOGLE_GENAI_API_KEY`.*
4. **Deploy**: Click "Deploy".

## 🛡️ Security & Privacy

AIthlete leverages Firebase Security Rules to ensure all biometric and training data is isolated per user. Only you have access to your personal lab.

---
Built for those who demand precision. ⚡
