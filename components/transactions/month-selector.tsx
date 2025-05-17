"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface MonthSelectorProps {
  months: string[];
  selectedMonth: string;
  onChange: (month: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  months,
  selectedMonth,
  onChange,
}) => {
  // Format the month for display (YYYY-MM to Month YYYY)
  const formatMonth = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          {formatMonth(selectedMonth)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[200px] max-h-[300px] overflow-y-auto"
      >
        {months.map((month) => (
          <DropdownMenuItem
            key={month}
            className={`cursor-pointer ${
              month === selectedMonth ? "bg-accent" : ""
            }`}
            onClick={() => onChange(month)}
          >
            {formatMonth(month)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MonthSelector;
