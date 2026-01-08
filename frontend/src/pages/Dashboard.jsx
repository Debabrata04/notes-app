import API from "../api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!title || !description) return;
    await API.post("/notes", { title, description });
    setTitle("");
    setDescription("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="navbar">
        <h3>My Notes</h3>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="dashboard">
        <div className="note-form">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addNote}>Add</button>
        </div>

        <div className="notes-grid">
          {notes.map((n) => (
            <div className="note-card" key={n._id}>
              <h4>{n.title}</h4>
              <p>{n.description}</p>
              <button onClick={() => deleteNote(n._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
