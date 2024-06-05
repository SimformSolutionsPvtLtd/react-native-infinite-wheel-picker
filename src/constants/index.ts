export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let debounceTimer: any;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
