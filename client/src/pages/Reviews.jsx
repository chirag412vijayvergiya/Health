import Review from '../features/ReviewPage/Review';
import SEO from '../ui/SEO';

function Reviews() {
  return (
    <>
      <SEO
        title="Reviews"
        description="This is the reviews page of the website."
        keywords="reviews, page, keywords"
        author="Chirag Vijayvergiya"
      />
      <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex h-[86vh] flex-col rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:m-[2vh]">
        <h1 className="sticky top-0 m-2 w-full bg-slate-200 pl-4 text-lg font-semibold dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
          My Reviews
        </h1>
        <div className="flex flex-row gap-6 overflow-scroll md:mx-1 md:mb-6 md:mt-6">
          <Review />
        </div>
      </div>
    </>
  );
}

export default Reviews;
