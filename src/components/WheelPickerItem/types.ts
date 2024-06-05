import type { StyleProp, TextStyle } from 'react-native';
import type { ObjectData } from '../WheelPicker/types';

export interface WheelPickerItemProps {
  itemStyle: StyleProp<TextStyle>; // Style applied to the text of each item
  item: string | number | ObjectData; // The item in the list
  height: number; // Height of each item
  index: number; // Index of the item in the list
  currentScrollIndex: number; // Current scroll position index
  surroundingItemsCount: number; // Number of items displayed above and below the selected item
  selectedItemStyle: StyleProp<TextStyle>; // Style applied to the text of the selected item
  itemsAngle: number[]; // Angles of items above and below the selected item
  itemsOpacity: number[]; // Opacities of items above and below the selected item
}
