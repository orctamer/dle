import React from 'react'
import image from '../banner.jpg'
export default function Home() {
    return (
        <main>
            <img src={image} alt="Logo Banner" className="w-full" />
            <section className="bg-blue-200 min-h-screen p-12">
                <div className="container mx-auto"><h1>Welcome to Duel Links Entertainment!</h1></div>
            </section>
        </main>
    )
}