import type { User, User_val } from "@/myType/Typs"

export default function UserCard({u,setVal,setChecked}:User_val){
    if(!u ) return null
    return(
        <>
        <div className="mainUser">   
        <div className="users">
            <img src= {u.avatar_url} width={50} height={50} alt="" style={{borderRadius:'50%'}}/>
           <div>
                <p>{u.login}</p>
                <p>{u.bio}</p>
           </div>
        </div>
        <div className="SocialStats">
            <div><p>Folowers:</p><p><span>{u.followers}</span></p></div>
            <div><p>Folowing:</p><p><span>{u.following}</span></p></div>
            <div><p>Public Repos:</p><p><span>{u.public_repos}</span></p></div>
        </div>
        </div>
        <div className="SortsDiv">
            <p>Sort by </p>
            <div className="Sorts">
                <div>
                    <label htmlFor="Updated">Updated</label>
                    <input type="radio" name="Sort"  value='Updated'onChange={(e)=>{setVal("Updated")}} id="Updated" />
                </div>
                <div>
                    <label htmlFor="Stars">Stars</label>
                    <input type="radio" name="Sort"  value='Stars'onChange={(e)=>{setVal("Stars")}} id="Stars" />
                </div>
                <div>
                <label htmlFor="Name">Name</label>
                <input type="radio" name="Sort"  value='Name'onChange={(e)=>{setVal("Name")}} id="Name" />
                </div>
            </div>
            <div >
                <input type="checkbox" onChange={(e)=> setChecked(e.target.checked)} name="ForksOnly" id="isFork" />
                <label htmlFor="isFork" > Forks only</label>
            </div>
        </div>
       

        </>
    )
}