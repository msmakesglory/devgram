import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen text-center'>
            <h2 className='text-2xl font-semibold text-red-500'>Page Not Found</h2>
            <p className='text-gray-600 mt-2'>the page you are looking for does not exist.</p>
            <Button className='mt-4 px-4 py-2 bg-black rounded-lg hover:bg-white hover:text-black transition'
                    onClick={() => {window.history.back()}}>
                Go Back
            </Button>
        </div>
    );
};

export default NotFound;