import { selector } from "recoil";
import { artWorkAtom, artStatusAtom, singlePieceIdAtom, userUid, usersArrAtom } from "./atoms";
import { ArtFunctions } from '../utils/firebase/requests/artworkRequests';

export const onSaleOrSoldState = selector({
    key: "onSaleOrSoldState",
    get: ({ get }) => {
        const status = get(artStatusAtom);
        const artWorkList = get(artWorkAtom);
        const artWorksFilter = artWorkList.filter(piece => piece.onSale == status);
        return artWorksFilter;
    }
})

export const BuyerOrSeller = selector({
    key: "BuyerOrSeller",
    get: ({ get }) => {
        const uid = get(userUid)
        const users = get(usersArrAtom)
        const userProfile = users.filter(user => user.uid == uid);
        return userProfile[0].uid
    }
})


/* export const singleArtworkState = selector({
    key: 'singleArtworkState',
    get: ({ get }) => {
        const artWorkList = get(artWorkAtom);
        const id = get(singlePieceIdAtom);
        const pieceFilter = artWorkList.filter(piece => piece.id == id);
        console.log(pieceFilter[0])
        return pieceFilter[0];
    }
}) */