
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemoirStore } from '@/lib/store';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Edit, Folder, Tag, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const EntryDetail: React.FC = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const navigate = useNavigate();
  
  const { 
    getEntryById, 
    getCategoryById, 
    deleteEntry 
  } = useMemoirStore();
  
  const entry = entryId ? getEntryById(entryId) : undefined;
  const category = entry?.categoryId ? getCategoryById(entry.categoryId) : undefined;
  
  if (!entry) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Entry Not Found</h1>
        <p className="mb-6">The entry you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (entryId) {
      deleteEntry(entryId);
      toast.success('Entry deleted successfully');
      navigate('/');
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };
  
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'p');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{entry.title}</h1>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(`/editor/${entryId}`)}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your entry.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Created: {formatDate(entry.createdAt)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Updated: {formatDate(entry.updatedAt)} at {formatTime(entry.updatedAt)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Folder className="h-4 w-4" />
          <span>Category: {category?.name || 'Uncategorized'}</span>
        </div>
      </div>
      
      {entry.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {entry.tags.map(tag => (
            <Badge key={tag} variant="outline" onClick={() => navigate(`/tag/${tag}`)}>
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="border-t pt-6">
        <MarkdownRenderer content={entry.content} />
      </div>
    </div>
  );
};

export default EntryDetail;
