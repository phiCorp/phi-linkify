import React from 'react';

const FluxTextArea = ({
    id,
    label,
    value,
    onChange,
    rows = 4,
    state = 'default',
    helperText = '',
    required = false,
    sx = {},
    ...props
}) => {
    return (
        <div className="FluxTextArea" data-state={state}>
            <div className="FluxTextArea-container">
                <textarea
                    placeholder=" "
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    style={sx}
                    required={required}
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
            {helperText && <div className="helper-text">{helperText}</div>}
        </div>
    );
};

export default FluxTextArea;
