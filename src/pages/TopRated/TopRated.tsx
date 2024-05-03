import React from "react";
import { useEffect,useState } from "react";
import {getTopRated} from '../../services';
import { IMovieResponse } from "./types";
import { MovieCard } from '../../components/MovieCard';
import './TopRated.css'

const TopRated = () =>{
    const [moviesTopR, setMoviesTop]=useState<IMovieResponse[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);

    const getTopMovies = async () =>{
        await getTopRated().then((data)=>{
            if (data && data.data){
                console.log(data.data.source)
                setMoviesTop(data.data.results);
            }
        }).catch((err) =>{
            console.log(err);//Algun fallo depende de que falló
        })
    };

    //Use Effect
    useEffect(()=>{
        setIsLoading(true);
        getTopMovies();
        setIsLoading(false);
    },[]);


    return(
        
        <div className=" background ">
            <div className="row">
                <div className="movieCardCon">
                    {isLoading&&<div>Loading...</div>}
                    {moviesTopR?.length>0 &&
                    moviesTopR.map((movie)=>(
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

export default TopRated