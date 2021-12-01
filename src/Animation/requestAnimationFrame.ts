import { AnimationEntities } from "./interfaces";

const runAnimation = (
  isForward: boolean,
  animationEntities: AnimationEntities
): void => {
  const startTime = new Date().getTime();

  const step = () => {
    const curTime = new Date().getTime();
    const timeElapsed = curTime - startTime;
    let progress = timeElapsed / animationEntities.totalTime;
    if (animationEntities.userSkips !== null) {
      if (isForward) {
        progress = 0;
        if (animationEntities.userSkips === "forward") progress = 1;
      } else {
        // backward
        progress = 0;
        if (animationEntities.userSkips === "backward") progress = 1;
      }
    }
    animationEntities.entities[animationEntities.curstage].forEach((entity) => {
      entity.step(isForward, progress, entity);
    });
    if (progress >= 1 || animationEntities.userSkips !== null) {
      animationEntities.userSkips = null;
      animationEntities.isAnimating = false;
      if (isForward) {
        animationEntities.cursubstage = "end";
      } else {
        animationEntities.cursubstage = "start";
      }
      return;
    }
    requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

export { runAnimation };
