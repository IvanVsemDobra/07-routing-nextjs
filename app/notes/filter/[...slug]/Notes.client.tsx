"use client";
import { useState } from "react";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/components/hooks/UseDebounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import Error from "./error";
import Loading from "@/app/loading";
interface NotesClientProps {
  category: string | undefined;
}
export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", { search: topic, tag: category, page: page }],
    queryFn: () => fetchNotes({ page, perPage: 12, search: topic }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleSearch = useDebounce((topic: string) => {
    setTopic(topic);
    setPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={topic} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
  totalPages={data?.totalPages}
  currentPage={page}
  onPageChange={({ selected }) => setPage(selected + 1)} 
/>
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loading />}
      {isError && <Error error={error} />}
      {data && <NoteList notes={data.notes} />}
     {isModalOpen && (
  <Modal onClose={closeModal}>
    <NoteForm 
      onCancel={closeModal}
      onCreated={closeModal}/>
  </Modal>
)}
    </div>
  );
}