import React, { useEffect, useState } from 'react';
import SearchField from './SearchField';

function SearchBar({ sendDataToApp }) {
  const [dataFromSearch, setDataFromSearch] = useState('');

  const gettingData = (dataFromSearch) => {
    setDataFromSearch(dataFromSearch);
  };

  useEffect(() => {
    sendDataToApp(dataFromSearch);
  }, [dataFromSearch]);

  return (
    <header className="w-full bg-blue-900 text-white p-4 rounded-md shadow-md">
      <div className="flex justify-center items-center">
        <SearchField sendDataToparent={gettingData} />
      </div>
    </header>
  );
}

// Exporting the SearchBar component
export default SearchBar;
