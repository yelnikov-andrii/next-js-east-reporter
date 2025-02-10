import { baseUrl } from '@/utils/baseUrl';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react'
import MainTopNews from '../elements/MainTopNews';
import SearchForm from '../elements/SearchForm';

export default async function HomeTop() {
    const allowedLocales: LocaleT[] = ["uk", "en", "de"];

    const localeRaw = (await cookies()).get('NEXT_LOCALE')?.value || "uk";
    const locale: LocaleT = allowedLocales.includes(localeRaw as LocaleT) ? (localeRaw as LocaleT) : "uk";

    const categoriesObjUnterview = {
        'uk': 'interview',
        'en': 'interview-en',
        'de': 'inteview-de'
    }

    const categoryResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${categoriesObjUnterview[locale]}`);
    const category = await categoryResponse.json();
    let randomInterview: InterviewPost | null = null;

    if (category.length > 0) {
        const interviewsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?categories=${category[0].id}&per_page=5&order=desc&orderby=date`);
        const interviews = await interviewsResponse.json();

        if (interviews.length > 0) {
            const randomIndex = Math.floor(Math.random() * interviews.length);
            randomInterview = interviews[randomIndex];
        }
    }
    const randomPostContent = randomInterview?.content?.rendered || "";
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = randomPostContent.match(youtubeRegex);

    const videoId = matches ? matches[1] : "";

    const postsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?lang=uk&per_page=18&order=desc&orderby=date&_embed`);
    const posts = await postsResponse.json();

    return (
        <section className="main-top">
            <div className="container">
                <SearchForm />
            </div>

            <div className="main-top__block">
                <div className="main-top__banner">
                    <div className="youtube-placeholder" data-video-id={videoId}>
                        <Image src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt="Video Thumbnail" width={500} height={300} />
                        <button className="youtube-play-button" aria-label="Відтворити відео">
                            <svg viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M658.2 523.8l-151.9 87.7c-31.6 18.2-71-4.6-71-41V395c0-36.4 39.5-59.2 71-41l151.9 87.7c31.5 18.4 31.5 63.9 0 82.1z"
                                    fill="#025cc0" />
                                <path
                                    d="M533.2 870c-217.2 0-394-176.7-394-394S316 82 533.2 82s394 176.7 394 394-176.8 394-394 394z m0-737.1C344 132.9 190.1 286.8 190.1 476S344 819.1 533.2 819.1 876.3 665.2 876.3 476 722.4 132.9 533.2 132.9z"
                                    fill="#025cc0" />
                            </svg>
                        </button>
                    </div>
                </div>
                <MainTopNews
                    posts={posts}
                />
            </div>
        </section >
    )
}   