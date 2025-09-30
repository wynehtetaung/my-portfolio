// Animation constants
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  MEDIUM: 0.6,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const;

export const ANIMATION_DELAYS = {
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.4,
  VERY_LONG: 0.5,
} as const;

export const ANIMATION_STAGGER = {
  CHILDREN: 0.1,
  FAST: 0.05,
  SLOW: 0.2,
} as const;

// Skill proficiency levels
export const SKILL_LEVELS = {
  EXPERT: 95,
  ADVANCED: 90,
  PROFICIENT: 85,
  INTERMEDIATE: 80,
  BASIC: 75,
  BEGINNER: 70,
} as const;

// Layout constants
export const GRID_BREAKPOINTS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
  LARGE: 4,
} as const;

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: 0,
  BASE: 1,
  ELEVATED: 10,
  HEADER: 40,
  MODAL: 50,
  DROPDOWN: 60,
  TOOLTIP: 100,
} as const;

// Progress bar dimensions
export const PROGRESS_BAR = {
  HEIGHT: 2,
  BORDER_RADIUS: "full",
} as const;

// Experience stats
export const EXPERIENCE_STATS = {
  YEARS_EXPERIENCE: 5,
  PROJECTS_COMPLETED: 50,
  TECHNOLOGIES_USED: 30,
  LEARNING_MODE: "24/7",
} as const;

// Section spacing
export const SECTION_SPACING = {
  PADDING_Y: "py-16 sm:py-20",
  MARGIN_BOTTOM: "mb-12 sm:mb-16",
  CONTAINER: "container mx-auto px-4 sm:px-6",
  MIN_HEIGHT: "min-h-screen",
} as const;

// Typography
export const TEXT_SIZES = {
  HEADING_MAIN: "text-3xl sm:text-4xl lg:text-5xl",
  HEADING_SECONDARY: "text-2xl sm:text-3xl",
  BODY_LARGE: "text-lg sm:text-xl",
  BODY_BASE: "text-sm sm:text-base",
  BODY_SMALL: "text-xs sm:text-sm",
} as const;

// Colors
export const COLORS = {
  PRIMARY: "cyan-400",
  SECONDARY: "purple-500",
  SUCCESS: "green-400",
  WARNING: "orange-400",
  TEXT_PRIMARY: "white",
  TEXT_SECONDARY: "slate-300",
  TEXT_MUTED: "slate-400",
} as const;

// Form validation
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_NAME_LENGTH: 2,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

// File paths
export const ASSET_PATHS = {
  CV_PDF: "/cv-resume.pdf",
  CV_FILENAME: "Wyne-Htet-CV.pdf",
} as const;

export default {
  ANIMATION_DURATIONS,
  ANIMATION_DELAYS,
  ANIMATION_STAGGER,
  SKILL_LEVELS,
  GRID_BREAKPOINTS,
  Z_INDEX,
  PROGRESS_BAR,
  EXPERIENCE_STATS,
  SECTION_SPACING,
  TEXT_SIZES,
  COLORS,
  VALIDATION_RULES,
  ASSET_PATHS,
};
