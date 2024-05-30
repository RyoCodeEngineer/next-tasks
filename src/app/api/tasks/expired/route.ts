import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  /**
   * yyyy-MM-dd に変換
   */
  const currentDate = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  try {
    await connectDb();
    const completedTasks: TaskDocument[] = await TaskModel.find({
      dueDate: { $lt: currentDate }, // $lt: より小さい
      isCompleted: false,
    });

    return NextResponse.json({
      message: "タスク取得成功",
      tasks: completedTasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

/**
 * キャッシュを使用せず、最新のデータを取得するため
 */
export const dynamic = "force-dynamic";
