import React from 'react';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  // Sample data for different charts
  const lineChartOptions = {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };
  const lineChartSeries = [{
    name: 'Users',
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 75, 80],
  }];

  const barChartOptions = {
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  };
  const barChartSeries = [{
    name: 'Engagement',
    data: [50, 60, 70, 80, 75, 65, 55],
  }];

  const pieChartOptions = {
    labels: ['Active', 'Inactive', 'Pending', 'Blocked'],
  };
  const pieChartSeries = [300, 150, 100, 50];const userStatsOptions = {
    chart: {
      id: 'user-stats',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    dataLabels: {
      enabled: false,
    },
  };

  const userStatsSeries = [
    {
      name: 'New Users',
      data: [30, 40, 45, 50, 49, 60],
    },
    {
      name: 'Active Users',
      data: [20, 35, 40, 45, 55, 65],
    },
  ];

  const userTableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'User', status: 'Inactive' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">User Management Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
        <Chart options={userStatsOptions} series={userStatsSeries} type="line" height={350} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={350} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Engagement</h2>
          <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
