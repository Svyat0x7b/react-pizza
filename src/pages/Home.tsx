import React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// @ts-ignore: Unnecessary warning for unused variable
import qs from 'qs';
import { useSelector} from 'react-redux';
// @ts-ignore: Unnecessary warning for unused variable
import { setFilters, initialState } from '../redux/slices/filter/filterSlice';
import { fetchItems } from '../redux/pizzas/asyncActions';
import { Skeleton, Categories, Sort, PizzaBlock,  Pagination} from '../components';
// @ts-ignore: Unnecessary warning for unused variable
import { SORT_LIST } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { Status } from '../redux/pizzas/types';



export type SearchPizzaParams = {
    sortProp: string;
    order: string;
    category: string;
    search: string;
    currPage: string;
  };

const Home: React.FC = () => {
    const { searchValue, activeCategory, activeSort, currPage } = useSelector(
        (state: any) => state.filter,
    );
    const fetchedPizzas = useSelector((state: any) => state.pizzas.items);
    const status = useSelector((state: any) => state.pizzas.status);

    const dispatch = useAppDispatch();
    // @ts-ignore: Unnecessary warning for unused variable
    const navigate = useNavigate();
    // @ts-ignore: Unnecessary warning for unused variable
    const location = useLocation();
    // @ts-ignore: Unnecessary warning for unused variable
    const isSearchParams = useRef(false);
    // @ts-ignore: Unnecessary warning for unused variable
    const isMounted = useRef(false);

    const fetchPizzas = async () => {
        const selectedCategory= activeCategory > 0 ? `category=${activeCategory}` : '';
        const selectedSort = `sortBy=${activeSort.sortProp.replace('-', '')}`;
        const selectedOrder= `order=${activeSort.sortProp.includes('-') ? 'desc' : 'asc'}`;
        const selectedSearch = searchValue ? `search=${searchValue}` : '';

        dispatch(
            fetchItems({
                selectedCategory,
                selectedSort,
                selectedOrder,
                selectedSearch,
                currPage,
            }),
        );
    };

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProp: activeSort.sortProp,
    //             category: activeCategory,
    //             currPage: currPage,
    //         });

    //         navigate(`?${queryString}`);
    //     }
    //     isMounted.current = true;
    // }, [activeCategory, activeSort, currPage]);

    // useEffect(() => {
    //     const searchParams = location.search;
    //     if (searchParams) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

    //         if (
    //             initialState.activeCategory === Number(params.category) &&
    //             initialState.activeSort.sortProp === params.sortProp &&
    //             initialState.currPage === Number(params.currPage)
    //         ) {
    //             fetchPizzas();
    //         }

    //         const sort = SORT_CATEGORIES.find((obj) => obj.sortProp === params.sortProp);

    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             currPage: 0,
    //             activeCategory: 0,
    //             activeSort: sort,
    //             category: 0
    //         }));
    //         isSearchParams.current = true;
    //     }
    // }, [location]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);

    //     if (isSearchParams.current) {
    //         fetchPizzas();
    //     }
    // }, [activeCategory, activeSort, searchValue, currPage]);
    useEffect(() => {
            fetchPizzas();
    }, [activeCategory, activeSort, searchValue, currPage]);

    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
    const pizzas = fetchedPizzas.map((pizza) => <PizzaBlock pizza={pizza} key={pizza.id} />);
    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort value={activeSort}/>
            </div>
            <h2 className="content__title">All Pizzas</h2>
            <div className="content__items">
                {status === Status.LOADING && skeletons}
                {status === Status.SUCCESS && pizzas}
                {status === Status.ERROR && (
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'grey',
                            gridColumn: '1 / -1',
                            gridRow: '1 / 2',
                            marginBottom: '40px',
                            fontSize: '22px',
                            fontWeight: '700',
                        }}>
                        Can`t fetched pizzas! Something went wrong!
                    </p>
                )}
            </div>
            <Pagination />
        </div>
    );
};

export default Home;
