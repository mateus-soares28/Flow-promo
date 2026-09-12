import { CheckCircle2, Circle } from 'lucide-react';

interface TaskItemProps {
  title: string;
  subtitle: string;
  completed: boolean;
}

export function TaskItem({ title, subtitle, completed }: TaskItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-900">
        {completed ? <CheckCircle2 size={20} className="fill-gray-900 text-white" /> : <Circle size={20} className="text-gray-300" />}
      </div>
      <div>
        <p className={`text-sm font-medium ${completed ? 'text-gray-900 line-through decoration-gray-400' : 'text-gray-900'}`}>{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}