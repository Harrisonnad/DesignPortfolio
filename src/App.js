import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { ChevronRight, Code, Layers, Zap, Sliders, Play } from 'lucide-react';

// DESIGN TOKEN SYSTEM - Outside component to prevent recreation
const createTokenSystem = () => ({
  colors: {
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    accent: {
      primary: '#6366F1',
      secondary: '#EC4899',
      tertiary: '#10B981',
    },
    dark: {
      bg: '#0A0A0A',
      surface: '#141414',
      elevated: '#1F1F1F',
    }
  },
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    8: 64,
    12: 96,
    16: 128,
  },
  typography: {
    fontFamily: {
      display: '"Syne", sans-serif',
      body: '"DM Sans", system-ui, sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontSize: {
      sm: 14,
      base: 16,
      lg: 18,
      xl: 24,
      '2xl': 32,
      '3xl': 48,
      '4xl': 64,
      '5xl': 80,
    },
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 32,
  },
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  }
});

// Memoized Background Gradient Component
const BackgroundGradient = memo(({ mousePosition, primaryColor }) => {
  const gradientStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${primaryColor}15 0%, transparent 50%)`,
    pointerEvents: 'none',
    zIndex: 0,
    transition: 'background 300ms ease',
  }), [mousePosition.x, mousePosition.y, primaryColor]);

  return <div style={gradientStyle} />;
});

BackgroundGradient.displayName = 'BackgroundGradient';

// Memoized Navigation Component
const Navigation = memo(({ 
  activeSection, 
  onSectionChange, 
  tokens, 
  navHovering, 
  onNavHover 
}) => {
  const navStyle = useMemo(() => ({
    position: 'sticky',
    top: 0,
    background: `${tokens.colors.dark.bg}f0`,
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${tokens.colors.gray[900]}`,
    padding: `${tokens.spacing[4]}px ${tokens.spacing[6]}px`,
    zIndex: 100,
    transition: `all ${tokens.animation.normal}`,
    boxShadow: navHovering ? `0 4px 24px ${tokens.colors.accent.primary}20` : 'none',
  }), [tokens, navHovering]);

  const logoStyle = useMemo(() => ({
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: `${tokens.typography.fontSize['2xl']}px`,
    fontWeight: '800',
    background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
  }), [tokens]);

  const sections = useMemo(() => ['home', 'work', 'lab', 'about'], []);

  const getButtonStyle = useCallback((section) => ({
    background: activeSection === section ? `${tokens.colors.gray[900]}80` : 'none',
    border: 'none',
    fontFamily: tokens.typography.fontFamily.body,
    fontSize: `${tokens.typography.fontSize.base}px`,
    fontWeight: '600',
    color: activeSection === section ? tokens.colors.accent.primary : tokens.colors.gray[600],
    cursor: 'pointer',
    padding: `${tokens.spacing[2]}px ${tokens.spacing[3]}px`,
    borderRadius: `${tokens.radius.sm}px`,
    transition: `all ${tokens.animation.normal}`,
    position: 'relative',
  }), [activeSection, tokens]);

  const underlineStyle = useMemo(() => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
  }), [tokens]);

  return (
    <nav 
      onMouseEnter={onNavHover.enter}
      onMouseLeave={onNavHover.leave}
      style={navStyle}
    >
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={logoStyle}>HN</div>
        <div style={{ display: 'flex', gap: `${tokens.spacing[6]}px` }}>
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              style={getButtonStyle(section)}
            >
              {activeSection === section && <div style={underlineStyle} />}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

// Memoized Token Editor Component
const TokenEditor = memo(({ 
  showTokenEditor, 
  onClose, 
  tokens, 
  updateToken, 
  onReset 
}) => {
  const editorStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    right: showTokenEditor ? 0 : '-420px',
    width: '420px',
    height: '100vh',
    background: tokens.colors.dark.elevated,
    borderLeft: `1px solid ${tokens.colors.gray[800]}`,
    padding: `${tokens.spacing[6]}px`,
    overflowY: 'auto',
    zIndex: 1000,
    transition: `right ${tokens.animation.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
    boxShadow: showTokenEditor ? '-4px 0 24px rgba(0,0,0,0.5)' : 'none',
  }), [showTokenEditor, tokens]);

  const handleSpacingChange = useCallback((e) => {
    const base = parseInt(e.target.value);
    updateToken('spacing', {
      1: base,
      2: base * 2,
      3: base * 4,
      4: base * 6,
      5: base * 8,
      6: base * 12,
      8: base * 16,
      12: base * 24,
      16: base * 32,
    });
  }, [updateToken]);

  const handleRadiusChange = useCallback((e) => {
    const base = parseInt(e.target.value);
    updateToken('radius', {
      sm: Math.round(base / 2),
      md: base,
      lg: Math.round(base * 1.67),
      xl: Math.round(base * 2.67),
    });
  }, [updateToken]);

  return (
    <div style={editorStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: `${tokens.spacing[6]}px`,
      }}>
        <h3 style={{
          fontFamily: tokens.typography.fontFamily.display,
          fontSize: `${tokens.typography.fontSize['2xl']}px`,
          fontWeight: '700',
        }}>
          Token Editor
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: tokens.colors.gray[600],
            fontSize: '24px',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{
        fontSize: `${tokens.typography.fontSize.sm}px`,
        color: tokens.colors.gray[600],
        marginBottom: `${tokens.spacing[6]}px`,
      }}>
        Adjust tokens and watch the page update in real-time
      </div>

      {/* Primary Accent */}
      <div style={{ marginBottom: `${tokens.spacing[6]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[3]}px`,
          color: tokens.colors.accent.primary,
        }}>
          Primary Accent
        </label>
        <input
          type="color"
          value={tokens.colors.accent.primary}
          onChange={(e) => updateToken('colors.accent.primary', e.target.value)}
          style={{
            width: '100%',
            height: '48px',
            border: `2px solid ${tokens.colors.gray[800]}`,
            borderRadius: `${tokens.radius.md}px`,
            cursor: 'pointer',
            background: 'transparent',
          }}
        />
      </div>

      {/* Secondary Accent */}
      <div style={{ marginBottom: `${tokens.spacing[6]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[3]}px`,
          color: tokens.colors.accent.secondary,
        }}>
          Secondary Accent
        </label>
        <input
          type="color"
          value={tokens.colors.accent.secondary}
          onChange={(e) => updateToken('colors.accent.secondary', e.target.value)}
          style={{
            width: '100%',
            height: '48px',
            border: `2px solid ${tokens.colors.gray[800]}`,
            borderRadius: `${tokens.radius.md}px`,
            cursor: 'pointer',
            background: 'transparent',
          }}
        />
      </div>

      {/* Spacing Scale */}
      <div style={{ marginBottom: `${tokens.spacing[6]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[3]}px`,
        }}>
          Base Spacing Unit: {tokens.spacing[1]}px
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={tokens.spacing[1]}
          onChange={handleSpacingChange}
          style={{
            width: '100%',
            height: '4px',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Border Radius */}
      <div style={{ marginBottom: `${tokens.spacing[6]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[3]}px`,
        }}>
          Border Radius Scale: {tokens.radius.md}px
        </label>
        <input
          type="range"
          min="0"
          max="40"
          value={tokens.radius.md}
          onChange={handleRadiusChange}
          style={{
            width: '100%',
            height: '4px',
            cursor: 'pointer',
          }}
        />
      </div>

      <button
        onClick={onReset}
        style={{
          width: '100%',
          padding: `${tokens.spacing[3]}px`,
          background: tokens.colors.dark.surface,
          border: `1px solid ${tokens.colors.gray[800]}`,
          borderRadius: `${tokens.radius.md}px`,
          color: '#FFFFFF',
          fontWeight: '600',
          cursor: 'pointer',
          transition: `all ${tokens.animation.normal}`,
        }}
      >
        Reset to Defaults
      </button>
    </div>
  );
});

TokenEditor.displayName = 'TokenEditor';

// Memoized Floating Button
const FloatingButton = memo(({ onClick, tokens }) => {
  const buttonStyle = useMemo(() => ({
    position: 'fixed',
    bottom: `${tokens.spacing[6]}px`,
    right: `${tokens.spacing[6]}px`,
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
    border: 'none',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    boxShadow: `0 8px 32px ${tokens.colors.accent.primary}40`,
    transition: `all ${tokens.animation.normal}`,
    animation: 'glow 2s ease-in-out infinite',
  }), [tokens]);

  return (
    <button onClick={onClick} style={buttonStyle}>
      <Sliders size={28} />
    </button>
  );
});

FloatingButton.displayName = 'FloatingButton';

// Main Portfolio Component
export default function Portfolio() {
  const [tokens, setTokens] = useState(createTokenSystem);
  const [activeSection, setActiveSection] = useState('home');
  const [showTokenEditor, setShowTokenEditor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [navHovering, setNavHovering] = useState(false);

  // Throttled mouse tracking
  useEffect(() => {
    let rafId = null;
    let lastUpdate = 0;
    const throttleDelay = 50;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate < throttleDelay) return;

      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
        lastUpdate = now;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Memoized callbacks
  const updateToken = useCallback((path, value) => {
    setTokens(prev => {
      const newTokens = JSON.parse(JSON.stringify(prev));
      const keys = typeof path === 'string' ? path.split('.') : [path];
      let current = newTokens;
      
      if (typeof path === 'string') {
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      } else {
        // Direct object assignment for spacing/radius
        current[path] = value;
      }
      
      return newTokens;
    });
  }, []);

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const handleTokenEditorToggle = useCallback(() => {
    setShowTokenEditor(prev => !prev);
  }, []);

  const handleTokenEditorClose = useCallback(() => {
    setShowTokenEditor(false);
  }, []);

  const handleTokenReset = useCallback(() => {
    setTokens(createTokenSystem());
  }, []);

  const handleNavHover = useMemo(() => ({
    enter: () => setNavHovering(true),
    leave: () => setNavHovering(false),
  }), []);

  // Global styles
  const globalStyles = useMemo(() => `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${tokens.typography.fontFamily.body};
      background: ${tokens.colors.dark.bg};
      color: #FFFFFF;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    
    ::selection {
      background: ${tokens.colors.accent.primary}40;
      color: #FFFFFF;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 20px ${tokens.colors.accent.primary}40;
      }
      50% {
        box-shadow: 0 0 40px ${tokens.colors.accent.primary}80;
      }
    }

    .animate-in {
      animation: slideIn ${tokens.animation.slow} ease-out forwards;
      opacity: 0;
    }

    .stagger-1 { animation-delay: 100ms; }
    .stagger-2 { animation-delay: 200ms; }
    .stagger-3 { animation-delay: 300ms; }
    .stagger-4 { animation-delay: 400ms; }
  `, [tokens]);

  // Hero Section - Memoized
  const Hero = useMemo(() => {
    const stats = [
      { value: '5+', label: 'Years Engineering' },
      { value: '3', label: 'Enterprise Systems' },
      { value: '20%', label: 'Bug Reduction' },
    ];

    const orbitalTokens = ['Color', 'Space', 'Type', 'Motion'];

    return (
      <div style={{
        padding: `${tokens.spacing[16]}px ${tokens.spacing[6]}px`,
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: `${tokens.spacing[12]}px`,
            alignItems: 'center',
          }}>
            <div>
              <div 
                className="animate-in"
                style={{
                  fontFamily: tokens.typography.fontFamily.mono,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  color: tokens.colors.accent.primary,
                  marginBottom: `${tokens.spacing[4]}px`,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                <Zap size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Design Systems Engineer
              </div>
              
              <h1 
                className="animate-in stagger-1"
                style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  fontSize: `${tokens.typography.fontSize['5xl']}px`,
                  fontWeight: '800',
                  lineHeight: '1.1',
                  marginBottom: `${tokens.spacing[5]}px`,
                  background: `linear-gradient(135deg, #FFFFFF, ${tokens.colors.gray[600]})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                Engineering precision meets creative vision
              </h1>
              
              <p 
                className="animate-in stagger-2"
                style={{
                  fontSize: `${tokens.typography.fontSize.xl}px`,
                  color: tokens.colors.gray[600],
                  lineHeight: '1.7',
                  marginBottom: `${tokens.spacing[8]}px`,
                  maxWidth: '600px',
                }}>
                I architect design systems that scale. From Figma variables to production code, 
                I build the foundations that empower teams to ship faster and more consistently.
              </p>
              
              <div 
                className="animate-in stagger-3"
                style={{
                  display: 'flex',
                  gap: `${tokens.spacing[3]}px`,
                }}>
                <button
                  onClick={() => handleSectionChange('work')}
                  style={{
                    background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
                    color: '#FFFFFF',
                    border: 'none',
                    padding: `${tokens.spacing[4]}px ${tokens.spacing[6]}px`,
                    borderRadius: `${tokens.radius.lg}px`,
                    fontFamily: tokens.typography.fontFamily.body,
                    fontSize: `${tokens.typography.fontSize.base}px`,
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${tokens.spacing[2]}px`,
                    transition: `all ${tokens.animation.normal}`,
                    boxShadow: `0 4px 24px ${tokens.colors.accent.primary}40`,
                  }}
                >
                  View Case Studies
                  <ChevronRight size={20} />
                </button>
                
                <button
                  onClick={handleTokenEditorToggle}
                  style={{
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: `2px solid ${tokens.colors.gray[800]}`,
                    padding: `${tokens.spacing[4]}px ${tokens.spacing[6]}px`,
                    borderRadius: `${tokens.radius.lg}px`,
                    fontFamily: tokens.typography.fontFamily.body,
                    fontSize: `${tokens.typography.fontSize.base}px`,
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${tokens.spacing[2]}px`,
                    transition: `all ${tokens.animation.normal}`,
                  }}
                >
                  <Play size={20} />
                  Try Live Editor
                </button>
              </div>

              <div 
                className="animate-in stagger-4"
                style={{
                  marginTop: `${tokens.spacing[12]}px`,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: `${tokens.spacing[5]}px`,
                }}>
                {stats.map((stat) => (
                  <div key={stat.label} style={{
                    padding: `${tokens.spacing[4]}px`,
                    background: `${tokens.colors.dark.surface}80`,
                    borderRadius: `${tokens.radius.md}px`,
                    border: `1px solid ${tokens.colors.gray[900]}`,
                  }}>
                    <div style={{
                      fontFamily: tokens.typography.fontFamily.display,
                      fontSize: `${tokens.typography.fontSize['3xl']}px`,
                      fontWeight: '800',
                      color: tokens.colors.accent.primary,
                      marginBottom: `${tokens.spacing[1]}px`,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      color: tokens.colors.gray[600],
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              position: 'relative',
              height: '600px',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${tokens.colors.accent.primary}40 0%, transparent 70%)`,
                filter: 'blur(60px)',
                animation: 'float 6s ease-in-out infinite',
              }} />
              
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '120px',
                    height: '120px',
                    background: tokens.colors.dark.elevated,
                    border: `2px solid ${idx % 2 === 0 ? tokens.colors.accent.primary : tokens.colors.accent.secondary}`,
                    borderRadius: `${tokens.radius.xl}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: `${tokens.typography.fontSize.sm}px`,
                    fontFamily: tokens.typography.fontFamily.mono,
                    color: tokens.colors.gray[600],
                    transform: `
                      translate(-50%, -50%) 
                      rotate(${idx * 90}deg) 
                      translateY(-180px) 
                      rotate(-${idx * 90}deg)
                    `,
                    animation: `float ${4 + idx}s ease-in-out infinite`,
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  {orbitalTokens[idx]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, [tokens, handleSectionChange, handleTokenEditorToggle]);

  // Work Section - Memoized
  const Work = useMemo(() => {
    const caseStudies = [
      {
        id: 'truist',
        client: 'Truist Financial',
        title: 'Enterprise Banking Design System',
        gradient: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
        tags: ['Design Tokens', 'Multi-Product', 'Enterprise'],
      },
      {
        id: 'johnson',
        client: 'Johnson Controls',
        title: 'Industrial IoT Component Library',
        gradient: `linear-gradient(135deg, ${tokens.colors.accent.secondary}, ${tokens.colors.accent.tertiary})`,
        tags: ['Component Library', 'B2B SaaS', 'Atomic Design'],
      },
      {
        id: 'anheuser',
        client: 'Anheuser-Busch',
        title: 'Multi-Brand Consumer Platform',
        gradient: `linear-gradient(135deg, ${tokens.colors.accent.tertiary}, ${tokens.colors.accent.primary})`,
        tags: ['Multi-Brand', 'Theming', 'E-commerce'],
      },
    ];

    return (
      <div style={{
        padding: `${tokens.spacing[16]}px ${tokens.spacing[6]}px`,
        background: tokens.colors.dark.bg,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `${tokens.typography.fontSize['4xl']}px`,
            fontWeight: '800',
            marginBottom: `${tokens.spacing[3]}px`,
          }}>
            Case Studies
          </h2>
          <p style={{
            fontSize: `${tokens.typography.fontSize.xl}px`,
            color: tokens.colors.gray[600],
            marginBottom: `${tokens.spacing[12]}px`,
            maxWidth: '800px',
          }}>
            Enterprise design systems for financial services, industrial IoT, and consumer platforms
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: `${tokens.spacing[6]}px`,
          }}>
            {caseStudies.map((study, idx) => (
              <div
                key={study.id}
                className={`animate-in stagger-${idx + 1}`}
                style={{
                  background: tokens.colors.dark.elevated,
                  borderRadius: `${tokens.radius.lg}px`,
                  padding: `${tokens.spacing[6]}px`,
                  border: `1px solid ${tokens.colors.gray[900]}`,
                  cursor: 'pointer',
                  transition: `all ${tokens.animation.normal}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: study.gradient,
                }} />

                <div style={{
                  fontFamily: tokens.typography.fontFamily.mono,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  color: tokens.colors.accent.primary,
                  marginBottom: `${tokens.spacing[3]}px`,
                }}>
                  {study.client}
                </div>

                <h3 style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  fontSize: `${tokens.typography.fontSize['2xl']}px`,
                  fontWeight: '700',
                  marginBottom: `${tokens.spacing[4]}px`,
                }}>
                  {study.title}
                </h3>

                <div style={{
                  display: 'flex',
                  gap: `${tokens.spacing[2]}px`,
                  flexWrap: 'wrap',
                }}>
                  {study.tags.map(tag => (
                    <span key={tag} style={{
                      padding: `${tokens.spacing[1]}px ${tokens.spacing[3]}px`,
                      background: `${tokens.colors.gray[900]}80`,
                      borderRadius: `${tokens.radius.sm}px`,
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      color: tokens.colors.gray[600],
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [tokens]);

  // Lab Section - Memoized
  const DesignLab = useMemo(() => (
    <div style={{
      padding: `${tokens.spacing[16]}px ${tokens.spacing[6]}px`,
      background: tokens.colors.dark.surface,
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: tokens.typography.fontFamily.display,
          fontSize: `${tokens.typography.fontSize['4xl']}px`,
          fontWeight: '800',
          marginBottom: `${tokens.spacing[3]}px`,
        }}>
          Design Lab
        </h2>
        <p style={{
          fontSize: `${tokens.typography.fontSize.xl}px`,
          color: tokens.colors.gray[600],
          marginBottom: `${tokens.spacing[12]}px`,
          maxWidth: '800px',
        }}>
          Interactive showcase of the token system. Click the floating button to edit tokens live.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: `${tokens.spacing[4]}px`,
          marginBottom: `${tokens.spacing[12]}px`,
        }}>
          {Object.entries(tokens.colors.accent).map(([key, value]) => (
            <div
              key={key}
              className="animate-in"
              style={{
                background: tokens.colors.dark.elevated,
                borderRadius: `${tokens.radius.md}px`,
                padding: `${tokens.spacing[4]}px`,
                border: `1px solid ${tokens.colors.gray[900]}`,
              }}
            >
              <div style={{
                width: '100%',
                height: '80px',
                background: value,
                borderRadius: `${tokens.radius.sm}px`,
                marginBottom: `${tokens.spacing[3]}px`,
              }} />
              <div style={{
                fontFamily: tokens.typography.fontFamily.mono,
                fontSize: `${tokens.typography.fontSize.sm}px`,
                color: tokens.colors.gray[600],
                marginBottom: `${tokens.spacing[1]}px`,
              }}>
                accent.{key}
              </div>
              <div style={{
                fontFamily: tokens.typography.fontFamily.mono,
                fontSize: `${tokens.typography.fontSize.base}px`,
                fontWeight: '600',
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${tokens.colors.accent.primary}20, ${tokens.colors.accent.secondary}20)`,
          borderRadius: `${tokens.radius.lg}px`,
          padding: `${tokens.spacing[8]}px`,
          border: `1px solid ${tokens.colors.accent.primary}40`,
          textAlign: 'center',
        }}>
          <Sliders size={48} style={{ 
            color: tokens.colors.accent.primary,
            marginBottom: `${tokens.spacing[4]}px`,
          }} />
          <h3 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `${tokens.typography.fontSize['3xl']}px`,
            fontWeight: '700',
            marginBottom: `${tokens.spacing[3]}px`,
          }}>
            Try the Live Token Editor
          </h3>
          <p style={{
            fontSize: `${tokens.typography.fontSize.lg}px`,
            color: tokens.colors.gray[600],
          }}>
            Click the floating button to adjust colors, spacing, and border radius in real-time
          </p>
        </div>
      </div>
    </div>
  ), [tokens]);

  // About Section - Memoized
  const About = useMemo(() => {
    const features = [
      {
        icon: <Code size={32} />,
        title: 'I speak both languages',
        body: 'Fluent in design thinking and engineering architecture. I know what\'s possible in code, what\'s performant, and what will break in production.',
      },
      {
        icon: <Layers size={32} />,
        title: 'Systems thinking is innate',
        body: 'When I design a component, I\'m already considering prop APIs, variant logic, and edge cases. This prevents design debt before it starts.',
      },
      {
        icon: <Zap size={32} />,
        title: 'I ship with confidence',
        body: 'From Figma to production, I move fast without sacrificing quality. 15-20% bug reduction through systematic QA and testing utilities.',
      },
    ];

    return (
      <div style={{
        padding: `${tokens.spacing[16]}px ${tokens.spacing[6]}px`,
        background: tokens.colors.dark.bg,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `${tokens.typography.fontSize['4xl']}px`,
            fontWeight: '800',
            marginBottom: `${tokens.spacing[8]}px`,
          }}>
            Engineering × Design
          </h2>

          <p style={{
            fontSize: `${tokens.typography.fontSize['2xl']}px`,
            color: tokens.colors.gray[600],
            lineHeight: '1.7',
            marginBottom: `${tokens.spacing[12]}px`,
          }}>
            I bridge the gap between design vision and production reality. 
            My engineering background isn't a bonus—it's my superpower.
          </p>

          <div style={{
            display: 'grid',
            gap: `${tokens.spacing[6]}px`,
          }}>
            {features.map((item, idx) => (
              <div
                key={idx}
                className={`animate-in stagger-${idx + 1}`}
                style={{
                  background: tokens.colors.dark.elevated,
                  borderRadius: `${tokens.radius.lg}px`,
                  padding: `${tokens.spacing[6]}px`,
                  border: `1px solid ${tokens.colors.gray[900]}`,
                }}
              >
                <div style={{ color: tokens.colors.accent.primary, marginBottom: `${tokens.spacing[3]}px` }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  fontSize: `${tokens.typography.fontSize.xl}px`,
                  fontWeight: '700',
                  marginBottom: `${tokens.spacing[3]}px`,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: `${tokens.typography.fontSize.lg}px`,
                  color: tokens.colors.gray[600],
                  lineHeight: '1.7',
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: `${tokens.spacing[12]}px`,
            textAlign: 'center',
          }}>
            <a
              href="mailto:harrison64@gmail.com"
              style={{
                display: 'inline-block',
                padding: `${tokens.spacing[4]}px ${tokens.spacing[8]}px`,
                background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: `${tokens.radius.lg}px`,
                fontWeight: '700',
                fontSize: `${tokens.typography.fontSize.xl}px`,
                transition: `all ${tokens.animation.normal}`,
                boxShadow: `0 4px 24px ${tokens.colors.accent.primary}40`,
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    );
  }, [tokens]);

  return (
    <div>
      <style>{globalStyles}</style>
      <BackgroundGradient 
        mousePosition={mousePosition} 
        primaryColor={tokens.colors.accent.primary}
      />
      <Navigation 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        tokens={tokens}
        navHovering={navHovering}
        onNavHover={handleNavHover}
      />
      {activeSection === 'home' && Hero}
      {activeSection === 'work' && Work}
      {activeSection === 'lab' && DesignLab}
      {activeSection === 'about' && About}
      <TokenEditor 
        showTokenEditor={showTokenEditor}
        onClose={handleTokenEditorClose}
        tokens={tokens}
        updateToken={updateToken}
        onReset={handleTokenReset}
      />
      <FloatingButton 
        onClick={handleTokenEditorToggle}
        tokens={tokens}
      />
    </div>
  );
}