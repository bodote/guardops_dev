import Loader from "@/components/Loader/Loader";
import { getUserRole } from "@/helper/getRole";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Callback = () => {
  const [isUser, setUser] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const getRole = async () => {
    const roles = await getUserRole();
    if (roles) {
      if (roles.includes("Full_Access")) {
        router.push("/projects");
      } else if (roles.includes("Playground")) {
        router.push("/playground");
      } else if (roles.includes("Projects") && roles.includes("Datasets")) {
        router.push("/projectlist");
      } else if (roles.includes("Projects")) {
        router.push("/projectlist");
      } else if (roles.includes("Datasets")) {
        router.push("/datasetlist");
      } else if (roles.includes("Evaluation") && roles.includes("Monitoring")) {
        router.push("/evaluation");
      } else if (roles.includes("Evaluation")) {
        router.push("/evaluation");
      } else if (roles.includes("Monitoring")) {
        router.push("/monitoring");
      } else {
        router.push("/pageprofile");
      }
    }
  };

  const setCookie = async () => {
    const cookie = Cookies.get("user_id");
    if (cookie) {
      setUser(cookie);
    }
    if (!cookie && user) {
      await Cookies.set("user_id", user?.sub);
      setUser(user?.sub);
    }
    await getRole();
  };
  useEffect(() => {
    setCookie();
  }, [user]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default Callback;
