import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-red-500 mb-5">スタイルテスト</h1>
      <p className="text-blue-500 mb-5">この文字は青色になるはずです</p>
      
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-green-200 p-4 rounded">グリーンの背景</div>
        <div className="bg-yellow-200 p-4 rounded">イエローの背景</div>
      </div>
      
      <Button variant="default" className="mr-2">デフォルトボタン</Button>
      <Button variant="destructive">デストラクティブボタン</Button>
    </div>
  );
}
