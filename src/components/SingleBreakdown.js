import React, { useEffect, useState } from 'react';
import sanityClient from '../client';
import {useParams} from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import moment from 'moment';
import BlockContent from '@sanity/block-content-to-react';
import {Link} from 'react-router-dom';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source)
}

export default function SingleBreakdown() {
    const [singlePost, setSinglePost] = useState(null);
    const {slug} = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            name,
            _id,
            slug,
            publishedAt,
            image {
                asset->{
                    _id,
                    url
                }
            },
            description,
            decks,
            "authorName": author->name,
            "authorImage": author->image,
            "authorSlug": author->slug
        }`).then((data) => setSinglePost(data[0]))
        .catch(console.error)
    }, [slug])
    if (!singlePost) return <div>Loading...</div>
    return (        
        <main className="bg-blue-200 min-h-screen p-12">
            <article className="container mx-auto shadow-lg bg-blue-100 rounded-lg">
                <header className="relative">
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full bg-white bg-opacity-75 rounded p-12">
                            <img src={urlFor(singlePost.image).url()} className="w-full object-cover rounded-t" alt="" />
                            <h1 className="text-3xl lg:text-6xl text-center my-6">{singlePost.name}</h1>
                            <Link to={"/about/" + singlePost.authorSlug.current} key={singlePost.authorSlug.current}>
                            <div className="flex justify-center text-gray-800">
                                <img src={urlFor(singlePost.authorImage).url()} alt="" className="w-10 h-10 rounded-full border-2 border-solid border-blue-500" />
                                <p className="flex items-center pl-2 text-2xl text-blue-500 font-bold">{singlePost.authorName} <span className="text-xs text-gray-800 ml-4"> Posted on: {moment(singlePost.publishedAt).format('MM/DD/YYYY')}</span> </p>
                            </div>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                    <BlockContent blocks={singlePost.description} projectId="1hfsciz6" dataset="production" />
                </div>

                <div className="px-16 lg:px-48 py-12 lg-py-20 max-w-full">
                    {singlePost.decks.map(deck => (
                        <div>                        
                        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full text-center">
                            <BlockContent blocks={deck.description} projectId="1hfsciz6" dataset="production" />
                            <b>Skill: </b> {deck.skill}
                            <h2>Main Deck</h2>
                        </div>
                        <div className="grid grid-cols-4 w-1/2 mx-auto">                        
                        {deck.maindeck.map(card => (   
                            <>                         
                            {[...Array(card.amount)].map((e, i) => (
                                <img className="mb-4" src={`https://ygoprodeck.com/pics/${card.cardid}.jpg`} alt="" height="90px" width="120px"  />
                            ))}
                            </>              
                        ))}
                        </div>

                        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full text-center">
                            <h2>Extra Deck</h2>
                        </div>
                        <div className="grid grid-cols-4 w-1/2 mx-auto">                        
                        {deck.extra.map(card => (   
                            <>                         
                            {[...Array(card.amount)].map((e, i) => (
                                <img className="mb-4" src={`https://ygoprodeck.com/pics/${card.cardid}.jpg`} alt="" height="90px" width="120px"  />
                            ))}
                            </>              
                        ))}
                        </div>


                        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full text-center">
                            <h2>Side Deck</h2>
                        </div>
                        <div className="grid grid-cols-4 w-1/2 mx-auto">                        
                        {deck.sidedeck.map(card => (   
                            <>                         
                            {[...Array(card.amount)].map((e, i) => (
                                <img className="mb-4" src={`https://ygoprodeck.com/pics/${card.cardid}.jpg`} alt="" height="90px" width="120px"  />
                            ))}
                            </>              
                        ))}
                        </div>

                        </div>
                    ))}
                </div>
                
            </article>
        </main>
    )
}