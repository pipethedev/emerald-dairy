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
      fetchTags: builder.query<{ data: Tag[] }, string | void>({
        query() {
          return `/api/tags`;
        },
        forceRefetch: () => true,
      }),
      fetchFolders: builder.query<{ data: Folder[] }, string | void>({
        query() {
          return `/api/folders`;
        },
        forceRefetch: () => true,
      }),
    };
  },
});

export const { useFetchNotesQuery, useFetchTagsQuery, useFetchFoldersQuery } =
  apiSlice;
