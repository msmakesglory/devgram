import { Button } from "../ui/button";
import { useGroupContext } from "../../context/GroupContext";
import { Input } from "../ui/input";
import { useState } from "react";

export default function CreateGroup() {
    const { createGroup } = useGroupContext();
    let [groupName, setGroupName] = useState();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!groupName?.trim()) return;

        const response = await createGroup(groupName);
        console.log(response);

        setGroupName("");
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit}>
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