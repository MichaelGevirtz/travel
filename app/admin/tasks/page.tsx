"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - would come from API in production
const mockTasks = [
  {
    _id: "1",
    title: "Update Ho Chi Minh City guide with new hotel recommendations",
    description:
      "The top-rated hotels section needs updating with 2025 recommendations. Current hotels are outdated.",
    agentType: "content",
    priority: "high",
    status: "pending",
    confidence: 85,
    estimatedImpact: { metric: "pageviews", estimate: 15 },
    createdAt: "2025-01-18",
    reasoning:
      "Page has high traffic but affiliate CTR is below average. Updated hotel recommendations could improve conversions.",
  },
  {
    _id: "2",
    title: "Optimize meta descriptions for top 10 destination pages",
    description:
      "Current meta descriptions are not compelling enough. CTR on search results is below average.",
    agentType: "seo",
    priority: "medium",
    status: "pending",
    confidence: 78,
    estimatedImpact: { metric: "ctr", estimate: 20 },
    createdAt: "2025-01-17",
    reasoning:
      "Search Console data shows high impressions but low CTR. Better meta descriptions could significantly improve clicks.",
  },
  {
    _id: "3",
    title: "Add affiliate links to Ha Long Bay cruise section",
    description:
      "The cruise recommendations section has no affiliate links despite high engagement.",
    agentType: "conversion",
    priority: "high",
    status: "pending",
    confidence: 92,
    estimatedImpact: { metric: "conversions", estimate: 25 },
    createdAt: "2025-01-16",
    reasoning:
      "Analytics show users spend average 4+ minutes on this section. Adding strategic affiliate links could capture this intent.",
  },
  {
    _id: "4",
    title: "Update visa information for March 2025 changes",
    description: "Vietnam is updating e-visa rules. Content needs to reflect new requirements.",
    agentType: "content",
    priority: "high",
    status: "approved",
    confidence: 95,
    estimatedImpact: { metric: "time_on_page", estimate: 10 },
    createdAt: "2025-01-15",
    approvedAt: "2025-01-16",
    reasoning:
      "Visa guide is top-5 page by traffic. Outdated information could hurt trust and engagement.",
  },
  {
    _id: "5",
    title: "Improve internal linking on Hanoi page",
    description:
      "Hanoi page only has 3 internal links. Should have at least 8 per SEO template.",
    agentType: "seo",
    priority: "low",
    status: "completed",
    confidence: 70,
    estimatedImpact: { metric: "avg_position", estimate: 5 },
    createdAt: "2025-01-10",
    completedAt: "2025-01-14",
    reasoning: "Better internal linking helps SEO and keeps users on site longer.",
  },
];

const priorityColors = {
  high: "text-red-600 bg-red-50",
  medium: "text-yellow-600 bg-yellow-50",
  low: "text-gray-600 bg-gray-50",
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  completed: CheckCircle,
  failed: AlertTriangle,
};

export default function AdminTasksPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<string>("");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    const matchesAgent = !selectedAgent || task.agentType === selectedAgent;
    return matchesStatus && matchesAgent;
  });

  const pendingCount = mockTasks.filter((t) => t.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Agent Tasks</h1>
        <p className="text-gray-600 mt-1">
          Review and manage AI-generated improvement suggestions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-600">
              {mockTasks.filter((t) => t.status === "completed").length}
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {mockTasks.filter((t) => t.status === "approved").length}
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              {mockTasks.filter((t) => t.status === "rejected").length}
            </div>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Filter:</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedStatus === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("")}
          >
            All
          </Button>
          <Button
            variant={selectedStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("pending")}
          >
            Pending
          </Button>
          <Button
            variant={selectedStatus === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("approved")}
          >
            Approved
          </Button>
          <Button
            variant={selectedStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("completed")}
          >
            Completed
          </Button>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            variant={selectedAgent === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAgent("")}
          >
            All Agents
          </Button>
          <Button
            variant={selectedAgent === "content" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAgent("content")}
          >
            Content
          </Button>
          <Button
            variant={selectedAgent === "seo" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAgent("seo")}
          >
            SEO
          </Button>
          <Button
            variant={selectedAgent === "conversion" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAgent("conversion")}
          >
            Conversion
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const StatusIcon = statusIcons[task.status as keyof typeof statusIcons];

          return (
            <Card key={task._id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      task.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : task.status === "completed"
                        ? "bg-emerald-100 text-emerald-600"
                        : task.status === "approved"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <StatusIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            priorityColors[task.priority as keyof typeof priorityColors]
                          }
                        >
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {task.agentType}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Reasoning:</strong> {task.reasoning}
                      </p>
                      <div className="flex items-center gap-6 mt-3 text-sm">
                        <span className="text-gray-600">
                          <strong>Confidence:</strong> {task.confidence}%
                        </span>
                        <span className="text-gray-600">
                          <strong>Expected Impact:</strong> +{task.estimatedImpact.estimate}%{" "}
                          {task.estimatedImpact.metric.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {task.status === "pending" && (
                      <div className="flex gap-3 mt-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button variant="ghost">View Details</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No tasks found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
