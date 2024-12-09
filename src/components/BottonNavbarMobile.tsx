import { useState } from "react";
import add from "../assets/icons/add.svg"
import mag from "../assets/icons/Frame.svg"
import overview from "../assets/icons/overview.svg"
import ModalTemplate from "./ModalTemplate";
import UploadPostsModal from "./upload-edit-posts/UploadPostsModal";
import { useNavigate } from "react-router-dom";



const BottomNavbarMobile: React.FC = () => {
  const [uploadModal,setUploadModal] = useState(false)
  const handleCreatePostClick = () => {
    setUploadModal(true)
  }
  const navigate = useNavigate();
  return (
      <div className="md:hidden bg-grey-600 fixed bottom-0 flex h-[56px] items-center justify-center rounded-full border border-grey-400 max-md:w-9/12 ml-14">
        <button className="md:hidden fixed bottom-5 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-red-200" onClick={handleCreatePostClick}>
            <img src={add} alt="add" />
        </button>
        <div className="md:hidden flex justify-between space-x-44">
            <img src={mag} alt="magnifier" className="cursor-pointer" onClick={() => navigate("/searchUsers")}/>
            <img src={overview} alt="overview" className="cursor-pointer" onClick={() => navigate('/explore')}/>
        </div>
        {uploadModal && <ModalTemplate onClose={() => setUploadModal(false)} showModal={uploadModal}>
          <UploadPostsModal onClose={()=>setUploadModal(false)}></UploadPostsModal>
          </ModalTemplate>}
      </div>
  );
};

export default BottomNavbarMobile;
