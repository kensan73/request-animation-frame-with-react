import { AnimationEntities } from "./interfaces";

function runAnimation(
  isForward: boolean,
  immersiveAnimation: AnimationEntities
) {
  const startTime = new Date().getTime();

  const step = () => {
    const curTime = new Date().getTime();
    const timeElapsed = curTime - startTime;
    let progress = timeElapsed / immersiveAnimation.totalTime;
    if (immersiveAnimation.userSkips !== null) {
      if (isForward) {
        progress = 0;
        if (immersiveAnimation.userSkips === "forward") progress = 1;
      } else {
        // backward
        progress = 0;
        if (immersiveAnimation.userSkips === "backward") progress = 1;
      }
    }
    immersiveAnimation.entities[immersiveAnimation.curstage].forEach(
      (entity) => {
        entity.step(isForward, progress, entity);
      }
    );
    if (progress >= 1 || immersiveAnimation.userSkips !== null) {
      immersiveAnimation.userSkips = null;
      immersiveAnimation.isAnimating = false;
      if (isForward) {
        immersiveAnimation.cursubstage = "end";
      } else {
        immersiveAnimation.cursubstage = "start";
      }
      return;
    }
    requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}

export { runAnimation };
