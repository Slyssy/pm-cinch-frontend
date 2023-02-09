import React from 'react';
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const sumActualExpenses = (array, expenseType) => {
  const total = +array
    .filter((expense) => expense.expense_type.toLowerCase() === expenseType)
    .map((expense) => +expense.expense_amount)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  return total;
};

const StackedBarChart = (props) => {
  const data = [
    {
      name: 'Budgeted',
      Lab: +props.budgetedLabor,
      Mat: +props.budgetedMaterial,
      Sub: +props.budgetedSubcontractor,
      Misc: +props.budgetedMiscellaneous,
      Rev: +props.budgetedRevenue,
      GP:
        +props.budgetedRevenue -
        (
          +props.budgetedLabor +
          +props.budgetedMaterial +
          +props.budgetedSubcontractor +
          +props.budgetedMiscellaneous
        ).toFixed(2),
    },
    {
      name: 'Actual',
      Lab: sumActualExpenses(props.expenses[0], 'labor'),
      Mat: sumActualExpenses(props.expenses[0], 'material'),
      Sub: sumActualExpenses(props.expenses[0], 'subcontractor'),
      Misc: sumActualExpenses(props.expenses[0], 'miscellaneous'),
      Rev: props.budgetedRevenue,
      GP:
        props.budgetedRevenue -
        (
          sumActualExpenses(props.expenses[0], 'labor') +
          sumActualExpenses(props.expenses[0], 'material') +
          sumActualExpenses(props.expenses[0], 'subcontractor') +
          sumActualExpenses(props.expenses[0], 'miscellaneous')
        ).toFixed(2),
    },
  ];
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Lab' stackId='a' fill='#1e3a77' />
        <Bar dataKey='Mat' stackId='a' fill='#be5683' />
        <Bar dataKey='Sub' stackId='a' fill='#edbe6e' />
        <Bar dataKey='Misc' stackId='a' fill='#baffdf' />
        <Bar dataKey='GP' stackId='a' fill='#85ab08' />
        <Bar dataKey='Rev' fill='#5d1451' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
