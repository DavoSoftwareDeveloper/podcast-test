import React, { useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Search from '../components/Search'

function Home({podcasts, loading, productsData, setPodcasts}) {


    useEffect(()=>{
        productsData()
    },[])

    const handleSearch = (e) => {
        e.preventDefault()
        const searchTerm = e.target.value
        console.log(searchTerm)
        const localStorageData = JSON.parse(localStorage.getItem("podcasts"))
        console.log(localStorageData)
        const filterSearch = localStorageData.filter( filter => {
          return  filter["im:artist"].label.indexOf(searchTerm) > 0|| filter["im:name"].label.indexOf(searchTerm) > 0
        })
        setPodcasts(filterSearch.length > 0 ? filterSearch : localStorageData)

    }


console.log(podcasts)
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
