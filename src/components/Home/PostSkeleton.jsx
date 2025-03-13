import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";

import { Separator } from "@/components/ui/separator.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export default function PostSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                </CardTitle>
                <div className="space-x-2 flex">
                    <Skeleton className="h-5 w-10 rounded-md" />
                    <Skeleton className="h-5 w-10 rounded-md" />
                    <Skeleton className="h-5 w-10 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-3 w-1/2 mt-2" />
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                </div>
            </CardContent>
        </Card>
    );
}
