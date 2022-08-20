import React, { createContext } from 'react';

interface IModalsContext {
  isOpen: boolean;
  setModalOpening?: () => void;
}

const AllModalsContext = React.createContext<Partial<IModalsContext>>({});

export default AllModalsContext;
