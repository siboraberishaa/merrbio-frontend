import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merrbio.laravel.cloud/api",
    prepareHeaders: (headers, { getState }) => {
      const { userInfo } = getState().auth;
      if (userInfo && userInfo.token) {
        headers.set('Authorization', `Bearer ${userInfo.token}`);
      }
      return headers;
    },
    // credentials: 'include'
  }),  
    tagTypes: ['Product', 'User', 'Category', 'Partner', 'Contact', 'Newsletter', 'Review'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
              url: `/categorys`,
            }),
            providesTags: ['Category'],
            keepUnusedDataFor: 5
          }),
          
          getCategory: builder.query({
            query: (categoryId) => ({
              url: `/api/categories/category/${categoryId}/`,
            }),
            keepUnusedDataFor: 5,
          }),
          getProducts: builder.query({
            query: (category_id) => ({
              url: `/products`, 
              params: category_id ? { category_id } : {},
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5, 
          }),          
          getProduct: builder.query({
            query: (productId) => ({
              url: `/product/${productId}`,
            }),
            keepUnusedDataFor: 5,
          }),
          login: builder.mutation({
            query: (data) => ({
              url: `/login`,
              method: 'POST',
              body: data,
            }),
          }),
          register: builder.mutation({
            query: (data) => ({
              url: `/register`,
              method: 'POST',
              body: data,
            }),
          }),
          registerWithGoogle: builder.mutation({
            query: (data) => ({
              url: `/auth-receiver`,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',  // Ensure this header is present
              },
              body: JSON.stringify(data),  // Convert `data` to JSON
            }),
          }),          
          // getProfile: builder.query({
          //   query: () => ({
          //     url: `/api/users/profile`,
          //     credentials: 'include'
          //   }),
          //   keepUnusedDataFor: 5,
          // }),
          profileUpdate: builder.mutation({
            query: (data) => ({
              url: `/api/users/profile/update/`,
              method: 'PUT',
              body: data,
              credentials: 'include'
            }),
          }),
          createOrder: builder.mutation({
            query: (order) => ({
              url: `/api/orders/add/`,
              method: 'POST',
              body: order,
            }),
          }),
          getOrder: builder.query({
            query: (orderId) => ({
              url: `/api/orders/order/${orderId}`,
              credentials: 'include'
            }),
            keepUnusedDataFor: 5,
          }),
          getAllOrders: builder.query({
            query: () => ({
              url: `/api/orders/all/`,
              credentials: 'include'
            }),
            keepUnusedDataFor: 5,
          }),
          paymentIntent: builder.mutation({
            query: (orderId) => ({
              url: `/api/orders/${orderId}/create-payment-intent/`,
              method: 'POST',
            }),
          }),
          createPayment: builder.mutation({
            query: ({orderId}) => ({
              url: `/api/orders/order/${orderId}/pay/`,
              method: 'PUT',
            }),
          }),
          createCashPayment: builder.mutation({
            query: ({orderId}) => ({
              url: `/api/orders/order/${orderId}/cash/pay/`,
              method: 'PUT',
            }),
          }),
          deliveredOrder: builder.mutation({
            query: ({orderId}) => ({
              url: `/api/orders/order/${orderId}/delivered/`,
              method: 'PUT',
            }),
          }),
          deleteOrder: builder.mutation({
            query: (orderId) => ({
              url: `/api/orders/delete/order/${orderId}/`,
              method: 'DELETE',
            }),
            providesTags: ['Product'],
          }),
          getMyOrders: builder.query({
            query: () => ({
              url: `/api/orders/mine/`,
              credentials: 'include'
            }),
            keepUnusedDataFor: 5,
          }),
          getAllUsers: builder.query({
            query: () => ({
              url: `/api/users/all/`,
              credentials: 'include'
            }),
            keepUnusedDataFor: 5,
          }),
          createProduct: builder.mutation({
            query: (product) => ({
              url: `/api/products/create/product/`,
              method: 'POST',
              body: product,
            }),
          }),
          productUpdate: builder.mutation({
            query: ({data, productId}) => ({
              url: `/api/products/update/product/${productId}/`,
              method: 'PUT',
              body: data,
              credentials: 'include'
            }),
          }),
          deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `/api/products/delete/product/${productId}/`,
              method: 'DELETE',
            }),
            providesTags: ['Product'],
          }),
          getUserAdmin: builder.query({
            query: (userId) => ({
              url: `/api/users/user/${userId}/`,
            }),
            keepUnusedDataFor: 5,
          }),
          registerUserAdmin: builder.mutation({
            query: (data) => ({
              url: `/api/users/register/user/admin/`,
              method: 'POST',
              body: data,
            }),
          }),
          userUpdate: builder.mutation({
            query: ({data, userId}) => ({
              url: `/api/users/update/user/${userId}/admin/`,
              method: 'PUT',
              body: data,
              credentials: 'include'
            }),
          }),
          deleteUser: builder.mutation({
            query: (userId) => ({
              url: `/api/users/delete/user/${userId}/`,
              method: 'DELETE',
            }),
            providesTags: ['User'],
          }),
          createContact: builder.mutation({
            query: (contact) => ({
              url: `/api/contacts/add/`,
              method: 'POST',
              body: contact,
            }),
          }),
          createReview: builder.mutation({
            query: (review) => ({
              url: `/api/reviews/add/`,
              method: 'POST',
              body: review,
            }),
          }),
          getProductReviews: builder.query({
            query: (productId) => ({
              url: `/api/reviews/get/${productId}/`,
            }),
            keepUnusedDataFor: 5,
          }),
          getUserReviews: builder.query({
            query: () => ({
              url: `/api/reviews/user/`,
            }),
            keepUnusedDataFor: 5,
          }),
          getAllReviews: builder.query({
            query: () => ({
              url: `/api/reviews/all/`,
            }),
            keepUnusedDataFor: 5,
          }),
          getReview: builder.query({
            query: (reviewId) => ({
              url: `/api/reviews/review/${reviewId}/`,
            }),
            keepUnusedDataFor: 5,
          }),
          deleteReview: builder.mutation({
            query: (reviewId) => ({
              url: `/api/reviews/delete/review/${reviewId}/`,
              method: 'DELETE',
            }),
            providesTags: ['Review'],
          }),
    })
    
})


export const { 
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
    useGetCategoryQuery,
    useCategoryUpdateMutation,
    useGetProductsQuery,
    useGetProductsAdminQuery,
    useGetRecentProductsQuery,
    useGetProductQuery,
    useLoginMutation,
    useRegisterMutation,
    useRegisterWithGoogleMutation,
    useProfileUpdateMutation,
    // useGetProfileQuery,
    useCreateOrderMutation,
    useGetOrderQuery,
    useGetMyOrdersQuery,
    useGetAllOrdersQuery,
    usePaymentIntentMutation,
    useCreatePaymentMutation,
    useCreateCashPaymentMutation,
    useDeliveredOrderMutation,
    useDeleteOrderMutation,
    useGetAllUsersQuery,
    useCreateProductMutation,
    useProductUpdateMutation,
    useDeleteProductMutation,
    useGetUserAdminQuery,
    useRegisterUserAdminMutation,
    useUserUpdateMutation,
    useDeleteUserMutation,
    useCreateContactMutation,
    useCreateReviewMutation,
    useGetProductReviewsQuery,
    useGetUserReviewsQuery,
    useGetAllReviewsQuery,
    useGetReviewQuery,
    useDeleteReviewMutation,
} = apiSlice

