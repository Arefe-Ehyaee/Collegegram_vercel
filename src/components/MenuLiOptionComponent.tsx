interface MenuLiOptionComponentProps {
  text?: string;
  iconsrc?: string | null;
  handleOnClick?: () => void;
}

const MenuLiOptionComponent = ({
  text,
  iconsrc,
  handleOnClick,
}: MenuLiOptionComponentProps) => {
  return (
    <li className="flex cursor-pointer flex-row items-center rounded-md px-4 py-2 hover:bg-grey-600">
      <button onClick={handleOnClick}>
        <div className="flex">
          {iconsrc && <img src={iconsrc} alt="logo" className="h-5 w-5" />}
          {text && <span className="pr-4">{text}</span>}
        </div>
      </button>
    </li>
  );
};

export default MenuLiOptionComponent;
