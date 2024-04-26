import React from 'react';
import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import  genre  from '../../constants/genres.json';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../routes/constants'


const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    votesAverage,
    posterPath,
})=>{
    const navigate =useNavigate(); //Hook 
    //State
    const poster = IMAGE_SOURCE + posterPath;
    //Functions
    const getGenre = (genreId: number): string =>{
        const key= Object.values(genre.genres).find(genre => genre.id === genreId);
        if(key){
            return key.name;
          }
          return "not classified"
      }
    //Use effect
    const navigateMovies = (id:number,movieName:string) =>{
        navigate(`${ROUTES.SHOW}${id}`,{state:{movieName}}); // /show/822349
    }
    //Return 
    return(
        
        <div className='containerFull' onClick= {()=>{navigateMovies(movieId,title)}}>
            <div>
            </div>
            <div className='imageContainer'>
                <img className='image' src={poster} alt='poster'/>
                <div className='textConainer'>
                <div className='pt-4 pr-3 pb-4 pl-3 table-cell w-full align-middle'>
                    <div className='genre'>
                            {getGenre(genreId)}
                    </div>
                    <p className='title'>{title}</p>
                    <p className='votes'>* {votesAverage} /10</p>
                </div>
            </div>
            </div>
        </div>
    )
}


export default MovieCard;