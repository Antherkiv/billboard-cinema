import axios from 'axios';
import { apis } from './Api';
import { actions } from './store';

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
