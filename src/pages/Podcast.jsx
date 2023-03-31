import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import CardDetail from '../components/CardDetail'
import { handleTime } from '../functions/functions'
import { handleTitle } from '../functions/functions'



function Podcast({loading, setLoading, podcasts}) {

    const {id} = useParams()
    const navigate = useNavigate()

    const [date, setDate] = useState(localStorage.getItem(`date${id}`) || "0")
    const [podcastDetail, setpodcastDetail] = useState(JSON.parse(localStorage.getItem(`podcastDetail${id}`)) || null)
    const filterPodcasts = podcastDetail?.results.filter( episode => episode.artistIds )


    const podcastData = async () => {

      if ( podcastDetail?.results[0].collectionId === +id) return  
      try{

            setLoading(true)
            const newDate = new Date()
            const mili = newDate.getTime()
            const oneDay = mili + 86400000



              if (mili >= date ){

               localStorage.setItem(`date${id}`, oneDay)
            const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
                  fetch(`https://api.allorigins.win/get?&url=${encodeURIComponent(url)}`)
                    .then(response => {
                      console.log(response)
                      if (response.ok) return response.json()
                      throw new Error('Network response was not ok.')
                    })
                    .then(data => (
                      localStorage.setItem(`podcastDetail${id}`, data.contents),
                      setpodcastDetail(JSON.parse(data.contents),
                      setLoading(false)
                      )));                 
                  }        

                }catch(err){console.log(err)}
                
    }

    useEffect(()=>{
        podcastData()
        return ()=>{
          setLoading(false)
        }
    },[])

    
    const handleEpisode = (idEpisode) => {
      navigate(`/podcast/${id}/episode/${idEpisode}`)
    }


  return (
    <>
              <Header loading={loading}/>
              <div className="container">
                <CardDetail podcasts={podcasts} podcastDetail={podcastDetail}/>
              <div>
              <div className='episodesCount'>Episodes: <span>{podcastDetail?.resultCount -1}</span></div>
              <br/>
              <div className='episodes'>
              <table >
                    <thead style={{ color: "rgb(79,89,103)" }}>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterPodcasts?.map(podcast => {
                        
                        return (
                          <>
                          <tr style={{ cursor: "pointer" }} onClick={() => handleEpisode(podcast.trackId)} className="table-row" key={podcast.collectionId}>
                            <td className='title-card blue'>{handleTitle(podcast.trackName)}</td>
                            <td>{podcast.releaseDate.split("T")[0]}</td>
                            <td className='tdright'>{handleTime(podcast.trackTimeMillis)}</td>
                          </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
              </div>
            </div>
        </div> 
    </>
  )
}

export default Podcast
