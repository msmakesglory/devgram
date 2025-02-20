import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddIdea from "@/components/ideas/IdeaForm.jsx";
import IdeaDeleteDialog from "@/components/ideas/IdeaDeleteDialog.jsx";

export default function IdeaActions() {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                {/* Add Idea */}
                <DropdownMenuItem onSelect={() => setOpenAddDialog(true)}>
                    Add Idea
                </DropdownMenuItem>
                    <AddIdea open={openAddDialog} onClose={() => setOpenAddDialog(false)} />

                <DropdownMenuItem onSelect={() => setOpenDeleteDialog(true)}>
                    Delete Idea
                </DropdownMenuItem>
                    <IdeaDeleteDialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} />

                {/* Sort By Submenu */}
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Sort By</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>By Date Asc</DropdownMenuItem>
                        <DropdownMenuItem>By Date Desc</DropdownMenuItem>
                        <DropdownMenuItem>By Title Asc</DropdownMenuItem>
                        <DropdownMenuItem>By Title Desc</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
