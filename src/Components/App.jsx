import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import { db } from "../firestore-config";
import { onValue, ref, remove } from "firebase/database";

function App() {
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setNotes([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          return setNotes((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);

  const deleteNote = (note) => {
    remove(ref(db, `/${note.uuid}`));
  };

  const updateNote = (note) => {
    setIsEdit(true);
    setTempUuid(note.uuid);
  };

  return (
    <div>
      <Header />
      <Search notes={notes} setNotes={setNotes} />
      <CreateArea
        tempUuid={tempUuid}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setTempUuid={setTempUuid}
        setNotes={setNotes}
      />

      {notes.map((noteItems, index) => {
        return (
          <div className="note" key={index} id={index}>
            <h1>{noteItems.title}</h1>
            <p>{noteItems.content}</p>
            <button onClick={() => deleteNote(noteItems)}>DEL</button>
            <button onClick={() => updateNote(noteItems)}>UPD</button>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
