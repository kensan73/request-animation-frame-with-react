function throttle(function_: (event: any) => void, millisecs: number) {
  let last: number;

  return (...args: any) => {
    const now = Date.now();

    if (last !== undefined && now - last < millisecs) {
      return;
    }

    function_.apply(null, args);
    last = now;
  };
}

const calcPercentage = (
  sectionRect: { top: number; bottom: number },
  clientRect: { top: number; bottom: number }
): string => {
  const adjustedRect = {
    top: sectionRect.top,
    bottom: sectionRect.bottom,
  };
  if (
    sectionRect.top >= clientRect.top &&
    sectionRect.bottom <= clientRect.bottom
  ) {
    // it is fully within the clientArea return 100%
    return "100";
  }

  if (
    sectionRect.top >= clientRect.bottom ||
    sectionRect.bottom <= clientRect.top
  ) {
    // it is fully outside the clientArea return 0%
    return "0";
  }

  // clip the section to the client area
  // calculate adjusted to actual section rect
  // to get % seen
  if (
    sectionRect.top >= clientRect.top &&
    sectionRect.top <= clientRect.bottom
  ) {
    adjustedRect.bottom = clientRect.bottom;
  } else {
    adjustedRect.top = clientRect.top;
  }

  let percent;
  percent =
    ((adjustedRect.bottom - adjustedRect.top) /
      (sectionRect.bottom - sectionRect.top)) *
    100;

  return (percent > 98 ? 100 : percent.toPrecision(2)) + "";
};

export { throttle, calcPercentage };
