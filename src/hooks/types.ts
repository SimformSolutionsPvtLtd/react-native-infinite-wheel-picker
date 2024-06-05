import type { MutableRefObject } from 'react';
import type { FlatList } from 'react-native';
import type { ObjectData } from 'src/components/WheelPicker/types';

export interface UseWheelPickerProps {
  listRef: React.RefObject<FlatList>; // Reference to the FlatList component.
  data: number[] | string[] | ObjectData[]; // Array of data items to be displayed in the list. Can be an array of numbers, strings, or objects.
  itemHeight: number; // Height of each item in the list.
  infinite: boolean; // Flag indicating whether infinite scrolling is enabled.
  setSelectedItem: (val: any) => void; // Function to set the selected item.
  surroundingItemsCount: number; // Number of items displayed above and below the selected item.
  initialLoading: MutableRefObject<boolean>; // Reference to the initial loading state.
  totalItemToDisplayInList: number; // Number of items to display in the list.
}

export interface UseWheelPickerItemProps {
  itemsAngle: number[]; // Array of angles for the rows of items above and below the selected item.
  itemsOpacity: number[]; // Array of opacities for the rows of items above and below the selected item.
  surroundingItemsCount: number; // Number of items displayed above and below the selected item.
  currentScrollIndex: number; // Current scroll index in the list.
  index: number; // Index of the current item.
}
