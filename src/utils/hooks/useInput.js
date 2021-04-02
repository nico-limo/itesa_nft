import { useState } from "react";

export const useInput = (name) => {
    const [value, setValue] = useState("");

    const onChange = ({ target: { value } }) => setValue(value);

    return { value, onChange, name };
};


export const useHandleFile = (name) => {
    const [file, setFile] = useState("");

    const onChange = ({ target: { files } }) => {
        setFile(files[0])};

    return { file, onChange, name };
};
