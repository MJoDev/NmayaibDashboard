import { MetricCard } from "@/components/metric-card"
import { AlertsTable } from "@/components/alerts-table"
import { Chart } from "@/components/chart"
import { PieChartComponent } from "@/components/pie-chart"


/*

Este es el dashboard. Puedes hacer una simple obtencion de datos y mostrarlas en la interfaz.
No usarias constantes, sino variables de estado que obtendrias a traves de una conexion en tu base de datos.

*/


const metrics = [
  { title: "Deposits", value: "$53,000", percentage: 55 },
  { title: "Withdrawal", value: "$53,000", percentage: 55 },
  { title: "Cash", value: "$53,000", percentage: 55 },
]

const alerts = [
  { id: "U2345678", client: "Carlos Perez", businessUnit: "Suiza", rep: "Carlos Perez", status: "HIGH" },
  { id: "U2345671", client: "Laura Perrier", businessUnit: "Panama", rep: "Carlos Perez", status: "MODERATE" },
  // Añadir mas de ser necesario
]

// Ejemplo de dataset para el chart
const chartData = {
  "1d": {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00"],
    data: [4000, 4050, 4100, 4200, 4300],
  },
  "5d": {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    data: [4000, 4200, 4500, 4300, 4566.48],
  },
  "1m": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [3800, 4000, 4200, 4566.48],
  },
  "6m": {
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    data: [3600, 4000, 4200, 4300, 4500, 4566.48],
  },
  "1y": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [3000, 3200, 3400, 3600, 3800, 4000, 4200, 4300, 4500, 4566.48],
  },
  "5y": {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    data: [2000, 2500, 3000, 4000, 4566.48],
  },
  Max: {
    labels: ["2010", "2015", "2020", "2025"],
    data: [1000, 1500, 3000, 4566.48],
  },
}

const pieChartData = [
  { name: "Stocks", value: 400 },
  { name: "Bonds", value: 300 },
  { name: "Cash", value: 200 },
  { name: "Real Estate", value: 100 },
  { name: "Commodities", value: 50 },
]


export default function Home() {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
          <div className="mb-6">
            <PieChartComponent title="Asset Allocation" data={pieChartData} />  
          </div>
          
          <div className="mb-6 grid gap-6 grid-cols-1 md:grid-cols-2">
            
              <Chart
                title="Assets Under Management"
                value={4566.48}
                percentage={1.66}
                initialData={chartData}
              />
            
              <Chart
                title="Revenue"
                value={4566.48}
                percentage={1.66}
                initialData={chartData}
              />
            
          </div>

          <AlertsTable alerts={alerts} />
          
        </main>
    </div>
    );
  }