import {createContext, ReactNode, useContext, useState} from 'react';

export const DateContext = createContext<DateContext | undefined>(undefined);

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('userContext must be used within a DateProvider');
  }
  return context;
};

export const DateProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateContext.Provider value={{selectedDate, setSelectedDate}}>
      {children}
    </DateContext.Provider>
  );
};
