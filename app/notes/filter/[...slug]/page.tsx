
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Tag } from "@/lib/types/note";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  // Гарантуємо, що slug завжди масив
  const slugArray = Array.isArray(params.slug) ? params.slug : ["all"];

  // Безпечне отримання тегу
  const tag: Tag | string = slugArray[0] === "all" ? "" : slugArray[0];

 
  const queryClient = new QueryClient();

  // Попереднє завантаження нотаток
  await queryClient.prefetchQuery({
    queryKey: ["notes", { searchQuery: "", currentPage: 1, tag }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={tag} />
    </HydrationBoundary>
  );
}



