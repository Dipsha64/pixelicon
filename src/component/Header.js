import logo from "../assets/images/vectopus-logo-beta.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return ( 
        <>
        <nav className="bg-gradient-to-r from-indigo-300">
            <div className="mx-24">
                <div className="flex h-14 lg:h-24 items-center justify-between">
                    <div className="flex-shrink-0">
                        <a className="block w-48 xl:w-40 2xl:w-48" href="/">
                            <img src={logo} alt="logo-image"/>
                        </a>
                    </div>
                    <div className="hidden xl:block">
                        <div className="flex gap-3 2xl:gap-4 items-center">
                            <a class="pt-3 text-base font-medium leading-5" href="/icons">Icons</a>
                            <a class="pt-3 text-base font-medium leading-5" href="/icons">Conatct Us</a>
                        </div>
                    </div>
                    <div className="flex gap-2 xl:hidden">
                        {isOpen ? <RxCross2 size={'1.5rem'} onClick={() => setIsOpen(!isOpen)}/> : 
                        <GiHamburgerMenu size={'1.5rem'} onClick={() => setIsOpen(!isOpen)}/>}
                    </div>
                </div>
            </div>
            {isOpen ? (
            <div className="xl:hidden">
                <div className="space-y-3 divide-y divide-gray-200 mb-3 mx-24">
                    <form>
                        <div className="rounded-lg flex px-3 py-2 bg-slate-200 h-16">
                            <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" id="search"><path d="M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z"></path></svg>
                            </div>
                            <div className="flex h-12 w-px bg-black xl:ml-2 ml-2 items-center justify-center"></div>
                            <div className="grow flex">
                                <div className="flex items-center relative w-full">
                                <input class="flex-none bg-transparent w-full xl:hidden !ring-0 pt-3 pb-3 pl-2 border-0 outline-0" name="search" type="text" placeholder="Search our assets…"/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="pt-3">
                        <button class="flex w-full p-2 cursor-pointer text-base font-semibold leading-5" type="button" data-headlessui-state="open">Icons</button>
                        <button class="flex w-full p-2 cursor-pointer text-base font-semibold leading-5" type="button" data-headlessui-state="open">Conatct Us</button>
                    </div>
                </div>
            </div>
            ) : ''}
        </nav>
        </>
    );
}

export default Header;