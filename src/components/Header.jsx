import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";


function Header({loading}) {

  return (
    <nav >
      <div >
        <Link to="/">
            <div className='nav'>
                <h2 className="font-bold text-cyan-600">Podcaster</h2>
                <div>
                {loading && <Spinner className="spinner"/>}
                </div>
            </div>
        </Link>
        <hr />
      </div>
    </nav>
  )
}

export default Header