import type { User } from "@/myType/Typs"
export default function UsersCards({u}:{u:User}){
    return(
        <>   
        <div className="UserDivs">
            <img src= {u.avatar_url} />
            <p>{u.login}</p>
        </div>
        </>
    )
}