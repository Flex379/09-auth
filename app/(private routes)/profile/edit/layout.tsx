import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | NoteHub",
  description: "Edit your NoteHub profile information",
};

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
