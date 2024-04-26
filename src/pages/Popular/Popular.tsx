import React, { useEffect,useState } from "react";
import { Pill } from '../../components/Pill';
import { movies } from '../../constants/moviesMock';
import {getPopular} from '../../services'
import { MovieCard } from "../../components/MovieCard";
import { IMovieCard } from "../../components/MovieCard/types";
import { IMovieResponse } from "./types";


const Popular = () =>{
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [errorOnRequest,setErrorOnRequest]=useState<boolean>(false);

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
        <div className=" bg-slate-600 ">
            <Pill title="Pill"/>
            <Pill title="Reservations for two amigos"/>
            <div className="anime">
                <div className="overflow-x-auto flex-auto">
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