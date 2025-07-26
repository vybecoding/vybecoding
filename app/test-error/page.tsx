"use client";

import * as Sentry from "@sentry/nextjs";

export default function TestErrorPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Test Sentry Error Tracking</h1>
      
      <div className="space-y-4">
        <button
          onClick={() => {
            throw new Error("Test client error");
          }}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Throw Client Error
        </button>
        
        <button
          onClick={() => {
            Sentry.captureException(new Error("Test captured exception"));
            alert("Exception sent to Sentry!");
          }}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          Capture Exception
        </button>
        
        <button
          onClick={() => {
            Sentry.captureMessage("Test message from vybecoding", "info");
            alert("Message sent to Sentry!");
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send Test Message
        </button>
      </div>
      
      <p className="mt-8 text-gray-600">
        Click any button to test Sentry error tracking
      </p>
    </div>
  );
}