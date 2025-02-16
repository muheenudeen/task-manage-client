import { useState } from "react";
import { api } from "@/lib/api";


export default function TaskList({ userId }) {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    try {
      setLoading(true);
      const response = await api.tasks.downloadPdf(userId);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `tasks_${userId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={downloadPDF}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        {loading ? "Generating PDF..." : "Download Tasks as PDF"}
      </button>
    </div>
  );
}
