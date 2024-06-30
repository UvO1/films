import { Info } from "../info/info"
import FilmStyle from "./styles.module.css"
import { Star } from "../star/star"

interface IFilmId {
    movie: {}
}


export const FilmId = (props: IFilmId) => {

    const rating = [];
    let score_active = 0;
    score_active = Math.floor(parseFloat(props.movie["rating"]));
    for(let i = 0; i < 5; i++){
        if(i < score_active) rating.push(<Star key={i} star number={i+1}/>);
        else rating.push(<Star key={i} star={false} number={i+1}/>);
    }


    return(
        <div className={FilmStyle.area}>
            <div className={FilmStyle.info_area}>
                <img id= "moviePict" src = {props.movie["poster"]} className={FilmStyle.picture}/>
                <div className={FilmStyle.info}>
                    <span className={FilmStyle.title}>{props.movie["title"]}</span>
                    <div className={FilmStyle.info_list}>
                        <Info card = {true} title="Жанр" text={props.movie["genre"]}/>
                        <Info card = {true} title="Год выпуска" text={props.movie["release_year"]}/>
                        <Info card = {true} title="Рейтинг" text={props.movie["rating"]}/>
                        <Info card = {true} title="Описание" text={props.movie["description"]}/>
                    </div>
                </div>
                 
            </div>
            <div className={FilmStyle.score}>
                {rating}
            </div>
        </div>
    )
}