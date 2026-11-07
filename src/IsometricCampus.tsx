export function IsometricCampus() {
  return (
    <div className="iso-campus iso-campus-premium">
      <svg
        className="iso-scene"
        viewBox="0 0 700 560"
        role="img"
        aria-label="CampusCode 3D isometric campus showing learning, mentorship, innovation and opportunities"
      >
        <defs>
          <filter id="campusShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>

          <filter id="glowPurple">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="platformTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9e5ff" />
          </linearGradient>

          <linearGradient id="purpleTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c5baff" />
            <stop offset="100%" stopColor="#8068ff" />
          </linearGradient>
        </defs>

        {/* BACKGROUND GLOW */}

        <ellipse
          cx="350"
          cy="320"
          rx="265"
          ry="170"
          fill="#a18cff"
          opacity=".10"
          filter="url(#campusShadow)"
        />

        {/* ORBIT PATHS */}

        <g fill="none" stroke="#a18cff" opacity=".55">
          <ellipse
            cx="350"
            cy="280"
            rx="290"
            ry="180"
            transform="rotate(-12 350 280)"
            strokeWidth="1.5"
          />

          <ellipse
            cx="350"
            cy="280"
            rx="245"
            ry="145"
            transform="rotate(15 350 280)"
            strokeWidth="1"
            opacity=".5"
          />
        </g>

        {/* ORBIT PARTICLES */}

        <g filter="url(#glowPurple)">
          <circle r="5" fill="#8065ff">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M75 280 C100 80 580 40 625 250 C660 430 150 520 75 280"
            />
          </circle>

          <circle r="4" fill="#a8e62e">
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              path="M110 420 C200 50 530 80 600 310 C650 470 180 520 110 420"
            />
          </circle>
        </g>

        {/* PLATFORM SHADOW */}

        <path
          d="M350 105 L625 260 L350 415 L75 260 Z"
          fill="#7665ff"
          opacity=".10"
          transform="translate(0 22)"
          filter="url(#campusShadow)"
        />

        {/* PLATFORM BASE */}

        <path
          d="M350 110 L625 265 L350 420 L75 265 Z"
          fill="#d7d0ff"
          stroke="#c8beff"
          strokeWidth="1"
        />

        <path d="M75 265 L350 420 L350 455 L75 300 Z" fill="#b9adff" />

        <path d="M350 420 L625 265 L625 300 L350 455 Z" fill="#a294ff" />

        {/* PLATFORM TOP */}

        <path
          d="M350 75 L625 230 L350 385 L75 230 Z"
          fill="url(#platformTop)"
          stroke="#d9d2ff"
          strokeWidth="2"
        />

        {/* INNER CAMPUS PATHWAYS */}

        <path
          d="M350 105 L350 350 M125 230 L575 230"
          stroke="#ffffff"
          strokeWidth="17"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M350 105 L350 350 M125 230 L575 230"
          stroke="#a99bff"
          strokeWidth="1.5"
          strokeDasharray="5 8"
          fill="none"
        />

        {/* CENTRAL CONNECTION LINES */}

        <g stroke="#a18cff" strokeWidth="2" strokeDasharray="7 8" opacity=".7">
          <path d="M350 180 L350 230" />
          <path d="M250 255 L310 255" />
          <path d="M390 255 L450 255" />
          <path d="M350 300 L350 340" />
        </g>

        {/* LEARNING BUILDING */}

        <g className="iso-building iso-discover">
          <path d="M280 125 L350 85 L420 125 L350 165 Z" fill="#d9d0ff" />
          <path d="M280 125 L350 165 L350 235 L280 195 Z" fill="#9079ff" />
          <path d="M350 165 L420 125 L420 195 L350 235 Z" fill="#6048df" />
          <path d="M310 125 L350 103 L390 125 L350 148 Z" fill="#ffffff" />
          <path d="M330 125 L350 113 L370 125 L350 137 Z" fill="#a8e62e" />
        </g>

        {/* MENTORSHIP BUILDING */}

        <g className="iso-building iso-team">
          <path d="M95 270 L165 230 L235 270 L165 310 Z" fill="#d1f1c3" />
          <path d="M95 270 L165 310 L165 380 L95 340 Z" fill="#85ca6d" />
          <path d="M165 310 L235 270 L235 340 L165 380 Z" fill="#58aa47" />
          <path d="M125 270 L165 247 L205 270 L165 293 Z" fill="#ffffff" />
          <path d="M145 270 L165 258 L185 270 L165 282 Z" fill="#a8e62e" />
        </g>

        {/* INNOVATION BUILDING */}

        <g className="iso-building iso-build">
          <path d="M465 270 L535 230 L605 270 L535 310 Z" fill="#d0e2ff" />
          <path d="M465 270 L535 310 L535 380 L465 340 Z" fill="#83aef0" />
          <path d="M535 310 L605 270 L605 340 L535 380 Z" fill="#5487d9" />
          <path d="M495 270 L535 247 L575 270 L535 293 Z" fill="#ffffff" />
          <path d="M515 270 L535 258 L555 270 L535 282 Z" fill="#7665ff" />
        </g>

        {/* OPPORTUNITIES BUILDING */}

        <g className="iso-building iso-compete">
          <path d="M280 355 L350 315 L420 355 L350 395 Z" fill="#ffe5bd" />
          <path d="M280 355 L350 395 L350 465 L280 425 Z" fill="#f1ae60" />
          <path d="M350 395 L420 355 L420 425 L350 465 Z" fill="#d98c35" />
          <path d="M310 355 L350 332 L390 355 L350 378 Z" fill="#ffffff" />
          <path d="M330 355 L350 343 L370 355 L350 367 Z" fill="#a8e62e" />
        </g>

        {/* CENTRAL CC HUB */}

        <g className="iso-marker">
          <rect
            x="290"
            y="250"
            width="120"
            height="65"
            rx="12"
            fill="#ffffff"
            stroke="#8065ff"
            strokeWidth="2"
          />

          <text
            x="350"
            y="293"
            textAnchor="middle"
            fill="#7655ff"
            fontSize="34"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
          >
            CC
          </text>
        </g>

        {/* TREES */}

        <g className="iso-tree">
          <path d="M220 185 L220 225" stroke="#8c7651" strokeWidth="6" />
          <circle cx="220" cy="174" r="17" fill="#a8e62e" />
          <circle cx="208" cy="183" r="12" fill="#8bd03c" />
        </g>

        <g className="iso-tree">
          <path d="M480 185 L480 225" stroke="#8c7651" strokeWidth="6" />
          <circle cx="480" cy="174" r="17" fill="#a8e62e" />
          <circle cx="492" cy="183" r="12" fill="#8bd03c" />
        </g>

        <g className="iso-tree">
          <path d="M260 330 L260 355" stroke="#8c7651" strokeWidth="5" />
          <circle cx="260" cy="322" r="13" fill="#a8e62e" />
        </g>

        <g className="iso-tree">
          <path d="M440 330 L440 355" stroke="#8c7651" strokeWidth="5" />
          <circle cx="440" cy="322" r="13" fill="#a8e62e" />
        </g>

        {/* FLOATING LABELS */}

        <g className="iso-floating-label">
          <rect
            x="282"
            y="45"
            width="136"
            height="37"
            rx="13"
            fill="#f5f1ff"
            stroke="#a18cff"
            strokeWidth="1.5"
          />
          <text x="350" y="69" textAnchor="middle" fill="#694ce5" fontSize="14" fontWeight="800">
            LEARNING
          </text>
        </g>

        <g className="iso-floating-label">
          <rect
            x="45"
            y="242"
            width="170"
            height="38"
            rx="13"
            fill="#ffffff"
            stroke="#8de34d"
            strokeWidth="1.5"
          />
          <text x="130" y="266" textAnchor="middle" fill="#4c9d2d" fontSize="13" fontWeight="800">
            MENTORSHIP
          </text>
        </g>

        <g className="iso-floating-label">
          <rect
            x="485"
            y="242"
            width="170"
            height="38"
            rx="13"
            fill="#ffffff"
            stroke="#8bb9ff"
            strokeWidth="1.5"
          />
          <text x="570" y="266" textAnchor="middle" fill="#3476d4" fontSize="13" fontWeight="800">
            INNOVATION
          </text>
        </g>

        <g className="iso-floating-label">
          <rect
            x="262"
            y="475"
            width="176"
            height="38"
            rx="13"
            fill="#fff6e9"
            stroke="#f5a623"
            strokeWidth="1.5"
          />
          <text x="350" y="499" textAnchor="middle" fill="#b56b14" fontSize="13" fontWeight="800">
            OPPORTUNITIES
          </text>
        </g>

        {/* EXTRA GLOWING PARTICLES */}

        <g filter="url(#glowPurple)">
          <circle cx="80" cy="165" r="5" fill="#8065ff" />
          <circle cx="610" cy="160" r="5" fill="#8065ff" />
          <circle cx="120" cy="440" r="5" fill="#a8e62e" />
          <circle cx="580" cy="440" r="5" fill="#8065ff" />
        </g>
      </svg>

      <div className="iso-caption">
        <span>—</span>
        A PLACE TO CONNECT & CREATE
        <span>—</span>
      </div>

      <p className="iso-subcaption">A CONNECTED ECOSYSTEM</p>
    </div>
  );
}
