import baseAPI from "@/redux/api/api";

const settingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/users/terms-and-policy/",
        method: "GET",
      }),
      providesTags: ["TermsAndConditions"],
    }),

    updateTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/users/terms-and-policy/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TermsAndConditions"],
    }),

    getAboutUs: builder.query({
      query: () => ({
        url: "/users/about-us/",
        method: "GET",
      }),
      providesTags: ["AboutUs"],
    }),

    updateAboutUs: builder.mutation({
      query: (data) => ({
        url: "/users/about-us/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useChangePasswordMutation,
} = settingsAPI;
export default settingsAPI;
