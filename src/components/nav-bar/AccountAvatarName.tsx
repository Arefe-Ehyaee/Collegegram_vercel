interface AccountAvatarNameProps {
  username: string;
  avatar: string;
  onClick?: () => void; 
}

const AccountAvatarName = (props: AccountAvatarNameProps) => {
  const { avatar, username, onClick } = props;

  return (
    <li dir="rtl" className="flex flex-row gap-3 items-center cursor-pointer py-1 px-4 hover:bg-grey-500 rounded-3xl" onClick={onClick}>
      <img src={avatar} alt="account avatar image" className="h-10 aspect-square rounded-full border border-grey-200"/>
      <p>{username}</p>
    </li>
  );
};

export default AccountAvatarName;
