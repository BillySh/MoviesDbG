import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShowP:React.FC = () =>{
    const {id} =useParams();
    const location =useLocation();
    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };

    useEffect(()=>{
        //Aqui llamar el endpoint de los detalles de la pelicula
    }, []);

    return(
        <div>
            <div>Show: {id}</div>
            <div>Titulo desde state: {location.state.movie} {id}</div>
            <button onClick={goBack} >Ir atras</button>
        </div>
    );
}

export default ShowP