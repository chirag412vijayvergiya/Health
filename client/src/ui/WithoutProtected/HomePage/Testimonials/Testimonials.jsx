import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import PersonalTestimonial from './PersonalTestimonial';
function Test() {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const [count, setCount] = useState(0);

  const prevSlide = () => {
    const prevIndex =
      currentTestimonial === 1
        ? testimonials.length - 2
        : currentTestimonial - 1;
    setCurrentTestimonial(prevIndex);
    setCount(count - 1);
  };

  const nextSlide = () => {
    const nextIndex =
      currentTestimonial === testimonials.length - 2
        ? 1
        : currentTestimonial + 1;
    setCurrentTestimonial(nextIndex);
    setCount(count + 1);
  };

  const testimonials = [
    {
      name: 'Chirag Vijayvergiya',
      date: '4 months ago',
      quote: 'Finally free from old-school banks',
      message:
        'Suspendisse potenti. Integer finibus purus quis ipsum facilisis, at venenatis ligula semper. Nulla facilisi. Proin sed metus id nunc lacinia convallis.',
      rating: 5,
    },
    {
      name: 'Shyam',
      date: '2 weeks ago',
      quote: 'Finally free from old-school banks',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque nec nisl pharetra pretium. Donec auctor velit ut ligula malesuada condimentum.',
      rating: 5,
    },
    {
      name: 'Ram',
      date: '1 year ago',
      quote: 'Finally free from old-school banks',
      message:
        'Suspendisse potenti. Integer finibus purus quis ipsum facilisis, at venenatis ligula semper. Nulla facilisi. Proin sed metus id nunc lacinia convallis.',
      rating: 4,
    },
    {
      name: 'Hello',
      date: '2 weeks ago',
      quote: 'Finally free from old-school banks',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque nec nisl pharetra pretium. Donec auctor velit ut ligula malesuada condimentum.',
      rating: 4,
    },
    {
      name: 'Chirag Vijay',
      date: '4 months ago',
      quote: 'Finally free from old-school banks',
      message:
        'Suspendisse potenti. Integer finibus purus quis ipsum facilisis, at venenatis ligula semper. Nulla facilisi. Proin sed metus id nunc lacinia convallis.',
      rating: 2,
    },
    {
      name: 'Hello',
      date: '2 weeks ago',
      quote: 'Finally free from old-school banks',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque nec nisl pharetra pretium. Donec auctor velit ut ligula malesuada condimentum.',
      rating: 3,
    },
  ];

  const visibleTestimonials = [
    testimonials[
      (currentTestimonial - 1 + testimonials.length) % testimonials.length
    ],
    testimonials[currentTestimonial],
    testimonials[(currentTestimonial + 1) % testimonials.length],
  ];

  return (
    <div id="testimonial-section">
      <div className="min-w-screen relative  flex min-h-[calc(100vh-4.5rem)] overflow-hidden bg-grey-50 dark:bg-grey-900">
        <div className="flex-1">
          <div className="mx-auto mb-10 h-full w-11/12 max-w-[1200px] space-y-[50px] py-20">
            <div className="rotate-150 absolute -left-11 -top-8 h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-green-600 opacity-40 blur-[120px] dark:opacity-20"></div>
            <div className="flex flex-col gap-2 sm:items-center">
              <p className="text-md font-semibold uppercase text-indigo-400">
                Patient-Centered Excellence, Doctor-Driven Care!
              </p>
              <h2 className="mb-5 mt-4 text-xl font-semibold text-grey-900 dark:text-grey-50 md:text-2xl xl:text-3xl">
                Elevate Patient Health, Empower Doctor Expertise, Illuminate
                Hospital Care
              </h2>
            </div>
            <div className="mb-14 flex justify-center gap-3">
              <div className="flex items-center">
                <button
                  className=" justify-center gap-3 rounded-full bg-blue-400 px-4 pl-3 font-semibold text-white hover:bg-blue-500"
                  onClick={prevSlide}
                  style={{ width: '40px', height: '40px' }}
                >
                  <BsChevronCompactLeft className="stroke-2" />
                </button>
              </div>

              {visibleTestimonials.map((testimonial, index) => (
                <PersonalTestimonial
                  key={index}
                  name={testimonial.name}
                  date={testimonial.date}
                  quote={testimonial.quote}
                  message={testimonial.message}
                  index={index}
                  currentSlide={currentTestimonial}
                  type={index === 1 ? 'middle' : index < 1 ? 'left' : 'right'}
                  rating={testimonial.rating}
                />
              ))}
              <div className="flex items-center">
                <button
                  className="justify-center gap-3 rounded-full bg-blue-400 px-4 pr-3 font-semibold text-white hover:bg-blue-500"
                  style={{ width: '40px', height: '40px' }}
                  onClick={nextSlide}
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
