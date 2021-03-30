import React from "react";
//utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { useInput } from "../utils/hooks/useInput";
//styles
import form from "../styles/Form.module.css";

const NewArtwork = () => {
  const title = useInput("title");
  const descrpition = useInput("description");
  const imgURI = useInput("imgURI");
  const price = useInput("price");
  const { newPiece } = ArtFunctions();
  const { updatePiece } = ArtFunctions();
  return (
    <div>
      <div className={form.container}>
        <h2>Create new art piece:</h2>
        <form className={form.form}>
          <input
            className={form.input}
            type="text"
            {...title}
            placeholder="title"
          />
          <input
            className={form.input}
            type="text"
            {...imgURI}
            placeholder="img url"
          />
          <input
            className={form.input}
            type="text"
            {...descrpition}
            placeholder="description"
          />
          <input
            className={form.input}
            type="text"
            {...price}
            placeholder="price"
          />
          <button
            type="submit"
            onClick={(e) =>
              newPiece(
                e,
                title.value,
                imgURI.value,
                descrpition.value,
                price.value
              )
            }
          >
            add piece
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArtwork;
