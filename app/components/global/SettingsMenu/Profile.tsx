"use client";
import Link from "next/link";
import {
  Camera1Icon,
  ColorsIcon,
  Info,
  Lock4Icon,
  Logout2Icon,
  PaletteIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  User3Icon,
} from "../../svgs";
import { DropdownMenu, IconButton } from "..";
import { executeAction } from "@/lib/utils/helpers";
import { redirect, useRouter } from "next/navigation";
import clsx from "clsx";
import { BASE_URL, passwordRegex } from "@/lib/utils/constants";
import { ComponentProps, useState } from "react";
import Input from "../../input";
import Button from "../../button";
import { triggerModal } from "@/store/slices/modal";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { changePassword } from "@/lib/firebase/firebase-auth";
import { triggerNotification } from "@/store/slices/notification";
import Image from "next/image";
import { updateProfile } from "@/controllers/user";
import AnimateInOut from "../AnimateInOut";

export default function ProfileEditView() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const [firstname, setFirstname] = useState("");
  const [photo, setPhoto] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [image, setImage] = useState<{
    file: File | null;
    preview?: string | ArrayBuffer | null;
  }>({ file: null, preview: null });

  const addImage = ({
    preview,
    data,
  }: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }) => {
    console.log({ preview, data });
    setImage({ file: data as any, preview });
  };

  const readURI = (img: Blob, value: File | null) => {
    if (img) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        addImage({
          preview: ev.target?.result,
          // data: ev.target?.result as string,
          data: value,
        });
      };
      return reader.readAsDataURL(img);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const changed = await updateProfile({
        email,
        firstname,
        lastname,
        photo: image.file,
      });
      console.log({ changed });
      // if (!changed)
      //   return dispatch(
      //     triggerNotification({
      //       message: "Operation failed",
      //       icon: Lock4Icon,
      //       type: "error",
      //     })
      //   );

      dispatch(
        triggerNotification({
          message: "Profile Edited Successfully",
          icon: User3Icon,
          type: "success",
        })
      );
    } catch (error) {
      console.error("MODAL_CHANGE_PASSWORD", { error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex w-[98%]_ pl-2 w-full mx-auto py-4 h-full flex-col"
      onSubmit={handleSubmit}
    >
      <h2 className="shrink-0 font-semibold">Edit Profile</h2>
      <div className="flex-1 overflow-auto">
        <div className="rounded-xl relative bg-primary flex items-center justify-center w-full h-52 overflow-clip">
          <Image
            src={
              (image?.preview as string) ||
              auth.user?.photo ||
              "/images/bimbo.png"
            }
            fill
            alt="user"
            className="w-full h-full object-cover bg-gradient-to-t from-black to-transparent"
          />
          {image && (
            <AnimateInOut
              show={image.file !== null}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-4 right-4"
            >
              <IconButton
                type="button"
                onClick={() => setImage({ file: null, preview: null })}
                icon={TrashIcon}
              />
            </AnimateInOut>
          )}
          {/* <button
            type="button"
            className="w-20 absolute h-20 p-4 flex bg-white/10 backdrop-blur-sm rounded-lg items-center justify-center"
          >
            <Camera1Icon className="!stroke-[#FCE1D7]" />
          </button> */}

          <>
            <label
              htmlFor="image"
              className="w-20 absolute h-20 p-4 flex bg-white/10 backdrop-blur-sm rounded-lg items-center justify-center cursor-pointer active:scale-95 transition-all duration-200"
            >
              <Camera1Icon className="w-6 h-6 stroke-primary" />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              multiple={false}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.files ? target.files[0] : null;

                console.log("IMAGE_FILE", { value });

                // @ts-ignore TODO
                //TODO COMEBACK ADD_TYPES
                const img = Object.values<any>(target.files)[0];

                readURI(img, value);
                console.log({ value });
                return setImage(img);
              }}
            />
          </>
        </div>
        <div className="space-y-1 mt-2">
          <div className="flex items-center w-full gap-3">
            <FormInput
              label="First Name"
              type="text"
              placeholder="john"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <FormInput
              label="Last Name"
              type="text"
              placeholder="doe"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <FormInput
            label="Email Address"
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={isDisabled}
          loading={loading}
          className="w-full mt-3 capitalize shrink-0"
        >
          {"save changes"}
        </Button>
      </div>
    </form>
  );
}

const FormInput = ({
  label,
  ...inputProps
}: ComponentProps<typeof Input> & { label: string }) => (
  <div className="space-y-1 w-full">
    <label htmlFor="">
      <small className="font-semibold">{label}</small>
    </label>
    <Input {...inputProps} className="bg-primary-12 rounded-lg" />
  </div>
);
