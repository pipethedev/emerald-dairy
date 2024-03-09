import { BASE_URL } from "@/lib/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log({ BASE_URL });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL as string,
  }),
  endpoints(builder) {
    return {
      fetchNotes: builder.query<{ data: Note[] }, string | void>({
        query(type: "all") {
          return `/api/notes?type=${type}`;
        },
        forceRefetch: () => true,
      }),
    };
  },
});

export const { useFetchNotesQuery } = apiSlice;
