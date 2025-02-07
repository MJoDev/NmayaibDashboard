import { MetricCard } from "@/components/metric-card"
import { AlertsTable } from "@/components/alerts-table"
import { Chart } from "@/components/chart"
import { PieChartComponent } from "@/components/pie-chart"
import { useEffect } from "react"


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
  const [ Alerts, setAlerts ] = useState([]);
  const [ Metrics, setMetrics ] = useState([]);
  /*
   * Fetches the data from the backend and processes it for both pie charts.
   */
  const fetchPieData = async () => {
    try {
      // Fetch the data from the backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/holding/getTotalValueAssetClassInvestmentType`);
      const data = await response.json();

      if (data.success) {
        // Process the data for both pie charts
        const processedAssetClassData = processDataForPieChart(data.total_value, 'Asset Class');
        const processedInvestmentTypeData = processDataForPieChart(data.total_value, 'Investment Type');

        // Update the state with the processed data
        setAssetClassData(processedAssetClassData);
        setInvestmentTypeData(processedInvestmentTypeData);
      } else {
        console.error('Error fetching data:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function fetchAndAdaptAlerts() {
    try {
      // Realizar la solicitud GET al endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alerta/latestAlta`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching alerts: ${response.statusText}`);
      }
  
      // Parsear la respuesta JSON
      const data = await response.json();
  
      // Adaptar los datos a la estructura deseada
      const adaptedAlerts = data.map((item) => {
        const alert = item.alert[0]; // Acceder al primer elemento del array `alert`
        return {
          id: `U${alert.holding[0].details[0].cusip}`, // Generar un ID único usando el CUSIP
          client: alert.holding[0].portfolio.client_data.name,
          businessUnit: alert.holding[0].portfolio.bussines_unit,
          rep: alert.holding[0].portfolio.rep_data.name,
          status: alert.prioridad === 'Alta' ? 'HIGH' : 'MODERATE',
        };
      });
  
      return adaptedAlerts;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

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

  async function fetchMetrics() {
    try {
      // Definir el rango de fechas (puedes ajustarlo según tus necesidades)
      const fecha_inicio = "2024-10-16";
      const fecha_fin = "2024-10-23";
  
      // Llamar al endpoint /api/v1/Actividad/getSumByTypeAndDateRange
      const actividadResponse = await axios.post('/api/v1/Actividad/getSumByTypeAndDateRange', {
        fecha_inicio,
        fecha_fin,
      });
  
      // Extraer los totales de la respuesta
      const { Deposit, "Transfer In": TransferIn, Withdrawal, "Transfer Out": TransferOut } =
        actividadResponse.data.total_sum;
  
      // Calcular los valores para Deposits y Withdrawals
      const depositsTotal = Deposit + TransferIn;
      const withdrawalsTotal = Withdrawal + TransferOut;
  
      // Llamar al endpoint /api/v1/holding/getLastCash
      const cashResponse = await axios.get('/api/v1/holding/getLastCash');
      const cashValue = cashResponse.data.message;
  
      // Formatear los datos en el formato esperado por el frontend
      const metrics = [
        { title: "Deposits", value: `$${depositsTotal}`, percentage: calculatePercentage(depositsTotal) },
        { title: "Withdrawal", value: `$${withdrawalsTotal}`, percentage: calculatePercentage(withdrawalsTotal) },
        { title: "Cash", value: `$${cashValue}`, percentage: calculatePercentage(cashValue) },
      ];
  
      console.log(metrics);
      return metrics; // Devolver las métricas para usarlas en tu componente
    } catch (error) {
      console.error("Error fetching metrics:", error);
      return [];
    }
  }

  function calculatePercentage(value) {
    // Ejemplo: Porcentaje basado en un valor máximo arbitrario (ajusta según tu lógica)
    const maxValue = 100000; // Valor máximo para el cálculo del porcentaje
    return Math.round((value / maxValue) * 100);
  }

  useEffect(() => {
    fetchPieData();
    fetchAndAdaptAlerts().then(setAlerts);
    fetchMetrics().then(setMetrics);
  }, []);

    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Metrics.map((metric) => (
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

          <AlertsTable alerts={Alerts} />
          
        </main>
    </div>
    );
  }