import rcLogo from "../assets/icons/rclogo.svg";
import BottomNavbarMobile from "./BottonNavbarMobile";
import NavbarMobileBack from "./NavbarMobileBack";

interface MainLayoutBackProps {
  mainComponents?: JSX.Element;
  navBar?: JSX.Element;
  children?: React.ReactNode;
}

const MainLayoutBack: React.FC<MainLayoutBackProps> = ({
  mainComponents,
  navBar,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-grey-100">
      <div className="w-3/4 max-md:mt-[67px] max-md:w-full">
        <header className="justify-start">
          <img
            src={rcLogo}
            alt="collegeGram Logo"
            className="ml-20 mt-16 block max-md:hidden"
          />
        </header>
        <main className=" flex-col">{mainComponents}</main>
      </div>
      <div className="block relative w-1/4 right-0 top-0 bottom-0 max-md:hidden">{navBar}</div>
      {children}
      <NavbarMobileBack></NavbarMobileBack>
      <BottomNavbarMobile></BottomNavbarMobile>
    </div>
  );
};

export default MainLayoutBack;
