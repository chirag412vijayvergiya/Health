import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  author,
  lang = 'en',
  meta = [],
}) => {
  const defaultTitle = 'Jeevan Hospital';
  const defaultDescription =
    'Jeevan Hospital: Providing compassionate healthcare services with state-of-the-art facilities and experienced medical professionals. Your health, our priority.';
  const defaultKeywords =
    'Jeevan Hospital, healthcare, medical, doctors, nurses, patients, hospital, clinic, emergency, surgery, treatment, health, wellness, medicine, pharmacy, laboratory, radiology, cardiology, neurology, orthopedics, pediatrics, gynecology, obstetrics, ophthalmology, dermatology, psychiatry, physiotherapy, nutrition, counseling, vaccination, surgery, consultation, diagnosis, prescription, medication, therapy, rehabilitation, recovery, prevention, awareness, education, research, innovation, technology, quality, safety, hygiene, comfort, convenience, affordability, accessibility, sustainability, community, society, environment, humanity, compassion, empathy, respect, dignity, trust, integrity, professionalism, excellence, leadership, teamwork, collaboration, communication, coordination, cooperation, dedication, commitment, responsibility, accountability, transparency, honesty, fairness, justice, equality, diversity, inclusion, empowerment, participation, engagement, satisfaction, loyalty, gratitude, appreciation, recognition, celebration, happiness, joy, peace, harmony, love, care, support, encouragement, motivation, inspiration, empowerment, transformation, development, progress, success, prosperity, growth, evolution, innovation, creativity, imagination, exploration, discovery, learning, knowledge, wisdom, experience, skill, talent, expertise, competence, efficiency, effectiveness, performance, productivity, quality, safety, hygiene, comfort, convenience, affordability, accessibility, sustainability, community, society, environment, humanity, compassion, empathy, respect, dignity, trust, integrity, professionalism, excellence, leadership, teamwork, collaboration, communication, coordination, cooperation, dedication, commitment, responsibility, accountability, transparency, honesty, fairness, justice, equality, diversity, inclusion, empowerment, participation, engagement, satisfaction, loyalty, gratitude, appreciation, recognition, celebration, happiness, joy, peace, harmony, love, care, support, encouragement, motivation, inspiration, empowerment, transformation, development, progress, success, prosperity, growth, evolution, innovation, creativity, imagination, exploration, discovery, learning, knowledge, wisdom, experience, skill, talent, expertise, competence, efficiency, effectiveness, performance, productivity, quality, safety, hygiene, comfort, convenience, affordability, accessibility, sustainability, community, society, environment, humanity, compassion, empathy, respect, dignity, trust, integrity, professionalism, excellence, leadership, teamwork, collaboration, communication, coordination, cooperation, dedication, commitment, responsibility, accountability, transparency, honesty, fairness, justice, equality';
  const defaultAuthor = 'Chirag Vijayvergiya';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || defaultTitle}
      titleTemplate={title ? `%s | ${defaultTitle}` : defaultTitle}
      meta={[
        {
          name: 'description',
          content: description || defaultDescription,
        },
        {
          name: 'keywords',
          content: keywords || defaultKeywords,
        },
        {
          name: 'author',
          content: author || defaultAuthor,
        },
        ...meta,
      ]}
    />
  );
};

export default SEO;
