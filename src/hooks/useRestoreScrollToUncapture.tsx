import { useEffect } from "react";

const useRestoreScrollToUncapture = (
  shouldRestore: boolean,
  restoreCallback: (pushAwayDirection?: "up" | "down") => void
): void => {
  useEffect(() => {
    if (!shouldRestore) return;

    let handle = setTimeout(() => {
      clearTimeout(handle);
      restoreCallback();
    }, 2000);
  }, [shouldRestore]);
};

export { useRestoreScrollToUncapture };
export default useRestoreScrollToUncapture;
