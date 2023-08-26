import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../HeroBanner/HeroBanner.scss'
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../lazyLoad/img';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx'
import { Fade } from "react-awesome-reveal";
import Shake from 'react-reveal/Bounce';
import Zoom from 'react-reveal/Zoom';


const rand = () => { 
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5 ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
//console.log(rand());

const HeroBanner = () => {
    const [random, setrandom] = useState(rand);
    const [background, setBackGround] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home)
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    };

    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg = url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackGround(bg);

    }, [data])
 
    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div> 
            <ContentWrapper>
                <div className="heroBannerContent">
                    
                    <span className="title" > Welcome <Fade delay={1e3} cascade damping={1e-1}>{random}</Fade>  </span>
                    <span className="subTitle">
                    
                    <Zoom left cascade> Millions of movies, TV shows and people to discover.
                        Explore now.
                        </Zoom>
                        
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or Tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
