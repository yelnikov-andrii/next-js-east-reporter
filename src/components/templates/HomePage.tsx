import React from 'react'
import HomeTop from '../modules/HomeTop'
import Marquee from '../elements/Marquee'
import HomeNews from '../modules/HomeNews'
import MainImportant from '../modules/MainImportant'


export default function HomePage() {

    return (
        <main className="main">
            <HomeTop />
            <Marquee />
            <HomeNews />
            <Marquee />
            <MainImportant />
        </main >
    )
}