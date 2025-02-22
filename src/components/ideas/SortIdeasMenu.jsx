import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu, MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar.jsx";
import { ArrowDown01,ArrowUp10,ArrowDownAZ,ArrowUpAZ  } from 'lucide-react';
import {Button} from "@/components/ui/button.jsx";
export default function SortIdeasMenu() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    <button>
                        Sort By
                    </button>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        By Date <MenubarShortcut>
                        <ArrowUp10/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        By Date <MenubarShortcut>
                        <ArrowDown01/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        By Title <MenubarShortcut>
                        <ArrowUpAZ/>
                    </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        By Title <MenubarShortcut>
                        <ArrowDownAZ/>
                    </MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}