import {Outlet} from "react-router-dom";
import Navbar from "@/components/navbar/NavBar.jsx";
import {Toaster} from "./components/ui/toaster";

export default function App(){

    return (
        <>
            <Navbar/>
            <div>
                <Outlet />
                <Toaster />
            </div>
        </>
    )
}