import React, { useState, useRef, useEffect } from 'react';
import { searchUsers } from '../services/api';
import { SearchResult } from '../types';

interface SearchBarProps {
  onSelectUser: (did: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current && 
        resultsRef.current && 
        !searchInputRef.current.contains(event.target as Node) && 
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (searchTerm.trim()) {
      onSelectUser(searchTerm);
      setSearchTerm('');
      setShowResults(false);
    }
  };
  
  let searchTimeout: NodeJS.Timeout;
  
  const fetchResults = async (query: string) => {
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    searchTimeout = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchUsers(query);
      setSearchResults(results);
      setShowResults(results.length > 0);
      setIsLoading(false);
    }, 300);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchResults(value);
  };
  
  const handleSelectUser = (did: string) => {
    onSelectUser(did);
    setSearchTerm('');
    setShowResults(false);
  };
  
  return (
    <div className="relative mt-12 mb-6">
      <form 
        onSubmit={handleSearch} 
        className="flex justify-center items-center sm:flex-row flex-col sm:items-center items-stretch relative"
      >
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="ej. zalatoy.bsky.social"
          className="bg-[rgb(192,245,242)] border border-solid border-white rounded-[20px] w-full sm:w-[300px] h-[38px] px-[10px] mr-[5px] focus:outline-none focus:ring focus:border-[#2196F3] transition-all duration-200"
          autoComplete="off"
        />
        <button
          type="submit"
          className="text-black rounded-[20px] bg-[lightslategrey] w-full sm:w-[86px] h-[38px] mt-2 sm:mt-0 hover:bg-[#2196F3] hover:text-white transition-colors duration-200"
        >
          Buscar
        </button>
        
        {showResults && (
          <div 
            ref={resultsRef}
            className="absolute top-full mt-1 left-0 right-0 sm:right-auto bg-black rounded-[10px] max-h-[350px] overflow-auto z-[1000] shadow-[0_0_10px_rgba(54,143,245,0.73)]"
          >
            {searchResults.map((result) => (
              <div 
                key={result.did}
                onClick={() => handleSelectUser(result.did)}
                className="cursor-pointer transition-all duration-200"
              >
                <div className="bg-[rgb(21,24,24)] p-[10px] m-[2px] rounded-[10px] flex items-center text-white hover:bg-[rgb(34,34,39)] hover:shadow-[0_0_10px_rgba(85,178,240,0.48)]">
                  <img 
                    src={result.avatar || "/images/banner_error.jpg"} 
                    alt="avatar"
                    className="w-[49px] h-[49px] rounded-full mr-[10px] border-2 border-[#2196F3]" 
                  />
                  <div>
                    <div className="font-bold">
                      {result.displayName || result.handle}
                    </div>
                    <div className="text-[rgb(252,103,4)] text-[0.8em]">
                      @{result.handle}
                    </div>
                    <div className="text-[rgb(118,121,109)] text-[0.8em]">
                      {result.did}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;