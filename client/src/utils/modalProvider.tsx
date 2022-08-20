import { useState } from 'react';
import AllModalsContext from './context';

interface ContextProps {
  children: JSX.Element | JSX.Element[];
}

export const ShowModalProvider = ({ children }: ContextProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const setModalOpening = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <AllModalsContext.Provider value={{ isOpen, setModalOpening }}>
      {children}
    </AllModalsContext.Provider>
  );
};
