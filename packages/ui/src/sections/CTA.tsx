import React from "react";

export function CTA() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Call to Action</h2>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          Encourage users to engage with a clear CTA.
        </p>
        <button className="mt-6 rounded-lg bg-brand text-white px-6 py-3 font-semibold">
          Sign Up
        </button>
      </div>
    </section>
  );
}
