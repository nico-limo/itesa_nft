import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtom',
    default: {},
    persistence_UNSTABLE:{
        type: 'log'
    }
})

export const artWorkAtom = atom({
    key: 'artWorkAtom',
    default: {},
    persistence_UNSTABLE:{
        type: 'log'
    }
})