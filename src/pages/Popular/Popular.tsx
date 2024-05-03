import React, { useEffect,useState } from "react";
import {getPopular} from '../../services';
import { MovieCard } from "../../components/MovieCard";
import { IMovieResponse } from "./types";
import './Popular.css';


const Popular = () =>{
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);

    const getPopularMovies = async () =>{
        await getPopular().then((data)=>{
            if (data && data.data){
                console.log(data.data.source)
                setMovies(data.data.results);
            }
        }).catch((err) =>{
            console.log(err);//Algun fallo depende de que falló
        })
    };

    useEffect(()=>{
        setIsLoading(true);
        getPopularMovies();
        setIsLoading(false);
    },[]);

    return(
        <div className=" background ">
            <div className="row">
                <div className="movieCardCon">
                    {isLoading&&<div>Loading...</div>}
                    {movies?.length>0 &&
                    movies.map((movie)=>(
                                <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                votesAverage={movie.vote_average}
                                genreId={movie.genre_ids[0]}
                                />
                    )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Popular