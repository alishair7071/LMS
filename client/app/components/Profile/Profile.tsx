"use client";
import { useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import SideBarProfile from "./SideBarProfile";
import { useLogoutUserMutation } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import toast from "react-hot-toast";
import ChangePassword from "./ChangePassword";

type Props = {
  user: any;
}

const Profile = ({ user }: Props) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logoutUser] = useLogoutUserMutation();
  const router = useRouter();


  const logOutHandler = async () => {    
    await signOut({ redirect: false });
    try {
      await logoutUser(undefined).unwrap();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Failed to logout");
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-[#f5f5f5] bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000012] rounded-[5px] shadow-md dark:shadow-sm mt-20 mb-20 sticky ${scroll ? "top-[120px]" : "top-8"
          } left-8`}
      >
        {/* Sticky-Sidebar   */}
        <SideBarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logOutHandler={logOutHandler}
        />

      </div>
      <div className="w-full h-full bg-transparent mt-20">
      {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
      {active === 2 && <ChangePassword />}
      </div>
    </div>
  )
}

export default Profile;