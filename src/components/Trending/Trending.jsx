import React ,{useState} from 'react';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import useFetch from '../../hooks/useFetch';
import Carousel from '../Carousel/Carousel';
import SwitchTabs from '../SwitchTabs/SwitchTab';
import "../Trending/Trending.scss"

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
};
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  return (
    <div className="carouselSection">
       <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
