import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import './Show.css'
import {Details} from '../../components/Details';
import { MovieCard } from "../../components/MovieCard";
import { IMovieDetailsResponse,IMovieResponse } from "./types";
import { getDetails,getRecomendations } from "../../services";


const ShowP:React.FC = () =>{
    const [movies, setMovies] = useState<IMovieDetailsResponse>();
    const [moviesRecomentaions, setRecomendations] =useState<IMovieResponse[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const {id} =useParams();
    const stringId = id ? id.toString() : 'defaultId'; // Handle id being undefine
    const [isFavorite,setIsFavorites] =useState<boolean>(false);
    const [favorites,setFavorites] = useState<string>('');

    const location =useLocation();
    const navigate = useNavigate();


    //Functions
    const getMovieDetails = async () =>{
        await getDetails(stringId).then((data)=>{
            if (data && data.data){
                console.log(data.data, 'Details')
                setMovies(data.data);
            }
        }).catch((err) =>{
            console.log(err);//Algun fallo depende de que falló
        })
    };

    const getMovieRecomendations = async () =>{
        await getRecomendations(stringId).then((data)=>{
            if (data && data.data){
                console.log(data.data, 'Recomendations')
                setRecomendations(data.data.results);
            }
        }).catch((err) =>{
            console.log(err);//Algun fallo depende de que falló
        })
    };

    const addFavorite = ()=>{
        const favs = favorites.length >0 ? JSON.parse(favorites):[]; //["1242", '3444]
        const newFavorites = [...favs,id]
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorites(true);
        localStorage.setItem('favorites', JSON.stringify(newFavorites)); 
    };

    const removeFavorite=()=>{
        const favs = favorites.length >0 ? JSON.parse(favorites):[];
        let newFavorites =[...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorites(false);
        localStorage.setItem("favorites",JSON.stringify(newFavorites))
    }

    const goBack = () =>{
        navigate(-1);
    };

    useEffect(()=>{
        const favs =localStorage.getItem('favorites') || '';
        setFavorites(favs);
        if (favs.includes(String(id))){
            setIsFavorites(true);
        }
        setIsLoading(true);
        getMovieDetails();
        getMovieRecomendations();
        setIsLoading(false);
        //Aqui llamar el endpoint de los detalles de la pelicula
    }, [stringId]);

    return(
        <div className="containerD">
            <div>
            <br></br>
                <div>
                    {movies && (
                            <Details
                            key={movies.id}
                            id={movies.id}
                            budget={movies.budget}
                            original_language={movies.original_language}
                            overview={movies.overview}
                            title={movies.title}
                            poster_path={movies.poster_path}
                            genreId={movies.genres[0].id}
                            />
                            )}
                </div>
                <br></br>
                <div className="addBC">
                    <button className="buttonSS" onClick={goBack} >Back</button>
                    {isFavorite?(
                        <div >
                            <button className="buttonRF" onClick={removeFavorite}> <img className="addIcon" src="https://cdn-icons-png.flaticon.com/512/985/985709.png" alt=""/>Remove from favorite</button>
                        </div>
                    ):(
                        <div>
                            <button className="buttonAF" onClick={addFavorite}> <img className="addIcon" src="https://cdn-icons-png.flaticon.com/512/985/985709.png" alt=""/>Add to favorites</button>
                        </div>
                    )}
                </div>
            </div>
            <p className='frC'>Recommended</p>
                <div className='firstRow'>
                    <div className='movieCardCon'>
                    {isLoading&&<div>Loading...</div>}
                    {moviesRecomentaions?.length>0 &&
                    moviesRecomentaions.map((movie)=>(
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

export default ShowP