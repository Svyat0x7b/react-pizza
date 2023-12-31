import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSort } from '../redux/filter/filterSlice';
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types';
type SortCategory = {
    name: string,
    sortProp: SortPropertyEnum;
}

type PopupClick = MouseEvent & {
    path: Node[];
}

type SortPopupProps = {
    value: SortType;
  };

export const SORT_LIST: SortCategory[] = [
    { name: 'popularity ↓', sortProp: SortPropertyEnum.RATING_DESC },
    { name: 'popularity ↑', sortProp: SortPropertyEnum.RATING_ASC },
    { name: 'price ↓', sortProp: SortPropertyEnum.PRICE_DESC },
    { name: 'price ↑', sortProp: SortPropertyEnum.PRICE_ASC },
    { name: 'alphabet ↓', sortProp: SortPropertyEnum.TITLE_DESC },
    { name: 'alphabet ↑', sortProp: SortPropertyEnum.TITLE_ASC },
];

const Sort: React.FC<SortPopupProps> = React.memo(({value}) => {
    const dispatch = useDispatch();

    const sortRef = useRef<HTMLDivElement>(null);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const selectSortHandler = (obj: SortCategory) => {
        dispatch(setActiveSort(obj));
        setIsOpenPopup(false);
    };

    useEffect(() => {
        const clickOutsideHandler = (e: MouseEvent) => {
            const event = e as PopupClick;
            const path = event.composedPath();

            if (sortRef.current && !path.includes(sortRef.current)) {
                setIsOpenPopup(false);
            }
        };

        document.body.addEventListener('click', clickOutsideHandler);

        return () => {
            document.body.removeEventListener('click', clickOutsideHandler);
        };
    }, []);
    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={() => setIsOpenPopup((prev) => !prev)}>{value.name}</span>
            </div>
            {isOpenPopup && (
                <div className="sort__popup">
                    <ul>
                        {SORT_LIST.map((obj) => (
                            <li
                                key={obj.name}
                                className={value.sortProp === obj.sortProp ? 'active' : ''}
                                onClick={() => selectSortHandler(obj)}>
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
})

export default Sort;
