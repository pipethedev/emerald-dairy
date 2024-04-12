import { useFetchNotesQuery } from "@/store/slices/api";
import { updateNotes } from "@/store/slices/notes";
import { useAppDispatch } from "./store";
import { useEffect, useMemo, useState } from "react";
import { fetchNotes } from "@/controllers/note";

export default function useNotes(type: string) {
  // const { data, isFetching: loading } = useFetchNotesQuery(type);

  const [fetchedNotes, setFetchedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const notes = await fetchNotes(type);
        if (!notes) return;
        setFetchedNotes(notes);
      } catch (error) {
        console.error("useNotes_FetchNotes: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // const fetchedNotes = useMemo(() => data?.data || [], [data?.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch only when the length of fetchedNotes changes

    dispatch(updateNotes(fetchedNotes));
  }, [fetchedNotes.length, dispatch, fetchedNotes]);

  return { fetchedNotes, loading };
}
