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

export const updateTask = async (
  id: string,
  state: FormState,
  formData: FormData
) => {
  const updateTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: Boolean(formData.get("isCompleted")),
  };

  try {
    // DB接続確立
    await connectDb();
    // タスクの更新
    await TaskModel.updateOne({ _id: id }, updateTask);
  } catch (error) {
    state.error = "タスクの更新に失敗しました";
    return state;
  }

  // リダイレクトはtrycatchの外で行う
  redirect("/");
};

/**
 * ご認識の通り実際のところServer ActionsでもAPIでも実装は可能です。
 * 使い分けに関しては、開発するアプリケーションやその時の状況によるという回答になってしまうのですが、個人的な考えとしては
 * ・規模が小さくロジックがシンプルな場合：Server Actions
 * ・中規模以上で複雑なロジックを実装する場合：API
 * が適しているかと思います。
 *
 * Server Actionsは記述量を減らしたりパフォーマンスを向上させるメリットがありますが、APIのほうが柔軟性が高く将来的にバックエンドをGo言語などより高パフォーマンスなものに分離したいといった状況にも対応しやすくなるためです。
 *
 * ただし、Server Actionsはまだ過渡期であり今後のアップデートによってより進化したり、ベストプラクティスが確立される可能性もありますので、あくまで現時点の参考情報としてご理解頂けますと幸いです。
 */
