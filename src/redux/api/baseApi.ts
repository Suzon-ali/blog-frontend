import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logOut, setUser } from '../features/auth/authSlice';
import { apiUrl } from '../../config/config';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseApiWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    //send refreshtoken
    const res = await fetch(`${apiUrl}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );
    } else {
      api.dispatch(logOut());
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseApiWithRefreshToken,
  endpoints: () => ({}),
});
