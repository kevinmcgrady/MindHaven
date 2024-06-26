'use client';

import { User } from '@prisma/client';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import CardSection from '@/components/layout/CardSection';
import EmptyState from '@/components/site/EmptyState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import UserSearchCard from '@/components/user/UserSearchCard';
import { useDebounce } from '@/hooks/useDebounce';
import { searchUsers } from '@/queries/search';

type SearchBarResults =
  | Pick<User, 'firstName' | 'lastName' | 'country' | 'imageUrl' | 'username'>[]
  | undefined;

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchBarResults>([]);
  const { toast } = useToast();
  const searchQuery = useDebounce(query, 800);

  const hasResults = searchResults && searchResults.length > 0;

  const handleGetResults = async (query: string) => {
    try {
      setIsLoading(true);
      const results = await searchUsers(query);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was an issue, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0) setSearchResults([]);
    if (searchQuery || searchQuery.length < 0) handleGetResults(searchQuery);
  }, [searchQuery]);

  return (
    <div className='container px-0 md:px-8'>
      <CardSection className='mb-4' noSpacing>
        <Dialog>
          <DialogTrigger asChild>
            <div
              data-testid='search'
              className='border px-3 py-2 rounded-md cursor-pointer'
            >
              <SearchIcon size={20} className='text-muted-foreground' />
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Find Friends</DialogTitle>
              <DialogDescription>
                Search for friends by their username, location, or tags
              </DialogDescription>
            </DialogHeader>
            <div>
              <Input
                role='searchbox'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Scotland'
              />
            </div>

            {isLoading && (
              <Loader2
                data-testid='loading'
                size={20}
                className='animate-spin mx-auto mt-4'
              />
            )}

            {!hasResults && !isLoading && searchQuery.length !== 0 && (
              <EmptyState description='No results found' />
            )}

            {hasResults && !isLoading && (
              <div className='flex flex-col gap-4'>
                {searchResults.map((user) => (
                  <UserSearchCard
                    key={user.username}
                    country={user.country!}
                    firstName={user.firstName}
                    imageUrl={user.imageUrl}
                    lastName={user.lastName}
                    username={user.username!}
                  />
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardSection>
    </div>
  );
};

export default SearchBar;
