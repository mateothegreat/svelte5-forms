import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from "lucide-svelte";

export enum variant {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error"
}

export const variants = {
  [variant.info]: {
    classes: "bg-blue-900 text-white",
    icon: InfoIcon
  },
  [variant.success]: {
    classes: "bg-green-900 text-white",
    icon: CheckCircleIcon
  },
  [variant.warning]: {
    classes: "bg-yellow-900 text-black",
    icon: AlertTriangleIcon
  },
  [variant.error]: {
    classes: "bg-red-900/80",
    icon: XCircleIcon
  }
};
