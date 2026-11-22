import type { Note, NoteTag } from "../../types/note";
import { globalApi } from "./api";
import type { User } from "../../types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface AuthRequest {
  email: string;
  password: string;
}

interface CheckSessionResponse {
  success: boolean;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams) {
  const { data } = await globalApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      ...(tag !== "all" ? { tag } : {}),
    },
  });
  return data;
}

export async function createNote({ title, content, tag }: CreateNoteData) {
  const { data } = await globalApi.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await globalApi.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await globalApi.get<Note>(`/notes/${id}`);
  return data;
}

export async function register(body: AuthRequest) {
  const { data } = await globalApi.post<User>("/auth/register", body);
  return data;
}

export async function login(body: AuthRequest) {
  const { data } = await globalApi.post<User>("/auth/login", body);
  return data;
}

export async function logout() {
  const { data } = await globalApi.post("/auth/logout");
  return data;
}

export async function checkSession() {
  const { data } = await globalApi.get<CheckSessionResponse>("/auth/session");
  return data;
}

export async function getMe() {
  const { data } = await globalApi.get<User>("/users/me");
  return data;
}

export async function updateMe(username: string) {
  const { data } = await globalApi.patch<User>("/users/me", { username });
  return data;
}
