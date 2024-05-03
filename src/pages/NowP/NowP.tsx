import React, { useEffect,useState } from "react";
import { getMain} from '../../services'
import { MovieCard } from "../../components/MovieCard";
import { IMovieResponse } from "./types";
import './NowP.css';

const NowP = () =>{
    const [moviesMain, setMoviesMain] = useState<IMovieResponse[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);

    const getMainMovies = async () =>{
        await getMain().then((data)=>{
            if (data && data.data){
                console.log(data.data.source)
                setMoviesMain(data.data.results);
            }
        }).catch((err) =>{
            console.log(err);//Algun fallo depende de que falló
        })
      };

    useEffect(()=>{
        setIsLoading(true);
        getMainMovies();
        setIsLoading(false);
    },[]);

    return(
        <div className=" background ">
            <div className="row">
                <div className="movieCardCon">
                    {isLoading&&<div>Loading...</div>}
                    {moviesMain?.length>0 &&
                    moviesMain.map((movie)=>(
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

export default NowP