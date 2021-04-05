import { selector } from "recoil";
import { artWorkAtom, artStatusAtom,/* singlePieceIdAtom, userUrl, usersArrAtom, userProfile */} from "./atoms";
//import { ArtFunctions } from '../utils/firebase/requests/artworkRequests';

export const onSaleOrSoldState = selector({
    key: "onSaleOrSoldState",
    get: ({ get }) => {
        const status = get(artStatusAtom);
        const artWorkList = get(artWorkAtom);
        const artWorksFilter = artWorkList.filter(piece => piece.onSale === status);
        return artWorksFilter;
    }
})

// export const BuyerOrSeller = selector({
//     key: "BuyerOrSeller",
//     get: ({ get }) => {
//         const uid = get(userUrl)
//         const users = get(usersArrAtom)
//         const user = users.filter(user => user.uid === uid);
//         return user[0]
//     }
// })
// export const CollectionOrCreation = selector({
//     key: "CollectionOrCreation",
//     get: ({ get }) => {
//         const user = get(userProfile)
//         const artWorkList = get(artWorkAtom)
//         const status = get(artStatusAtom);
//         let CollectionOrCreation;
//         if (user && status === true) {
//             CollectionOrCreation = artWorkList.filter(art => art.ownerId === user.uid)
//         } else if (user && status === false) {
//             CollectionOrCreation = artWorkList.filter(art => art.authorId === user.uid)
//         }
//         return CollectionOrCreation
//     }
// })