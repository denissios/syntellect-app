import React, {ChangeEvent, FC, useEffect, useMemo, useState} from 'react';
import MyInput from "../MyInput";
import {useDebounce} from "../../hooks/useDebounce";
import countries from "../../store/countries";
import {observer} from "mobx-react-lite";
import {CountryInfo} from "../../store/api/apiService";

const Control2: FC = observer(() => {
    const [value, setValue] = useState('');
    const [hintsCount, setHintsCount] = useState<number>(5);
    const [isVisibleAutocomplete, setIsVisibleAutocomplete] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const debouncedValue = useDebounce(value, 300);

    useEffect(() => {
        (async () => {
            setIsVisibleAutocomplete(!!debouncedValue && !isClicked);
            if (debouncedValue && !isClicked) {
                await countries.fetchCountries(debouncedValue);
            }
            if(isClicked) {
                setIsClicked(false);
            }
        })()
    }, [debouncedValue])

    const handleClick = (c: CountryInfo) => {
        setValue(c.name + '. ' + c.fullName);
        setIsClicked(true);
        setIsVisibleAutocomplete(false);
    }

    const handleUpHints = (e: ChangeEvent<HTMLInputElement>) => {
        if(Number(e.target.value) <= 10 && Number(e.target.value) >= 3) {
            setHintsCount(Number(e.target.value));
        }
    }

    const countedHints = useMemo(() => countries.countries.filter((c, i) => i < hintsCount), [countries.countries, hintsCount])

    return (
        <div className='control__wrapper'>
            <div className='control__header'>CONTROL 2</div>
            <div className='hints__wrapper'>
                <div className='hints__title'>Количество подсказок (3-10): </div>
                <MyInput type={'number'} className='hints' value={hintsCount} onChange={handleUpHints}/>
            </div>
            <div className='control'>
                <MyInput className='control__item input' value={value} onChange={e => setValue(e.target.value)}/>
                <ul className={isVisibleAutocomplete ? 'autocomplete autocomplete--visible' : 'autocomplete'}>
                    {countries.isLoadingCountries
                        ?   <li className='autocomplete__empty'>Loading...</li>
                        :   countries.countries.length
                            ?   countedHints.map((c, i) =>
                                        <li key={c.fullName} className='autocomplete__item' onClick={() => handleClick(c)}>
                                            <img className='flag' src={c.flag} alt="Флаг"/>
                                            <div>{c.name}. {c.fullName}</div>
                                        </li>
                                )
                            :   <li className='autocomplete__empty'>Ничего не найдено</li>
                    }
                </ul>
            </div>
        </div>
    );
});

export default Control2;
