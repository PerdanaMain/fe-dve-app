export const sidebarList = {
  navMain: [
    {
      title: "Equipments",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: "Loader2Icon", // Save icon as a string
          role: ["Admin", "User"],
        },
        {
          title: "Equipments",
          url: "/equipments",
          icon: "Loader2Icon", // Save icon as a string
          role: ["Admin", "User"],
        },
        {
          title: "Maintenance Report",
          url: "#",
          icon: "Loader2Icon", // Save icon as a string
          role: ["Admin", "User"],
        },
      ],
    },
    {
      title: "Control Systems",
      url: "#",
      role: ["Admin"],
      items: [
        {
          title: "Registered Users",
          url: "/registered-users",
          icon: "user-icon", // Save icon as a string
          role: ["Admin"],
        },
      ],
    },
  ],
};
