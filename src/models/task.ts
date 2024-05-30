import mongoose, { Document } from "mongoose";

/**
 * タスクの型定義
 */
export interface Task {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

/**
 * タスクドキュメントの型定義
 */
export interface TaskDocument extends Task, Document {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * タスクテーブルの各項目詳細設定
 */
const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt, updatedAt が自動で追加される
);

/**
 * Taskモデルが存在していない場合、taskSchemaを元にモデルを作成する
 */
export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", taskSchema);
