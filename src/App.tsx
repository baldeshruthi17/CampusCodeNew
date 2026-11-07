import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Eye,
  EyeOff,
  FileBadge,
  Home,
  Lightbulb,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { IsometricCampus } from "./IsometricCampus";

type Route = "/" | "/login" | "/register" | "/dashboard";

const routeFromPath = (): Route => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return ["/", "/login", "/register", "/dashboard"].includes(path) ? (path as Route) : "/";
};

function AppLink({
  to,
  className,
  children,
  onNavigate,
}: {
  to: Route;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <a
      className={className}
      href={to}
      onClick={(event) => {
        event.preventDefault();
        window.history.pushState({}, "", to);
        window.dispatchEvent(new PopStateEvent("popstate"));
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

function Brand({ wordmark = true, inverse = false }: { wordmark?: boolean; inverse?: boolean }) {
  return (
    <AppLink to="/" className={`cc-brand ${inverse ? "cc-brand--inverse" : ""}`}>
      <img src="/campuscode-logo.svg" alt="CampusCode" />
      {wordmark && (
        <span>
          <strong>CAMPUSCODE</strong>
          <small>BUILD · COMPETE · SHIP</small>
        </span>
      )}
    </AppLink>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && node.classList.add("is-visible"),
      { threshold: 0.14 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function Orbit({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`cc-orbit ${compact ? "cc-orbit--compact" : ""}`}
      aria-label="CampusCode ecosystem"
    >
      <span className="orbit-ring ring-a">
        <i />
      </span>
      <span className="orbit-ring ring-b">
        <i />
      </span>
      <span className="orbit-ring ring-c">
        <i />
      </span>
      <div className="orbit-core">{compact ? "CC" : "STUDENTS"}</div>
      <b className="orbit-tag tag-a">HACKATHONS</b>
      <b className="orbit-tag tag-b">TEAMS</b>
      <b className="orbit-tag tag-c">IDEAS</b>
    </div>
  );
}

function JourneyOrbit({ active, onChange }: { active: number; onChange: (index: number) => void }) {
  const nodes = [
    { label: "DISCOVER", icon: <Lightbulb />, className: "discover" },
    { label: "TEAM UP", icon: <UserRound />, className: "team" },
    { label: "BUILD", icon: "</>", className: "build" },
    { label: "COMPETE", icon: <Trophy />, className: "compete" },
  ];

  return (
    <div className="journey-orbit" aria-label="CampusCode journey">
      <div className="journey-ring" />
      <div className="journey-ring-inner" />
      <div className="journey-motion" aria-hidden="true" />
      <div className="journey-center">
        <Brand wordmark={false} />
        <span>CAMPUSCODE</span>
      </div>
      {nodes.map((node, index) => (
        <button
          type="button"
          className={`journey-node journey-node--${node.className} ${
            active === index ? "is-active" : ""
          }`}
          onClick={() => onChange(index)}
          aria-pressed={active === index}
          key={node.label}
        >
          <span>{node.icon}</span>
          <small>{node.label}</small>
        </button>
      ))}
    </div>
  );
}

function LandingBackground({
  scrollContainer,
}: {
  scrollContainer?: React.RefObject<HTMLDivElement | null>;
} = {}) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!background || reduceMotion) return;

    const canTrackPointer = window.matchMedia("(pointer: fine) and (min-width: 901px)");
    let pointerFrame = 0;
    let scrollFrame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const renderPointer = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      background.style.setProperty("--bg-pointer-x", `${currentX.toFixed(2)}px`);
      background.style.setProperty("--bg-pointer-y", `${currentY.toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        pointerFrame = requestAnimationFrame(renderPointer);
      } else {
        pointerFrame = 0;
      }
    };

    const handlePointer = (event: PointerEvent) => {
      if (!canTrackPointer.matches) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 28;
      targetY = (event.clientY / window.innerHeight - 0.5) * 22;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
    };

    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        const scrollTop = scrollContainer?.current?.scrollTop ?? window.scrollY;
        background.style.setProperty(
          "--bg-scroll",
          `${Math.min(scrollTop * 0.035, 130).toFixed(2)}px`,
        );
        scrollFrame = 0;
      });
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollContainer?.current?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.current?.removeEventListener("scroll", handleScroll);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <div className="landing-background" ref={backgroundRef} aria-hidden="true">
      <div className="aurora-field">
        <i className="aurora-wave aurora-wave--one" />
        <i className="aurora-wave aurora-wave--two" />
        <i className="aurora-wave aurora-wave--three" />
      </div>
      <div className="liquid-shape liquid-shape--one" />
      <div className="liquid-shape liquid-shape--two" />
      <div className="liquid-shape liquid-shape--accent" />
      <div className="glass-bubbles">
        {Array.from({ length: 6 }, (_, index) => (
          <i className={`glass-bubble glass-bubble--${index + 1}`} key={index} />
        ))}
      </div>
      <div className="particle-trails">
        {Array.from({ length: 9 }, (_, index) => (
          <i className={`trail-particle trail-particle--${index + 1}`} key={index} />
        ))}
      </div>
    </div>
  );
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [activeNav, setActiveNav] = useState("");
  const challenges = [
    ["01", "AI INNOVATION", "Build intelligent solutions for problems that matter.", "12 days"],
    ["02", "FUTURE WEB", "Design and ship the next generation of digital experiences.", "8 days"],
    ["03", "CAMPUS TECH", "Create technology that makes student life better.", "4 months"],
  ];
  const steps = [
    ["DISCOVER", "FIND YOUR CHALLENGE", "Find a challenge that makes you want to build."],
    ["TEAM UP", "BUILD YOUR TEAM", "Find people who share your ambition."],
    ["BUILD", "MAKE IT REAL", "Turn your idea into something people can use."],
    ["SHIP", "SHOW THE WORLD", "Submit your work and take it to the arena."],
  ];

  return (
    <main className="landing-page" id="top">
      <LandingBackground />
      <header className="landing-nav shell">
        <Brand />
        <button
          className="landing-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          <a
            href="#about"
            className={activeNav === "about" ? "active" : ""}
            onClick={() => {
              setActiveNav("about");
              setMenuOpen(false);
            }}
          >
            About
          </a>
          <a
            href="#process"
            className={activeNav === "process" ? "active" : ""}
            onClick={() => {
              setActiveNav("process");
              setMenuOpen(false);
            }}
          >
            How it works
          </a>
          <a
            href="#arena"
            className={activeNav === "arena" ? "active" : ""}
            onClick={() => {
              setActiveNav("arena");
              setMenuOpen(false);
            }}
          >
            Hackathons
          </a>
          <a
            href="#community"
            className={activeNav === "community" ? "active" : ""}
            onClick={() => {
              setActiveNav("community");
              setMenuOpen(false);
            }}
          >
            Community
          </a>
        </nav>
        <div className="landing-actions">
          <AppLink to="/login">Login</AppLink>
          <AppLink to="/register" className="cc-button">
            Join CampusCode <ArrowRight />
          </AppLink>
        </div>
      </header>

      <section className="landing-hero shell">
        <Reveal className="hero-copy">
          <p className="kicker">+ THE DIGITAL ARENA FOR STUDENT INNOVATION</p>
          <h1>
            <span className="hero-word hero-word-build">BUILD</span>
            <br />
            <span className="hero-word hero-word-compete"><em>COMPETE</em></span>
            <br />
            <span className="hero-word hero-word-ship">SHIP.</span>
          </h1>
          <p className="hero-intro">
            A digital arena for students who don&apos;t just have ideas. They build them.
          </p>
          <a className="cc-button" href="#arena">
            Explore hackathons <ArrowRight />
          </a>
          <div className="hero-meta">
            <span>SCROLL TO EXPLORE</span>
            <span>EST. 2025</span>
          </div>
        </Reveal>
        <Reveal className="hero-orbit" delay={140}>
          <Orbit />
        </Reveal>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          {["IDEAS", "PEOPLE", "PRODUCTS", "INNOVATION", "COMMUNITY", "IDEAS", "PEOPLE"].map(
            (word, i) => (
              <span key={`${word}-${i}`}>
                {word}
                <b>+</b>
              </span>
            ),
          )}
        </div>
      </div>

      <section className="landing-process shell section" id="process">
        <Reveal>
          <div className="section-index">
            <span className="live-dot" /> WHAT IS CAMPUSCODE? <b>01 / 04</b>
          </div>
          <div className="process-grid">
            <div>
              <h2>
                WHERE
                <br />
                STUDENTS
                <br />
                <em>
                  BUILD<span>.</span>
                </em>
              </h2>
              <p>
                From finding your next opportunity to showcasing what you&apos;re capable of —
                CampusCode brings the entire student innovation journey together.
              </p>
              <div className="process-tags">
                <span>01 — OPPORTUNITIES</span>
                <span>02 — INNOVATION</span>
                <span>03 — COMMUNITY</span>
              </div>
            </div>
            <div className="campus-art">
              <IsometricCampus />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="community-panel" id="community">
        <div className="community-grid" />
        <video
          className="community-video"
          src="/gemini-community.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="CampusCode community animation"
        />
        <span className="panel-label">02 / COMMUNITY</span>
        <div className="community-foot">
          <span>MAKE IT REAL</span>
          <span>ALL IN</span>
        </div>
      </section>

      <section className="fits shell section" id="about">
        <Reveal className="fits-copy">
          <p className="kicker">+ HOW IT FITS TOGETHER</p>
          <h2>
            Every idea makes
            <br />
            <em>the next one stronger.</em>
          </h2>
          <div className="steps-list">
            {steps.map((step, index) => (
              <button
                className={activeStep === index ? "active" : ""}
                onClick={() => setActiveStep(index)}
                key={step[0]}
              >
                <i>{["✦", "◎", "</>", "↗"][index]}</i>
                <span>
                  <b>{step[0]}</b>
                  <small>{step[1]}</small>
                  {activeStep === index && <p>{step[2]}</p>}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal className="fits-visual" delay={120}>
          <JourneyOrbit active={activeStep} onChange={setActiveStep} />
        </Reveal>
      </section>

      <section className="arena shell section" id="arena">
        <Reveal>
          <div className="arena-title">
            <div>
              <p className="kicker">+ OPEN CHALLENGES</p>
              <h2>ENTER THE ARENA</h2>
            </div>
            <span>VIEW ALL ↗</span>
          </div>
          <div className="challenge-list">
            {challenges.map(([number, title, copy, time]) => (
              <AppLink to="/register" className="challenge" key={number}>
                <span className="challenge-icon">&lt;/&gt;</span>
                <span>
                  <small>{number} / OPEN CHALLENGE</small>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </span>
                <time>{time}</time>
                <i>
                  <ArrowUpRight />
                </i>
              </AppLink>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mission">
        <div className="shell">
          <Reveal>
            <p className="kicker">+ THE MISSION</p>
            <h2>
              GREAT
              <br />
              IDEAS
              <br />
              NEED BUILDERS.
            </h2>
          </Reveal>
          <div className="mission-word">CAMPUSCODE</div>
        </div>
      </section>

      <section className="network shell section">
        <Reveal>
          <p className="kicker">+ THE NETWORK</p>
          <h2>
            FIND
            <br />
            YOUR
            <br />
            PEOPLE.
          </h2>
          <p>
            Build with developers.
            <br />
            Think with designers.
            <br />
            Compete with builders.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Orbit compact />
        </Reveal>
      </section>

      <section className="landing-cta">
        <div className="shell">
          <Reveal>
            <p className="kicker">+ READY?</p>
            <h2>
              YOUR NEXT
              <br />
              PROJECT
              <br />
              STARTS HERE.
            </h2>
          </Reveal>
          <AppLink to="/register" className="cc-button dark">
            Join CampusCode <ArrowRight />
          </AppLink>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="shell">
          <div className="footer-grid">
            <div>
              <Brand />
              <p>
                The student hackathon arena.
                <br />
                You build the idea, we run the competition.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <b>EXPLORE</b>
                <a href="#about">About</a>
                <a href="#arena">Hackathons</a>
              </div>
              <div>
                <b>ACCOUNT</b>
                <AppLink to="/login">Sign in</AppLink>
                <AppLink to="/register">Register</AppLink>
              </div>
              <div>
                <b>CONNECT</b>
                <a href="mailto:campuscode@gmail.com">Contact</a>
                <a href="#top">Back to top</a>
              </div>
            </div>
          </div>
          <div className="footer-word">CAMPUSCODE</div>
          <div className="footer-bottom">
            <span>© 2026 CAMPUSCODE</span>
            <span>BUILD · COMPETE · SHIP</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function AuthField({
  label,
  icon,
  children,
  error,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <div className={error ? "field-control error" : "field-control"}>
        {icon}
        {children}
      </div>
      {error && <small>{error}</small>}
    </label>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.7.1-.7.1-.7 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 .9-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.2 9.2 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7.9 1.6.9 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

const demoAccounts = [
  {
    role: "STUDENT",
    label: "Demo Student",
    email: "student@campuscode.demo",
    password: "Student@123",
  },
] as const;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (password.length < 6) next.password = "Use at least 6 characters to continue.";
    const demoAccount = demoAccounts.find(
      (account) => account.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (demoAccount && password !== demoAccount.password) {
      next.password = "The password does not match the selected demo account.";
    } else if (demoAccount) {
      sessionStorage.setItem(
        "campuscode-demo-session",
        JSON.stringify({ email: demoAccount.email, role: demoAccount.role, label: demoAccount.label }),
      );
      if (remember) {
        localStorage.setItem("campuscode-demo-session", demoAccount.email);
      } else {
        localStorage.removeItem("campuscode-demo-session");
      }
      window.history.pushState({}, "", "/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }
    if (!Object.keys(next).length) {
      next.form =
        "Authentication is not connected to a backend yet. Configure a trusted identity provider before enabling sign-in.";
    }
    setErrors(next);
  };
  return (
    <main className="login-page">
      <LandingBackground />
      <header className="auth-nav">
        <Brand />
        <nav>
          <AppLink to="/">Explore</AppLink>
          <AppLink to="/register">Community</AppLink>
          <a href="/#about">About</a>
        </nav>
        <div className="auth-nav-actions">
          <span>
            <i /> COMMUNITY ONLINE
          </span>
          <AppLink to="/" className="login-home-link">
            <span aria-hidden="true">←</span> Back to Home
          </AppLink>
        </div>
      </header>
      <section className="login-story">
        <Reveal>
          <p className="auth-index">
            CC / ACCESS <span>EST. 2025</span>
          </p>
          <h1>
            <span>MAKE YOUR</span>
            <br />
            <span>NEXT <em>MOVE.</em></span>
          </h1>
          <p className="story-text">
            Your skills deserve a bigger stage. Connect with ambitious minds, discover
            opportunities, and turn your ideas into real-world projects.
          </p>
        </Reveal>
        <div className="creative-stage">
          <div className="idea-disc">
            IDEA <b>→</b> IMPACT
          </div>
          <div className="code-card">
            <small>community.tsx</small>
            <code>
              <em>const</em> nextMove = {"{"}
              <br />
              &nbsp; create: <b>true</b>,<br />
              &nbsp; connect: <b>true</b>,<br />
              &nbsp; grow: <b>true</b>
              <br />
              {"}"}
            </code>
          </div>
          <div className="open-card">
            OPEN <b>24 / 7</b>
          </div>
        </div>
      </section>
      <aside className="login-access">
        <Reveal className="auth-card" delay={120}>
          <div className="auth-heading">
            <span>
              <i /> MEMBER ACCESS
            </span>
            <small>SECURE / 01</small>
            <h2>
              Welcome back<span>.</span>
            </h2>
            <p>Pick up right where you left off.</p>
          </div>
          <form onSubmit={submit}>
            <AuthField label="EMAIL ADDRESS" icon={<Mail />} error={errors.email}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email address"
              />
            </AuthField>
            <AuthField label="PASSWORD" icon={<Lock />} error={errors.password}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShow(!show)} aria-label="Show password">
                {show ? <EyeOff /> : <Eye />}
              </button>
            </AuthField>
            <div className="auth-options">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Remember me
              </label>
              <button
                type="button"
                onClick={() => alert("Password recovery instructions will be sent to your email.")}
              >
                Forgot password?
              </button>
            </div>
            <button className="auth-submit">
              ACCESS YOUR ACCOUNT <ArrowRight />
            </button>
            {errors.form && (
              <div className="auth-flow-notice" role="alert">
                <Lock /> {errors.form}
              </div>
            )}
          </form>
          <div className="social-divider">
            <span />
            OR SIGN IN WITH
            <span />
          </div>
          <div className="social-buttons">
            <button type="button">
              <span className="google-g">G</span> Google
            </button>
            <button type="button">
              <GithubIcon /> GitHub
            </button>
          </div>
          <p className="switch-auth">
            New around here? <AppLink to="/register">Join CampusCode.</AppLink>
          </p>
        </Reveal>
        <Reveal className="demo-accounts-panel" delay={180}>
          <header>
            <div>
              <span>DEMO ACCOUNTS</span>
              <h3>Test a CampusCode role</h3>
            </div>
            <small>DEMO LOGIN READY</small>
          </header>
          <div className="demo-account-list">
            {demoAccounts.map((account) => (
              <article className="demo-account" key={account.role}>
                <div className="demo-account-heading">
                  <span className="demo-role-badge">{account.role}</span>
                  <strong>{account.label}</strong>
                </div>
                <div className="demo-credentials">
                  <code>{account.email}</code>
                  <code>{account.password}</code>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                    setErrors({});
                  }}
                >
                  Use Demo Account
                </button>
              </article>
            ))}
          </div>
          <p>Use the demo account above to sign in and explore the CampusCode dashboard.</p>
        </Reveal>
      </aside>
      <footer className="auth-footer">
        <span>YOUR COMMUNITY. YOUR IDEAS. YOUR NEXT OPPORTUNITY.</span>
        <span>© CAMPUSCODE</span>
      </footer>
    </main>
  );
}

const captchaChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const makeCaptcha = () =>
  Array.from(
    { length: 6 },
    () => captchaChars[Math.floor(Math.random() * captchaChars.length)],
  ).join("");

function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    captcha: "",
  });
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const set = (key: keyof typeof values, value: string) =>
    setValues((old) => ({ ...old, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (values.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (values.confirm !== values.password) next.confirm = "Passwords do not match.";
    if (values.captcha.toUpperCase() !== captcha)
      next.captcha = "That code is incorrect. Please try again.";
    setErrors(next);
    if (!Object.keys(next).length) setSuccess(true);
  };
  return (
    <main className="register-page">
      <LandingBackground />
      <aside className="register-brand">
        <div className="register-top">
          <Brand wordmark={false} />
          <span>
            <i /> CAMPUSCODE / COMMUNITY
          </span>
        </div>
        <Reveal>
          <h1>
            <span>YOUR SPACE.</span>
            <br />
            <span>YOUR IDEAS.</span>
            <br />
            <span><em>YOUR FUTURE.</em></span>
          </h1>
          <p>
            Everything starts with an idea. Find your people, build meaningful projects and create
            something worth sharing.
          </p>
          <div className="register-art">
            <span>&lt;/&gt;</span>
            <i />
            <i />
          </div>
        </Reveal>
        <small>MADE FOR BUILDERS. DESIGNED FOR WHAT&apos;S NEXT.</small>
      </aside>
      <section className="register-workspace">
        <div className="technical-grid" />
        <div className="register-content">
          <AppLink to="/" className="back-link">
            ← BACK TO HOME
          </AppLink>
          <Reveal className="register-card">
            <header>
              <p>02 / CREATE YOUR ACCOUNT</p>
              <h2>Create your account.</h2>
              <span>Your next opportunity starts here.</span>
            </header>
            <form onSubmit={submit}>
              <AuthField label="1. FULL NAME" icon={<UserRound />} error={errors.name}>
                <input
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your full name."
                />
              </AuthField>
              <AuthField label="2. EMAIL ADDRESS" icon={<Mail />} error={errors.email}>
                <input
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  type="email"
                  placeholder="you@example.com."
                />
              </AuthField>
              <AuthField label="3. ACCOUNT TYPE" icon={<BookOpen />}>
                <input value="STUDENT" readOnly />
              </AuthField>
              <AuthField label="4. PASSWORD" icon={<Lock />} error={errors.password}>
                <input
                  value={values.password}
                  onChange={(e) => set("password", e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Create a password."
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? "HIDE" : "SHOW"}
                </button>
              </AuthField>
              <AuthField label="5. CONFIRM PASSWORD" icon={<Lock />} error={errors.confirm}>
                <input
                  value={values.confirm}
                  onChange={(e) => set("confirm", e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Repeat your password."
                />
              </AuthField>
              <div className="captcha-group">
                <label>6. CAPTCHA</label>
                <div className="captcha-row">
                  <div className="captcha-art">
                    {captcha.split("").map((c, i) => (
                      <b key={`${c}-${i}`}>{c}</b>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCaptcha(makeCaptcha());
                      set("captcha", "");
                    }}
                  >
                    <RefreshCw /> NEW
                  </button>
                </div>
                <div className={errors.captcha ? "field-control error" : "field-control"}>
                  <Sparkles />
                  <input
                    value={values.captcha}
                    onChange={(e) => set("captcha", e.target.value.toUpperCase())}
                    maxLength={6}
                    placeholder="Enter the code above"
                  />
                </div>
                {errors.captcha && <small>{errors.captcha}</small>}
              </div>
              <button className="auth-submit">
                CREATE ACCOUNT <ArrowRight />
              </button>
              <p className="switch-auth">
                Already have an account? <AppLink to="/login">Sign in</AppLink>
              </p>
              {success && (
                <div className="register-success">
                  <Check />
                  <span>
                    <b>ACCOUNT CREATED</b>Your CampusCode account is ready.{" "}
                    <AppLink to="/login">Continue to sign in.</AppLink>
                  </span>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

const navigation = [
  ["Overview", Home],
  ["Events", Trophy],
  ["My Events", BriefcaseBusiness],
  ["HackMate AI", Bot],
  ["IdeaCheck AI", Lightbulb],
  ["Certificates", FileBadge],
  ["Digital Card", CreditCard],
  ["RuleBot AI", ShieldCheck],
  ["Student Guide", BookOpen],
  ["Official Communication", MessageSquareText],
  ["Notifications", Bell],
  ["Help & Support", CircleHelp],
  ["Profile", UserRound],
] as const;

function DashboardPage() {
  const [active, setActive] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dashboardScrollRef = useRef<HTMLDivElement>(null);
  const select = (item: string) => {
    setActive(item);
    setMenuOpen(false);
  };
  const logout = () => {
    sessionStorage.removeItem("campuscode-demo-session");
    localStorage.removeItem("campuscode-demo-session");
    window.history.pushState({}, "", "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <main className="dashboard-page premium-dashboard">
      <LandingBackground scrollContainer={dashboardScrollRef} />
      {menuOpen && (
        <button
          className="dash-scrim"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={menuOpen ? "dash-sidebar open" : "dash-sidebar"}>
        <div className="dash-brand">
          <div className="premium-brand-mark">
            <span><Bot /></span>
            <b>CAMPUSCODE</b>
          </div>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>
        <span className="workspace-label">WORKSPACE</span>
        <nav aria-label="Student workspace">
          {navigation.map(([label, Icon]) => (
            <button
              className={active === label ? "active" : ""}
              onClick={() => select(label)}
              key={label}
            >
              <Icon />
              <span>{label}</span>
              {label.includes("AI") && <i />}
              {active === label && <ChevronRight />}
            </button>
          ))}
        </nav>
        <div className="dash-side-footer">
          <span className="premium-avatar">SB</span>
          <span>
            <b>Shruthi Balde</b>Student workspace
          </span>
          <button onClick={logout} aria-label="Log out" title="Log out">
            <LogOut />
          </button>
        </div>
      </aside>
      <section className="dash-app">
        <header className="dash-topbar">
          <div>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
            <span>
              Student workspace <i>/</i> Live
            </span>
          </div>
          <div>
            <button onClick={() => select("Notifications")} aria-label="Notifications">
              <Bell />
            </button>
            <button
              className={refreshing ? "spinning" : ""}
              onClick={() => {
                setRefreshing(true);
                setTimeout(() => setRefreshing(false), 800);
              }}
              aria-label="Refresh"
            >
              <RefreshCw />
            </button>
            <span className="user-chip">
              <i>BS</i>Balde Shruthi
            </span>
            <button className="premium-logout" onClick={logout}>
              <LogOut />
              <span>Log out</span>
            </button>
          </div>
        </header>
        <div className="dash-scroll" ref={dashboardScrollRef}>
          <div className="dash-content">
            {active !== "Overview" && (
              <div className="active-notice">
                <span>
                  <Sparkles /> {active}
                </span>
                <p>This workspace is ready for your CampusCode data.</p>
                <button onClick={() => setActive("Overview")}>
                  Back to overview <ArrowRight />
                </button>
              </div>
            )}
            <section className="premium-welcome">
              <div>
                <p>
                  <i /> STUDENT WORKSPACE / LIVE
                </p>
                <h1>
                  YOUR NEXT BIG <em>IDEA</em> STARTS HERE.
                </h1>
              </div>
              <p className="premium-summary">
                Welcome back, <b>Shruthi</b>. You have completed <b>12 challenges</b> this month.
                Your global ranking increased by <b>4%.</b>
              </p>
            </section>
            <section className="premium-bento">
              <article className="premium-event bento-card">
                <div className="premium-event-copy">
                  <span className="premium-pill"><Zap /> FEATURED HACKATHON</span>
                  <h2>ReBuild <em>&apos;26</em></h2>
                  <p>Master the art of architecture, design, and seamless performance.</p>
                  <div className="premium-progress-heading">
                    <b>Progress (Round 2 of 3)</b><span>66%</span>
                  </div>
                  <div className="premium-progress"><i /></div>
                  <button onClick={() => select("Events")}>
                    Continue building <ArrowRight />
                  </button>
                </div>
                <div className="premium-code">
                  <div className="code-dots"><i /><i /><i /></div>
                  <code><em>const</em> future = <b>&apos;build&apos;</b>;<br /><em>while</em> (curious) {"{"}<br />&nbsp;&nbsp;learn();<br />&nbsp;&nbsp;<strong>collaborate();</strong><br />{"}"}<br /><small>// ReBuild &apos;26 Active</small></code>
                </div>
              </article>

              <article className="premium-upcoming bento-card">
                <header><h2>Upcoming</h2><button onClick={() => select("Events")}>See all</button></header>
                <button className="upcoming-event" onClick={() => select("Events")}><i className="purple">12</i><span><b>Ideathon: GreenTech</b><small>Starts in 2 days</small></span><ChevronRight /></button>
                <button className="upcoming-event" onClick={() => select("Events")}><i className="lime">15</i><span><b>AI Summit Workshop</b><small>Official Live Hub</small></span><ChevronRight /></button>
                <button className="upcoming-event" onClick={() => select("Events")}><i className="orange">18</i><span><b>Flutter Forward</b><small>Mobile Development</small></span><ChevronRight /></button>
              </article>

              <article className="premium-journey bento-card">
                <h2>Your Journey</h2>
                <div className="journey-score">
                  <div className="level-ring"><i /><b>Lvl 4</b></div>
                  <div><small>Senior Builder</small><strong>8,420 XP</strong><span>+1,200 XP to level up</span></div>
                </div>
                <div className="journey-stat"><span><Trophy /> Daily streak</span><b>12 Days</b></div>
                <div className="journey-stat"><span><Bot /> Commits made</span><b>482</b></div>
              </article>

              <article className="premium-feed bento-card">
                <header><h2>Feed</h2><span>•••</span></header>
                <div className="feed-item"><i className="lime" /><span><b>New Certificate Unlocked!</b><small>UI/UX Recreation Excellence</small><time>2 hours ago</time></span></div>
                <div className="feed-item"><i className="purple" /><span><b>Team &quot;CodeBusters&quot; Invites You</b><small>ReBuild &apos;26 Squad Recruitment</small><time>5 hours ago</time></span></div>
                <div className="feed-item"><i /><span><b>Submission Under Review</b><small>Round 1 Architecture Schema</small><time>Yesterday</time></span></div>
              </article>

              <article className="premium-rising bento-card">
                <div className="rising-icon"><Trophy /></div>
                <h2>Rising Star</h2>
                <p>You&apos;re in the top 2% of contributors this week!</p>
                <div className="community-avatars"><i>J</i><i>A</i><i>M</i><b>+14</b></div>
                <button onClick={() => select("Profile")}>View rankings</button>
              </article>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashCard({
  icon,
  label,
  purple,
  wide,
  children,
}: {
  icon: ReactNode;
  label: string;
  purple?: boolean;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`dash-card ${wide ? "wide" : ""}`}>
      <header>
        <i className={purple ? "purple" : ""}>{icon}</i>
        <span>{label}</span>
      </header>
      {children}
    </article>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromPath);
  useEffect(() => {
    const update = () => {
      setRoute(routeFromPath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  useEffect(() => {
    document.title =
      route === "/"
        ? "CampusCode | Build. Compete. Ship."
        : `${route.slice(1)[0].toUpperCase()}${route.slice(2)} | CampusCode`;
  }, [route]);
  if (route === "/login") return <LoginPage />;
  if (route === "/register") return <RegisterPage />;
  if (route === "/dashboard") return <DashboardPage />;
  return <LandingPage />;
}
