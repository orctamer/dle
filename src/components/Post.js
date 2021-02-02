import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url'
import moment from 'moment'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function Post() {
    const [postData, setPost] = useState(null)
    
    useEffect(()=> {
        sanityClient
            .fetch(`*[_type == "post"]{
            title,
            slug,
            publishedAt,
            author-> {
                name,
                slug,
                image {
                    asset-> {
                        _id,
                        url
                    }
                }                
            },
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            },
        }`).then((data) => setPost(data))
        .catch(console.error)
    }, [])

    return (
        <main className="bg-blue-100 min-h-screen p-12">

            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center mb-12">Articles</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postData && postData.map((post, index) => (
                    <article className="bg-white rounded-lg">
                        <Link to={"/post/" + post.slug.current } key={post.slug.current}>                        
                        <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-l8 border-blue-400" key={index}>
                        <img src={urlFor(post.mainImage).url()} alt={post.mainImage.alt} className="w-full h-full rounded-t-lg object-cover absolute" />                            
                        </span>
                        </Link>
                        <h1 className="text-4xl py-2 text-center">{post.title}</h1>
                        <Link to={"/about/" + post.author.slug.current } key={post.author.slug.current}>
                        <span className="block relative flex justify-center items-center pr-4 pb-4">                                                
                        <img src={urlFor(post.author.image).url()} alt={post.author.name} className="h-12 w-12 mx-4 rounded-full border-blue-500 border-2 border-solid my-auto" />                        
                        <h3 className="text-gray-800 bg-opacity-75 rounded"><span className="font-bold text-blue-500">{post.author.name}</span> <span className="text-blue-500 opacity-50">{moment(post.publishedAt).fromNow()}</span></h3>                        
                        </span>                        
                        </Link>
                    </article>
                    ))}
                </div>
            </section>
        </main>
    )
}