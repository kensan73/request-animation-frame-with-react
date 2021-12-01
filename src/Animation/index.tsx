import { entities, setup } from "./entities";
import React, { Ref, useRef, useState } from "react";
import { runAnimation } from "./requestAnimationFrame";
import useSubscribeWheelHook from "../hooks/useSubscribeWheelHook";
import { circleStyle, panel0Style, panel1Style, sectionStyle } from "./styles";

const Animation: React.FC = () => {
  const circleReference = useRef<HTMLDivElement>();
  const leftPaneReference = useRef<HTMLDivElement>();
  const rightPaneReference = useRef<HTMLDivElement>();
  const animationEntities = JSON.parse(JSON.stringify(entities));
  setup(
    circleReference as Ref<HTMLDivElement>,
    leftPaneReference as Ref<HTMLDivElement>,
    rightPaneReference as Ref<HTMLDivElement>,
    animationEntities.entities
  );
  // const [animationEntities] = useState(entitiesCopy);
  const [triggerScroll, setTriggerScroll] = useState<undefined | string>();
  useSubscribeWheelHook((scrollDirection) =>
    setTriggerScroll(Date.now() + "," + scrollDirection)
  );
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    if (!isActive) return;
    if (triggerScroll === undefined) return;
    if (triggerScroll.indexOf("down") > -1) {
      if (animationEntities.isAnimating) {
        animationEntities.userSkips = "forward";
        return;
      }
      // forward
      if (animationEntities.cursubstage === "end") {
        if (
          animationEntities.curstage ===
          animationEntities.entities.length - 1
        )
          return;
        animationEntities.curstage++;
        animationEntities.cursubstage = "start";
      }
      animationEntities.isAnimating = true;
      runAnimation(true, animationEntities);
    } else {
      if (animationEntities.isAnimating) {
        animationEntities.userSkips = "backward";
        return;
      }
      // backward
      if (animationEntities.cursubstage === "start") {
        if (animationEntities.curstage === 0) return;
        animationEntities.curstage--;
        animationEntities.cursubstage = "end";
      }
      animationEntities.isAnimating = true;
      runAnimation(false, animationEntities);
    }
    // runAnimation(triggerScroll.indexOf("down") > -1, animationEntities);
  }, [isActive, triggerScroll]);
  return (
    <section css={sectionStyle}>
      <div css={circleStyle} ref={circleReference as any}></div>
      <div css={panel0Style} ref={leftPaneReference as any}>
        <h2>My header 0</h2>
      </div>
      <div css={panel1Style} ref={rightPaneReference as any}>
        <h2>My header 1</h2>
      </div>
    </section>
  );
};

export { Animation };
export default Animation;
