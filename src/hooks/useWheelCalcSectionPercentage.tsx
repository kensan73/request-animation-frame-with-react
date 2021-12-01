import { useEffect, useState } from "react";
import { calcPercentage } from "../misc";

const useWheelCalcSectionPercentage = (sectionReference: any): string => {
  const [percent, setPercent] = useState("");
  useEffect(() => {
    const onwheel = (event: WheelEvent) => {
      if (sectionReference.current == null) return;
      /*
                  get the absolute position top and bottom
                  get the absolute position of the element
                   */
      const sectionRect = {
        top: sectionReference.current.offsetTop,
        bottom:
          sectionReference.current.offsetTop +
          sectionReference.current.getBoundingClientRect().height,
      };
      const clientRect = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight,
      };
      const calculatedPercent = calcPercentage(sectionRect, clientRect);
      setPercent(calculatedPercent);
    };

    window.addEventListener("scroll", onwheel);

    return () => window.removeEventListener("wheel", onwheel);
  }, [sectionReference]);

  return percent;
};

export { useWheelCalcSectionPercentage };
export default useWheelCalcSectionPercentage;
