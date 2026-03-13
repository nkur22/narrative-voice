export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { Sparkles, Upload, BookOpen, Share2, Mic, Film } from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              NarrateMe
            </span>
          </div>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button className="text-sm text-white/60 hover:text-white transition-colors">
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/dashboard" });
                }}
              >
                <button className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Narrative Identity Platform
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
              Discover. Script.
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-white bg-clip-text text-transparent">
              Share Your Story.
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Turn your CV into a compelling career narrative. NarrateMe uses AI
            to craft your unique story — complete with voice, video, and a
            shareable profile that opens doors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stories/new"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              Start My Story →
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From CV to Story in Minutes
            </h2>
            <p className="text-white/50 text-lg">
              Three simple steps to your professional narrative
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Upload className="w-6 h-6" />,
                title: "Upload Your CV",
                description:
                  "Drop your PDF or DOCX file. Our AI extracts your experience, skills, and career journey automatically.",
                color: "from-blue-500/20 to-indigo-500/20",
                border: "border-blue-500/30",
              },
              {
                step: "02",
                icon: <BookOpen className="w-6 h-6" />,
                title: "Generate Your Story",
                description:
                  "Choose your narrative archetype and voice tone. Claude AI crafts your compelling personal story.",
                color: "from-indigo-500/20 to-violet-500/20",
                border: "border-indigo-500/30",
              },
              {
                step: "03",
                icon: <Share2 className="w-6 h-6" />,
                title: "Share with Impact",
                description:
                  "Export as video with AI voiceover, share a live link, or post directly to LinkedIn.",
                color: "from-violet-500/20 to-purple-500/20",
                border: "border-violet-500/30",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`relative bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-6 backdrop-blur-sm`}
              >
                <div className="text-5xl font-bold text-white/10 absolute top-4 right-6">
                  {item.step}
                </div>
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-indigo-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Stand Out
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
                title: "Journey Canvas",
                description:
                  "An interactive timeline of your career milestones. Drag, reorder, and annotate key moments that shaped your path.",
                tag: "Interactive",
              },
              {
                icon: <Sparkles className="w-5 h-5 text-violet-400" />,
                title: "AI Story Generation",
                description:
                  "Choose from 6 narrative archetypes — The Pioneer, The Builder, The Connector, and more. Claude crafts your story in your unique voice.",
                tag: "Powered by Claude",
              },
              {
                icon: <Mic className="w-5 h-5 text-pink-400" />,
                title: "Voice & Audio",
                description:
                  "Google Cloud TTS transforms your narrative into a professional voiceover. Pick your tone, accent, and pacing.",
                tag: "Text-to-Speech",
              },
              {
                icon: <Film className="w-5 h-5 text-emerald-400" />,
                title: "Video Rendering",
                description:
                  "Auto-generate a shareable 60-90 second video with your story, background music, and a beautiful visual template.",
                tag: "Share Anywhere",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">
                        {feature.title}
                      </h3>
                      <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                        {feature.tag}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Story is Waiting
          </h2>
          <p className="text-white/50 text-lg mb-8">
            Join professionals who have transformed their career narrative with
            NarrateMe.
          </p>
          <Link
            href="/stories/new"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            Start My Story →
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        <p>© 2026 NarrateMe. All rights reserved.</p>
      </footer>
    </div>
  );
}
