"use server"; // Server Actionsで必須

import { Task, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { redirect } from "next/navigation";

/**
 * Server Actions内でエラーが発生した場合に、その内容を返却するための型を定義
 */
export interface FormState {
  error: string;
}

export const createTask = async (state: FormState, formData: FormData) => {
  const newTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: false,
  };

  try {
    // DB接続確立
    await connectDb();
    // タスクの作成
    await TaskModel.create(newTask);
  } catch (error) {
    state.error = "タスクの作成に失敗しました";
    return state;
  }

  // リダイレクトはtrycatchの外で行う
  redirect("/");
};
