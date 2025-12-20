"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Folder, FileText, Users, MessageSquare, Settings, LogOut, Info } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    blogPosts: 0,
    testimonials: 0,
  });

  useEffect(() => {
    // Check authentication
    const authenticated = sessionStorage.getItem('admin_authenticated');
    if (!authenticated) {
      router.push('/admin');
      return;
    }

    // Fetch stats
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin');
  };

  const menuItems = [
    { icon: Folder, label: 'Projects', href: '/admin/projects', count: stats.projects },
    { icon: FileText, label: 'Services', href: '/admin/services', count: stats.services },
    { icon: MessageSquare, label: 'Blog Posts', href: '/admin/blog', count: stats.blogPosts },
    { icon: Info, label: 'About Us', href: '/admin/about', count: null },
    { icon: Users, label: 'Team Members', href: '/admin/team', count: 0 },
    { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials', count: stats.testimonials },
    { icon: Settings, label: 'Settings', href: '/admin/settings', count: null },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="glass-strong border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient">ATECH Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-400">Manage your website content</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="glass-strong p-6 rounded-xl hover:border-neon-blue/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-dark-900" />
                  </div>
                  {item.count !== null && (
                    <span className="px-3 py-1 rounded-full glass text-neon-blue text-sm font-semibold">
                      {item.count}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-neon-blue transition-colors">
                  {item.label}
                </h3>
                <p className="text-gray-400 text-sm mt-2">Manage {item.label.toLowerCase()}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

