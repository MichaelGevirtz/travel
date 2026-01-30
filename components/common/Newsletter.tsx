"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mb-6">
          <Mail className="h-7 w-7" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Get Vietnam Travel Updates
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Monthly updates with new itineraries, destination guides, and hotel
          recommendations. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <CheckCircle className="h-5 w-5" />
            <span>Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                data-cta="primary"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            {status === "error" && (
              <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
            )}
          </form>
        )}

        <p className="mt-6 text-xs text-gray-500">
          By subscribing, you agree to our{" "}
          <a href="/legal/privacy" className="underline hover:text-gray-400">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
}
