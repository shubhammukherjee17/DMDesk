import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToCSV(objArray: any[]) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  // Header
  if (array.length > 0) {
    let line = '';
    for (var index in array[0]) {
      if (line != '') line += ','
      line += index;
    }
    str += line + '\r\n';
  }

  // Data
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (var index in array[i]) {
      if (line != '') line += ','

      // Handle commas inside values by wrapping in quotes
      const value = array[i][index]?.toString() || '';
      const escapedValue = value.includes(',') ? `"${value}"` : value;

      line += escapedValue;
    }
    str += line + '\r\n';
  }

  return str;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
