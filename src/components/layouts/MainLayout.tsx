import React from 'react'
import Header from '../modules/Header'
import { cookies } from 'next/headers'
import Footer from '../modules/Footer';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const theme = (await cookies()).get("theme")?.value || 'dark';

    return (
        <body className={theme === "light" ? "light-theme" : "dark-theme"}>
            <Header 
              theme={theme}
            />
            {children}
            <Footer />
        </body>
    )
}