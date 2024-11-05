import { ToastActionElement, ToastProps } from "@/app/components/ui/toast"
import * as React from "react"

export interface ExpenseData {
   categoryId: string
   total: number
}

export interface ChartData {
   name: string
   value: number
   fill: string
   category: string
}

export interface CustomTooltipProps {
   active?: boolean
   payload?: Array<{ payload: ChartData }>
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
   'wallet': 'Wallet',
   'credit-card': 'CreditCard',
   'smartphone': 'Smartphone',
   'laptop': 'Laptop',
   'building-bank': 'Landmark',
   'more-horizontal': 'MoreHorizontal',
} as const

export type PaymentIconType = keyof typeof paymentIcons
