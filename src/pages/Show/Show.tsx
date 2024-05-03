import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import './Show.css'
import {Details} from '../../components/Details';
import { IMovieDetailsResponse } from "./types";
import { getDetails } from "../../services";

interface ShowProps {
    onIdChange: (id: string) => void; // Define a function to pass the id value
}

const ShowP:React.FC = () =>{
    const [movies, setMovies] = useState<IMovieDetailsResponse[]>([]);
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
                console.log(data.data.source)
                setMovies(data.data.results);
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
        setIsLoading(false);
        //Aqui llamar el endpoint de los detalles de la pelicula
    }, [stringId]);

    return(
        <div className="containerD">
                <div>
                    <div>Show: {id}</div>
                    <div>Titulo desde state: {location.state.movie}{id} </div>
                    <div>
                        {movies?.length>0 &&
                            movies.map((movie)=>(
                                        <Details
                                        key={movie.id}
                                        id={movie.id}
                                        budget={movie.budget}
                                        original_language={movie.original_language}
                                        overview={movie.overview}
                                        title={movie.title}
                                        />
                            )
                            )}
                    </div>

                    <button className="buttonSS" onClick={goBack} >Ir atras</button>
                    {isFavorite?(
                        <div className="p3 flex w-28 rounded-xl bg-slate-700">
                            <button onClick={removeFavorite}>Remove to Favorite</button>
                        </div>
                    ):(
                        <div className="p3 flex w-28 rounded-xl bg-slate-700">
                            <button onClick={addFavorite}>Add to Favorite</button>
                        </div>
                    )}
                </div>
            </div>
    );
}

export default ShowP