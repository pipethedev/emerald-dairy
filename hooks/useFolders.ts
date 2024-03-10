import { useFetchFoldersQuery } from "@/store/slices/api";
import { updateFolders } from "@/store/slices/folders";
import { useAppDispatch } from "./store";
import { useEffect, useMemo } from "react";

export default function useFolders() {
  const { data, isFetching: loading } = useFetchFoldersQuery();

  // memoize fetched folders
  const fetchedFolders = useMemo(() => data?.data || [], [data?.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch only when the length of fetchedFolders changes
    dispatch(updateFolders(fetchedFolders));
  }, [fetchedFolders.length, dispatch, fetchedFolders]);

  return { fetchedFolders, loading };
}
