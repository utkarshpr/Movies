import React ,{useState} from 'react';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import useFetch from '../../hooks/useFetch';
import Carousel from '../Carousel/Carousel';
import SwitchTabs from '../SwitchTabs/SwitchTab';
import "../Trending/Trending.scss"

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
};
  const { data, loading } = useFetch(`/${endpoint}/popular`);

  return (
    <div className="carouselSection">
       <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular
