import { useEffect,useState } from "react";
import { IMovieDetailsResponse } from "./types";
import react from "react";
import { MovieCard } from "../../components/MovieCard";
import { getDetails } from "../../services";

const Favorites = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [shows,setShows] = useState<IMovieDetailsResponse[]>([]);
    const favorites:string = localStorage.getItem('favorites') || '';

    const runGetFavorites = async () =>{
        if(favorites.length){
            const favoritesArray = JSON.parse(favorites);//Ya es arreglo
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite:string)=>{
                    return getDetails(String(favorite))
                    .then( (res) =>{
                        if (res && res.data){
                            return res.data;
                        }
                    }).catch((err) =>{
                        console.log(err,"err")
                    })
                })
            );//Pasa muchas promesas y te lo pasa cuando acabe.
            setShows(newShows);
            setLoading(false);
        }
    };
    useEffect(() =>{
        runGetFavorites();
    }, [])
    return(
        <div>
            {!loading ? (
                <div>
                    <h2>Favorites</h2>
                    {favorites && favorites.length > 0?(
                        <div>
                            {shows && shows.map((show:IMovieDetailsResponse) => (
                                <MovieCard 
                                key={show.id}
                                movieId={show.id}
                                title={show.title}
                                genreId={show.genres[0].id}
                                votesAverage={show.vote_average}
                                posterPath={show.poster_path}
                                />
                            ))}
                        </div>
                    ):(
                        <div>Oops no maidens</div>
                    )}
                </div>
            ):
            (
                <div>Loading...</div>
            )}
        </div>
    ) 
}

export default Favorites