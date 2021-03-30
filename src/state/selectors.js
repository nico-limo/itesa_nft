import { selector } from "recoil";
import { artWorkAtom, artStatusAtom } from "./atoms";

export const onSaleOrSoldState = selector({
    key: "onSaleOrSoldState",
    get: ({ get }) => {
        const status = get(artStatusAtom);
        const artWorkList = get(artWorkAtom);
        const artWorksFilter = artWorkList.filter(piece => piece.onSale == status);
        return artWorksFilter;
    }
})
