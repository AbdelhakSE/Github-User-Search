"use client"

import { setValue } from "@/myType/Typs"
export default function SearchBar({setVal}:setValue){

    return(
        <>
            <input type="text" className="focus:outline-none" id="SearchBar" placeholder="Search..." onChange={(e)=>{
               setVal(e.target.value)
            }} />
        </>
    )
}