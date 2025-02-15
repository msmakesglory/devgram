import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {Badge} from "@/components/ui/badge.jsx";

const IdeaCardSkeleton = () => {
    return (
        <Card className="h-[200px] lg:mx-5 mx-2 my-2">
            <CardHeader>
                <CardTitle><Skeleton className={"w-40 h-5"}/></CardTitle>
                <CardDescription><Skeleton className={"w-90 h-5"}/></CardDescription>
                <div className="space-x-2 flex">
                    <Skeleton className={"w-10 h-5"}/>
                    <Skeleton className={"w-10 h-5"}/>
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className={"w-50 h-8"}/>
            </CardContent>
        </Card>
    );
};

export default IdeaCardSkeleton;