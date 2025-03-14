import { useEffect, useRef, useState } from "react";
import { usePostContext } from "../../context/PostContext";
import PostCard from "./Post";

const Home = () => {
    const { postsByDate, loadPreviousDay } = usePostContext();
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setLoading(true);

                    await loadPreviousDay();

                    // Delay loading state reset to prevent flickering
                    setTimeout(() => {
                        setLoading(false);
                    }, 300); // Adjust timing if needed
                }
            },
            { threshold: 1.0 }
        );

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => {
            if (scrollRef.current) {
                observer.unobserve(scrollRef.current);
            }
        };
    }, [loadPreviousDay, loading]);

    const filteredPosts = Object.values(postsByDate)
        .flat()
        .filter((post) => post);

    return (
        <div className="pt-20 px-4">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} idea={post} />
                ))}

                {/* Loading Indicator (Smooth Animation) */}
                {loading && (
                    <div className="flex justify-center items-center col-span-full mt-10 transition-opacity duration-500 ease-in-out">
                        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Scroll Trigger */}
            <div ref={scrollRef} className="h-10"></div>
        </div>
    );
};

export default Home;
