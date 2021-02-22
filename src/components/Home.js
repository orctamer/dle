import React, {useState, useEffect} from 'react';
import image from '../banner.jpg'
import {Link} from 'react-router-dom';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url'
import moment from 'moment'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function Home() {
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
<main>
            <img src={image} alt="Logo Banner" className="w-full" />
            <section className="bg-gray-900 min-h-screen p-12 text-gray-200">
            <div className="container mx-auto">
                <div className="grid grid-cols-6 gap-6" >    
                    <div className="col-span-4 bg-blue-300 relative">
                    <Link to={'/article/' + postData[0].slug.current}>
                        <div style={{paddingBottom: '35em'}} className="relative overflow-hidden">
                           <div className="absolute object-fit bg-center bg-cover w-full h-full"  style={{backgroundImage: 'url("'+urlFor(postData[0].mainImage)+'")'}}>
                           
                           </div>
                         <div className="absolute w-full bottom-0 left-0  bg-gradient-to-t from-black to-transparent">
                         <div className="px-8 py-4">
                             <p className="font-bold">{moment(postData[0].publishedAt).format('MMM DD, YYYY')}</p>
                             <p className="text-5xl font-bold">{postData[0].title}</p>

                             </div>
                        </div>     
                        </div>
                        </Link>    
                    </div>            
                    <div  className="col-span-2">
                    <Link to={'/article/' + postData[0].slug.current}>  <div style={{paddingBottom: '35em'}} className="relative overflow-hidden">
                           <div className="absolute object-fit bg-center bg-cover w-full h-full"  style={{backgroundImage: 'url("'+urlFor(postData[1].mainImage)+'")'}}>
                           
                           </div>
                         <div className="absolute w-full bottom-0 left-0  bg-gradient-to-t via-blakc from-black to-transparent">
                         <div className="px-8 py-4">
                             <p className="font-bold">{moment(postData[1].publishedAt).format('MMM DD, YYYY')}</p>
                             <p className="text-5xl font-bold">{postData[1].title}</p>

                             </div>
                             
                        </div>     
                        </div>
                        </Link>
                    </div>
                {postData && postData.slice(2).map(post => (
                    <>
                    <div className="col-span-2">
                        <Link to={'/article/' + post.slug.current}> <div style={{paddingBottom: '24em'}} className="relative overflow-hidden">
                           <div className="absolute object-fit bg-no-repeat bg-center bg-cover w-full h-full"  style={{backgroundImage: 'url("'+urlFor(post.mainImage)+'")'}}>
                           
                           </div>
                         <div className="absolute w-full bottom-0 left-0   bg-gradient-to-t via-blakc from-black to-transparent">
                         <div className="px-8 py-4">
                             <p className="font-bold">{moment(post.publishedAt).format('MMM DD, YYYY')}</p>
                             <p className="text-5xl font-bold">{post.title}</p>

                             </div>                             
                        </div>     
                        </div> 
                        </Link> 
                    </div>
                    
                    </>
                ))}                    
                </div>
            </div>
        </section>    
</main>
)

}

/* export default function Home() {
    return (
        <main>
            <img src={image} alt="Logo Banner" className="w-full" />
            <section className="bg-gray-900 min-h-screen p-12 text-gray-200">
                <div className="container mx-auto">
                    <div className="grid grid-cols-5 gap-2" >
                        <div className="col-span-3 bg-blue-100">
                            hello
                        </div>
                        <div className="col-span-2 bg-blue-200">
                            hello
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} */