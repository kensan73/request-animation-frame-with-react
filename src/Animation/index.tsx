import { entities, setup } from "./entities";
import React, { Ref, useEffect, useRef, useState } from "react";
import useSubscribeWheelHook from "../hooks/useSubscribeWheelHook";
import { circleStyle, panel0Style, panel1Style, sectionStyle } from "./styles";
import { AnimationEntities } from "./interfaces";
import useSetupReferences from "../hooks/useSetupReferences";
import useAnimateOnScroll from "../hooks/useAnimateOnScroll";
import useWheelCalcSectionPercentage from "../hooks/useWheelCalcSectionPercentage";
import { useScrollToCapture } from "../hooks/useScrollToCapture";
import useScrollDirection from "../hooks/useScrollDirection";
import useRestoreScrollToUncapture from "../hooks/useRestoreScrollToUncapture";

const Animation: React.FC = () => {
  const sectionReference = useRef<HTMLDivElement>();
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
  const percent = useWheelCalcSectionPercentage(sectionReference);
  const [isCaptured, restoreScrollTo] = useScrollToCapture(
    sectionReference,
    percent
  );
  const scrollDirection = useScrollDirection();
  useSetupReferences(
    circleReference,
    leftPaneReference,
    rightPaneReference,
    animationEntities
  );
  const [animationsEnded, endedAtStartOrEnd] = useAnimateOnScroll(
    isCaptured,
    animationEntities,
    triggerScroll
  );
  useRestoreScrollToUncapture(
    isCaptured && animationsEnded,
    () => restoreScrollTo(endedAtStartOrEnd === "start" ? "up" : "down")
    // restoreScrollTo(scrollDirection === "scrolling up" ? "up" : "down")
  );
  return (
    <section css={sectionStyle} ref={sectionReference as any}>
      <div css={circleStyle} ref={circleReference as any} />
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
