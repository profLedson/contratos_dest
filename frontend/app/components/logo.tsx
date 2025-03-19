
import { NavLink } from 'react-router'
import logo from '/logo-sesp.png'

function LogoSesp() {
  return (
    <div className="w-full flex items-center justify-center p-8">
       <NavLink to="/">        
        <img className="rounded-full" src={logo} alt="Logo Sesp"/>        
       </NavLink>
    </div>
  )
}

export default LogoSesp