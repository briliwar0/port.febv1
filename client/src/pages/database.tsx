import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, RefreshCw, User, MessageSquare, BarChart3 } from 'lucide-react';

export default function Database() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [visitorStats, setVisitorStats] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  // Cek apakah user sudah login dan rolenya adalah admin
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.role !== 'admin') {
          // Redirect jika bukan admin
          toast({
            title: 'Akses Ditolak',
            description: 'Anda tidak memiliki akses ke halaman ini',
            variant: 'destructive',
          });
          setLocation('/');
        }
      } catch (e) {
        localStorage.removeItem('user');
        setLocation('/login');
      }
    } else {
      // Redirect ke login jika belum login
      setLocation('/login');
    }
  }, [setLocation, toast]);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari sistem',
    });
    setLocation('/login');
  };

  // Fungsi untuk fetch data users
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fungsi untuk fetch data messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fungsi untuk fetch data visitors
  const fetchVisitors = async () => {
    try {
      const response = await fetch('/api/visitors/list');
      if (response.ok) {
        const data = await response.json();
        setVisitors(data || []);
      } else {
        console.error('Failed to fetch visitors');
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  // Fungsi untuk fetch statistik visitor
  const fetchVisitorStats = async () => {
    try {
      const response = await fetch('/api/visitors');
      if (response.ok) {
        const data = await response.json();
        setVisitorStats(data || null);
      } else {
        console.error('Failed to fetch visitor stats');
      }
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
    }
  };

  // Fetch semua data saat komponen mount
  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsLoading(true);
      
      Promise.all([
        fetchUsers(),
        fetchMessages(),
        fetchVisitors(),
        fetchVisitorStats()
      ]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [user]);

  // Refresh semua data
  const refreshData = () => {
    setIsLoading(true);
    
    Promise.all([
      fetchUsers(),
      fetchMessages(),
      fetchVisitors(),
      fetchVisitorStats()
    ]).finally(() => {
      setIsLoading(false);
      toast({
        title: 'Data Diperbarui',
        description: 'Data telah diperbarui',
      });
    });
  };

  // Tampilan loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">Loading database...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // akan redirect ke login oleh useEffect
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Database Admin</h1>
          <p className="text-muted-foreground">Login sebagai: {user?.username}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <User className="h-5 w-5 mr-2" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
            <p className="text-muted-foreground text-sm">Registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{messages.length}</p>
            <p className="text-muted-foreground text-sm">Contact messages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{visitorStats?.totalVisitors || 0}</p>
            <p className="text-muted-foreground text-sm">{visitorStats?.uniqueVisitors || 0} unique visitors</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="stats">Visitor Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">User List</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{user.isActive ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Message List</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>{message.id}</TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                      <TableCell>{new Date(message.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No messages found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="visitors" className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Visitor List</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Browser</TableHead>
                  <TableHead>OS</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Last Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.length > 0 ? (
                  visitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell>{visitor.id}</TableCell>
                      <TableCell>{visitor.ipAddress}</TableCell>
                      <TableCell>{visitor.country || 'Unknown'}</TableCell>
                      <TableCell>{visitor.device || 'Unknown'}</TableCell>
                      <TableCell>{visitor.browser || 'Unknown'}</TableCell>
                      <TableCell>{visitor.os || 'Unknown'}</TableCell>
                      <TableCell>{visitor.visitCount}</TableCell>
                      <TableCell>{new Date(visitor.lastVisit).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No visitors found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Visitor Statistics</h2>
          
          {visitorStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Total Visitors:</dt>
                      <dd>{visitorStats.totalVisitors}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Unique Visitors:</dt>
                      <dd>{visitorStats.uniqueVisitors}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Today's Visitors:</dt>
                      <dd>{visitorStats.todayVisitors}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Last Week Visitors:</dt>
                      <dd>{visitorStats.lastWeekVisitors}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visitorStats.visitorsByCountry && visitorStats.visitorsByCountry.length > 0 ? (
                      visitorStats.visitorsByCountry.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.country || 'Unknown'}</span>
                          <span className="font-medium">{item.count}</span>
                        </li>
                      ))
                    ) : (
                      <li>No country data available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visitorStats.visitorsByDevice && visitorStats.visitorsByDevice.length > 0 ? (
                      visitorStats.visitorsByDevice.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.device || 'Unknown'}</span>
                          <span className="font-medium">{item.count}</span>
                        </li>
                      ))
                    ) : (
                      <li>No device data available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visitorStats.visitorsByBrowser && visitorStats.visitorsByBrowser.length > 0 ? (
                      visitorStats.visitorsByBrowser.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.browser || 'Unknown'}</span>
                          <span className="font-medium">{item.count}</span>
                        </li>
                      ))
                    ) : (
                      <li>No browser data available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p>No statistics available</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}