import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

// This is sample data.
import { sidebarList } from "../lib/sidebar-list";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="https://staticxl.ext.xlaxiata.co.id/s3fs-public/xlfavicon.png"
            alt="App Logo"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.2 }}>
              SNB Docs
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
                        >
                         
                        </span>
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
    </Sidebar>
  );
}
