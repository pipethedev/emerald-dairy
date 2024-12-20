"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirectUser } from "@/store/slices/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

export default function Redirect() {
  const { redirect } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirect) {
      router[redirect.action](redirect.url);
    }
    dispatch(redirectUser(null));
  }, [redirect, dispatch, router]);
  return <></>;
}
