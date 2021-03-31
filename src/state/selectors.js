import { selector } from "recoil";
import { artWorkAtom, artStatusAtom, singlePieceIdAtom } from "./atoms";
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