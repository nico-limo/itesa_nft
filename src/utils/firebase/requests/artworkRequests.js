import { db } from "../../../firebaseConfig";
//Recoil
import { useRecoilValue } from "recoil";
import { userAtom } from "../../../state/atoms";



export const ArtFunctions = () => {
    const artWorkRef = db.collection('artWork');
    const user = useRecoilValue(userAtom);

    const newPiece = async (e, title, description, price, userWallet, tokenId) => {
        e.preventDefault()
        const res = await artWorkRef.add({
            created: new Date(),
            tokenId,
            ownerId: user.uid,
            authorId: user.uid,
            userWallet,
            title,
            imgURI: null,
            description,
            price,
            onSale: false,
            id: '',
            username: user.username,
            photo_profile: user.photo_profile
        })
        await artWorkRef.doc(`${res.id}`).update({ id: res.id })
        return res;
    }

    const updatePiece = async (title, description, price, id, onSale) => {
        await artWorkRef.doc(id).update({
            title, description, price, onSale
        })
    }

    const updateImgURI = async (imgURI, id) => {
        await artWorkRef.doc(id).update({ imgURI })
    }

    const buyPiece = async (id, ownerId, userWallet) => {
        await artWorkRef.doc(id).update({
            ownerId,
            userWallet,
            onSale: false
        })
        return "algo"
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
        return piece;
    }
    return { newPiece, updatePiece, buyPiece, getAllPieces, getSoldPieces, getOnSalePieces, getSinglePiece, updateImgURI }
}
