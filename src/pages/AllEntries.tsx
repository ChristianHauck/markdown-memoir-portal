
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoirStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const AllEntries: React.FC = () => {
  const navigate = useNavigate();
  const { entries, categories } = useMemoirStore();
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'a-z' | 'z-a'>('newest');
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };
  
  const filteredEntries = entries
    .filter(entry => 
      (categoryFilter === 'all' || entry.categoryId === categoryFilter) &&
      (
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.content.toLowerCase().includes(search.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Entries</h1>
        <Button onClick={() => navigate('/editor/new')}>New Entry</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Input
            placeholder="Search entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A to Z</SelectItem>
              <SelectItem value="z-a">Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredEntries.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map(entry => (
              <TableRow key={entry.id} className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => navigate(`/entry/${entry.id}`)}>
                <TableCell className="font-medium">{entry.title}</TableCell>
                <TableCell>{getCategoryName(entry.categoryId)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
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
                </TableCell>
                <TableCell>{format(new Date(entry.updatedAt), 'PPP')}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/editor/${entry.id}`);
                  }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 border rounded-md">
          <p className="text-lg text-muted-foreground">No entries found</p>
          {search || categoryFilter !== 'all' ? (
            <Button 
              variant="link" 
              onClick={() => {
                setSearch('');
                setCategoryFilter('all');
              }}
            >
              Clear filters
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/editor/new')}
            >
              Create your first entry
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllEntries;
