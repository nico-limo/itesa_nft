import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//Utils
import { UserFunctions } from "../utils/firebase/requests/userRequests";
import { useInput, useHandleFile } from "../utils/hooks/useInput";
import { UserUpdateFunctions } from "../utils/firebase/storage/profileUpdate";
//styles
import styles from "../styles/EditProfile.module.css";
// Recoil
import { userAtom } from "../state/atoms";
import { useRecoilValue } from "recoil";
// Spinner
import FormButtonSpinner from "../components/FormButtonSpinner";

const EditProfile = ({id}) => {
  const { updateUser } = UserFunctions();
  const user = useRecoilValue(userAtom);
  const description = useInput("description", user.description);
  const avatar = useHandleFile("avatar");
  const main_picture = useHandleFile("main_picture");
  const { profileFileUpload } = UserUpdateFunctions();
  const history = useHistory();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  useEffect(() => {
    description.setValue(user.description);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    const mainPicturePromise = profileFileUpload(
      main_picture.file,
      "main_picture"
    );
    const profilePicturePromise = profileFileUpload(
      avatar.file,
      "photo_profile"
    );
    updateUser({ description: description.value })
      .then(() => Promise.all([mainPicturePromise, profilePicturePromise]))
      .then(() => history.push("/me"))
      .catch(() => setShowLoadingSpinner(false));
  };

  return (
    <>
      <div className={styles.title}>Edit your profile</div>
      <div className={styles.editProfileContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="Your description"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="photo_picture">
              Add a profile picture:
            </label>
            <input className={`${styles.input}`} type="file" {...avatar} />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="main_picture">
              Add a background picture:
            </label>
            <input className={styles.input} type="file" {...main_picture} />
          </div>
          <button type="submit">
            {showLoadingSpinner ? (
              <FormButtonSpinner />
            ) : (
              <div>Save Changes</div>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
