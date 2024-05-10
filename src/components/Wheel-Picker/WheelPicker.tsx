import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View, type ViewToken } from 'react-native';
import Animated from 'react-native-reanimated';
import { useScrollList } from '../../hooks';
import wheelPickerStyle from './styles';
import WheelPickerRenderItem from './WheelPickerRenderItem';
import type {
  ViewabilityConfirProps,
  WheelPickerProps,
  DataType,
} from './types';

/**
 * Functional component representing a wheel picker.
 * @param {object} props - Component props.
 * @param {number} [props.height=25] - Height of each item in the picker.
 * @param {number} [props.dividerWidth=1] - Width of the divider.
 * @param {string} props.dividerColor - Color of the divider.
 * @param {object} props.textStyle - Style object for text.
 * @param {number} [props.selectedValue=2] - Initially selected value.
 * @param {Function} props.onValueChange - Callback function triggered when value changes.
 * @param {Array<any>} [props.data=[]] - Array of data items.
 * @param {number} [props.itemDisplayInList=5] - Number of items displayed in the list.
 * @param {boolean} [props.infiniteScroll=true] - Enable infinite scrolling.
 * @returns {JSX.Element} WheelPicker component JSX.
 */
const WheelPicker: React.FC<WheelPickerProps> = ({
  height = 25,
  dividerWidth = 1,
  dividerColor,
  textStyle,
  selectedValue = 2,
  onValueChange,
  data = [],
  itemDisplayInList = 5,
  infiniteScroll = true,
}: WheelPickerProps) => {
  const wheelPickerData: DataType[] = [...data, ...data, ...data];
  const [centeredValue, setCenteredValue] = useState<number | string>(
    data?.[itemDisplayInList]?.label ?? ''
  );
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const { scrollY, onScroll, onScrollForAndroid, visibleAreaFactor } =
    useScrollList({
      flatListRef,
      height,
      data,
      infiniteScroll,
      itemDisplayInList,
      currentPosition,
    });

  useEffect(() => {
    if (!onValueChange?.(centeredValue)) {
      return;
    }
    onValueChange(centeredValue);
  }, [centeredValue, onValueChange]);

  /**
   * Callback function triggered when the viewable items in the list change.
   * @param {object} params - Object containing viewableItems property.
   * @param {ViewToken[]} params.viewableItems - Array of viewable items.
   */
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        /**
  As we are spreading same data 3 times and displaying in FlatList. 
  But we are running the onScroll logic on original data, 
  so as here we keep the original data indexes only.
    */
        setCurrentPosition(
          (viewableItems[0]?.index as number) >= data?.length
            ? data?.length - 1
            : (viewableItems[0]?.index as number)
        );
        setCenteredValue(viewableItems[itemDisplayInList]?.item?.label);
      }
    },
    [itemDisplayInList]
  );

  /**  Minimum amount of time (in milliseconds) that an item must be physically 
 viewable before the viewability callback will be fired. 
 So if we put higher no here then scrolling through content without
 stopping will not mark the content as viewable.
 Hence the 300 is the suitable range.
 */
  const viewabilityConfig: ViewabilityConfirProps = {
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 70,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={wheelPickerStyle.container}>
      <View
        style={[
          wheelPickerStyle.selectorView,
          {
            height: height,
            borderTopWidth: dividerWidth,
            borderBottomWidth: dividerWidth,
            borderColor: dividerColor,
          },
        ]}
      />
      <View
        style={[
          wheelPickerStyle.listStyle,
          { height: height * visibleAreaFactor() },
        ]}>
        <Animated.FlatList
          data={infiniteScroll ? wheelPickerData : data}
          ref={flatListRef}
          initialScrollIndex={selectedValue}
          getItemLayout={(_, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsVerticalScrollIndicator={false}
          snapToAlignment="center"
          snapToOffsets={(infiniteScroll ? wheelPickerData : data).map(
            (_, i) => i * height
          )}
          scrollEventThrottle={5}
          decelerationRate="fast"
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <WheelPickerRenderItem
              item={item}
              index={index}
              height={height}
              animatedScrollY={scrollY}
              itemsCount={visibleAreaFactor()}
              textStyle={textStyle}
            />
          )}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollForAndroid}
        />
      </View>
    </View>
  );
};

export default WheelPicker;
