import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../redux/filter/filterSlice';

const CATEGORIES = ['All', 'Meat', 'Vegan', 'Grille', 'Spicy', 'Closed'];

const Categories: React.FC = React.memo(() => {
    const activeCategory = useSelector((state: any) => state.filter.activeCategory);
    const dispatch = useDispatch();

    const onClickCategory  = useCallback(
        (id: number) => {
            dispatch(setActiveCategory(id))
        },
      [],
    )
    ;
    return (
        <div className="categories">
            <ul>
                {CATEGORIES.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={activeCategory === index ? 'active' : ''}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
)

export default Categories;
