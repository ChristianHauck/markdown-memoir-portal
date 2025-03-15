
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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const CategoryView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const { getCategoryById, getEntriesByCategory } = useMemoirStore();
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const entries = categoryId ? getEntriesByCategory(categoryId) : [];
  
  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">The category you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground mt-1">{category.description}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/categories')}
          >
            Manage Categories
          </Button>
          <Button 
            onClick={() => navigate('/editor/new', { state: { categoryId: category.id } })}
          >
            New Entry in Category
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Entries ({entries.length})</h2>
        
        {entries.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {entries.map(entry => (
              <Card key={entry.id} className="cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => navigate(`/entry/${entry.id}`)}>
                <CardHeader className="pb-2">
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription>
                    Updated {format(new Date(entry.updatedAt), 'PPP')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm mb-3">
                    {entry.content.substring(0, 100)}
                    {entry.content.length > 100 ? '...' : ''}
                  </p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map(tag => (
                        <Badge key={tag} variant="outline" onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tag/${tag}`);
                        }}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-md">
            <p className="text-lg text-muted-foreground mb-4">No entries in this category yet</p>
            <Button 
              onClick={() => navigate('/editor/new', { state: { categoryId: category.id } })}
            >
              Create First Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
