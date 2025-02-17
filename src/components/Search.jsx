import{ useState, useEffect } from 'react';
import {Input} from "@/components/ui/input.jsx";

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
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Devgram posts..."
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