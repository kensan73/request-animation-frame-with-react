import { useEffect, useState } from "react";
import { throttle } from "../misc";

const useSubscribeWheelHook = (
  callback: (scrollDirection: "up" | "down") => void
): void => {
  useEffect(() => {
    const onwheel = (event: WheelEvent) => {
      let content: "up" | "down" = "down";
      if (event.deltaY < 0) {
        content = "up";
      }
      callback(content);
    };

    window.addEventListener(
      "wheel",
      throttle((event) => onwheel(event), 3000)
    );

    return () => window.removeEventListener("wheel", (event) => onwheel(event));
  }, []);
};

export { useSubscribeWheelHook };
export default useSubscribeWheelHook;
