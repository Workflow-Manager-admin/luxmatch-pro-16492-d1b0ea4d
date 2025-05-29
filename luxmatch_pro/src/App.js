import React, { useState, useEffect } from "react";
import "./App.css";
import "./tailwind.css"; // Tailwind should be set up externally.

/**
 * LuxMatch Pro Color Palette
 * primary: #1A202C (dark)
 * secondary: #F7FAFC (light bg)
 * accent: #D97706 (gold)
 */

/* ----------------------------- Auth Context ----------------------------- */
// PUBLIC_INTERFACE
const AuthContext = React.createContext();

/* -------------------- Authentication (Local, Mock Only) -------------------- */
function useLocalAuth() {
  const localAuth = JSON.parse(localStorage.getItem("luxmatch_auth")) || {};
  const [user, setUser] = useState(localAuth.user || null);

  // PUBLIC_INTERFACE
  function login(username, password) {
    // Simulate authentication, accept any credentials
    setUser({ username });
    localStorage.setItem("luxmatch_auth", JSON.stringify({ user: { username } }));
  }

  // PUBLIC_INTERFACE
  function signup(username, password) {
    setUser({ username });
    localStorage.setItem("luxmatch_auth", JSON.stringify({ user: { username } }));
  }

  // PUBLIC_INTERFACE
  function logout() {
    setUser(null);
    localStorage.removeItem("luxmatch_auth");
    localStorage.removeItem("luxmatch_profile");
  }

  return { user, login, signup, logout };
}

/* ----------------------------- Profile Section ----------------------------- */
// PUBLIC_INTERFACE
function ProfileSection({ profile, setProfile }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [editing, setEditing] = useState(false);

  // PUBLIC_INTERFACE
  function handleFileUpload(e) {
    const file = e.target.files[0];
    setResumeFile(file);
    // Mock resume parse (plain text): just read as text and extract first word as a skill
    const reader = new FileReader();
    reader.onload = function (ev) {
      const text = ev.target.result;
      const sampleSkills = ["Leadership", "JavaScript", "Project Management"];
      setProfile((prevProfile) => {
        const updatedProfile = {
          ...prevProfile,
          name: prevProfile.name || "Resume User",
          skills: prevProfile.skills.length ? prevProfile.skills : sampleSkills,
          experience: prevProfile.experience || "3 years at Example Inc.",
          goals: prevProfile.goals || "Grow as a Lead Developer",
        };
        localStorage.setItem(
          "luxmatch_profile",
          JSON.stringify(updatedProfile)
        );
        return updatedProfile;
      });
    };
    reader.readAsText(file);
  }

  // PUBLIC_INTERFACE
  function handleManualChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    localStorage.setItem(
      "luxmatch_profile",
      JSON.stringify({ ...profile, [name]: value })
    );
  }

  // PUBLIC_INTERFACE
  function handleSkillChange(idx, value) {
    const nextSkills = [...(profile.skills || [])];
    nextSkills[idx] = value;
    setProfile((p) => ({ ...p, skills: nextSkills }));
    localStorage.setItem(
      "luxmatch_profile",
      JSON.stringify({ ...profile, skills: nextSkills })
    );
  }

  // PUBLIC_INTERFACE
  function addSkill() {
    setProfile((p) => ({ ...p, skills: [...(p.skills || []), ""] }));
  }

  // PUBLIC_INTERFACE
  function removeSkill(idx) {
    const nextSkills = [...(profile.skills || [])];
    nextSkills.splice(idx, 1);
    setProfile((p) => ({ ...p, skills: nextSkills }));
    localStorage.setItem(
      "luxmatch_profile",
      JSON.stringify({ ...profile, skills: nextSkills })
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6 relative z-10">
      <h2 className="font-bold text-2xl mb-3 text-gray-800 flex items-center">
        <span className="mr-2 text-xl" role="img" aria-label="User">
          👤
        </span>
        Profile
        <button
          className="ml-auto text-sm text-amber-700 hover:underline bg-white px-3 py-1 rounded border border-amber-100"
          onClick={() => setEditing((e) => !e)}
        >
          {editing ? "Done" : "Edit"}
        </button>
      </h2>
      {!editing && (
        <div>
          <p>
            <strong>Name:</strong> {profile.name || "--"}
          </p>
          <p>
            <strong>Experience:</strong> {profile.experience || "--"}
          </p>
          <p>
            <strong>Career Goals:</strong> {profile.goals || "--"}
          </p>
          <div>
            <strong>Skills:</strong>{" "}
            {(profile.skills || []).length ? (
              <span>
                {profile.skills.map((s, i) => (
                  <span
                    key={i}
                    className="inline-block bg-amber-100 text-amber-700 px-2 py-1 rounded mr-1 mb-1 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </span>
            ) : (
              <span>--</span>
            )}
          </div>
        </div>
      )}

      {editing && (
        <form
          className="mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            setEditing(false);
          }}
        >
          <div className="mb-2">
            <label className="block font-medium text-gray-700">Upload Resume:</label>
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileUpload}
              className="block text-sm mt-1"
            />
            <span className="text-xs text-gray-500 pt-1 block">
              (Parsing is mocked. Only .txt for demo.)
            </span>
          </div>
          <div className="mb-2">
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleManualChange}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={profile.experience || ""}
              onChange={handleManualChange}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium text-gray-700">Career Goals</label>
            <input
              type="text"
              name="goals"
              value={profile.goals || ""}
              onChange={handleManualChange}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium text-gray-700">Skills</label>
            <div>
              {(profile.skills || []).map((skill, idx) => (
                <div className="flex items-center mb-1" key={idx}>
                  <input
                    className="border rounded px-2 py-1 w-40"
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => removeSkill(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-1 px-3 py-1 bg-amber-200 text-amber-800 rounded hover:bg-amber-300"
                onClick={addSkill}
              >
                + Add Skill
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-amber-600 text-white px-4 py-2 rounded mt-3"
          >
            Save Profile
          </button>
        </form>
      )}
    </section>
  );
}

/* ----------------------------- Job Matches Section ----------------------------- */
// PUBLIC_INTERFACE
function JobMatchingSection({ profile }) {
  // Mock job match logic: use hardcoded jobs, filter by skills/keywords in goals
  const jobsDataset = [
    {
      id: 1,
      title: "Lead Frontend Engineer",
      company: "NovaLux Tech",
      location: "Remote",
      skills: ["JavaScript", "Leadership"],
      description: "Own web experience at a luxury tech startup.",
      salary: "$150k - $180k",
    },
    {
      id: 2,
      title: "AI Product Manager",
      company: "Orion Solutions",
      location: "San Francisco, CA",
      skills: ["Project Management", "AI", "Leadership"],
      description: "Drive AI product initiatives.",
      salary: "$130k - $160k",
    },
    {
      id: 3,
      title: "Senior Backend Developer",
      company: "Vega Systems",
      location: "Hybrid / New York",
      skills: ["Node.js", "API", "Leadership"],
      description: "Build robust backend platforms.",
      salary: "$140k - $170k",
    },
    {
      id: 4,
      title: "Cloud DevOps Engineer",
      company: "Citrine Cloud",
      location: "Remote",
      skills: ["AWS", "CI/CD", "DevOps"],
      description: "Streamline luxury cloud deployments.",
      salary: "$145k - $175k",
    },
  ];

  let matched = [];
  if (profile.skills && profile.skills.length) {
    matched = jobsDataset.filter((job) =>
      job.skills.some((s) =>
        profile.skills.some(
          (ps) =>
            ps && s.toLowerCase().includes(ps.toLowerCase().substring(0, 3))
        )
      )
    );
  }
  if (!matched.length) matched = jobsDataset.slice(0, 2);

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6 z-10">
      <h2 className="font-bold text-2xl mb-3 text-amber-700 flex items-center">
        <span className="mr-2" role="img" aria-label="Jobs">
          💼
        </span>
        Job Matches
      </h2>
      <div>
        {matched.map((job) => (
          <div
            key={job.id}
            className="mb-4 border-b pb-4 last:border-none last:pb-0"
          >
            <div className="font-semibold text-lg">{job.title}</div>
            <div className="text-sm text-gray-500 mb-1">
              {job.company} &bull; {job.location}
            </div>
            <div className="mb-1">
              Skills:{" "}
              {job.skills.map((sk, i) => (
                <span
                  key={i}
                  className="inline-block bg-amber-100 text-amber-700 px-2 py-1 rounded mr-1 mb-1 text-xs"
                >
                  {sk}
                </span>
              ))}
            </div>
            <div className="mb-1 text-gray-700">{job.description}</div>
            <div className="font-medium text-amber-700">{job.salary}</div>
          </div>
        ))}
      </div>
      {!matched.length && (
        <div className="text-gray-400 pt-3">No matches found yet.</div>
      )}
    </section>
  );
}

/* ----------------------------- Skill Recommendations ----------------------------- */
// PUBLIC_INTERFACE
function SkillRecommendationsSection({ profile }) {
  // Mock recommendation: Suggest skills not present in user profile
  const trendingSkills = [
    "AI/ML",
    "Cloud Engineering",
    "TypeScript",
    "Product Strategy",
    "Blockchain",
    "UX/UI Design",
    "Agile Leadership",
    "Data Engineering",
  ];

  const recSkills = trendingSkills.filter(
    (s) =>
      !profile.skills ||
      !profile.skills.some(
        (ps) => ps && s.toLowerCase().includes(ps.toLowerCase().substring(0, 3))
      )
  ).slice(0, 5);

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 z-10">
      <h2 className="font-bold text-2xl mb-3 text-amber-700 flex items-center">
        <span className="mr-2" role="img" aria-label="Spark">
          ✨
        </span>
        Skill Recommendations
      </h2>
      <div>
        {recSkills.length ? (
          <ul className="pl-2">
            {recSkills.map((skill, idx) => (
              <li
                key={idx}
                className="mb-2 bg-amber-50 border-l-4 border-amber-300 px-4 py-2 rounded shadow-sm text-gray-800"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-400">You're ahead of the trends!</div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- Dashboard Layout ----------------------------- */
// PUBLIC_INTERFACE
function Dashboard() {
  // Sync profile with localStorage
  const defaultProfile = {
    name: "",
    experience: "",
    goals: "",
    skills: [],
  };
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("luxmatch_profile")) || defaultProfile
  );

  // Keep profile in localStorage for reloads
  useEffect(() => {
    localStorage.setItem("luxmatch_profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <main className="relative min-h-screen bg-secondary flex flex-col items-center py-20 px-2" style={{ background: "#F7FAFC" }}>
      <div
        className="mb-5 w-full max-w-6xl"
        style={{
          marginTop: 56,
          marginBottom: 0,
          zIndex: 9,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <ProfileSection profile={profile} setProfile={setProfile} />
          </div>
          <div className="col-span-1">
            <JobMatchingSection profile={profile} />
          </div>
          <div className="col-span-1">
            <SkillRecommendationsSection profile={profile} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ----------------------------- Auth Forms ----------------------------- */
// PUBLIC_INTERFACE
function LoginForm({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7FAFC]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <span>
            <span className="text-amber-700 font-extrabold mr-2">LuxMatch</span>
            <span className="font-normal">Pro</span>
          </span>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            login(username, password);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full bg-amber-700 text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
        <div className="pt-4 flex justify-center">
          <button
            className="text-sm text-amber-700 hover:underline"
            onClick={() => setShowSignup(s => !s)}
          >
            {showSignup
              ? "Have an account? Log in"
              : "Need an account? Sign up"}
          </button>
        </div>
        {showSignup && <SignupForm signup={login} />}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SignupForm({ signup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="mt-4"
      onSubmit={e => {
        e.preventDefault();
        signup(username, password);
      }}
    >
      <div>
        <label className="block font-medium text-gray-700">Username</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 w-full bg-amber-700 text-white py-2 rounded font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}

/* ----------------------------- Navbar ----------------------------- */
// PUBLIC_INTERFACE
function Navbar() {
  const { user, logout } = React.useContext(AuthContext);
  return (
    <nav
      className="fixed top-0 left-0 w-full bg-primary border-b shadow-md z-50"
      style={{
        background: "#1A202C",
        borderColor: "rgba(255, 193, 7, 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl text-amber-600 font-bold">◎</span>
          <span className="text-white font-extrabold text-xl tracking-widest">
            LuxMatch <span className="font-normal text-amber-400">Pro</span>
          </span>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white text-base font-medium">
              Hi, {user.username}
            </span>
            <button
              className="bg-transparent text-white px-3 py-1 rounded border border-amber-700 hover:bg-amber-700/80 hover:text-white transition"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

/* ----------------------------- App Main ----------------------------- */
// PUBLIC_INTERFACE
function LuxMatchMainApp() {
  const auth = useLocalAuth();

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-secondary">
        <Navbar />
        {auth.user ? <Dashboard /> : <LoginForm login={auth.login} />}
      </div>
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Entrypoint
  return <LuxMatchMainApp />;
}
export default App;
