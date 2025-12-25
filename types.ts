import { ReactNode } from "react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
  image: string;
}

export interface Plan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}
