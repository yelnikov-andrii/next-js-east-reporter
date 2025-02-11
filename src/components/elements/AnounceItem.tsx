import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import defaultImage from '@/images/default-image.png'
import he from 'he';
import { replacebaseUrl } from '@/utils/replaceBaseUrl';


export default function AnounceItem({ post }: { post: PostI }) {
    const thumbnailUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || defaultImage;

    return (
        <Link className="anounces__item" href={`/${replacebaseUrl(post.slug)}`}>
            <Image
                src={thumbnailUrl}
                alt="Default image"
                className="anounces__img"
                width={360}
                height={310}
            />

            <h2 className="anounces__title">
                {he.decode(post.title.rendered)}
            </h2>
        </Link>
    )
}