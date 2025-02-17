import { useState, useEffect } from 'react';
import DevgramSearch from './Search';
import { useIdeaContext } from '../context/IdeaContext';

// Example API fetch function or local data import
// const fetchData = async () => {
//   // Fetch or load your data here.
//   // For simplicity, we use static data.
//   return [
//     { id: 1, title: 'How to use React?', description: 'A guide to React hooks.' },
//     { id: 2, title: 'Understanding JavaScript', description: 'Deep dive into JS.' },
//     { id: 3, title: 'CSS Tips and Tricks', description: 'Styling your components effectively.' },
//   ];
// };

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { ideas } = useIdeaContext();

  useEffect(() => {
    const loadData = async () => {
      const data = ideas;
      setPosts(data);
    };
    loadData();
  }, [ideas]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Devgram Posts</h1>
      <DevgramSearch data={posts} />
    </div>
  );
};

export default PostsPage;
