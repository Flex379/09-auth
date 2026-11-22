import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import { globalApi } from "./api";
import type { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await globalApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
}

export async function fetchNoteById(id: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { data } = await globalApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { data } = await globalApi.get<User | null>("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
}

export async function getMe() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { data } = await globalApi.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
}
