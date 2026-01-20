"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from API in production
const mockPages = [
  {
    _id: "1",
    slug: "hanoi",
    title: "Hanoi Travel Guide",
    status: "published",
    destinationType: "city",
    region: "north",
    analytics: { views: 12450 },
    searchConsole: { impressions: 45000, ctr: 0.028 },
    updatedAt: "2025-01-15",
  },
  {
    _id: "2",
    slug: "ho-chi-minh-city",
    title: "Ho Chi Minh City Travel Guide",
    status: "published",
    destinationType: "city",
    region: "south",
    analytics: { views: 11200 },
    searchConsole: { impressions: 42000, ctr: 0.027 },
    updatedAt: "2025-01-14",
  },
  {
    _id: "3",
    slug: "ha-long-bay",
    title: "Ha Long Bay Complete Guide",
    status: "published",
    destinationType: "beach",
    region: "north",
    analytics: { views: 9800 },
    searchConsole: { impressions: 38000, ctr: 0.026 },
    updatedAt: "2025-01-12",
  },
  {
    _id: "4",
    slug: "hoi-an",
    title: "Hoi An Travel Guide",
    status: "draft",
    destinationType: "city",
    region: "central",
    analytics: { views: 0 },
    searchConsole: { impressions: 0, ctr: 0 },
    updatedAt: "2025-01-10",
  },
  {
    _id: "5",
    slug: "phu-quoc",
    title: "Phu Quoc Island Guide",
    status: "published",
    destinationType: "beach",
    region: "south",
    analytics: { views: 8500 },
    searchConsole: { impressions: 32000, ctr: 0.027 },
    updatedAt: "2025-01-08",
  },
];

export default function AdminPagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filteredPages = mockPages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600 mt-1">
            Manage your destination pages, guides, and blog posts.
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("draft")}
          >
            Drafts
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page._id}>
                <TableCell>
                  <div>
                    <Link
                      href={`/admin/pages/${page._id}`}
                      className="font-medium text-gray-900 hover:text-emerald-600"
                    >
                      {page.title}
                    </Link>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={page.status === "published" ? "default" : "secondary"}
                    className={
                      page.status === "published"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : ""
                    }
                  >
                    {page.status}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{page.destinationType}</TableCell>
                <TableCell className="capitalize">{page.region}</TableCell>
                <TableCell className="text-right">
                  {page.analytics.views.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {page.searchConsole.impressions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {(page.searchConsole.ctr * 100).toFixed(1)}%
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/vietnam/destinations/${page.slug}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Page
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/pages/${page._id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No pages found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
