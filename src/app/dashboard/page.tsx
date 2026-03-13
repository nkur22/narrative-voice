export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { Sparkles, Plus, BookOpen, Clock, Share2 } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

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
            <div className="flex items-center gap-2">
              {session.user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
              )}
              <span className="text-sm text-white/70">
                {session.user.name ?? session.user.email}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                My Stories
              </h1>
              <p className="text-white/50">
                Your narrative library — all your stories in one place.
              </p>
            </div>
            <Link
              href="/stories/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              New Story
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Stories Created", value: "0", icon: <BookOpen className="w-4 h-4" /> },
              { label: "Total Views", value: "0", icon: <Share2 className="w-4 h-4" /> },
              { label: "Hours Saved", value: "0", icon: <Clock className="w-4 h-4" /> },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No stories yet
            </h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">
              Upload your CV and let AI craft your unique career narrative.
              Your story is ready to be told.
            </p>
            <Link
              href="/stories/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Create Your First Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
