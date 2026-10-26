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
  Users,
  ArrowRight,
  Compass,
} from 'lucide-react';

const PROBLEM_BRIEF_TEMPLATE = `# Project Application Brief

## 1. Problem Statement
* What specific friction, inefficiency, or pain point exists?
* Describe the problem in 2-3 concise sentences.

## 2. Target Users & Personas
* Who experiences this problem directly?
* How are they currently reached or accessed for validation?

## 3. Evidence of Progress (Not Just Opinion)
* Direct Quotes / User Feedback:
* Prototypes, code repositories, or simulation results:

## 4. Current Alternatives & Limitations
* What tools, processes, or software do users currently use?
* Why do these alternatives fall short?

## 5. What are you seeking from Pinaka?
* Visibility & Discovery / Feedback / Collaborators via SkillSphere / Testing`;

const MANIFEST_TEMPLATE = `{
  "$schema": "https://pinaka.dev/schemas/manifest.v1.json",
  "id": "your-project-slug",
  "name": "Project Name",
  "tagline": "A single compelling sentence describing the value proposition.",
  "track": "incubating",
  "status": "prototype",
  "leadBuilder": "Creator Name or Team Name",
  "repoUrl": "https://github.com/username/project",
  "demoUrl": "https://project.example.com",
  "description": "Summary of the problem, proposed solution, and current user impact.",
  "techStack": [
    "Next.js",
    "Node.js",
    "PostgreSQL"
  ],
  "highlights": [
    "Key architectural achievement or unique technical feature #1",
    "Performance, security, or concurrency guarantee #2",
    "Evidence of progress, test feedback, or milestone #3"
  ]
}`;

export default function OnboardPage() {
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);

  // Form state without domain
  const [formData, setFormData] = useState({
    name: '',
    leadBuilder: '',
    contact: '',
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
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitResult(data);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pinaka-slate hover:text-pinaka-saffron transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            <span>Return to Pinaka Home</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-5 sm:p-10 lg:p-12 mb-8 sm:mb-12 shadow-editorial rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <PinakaBow className="h-4.5 sm:h-5 w-auto text-pinaka-saffron shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
              Creator Application & Curation Guide
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pinaka-charcoal mb-3 sm:mb-4">
            Showcase Your Work on Pinaka
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-pinaka-slate leading-relaxed max-w-3xl font-sans mb-6 sm:mb-8">
            Pinaka is a manually curated ecosystem for ambitious ideas, promising projects, research, and emerging ventures. 
            Anyone may apply to showcase their work. We discover and present promising projects, help them find an audience, 
            and where creators want execution support, provide a path toward team formation through{' '}
            <strong className="text-pinaka-stone font-semibold">SkillSphere</strong>.
          </p>

          {/* Clean Guarantees Grid (Symbols and section numbers removed) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-5 sm:pt-6 border-t border-pinaka-hairline">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-pinaka-saffron shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-charcoal">
                  100% Creator Ownership
                </h2>
                <p className="text-xs text-pinaka-slate mt-1 leading-relaxed">
                  Submitting or showcasing work never transfers ownership of your code, design, or IP to Pinaka.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-pinaka-saffron shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-charcoal">
                  SkillSphere Squad Collaboration
                </h2>
                <p className="text-xs text-pinaka-slate mt-1 leading-relaxed">
                  A transparent pathway to connect with student/alumni collaborators and form project squads.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Compass className="h-5 w-5 text-pinaka-saffron shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-charcoal">
                  Manual & Fair Curation
                </h2>
                <p className="text-xs text-pinaka-slate mt-1 leading-relaxed">
                  Reviewed manually on problem significance, originality, evidence, and creator readiness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 sm:space-y-10 mb-10 sm:mb-16">
          
          {/* Step 1: Problem Definition */}
          <div className="border border-pinaka-hairline bg-white/90 p-5 sm:p-8 shadow-sm rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 pb-4 border-b border-pinaka-hairline">
              <div>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Step 01 &middot; Preparation
                </span>
                <h2 className="font-serif text-lg sm:text-2xl font-bold text-pinaka-charcoal mt-1">
                  Prepare Your Project Brief
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(PROBLEM_BRIEF_TEMPLATE, 'brief')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-saffron hover:text-white transition-colors rounded-sm cursor-pointer shrink-0 w-full sm:w-auto"
              >
                {copiedBrief ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedBrief ? 'Copied Brief Template' : 'Copy Brief Template'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-4">
              We look for genuine problem significance and evidence of progress over attractive pitch decks. 
              Use this structure to outline your project:
            </p>

            <pre className="p-3.5 sm:p-4 bg-pinaka-charcoal text-white font-mono text-[11px] sm:text-xs overflow-x-auto rounded-sm leading-relaxed max-h-56">
              {PROBLEM_BRIEF_TEMPLATE}
            </pre>
          </div>

          {/* Step 2: Add pinaka.json Manifest */}
          <div className="border border-pinaka-hairline bg-white/90 p-5 sm:p-8 shadow-sm rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 pb-4 border-b border-pinaka-hairline">
              <div>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Step 02 &middot; Optional Repository Ingestion
                </span>
                <h2 className="font-serif text-lg sm:text-2xl font-bold text-pinaka-charcoal mt-1">
                  Add <code className="font-mono text-pinaka-saffron bg-pinaka-ice px-1.5 sm:px-2 py-0.5 rounded-sm text-xs sm:text-lg">pinaka.json</code> to Your Repo
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(MANIFEST_TEMPLATE, 'manifest')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-saffron hover:text-white transition-colors rounded-sm cursor-pointer shrink-0 w-full sm:w-auto"
              >
                {copiedManifest ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedManifest ? 'Copied Manifest' : 'Copy pinaka.json Template'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-4">
              For codebases, adding a <code className="font-mono font-semibold text-pinaka-stone">pinaka.json</code> manifest allows 
              structured indexing of your creator credit, live demo, and tech stack:
            </p>

            <pre className="p-3.5 sm:p-4 bg-pinaka-charcoal text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto rounded-sm leading-relaxed max-h-56">
              {MANIFEST_TEMPLATE}
            </pre>
          </div>

          {/* Step 3: Creator Rights Notice */}
          <div id="rights" className="border border-pinaka-hairline bg-white/90 p-5 sm:p-8 shadow-sm rounded-sm">
            <span className="font-mono text-[11px] sm:text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
              Creator Rights & Credit
            </span>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-pinaka-charcoal mt-1 mb-4">
              Our Commitments to Creators
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-3.5 sm:p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">No Automatic Ownership Transfer</strong>
                  <span>Submitting or showcasing work does not grant Pinaka equity, IP, or repository control.</span>
                </div>
              </div>

              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-3.5 sm:p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">Accurate Contributor Credit</strong>
                  <span>Public credit reflects actual contributions and the creator’s preferred public name.</span>
                </div>
              </div>

              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-3.5 sm:p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">No Confidentiality Breaches</strong>
                  <span>Never share credentials, private keys, or unfiled patent details in public summaries.</span>
                </div>
              </div>

              <div className="border border-pinaka-hairline bg-pinaka-ice/50 p-3.5 sm:p-4 rounded-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pinaka-saffron shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pinaka-stone block mb-0.5">Separate Collaboration Agreements</strong>
                  <span>If collaborators or Pinaka contribute substantial work, terms are agreed before work begins.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Step 4: Submission Form (Domain field cleanly removed) */}
        <div id="submit-form" className="border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-5 sm:p-10 lg:p-12 shadow-editorial mb-12 sm:mb-16 rounded-sm">
          <div className="mb-6 sm:mb-8">
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
              Application &middot; Manual Review
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-pinaka-charcoal mt-1">
              Apply to Showcase on Pinaka
            </h2>
            <p className="text-xs sm:text-sm text-pinaka-slate mt-2 leading-relaxed max-w-2xl">
              Fill in your project details below. Our curation team manually reviews each application 
              for problem significance, originality, and evidence before publication.
            </p>
          </div>

          {submitResult ? (
            /* Success Receipt Display */
            <div className="border border-emerald-300 bg-emerald-50/80 p-5 sm:p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-900">
                    Application Received for Review
                  </h3>
                  <span className="font-mono text-[11px] sm:text-xs text-emerald-700">
                    Reference ID: <strong>{submitResult.submissionId}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed mb-6">
                Your application for <strong className="font-semibold">{submitResult.submission.name}</strong> has been logged for manual review. 
                We will follow up via <strong className="font-semibold">{submitResult.submission.contact}</strong> regarding review feedback or profile preparation.
              </p>

              <div className="border-t border-emerald-200 pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="primary" size="sm" className="w-full sm:w-auto">
                    Return to Portfolio
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
                      track: 'incubating',
                      tagline: '',
                      techStack: '',
                      repoUrl: '',
                      demoUrl: '',
                      description: '',
                    });
                  }}
                  className="text-xs font-mono uppercase tracking-wider text-emerald-800 hover:underline cursor-pointer py-1"
                >
                  Submit Another Project
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Intake Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Project Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Project Title *
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

                {/* Creator Credit */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Creator Name / Team Credit *
                  </label>
                  <input
                    type="text"
                    name="leadBuilder"
                    required
                    value={formData.leadBuilder}
                    onChange={handleInputChange}
                    placeholder="e.g. Your Name, Team Name, or @handle"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Contact Email or Handle */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Contact Email / Profile *
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="creator@domain.com or @handle"
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                  />
                </div>

                {/* Portfolio Category (Domain selector removed) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Portfolio Category *
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron cursor-pointer"
                  >
                    <option value="flagship">Featured (Deployed & Operating)</option>
                    <option value="incubating">Ongoing Work (Active Prototype / MVP)</option>
                    <option value="breakthroughs">Breakthroughs (Advanced AI / DeepTech)</option>
                    <option value="proposals">Proposals (Suggested Idea / Problem Brief)</option>
                  </select>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                  One-Sentence Value Proposition *
                </label>
                <input
                  type="text"
                  name="tagline"
                  required
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="A single concise sentence describing what the project does and for whom."
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* GitHub Repository URL */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                    Codebase or Document Link
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
                    Interactive Demo / Prototype URL
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
                  Primary Technologies / Tools *
                </label>
                <input
                  type="text"
                  name="techStack"
                  required
                  value={formData.techStack}
                  onChange={handleInputChange}
                  placeholder="e.g. React, Node.js, Python, PostgreSQL, PyTorch"
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron"
                />
              </div>

              {/* Description & Problem Solved */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-pinaka-stone mb-1.5">
                  Problem Addressed & Current Evidence *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Explain the specific problem, target users, proposed solution, and what evidence of progress currently exists..."
                  className="w-full bg-white border border-pinaka-hairline text-pinaka-stone text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-pinaka-saffron leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-pinaka-ash text-center sm:text-left">
                  100% Creator IP Retained &middot; Manual Review Process
                </span>
                <Button variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application for Review
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
