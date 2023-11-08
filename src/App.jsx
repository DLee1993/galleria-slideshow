import { useEffect, useRef, useState } from "react";
import logo from "./assets/shared/logo.svg";
import galleryData from "./assets/dataset/data.json";
// import prev from "./assets/shared/icon-back-button.svg";
// import next from "./assets/shared/icon-next-button.svg";
// import expand from "./assets/shared/icon-view-image.svg";

const App = () => {
    const slideRef = useRef(null);
    const [slideshow, setSlideShow] = useState(false);
    const [autoplaySlideshow, setAutoplaySlideshow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [gallery, setGallery] = useState(false);
    const [galleryImage, setGalleryImage] = useState("");

    useEffect(() => {
        if (slideshow) {
            setAutoplaySlideshow(true);
        } else {
            setAutoplaySlideshow(false);
        }
    }, [slideshow]);

    const toggleGallery = (e) => {
        if (e) {
            setGalleryImage(e);
        }
        setGallery(!gallery);
        setAutoplaySlideshow(!autoplaySlideshow);
    };

    return (
        <main className="relative">
            <div
                className={`fixed z-50 w-full h-screen bg-black/90 flex justify-evenly items-end flex-col ${
                    gallery ? "block" : "hidden"
                }`}
            >
                <span
                    onClick={toggleGallery}
                    className="text-white uppercase cursor-pointer pr-5 text-xs"
                >
                    close
                </span>
                <figure className="w-full flex justify-center items-center">
                    <img src={galleryImage} alt="gallery image" />
                </figure>
            </div>
            <header className="max-w-[calc(100%-3rem)] mx-auto flex justify-between items-center h-20 border-b-2 border-silver">
                <img src={logo} alt="website name" className="w-20 sm:w-24 md:w-28" />
                <button
                    className="uppercase font-bold fluid-xs text-grey hover:text-black transition-colors tracking-[1.9px] md:tracking-[2.57px] focus:outline-offset-8"
                    onClick={() => setSlideShow(!slideshow)}
                >
                    {slideshow ? "stop slideshow" : "start slideshow"}
                </button>
            </header>
            <section className="w-[calc(100%-3rem)] max-w-[1200px] mx-auto my-5">
                <section id="art_grid_container" className={!slideshow ? "block" : "hidden"}>
                    {galleryData.map((article, index) => (
                        <article
                            key={index}
                            className="relative mb-5 hover:cursor-pointer hover:opacity-90 focus:opacity-90 hover:scale-105 focus:scale-105 scale-100 transition-all"
                            onClick={() => {
                                setSlideShow(!slideshow);
                                setSelectedIndex(index);
                            }}
                            tabIndex={0}
                            aria-label={article.description}
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
                <section className={`${slideshow ? "block" : "hidden"}`}>
                    {/* Add swiper container here */}
                    <section>
                        {/* loop through and add a swiperSlide per slide */}
                        {galleryData.map((slide, index) => (
                            <section key={index}>{slide.name}</section>
                        ))}
                    </section>
                </section>
            </section>
        </main>
    );
};

export default App;
