import Link from "next/link";
import {
  FileText,
  Eye,
  MousePointerClick,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - would come from database in production
const stats = {
  totalPages: 32,
  publishedPages: 28,
  draftPages: 4,
  totalViews: 145230,
  affiliateClicks: 3420,
  estimatedRevenue: 1250,
};

const recentPages = [
  { slug: "hanoi", title: "Hanoi Travel Guide", status: "published", views: 12450 },
  { slug: "ho-chi-minh-city", title: "Ho Chi Minh City Guide", status: "published", views: 11200 },
  { slug: "ha-long-bay", title: "Ha Long Bay Guide", status: "published", views: 9800 },
  { slug: "hoi-an", title: "Hoi An Travel Guide", status: "draft", views: 0 },
];

const pendingTasks = [
  { title: "Update visa requirements for 2025", priority: "high", agent: "content" },
  { title: "Optimize meta descriptions for destinations", priority: "medium", agent: "seo" },
  { title: "Add affiliate links to top 5 pages", priority: "high", agent: "conversion" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back. Here&apos;s an overview of your site.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Pages
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPages}</div>
            <p className="text-xs text-gray-500">
              {stats.publishedPages} published, {stats.draftPages} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Affiliate Clicks
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.affiliateClicks.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              2.4% click-through rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Est. Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.estimatedRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">This month (estimated)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Pages</CardTitle>
            <Link
              href="/admin/pages"
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div
                  key={page.slug}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="font-medium text-gray-900 hover:text-emerald-600"
                    >
                      {page.title}
                    </Link>
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        page.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {page.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {page.views > 0 ? `${page.views.toLocaleString()} views` : "-"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Agent Tasks</CardTitle>
            <Link
              href="/admin/tasks"
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {task.agent} agent • {task.priority} priority
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/pages/new"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Create New Page
            </Link>
            <Link
              href="/admin/tasks"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Review Tasks
            </Link>
            <Link
              href="/api/revalidate"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Cache
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
