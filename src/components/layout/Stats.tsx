import { Progressbar } from '../ui/Progressbar';

interface Props {
  label: string;
  stat: string;
}
const Stats = ({ label, stat }: Props) => {
  return (
    <div className="grid grid-cols-[25%_65%_10%] items-center gap-3">
      <p className="text-[1.4rem]">{label}</p>
      <Progressbar width={Number(stat)} />
      <p className="text-[1.4rem] font-bold">
        {Number(stat)}
      </p>
    </div>
  );
};

export default Stats;
