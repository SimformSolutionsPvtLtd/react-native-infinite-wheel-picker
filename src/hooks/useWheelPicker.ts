import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  type FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import type { WheelPickerProps } from '../components';
import useThrowPropsError from './useThrowPropsError';

/**
 * Custom hook to handle the wheel picker logic
 * @param onChangeValue - Function to handle the value change
 * @param selectedIndex - The index of the selected value
 * @param data - The data to be displayed in the wheel picker
 * @param elementHeight - The height of each element in the wheel picker
 * @param restElements - The number of elements to be displayed above and below the selected element
 * @param decelerationRate - The deceleration rate of the scroll view
 * @param loopCount - The number of times the data should be looped
 * @returns - The necessary props for the wheel picker
 */
const useWheelPicker = ({
  onChangeValue,
  selectedIndex,
  data,
  elementHeight,
  restElements,
  decelerationRate,
  loopCount,
  infiniteScroll,
}: Required<
  Pick<
    WheelPickerProps,
    | 'loopCount'
    | 'onChangeValue'
    | 'selectedIndex'
    | 'data'
    | 'restElements'
    | 'decelerationRate'
    | 'elementHeight'
    | 'infiniteScroll'
  >
>) => {
  /**
   * Loop the data to make it infinite
   * The loopCount is multiplied by 2 to ensure that the data is enough to be looped
   * The loopedData is memoized to prevent re-rendering
   */
  let loopCountMax = !infiniteScroll ? 1 : loopCount * 2;
  const loopedData = useMemo(() => {
    let looped: Array<string | number> = [];
    for (let i = 0; i < loopCountMax; i++) {
      looped = [...looped, ...data];
    }
    return looped;
  }, [loopCountMax, data]);

  const [arrayData, setArrayData] = useState<Array<string | number>>([
    ...loopedData,
  ]);
  const flatListRef = useRef<FlatList<string | null>>(null);
  const [scrollY] = useState(new Animated.Value(0));

  /**
   * Verify if the props are valid or not
   * If not, throw an error
   */
  useThrowPropsError({
    selectedIndex,
    arrayData,
    restElements,
    loopCount,
    decelerationRate,
    data,
    elementHeight,
  });

  /**
   * Calculate the height of the container
   */
  const containerHeight = (1 + restElements * 2) * elementHeight;
  /**
   * Adding null values to the beginning and end of the data to make the list circular
   */
  const arrayElements = useMemo(() => {
    const array: (string | null | number)[] = [...arrayData];
    for (let i = 0; i < restElements; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [restElements, arrayData]);

  /**
   * Calculate the offsets for each item in the list
   * The offsets are memoized to prevent re-rendering
   */
  const offsets = useMemo(
    () => [...Array(arrayElements.length)].map((_x, i) => i * elementHeight),
    [arrayElements, elementHeight]
  );

  /**
   * Calculate the current scroll index
   */
  const currentScrollIndex = useMemo(() => {
    const scrollIndex = Animated.add(
      Animated.divide(scrollY, elementHeight),
      restElements
    );
    return scrollIndex;
  }, [restElements, scrollY, elementHeight]);

  let timer: NodeJS.Timeout | null = null;
  /**
   * Handle the momentum scroll end event
   * This function is called when the user stops scrolling
   * It calculates the selected index based on the current scroll position
   * and calls the onChangeValue function to update the selected value
   * @param event - NativeSyntheticEvent<NativeScrollEvent>
   */
  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = Math.min(
      elementHeight * (arrayData.length - 1),
      Math.max(event.nativeEvent.contentOffset.y, 0)
    );

    let index = Math.floor(Math.floor(offsetY) / elementHeight);
    const last = Math.floor(offsetY % elementHeight);
    if (last > elementHeight / 2) index++;

    if (index !== selectedIndex) {
      const value = arrayData[index];
      if (value) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          const originalIndex = data.findIndex(
            item => item === arrayData[index]
          );
          onChangeValue(originalIndex, value.toString());
        }, 100);
      }
    }
  };

  /**
   * Handle the scroll event
   * This function is called when the user scrolls the wheel picker
   * It checks if the user is near the end of the list
   * If so, it adds more data to the list
   */
  const onScrollListener = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const detectFromItem = (data.length + 2) * elementHeight; // 2 is the number of extra elements
      const isNearToEnd =
        layoutMeasurement.height + contentOffset.y + elementHeight >=
        contentSize.height - detectFromItem;
      if (isNearToEnd && infiniteScroll) {
        setArrayData([...arrayData, 1]);
      }
    },
    [arrayData, data, elementHeight, infiniteScroll]
  );

  /**
   * Calculate the initial scroll index
   * The initial scroll index is the index of the selected value
   * Here 0 is initially selected 0 index if infiniteScroll is false
   */
  const initialScrollIndex = useMemo(() => {
    return !infiniteScroll
      ? selectedIndex ?? 0
      : arrayData?.length / 2 + selectedIndex;
  }, [arrayData, selectedIndex, infiniteScroll]);

  /**
   * Set the initial selected value
   */
  useEffect(() => {
    let count = 0;
    if (count === 0) {
      const infiniteDataIndex = data.findIndex(
        item => item === arrayData[initialScrollIndex]
      );
      const originalIndex = !infiniteScroll
        ? selectedIndex ?? 0
        : infiniteDataIndex;
      const originalValue = !infiniteScroll
        ? data[selectedIndex ?? 0]?.toString()
        : arrayData[initialScrollIndex]?.toString();
      onChangeValue(originalIndex ?? 0, originalValue ?? '');
      count++;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScrollIndex, infiniteScroll, selectedIndex]);

  return {
    currentScrollIndex,
    containerHeight,
    flatListRef,
    arrayElements,
    scrollY,
    setArrayData,
    arrayData,
    handleMomentumScrollEnd,
    offsets,
    initialScrollIndex,
    onScrollListener,
  };
};

export default useWheelPicker;
