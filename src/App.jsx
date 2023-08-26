import { useState ,useEffect} from 'react'
import {fetchDataFromApi} from "./utils/api";
import { BrowserRouter , Route,Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration , getGenres} from './store/homeSlice'

import Footer from './components/footer/footer';
import Header from './components/header/header';
import PG_404 from './pages/404/_404';
import Explore from './pages/explore/explore';
import Details from './pages/details/details';
import Home from './pages/home/home';
import SearchResult from './pages/searchResult/searchResult';


function App() {


    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
   


  useEffect(() => {
    fetchApiConfi();
    genresCall();
  }, [])
  
  const fetchApiConfi =() =>{
    fetchDataFromApi('/configuration').then((res)=>{
      console.log(res);
      const url = {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
       
      }
      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
   
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });
    console.log(allGenres);
    dispatch(getGenres(allGenres));
};

  return (
    <>
    
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/:mediaType/:id' element={<Details/>}/>
    <Route  path='/search/:query' element={<SearchResult/>}/>
    <Route  path='/explore/:mediaType' element={<Explore/>}/>
    <Route  path='*' element={<PG_404/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>

       
    </>
  )
}

export default App
