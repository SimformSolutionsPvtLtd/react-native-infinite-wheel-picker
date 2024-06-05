import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { debounce } from '../../constants';
import useWheelPicker from '../../hooks/useWheelPicker';
import { WheelPickerItem } from '../WheelPickerItem';
import styles from './WheelPickerStyles';
import { type WheelPickerProps } from './types';

const WheelPicker: React.FC<WheelPickerProps> = ({
  data,
  infinite = true,
  itemHeight = 60,
  surroundingItemsCount = 1,
  onValueChange,
  itemStyle,
  selectedItemContainerStyle,
  wheelPickerContainerStyle,
  initialSelectedItem,
  selectedItemStyle,
  itemsAngle = [40, 50],
  itemsOpacity = [0.6, 0.4],
}) => {
  const totalItemToDisplayInList =
    surroundingItemsCount < 0 ? 0 : surroundingItemsCount;
  const [selectedItem, setSelectedItem] = useState();
  const debounceFn = useMemo(
    () => debounce(onValueChange, 200),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const initialLoading = useRef(true);
  const listRef: any = useRef(null);
  const {
    handleScroll,
    offsets,
    visibleIndex,
    wheelPickerData,
    doubledData,
    finiteData,
  } = useWheelPicker({
    listRef,
    data,
    itemHeight,
    infinite,
    setSelectedItem,
    surroundingItemsCount: totalItemToDisplayInList,
    initialLoading,
    totalItemToDisplayInList,
  });

  // Calulate total item diplay in a picker
  const totalVisibleItem = totalItemToDisplayInList * 2 + 1;
  const viewHeight = itemHeight * totalVisibleItem;

  const initialScrollIndex = useMemo(() => {
    return infinite
      ? parseInt((doubledData?.length / 2).toString())
      : parseInt((data?.length / 2).toString());
  }, [doubledData, data, infinite]);

  const scrollItem = useCallback(() => {
    if (initialSelectedItem) {
      const scrollIndex = data.findIndex(itm => {
        if (typeof itm === 'object') {
          return itm.value === initialSelectedItem;
        } else {
          return itm === initialSelectedItem;
        }
      });
      const doubledListData = [...data, ...data];
      if (scrollIndex !== -1) {
        setTimeout(() => {
          listRef.current.scrollToIndex({
            index: infinite
              ? doubledListData?.length + scrollIndex - totalItemToDisplayInList
              : scrollIndex,
            animated: true,
          });

          setTimeout(() => {
            initialLoading.current = false;
          }, 1000);
        }, 100);
      } else {
        throw new Error(`Selected item ${initialSelectedItem} not found`);
      }
    } else {
      initialLoading.current = false;
    }
  }, [initialSelectedItem, data, totalItemToDisplayInList, infinite]);

  useEffect(() => {
    if (selectedItem) {
      debounceFn(selectedItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    scrollItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <WheelPickerItem
          itemStyle={itemStyle}
          item={item}
          height={itemHeight}
          index={index}
          currentScrollIndex={visibleIndex}
          surroundingItemsCount={totalItemToDisplayInList}
          selectedItemStyle={selectedItemStyle}
          itemsAngle={itemsAngle}
          itemsOpacity={itemsOpacity}
        />
      );
    },
    [
      visibleIndex,
      itemHeight,
      totalItemToDisplayInList,
      itemsAngle,
      itemsOpacity,
      itemStyle,
      selectedItemStyle,
    ]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight]
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    []
  );

  return (
    <View
      style={[
        styles.containerHeight,
        wheelPickerContainerStyle,
        {
          height: viewHeight,
          width: selectedItemContainerStyle?.width ?? '100%',
        },
      ]}>
      <Animated.View
        style={[
          styles.highlight,
          selectedItemContainerStyle,
          {
            height: itemHeight,
            top: (viewHeight - itemHeight) / 2,
          },
        ]}
      />
      <Animated.FlatList
        nestedScrollEnabled
        removeClippedSubviews
        ref={listRef}
        data={infinite ? wheelPickerData : finiteData}
        keyExtractor={keyExtractor}
        bounces={false}
        renderItem={renderItem}
        snapToAlignment="center"
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={getItemLayout}
        snapToOffsets={offsets}
        onScroll={handleScroll}
      />
    </View>
  );
};

export default WheelPicker;
