import React from 'react';
import {  IDetails } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import  genre  from '../../constants/genres.json';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../routes/constants'


const MovieCard: React.FC<IDetails> = ({
    title,
    budget,
    id,
    original_language,
    overview,


})=>{
    const navigate =useNavigate(); //Hook 
    //State
    //const poster = IMAGE_SOURCE + posterPath;
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
    <div className=''>
        
        <div >
            <div className='detailsContainer'>
                <div className='genre'>
                        {getGenre(id)}
                </div>
                <p className='overview'>{overview}</p>
                <p className='budget'>{budget}</p>
                <p className='title'>{title}</p>
                <p className='original_language'>{original_language}</p>
            </div>
        </div>
    </div>
    )
}


export default MovieCard;