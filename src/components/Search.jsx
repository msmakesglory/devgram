import{ useState, useEffect } from 'react';

const DevgramSearch = ({ data }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
  
    useEffect(() => {
      const lowerCaseQuery = query.toLowerCase();
      const results = data.filter(item => 
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(results);
    }, [query, data]);
  
    return (
      <div className="p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Devgram posts..."
          className="w-full p-2 border rounded mb-4 text-black-600"
        />
  
        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map(item => (
              <li key={item.id} className="p-2 border-b">
                <h3 className="font-bold">{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  };
  
  export default DevgramSearch;