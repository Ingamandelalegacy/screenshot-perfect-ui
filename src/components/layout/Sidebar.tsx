import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  PieChart, 
  UserCog, 
  Target, 
  ClipboardList, 
  FileText,
  Upload,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon, label, collapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink
      to={to}
      className={cn(
        "sidebar-link",
        isActive && "sidebar-link-active"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

interface SubNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SubNavItem = ({ to, icon, label, collapsed }: SubNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink
      to={to}
      className={cn(
        "sidebar-link pl-8",
        isActive && "sidebar-link-active"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dashboardExpanded, setDashboardExpanded] = useState(true);
  const { isAdmin, isPartner, isClient } = useUser();

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar-bg flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {!collapsed && <Logo />}
      {collapsed && <div className="h-16" />}
      
      <nav className="flex-1 py-2">
        {/* Dashboard Section */}
        <div>
          <button
            onClick={() => setDashboardExpanded(!dashboardExpanded)}
            className="sidebar-link w-full justify-between"
          >
            <span className="flex items-center gap-3">
              {!collapsed && "Dashboard"}
            </span>
            {!collapsed && (dashboardExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>
          
          {dashboardExpanded && (
            <div>
              <SubNavItem
                to="/dashboard/overall"
                icon={<BarChart3 size={18} />}
                label="Overall"
                collapsed={collapsed}
              />
              <SubNavItem
                to="/dashboard/demographics"
                icon={<PieChart size={18} />}
                label="Demographics"
                collapsed={collapsed}
              />
              <SubNavItem
                to="/dashboard/performance"
                icon={<BarChart3 size={18} />}
                label="Performance"
                collapsed={collapsed}
              />
            </div>
          )}
        </div>
        
        {/* Admin-only navigation items */}
        {isAdmin && (
          <>
            <div className="my-4" />
            
            <NavItem
              to="/manage-users"
              icon={<UserCog size={18} />}
              label="Manage Users"
              collapsed={collapsed}
            />
            
            <NavItem
              to="/manage-targets"
              icon={<Target size={18} />}
              label="Manage Targets"
              collapsed={collapsed}
            />
            
            <NavItem
              to="/needs-analysis-requests"
              icon={<ClipboardList size={18} />}
              label="Needs Analysis & Scorecard Requests"
              collapsed={collapsed}
            />
            
            <NavItem
              to="/needs-analysis"
              icon={<FileText size={18} />}
              label="Needs Analysis & Scorecard"
              collapsed={collapsed}
            />
          </>
        )}

        {/* Partner-only navigation items */}
        {isPartner && (
          <>
            <div className="my-4" />
            
            <NavItem
              to="/client-profile"
              icon={<Users size={18} />}
              label="Client Profile"
              collapsed={collapsed}
            />
            
            <NavItem
              to="/upload"
              icon={<Upload size={18} />}
              label="Upload Data"
              collapsed={collapsed}
            />
          </>
        )}

        {/* Client view - only Dashboard tabs shown above */}
      </nav>
      
      <div className="p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-10 h-10 rounded-full bg-sidebar-foreground flex items-center justify-center hover:bg-sidebar-foreground/90 transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={20} className="text-sidebar-bg" />
          ) : (
            <ChevronLeft size={20} className="text-sidebar-bg" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;