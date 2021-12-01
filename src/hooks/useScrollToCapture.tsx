import { useEffect, useState } from "react";

const pixelsAwayToPush = 50;
const useScrollToCapture = (
  sectionReference: any,
  percent: string,
  threshold: number = 82
): [boolean, (pushAwayDirection?: "up" | "down") => void] => {
  const [isTop, setIsTop] = useState(false);
  const [sectionTopBottom, setSectionTopBottom] = useState({ top: 0, bottom: 0});

  const restoreScrollTo = (pushAwayDirection: string = "up") => {
    (document.querySelector("html") as HTMLElement).style.overflowY = "";
    const offset = pushAwayDirection === 'down'
        ? sectionTopBottom.bottom + pixelsAwayToPush
        : sectionTopBottom.top - (sectionReference.current.getBoundingClientRect().height * 1.25)
    window.onscroll = function() {};
    window.scrollTo(0, offset);
    setIsTop(false);
  };

  useEffect(() => {
    if (!(sectionReference && sectionReference.current)) return;
    if (isTop) return;

    if (parseInt(percent) > threshold) {
      setIsTop(true);
      setSectionTopBottom({ top: sectionReference.current.offsetTop, bottom: sectionReference.current.offsetTop + sectionReference.current.getBoundingClientRect().height);
      window.onscroll = () => {
        console.log("scrolling to " + sectionReference.current.offsetTop);
        if (window.scrollY !== sectionReference.current.offsetTop)
          window.scrollTo(0, sectionReference.current.offsetTop);
      };
      (document.querySelector("html") as HTMLElement).style.overflowY =
        "hidden";
    }
  }, [percent, sectionReference]);

  return [isTop, restoreScrollTo];
};

export { useScrollToCapture };
