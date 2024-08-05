import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { Animated, View } from 'react-native';
import Constants from '../../constants';
import { useWheelPicker } from '../../hooks';
import WheelPickerElement from './WheelPickerElement';
import styles from './WheelPickerStyles';
import type { WheelPickerProps, WheelPickerRef } from './WheelPickerTypes';

export const wheelPickerRef = React.createRef<WheelPickerRef>();

/**
 * The wheel picker component
 * @param selectedIndex - The index of the selected value
 * @param data - The data to be displayed in the wheel picker
 * @param onChangeValue - Function to handle the value change
 * @param elementHeight - The height of each element in the wheel picker
 * @param restElements - The number of elements to be displayed above and below the selected element
 * @param decelerationRate - The deceleration rate of the scroll view
 * @param loopCount - The number of times the data should be looped
 * @param selectedLayoutStyle - The style of the selected layout
 * @param containerStyle - The style of the container
 * @param elementContainerStyle - The style of the element container
 * @param elementTextStyle - The style of the element text
 * @param containerProps - The props for the container
 * @param flatListProps - The props for the flat list
 */
const WheelPicker = forwardRef<WheelPickerRef, WheelPickerProps>(
  (
    {
      selectedIndex,
      data,
      onChangeValue,
      elementHeight = Constants.elementHeight,
      restElements = Constants.restElements,
      decelerationRate = Constants.decelerationRate,
      loopCount = Constants.loopCount,
      selectedLayoutStyle = {},
      containerStyle = {},
      elementContainerStyle = {},
      elementTextStyle = {},
      containerProps = {},
      flatListProps = {},
      infiniteScroll = true,
      initialSelectedIndex = 0,
    },
    ref
  ) => {
    const {
      currentScrollIndex,
      containerHeight,
      flatListRef,
      arrayElements,
      scrollY,
      onScrollListener,
      handleMomentumScrollEnd,
      offsets,
      initialScrollIndex,
    } = useWheelPicker({
      loopCount,
      onChangeValue,
      selectedIndex,
      data,
      restElements,
      decelerationRate,
      elementHeight,
      infiniteScroll,
      initialSelectedIndex,
    });

    useImperativeHandle(ref ?? wheelPickerRef, () => ({
      scrollToIndex: (index: number) => {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
        });
        const originalValue = data[index];
        onChangeValue(index ?? 0, originalValue?.toString() ?? '');
      },
    }));

    const renderItem = useCallback(
      ({ item, index }: { item: string | null; index: number }) => (
        <WheelPickerElement
          key={`wheel-picker-${index}`}
          index={index}
          item={item}
          elementContainerStyle={elementContainerStyle}
          elementTextStyle={elementTextStyle}
          elementHeight={elementHeight}
          currentScrollIndex={currentScrollIndex}
          restElements={restElements}
        />
      ),
      [
        currentScrollIndex,
        restElements,
        elementContainerStyle,
        elementTextStyle,
        elementHeight,
      ]
    );

    return (
      <View
        style={[containerStyle, { height: containerHeight }]}
        {...containerProps}>
        <View
          style={[
            styles.selectedLayoutViewStyle,
            selectedLayoutStyle,
            {
              transform: [{ translateY: -elementHeight / 2 }],
              height: elementHeight,
            },
          ]}
        />
        <Animated.FlatList<string | null>
          {...flatListProps}
          nestedScrollEnabled
          ref={flatListRef}
          style={styles.flatListStyle}
          maxToRenderPerBatch={arrayElements?.length * 2}
          updateCellsBatchingPeriod={200}
          showsVerticalScrollIndicator={false}
          data={arrayElements as Array<string | null>}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          snapToOffsets={offsets}
          decelerationRate={decelerationRate}
          initialScrollIndex={initialScrollIndex}
          getItemLayout={(_data, index) => ({
            length: elementHeight,
            offset: elementHeight * index,
            index,
          })}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
              listener: onScrollListener,
            }
          )}
          onMomentumScrollEnd={handleMomentumScrollEnd}
        />
      </View>
    );
  }
);

export default WheelPicker;
