import createStore from 'react-waterfall';

const getInitialState = () => {
  const isAuthenticated =
    window.localStorage.getItem('isAuthenticated') || false;
  return {
    isAuthenticated
  };
};
const initialState = getInitialState();
const config = {
  initialState,
  actionsCreators: {
    setAuthenticated: isAuthenticated => {
      window.localStorage.setItem('isAuthenticated', true);
      return { isAuthenticated };
    }
  }
};

export const { Provider, connect, actions } = createStore(config);
