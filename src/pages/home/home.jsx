import React from 'react'
import './home.scss'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import Trending from '../../components/Trending/Trending'
import Popular from '../../components/popular/Popular'
import TopRated from '../../components/topRated/TopRated'
const Home = () => {
  return (
    <div>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home
