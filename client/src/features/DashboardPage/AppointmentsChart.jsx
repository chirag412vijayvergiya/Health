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
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import AppointmentsFilter from './AppointmentsFilter';

function AppointmentsChart({ Appointments, numDays }) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalAppointments: Appointments.filter((appointment) =>
        isSameDay(date, new Date(appointment.appointmentDate)),
      ).reduce((acc, cur) => acc + 1, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalAppointments: { stroke: '#4f46e5', fill: '#574ff0' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalAppointments: { stroke: '#4f46e5', fill: '#c7d2fe' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <div className="flex flex-col rounded-md border-[1px] border-solid border-grey-100 bg-grey-0 p-[1rem_0.4rem] font-mono shadow-2xl shadow-indigo-200 dark:border-slate-900 dark:bg-slate-900 dark:shadow-slate-800 md:p-[1rem_1rem]">
      <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
        <h2 className="mx-2 text-lg font-semibold dark:text-grey-300">
          Appointments from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
          {format(allDates.at(-1), 'MMM dd yyyy')}
        </h2>
        <AppointmentsFilter />
      </div>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            domain={[0, 'dataMax + 1']}
            type="number"
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalAppointments"
            type="monotone"
            stroke={colors.totalAppointments.stroke}
            fill={colors.totalAppointments.fill}
            strokeWidth={2}
            name="Total Appointments"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AppointmentsChart;
