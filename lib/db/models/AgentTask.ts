import mongoose, { Schema, Model, Document } from "mongoose";
import { AGENT_TYPES, TASK_PRIORITY, TASK_STATUS, IMPACT_METRICS } from "../enums";
import type { AgentType, TaskPriority, TaskStatus, ImpactMetric } from "../enums";

export interface EstimatedImpact {
  metric: ImpactMetric;
  estimate: number;
}

export interface ActualResult {
  metric: ImpactMetric;
  value: number;
}

export interface IAgentTask extends Document {
  agentType: AgentType;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
  description: string;
  reasoning: string;
  implementationSteps: string[];
  estimatedImpact: EstimatedImpact;
  actualResults?: ActualResult[];
  implementedAt?: Date;
  completedAt?: Date;
  relatedPageIds: mongoose.Types.ObjectId[];
  dataSnapshot: Record<string, unknown>;
  sourceUrls: string[];
  confidence: number;
  createdAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}

const AgentTaskSchema = new Schema(
  {
    // Task info
    agentType: { type: String, enum: AGENT_TYPES, required: true, index: true },
    priority: { type: String, enum: TASK_PRIORITY, required: true, index: true },
    status: {
      type: String,
      enum: TASK_STATUS,
      required: true,
      default: "pending",
      index: true
    },

    // Content
    title: { type: String, required: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 1200 },
    reasoning: { type: String, required: true, maxlength: 5000 },
    implementationSteps: {
      type: [String],
      required: true,
      validate: [
        (a: string[]) => a.length >= 1 && a.length <= 20,
        'Must have 1-20 implementation steps'
      ],
    },
    estimatedImpact: {
      metric: {
        type: String,
        enum: IMPACT_METRICS,
        required: true,
      },
      estimate: { type: Number, required: true },
    },

    // Results
    actualResults: {
      type: [
        {
          metric: { type: String, enum: IMPACT_METRICS, required: true },
          value: { type: Number, required: true },
        },
      ],
      default: [],
    },
    implementedAt: { type: Date },
    completedAt: { type: Date },

    // Metadata
    relatedPageIds: { type: [Schema.Types.ObjectId], ref: "Page", default: [] },
    dataSnapshot: { type: Schema.Types.Mixed, default: {} },
    sourceUrls: {
      type: [String],
      default: [],
      validate: [(a: string[]) => a.length <= 30, 'Maximum 30 source URLs allowed']
    },
    confidence: { type: Number, required: true, min: 0, max: 100 },

    // Timestamps
    approvedAt: { type: Date },
    rejectedAt: { type: Date },
    rejectionReason: { type: String, maxlength: 500 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AgentTaskSchema.index({ status: 1, priority: 1, agentType: 1, createdAt: -1 });

export const AgentTaskModel: Model<IAgentTask> =
  mongoose.models.AgentTask || mongoose.model<IAgentTask>("AgentTask", AgentTaskSchema);
