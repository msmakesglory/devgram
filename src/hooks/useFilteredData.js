import { useState, useEffect } from "react";

export const useFilteredData = (data, query) => {
    
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase();
        const results = data.filter( item => 
            item.title.toLowerCase().includes(lowerCaseQuery)
        );

        setFilteredData(results);

    }, [query, data]);

    return filteredData;
}