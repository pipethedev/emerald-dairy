import { useFetchNotesQuery } from "@/store/slices/api";
import { updateNotes } from "@/store/slices/notes";
import { useAppDispatch } from "./store";
import { useEffect } from "react";

export default function useNotes(type: string) {
  const { data, isFetching: loading } = useFetchNotesQuery(type);

  const fetchedNotes = data?.data || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateNotes(fetchedNotes));
  }, [fetchedNotes.length]);

  return { fetchedNotes, loading };
}
