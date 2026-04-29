import { Navigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const isAdmin = localStorage.getItem("isAdmin")

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}

export default ProtectedRoute