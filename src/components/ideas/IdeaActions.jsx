import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddIdea from "@/components/ideas/IdeaAdd.jsx";
import IdeaDeleteDialog from "@/components/ideas/IdeaDeleteDialog.jsx";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.jsx";

export default function IdeaActions() {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <button>
                            Actions
                        </button>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="px-4 py-2 space-y-2">
                            <li>
                                <AddIdea open={openAddDialog} onClose={setOpenAddDialog}/>
                            </li>
                            <li>
                                <IdeaDeleteDialog open={openDeleteDialog} onClose={setOpenDeleteDialog}/>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    );
}
