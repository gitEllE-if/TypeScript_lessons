export function strToNumArr2(str: string): [number, number] | null {
  if (str) {
    const strArr = str.split(',');
    if (strArr[0] && strArr[1]) {
      const numArr2: [number, number] = [+strArr[0], +strArr[1]];
      if (isNaN(numArr2[0]) || isNaN(numArr2[1]) || !isFinite(numArr2[0]) || !isFinite(numArr2[1])) {
        return null;
      }
      return numArr2;
    }
  }
  return null;
}
