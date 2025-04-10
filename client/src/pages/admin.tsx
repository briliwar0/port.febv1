import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { fadeIn } from '@/lib/animations';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Users, Globe, Monitor, Chrome, Clock, RefreshCw } from 'lucide-react';

interface VisitorStats {
  totalVisitors: number;
  uniqueVisitors: number;
  todayVisitors: number;
  lastWeekVisitors: number;
  visitorsByCountry: { country: string; count: number }[];
  visitorsByDevice: { device: string; count: number }[];
  visitorsByBrowser: { browser: string; count: number }[];
  visitorsByOs: { os: string; count: number }[];
}

interface Visitor {
  id: number;
  ipAddress: string;
  browser: string;
  os: string;
  device: string;
  country: string;
  visitCount: number;
  lastVisit: string;
  firstVisit: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#6B66FF', '#B45DE9'];

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch visitor statistics
  const { data: statsData, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useQuery({
    queryKey: ['/api/visitors'],
    queryFn: async () => {
      const response = await apiRequest('/api/visitors');
      return response as unknown as VisitorStats;
    }
  });

  // Fetch visitor list with pagination
  const { data: visitorsData, isLoading: visitorsLoading, error: visitorsError, refetch: refetchVisitors } = useQuery({
    queryKey: ['/api/visitors/list', page],
    queryFn: async () => {
      const response = await apiRequest(`/api/visitors/list?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
      return response as unknown as Visitor[];
    }
  });

  // Refresh all data
  const handleRefresh = () => {
    refetchStats();
    refetchVisitors();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (statsLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading visitor data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-red-600 dark:text-red-300">
            There was a problem loading visitor statistics. Please try again later.
          </p>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="mt-4"
          >
            <RefreshCw size={16} className="mr-2" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and monitor your website visitors
            </p>
          </div>
          <Button 
            onClick={handleRefresh} 
            variant="outline"
            className="flex items-center"
          >
            <RefreshCw size={16} className="mr-2" /> Refresh Data
          </Button>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={fadeIn()}
        initial="hidden"
        animate="show"
      >
        {/* Total Visitors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              <div className="text-2xl font-bold">{statsData?.totalVisitors || 0}</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Unique Visitors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{statsData?.uniqueVisitors || 0}</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Visitors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{statsData?.todayVisitors || 0}</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Weekly Visitors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{statsData?.lastWeekVisitors || 0}</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts & Analytics */}
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="show"
      >
        <Tabs defaultValue="countries" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="browsers">Browsers</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="os">Operating Systems</TabsTrigger>
          </TabsList>
          
          {/* Countries Tab */}
          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Visitors by Country
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statsData?.visitorsByCountry}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="country" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" name="Visitors" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Browsers Tab */}
          <TabsContent value="browsers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Chrome className="h-5 w-5 mr-2" />
                  Visitors by Browser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statsData?.visitorsByBrowser}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {statsData?.visitorsByBrowser && statsData.visitorsByBrowser.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={statsData?.visitorsByBrowser}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="browser" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" name="Visitors" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Devices Tab */}
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Visitors by Device Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statsData?.visitorsByDevice}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {statsData?.visitorsByDevice && statsData.visitorsByDevice.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={statsData?.visitorsByDevice}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="device" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" name="Visitors" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* OS Tab */}
          <TabsContent value="os">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Visitors by Operating System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statsData?.visitorsByOs}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {statsData?.visitorsByOs && statsData.visitorsByOs.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={statsData?.visitorsByOs}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="os" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" name="Visitors" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Visitor List Table */}
      <motion.div 
        className="mt-8"
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            {visitorsLoading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : visitorsError ? (
              <div className="text-center text-red-500 p-4">
                Failed to load visitor data
              </div>
            ) : !visitorsData || visitorsData.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">
                No visitor data available yet
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Visits</TableHead>
                      <TableHead>Last Visit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitorsData.map((visitor) => (
                      <TableRow key={visitor.id}>
                        <TableCell className="font-medium">{visitor.ipAddress}</TableCell>
                        <TableCell>{visitor.browser}</TableCell>
                        <TableCell>{visitor.os}</TableCell>
                        <TableCell>{visitor.device}</TableCell>
                        <TableCell>{visitor.visitCount}</TableCell>
                        <TableCell>{formatDate(visitor.lastVisit)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: 3 }, (_, i) => {
                      const pageNumber = page - 1 + i;
                      if (pageNumber < 1) return null;
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            isActive={page === pageNumber}
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(p => p + 1)} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;