import { useEffect } from 'react';

type Parameters = {
  currentImage: number;
  length: number;
  motionNotReduced: boolean;
  sliderRef: React.MutableRefObject<HTMLDivElement | null>;
  transitionDurationSwitch: () => void;
  setTransitionDuration: React.Dispatch<React.SetStateAction<number>>;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
};

export const useCarouseTransitionListener = ({
  currentImage,
  length,
  motionNotReduced,
  sliderRef,
  setTransitionDuration,
  setCurrentImage,
  transitionDurationSwitch,
}: Parameters) => {
  useEffect(() => {
    if (motionNotReduced) {
      const loopCarousel = (event: TransitionEvent) => {
        if (event.propertyName === 'transform') {
          if (currentImage > length - 1) {
            setTransitionDuration(0);
            setCurrentImage(0);
          } else if (currentImage < 0) {
            setTransitionDuration(0);
            setCurrentImage(length - 1);
          }
          transitionDurationSwitch();
        }
      };

      sliderRef.current!.addEventListener('transitionend', loopCarousel);

      return () => {
        sliderRef.current!.removeEventListener('transitionend', loopCarousel);
      };
    } else {
      if (currentImage > length - 1) {
        setCurrentImage(0);
      } else if (currentImage < 0) {
        setCurrentImage(length - 1);
      }
    }
  }, [currentImage]);
};
