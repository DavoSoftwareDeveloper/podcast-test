import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Podcast from "./pages/Podcast"
import Episode from "./pages/Episode"


function App() {

	return (
		<div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/podcast/:id" element={<Podcast />}/>
      <Route path="/podcast/:id/episode/:episodeId" element={<Episode />}/>
    </Routes>
    </BrowserRouter>
		</div>
  )
}

export default App
