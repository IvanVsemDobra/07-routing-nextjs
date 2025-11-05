"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";


import  SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "@/components/hooks/UseDebounce";

interface NotesClientProps {
  category: string;
}

export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(topic, 1000);

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, category, page }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag: category,
        search: debouncedSearch,
      }),
    placeholderData: (prev) => prev,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setTopic} searchQuery={topic} />

        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={({ selected }: { selected: number }) => setPage(selected + 1)}
/>
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}
    </div>
  );
}
