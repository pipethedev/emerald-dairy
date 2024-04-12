import { useFetchFoldersQuery } from "@/store/slices/api";
import { updateFolders } from "@/store/slices/folders";
import { useAppDispatch } from "./store";
import { useEffect, useMemo, useState } from "react";
import { fetchFolders } from "@/controllers/folder";

export default function useFolders() {
  // const { data, isFetching: loading } = useFetchFoldersQuery();

  const [fetchedFolders, setFetchedFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const Folders = await fetchFolders();
        if (!Folders) return;
        setFetchedFolders(Folders);
      } catch (error) {
        console.error("useFolders_FetchedFolders: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // memoize fetched folders
  // const fetchedFolders = useMemo(() => data?.data || [], [data?.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch only when the length of fetchedFolders changes
    dispatch(updateFolders(fetchedFolders));
  }, [fetchedFolders.length, dispatch, fetchedFolders]);

  return { fetchedFolders, loading };
}
