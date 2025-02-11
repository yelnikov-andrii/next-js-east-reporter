import he from 'he'
import React from 'react'
import Image from 'next/image';


export default function Article({ post, categories }: { post: PostI, categories: CategoryI[] }) {
    const isInterview = categories.some((category: CategoryI) => category.slug === 'interview');
    const author = post._embedded?.["author"]?.[0]?.name || "Невідомий автор";
    const date = new Date(post.date).toLocaleDateString("uk-UA");

    if (isInterview) {
        const content = post?.content?.rendered || "";
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
        const matches = content.match(youtubeRegex);
        const videoId = matches ? matches[1] : "";

        const removeYouTubeLinks = (content: string): string => {
            return content.replace(
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/g,
                ''
            );
        };

        const cleanedContent = removeYouTubeLinks(content);

        return (
            <article className="categories-article__article">
                <h1 className="categories-article__h1">
                    {he.decode(post.title.rendered)}
                </h1>

                <div className="interview__video-container">
                    <div className="youtube-placeholder" data-video-id="<?php echo $video_id; ?>">
                        <Image
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt="Video Thumbnail"
                            width={600}
                            height={400}
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
                    </div>
                </div>

                <div className="categories-article__content"
                    dangerouslySetInnerHTML={{
                        __html: he.decode(cleanedContent),
                    }}
                >
                </div>
            </article>
        )
    }

    return (
        <article className="categories-article__article">
            <h1 className="categories-article__h1">
                {he.decode(post.title.rendered)}
            </h1>
            <div className="categories-article__meta">
                <span className="categories-article__span">
                    {date}
                </span>
                <span className="categories-article__span">
                    {author}
                </span>
            </div>
            <div className="categories-article__content"
                dangerouslySetInnerHTML={{
                    __html: he.decode(post.content.rendered),
                }}
            >
            </div>
        </article>
    )
}