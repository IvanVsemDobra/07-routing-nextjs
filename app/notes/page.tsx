import { dehydrate, QueryClient } from "@tanstack/react-query";
import TanStackProvider from "../../components/TanStackProvider/TanStackProvider";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";

export const revalidate = 0;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // попереднє завантаження першої сторінки (page=1, perPage 12)
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NotesClient />
    </TanStackProvider>
  );
}
