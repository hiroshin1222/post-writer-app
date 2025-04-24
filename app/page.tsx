import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Post writer",
  description: "Udemy app",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button variant="outline">ボタン</Button>
    </main>
  );
}
