import { db } from "../../../firebaseConfig";
//Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, artWorkAtom } from "../../../state/atoms";
// Collections
//---------------- ARTWORK FUNCTIONS------------------------

export const ArtFunctions = () => {
    const artWorkRef = db.collection('artWork');
    const user = useRecoilValue(userAtom);
    const setArtWork = useSetRecoilState(artWorkAtom)

    const newPiece = async (e, title, imgURI, description, price) => {
        e.preventDefault()
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
        await artWorkRef.doc(`${res.id}`).update({ id: res.id })
    }

    const updatePiece = async (e, title, description, price, id, onSale) => {
        e.preventDefault()
        await artWorkRef.doc(id).update({
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

    const getAllPieces = async () => {
        const snapshot = await artWorkRef.get();
        if (snapshot.empty) {
            console.log('artwork pieces not found in db')
            return;
        }
        let artwork = [];
        snapshot.forEach(doc => {
            artwork = [...artwork, doc.data()]
        });
        return artwork;
    }

    const getSoldPieces = async (id) => {
        const snapshot = await artWorkRef.where('onSale', '==', false).get();
        if (snapshot.empty) {
            console.log('artwork pieces not found in db')
            return;
        }
        let artwork = [];
        snapshot.forEach(doc => {
            artwork = [...artwork, doc.data()]
        });
        return artwork;
    }

    const getOnSalePieces = async (id) => {
        const snapshot = await artWorkRef.where('onSale', '==', true).get();
        if (snapshot.empty) {
            console.log('artwork pieces not found in db')
            return;
        }
        let artwork = [];
        snapshot.forEach(doc => {
            artwork = [...artwork, doc.data()]
        });
        return artwork;
    }

    const getSinglePiece = async (id) => {
        const snapshot = await artWorkRef.where('id', '==', `${id}`).get();
        if (snapshot.empty) {
            console.log('piece not found in db')
            return;
        }
        let piece = '';
        snapshot.forEach(doc => {
            piece = doc.data()
        });
        console.log('DE FIREBASE', piece)
        return piece;
    }
    return { newPiece, updatePiece, buyPiece, getAllPieces, getSoldPieces, getOnSalePieces, getSinglePiece }
}
