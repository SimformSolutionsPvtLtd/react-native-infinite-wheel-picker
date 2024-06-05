/**
 * @param x - index
 * @returns scale value
 */
export const scaleFunction = (x: number) => 1.0 ** x;

/**
 * Here 2 is the maximum number of visible items
 * @param x - index
 * @returns rotation value
 */
export const rotationFunction = (x: number, visible: number = 2) => {
  if (visible > 2) {
    return 1 - Math.pow(1 / 1.3, x);
  }
  return 1 - Math.pow(1 / 2, x);
};

/**
 * Here 2 is the maximum number of visible items
 * @param x - index
 * @returns opacity value
 */
export const opacityFunction = (x: number, visible: number = 2) => {
  if (visible > 2) {
    return Math.pow(1 / 1.3, x);
  }
  return Math.pow(1 / 2, x);
};

/**
 * Generates an input range for translating elements along the Y-axis.
 * Function computes the input values for a list of elements, considering a given number of visible elements outside the central element.
 * The input values are symmetrically added to the beginning and end of the range to maintain the balance.
 * @param {number} restElements - The number of visible elements outside the central element.
 * @returns {Array<number>} - An array representing the input range for each item.
 */
export const generateInputRange = (restElements: number): Array<number> => {
  const range = [0];
  for (let i = 1; i <= restElements + 1; i++) {
    range.unshift(-i);
    range.push(i);
  }
  return range;
};

/**
 * Generates an output range for translating elements along the Y-axis based on a rotation function.
 * Function computes the Y-axis translation for a list of elements, considering a given rotation function. Central element is at index 0, with an initial translation of 0.
 * For each subsequent element, the translation is calculated based on the elementHeight and the provided rotation function.
 * The translation values are symmetrically added to the beginning and end of the range to maintain the balance.
 * @param {number} restElements - The number of visible elements outside the central element.
 * @param {number} elementHeight - The elementHeight of each item in the list.
 * @param {function} rotateFunction - A function that takes an index and returns a rotation value (in radians).
 * @returns {Array<number>} - An array representing the translateY output range for each item.
 */
export const generateTranslateYOutputRange = (
  restElements: number,
  elementHeight: number,
  rotateFunction: (x: number) => number
): Array<number> => {
  const range = [0];
  for (let i = 1; i <= restElements + 1; i++) {
    let y =
      (elementHeight / 2) * (1 - Math.sin(Math.PI / 2 - rotateFunction(i)));
    for (let j = 1; j < i; j++) {
      y += elementHeight * (1 - Math.sin(Math.PI / 2 - rotateFunction(j)));
    }
    range.unshift(y);
    range.push(-y);
  }
  return range;
};

/**
 * Generates an output range for a given function.
 * Function computes the output values for a list of elements, considering a given value function.
 * The output values are symmetrically added to the beginning and end of the range to maintain the balance.
 * @param {number} restElements - The number of visible elements outside the central element.
 * @param {function} valueFunction - A function that takes an index and returns a value.
 * @param {number} initialValue - The initial value for the central element.
 * @param {boolean} isRotation - A flag indicating whether the output values are for rotation.
 * @param {boolean} isOpacity - A flag indicating whether the output values are for opacity.
 * @returns {Array<number> | Array<string>} - An array representing the output range for each item.
 */
export const generateOutputRange = (
  restElements: number,
  valueFunction: (x: number, restElements?: number) => number,
  initialValue: number | string,
  isRotation = false,
  isOpacity = false
): Array<number> | Array<string> => {
  const range = [initialValue];
  for (let x = 1; x <= restElements + 1; x++) {
    let y: string | number = valueFunction(x, restElements);
    if (isOpacity && !isRotation && typeof y === 'number') {
      y = Math.min(Math.max(y, 0.2), 0.5); // minimum opacity value is 0.2 and maximum is 0.5
    }
    if (isRotation) {
      y = Math.min(y, 0.7); // minimum rotation value is 0.75 * 100 = 75deg
      range.unshift(`${y * 100}deg`);
      range.push(`${y * 100}deg`);
    } else {
      range.unshift(y);
      range.push(y);
    }
  }
  return range as Array<number> | Array<string>;
};
