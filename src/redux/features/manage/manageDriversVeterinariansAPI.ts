import baseAPI from "@/redux/api/api";

export interface TransportProviderApi {
  id: number;
  profile_pic: string | null;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  is_verified: boolean;
  rider_status: string;
  license: string | null;
  license_expiry: string | null;
  license_type: string | null;
  year_of_experience: number;
  vehicle_type: string | null;
  vehicle_year: number | null;
  average_rating: number;
  total_reviews: number;
}

const manageDriversVeterinariansAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: (params) => ({
        url: "/users/manage/transport-providers/",
        method: "GET",
        params,
      }),
    }),

    getAllVeterinarians: builder.query({
      query: (params) => ({
        url: "/users/manage/veterinarians/",
        method: "GET",
        params,
      }),
    }),

    getAllSellers: builder.query({
      query: (params) => ({
        url: "/users/manage/sellers/",
        method: "GET",
        params,
      }),
    }),

    acceptUser: builder.mutation({
      query: (id) => ({
        url: `/users/verify/${id}/accept/`,
        method: "POST",
      }),
    }),

    rejectUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/verify/${id}/reject/`,
        method: "POST",
        body: data,
      }),
    }),

    resubmitUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/verify/${id}/resubmit/`,
        method: "POST",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/list/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDriversQuery,
  useGetAllVeterinariansQuery,
  useAcceptUserMutation,
  useRejectUserMutation,
  useResubmitUserMutation,
  useDeleteUserMutation,
} = manageDriversVeterinariansAPI;
export default manageDriversVeterinariansAPI;
