import React from "react";
import {ROUTES} from '../../routes/constants';
import {Link} from 'react-router-dom';
import'./Header.css';

const Header =() =>{
    return(
        <nav className="navBar">
            <div className="wrapper">
                <ul className="buttons">
                    <p className="title">
                        Movie DB
                    </p>
                    <li className="button">
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li className="button">
                        <Link to={ROUTES.POPULAR}>Popular</Link>
                    </li>
                    <li className="button">
                        <Link to={ROUTES.TOPRATED}>TopRated</Link>
                    </li>
                    <li className="button">
                        <Link to={ROUTES.NOWP}>Now Playing</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header