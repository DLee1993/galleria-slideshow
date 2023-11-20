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
        setAutoplaySlideshow(!autoplaySlideshow);

        setTimeout(() => {
            setAutoplaySlideshow(true);
        }, 30000);
    }

    const toggleGallery = (e) => {
        if (e) {
            setGalleryImage(e);
            setGallery(!gallery);
            setAutoplaySlideshow(!autoplaySlideshow);
        } else {
            setGallery(!gallery);
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
                    onClick={toggleGallery}
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
                                        <section className="w-full flex justify-between items-start flex-col lg:flex-row bg-red-300 gap-x-4">
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
                                                        className="flex justify-evenly items-center absolute bottom-4 left-2 w-[9.5rem] h-10 bg-black/60 hover:bg-white/25 transition-opacity text-white uppercase text-xs cursor-pointer"
                                                    >
                                                        <img
                                                            src={expand}
                                                            alt="expand gallery image"
                                                        />
                                                        view image
                                                    </p>
                                                </section>
                                                <section className="bg-orange-600 sm:absolute sm:top-0 sm:right-0">
                                                    <p>
                                                        <span>{slide.name}</span>
                                                        <span>{slide.artist.name}</span>
                                                    </p>
                                                    <p>floating artist image</p>
                                                </section>
                                            </section>
                                            <section className="bg-blue-600 min-w-full lg:min-w-[350px]">
                                                <p>slide year</p>
                                                <p>slide description</p>
                                                <p>slide link</p>
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
                            <ButtonBack className="mr-10">
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
