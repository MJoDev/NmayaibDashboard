import { MetricCard } from "@/components/metric-card"
import { AlertsTable } from "@/components/alerts-table"
import { Chart } from "@/components/chart"

const metrics = [
  { title: "Deposits", value: "$53,000", percentage: 55 },
  { title: "Withdrawal", value: "$53,000", percentage: 55 },
  { title: "Cash", value: "$53,000", percentage: 55 },
]

const alerts = [
  { id: "U2345678", client: "Carlos Perez", businessUnit: "Suiza", rep: "Carlos Perez", status: "HIGH" },
  { id: "U2345671", client: "Laura Perrier", businessUnit: "Panama", rep: "Carlos Perez", status: "MODERATE" },
  // Add more alerts as needed
]

// Sample data for charts
const chartData = {
  labels: ["Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023", "Nov 2023"],
  data: [4000, 4200, 4500, 4300, 4566.48],
}


export default function Home() {
    return (
      <div className="flex bg-gray-50 rounded-lg">
      <main className="flex-1 p-6">
        <div className="mb-6 grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
        
        <div className="mb-6 grid grid-cols-2 gap-6">
          <Chart
            title="Assets Under Management"
            value={4566.48}
            percentage={1.66}
            data={chartData.data}
            labels={chartData.labels}
          />
          <Chart
            title="Revenue"
            value={4566.48}
            percentage={1.66}
            data={chartData.data}
            labels={chartData.labels}
          />
        </div>

        <AlertsTable alerts={alerts} />
      </main>
    </div>
    );
  }