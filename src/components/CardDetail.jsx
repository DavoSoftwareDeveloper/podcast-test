import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CardDetail({podcasts}) {

  const navigate = useNavigate()
  const {id} = useParams()

  const [podcastDetail, setpodcastDetail] = useState(JSON.parse(localStorage.getItem(`podcastDetail${id}`)) || null)

  const addSummary = () => {
    console.log(podcasts)
    const selectedPod = podcasts.filter(item => item.id.attributes["im:id"] === id)
    const summar = selectedPod[0].summary["label"]
    const arrSummary = summar.split(".")[0]
    console.log(arrSummary)
    return arrSummary+"."
  }

  return (
    <div className="cardDetail" onClick={()=> navigate("/")}>
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
