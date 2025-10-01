export interface Metric {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  icon?: string;
}

export interface UserByCountry {
  country: string;
  percentage: number;
}

export interface ConversionStep {
  label: string;
  value: number;
  change: number;
  isPositive: boolean;
}
