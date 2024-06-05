import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ObjectData {
  label: string | number;
  value: string | number;
}

export interface WheelPickerProps {
  data: string[] | number[] | ObjectData[]; // List of items to display in the picker
  onValueChange: (value: string | number) => void; // Callback when the selected value changes
  infinite?: boolean; // Whether the picker should loop infinitely
  itemHeight?: number; // Height of each item in the picker
  surroundingItemsCount?: number; // Number of items displayed above and below the selected item
  itemStyle?: StyleProp<TextStyle>; // Style applied to the text of each item
  selectedItemContainerStyle?: ViewStyle; // Style for the container of the selected item
  wheelPickerContainerStyle?: ViewStyle; // Style for the container of the wheel picker
  initialSelectedItem?: number | string; // Initially selected item in the picker
  selectedItemStyle?: StyleProp<TextStyle>; // Style applied to the text of the selected item
  itemsAngle?: number[]; // Angles of items above and below the selected item
  itemsOpacity?: number[]; // Opacities of items above and below the selected item
}
