import { NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: NoteStore["draft"] = {
  title: "",
  content: "",
  tag: "Todo",
};

export interface NoteStore {
  draft: {
    title: string;
    content: string;
    tag: NoteTag;
  };
  setDraft: (note: NoteStore["draft"]) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
