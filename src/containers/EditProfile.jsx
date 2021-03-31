import React from "react";
import { UserFunctions } from "../utils/firebase/requests/userRequests";
import { useInput } from "../utils/hooks/useInput";
//styles
import form from "../styles/Form.module.css";

const EditProfile = () => {
  const { updateUser } = UserFunctions();
  const photo_picture = useInput("photo_picture");
  const description = useInput("description");
  const main_picture = useInput("main_picture");

  return (
    <>
      <div className={form.title}>Edit your profile</div>
      <div className={form.container}>
        <form className={form.form}>
          <input
            className={form.input}
            type="text"
            {...description}
            placeholder="description"
          />
          <input
            className={form.input}
            type="text"
            {...photo_picture}
            placeholder="profile image"
          />
          <input
            className={form.input}
            type="text"
            {...main_picture}
            placeholder="main image"
          />
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
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
