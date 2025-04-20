import React from 'react';

const FluxInput = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    helperText = '',
    state = 'default',
    sx = {},
    ...props
}) => {
    return (
        <div className="FluxInput" data-state={state}>
            <div className="FluxInput-container">
                <input
                    type={type}
                    id={id}
                    placeholder=" "
                    required={required}
                    value={value}
                    onChange={onChange}
                    style={sx}
                    {...props}
                />
                <label htmlFor={id}>
                    {required ? (
                        <>
                            {label} <span className="required-star">*</span>
                        </>
                    ) : (
                        label
                    )}
                </label>
            </div>
            {helperText && <p className="helper-text">{helperText}</p>}
        </div>
    );
};

export default FluxInput;
