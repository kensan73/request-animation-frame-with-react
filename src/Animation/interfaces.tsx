import { Ref } from "react";

interface AnimationEntity {
  forwardStartTime: number;
  forwardEndTime: number;
  backwardStartTime: number;
  backwardEndTime: number;
  element?: undefined | Ref<HTMLDivElement>;
  step: (isForward: boolean, progress: number, self: any) => void;
  startWidth?: number | undefined;
  endWidth?: number | undefined;
  startOpacity?: number;
  endOpacity?: number;
  startY?: number;
  endY?: number;
}

interface AnimationEntities {
  entities: Array<Array<AnimationEntity>>;
  curstage: number;
  cursubstage: "start" | "end";
  totalTime: number;
  isAnimating: boolean | null;
  userSkips: null | "forward" | "backward";
}

export { AnimationEntities, AnimationEntity };
