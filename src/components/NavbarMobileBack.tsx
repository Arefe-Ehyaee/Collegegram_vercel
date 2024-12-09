import { useNavigate } from "react-router-dom";
import back from "../assets/icons/back.svg";


const NavbarMobileBack = () => {

  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 w-full bg-grey-100 md:hidden">
      <div className="flex justify-between px-6 py-5">
        <button onClick={()=>navigate("/userprofile")}>
          <img src={back} alt="menu" />
        </button>
      </div>
    </div>
  );
};

export default NavbarMobileBack;
