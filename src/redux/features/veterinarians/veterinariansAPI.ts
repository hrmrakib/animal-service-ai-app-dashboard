import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getVeterinarians: builder.query({
      query: (params) => ({
        url: "/users/manage/veterinarians/",
        params,
      }),
    }),

    getVeterinarianDetails: builder.query<
      void,
      {
        role: string;
        id: string;
        page?: number;
        limit?: number;
        search?: string;
      }
    >({
      query: ({ role, id, page, limit, search }) => ({
        url: `/users/${role}/${id}/analytics/`,
        params: { page, limit, search },
      }),
    }),
  }),
});

export const { useGetVeterinariansQuery, useGetVeterinarianDetailsQuery } =
  userAPI;
