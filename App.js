import React, { useState } from "react";
import "./styles.css";
function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const handleNoteSave = (note) => setNotes([...notes, note]);
  const handleNoteClick = (note) => setCurrentNote(note);
  const handleReturnHome = () => setCurrentNote(null);
  const handleNoteDelete = () => {
    setNotes(notes.filter((noteItem) => noteItem !== currentNote));
    setCurrentNote(null);
  };
  return (
    <div className="App">
      <header>
        <h1>Notes Application</h1>
      </header>
      <main>
        {currentNote ? (
          <div className="note-display">
            <button onClick={handleReturnHome}>Home</button>
            <h2>{currentNote.title}</h2>
            <p>{currentNote.content}</p>
            <button onClick={handleNoteDelete}>Delete Note</button>
          </div>
        ) : (
          <div className="note-creation">
            <NoteForm onSave={handleNoteSave} />
            <Sidebar notes={notes} onNoteClick={handleNoteClick} />
          </div>
        )}
      </main>
      <footer>
        <p>
          If you wish to view or download this website's source code, please
          take a look at{" "}
          <a
            href="https://github.com/NathanMcD1/Project4"
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub Repository.
          </a>
        </p>
      </footer>
    </div>
  );
}
function NoteForm({ onSave }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
    setNote({ title: "", content: "" });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Your note..."
        value={note.content}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Note</button>
    </form>
  );
}
function Sidebar({ notes, onNoteClick }) {
  return (
    <div className="sidebar">
      <h2>Saved Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <button onClick={() => onNoteClick(note)}>{note.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
