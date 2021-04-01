import React from "react";
import { UserFunctions } from "../utils/firebase/requests/userRequests";
import { useInput } from "../utils/hooks/useInput";
//styles
import styles from "../styles/EditProfile.module.css";

const EditProfile = () => {
  const { updateUser } = UserFunctions();
  const photo_picture = useInput("photo_picture");
  const description = useInput("description");
  const main_picture = useInput("main_picture");

  return (
    <>
      <div className={styles.title}>Edit your profile</div>
      <div className={styles.editProfileContainer}>
        <form className={styles.form}>
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
              {...photo_picture}
              placeholder="Profile Picture"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="main_picture">
              Add a background picture:
            </label>
            <input
              className={styles.input}
              type="text"
              {...main_picture}
              placeholder="Background image"
            />
          </div>
          <button
            type="submit"
            onClick={(e) =>
              updateUser(
                e,
                description.value,
                photo_picture.value,
                main_picture.value
              )
            }
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
