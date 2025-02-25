import { Button } from "../ui/button";
import { useGroupContext } from "../../context/GroupContext";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

export default function CreateGroup() {
    const { createGroup, joinGroup } = useGroupContext();
    let [groupName, setGroupName] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!groupName?.trim()) return;

        
        const response = await createGroup(groupName);
        console.log(response);

        setGroupName("");
    }

    const handleJoin = async (e) => {
        e.preventDefault();
        if(!groupName?.trim()) return;

        const response = await joinGroup(groupName);
        console.log(response);

        setGroupName("");
    }

    return (
       
        <div className="flex items-center justify-center min-h-screen">
            
            <form onSubmit={handleSubmit}>
            <p>create form</p>
                <Input 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)} />
                <Button type="submit">
                     Submit
                </Button>

            </form>
            
            <form onSubmit={handleJoin}>
            <p>Join form</p>
            <Input 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)} />
                <Button type="submit">
                     Submit
                </Button>

            </form>
        </div>
    )
}