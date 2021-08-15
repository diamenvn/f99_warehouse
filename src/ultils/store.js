import React, {
    
} from 'react';
// ./src/utils/store.js
export const StoreContext = React.createContext(null);

export default ({ children }) => {

  const [info, setInfo] = React.useState([]);

  const store = {
    info: [info, setInfo]
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

