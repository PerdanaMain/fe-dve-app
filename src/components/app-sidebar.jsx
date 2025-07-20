import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { sidebarList } from "../lib/sidebar-list";
import { User2, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../utils/env";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "../services/auth.service";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AppSidebar({ ...props }) {
  const [userData, setUserData] = useState({});
  const token = secureLocalStorage.getItem(STORAGE_KEY);
  const { mutateAsync } = useMutation({
    mutationFn: (data) => verifyUser(data),
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const response = await mutateAsync(token);
      setUserData(response.data);
    }
    fetchData();
  }, [mutateAsync, token]);

  const handleLogout = () => {
    try {
      console.log("Logout in procces");
      secureLocalStorage.removeItem(STORAGE_KEY);

      toast.success("You are fully logged out!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Sidebar {...props}>
      <Toaster />
      <SidebarHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="https://staticxl.ext.xlaxiata.co.id/s3fs-public/xlfavicon.png"
            alt="App Logo"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.2 }}>
              DVE Docs
            </span>
            <span style={{ fontSize: 12, color: "#888" }}>
              Your trusted IT practitioner guide
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarList.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        <span
                          style={{
                            marginRight: 8,
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        ></span>
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {!userData ? "..." : userData.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
