"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      title="Logout"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}
