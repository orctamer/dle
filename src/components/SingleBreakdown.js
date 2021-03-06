import React, { useEffect, useState } from 'react';
import sanityClient from '../client';
import {useParams} from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import moment from 'moment';
import BlockContent from '@sanity/block-content-to-react';
import {Link} from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

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
            Graph,
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
    if (!singlePost) return     <div className="w-full h-full fixed block top-0 left-0 bg-gray-900 opacity-100 z-50">
    <span className="text-blue-600 opacity-100 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top: '50%'}}>
      <i className="fas fa-circle-notch fa-spin fa-5x"></i>
    </span>
  </div>
    let chartData = {
        series: singlePost.Graph.map(x => x.amount),
        options: {
            chart: {
                type: 'pie'
            },
            fill: {
                type: 'image',
                image: {
                    src: singlePost.Graph.map(x => urlFor(x.artwork).url())
                }                
            },
            labels: singlePost.Graph.map(x => x.name),
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#111']
                },
                background: {
                    enabled: true,
                    foreColor: '#fff',
                    borderWidth: 0
                }
            },
            legend: {
                show: true,
                labels: {
                    colors: ['#fff']
                }
            }
        }
    }
    return (        
        <main className="bg-gray-900 min-h-screen p-12">         
            <article className="container mx-auto shadow-lg bg-gray-200 rounded-lg">
                <header className="relative">
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full bg-black bg-opacity-95 rounded p-12">
                            <img src={urlFor(singlePost.image).url()} className="w-full object-cover rounded-t" alt="" />
                            <h1 className="text-3xl lg:text-6xl text-center text-blue-400 my-6">{singlePost.name}</h1>
                            <Link to={"/about/" + singlePost.authorSlug.current} key={singlePost.authorSlug.current}>
                            <div className="flex justify-center text-gray-800">
                                <img src={urlFor(singlePost.authorImage).url()} alt="" className="w-10 h-10 rounded-full border-2 border-solid border-blue-500" />
                                <p className="flex items-center pl-2 text-2xl text-blue-500 font-bold">{singlePost.authorName} <span className="text-xs text-gray-700 ml-4"> Posted on: {moment(singlePost.publishedAt).format('MM/DD/YYYY')}</span> </p>
                            </div>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                
                <div className="w-full p-8" style={{backgroundImage: "url('https://cdn.discordapp.com/attachments/359412299716493312/772343352242470912/breakdown2.png')"}}>
                    <div className="mx-auto w-full text-white"><ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={620} /></div>
                </div>
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