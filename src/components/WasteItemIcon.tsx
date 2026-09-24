import React from 'react';

interface WasteItemIconProps {
  iconType: string;
  className?: string;
  size?: number;
}

export const WasteItemIcon: React.FC<WasteItemIconProps> = ({ iconType, className = '', size = 48 }) => {
  switch (iconType) {
    case 'banana':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <path d="M12 48C20 54 44 52 54 28C56 22 54 14 50 10C48 8 46 10 44 14C38 28 24 38 12 40C8 40.5 8 45 12 48Z" fill="url(#bananaGrad)" stroke="#854d0e" strokeWidth="2" strokeLinejoin="round" />
          {/* Peels */}
          <path d="M12 40C20 34 26 26 24 16C22 18 20 28 10 32C8 33 8 38 12 40Z" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
          <path d="M52 12L56 8C57 7 59 8 58 10L54 16" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
          {/* Brown spots */}
          <circle cx="28" cy="42" r="1.5" fill="#713f12" />
          <circle cx="38" cy="36" r="1.8" fill="#713f12" />
          <circle cx="44" cy="26" r="1.5" fill="#713f12" />
          <circle cx="18" cy="44" r="1.2" fill="#713f12" />
        </svg>
      );

    case 'apple':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          {/* Apple Core */}
          <path d="M32 14C38 14 44 18 42 24C38 28 36 34 38 40C42 46 38 52 32 52C26 52 22 46 26 40C28 34 26 28 22 24C20 18 26 14 32 14Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
          {/* Top/Bottom remaining peel */}
          <path d="M22 24C20 18 26 14 32 14C38 14 44 18 42 24C38 21 26 21 22 24Z" fill="url(#appleGrad)" stroke="#991b1b" strokeWidth="1.5" />
          <path d="M26 40C22 46 26 52 32 52C38 52 42 46 38 40C35 44 29 44 26 40Z" fill="url(#appleGrad)" stroke="#991b1b" strokeWidth="1.5" />
          {/* Apple Stem and Leaf */}
          <path d="M32 14C32 9 35 6 38 5" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 7C42 5 44 10 40 12C36 12 36 8 36 7Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
          {/* Seeds */}
          <ellipse cx="29" cy="31" rx="2" ry="3.5" transform="rotate(-15 29 31)" fill="#451a03" />
          <ellipse cx="35" cy="31" rx="2" ry="3.5" transform="rotate(15 35 31)" fill="#451a03" />
        </svg>
      );

    case 'leaf':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="60%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#4d7c0f" />
            </linearGradient>
          </defs>
          <path d="M14 50C14 50 18 24 44 14C52 11 54 18 50 26C40 46 22 50 14 50Z" fill="url(#leafGrad)" stroke="#365314" strokeWidth="2" />
          <path d="M14 50L46 16" stroke="#365314" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 39L32 42" stroke="#365314" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M31 32L40 33" stroke="#365314" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 25L46 24" stroke="#365314" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 35L22 30" stroke="#365314" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 28L30 22" stroke="#365314" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 50L8 56" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'egg':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>
          {/* Cracked egg shell bottom */}
          <path d="M12 36C12 48 21 56 32 56C43 56 52 48 52 36L44 32L38 38L32 30L26 38L18 32L12 36Z" fill="url(#eggGrad)" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
          {/* Inner shell edge */}
          <path d="M16 34L22 38L28 32L34 38L40 32L48 35" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cracked egg shell top floating slightly */}
          <path d="M18 24C20 14 26 8 32 8C38 8 44 14 46 24L40 22L34 26L30 20L24 26L18 24Z" fill="url(#eggGrad)" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );

    case 'napkin':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Crinkled paper napkin with coffee/food stain */}
          <path d="M14 18C18 14 28 16 34 14C44 12 50 18 48 26C52 32 50 42 46 48C40 52 30 50 22 52C16 50 12 44 14 36C10 30 12 22 14 18Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 22C28 26 36 24 40 28" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 36C26 34 34 40 42 38" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          {/* Organic coffee/food tint */}
          <circle cx="34" cy="34" r="8" fill="#d97706" fillOpacity="0.3" filter="blur(1px)" />
          <circle cx="28" cy="28" r="4" fill="#92400e" fillOpacity="0.2" filter="blur(1px)" />
        </svg>
      );

    case 'bread':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="breadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Bread crust */}
          <path d="M14 24C14 16 22 12 32 12C42 12 50 16 50 24C52 38 48 50 44 52C36 54 28 54 20 52C16 50 12 38 14 24Z" fill="url(#breadGrad)" stroke="#78350f" strokeWidth="2" />
          {/* Bread crumb inside */}
          <path d="M18 26C18 20 24 17 32 17C40 17 46 20 46 26C47 36 44 46 41 48C35 49 29 49 23 48C20 46 17 36 18 26Z" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
          {/* Scores and holes */}
          <ellipse cx="28" cy="28" rx="2" ry="1" fill="#d97706" />
          <ellipse cx="36" cy="32" rx="3" ry="1.5" fill="#d97706" />
          <ellipse cx="26" cy="38" rx="2" ry="1" fill="#d97706" />
          <ellipse cx="34" cy="42" rx="2.5" ry="1.2" fill="#d97706" />
        </svg>
      );

    case 'corn':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Corn Cob */}
          <rect x="22" y="16" width="20" height="34" rx="10" fill="#facc15" stroke="#a16207" strokeWidth="2" />
          {/* Corn Kernel Grid */}
          <line x1="22" y1="24" x2="42" y2="24" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="22" y1="32" x2="42" y2="32" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="22" y1="40" x2="42" y2="40" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="28" y1="16" x2="28" y2="48" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="36" y1="16" x2="36" y2="48" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Husk leaves */}
          <path d="M22 46C18 36 16 26 12 20C12 28 14 42 24 52L22 46Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.5" />
          <path d="M42 46C46 36 48 26 52 20C52 28 50 42 40 52L42 46Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.5" />
          <path d="M30 50L30 56" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'tea':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Tea Bag */}
          <path d="M24 20L40 20L46 50L18 50L24 20Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round" />
          <path d="M24 20L32 14L40 20" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round" />
          {/* Tea content transparency */}
          <rect x="22" y="28" width="20" height="18" rx="2" fill="#059669" fillOpacity="0.4" />
          {/* String & Tag */}
          <path d="M32 14C32 8 26 6 22 8C18 10 16 16 14 22" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10" y="22" width="10" height="8" rx="1.5" fill="#10b981" stroke="#047857" strokeWidth="1" />
          <circle cx="15" cy="26" r="1" fill="#ffffff" />
        </svg>
      );

    // RECYCLABLE ICONS
    case 'pet':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Bottle Cap */}
          <rect x="28" y="6" width="8" height="6" rx="1.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
          {/* Neck */}
          <rect x="29" y="12" width="6" height="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
          {/* Bottle Body */}
          <path d="M26 16C23 18 20 22 20 28L20 50C20 54 24 56 32 56C40 56 44 54 44 50L44 28C44 22 41 18 38 16L26 16Z" fill="url(#petGrad)" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round" />
          {/* Label band with SESI recycle symbol */}
          <rect x="20" y="30" width="24" height="12" fill="#10b981" stroke="#059669" strokeWidth="1" />
          <text x="32" y="38.5" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif">PET ♻️</text>
          {/* Highlight reflections */}
          <path d="M23 26L23 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="22" y1="46" x2="42" y2="46" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case 'can':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="25%" stopColor="#e2e8f0" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="canColor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          {/* Can Cylinder */}
          <rect x="20" y="14" width="24" height="38" rx="4" fill="url(#canGrad)" stroke="#475569" strokeWidth="2" />
          {/* Center brand band */}
          <rect x="20" y="20" width="24" height="26" fill="url(#canColor)" stroke="#991b1b" strokeWidth="1" />
          <text x="32" y="34" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif">ALU</text>
          <text x="32" y="42" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#fef08a" fontFamily="sans-serif">100% ♻️</text>
          {/* Can Top Rim & Tab */}
          <ellipse cx="32" cy="14" rx="12" ry="4" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
          <ellipse cx="32" cy="14" rx="4" ry="2" fill="#64748b" />
          {/* Can Bottom Rim */}
          <ellipse cx="32" cy="52" rx="12" ry="4" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        </svg>
      );

    case 'cardboard':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="boxTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="boxFront" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="boxSide" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          {/* Isometric Box */}
          {/* Top Flaps */}
          <path d="M32 10L52 20L32 30L12 20L32 10Z" fill="url(#boxTop)" stroke="#78350f" strokeWidth="1.5" />
          {/* Left / Front face */}
          <path d="M12 20L32 30L32 52L12 42L12 20Z" fill="url(#boxFront)" stroke="#78350f" strokeWidth="1.5" />
          {/* Right face */}
          <path d="M32 30L52 20L52 42L32 52L32 30Z" fill="url(#boxSide)" stroke="#78350f" strokeWidth="1.5" />
          {/* Tape stripe */}
          <path d="M30 11L34 13L34 52L30 50Z" fill="#ca8a04" opacity="0.8" />
          {/* Recycle logo on box */}
          <circle cx="22" cy="35" r="4.5" fill="#ffffff" fillOpacity="0.2" />
          <text x="22" y="37" fontSize="6" textAnchor="middle" fill="#ffffff" fontWeight="bold">♻️</text>
        </svg>
      );

    case 'glass':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          {/* Cork / Cap */}
          <rect x="28" y="8" width="8" height="5" rx="1" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          {/* Neck */}
          <path d="M28 13L28 20C28 22 25 25 22 28L22 50C22 54 26 56 32 56C38 56 42 54 42 50L42 28C39 25 36 22 36 20L36 13Z" fill="url(#glassGrad)" stroke="#047857" strokeWidth="2" strokeLinejoin="round" />
          {/* Light Reflection */}
          <path d="M25 30L25 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
          {/* Glass eco symbol */}
          <circle cx="32" cy="38" r="5" fill="#ffffff" fillOpacity="0.3" />
          <text x="32" y="40.5" fontSize="7" textAnchor="middle" fill="#ffffff" fontWeight="bold">♺</text>
        </svg>
      );

    case 'tetrapak':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Tetra pak carton */}
          <path d="M22 14L42 14L46 22L46 54L18 54L18 22L22 14Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" strokeLinejoin="round" />
          {/* Top peak */}
          <path d="M22 14L32 10L42 14" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
          {/* Screw cap */}
          <circle cx="32" cy="18" r="3.5" fill="#facc15" stroke="#a16207" strokeWidth="1" />
          {/* Front design */}
          <rect x="22" y="26" width="20" height="22" rx="2" fill="#ffffff" />
          <text x="32" y="35" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#0284c7" fontFamily="sans-serif">LEITE</text>
          <text x="32" y="43" fontSize="8" textAnchor="middle" fill="#10b981">♻️</text>
        </svg>
      );

    case 'cup':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Cup Body */}
          <path d="M18 16L24 52C24 54 28 56 32 56C36 56 40 54 40 52L46 16Z" fill="url(#cupGrad)" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
          {/* Cup Rim */}
          <ellipse cx="32" cy="16" rx="14" ry="3.5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          {/* Plastic ridges */}
          <line x1="21" y1="28" x2="43" y2="28" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="22" y1="36" x2="42" y2="36" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="23" y1="44" x2="41" y2="44" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Shiny reflection */}
          <path d="M23 20L25 48" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        </svg>
      );

    case 'paper':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Newspaper / Paper Sheet */}
          <rect x="16" y="12" width="32" height="42" rx="2" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          {/* Headline block */}
          <rect x="20" y="16" width="24" height="6" fill="#1e293b" rx="1" />
          <text x="32" y="21" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif">SESI NOTÍCIAS</text>
          {/* Text lines */}
          <line x1="20" y1="26" x2="44" y2="26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="31" x2="44" y2="31" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="36" x2="36" y2="36" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          {/* Image box & recycling stamp */}
          <rect x="20" y="41" width="12" height="9" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <text x="26" y="48" fontSize="6" textAnchor="middle" fill="#10b981">♻️</text>
          <line x1="36" y1="43" x2="44" y2="43" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="47" x2="44" y2="47" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'cap':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          {/* Bottle cap outer rim */}
          <circle cx="32" cy="32" r="20" fill="url(#capGrad)" stroke="#9f1239" strokeWidth="2" />
          {/* Ridge teeth */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 32 + 18 * Math.cos(angle);
            const y1 = 32 + 18 * Math.sin(angle);
            const x2 = 32 + 22 * Math.cos(angle);
            const y2 = 32 + 22 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9f1239" strokeWidth="2" strokeLinecap="round" />;
          })}
          {/* Inner ring */}
          <circle cx="32" cy="32" r="14" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="10" fill="#fda4af" fillOpacity="0.4" />
          <text x="32" y="35" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#ffffff">2</text>
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="22" fill="#10b981" />
          <text x="32" y="38" fontSize="18" textAnchor="middle" fill="#ffffff">♻️</text>
        </svg>
      );
  }
};
