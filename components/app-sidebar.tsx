import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const items = [
  {
    title: "Craftify.Ai",
    url: "/",
    icon: Home,
  },
  {
    title: "Image Generator",
    url: "Generate",
    icon: Inbox,
  },
  {
    title: "Background Remover",
    url: "Remove",
    icon: Calendar,
  },
  {
    title: "Background Replacer",
    url: "Edit",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "Profile",
    icon: Search,
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
               <UserButton />,
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
