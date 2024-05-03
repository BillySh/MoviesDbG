import React from 'react';
import { MovieCard } from '../../components/MovieCard';
import './Home.css';
import {getPopular,getMain,getTopRated,getUpcoming} from '../../services'
import { IMovieCard } from "../../components/MovieCard/types";
import { IMovieResponse } from "./types";
import { useEffect,useState } from "react";
import { Carousel } from "flowbite-react";




const Home=() => {

  //Const Variables
  const [movies_Pop, setMovies] = useState<IMovieResponse[]>([]);
  const [moviesMain, setMoviesMain] = useState<IMovieResponse[]>([]);
  const [moviesUpcoming,setMoviesUp] = useState<IMovieResponse[]>([]);
  const [moviesTopR, setMoviesTop]=useState<IMovieResponse[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(false);
  const [errorOnRequest,setErrorOnRequest]=useState<boolean>(false);
  //Functions

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

  const getUpcomingMovies = async () =>{
    await getUpcoming().then((data)=>{
        if (data && data.data){
            console.log(data.data.source)
            setMoviesUp(data.data.results);
        }
    }).catch((err) =>{
        console.log(err);//Algun fallo depende de que falló
    })
  };

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
    getMainMovies();
    getPopularMovies();
    getUpcomingMovies();
    getTopMovies();
    setIsLoading(false);
  },[]);

  //Return 
    return (
      
      <div className='background'>
        <br></br>
        <div className="carouselContainer">
          <Carousel>
            <img src="https://theregoesmykokoro.files.wordpress.com/2016/03/ogp.png" alt="..." />
            <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/flcl-featured-Cropped.jpg" alt="..." />
            <img src="https://www.gematsu.com/wp-content/uploads/2024/04/Mushoku-Tensei-QoM_04-16-24.jpg" alt="..." />
            <img src="https://billyelliotthemusical.com/content/themes/billy-elliot-2016/build/images/hero-small1.jpg" alt="..." />
            <img src="https://images3.alphacoders.com/132/1320392.jpeg" alt="..." />
          </Carousel>
        </div>
        <br></br>
        <div></div>
        <p className='frC'>Popular</p>
        <div className='firstRow'>
            <div className='movieCardCon'>
              {isLoading&&<div>Loading...</div>}
              {movies_Pop?.length>0 &&
              movies_Pop.map((movie)=>(
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

        <p className='frC'>Upcoming</p>
        <div className='firstRow'>
            <div className='movieCardCon'>
              {isLoading&&<div>Loading...</div>}
                {moviesUpcoming?.length>0 &&
                moviesUpcoming.map((moviesMain)=>(
                <MovieCard
                key={moviesMain.id}
                movieId={moviesMain.id}
                posterPath={moviesMain.poster_path}
                title={moviesMain.title}
                votesAverage={moviesMain.vote_average}
                genreId={moviesMain.genre_ids[0]}
                />
                )
                )}
            </div>
          </div>

          <p className='frC'>Top Rated</p>
            <div className='firstRow'>
                <div className='movieCardCon'>
                  {isLoading&&<div>Loading...</div>}
                    {moviesTopR?.length>0 &&
                    moviesTopR.map((moviesMain)=>(
                    <MovieCard
                    key={moviesMain.id}
                    movieId={moviesMain.id}
                    posterPath={moviesMain.poster_path}
                    title={moviesMain.title}
                    votesAverage={moviesMain.vote_average}
                    genreId={moviesMain.genre_ids[0]}
                    />
                    )
                    )}
                </div>
              </div>


              <p className='frC'>Now Playing</p>
                <div className='firstRow'>
                    <div className='movieCardCon'>
                      {isLoading&&<div>Loading...</div>}
                        {moviesMain?.length>0 &&
                        moviesMain.map((moviesMain)=>(
                        <MovieCard
                        key={moviesMain.id}
                        movieId={moviesMain.id}
                        posterPath={moviesMain.poster_path}
                        title={moviesMain.title}
                        votesAverage={moviesMain.vote_average}
                        genreId={moviesMain.genre_ids[0]}
                        />
                        )
                        )}
                    </div>
                  </div>


      </div>

    );
}

export default Home