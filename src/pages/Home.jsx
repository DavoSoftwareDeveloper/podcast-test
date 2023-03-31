import React, { useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Search from '../components/Search'
import Podcast from './Podcast'

function Home({podcasts, loading, productsData, setPodcasts, setLoading}) {


    useEffect(()=>{
        productsData()
        setLoading(false)
    },[])

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase()
        const localStorageData = JSON.parse(localStorage.getItem('podcasts')) 
        const filterSearch = localStorageData.filter( filter => {
          return  filter["im:artist"].label.toLowerCase().includes(searchTerm) || filter["im:name"].label.toLowerCase().includes(searchTerm)
        })
        setPodcasts(searchTerm.length > 0 ? filterSearch : localStorageData)
    }

  return (
    <div>
        <Header loading={loading}/>
        <div className='search-container'>
            <Search handleSearch={handleSearch} />
        </div>
      <div className="grid">
        {podcasts?.map(item => (
        <div key={item.id.attributes["im:id"] }>
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
