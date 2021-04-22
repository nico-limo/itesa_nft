import { useState } from "react";
import { useSetRecoilState } from "recoil"
import { formErrorAtom } from "../../state/atoms"

export const useInput = (name, incomingValue = "") => {
    const setFormError = useSetRecoilState(formErrorAtom)

    const [value, setValue] = useState(incomingValue);

    const onChange = ({ target: { value } }) => {
        setFormError("")
        setValue(value)
    };

    return { value, onChange, name, setValue };
};

export const useHandleFile = (name) => {
    const [file, setFile] = useState("");

    const onChange = ({ target: { files } }) => {
        setFile(files[0])
    };
    return { file, onChange, name, setFile };
};
// export const useHandleFileToIPFS = (name) => {
//     const [file, setFile] = useState("");

//     const onChange = ({ target: { files } }) => {
//         setFile(files[0])
//     };
//     const key = name
//     return { file, onChange, name, setFile };
// }

