import { useEffect, useState } from "react";
import stepper1 from "../../assets/icons/stepper1.svg";
import stepper2 from "../../assets/icons/stepper2.svg";
import stepper3 from "../../assets/icons/stepper3.svg";
import uploadPhoto from "../../assets/icons/uploadPhoto.svg";
import TextAreaWithEmojiComponent from "../TextAreaWithEmojiComponent";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../TextInputComponent";
import { useQueryClient } from "@tanstack/react-query";
import Delete from "../../assets/icons/close.svg";
import CustomButton from "../CustomButton";
import ToggleSwitch from "../ToggleButton";
import PostToggleButton from "./PostToggleButton";
import { toast } from "react-toastify";

const getTextDirection = (text: string) => {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(text) ? "rtl" : "ltr";
};

interface EditModalProps {
  onClose: Function;
  postData: BackDataProps;
  postId: string;
}

interface FrontDataProps {
  pictures?: File[];
  caption?: string;
  mentions?: string;
  media: Media[];
  deletedMedia: string[];
  closeFriendsOnly: boolean;
}
interface BackDataProps {
  pictures?: File[];
  caption?: string;
  mentions: string[];
  media: Media[];
  deletedMedia: string[];
  closeFriendsOnly: boolean;
}

interface Media {
  id: string;
  mime: string;
  name: string;
  url: string;
  size: number;
}

const EditPostSchema = z.object({
  caption: z.string().optional(),
  pictures: z
    .any()
    .refine(
      (files) => {
        if (!files || files.length === 0) {
          return true;
        }
        return files.every(
          (file: File) =>
            file?.type.startsWith("image/") && file?.size <= 5 * 1024 * 1024,
        );
      },
      {
        message:
          "فقط می‌توانید عکس انتخاب کنید و حجم عکس‌ها باید کمتر از ۵ مگابایت باشد",
      },
    )
    .optional(),
  mentions: z.string().optional(),
  deletedPhotos: z.array(z.string()).optional(),
  closeFriendsOnly: z.boolean().optional(),
});

const EditPostsModal = ({ onClose, postData, postId }: EditModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FrontDataProps>({
    resolver: zodResolver(EditPostSchema),
  });

  const queryClient = useQueryClient();

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const token: string = localStorage.getItem("token") ?? "";


  useEffect(() => {
    if (postData) {
      setValue("caption", postData.caption || "");
      // setValue("mentions", postData.mentions ? `@${postData.mentions}` : "");
      const m = postData.mentions ? postData.mentions.map(men =>`@${men}`).join(' ') : "" ;
      setValue("mentions", m);

      setValue("closeFriendsOnly", postData.closeFriendsOnly);
    }
  }, [postData, setValue]);

  const handleDeleteEditImage = (index: number, id?: string) => {
    if (id) {
      setDeletedPhotos((prevState) => {
        if (prevState.includes(id)) {
          return prevState.filter((photoId) => photoId !== id);
        } else {
          return [...prevState, id];
        }
      });
    }

    setSelectedPhotos((prevState) => {
      if (!id) {
        const updatedPhotos = prevState.filter((photo, i) => i !== index);
        setValue("pictures", updatedPhotos);
        return updatedPhotos;
      }
      return prevState;
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  const onSubmit = async (data: FrontDataProps) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const formData = new FormData();

    if (isEditing) return; 
    setIsEditing(true);

    if (data.pictures && data.pictures.length > 0) {
      data.pictures.forEach((file) => {
        formData.append("pictures", file);
      });
    }

    formData.append("caption", data.caption || "");

    formData.append("mentions", data.mentions || "");
    formData.append("closeFriendsOnly", String(data.closeFriendsOnly));


    if (deletedPhotos.length > 0) {
      deletedPhotos.forEach((id) => {
        formData.append("deletedMedia[]", id);
      });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        onClose();
        toast.success("ویرایش با موفقیت انجام شد.");
      } else {
        if (responseData.message && responseData.message.includes("No users were found")) {
          toast.error("کاربری پیدا نشد!");
        } 
        else if (Array.isArray(responseData.message) && responseData.message.includes("Mention string format is not correct.")) {
          toast.error("فرمت منشن درست نیست!");
        }
      }
    } catch (error) {
      console.error("Error editing post:", error);
    } finally {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div dir="rtl" className="flex min-w-[360px] flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <div className="flex flex-col items-center">
            <img src={stepper1} alt="progress stepper" className="mb-8" />
            <h3 className="mb-16 text-lg">عکس‌های مورد نظرت رو آپلود کن:</h3>
            <div className="flex max-w-[363px] flex-row flex-wrap gap-2">
              <label htmlFor="pictures" className="cursor-pointer">
                <img
                  src={uploadPhoto}
                  alt="add Edit icon"
                  className="h-[112px] w-[112px]"
                />
              </label>
              <input
                type="file"
                id="pictures"
                multiple
                accept="image/*"
                {...register("pictures", {
                  onChange: (e) => {
                    const files = e.target.files;
                    if (files) {
                      const filesArray = Array.from(files) as File[];
                      setSelectedPhotos((prevState) => {
                        const updatedPhotos = [...prevState, ...filesArray];
                        setValue("pictures", updatedPhotos);
                        return updatedPhotos;
                      });
                    }
                  },
                })}
                className="hidden"
              />
              {selectedPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    className="h-[112px] w-[112px] rounded-3xl object-cover"
                    alt={`Edited ${index}`}
                  />
                  <img
                    src={Delete}
                    alt="delete"
                    className="absolute left-0 top-0"
                    onClick={() => handleDeleteEditImage(index)}
                  />
                </div>
              ))}
              {postData.media.map((media, index) => (
                <div
                  key={media.id}
                  className={`relative ${deletedPhotos.includes(media.id) ? "faded" : ""}`}
                >
                  <img
                    key={index}
                    src={`${media.url}`}
                    className="h-[112px] w-[112px] rounded-3xl object-cover"
                    alt={`media ${index}`}
                  />
                  <img
                    src={Delete}
                    alt="delete"
                    className="absolute left-0 top-0"
                    onClick={() => handleDeleteEditImage(index, media.id)}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-row self-end">
              <CustomButton
                text="پشیمون شدم"
                className="ml-4 !text-black-100"
                handleOnClick={() => onClose()}
              ></CustomButton>

              <CustomButton
                text="بعدی"
                className="bg-red-200"
                handleOnClick={() => setCurrentStep(2)}
              ></CustomButton>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col items-center">
            <img src={stepper2} alt="progress stepper" className="mb-8" />
            <h3 className="mb-16 text-lg">کپشن مورد نظرت رو بنویس:</h3>
            <TextAreaWithEmojiComponent
              name="caption"
              label="کپشن:"
              register={register}
              className="!my-auto !h-[156px] !min-w-[320px]"
              error={errors.caption?.message}
            />
            <div className="mt-8 flex flex-row self-end">
              <CustomButton
                text="پشیمون شدم"
                className="ml-4 !text-black-100"
                handleOnClick={() => setCurrentStep(1)}
              ></CustomButton>

              <CustomButton
                text="بعدی"
                className="bg-red-200"
                handleOnClick={() => setCurrentStep(3)}
              ></CustomButton>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col items-center">
            <img src={stepper3} alt="progress stepper" className="mb-8" />
            <h3 className="mb-16 text-lg">
              اینجا می‌تونی دوستانت رو منشن کنی:
            </h3>
            <InputField
              type="text"
              name="mentions"
              placeholder=""
              register={register}
              error={errors.mentions?.message}
            />
            <ToggleSwitch
              label="فقط نمایش به دوستان نزدیک"
              register={register}
              name="closeFriendsOnly"
              defaultChecked={false}
            />
            <div className="mt-8 flex flex-row self-end">
              <CustomButton
                text="پشیمون شدم"
                className="ml-4 !text-black-100"
                handleOnClick={() => setCurrentStep(2)}
              ></CustomButton>
              <CustomButton
                text="ثبت و انتشار پست"
                className="bg-red-200"
                handleOnClick={handleSubmit(onSubmit)}
              ></CustomButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPostsModal;
