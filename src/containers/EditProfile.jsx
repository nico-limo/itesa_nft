import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
//Utils
import { UserFunctions } from "../utils/firebase/requests/userRequests"
import { useInput, useHandleFile } from "../utils/hooks/useInput"
import { UserUpdateFunctions } from "../utils/firebase/storage/profileUpdate"
//styles
import styles from "../styles/EditProfile.module.css"
// Recoil
import { userAtom } from "../state/atoms"
import { useRecoilValue } from "recoil"
// Spinner
import FormButtonSpinner from "../components/FormButtonSpinner"

const EditProfile = ({ id }) => {
  const { updateUser } = UserFunctions()
  const user = useRecoilValue(userAtom)
  const description = useInput("description", user.description)
  const avatar = useHandleFile("avatar")
  const main_picture = useHandleFile("main_picture")
  const { profileFileUpload } = UserUpdateFunctions()
  const history = useHistory()
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const [cancelMain, setCancelMain] = useState(false)
  const [cancelAvatar, setCancelAvatar] = useState(false)

  useEffect(() => {
    description.setValue(user.description)
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowLoadingSpinner(true)
    const mainPicturePromise = profileFileUpload(
      main_picture.file,
      "main_picture"
    )
    const profilePicturePromise = profileFileUpload(
      avatar.file,
      "photo_profile"
    )
    updateUser({ description: description.value })
      .then(() => Promise.all([mainPicturePromise, profilePicturePromise]))
      .then(() => history.push("/me"))
      .catch(() => setShowLoadingSpinner(false))
  }
  const clearFile = (e) => {
    if (e.target.id === "avatar") {
      setCancelAvatar(!cancelAvatar)
      avatar.setFile(null)
    } else if (e.target.id === "main_picture") {
      setCancelMain(!cancelMain)
      main_picture.setFile(null)
    }
  }

  return (
    <>
      <div>
        <div className={styles.title}>Edit your profile</div>
        <hr className={styles.titleHr} />
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
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="photo_picture">
                Add a profile picture:
              </label>
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  name={avatar.name}
                  file={avatar.file}
                  onChange={avatar.onChange}
                  key={cancelAvatar}
                />
                {avatar.file ? (
                  <p className={styles.clear} onClick={clearFile} id="avatar">
                    cancel
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="main_picture">
                Add a background picture:
              </label>
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  name={main_picture.name}
                  file={main_picture.file}
                  onChange={main_picture.onChange}
                  key={cancelMain}
                />
                {main_picture.file ? (
                  <p
                    className={styles.clear}
                    onClick={clearFile}
                    id="main_picture"
                  >
                    cancel
                  </p>
                ) : null}
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
      </div>
    </>
  )
}

export default EditProfile
