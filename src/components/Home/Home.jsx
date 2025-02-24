import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {CirclePlus} from "lucide-react";
export const Home = () => {
    const data = [
        {
            name:"Java",
            desc:"Fast Reliable"
        },
        {
            name:"Python",
            desc:"Simple and Clean"
        },
        {
            name:"JavaScript",
            desc:"A Cheap Copy"
        },
    ]
    return (
        <div className="h-screen pt-20 px-20 relative">
            <ul className="lg:w-1/3 border h-full space-y-2 py-2 px-4 rounded">
                {
                    data.map((item, index) => (
                        <li
                            className="border py-2 px-3 rounded-lg"
                            key={index}>
                            <h1 className="font-medium ">{item.name}</h1>
                            <p>{item.desc}</p>
                        </li>
                    ))
                }
            </ul>

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