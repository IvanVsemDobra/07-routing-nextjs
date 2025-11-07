"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  //  Мутація для видалення нотатки
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // Після видалення — оновлюємо кеш
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes || notes.length === 0) {
    return <p className={css.empty}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            {note.tag && <span className={css.tag}>#{note.tag}</span>}
          </Link>
          <button onClick={() => mutate(note.id)} className={css.deleteButton}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
