import { useState } from "react";
import logo from "./assets/shared/logo.svg";
const App = () => {
    const [slideshow, setSlideShow] = useState(false);
    return (
        <>
            <header className="flex justify-between items-center px-4 sm:px-5 md:px-6 h-20">
                <img src={logo} alt="website name" />
                <button
                    className="uppercase font-bold fluid-xs text-grey hover:text-black transition-colors tracking-[1.9px] md:tracking-[2.57px]"
                    onClick={() => setSlideShow(!slideshow)}
                >
                    {slideshow ? "stop slideshow" : "start slideshow"}
                </button>
            </header>
        </>
    );
};

export default App;
