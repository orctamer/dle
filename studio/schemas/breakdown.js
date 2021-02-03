import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: 'breakdown',
    title: "Breakdown",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96
            },
        },
        {
            name: 'image',
            title: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: "description",
            title: "Description",
            type: "blockContent"
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime'
        },
        {
            name: "Graph",
            title: "Graph",
            type: "array",
            of: [{
                title: "Graph Name",
                name: "graphname",
                type: "object",
                fields: [
                    {name: 'artwork', type:"image", title: "Card Artwork", options: {hotspot: true}},
                    {name: 'name', type:"string", title: "Deck Archetype"},
                    {name: 'amount', type:"string", title: "Amount of Decks"}
                ]  
            }]           
        },
        {
            title: 'Decks',
            name: 'decks',
            type: 'array',
            of: [{
                title: 'Deck List',
                name: 'decklist',
                type: 'object',
                fields: [
                    {name: "name", type: "string", title: "Duelist Name"},
                    {name: "skill", type: "string", title: "Deck Skill"},
                    {
                        name: "description",
                        title: "Description",
                        type: "blockContent"
                    },
                    {
                        name: "maindeck",
                        type: "array",
                        title: "Main Deck",
                        of: [
                            {
                              type: "object",
                              fields: [
                                {name: "cardid", type: "number", title: "Card ID"},
                                {name: "amount", type: "number", title: "Card Amount"}                                  
                              ],
                              preview: {
                                select: {
                                    title: 'cardid',
                                    subtitle: 'amount'
                                },
                                prepare(selection) {
                                    const {title, subtitle} = selection
                                    return {
                                        title: title,
                                        subtitle: subtitle+"x",
                                        media: <img src={'https://ygoprodeck.com/pics/'+title+'.jpg'} />
                                    }
                                }
                            }  
                            },
                        ]
                    },
                    {
                        name: "extra",
                        type: "array",
                        title: "Extra Deck",
                        of: [
                            {
                              type: "object",
                              fields: [
                                {name: "cardid", type: "number", title: "Card ID"},
                                {name: "amount", type: "number", title: "Card Amount"}                                  
                              ],
                              preview: {
                                select: {
                                    title: 'cardid',
                                    subtitle: 'amount'
                                },
                                prepare(selection) {
                                    const {title, subtitle} = selection
                                    return {
                                        title: title,
                                        subtitle: subtitle+"x",
                                        media: <img src={'https://ygoprodeck.com/pics/'+title+'.jpg'} />
                                    }
                                }
                            }   
                            },
                        ],
                    },
                    {
                        name: "sidedeck",
                        type: "array",
                        title: "Side Deck",
                        of: [
                            {
                              type: "object",
                              fields: [
                                {name: "cardid", type: "number", title: "Card ID"},
                                {name: "amount", type: "number", title: "Card Amount"}                                  
                              ],
                              preview: {
                                select: {
                                    title: 'cardid',
                                    subtitle: 'amount'
                                },
                                prepare(selection) {
                                    const {title, subtitle} = selection
                                    return {
                                        title: title,
                                        subtitle: subtitle+"x",
                                        media: <img src={'https://ygoprodeck.com/pics/'+title+'.jpg'} />
                                    }
                                }
                            }   
                            },
                        ]
                    },
                ],

            }],
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: {type: 'author'}
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image'
        }
    }
}