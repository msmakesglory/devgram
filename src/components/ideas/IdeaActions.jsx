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
import SortIdeasMenu from "@/components/ideas/SortIdeasMenu.jsx";
import { Separator } from "../ui/separator";
import PropTypes from "prop-types";

export default function IdeaActions({isEdit}) {
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
                            {isEdit ? (
                                <div>
                                    <li>
                                        <AddIdea open={openAddDialog} onClose={setOpenAddDialog}/>
                                    </li>
                                    <li>
                                        <IdeaDeleteDialog open={openDeleteDialog} onClose={setOpenDeleteDialog}/>
                                    </li>
                                </div>
                            ) : null
                            }
                            <Separator />
                            <li>
                                <SortIdeasMenu />
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    );
}


IdeaActions.PropTypes = {
    isEdit: PropTypes.bool.isRequired,
}