import { useCallback } from 'react';
import type { UseWheelPickerItemProps } from './types';

/**
 * Custom hook to handle item angle and opacity in a list.
 * @param {object} WheelItemProps - The props for the wheel picker Hook item.
 * @param {Array<number>} WheelItemProps.itemsAngle - Array of angles of rows item above and below the selected item in the list.
 * @param {Array<number>} WheelItemProps.itemsOpacity - Array of opacities of rows item above and below the selected item in the list.
 * @param {number} WheelItemProps.surroundingItemsCount - Number of items above and below the selected item to display in the list.
 * @param {number} WheelItemProps.currentScrollIndex - Current scroll index.
 * @param {number} WheelItemProps.index - Index of the item.
 * @returns {object} An object containing rotate, opacity.
 */

const useWheelPickerItem = ({
  itemsAngle,
  itemsOpacity,
  surroundingItemsCount,
  currentScrollIndex,
  index,
}: UseWheelPickerItemProps) => {
  let degreeArr = [...itemsAngle];
  let opacityArr = [...itemsOpacity];
  const selectedItemIndex = currentScrollIndex + surroundingItemsCount;

  const convertToNegativeDegree = useCallback(
    (deg?: number): number | undefined => {
      return deg !== undefined ? -deg : undefined;
    },
    []
  );

  // Extracts the 'surroundingItemsCount' elements from the array.
  const extractElements = useCallback(
    (arr: number[]) => {
      return arr.slice(0, Math.min(surroundingItemsCount, arr.length));
    },
    [surroundingItemsCount]
  );

  degreeArr = extractElements(degreeArr); // Extracts the relevant angles.
  degreeArr.unshift(0); // Adds 0 to the start of degreeArr for the selected item.

  opacityArr = extractElements(opacityArr); // Extracts the relevant opacities.
  opacityArr.unshift(1); // Adds 1 to the start of opacityArr for the selected item.

  // Calculates the rotation angle for the item.
  let lastItemDegree: number =
    degreeArr.length - 1 == surroundingItemsCount
      ? degreeArr[degreeArr.length - 1] ?? 70
      : 70;
  const tiltedIndex =
    selectedItemIndex < index
      ? degreeArr[index - selectedItemIndex] ?? lastItemDegree
      : convertToNegativeDegree(degreeArr[selectedItemIndex - index]) ??
        -lastItemDegree;

  // Calculates the opacity for the item.
  let lastItemOpacity: number =
    opacityArr.length - 1 == surroundingItemsCount
      ? opacityArr[opacityArr.length - 1] ?? 0.3
      : 0.3;
  const indexOpacity =
    selectedItemIndex < index
      ? opacityArr[index - selectedItemIndex] ?? lastItemOpacity
      : opacityArr[selectedItemIndex - index] ?? lastItemOpacity;

  // Determines rotation angle of the item.
  const rotate = selectedItemIndex === index ? 0 : tiltedIndex;

  // Determines the opacity of the item.
  const opacity = selectedItemIndex === index ? 1 : indexOpacity;

  return {
    rotate,
    opacity,
  };
};

export default useWheelPickerItem;
