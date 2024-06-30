import ContentStyle from "./styles.module.css"
import { Select } from "../select/select";
import { Film } from "../film/film";
import { useEffect, useState } from "react";
import { useGetMoviesQuery} from "../../entities/slices";
import { ArrowPagination } from "../arrow_pagination/arrow_pagination";
import { GENRES_MAP, YEARS } from "../../entities/types";

export const Content = () => {
    const [page, setPage] = useState(1);
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(true);
    const [input, setInput] = useState('');
    const [genre, setGenre] = useState('no');
    const [year, setYear] = useState('0');
    const [query, setQuery] = useState('page=' + page);
    const [debouncedInput, setDebouncedInput] = useState("");
    const {data: dataPages} = useGetMoviesQuery(query);

    const [result, setResult] = useState('');

    function handlePageLeft(){
        if(page == 2) setLeftActive(false);
        if(page == dataPages["total_pages"]) setRightActive(true);
        if(page > 1) setPage(page - 1);
    }

    useEffect(() => {
        let temp_query = 'page=' + page;
        if(debouncedInput != '') temp_query+= '&title=' + debouncedInput;
        if((genre) && (genre!="no")) temp_query+= '&genre=' + genre;
        if(year != '0') temp_query+= '&release_year=' + year; 
        setQuery(temp_query);
    }, [page, debouncedInput, genre, year]);

    useEffect(() => {
        setResult(dataPages);
    }, [result, dataPages]);

    function handlePageRight(){
        if(page == dataPages["total_pages"] - 1) setRightActive(false);
        if(page == 1) setLeftActive(true);
        if(page < dataPages["total_pages"]) setPage(page + 1);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setDebouncedInput(input);
        }, 500);
        return () => clearTimeout(timeoutId);
      }, [input, 500]);

      const handleChangeGenre = (id: string) => {
        setGenre(id);
      }

      const handleChangeYear = (id: string) => {
        setYear(id);
      }
    

    return(
        <div className={ContentStyle.area}>
            <div className={ContentStyle.search}>
                <span className={ContentStyle.title}>Фильтр</span>
                <Select title = "Жанр" placeholder="Выберите жанр" elements={GENRES_MAP} onChange = {handleChangeGenre}/>
                <Select title = "Год выпуска" placeholder="Выберите год" elements={YEARS} onChange = {handleChangeYear}/>
            </div>
            <div className={ContentStyle.result_area}>
                <div className={ContentStyle.search_input}>
                    <img className={ContentStyle.search_icon} src = "/src/assets/search.svg"/>
                    <input placeholder="Название фильма" value={input} onChange={(e) => setInput(e.target.value)}/>
                </div>
                <div className={ContentStyle.result_list}>
                    {result && result["search_result"].map((elem) => (
                        <Film key = {elem["id"]} movie = {elem} />
                    ))}
                </div>
                <div className={ContentStyle.pagination}>
                    <ArrowPagination active = {leftActive} type = "left" handlePageLeft= {handlePageLeft}/>
                    <span className={ContentStyle.page}>{page}</span>
                    <ArrowPagination active = {rightActive} type = "right" handlePageRight = {handlePageRight}/>
                </div>
            </div>
        </div>
    );
}