
import { ReactNode } from "react";
import { Card, CardContent } from "../components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
}

export function StatCard({ title, value, icon, className = "", iconClassName = "" }: StatCardProps) {
  return (
    <Card className={`${className} overflow-hidden`}>
      <CardContent className="p-6 flex items-center">
        <div className={`p-3 rounded-lg ${iconClassName || "bg-blue-100"} mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
        </div>
      </CardContent>
    </Card>
  );
}
