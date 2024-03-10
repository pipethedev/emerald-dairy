import { useFetchTagsQuery } from "@/store/slices/api";
import { updateTags } from "@/store/slices/tags";
import { useAppDispatch } from "./store";
import { useEffect } from "react";

export default function useTags() {
  const { data, isFetching: loading } = useFetchTagsQuery();

  const fetchedTags = data?.data || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateTags(fetchedTags));
  }, [fetchedTags.length]);

  return { fetchedTags, loading };
}
