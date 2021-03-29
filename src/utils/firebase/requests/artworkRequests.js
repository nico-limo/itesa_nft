import { db } from "../../../firebaseConfig";
//Recoil
import { useRecoilState } from "recoil";
import { userAtom } from "../../../state/atoms";
// Collections
//---------------- ARTWORK FUNCTIONS------------------------

export const ArtFunctions = () => {
    const artWorkRef = db.collection('artWork');
    const [user, setUser] = useRecoilState(userAtom);
    const newPiece = async (e, title, imgURI, description, price) => {
        e.preventDefault()
        const newId = title.toLowerCase()
        const res = await artWorkRef.add({
            created: new Date(),
            token: null,
            ownerId: user.uid,
            authorId: user.uid,
            title,
            imgURI,
            description,
            price,
            onSale: true,
            id: ''
        })
        console.log(res.id)
        await artWorkRef.doc(`${res.id}`).update({ id: res.id })
    }

    const updatePiece = async (e, title, description, price, onSale) => {
        e.preventDefault()
        await artWorkRef.doc('the beholder').update({
            title, description, price, onSale // VER Q TIPO DE VALIDACION HACER, 
            //si sos el author o no, no deberia poder cambiarlo el q no es author
        })
    }

    const buyPiece = async (ownerId) => {
        await artWorkRef.doc().update({
            ownerId,
            onSale: false
        })
    }

    const getSoldPieces = async (id) => {
        const snapshot = await artWorkRef.where('onSale', '==', false).get();
        if (snapshot.empty) {
            console.log('artwork pieces not found in db')
            return;
        }
        let artwork = '';
        snapshot.forEach(doc => {
            artwork = doc.data()
        });
        return artwork;
    }

    const getOnSalePieces = async (id) => {
        const snapshot = await artWorkRef.where('onSale', '==', true).get();
        if (snapshot.empty) {
            console.log('artwork pieces not found in db')
            return;
        }
        let artwork = '';
        snapshot.forEach(doc => {
            artwork = doc.data()
        });
        return artwork;
    }

    return { newPiece, updatePiece, buyPiece, getSoldPieces, getOnSalePieces }
}
