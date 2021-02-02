import React from 'react'
import {NavLink} from 'react-router-dom'
import {SocialIcon} from 'react-social-icons';
export default function NavBar() {
    return (
        <header className="bg-blue-900">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink to ="/" exact className="inflex-flex items-center py-6 px-3 mr-4 text-blue-100 hover:text-blue-300 font-bold font-4xl tracking-wide" activeClassName="text-blue-300 ">
                        Duel Links Entertainment
                    </NavLink>
                    <NavLink to ="/post" className="inflex-flex items-center py-6 px-3 mr-4 text-blue-100 hover:text-blue-300 font-bold font-4xl tracking-wide" activeClassName="text-blue-300">
                        Articles
                    </NavLink>
                    <NavLink to ="/project" className="inflex-flex items-center py-6 px-3 mr-4 text-blue-100 hover:text-blue-300 font-bold font-4xl tracking-wide" activeClassName="text-blue-300" >
                        Breakdowns
                    </NavLink>
                    <NavLink to ="/about" className="inflex-flex items-center py-6 px-3 mr-4 text-blue-100 hover:text-blue-300 font-bold font-4xl tracking-wide" activeClassName="text-blue-300" >
                        About
                    </NavLink>                                                                           
                </nav>
            <div className="inline-flex p-3 my-auto">
                <SocialIcon url="https://www.youtube.com/channel/UCLXlZXX8Ho8Dk6xF-e-vY1A" className="mr-4" target="_blank" fgColor="#fff" style={{height: 35, width:35}} />
                <SocialIcon url="https://twitter.com/duellinksent?lang=en" className="mr-4" target="_blank" fgColor="#fff" style={{height: 35, width:35}} />
                <SocialIcon url="https://www.twitch.tv/duellinksentertainment" className="mr-4" target="_blank" fgColor="#fff" style={{height: 35, width:35}} />
            </div>
            </div>
        </header>
    )
}