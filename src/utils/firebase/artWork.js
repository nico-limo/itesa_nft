import { useRecoilState } from "recoil";
import { artWorkAtom } from "../../state/atoms";
import { db } from "../../firebaseConfig"

const artWorkRef = db.collection('artWork');

export const ArtWorkFunctions = () => {
    const [artWork, setArtWork] = useRecoilState(artWorkAtom)

    const getArtistsArtWork = (userId) => {
        artWorkRef.where("authorId", "==", userId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    const getArtWork = () => {
        artWorkRef.where("authorId", "==", "userId")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
            });
        })
        // .then(artWork => {
        //     setArtWork({artWork})
        //     console.log("", artWork.data())
        // })

    }
    return { artWork, getArtistsArtWork, getArtWork }
}
