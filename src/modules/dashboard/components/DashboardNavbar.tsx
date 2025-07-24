/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react"; 
import { useAuth } from "@/modules/auth/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { Input } from "@/common/components/ui/input";
import { LogOut, User, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/common/stores/searchStore";
import { useAuthStore } from "@/modules/auth/stores/authStores";
import { toast } from "sonner";

export default function DashboardNavbar() {
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();
  const pathname = usePathname();
  const { searchTerm, setSearchTerm } = useSearchStore();
  const searchInputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault(); 
        searchInputRef.current?.focus(); 
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  const showSearchBar = pathname === '/';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="border-b border-b-[#D8D8D8] p-4 min-h-16 flex items-center justify-between bg-white sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1">
        {showSearchBar && (
           <div className="relative w-full max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
             <Input 
                ref={searchInputRef}
                placeholder="Search tasks... (Ctrl+/)" 
                className="pl-10"
                value={searchTerm}
                variant={'borderless'}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-700 hidden sm:inline">
          {user?.username || "Guest"}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative cursor-pointer">
              <img 
                  src={`/Avatar.png`} 
                  alt="Profile Picture" 
                  className="w-10 h-10 rounded-full object-cover" 
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#72E128] border-2 border-white rounded-full"></div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => toast.info("Profile feature coming soon!")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
