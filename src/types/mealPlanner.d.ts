interface CalendarStripProps {
  selectedDate: Date;
  onDayPress?: (date: any) => void;
}

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onPressBack: () => void;
}
