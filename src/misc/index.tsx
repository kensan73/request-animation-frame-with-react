function throttle(function_: (event: any) => void, millisecs: number) {
  let last: number;

  return (...args: Array<any>) => {
    const now = Date.now();

    if (last !== undefined && now - last < millisecs) {
      return;
    }

    function_.call(null, args);
    last = now;
  };
}

export { throttle };
