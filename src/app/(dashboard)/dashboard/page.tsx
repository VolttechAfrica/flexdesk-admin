import { AppLayout } from "@components/dashboard/dashboard-layout"


export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4 text-lg">This is a simple dashboard layout.</p>
      </div>
    </AppLayout>
  )
}