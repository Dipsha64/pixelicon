import { IoClose } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import React, { useState } from "react";
import { MdDownloadDone } from "react-icons/md";
import { saveAs } from 'file-saver';

function IconDetailPopup({ show, onClose, popupDetails, sizeValue, colorValue }) {
    const [ copied, setCopied ] = useState(false);
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
    const copySvgImage = (e, item) => {
        navigator.clipboard.writeText(applyColorToSvg(item))
          .then(() => {
            setCopied(true);
            setTimeout(()=>{
                setCopied(false);
            },5000);
          })
          .catch(err => {
            console.error('Failed to copy SVG code: ', err);
        });
    }
    const applyColorToSvg = (svgContent) => {
        const modifiedSvg = svgContent
            .replace(/height="\d+"/, `height="${sizeValue}"`)
            .replace(/width="\d+"/, `width="${sizeValue}"`);
        return modifiedSvg.replace(/fill="[^"]*"/g, `fill="${colorValue}"`);
    };
    const downloadsvg = () => {
        const modifiedSvg = applyColorToSvg(popupDetails.imageData);
        const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${popupDetails.name}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    const downloadPng = () => {
        const modifiedSvg = applyColorToSvg(popupDetails.imageData);
        const svg = new Blob([modifiedSvg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svg);
        
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
    
          canvas.toBlob(blob => {
            saveAs(blob, `${popupDetails.name}.png`);
            URL.revokeObjectURL(url);
          }, 'image/png');
        };
    };

    return ( 
        <>
        <div className={`fixed inset-0 flex items-center justify-center ${show ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="bg-white py-2 px-2 rounded-lg shadow-lg z-10 relative lg:w-1/4 xl:w-1/4 md:w-1/4">
                <div className="flex justify-between">
                    <span></span>
                    <IoClose className="cursor-pointer" size={'2rem'} onClick={onClose}/> 
                </div>
                <div className="flex w-full gap-5 mx-5 mb-8">
                    <div className="1/5 border-2 h-28 w-28 border-slate-400 rounded-md flex justify-center items-center">
                        <div className="" style={{ width: `${sizeValue}px`, height: `${sizeValue}px` }}
                            dangerouslySetInnerHTML={{ __html: modifySvg(popupDetails.imageData, sizeValue, sizeValue, colorValue) }}
                        />
                    </div> 
                    <div className="4/5 grid gap-y-3">
                        <div className="inline-flex gap-4">
                            <div className="flex justify-center items-center"><span className="text-lg font-semibold leading-10">{popupDetails.name}</span></div>
                            <div className="flex justify-center items-center cursor-pointer">
                                { copied ? <MdDownloadDone size={'1.5rem'}/> : <FaRegCopy size={'1.3rem'} onClick={(e) => copySvgImage(e,popupDetails.imageData)}/>}
                            </div>
                        </div>
                        <div className="inline-flex gap-4">
                            <div className="flex justify-center items-center border-solid border-2 bg-slate-200 rounded-md h-10 w-24 cursor-pointer" onClick={() => downloadsvg()}>
                                <IoMdDownload/>
                                <span className="pl-2">SVG</span>
                            </div>
                            <div className="flex justify-center items-center border-solid border-2 bg-slate-200 rounded-md h-10 w-24 cursor-pointer" onClick={() => downloadPng()}>
                                <IoMdDownload/>
                                <span className="pl-2">PNG</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        </>
    );
}

export default IconDetailPopup;