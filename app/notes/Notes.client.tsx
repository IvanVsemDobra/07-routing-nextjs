"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, type NotesHttpResponse } from "@/lib/api";
import { useDebounce } from "@/components/hooks/UseDebounce";

import SearchBar from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNote, setSearchNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(searchNote, 500);

  const { data, isLoading, isError, isSuccess } = useQuery<NotesHttpResponse>({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: debouncedSearch.trim(),
      }),
    placeholderData: (prevData) => prevData,
  });

  useEffect(() => {
    if (
      isSuccess &&
      debouncedSearch.trim() !== "" &&
      data?.notes.length === 0
    ) {
      toast.error("No notes found for your search.", { id: "no-results" });
    }
  }, [isSuccess, data?.notes, debouncedSearch]);

  const handleChange = (query: string) => {
    setCurrentPage(1);
    setSearchNote(query);
  };

  const handleCreated = () => {
    closeModal();
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };
  <SearchBar onChange={handleChange} />;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />

        {isSuccess && !isError && data?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          />
        )}

        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCreated={handleCreated} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
