import { useFetchFoldersQuery } from "@/store/slices/api";
import { updateFolders } from "@/store/slices/folders";
import { useAppDispatch } from "./store";
import { useEffect } from "react";

export default function useFolders() {
  const { data, isFetching: loading } = useFetchFoldersQuery();

  const fetchedFolders = data?.data || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateFolders(fetchedFolders));
  }, [fetchedFolders.length, dispatch, fetchedFolders]);

  return { fetchedFolders, loading };
}
