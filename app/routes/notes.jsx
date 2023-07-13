import NewNote from "~/components/NewNote";
import newNoteStyles from "~/components/NewNote.css";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, { links as noteListLink } from "../components/NoteList";

import { useLoaderData } from "@remix-run/react";

import { redirect } from "react-router";

export default function notesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  // setHydrated(true)
  return notes;
  // return JSON(notes)
  // return new Response(JSON.stringify(notes), {headers: {'Content-Type': 'application/json'}});
}

export async function action({ request }) {
  const formData = await request.formData();
  // const noteData = {
  //     title: formData.get('title'),
  //     content: formData.get('content')
  // }
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Title must be 5 character long" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: newNoteStyles,
    },
    ...noteListLink(),
  ];
}
