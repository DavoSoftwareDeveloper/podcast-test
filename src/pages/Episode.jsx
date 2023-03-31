import React, { useState } from 'react'
import Header from '../components/Header'
import CardDetail from '../components/CardDetail'
import { useParams } from 'react-router-dom'

function Episode({podcasts}){

  const {id, episodeId} = useParams()
  

  const podcastDetail= JSON.parse(localStorage.getItem(`podcastDetail${id}`)) 
  const filterPodcasts = podcastDetail?.results.filter( episode => episode.artistIds )
  const filterEpisode = filterPodcasts.filter( episode => episode.trackId === +episodeId)


  const handleTitle = (title) => {
    const barra = title.indexOf("|")
    const barraInclinada = title.indexOf("/")

    if ( barraInclinada > 0 ) { return title.split("/")[1]}
    else if ( barra > 0 ) {  return title.split("|")[1]}
    else return title
  }

  function convertText(txtData) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    txtData = txtData.replace(urlRegex, '<a href="$1">$1</a>');

    var urlRegex2 =/(\b(\swww).[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    txtData = txtData.replace(urlRegex2, ' <a href="$1">$1</a>');

    var urlRegex3 =/(>\swww)/ig;
    txtData = txtData.replace(urlRegex3, '>www');

    var urlRegex4 =/(\"\swww)/ig;
    txtData = txtData.replace(urlRegex4, '"http://www');

    return txtData;
}
  const test = convertText(filterEpisode[0].description)

  return  <>
          <Header />
          <div className="container">
            <CardDetail podcasts={podcasts} podcastDetail={podcastDetail}/>
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
