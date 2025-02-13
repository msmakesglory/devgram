import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react"; // Import Plus icon

const IdeaForm = () => {
    const [tags, setTags] = React.useState(['java', 'python']);
    const [newTag, setNewTag] = React.useState('');

    const addTag = () => {
        if (newTag.trim() !== '') {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            addTag();
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submission logic here
        console.log('Form submitted');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-2xl mx-auto p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Idea Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Creator */}
                    <div className="space-y-2">
                        <Label htmlFor="creator">Creator</Label>
                        <Input id="creator" placeholder="Enter creator name" required />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Enter idea title" required />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your idea"
                            className="min-h-[120px]"
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2">
                            <Input
                                id="tags"
                                placeholder="Add a tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                onClick={addTag}
                                variant="secondary"
                                className="flex-shrink-0"
                                disabled={!newTag.trim()}
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => removeTag(tag)}
                                >
                                    {tag} ×
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Number of Required People */}
                    <div className="space-y-2">
                        <Label htmlFor="required-people">Number of Required People</Label>
                        <Input
                            id="required-people"
                            type="number"
                            placeholder="Enter number of people needed"
                            min="1"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="planning">Planning</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="on-hold">On Hold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-6">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Submit Idea
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default IdeaForm;