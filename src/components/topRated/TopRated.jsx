import React ,{useState} from 'react';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import useFetch from '../../hooks/useFetch';
import Carousel from '../Carousel/Carousel';
import SwitchTabs from '../SwitchTabs/SwitchTab';
import "../Trending/Trending.scss"

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
};
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  console.log(data);
  return (
    <div className="carouselSection">
       <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated
