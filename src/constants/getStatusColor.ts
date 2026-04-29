export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-600"
    case "preparing":
      return "text-blue-600"
    case "delivered":
      return "text-green-600"
    default:
      return ""
  }
}