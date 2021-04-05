import { storage } from "../../../firebaseConfig";
import { userAtom } from "../../../state/atoms";
import { useRecoilValue } from "recoil";

import { UserFunctions } from "../requests/userRequests";

export const UserUpdateFunctions = () => {
  const user = useRecoilValue(userAtom);
  const { updateUser } = UserFunctions();

  const profileFileUpload = (imgFile, key) => {
    if (imgFile !== "") {
      const uploadTask = storage.ref(`/${key}/${user.uid}.jpg`).put(imgFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (err) => console.log(err),
        () => {
          storage
            .ref(key)
            .child(`${user.uid}.jpg`)
            .getDownloadURL()
            .then((url) => {
              updateUser({ [key]: url })});
        }
      );
    }
  };

  
  return { profileFileUpload };
};
