import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../Context/DarkModeContext';

function AppointmentsChart() {
  const { isDarkMode } = useDarkMode();
  const data = [
    {
      label: 'Mon',
      totalSales: 4000,
      extrasSales: 2400,
    },
    {
      label: 'Tue',
      totalSales: 3000,
      extrasSales: 1398,
    },
    {
      label: 'Wed',
      totalSales: 2000,
      extrasSales: 9800,
    },
    {
      label: 'Thu',
      totalSales: 2780,
      extrasSales: 3908,
    },
    {
      label: 'Fri',
      totalSales: 1890,
      extrasSales: 4800,
    },
    {
      label: 'Sat',
      totalSales: 2390,
      extrasSales: 3800,
    },
    {
      label: 'Sun',
      totalSales: 3490,
      extrasSales: 4300,
    },
  ];

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <div className="flex flex-col rounded-md border-[1px] border-solid border-grey-100 bg-grey-0 p-[1rem_0.4rem] shadow-2xl shadow-indigo-200 dark:border-slate-900 dark:bg-slate-900 dark:shadow-slate-800 md:p-[2.4rem_0.8rem]">
      <h2 className="mx-auto mb-4 text-xl font-semibold tracking-wider dark:text-grey-300">
        Appointments from last week
      </h2>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AppointmentsChart;
