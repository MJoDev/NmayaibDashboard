import { MetricCard } from "@/components/metric-card"
import { AlertsTable } from "@/components/alerts-table"
import { Chart } from "@/components/chart"
import { PieChartComponent } from "@/components/pie-chart"
import { useEffect } from "react"
import axios from "axios";
export default function Home() {

  const [assetClassData, setAssetClassData] = useState([]);
  const [investmentTypeData, setInvestmentTypeData] = useState([]);
  const [ Alerts, setAlerts ] = useState([]);
  const [ Metrics, setMetrics ] = useState([]);
  const [totalValue, setTotalValue] = useState(null); 
  const [chartData, setChartData] = useState(null);
  const [percentageChange, setPercentageChange] = useState(0); 
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
      // Calcular el inicio y fin del mes actual
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      // Primer día del mes actual
      const fecha_inicio = new Date(year, month, 1).toISOString().split('T')[0];

      // Último día del mes actual
      const fecha_fin = new Date(year, month + 1, 0).toISOString().split('T')[0];
  
      // Llamar al endpoint /api/v1/Actividad/getSumByTypeAndDateRange
      const actividadResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Actividad/getSumByTypeAndDateRange`, {
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
      const cashResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/holding/getLastCash`);
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

  // Función para obtener los datos históricos del backend
  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/holding/getTotalValuePerFecha`, { method: 'GET' });
      const data = await response.json();
      if (data.success) {
        return data.total_value; // Devuelve el array de datos históricos
      } else {
        throw new Error('Error fetching historical data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para transformar los datos al formato esperado
  const transformDataForChart = (historicalData) => {
    // Ordenar los datos por fecha
    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Extraer las fechas y valores
    const dates = sortedData.map((item) => new Date(item.date));
    const values = sortedData.map((item) => item.total);

    // Calcular el valor total (último valor)
    const totalValue = values[values.length - 1];

    // Calcular el porcentaje de cambio
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const percentageChange = ((lastValue - firstValue) / firstValue) * 100;

    // Función auxiliar para generar etiquetas
    const generateLabels = (type, count) => {
      switch (type) {
        case "1d":
          return Array.from({ length: count }, (_, i) => `${10 + i}:00`);
        case "5d":
          return Array.from({ length: count }, (_, i) => `Day ${i + 1}`);
        case "1m":
          return Array.from({ length: count }, (_, i) => `Week ${i + 1}`);
        case "6m":
          return Array.from({ length: count }, (_, i) => `Month ${i + 1}`);
        case "1y":
          return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        case "5y":
          return Array.from({ length: count }, (_, i) => `${2019 + i}`);
        case "Max":
          return Array.from({ length: count }, (_, i) => `${2010 + i * 5}`);
        default:
          return [];
      }
    };

      // Construir el objeto chartData
      const chartData = {
        "1d": {
          labels: generateLabels("1d", 5),
          data: values.slice(0, 5), // Tomar los primeros 5 valores
        },
        "5d": {
          labels: generateLabels("5d", 5),
          data: values.slice(0, 5), // Tomar los primeros 5 valores
        },
        "1m": {
          labels: generateLabels("1m", 4),
          data: values.slice(0, 4), // Tomar los primeros 4 valores
        },
        "6m": {
          labels: generateLabels("6m", 6),
          data: values.slice(0, 6), // Tomar los primeros 6 valores
        },
        "1y": {
          labels: generateLabels("1y", 12),
          data: values.slice(0, 12), // Tomar los primeros 12 valores
        },
        "5y": {
          labels: generateLabels("5y", 5),
          data: values.slice(0, 5), // Tomar los primeros 5 valores
        },
        Max: {
          labels: generateLabels("Max", 4),
          data: values.slice(0, 4), // Tomar los primeros 4 valores
        },
      };

      return { chartData, totalValue, percentageChange };
    };

    useEffect(() => {
      fetchPieData();
      fetchAndAdaptAlerts().then(setAlerts);
      fetchMetrics().then(setMetrics);
      const fetchChartData = async () => {
        const historical = await fetchHistoricalData();

          // Transformar los datos al formato esperado por el Chart
          const { chartData: transformedData, totalValue, percentageChange } = transformDataForChart(historical);

          setChartData(transformedData);
          setTotalValue(totalValue);
          setPercentageChange(percentageChange);
      };

      fetchChartData();
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
                  value={totalValue}
                  percentage={percentageChange}
                  initialData={chartData}
                />
            </div>
            
          </div>

          <AlertsTable alerts={Alerts} />
          
        </main>
    </div>
    );
  }