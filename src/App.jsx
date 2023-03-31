import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Podcast from "./pages/Podcast"
import Episode from "./pages/Episode"
import axios from 'axios'


function App() {

  const [date, setDate] = useState(localStorage.getItem('date') || "0")
  const [loading, setLoading] = useState(false)
  const [podcasts, setPodcasts] = useState(JSON.parse(localStorage.getItem('podcasts')) || [])


  const productsData = async () => {
    try{
        setLoading(true)
        const newDate = new Date()
        const mili = newDate.getTime()
        const oneDay = mili + 86400000 

        if (mili >= date ){
            localStorage.setItem('date', oneDay)
            const products = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
            localStorage.setItem('podcasts', JSON.stringify(products.data.feed.entry))
            setPodcasts(products.data.feed.entry)
            console.log(products.data.feed.entry)
            console.log(products.data.feed.entry[0]["im:artist"].label)
        }
       

    }catch(err){console.log(err)}
    setLoading(false)
}

	return (
		<div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home productsData={productsData} loading={loading} setLoading={setLoading} podcasts={podcasts} setPodcasts={setPodcasts}/>}/>
      <Route path="/podcast/:id" element={<Podcast loading={loading} setLoading={setLoading} podcasts={podcasts}/>}/>
      <Route path="/podcast/:id/episode/:episodeId" element={<Episode podcasts={podcasts}/>}/>
    </Routes>
    </BrowserRouter>
		</div>
  )
}

export default App
