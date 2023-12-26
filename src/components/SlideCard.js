'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs'
import { Button } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";

const SlideCard = (props) => {
    const products = props.products
    console.log('products :', products);
    const addToCard = (id) => {

    }
    return (
        <Swiper
            // onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={24}
            // slidesPerView={4}
            freeMode={true}
            grabCursor={true}
            watchSlidesProgress={true}
            modules={[Navigation]}
            className="mySwiperCard"
            breakpoints={{
                0: {
                    width: 0,
                    slidesPerView: 1,
                },
                768: {
                    width: 768,
                    slidesPerView: 2,
                },
                1024: {
                    width: 1024,
                    slidesPerView: 4,
                },
            }}
        >
            {products && products?.map((item) => (
                <SwiperSlide>
                    <div className='shadow-xl p-4'>
                        <img src={item.main_image} />
                        <hr class="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                        <h1 className='text-base font-light leading-6 text-start pb-2'>{item.product_languages[0].name}Apple 2022 MacBook Air Laptop with M2 chip</h1>
                        <div className='text-lg font-light leading-normal pb-2 text-start'>Giá: {item.price} VNĐ</div>
                        <Button icon={<ShoppingCartOutlined />} onClick={() => addToCard()} type="primary" ghost>Thêm vào giỏ hàng</Button>
                    </div>
                </SwiperSlide>))}
        </Swiper>
    )
}

export default SlideCard