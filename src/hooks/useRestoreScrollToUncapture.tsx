import { useEffect } from "react";

const useRestoreScrollToUncapture = (
  isCaptured: boolean,
  restoreCallback: (pushAwayDirection?: "up" | "down") => void
): void => {
  useEffect(() => {
    if (!isCaptured) return;

    let handle = setTimeout(() => {
      clearTimeout(handle);
      restoreCallback();
    }, 5000);
  }, [isCaptured]);
};

export { useRestoreScrollToUncapture };
export default useRestoreScrollToUncapture;
