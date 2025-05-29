import React, { useState } from "react";
import "./App.css";

// Color theme vars from prompt
const COLORS = {
  primary: "#1A202C",      // dark navy
  secondary: "#F7FAFC",    // very light
  accent: "#D97706",       // gold/amber
};

// PUBLIC_INTERFACE
/**
 * Main App container for LuxMatch Pro.
 * Implements dashboard layout, authentication state, and panels for Profile, Job Matches, and Skills.
 */
function App() {
  // Simulate authentication state (replace with backend/full auth as needed)
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    goals: "",
    resume: null,
  });

  // Job matches and skill recommendations (simulate API results)
  const [jobMatches, setJobMatches] = useState([]);
  const [skillRecommendations, setSkillRecommendations] = useState([]);

  // PUBLIC_INTERFACE
  /** Handles profile input changes */
  function handleProfileChange(e) {
    const { name, value, files } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  }

  // PUBLIC_INTERFACE
  /** Simulate parsing resume and updating profile fields */
  function handleResumeUpload() {
    // In production, upload file and parse resume server-side.
    setProfile((prev) => ({
      ...prev,
      skills: "JavaScript, React, Node.js",
      experience: "3 years",
      goals: "Senior Frontend Engineer",
    }));
    // Simulate job and skill results for demo
    setJobMatches([
      {
        title: "Frontend Engineer",
        company: "LuxCorp",
        location: "Remote",
        matchScore: 97,
        link: "#"
      },
      {
        title: "React Developer",
        company: "Opulent Works",
        location: "New York, NY",
        matchScore: 91,
        link: "#"
      }
    ]);
    setSkillRecommendations([
      "TypeScript",
      "Next.js",
      "UI Animation",
      "A/B Testing"
    ]);
  }

  // PUBLIC_INTERFACE
  /** Handles manual profile submission, simulates match/skills */
  function handleProfileSubmit(e) {
    e.preventDefault();
    // Simulate job and skill API results (replace with backend API call)
    setJobMatches([
      {
        title: "Product Engineer",
        company: "Gilded Labs",
        location: "San Francisco, CA",
        matchScore: 95,
        link: "#"
      },
      {
        title: "Web Application Developer",
        company: "Elite Tech",
        location: "Remote",
        matchScore: 88,
        link: "#"
      }
    ]);
    setSkillRecommendations([
      "Figma",
      "GraphQL",
      "AWS",
      "Team Leadership"
    ]);
  }

  // PUBLIC_INTERFACE
  /** Handles sign-in state (for optional authentication) */
  function handleLogin(e) {
    e.preventDefault();
    setAuthenticated(true);
    setShowLogin(false);
  }

  function handleLogout() {
    setAuthenticated(false);
    setProfile({
      name: "",
      email: "",
      skills: "",
      experience: "",
      goals: "",
      resume: null,
    });
    setJobMatches([]);
    setSkillRecommendations([]);
  }

  // UI components for clarity
  const AuthBar = () => (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          <span className="text-sm hidden md:inline opacity-80">{profile.email || "user@lux.com"}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-900 text-white rounded transition hover:bg-gray-700"
          >
            Log out
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowLogin(true)}
          className="px-5 py-2 bg-[var(--kavia-orange)] rounded text-white font-medium hover:bg-amber-600 transition"
        >
          Sign In
        </button>
      )}
    </div>
  );

  // Responsive nav bar
  const NavBar = () => (
    <nav
      className="w-full fixed top-0 left-0 z-40 bg-white shadow"
      style={{
        background: COLORS.secondary,
        borderBottom: `2px solid ${COLORS.accent}`,
      }}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-2 font-bold text-lg" style={{ color: COLORS.primary }}>
          <span
            className="rounded-full bg-[var(--kavia-orange)] text-white w-7 h-7 flex items-center justify-center"
            style={{
              backgroundColor: COLORS.accent,
              fontSize: "1.35rem",
              fontWeight: 800,
              letterSpacing: "-1px"
            }}
          >★</span>
          <span>LuxMatch<span className="font-light text-lg ml-1">Pro</span></span>
        </div>
        <AuthBar />
      </div>
    </nav>
  );

  // Login Modal (simple version)
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl shadow-xl px-8 py-7 max-w-sm w-[95%] flex flex-col gap-5"
      >
        <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: COLORS.primary }}>Sign in to LuxMatch Pro</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border px-3 py-2 rounded text-gray-900 outline-amber-700"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border px-3 py-2 rounded text-gray-900 outline-amber-700"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-amber-600 text-white font-bold hover:bg-amber-700"
        >
          Sign In
        </button>
        <button
          type="button"
          className="text-sm text-amber-700 mt-2"
          onClick={() => setShowLogin(false)}
        >Cancel</button>
      </form>
    </div>
  );

  // Main dashboard area
  const Dashboard = () => (
    <main
      className="pt-24 min-h-screen px-2 md:px-0"
      style={{
        background: COLORS.secondary,
        minHeight: "100vh",
      }}
    >
      <div className="container mx-auto max-w-[1160px]">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Input/Upload */}
          <section className="xl:col-span-1 rounded-lg bg-white shadow border p-7 mb-6 xl:mb-0 flex flex-col" style={{ borderColor: COLORS.accent }}>
            <h2 className="font-bold text-xl mb-3 text-[var(--kavia-orange)]" style={{ color: COLORS.accent }}>
              Your Profile
            </h2>
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Name"
                className="border rounded px-3 py-2"
                required
                disabled={!isAuthenticated}
              />
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Email"
                className="border rounded px-3 py-2"
                required
                disabled={!isAuthenticated}
              />
              <textarea
                name="skills"
                value={profile.skills}
                onChange={handleProfileChange}
                placeholder="Skills (comma separated)"
                className="border rounded px-3 py-2"
                rows={2}
                disabled={!isAuthenticated}
              ></textarea>
              <input
                name="experience"
                value={profile.experience}
                onChange={handleProfileChange}
                placeholder="Experience (e.g., 3 years)"
                className="border rounded px-3 py-2"
                disabled={!isAuthenticated}
              />
              <input
                name="goals"
                value={profile.goals}
                onChange={handleProfileChange}
                placeholder="Career Goals"
                className="border rounded px-3 py-2"
                disabled={!isAuthenticated}
              />
              <label className="block mt-1 text-xs text-gray-500 font-semibold">
                Resume (PDF/DOC)
                <input
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block"
                  disabled={!isAuthenticated}
                  onChange={handleProfileChange}
                />
              </label>
              <div className="flex flex-col gap-2 mt-2">
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-[var(--kavia-orange)] hover:bg-amber-700 text-white font-bold mt-1 transition"
                  style={{ background: COLORS.accent, opacity: isAuthenticated ? 1 : 0.5 }}
                  disabled={!isAuthenticated}
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  className="w-full py-2 rounded border border-amber-600 text-amber-700 font-bold hover:bg-amber-100 transition"
                  onClick={handleResumeUpload}
                  disabled={!isAuthenticated}
                  style={{ opacity: isAuthenticated ? 1 : 0.5 }}
                >
                  Upload Resume
                </button>
              </div>
            </form>
          </section>
          {/* Job Matches */}
          <section className="xl:col-span-1 rounded-lg bg-white shadow border p-7 flex flex-col" style={{ borderColor: COLORS.accent }}>
            <h2 className="font-bold text-xl mb-3 text-[var(--kavia-orange)]" style={{ color: COLORS.accent }}>
              Job Matches
            </h2>
            <div className="flex-1 flex flex-col gap-5">
              {jobMatches.length === 0 ? (
                <div className="text-gray-400 italic text-sm tracking-wide mt-4">Fill out your profile to see tailored jobs.</div>
              ) : (
                jobMatches.map((job, idx) => (
                  <a
                    key={idx}
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border rounded-lg p-4 mb-1 hover:shadow bg-gray-50 group transition"
                    style={{ borderColor: COLORS.primary }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 group-hover:text-[var(--kavia-orange)]" style={{ color: COLORS.primary }}>{job.title}</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded font-bold">{job.matchScore}% match</span>
                    </div>
                    <div className="text-gray-600">{job.company} &bull; {job.location}</div>
                  </a>
                ))
              )}
            </div>
          </section>
          {/* Skill Recommendations */}
          <section className="xl:col-span-1 rounded-lg bg-white shadow border p-7 flex flex-col" style={{ borderColor: COLORS.accent }}>
            <h2 className="font-bold text-xl mb-3 text-[var(--kavia-orange)]" style={{ color: COLORS.accent }}>
              Skill Recommendations
            </h2>
            <div className="flex-1 flex flex-col gap-3">
              {skillRecommendations.length === 0 ? (
                <div className="text-gray-400 italic text-sm mt-4">Recommendations appear after matching!</div>
              ) : (
                skillRecommendations.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-amber-50"
                    style={{ borderColor: COLORS.primary }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: COLORS.accent }}></span>
                    <span className="font-medium text-gray-800">{skill}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );

  // Root wrapper with light/luxury styling
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: COLORS.secondary,
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        color: COLORS.primary,
      }}
    >
      <NavBar />
      <div className="pt-24" />
      {/* Optionally show login modal */}
      {showLogin && <LoginModal />}
      {/* Main area */}
      <Dashboard />
      <footer className="pt-10 pb-8 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} LuxMatch Pro &mdash; Crafted with <span style={{ color: COLORS.accent, fontWeight: "bold" }}>luxury</span>
      </footer>
    </div>
  );
}

export default App;
