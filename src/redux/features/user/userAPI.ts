import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users/list/",
        params,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = userAPI;
