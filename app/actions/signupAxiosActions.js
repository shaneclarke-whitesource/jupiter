import axios from 'axios';

export const callSignup = (params, endpoint) => {
  return axios.get(
    `/api/signup/v1/${endpoint}`,
    {
      params: { ...params },
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      withCredentials: true
    }
  );
};

export const postSignup = (params, endpoint) => {
  return axios.post(
    `/api/signup/v1/${endpoint}`, { ...params },
    {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
  );
};
