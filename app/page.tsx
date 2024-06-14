"use client";

import { Tldraw } from "@tldraw/tldraw";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Tldraw persistenceKey="snapsite" />
    </main>
  );
}
