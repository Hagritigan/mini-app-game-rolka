import { createContext, useContext } from 'react';

export const MarineBaseImageModalContext = createContext({
  openMarineBaseImage: () => {},
});

export const useMarineBaseImageModal = () => useContext(MarineBaseImageModalContext);
