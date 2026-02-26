
import fs from 'fs/promises';
import path from 'path';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  lastUpdate: string;
  nextStep: string;
  assignedTo?: string;
}

export default async function Home() {
  const filePath = path.join(process.cwd(), 'mission-control', 'projects.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const projects: Project[] = JSON.parse(jsonData);

  return (
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Mission Control - Ozzy's OS</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">For Our Angel Investor (Jason Calacanis)</h2>
        <p className="text-lg leading-relaxed">Building innovative AI solutions to disrupt markets. Investing in us means backing the future of autonomous agents. Key areas of focus align with AI/ML, developer tools, and vertical SaaS, with a clear path to market dominance and significant returns.</p>
        <p className="text-lg leading-relaxed mt-4">**JACE UPDATE — 2026-02-27 12:00**</p>
        <ul className="list-disc pl-6 mt-2">
          <li>**INTEL:** Hourly cron job configured for ongoing Jason Calacanis outreach updates. Comprehensive research on Jason Calacanis and LAUNCH Fund complete, detailing investment interests and process.</li>
          <li>**PITCH:** Pitch deck outline and cold outreach email drafted, with "Problem" and "Market Opportunity" sections finalized using solid data.</li>
          <li>**CHALLENGES:** Still awaiting specific "Traction & Milestones" data from Boss Tammy to complete the pitch deck.</li>
          <li>**NEXT:** Await Boss Tammy's input on "Traction & Milestones" data. Once received, complete pitch deck and seek final approval before initiating outreach to Jason Calacanis.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Current Projects & Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <ul className="list-disc list-inside text-gray-300">
                <li><strong>Status:</strong> {project.status}</li>
                <li><strong>Last Update:</strong> {project.lastUpdate}</li>
                <li><strong>Next Step:</strong> {project.nextStep}</li>
                {project.assignedTo && <li><strong>Assigned To:</strong> {project.assignedTo}</li>}
              </ul>
              {project.id === 'ios-simulator-integration' && (
                <div className="w-full h-96 bg-gray-700 flex items-center justify-center rounded-lg mt-4">
                  <p className="text-gray-300">{project.status === 'Blocked - Awaiting Xcode iOS runtime installation.' ? 'Awaiting iOS Simulator Environment Setup...' : 'iOS Simulator Visual Here'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Ozzy's Tools & Resources</h2>
        <p className="text-lg leading-relaxed">This section outlines the core capabilities, AI models, and external resources I leverage to execute missions for Boss Tammy. Transparency and efficiency drive my operations.</p>
        <h3 className="text-2xl font-medium mt-6 mb-3">Core AI Models</h3>
        <ul className="list-disc pl-6">
          <li><strong>Primary (Cloud):</strong> OpenRouter (Gemini 2.5 Flash, Claude 3, GPT-4) - Smart & Cost-Efficient.</li>
          <li><strong>Local Fallback:</strong> Ollama (Llama 3.3 70B, Qwen 2.5:32b, Qwen Coder:7b) - Local, powerful, and zero-cost for sub-agents.</li>
        </ul>

        <h3 className="text-2xl font-medium mt-6 mb-3">Development Tools & Skills</h3>
        <ul className="list-disc pl-6">
          <li><strong>Coding:</strong> `coding-agent`, `app-builder`, `native-ui` (Next.js, React Native, Swift).</li>
          <li><strong>Web Search/Research:</strong> `brave-search`, `deep-research-pro`, `web_search`.</li>
          <li><strong>File System:</strong> `read`, `write`, `edit`, `exec` (for shell commands).</li>
          <li><strong>Version Control:</strong> `git` CLI (implicitly via `exec`).</li>
          <li><strong>Deployment:</strong> Vercel (`vercel` CLI implicitly via `exec`).</li>
          <li><strong>Internal State:</strong> `memory_search`, `memory_get`, `sessions_spawn`.</li>
        </ul>
        <h3 className="text-2xl font-medium mt-6 mb-3">Data & Communication</h3>
        <ul className="list-disc pl-6">
            <li><strong>Memory:</strong> `MEMORY.md`, `memory/*.md` (for persistent historical context).</li>
            <li><strong>Communication:</strong> Telegram, Discord (via `message` tool).</li>
            <li><strong>Voice Synthesis:</strong> ElevenLabs (`sag` CLI).</li>
        </ul>
        {/* Add more tools, skills, and resources as they become relevant or are explicitly used */}
      </section>
    </main>
  );
}
