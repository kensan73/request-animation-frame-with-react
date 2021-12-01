import React, { useState } from "react";
import { runAnimation } from "../Animation/requestAnimationFrame";

const useAnimateOnScroll = (
  isActive: boolean,
  animationEntities: any,
  triggerScroll: any
): [boolean, "start" | "end" | null] => {
  const [animationsEnded, setAnimationsEnded] = useState(false);
  const [endedAtStartOrEnd, setEndedAtStartOrEnd] = useState<
    null | "start" | "end"
  >(null);
  React.useEffect(() => {
    if (!isActive) return;
    if (!animationEntities.current) return;
    if (triggerScroll === undefined) return;
    setAnimationsEnded(false);
    if (triggerScroll.indexOf("down") > -1) {
      if (animationEntities.current.isAnimating) {
        animationEntities.current.userSkips = "forward";
        return;
      }
      // forward
      if (animationEntities.current.cursubstage === "end") {
        if (
          animationEntities.current.curstage ===
          animationEntities.current.entities.length - 1
        ) {
          setEndedAtStartOrEnd("end");
          setAnimationsEnded(true);
          return;
        }
        animationEntities.current.curstage++;
        animationEntities.current.cursubstage = "start";
      }
      animationEntities.current.isAnimating = true;
      runAnimation(true, animationEntities.current as any);
      console.log("test 123");
    } else {
      if (animationEntities.current.isAnimating) {
        animationEntities.current.userSkips = "backward";
        return;
      }
      // backward
      if (animationEntities.current.cursubstage === "start") {
        if (animationEntities.current.curstage === 0) {
          setEndedAtStartOrEnd("start");
          setAnimationsEnded(true);
          return;
        }
        animationEntities.current.curstage--;
        animationEntities.current.cursubstage = "end";
      }
      animationEntities.current.isAnimating = true;
      runAnimation(false, animationEntities.current as any);
    }
  }, [isActive, triggerScroll]);

  return [animationsEnded, endedAtStartOrEnd];
};

export { useAnimateOnScroll };
export default useAnimateOnScroll;
