import React, {FC} from 'react';
import cl from './MyInput.module.css';

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const MyInput: FC<MyInputProps> = ({type, className, ...props}) => {
    return (
        <div className={[cl.inputWrapper, className].join(' ')}>
            <input
                className={cl.input}
                type={type}
                {...props}
            />
        </div>
    );
};

export default MyInput;
