/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/named */
import { VariantProps } from "class-variance-authority";

"use client";

import { LucideIcon } from "lucide-react";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { History, Crown, Gift, Users, Link as LinkIcon, Star, Download, Phone, BookOpen, MessageSquare, ChevronsRight, ChevronsLeft, X, Home, Settings, User } from "lucide-react";

const sponsorLogos = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/afc-bournemouth-3.png?",
    alt: "AFC Bournemouth",
    width: 60,
    height: 60,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/bologna-fc-1909-4.png?",
    alt: "Bologna FC 1909",
    width: 60,
    height: 60,
  },
];

const mainNavItems = [
  { id: "exclusive", label: "Exclusive", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-exclusive-13.png?", href: "/" },
  { id: "sports", label: "Sports", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-sport-14.png?", href: "/sports" },
  { id: "casino", label: "Casino", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-casino-11.png?", href: "/casino" },
  { id: "slots", label: "Slots", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-slot-10.png?", href: "/slots" },
  { id: "crash", label: "Crash", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-crash-15.png?", href: "/crash" },
  { id: "table", label: "Table", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-table-16.png?", href: "/table" },
  { id: "fishing", label: "Fishing", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-fish-17.png?", href: "/fishing" },
  { id: "arcade", label: "Arcade", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-arcade-18.png?", href: "/arcade" },
  { id: "lottery", label: "Lottery", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d0056af2-0815-473d-a9cf-5eb88c96bde4-bjbaji8-xyz/assets/images/icon-lottery-19.png?", href: "/lottery" },
];

const otherNavItems = [
  { label: "Promotions", icon: Gift, href: "/promos" },
  { label: "VIP Club", icon: Crown, href: "/vip" },
  { label: "Referral program", icon: Users, href: "/referral" },
  { label: "Affiliate", icon: LinkIcon, href: "/affiliate" },
  { label: "Brand Ambassadors", icon: Star, href: "/ambassadors" },
  { label: "APP Download", icon: Download, href: "/app" },
  { label: "Contact Us", icon: Phone, href: "/contact" },
  { label: "New Member Guide", icon: BookOpen, href: "/guide" },
  { label: "BJ Forum", icon: MessageSquare, href: "/forum" },
];

// Dashboard items from second code
const dashboardItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings }
];

// Type definitions
interface NavItem {
  label: string;
  icon: string | LucideIcon;
  href: string;
  id?: string;
}

interface NavLinkProps {
  item: NavItem;
  isExpanded: boolean;
  isActive?: boolean;
}

interface MainNavLinkProps {
  item: NavItem;
  isExpanded: boolean;
  isActive?: boolean;
}

const NavLink = ({ item, isExpanded, isActive = false }: NavLinkProps) => {
  const Icon = item.icon;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={item.href} className={cn(
            "flex items-center text-sm font-medium hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md group transition-colors duration-200",
            isExpanded ? "h-11 px-3" : "h-12 w-12 justify-center",
            isActive ? "text-sidebar-foreground bg-sidebar-accent/[.6]" : "text-sidebar-foreground/80"
          )}>
            {typeof Icon === 'string' ? (
              <Image src={Icon} alt={item.label} width={20} height={20} />
            ) : (
              <Icon className="h-5 w-5" />
            )}
            <span className={cn("ml-4 whitespace-nowrap transition-opacity", isExpanded ? "opacity-100" : "opacity-0 absolute")}>{item.label}</span>
          </Link>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right"><p>{item.label}</p></TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

const MainNavLink = ({ item, isExpanded, isActive = false }: MainNavLinkProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            href={item.href} 
            className={cn(
              "flex items-center text-sm font-medium hover:text-sidebar-foreground hover:bg-sidebar-accent hover:no-underline rounded-md group transition-colors duration-200 w-full",
              isExpanded ? "h-11 px-3" : "h-12 justify-center",
              isActive && "text-sidebar-foreground bg-sidebar-accent/[.6] [background-image:radial-gradient(circle_at_50%_100%,_rgba(0,200,150,0.3)_0%,_rgba(0,200,150,0)_65%)]"
            )}
          >
            <div className={cn("flex items-center", isExpanded ? "" : "w-full justify-center")}>
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center bg-transparent", !isExpanded ? "mx-auto" : "")}>
                <Image src={item.icon as string} alt={item.label} width={28} height={28} style={isActive ? { filter: 'brightness(0) saturate(100%) invert(84%) sepia(23%) saturate(3025%) hue-rotate(334deg) brightness(101%) contrast(98%)'} : {}} />
              </div>
              <span className={cn("font-medium text-sm whitespace-nowrap transition-all duration-300", isExpanded ? "ml-3 opacity-100" : "opacity-0 w-0 -ml-3")}>
                {item.label}
              </span>
            </div>
          </Link>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right"><p>{item.label}</p></TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

const DashboardNavLink = ({ item, isExpanded, isActive = false }: { item: typeof dashboardItems[0], isExpanded: boolean, isActive?: boolean }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            href={item.href} 
            className={cn(
              "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium",
              isActive ? "bg-gray-700 text-white" : "text-gray-300"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className={cn("whitespace-nowrap transition-all duration-300", isExpanded ? "opacity-100" : "opacity-0 w-0")}>
              {item.name}
            </span>
          </Link>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right"><p>{item.name}</p></TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Listen for mobile menu toggle event from header
  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('toggleMobileMenu', handleToggle);
    return () => window.removeEventListener('toggleMobileMenu', handleToggle);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-sidebar-background z-[70] flex flex-col transition-all duration-300 ease-in-out",
        // Mobile styles
        "md:hidden w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop styles
        "md:flex md:translate-x-0",
        isExpanded ? "md:w-64" : "md:w-16"
      )}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-4 h-[60px] border-b border-sidebar-border/50">
          <span className="text-lg font-semibold">Menu</span>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileOpen(false)}
            className="h-9 w-9"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-shrink-0 hidden md:block">
          {isExpanded && (
            <div className="flex items-center justify-center p-4 h-[92px] border-b border-sidebar-border/50">
              {sponsorLogos.map((logo) => (
                <Image key={logo.alt} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="object-contain" />
              ))}
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 space-y-1" style={{ scrollbarWidth: 'none' }}>
          {/* Dashboard Section */}
          <div className={cn("mb-4", isExpanded || isMobileOpen ? "px-4" : "px-2")}>
            <h2 className={cn(
              "text-xl font-semibold mb-4 text-sidebar-foreground transition-all duration-300",
              isExpanded || isMobileOpen ? "opacity-100" : "opacity-0 h-0 mb-0 overflow-hidden"
            )}>
              Dashboard
            </h2>
            <ul className={cn("space-y-2", isExpanded || isMobileOpen ? "" : "flex flex-col items-center")}>
              {dashboardItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name} className="w-full">
                    <DashboardNavLink 
                      item={item} 
                      isExpanded={isExpanded || isMobileOpen}
                      isActive={isActive}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={cn("flex flex-col items-center space-y-2", isExpanded || isMobileOpen ? "px-4" : "px-2")}>
            <NavLink 
              item={{ label: 'History', href: '#', icon: History }} 
              isExpanded={isExpanded || isMobileOpen} 
              isActive={false}
            />
            <NavLink 
              item={{ label: 'VIP', href: '#', icon: Crown }} 
              isExpanded={isExpanded || isMobileOpen} 
              isActive={false}
            />
          </div>

          <div className={cn("flex flex-col items-center space-y-1 mt-2", isExpanded || isMobileOpen ? "px-4" : "px-2")}>
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <MainNavLink 
                  key={item.id} 
                  item={item} 
                  isExpanded={isExpanded || isMobileOpen}
                  isActive={isActive}
                />
              );
            })}
          </div>
          
          <div className="pt-2 mt-2 border-t border-sidebar-border/50">
            <div className={cn("flex flex-col items-center space-y-1", isExpanded || isMobileOpen ? "px-4" : "px-2")}>
              {otherNavItems.map(item => (
                <NavLink 
                  key={item.label} 
                  item={item} 
                  isExpanded={isExpanded || isMobileOpen} 
                  isActive={false}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden md:block flex-shrink-0 p-2 border-t border-sidebar-border/50">
          <Button variant="ghost" className="w-full text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronsLeft className="h-5 w-5" /> : <ChevronsRight className="h-5 w-5" />}
          </Button>
        </div>
      </aside>
    </>
  );
}

// Alternative simple sidebar component (from your second code)
export function SimpleSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-2">
        {dashboardItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
