import { useParams } from "react-router-dom";
import MoviePageStyle from "./styles.module.css"
import { FilmId } from "../film_id/film_id";
import { useEffect, useState } from "react";
import { useGetMovieInfoQuery } from "../../entities/slices";

export const MoviePage = () => {
    const { movieId } = useParams();
    const[id, setId] = useState("");
    const {data} =  useGetMovieInfoQuery(id);
    const [result, setResult] = useState({});

    useEffect(() => {
        setResult(data);
    }, [data]);

    useEffect(() => {
        if(movieId != undefined) setId(movieId);
    }, [movieId])

    return(
        <>
            {(data != undefined) && 
            (<div className={MoviePageStyle.area}>
                <FilmId movie={data}/>
                <p className={MoviePageStyle.title}>Актеры</p>
                <div className={MoviePageStyle.actors}>
                    {(data != undefined) && data["actors"].map((elem, index) => {
                        return(<div className={MoviePageStyle.card} key={index}>
                                <img className={MoviePageStyle.picture} src={elem["photo"]}/>
                                <span className={MoviePageStyle.name}>{elem["name"]}</span>
                        </div>)})
                    }                                  
                </div>
            </div>)}
        </>
    )
}