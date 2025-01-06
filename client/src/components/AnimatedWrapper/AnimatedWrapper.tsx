import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  animationKey: string | number;
  direction?: 'y' | 'x';
  duration?: number;
  delay?: number;
};

const AnimatedWrapper: FC<Props> = ({
  animationKey,
  children,
  direction,
  duration = 0.5,
  delay = 0,
}) => {
  const variants = {
    initial: { opacity: 0, x: 0, y: 0 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };

  if (direction) {
    variants.initial[direction] = -25;
    variants.exit[direction] = 25;
  }

  return (
    <AnimatePresence>
      <MotionConfig transition={{ duration, delay }}>
        <motion.div
          key={animationKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </MotionConfig>
    </AnimatePresence>
  );
};
export default AnimatedWrapper;
