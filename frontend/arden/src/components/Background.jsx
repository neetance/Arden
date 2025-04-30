// import React, { useEffect, useRef } from "react";

// const Background = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let planetRadius, planetX, planetY;
//     let ringParticles = [];

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       planetRadius = Math.min(canvas.width, canvas.height) * 0.5;
//       planetX = -planetRadius * 0.5;
//       planetY = canvas.height * 0.5;
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     function createRings() {
//       ringParticles = [];

//       const ringBands = [
//         {
//           innerRadius: 1.05,
//           outerRadius: 1.15,
//           density: 500,
//           color: "rgba(100, 100, 130, 0.8)",
//         },
//         {
//           innerRadius: 1.18,
//           outerRadius: 1.3,
//           density: 1500,
//           color: "rgba(180, 170, 190, 0.7)",
//         },
//         {
//           innerRadius: 1.34,
//           outerRadius: 1.7,
//           density: 4000,
//           color: "rgba(230, 230, 230, 0.85)",
//         },
//         {
//           innerRadius: 1.74,
//           outerRadius: 1.8,
//           density: 600,
//           color: "rgba(100, 80, 80, 0.6)",
//         },
//         {
//           innerRadius: 1.85,
//           outerRadius: 2.2,
//           density: 3000,
//           color: "rgba(210, 210, 190, 0.75)",
//         },
//         {
//           innerRadius: 2.24,
//           outerRadius: 2.26,
//           density: 300,
//           color: "rgba(70, 70, 90, 0.6)",
//         },
//         {
//           innerRadius: 2.3,
//           outerRadius: 2.6,
//           density: 2500,
//           color: "rgba(190, 200, 190, 0.65)",
//         },
//         {
//           innerRadius: 2.75,
//           outerRadius: 3.0,
//           density: 1600,
//           color: "rgba(220, 210, 220, 0.5)",
//         },
//       ];

//       ringBands.forEach((band) => {
//         const particleCount = band.density;
//         const innerRadius = planetRadius * band.innerRadius;
//         const outerRadius = planetRadius * band.outerRadius;

//         for (let i = 0; i < particleCount; i++) {
//           const distance =
//             innerRadius + Math.random() * (outerRadius - innerRadius);
//           const angle = Math.random() * Math.PI * 2;
//           const size = 0.5 + Math.random() * 1.0;
//           const speedBase = 0.0003;
//           const speedBoost =
//             1 - ((distance - innerRadius) / (outerRadius - innerRadius)) * 0.5;
//           const speed = speedBase * speedBoost;

//           ringParticles.push({
//             distance,
//             angle,
//             size,
//             speed,
//             opacity: 0.6 + Math.random() * 0.4,
//             color: band.color,
//             bandIndex: ringBands.indexOf(band),
//           });
//         }
//       });
//     }

//     function drawAccretionDiskGlow() {
//       // Create an accretion disk effect using a radial gradient around the planet
//       const gradient = ctx.createRadialGradient(
//         planetX,
//         planetY,
//         planetRadius * 1.1, // Inner radius of the disk
//         planetX,
//         planetY,
//         planetRadius * 2.5 // Outer radius of the disk
//       );

//       // Define multiple color stops for the gradient to create the glow effect
//       gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)"); // Start with a faint white glow
//       gradient.addColorStop(0.4, "rgba(255, 100, 100, 0.5)"); // A reddish glow
//       gradient.addColorStop(0.6, "rgba(255, 180, 100, 0.7)"); // A yellowish glow
//       gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)"); // Faint white glow at the edge

//       ctx.beginPath();
//       ctx.arc(planetX, planetY, planetRadius * 2.5, 0, Math.PI * 2);
//       ctx.fillStyle = gradient;
//       ctx.fill();
//     }

//     function drawParticles(behindPlanet = true) {
//       ringParticles.forEach((particle) => {
//         particle.angle += particle.speed;

//         const x = planetX + Math.cos(particle.angle) * particle.distance;
//         const y = planetY + Math.sin(particle.angle) * particle.distance * 0.15;

//         const isBehind = particle.angle > Math.PI;
//         if (isBehind !== behindPlanet) return;

//         if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
//           ctx.beginPath();
//           ctx.arc(x, y, particle.size, 0, Math.PI * 2);
//           ctx.fillStyle = particle.color;
//           ctx.fill();
//         }
//       });
//     }

//     function animate() {
//       requestAnimationFrame(animate);

//       ctx.fillStyle = "rgba(0, 0, 0, 1)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw stars with original settings
//       const starCount = 200;
//       for (let i = 0; i < starCount; i++) {
//         const x = Math.random() * canvas.width;
//         const y = Math.random() * canvas.height;
//         const size = Math.random() * 1.0;
//         const opacity = Math.random() * 0.7;

//         ctx.beginPath();
//         ctx.arc(x, y, size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
//         ctx.fill();
//       }

//       // Draw the accretion disk glow around the planet
//       //   drawAccretionDiskGlow();

//       drawParticles(true);

//       const gradient = ctx.createRadialGradient(
//         planetX,
//         planetY - planetRadius * 0.1,
//         0,
//         planetX,
//         planetY,
//         planetRadius
//       );
//       gradient.addColorStop(0, "rgb(37, 37, 37)");
//       gradient.addColorStop(0.6, "rgb(49, 49, 49)");
//       gradient.addColorStop(1, "rgb(0, 0, 0)");

//       ctx.beginPath();
//       ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
//       ctx.fillStyle = gradient;
//       ctx.shadowColor = "rgba(255, 240, 200, 0.3)";
//       ctx.shadowBlur = 60;
//       ctx.fill();
//       ctx.shadowBlur = 0;

//       ctx.beginPath();
//       ctx.arc(
//         planetX,
//         planetY - planetRadius * 0.4,
//         planetRadius * 0.7,
//         Math.PI * 1.3,
//         Math.PI * 1.7,
//         false
//       );
//       ctx.strokeStyle = "rgba(255, 250, 230, 0.5)";
//       ctx.lineWidth = planetRadius * 0.15;
//       ctx.stroke();

//       drawParticles(false);
//     }

//     createRings();
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: -1,
//         opacity: 1,
//         pointerEvents: "none",
//         background: "rgb(0, 0, 0)",
//       }}
//     />
//   );
// };

// export default Background;
import React, { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let planetRadius, planetX, planetY;
    let ringParticles = [];
    let debrisParticles = [];
    let streakParticles = []; // New array for fast-moving particles
    let wormholeX, wormholeY, wormholeRadius;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      planetRadius = Math.min(canvas.width, canvas.height) * 0.5;
      planetX = -planetRadius * 0.5;
      planetY = canvas.height * 0.5;

      // Position wormhole in the top right quadrant
      wormholeX = canvas.width * 0.75;
      wormholeY = canvas.height * 0.25;
      wormholeRadius = planetRadius * 0.4;

      // Recreate particles after resize
      createRings();
      createDebrisField();
      createStreakParticles();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    function createRings() {
      ringParticles = [];

      const ringBands = [
        {
          innerRadius: 1.05,
          outerRadius: 1.15,
          density: 500,
          color: "rgba(100, 100, 130, 0.8)",
          shimmerSpeed: 0.003,
          shimmerIntensity: 0.2,
        },
        {
          innerRadius: 1.18,
          outerRadius: 1.3,
          density: 1500,
          color: "rgba(180, 170, 190, 0.7)",
          shimmerSpeed: 0.005,
          shimmerIntensity: 0.15,
        },
        {
          innerRadius: 1.34,
          outerRadius: 1.7,
          density: 4000,
          color: "rgba(230, 230, 230, 0.85)",
          shimmerSpeed: 0.004,
          shimmerIntensity: 0.18,
        },
        {
          innerRadius: 1.74,
          outerRadius: 1.8,
          density: 600,
          color: "rgba(100, 80, 80, 0.6)",
          shimmerSpeed: 0.006,
          shimmerIntensity: 0.25,
        },
        {
          innerRadius: 1.85,
          outerRadius: 2.2,
          density: 3000,
          color: "rgba(210, 210, 190, 0.75)",
          shimmerSpeed: 0.003,
          shimmerIntensity: 0.2,
        },
        {
          innerRadius: 2.24,
          outerRadius: 2.26,
          density: 300,
          color: "rgba(70, 70, 90, 0.6)",
          shimmerSpeed: 0.007,
          shimmerIntensity: 0.3,
        },
        {
          innerRadius: 2.3,
          outerRadius: 2.6,
          density: 2500,
          color: "rgba(190, 200, 190, 0.65)",
          shimmerSpeed: 0.004,
          shimmerIntensity: 0.22,
        },
        {
          innerRadius: 2.75,
          outerRadius: 3.0,
          density: 1600,
          color: "rgba(220, 210, 220, 0.5)",
          shimmerSpeed: 0.005,
          shimmerIntensity: 0.18,
        },
      ];

      ringBands.forEach((band) => {
        const particleCount = band.density;
        const innerRadius = planetRadius * band.innerRadius;
        const outerRadius = planetRadius * band.outerRadius;

        for (let i = 0; i < particleCount; i++) {
          const distance =
            innerRadius + Math.random() * (outerRadius - innerRadius);
          const angle = Math.random() * Math.PI * 2;
          const size = 0.5 + Math.random() * 1.0;
          const speedBase = 0.0003;
          const speedBoost =
            1 - ((distance - innerRadius) / (outerRadius - innerRadius)) * 0.5;
          const speed = speedBase * speedBoost;

          // Add phase offset for shimmer effect
          const phaseOffset = Math.random() * Math.PI * 2;

          ringParticles.push({
            distance,
            angle,
            size,
            speed,
            baseOpacity: 0.6 + Math.random() * 0.4,
            opacity: 0.6 + Math.random() * 0.4,
            color: band.color,
            bandIndex: ringBands.indexOf(band),
            shimmerSpeed: band.shimmerSpeed,
            shimmerIntensity: band.shimmerIntensity,
            phaseOffset,
          });
        }
      });
    }

    function createDebrisField() {
      debrisParticles = [];
      const debrisCount = 300;

      // Create debris field beyond the rings
      for (let i = 0; i < debrisCount; i++) {
        const distance = planetRadius * (3.2 + Math.random() * 3);
        const angle = Math.random() * Math.PI * 2;
        const size = 0.5 + Math.random() * 2.5;

        // Randomize the speeds more than ring particles
        const speed = 0.0001 + Math.random() * 0.0004;

        // Some debris rotate clockwise, some counter-clockwise
        const rotationDirection = Math.random() > 0.3 ? 1 : -1;

        debrisParticles.push({
          distance,
          angle,
          size,
          speed: speed * rotationDirection,
          opacity: 0.4 + Math.random() * 0.6,
          color: `rgba(${150 + Math.random() * 105}, ${
            150 + Math.random() * 105
          }, ${150 + Math.random() * 105}, ${0.3 + Math.random() * 0.7})`,
        });
      }
    }

    function createStreakParticles() {
      streakParticles = [];
      const streakCount = 50; // Number of streak particles

      for (let i = 0; i < streakCount; i++) {
        createNewStreak();
      }
    }

    function createNewStreak() {
      // Randomize starting position on the left side of the canvas
      const x = -20; // Start just off-screen
      const y = Math.random() * canvas.height;

      // Randomize speed (fast)
      const speed = 5 + Math.random() * 12;

      // Randomize length of the streak
      const length = 5 + Math.random() * 30;

      // Randomize color with blue/white tint and varying opacity
      const brightness = 180 + Math.random() * 75;
      const color = `rgba(${brightness * 0.8}, ${
        brightness * 0.9
      }, ${brightness}, ${0.3 + Math.random() * 0.7})`;

      streakParticles.push({
        x,
        y,
        speed,
        length,
        color,
        width: 0.5 + Math.random() * 1.5,
      });
    }

    function drawParticles(behindPlanet = true) {
      // Update shimmer effect for ring particles
      const currentTime = time;

      ringParticles.forEach((particle) => {
        particle.angle += particle.speed;

        // Calculate shimmer effect based on time and position
        const shimmerValue =
          Math.sin(currentTime * particle.shimmerSpeed + particle.phaseOffset) *
          particle.shimmerIntensity;

        // Apply shimmer to opacity
        particle.opacity = Math.max(
          0.1,
          Math.min(1.0, particle.baseOpacity + shimmerValue)
        );

        const x = planetX + Math.cos(particle.angle) * particle.distance;
        const y = planetY + Math.sin(particle.angle) * particle.distance * 0.15;

        const isBehind = particle.angle > Math.PI;
        if (isBehind !== behindPlanet) return;

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          // Apply wormhole distortion to particles
          const [distortedX, distortedY] = applyWormholeDistortion(x, y);

          ctx.beginPath();
          ctx.arc(distortedX, distortedY, particle.size, 0, Math.PI * 2);

          // Parse the original color to modify it for shimmer
          const originalColor = particle.color;
          const rgbaMatch = originalColor.match(
            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
          );

          if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1]);
            const g = parseInt(rgbaMatch[2]);
            const b = parseInt(rgbaMatch[3]);
            // Use the calculated shimmer opacity
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
          } else {
            ctx.fillStyle = originalColor;
          }

          ctx.fill();
        }
      });
    }

    function drawDebrisField() {
      debrisParticles.forEach((particle) => {
        particle.angle += particle.speed;

        const x = planetX + Math.cos(particle.angle) * particle.distance;
        const y = planetY + Math.sin(particle.angle) * particle.distance * 0.15;

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          // Apply wormhole distortion
          const [distortedX, distortedY] = applyWormholeDistortion(x, y);

          ctx.beginPath();
          ctx.arc(distortedX, distortedY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
      });
    }

    function updateAndDrawStreaks() {
      for (let i = streakParticles.length - 1; i >= 0; i--) {
        const streak = streakParticles[i];

        // Move streak from left to right
        streak.x += streak.speed;

        // If streak has gone off screen, replace it with a new one
        if (streak.x > canvas.width + streak.length) {
          streakParticles.splice(i, 1);
          createNewStreak();
          continue;
        }

        // Draw the streak as a line
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x - streak.length, streak.y); // Draw backwards to create streak
        ctx.lineWidth = streak.width;

        // Create a gradient for the streak
        const gradient = ctx.createLinearGradient(
          streak.x,
          streak.y,
          streak.x - streak.length,
          streak.y
        );

        // Bright at the leading edge, fading to transparent
        const streakColor = streak.color.replace(/[\d.]+\)$/, "1)"); // Full opacity version
        const transparentColor = streak.color.replace(/[\d.]+\)$/, "0)"); // Transparent version

        gradient.addColorStop(0, streakColor);
        gradient.addColorStop(1, transparentColor);

        ctx.strokeStyle = gradient;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    function drawWormhole() {
      // Create a wormhole/black hole effect
      const gradient = ctx.createRadialGradient(
        wormholeX,
        wormholeY,
        0,
        wormholeX,
        wormholeY,
        wormholeRadius * 2
      );

      // Black hole center is dark
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(0.4, "rgba(20, 0, 40, 0.8)");
      gradient.addColorStop(0.7, "rgba(50, 10, 80, 0.5)");
      gradient.addColorStop(1, "rgba(100, 40, 140, 0)");

      // Draw the black hole
      ctx.beginPath();
      ctx.arc(wormholeX, wormholeY, wormholeRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Accretion disk effect
      ctx.beginPath();
      ctx.ellipse(
        wormholeX,
        wormholeY,
        wormholeRadius * 1.5,
        wormholeRadius * 0.5,
        time * 0.3, // Rotation over time
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(180, 100, 220, 0.6)";
      ctx.lineWidth = wormholeRadius * 0.1;
      ctx.stroke();

      // Add a glow effect
      ctx.beginPath();
      ctx.arc(wormholeX, wormholeY, wormholeRadius * 2, 0, Math.PI * 2);
      ctx.shadowColor = "rgba(100, 20, 180, 0.8)";
      ctx.shadowBlur = 30;
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function applyWormholeDistortion(x, y) {
      // Calculate distance from point to wormhole
      const dx = x - wormholeX;
      const dy = y - wormholeY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only apply distortion within a certain range
      const distortionRange = wormholeRadius * 5;

      if (distance < distortionRange) {
        // Calculate distortion strength (stronger closer to wormhole)
        const strength = 1 - distance / distortionRange;
        const distortionFactor = strength * strength * wormholeRadius * 2;

        // Calculate direction vector from point to wormhole
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Pull the point toward the wormhole
        return [x - dirX * distortionFactor, y - dirY * distortionFactor];
      }

      // No distortion needed
      return [x, y];
    }

    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with wormhole distortion
      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        // Apply wormhole distortion to stars
        const [distortedX, distortedY] = applyWormholeDistortion(x, y);

        const size = Math.random() * 1.0;
        const opacity = Math.random() * 0.7;

        ctx.beginPath();
        ctx.arc(distortedX, distortedY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      // Draw the wormhole behind everything
      //   drawWormhole();

      // Draw high-speed particles
      updateAndDrawStreaks();

      // Draw debris field
      //   drawDebrisField();

      drawParticles(true);

      const gradient = ctx.createRadialGradient(
        planetX,
        planetY - planetRadius * 0.1,
        0,
        planetX,
        planetY,
        planetRadius
      );
      gradient.addColorStop(0, "rgb(37, 37, 37)");
      gradient.addColorStop(0.6, "rgb(49, 49, 49)");
      gradient.addColorStop(1, "rgb(0, 0, 0)");

      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(255, 240, 200, 0.3)";
      ctx.shadowBlur = 60;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(
        planetX,
        planetY - planetRadius * 0.4,
        planetRadius * 0.7,
        Math.PI * 1.3,
        Math.PI * 1.7,
        false
      );
      ctx.strokeStyle = "rgba(255, 250, 230, 0.5)";
      ctx.lineWidth = planetRadius * 0.15;
      ctx.stroke();

      drawParticles(false);
    }

    createRings();
    createDebrisField();
    createStreakParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 1,
        pointerEvents: "none",
        background: "rgb(0, 0, 0)",
      }}
    />
  );
};

export default Background;
