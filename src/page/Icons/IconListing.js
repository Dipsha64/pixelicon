import axios from "axios";
import { useState, useEffect } from "react";
import { getPaginationIconRoute, getCategory, getStyle } from "../../utils/APIRoutes";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function IconListing() {
    const [ filterSidebar, setFilterSidebar ] = useState(false);
    const [ iconItem, setIconItem ] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');
    const [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(30);
    const [colorValue, setColorValue] = useState('#5f6367');
    const [sizeValue, setSizeValue] = useState(50);
    const [categoryArr, setCategoryArr ] = useState([]);
    const [ styleArr, setStyleArr ] = useState([]);
    const [ showCategory, setShowCategory ] = useState(true);
    const [ showStyle, setShowStyle ] = useState(true);
    const [ filterValue, setFilterValue ] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', content: '' });

    const fetchIconData = () => {
        try {
            axios.post(getPaginationIconRoute,{ page : page,limit : limit, query : searchValue}).then((res)=>{
                if(res.data && res.data.status){
                    console.log("res.data.data..",res.data.data);
                    setIconItem(prevProducts => [...prevProducts, ...res.data.data]);
                }
                else {
                    setIconItem([]);
                }
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getAllCategory = () => {
        axios.get(getCategory).then((result)=>{
            if(result.data && result.data.status){
                setCategoryArr(result.data.data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }   
    const getAllStyle = () => {
        axios.get(getStyle).then((result)=>{
            if(result.data && result.data.status){
                setStyleArr(result.data.data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getAllCategory();
        getAllStyle();
    },[])
    useEffect(()=>{
        console.log("Use Effect Page 111 ==> " , page, searchValue);
        fetchIconData();
        // if (itemContainerRef.current) {
        //     itemContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        //   }
    },[page, searchValue!== '']);

    const handleFilter = (value,type) => {
        setFilterValue(value);
    }
    const handleScroll = () => {
        setPage(prevPage => prevPage+1);
    }
    const modifySvg = (svg, width, height, color) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        svgElement.setAttribute('width', width);
        svgElement.setAttribute('height', height);
        const pathElement = svgElement.querySelector('path');
        pathElement.setAttribute('fill', color);
        return new XMLSerializer().serializeToString(svgElement);
    };
    const handlePopup = (itemVal) => {
        console.log("itemVal..." , itemVal);
        setPopupData(itemVal);
        setShowPopup(true);
    }
    
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return ( 
        <>
        <div className="pointer-events-auto relative bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)] pointer-events-none sticky top-0 z-50 -mb-10 overflow-hidden sm:-mb-11">
            <div className="flex items-center my-4 mx-64 gap-8 justify-center relative">
                <div className="flex justify-center items-center border-solid border-2 bg-slate-200 rounded-md h-12 w-28 cursor-pointer" onClick={() => setFilterSidebar(!filterSidebar)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="filter-list"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 18h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1z"></path></svg>
                    <span>Filter</span>
                </div>
                <form className="w-full">
                    <div className="rounded-lg flex px-3 py-2 bg-slate-200 h-14">
                        <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" id="search"><path d="M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z"></path></svg>
                        </div>
                        <div className="flex h-10 w-px bg-black xl:ml-2 ml-2 items-center justify-center"></div>
                        <div className="grow flex">
                            <div className="flex items-center relative w-full">
                            <input className="bg-transparent w-full text-black pt-3 pb-3 pl-2 border-0 outline-0" name="search" type="text" placeholder="Search for icons…"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="flex pt-11">
                { filterSidebar ? 
                <div className="w-1/5 p-4 overflow-y-auto h-screen transition-all duration-700 transition-transform bg-slate-100">
                    <div className="inline-grid w-full pb-8">
                        <span className="text-base font-semibold">Size</span>
                        <input type="range" className="accent-indigo-400" name="size" min="24" max="100" x-data="{ hover: false }" value={sizeValue} onChange={(e) => setSizeValue(e.target.value)}/>
                        <div className="flex justify-between pt-2.5">
                            <span>24px</span>
                            <span>100px</span>
                        </div>
                    </div>
                    <div className="inline-grid w-full pb-8">
                        <span className="text-base font-semibold">Color</span>
                        <div className="flex justify-between pt-2.5">
                            <input type="color" value={colorValue} className="p-1 h-10 w-10 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" onChange={(e) => setColorValue(e.target.value)} placeholder="#000000"/>
                            <span>{colorValue}</span>
                        </div>
                    </div>
                    {/* <div className="border-t-2 border-slate-400 my-2"></div> */}
                    <div className="w-full pb-8">
                        <span className="text-base font-semibold">Filter</span>
                        <div className="border-t-2 border-slate-400 mt-3"></div>
                        <div className="pt-4">
                            <div className="flex justify-between">
                                <span className="text-base font-semibold">Category</span>
                                { showCategory ? <IoIosArrowUp onClick={() => setShowCategory(false)} size={'1.5rem'} /> : <IoIosArrowDown onClick={() => setShowCategory(true)} size={'1.5rem'} />}
                            </div>
                            { showCategory ?
                                <div className="flex flex-wrap gap-2 py-4 w-full">
                                    <ul className="flex flex-wrap gap-2">
                                        {categoryArr.map((catVal, ids) => (
                                            <li value={catVal} key={ids} onClick={() => handleFilter(catVal,'category')} className={`inline-flex inline-block p-2 bg-gray-200 text-sm rounded-md ${filterValue && filterValue._id === catVal._id ? 'border-solid border-2 border-indigo-500' : ''}`}>
                                                {catVal.categoryName}
                                            {/* <MdOutlineRemoveCircle  className="ml-1 mt-auto mb-auto cursor-pointer"/> */}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            : ''}
                        </div>
                        <div className="pt-4">
                            <div className="flex justify-between">
                                <span className="text-base font-semibold">Style</span>
                                { showStyle ? <IoIosArrowUp onClick={() => setShowStyle(false)} size={'1.5rem'} /> : <IoIosArrowDown onClick={() => setShowStyle(true)} size={'1.5rem'} />}
                            </div>
                            { showStyle ?
                                <div className="flex flex-wrap gap-2 py-4 w-full">
                                    <ul className="flex flex-wrap gap-2">
                                    {styleArr.map((styleVal, ids) => (
                                        <li value={styleVal} key={ids} onClick={() => handleFilter(styleVal,'style')} className={`inline-flex inline-block p-2 bg-gray-200 text-sm rounded-md ${filterValue && filterValue._id === styleVal._id ? 'border-solid border-2 border-indigo-500' : ''}`}>
                                            {styleVal.styleName}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            : ''}
                        </div>
                    </div>
                </div>  
                : 
                <div>
                    <div className="flex">
                    </div>
                </div>
                }
            <div className="4/5 overflow-y-scroll overflow-y-auto h-screen">
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:px-16 sm:px-8 gap-8 ${filterSidebar ? 'lg:grid-cols-7' : 'lg:grid-cols-10'}`}>
                { iconItem && iconItem.map((item,index)=>{
                    return(
                        <div className="h-40 hover:bg-slate-100 hover:border rounded-md w-40 flex flex-col justify-center group cursor-pointer" key={index} onClick={(e) => handlePopup(item)}>
                            {
                                item.iconPathName.match(/.(svg)$/i) ?
                                <div className="flex justify-center items-center"> 
                                   <div className="" style={{ width: `${sizeValue}px`, height: `${sizeValue}px` }}
                                        dangerouslySetInnerHTML={{ __html: modifySvg(item.imageData, sizeValue, sizeValue, colorValue) }}
                                    />
                                </div> : ''
                            }
                            <div className="flex justify-center items-center pt-6">
                                {item.name}
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className="flex justify-center">{ iconItem.length === 0 ? <h3>No data found</h3> : ''}</div>
                {/* {loading ? <Lottie options={defaultOptions} height={100} width={100} /> : ""} */}
                <div className="flex justify-center py-9">
                    <button onClick={handleScroll} className="h-14 border-solid border-2 border-black rounded-lg px-6">
                        <h3>Load More</h3><i className="bx bx-right-arrow-alt"></i>
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default IconListing;