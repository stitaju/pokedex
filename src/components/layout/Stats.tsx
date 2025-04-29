import { Progressbar } from '../ui/Progressbar';

interface Props {
  label: string;
  stat: string | number;
}
const Stats = ({ label, stat }: Props) => {
  return (
    <div className="grid grid-cols-[25%_65%_10%] items-center gap-3">
      <p>{label}</p>
      <Progressbar width={Number(stat)} />
      <p className="font-bold">{Number(stat)}</p>
    </div>
  );
};

export default Stats;
