import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//Utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { useInput } from "../utils/hooks/useInput";

//styles
import styles from "../styles/EditProfile.module.css";
// Recoil
import { singlePieceAtom, userAtom, metaMaskUserAccount } from "../state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
// Spinner
import FormButtonSpinner from "../components/FormButtonSpinner";
import BigSpinner from "../components/BigSpinner";

// Hooks
// import { loadWeb3, useBlockchainData } from "../utils/hooks/metaMask";
// import { pinFileToIPFS } from "../utils/hooks/usePinFileToIPFS";

const EditArtWork = ({ id }) => {
  const { getSinglePiece, updatePiece } = ArtFunctions();
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom);
  const user = useRecoilValue(userAtom);
  const title = useInput("title", singlePiece.title);
  const price = useInput("price", singlePiece.price);
  const description = useInput("description", singlePiece.description);
  const onSale = useInput("onSale", singlePiece.onSale);
  const history = useHistory();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  // // Metamask
  // const { loadBlockchainData } = useBlockchainData();

  useEffect(() => {
    title.setValue(singlePiece.title);
    price.setValue(singlePiece.price);
    description.setValue(singlePiece.description);
    onSale.setValue(singlePiece.onSale);
  }, [singlePiece]);

  useEffect(() => {
    if (onSale.value === "true") onSale.setValue(true);
    if (onSale.value === "false") onSale.setValue(false);
  }, [onSale]);

  useEffect(() => {
    if (!singlePiece) {
      getSinglePiece(id).then((res) => {
        setSinglePieceAtom(res);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    updatePiece(title.value, description.value, price.value, id, onSale.value)
      .then(() => history.push(`/artwork/${id}`))
      .catch(() => setShowLoadingSpinner(false));
  };

  return singlePiece ? (
    singlePiece.ownerId === user.uid ? (
      <>
        <div className={styles.title}>Edit your profile</div>
        <div className={styles.editProfileContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="title">
                Edit your Title:
              </label>
              <input
                className={`${styles.input}`}
                type="text"
                name={title.name}
                value={title.value ? title.value : ""}
                onChange={title.onChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="price">
                Edit your Price:
              </label>
              <input
                className={styles.input}
                type="text"
                name={price.name}
                value={price.value ? price.value : ""}
                onChange={price.onChange}
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
                value={description.value ? description.value : ""}
                onChange={description.onChange}
                placeholder="Your description"
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.radioContainer}>
                <input
                  className={styles.input}
                  type="radio"
                  name={onSale.name}
                  value={true}
                  checked={onSale.value === true}
                  onChange={onSale.onChange}
                />
                <label className={styles.label} htmlFor="onSale">
                  On Sale
                </label>
                <input
                  className={styles.input}
                  type="radio"
                  name={onSale.name}
                  value={false}
                  checked={onSale.value === false}
                  onChange={onSale.onChange}
                />
                <label className={styles.label} htmlFor="onSale">
                  Not On Sale
                </label>
              </div>
            </div>
            <button className={styles.submit} type="submit">
              {showLoadingSpinner ? (
                <FormButtonSpinner />
              ) : (
                <div>Save Changes</div>
              )}
            </button>
          </form>
        </div>
      </>
    ) : (
      <>
        <div className={styles.title}>Access Denied</div>
        <img
          className={styles.deniedIcon}
          src="/denied.png"
          alt="Access Denied"
        />
      </>
    )
  ) : (
    <BigSpinner />
  );
};

export default EditArtWork;
