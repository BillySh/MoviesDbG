import React from 'react';
import {  IDetails } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import  genre  from '../../constants/genres.json';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../routes/constants'
import './Details.css'


const Details: React.FC<IDetails> = ({
    title,
    budget,
    id,
    original_language,
    overview,
    poster_path,
    genreId,


})=>{
    const navigate =useNavigate(); //Hook 
    //State
    const poster = IMAGE_SOURCE + poster_path;
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
                <div className='data'>
                    <img className='imageM' src={poster} alt='poster'/>
                    <div className='dataStrings'>
                        <div className='pills'>
                            <div className='genreM'>
                                    {getGenre(genreId)}
                            </div>
                            <p className='original_languageM'> Lenguage: {original_language}</p>
                        </div>
                        <p className='titleMovie'>{title}</p>
                        <p className='overviewM'>{overview}</p>
                        <p className='budgedM'>A budget of: {budget}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}


export default Details;