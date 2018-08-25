import React from 'react';
export const apis = {
  authBaseURL: 'http://localhost:8000',
  moviesBaseURL: 'http://localhost:8001',
  commentsBaseURL: 'http://localhost:8002'
};

export const getUserName = () =>
  axios(`${apis.authBaseURL}/who-am-i`, {
    method: 'get',
    withCredentials: true
  })
    .then(({ data: { full_name: fullName } }) => actions.setMyName(fullName))
    .catch(() => {
      window.localStorage.removeItem('isAuthenticated');
      actions.setAuthenticated(false);
    });

export default React.createContext({});
