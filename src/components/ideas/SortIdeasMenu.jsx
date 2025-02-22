import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu, MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar.jsx";
import { ArrowDown01,ArrowUp10,ArrowDownAZ,ArrowUpAZ  } from 'lucide-react';
import { useIdeaContext } from "../../context/IdeaContext";

export default function SortIdeasMenu({ideas, setFunction}) {

    const {sortByTitle, sortByDate} = useIdeaContext();


    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    Sort By
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => sortByDate(true, ideas, setFunction)}>
                        Latest <MenubarShortcut>
                        <ArrowUp10/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => sortByDate(false, ideas, setFunction)}>
                        Oldest <MenubarShortcut>
                        <ArrowDown01/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => sortByTitle(true, ideas, setFunction)}>
                        By Title <MenubarShortcut>
                        <ArrowUpAZ/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => sortByTitle(false, ideas, setFunction)}>
                        By Title <MenubarShortcut>
                        <ArrowDownAZ/>
                    </MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}