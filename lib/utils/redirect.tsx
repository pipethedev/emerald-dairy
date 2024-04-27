"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { redirectUser } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const { redirect } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirect) {
      router[redirect.action](redirect.url);
    }
    dispatch(redirectUser(null));
  }, [redirect]);
  return <></>;
}
