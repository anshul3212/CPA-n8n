import { ChatWidget } from "@/components/ChatWidget";
import { db } from "@/lib/db";

export default async function Home() {
  const [rows] = await db.query(
    "SELECT id, sender, message_text FROM ai_agent_chats1 ORDER BY id DESC LIMIT 10"
  );

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
      <ChatWidget rows={rows} />
    </div>
  );
}
