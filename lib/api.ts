import axios from "axios";
import type { Note, NewNote } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

//  Конфігурація axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

//  Отримати всі нотатки (з пагінацією та пошуком)
export const fetchNotes = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<NotesHttpResponse> => {
  const res = await api.get<NotesHttpResponse>("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
};

//  Отримати нотатку за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

//  Створити нову нотатку
export const createNote = async (newNote: NewNote): Promise<Note> => {
  const res = await api.post<Note>("/notes", newNote);
  return res.data;
};

// Видалити нотатку за ID
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};
