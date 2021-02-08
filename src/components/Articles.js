import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url'
import moment from 'moment'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function Article() {
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

if (!postData) return (
    <div className="w-full h-full fixed block top-0 left-0 bg-gray-900 opacity-100 z-50">
  <span className="text-blue-600 opacity-100 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top: '50%'}}>
    <i className="fas fa-circle-notch fa-spin fa-5x"></i>
  </span>
</div>
)

    return (
        <main className="bg-gray-900 min-h-screen p-12">
            <section className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postData && postData.map((post, index) => (                                               
                    <div key={index} className="max-w-2xl mx-auto bg-gray-800 dark:bg-gray-800 overflow-hidden shadow-md rounded-lg">
                    <Link to={'/article/' + post.slug.current}>
                    <img className="w-full h-48 object-cover" src={urlFor(post.mainImage).url()} alt={post.mainImage.alt} />
                    </Link>
                    <div className="p-6">
                        <div>                
                            <Link to={'/article/' + post.slug.current} className="block text-blue-100 dark:text-white font-semibold text-2xl mt-2 hover:text-blue-400 ">{post.title}</Link>                
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <img class="h-10 object-cover rounded-full" src={urlFor(post.author.image).url()} alt={post.author.name + " Avatar"} />
                                    <Link to={'/about/' + post.author.slug.current}  className="mx-2 text-blue-500 dark:text-blue-500 font-semibold">{post.author.name}</Link>
                                </div>
                                <span className="mx-1 text-gray-400 dark:text-gray-300 text-xs">{moment(post.publishedAt).format('MM/DD/YYYY')}</span>
                            </div>
                        </div>
                    </div>
                    </div>             
                    ))}
                </div>
            </section>
        </main>
    )
}