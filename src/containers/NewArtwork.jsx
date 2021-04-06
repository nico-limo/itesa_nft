import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { useInput, useHandleFile } from "../utils/hooks/useInput";
import { ArtUpdateFunctions } from "../utils/firebase/storage/artfileUpdate";
//styles
import form from "../styles/Form.module.css";
//Components
import FormButtonSpinner from "../components/FormButtonSpinner";

const NewArtwork = () => {
  const { newPiece, updateImgURI } = ArtFunctions();
  const { artWorkFileUpload } = ArtUpdateFunctions();
  const history = useHistory();
  const title = useInput("title");
  const descrpition = useInput("description");
  const price = useInput("price");
  const imgURI = useHandleFile("imgURI");
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    newPiece(e, title.value, descrpition.value, price.value).then((id) => {
      artWorkFileUpload(imgURI.file, "artWorks", id)
        .then((url) => updateImgURI(url, id))
        .then(() => history.push(`/artwork/${id}`))
        .catch(() => setShowLoadingSpinner(false));
    });
  };
  return (
    <div>
      <div className={form.title}>Create new art piece</div>
      <div className={form.container}>
        <form onSubmit={handleSubmit} className={form.form}>
          <input
            className={form.input}
            type="text"
            name={title.name}
            value={title.value}
            onChange={title.onChange}
            placeholder="title"
          />
          <input
            className={form.input}
            type="text"
            name={descrpition.name}
            value={descrpition.value}
            onChange={descrpition.onChange}
            placeholder="description"
          />
          <input
            className={form.input}
            type="text"
            name={price.name}
            value={price.value}
            onChange={price.onChange}
            placeholder="price"
          />
          <input className={form.input} type="file" {...imgURI} />
          <button type="submit">
            {showLoadingSpinner ? <FormButtonSpinner /> : <div>Add piece</div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArtwork;
