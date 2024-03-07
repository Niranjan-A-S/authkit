import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}>🔐 Auth</h1>
        <p className="text-lg text-white">A simple authentication service</p>
      </div>
    </main>
  );
}
