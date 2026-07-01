import baseAPI from "@/redux/api/api";


const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/users/list/',
    }),
  }),
});

export const { useGetAllUsersQuery } = userAPI;