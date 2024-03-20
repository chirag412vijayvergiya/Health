function PersonalTestimonial() {
  return (
    <div className="relative w-full rounded-3xl bg-slate-400 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a className="flex items-center space-x-2" href="#">
            <span className="relative flex h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full object-cover">
              <img
                className="aspect-square h-full w-full rounded-full border object-cover"
                sizes="45px"
                src="/logo-light.jpeg"
              />
            </span>
          </a>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <a
                className="font-semibold text-grey-800 hover:text-blue-800 hover:underline dark:text-grey-50"
                href="#"
              >
                Chirag Vijay
              </a>
            </div>
            <div className="flex flex-row items-center gap-1 text-xs text-grey-500">
              Nmims,shirpur
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-6 text-2xl font-semibold text-gray-800">
        "Finally free from old-school banks"
      </h6>{' '}
      {/* Testimonial content with double quotes */}
      <blockquote className="text-lg leading-relaxed text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        quas quisquam non? Quas voluptate nulla minima deleniti optio ullam
        nesciunt, numquam corporis et asperiores laboriosam sunt, praesentium
        suscipit blanditiis. Necessitatibus id alias reiciendis, perferendis
        facere pariatur dolore veniam autem esse non voluptatem saepe provident
        nihil molestiae.
      </blockquote>
    </div>
  );
}

export default PersonalTestimonial;
