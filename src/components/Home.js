import React from 'react'
import image from '../banner.jpg'
export default function Home() {
    return (
        <main>
            <img src={image} alt="Logo Banner" className="w-full" />
            <section>
                <h1>Welcome to Duel Links Entertainment</h1>
            </section>
        </main>
    )
}