"use client"

import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        const token = Cookies.get('userToken');
        if(token){
            redirect(`/private/home`);
        } else {
            redirect("/public/login");
        }
    }, []);
}
