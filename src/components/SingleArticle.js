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

export default function SinglePost() {
    const [singlePost, setSinglePost] = useState(null);
    const {slug} = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            publishedAt,
            mainImage {
                asset->{
                    _id,
                    url
                }
            },
            body,
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
                            <img src={urlFor(singlePost.mainImage).url()} className="w-full object-cover rounded-t" alt="" />
                            <h1 className="text-3xl lg:text-6xl text-center my-6">{singlePost.title}</h1>
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
                    <BlockContent blocks={singlePost.body} projectId="1hfsciz6" dataset="production" />
                </div>
            </article>
        </main>
    )
}