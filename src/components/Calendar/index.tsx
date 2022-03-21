import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Month from './Month';

const Calendar: React.FC<{}> = ({}) => {
  const [today, setToday] = React.useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const date = new Date();
    setToday(date);
    setSelectedMonth(date);
  }, []);

  const changeMonth = (change: number) => {
    const date = new Date(selectedMonth);
    date.setMonth(date.getMonth() + change);
    setSelectedMonth(date);
  };

  return (
    <View>
      <Header selectedMonth={selectedMonth} changeMonth={changeMonth} />
      <Month today={today} selectedMonth={selectedMonth} />
    </View>
  );
};

export default Calendar;
