'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import {
  Lock,
  GitBranch,
  ExternalLink,
  CheckCircle2,
  Terminal,
  LogOut,
  ArrowRight,
  Layers,
  RefreshCw,
  Users,
} from 'lucide-react';

function AdminControlRoom() {
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [passphrase, setPassphrase] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data state
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('review');

  // Editable approval form fields
  const [approvalData, setApprovalData] = useState({
    track: 'incubating',
    status: 'prototype',
    highlights: '',
  });

  // Check auth session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Parse candidate payload from URL query (?sub=...) if opened via email link
  useEffect(() => {
    const subParam = searchParams.get('sub');
    if (subParam) {
      try {
        const decoded = Buffer.from(decodeURIComponent(subParam), 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        setSelectedSubmission(parsed);
        setApprovalData({
          track: parsed.track || 'incubating',
          status: 'prototype',
          highlights: `${parsed.category} platform solving verified builder friction.\nEngineered with modular ${Array.isArray(parsed.techStack) ? parsed.techStack.slice(0, 3).join(', ') : 'modern'} architecture.`,
        });
      } catch (e) {
        console.warn('Failed to parse candidate payload from query param:', e);
      }
    }
  }, [searchParams]);

  async function checkAuthStatus() {
    setCheckingAuth(true);
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadSubmissions();
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setIsAuthenticated(true);
      setPassphrase('');
      loadSubmissions();
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setSelectedSubmission(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  async function loadSubmissions() {
    setLoadingSubmissions(true);
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  }

  function handleSelectForApproval(submission) {
    setSelectedSubmission(submission);
    setApprovalData({
      track: submission.track || 'incubating',
      status: 'prototype',
      highlights: `${submission.category} platform engineered under Pinaka standards.\nBuilt with modular ${Array.isArray(submission.techStack) ? submission.techStack.slice(0, 3).join(', ') : 'modern'} architecture.`,
    });
    // Smooth scroll to approval card on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('approval-panel')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  async function handleApproveSubmit(e) {
    e.preventDefault();
    if (!selectedSubmission) return;

    setIsApproving(true);
    setActionMessage(null);

    try {
      const highlightsArray = approvalData.highlights
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        submissionId: selectedSubmission.id,
        name: selectedSubmission.name,
        tagline: selectedSubmission.tagline,
        category: selectedSubmission.category,
        track: approvalData.track,
        status: approvalData.status,
        techStack: selectedSubmission.techStack,
        leadBuilder: selectedSubmission.leadBuilder,
        squadUrl: selectedSubmission.squadUrl,
        skillSphereUrl: selectedSubmission.skillSphereUrl,
        skillSphereLabel: selectedSubmission.skillSphereLabel,
        repoUrl: selectedSubmission.repoUrl,
        demoUrl: selectedSubmission.demoUrl,
        description: selectedSubmission.description,
        highlights: highlightsArray,
      };

      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to approve submission');
      }

      setActionMessage({
        type: 'success',
        text: `✓ Successfully committed "${selectedSubmission.name}" to Pinaka Ledger! ${data.message || ''}`,
      });

      loadSubmissions();
      setSelectedSubmission(null);
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message });
    } finally {
      setIsApproving(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <span className="font-mono text-xs uppercase tracking-widest text-pinaka-slate">
            Verifying Studio Lead Session...
          </span>
        </div>
      </div>
    );
  }

  // ── Unauthenticated: Login Screen ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="w-full max-w-md border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-6 sm:p-10 shadow-editorial rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <PinakaBow className="h-4.5 sm:h-5 w-auto text-pinaka-saffron shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
              Pinaka Foundry &middot; Control Room
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-pinaka-charcoal mb-2">
            Studio Lead Gateway
          </h1>
          <p className="text-xs text-pinaka-slate font-sans leading-relaxed mb-6">
            Enter your sovereign Studio Lead passphrase to review submissions and commit approved ventures to the ledger.
          </p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter studio key"
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron pr-10 font-mono"
                />
                <Lock className="h-4 w-4 text-pinaka-ash absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full justify-center" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Spinner size="sm" />
                  Authenticating...
                </>
              ) : (
                <>
                  Unlock Control Room
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-pinaka-hairline flex items-center justify-between text-[11px] font-mono text-pinaka-ash">
            <Link href="/" className="hover:text-pinaka-saffron transition-colors">
              &larr; Return to Public Portal
            </Link>
            <span>Lead: KSHITIZ</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Authenticated: Control Room ───────────────────────────────────────────
  const pendingSubmissions = submissions.filter((s) => s.status !== 'APPROVED');
  const approvedSubmissions = submissions.filter((s) => s.status === 'APPROVED');
  const displayedSubmissions = activeTab === 'review' ? pendingSubmissions : submissions;

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-pinaka-hairline pb-5 sm:pb-6">
          <div className="flex items-center gap-3">
            <PinakaBow className="h-5 sm:h-6 w-auto text-pinaka-saffron shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-pinaka-charcoal">
                  Foundry Control Room
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-sm">
                  Authorized Lead: KSHITIZ
                </span>
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-pinaka-ash block mt-0.5">
                Intake Review &middot; Option A Git-Backed Promotion Engine
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link href="/" target="_blank" className="shrink-0">
              <Button variant="outline" size="sm">
                View Live
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <button
              onClick={loadSubmissions}
              disabled={loadingSubmissions}
              className="p-2 border border-pinaka-hairline bg-white text-pinaka-slate hover:text-pinaka-stone rounded-sm hover:border-pinaka-ash transition-colors cursor-pointer"
              aria-label="Refresh submissions"
            >
              <RefreshCw className={`h-4 w-4 ${loadingSubmissions ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-charcoal hover:text-white transition-colors rounded-sm cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Exit
            </button>
          </div>
        </div>

        {/* Global Action Message */}
        {actionMessage && (
          <div
            className={`mb-6 p-3 sm:p-4 border rounded-sm text-xs font-mono flex items-center justify-between ${
              actionMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            <span>{actionMessage.text}</span>
            <button onClick={() => setActionMessage(null)} className="underline cursor-pointer ml-2">
              Dismiss
            </button>
          </div>
        )}

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="border border-pinaka-hairline bg-white/95 p-4 sm:p-6 shadow-sm rounded-sm">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash block mb-1">
              Candidate Queue
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-pinaka-charcoal">
              {pendingSubmissions.length}
            </span>
            <span className="text-xs text-pinaka-slate block mt-1">Pending Gate 1 Evaluation</span>
          </div>

          <div className="border border-pinaka-hairline bg-white/95 p-4 sm:p-6 shadow-sm rounded-sm">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash block mb-1">
              Promoted to Ledger
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
              {approvedSubmissions.length}
            </span>
            <span className="text-xs text-pinaka-slate block mt-1">Approved & Published Ventures</span>
          </div>

          <div className="border border-pinaka-hairline bg-white/95 p-4 sm:p-6 shadow-sm rounded-sm">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash block mb-1">
              Total Recorded
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-pinaka-stone">
              {submissions.length}
            </span>
            <span className="text-xs text-pinaka-slate block mt-1">All Intake Records</span>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Submissions List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Tab Bar */}
            <div className="flex items-center gap-2 border-b border-pinaka-hairline pb-2">
              <button
                onClick={() => setActiveTab('review')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'review'
                    ? 'bg-pinaka-charcoal text-white font-bold'
                    : 'text-pinaka-slate hover:text-pinaka-stone'
                }`}
              >
                Needs Review ({pendingSubmissions.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-pinaka-charcoal text-white font-bold'
                    : 'text-pinaka-slate hover:text-pinaka-stone'
                }`}
              >
                All Records ({submissions.length})
              </button>
            </div>

            {loadingSubmissions ? (
              <div className="p-10 sm:p-12 text-center bg-white/90 border border-pinaka-hairline rounded-sm">
                <Spinner size="md" />
                <span className="font-mono text-xs text-pinaka-ash block mt-2">Loading candidate docket...</span>
              </div>
            ) : displayedSubmissions.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white/90 border border-pinaka-hairline rounded-sm">
                <p className="font-serif text-base text-pinaka-stone">
                  {activeTab === 'review' ? 'No pending submissions in queue.' : 'No submission records found.'}
                </p>
                <p className="text-xs text-pinaka-slate mt-1 font-mono">
                  When builders submit on /onboard, applications will appear here and ping your email.
                </p>
              </div>
            ) : (
              displayedSubmissions.map((sub) => {
                const isSelected = selectedSubmission?.id === sub.id;
                const isApproved = sub.status === 'APPROVED';

                return (
                  <div
                    key={sub.id}
                    className={`border transition-all duration-150 p-4 sm:p-6 bg-white/95 shadow-sm rounded-sm ${
                      isSelected
                        ? 'border-pinaka-saffron ring-1 ring-pinaka-saffron'
                        : 'border-pinaka-hairline hover:border-pinaka-ash'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] text-pinaka-ash uppercase tracking-widest">
                            {sub.id}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wide border ${
                              isApproved
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            {sub.status || 'UNDER_REVIEW'}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-pinaka-charcoal">
                          {sub.name}
                        </h3>
                        <span className="text-xs text-pinaka-slate">
                          by <strong className="text-pinaka-stone">{sub.leadBuilder}</strong> &bull; Contact: {sub.contact}
                        </span>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0">
                        <span className="text-[11px] font-mono text-pinaka-ash">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] bg-pinaka-ice border border-pinaka-hairline px-2 py-0.5 rounded-sm text-pinaka-stone sm:mt-1 inline-block">
                          {sub.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-pinaka-slate font-sans leading-relaxed mb-3 sm:mb-4">
                      {sub.tagline}
                    </p>

                    <div className="p-3 bg-pinaka-ice/50 border border-pinaka-hairline rounded-sm text-xs font-mono text-pinaka-stone mb-3 sm:mb-4 whitespace-pre-wrap max-h-24 overflow-y-auto">
                      {sub.description}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(Array.isArray(sub.techStack) ? sub.techStack : [sub.techStack]).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] bg-white border border-pinaka-hairline px-2 py-0.5 text-pinaka-slate rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-pinaka-hairline">
                      <div className="flex items-center gap-3">
                        {sub.squadUrl && (
                          <a
                            href={sub.squadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-pinaka-saffron hover:underline"
                          >
                            <Users className="h-3 w-3" />
                            Squad
                          </a>
                        )}
                        {sub.repoUrl && (
                          <a
                            href={sub.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-pinaka-saffron hover:underline"
                          >
                            <GitBranch className="h-3 w-3" />
                            Repository
                          </a>
                        )}
                        {sub.demoUrl && (
                          <a
                            href={sub.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-pinaka-jade hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live Demo
                          </a>
                        )}
                      </div>

                      {!isApproved ? (
                        <button
                          onClick={() => handleSelectForApproval(sub)}
                          className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider bg-pinaka-saffron text-white hover:bg-pinaka-saffron-deep transition-colors rounded-sm cursor-pointer shadow-saffron-sm text-center"
                        >
                          Review & Ingest &rarr;
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Published on Ledger
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}

          </div>

          {/* Right Column: Approval Dossier & Ledger Ingestion (5 cols) */}
          <div
            id="approval-panel"
            className="lg:col-span-5 border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-5 sm:p-8 shadow-editorial rounded-sm lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-4 w-4 text-pinaka-saffron shrink-0" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
                Ledger Promotion Engine
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-pinaka-charcoal mb-4">
              Ingestion Specifications
            </h3>

            {selectedSubmission ? (
              <form onSubmit={handleApproveSubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-pinaka-ash block font-mono text-[10px] uppercase">Candidate</span>
                  <strong className="text-pinaka-charcoal text-sm font-serif block">
                    {selectedSubmission.name}
                  </strong>
                  <span className="text-pinaka-slate text-[11px]">
                    By {selectedSubmission.leadBuilder} &bull; Contact: {selectedSubmission.contact}
                  </span>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-pinaka-stone mb-1">
                    Assign Portfolio Track *
                  </label>
                  <select
                    value={approvalData.track}
                    onChange={(e) => setApprovalData((prev) => ({ ...prev, track: e.target.value }))}
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone p-2 rounded-sm font-sans cursor-pointer text-xs"
                  >
                    <option value="incubating">Ongoing Work (Active Prototype)</option>
                    <option value="flagship">Featured (Deployed & Production Ready)</option>
                    <option value="breakthroughs">Breakthroughs (Deeptech / Advanced AI)</option>
                    <option value="proposals">Proposals (Proposed Ideas & Briefs)</option>
                    <option value="community">Community Collective</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-pinaka-stone mb-1">
                    Status Classification *
                  </label>
                  <select
                    value={approvalData.status}
                    onChange={(e) => setApprovalData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone p-2 rounded-sm font-sans cursor-pointer text-xs"
                  >
                    <option value="prototype">prototype</option>
                    <option value="mvp">mvp</option>
                    <option value="pilot">pilot</option>
                    <option value="live">live</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-pinaka-stone mb-1">
                    Architectural Highlights (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={approvalData.highlights}
                    onChange={(e) => setApprovalData((prev) => ({ ...prev, highlights: e.target.value }))}
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone p-2 rounded-sm font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-pinaka-hairline space-y-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    disabled={isApproving}
                  >
                    {isApproving ? (
                      <>
                        <Spinner size="sm" />
                        Committing to Git Ledger...
                      </>
                    ) : (
                      <>
                        Approve & Ingest into Ledger
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(null)}
                    className="w-full text-center py-1.5 text-xs font-mono text-pinaka-ash hover:text-pinaka-stone cursor-pointer"
                  >
                    Cancel Selection
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 sm:p-8 text-center text-xs text-pinaka-slate font-sans">
                <Layers className="h-8 w-8 text-pinaka-ash mx-auto mb-2 opacity-60" />
                Select any candidate on the left to review their full specifications and commit them directly to the Pinaka public ledger.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    }>
      <AdminControlRoom />
    </Suspense>
  );
}
