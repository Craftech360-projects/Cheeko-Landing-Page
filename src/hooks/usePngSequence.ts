import { useState, useEffect, useRef } from 'react';

interface UsePngSequenceProps {
  basePath: string;
  startFrame: number;
  endFrame: number;
  fps?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

export const usePngSequence = ({
  basePath,
  startFrame,
  endFrame,
  fps = 30,
  loop = true,
  autoPlay = true
}: UsePngSequenceProps) => {
  const [currentFrame, setCurrentFrame] = useState(startFrame);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const frameDuration = 1000 / fps;
      
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prevFrame) => {
          if (prevFrame >= endFrame) {
            if (loop) {
              return startFrame;
            } else {
              setIsPlaying(false);
              return prevFrame;
            }
          }
          return prevFrame + 1;
        });
      }, frameDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, fps, startFrame, endFrame, loop]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentFrame(startFrame);
    setIsPlaying(false);
  };

  const imageSrc = `${basePath}/${currentFrame}.png`;

  return {
    currentFrame,
    imageSrc,
    isPlaying,
    play,
    pause,
    reset
  };
};