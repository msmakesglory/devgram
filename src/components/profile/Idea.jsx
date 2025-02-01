import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";

export default function Idea(){
    return <Card className={"h-[200px] lg:mx-5 mx-2 my-2"}>
        <CardHeader>
            <CardTitle>Basic Details</CardTitle>
            <CardDescription>Description</CardDescription>
            <div className="space-x-2">
                <Badge variant="secondary">Java</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">html</Badge>
            </div>
        </CardHeader>
        <CardContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempo
        </CardContent>
    </Card>
}