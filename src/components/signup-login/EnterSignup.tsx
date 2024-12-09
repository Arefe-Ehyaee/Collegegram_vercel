import { NavLink } from "react-router-dom";

export default function EnterSignup() {
    return (
        <div className="flex gap-x-10 absolute top-36 text-xl">
            <NavLink to='/signup'>ثبت نام </NavLink>
            <span className="block w-px h-8  bg-green-100"></span>
            <NavLink to='/login'>ورود </NavLink>    
        </div>
    )
  }
  