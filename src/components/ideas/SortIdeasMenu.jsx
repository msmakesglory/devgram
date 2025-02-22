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

export default function SortIdeasMenu() {

    const {sortByTitle, sortByDate} = useIdeaContext();


    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    <button>
                        Sort By
                    </button>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => sortByDate(true)}>
                        Latest <MenubarShortcut>
                        <ArrowUp10/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => sortByDate(false)}>
                        Oldest <MenubarShortcut>
                        <ArrowDown01/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => sortByTitle(true)}>
                        By Title <MenubarShortcut>
                        <ArrowUpAZ/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => sortByTitle(false)}>
                        By Title <MenubarShortcut>
                        <ArrowDownAZ/>
                    </MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}