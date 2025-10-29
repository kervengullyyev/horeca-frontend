export function getFirstSegment(path: string) {
  return path.split("/").filter(Boolean)[0];
}
