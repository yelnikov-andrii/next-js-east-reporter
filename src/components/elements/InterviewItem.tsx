import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import he from 'he';
import { replacebaseUrl } from '@/utils/replaceBaseUrl';


export default function InterviewItem({ post }: { post: InterviewPost }) {
    const content = post?.content?.rendered || "";
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = content.match(youtubeRegex);

    const videoId = matches ? matches[1] : "";

    return (
        <div className="interview__item">
            <div className="interview__video-container">
                <div className="youtube-placeholder" data-video-id="">
                    <Image
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video Thumbnail"
                        width={600}
                        height={360}
                    />
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
                    <p>
                    </p>
                </div>
            </div>
            <Link className="categories__link" href={`/${replacebaseUrl(post.slug)}`}>
                <h2 className="categories__title interview__title">
                    {he.decode(post.title.rendered)}
                </h2>
            </Link>
        </div>
    )
}