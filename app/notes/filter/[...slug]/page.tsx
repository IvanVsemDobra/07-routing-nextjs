import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Tag } from "@/types/note";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface NotesPageProps {
  params: {
    slug?: string[];
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  // Безпечне отримання масиву
  const slugArray = Array.isArray(params.slug) ? params.slug : [];

  
  const tag: Tag | string =
    slugArray.length > 0 && slugArray[0] !== "all" ? slugArray[0] : "";

  const queryClient = new QueryClient();

  // Prefetch для серверного рендерингу
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