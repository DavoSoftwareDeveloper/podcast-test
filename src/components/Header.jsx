import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function Header() {
  return (
    <nav >
      <div >
        <Link to="/">
            <div className='nav'>
                <h2 className="font-bold text-cyan-600">Podcaster</h2>
                <div>
                <Spinner />
                <div className="loader"></div> 
                </div>
            </div>
        </Link>
        <hr className="hr"/>
      </div>
    </nav>
  )
}

export default Header