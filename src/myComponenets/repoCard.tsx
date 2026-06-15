import type { Repository } from "@/myType/Typs";
import Link from "next/link";
export default function RepoCard({rep}:{rep:Repository}){
    return(
        <div className="Repo">
            <p> {rep.name}</p>
            <p> {rep.description}</p>
            <p>⭐{rep.stargazers_count}</p>
            <p>🍴{rep.forks_count}</p>
            <p>● {rep.language}</p>
            <Link rel="stylesheet" href={rep.html_url} >Repo Url</Link>
            <p>{}</p>
        </div>
    )
}
