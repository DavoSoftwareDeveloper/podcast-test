import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import axios from 'axios'
import Search from '../components/Search'

function Home() {

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
    [0]["im:artist"]
    useEffect(()=>{
        productsData()
    },[])


  return (
    <div>
        <Header loading={loading}/>
        <Search />
      <div className="grid">
        {podcasts?.map(item => (
        <div key={item.id.attributes }>
        <Card 
            id={item.id.attributes["im:id"]} 
            artist={item["im:artist"].label}
            name={item["im:name"].label}
            image={item["im:image"][2].label}
            />
        </div>
    ))}
      </div>
    </div>
  )
}

export default Home
