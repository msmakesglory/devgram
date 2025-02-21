import PropTypes from "prop-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function Idea({ data }) {
  return (
    <Card className="h-[200px] lg:mx-5 mx-2 my-2">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
        <div className="space-x-2">
          {data?.tags?.map((badge, index) => (
            <Badge key={index} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {data.createdBy && <p className="text-sm text-gray-500">Created By: {data.createdBy}</p>}
        {data.createdAt && <p className="text-sm text-gray-500">Created At: {data.createdAt.substring(0, 10)}</p>}
      </CardContent>
    </Card>
  );
}


Idea.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string, // Optional
    createdBy: PropTypes.string
  }).isRequired,
};
