import { useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import logo from "./assets/shared/logo.svg";
import galleryData from "./assets/dataset/data.json";
import prev from "./assets/shared/icon-back-button.svg";
import next from "./assets/shared/icon-next-button.svg";
import expand from "./assets/shared/icon-view-image.svg";

const App = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [slideshow, setSlideShow] = useState(false);
    const [autoplaySlideshow, setAutoplaySlideshow] = useState(false);
    const [gallery, setGallery] = useState(false);
    const [galleryImage, setGalleryImage] = useState("");

    function resetAutoPlay() {
        setAutoplaySlideshow(false);
        setTimeout(() => {
            console.log("autoplay reset");
            setAutoplaySlideshow(true);
        }, 30000);
    }

    const toggleGallery = (e) => {
        if (e) {
            setGalleryImage(e);
            setGallery(true);
            setAutoplaySlideshow(false);
        } else {
            setGallery(false);
        }
    };

    const toggleSlideshow = () => {
        setSlideShow(!slideshow);
        setAutoplaySlideshow(!autoplaySlideshow);
    };

    return (
        <main className="relative">
            <div
                className={`fixed z-50 w-full h-screen bg-black/90 flex justify-center items-center ${
                    gallery ? "block" : "hidden"
                }`}
            >
                <span
                    onClick={() => {
                        setGallery(false);
                        setAutoplaySlideshow(true);
                    }}
                    className="absolute top-5 right-5 text-white uppercase cursor-pointer text-xs"
                >
                    close
                </span>
                <figure className="w-full flex justify-center items-center">
                    <img src={galleryImage} alt="gallery image" />
                </figure>
            </div>
            <header className="sticky top-0 z-40 bg-white flex justify-between items-center h-20 px-6 border-b-2 border-silver">
                <img src={logo} alt="website name" className="w-20 sm:w-24 md:w-28" />
                <button
                    className="uppercase font-bold fluid-xs text-grey hover:text-black transition-colors tracking-[1.9px] md:tracking-[2.57px] focus:outline-offset-8"
                    onClick={toggleSlideshow}
                >
                    {slideshow ? "stop slideshow" : "start slideshow"}
                </button>
            </header>
            <section className="w-[calc(100%-3rem)] max-w-[1440px] mx-auto mt-5">
                <section id="art_grid_container" className={!slideshow ? "block" : "hidden"}>
                    {galleryData.map((article, index) => (
                        <article
                            key={index}
                            className="relative mb-5 hover:cursor-pointer hover:opacity-90 focus:opacity-90 sm:hover:scale-105 focus:scale-105 scale-100 transition-all"
                            onClick={() => {
                                setSlideShow(!slideshow);
                                setAutoplaySlideshow(!autoplaySlideshow);
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
                <CarouselProvider
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    totalSlides={galleryData.length}
                    currentSlide={selectedIndex}
                    isPlaying={autoplaySlideshow}
                    className={slideshow ? "block" : "hidden"}
                >
                    <div className="relative">
                        <Slider draggable>
                            {galleryData.map((slide, index) => (
                                <Slide key={index} index={index}>
                                    <section className="h-full flex justify-between items-start flex-col">
                                        <section className="w-full flex justify-between items-start flex-col lg:flex-row gap-x-4">
                                            <section className="relative w-full h-full">
                                                <section className="relative max-w-xl">
                                                    <img
                                                        src={slide.images.hero.large}
                                                        alt=""
                                                        className="w-full"
                                                    />
                                                    <p
                                                        onClick={() =>
                                                            toggleGallery(slide.images.hero.small)
                                                        }
                                                        className="flex justify-evenly items-center absolute top-4 sm:top-auto sm:bottom-4 left-2 w-[9.5rem] h-10 bg-black/60 hover:bg-white/25 transition-opacity text-white uppercase text-xs cursor-pointer"
                                                    >
                                                        <img
                                                            src={expand}
                                                            alt="expand gallery image"
                                                        />
                                                        view image
                                                    </p>
                                                </section>
                                                <section className="xl:h-full flex flex-col justify-between items-start sm:items-end lg:items-center -mt-10 relative z-50 sm:absolute sm:top-0 sm:right-0">
                                                    <p className="bg-white flex flex-col py-10 px-5">
                                                        <span className="font-bold fluid-2xl md:fluid-4xl max-w-sm">
                                                            {slide.name}
                                                        </span>
                                                        <span className="text-grey">
                                                            {slide.artist.name}
                                                        </span>
                                                    </p>
                                                    <img
                                                        src={slide.artist.image}
                                                        alt="artist self portrait"
                                                        className="mt-2 max-w-xs"
                                                    />
                                                </section>
                                            </section>
                                            <section className="relative flex justify-center items-center min-w-full h-full lg:min-w-[400px] pt-20 lg:py-0">
                                                <p className="absolute top-0 right-0 md:right-auto md:left-0 lg:left-auto lg:right-0 fluid-8xl text-silver font-bold -z-10">
                                                    {slide.year}
                                                </p>
                                                <article className="max-w-[400px]">
                                                    <p className="text-grey text-sm leading-7">
                                                        {slide.description}
                                                    </p>
                                                    <a
                                                        href={slide.source}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="uppercase text-[9px] text-grey underline tracking-widest block mt-10"
                                                    >
                                                        go to source
                                                    </a>
                                                </article>
                                            </section>
                                        </section>
                                        <footer className="flex justify-between items-center w-full min-h-[5rem] mt-5 border-t-2 border-lightGrey">
                                            <section>
                                                <p className="font-bold fluid-lg mb-2">
                                                    {slide.artist.name}
                                                </p>
                                                <p className="fluid-sm">{slide.name}</p>
                                            </section>
                                        </footer>
                                    </section>
                                </Slide>
                            ))}
                        </Slider>
                        <section className="absolute bottom-0 px-4 right-0 h-[76px] flex justify-center items-center bg-white">
                            <ButtonBack className="mr-10" onClick={resetAutoPlay}>
                                <img src={prev} alt="previous slide" />
                            </ButtonBack>
                            <ButtonNext onClick={resetAutoPlay}>
                                <img src={next} alt="next slide" />
                            </ButtonNext>
                        </section>
                    </div>
                </CarouselProvider>
            </section>
        </main>
    );
};

export default App;
