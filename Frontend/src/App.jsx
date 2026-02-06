import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  // GET notes
  async function getData() {
    const res = await axios.get("https://nalar-notes-fullstack.onrender.com/api/note");
    setNotes(res.data.notes);
  }

  useEffect(() => {
    getData();
  }, []);

  // ADD note
  async function formHandel(e) {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    await axios.post("https://nalar-notes-fullstack.onrender.com/api/note", {
      title,
      content,
    });

    e.target.reset();
    getData();
  }

  // EDIT note
  async function editHandaler(e, id) {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    await axios.patch(`https://nalar-notes-fullstack.onrender.com/api/note/${id}`, {
      title,
      content,
    });

    setEditId(null);
    getData();
  }

  // DELETE note
  async function deleteNote(id) {
    await axios.delete(`https://nalar-notes-fullstack.onrender.com/api/note/${id}`);
    getData();
  }

  return (
    <main className="container">
      <h1>Notes App</h1>

      {/* ADD FORM */}
      <form className="add-form" onSubmit={formHandel}>
        <input name="title" placeholder="Enter title" required />
        <input name="content" placeholder="Enter content" required />
        <button>Add Note</button>
      </form>

      {/* NOTES LIST */}
      <div className="notes-wrapper">
        {notes.map(({ _id, title, content }) => (
          <div className="note-card" key={_id}>
            <h2>{title}</h2>
            <p>{content}</p>

            <div className="actions">
              <button className="delete" onClick={() => deleteNote(_id)}>
                Delete
              </button>
              <button className="edit" onClick={() => setEditId(_id)}>
                Edit
              </button>
            </div>

            {/* EDIT FORM */}
            {/* //!  editId === _id this chekc is for is the edit id is same with 
            //! same note id if yes then show only the same note not other   */}
            {editId === _id && (
              <form
                className="edit-form"
                onSubmit={(e) => editHandaler(e, _id)}
              >
                <input name="title" placeholder="New title" required />
                <input name="content" placeholder="New content" required />
                <button>Update</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
