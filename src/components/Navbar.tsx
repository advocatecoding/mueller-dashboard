import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiChartBar, PiFileMagnifyingGlass, PiMapTrifold, PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';
import logoSmall from "@/assets/logo-small.svg"
import { Button } from './ui/button';
import LogoText from "@/assets/logo-text.svg"
import "@/components/Navbar.css"

import { PathProp } from '@/types/pathType';


export default function Navbar({ currentPath }: PathProp) {

    const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);

    return (
        <>
            <div className={`nav-container h-[60vh] bg-secondary ps-9 pt-12 pb-12  ${isCollapsed ? 'nav-collapsed w-36' : 'nav-expanded w-72'}`}>

                {/* Logo */}
                <div className="logo flex gap-5">
                    <img src={logoSmall} alt="Logo" />
                    <img src={LogoText} className={`logo-text ${isCollapsed ? 'w-0' : 'w-32'}`} alt="Logo-text" />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-8">
                    <Link to="/overview" className="flex items-center nav-item-wrapper  gap-4 ">
                            <PiChartBar className={currentPath === "/overview" ? 'text-accent' : 'text-foreground'} fontSize="4em" />
                            <p className={`nav-text ${currentPath === "/overview" ? 'text-accent' : 'text-foreground hover:text-accent'} ${isCollapsed ? 'nav-text-collapsed' : 'nav-text-expanded'}  ${isCollapsed ? 'opacity-0' : 'opacity-100'} `}>Overview</p>
                    </Link>

                    <Link to="/analysis" className="flex items-center nav-item-wrapper  gap-4 ">
                        <PiFileMagnifyingGlass className={currentPath === "/analysis" ? 'text-accent' : 'text-foreground group-hover:text-accent'} fontSize="4em" />
                        <p className={`nav-text ${isCollapsed ? 'nav-text-collapsed' : 'nav-text-expanded'} ${currentPath === "/analysis" ? 'text-accent' : 'text-foreground hover:text-accent'} `}>Analysis</p>

                    </Link>

                    <Link to="/map" className="flex items-center nav-item-wrapper gap-4 ">
                        <PiMapTrifold className={currentPath === "/map" ? 'text-accent' : 'text-foreground hover:text-accent'} fontSize="4em" />
                        <p className={`nav-text ${isCollapsed ? 'nav-text-collapsed' : 'nav-text-expanded'} ${currentPath === "/map" ? 'text-accent' : 'text-foreground hover:text-accent'}`}>Map</p>
                    </Link>
                </div>

                {/* Collapse/Expand Button */}
                <div className="flex justify-start">
                    <Button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        variant="default"
                        className="rounded-full h-16 w-16 hover:bg-accent expand-button"
                    >
                        {isCollapsed ? (
                            <PiCaretRightBold className="text-accent hover:text-white text-3xl"  />
                        ) : (
                            <PiCaretLeftBold className="text-accent hover:text-white text-3xl"/>
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
};

