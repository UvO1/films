import { ShortMovieInfo } from "../../entities/types"
import { Info } from "../info/info"
import FilmStyle from "./styles.module.css"
import { Star } from "../star/star"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthorizedInfo } from "../../entities/slices"

interface IFilm {
    movie: ShortMovieInfo
}


export const Film = (props: IFilm) => {
    const [authorization, setAuthorization] = useState(null);
    const dispatch = useDispatch();
    const isAuthorized: boolean  = useSelector((state) => selectAuthorizedInfo(state));
    
    useEffect(() => {
        if(isAuthorized) setAuthorization(true);
        else setAuthorization(false);
    }, [isAuthorized]);
    
    const rating = [];
    const score_active = Math.floor(parseFloat(props.movie.rating));
    for(let i = 0; i < 5; i++){
        if(i < score_active) rating.push(<Star key={i} star number={i+1}/>);
        else rating.push(<Star key={i} star={false} number={i+1}/>);
    }
    const navigate = useNavigate();
    const handleOpenMovie = () => {
        navigate("/movies/"+props.movie["id"]);
    };

    return(
        <div className={FilmStyle.area} onClick={handleOpenMovie}>
            <div className={FilmStyle.info_area}>
                <img id= "moviePict" src = {props.movie.poster} className={FilmStyle.picture}/>
                <div className={FilmStyle.info}>
                    <span className={FilmStyle.title}>{props.movie["title"]}</span>
                    <div className={FilmStyle.info_list}>
                        <Info card = {false} title="Жанр" text={props.movie["genre"]}/>
                        <Info card = {false} title="Год выпуска" text={props.movie["release_year"]}/>
                        <Info card = {false} title="Описание" text={props.movie["description"]}/>
                    </div>
                </div>
            </div>
            {(authorization === true) &&
                <div className={FilmStyle.score}>
                    {rating}
                </div>
            }
        </div>
    )
}