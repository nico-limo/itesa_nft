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
