import { useEffect, useRef, useState } from "react";
import logo from "./assets/shared/logo.svg";
import galleryData from "./assets/dataset/data.json";
import { Fade } from "react-slideshow-image";
import prev from "./assets/shared/icon-back-button.svg";
import next from "./assets/shared/icon-next-button.svg";
import expand from "./assets/shared/icon-view-image.svg";
import "react-slideshow-image/dist/styles.css";
const App = () => {
    const slideRef = useRef(null);
    const [slideshow, setSlideShow] = useState(false);
    const [autoplaySlideshow, setAutoplaySlideshow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [gallery, setGallery] = useState(false);
    const [galleryImage, setGalleryImage] = useState("");

    useEffect(() => {
        slideRef.current.goTo(parseInt(selectedIndex));
    }, [selectedIndex]);

    useEffect(() => {
        if (slideshow) {
            setAutoplaySlideshow(true);
        } else {
            setAutoplaySlideshow(false);
        }
    }, [slideshow]);

    const prevStyle = {
        position: "absolute",
        bottom: "20px",
        left: "auto",
        right: "50px",
        width: "30px",
        height: "30px",
        background: "none",
        border: "0px",
    };
    const nextStyle = {
        position: "absolute",
        bottom: "20px",
        right: "0px",
        width: "30px",
        height: "30px",
        background: "none",
        border: "0px",
    };

    const properties = {
        prevArrow: (
            <button style={{ ...prevStyle }} data-type="prev">
                <img src={prev} alt="previous slide" aria-label="Previous Slide" />
            </button>
        ),
        nextArrow: (
            <button style={{ ...nextStyle }} data-type="next">
                <img src={next} alt="next slide" aria-label="Next Slide" />
            </button>
        ),
    };

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
                    <Fade
                        defaultIndex={selectedIndex}
                        ref={slideRef}
                        autoplay={false}
                        transitionDuration={500}
                        canSwipe={true}
                        pauseOnHover={false}
                        prevArrow={properties.prevArrow}
                        nextArrow={properties.nextArrow}
                    >
                        {galleryData.map((slide, index) => (
                            <section key={index}>
                                <section className="flex flex-wrap justify-evenly items-center h-screen">
                                    <figure className="relative w-full max-w-[475px]">
                                        <picture>
                                            <source
                                                media="(min-width: 900px)"
                                                srcSet={slide.images.hero.large}
                                            />
                                            <source
                                                media="(min-width: 650px)"
                                                srcSet={slide.images.hero.small}
                                            />
                                            <source
                                                media="(max-width: 649px)"
                                                srcSet={slide.images.thumbnail}
                                            />
                                            <img
                                                src={slide.images.hero.large}
                                                alt="gallery"
                                                className="w-full"
                                            ></img>
                                        </picture>
                                        <button
                                            onClick={() => toggleGallery(slide.images.hero.small)}
                                            className="flex justify-evenly items-center absolute top-5 sm:top-auto sm:bottom-5 left-5 text-white bg-black hover:bg-black/50 transition-colors w-36 h-10 uppercase text-xs tracking-widest"
                                        >
                                            <span>
                                                <img src={expand} alt="view full image" />
                                            </span>
                                            view image
                                        </button>
                                    </figure>
                                    <section className="relative">
                                        <span className="absolute top-10 right-0 text-8xl md:text-[200px] text-silver -z-10">
                                            {slide.year}
                                        </span>
                                        <section>
                                            <article className="text-grey font-bold leading-7 text-sm md:max-w-[350px]">
                                                {slide.description}
                                            </article>
                                            <a
                                                href={slide.source}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-block text-[9px] mt-10 font-bold uppercase underline text-grey hover:text-black transition-colors tracking-widest"
                                            >
                                                go to source
                                            </a>
                                        </section>
                                    </section>
                                </section>
                                <aside className="flex justify-center items-start flex-col mt-5 h-20 border-t-2 border-silver">
                                    <p>{slide.name}</p>
                                    <p>{slide.artist.name}</p>
                                </aside>
                            </section>
                        ))}
                    </Fade>
                </section>
            </section>
        </main>
    );
};

export default App;
