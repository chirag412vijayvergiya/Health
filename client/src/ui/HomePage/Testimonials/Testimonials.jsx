import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import PersonalTestimonial from './PersonalTestimonial';
function Testimonials() {
  const slides = [
    {
      content: <PersonalTestimonial />,
    },
    {
      content: <h1>Slide 2 Content</h1>,
    },
    {
      content: <h1>Slide 3 Content</h1>,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isLastSlide = currentIndex === 0;
    const newIndex = isLastSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div id="testimonial-section">
      <div className="min-w-screen relative z-10 flex overflow-hidden bg-grey-50 bg-cover bg-no-repeat dark:bg-gray-900">
        <div className="mx-auto h-full w-11/12 max-w-4xl space-y-14 py-10 text-left md:py-20 md:text-center">
          <div className="rotate-150 absolute left-0 top-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
          <div className="absolute bottom-0 right-0 z-[100] h-80 w-80 rounded-full bg-green-600 opacity-40 blur-[120px] dark:opacity-20"></div>
          <div className="mx-auto max-w-[1000px]">
            <p className="text-md font-semibold uppercase text-indigo-400">
              Patient-Centered Excellence, Doctor-Driven Care!
            </p>
            <h2 className="my-3 text-xl font-semibold text-grey-900 dark:text-grey-50 md:text-2xl xl:text-3xl">
              Elevate Patient Health, Empower Doctor Expertise, Illuminate
              Hospital Care
            </h2>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="group relative mx-auto h-[400px] w-full max-w-[1500px] px-4 py-6">
              <div className="h-full w-full rounded-2xl bg-cover bg-center duration-500">
                {slides[currentIndex].content}
              </div>
              {/* Left Arrow */}
              <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>
              {/* Right Arrow */}
              <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
              <div className="absolute bottom-4 left-0 right-0 mx-auto flex justify-center py-2">
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className="mx-1 cursor-pointer text-2xl"
                  >
                    <RxDotFilled
                      color={currentIndex === slideIndex ? '#007bff' : '#000'} // Change the color based on active slide
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
