/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({artist, name, image, id}) {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/podcast/${id}`)  
}

  return (
    <div className='card' onClick={()=>handleClick(id)}>
      <div>
        <img className='logo' src={image} alt="logo" />
      </div>
      <div>
        <h4 className='title-card'>{name.toUpperCase()}</h4>
        <p className='text-card'>Author: {artist}</p>
      </div>
    </div>
  )
}

export default Card
