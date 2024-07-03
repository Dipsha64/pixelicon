import IconListing from "./Icons/IconListing";
// import iconBackground from "../assets/images/blueBsckground.png";

function Home() {

    return ( 
        <div>
            <section className="overflow-hidden bg-white pt-xl-0 mt-xl-0 h-auto bg-gradient-to-r from-indigo-300">
                <div className="xl:grid mt-32 mb-32 xl:mt-0 xl:mb-44 gap-24">
                    <div className="d-flex flex-wrap align-items-center mt-5 mx-64">
                        <div className="row align-items-center justify-content-center py-xl-0 m-0">
                            <div className="col-xl py-3 pr-xl-5 mt-xl-0 pl-0">
                            <p class="mb-4 text-xl text-center text-uppercase text-light-gray font-weight-bold text-20px text-slate-600">Premium icons for designers</p>
                            </div>
                        </div>
                        {/* <form className="mb-6">
                            <div className="rounded-lg flex px-3 py-2 bg-slate-200 h-16">
                                <div className="p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" id="search"><path d="M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z"></path></svg>
                                </div>
                                <div className="flex h-12 w-px bg-black xl:ml-2 ml-2 items-center justify-center"></div>
                                <div className="grow flex">
                                    <div className="flex items-center relative w-full">
                                    <input class="bg-transparent w-full text-black pt-3 pb-3 pl-2 border-0 outline-0" name="search" type="text" placeholder="Search for icons, illustrations and elements…"/>
                                    </div>
                                </div>
                            </div>
                        </form> */}
                    </div>
                </div>
            </section>
            <div>
                <IconListing/>
            </div>
        </div>
    );
}

export default Home;