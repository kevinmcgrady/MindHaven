'use client';

import { User } from '@prisma/client';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { searchUsers } from '@/queries/search';

import CardSection from '../layout/CardSection';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import UserSearchCard from '../user/UserSearchCard';

type SearchBarResults =
  | Pick<User, 'firstName' | 'lastName' | 'country' | 'imageUrl' | 'username'>[]
  | undefined;

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchBarResults>([]);

  const searchQuery = useDebounce(query, 800);

  const hasResults = searchResults && searchResults.length > 0;

  const handleGetResults = async (query: string) => {
    setSearchResults([]);
    try {
      setIsLoading(true);
      const results = await searchUsers(query);
      setSearchResults(results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery || query.length < 0) handleGetResults(searchQuery);
  }, [searchQuery]);

  return (
    <CardSection className='mb-4' noSpacing>
      <Dialog>
        <DialogTrigger asChild>
          <div className='border px-3 py-2 rounded-md cursor-pointer'>
            <SearchIcon size={20} className='text-muted-foreground' />
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Find Friends</DialogTitle>
            <DialogDescription>
              Search for friends by their name, location, or tags
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Scotland'
            />
          </div>

          {isLoading && (
            <Loader2 size={20} className='animate-spin mx-auto mt-4' />
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
  );
};

export default SearchBar;
