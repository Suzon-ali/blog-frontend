
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { useGetAllBlogsQuery } from '../../../redux/features/blog/blogSlice';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);
  // Data for charts
  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Visitors',
        data: [120, 150, 100, 200, 180, 230, 300],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const blogDistributionData = {
    labels: ['Published', 'Drafts', 'Archived'],
    datasets: [
      {
        label: 'Blogs',
        data: [60, 30, 10],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow-md relative">
          <div className="flex items-center justify-between">
            {isLoading ? <div className='w-full h-16 flex justify-center items-center'><svg
              className="w-6 h-6 text-blue-500 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg></div> :
              <div>
                <h2 className="text-lg font-semibold">Total Blogs</h2>
                <p className="text-2xl font-bold mt-2">{data?.data}</p>
              </div>
            }
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold mt-2">50</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Comments</h2>
          <p className="text-2xl font-bold mt-2">300</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Likes</h2>
          <p className="text-2xl font-bold mt-2">500</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Weekly Traffic</h2>
          <Line data={trafficData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        {/* Blog Distribution Chart */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Blog Distribution</h2>
          <Doughnut data={blogDistributionData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;