import { Mail } from "@icon-park/react";
import {Button} from "@/components/ui/button.jsx";
import { useProfileContext } from "../context/ProfileContext";

const LandingPage = () => {
    const { userDetails } = useProfileContext();
    return(
        <>
        <div className="flex w-1/2">
            <div className="mx-20 flex flex-col gap-4">
                <h1 className="text-5xl font-bold mt-20">Hello! {userDetails?.fullName ? userDetails.fullName : "Developer"}</h1>
                <h3 className="text-2xl font-semibold line-clamp-3 text-secondary-foreground">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                </h3>
                <Button className="w-fit">
                    <Mail/>
                    A Button
                </Button>
            </div>
        </div>
        {/* <Spin/> */}
        </>
    )
}

export default LandingPage;