// src/hooks/use-count-up.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook to animate a number counting up to a target value.
 * @param end The target number to count up to.
 * @param duration The duration of the animation in milliseconds.
 * @returns The current value of the count during animation.
 */
export function useCountUp(end: number, duration: number = 1500): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Apply a simple ease-out function
      const easedPercentage = 1 - Math.pow(1 - percentage, 3);
      const currentCount = Math.floor(easedPercentage * end);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start with a small delay to ensure visibility
    const startTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 100);


    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return count;
}
