import { useState } from "react";
import { useSetRecoilState } from "recoil"
import { formErrorAtom } from "../../state/atoms"

export const useInput = (name) => {
    const setFormError = useSetRecoilState(formErrorAtom)

    const [value, setValue] = useState("");

    const onChange = ({ target: { value } }) => {
        setFormError("")
        setValue(value)
    };

    return { value, onChange, name };
};


export const useHandleFile = (name) => {
    const [file, setFile] = useState("");

    const onChange = ({ target: { files } }) => {
        setFile(files[0])};

    return { file, onChange, name };
};
