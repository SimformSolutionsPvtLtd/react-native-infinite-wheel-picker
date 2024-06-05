import { useMemo, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import type { UseWheelPickerProps } from './types';

/**
 * Custom hook to handle scrolling in a list.
 * @param {object} ScrollListProps - The props for the scroll list.
 * @param {React.RefObject} ScrollListProps.listRef - Reference to the FlatList component.
 * @param {number} ScrollListProps.itemHeight - Height of each item in the list.
 * @param {Array<string|number>} ScrollListProps.data - Array of data items to be displayed in the list.
 * @param {boolean} ScrollListProps.infinite - Flag indicating whether infinite scrolling is enabled.
 * @param {Function} ScrollListProps.setSelectedItem - Function to set the selected item.
 * @param {number} ScrollListProps.surroundingItemsCount - Number of items above and below the selected item to display in the list
 * @param {MutableRefObject} ScrollListProps.initialLoading - Reference to the initial loading state.
 * @param {number} ScrollListProps.totalItemToDisplayInList - Number of items to display in the list.
 * @returns {object} An object containing visibleIndex, handleScroll, offsets, wheelPickerData, doubledData, finiteData.
 */

const useWheelPicker = ({
  listRef,
  data,
  itemHeight,
  infinite,
  setSelectedItem,
  surroundingItemsCount,
  initialLoading,
  totalItemToDisplayInList,
}: UseWheelPickerProps) => {
  const doubledData = [...data, ...data]; // Duplicates the data array for infinite scrolling
  const [wheelPickerData, setWheelPickerData] = useState([
    ...doubledData,
    ...doubledData,
    ...doubledData,
  ]); // Initializes wheel picker data with tripled duplicated data.
  const scrollY = useSharedValue<number>(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const previousScrollY = useRef(0);
  const offsets = useMemo(
    () => [...Array(wheelPickerData.length)].map((_, i) => i * itemHeight),
    [wheelPickerData, itemHeight]
  ); // Creates an array of offsets based on item height.

  let finiteData;
  // Pads data with empty items for finite scrolling.
  if (!infinite) {
    const zeros = new Array(totalItemToDisplayInList).fill('');
    finiteData = [...zeros, ...data, ...zeros];
  }

  const handleScroll = ({ nativeEvent }: any) => {
    const contentOffsetY = nativeEvent.contentOffset.y;
    const contentHeight = nativeEvent.contentSize.height;
    const layoutHeight = nativeEvent.layoutMeasurement.height;
    let index;
    if (contentOffsetY > previousScrollY.current) {
      // Calculates index for downward scroll.
      index = Math.ceil(contentOffsetY / itemHeight);
    } else {
      // Calculates index for upward scroll.
      index = Math.floor(contentOffsetY / itemHeight);
    }

    // Updates previous scroll position.
    previousScrollY.current = contentOffsetY;
    scrollY.value = contentOffsetY;
    setVisibleIndex(index);
    if (!initialLoading.current) {
      const indexItem =
        wheelPickerData[infinite ? index + surroundingItemsCount : index];
      setSelectedItem(
        typeof indexItem === 'object' ? indexItem.value : indexItem
      );
    }

    if (infinite) {
      if (contentOffsetY + layoutHeight + itemHeight >= contentHeight / 1.5) {
        // Adds more data for infinite scrolling.
        setWheelPickerData([...wheelPickerData, ...doubledData]);
      }

      if (contentOffsetY <= 10) {
        if (listRef.current) {
          // Calculate offset to scroll to same item down the list.
          const scrollOffset =
            itemHeight * data?.length +
            itemHeight * data.length -
            parseInt((contentOffsetY / itemHeight).toString()) * itemHeight;

          // Scrolls to a specific offset for infinite scrolling.
          listRef.current.scrollToOffset({
            offset: scrollOffset,
            animated: false,
          });
          setVisibleIndex(scrollOffset / itemHeight);
        }
      }
    }
  };

  return {
    visibleIndex,
    handleScroll,
    offsets,
    wheelPickerData,
    doubledData,
    finiteData,
  };
};

export default useWheelPicker;
