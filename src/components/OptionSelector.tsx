import * as React from "react";
import { ConfigOption } from "../types/Subscription";

interface OptionSelectorProps {
  title: string;
  options: ConfigOption[];
  selectedValue: number | string;
  onSelect: (value: number | string) => void;
}

export function OptionSelector({ title, options, selectedValue, onSelect }: OptionSelectorProps) {
  return (
    <stackLayout className="mb-6">
      <label className="text-lg font-semibold mb-2">{title}</label>
      <flexboxLayout className="flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            className={`mr-2 mb-2 px-4 py-2 rounded-lg ${
              selectedValue === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onTap={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </flexboxLayout>
    </stackLayout>
  );
}</content>