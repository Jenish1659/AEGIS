import React, { useEffect, useState } from 'react';
import {
  Shield,
  Activity,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Lock,
  Layers,
  FileCheck
} from 'lucide-react';

interface HealthState {
  status: 'checking' | 'connected' | 'error';
  application?: string;
  message?: string;
}

export const App: React.FC = () => {
  const [health, setHealth] = useState<HealthState>({ status: 'checking' });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('/api/v1/health');
        if (response.ok) {
          const data = await response.json();
          setHealth({
            status: 'connected',
            application: data.data?.application || 'AEGIS',
          });
        } else {
          setHealth({
            status: 'error',
            message: `HTTP ${response.status}`,
          });
        }
      } catch (err) {
        setHealth({
          status: 'error',
          message: err instanceof Error ? err.message : 'Backend unreachable',
        });
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-lg text-blue-400">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
              AEGIS <span className="text-xs px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">GATEWAY v0.1.0</span>
            </h1>
            <p className="text-xs text-slate-400">Task-Aware Runtime Security Gateway for Autonomous AI Agents</p>
          </div>
        </div>

        {/* Backend Connectivity Status Pill */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full border bg-slate-900 border-slate-700">
            <span className="text-slate-400">Backend API:</span>
            {health.status === 'checking' && (
              <span className="flex items-center text-amber-400 gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-spin" /> Checking...
              </span>
            )}
            {health.status === 'connected' && (
              <span className="flex items-center text-emerald-400 gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Online (Port 8000)
              </span>
            )}
            {health.status === 'error' && (
              <span className="flex items-center text-rose-400 gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> Standby ({health.message})
              </span>
            )}
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-300">
            Port: 3005
          </div>
        </div>
      </header>

      {/* Main Command Center Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Banner */}
        <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/30 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Phase 1 Complete</span>
              <h2 className="text-2xl font-bold text-white mt-1">Runtime Environment Initialized</h2>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
                The local AEGIS architecture foundation is active. The FastAPI gateway, SQLite persistence layer,
                Open Policy Agent verification harness, and React dashboard (Port 3005) are configured for secure runtime execution.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end text-xs text-slate-400 space-y-1">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Default Deny Active</span>
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-blue-400" /> Intent Verification Ready</span>
              <span className="flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5 text-purple-400" /> Task Contract Governed</span>
            </div>
          </div>
        </div>

        {/* System Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">FastAPI Gateway</h3>
                <span className="text-xs text-slate-400">PEP Layer</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receives agent tool requests, enforces credentials, normalizes payloads, and coordinates enforcement.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Open Policy Agent</h3>
                <span className="text-xs text-slate-400">PDP Layer</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates Rego policies over active task scope, deterministic checks, and advisory signals.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">SQLite & Alembic</h3>
                <span className="text-xs text-slate-400">Persistence</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stores agent identities, task contract versions, human approvals, and immutable audit events.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Frontend Dashboard</h3>
                <span className="text-xs text-slate-400">Port 3005</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Single-pane cybersecurity management interface for monitoring, approval queues, and policy audits.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/20">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
            Security Enforcement Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
              <span className="text-emerald-400 font-bold text-sm block mb-1">ALLOW</span>
              <p className="text-slate-400">
                Granted when identity, contract scope, operation allowlists, and resource scopes are strictly valid.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40">
              <span className="text-rose-400 font-bold text-sm block mb-1">BLOCK</span>
              <p className="text-slate-400">
                Enforced on any contract violation, expired token, or forbidden operation. Mock tool execution remains strictly 0.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/40">
              <span className="text-amber-400 font-bold text-sm block mb-1">REVIEW</span>
              <p className="text-slate-400">
                Enqueued for sensitive actions or contextual ambiguity. Execution pauses until authorized human sign-off and revalidation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500">
        AEGIS Security Gateway — Verify Every Action. Enforce Least Privilege. (Local Development Environment on Port 3005)
      </footer>
    </div>
  );
};

export default App;
