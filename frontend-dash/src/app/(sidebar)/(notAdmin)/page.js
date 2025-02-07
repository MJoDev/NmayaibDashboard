import { MetricCard } from "@/components/metric-card"
import { AlertsTable } from "@/components/alerts-table"
import { Chart } from "@/components/chart"
import { PieChartComponent } from "@/components/pie-chart"
// import { useState } from 'react';

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

export default function Home() {

  const [assetClassData, setAssetClassData] = useState([]);
  const [investmentTypeData, setInvestmentTypeData] = useState([]);

  // Función para obtener los datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${proccess.env.NEXT_PUBLIC_API_URL}/api/v1/holding/getTotalValueAssetClassInvestmentType`);
      const data = await response.json();

      if (data.success) {
        // Procesar los datos para ambos gráficos
        const processedAssetClassData = processDataForPieChart(data.total_value, 'Asset Class');
        const processedInvestmentTypeData = processDataForPieChart(data.total_value, 'Investment Type');

        setAssetClassData(processedAssetClassData);
        setInvestmentTypeData(processedInvestmentTypeData);
      } else {
        console.error('Error fetching data:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processDataForPieChart = (totalValue, groupByField) => {
    // Agrupar los datos por el campo especificado (Asset Class o Investment Type)
    const groupedData = totalValue.reduce((acc, item) => {
      const key = item[groupByField] || 'Unknown'; // Manejar valores nulos
      if (!acc[key]) {
        acc[key] = { name: key, value: 0 };
      }
      acc[key].value += item['Total Value'];
      return acc;
    }, {});

    // Convertir el objeto agrupado en un array
    return Object.values(groupedData);
  };

    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
          <div className="mb-6">
            <PieChartComponent title="Asset Allocation" data={pieChartData} />  
          </div>
          <div className="mb-6 grid gap-6 grid-cols-1 md:grid-cols-2">
            <PieChartComponent title="Asset Class" data={assetClassData} />  
            <PieChartComponent title="Investment Type" data={investmentTypeData} />    
          </div>
          <div className="mb-6 grid gap-6 grid-cols-1 md:grid-cols-1">
            <div className="justify-center flex">
              <Chart
                  title="Assets Under Management"
                  value={4566.48}
                  percentage={1.66}
                  initialData={chartData}
                />
            </div>
            
          </div>

          <AlertsTable alerts={alerts} />
          
        </main>
    </div>
    );
  }