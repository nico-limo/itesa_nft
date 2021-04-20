import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { useInput, useHandleFile } from "../utils/hooks/useInput";
import { ArtUpdateFunctions } from "../utils/firebase/storage/artfileUpdate";
//styles
import form from "../styles/Form.module.css";
import styles from "../styles/EditProfile.module.css";
//Components
import FormButtonSpinner from "../components/FormButtonSpinner";
// Hooks
import { loadWeb3, useBlockchainData } from "../utils/hooks/metaMask";
import { pinFileToIPFS } from "../utils/hooks/usePinFileToIPFS"

const NewArtwork = () => {
  const { newPiece, updateImgURI } = ArtFunctions();
  const { artWorkFileUpload } = ArtUpdateFunctions();
  const history = useHistory();
  const title = useInput("title");
  const description = useInput("description");
  const price = useInput("price");
  const imgURI = useHandleFile("imgURI");
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [cancelImg, setCancelImg] = useState(false);
  const [nftData, setNftData] = useState({
    name: "otra",
    keyvalues: {
      description: "values"
    }
 })
   // Metamask
  const { loadBlockchainData } = useBlockchainData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    await loadWeb3(); // Blockchain
    let { contracts, userWallet } = await loadBlockchainData(); // Blockchain
    newPiece(e, title.value, description.value, price.value).then((art) => {
      setNftData({ 
        name: title.value, 
        keyvalues: { description: description.value }})
      pinFileToIPFS(imgURI.file, nftData).then(res => {
        console.log("res", res)
        contracts
          .createCollectible(res)
          .send({ from: userWallet })
          .on("receipt", function (receipt) {
            console.log("receipt", receipt);
          })
          .on("error", function (error, receipt) {
            console.log("error", error);
          });
      })
      
            
      // artWorkFileUpload(imgURI.file, "artWorks", art.id)
      // console.log("img", imgURI.file)
        // .then((url) => updateImgURI(url, art.id))
        // .then(() => history.push(`/artwork/${art.id}`))
        // .catch(() => setShowLoadingSpinner(false));
    });
  };
  const clearFile = (e) => {
    setCancelImg(!cancelImg);
    imgURI.setFile(null);
  };
  return (
    <div>
      <div className={form.title}>Create new art piece</div>
      <div className={styles.editProfileContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="title">
              Add a title for your new piece:
            </label>
            <input
              className={form.input}
              type="text"
              name={title.name}
              value={title.value}
              onChange={title.onChange}
              placeholder="title"
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="description">
              Add a short description:
            </label>
            <textarea
              className={`${styles.input} ${styles.description}`}
              type="text"
              name={description.name}
              value={description.value}
              onChange={description.onChange}
              placeholder="description"
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="price">
              Add the price of your piece:
            </label>
            <input
              className={form.input}
              type="text"
              name={price.name}
              value={price.value}
              onChange={price.onChange}
              placeholder="price"
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="photo_picture">
              Add your piece image:
            </label>
            <div className={styles.uploadContainer}>
              <input
                className={form.input}
                type="file"
                onChange={imgURI.onChange}
                name={imgURI.name}
                file={imgURI.file}
                key={cancelImg}
              />
              {imgURI.file ? (
                <a
                  className={styles.clear}
                  href="#"
                  onClick={clearFile}
                  id="clear"
                >
                  cancel
                </a>
              ) : null}
            </div>
          </div>

          <button className={styles.submit} type="submit">
            {showLoadingSpinner ? <FormButtonSpinner /> : <div>Add piece</div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArtwork;
