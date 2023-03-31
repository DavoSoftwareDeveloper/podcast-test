import React, { useState } from 'react'
import Header from '../components/Header'
import CardDetail from '../components/CardDetail'
import { useParams } from 'react-router-dom'

function Episode({podcasts}){

  const {id, episodeId} = useParams()
  
  console.log(useParams())
  const [podcastDetail, setpodcastDetail] = useState(JSON.parse(localStorage.getItem(`podcastDetail${id}`)) || null)
  console.log(podcastDetail)
  const filterPodcasts = podcastDetail.results.filter( episode => episode.artistIds )
  console.log(filterPodcasts)
  const filterEpisode = filterPodcasts.filter( episode => episode.trackId === +episodeId)
  console.log(filterEpisode)

  const handleTitle = (title) => {
    const barra = title.indexOf("|")
    const barraInclinada = title.indexOf("/")

    if ( barraInclinada > 0 ) { return title.split("/")[1]}
    else if ( barra > 0 ) {  return title.split("|")[1]}
    else return title
  }

  function replaceURLWithHTMLLinks(text)
  {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
  }
 const test = replaceURLWithHTMLLinks(filterEpisode[0].description)

  return  <>
          <Header />
          <div className="container">
            <CardDetail podcasts={podcasts}/>
            <div className='episodesDescription'>
                <h2>{handleTitle(filterEpisode[0].trackName)}</h2>
                <p dangerouslySetInnerHTML={{__html: test}}></p>
                <hr className='hr'/>
                <audio className='audio' controls src={filterEpisode[0].episodeUrl}/>
            </div>
          </div>
  </>

  
}

export default Episode
