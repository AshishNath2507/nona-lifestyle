import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { db } from "../firestore-config";
import { set, ref, update } from "firebase/database";
import { uid } from "uid";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const { title, content } = note;

  const submitNote = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      title,
      content,
      uuid,
    });
    setNote("");
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${props.tempUuid}`), {
      title,
      content,
      uuid: props.tempUuid,
    });
    props.setNotes("");
    props.setIsEdit(false);
  };

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.content}
        />
        {props.isEdit ? (
          <>
            <div className="updateBtn">
              <button type="submit" onClick={handleSubmitChange}>Update</button>
            </div>
            <button onClick={() => props.setIsEdit(false)}>
              <ClearIcon />
            </button>
          </>
        ) : (
          <button type="submit" onClick={submitNote}>
            <AddIcon />
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
