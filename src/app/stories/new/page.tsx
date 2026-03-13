"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadZone } from "@/components/upload-zone";
import { Sparkles, Upload, Map, Feather, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "upload" | "journey" | "craft";

const STEPS: { id: Step; label: string; icon: React.ReactNode; number: number }[] = [
  { id: "upload", label: "Upload CV", icon: <Upload className="w-4 h-4" />, number: 1 },
  { id: "journey", label: "Journey Canvas", icon: <Map className="w-4 h-4" />, number: 2 },
  { id: "craft", label: "Craft Story", icon: <Feather className="w-4 h-4" />, number: 3 },
];

export default function NewStoryPage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"file" | "paste">("file");

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setUploadError(null);
  };

  const handleContinue = async () => {
    if (inputMode === "file" && !selectedFile) {
      setUploadError("Please select a file to continue.");
      return;
    }
    if (inputMode === "paste" && !cvText.trim()) {
      setUploadError("Please paste your CV text to continue.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      if (inputMode === "file" && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? "Upload failed");
        }
      }

      // Proceed to next step
      setCurrentStep("journey");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              NarrateMe
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center gap-0 mb-12">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all",
                    step.id === currentStep
                      ? "bg-indigo-500/20 border border-indigo-500/40"
                      : idx < currentStepIndex
                      ? "opacity-70"
                      : "opacity-30"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                      step.id === currentStep
                        ? "bg-indigo-500 text-white"
                        : idx < currentStepIndex
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 text-white/40"
                    )}
                  >
                    {idx < currentStepIndex ? "✓" : step.number}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      step.id === currentStep ? "text-white" : "text-white/50"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-2",
                      idx < currentStepIndex ? "bg-emerald-500/50" : "bg-white/10"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload */}
          {currentStep === "upload" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Upload Your CV
                </h1>
                <p className="text-white/50">
                  We&apos;ll extract your experience and career journey to craft
                  your narrative.
                </p>
              </div>

              {/* Input Mode Toggle */}
              <div className="flex gap-1 bg-white/5 border border-white/10 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setInputMode("file")}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                    inputMode === "file"
                      ? "bg-indigo-600 text-white"
                      : "text-white/50 hover:text-white/80"
                  )}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setInputMode("paste")}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                    inputMode === "paste"
                      ? "bg-indigo-600 text-white"
                      : "text-white/50 hover:text-white/80"
                  )}
                >
                  Paste Text
                </button>
              </div>

              {/* File Upload */}
              {inputMode === "file" && (
                <UploadZone onFile={handleFile} />
              )}

              {/* Paste Text */}
              {inputMode === "paste" && (
                <div className="space-y-2">
                  <label className="text-sm text-white/60">
                    Paste your CV / resume text
                  </label>
                  <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    rows={14}
                    placeholder="Paste the full text of your CV here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-colors"
                  />
                  <p className="text-white/30 text-xs">
                    {cvText.length} characters
                  </p>
                </div>
              )}

              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3 rounded-xl">
                  {uploadError}
                </div>
              )}

              <button
                onClick={handleContinue}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing CV...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Journey Canvas (Coming Soon) */}
          {currentStep === "journey" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Journey Canvas
                </h1>
                <p className="text-white/50">
                  Visualize and organize your career milestones.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm px-3 py-1.5 rounded-full mb-4">
                  Coming in Phase 2
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Analyzing your CV...
                </h2>
                <p className="text-white/40 text-sm max-w-sm mx-auto mb-6">
                  The Journey Canvas will let you drag, reorder, and annotate
                  key career milestones before generating your story.
                </p>
                <button
                  onClick={() => setCurrentStep("craft")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  Continue to Story Crafting
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Craft Story (Coming Soon) */}
          {currentStep === "craft" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Craft Your Story
                </h1>
                <p className="text-white/50">
                  Choose your narrative archetype and let AI write your story.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Feather className="w-8 h-8 text-violet-400" />
                </div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm px-3 py-1.5 rounded-full mb-4">
                  Coming in Phase 2
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Archetype Picker
                </h2>
                <p className="text-white/40 text-sm max-w-sm mx-auto mb-2">
                  Soon you&apos;ll choose from 6 narrative archetypes — The Pioneer,
                  The Builder, The Connector, The Expert, The Visionary, or The
                  Transformer.
                </p>
                <p className="text-white/30 text-xs max-w-sm mx-auto mb-6">
                  Claude will craft a tailored narrative in your selected voice
                  tone.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
