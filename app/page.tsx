'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, FileText, Image as ImageIcon, PlayCircle, CheckCircle2, Circle } from 'lucide-react';

interface Update {
  timestamp: string;
  agent: string;
  message: string;
  type: 'research' | 'brand' | 'design' | 'build' | 'qa' | 'launch' | string;
}

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  stage: string;
  agent: string;
  startedAt: string;
  priority: string;
  icon: string;
  color: string;
  briefPath: string | null;
  buildPath: string | null;
  updates: Update[];
  assets: {
    icon: string | null;
    screenshots: string[];
    demoVideo: string | null;
    handoffMd: string | null;
  };
  metadata: {
    appStoreTitle: string;
    subtitle: string;
    category: string;
    keywords: string[];
    price: {
      free: boolean;
      subscription: boolean;
      subscriptionPrice: string;
    };
  };
}

const STAGES = ['research', 'brand', 'design', 'build', 'qa', 'launch'];

const STAGE_COLORS: Record<string, string> = {
  research: 'bg-fuchsia-500',
  brand: 'bg-amber-500',
  design: 'bg-orange-500',
  build: 'bg-emerald-500',
  qa: 'bg-rose-500',
  launch: 'bg-blue-500',
};

const AGENT_ICONS: Record<string, string> = {
  luna: '🔍',
  blaze: '🔥',
  appstar: '🎨',
  ivy: '💻',
  vex: '🔨',
  nova: '🚀',
  claude: '🔧',
  ozzy: '📊',
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/projects-data.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getStageIndex = (stage: string) => STAGES.indexOf(stage);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const getLastUpdate = (project: Project) => {
    if (project.updates.length === 0) return 'No updates yet';
    const last = project.updates[project.updates.length - 1];
    return `${AGENT_ICONS[last.agent] || '🤖'} ${last.message.substring(0, 60)}${last.message.length > 60 ? '...' : ''}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">🏭 Mission Control — Factory Pipeline</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-800 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">🏭 Mission Control</h1>
            <p className="text-gray-400 mt-1">Factory Pipeline — Click any project to view full details</p>
          </div>
          <div className="flex gap-4 text-sm">
            {STAGES.map((stage) => (
              <div key={stage} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${STAGE_COLORS[stage]}`} />
                <span className="capitalize text-gray-300">{stage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Project Cards */}
        <div className="space-y-3">
          {projects.map(project => {
            const isExpanded = expandedProject === project.id;
            const stageIdx = getStageIndex(project.stage);
            
            return (
              <div
                key={project.id}
                className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:border-gray-700'}`}
              >
                {/* Horizontal Card Header */}
                <button
                  onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-800">
                    {project.icon}
                  </div>
                  
                  {/* Name & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold truncate">{project.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${STAGE_COLORS[project.stage]} text-white capitalize`}>
                        {project.stage}
                      </span>
                      {project.priority === 'high' && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          High Priority
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm truncate mt-1">{getLastUpdate(project)}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-32 hidden sm:block">
                    <div className="flex gap-0.5">
                      {STAGES.map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${i <= stageIdx ? STAGE_COLORS[project.stage] : 'bg-gray-700'}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">{stageIdx + 1}/6 stages</p>
                  </div>

                  {/* Agent */}
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg">
                    <span className="text-lg">{AGENT_ICONS[project.agent]}</span>
                    <span className="text-sm text-gray-300 capitalize">{project.agent}</span>
                  </div>

                  {/* Expand Icon */}
                  <div className="text-gray-500">
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-800 p-6 animate-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: Details */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                          <p className="text-gray-300">{project.description}</p>
                        </div>

                        {/* Timeline */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Update Timeline</h4>
                          <div className="space-y-3">
                            {project.updates.map((update, idx) => (
                              <div key={idx} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm">
                                    {AGENT_ICONS[update.agent]}
                                  </div>
                                  {idx < project.updates.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-gray-800 my-1" />
                                  )}
                                </div>
                                <div className="flex-1 pb-4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium capitalize text-gray-200">{update.agent}</span>
                                    <span className="text-xs text-gray-500">{formatTime(update.timestamp)}</span>
                                    <span className={`px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-400 capitalize`}>
                                      {update.type}
                                    </span>
                                  </div>
                                  <p className="text-gray-400 text-sm">{update.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add Update Form */}
                        <div className="bg-gray-800/50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Add Update</h4>
                          <p className="text-sm text-gray-400">
                            Agents can update via: <code className="bg-gray-700 px-2 py-1 rounded">python3 ~/.openclaw/factory/scripts/update-project.py {project.slug} "message"</code>
                          </p>
                        </div>
                      </div>

                      {/* Right: Metadata & Assets */}
                      <div className="space-y-6">
                        {/* Stage Progress */}
                        <div className="bg-gray-800/50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Pipeline Progress</h4>
                          <div className="space-y-2">
                            {STAGES.map((stage, i) => {
                              const isComplete = i < stageIdx;
                              const isCurrent = i === stageIdx;
                              return (
                                <div key={stage} className="flex items-center gap-3">
                                  {isComplete ? (
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                  ) : isCurrent ? (
                                    <Circle size={16} className="text-blue-400 fill-current" />
                                  ) : (
                                    <Circle size={16} className="text-gray-600" />
                                  )}
                                  <span className={`text-sm ${isComplete ? 'text-emerald-400' : isCurrent ? 'text-blue-400 font-medium' : 'text-gray-500'}`}>
                                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* App Store Metadata */}
                        <div className="bg-gray-800/50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">App Store Metadata</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-gray-500">Title:</span>
                              <p className="text-gray-300">{project.metadata.appStoreTitle}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Subtitle:</span>
                              <p className="text-gray-300">{project.metadata.subtitle}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Category:</span>
                              <p className="text-gray-300">{project.metadata.category}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Monetization:</span>
                              <p className="text-gray-300">
                                {project.metadata.price.free && 'Free'}
                                {project.metadata.price.subscription && ` • ${project.metadata.price.subscriptionPrice}`}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Assets */}
                        <div className="bg-gray-800/50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Assets</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className={`p-3 rounded-lg text-center ${project.assets.icon ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700/50 text-gray-500'}`}>
                              <ImageIcon size={20} className="mx-auto mb-1" />
                              <span className="text-xs">Icon</span>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${project.assets.screenshots.length > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700/50 text-gray-500'}`}>
                              <FileText size={20} className="mx-auto mb-1" />
                              <span className="text-xs">Screenshots ({project.assets.screenshots.length})</span>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${project.assets.demoVideo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700/50 text-gray-500'}`}>
                              <PlayCircle size={20} className="mx-auto mb-1" />
                              <span className="text-xs">Demo Video</span>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${project.assets.handoffMd ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700/50 text-gray-500'}`}>
                              <FileText size={20} className="mx-auto mb-1" />
                              <span className="text-xs">Handoff Doc</span>
                            </div>
                          </div>
                        </div>

                        {/* Paths */}
                        <div className="bg-gray-800/50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Project Paths</h4>
                          <div className="space-y-2 text-sm">
                            {project.briefPath && (
                              <div className="flex items-center gap-2 text-gray-400">
                                <FileText size={14} />
                                <span className="truncate">{project.briefPath}</span>
                              </div>
                            )}
                            {project.buildPath && (
                              <div className="flex items-center gap-2 text-gray-400">
                                <FileText size={14} />
                                <span className="truncate">{project.buildPath}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No active projects. Add one to projects-data.json</p>
          </div>
        )}
      </div>
    </main>
  );
}
