import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  valueColor?: string;
}

export function StatusCard({ icon, title, value, subtitle, valueColor = "text-gray-900" }: StatusCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold tracking-wider">
        {icon}
        {title}
      </div>
      <div className={`text-3xl font-bold ${valueColor}`}>
        {value}
      </div>
      <div className="text-sm text-gray-500">
        {subtitle}
      </div>
    </div>
  );
}