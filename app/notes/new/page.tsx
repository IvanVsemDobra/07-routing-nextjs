"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NewNotePage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/notes");
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <NoteForm
        onCreated={handleCreated}
        onCancel={() => router.push("/notes")}
      />
    </div>
  );
}
