'use client';

import { useEffect, useState } from 'react';

export function AnimatedLogo() {
  const [letter, setLetter] = useState('v');

  useEffect(() => {
    // Perfect synchronization with 14s cycle:
    // 0s (0°): V front, Purple at top
    // 3.5s (90°): C side, Pink at top
    // 7s (180°): V back, Orange at top  
    // 10.5s (270°): C side, Purple at top
    // 14s (360°): V front, back to start
    
    const morphLetter = () => {
      // Switch to C at 90° and 270° (when sideways)
      setTimeout(() => {
        setLetter('c');
      }, 3500); // 3.5s - first sideways position
      
      // Switch back to V at 180° (back-facing)
      setTimeout(() => {
        setLetter('v');
      }, 7000); // 7s - back-facing position
      
      // Switch to C again at 270° (second sideways)
      setTimeout(() => {
        setLetter('c');
      }, 10500); // 10.5s - second sideways position
      
      // Switch back to V at 360° (front-facing, cycle complete)
      setTimeout(() => {
        setLetter('v');
      }, 14000); // 14s - back to start
    };
    
    // Start the synchronized morphing cycle
    morphLetter();
    
    // Repeat every 14 seconds to match animation cycle
    const interval = setInterval(morphLetter, 14000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-10 h-10">
      {/* Animated gradient border - synchronized with letter morphing */}
      <div 
        className="absolute inset-0 border-2 border-transparent rounded-lg"
        style={{
          background: 'conic-gradient(from 0deg, #8a2be2 0deg, #d946a0 120deg, #e96b3a 240deg, #8a2be2 360deg)',
          backgroundClip: 'padding-box',
          animation: 'gentleColorShift 14s linear infinite'
        }}
      />
      
      {/* Inner logo container */}
      <div 
        className="absolute inset-0.5 rounded-md flex items-center justify-center"
        style={{ background: 'rgba(30, 37, 46, 1.0)' }}
      >
        <div 
          className="text-lg font-semibold relative z-10 flex items-center justify-center w-full h-full text-white leading-none"
          style={{
            animation: 'letterRotate 14s linear infinite',
            transformStyle: 'preserve-3d',
            transform: 'translateY(-1px)'
          }}
        >
          <span className="logo-letter">{letter}</span>
        </div>
      </div>
    </div>
  );
}