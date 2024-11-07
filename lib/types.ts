import { ToastActionElement, ToastProps } from "@/app/components/ui/toast"
import * as React from "react"
import {
   Wallet,
   CreditCard,
   Smartphone,
   Laptop,
   Landmark,
   MoreHorizontal
} from "lucide-react";

export interface ExpenseData {
   categoryId: string
   total: number
}

export interface BudgetComparisonChartData {
   month: string;
   spending: number;
   remaining: number;
   total: number;
}

export interface BudgetComparisonChartTooltipProps {
   active?: boolean;
   payload?: Array<{
      value: number;
      payload: BudgetComparisonChartData;
   }>;
}

export interface SpendingPieChartData {
   name: string
   value: number
   fill: string
   category: string
}

export interface SpendingPieChartTooltipProps {
   active?: boolean
   payload?: Array<{ payload: SpendingPieChartData }>
}

export interface CustomLabelProps {
   cx: number
   cy: number
   midAngle: number
   innerRadius: number
   outerRadius: number
   percent: number
}

export type ToasterToast = ToastProps & {
   id: string
   title?: React.ReactNode
   description?: React.ReactNode
   action?: ToastActionElement
}

export interface State {
   toasts: ToasterToast[]
}

export const paymentIcons = {
   'wallet': Wallet,
   'credit-card': CreditCard,
   'smartphone': Smartphone,
   'laptop': Laptop,
   'building-bank': Landmark,
   'more-horizontal': MoreHorizontal,
} as const

export type PaymentIconType = keyof typeof paymentIcons
