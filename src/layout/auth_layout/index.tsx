import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
  <div className="w-full max-w-lg">
    <Outlet />
  </div>
</div>
  )
}

export default AuthLayout