import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Home, 
  Target, 
  Calendar, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Filter,
  Download,
  Map as MapIcon,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  FileText,
  Briefcase
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Skeleton from './Skeleton';
import { formatCurrency, formatDate, formatCompactNumber } from '../utils/format';

// Fix Leaflet default icon issue
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const COLORS = ['#1877F2', '#E4405F', '#0A66C2', '#000000', '#FF0000'];

const StatCard = ({ label, value, trend, icon: Icon, color, bg, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    role="article"
    aria-labelledby={`stat-label-${(label || '').replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 ${bg} rounded-xl group-hover:scale-110 transition-transform`} aria-hidden="true">
        <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.5} />
      </div>
      <button className="p-1 hover:bg-gray-50 rounded-lg text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label={`More options for ${label}`}>
        <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </div>
    <div className="space-y-1">
      <p id={`stat-label-${(label || '').replace(/\s+/g, '-').toLowerCase()}`} className="text-sm font-bold text-gray-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-black text-gray-900">{value}</h3>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`} aria-label={`Trend: ${trend}`}>
            {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" aria-hidden="true" /> : <ArrowDownRight className="w-3 h-3" aria-hidden="true" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [mapData, setMapData] = useState<any>(null);
  const [activeView, setActiveView] = useState<'stats' | 'map'>('stats');

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;
    try {
      const [roleRes, mapRes] = await Promise.all([
        fetch('/api/analytics/dashboard/role', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/analytics/map', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (roleRes.ok) {
        const data = await roleRes.json();
        setDashboardData(data);
      }
      if (mapRes.ok) setMapData(await mapRes.json());

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="p-4 lg:p-8 space-y-8" role="status" aria-label="Loading Dashboard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-6 h-6 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <div className="flex items-baseline gap-3">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderAgentDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="My Active Leads" 
          value={dashboardData?.leads?.length || 0} 
          trend="+5%" 
          icon={Users} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          label="Upcoming Appointments" 
          value={dashboardData?.tasks?.length || 0} 
          trend="Next 7 days" 
          icon={Calendar} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <StatCard 
          label="My Properties" 
          value={dashboardData?.properties?.length || 0} 
          trend="Active" 
          icon={Home} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Appointments</h3>
          <div className="space-y-4">
            {dashboardData?.tasks?.map((task: any) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Clock className="w-4 h-4 text-indigo-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">{formatDate(task.due_date, 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-colors">
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            ))}
            {(!dashboardData?.tasks || dashboardData.tasks.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-8">No upcoming appointments.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Leads</h3>
          <div className="space-y-4">
            {dashboardData?.leads?.map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Users className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{lead.contact_name}</p>
                    <p className="text-xs text-gray-500">{lead.source}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                  lead.status === 'New' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketerDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="Active Campaigns" 
          value={dashboardData?.campaigns?.length || 0} 
          trend="Live" 
          icon={Target} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          label="Total Reach" 
          value={formatCompactNumber(1200000)} 
          trend="+15%" 
          icon={TrendingUp} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <StatCard 
          label="Templates Used" 
          value={dashboardData?.templates?.length || 0} 
          trend="Popular" 
          icon={FileText} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData?.platformPerformance || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="reach" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Templates</h3>
          <div className="grid grid-cols-2 gap-4">
            {dashboardData?.templates?.map((template: any) => (
              <div key={template.id} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-2 border border-gray-100">
                  <img src={template.thumbnail_url} alt={template.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs font-bold text-gray-900 truncate">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeveloperDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="Active Projects" 
          value={dashboardData?.projects?.length || 0} 
          trend="On Track" 
          icon={Briefcase} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          label="Upcoming Milestones" 
          value={dashboardData?.milestones?.length || 0} 
          trend="Next 30 days" 
          icon={Calendar} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <StatCard 
          label="Completion Rate" 
          value="85%" 
          trend="+2.4%" 
          icon={CheckCircle2} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Project Timeline & Milestones</h3>
        <div className="space-y-6">
          {dashboardData?.milestones?.map((milestone: any) => (
            <div key={milestone.id} className="flex items-start gap-4">
              <div className="mt-1">
                <div className={`w-4 h-4 rounded-full border-2 ${milestone.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}></div>
              </div>
              <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-gray-900">{milestone.title}</p>
                  <span className="text-xs font-bold text-gray-400">{formatDate(milestone.due_date)}</span>
                </div>
                <p className="text-xs text-gray-500">{milestone.project_name}</p>
              </div>
            </div>
          ))}
          {(!dashboardData?.milestones || dashboardData.milestones.length === 0) && (
            <p className="text-sm text-gray-500 text-center py-8">No upcoming milestones.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Properties" 
          value={dashboardData?.totalLeads || 0} 
          trend="+12%" 
          icon={Home} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          label="Active Leads" 
          value={dashboardData?.totalLeads || 0} 
          trend="+18%" 
          icon={Users} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <StatCard 
          label="Conversion Rate" 
          value={`${dashboardData?.conversionRate || 0}%`} 
          trend="+2.1%" 
          icon={Target} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <StatCard 
          label="Avg Response" 
          value={`${dashboardData?.avgResponseTime || 0}m`} 
          trend="-4.5%" 
          icon={Clock} 
          color="text-rose-600" 
          bg="bg-rose-50" 
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Agency Performance Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Mon', leads: 45 },
                { name: 'Tue', leads: 52 },
                { name: 'Wed', leads: 38 },
                { name: 'Thu', leads: 65 },
                { name: 'Fri', leads: 48 },
              ]}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user?.name}</span>
          </h1>
          <p className="text-sm lg:text-base text-gray-500 font-medium">Here's what's happening with your {user?.role} dashboard.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200" role="tablist" aria-label="Dashboard View Toggle">
              <button 
                role="tab"
                aria-selected={activeView === 'stats'}
                aria-label="Statistics View"
                onClick={() => setActiveView('stats')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${activeView === 'stats' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <TrendingUp className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                Stats
              </button>
              <button 
                role="tab"
                aria-selected={activeView === 'map'}
                aria-label="Map View"
                onClick={() => setActiveView('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${activeView === 'map' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MapIcon className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                Map View
              </button>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all font-bold text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" 
            aria-label="Export Dashboard Data"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'stats' ? (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {user?.role === 'agent' && renderAgentDashboard()}
            {user?.role === 'marketer' && renderMarketerDashboard()}
            {user?.role === 'developer' && renderDeveloperDashboard()}
            {(user?.role === 'admin' || user?.role === 'manager') && renderAdminDashboard()}
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-[600px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative"
          >
            <MapContainer center={[-33.9249, 18.4241]} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {mapData?.properties?.map((prop: any) => (
                <Marker key={`prop-${prop.id}`} position={[prop.latitude, prop.longitude]}>
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-gray-900">{prop.title}</h4>
                      <p className="text-xs text-gray-500">{formatCurrency(prop.price, 'ZAR', 'en-ZA')}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-600 rounded text-[10px] font-bold uppercase">
                        {prop.status}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {mapData?.leads?.map((lead: any) => (
                <Marker key={`lead-${lead.id}`} position={[lead.latitude, lead.longitude]}>
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-gray-900">{lead.contact_name}</h4>
                      <p className="text-xs text-gray-500">Lead Location</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-emerald-100 text-emerald-600 rounded text-[10px] font-bold uppercase">
                        {lead.status}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            <div className="absolute top-4 right-4 z-[1000] space-y-2">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-64">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Map Filters</h4>
                <div className="space-y-3">
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>All Statuses</option>
                    <option>Available</option>
                    <option>Sold</option>
                    <option>Pending</option>
                  </select>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>All Price Ranges</option>
                    <option>Under R1M</option>
                    <option>R1M - R5M</option>
                    <option>Over R5M</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

