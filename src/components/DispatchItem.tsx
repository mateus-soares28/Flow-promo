import { Activity } from 'lucide-react';

interface DispatchItemProps {
  time: string;
  title: string;
  details: string;
  category: string;
  borderBottom?: boolean;
}

export function DispatchItem({ time, title, details, category, borderBottom = true }: DispatchItemProps) {
  return (
    <div className={`py-4 flex gap-4 ${borderBottom ? 'border-b border-gray-100' : ''}`}>
      <div className="flex items-start gap-1 text-gray-500 text-xs font-medium pt-0.5 shrink-0">
        <Activity size={14} className="opacity-50" />
        {time}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{details}</p>
        <p className="text-xs text-gray-400 mt-0.5">{category}</p>
      </div>
    </div>
  );
}