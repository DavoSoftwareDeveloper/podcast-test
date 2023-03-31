import React from 'react'

function Search({handleSearch}) {


  return (
    <div className='searchDiv'>
        <button className='btn100'>100</button>
        <input className='inputSearch' type="text" onChange={handleSearch} placeholder="Fiter Podcasts..."/>
    </div>
  )
}

export default Search
