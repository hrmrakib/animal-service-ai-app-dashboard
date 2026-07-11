"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setProfileLoading, setUser } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/settings/settingsAPI";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const { data, isLoading } = useGetProfileQuery({}, { skip: !token });

  useEffect(() => {
    if (!token) {
      dispatch(setProfileLoading(false));
      return;
    }

    dispatch(setProfileLoading(isLoading));
  }, [isLoading, token, dispatch]);

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setUser({
          user: data.data,
          access: data.access_token || token,
          refresh: data.refresh,
        }),
      );
    }
  }, [data, token, dispatch]);

  return children;
}
