interface StatisticLineProps {
  text: string;
  value: string | number;
}

export default function StatisticLine({ text, value }: StatisticLineProps) {
  return (
    <tr>
      <td>{text}</td>
      <td className='value'>{value}</td>
    </tr>
  );
}
