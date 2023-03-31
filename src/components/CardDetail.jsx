import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CardDetail({podcasts, podcastDetail}) {

  const navigate = useNavigate()
  const {id} = useParams()


  const addSummary = () => {
    const selectedPod = podcasts.filter(item => item.id.attributes["im:id"] === id)
    const summar = selectedPod[0].summary["label"]
    const arrSummary = summar.split(".")[0]
    return arrSummary+"."
  }
  useEffect(()=>{
  },[podcastDetail])

  return (
    <div className="cardDetail" onClick={()=> navigate(`/podcast/${+id}`)}>
      <div className='image-contain'>
        <img className='image' src={podcastDetail?.results[0].artworkUrl600 } alt='foto-colection'/>
      </div>
      <hr />
      <p className='title-card'>{podcastDetail?.results[0].collectionName}</p>
      <p>by {podcastDetail?.results[0].artistName}</p>
      <hr />
      <p className='title-card'>Description:</p>
      <p>{addSummary()}</p>
  </div>
  )
}

export default CardDetail
