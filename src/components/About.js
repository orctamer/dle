import React, { useEffect, useState } from 'react'
import sanityClient from '../client';
import {useParams} from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import {Link} from 'react-router-dom';
import moment from 'moment';
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source)
}

export default function About() {
    const [author, setAuthor] = useState(null);
    const [posts, setPosts] = useState(null);
    const {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            name,
            slug,
            image {
                asset-> {
                    _id,
                    url
                }
            },
            posts,
            bio
        }`).then((data) => setAuthor(data[0]))
        .catch(console.error)
    }, [slug])
    useEffect(()=> {
        sanityClient.fetch(`*[_type == "post" && author->name == "${slug}"] {
            title,
            slug,
            publishedAt,
            mainImage {
                asset-> {
                    _id,
                    url
                }
            }     
        }`).then((data) => setPosts(data))
        .catch(console.error)
    }, [slug])
    if (!posts || !author) return (
        <div className="w-full h-full fixed block top-0 left-0 bg-gray-900 opacity-100 z-50">            
        <span className="text-blue-600 opacity-100 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top: '50%'}}>
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    )
    return (
        <main className="bg-gray-900 min-h-screen p-12">                        
    <div className="container w-full mx-auto">        
    <div className="flex items-start justify-center">
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden mx-auto flex w-1/2">
      <div>
      <img className="w-full h-56 object-cover" src={urlFor(author.image)} alt={author.name} />
      <div className="py-5 text-center">
        <p className="block text-2xl text-blue-500 font-bold">{author.name}</p>
        <div className="text-gray-300"><BlockContent blocks={author.bio} projectId="1hfsciz6" dataset="production" /></div>
      </div>
      </div>
      <div className="bg-blue-900 flex-grow p-4 flex flex-col rounded-r-lg shadow-lg text-blue-100">
        <div className="font-bold text-center text-blue-100 pb-2">Posts by {author.name}</div>
        {posts && posts.map((post, index) => (
            <article className="my-2 flex items-end" key={index}>
                <Link to={"/article/" + post.slug.current } key={post.slug.current}>  
                <img src={urlFor(post.mainImage).url()} alt={post.mainImage.alt} style={{width: "275px", height: "96px"}} className="rounded-sm mr-4" />
                <div className="flex-auto">{post.title}</div>
                <div className="text-xs text-blue-400">{moment(post.publishedAt).format('YYYY-MM-DD')}</div>
                </Link>
            </article>
        ))}
      </div>
    </div>     
  </div>
{/*             <h1 className="py-4 text-blue-500 text-xl font-bold">Posts by {author.name}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">     
             {posts && posts.map((post, index) => (
                <article className="bg-white rounded-lg" key={index}>
                <Link to={"/article/" + post.slug.current } key={post.slug.current}>                        
                <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-l8 border-blue-400" key={index}>
                <img src={urlFor(post.mainImage).url()} alt={post.mainImage.alt} className="w-full h-full rounded-t-lg object-cover absolute" />                            
                </span>
                <h1 className="text-4xl py-2 text-center">{post.title}</h1>
                <span className="block relative flex justify-center items-center pr-4 pb-4">                                                                                       
                <span className="text-blue-500 opacity-50">{moment(post.publishedAt).fromNow()}</span>
                </span>
                </Link>
            </article>
            ))}
            </div> */}
            </div>
        </main>
    )
}