"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAtom } from 'jotai';
import { sidebarToggleAtom } from "@/store.js";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconChefHat, IconBook, IconSquareRoundedPlus, IconSettings, IconUser } from "@tabler/icons-react";  //icons
import { Pin } from 'lucide-react'; // Icons



export function Sidenav() {
  const links = [
    {
      label: "Recipe Collection",
      href: "/collection",
      icon: (
        <IconBook className="text-accent h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Create a Recipe",
      href: "/createRecipe",
      icon: (
        <IconSquareRoundedPlus className="text-accent h-7 w-7 flex-shrink-0"/>
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUser className="text-accent h-7 w-7 flex-shrink-0"/>
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-accent h-7 w-7 flex-shrink-0"/>
      ),
    }
  ];
  const [open, setOpen] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useAtom(sidebarToggleAtom); // Use the atom

  const handleToggle = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <div className="flex-col bg-background shadow-md shadow-gray-500/50 dark:bg-neutral-800 overflow-hidden h-screen rounded-tr-2xl rounded-br-2xl sticky top-0 flex-shrink-0">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-row justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex justify-between items-center h-16">
              <Logo />
              {open && 
                <Pin
                  onClick={handleToggle}
                  className={cn("cursor-pointer text-white", {
                    "fill-current": sidebarToggle // Conditionally apply white color
                  })}
                />
              }
            </div>
            <div className="mt-8 flex flex-col gap-5">
              <SidebarLink link={links[0]} className="pl-2"/>
              <SidebarLink link={links[1]} className="pl-2"/>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <SidebarLink link={links[2]} className="pl-2"/>
            <SidebarLink link={links[3]} className="pl-2"/>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

const Logo = () => {
  return (
    <div className="font-normal flex flex-col text-sm text-black relative z-20">
      <div className="h-10 w-10 flex justify-center items-center bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
        <IconChefHat className="text-white dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        CookIt
      </motion.span>
    </div>
  );
};