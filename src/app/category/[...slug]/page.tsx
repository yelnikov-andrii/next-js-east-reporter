/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { redirect } from "next/navigation";
import { baseUrl } from '@/utils/baseUrl';
import CategoryPage from '@/components/templates/CategoryPage';


export default async function page({ params }: { params: any }) {
  const { slug } = params;
  if (!slug) redirect("/news");

  const categoryRes = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${slug}`);
  const categoryData = await categoryRes.json();

  const postsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?categories=${categoryData[0].id}&_embed`);
  const posts = await postsResponse.json();

  return (
    <CategoryPage
      categoryData={categoryData}
      posts={posts}
      slug={slug}
    />
  );
}