/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from '@/utils/baseUrl';
import React from 'react'
import { redirect } from 'next/navigation';
import PageTemplate from '@/components/templates/PageTemplate';
import PostTemplate from '@/components/templates/PostTemplate';


export default async function page({ params }: { params: any }) {
    const { slug } = await params;
    const pageResponse = await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=${slug[0]}`);
    const pageArr = await pageResponse.json();
    const postResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?slug=${slug[0]}&_embed`);
    const postArr = await postResponse.json();
    const page = pageArr[0];
    const post = postArr[0];

    if (!post && !page) {
        redirect('/404')
    }

    if (page) {
        return (
            <PageTemplate
                page={page}
            />
        )
    }

    return (
        <PostTemplate
            post={post}
        />
    )
}