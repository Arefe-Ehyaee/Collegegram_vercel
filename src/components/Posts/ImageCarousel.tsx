import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from "@tanstack/react-query";
import { FetchPosts } from "./FetchPosts";

import 'swiper/css';
interface Image {
    src: string;
    alt: string;
  }

interface ImageCarouselProps {
    images: Image[];
  }

 

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {

  // const {data, error, isPending, isError } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: FetchPosts,
  // })

  // if(isPending){
  //   return <span>Loading...</span>
  // }

  // if(isError){
  //   return <span>Error: {error.message}</span>
  // }

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className=" md:w-full md:h-[376px]"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={image.alt} className="w-full h-auto object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
