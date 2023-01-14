import React, {FC, useState} from 'react';
import MyInput from "../MyInput";
import MyButton from "../MyButton";

const Control1: FC = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    return (
        <div className='control__wrapper'>
            <div className='control__header'>CONTROL 1</div>
            <div className='control'>
                <MyInput className='control__item input' value={value1} onChange={e => setValue1(e.target.value)}/>
                <MyButton className='control__item' onClick={() => setValue1('')}>Кнопка 1</MyButton>
                <MyButton className='control__item' onClick={() => setValue1('Hello world!')}>Кнопка 2</MyButton>
            </div>
            <hr className='separator'/>
            <div className='control'>
                <MyButton className='control__item' onClick={() => alert(!isNaN(+value2) && value2 ? value2 : 'Введено не число!')}>Кнопка 1</MyButton>
                <MyInput className='control__item input' value={value2} onChange={e => setValue2(e.target.value)}/>
                <MyButton className='control__item' onClick={() => alert(value2)}>Кнопка 2</MyButton>
            </div>
        </div>
    );
};

export default Control1;
