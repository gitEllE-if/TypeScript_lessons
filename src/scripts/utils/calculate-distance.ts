const RADIUS_EARTH = 6371;  //километров

/**
 * Вычисление расстояния между двумя точками на сфере в километрах
 * https://gis-lab.info/qa/great-circles.html
 */

export function calculateDistance(a: [number, number], b: [number, number], decimalPlaceCnt: number): number | null {
  if (a === null || b === null ||
    a[0] === null || a[1] === null || b[0] === null || b[1] === null) {
    return null;
  }

  //в радианах
  const lat1 = a[0] * Math.PI / 180;
  const lat2 = b[0] * Math.PI / 180;
  const long1 = a[1] * Math.PI / 180;
  const long2 = b[1] * Math.PI / 180;

  //косинусы и синусы широт и разницы долгот
  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  //вычисления длины большого круга
  const y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;
  const ad = Math.atan2(y, x);
  return Number((ad * RADIUS_EARTH).toFixed(decimalPlaceCnt));
}
