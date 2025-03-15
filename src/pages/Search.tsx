
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemoirStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const { entries, getCategoryById } = useMemoirStore();
  
  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    } else {
      setSearchParams({});
    }
  };
  
  const searchResults = queryParam
    ? entries.filter(entry => 
        entry.title.toLowerCase().includes(queryParam.toLowerCase()) ||
        entry.content.toLowerCase().includes(queryParam.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(queryParam.toLowerCase()))
      )
    : [];
  
  const getCategoryName = (categoryId: string) => {
    return getCategoryById(categoryId)?.name || 'Uncategorized';
  };
  
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">{part}</mark> 
        : part
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search for entries, tags, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4" />
          <span>Search</span>
        </Button>
      </form>
      
      {queryParam ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {searchResults.length > 0 
              ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${queryParam}"`
              : `No results found for "${queryParam}"`}
          </h2>
          
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map(entry => (
                <Card key={entry.id} className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => navigate(`/entry/${entry.id}`)}>
                  <CardHeader className="pb-2">
                    <CardTitle>{highlightText(entry.title, queryParam)}</CardTitle>
                    <CardDescription>
                      {getCategoryName(entry.categoryId)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      {highlightText(
                        entry.content.length > 200 
                          ? entry.content.substring(0, 200) + '...' 
                          : entry.content,
                        queryParam
                      )}
                    </p>
                    
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/tag/${tag}`);
                          }}>
                            {highlightText(tag, queryParam)}
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
              <p className="text-lg text-muted-foreground mb-4">No entries match your search</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setSearchParams({})}>
                  Clear Search
                </Button>
                <Button onClick={() => navigate('/editor/new')}>
                  Create New Entry
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10">
          <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-6">
            Enter a search term to find entries
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
