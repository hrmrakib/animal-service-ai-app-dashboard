import baseAPI from "@/redux/api/api";

interface INotification {
  title: string;
  message: string;
  role?: string;
  user_id?: string;
}

const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation<void, INotification>({
      query: (notification) => ({
        url: "/users/notifications/send/",
        method: "POST",
        body: notification,
      }),
    }),
  }),
});

export const { useSendNotificationMutation } = notificationAPI;
export default notificationAPI;
