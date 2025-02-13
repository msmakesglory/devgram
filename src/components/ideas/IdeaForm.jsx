import {useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react"; // Import Plus icon
import { useIdeaContext } from '../../context/IdeaContext';

const IdeaForm = () => {
    const { addIdea } = useIdeaContext();
    const [formData, setFormData] = useState({
        creator: '',
        title: '',
        description: '',
        tags: [],
        requiredPeople: '',
        status: '',
    });
    const [newTag, setNewTag] = useState('');

    const addTag = () => {
        if (newTag.trim() !== '') {
            setFormData((prev) => ({
                ...prev, tags: [...prev.tags, newTag.trim()]
            }));
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
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.creator || !formData.title || !formData.description || !formData.status) {
            alert("All fields are required!");
            return;
        }

        await addIdea(formData);
        setFormData({ creator: '', title: '', description: '', tags: [], requiredPeople: '', status: '' });
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
                        <Input id="creator" value={formData.creator} onChange={(e) => setFormData({ ...formData, creator: e.target.value })} required />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2">
                            <Input id="tags" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} />
                            <Button type="button" onClick={addTag} disabled={!newTag.trim()}><Plus className="w-4 h-4" /> Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.map(tag => (
                                <Badge key={tag} onClick={() => removeTag(tag)}>{tag} ×</Badge>
                            ))}
                        </div>
                    </div>

                    {/* Required People */}
                    <div className="space-y-2">
                        <Label htmlFor="required-people">Number of Required People</Label>
                        <Input id="required-people" type="number" value={formData.requiredPeople} onChange={(e) => setFormData({ ...formData, requiredPeople: e.target.value })} min="1" required />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(val) => setFormData({ ...formData, status: val })} required>
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
                    <Button type="submit">Submit Idea</Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default IdeaForm;