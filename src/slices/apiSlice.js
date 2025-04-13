import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merrbio.laravel.cloud/api",
    prepareHeaders: (headers, { getState }) => {
      const { userInfo } = getState().auth;
      if (userInfo && userInfo.token) {
        headers.set("Authorization", `Bearer ${userInfo.token}`);
      }
      return headers;
    },
    // credentials: 'include'
  }),
  tagTypes: [
    "Product",
    "User",
    "Category",
    "Contact",
  ],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `/categorys`,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    getProducts: builder.query({
      query: ({ keyword, category_id } = {}) => ({
        url: `/products`,
        params: {
          ...(keyword && { name: keyword }),
          ...(category_id && { category_id }),
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCategoryProducts: builder.query({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    contactWith: builder.mutation({
      query: (data) => ({
        url: `/sendEmail`,
        method: "POST",
        body: data, // Convert `data` to JSON
      }),
    }),
   
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoryProductsQuery,
  useLoginMutation,
  useRegisterMutation,
  useContactWithMutation,
} = apiSlice;
