/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import defaultImage from '@/images/default-image.png';
import { Autoplay } from "swiper/modules";
import he from 'he';


export default function MainNewsSwiper({ posts }: { posts: PostI[] }) {
    const [slidesPerView, setSlidesPerView] = useState(3);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSlidesPerView(1);
                return;
            }

            if (window.innerWidth > 768 && window.innerWidth < 1024) {
                setSlidesPerView(2);
                return;
            }

            setSlidesPerView(3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div 
            onMouseEnter={() => swiperRef.current?.autoplay.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
            <Swiper
                spaceBetween={50}
                slidesPerView={slidesPerView}
                className='swiper-news'
                loop
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                ref={swiperRef}
            >
                {posts.map((post: PostI) => {
                    const thumbnailUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || defaultImage;
                    const postLink = `/${post.slug}`;
                    const categories = post._embedded?.["wp:term"]?.[0]?.map((cat: { name: string }) => cat.name).join(', ') || "Без категорії";
                    const author = post._embedded?.["author"]?.[0]?.name || "Невідомий автор";
                    const date = new Date(post.date).toLocaleDateString("uk-UA");

                    return (
                        <SwiperSlide key={post.id}>
                            <article className="main-news__article swiper-slide">
                                <Link className="main-news__link-img" href={postLink}>
                                    <Image
                                        src={thumbnailUrl}
                                        alt={post.title.rendered}
                                        className="main-news__img"
                                        width={400}
                                        height={300}
                                        priority
                                    />
                                </Link>

                                <div>
                                    <h3 className="main-news__h3">
                                        <Link href={postLink}>
                                            {he.decode(post.title.rendered)}
                                        </Link>
                                    </h3>

                                    <div className="main-news__description">
                                        <p className="main-news__category-list">{categories}</p>
                                        <p>{author}</p>
                                        <p>{date}</p>
                                    </div>
                                </div>
                            </article>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}