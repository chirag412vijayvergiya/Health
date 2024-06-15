import { useDarkMode } from '../../Context/DarkModeContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// const startDataLight = [
//   {
//     duration: '0-20 years',
//     value: 0,
//     color: '#0088FE',
//   },
//   {
//     duration: '21-40 years',
//     value: 0,
//     color: '#00C49F',
//   },
//   {
//     duration: '41-60 years',
//     value: 0,
//     color: '#FFBB28',
//   },
//   {
//     duration: '61-80 years',
//     value: 0,
//     color: '#a855f7',
//   },
//   {
//     duration: '81-100 years',
//     value: 0,
//     color: '#FF8042',
//   },
// ];

// const startDataDark = [
//   {
//     duration: '0-20 years',
//     value: 0,
//     color: '#1d4ed8',
//   },
//   {
//     duration: '21-40 years',
//     value: 0,
//     color: '#22c55e',
//   },
//   {
//     duration: '41-60 years',
//     value: 0,
//     color: '#FFBB28',
//   },
//   {
//     duration: '61-80 years',
//     value: 0,
//     color: '#7e22ce',
//   },
//   {
//     duration: '81-100 years',
//     value: 0,
//     color: '#FF8042',
//   },
// ];

// Starting data for light mode
const startDataLight = [
  {
    gender: 'Male',
    value: 0,
    color: '#0088FE',
  },
  {
    gender: 'Female',
    value: 0,
    color: '#FF8042',
  },
  {
    gender: 'Other',
    value: 0,
    color: '#00C49F',
  },
];

// Starting data for dark mode
const startDataDark = [
  {
    gender: 'Male',
    value: 0,
    color: '#1d4ed8',
  },
  {
    gender: 'Female',
    value: 0,
    color: '#f97316',
  },
  {
    gender: 'Other',
    value: 0,
    color: '#22c55e',
  },
];

function prepareData(startData, patients) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.gender === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }
  const data = patients
    .reduce((arr, cur) => {
      const gender = cur.gender;
      if (gender === 'Male') return incArrayValue(arr, 'Male');
      if (gender === 'Female') return incArrayValue(arr, 'Female');
      return incArrayValue(arr, 'Other');
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

// Custom legend formatter
const renderLegendText = (value, entry) => {
  return `${entry.payload.gender}`;
};

function GenderChart({ Genders }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, Genders);

  return (
    <div className="flex flex-col items-center rounded-md border-[1px] border-solid border-grey-100 bg-grey-0 p-[1rem_0.4rem] font-mono shadow-2xl shadow-indigo-200 dark:border-slate-900 dark:bg-slate-900 dark:shadow-slate-800 md:p-[1.8rem_0.8rem]">
      <h2 className="mx-auto mb-4  text-lg font-semibold tracking-wider dark:text-grey-300">
        Patient Gender Summary
      </h2>
      <ResponsiveContainer width="100%" height={310}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={100}
            paddingAngle={6}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            iconSize={14}
            iconType="circle"
            formatter={renderLegendText}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenderChart;
