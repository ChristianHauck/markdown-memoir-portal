
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemoirStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Tag as TagIcon } from 'lucide-react';

const TagView: React.FC = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const navigate = useNavigate();
  
  const { getEntriesByTag, getCategoryById } = useMemoirStore();
  
  const entries = tagName ? getEntriesByTag(tagName) : [];
  
  const getCategoryName = (categoryId: string) => {
    return getCategoryById(categoryId)?.name || 'Uncategorized';
  };

  if (!tagName) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Tag Not Found</h1>
        <p className="mb-6">The tag you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TagIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">{tagName}</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/tags')}
          >
            All Tags
          </Button>
          <Button 
            onClick={() => navigate('/editor/new', { state: { tags: [tagName] } })}
          >
            New Entry with Tag
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Entries with tag "{tagName}" ({entries.length})</h2>
        
        {entries.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {entries.map(entry => (
              <Card key={entry.id} className="cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => navigate(`/entry/${entry.id}`)}>
                <CardHeader className="pb-2">
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription>
                    {getCategoryName(entry.categoryId)} • Updated {format(new Date(entry.updatedAt), 'PPP')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">
                    {entry.content.substring(0, 100)}
                    {entry.content.length > 100 ? '...' : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-md">
            <p className="text-lg text-muted-foreground mb-4">No entries with this tag yet</p>
            <Button 
              onClick={() => navigate('/editor/new', { state: { tags: [tagName] } })}
            >
              Create First Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagView;
