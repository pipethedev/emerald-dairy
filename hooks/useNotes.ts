import { useFetchNotesQuery } from "@/store/slices/api";
import { updateNotes } from "@/store/slices/notes";
import { useAppDispatch } from "./store";
import { useEffect, useMemo } from "react";

export default function useNotes(type: string) {
  const { data, isFetching: loading } = useFetchNotesQuery(type);

  const fetchedNotes = useMemo(() => data?.data || [], [data?.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch only when the length of fetchedNotes changes

    dispatch(updateNotes(fetchedNotes));
  }, [fetchedNotes.length, dispatch, fetchedNotes]);

  return { fetchedNotes, loading };
}
