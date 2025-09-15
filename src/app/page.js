import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Our Website
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Click the chat widget in the bottom right corner to start a
          conversation!
        </p>
      </main>
      <ChatWidget />
    </div>
  );
}
