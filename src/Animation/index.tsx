import { entities, setup } from "./entities";
import React, { Ref, useEffect, useRef, useState } from "react";
import useSubscribeWheelHook from "../hooks/useSubscribeWheelHook";
import { circleStyle, panel0Style, panel1Style, sectionStyle } from "./styles";
import { AnimationEntities } from "./interfaces";
import useSetupReferences from "../hooks/useSetupReferences";
import useAnimateOnScroll from "../hooks/useAnimateOnScroll";

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
  useSetupReferences(
    circleReference,
    leftPaneReference,
    rightPaneReference,
    animationEntities
  );
  useAnimateOnScroll(isActive, animationEntities, triggerScroll);
  return (
    <section css={sectionStyle}>
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
