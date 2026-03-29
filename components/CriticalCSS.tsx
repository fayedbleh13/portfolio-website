export function CriticalCSS({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        /* Critical CSS - Above the fold */
        body {
          background: #050505;
          color: #ededed;
          font-family: var(--font-inter), sans-serif;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        
        .min-h-screen {
          min-height: 100vh;
        }
        
        .relative {
          position: relative;
        }
        
        .z-10 {
          z-index: 10;
        }
        
        .h-full {
          height: 100%;
        }
        
        .h-screen {
          height: 100vh;
        }
        
        .overflow-hidden {
          overflow: hidden;
        }
        
        .flex {
          display: flex;
        }
        
        .flex-col {
          flex-direction: column;
        }
        
        .justify-between {
          justify-content: space-between;
        }
        
        .items-center {
          align-items: center;
        }
        
        .text-white {
          color: white;
        }
        
        .font-space-grotesk {
          font-family: var(--font-space-grotesk), sans-serif;
        }
        
        .font-bold {
          font-weight: 700;
        }
        
        .text-4xl {
          font-size: 2.25rem;
          line-height: 2.5rem;
        }
        
        .text-6xl {
          font-size: 3.75rem;
          line-height: 1;
        }
        
        .mb-4 {
          margin-bottom: 1rem;
        }
        
        .tracking-tighter {
          letter-spacing: -0.05em;
        }
        
        .uppercase {
          text-transform: uppercase;
        }
        
        .text-gradient {
          background: linear-gradient(to right, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2rem;
            line-height: 2.25rem;
          }
          
          .text-6xl {
            font-size: 3rem;
            line-height: 1;
          }
        }
      `}</style>
      {children}
    </>
  )
}
