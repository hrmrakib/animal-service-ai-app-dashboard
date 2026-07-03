import baseAPI from "@/redux/api/api";

const driverAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: (params) => ({
        url: "/users/manage/transport-providers/",
        params,
      }),
    }),
  }),
});

export const { useGetAllDriversQuery } = driverAPI;
export default driverAPI;
