export function debounce<T extends (...args: unknown[]) => void>(callback: T, wait = 400) {
  let timer = 0;

  return (...args: Parameters<T>) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), wait);
  };
}
