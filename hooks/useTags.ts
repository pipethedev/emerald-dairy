import { useFetchTagsQuery } from "@/store/slices/api";
import { updateTags } from "@/store/slices/tags";
import { useAppDispatch } from "./store";
import { useEffect, useMemo } from "react";

export default function useTags() {
  const { data, isFetching: loading } = useFetchTagsQuery();

  // Memoize the fetched tags
  const fetchedTags = useMemo(() => data?.data || [], [data?.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch only when the length of fetchedTags changes
    dispatch(updateTags(fetchedTags));
  }, [fetchedTags.length, dispatch, fetchedTags]);

  return { fetchedTags, loading };
}
