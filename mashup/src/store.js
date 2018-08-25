import createStore from 'react-waterfall';

const getInitialState = () => {
  const isAuthenticated =
    window.localStorage.getItem('isAuthenticated') || false;
  return {
    isAuthenticated,
    myName: null
  };
};
const initialState = getInitialState();
const config = {
  initialState,
  actionsCreators: {
    setAuthenticated: (store, actions, isAuthenticated) => {
      if (isAuthenticated !== false) {
        window.localStorage.setItem('isAuthenticated', true);
      }
      return { isAuthenticated };
    },
    setMyName: (store, actions, myName) => ({ myName })
  }
};

export const { Provider, connect, actions } = createStore(config);
