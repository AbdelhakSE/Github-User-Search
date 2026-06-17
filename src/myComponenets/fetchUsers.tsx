"use client"

import UsersCards from "./usersCards";
import { useEffect, useState,useMemo } from "react"
import SearchBar from "./searchBar";
import type { User,Repository,SortType } from "@/myType/Typs";
import RepoCard from "./repoCard";
import UserCard from "./userCard";




export default  function FetchUsers(){
    const [SearchValue,setSearchValue] = useState<string>('');
    const[users,setUsers] = useState<User[]>([]);
    const[repo,setRepo] = useState<Repository[]>([]);
    const[loadingUsers,setLoadingU] = useState<boolean>(false);
    const[errorU,setErrorU] = useState<string>('');
    const[loadingRep,setLoadingRep] = useState<boolean>(false)
    const[errorRep,setErrorRep] = useState<string>('')
    const[user,setUser] = useState<User|null>(null)
    const [sortBy,setSortBy] = useState<SortType>('Updated')
    const [forksOnly, setForsOnly]= useState<boolean>(false)


 const sortedRepo:Repository[] = useMemo(()=>{
   
        return [...repo]
        .filter( r => forksOnly?r.fork:true)
        .sort((a,b) => {
              if(sortBy === 'Updated'){
                 return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
             }else if(sortBy === 'Stars'){
                 return b.stargazers_count - a.stargazers_count
             }else if(sortBy === 'Name'){
                 return a.name.localeCompare(b.name);
             }else{
                 return 0
             }
         })

},[repo,sortBy,forksOnly])



useEffect(()=>{
    if(!SearchValue.trim()) {
        setUsers([]);
        setErrorU('')
         setRepo([]);
        setErrorRep('');
        setLoadingU(false)
        setUser(null)
        return
    }

    setUsers([]);
    setErrorU('')
    setLoadingU(true);
 const idTime = setTimeout(() => {
    fetch(`https://api.github.com/search/users?q=${SearchValue}`)
               .then((res)=> {
                    if(!res.ok){
                        throw new Error()
                    }
                    return res.json()
                })
               .then((data)=> {
                setUsers(data.items)
                setLoadingU(false)
                console.log(data.items)
               })
               .catch((error:unknown)=>{
                    const msg = error instanceof Error ? error.message:"Unknwon error"
                    console.log(msg)
                     setErrorU("connection failed ! try again later")
                    setLoadingU(false)
               })
               

              
  }, 500);
  
  return ()=> clearTimeout(idTime);
},[SearchValue])
    

function handelClick(u:User) : void {
        
        setRepo([]);
        setErrorRep('')
        setLoadingRep(true)


        Promise.all([
            fetch(u.repos_url).then((res)=>{
                if(!res.ok){
                throw new Error();
                }  
            return res.json()}),
            fetch(`https://api.github.com/users/${u.login}`).then((res)=> {
                if(!res.ok){
                    throw new Error();
                }
                return res.json()
            } )
        ]).then(([repos,userDetail])=>{
            setRepo(repos);
            setLoadingRep(false)
            setUser(userDetail)

        })
        .catch((error:unknown)=>{
        setErrorRep("failde to load repositories. try again later")
        setLoadingRep(false)
       });
}

   
    return(
        <>
            <SearchBar setVal={setSearchValue}/>
            <div style={{
                display:"grid",
                gridTemplateColumns:'1fr 1fr',
            }} id="MainDiv">
                <div id="usersDiv">
                {loadingUsers && <h1>Loading...</h1>}
                {errorU && <p>{errorU}</p>}
                {!loadingUsers && !errorU && SearchValue && users.length === 0 &&<p> No users found for "{SearchValue}!</p>}
                {
                    users.map((u)=>(
                        <div key={u.id} onClick={()=>{
                            handelClick(u)
                        }} style={{
                            

                        }}>
                            <UsersCards u = {u}/>
                        </div>
                    ))
                }
                </div>
                {!(user===null) && 
                
                <div>
                    {loadingRep && <h1>LOADING...</h1>}
                    
                   {
                    errorRep?<p>{errorRep}</p>:

                      <div className="userProfile">
                      <UserCard u={user} setVal={setSortBy} setChecked ={setForsOnly}/>
                      <div className="repos">
                        {
                            sortedRepo.map((r)=>(
                                <div key={r.id}>
                                    <RepoCard rep={r}/>
                                <hr />
                                </div>
                        
                            ))
                        }
                      </div>
                   </div>
                   }
                </div>
                }
            </div>
        </>
    )

}