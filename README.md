# AIthlete | AI-Powered Peak Performance

AIthlete is a next-generation fitness ecosystem designed to optimize human performance through precision-engineered training, nutrition, and biological data analysis. Powered by **Google Genkit** and **Firebase**, it provides a hyper-personalized coaching experience.

## 🚀 Key Features

- **AI Fitness Architect**: Generate 7-day workout and recovery protocols tailored to your biometrics and goals.
- **AI Vision Food Scanner**: Upload meal photos for instant nutritional breakdown (calories, macros) and dietary suitability assessment.
- **Precision Nutrition**: Personalized weekly meal planning that respects dietary restrictions and caloric targets.
- **Performance Analytics Lab**: High-fidelity tracking of training volume, consistency metrics, and biometric trends.
- **AI Performance Recaps**: Natural language summaries of your weekly progress, highlighting trends and suggesting optimizations.
- **Training Lab**: Design, manage, and execute custom workout routines with real-time Firestore synchronization.
- **Founder Admin Terminal**: System-wide health monitoring, MRR growth tracking, and user management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Google Genkit](https://github.com/firebase/genkit) (Gemini 2.5 Flash)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore & Firebase Auth)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🌍 Vercel Deployment

Deploying AIthlete to Vercel is straightforward:

1. **Push to GitHub**: Push your local repository to a new GitHub repository.
2. **Import to Vercel**: Go to [vercel.com/new](https://vercel.com/new) and import your project.
3. **Configure Environment Variables**:
   In the Vercel project settings, add the following environment variable:
   - `GOOGLE_GENAI_API_KEY`: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/).
4. **Deploy**: Click "Deploy". Vercel will automatically detect Next.js and build your app.

## 🧪 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   Ensure your Firebase credentials are set in `src/firebase/config.ts`. Enable **Email/Password** and **Google** sign-in providers in the Firebase Console.

3. **Set Environment Variables**:
   Create a `.env` file based on `.env.example` and add your `GOOGLE_GENAI_API_KEY`.

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Run Genkit Dev UI**:
   ```bash
   npm run genkit:dev
   ```

## 🛡️ Security & Privacy

AIthlete leverages Firebase Security Rules to ensure all biometric and training data is isolated per user. Only you have access to your personal lab, while the Admin Panel provides high-level system metrics without compromising individual privacy.

---
Built for those who demand precision. ⚡
