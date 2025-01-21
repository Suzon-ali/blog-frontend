import { baseApi } from '../../api/baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: '/blogs/total-blog-count',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllBlogsQuery } = blogApi;
