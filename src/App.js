import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { ChevronRight, Code, Layers, Zap, Sliders, Play, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import truistScreenshot from './images/truist-showchanges.png'; 
import emptyquizquestionpreview from './images/emptyquizquestionpreview.png';
import quizpreviewwithquestionselection from './images/quizpreviewwithquestionselection.png'; 
import quizquestionlistingwithaisidepanel from './images/quizquestionlistingwithaisidepanel.png';
import quizquestionlistingwithonequestion from './images/quizquestionlistingwithonequestion.png';
import customabitheme from './images/customabitheme.png';

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

// Simple password - you can change this to whatever you want
const PORTFOLIO_PASSWORD = 'designsystems2024';

// Case study data with full details
const CASE_STUDIES_DATA = [
  {
    id: 'truist',
    client: 'Truist Financial',
    title: 'Enterprise Document Management System',
    role: 'Lead UI/UX Engineer',
    tags: ['Design Tokens', 'Version Control', 'Enterprise SaaS'],
    challenge: 'Truist Acadia users struggled with maintaining comprehensive document history, resulting in confusion during process updates and lost institutional knowledge. Without visibility into historical changes, teams could not understand the rationale behind modifications or track the evolution of critical compliance documents. This created significant risk in regulated banking environments where audit trails and change justification are paramount.',
    solution: 'Designed and engineered a comprehensive "Show Changes" feature that captures timestamped document revisions with granular change tracking. Implemented intelligent text highlighting powered by the design token system, utilizing color, spacing, and typography tokens to create clear visual differentiation between additions, removals, and modifications. Built a scalable revision history architecture that maintains context across document lifecycles while ensuring performance at enterprise scale.',
    impact: [
      'Established complete audit trail preserving institutional knowledge across all process changes',
      'Increased user engagement with process improvement workflows by 35%',
      'Reduced development time by 60% through systematic reuse of established token architecture',
      'Enhanced regulatory compliance with comprehensive change documentation',
      'Enabled teams to confidently iterate on processes with full historical context',
      'Accelerated onboarding for new team members through accessible change history',
    ],
    implementation: {
      hasScreenshot: true,
      screenshots: [
        {
          url: truistScreenshot,
          alt: 'Truist Acadia document management interface showing version control with "Show Changes" feature, displaying revision tracking, approval workflows, and color-coded change indicators',
          caption: 'Version control interface with color-coded change indicators'
        }
      ],
      screenshotAlt: 'Truist Acadia document management interface showing version control with "Show Changes" feature, displaying revision tracking, approval workflows, and color-coded change indicators',
      description: 'The design system powers Truist Acadia\'s internal policy management and compliance tracking platform. The "Show Changes" feature leverages systematic color tokens (green for additions, red for removals, purple for modifications) and consistent spacing tokens to create an intuitive, accessible change review experience across all document types.',
      features: [
        {
          title: 'Token-Driven Change Visualization',
          description: 'Utilizes semantic color tokens for consistent change indicators: additions (tertiary/success), removals (secondary/warning), and modifications (primary). Typography tokens ensure readable diff comparisons across all viewport sizes.',
        },
        {
          title: 'Temporal Change Tracking',
          description: 'Timestamps every revision with full context including document ID, owner, collection, review schedules, and effective dates. Enables complete audit trail for compliance and regulatory requirements.',
        },
        {
          title: 'Systematic Component Reuse',
          description: 'Built on established token system enabling rapid feature development. Spacing tokens ensure consistent padding and margins, while typography tokens maintain hierarchy across all change states.',
        },
      ],
    }
  },
 {
    id: 'johnson',
    client: 'Johnson Controls',
    title: 'AI-Powered Quiz Platform Redesign',
    role: 'Senior UI/UX Engineer',
    tags: ['Product Design', 'AI Integration', 'User Experience'],
    challenge: 'Legacy quiz editor lacked preview capabilities and required time-intensive manual question creation, resulting in inconsistent content quality and slow production cycles.',
    solution: 'Redesigned the quiz editing experience with a dual-pane live preview interface and implemented the product\'s first AI-powered feature to generate contextually relevant quiz questions.',
    impact: [ 
      '45% reduction in quiz creation time',
      '89% AI recommendation adoption rate', 
      'Became the model for AI integration across product',
      'Quiz generation rate improved by 60%'
    ],
    implementation: {
      hasScreenshot: true,
      screenshots: [ 
        {
          url: quizquestionlistingwithonequestion,
          alt: 'Johnson Controls AI-powered quiz platform interface showing question listing with one question.',
          caption: 'Quiz question listing with one question'
        },
        {
          url: emptyquizquestionpreview,
          alt: 'Johnson Controls AI-powered quiz platform interface showing empty quiz question preview.',
          caption: 'Empty quiz question preview'
        },
        {
          url: quizpreviewwithquestionselection,
          alt: 'Johnson Controls AI-powered quiz platform interface showing quiz preview with question selection.',
          caption: 'Quiz preview with question selection'
        },
        {
          url: quizquestionlistingwithaisidepanel,
          alt: 'Johnson Controls AI-powered quiz platform interface showing quiz question listing with AI side panel.',
          caption: 'Quiz question listing with AI side panel'
        }
        
       ],
      description: 'The redesign introduced a live preview window that updates in real-time as users create and modify quiz questions, providing immediate visual feedback. The AI-powered question generation feature analyzes the provided content and learning objectives to suggest relevant questions, significantly reducing manual effort and enhancing content quality.',
      features: [ 
        {
          title: 'AI-Powered Question Generation',
          description: 'Contextual analysis and suggestions based on learning objectives and content.',
        },
        {
          title: 'Real-Time Preview Window',
          description: 'Instant feedback on question appearance and functionality during creation.',
        },
        {
          title: 'Flexible Question Framework',
          description: 'Supports multiple question types with dynamic input fields and validation.',
        }
      ],
    }
  },
 {
  id: 'anheuser',
  client: 'Anheuser-Busch',
  title: 'White-Label Theming & Brand Customization Platform',
  role: 'Design Systems Lead',
  tags: ['Design Tokens', 'Theming', 'Enterprise Customization'],
  challenge: 'Acadia\'s enterprise clients needed their internal tools to reflect their corporate branding to drive adoption and reinforce the platform as part of their organization\'s official tooling ecosystem. The existing design system lacked the flexibility for client-specific customization, forcing all users into a generic interface that felt disconnected from their company\'s visual identity. This created adoption friction as employees couldn\'t immediately recognize the platform as an approved corporate tool, leading to skepticism and reduced engagement.',
  solution: 'Architected a comprehensive white-label theming system built on extensible design tokens, enabling enterprise clients to customize colors, typography, logos, and iconography while maintaining accessibility and usability standards. Implemented Anheuser-Busch as the flagship client showcase, creating a fully branded experience with custom icon sets and color palettes aligned to their corporate identity guidelines. Established a brand adoption framework with guardrails ensuring customizations never compromise WCAG compliance or core product functionality.',
  impact: [
    'Enabled enterprise clients to deploy fully branded instances in under 2 hours',
    'Increased Anheuser-Busch employee adoption rate by 73% within first quarter',
    'Generated new revenue stream with premium white-label offering for enterprise tier',
    'Reduced client customization requests by 85% through self-service theme editor',
    'Established reusable theming architecture adopted across 12+ enterprise clients',
    'Maintained 100% WCAG AA compliance across all custom theme configurations',
  ],
  implementation: {
    hasScreenshot: true,
    screenshots: [
      {
        url: customabitheme,
        alt: 'Anheuser-Busch branded Acadia interface showing custom logo, color scheme, and iconography',
        caption: 'Fully customized Anheuser-Busch theme with corporate branding and custom icon set'
      }
    ],
    description: 'The white-label theming system leverages a sophisticated token architecture where primitive tokens (base colors, spacing) remain constant while semantic tokens (brand colors, interactive states) dynamically adapt to client configurations. The Anheuser-Busch implementation features their signature red and gold color palette, custom eagle iconography, and corporate typography—creating an immediately recognizable branded experience that integrates seamlessly with their existing internal tools.',
    features: [
      {
        title: 'Dynamic Token Architecture',
        description: 'Built extensible token system separating primitive tokens (foundations) from semantic tokens (brand-specific). Clients customize semantic layer through intuitive theme editor while system automatically generates accessible color combinations, hover states, and focus indicators that meet WCAG standards.',
      },
      {
        title: 'Custom Logo & Icon System',
        description: 'Supports client-specific logo placement and custom icon libraries. Anheuser-Busch implementation includes their corporate logo in navigation, custom eagle iconography for key features, and brand-aligned illustrations. Icon system maintains consistent sizing and optical alignment across all customization scenarios.',
      },
      {
        title: 'Brand Adoption Guardrails',
        description: 'Automated validation ensures all theme customizations maintain minimum contrast ratios, readable typography scales, and proper spacing relationships. Real-time preview shows branded experience across light/dark modes before deployment, preventing accessibility violations while maximizing brand expression.',
      },
    ],
  }
}
];

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

// Login Modal Component
const LoginModal = memo(({ tokens, onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (password === PORTFOLIO_PASSWORD) {
      sessionStorage.setItem('portfolioUnlocked', 'true');
      onSuccess();
    } else {
      setError('Incorrect password');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  }, [password, onSuccess]);

  const overlayStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    animation: 'fadeIn 300ms ease-out',
    padding: `${tokens.spacing[4]}px`,
  }), [tokens]);

  const modalStyle = useMemo(() => ({
    background: tokens.colors.dark.elevated,
    borderRadius: `${tokens.radius.xl}px`,
    padding: `${tokens.spacing[6]}px`,
    maxWidth: '500px',
    width: '100%',
    border: `1px solid ${tokens.colors.gray[800]}`,
    boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5)`,
    animation: isShaking ? 'shake 0.5s' : 'slideUp 400ms ease-out',
  }), [tokens, isShaking]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
      `}</style>
      
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto',
            marginBottom: `${tokens.spacing[4]}px`,
            background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Lock size={40} color="#FFFFFF" />
          </div>

          <h2 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize['2xl']}px, 5vw, ${tokens.typography.fontSize['3xl']}px)`,
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: `${tokens.spacing[2]}px`,
          }}>
            Protected Content
          </h2>

          <p style={{
            fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.lg}px)`,
            color: tokens.colors.gray[600],
            textAlign: 'center',
            marginBottom: `${tokens.spacing[4]}px`,
            lineHeight: '1.6',
          }}>
            These case studies contain confidential client work. Please enter the password to view details.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative', marginBottom: `${tokens.spacing[3]}px` }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                autoFocus
                style={{
                  width: '100%',
                  padding: `${tokens.spacing[3]}px ${tokens.spacing[8]}px ${tokens.spacing[3]}px ${tokens.spacing[3]}px`,
                  background: tokens.colors.dark.surface,
                  border: `2px solid ${error ? tokens.colors.accent.secondary : tokens.colors.gray[800]}`,
                  borderRadius: `${tokens.radius.md}px`,
                  color: '#FFFFFF',
                  fontSize: `${tokens.typography.fontSize.base}px`,
                  fontFamily: tokens.typography.fontFamily.body,
                  outline: 'none',
                  transition: `all ${tokens.animation.normal}`,
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = tokens.colors.accent.primary;
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = tokens.colors.gray[800];
                }}
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: `${tokens.spacing[3]}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: tokens.colors.gray[600],
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div style={{
                color: tokens.colors.accent.secondary,
                fontSize: `${tokens.typography.fontSize.sm}px`,
                marginBottom: `${tokens.spacing[3]}px`,
                textAlign: 'center',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: `${tokens.spacing[3]}px`,
                background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
                border: 'none',
                borderRadius: `${tokens.radius.md}px`,
                color: '#FFFFFF',
                fontSize: `${tokens.typography.fontSize.base}px`,
                fontWeight: '700',
                cursor: 'pointer',
                transition: `all ${tokens.animation.normal}`,
                boxShadow: `0 4px 24px ${tokens.colors.accent.primary}40`,
              }}
            >
              Unlock Case Studies
            </button>
          </form>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: `${tokens.spacing[2]}px`,
              background: 'transparent',
              border: 'none',
              color: tokens.colors.gray[600],
              fontSize: `${tokens.typography.fontSize.sm}px`,
              cursor: 'pointer',
              marginTop: `${tokens.spacing[3]}px`,
              transition: `all ${tokens.animation.normal}`,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
});

LoginModal.displayName = 'LoginModal';

// Memoized Navigation Component
const Navigation = memo(({ 
  activeSection, 
  onSectionChange, 
  tokens, 
  navHovering, 
  onNavHover,
  isUnlocked 
}) => {
  const navStyle = useMemo(() => ({
    position: 'sticky',
    top: 0,
    background: `${tokens.colors.dark.bg}f0`,
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${tokens.colors.gray[900]}`,
    padding: `${tokens.spacing[3]}px ${tokens.spacing[4]}px`,
    zIndex: 100,
    transition: `all ${tokens.animation.normal}`,
    boxShadow: navHovering ? `0 4px 24px ${tokens.colors.accent.primary}20` : 'none',
  }), [tokens, navHovering]);

  const logoStyle = useMemo(() => ({
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: `clamp(${tokens.typography.fontSize.xl}px, 4vw, ${tokens.typography.fontSize['2xl']}px)`,
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
    fontSize: `clamp(${tokens.typography.fontSize.sm}px, 2.5vw, ${tokens.typography.fontSize.base}px)`,
    fontWeight: '600',
    color: activeSection === section ? tokens.colors.accent.primary : tokens.colors.gray[600],
    cursor: 'pointer',
    padding: `${tokens.spacing[1]}px ${tokens.spacing[2]}px`,
    borderRadius: `${tokens.radius.sm}px`,
    transition: `all ${tokens.animation.normal}`,
    position: 'relative',
    whiteSpace: 'nowrap',
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
        flexWrap: 'wrap',
        gap: `${tokens.spacing[2]}px`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing[2]}px`, flexWrap: 'wrap' }}>
          <div style={logoStyle}>HN</div>
          {isUnlocked && (
            <div style={{
              padding: `${tokens.spacing[1]}px ${tokens.spacing[2]}px`,
              background: `${tokens.colors.accent.tertiary}20`,
              borderRadius: `${tokens.radius.sm}px`,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              color: tokens.colors.accent.tertiary,
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: `${tokens.spacing[1]}px`,
            }}>
              <Lock size={12} />
              <span style={{ display: 'inline' }}>Unlocked</span>
            </div>
          )}
        </div>
        <div style={{ 
          display: 'flex', 
          gap: `${tokens.spacing[2]}px`,
          flexWrap: 'wrap',
        }}>
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

// Token Editor Component
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
    right: showTokenEditor ? 0 : '-100%',
    width: 'min(100%, 420px)',
    height: '100vh',
    background: tokens.colors.dark.elevated,
    borderLeft: `1px solid ${tokens.colors.gray[800]}`,
    padding: `${tokens.spacing[4]}px`,
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
        marginBottom: `${tokens.spacing[4]}px`,
      }}>
        <h3 style={{
          fontFamily: tokens.typography.fontFamily.display,
          fontSize: `${tokens.typography.fontSize.xl}px`,
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
        marginBottom: `${tokens.spacing[4]}px`,
      }}>
        Adjust tokens and watch the page update in real-time
      </div>

      <div style={{ marginBottom: `${tokens.spacing[4]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[2]}px`,
          color: tokens.colors.accent.primary,
          fontSize: `${tokens.typography.fontSize.sm}px`,
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

      <div style={{ marginBottom: `${tokens.spacing[4]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[2]}px`,
          color: tokens.colors.accent.secondary,
          fontSize: `${tokens.typography.fontSize.sm}px`,
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

      <div style={{ marginBottom: `${tokens.spacing[4]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[2]}px`,
          fontSize: `${tokens.typography.fontSize.sm}px`,
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

      <div style={{ marginBottom: `${tokens.spacing[4]}px` }}>
        <label style={{
          display: 'block',
          fontWeight: '600',
          marginBottom: `${tokens.spacing[2]}px`,
          fontSize: `${tokens.typography.fontSize.sm}px`,
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
          fontSize: `${tokens.typography.fontSize.sm}px`,
        }}
      >
        Reset to Defaults
      </button>
    </div>
  );
});

TokenEditor.displayName = 'TokenEditor';

// Floating Button
const FloatingButton = memo(({ onClick, tokens }) => {
  const buttonStyle = useMemo(() => ({
    position: 'fixed',
    bottom: `${tokens.spacing[4]}px`,
    right: `${tokens.spacing[4]}px`,
    width: 'clamp(56px, 12vw, 64px)',
    height: 'clamp(56px, 12vw, 64px)',
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
      <Sliders size={24} />
    </button>
  );
});

FloatingButton.displayName = 'FloatingButton';

// Case Study Detail Component
const CaseStudyDetail = memo(({ study, tokens, onClose }) => {
  const CodeBlock = useCallback(({ children, language = 'tsx' }) => (
    <div style={{
      background: tokens.colors.gray[900],
      borderRadius: `${tokens.radius.md}px`,
      padding: `${tokens.spacing[3]}px`,
      marginTop: `${tokens.spacing[2]}px`,
      overflow: 'auto',
      maxWidth: '100%',
    }}>
      <div style={{
        fontFamily: tokens.typography.fontFamily.mono,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        color: tokens.colors.gray[600],
        marginBottom: `${tokens.spacing[2]}px`,
      }}>
        {language}
      </div>
      <pre style={{
        fontFamily: tokens.typography.fontFamily.mono,
        fontSize: `clamp(${tokens.typography.fontSize.sm - 2}px, 2.5vw, ${tokens.typography.fontSize.sm}px)`,
        color: '#FFFFFF',
        lineHeight: '1.7',
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        maxWidth: '100%',
        overflowWrap: 'anywhere',
      }}>
        {children}
      </pre>
    </div>
  ), [tokens]);

  return (
    <div style={{
      padding: `${tokens.spacing[8]}px ${tokens.spacing[4]}px`,
      background: tokens.colors.dark.bg,
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={onClose}
          className="animate-in"
          style={{
            background: 'none',
            border: 'none',
            color: tokens.colors.accent.primary,
            fontFamily: tokens.typography.fontFamily.body,
            fontSize: `${tokens.typography.fontSize.base}px`,
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: `${tokens.spacing[6]}px`,
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing[2]}px`,
            padding: `${tokens.spacing[2]}px 0`,
            transition: `all ${tokens.animation.normal}`,
          }}
        >
          <ArrowLeft size={20} />
          Back to all case studies
        </button>

        <div className="animate-in stagger-1" style={{ marginBottom: `${tokens.spacing[8]}px` }}>
          <div style={{
            fontFamily: tokens.typography.fontFamily.mono,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            color: tokens.colors.accent.primary,
            marginBottom: `${tokens.spacing[2]}px`,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {study.client}
          </div>
          <h1 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize['2xl']}px, 6vw, ${tokens.typography.fontSize['4xl']}px)`,
            fontWeight: '800',
            marginBottom: `${tokens.spacing[2]}px`,
            lineHeight: '1.2',
          }}>
            {study.title}
          </h1>
          <div style={{
            fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
            color: tokens.colors.gray[600],
          }}>
            {study.role}
          </div>
        </div>

        <div className="animate-in stagger-2" style={{
          background: tokens.colors.dark.elevated,
          borderRadius: `${tokens.radius.lg}px`,
          padding: `${tokens.spacing[4]}px`,
          borderLeft: `4px solid ${tokens.colors.gray[700]}`,
          marginBottom: `${tokens.spacing[6]}px`,
        }}>
          <h3 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize.xl}px, 4vw, ${tokens.typography.fontSize['2xl']}px)`,
            fontWeight: '700',
            marginBottom: `${tokens.spacing[3]}px`,
          }}>
            Challenge
          </h3>
          <p style={{
            fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.lg}px)`,
            color: tokens.colors.gray[600],
            lineHeight: '1.7',
          }}>
            {study.challenge}
          </p>
        </div>

        <div className="animate-in stagger-3" style={{
          background: tokens.colors.dark.elevated,
          borderRadius: `${tokens.radius.lg}px`,
          padding: `${tokens.spacing[4]}px`,
          borderLeft: `4px solid ${tokens.colors.accent.primary}`,
          marginBottom: `${tokens.spacing[6]}px`,
        }}>
          <h3 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize.xl}px, 4vw, ${tokens.typography.fontSize['2xl']}px)`,
            fontWeight: '700',
            marginBottom: `${tokens.spacing[3]}px`,
          }}>
            Solution
          </h3>
          <p style={{
            fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.lg}px)`,
            color: tokens.colors.gray[600],
            lineHeight: '1.7',
          }}>
            {study.solution}
          </p>
        </div>

        <div className="animate-in stagger-4" style={{
          background: tokens.colors.dark.elevated,
          borderRadius: `${tokens.radius.lg}px`,
          padding: `${tokens.spacing[4]}px`,
          borderLeft: `4px solid ${tokens.colors.accent.tertiary}`,
          marginBottom: `${tokens.spacing[8]}px`,
        }}>
          <h3 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize.xl}px, 4vw, ${tokens.typography.fontSize['2xl']}px)`,
            fontWeight: '700',
            marginBottom: `${tokens.spacing[3]}px`,
          }}>
            Impact
          </h3>
          <ul style={{ 
            paddingLeft: `${tokens.spacing[4]}px`,
            margin: 0,
          }}>
            {study.impact.map((item, i) => (
              <li key={i} style={{
                fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.lg}px)`,
                color: tokens.colors.gray[600],
                lineHeight: '1.7',
                marginBottom: `${tokens.spacing[2]}px`,
              }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize['2xl']}px, 5vw, ${tokens.typography.fontSize['3xl']}px)`,
            fontWeight: '800',
            marginBottom: `${tokens.spacing[4]}px`,
          }}>
            {study.implementation.hasScreenshot ? 'Design System in Production' : 'Technical Implementation'}
          </h2>

          {study.implementation.hasScreenshot ? (
            <>
              <div style={{ marginBottom: `${tokens.spacing[6]}px` }}>
      {/* Multiple Screenshots Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: `${tokens.spacing[4]}px`,
        marginBottom: `${tokens.spacing[4]}px`,
      }}>
        {study.implementation.screenshots.map((screenshot, idx) => (
          <div
            key={idx}
            className="animate-in"
            style={{
              background: tokens.colors.dark.elevated,
              borderRadius: `${tokens.radius.lg}px`,
              padding: `${tokens.spacing[4]}px`,
              border: `1px solid ${tokens.colors.gray[900]}`,
              overflow: 'hidden',
            }}
          >
            <img 
              src={screenshot.url}
              alt={screenshot.alt}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: `${tokens.radius.md}px`,
                display: 'block',
                border: `1px solid ${tokens.colors.gray[800]}`,
                maxWidth: '100%',
                marginBottom: screenshot.caption ? `${tokens.spacing[3]}px` : 0,
              }}
            />
            {screenshot.caption && (
              <p style={{
                fontSize: `clamp(${tokens.typography.fontSize.sm}px, 2.5vw, ${tokens.typography.fontSize.base}px)`,
                color: tokens.colors.gray[600],
                lineHeight: '1.6',
                textAlign: 'center',
                margin: 0,
              }}>
                {screenshot.caption}
              </p>
            )}
          </div>
        ))}
                  {study.implementation.description && (
                    <p style={{
                      marginTop: `${tokens.spacing[4]}px`,
                      fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.lg}px)`,
                      color: tokens.colors.gray[600],
                      lineHeight: '1.7',
                    }}>
                      {study.implementation.description}
                    </p>
                  )}
                </div>
              </div>

              {study.implementation.features && (
                <div style={{ marginBottom: `${tokens.spacing[6]}px` }}>
                  <h3 style={{
                    fontFamily: tokens.typography.fontFamily.display,
                    fontSize: `clamp(${tokens.typography.fontSize.xl}px, 4vw, ${tokens.typography.fontSize['2xl']}px)`,
                    fontWeight: '700',
                    marginBottom: `${tokens.spacing[4]}px`,
                  }}>
                    Key Features
                  </h3>
                  <div style={{
                    display: 'grid',
                    gap: `${tokens.spacing[4]}px`,
                  }}>
                    {study.implementation.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="animate-in"
                        style={{
                          background: tokens.colors.dark.elevated,
                          borderRadius: `${tokens.radius.md}px`,
                          padding: `${tokens.spacing[4]}px`,
                          border: `1px solid ${tokens.colors.gray[900]}`,
                        }}
                      >
                        <h4 style={{
                          fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                          fontWeight: '600',
                          marginBottom: `${tokens.spacing[2]}px`,
                          color: tokens.colors.accent.primary,
                        }}>
                          {feature.title}
                        </h4>
                        <p style={{
                          fontSize: `clamp(${tokens.typography.fontSize.base}px, 2.5vw, ${tokens.typography.fontSize.lg}px)`,
                          color: tokens.colors.gray[600],
                          lineHeight: '1.7',
                          margin: 0,
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {study.implementation.before && (
                <div className="animate-in" style={{ marginBottom: `${tokens.spacing[6]}px` }}>
                  <h4 style={{
                    fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                    fontWeight: '600',
                    marginBottom: `${tokens.spacing[3]}px`,
                  }}>
                    Token System Transformation
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: `${tokens.spacing[3]}px`,
                  }}>
                    <div>
                      <div style={{
                        fontSize: `${tokens.typography.fontSize.sm}px`,
                        color: tokens.colors.gray[600],
                        marginBottom: `${tokens.spacing[2]}px`,
                      }}>
                        Before
                      </div>
                      <CodeBlock language="css">
                        {study.implementation.before}
                      </CodeBlock>
                    </div>
                    <div>
                      <div style={{
                        fontSize: `${tokens.typography.fontSize.sm}px`,
                        color: tokens.colors.gray[600],
                        marginBottom: `${tokens.spacing[2]}px`,
                      }}>
                        After
                      </div>
                      <CodeBlock language="css">
                        {study.implementation.after}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              )}

              {study.implementation.atomic && (
                <div className="animate-in" style={{ marginBottom: `${tokens.spacing[6]}px` }}>
                  <h4 style={{
                    fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                    fontWeight: '600',
                    marginBottom: `${tokens.spacing[3]}px`,
                  }}>
                    Atomic Design Hierarchy
                  </h4>
                  <div style={{
                    background: tokens.colors.dark.elevated,
                    borderRadius: `${tokens.radius.md}px`,
                    padding: `${tokens.spacing[3]}px`,
                    marginBottom: `${tokens.spacing[3]}px`,
                  }}>
                    {Object.entries(study.implementation.atomic).map(([key, value]) => (
                      <div key={key} style={{
                        fontFamily: tokens.typography.fontFamily.mono,
                        fontSize: `clamp(${tokens.typography.fontSize.sm}px, 2.5vw, ${tokens.typography.fontSize.base}px)`,
                        marginBottom: `${tokens.spacing[2]}px`,
                      }}>
                        <span style={{ 
                          color: tokens.colors.accent.primary,
                          fontWeight: '600',
                        }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        {' → '}
                        <span style={{ color: tokens.colors.gray[600] }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {study.implementation.brands && (
                <div className="animate-in" style={{ marginBottom: `${tokens.spacing[6]}px` }}>
                  <h4 style={{
                    fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                    fontWeight: '600',
                    marginBottom: `${tokens.spacing[3]}px`,
                  }}>
                    Multi-Brand Theme System
                  </h4>
                  <div style={{
                    background: tokens.colors.dark.elevated,
                    borderRadius: `${tokens.radius.md}px`,
                    padding: `${tokens.spacing[3]}px`,
                    marginBottom: `${tokens.spacing[3]}px`,
                  }}>
                    <div style={{
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      color: tokens.colors.gray[600],
                      marginBottom: `${tokens.spacing[2]}px`,
                    }}>
                      Brands Supported:
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: `${tokens.spacing[2]}px`, 
                      flexWrap: 'wrap',
                      marginBottom: `${tokens.spacing[3]}px`,
                    }}>
                      {study.implementation.brands.map(brand => (
                        <span key={brand} style={{
                          padding: `${tokens.spacing[1]}px ${tokens.spacing[2]}px`,
                          background: tokens.colors.dark.bg,
                          border: `1px solid ${tokens.colors.gray[800]}`,
                          borderRadius: `${tokens.radius.sm}px`,
                          fontSize: `${tokens.typography.fontSize.sm}px`,
                          fontWeight: '500',
                        }}>
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {study.implementation.code && (
                <div className="animate-in">
                  <h4 style={{
                    fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                    fontWeight: '600',
                    marginBottom: `${tokens.spacing[3]}px`,
                  }}>
                    Implementation Code
                  </h4>
                  <CodeBlock language="tsx">
                    {study.implementation.code}
                  </CodeBlock>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

CaseStudyDetail.displayName = 'CaseStudyDetail';

// Main Portfolio Component
export default function Portfolio() {
  const [tokens, setTokens] = useState(createTokenSystem);
  const [activeSection, setActiveSection] = useState('home');
  const [showTokenEditor, setShowTokenEditor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [navHovering, setNavHovering] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [pendingCaseId, setPendingCaseId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if already unlocked on mount
  useEffect(() => {
    const unlocked = sessionStorage.getItem('portfolioUnlocked') === 'true';
    setIsUnlocked(unlocked);
  }, []);

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

  // Scroll to top when case study changes
  useEffect(() => {
    if (selectedCase !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCase]);

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
        current[path] = value;
      }
      
      return newTokens;
    });
  }, []);

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    setSelectedCase(null);
  }, []);

  const handleCaseClick = useCallback((caseId) => {
    if (isUnlocked) {
      setSelectedCase(caseId);
    } else {
      setPendingCaseId(caseId);
      setShowLoginModal(true);
    }
  }, [isUnlocked]);

  const handleCaseClose = useCallback(() => {
    setSelectedCase(null);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsUnlocked(true);
    setShowLoginModal(false);
    if (pendingCaseId) {
      setSelectedCase(pendingCaseId);
      setPendingCaseId(null);
    }
  }, [pendingCaseId]);

  const handleLoginClose = useCallback(() => {
    setShowLoginModal(false);
    setPendingCaseId(null);
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

  // Global styles with enhanced mobile support
  const globalStyles = useMemo(() => `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* Critical overflow fixes */
    html, body {
      overflow-x: hidden;
      max-width: 100vw;
    }
    
    body {
      font-family: ${tokens.typography.fontFamily.body};
      background: ${tokens.colors.dark.bg};
      color: #FFFFFF;
      -webkit-font-smoothing: antialiased;
      min-width: 320px;
      position: relative;
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

    /* Hide decorative elements on small screens */
    .responsive-hide-mobile {
      display: block;
    }

    @media (max-width: 768px) {
      .responsive-hide-mobile {
        display: none !important;
      }
    }

    /* Extra small device optimizations */
    @media (max-width: 480px) {
      body {
        font-size: 14px;
      }
    }
  `, [tokens]);

  // Hero Section
  const Hero = useMemo(() => {
    const stats = [
      { value: '5+', label: 'Years Engineering' },
      { value: '3', label: 'Enterprise Systems' },
      { value: '20%', label: 'Bug Reduction' },
    ];

    const orbitalTokens = ['Color', 'Space', 'Type', 'Motion'];

    return (
      <div style={{
        padding: `clamp(${tokens.spacing[8]}px, 10vw, ${tokens.spacing[16]}px) clamp(${tokens.spacing[4]}px, 5vw, ${tokens.spacing[6]}px)`,
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
            alignItems: 'center',
          }}>
            <div style={{ flex: '1 1 min(100%, 400px)', minWidth: '280px' }}>
              <div 
                className="animate-in"
                style={{
                  fontFamily: tokens.typography.fontFamily.mono,
                  fontSize: `clamp(${tokens.typography.fontSize.sm - 2}px, 2.5vw, ${tokens.typography.fontSize.sm}px)`,
                  color: tokens.colors.accent.primary,
                  marginBottom: `${tokens.spacing[3]}px`,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                <Zap size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Design Systems Engineer
              </div>
              
              <h1 
                className="animate-in stagger-1"
                style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  fontSize: `clamp(${tokens.typography.fontSize['3xl']}px, 8vw, ${tokens.typography.fontSize['5xl']}px)`,
                  fontWeight: '800',
                  lineHeight: '1.2',
                  marginBottom: `${tokens.spacing[4]}px`,
                  background: `linear-gradient(135deg, #FFFFFF, ${tokens.colors.gray[600]})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                  hyphens: 'auto',
                  maxWidth: '100%',
                }}>
                Engineering precision meets creative vision
              </h1>
              
              <p 
                className="animate-in stagger-2"
                style={{
                  fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                  color: tokens.colors.gray[600],
                  lineHeight: '1.7',
                  marginBottom: `${tokens.spacing[6]}px`,
                  maxWidth: '600px',
                }}>
                I architect design systems that scale. From Figma variables to production code, 
                I build the foundations that empower teams to ship faster and more consistently.
              </p>
              
              <div 
                className="animate-in stagger-3"
                style={{
                  display: 'flex',
                  gap: `${tokens.spacing[2]}px`,
                  flexWrap: 'wrap',
                }}>
                <button
                  onClick={() => handleSectionChange('work')}
                  style={{
                    background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
                    color: '#FFFFFF',
                    border: 'none',
                    padding: `${tokens.spacing[3]}px ${tokens.spacing[4]}px`,
                    borderRadius: `${tokens.radius.lg}px`,
                    fontFamily: tokens.typography.fontFamily.body,
                    fontSize: `clamp(${tokens.typography.fontSize.sm}px, 2.5vw, ${tokens.typography.fontSize.base}px)`,
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${tokens.spacing[2]}px`,
                    transition: `all ${tokens.animation.normal}`,
                    boxShadow: `0 4px 24px ${tokens.colors.accent.primary}40`,
                    flex: '1 1 auto',
                    minWidth: '160px',
                    justifyContent: 'center',
                  }}
                >
                  View Case Studies
                  <ChevronRight size={18} />
                </button>
                
                <button
                  onClick={handleTokenEditorToggle}
                  style={{
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: `2px solid ${tokens.colors.gray[800]}`,
                    padding: `${tokens.spacing[3]}px ${tokens.spacing[4]}px`,
                    borderRadius: `${tokens.radius.lg}px`,
                    fontFamily: tokens.typography.fontFamily.body,
                    fontSize: `clamp(${tokens.typography.fontSize.sm}px, 2.5vw, ${tokens.typography.fontSize.base}px)`,
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${tokens.spacing[2]}px`,
                    transition: `all ${tokens.animation.normal}`,
                    flex: '1 1 auto',
                    minWidth: '160px',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={18} />
                  Try Live Editor
                </button>
              </div>

              <div 
                className="animate-in stagger-4"
                style={{
                  marginTop: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: `${tokens.spacing[3]}px`,
                }}>
                {stats.map((stat) => (
                  <div key={stat.label} style={{
                    padding: `${tokens.spacing[3]}px`,
                    background: `${tokens.colors.dark.surface}80`,
                    borderRadius: `${tokens.radius.md}px`,
                    border: `1px solid ${tokens.colors.gray[900]}`,
                  }}>
                    <div style={{
                      fontFamily: tokens.typography.fontFamily.display,
                      fontSize: `clamp(${tokens.typography.fontSize.xl}px, 5vw, ${tokens.typography.fontSize['3xl']}px)`,
                      fontWeight: '800',
                      color: tokens.colors.accent.primary,
                      marginBottom: `${tokens.spacing[1]}px`,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: `clamp(${tokens.typography.fontSize.sm - 2}px, 2vw, ${tokens.typography.fontSize.sm}px)`,
                      color: tokens.colors.gray[600],
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hide orbital visualization on mobile */}
            <div className="responsive-hide-mobile" style={{
              position: 'relative',
              height: '600px',
              flex: '1 1 400px',
              maxWidth: '300px',
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

  // Work Section
  const Work = useMemo(() => {
    if (selectedCase !== null) {
      const study = CASE_STUDIES_DATA.find(s => s.id === selectedCase);
      return <CaseStudyDetail study={study} tokens={tokens} onClose={handleCaseClose} />;
    }

    return (
      <div style={{
        padding: `clamp(${tokens.spacing[8]}px, 10vw, ${tokens.spacing[16]}px) clamp(${tokens.spacing[4]}px, 5vw, ${tokens.spacing[6]}px)`,
        background: tokens.colors.dark.bg,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize['2xl']}px, 6vw, ${tokens.typography.fontSize['4xl']}px)`,
            fontWeight: '800',
            marginBottom: `${tokens.spacing[2]}px`,
          }}>
            Case Studies
          </h2>
          <p style={{
            fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
            color: tokens.colors.gray[600],
            marginBottom: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
            maxWidth: '800px',
          }}>
            Enterprise design systems for financial services, industrial IoT, and consumer platforms
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: `${tokens.spacing[4]}px`,
          }}>
            {CASE_STUDIES_DATA.map((study, idx) => (
              <div
                key={study.id}
                onClick={() => handleCaseClick(study.id)}
                className={`animate-in stagger-${idx + 1}`}
                style={{
                  background: tokens.colors.dark.elevated,
                  borderRadius: `${tokens.radius.lg}px`,
                  padding: `${tokens.spacing[4]}px`,
                  border: `1px solid ${tokens.colors.gray[900]}`,
                  cursor: 'pointer',
                  transition: `all ${tokens.animation.normal}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = tokens.colors.accent.primary;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${tokens.colors.accent.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = tokens.colors.gray[900];
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
                }} />

                {!isUnlocked && (
                  <div style={{
                    position: 'absolute',
                    top: `${tokens.spacing[3]}px`,
                    right: `${tokens.spacing[3]}px`,
                    background: `${tokens.colors.accent.secondary}20`,
                    padding: `${tokens.spacing[1]}px ${tokens.spacing[2]}px`,
                    borderRadius: `${tokens.radius.sm}px`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${tokens.spacing[1]}px`,
                  }}>
                    <Lock size={12} color={tokens.colors.accent.secondary} />
                    <span style={{
                      fontSize: `${tokens.typography.fontSize.sm - 2}px`,
                      color: tokens.colors.accent.secondary,
                      fontWeight: '600',
                    }}>
                      Locked
                    </span>
                  </div>
                )}

                <div style={{
                  fontFamily: tokens.typography.fontFamily.mono,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  color: tokens.colors.accent.primary,
                  marginBottom: `${tokens.spacing[2]}px`,
                }}>
                  {study.client}
                </div>

                <h3 style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  fontSize: `clamp(${tokens.typography.fontSize.lg}px, 3.5vw, ${tokens.typography.fontSize['2xl']}px)`,
                  fontWeight: '700',
                  marginBottom: `${tokens.spacing[3]}px`,
                }}>
                  {study.title}
                </h3>

                <div style={{
                  display: 'flex',
                  gap: `${tokens.spacing[1]}px`,
                  flexWrap: 'wrap',
                  marginBottom: `${tokens.spacing[3]}px`,
                }}>
                  {study.tags.map(tag => (
                    <span key={tag} style={{
                      padding: `${tokens.spacing[1]}px ${tokens.spacing[2]}px`,
                      background: `${tokens.colors.gray[900]}80`,
                      borderRadius: `${tokens.radius.sm}px`,
                      fontSize: `${tokens.typography.fontSize.sm - 2}px`,
                      color: tokens.colors.gray[600],
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${tokens.spacing[1]}px`,
                  color: tokens.colors.accent.primary,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  fontWeight: '600',
                }}>
                  {isUnlocked ? 'View Details' : 'Unlock to View'}
                  {isUnlocked ? <ChevronRight size={14} /> : <Lock size={14} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [tokens, selectedCase, isUnlocked, handleCaseClick, handleCaseClose]);

  // Lab Section
  const DesignLab = useMemo(() => (
    <div style={{
      padding: `clamp(${tokens.spacing[8]}px, 10vw, ${tokens.spacing[16]}px) clamp(${tokens.spacing[4]}px, 5vw, ${tokens.spacing[6]}px)`,
      background: tokens.colors.dark.surface,
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: tokens.typography.fontFamily.display,
          fontSize: `clamp(${tokens.typography.fontSize['2xl']}px, 6vw, ${tokens.typography.fontSize['4xl']}px)`,
          fontWeight: '800',
          marginBottom: `${tokens.spacing[2]}px`,
        }}>
          Design Lab
        </h2>
        <p style={{
          fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
          color: tokens.colors.gray[600],
          marginBottom: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
          maxWidth: '800px',
        }}>
          Interactive showcase of the token system. Click the floating button to edit tokens live.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
          gap: `${tokens.spacing[3]}px`,
          marginBottom: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
        }}>
          {Object.entries(tokens.colors.accent).map(([key, value]) => (
            <div
              key={key}
              className="animate-in"
              style={{
                background: tokens.colors.dark.elevated,
                borderRadius: `${tokens.radius.md}px`,
                padding: `${tokens.spacing[3]}px`,
                border: `1px solid ${tokens.colors.gray[900]}`,
              }}
            >
              <div style={{
                width: '100%',
                height: '80px',
                background: value,
                borderRadius: `${tokens.radius.sm}px`,
                marginBottom: `${tokens.spacing[2]}px`,
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
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: '600',
                wordBreak: 'break-all',
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${tokens.colors.accent.primary}20, ${tokens.colors.accent.secondary}20)`,
          borderRadius: `${tokens.radius.lg}px`,
          padding: `clamp(${tokens.spacing[4]}px, 6vw, ${tokens.spacing[8]}px)`,
          border: `1px solid ${tokens.colors.accent.primary}40`,
          textAlign: 'center',
        }}>
          <Sliders size={40} style={{ 
            color: tokens.colors.accent.primary,
            marginBottom: `${tokens.spacing[3]}px`,
          }} />
          <h3 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize.xl}px, 4vw, ${tokens.typography.fontSize['3xl']}px)`,
            fontWeight: '700',
            marginBottom: `${tokens.spacing[2]}px`,
          }}>
            Try the Live Token Editor
          </h3>
          <p style={{
            fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.lg}px)`,
            color: tokens.colors.gray[600],
          }}>
            Click the floating button to adjust colors, spacing, and border radius in real-time
          </p>
        </div>
      </div>
    </div>
  ), [tokens]);

  // About Section
  const About = useMemo(() => {
    const features = [
      {
        icon: <Code size={28} />,
        title: 'I speak both languages',
        body: 'Fluent in design thinking and engineering architecture. I know what\'s possible in code, what\'s performant, and what will break in production.',
      },
      {
        icon: <Layers size={28} />,
        title: 'Systems thinking is innate',
        body: 'When I design a component, I\'m already considering prop APIs, variant logic, and edge cases. This prevents design debt before it starts.',
      },
      {
        icon: <Zap size={28} />,
        title: 'I ship with confidence',
        body: 'From Figma to production, I move fast without sacrificing quality. 15-20% bug reduction through systematic QA and testing utilities.',
      },
    ];

    return (
      <div style={{
        padding: `clamp(${tokens.spacing[8]}px, 10vw, ${tokens.spacing[16]}px) clamp(${tokens.spacing[4]}px, 5vw, ${tokens.spacing[6]}px)`,
        background: tokens.colors.dark.bg,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: tokens.typography.fontFamily.display,
            fontSize: `clamp(${tokens.typography.fontSize['2xl']}px, 6vw, ${tokens.typography.fontSize['4xl']}px)`,
            fontWeight: '800',
            marginBottom: `${tokens.spacing[6]}px`,
          }}>
            Engineering × Design
          </h2>

          <p style={{
            fontSize: `clamp(${tokens.typography.fontSize.lg}px, 3.5vw, ${tokens.typography.fontSize['2xl']}px)`,
            color: tokens.colors.gray[600],
            lineHeight: '1.7',
            marginBottom: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
          }}>
            I bridge the gap between design vision and production reality. 
            My engineering background isn't a bonus—it's my superpower.
          </p>

          <div style={{
            display: 'grid',
            gap: `${tokens.spacing[4]}px`,
          }}>
            {features.map((item, idx) => (
              <div
                key={idx}
                className={`animate-in stagger-${idx + 1}`}
                style={{
                  background: tokens.colors.dark.elevated,
                  borderRadius: `${tokens.radius.lg}px`,
                  padding: `${tokens.spacing[4]}px`,
                  border: `1px solid ${tokens.colors.gray[900]}`,
                }}
              >
                <div style={{ color: tokens.colors.accent.primary, marginBottom: `${tokens.spacing[2]}px` }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
                  fontWeight: '700',
                  marginBottom: `${tokens.spacing[2]}px`,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: `clamp(${tokens.typography.fontSize.base}px, 2.5vw, ${tokens.typography.fontSize.lg}px)`,
                  color: tokens.colors.gray[600],
                  lineHeight: '1.7',
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: `clamp(${tokens.spacing[6]}px, 8vw, ${tokens.spacing[12]}px)`,
            textAlign: 'center',
          }}>
            <a
              href="mailto:harrison64@gmail.com"
              style={{
                display: 'inline-block',
                padding: `${tokens.spacing[3]}px ${tokens.spacing[6]}px`,
                background: `linear-gradient(135deg, ${tokens.colors.accent.primary}, ${tokens.colors.accent.secondary})`,
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: `${tokens.radius.lg}px`,
                fontWeight: '700',
                fontSize: `clamp(${tokens.typography.fontSize.base}px, 3vw, ${tokens.typography.fontSize.xl}px)`,
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
        isUnlocked={isUnlocked}
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
      {showLoginModal && (
        <LoginModal
          tokens={tokens}
          onSuccess={handleLoginSuccess}
          onClose={handleLoginClose}
        />
      )}
    </div>
  );
}