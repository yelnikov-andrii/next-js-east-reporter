import { baseUrl } from '@/utils/baseUrl';
import { replacebaseUrl } from '@/utils/replaceBaseUrl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import defaultImage from '@/images/default-image.png'


export default async function RelatedPosts({ post }: { post: PostI }) {
    console.log(post)
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?categories=${post.categories.join(",")}&exclude=${post.id}&per_page=10&_embed`);
    const posts = await res.json();


    return (
        <>
            <h2 className="categories-article__h2">
                Пов&apos;язані пости
            </h2>
            <div className="categories-article__related related-posts">
                {posts.map((postItem: PostI) => (
                    <Link href={replacebaseUrl(postItem.slug)} key={postItem.id} className='related-posts__post'>
                    <Image
                      width={300}
                      height={290}
                      src={postItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url || defaultImage}
                      alt={postItem.title.rendered}
                    />
                        <h2 className="categories-article__title related-posts__title">
                            {postItem.title.rendered}
                        </h2>
                        <p>
                            {new Date(postItem.date).toLocaleDateString("uk-UA")}
                        </p>
                    </Link>
                ))}
            </div>
        </>
    )
}