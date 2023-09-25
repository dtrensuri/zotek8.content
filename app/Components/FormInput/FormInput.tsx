'use client'

import './formInput.scss'
import { useState } from 'react';
const FormInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e: any) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)} focused={focused.toString()} />
            <span>{errorMessage}</span>
        </div>
    )
}
export default FormInput;