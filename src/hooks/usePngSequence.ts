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
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises: Promise<void>[] = [];
      
      for (let i = startFrame; i <= endFrame; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            imageCache.current.set(i, img);
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${basePath}/${i}.png`);
            reject();
          };
          img.src = `${basePath}/${i}.png`;
        });
        loadPromises.push(promise);
      }
      
      try {
        await Promise.all(loadPromises);
        setImagesLoaded(true);
        if (autoPlay) {
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Failed to preload all images:', error);
        setImagesLoaded(true); // Still allow playing with loaded images
      }
    };
    
    preloadImages();
  }, [basePath, startFrame, endFrame, autoPlay]);

  useEffect(() => {
    if (isPlaying && imagesLoaded) {
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
  }, [isPlaying, imagesLoaded, fps, startFrame, endFrame, loop]);

  const play = () => {
    if (imagesLoaded) setIsPlaying(true);
  };
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
    isLoading: !imagesLoaded,
    play,
    pause,
    reset
  };
};