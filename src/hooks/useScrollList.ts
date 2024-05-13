import { useRef } from 'react';
import {
  FlatList,
  Platform,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

interface DataType {
  value: number | string;
  label: number | string;
}

interface ScrollListProps {
  flatListRef: React.RefObject<FlatList>;
  data: DataType[];
  height: number;
  infiniteScroll: boolean;
  itemDisplayInList: number;
  currentPosition: number;
}

/**
 * Custom hook to handle scrolling in a list.
 * @param {object} ScrollListProps - The props for the scroll list.
 * @param {React.RefObject} ScrollListProps.flatListRef - Reference to the FlatList component.
 * @param {number} ScrollListProps.height - Height of each item in the list.
 * @param {Array<any>} ScrollListProps.data - Array of data items to be displayed in the list.
 * @param {boolean} ScrollListProps.infiniteScroll - Flag indicating whether infinite scrolling is enabled.
 * @param {number} ScrollListProps.itemDisplayInList - Number of items to display in the list at once.
 * @param {number} ScrollListProps.currentPosition - Index of the currently visible item.
 * @returns {object} An object containing scrollY, onScroll, onScrollForAndroid, and visibleAreaFactor functions.
 */
const useScrollList = ({
  flatListRef,
  height,
  data,
  infiniteScroll,
  itemDisplayInList,
  currentPosition,
}: ScrollListProps) => {
  const scrollY = useSharedValue<number>(0);
  const currentYOffset = useRef<number>(0);
  const numberOfValue = useRef<number>(data.length);

  /**  
    Below 0.5 no is used as a margin like if there is 7 items in list.
    So the initialOffset value becomes 650. So if we want to prevent sudden move to
    index issue we can directly use + or - height as use below.
   */
  const initialOffset = useRef<number>((data.length - 0.5) * height);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    scrollY.value = offsetY;
    let currentIndex = Math.ceil((offsetY % initialOffset.current) / height);
    currentIndex =
      currentIndex < numberOfValue?.current
        ? currentIndex
        : numberOfValue?.current - 1;

    if (infiniteScroll) {
      if (offsetY < currentYOffset.current) {
        if (
          currentPosition === 0 &&
          offsetY <= initialOffset.current - height
        ) {
          flatListRef.current?.scrollToIndex({
            index: data.length - 1,
            animated: false,
          });
          currentYOffset.current = offsetY + height * numberOfValue.current;
          return;
        }
      } else if (offsetY > currentYOffset.current) {
        if (
          currentPosition === data.length - 1 &&
          offsetY > initialOffset.current + height
        ) {
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: false,
          });
          currentYOffset.current = offsetY - height * numberOfValue.current;
          return;
        }
      }
      currentYOffset.current = offsetY;
    }
  };

  const onScrollForAndroid = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (infiniteScroll) {
      const yOffset = nativeEvent.contentOffset.y;
      if (yOffset === 0 && Platform.OS === 'android') {
        flatListRef.current?.scrollToIndex({
          index: data.length - 1,
          animated: false,
        });
        currentYOffset.current = yOffset + height * numberOfValue.current;
        return;
      }
    }
  };

  // As currently we are focusing on displaying max 11 items in list.
  const visibleAreaFactor = () => {
    if (itemDisplayInList <= 11) {
      return itemDisplayInList * 2 + 1;
    } else {
      return 5;
    }
  };
  return { scrollY, onScroll, onScrollForAndroid, visibleAreaFactor };
};

export default useScrollList;
