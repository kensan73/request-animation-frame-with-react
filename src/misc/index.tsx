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

export { throttle };
