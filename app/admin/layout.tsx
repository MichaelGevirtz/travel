import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, FileText, ListTodo, BarChart3, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | Vietnam Insider",
    template: "%s | Admin | Vietnam Insider",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Tasks", href: "/admin/tasks", icon: ListTodo },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-emerald-400">Vietnam</span>
            <span>Insider</span>
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View Site →
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] hidden md:block">
          <nav className="p-4">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
