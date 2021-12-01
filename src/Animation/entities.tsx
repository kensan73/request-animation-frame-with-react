import { AnimationEntities, AnimationEntity } from "./interfaces";
import { Ref } from "react";

const entities: AnimationEntities = {
  entities: [
    [
      {
        forwardStartTime: 0,
        forwardEndTime: 4000,
        backwardStartTime: 0,
        backwardEndTime: 4000,
        endWidth: 50,
        startWidth: 100,
        //element:  document.querySelector('#circleId'),
        step: (isForward, progress, { element, endWidth, startWidth }) => {
          if (isForward) {
            // larger to smaller
            const distance = startWidth - progress * (startWidth - endWidth);
            element.current.style.width = `${distance}px`;
            element.current.style.height = `${distance}px`;
          } else {
            // smaller to larger
            const distance = endWidth + progress * (startWidth - endWidth);
            element.current.style.width = `${distance}px`;
            element.current.style.height = `${distance}px`;
          }
        },
      },
      {
        forwardStartTime: 1000,
        forwardEndTime: 4000,
        backwardStartTime: 0,
        backwardEndTime: 2000,
        endOpacity: 1,
        startOpacity: 0,
        endY: 100,
        startY: 0,
        element: undefined, // document.querySelector('#panel0'),
        step: (
          isForward,
          progress,
          { element, startOpacity, endOpacity, startY, endY }
        ) => {
          if (isForward) {
            // fade in, scroll up
            // const opacity = startOpacity + (progress * (endOpacity - startOpacity))
            const opacity =
              startOpacity + progress * (endOpacity - startOpacity);
            const bottom = startY + progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          } else {
            // fade out, scroll down
            const opacity = endOpacity - progress * (endOpacity - startOpacity);
            const bottom = endY - progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          }
        },
      },
    ],
    [
      {
        forwardStartTime: 1000,
        forwardEndTime: 4000,
        backwardStartTime: 0,
        backwardEndTime: 2000,
        endOpacity: 0,
        startOpacity: 1,
        endY: 200,
        startY: 100,
        // element: document.querySelector('#panel0'),
        step: (
          isForward,
          progress,
          { element, startOpacity, endOpacity, startY, endY }
        ) => {
          if (isForward) {
            // fade in, scroll up
            // const opacity = startOpacity + (progress * (endOpacity - startOpacity))
            const opacity =
              startOpacity + progress * (endOpacity - startOpacity);
            const bottom = startY + progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          } else {
            // fade out, scroll down
            const opacity = endOpacity - progress * (endOpacity - startOpacity);
            const bottom = endY - progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          }
        },
      },
      {
        forwardStartTime: 1000,
        forwardEndTime: 4000,
        backwardStartTime: 0,
        backwardEndTime: 2000,
        endOpacity: 1,
        startOpacity: 0,
        endY: 100,
        startY: 0,
        //element:  document.querySelector('#panel1'),
        step: (
          isForward,
          progress,
          { element, startOpacity, endOpacity, startY, endY }
        ) => {
          if (isForward) {
            // fade in, scroll up
            // const opacity = startOpacity + (progress * (endOpacity - startOpacity))
            const opacity =
              startOpacity + progress * (endOpacity - startOpacity);
            const bottom = startY + progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          } else {
            // fade out, scroll down
            const opacity = endOpacity - progress * (endOpacity - startOpacity);
            const bottom = endY - progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          }
        },
      },
    ],
    [
      {
        forwardStartTime: 1000,
        forwardEndTime: 4000,
        backwardStartTime: 0,
        backwardEndTime: 2000,
        endOpacity: 0,
        startOpacity: 1,
        endY: 200,
        startY: 100,
        // element: undefined, // document.querySelector('#panel1'),
        step: (
          isForward,
          progress,
          { element, startOpacity, endOpacity, startY, endY }
        ) => {
          if (isForward) {
            // fade in, scroll up
            // const opacity = startOpacity + (progress * (endOpacity - startOpacity))
            const opacity =
              startOpacity + progress * (endOpacity - startOpacity);
            const bottom = startY + progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          } else {
            // fade out, scroll down
            const opacity = endOpacity - progress * (endOpacity - startOpacity);
            const bottom = endY - progress * (endY - startY);
            element.current.style.opacity = `${opacity}`;
            element.current.style.bottom = `${bottom}px`;
          }
        },
      },
    ],
  ],
  curstage: 0,
  cursubstage: "start",
  totalTime: 4000,
  isAnimating: null,
  userSkips: null,
};

const setup = (
  circle: Ref<HTMLDivElement>,
  leftPane: Ref<HTMLDivElement>,
  rightPane: Ref<HTMLDivElement>,
  entities: Array<Array<AnimationEntity>>
) => {
  entities[0][0].element = circle;
  entities[0][1].element = leftPane;
  entities[1][0].element = leftPane;
  entities[1][1].element = rightPane;
  entities[2][0].element = rightPane;
};

export { entities, setup };
