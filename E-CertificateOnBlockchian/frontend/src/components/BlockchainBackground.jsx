import { useEffect, useState } from "react";

export default function BlockchainBackground({ isDark = false }) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Generate floating blockchain elements
    const blockElements = [];
    for (let i = 0; i < 20; i++) {
      blockElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 25,
        delay: Math.random() * 8,
        duration: Math.random() * 15 + 20,
        rotation: Math.random() * 360,
      });
    }
    setBlocks(blockElements);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced gradient overlay for better blockchain vibe */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-purple-100/80 dark:from-gray-900/95 dark:via-blue-900/90 dark:to-purple-900/85 transition-all duration-500" />

      {/* Ethereum-style hexagonal grid */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full opacity-8 dark:opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hex-pattern"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 105 30 L 105 90 L 60 120 L 15 90 L 15 30 Z"
                fill="none"
                stroke={isDark ? "#1E40AF" : "#3B82F6"}
                strokeWidth="1"
                opacity="0.4"
              />
              <circle
                cx="60"
                cy="60"
                r="8"
                fill={isDark ? "#1E40AF" : "#3B82F6"}
                opacity="0.3"
              />
            </pattern>

            <linearGradient
              id="blockGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>

      {/* Floating Blockchain Blocks */}
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`absolute rounded-lg border-2 ${
            isDark
              ? "border-blue-400 bg-blue-900/20"
              : "border-emerald-400 bg-emerald-100/30"
          } backdrop-blur-sm`}
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            width: `${block.size}px`,
            height: `${block.size}px`,
            animationDelay: `${block.delay}s`,
            animationDuration: `${block.duration}s`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`text-xs font-mono ${
                isDark ? "text-blue-300" : "text-emerald-600"
              }`}
            >
              {Math.floor(Math.random() * 999)}
            </div>
          </div>

          {/* Connecting Lines */}
          <div
            className={`absolute top-1/2 left-full w-20 h-0.5 ${
              isDark ? "bg-blue-400/30" : "bg-emerald-400/30"
            } animate-pulse`}
            style={{
              transform: "translateY(-50%)",
              animationDelay: `${block.delay + 2}s`,
            }}
          />
        </div>
      ))}

      {/* Ethereum Symbols */}
      <div className="absolute top-10 right-10 opacity-5">
        <div className="text-9xl font-bold text-blue-500 animate-pulse">Ξ</div>
      </div>
      <div className="absolute bottom-20 left-10 opacity-5">
        <div className="text-7xl font-bold text-emerald-500 animate-pulse">
          ⟐
        </div>
      </div>

      {/* Animated Transaction Paths */}
      <div className="absolute inset-0">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? "bg-blue-400" : "bg-emerald-400"
            } animate-ping`}
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Smart Contract Code Snippets */}
      <div className="absolute top-1/4 left-5 opacity-5 font-mono text-xs">
        <div className={`${isDark ? "text-blue-300" : "text-gray-600"}`}>
          <div>pragma solidity ^0.8.0;</div>
          <div>contract Certificate {`{`}</div>
          <div>&nbsp;&nbsp;mapping(uint =&gt; string);</div>
          <div>{`}`}</div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-5 opacity-5 font-mono text-xs">
        <div className={`${isDark ? "text-blue-300" : "text-gray-600"}`}>
          <div>function mint(address to)</div>
          <div>&nbsp;&nbsp;external onlyMinter {`{`}</div>
          <div>&nbsp;&nbsp;_mint(to, tokenId);</div>
          <div>{`}`}</div>
        </div>
      </div>
    </div>
  );
}
