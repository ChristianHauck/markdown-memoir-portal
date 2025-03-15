
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useMemoirStore, Entry } from '@/lib/store';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownRenderer from '../markdown/MarkdownRenderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TagInput from './TagInput';
import { toast } from 'sonner';

const MarkdownEditor: React.FC = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const isNewEntry = entryId === 'new';
  
  const navigate = useNavigate();
  const { 
    addEntry, 
    updateEntry, 
    getEntryById, 
    categories 
  } = useMemoirStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('default');
  const [tags, setTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('write');

  useEffect(() => {
    if (!isNewEntry && entryId) {
      const entry = getEntryById(entryId);
      if (entry) {
        setTitle(entry.title);
        setContent(entry.content);
        setCategoryId(entry.categoryId);
        setTags(entry.tags);
      } else {
        navigate('/not-found');
      }
    }
  }, [entryId, isNewEntry, getEntryById, navigate]);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your entry');
      return;
    }

    try {
      if (isNewEntry) {
        const newEntryId = addEntry({
          title,
          content,
          categoryId,
          tags,
        });
        toast.success('Entry created successfully');
        navigate(`/entry/${newEntryId}`);
      } else if (entryId) {
        updateEntry(entryId, {
          title,
          content,
          categoryId,
          tags,
        });
        toast.success('Entry updated successfully');
        navigate(`/entry/${entryId}`);
      }
    } catch (error) {
      toast.error('Failed to save entry');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isNewEntry ? 'Create New Entry' : 'Edit Entry'}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        <div>
          <Input
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <TagInput tags={tags} setTags={setTags} />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="mt-4">
            <Textarea
              placeholder="Write your markdown here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] font-mono"
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-md p-4 min-h-[400px] overflow-auto">
              <MarkdownRenderer content={content} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarkdownEditor;
