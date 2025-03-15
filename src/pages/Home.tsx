
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoirStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { entries, categories } = useMemoirStore();
  
  // Sort entries by date (newest first)
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };
  
  const getTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Markdown Memoir Portal</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate('/editor/new')}
        >
          <Plus className="h-4 w-4" />
          <span>New Entry</span>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Your Memoir Portal</CardTitle>
            <CardDescription>
              Store and organize your programming experiences and knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>This application helps you document and share programming experiences in markdown format.</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Create new entries with rich markdown formatting</li>
              <li>Organize entries with categories and tags</li>
              <li>Easily find and revisit your notes</li>
              <li>See code snippets with syntax highlighting</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => navigate('/all-entries')}>
              Browse All Entries
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Quick links to help you navigate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/editor/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create a new entry
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/categories')}
            >
              Manage categories
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/tags')}
            >
              Browse by tags
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/search')}
            >
              Search entries
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Entries</h2>
        {recentEntries.length > 0 ? (
          <div className="space-y-4">
            {recentEntries.map(entry => (
              <Card key={entry.id} className="cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => navigate(`/entry/${entry.id}`)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{entry.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {getTimeAgo(entry.updatedAt)}
                    </span>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <span>{getCategoryName(entry.categoryId)}</span>
                    {entry.tags.length > 0 && (
                      <div className="flex gap-1">
                        {entry.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/tag/${tag}`);
                          }}>
                            {tag}
                          </Badge>
                        ))}
                        {entry.tags.length > 3 && (
                          <Badge variant="outline">+{entry.tags.length - 3}</Badge>
                        )}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">
                    {entry.content.substring(0, 150)}
                    {entry.content.length > 150 ? '...' : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No entries yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create your first memoir entry to get started!</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/editor/new')}>
                Create Entry
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Home;
