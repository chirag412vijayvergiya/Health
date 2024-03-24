import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { CiCalendar } from 'react-icons/ci';
function Test() {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const [isShowing, setIsShowing] = useState(false);
  const prevSlide = () => {
    const prevIndex =
      currentTestimonial === 1
        ? testimonials.length - 2
        : currentTestimonial - 1;
    setCurrentTestimonial(prevIndex);
  };

  const nextSlide = () => {
    const nextIndex =
      currentTestimonial === testimonials.length - 2
        ? 1
        : currentTestimonial + 1;
    setCurrentTestimonial(nextIndex);
  };

  const testimonials = [
    {
      name: 'Chirag Vijayvergiya',
      date: '4 months ago',
      quote: 'Finally free from old-school banks',
      message:
        'Suspendisse potenti. Integer finibus purus quis ipsum facilisis, at venenatis ligula semper. Nulla facilisi. Proin sed metus id nunc lacinia convallis.',
    },
    {
      name: 'John Doe',
      date: '2 weeks ago',
      quote: 'Finally free from old-school banks',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque nec nisl pharetra pretium. Donec auctor velit ut ligula malesuada condimentum.',
    },
    {
      name: 'Jane Smith',
      date: '1 year ago',
      quote: 'Finally free from old-school banks',
      message:
        'Suspendisse potenti. Integer finibus purus quis ipsum facilisis, at venenatis ligula semper. Nulla facilisi. Proin sed metus id nunc lacinia convallis.',
    },
    {
      name: 'Hello',
      date: '2 weeks ago',
      quote: 'Finally free from old-school banks',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque nec nisl pharetra pretium. Donec auctor velit ut ligula malesuada condimentum.',
    },
    {
      name: 'Chirag Vijay',
      date: '4 months ago',
      quote: 'Finally free from old-school banks',
      message:
        'Suspendisse potenti. Integer finibus purus quis ipsum facilisis, at venenatis ligula semper. Nulla facilisi. Proin sed metus id nunc lacinia convallis.',
    },
    {
      name: 'Hello',
      date: '2 weeks ago',
      quote: 'Finally free from old-school banks',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque nec nisl pharetra pretium. Donec auctor velit ut ligula malesuada condimentum.',
    },
  ];

  return (
    <div id="testimonial-section">
      <div className="min-w-screen relative z-[10] flex min-h-[calc(100vh-4.5rem)] overflow-hidden bg-grey-50 dark:bg-grey-900">
        <div className="flex-1">
          <div className="py-20r mx-auto h-full w-11/12 max-w-[1200px] space-y-[50px]">
            <div className="rotate-150 absolute left-0 top-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
            <div className="absolute bottom-0 right-0 z-[100] h-80 w-80 rounded-full bg-green-600 opacity-40 blur-[120px] dark:opacity-20"></div>
            <div className="flex flex-col gap-2 sm:items-center">
              <p className="text-md font-semibold uppercase text-indigo-400">
                Patient-Centered Excellence, Doctor-Driven Care!
              </p>
              <h2 className="my-3 text-xl font-semibold text-grey-900 dark:text-grey-50 md:text-2xl xl:text-3xl">
                Elevate Patient Health, Empower Doctor Expertise, Illuminate
                Hospital Care
              </h2>
            </div>
            <div className="flex justify-center gap-3 ">
              <div className="flex items-center">
                <button
                  className=" justify-center gap-3 rounded-full bg-blue-500 px-4 pl-3 font-semibold text-white hover:bg-blue-600"
                  onClick={prevSlide}
                  style={{ width: '40px', height: '40px' }}
                >
                  <BsChevronCompactLeft className="stroke-2" />
                </button>
              </div>
              {currentTestimonial > 0 && (
                <div className=" transition-tranform max-w-[400px] flex-1 translate-x-0 space-y-3 opacity-100 lg:blur-sm">
                  <div className="w-full rounded-lg border-2 border-grey-100 bg-white px-3 py-4 dark:border-grey-700 dark:bg-grey-900 sm:px-5 sm:pb-5 sm:pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <a className="flex items-center space-x-2" href="#">
                          <span className="relative flex h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full object-cover">
                            <img
                              className="aspect-square h-full w-full rounded-full border object-cover"
                              src="/logo-light.jpeg"
                            />
                          </span>
                        </a>
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <a
                              className="link font-semibold text-grey-800 hover:text-blue-800 hover:underline dark:text-grey-50"
                              href="#"
                            >
                              {testimonials[currentTestimonial - 1].name}
                            </a>
                          </div>
                          <div className="flex flex-row items-center gap-1 text-xs text-grey-500">
                            <CiCalendar className="h-4 w-4 stroke-grey-500 stroke-2" />
                            {testimonials[currentTestimonial - 1].date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-5 text-grey-600 dark:text-grey-400">
                      <div className="text-center text-indigo-400">
                        {testimonials[currentTestimonial - 1].quote}
                      </div>
                      <br></br>
                      <span>
                        {testimonials[currentTestimonial - 1].message}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="hidden max-w-[400px] flex-1 space-y-3 rounded shadow-2xl  lg:block">
                <div className="w-full rounded-lg border-2 border-grey-100 bg-white px-3 py-4 dark:border-grey-700 dark:bg-grey-900 sm:px-5 sm:pb-5 sm:pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <a className="flex items-center space-x-2" href="#">
                        <span className="relative flex h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full object-cover">
                          <img
                            className="aspect-square h-full w-full rounded-full border object-cover"
                            src="/logo-light.jpeg"
                          />
                        </span>
                      </a>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                          <a
                            className="link font-semibold text-grey-800 hover:text-blue-800 hover:underline dark:text-grey-50"
                            href="#"
                          >
                            {testimonials[currentTestimonial].name}
                          </a>
                        </div>
                        <div className="flex flex-row items-center gap-1 text-xs text-grey-500 ">
                          <CiCalendar className="h-4 w-4 stroke-grey-500 stroke-2" />
                          {testimonials[currentTestimonial].date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-5 text-grey-600 dark:text-grey-400">
                    <div className="text-center text-indigo-400">
                      {testimonials[currentTestimonial].quote}
                    </div>
                    <br></br>
                    <span>{testimonials[currentTestimonial].message}</span>
                  </div>
                </div>
              </div>
              {currentTestimonial <= testimonials.length - 1 && (
                <div className="hidden max-w-[400px] flex-1 space-y-3 transition duration-300 ease-in-out lg:block">
                  <div className="w-full rounded-lg border-2 border-grey-100 bg-white px-3 py-4 dark:border-grey-700 dark:bg-grey-900 sm:px-5 sm:pb-5 sm:pt-6 lg:blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <a className="flex items-center space-x-2" href="#">
                          <span className="relative flex h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full object-cover">
                            <img
                              className="aspect-square h-full w-full rounded-full border object-cover"
                              src="/logo-light.jpeg"
                            />
                          </span>
                        </a>
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <a
                              className="link font-semibold text-grey-800 hover:text-blue-800 hover:underline dark:text-grey-50"
                              href="#"
                            >
                              {testimonials[currentTestimonial + 1].name}
                            </a>
                          </div>
                          <div className="flex flex-row items-center gap-1 text-xs text-grey-500">
                            <CiCalendar className="h-4 w-4 stroke-grey-500 stroke-2" />
                            {testimonials[currentTestimonial + 1].date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-5 text-grey-600 dark:text-grey-400">
                      <div className="text-center text-indigo-400">
                        {testimonials[currentTestimonial + 1].quote}
                      </div>
                      <br></br>
                      <span>
                        {testimonials[currentTestimonial + 1].message}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <button
                  className="relative h-[1.3rem] w-[1.3rem] rounded-full bg-blue-500 py-2 pl-3 font-semibold text-white hover:bg-blue-600"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => {
                    nextSlide();
                    setIsShowing(!isShowing);
                  }}
                >
                  <BsChevronCompactRight className="stroke-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
