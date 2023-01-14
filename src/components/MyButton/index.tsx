import React, {FC} from 'react';
import cl from './MyButton.module.css';

export interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MyButton: FC<MyButtonProps> = ({ type = 'button', className, ...props }) => {
    return (
        <button
            className={[cl.button, className].join(' ')}
            type={type}
            {...props}
        />
    );
};

export default MyButton;
