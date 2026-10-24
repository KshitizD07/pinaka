'use client';

import { useState } from 'react';
import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Terminal,
  FileCode,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const PROBLEM_BRIEF_TEMPLATE = `# Problem Brief (Gate 1 Deliverable)

## 1. Problem Statement
* What specific friction, inefficiency, or pain point exists?
* Describe the problem in 2-3 concise sentences.

## 2. Target Users & Personas
* Who experiences this problem directly?
* How are they currently reached or accessed for validation?

## 3. Evidence of Problem (Not Just Opinion)
* Direct Quotes / Pilot Feedback:
* Observed Workarounds: What do people currently do to hack around this?

## 4. Current Alternatives & Limitations
* What tools, processes, or software do users currently use?
* Why do these alternatives fall short?

## 5. Architectural Solution & Tech Stack
* High-level system design and primary libraries/frameworks.`;

const MANIFEST_TEMPLATE = `{
  "$schema": "https://pinaka.dev/schemas/manifest.v1.json",
  "id": "your-project-slug",
  "name": "Project Name",
  "tagline": "A single compelling sentence describing the value proposition.",
  "category": "Campus Tech",
  "track": "incubating",
  "status": "prototype",
  "leadBuilder": "Your Name (@github_handle)",
  "repoUrl": "https://github.com/username/project",
  "demoUrl": "https://project.example.com",
  "description": "In-depth summary of the problem, the architectural solution, and current user impact.",
  "techStack": [
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker"
  ],
  "highlights": [
    "Key architectural achievement or unique technical feature #1",
    "Performance, security, or concurrency guarantee #2",
    "Pilot validation or notable user metric #3"
  ]
}`;

export default function OnboardPage() {
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    leadBuilder: '',
    contact: '',
    category: 'Campus Tech',
    track: 'incubating',
    tagline: '',
    techStack: '',
    repoUrl: '',
    demoUrl: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  function handleCopy(text, type) {
    navigator.clipboard.writeText(text);
    if (type === 'brief') {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2000);
    } else {
      setCopiedManifest(true);
      setTimeout(() => setCopiedManifest(false), 2000);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project');
      }

      setSubmitResult(data);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pinaka-slate hover:text-pinaka-saffron transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Studio Home & Ledger
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-8 sm:p-12 mb-12 shadow-editorial">
          <div className="flex items-center gap-2 mb-3">
            <PinakaBow className="h-5 w-auto text-pinaka-saffron" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
              The Pinaka Foundry &middot; Project Onboarding Guide
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-pinaka-charcoal mb-4">
            How to Get Backed Under Pinaka
          </h1>

          <p className="text-sm sm:text-base text-pinaka-slate leading-relaxed max-w-3xl font-sans mb-8">
            Early-stage software initiatives often struggle for traction and institutional credibility. 
            Pinaka operates as an engineering backbone and supportive studio umbrella. We provide engineering 
            baselines, architectural hardening, and shared distribution while guaranteeing that{' '}
            <strong className="text-pinaka-stone font-semibold">you retain 100% intellectual property ownership</strong>.
          </p>

          {/* Core Guarantees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-pinaka-hairline">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-pinaka-saffron shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-charcoal">
                  100% Builder IP Retention
                </h2>
                <p className="text-xs text-pinaka-slate mt-1 leading-relaxed">
                  You own your code, trademarks, and repository. Zero equity grabs or non-competes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="h-5 w-5 text-pinaka-saffron shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-charcoal">
                  Shared Engineering Baseline
                </h2>
                <p className="text-xs text-pinaka-slate mt-1 leading-relaxed">
                  Automated test suites, CI/CD pipelines, and resilience audits provided out of the box.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-pinaka-saffron shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-charcoal">
                  Verified Talent & Cross-Launch
                </h2>
                <p className="text-xs text-pinaka-slate mt-1 leading-relaxed">
                  Synergy with SkillSphere talent squads and showcase on the central Pinaka registry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Step Onboarding Steps */}
        <div className="space-y-10 mb-16">
          
          {/* Step 1: Problem Validation */}
          <div className="border border-pinaka-hairline bg-white/90 p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-pinaka-hairline">
              <div>
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Step 01 &middot; Gate 1 Requirement
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-pinaka-charcoal mt-1">
                  Define the Problem Brief
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(PROBLEM_BRIEF_TEMPLATE, 'brief')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-saffron hover:text-white transition-colors rounded-sm cursor-pointer shrink-0"
              >
                {copiedBrief ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedBrief ? 'Copied Template' : 'Copy Problem Brief Template'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-4">
              Pinaka rejects vanity decks and buzzwords. We evaluate candidate initiatives on whether they 
              solve verifiable user friction. Copy the structured Problem Brief below and keep it in your docs:
            </p>

            <pre className="p-4 bg-pinaka-charcoal text-white font-mono text-xs overflow-x-auto rounded-sm leading-relaxed max-h-56">
              {PROBLEM_BRIEF_TEMPLATE}
            </pre>
          </div>

          {/* Step 2: Add pinaka.json Manifest */}
          <div className="border border-pinaka-hairline bg-white/90 p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-pinaka-hairline">
              <div>
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Step 02 &middot; Machine-Readable Ingestion
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-pinaka-charcoal mt-1">
                  Add <code className="font-mono text-pinaka-saffron bg-pinaka-ice px-2 py-0.5 rounded-sm">pinaka.json</code> to Your Repo Root
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(MANIFEST_TEMPLATE, 'manifest')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-saffron hover:text-white transition-colors rounded-sm cursor-pointer shrink-0"
              >
                {copiedManifest ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedManifest ? 'Copied JSON' : 'Copy pinaka.json Template'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-4">
              To be indexed in the studio ledger, place a <code className="font-mono font-semibold text-pinaka-stone">pinaka.json</code> file 
              at the root of your project repository. This declares your tech stack, architectural highlights, and live URLs:
            </p>

            <pre className="p-4 bg-pinaka-charcoal text-emerald-400 font-mono text-xs overflow-x-auto rounded-sm leading-relaxed max-h-56">
              {MANIFEST_TEMPLATE}
            </pre>
          </div>

          {/* Step 3: Engineering Standards Checklist */}
          <div className="border border-pinaka-hairline bg-white/90 p-8 shadow-sm">
            <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
              Step 03 &middot; Engineering Standards
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pinaka-charcoal mt-1 mb-4">
              Quality & Verification Baseline
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">Automated Test Suites</strong>
                  <span>Every project must implement unit or integration tests (Jest, Vitest, PyTest) before pilot.</span>
                </div>
              </div>

              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">Clean Git Commit Pattern</strong>
                  <span>Strict prefix convention: <code className="font-mono text-pinaka-saffron">add:</code>, <code className="font-mono text-pinaka-saffron">fix:</code>, <code className="font-mono text-pinaka-saffron">update:</code>.</span>
                </div>
              </div>

              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">Zero Plaintext Secrets</strong>
                  <span>All API tokens and credentials isolated in <code className="font-mono">.env</code>; zero hardcoded keys.</span>
                </div>
              </div>

              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">Modular Architecture</strong>
                  <span>Independent service decoupling and documented API boundaries.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Step 4: Submission Form */}
        <div id="submit-form" className="border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-8 sm:p-12 shadow-editorial mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
              Step 04 &middot; On-Platform Application
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pinaka-charcoal mt-1">
              Submit Candidate Project to Pinaka Foundry
            </h2>
            <p className="text-xs sm:text-sm text-pinaka-slate mt-2 leading-relaxed max-w-2xl">
              Fill in your project specifications below. Our studio lead will review your submission 
              within 48 hours for onboarding and ledger inclusion.
            </p>
          </div>

          {submitResult ? (
            /* Success Receipt Display */
            <div className="border border-emerald-300 bg-emerald-50/80 p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-emerald-900">
                    Application Successfully Recorded
                  </h3>
                  <span className="font-mono text-xs text-emerald-700">
                    Reference ID: <strong>{submitResult.submissionId}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed mb-6">
                Your candidate project <strong className="font-semibold">{submitResult.submission.name}</strong> has been logged in the 
                Pinaka Foundry intake register. You will be contacted via <strong className="font-semibold">{submitResult.submission.contact}</strong> for 
                Gate 1 evaluation.
              </p>

              <div className="border-t border-emerald-200 pt-4 flex flex-wrap items-center gap-4">
                <Link href="/">
                  <Button variant="primary" size="sm">
                    Return to Studio Ledger
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitResult(null);
                    setFormData({
                      name: '',
                      leadBuilder: '',
                      contact: '',
                      category: 'Campus Tech',
                      track: 'incubating',
                      tagline: '',
                      techStack: '',
                      repoUrl: '',
                      demoUrl: '',
                      description: '',
                    });
                  }}
                  className="text-xs font-mono uppercase tracking-wider text-emerald-800 hover:underline cursor-pointer"
                >
                  Submit Another Project
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Intake Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Project Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. SkillSphere, Opendoor"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>

                {/* Lead Builder */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Lead Builder Name / Handle *
                  </label>
                  <input
                    type="text"
                    name="leadBuilder"
                    required
                    value={formData.leadBuilder}
                    onChange={handleInputChange}
                    placeholder="e.g. KSHITIZ (@github)"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Contact Email or Handle */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Contact Email / Discord / Telegram *
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="builder@domain.com or @handle"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>

                {/* Classification Category */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Industry Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron cursor-pointer"
                  >
                    <option value="Campus Tech">Campus Tech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="GovTech">GovTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                {/* Candidate Track */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Proposed Track *
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron cursor-pointer"
                  >
                    <option value="incubating">Incubation Track (In-Development)</option>
                    <option value="research">Applied Research</option>
                    <option value="community">Community Venture</option>
                    <option value="flagship">Flagship Candidate (Live Deployed)</option>
                  </select>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                  One-Sentence Tagline *
                </label>
                <input
                  type="text"
                  name="tagline"
                  required
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="e.g. Digital hostel management & gate pass platform for university campuses."
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* GitHub Repository URL */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    GitHub Repository Link (Public or Private)
                  </label>
                  <input
                    type="url"
                    name="repoUrl"
                    value={formData.repoUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/project"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>

                {/* Demo / Live URL */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Live Demo URL (If Deployed)
                  </label>
                  <input
                    type="url"
                    name="demoUrl"
                    value={formData.demoUrl}
                    onChange={handleInputChange}
                    placeholder="https://my-app.vercel.app"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>
              </div>

              {/* Primary Tech Stack */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                  Primary Tech Stack (Comma-Separated) *
                </label>
                <input
                  type="text"
                  name="techStack"
                  required
                  value={formData.techStack}
                  onChange={handleInputChange}
                  placeholder="e.g. React 19, Node.js, Express, PostgreSQL, Prisma, Docker"
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                />
              </div>

              {/* Description & Problem Solved */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                  Problem Solved & Architecture Overview *
                </label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Explain the specific user pain point, the architectural solution, and current stage of the codebase..."
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-pinaka-ash">
                  100% Sovereign IP Protected &middot; Gate 1 Evaluation
                </span>
                <Button variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" />
                      Recording Application...
                    </>
                  ) : (
                    <>
                      Submit Candidate Project
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
