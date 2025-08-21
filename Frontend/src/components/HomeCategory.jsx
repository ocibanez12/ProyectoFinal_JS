import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const HomeCategory = () => {
  const categories = [
    { id: 1, name: 'Cartas', filter: 'Carta', img: 'https://i.postimg.cc/bvBwzzgQ/SV10pt5-ZSV-ES-34.png', btnText: 'Ver más' },
    { id: 2, name: 'Mazos', filter: 'Mazo', img: 'https://i.postimg.cc/tgqpBsrz/Reshiram-EX.png', btnText: 'Ver más' },
    { id: 3, name: 'Packs', filter: 'Pack', img: 'https://i.postimg.cc/DZDhfB7C/Fulgor-Negro.jpg', btnText: 'Ver más' },
  ];

  return (
    <div className='home-category'>
      <div className='home-head-category'>
        <h2>Categorías Destacadas</h2>
      </div>
      <div className='home-body-category'>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 20 } }}
        >
          {categories.map(({ id, name, img, btnText, filter }) => (
            <SwiperSlide key={id}>
              <div className='category-card'>
                <img src={img} alt={name} className='category-img' />
                <h3>{name}</h3>
                <Link to={`/productos?filtro=${filter}`}>
                  <button className='btn btn-primary'>{btnText}</button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCategory
