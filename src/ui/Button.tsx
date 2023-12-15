import React from 'react';
import styles from '../styles/button.module.scss'
type ButtonProps = {
    children: string | React.ReactNode;
    onClick?: () => any;
    variant?: 'outline' | 'ghost';
};

export const btnStyles = (variant: 'outline' | 'ghost' | undefined) =>{
    if (variant == 'outline') return `${styles.btn} ${styles.outline}`;
    if (variant == 'ghost') return `${styles.btn} ${styles.ghost}`;
    return styles.btn;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant }) => {
    const handleStyle = () => btnStyles(variant)

    return (
        <button onClick={onClick} className={handleStyle()} >
            {children}
        </button>
    );
};

export default Button;
