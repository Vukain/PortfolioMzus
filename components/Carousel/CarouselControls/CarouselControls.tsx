import styles from './CarouselControls.module.sass';

type Props = {
  mode: 'standard' | 'infinite';
  currentImage: number;
  length: number;
  carouselControl: (action: 'forward' | 'backward' | 'close') => void;
};

export const CarouselControls: React.FC<Props> = ({ mode, currentImage, length, carouselControl }) => {
  return (
    <>
      <button
        className={styles.next}
        onClick={() => {
          carouselControl('forward');
        }}
        disabled={mode === 'standard' && currentImage + 1 === length}
      >
        <figure className={styles.next_icon} />
      </button>
      <button
        className={styles.previous}
        onClick={() => {
          carouselControl('backward');
        }}
        disabled={mode === 'standard' && currentImage === 0}
      >
        <figure className={styles.previous_icon} />
      </button>
      <button
        className={styles.close}
        onClick={() => {
          carouselControl('close');
        }}
      >
        <figure className={styles.close_icon} />
      </button>
    </>
  );
};
