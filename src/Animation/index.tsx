import { entities, setup } from "./entities";
import React, { Ref, useEffect, useRef, useState } from "react";
import { runAnimation } from "./requestAnimationFrame";
import useSubscribeWheelHook from "../hooks/useSubscribeWheelHook";
import { circleStyle, panel0Style, panel1Style, sectionStyle } from "./styles";
import { AnimationEntities } from "./interfaces";

const Animation: React.FC = () => {
  const circleReference = useRef<HTMLDivElement>();
  const leftPaneReference = useRef<HTMLDivElement>();
  const rightPaneReference = useRef<HTMLDivElement>();
  const animationEntities = useRef<AnimationEntities>(
    JSON.parse(JSON.stringify(entities))
  );
  const [triggerScroll, setTriggerScroll] = useState<undefined | string>();
  useSubscribeWheelHook((scrollDirection) =>
    setTriggerScroll(Date.now() + "," + scrollDirection)
  );
  const [isActive] = useState(true);

  useEffect(() => {
    if (
      [
        circleReference,
        leftPaneReference,
        rightPaneReference,
        animationEntities,
      ].every((ref) => ref.current !== undefined)
    ) {
      setup(
        circleReference as Ref<HTMLDivElement>,
        leftPaneReference as Ref<HTMLDivElement>,
        rightPaneReference as Ref<HTMLDivElement>,
        (animationEntities.current as any).entities,
        entities.entities
        // setAnimationEntities
      );
    }
  }, [
    animationEntities,
    circleReference,
    leftPaneReference,
    rightPaneReference,
  ]);
  React.useEffect(() => {
    if (!isActive) return;
    if (!animationEntities.current) return;
    if (triggerScroll === undefined) return;
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
        )
          return;
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
        if (animationEntities.current.curstage === 0) return;
        animationEntities.current.curstage--;
        animationEntities.current.cursubstage = "end";
      }
      animationEntities.current.isAnimating = true;
      runAnimation(false, animationEntities.current as any);
    }
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
