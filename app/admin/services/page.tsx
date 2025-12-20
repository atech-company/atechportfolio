"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export default function AdminServices() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticated = sessionStorage.getItem('admin_authenticated');
    if (!authenticated) {
      router.push('/admin');
      return;
    }

    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchServices();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="glass-strong border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white">Services</h1>
          </div>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg font-semibold text-dark-900 hover:scale-105 transition-transform"
          >
            <Plus size={20} />
            Add New Service
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No services yet.</p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg font-semibold text-dark-900"
            >
              <Plus size={20} />
              Create Your First Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="glass-strong p-6 rounded-xl hover:border-neon-blue/50 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>
                {service.icon && (
                  <span className="inline-block px-2 py-1 text-xs rounded glass text-neon-blue mb-4">
                    Icon: {service.icon}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

