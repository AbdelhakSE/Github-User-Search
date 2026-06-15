import { Dispatch, SetStateAction } from "react";

export type setValue ={
    setVal:(value:string)=>void
};
 
export type User = {
  id: number
  login: string;
  name:string;
  avatar_url: string
  bio:string|null;
  location:string|null;
  followers:number;
  following:number;
  public_repos:number;
  html_url:string;
   "repos_url":string;
}
export type Repository = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  fork:boolean;
  forks_count:number;
  language:string|null;
  updated_at:string;
  topics:string[];
  html_url: string;
};
export type SortType = 'Updated'|'Stars'|'Name';
export type User_val = {
  u:User|null;
  setVal :Dispatch<SetStateAction<SortType>>;
  setChecked :Dispatch<SetStateAction<boolean>>;
}