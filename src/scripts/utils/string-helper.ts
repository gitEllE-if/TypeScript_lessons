export function strToNumArr2(str: string): [number, number] {
  const numArr2: [number, number] = [null, null];
  if (str) {
    const strArr = str.split(',');
    if (strArr[0] && strArr[1]) {
      numArr2[0] = (!isNaN(+strArr[0]) && isFinite(+strArr[0])) ? +strArr[0] : null;
      numArr2[1] = (!isNaN(+strArr[1]) && isFinite(+strArr[1])) ? +strArr[1] : null;
    }
  }
  return numArr2;
}
