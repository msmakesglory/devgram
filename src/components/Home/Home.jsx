import {Button} from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {CirclePlus} from "lucide-react";
import {useState} from "react";
export const Home = () => {
    const data = [
        "java","python","tailwind css","javascript","flask","django",
        "java","python","tailwind css","javascript","flask","django"
    ]
    const [title, setTitle] = useState("Java");
    return (
        <div className="h-screen pt-20 px-20 relative flex gap-8">
            <ul className="space-y-2  w-fit mt-8">
                <h1 className="font-medium text-xl">Your Groups</h1>
                {
                    data.map((item, index) => (
                        <li key={index} className="border-l">
                            <button
                                className="px-2 py-1 rounded hover:bg-secondary transition ease-in-out duration-200 capitalize ml-2"
                                onClick={()=>{setTitle(item)}}
                            >
                                {item}
                            </button>
                        </li>
                    ))
                }
            </ul>
            <div className="border h-full flex-grow">
                <div className="px-4 py-2">
                    <h1 className="text-xl font-mono capitalize">{title}</h1>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="absolute bottom-4 right-4 rounded-full"
                        variant="ghost"
                    ><CirclePlus className="size-12"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Groups</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Join</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}