"use client";

import React from "react";

export default function CardsShowcasePage() {
  return (
    <div className="page-container nebula-background min-h-screen">
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 py-8">
        <h1 className="text-4xl font-light mb-8 text-center">
          <span className="gradient-text">Cards Showcase</span>
        </h1>
        <p className="text-vybe-gray-300 text-lg mb-8 text-center">
          Component showcase temporarily unavailable during development.
        </p>
        <div className="text-center">
          <a href="/apps" className="btn btn-primary-orange">
            Browse Apps
          </a>
        </div>
      </div>
    </div>
  );
}