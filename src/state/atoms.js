import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtom',
    default: {},
    persistence_UNSTABLE: {
        type: 'log'
    }
})

export const userUrl = atom({
    key: 'userUrl',
    default: {},
    persistence_UNSTABLE: {
        type: 'log'
    }
})

export const userProfile = atom({
    key: 'userProfile',
    default: {},
    persistence_UNSTABLE: {
        type: 'log'
    }
})
export const CreationOrCollection = atom({
    key: 'CreationOrCollection',
    default: [],
    persistence_UNSTABLE: {
        type: 'log'
    }
})

export const usersArrAtom = atom({
    key: 'usersArrAtom',
    default: [],
    persistence_UNSTABLE:{
        type: 'log'
    }
})

export const artWorkAtom = atom({
    key: 'artWorkAtom',
    default: [],
    persistence_UNSTABLE: {
        type: 'log'
    }
})

export const artStatusAtom = atom({
    key: 'artStatusAtom',
    default: true,
    persistence_UNSTABLE: {
        type: 'log'
    }
})
export const singlePieceAtom = atom({
    key: 'singlePieceAtom',
    default: '',
    persistence_UNSTABLE: {
        type: 'log'
    }
})

export const formErrorAtom = atom({
    key: 'formErrorAtom',
    default: '',
    persistence_UNSTABLE: {
        type: 'log'
    }
})
// --------------- Meta Mask
export const metaMaskUserAccount = atom({
    key: 'metaMaskUserAccount',
    default: {},
    persistence_UNSTABLE: {
        type: 'log'
    }
})
export const smartContract = atom({
    key: 'smartContract',
    default: {},
    persistence_UNSTABLE: {
        type: 'log'
    }
}) 
export const supplyAtom = atom({
    key: 'supplyAtom',
    default: {},
    persistence_UNSTABLE: {
        type: 'log'
    }
})