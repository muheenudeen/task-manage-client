import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-800 mb-6">
          Welcome to Taskify
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Streamline your productivity with our intuitive task management solution.
        </p>
        <button className="flex items-center justify-center w-full sm:w-auto text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <Image
          src="/Screenshot (89).png"
          alt="Task Management"
          width={600}
          height={600}
          className="rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
}
