import { storage } from "../../../firebaseConfig";
export const ArtUpdateFunctions = () => {

  const artWorkFileUpload = (imgFile, key, id) => {
    return new Promise((resolve, reject) => {
      if (imgFile !== "") {
        const uploadTask = storage.ref(`/${key}/${id}.jpg`).put(imgFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (err) => reject(err),
          () => {
            storage
              .ref(key)
              .child(`${id}.jpg`)
              .getDownloadURL()
              .then((url) => {
                resolve(url)
              });
          }
        );
      } else resolve("");
    });
  };

  return { artWorkFileUpload };
};