/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import Image from 'next/image';
import defaultImage from '@/images/default-image.png';
import he from 'he';


export default function MainTopNews({ posts }: { posts: PostI[] }) {
    const [bannerHeight, setBannerHeight] = useState(0);
    const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        const banner: HTMLElement | null = document.querySelector('.main-top__banner');
        if (banner) {
            setBannerHeight(banner.offsetHeight);
        }
    }, []);



    useEffect(() => {
        const handleResize = () => {
            setDirection(window.innerWidth >= 1200 ? 'vertical' : 'horizontal');
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <div
                className="main-top__news"
                style={{ height: bannerHeight }}
                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={direction === 'vertical' ? 2 : 1}
                    direction={direction}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    navigation={{ 
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    ref={swiperRef}
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <Link href="/" className="main-top__news-card">
                                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                                    <Image
                                        src={post._embedded["wp:featuredmedia"][0].source_url}
                                        alt={post.title.rendered}
                                        width={320}
                                        height={190}
                                        style={{ objectFit: "cover", objectPosition: 'center', height: '100%', width: '320px' }}
                                        className='main-top__news-img'
                                    />
                                ) : (
                                    <Image
                                        src={defaultImage}
                                        alt="Default Image"
                                        className="main-top__news-img"
                                        width={320}
                                        height={190}
                                        style={{ objectFit: "contain", objectPosition: 'center', height: '100%' }}

                                    />
                                )}
                                <h2 className="main-top__link">{he.decode(post.title.rendered)}</h2>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
            <div className="swiper-navigation">
                <button className="swiper-button swiper-button-prev" aria-label="Попередній слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 384 512">
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                    </svg>
                </button>
                <button className="swiper-button swiper-button-next" aria-label="Наступний слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 384 512">
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                    </svg>
                </button>
            </div>
        </>

    )
}