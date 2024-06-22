// useAxiosConfig.js
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import axios from './axiosInstance';
import userState from '../recoil/userState';

const useAxiosConfig = () => {
  const user = useRecoilValue(userState);

  useEffect(() => {
    const requestInterceptor = axios.instance.interceptors.request.use(
      (config) => {
        if (user) {
          config.headers.Authorization = `Bearer ${user.jwt}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axios.instance;
};

export default useAxiosConfig;
