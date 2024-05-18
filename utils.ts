export function range(start: number, end?: number) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const length = end - start;

  return Array.from({ length }, (_, index) => index + start);
}
