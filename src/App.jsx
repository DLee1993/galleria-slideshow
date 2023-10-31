import { useState } from "react";
import logo from "./assets/shared/logo.svg";
import galleryData from "./assets/dataset/data.json";
const App = () => {
    const [slideshow, setSlideShow] = useState(false);
    return (
        <>
            <header className="max-w-[calc(100%-3rem)] mx-auto flex justify-between items-center h-20 border-b-2 border-silver">
                <img src={logo} alt="website name" />
                <button
                    className="uppercase font-bold fluid-xs text-grey hover:text-black transition-colors tracking-[1.9px] md:tracking-[2.57px]"
                    onClick={() => setSlideShow(!slideshow)}
                >
                    {slideshow ? "stop slideshow" : "start slideshow"}
                </button>
            </header>
            <main>
                <section id="art_grid_container" className="max-w-[calc(100%-3rem)] mx-auto my-5">
                    {galleryData.map((article, index) => (
                        <article
                            key={index}
                            className="relative mb-5 hover:cursor-pointer hover:opacity-75 hover:scale-105 scale-100 transition-all"
                            onClick={() => setSlideShow(!slideshow)}
                        >
                            <figure className="bg-black">
                                <img
                                    src={article.images.gallery}
                                    alt="gallery image"
                                    className="opacity-75"
                                />
                                <figcaption className="absolute bottom-5 left-2 text-silver">
                                    <p className="font-bold fluid-lg">{article.name}</p>
                                    <sub className="opacity-75">{article.artist.name}</sub>
                                </figcaption>
                            </figure>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
};

export default App;
