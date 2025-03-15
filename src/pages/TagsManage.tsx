
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoirStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag } from 'lucide-react';

const TagsManage: React.FC = () => {
  const navigate = useNavigate();
  const { entries } = useMemoirStore();
  const [searchFilter, setSearchFilter] = useState('');
  
  // Extract all unique tags from entries
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    entries.forEach(entry => {
      entry.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [entries]);
  
  // Filter tags based on search input
  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchFilter.toLowerCase())
  );
  
  // Count entries per tag
  const getTagCount = (tag: string) => {
    return entries.filter(entry => entry.tags.includes(tag)).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tags</h1>
        <div>
          <Input
            placeholder="Search tags..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-64"
          />
        </div>
      </div>
      
      {filteredTags.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {filteredTags.map(tag => (
            <Button
              key={tag}
              variant="outline"
              className="flex items-center gap-2 h-auto py-2"
              onClick={() => navigate(`/tag/${tag}`)}
            >
              <Tag className="h-4 w-4" />
              <span>{tag}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({getTagCount(tag)})
              </span>
            </Button>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md">
          <p className="text-lg text-muted-foreground">
            {tags.length === 0 
              ? 'No tags found. Add tags to your entries to see them here.'
              : 'No tags match your search.'}
          </p>
          {tags.length === 0 && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/editor/new')}
            >
              Create an entry with tags
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TagsManage;
