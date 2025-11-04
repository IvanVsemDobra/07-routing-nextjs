import axios from "axios";
import type { Note, NewNote, CategoryType } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesSimple = async (
  topic: string,
  page: number,
  tag?: string,

): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await axios.get<NotesHttpResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: topic,
        perPage: 12,
        tag,
        page,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  );
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};


//  Допоміжна функція для створення axios з токеном
const getApiInstance = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is missing!");
  
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getNotes = async (categoryId?: string, title?: string) => {
  const { data } = await axios.get<NotesHttpResponse>("/notes", {
    params: {
      categoryId,
      title,
    },
  });
  return data;
};

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
  const api = getApiInstance();
  const res = await api.get<NotesHttpResponse>("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
};

//  Отримати нотатку за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

//  Створити нову нотатку
export const createNote = async (newNote: NewNote): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.post<Note>("/notes", newNote);
  return res.data;
};

// Видалити нотатку за ID
export const deleteNote = async (id: string): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};


export const getCategories = async () => {
  const { data } = await axios.get<CategoryType[]>(`/categories`);
  return data;}