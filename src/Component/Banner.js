import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
  const image = [
    "https://i.pinimg.com/originals/67/19/e0/6719e0e45fb0e11e6de25004c1560690.jpg",
    "https://www.newscaststudio.com/wp-content/uploads/2020/04/trump-briefing-angry.jpg",
    "https://images.pond5.com/table-and-breaking-news-banner-144587301_prevstill.jpeg",
  ];

  return (
    <div className="relative">
      <div className="absolute w-full h-32 " />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {image.map((img) => (
          <div>
            <img loading="lazy" src={img} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
