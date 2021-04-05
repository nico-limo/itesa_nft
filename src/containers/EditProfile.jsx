import React from "react";
//Utils
import { UserFunctions } from "../utils/firebase/requests/userRequests";
import { useInput, useHandleFile } from "../utils/hooks/useInput";
import { UserUpdateFunctions } from "../utils/firebase/storage/profileUpdate";
//styles
import styles from "../styles/EditProfile.module.css";

const EditProfile = () => {
  const { updateUser } = UserFunctions();
  const description = useInput("description");
  const avatar = useHandleFile('avatar');
  const main_picture = useHandleFile('main_picture');
  const {profileFileUpload} = UserUpdateFunctions();



  const handleSubmit = async (e) => {
    e.preventDefault();
    profileFileUpload(main_picture.file,"main_picture");
    await updateUser({description:description.value});
    profileFileUpload(avatar.file,"photo_profile");

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
              {...description}
              placeholder="Your description"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="photo_picture">
              Add a profile picture:
            </label>
            <input
              className={`${styles.input}`}
              type="file"
              {...avatar}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="main_picture">
              Add a background picture:
            </label>
            <input
              className={styles.input}
              type="file"
              {...main_picture}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
