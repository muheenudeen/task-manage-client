"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash, FileDown } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import TaskForm from "@/components/taskForm";
import { api } from "@/lib/api";

const STATUSES = ["pending", "progress", "completed"];

export default function DashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("User from context:", user);
  }, [user]);

  const { data: tasksData } = useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: () => {
      if (!user?.id) {
        console.error("User ID is undefined, skipping API call.");
        return Promise.reject("User not logged in");
      }
      return api.tasks.getAll(user.id);
    },
    enabled: !!user?.id,
  });

  const addTaskMutation = useMutation({
    mutationFn: async (task) => {
      if (!user?.id) {
        toast.error("User not authenticated");
        return;
      }
      return await api.tasks.add(user.id, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", user.id]);
      toast.success("Task added successfully");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, task }) => {
      if (!user?.id) {
        toast.error("User not authenticated");
        return;
      }
      return api.tasks.update(user.id, taskId, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", user.id]);
      toast.success("Task updated successfully");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => {
      if (!user?.id) {
        toast.error("User not authenticated");
        return;
      }
      return api.tasks.delete(user.id, taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", user.id]);
      toast.success("Task deleted successfully");
    },
  });

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTaskMutation.mutate({ taskId: editingTask._id, task: taskData });
    } else {
      addTaskMutation.mutate(taskData);
    }
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await api.tasks.downloadPdf(user.id);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `tasks_${user.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download PDF");
    }
  };

  const tasks = tasksData?.data?.tasks || [];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Board</h1>
        <div className="flex gap-4">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800 transition"
          >
            <FileDown className="h-5 w-5" /> Download PDF
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5" /> Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STATUSES.map((status) => (
          <div key={status} className="rounded-lg bg-gray-50 p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold capitalize">
              {status === "progress" ? "In Progress" : status}
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task._id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 transition"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 transition"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
