"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft } from 'lucide-react';

interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: Array<{
    title: string;
    description: string;
  }>;
  timeline?: Array<{
    year: string;
    title: string;
    description: string;
    location?: string;
    icon?: string;
  }>;
}

export default function AdminAbout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AboutPageData>({
    hero: {
      title: '',
      subtitle: '',
    },
    mission: {
      title: '',
      description: '',
    },
    vision: {
      title: '',
      description: '',
    },
    values: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    timeline: [],
  });

  useEffect(() => {
    const authenticated = sessionStorage.getItem('admin_authenticated');
    if (!authenticated) {
      router.push('/admin');
      return;
    }

    fetchAboutPage();
  }, [router]);

  const fetchAboutPage = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      if (data.data) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching about page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('About page updated successfully!');
      } else {
        alert('Failed to update about page');
      }
    } catch (error) {
      console.error('Error updating about page:', error);
      alert('Error updating about page');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof AboutPageData],
        [field]: value,
      },
    }));
  };

  const handleValueChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.map((val, i) =>
        i === index ? { ...val, [field]: value } : val
      ),
    }));
  };

  const addValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, { title: '', description: '' }],
    }));
  };

  const removeValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
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
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-white">Edit About Page</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="glass-strong p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="About ATECH"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={formData.hero.subtitle}
                  onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="We are a team of passionate developers..."
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="glass-strong p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Mission</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.mission.title}
                  onChange={(e) => handleChange('mission', 'title', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="Our Mission"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.mission.description}
                  onChange={(e) => handleChange('mission', 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="To empower businesses..."
                />
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="glass-strong p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Vision</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.vision.title}
                  onChange={(e) => handleChange('vision', 'title', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="Our Vision"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.vision.description}
                  onChange={(e) => handleChange('vision', 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="To be the leading software development agency..."
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="glass-strong p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Values</h2>
              <button
                type="button"
                onClick={addValue}
                className="px-4 py-2 glass rounded-lg text-neon-blue hover:bg-white/10 transition-colors"
              >
                + Add Value
              </button>
            </div>
            <div className="space-y-4">
              {formData.values.map((value, index) => (
                <div
                  key={index}
                  className="p-4 glass rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Value #{index + 1}</span>
                    {formData.values.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeValue(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="Innovation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={value.description}
                        onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="We stay ahead of the curve..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="glass-strong p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Timeline / Journey</h2>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    timeline: [
                      ...(prev.timeline || []),
                      { year: '', title: '', description: '', location: '', icon: 'calendar' },
                    ],
                  }));
                }}
                className="px-4 py-2 glass rounded-lg text-neon-blue hover:bg-white/10 transition-colors"
              >
                + Add Timeline Item
              </button>
            </div>
            <div className="space-y-4">
              {(formData.timeline || []).map((item, index) => (
                <div
                  key={index}
                  className="p-4 glass rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Timeline Item #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          timeline: prev.timeline?.filter((_, i) => i !== index) || [],
                        }));
                      }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => {
                          const newTimeline = [...(formData.timeline || [])];
                          newTimeline[index] = { ...newTimeline[index], year: e.target.value };
                          setFormData((prev) => ({ ...prev, timeline: newTimeline }));
                        }}
                        className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location (Optional)
                      </label>
                      <input
                        type="text"
                        value={item.location || ''}
                        onChange={(e) => {
                          const newTimeline = [...(formData.timeline || [])];
                          newTimeline[index] = { ...newTimeline[index], location: e.target.value };
                          setFormData((prev) => ({ ...prev, timeline: newTimeline }));
                        }}
                        className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Icon
                      </label>
                      <select
                        value={item.icon || 'calendar'}
                        onChange={(e) => {
                          const newTimeline = [...(formData.timeline || [])];
                          newTimeline[index] = { ...newTimeline[index], icon: e.target.value };
                          setFormData((prev) => ({ ...prev, timeline: newTimeline }));
                        }}
                        className="w-full px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      >
                        <option value="calendar">Calendar</option>
                        <option value="award">Award</option>
                        <option value="rocket">Rocket</option>
                        <option value="code">Code</option>
                        <option value="users">Users</option>
                        <option value="mapPin">Map Pin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newTimeline = [...(formData.timeline || [])];
                          newTimeline[index] = { ...newTimeline[index], title: e.target.value };
                          setFormData((prev) => ({ ...prev, timeline: newTimeline }));
                        }}
                        className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="Company Founded"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const newTimeline = [...(formData.timeline || [])];
                          newTimeline[index] = { ...newTimeline[index], description: e.target.value };
                          setFormData((prev) => ({ ...prev, timeline: newTimeline }));
                        }}
                        rows={3}
                        className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="Description of this milestone..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!formData.timeline || formData.timeline.length === 0) && (
                <div className="text-center py-8 text-gray-400">
                  <p>No timeline items yet. Click "Add Timeline Item" to get started.</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 glass rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg font-semibold text-dark-900 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

