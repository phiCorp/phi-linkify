import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    children,
    variant = 'primary',
    disabled = false,
    rounded = false,
    pill = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const buttonClasses = [
        'button',
        variant,
        disabled && 'disabled',
        rounded && 'bt-round',
        pill && 'bt-pill',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        'primary',
        'success',
        'alert',
        'idle',
        'white',
        'black',
        'outline'
    ]),
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    pill: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string
};

export default Button;
