import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export type DialogType = 'info' | 'success' | 'warning' | 'error' | 'confirm'

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  confirm: AlertCircle,
}

const iconColors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
  confirm: "text-accent-purple",
}

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  type?: DialogType
  title: string
  message?: string
  confirmText?: string
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  confirmText = 'OK',
}) => {
  const Icon = icons[type]
  
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <Icon className={cn("h-6 w-6", iconColors[type])} />
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          {message && (
            <AlertDialogDescription>{message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}