import React from "react";
import { UserFunctions } from "../utils/firebase/requests/userRequests";
import { useInput } from "../utils/hooks/useInput";
const EditProfile = () => {
    const {updateUser } = UserFunctions();
    const photo_picture = useInput("photo_picture");
    const description = useInput("description");
    const main_picture = useInput("main_picture");

  return (
    <div>
      <h2>Edit your profile</h2>
      <form>
        <input type="text" {...description} placeholder="description" />
        <input type="text" {...photo_picture} placeholder="profile image" />
        <input type="text" {...main_picture} placeholder="main image" />
        <button
          type="submit"
          onClick={(e) =>
            updateUser(
              e,
              description.value,
              photo_picture.value,
              main_picture
            )
          }
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
