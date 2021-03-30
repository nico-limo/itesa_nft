import React from "react";
import { UserFunctions } from "../utils/firebase/requests/userRequests";
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { useInput } from "../utils/hooks/useInput";
const EditProfile = () => {
    const { userAndPieceUpdate } = ArtFunctions();
    const {updateUser } = UserFunctions();
    const imgURI = useInput("imgURI");
    const description = useInput("description");

  return (
    <div>
      <h2>Edit your profile</h2>
      <form>
        <input type="text" {...description} placeholder="description" />
        <input type="text" {...imgURI} placeholder="profile image" />
        <button
          type="submit"
          onClick={(e) =>
            updateUser(
              e,
              description.value,
              imgURI.value
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
