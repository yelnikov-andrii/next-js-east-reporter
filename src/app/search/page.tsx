/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchTemplate from '@/components/templates/SearchTemplate'
import React from 'react'


export default async function page(context: any) {
    const searchParams = await context.searchParams;
    console.log(searchParams)
    const query = searchParams.s;

    return (
        <SearchTemplate 
          query={query}
        />
    )
}