import { Outlet } from "react-router"

function Dashboard() {
  return (
    <div className="bg-gray-900 p-8">
      <h4>Dashboard</h4>
      <span>Teste 01</span>
      <span><Outlet /></span>
    </div>
  )
}

export default Dashboard