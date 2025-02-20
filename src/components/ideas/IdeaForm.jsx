import {useState} from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useIdeaContext } from '../../context/IdeaContext';
import {useNavigate} from 'react-router-dom';
import { useProfileContext } from '../../context/ProfileContext';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Slider} from "@/components/ui/slider.jsx";

const AddIdea = () => {
    const {userDetails} = useProfileContext();
    const navigate = useNavigate();

    if (!userDetails?.uid) {
        navigate('/login');
    }
    const { addIdea } = useIdeaContext();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        requiredPeople: 2,
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


    const removeTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked submit")
        if (!formData.title || !formData.description || !formData.status) {
            alert("All fields are required!");
            return;
        }

        await addIdea(formData);
        setFormData({title: '', description: '', tags: [], requiredPeople: '', status: '' });
        navigate(`/p/${userDetails.uid}`);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <Plus/> Add Idea
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="w-full max-w-2xl mx-auto p-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Idea Form</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Enter Title Of Idea"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe Your Idea"
                                    required
                                />
                            </div>

                            {/* Tags */}
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="tags"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                        placeholder="Type and Hit Enter Tools you want to Use"
                                    />
                                    <Button type="button" onClick={addTag} disabled={!newTag.trim()}><Plus
                                        className="w-4 h-4"/> Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map(tag => (
                                        <Badge key={tag} onClick={() => removeTag(tag)}>{tag} ×</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Required People */}
                            <div className="space-y-2">
                                <Label htmlFor="required-people">Number of Required People {formData.requiredPeople}</Label>
                                <Slider
                                    max={10}
                                    step={1}
                                    min={2}
                                    value={[formData.requiredPeople]}
                                    onValueChange={(value) => setFormData({ ...formData, requiredPeople: value[0] })}
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={(val) => setFormData({...formData, status: val})} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="planning">Planning</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="on-hold">On Hold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddIdea;