import { usePostContext } from "../context/PostContext";

const WeeklyPosts = () => {
    const { postsByDate, loadPreviousDay, loadedDays } = usePostContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-4">Posts from the Last 7 Days</h2>

                {Object.entries(postsByDate).map(([date, posts]) => (
                    <div key={date} className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">{date}</h3>
                        {posts.length > 0 ? (
                            <ul className="list-disc pl-5 mt-2">
                                {posts.map(post => (
                                    <li key={post.id} className="text-gray-600">
                                        <strong className="text-black">{post.title}</strong> - {post.description}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 mt-2">No posts for this day.</p>
                        )}
                    </div>
                ))}

                {loadedDays < 6 && (
                    <button 
                        onClick={loadPreviousDay} 
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Load Previous Day
                    </button>
                )}
            </div>
        </div>
    );
};

export default WeeklyPosts;
