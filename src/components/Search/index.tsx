import React from 'react';
import { useState, useCallback, useRef } from 'react';
import { setSearchValue } from '../../redux/filter/filterSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import searchIcon from '../../img/search-icon.svg';
import closeIcon from '../../img/close-icon.svg';
import styles from './Search.module.scss';

const Search: React.FC = () => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const clickClearHandler = () => {
        setInputValue('');
        dispatch(setSearchValue(''));
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 300),
        [],
    );
    const changeSearchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        updateSearchValue(e.target.value);
    };
    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="Search pizza..."
                value={inputValue}
                onChange={changeSearchValueHandler}
            />
            {inputValue && (
                <img
                    src={closeIcon}
                    alt="close"
                    className={styles.closeIcon}
                    onClick={clickClearHandler}
                />
            )}
            <img src={searchIcon} alt="search" className={styles.searchIcon} />
        </div>
    );
};

export default Search;
