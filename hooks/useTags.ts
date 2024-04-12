import { useFetchTagsQuery } from "@/store/slices/api";
import { updateTags } from "@/store/slices/tags";
import { useAppDispatch } from "./store";
import { useEffect, useMemo, useState } from "react";
import { fetchTags } from "@/controllers/tag";

export default function useTags() {
  // const { data, isFetching: loading } = useFetchTagsQuery();

  const [fetchedTags, setFetchedTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const tags = await fetchTags();
        if (!tags) return;
        setFetchedTags(tags);
      } catch (error) {
        console.error("useTags_FetchedTags: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Memoize the fetched tags
  // const fetchedTags = useMemo(() => data?.data || [], [data?.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch only when the length of fetchedTags changes
    dispatch(updateTags(fetchedTags));
  }, [fetchedTags.length, dispatch, fetchedTags]);

  return { fetchedTags, loading };
}
