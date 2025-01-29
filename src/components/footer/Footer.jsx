import logo from "@/components/images/logo.png"
import {Facebook, Github, Google, Instagram, Mail} from "@icon-park/react";
import {Separator} from "@/components/ui/separator.jsx";
export default function Footer(){
    return <footer className="w-full flex fixed bottom-0 mb-10 mx-10 justify-around flex-col lg:flex-row gap-2">
        <div>
            <img src={logo} className="h-16 dark:invert"/>
        </div>
        <div className="space-y-3">
        <div>
                <ul className="flex gap-4">
                    <li className="font-semibold">Contact Us</li>
                    <li><Mail className="mx-2 inline-block"/>ms.makes.glory@gmail.com</li>
                    <li><Instagram className="mx-2 inline-block"/>instagram</li>
                </ul>
            </div>
            <div className="flex-grow">
                <ul className="flex justify-start gap-4">
                    <li className="font-semibold">Follow Us</li>
                    <li><Instagram/></li>
                    <li><Google/></li>
                    <li><Facebook/></li>
                    <li><Github/></li>
                </ul>
            </div>
            <div className="flex-grow">
                <ul className="flex justify-start gap-4">
                    <li className="font-semibold">contributors</li>
                    <li>xyz@gmail.comm</li>
                    <li>abc@gmail.com</li>
                </ul>
            </div>
        </div>
    </footer>
}