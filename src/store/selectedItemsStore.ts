import { create } from 'zustand';

export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
}

interface SelectedItemsState {
  selectedItems: Character[];
  isSelected: (id: number) => boolean;
  toggleItem: (item: Character) => void;
  clearAll: () => void;
}

export const useSelectedItemsStore = create<SelectedItemsState>((set, get) => ({
  selectedItems: [],

  isSelected: (id) => {
    return get().selectedItems.some((item) => item.id === id);
  },

  toggleItem: (item) => {
    const { selectedItems } = get();
    const exists = selectedItems.find((el) => el.id === item.id);

    if (exists) {
      set({
        selectedItems: selectedItems.filter((el) => el.id !== item.id),
      });
    } else {
      set({ selectedItems: [...selectedItems, item] });
    }
  },

  clearAll: () => {
    set({ selectedItems: [] });
  },
}));
