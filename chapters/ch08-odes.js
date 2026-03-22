window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'ODEs in Physics',
    subtitle: 'Differential equations that govern physical systems',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why ODEs Rule Physics
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why ODEs Rule Physics',
            content: `
<h2>Why ODEs Rule Physics</h2>

<div class="env-block intuition">
    <div class="env-title">The Language of Change</div>
    <div class="env-body">
        <p>Newton's second law \\(F = ma\\) is not an algebraic equation; it is a differential equation \\(m\\ddot{x} = F(x, \\dot{x}, t)\\). The moment you write down a force law, you have an ODE. Quantum mechanics (the Schrodinger equation), electrodynamics (circuit equations), thermodynamics (rate equations), and general relativity (geodesic equations) all reduce, in appropriate limits, to ordinary differential equations.</p>
    </div>
</div>

<p>An <strong>ordinary differential equation</strong> (ODE) relates a function \\(y(x)\\) to its derivatives:</p>

\\[
F\\bigl(x,\\, y,\\, y',\\, y'',\\, \\ldots,\\, y^{(n)}\\bigr) = 0.
\\]

<p>The <strong>order</strong> of the ODE is the highest derivative that appears. In physics, the overwhelming majority of ODEs are second-order, because Newton's law involves \\(\\ddot{x}\\) and the Schrodinger equation involves \\(\\nabla^2 \\psi\\) (which, after separation of variables, yields second-order ODEs in each coordinate).</p>

<h3>Linear vs. Nonlinear</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Linear ODE)</div>
    <div class="env-body">
        <p>A second-order ODE is <strong>linear</strong> if it can be written as</p>
        \\[a_2(x)\\,y'' + a_1(x)\\,y' + a_0(x)\\,y = f(x),\\]
        <p>where the coefficients \\(a_i(x)\\) and the source \\(f(x)\\) do not depend on \\(y\\). If \\(f(x) = 0\\), the equation is <strong>homogeneous</strong>.</p>
    </div>
</div>

<p>Linearity is what makes superposition work: if \\(y_1\\) and \\(y_2\\) solve the homogeneous equation, then so does \\(c_1 y_1 + c_2 y_2\\). This single fact underpins normal modes, Fourier series, eigenfunction expansions, and nearly all of quantum mechanics.</p>

<h3>The Landscape of This Chapter</h3>

<p>We begin with the harmonic oscillator, the single most important ODE in all of physics. We then develop power series and Frobenius methods to solve equations with variable coefficients, and meet the special equations (Bessel, Legendre, Hermite, Laguerre) that arise from separation of variables in various coordinate systems. Phase-space methods give a geometric view of dynamics, and perturbation theory handles equations that are almost, but not exactly, solvable.</p>

<div class="env-block remark">
    <div class="env-title">Notation</div>
    <div class="env-body">
        <p>We use both Leibniz (\\(dy/dx\\)) and Newton (\\(\\dot{y}\\)) notation freely. When the independent variable is time, Newton dots are standard; for spatial variables, primes \\(y'\\) are preferred.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Harmonic Oscillator
        // ================================================================
        {
            id: 'sec-oscillator',
            title: 'The Harmonic Oscillator',
            content: `
<h2>The Harmonic Oscillator</h2>

<div class="env-block intuition">
    <div class="env-title">Why This Equation Is Everywhere</div>
    <div class="env-body">
        <p>Any system near a stable equilibrium behaves like a harmonic oscillator. Expand a potential \\(V(x)\\) about its minimum \\(x_0\\): \\(V(x) \\approx V(x_0) + \\tfrac{1}{2}V''(x_0)(x - x_0)^2 + \\cdots\\). The leading force is \\(F = -V''(x_0)(x - x_0)\\), a restoring force proportional to displacement. This is Hooke's law, and it gives the harmonic oscillator equation.</p>
    </div>
</div>

<h3>The Undamped Oscillator</h3>

<div class="env-block definition">
    <div class="env-title">The Simple Harmonic Oscillator</div>
    <div class="env-body">
        <p>The equation of motion for a mass \\(m\\) on a spring with constant \\(k\\) is</p>
        \\[m\\ddot{x} + kx = 0 \\quad \\Longleftrightarrow \\quad \\ddot{x} + \\omega_0^2 x = 0,\\]
        <p>where \\(\\omega_0 = \\sqrt{k/m}\\) is the <strong>natural frequency</strong>. The general solution is</p>
        \\[x(t) = A\\cos(\\omega_0 t) + B\\sin(\\omega_0 t) = C\\cos(\\omega_0 t - \\phi),\\]
        <p>with amplitude \\(C = \\sqrt{A^2 + B^2}\\) and phase \\(\\phi = \\arctan(B/A)\\).</p>
    </div>
</div>

<p>The total energy \\(E = \\tfrac{1}{2}m\\dot{x}^2 + \\tfrac{1}{2}kx^2\\) is conserved: the system traces an ellipse in \\((x, \\dot{x})\\) phase space.</p>

<h3>The Damped Oscillator</h3>

<p>Adding a friction force \\(-b\\dot{x}\\) proportional to velocity gives</p>
\\[\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = 0,\\]
<p>where \\(\\gamma = b/(2m)\\) is the <strong>damping coefficient</strong>. The characteristic equation is \\(\\lambda^2 + 2\\gamma\\lambda + \\omega_0^2 = 0\\), with roots</p>
\\[\\lambda_{\\pm} = -\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}.\\]

<div class="env-block theorem">
    <div class="env-title">Three Damping Regimes</div>
    <div class="env-body">
        <p><strong>Underdamped</strong> (\\(\\gamma < \\omega_0\\)): Oscillations with exponentially decaying amplitude. \\(x(t) = C e^{-\\gamma t}\\cos(\\omega_d t - \\phi)\\) where \\(\\omega_d = \\sqrt{\\omega_0^2 - \\gamma^2}\\).</p>
        <p><strong>Critically damped</strong> (\\(\\gamma = \\omega_0\\)): Fastest return to equilibrium without oscillation. \\(x(t) = (A + Bt)e^{-\\gamma t}\\).</p>
        <p><strong>Overdamped</strong> (\\(\\gamma > \\omega_0\\)): Slow exponential decay with no oscillation. \\(x(t) = A e^{\\lambda_+ t} + B e^{\\lambda_- t}\\).</p>
    </div>
</div>

<h3>The Driven Oscillator and Resonance</h3>

<p>When an external force \\(F_0\\cos(\\omega t)\\) drives the system:</p>
\\[\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = \\frac{F_0}{m}\\cos(\\omega t).\\]

<p>The steady-state (particular) solution has amplitude</p>
\\[A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + 4\\gamma^2\\omega^2}}.\\]

<p>This amplitude is maximized near \\(\\omega = \\omega_0\\) (for small damping), a phenomenon called <strong>resonance</strong>. The peak amplitude scales as \\(1/(2\\gamma)\\), and the width of the resonance peak is characterized by the quality factor \\(Q = \\omega_0/(2\\gamma)\\).</p>

<div class="viz-placeholder" data-viz="viz-harmonic-oscillator"></div>
<div class="viz-placeholder" data-viz="viz-driven-oscillator"></div>
`,
            visualizations: [
                {
                    id: 'viz-harmonic-oscillator',
                    title: 'Spring-Mass System with Phase Portrait',
                    description: 'A damped harmonic oscillator. The left panel shows the spring-mass system animated in real time; the right panel shows the phase portrait (position vs velocity). Adjust damping to see underdamped, critically damped, and overdamped regimes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 0, originY: 0, scale: 1 });
                        var omega0 = 2.0;
                        var gamma = 0.3;
                        var x0 = 3.0;
                        var v0 = 0;
                        var running = true;

                        VizEngine.createSlider(controls, '\u03b3 (damping)', 0, 3.0, gamma, 0.05, function(v) { gamma = v; });
                        VizEngine.createSlider(controls, '\u03c9\u2080', 0.5, 4.0, omega0, 0.1, function(v) { omega0 = v; });
                        VizEngine.createButton(controls, 'Reset', function() { trail = []; });

                        var trail = [];

                        function solve(t) {
                            if (gamma < omega0) {
                                var wd = Math.sqrt(omega0 * omega0 - gamma * gamma);
                                var env = Math.exp(-gamma * t);
                                var x = env * (x0 * Math.cos(wd * t) + (v0 + gamma * x0) / wd * Math.sin(wd * t));
                                var v = -gamma * x + env * wd * (-x0 * Math.sin(wd * t) + (v0 + gamma * x0) / wd * Math.cos(wd * t));
                                return [x, v];
                            } else if (Math.abs(gamma - omega0) < 0.05) {
                                var env2 = Math.exp(-gamma * t);
                                var A = x0;
                                var B = v0 + gamma * x0;
                                return [env2 * (A + B * t), env2 * (B - gamma * (A + B * t))];
                            } else {
                                var disc = Math.sqrt(gamma * gamma - omega0 * omega0);
                                var l1 = -gamma + disc;
                                var l2 = -gamma - disc;
                                var A2 = (v0 - l2 * x0) / (l1 - l2);
                                var B2 = x0 - A2;
                                return [A2 * Math.exp(l1 * t) + B2 * Math.exp(l2 * t),
                                        A2 * l1 * Math.exp(l1 * t) + B2 * l2 * Math.exp(l2 * t)];
                            }
                        }

                        viz.animate(function(timestamp) {
                            var t = timestamp / 1000;
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var midX = W * 0.38;

                            // Left: spring-mass animation
                            var state = solve(t % 20);
                            var xPos = state[0];
                            var vPos = state[1];
                            var restY = H * 0.5;
                            var massY = restY + xPos * 25;
                            var wallY = 40;

                            // Wall
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(midX / 2, wallY); ctx.lineTo(midX / 2, wallY - 15); ctx.stroke();
                            for (var h = 0; h < 6; h++) {
                                ctx.beginPath();
                                ctx.moveTo(midX / 2 - 8 + h * 3, wallY - 15);
                                ctx.lineTo(midX / 2 - 14 + h * 3, wallY - 25);
                                ctx.stroke();
                            }

                            // Spring (zigzag)
                            var springTop = wallY;
                            var springBot = massY - 15;
                            var coils = 10;
                            var amp = 8;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(midX / 2, springTop);
                            for (var c = 0; c <= coils; c++) {
                                var frac = c / coils;
                                var sy = springTop + frac * (springBot - springTop);
                                var sx = midX / 2 + (c % 2 === 0 ? -amp : amp);
                                if (c === 0 || c === coils) sx = midX / 2;
                                ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Mass
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(midX / 2 - 15, massY - 15, 30, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('m', midX / 2, massY);

                            // Equilibrium line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(midX / 2 - 30, restY); ctx.lineTo(midX / 2 + 30, restY); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            viz.screenText('Spring-Mass', midX / 2, H - 15, viz.colors.text, 11);

                            // Regime label
                            var regime = gamma < omega0 - 0.05 ? 'Underdamped' : (gamma > omega0 + 0.05 ? 'Overdamped' : 'Critical');
                            viz.screenText(regime, midX / 2, H - 30, viz.colors.orange, 11);

                            // Right: phase portrait
                            var phCx = midX + (W - midX) / 2;
                            var phCy = H / 2;
                            var phScale = 20;

                            // Phase portrait axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(midX + 20, phCy); ctx.lineTo(W - 10, phCy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(phCx, 20); ctx.lineTo(phCx, H - 20); ctx.stroke();
                            viz.screenText('x', W - 15, phCy - 10, viz.colors.text, 10);
                            viz.screenText('v', phCx + 10, 25, viz.colors.text, 10);

                            // Add to trail
                            trail.push([xPos, vPos]);
                            if (trail.length > 600) trail.shift();

                            // Draw trail
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var i = 0; i < trail.length; i++) {
                                var px = phCx + trail[i][0] * phScale;
                                var py = phCy - trail[i][1] * phScale;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Current point
                            var cpx = phCx + xPos * phScale;
                            var cpy = phCy - vPos * phScale;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(cpx, cpy, 5, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('Phase Portrait', phCx, H - 15, viz.colors.text, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-driven-oscillator',
                    title: 'Resonance: Amplitude vs Driving Frequency',
                    description: 'The amplitude response of a driven damped oscillator. The resonance peak sharpens as damping decreases. The quality factor Q = \\(\\omega_0/(2\\gamma)\\) measures the sharpness of the peak.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 70, originY: 290, scale: 50
                        });
                        var gamma = 0.15;
                        var omega0 = 2.0;
                        var F0m = 1.0;

                        VizEngine.createSlider(controls, '\u03b3', 0.02, 1.0, gamma, 0.02, function(v) { gamma = v; draw(); });
                        VizEngine.createSlider(controls, '\u03c9\u2080', 1.0, 4.0, omega0, 0.1, function(v) { omega0 = v; draw(); });

                        function amplitude(w) {
                            var denom = Math.sqrt(Math.pow(omega0 * omega0 - w * w, 2) + 4 * gamma * gamma * w * w);
                            return denom > 1e-10 ? F0m / denom : 100;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw resonance curve
                            viz.drawFunction(amplitude, 0, 8, viz.colors.blue, 2.5, 400);

                            // Mark resonance peak
                            var wPeak = Math.sqrt(Math.max(0, omega0 * omega0 - 2 * gamma * gamma));
                            if (wPeak > 0) {
                                var aPeak = amplitude(wPeak);
                                var sPeak = viz.toScreen(wPeak, aPeak);
                                viz.ctx.setLineDash([3, 3]);
                                viz.ctx.strokeStyle = viz.colors.orange;
                                viz.ctx.lineWidth = 1;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(sPeak[0], sPeak[1]);
                                viz.ctx.lineTo(sPeak[0], viz.toScreen(0, 0)[1]);
                                viz.ctx.stroke();
                                viz.ctx.setLineDash([]);
                                viz.drawPoint(wPeak, aPeak, viz.colors.orange, 'peak', 4);
                            }

                            var Q = omega0 / (2 * gamma);
                            viz.screenText('A(\u03c9)', 20, 20, viz.colors.blue, 13, 'left');
                            viz.screenText('\u03c9', viz.width - 15, viz.originY + 15, viz.colors.text, 12);
                            viz.screenText('Q = ' + Q.toFixed(1), viz.width - 80, 25, viz.colors.orange, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A mass of 0.5 kg on a spring with \\(k = 8\\) N/m is released from \\(x_0 = 0.1\\) m with zero velocity. Find the position \\(x(t)\\) and the period of oscillation.',
                    hint: '\\(\\omega_0 = \\sqrt{k/m}\\). With \\(x(0) = x_0\\) and \\(\\dot{x}(0) = 0\\), the solution is a pure cosine.',
                    solution: '\\(\\omega_0 = \\sqrt{8/0.5} = 4\\) rad/s. \\(x(t) = 0.1\\cos(4t)\\). Period \\(T = 2\\pi/\\omega_0 = \\pi/2 \\approx 1.57\\) s.'
                },
                {
                    question: 'For the damped oscillator \\(\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = 0\\) with \\(\\omega_0 = 5\\) and \\(\\gamma = 3\\), classify the damping regime and write the general solution.',
                    hint: 'Compare \\(\\gamma\\) to \\(\\omega_0\\). Since \\(\\gamma < \\omega_0\\), the system is underdamped.',
                    solution: 'Underdamped. \\(\\omega_d = \\sqrt{25 - 9} = 4\\). \\(x(t) = e^{-3t}(A\\cos 4t + B\\sin 4t)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Power Series Solutions
        // ================================================================
        {
            id: 'sec-power-series',
            title: 'Power Series Solutions',
            content: `
<h2>Power Series Solutions</h2>

<div class="env-block intuition">
    <div class="env-title">When Guessing Fails</div>
    <div class="env-body">
        <p>Constant-coefficient ODEs yield to the characteristic equation. But most physically interesting equations have variable coefficients: Bessel's equation, Legendre's equation, the quantum harmonic oscillator. For these, we assume a power series solution and determine the coefficients recursively.</p>
    </div>
</div>

<h3>Ordinary Points</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Ordinary and Singular Points)</div>
    <div class="env-body">
        <p>For the standard-form ODE \\(y'' + P(x)y' + Q(x)y = 0\\), the point \\(x = x_0\\) is an <strong>ordinary point</strong> if \\(P(x)\\) and \\(Q(x)\\) are analytic at \\(x_0\\). Otherwise it is a <strong>singular point</strong>.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.1 (Power Series at an Ordinary Point)</div>
    <div class="env-body">
        <p>If \\(x_0\\) is an ordinary point, then the ODE has two linearly independent solutions of the form</p>
        \\[y(x) = \\sum_{n=0}^{\\infty} a_n (x - x_0)^n,\\]
        <p>convergent in at least \\(|x - x_0| < R\\), where \\(R\\) is the distance from \\(x_0\\) to the nearest singular point in the complex plane.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Airy's Equation</div>
    <div class="env-body">
        <p>\\(y'' - xy = 0\\). Substituting \\(y = \\sum a_n x^n\\) gives \\(\\sum_{n=2}^{\\infty} n(n-1)a_n x^{n-2} - \\sum_{n=0}^{\\infty} a_n x^{n+1} = 0\\). Reindexing and matching coefficients yields the recurrence</p>
        \\[a_{n+2} = \\frac{a_{n-1}}{(n+2)(n+1)}, \\quad n \\geq 1,\\]
        <p>with \\(a_2 = 0\\). The two independent solutions (Airy functions Ai and Bi) are built from \\(a_0\\) and \\(a_1\\) respectively.</p>
    </div>
</div>

<h3>Regular Singular Points and the Frobenius Method</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Regular Singular Point)</div>
    <div class="env-body">
        <p>A singular point \\(x_0\\) is <strong>regular</strong> if \\((x - x_0)P(x)\\) and \\((x - x_0)^2 Q(x)\\) are both analytic at \\(x_0\\). Otherwise it is an <strong>irregular</strong> singular point.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.2 (Frobenius Method)</div>
    <div class="env-body">
        <p>Near a regular singular point \\(x_0\\), at least one solution has the form</p>
        \\[y(x) = (x - x_0)^s \\sum_{n=0}^{\\infty} a_n (x - x_0)^n, \\quad a_0 \\neq 0,\\]
        <p>where \\(s\\) satisfies the <strong>indicial equation</strong> obtained by substituting and examining the lowest power of \\((x - x_0)\\).</p>
    </div>
</div>

<p>The indicial equation is typically quadratic in \\(s\\), giving two roots \\(s_1 \\geq s_2\\). The nature of the second solution depends on whether \\(s_1 - s_2\\) is a non-negative integer:</p>
<ul>
    <li>If \\(s_1 - s_2 \\notin \\mathbb{Z}_{\\geq 0}\\): both solutions are of Frobenius type.</li>
    <li>If \\(s_1 - s_2 = 0\\): the second solution involves a logarithmic term.</li>
    <li>If \\(s_1 - s_2 \\in \\mathbb{Z}_{>0}\\): the second solution may or may not involve a logarithm; one must check.</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example: Bessel's Equation of Order Zero</div>
    <div class="env-body">
        <p>\\(x^2 y'' + x y' + x^2 y = 0\\). The point \\(x = 0\\) is a regular singular point. The indicial equation gives \\(s = 0\\) (double root), so the first solution is \\(J_0(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(n!)^2}\\bigl(\\frac{x}{2}\\bigr)^{2n}\\), while the second solution involves \\(\\ln x\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-frobenius"></div>
`,
            visualizations: [
                {
                    id: 'viz-frobenius',
                    title: 'Power Series Solution: Term-by-Term Construction',
                    description: 'Watch a power series solution being built term by term. Each partial sum adds a higher-order correction. Shown here for the Airy equation \\(y\'\' = xy\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 280, originY: 240, scale: 35
                        });
                        var maxTerms = 5;

                        VizEngine.createSlider(controls, 'Terms', 1, 20, maxTerms, 1, function(v) {
                            maxTerms = Math.round(v);
                            draw();
                        });

                        // Airy Ai coefficients
                        function airyPartial(x, N) {
                            // Two independent solutions from a0=1, a1=0 and a0=0, a1=1
                            // Use a0=1, a1=0 (Ai-like)
                            var coeffs = [1, 0, 0]; // a0, a1, a2=0
                            for (var n = 1; n < 3 * N + 3; n++) {
                                if (n + 2 >= coeffs.length) {
                                    // a_{n+2} = a_{n-1} / ((n+2)(n+1))
                                    if (n - 1 >= 0 && n - 1 < coeffs.length) {
                                        coeffs.push(coeffs[n - 1] / ((n + 2) * (n + 1)));
                                    } else {
                                        coeffs.push(0);
                                    }
                                }
                            }
                            var sum = 0;
                            for (var k = 0; k < Math.min(N, coeffs.length); k++) {
                                sum += coeffs[k] * Math.pow(x, k);
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var colors = [viz.colors.text + '44', viz.colors.text + '55', viz.colors.text + '66',
                                          viz.colors.text + '77', viz.colors.text + '88'];

                            // Draw successive partial sums
                            for (var k = 1; k <= maxTerms; k++) {
                                var col = k === maxTerms ? viz.colors.blue : (viz.colors.text + Math.round(30 + 50 * k / maxTerms).toString(16));
                                var lw = k === maxTerms ? 2.5 : 1;
                                (function(kk, cc, ll) {
                                    viz.drawFunction(function(x) { return airyPartial(x, kk); }, -6, 4, cc, ll, 300);
                                })(k, col, lw);
                            }

                            viz.screenText('Airy Ai(x): ' + maxTerms + ' terms', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('y\u2032\u2032 = xy', viz.width / 2, 36, viz.colors.teal, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the power series solution of \\(y\'\' + y = 0\\) about \\(x = 0\\) up to the \\(x^6\\) term. Verify it matches the Taylor series of \\(\\cos x\\) and \\(\\sin x\\).',
                    hint: 'Substitute \\(y = \\sum a_n x^n\\), match coefficients: \\(a_{n+2} = -a_n / ((n+2)(n+1))\\).',
                    solution: 'From \\(a_0 = 1, a_1 = 0\\): \\(y_1 = 1 - x^2/2 + x^4/24 - x^6/720 + \\cdots = \\cos x\\). From \\(a_0 = 0, a_1 = 1\\): \\(y_2 = x - x^3/6 + x^5/120 - \\cdots = \\sin x\\).'
                },
                {
                    question: 'Classify \\(x = 0\\) for the equation \\(x^2 y\'\' + x(1 - x)y\' - y = 0\\). Write the indicial equation.',
                    hint: 'Put in standard form: \\(P(x) = (1-x)/x\\), \\(Q(x) = -1/x^2\\). Check if \\(xP(x)\\) and \\(x^2Q(x)\\) are analytic.',
                    solution: '\\(xP(x) = 1 - x\\) (analytic), \\(x^2 Q(x) = -1\\) (analytic). So \\(x = 0\\) is a regular singular point. Substituting \\(y = x^s\\sum a_n x^n\\) gives indicial equation \\(s(s-1) + s - 1 = 0 \\Rightarrow s^2 - 1 = 0\\), so \\(s = \\pm 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Special Equations
        // ================================================================
        {
            id: 'sec-special-equations',
            title: 'Special Equations',
            content: `
<h2>Special Equations of Mathematical Physics</h2>

<div class="env-block intuition">
    <div class="env-title">Where Do These Equations Come From?</div>
    <div class="env-body">
        <p>Separate variables in the Laplace, Helmholtz, or Schrodinger equation in a particular coordinate system, and you get a particular special ODE. Cartesian coordinates give sines and cosines. Spherical coordinates give Legendre polynomials and associated Legendre functions. Cylindrical coordinates give Bessel functions. The quantum harmonic oscillator gives Hermite polynomials. The hydrogen atom radial equation gives Laguerre polynomials.</p>
    </div>
</div>

<h3>Bessel's Equation</h3>

<div class="env-block definition">
    <div class="env-title">Bessel's Equation of Order \\(\\nu\\)</div>
    <div class="env-body">
        \\[x^2 y'' + x y' + (x^2 - \\nu^2)y = 0.\\]
        <p>Solutions: Bessel functions \\(J_\\nu(x)\\) and \\(Y_\\nu(x)\\) (or \\(N_\\nu(x)\\)). For integer \\(\\nu = n\\):</p>
        \\[J_n(x) = \\sum_{k=0}^{\\infty} \\frac{(-1)^k}{k!\\,(k+n)!} \\left(\\frac{x}{2}\\right)^{2k+n}.\\]
    </div>
</div>

<p>Bessel functions arise in any problem with cylindrical symmetry: vibrating drumheads, electromagnetic waveguides, heat conduction in cylinders, diffraction from circular apertures.</p>

<h3>Legendre's Equation</h3>

<div class="env-block definition">
    <div class="env-title">Legendre's Equation</div>
    <div class="env-body">
        \\[(1 - x^2)y'' - 2xy' + \\ell(\\ell+1)y = 0,\\]
        <p>or equivalently \\(\\frac{d}{dx}\\bigl[(1-x^2)\\frac{dy}{dx}\\bigr] + \\ell(\\ell+1)y = 0\\). When \\(\\ell\\) is a non-negative integer, one solution is the Legendre polynomial \\(P_\\ell(x)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Rodrigues' Formula</div>
    <div class="env-body">
        \\[P_\\ell(x) = \\frac{1}{2^\\ell \\ell!} \\frac{d^\\ell}{dx^\\ell}(x^2 - 1)^\\ell.\\]
        <p>First few: \\(P_0 = 1\\), \\(P_1 = x\\), \\(P_2 = \\tfrac{1}{2}(3x^2 - 1)\\), \\(P_3 = \\tfrac{1}{2}(5x^3 - 3x)\\).</p>
    </div>
</div>

<h3>Hermite's Equation</h3>

<div class="env-block definition">
    <div class="env-title">Hermite's Equation</div>
    <div class="env-body">
        \\[y'' - 2xy' + 2ny = 0, \\quad n = 0, 1, 2, \\ldots\\]
        <p>The polynomial solutions are the <strong>Hermite polynomials</strong> \\(H_n(x)\\), which appear in the quantum harmonic oscillator wavefunctions \\(\\psi_n(x) \\propto e^{-x^2/2} H_n(x)\\).</p>
    </div>
</div>

<h3>Laguerre's Equation</h3>

<div class="env-block definition">
    <div class="env-title">Laguerre's Equation</div>
    <div class="env-body">
        \\[xy'' + (1 - x)y' + ny = 0, \\quad n = 0, 1, 2, \\ldots\\]
        <p>The polynomial solutions are the <strong>Laguerre polynomials</strong> \\(L_n(x)\\). The associated Laguerre polynomials \\(L_n^k(x)\\) appear in the radial part of the hydrogen atom wavefunction.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">A Unifying Perspective</div>
    <div class="env-body">
        <p>All of these equations are special cases of the <strong>Sturm-Liouville problem</strong> (Chapter 9). They are self-adjoint eigenvalue equations with weight functions, and their polynomial solutions form complete orthogonal sets. This is why they appear in eigenfunction expansions throughout physics.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that \\(P_2(x) = \\tfrac{1}{2}(3x^2 - 1)\\) satisfies Legendre\'s equation with \\(\\ell = 2\\).',
                    hint: 'Compute \\(P_2\'\\), \\(P_2\'\'\\), and substitute into \\((1-x^2)y\'\' - 2xy\' + 6y\\).',
                    solution: '\\(P_2\' = 3x\\), \\(P_2\'\' = 3\\). LHS = \\((1-x^2)(3) - 2x(3x) + 6 \\cdot \\tfrac{1}{2}(3x^2-1) = 3 - 3x^2 - 6x^2 + 9x^2 - 3 = 0\\). Verified.'
                },
                {
                    question: 'Show that \\(J_0(0) = 1\\) and \\(J_n(0) = 0\\) for \\(n \\geq 1\\) directly from the series definition.',
                    hint: 'Evaluate the series at \\(x = 0\\). Only the \\(k = 0\\) term survives.',
                    solution: 'At \\(x=0\\): \\(J_n(0) = \\sum_k \\frac{(-1)^k}{k!(k+n)!}(0)^{2k+n}\\). Only \\(k=0, n=0\\) gives \\((0)^0 = 1\\), so \\(J_0(0) = \\frac{1}{0!0!} = 1\\). For \\(n \\geq 1\\), every term has \\(0^{2k+n} = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Phase Space
        // ================================================================
        {
            id: 'sec-phase',
            title: 'Phase Space',
            content: `
<h2>Phase Space and Qualitative Analysis</h2>

<div class="env-block intuition">
    <div class="env-title">Seeing Dynamics Geometrically</div>
    <div class="env-body">
        <p>Instead of solving an ODE explicitly, we can study the geometry of solutions in <strong>phase space</strong>. A second-order ODE \\(\\ddot{x} = f(x, \\dot{x})\\) becomes a pair of first-order equations \\(\\dot{x} = v\\), \\(\\dot{v} = f(x, v)\\). Each solution traces a curve (orbit) in the \\((x, v)\\) plane, and the vector field \\((v, f(x,v))\\) tells us how every point evolves.</p>
    </div>
</div>

<h3>Phase Portraits</h3>

<p>The <strong>phase portrait</strong> is the collection of all orbits in phase space. For a linear system \\(\\dot{\\mathbf{x}} = A\\mathbf{x}\\), the eigenvalues of \\(A\\) determine the topology:</p>

<div class="env-block theorem">
    <div class="env-title">Classification of Fixed Points (2D Linear Systems)</div>
    <div class="env-body">
        <ul>
            <li><strong>Stable node</strong>: both eigenvalues real and negative.</li>
            <li><strong>Unstable node</strong>: both eigenvalues real and positive.</li>
            <li><strong>Saddle</strong>: eigenvalues real with opposite signs.</li>
            <li><strong>Stable spiral</strong>: complex eigenvalues with negative real part.</li>
            <li><strong>Unstable spiral</strong>: complex eigenvalues with positive real part.</li>
            <li><strong>Center</strong>: purely imaginary eigenvalues (conservative systems).</li>
        </ul>
    </div>
</div>

<h3>Hamiltonian Systems</h3>

<p>A system is <strong>Hamiltonian</strong> if there exists a function \\(H(q, p)\\) such that</p>
\\[\\dot{q} = \\frac{\\partial H}{\\partial p}, \\quad \\dot{p} = -\\frac{\\partial H}{\\partial q}.\\]

<p>For a particle in a potential: \\(H = p^2/(2m) + V(q)\\). The key property: \\(dH/dt = 0\\), so orbits lie on level curves of \\(H\\). This means the phase portrait of a conservative system is just the contour map of the Hamiltonian.</p>

<div class="env-block example">
    <div class="env-title">Example: Pendulum Phase Portrait</div>
    <div class="env-body">
        <p>The nonlinear pendulum \\(\\ddot{\\theta} + (g/L)\\sin\\theta = 0\\) has Hamiltonian \\(H = \\dot{\\theta}^2/2 - (g/L)\\cos\\theta\\). The phase portrait shows:</p>
        <ul>
            <li>Closed orbits (librations) near \\(\\theta = 0\\) for small energies.</li>
            <li>A separatrix that divides librations from rotations.</li>
            <li>Open orbits (full rotations) at high energies.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-phase-portrait"></div>
`,
            visualizations: [
                {
                    id: 'viz-phase-portrait',
                    title: 'Phase Portrait: Nonlinear Pendulum',
                    description: 'The phase portrait of \\(\\ddot{\\theta} + \\sin\\theta = 0\\). Contours of constant energy \\(H = \\dot{\\theta}^2/2 - \\cos\\theta\\). Closed curves are librations; the thick curve is the separatrix; open curves are rotations. Click to add orbits.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 40
                        });

                        var orbits = [];

                        VizEngine.createButton(controls, 'Clear Orbits', function() { orbits = []; draw(); });
                        VizEngine.createButton(controls, 'Add Sample Orbits', function() {
                            orbits = [];
                            // Librations
                            for (var e = 0.3; e < 1.0; e += 0.3) {
                                orbits.push({ th0: Math.acos(1 - e), w0: 0 });
                            }
                            // Near separatrix
                            orbits.push({ th0: 0.01, w0: 1.99 });
                            // Rotations
                            orbits.push({ th0: 0, w0: 2.5 });
                            orbits.push({ th0: 0, w0: 3.0 });
                            draw();
                        });

                        viz.canvas.addEventListener('click', function(e) {
                            var r = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - r.left;
                            var my = e.clientY - r.top;
                            var pt = viz.toMath(mx, my);
                            orbits.push({ th0: pt[0], w0: pt[1] });
                            draw();
                        });

                        function H(th, w) { return 0.5 * w * w - Math.cos(th); }

                        function integrateOrbit(th0, w0, dt, steps) {
                            var pts = [];
                            var th = th0, w = w0;
                            for (var i = 0; i < steps; i++) {
                                pts.push([th, w]);
                                // RK4
                                var k1th = w;
                                var k1w = -Math.sin(th);
                                var k2th = w + 0.5 * dt * k1w;
                                var k2w = -Math.sin(th + 0.5 * dt * k1th);
                                var k3th = w + 0.5 * dt * k2w;
                                var k3w = -Math.sin(th + 0.5 * dt * k2th);
                                var k4th = w + dt * k3w;
                                var k4w = -Math.sin(th + dt * k3th);
                                th += dt / 6 * (k1th + 2 * k2th + 2 * k3th + k4th);
                                w += dt / 6 * (k1w + 2 * k2w + 2 * k3w + k4w);
                            }
                            return pts;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw energy contours as background
                            var nE = 12;
                            for (var ei = 0; ei < nE; ei++) {
                                var energy = -0.9 + ei * 0.4;
                                var col = energy < 1.0 ? viz.colors.teal + '22' : viz.colors.orange + '22';
                                if (Math.abs(energy - 1.0) < 0.1) col = viz.colors.red + '44';
                                // Sample orbit at this energy
                                var w0e = Math.sqrt(2 * (energy + 1));
                                if (!isFinite(w0e)) continue;
                                var pts = integrateOrbit(0.01, w0e, 0.02, 2000);
                                ctx.strokeStyle = col;
                                ctx.lineWidth = Math.abs(energy - 1.0) < 0.1 ? 2 : 0.8;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i < pts.length; i++) {
                                    var sc = viz.toScreen(pts[i][0], pts[i][1]);
                                    if (sc[0] < -10 || sc[0] > viz.width + 10 || sc[1] < -10 || sc[1] > viz.height + 10) {
                                        started = false; continue;
                                    }
                                    if (!started) { ctx.moveTo(sc[0], sc[1]); started = true; }
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            viz.screenText('\u03b8', viz.width - 12, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('\u03b8\u0307', viz.originX + 12, 12, viz.colors.text, 11);

                            // Draw user orbits
                            for (var oi = 0; oi < orbits.length; oi++) {
                                var orb = orbits[oi];
                                var pts2 = integrateOrbit(orb.th0, orb.w0, 0.015, 3000);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                var s2 = false;
                                for (var j = 0; j < pts2.length; j++) {
                                    var sc2 = viz.toScreen(pts2[j][0], pts2[j][1]);
                                    if (sc2[0] < -20 || sc2[0] > viz.width + 20) { s2 = false; continue; }
                                    if (!s2) { ctx.moveTo(sc2[0], sc2[1]); s2 = true; }
                                    else ctx.lineTo(sc2[0], sc2[1]);
                                }
                                ctx.stroke();

                                // Start point
                                var sp = viz.toScreen(orb.th0, orb.w0);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sp[0], sp[1], 3, 0, Math.PI * 2); ctx.fill();
                            }

                            // Fixed points
                            viz.drawPoint(0, 0, viz.colors.green, 'stable', 4);
                            viz.drawPoint(Math.PI, 0, viz.colors.red, 'saddle', 4);
                            viz.drawPoint(-Math.PI, 0, viz.colors.red, 'saddle', 4);

                            viz.screenText('Pendulum Phase Portrait (click to add orbits)', viz.width / 2, viz.height - 12, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the system \\(\\dot{x} = y,\\; \\dot{y} = -x - \\epsilon y\\) with \\(\\epsilon > 0\\), find the fixed point, classify it, and describe the phase portrait.',
                    hint: 'The matrix is \\(A = \\begin{pmatrix} 0 & 1 \\\\ -1 & -\\epsilon \\end{pmatrix}\\). Compute eigenvalues.',
                    solution: 'Fixed point at origin. Eigenvalues: \\(\\lambda = \\frac{-\\epsilon \\pm \\sqrt{\\epsilon^2 - 4}}{2}\\). For \\(0 < \\epsilon < 2\\): complex with negative real part, so stable spiral. For \\(\\epsilon = 2\\): stable degenerate node. For \\(\\epsilon > 2\\): stable node.'
                },
                {
                    question: 'Show that for a Hamiltonian system \\(\\dot{q} = \\partial H/\\partial p\\), \\(\\dot{p} = -\\partial H/\\partial q\\), the Hamiltonian \\(H(q,p)\\) is conserved along orbits.',
                    hint: 'Compute \\(dH/dt\\) using the chain rule.',
                    solution: '\\(\\frac{dH}{dt} = \\frac{\\partial H}{\\partial q}\\dot{q} + \\frac{\\partial H}{\\partial p}\\dot{p} = \\frac{\\partial H}{\\partial q}\\frac{\\partial H}{\\partial p} + \\frac{\\partial H}{\\partial p}\\left(-\\frac{\\partial H}{\\partial q}\\right) = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Perturbation Theory
        // ================================================================
        {
            id: 'sec-perturbation',
            title: 'Perturbation Theory',
            content: `
<h2>Perturbation Theory</h2>

<div class="env-block intuition">
    <div class="env-title">Almost Solvable Is Good Enough</div>
    <div class="env-body">
        <p>Most equations in physics cannot be solved exactly. Perturbation theory exploits small parameters: if an equation is "close" to one you can solve, expand the solution in powers of the small parameter and compute corrections order by order.</p>
    </div>
</div>

<h3>Regular Perturbation Theory</h3>

<p>Consider the equation</p>
\\[y'' + y + \\epsilon f(y, y') = 0,\\]
<p>where \\(\\epsilon \\ll 1\\). We seek a solution as a power series in \\(\\epsilon\\):</p>
\\[y(t) = y_0(t) + \\epsilon\\, y_1(t) + \\epsilon^2\\, y_2(t) + \\cdots.\\]

<div class="env-block theorem">
    <div class="env-title">Procedure: Regular Perturbation</div>
    <div class="env-body">
        <ol>
            <li>Substitute the expansion into the ODE.</li>
            <li>Collect terms at each order of \\(\\epsilon\\).</li>
            <li>At \\(O(1)\\): solve the unperturbed equation for \\(y_0\\).</li>
            <li>At \\(O(\\epsilon)\\): solve a <em>linear</em> equation for \\(y_1\\) with \\(y_0\\) as a known source.</li>
            <li>Continue to higher orders as needed.</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Weakly Nonlinear Oscillator</div>
    <div class="env-body">
        <p>\\(\\ddot{x} + x + \\epsilon x^3 = 0\\) (the Duffing equation). At \\(O(1)\\): \\(\\ddot{x}_0 + x_0 = 0\\), so \\(x_0 = A\\cos t\\). At \\(O(\\epsilon)\\): \\(\\ddot{x}_1 + x_1 = -x_0^3 = -A^3\\cos^3 t = -\\frac{A^3}{4}(3\\cos t + \\cos 3t)\\).</p>
        <p>The \\(\\cos t\\) term on the right resonates with the homogeneous solution (secular term). This signals that the frequency is shifting: \\(\\omega = 1 + \\frac{3}{8}\\epsilon A^2 + O(\\epsilon^2)\\). This is handled by the Poincare-Lindstedt or multiple-scales method.</p>
    </div>
</div>

<h3>The WKB Approximation</h3>

<p>For the equation \\(\\epsilon^2 y'' + Q(x)y = 0\\) with \\(\\epsilon \\to 0\\), the solution oscillates rapidly where \\(Q > 0\\) and decays where \\(Q < 0\\). The WKB (Wentzel-Kramers-Brillouin) approximation is:</p>

<div class="env-block theorem">
    <div class="env-title">WKB Approximation</div>
    <div class="env-body">
        <p>Away from zeros of \\(Q(x)\\) (turning points):</p>
        \\[y(x) \\approx \\frac{C}{[Q(x)]^{1/4}} \\exp\\!\\left(\\pm \\frac{i}{\\epsilon}\\int^x \\sqrt{Q(s)}\\,ds\\right) \\quad (Q > 0),\\]
        \\[y(x) \\approx \\frac{C}{|Q(x)|^{1/4}} \\exp\\!\\left(\\pm \\frac{1}{\\epsilon}\\int^x \\sqrt{|Q(s)|}\\,ds\\right) \\quad (Q < 0).\\]
        <p>The key physics: the \\([Q]^{-1/4}\\) prefactor and the integrated phase \\(\\int\\sqrt{Q}\\,dx\\) encode the local wavelength and amplitude variation.</p>
    </div>
</div>

<p>WKB is the backbone of semiclassical quantum mechanics. The Bohr-Sommerfeld quantization condition \\(\\oint \\sqrt{Q}\\,dx = (n + \\tfrac{1}{2})\\pi\\epsilon\\) arises from demanding single-valuedness of the WKB wavefunction.</p>

<div class="viz-placeholder" data-viz="viz-wkb"></div>
<div class="viz-placeholder" data-viz="viz-perturbation-series"></div>
`,
            visualizations: [
                {
                    id: 'viz-wkb',
                    title: 'WKB Approximation vs Exact Solution',
                    description: 'Compare the WKB approximation (dashed) with the exact solution (solid) for a quantum particle in a slowly varying potential. Turning points are marked where the WKB approximation breaks down.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 280, originY: 240, scale: 30
                        });
                        var eps = 0.15;
                        var E = 1.5;

                        VizEngine.createSlider(controls, '\u03b5 (semiclassical)', 0.05, 0.5, eps, 0.01, function(v) { eps = v; draw(); });
                        VizEngine.createSlider(controls, 'E (energy)', 0.5, 4.0, E, 0.1, function(v) { E = v; draw(); });

                        function V(x) { return 0.5 * x * x; } // Harmonic potential
                        function Q(x) { return (E - V(x)) / (eps * eps); }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw potential
                            viz.drawFunction(V, -7, 7, viz.colors.text + '66', 1.5, 300);

                            // Energy level
                            var xTP = Math.sqrt(2 * E); // turning points for harmonic V
                            viz.drawSegment(-7, E, 7, E, viz.colors.orange + '66', 1, true);
                            viz.screenText('E', -6.5, E + 0.3, viz.colors.orange, 10, 'left');

                            // Turning points
                            viz.drawPoint(xTP, E, viz.colors.red, 'TP', 5);
                            viz.drawPoint(-xTP, E, viz.colors.red, 'TP', 5);

                            // Numerical solution via Numerov method for comparison
                            var dx = 0.01;
                            var xArr = [];
                            var yExact = [];
                            for (var x = -7; x <= 7; x += dx) {
                                xArr.push(x);
                            }
                            // Numerov integration from left
                            yExact = [0, 0.001];
                            for (var i = 2; i < xArr.length; i++) {
                                var Qcurr = (E - V(xArr[i - 1])) / (eps * eps);
                                var Qprev = (E - V(xArr[i - 2])) / (eps * eps);
                                var Qnext = (E - V(xArr[i])) / (eps * eps);
                                var ynew = (2 * yExact[i-1] * (1 - 5 * dx * dx * Qcurr / 12) - yExact[i-2] * (1 + dx * dx * Qprev / 12)) / (1 + dx * dx * Qnext / 12);
                                yExact.push(ynew);
                            }
                            // Normalize
                            var maxY = 0;
                            for (var j = 0; j < yExact.length; j++) maxY = Math.max(maxY, Math.abs(yExact[j]));
                            if (maxY > 0) for (var j2 = 0; j2 < yExact.length; j2++) yExact[j2] /= maxY;

                            // Draw exact
                            viz.drawFunction(function(x) {
                                var idx = Math.round((x + 7) / dx);
                                if (idx < 0 || idx >= yExact.length) return 0;
                                return yExact[idx] * 2 + E;
                            }, -7, 7, viz.colors.blue, 2, 500);

                            // WKB approximation (oscillatory region)
                            viz.drawFunction(function(x) {
                                var Qval = E - V(x);
                                if (Qval <= 0.02) return NaN;
                                var amplitude = 1 / Math.pow(Qval, 0.25);
                                // Integrate sqrt(Q) from -xTP to x
                                var integral = 0;
                                var nSteps = 200;
                                var a = -xTP + 0.01;
                                var ddx = (x - a) / nSteps;
                                for (var s = 0; s < nSteps; s++) {
                                    var xs = a + (s + 0.5) * ddx;
                                    var qs = (E - V(xs));
                                    if (qs > 0) integral += Math.sqrt(qs) * ddx;
                                }
                                integral /= eps;
                                return amplitude * Math.cos(integral) * 0.8 + E;
                            }, -xTP + 0.1, xTP - 0.1, viz.colors.teal, 1.5, 400);

                            viz.screenText('V(x) = x\u00B2/2', 5, 5, viz.colors.text, 10, 'left');
                            viz.screenText('Exact (blue) vs WKB (teal)', viz.width / 2, 15, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-perturbation-series',
                    title: 'Perturbation Series: Order by Order',
                    description: 'Watch the perturbation expansion build up the solution to \\(\\ddot{x} + x + \\epsilon x^3 = 0\\) (Duffing equation) order by order. Compare successive approximations against numerical integration.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 70, originY: 170, scale: 25
                        });
                        var epsilon = 0.3;
                        var maxOrder = 1;

                        VizEngine.createSlider(controls, '\u03b5', 0, 1.0, epsilon, 0.05, function(v) { epsilon = v; draw(); });
                        VizEngine.createSlider(controls, 'Order', 0, 3, maxOrder, 1, function(v) { maxOrder = Math.round(v); draw(); });

                        // Numerical Duffing via RK4
                        function solveDuffing(eps, tMax, dt) {
                            var pts = [];
                            var x = 1, v = 0;
                            for (var t = 0; t <= tMax; t += dt) {
                                pts.push([t, x]);
                                var k1x = v;
                                var k1v = -x - eps * x * x * x;
                                var k2x = v + 0.5 * dt * k1v;
                                var k2v = -(x + 0.5 * dt * k1x) - eps * Math.pow(x + 0.5 * dt * k1x, 3);
                                var k3x = v + 0.5 * dt * k2v;
                                var k3v = -(x + 0.5 * dt * k2x) - eps * Math.pow(x + 0.5 * dt * k2x, 3);
                                var k4x = v + dt * k3v;
                                var k4v = -(x + dt * k3x) - eps * Math.pow(x + dt * k3x, 3);
                                x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x);
                                v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v);
                            }
                            return pts;
                        }

                        function perturbApprox(t, eps, order) {
                            // Poincare-Lindstedt: omega = 1 + 3/8 eps A^2 + ...
                            // Order 0: cos(t)
                            // Order 1: cos(wt) + eps*(-1/32*cos(3wt) + 1/32*cos(wt)) with w = 1 + 3eps/8
                            var A = 1;
                            var w = 1;
                            if (order >= 1) w += 3 * eps * A * A / 8;
                            if (order >= 2) w += (15.0 / 256.0 - 69.0 / 256.0) * eps * eps;

                            var x0 = A * Math.cos(w * t);
                            if (order === 0) return x0;

                            var x1 = eps * A * A * A / 32.0 * (Math.cos(w * t) - Math.cos(3 * w * t));
                            if (order === 1) return x0 + x1;

                            // Higher orders: just use frequency correction
                            var x2 = eps * eps * A * A * A * A * A / 1024.0 * (Math.cos(w * t) - Math.cos(3 * w * t) + Math.cos(5 * w * t) / 6);
                            if (order === 2) return x0 + x1 + x2;

                            return x0 + x1 + x2;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Custom axes for time domain
                            var xMin = 0, xMax = 20;
                            var yMin = -2, yMax = 2;

                            // Draw grid manually
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 20; gx += 5) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 10); ctx.lineTo(sx, viz.height - 10); ctx.stroke();
                            }
                            for (var gy = -2; gy <= 2; gy++) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(viz.originX, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(viz.originX, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 10); ctx.lineTo(viz.originX, viz.height - 10); ctx.stroke();

                            // Axis labels
                            viz.screenText('t', viz.width - 10, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('x(t)', viz.originX - 5, 15, viz.colors.text, 11, 'right');

                            // Numerical solution
                            var numSol = solveDuffing(epsilon, 20, 0.01);
                            ctx.strokeStyle = viz.colors.white + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < numSol.length; i++) {
                                var px = viz.originX + numSol[i][0] * viz.scale;
                                var py = viz.originY - numSol[i][1] * viz.scale;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Perturbation approximation
                            var orderColors = [viz.colors.text + '88', viz.colors.teal, viz.colors.blue, viz.colors.purple];
                            for (var ord = 0; ord <= maxOrder; ord++) {
                                var col = ord === maxOrder ? orderColors[Math.min(ord, 3)] : (viz.colors.text + '44');
                                var lw2 = ord === maxOrder ? 2 : 1;
                                ctx.strokeStyle = col;
                                ctx.lineWidth = lw2;
                                ctx.beginPath();
                                for (var tt = 0; tt <= 20; tt += 0.05) {
                                    var px2 = viz.originX + tt * viz.scale;
                                    var py2 = viz.originY - perturbApprox(tt, epsilon, ord) * viz.scale;
                                    if (tt === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }

                            viz.screenText('Duffing: x\u0308 + x + \u03b5x\u00B3 = 0,  \u03b5 = ' + epsilon.toFixed(2), viz.width / 2, viz.height - 12, viz.colors.text, 10);
                            viz.screenText('White: exact | Color: O(\u03b5^' + maxOrder + ')', viz.width / 2, viz.height - 26, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Apply regular perturbation to \\(y\'\' + y = \\epsilon y^2\\) with \\(y(0) = 1\\), \\(y\'(0) = 0\\). Find \\(y_0(t)\\) and the equation for \\(y_1(t)\\).',
                    hint: 'At \\(O(1)\\): \\(y_0\'\' + y_0 = 0\\) with the given ICs. At \\(O(\\epsilon)\\): \\(y_1\'\' + y_1 = y_0^2\\).',
                    solution: '\\(y_0 = \\cos t\\). At \\(O(\\epsilon)\\): \\(y_1\'\' + y_1 = \\cos^2 t = \\frac{1}{2}(1 + \\cos 2t)\\). The \\(\\cos 2t\\) term is non-resonant. Solution: \\(y_1 = \\frac{1}{2}(1 - \\cos t) - \\frac{1}{6}\\cos 2t + \\frac{1}{6}\\cos t = \\frac{1}{2} - \\frac{1}{3}\\cos t - \\frac{1}{6}\\cos 2t\\) (after matching ICs).'
                },
                {
                    question: 'Write down the WKB approximation for the Schrodinger equation \\(-\\hbar^2 \\psi\'\'/2m + V(x)\\psi = E\\psi\\) in the classically allowed region \\(V(x) < E\\).',
                    hint: 'Rewrite as \\(\\psi\'\' + (2m(E - V)/\\hbar^2)\\psi = 0\\). Identify \\(Q(x) = 2m(E-V)/\\hbar^2\\) and \\(\\epsilon = \\hbar\\).',
                    solution: '\\(\\psi(x) \\approx \\frac{C}{[E - V(x)]^{1/4}} \\exp\\!\\left(\\pm \\frac{i}{\\hbar}\\int^x \\sqrt{2m(E - V(s))}\\,ds\\right)\\). The argument of the exponential is \\(\\pm i/\\hbar\\) times the classical action integral, connecting to the Hamilton-Jacobi theory.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What Comes Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'What Comes Next',
            content: `
<h2>Bridge: From ODEs to Eigenvalue Problems and Beyond</h2>

<p>This chapter has built the foundations of ODE theory as it appears in physics. Let us take stock of where these threads lead.</p>

<h3>Sturm-Liouville Theory (Chapter 9)</h3>

<p>The special equations of Section 4 (Bessel, Legendre, Hermite, Laguerre) all share a common structure: they are <strong>Sturm-Liouville eigenvalue problems</strong></p>
\\[\\frac{d}{dx}\\left[p(x)\\frac{dy}{dx}\\right] + [q(x) + \\lambda\\, w(x)]\\,y = 0,\\]
<p>with boundary conditions that make the operator self-adjoint. The eigenvalues \\(\\lambda_n\\) are real, the eigenfunctions \\(y_n(x)\\) are orthogonal with respect to the weight \\(w(x)\\), and they form a complete set. This is the infinite-dimensional analogue of the matrix eigenvalue problem from Chapter 3.</p>

<h3>Green's Functions (Chapter 10)</h3>

<p>The method of variation of parameters gives the particular solution to an inhomogeneous ODE. Green's functions systematize this: the Green's function \\(G(x, x')\\) is the response to a point source, and the full solution is</p>
\\[y(x) = \\int G(x, x')\\, f(x')\\, dx'.\\]
<p>This connects ODEs to integral equations and to the propagators of quantum field theory.</p>

<h3>Special Functions (Chapters 11-13)</h3>

<p>Bessel, Legendre, and the other special functions have rich properties (recurrence relations, generating functions, integral representations, asymptotic expansions) that deserve dedicated treatment. The ODE is just the starting point; the goal is a complete toolkit for each function family.</p>

<h3>From ODEs to PDEs (Chapter 17)</h3>

<p>Separation of variables reduces a PDE to a system of ODEs. Every technique in this chapter (power series, Frobenius, phase space, perturbation theory) reappears in the PDE context, applied to each separated coordinate.</p>

<div class="viz-placeholder" data-viz="viz-anharmonic"></div>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>Physics makes the same equations appear again and again. The harmonic oscillator in mechanics is the same equation as the LC circuit in electronics, the same as the angular equation in spherical coordinates, the same as the ladder operators in quantum mechanics. Recognizing the structural unity beneath superficially different problems is the central insight of mathematical physics.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-anharmonic',
                    title: 'Anharmonic Oscillator: The Duffing Equation',
                    description: 'Phase portrait of the Duffing oscillator \\(\\ddot{x} + x + \\epsilon x^3 = 0\\). For \\(\\epsilon > 0\\) (hardening spring), orbits curve inward. For \\(\\epsilon < 0\\) (softening spring), a separatrix appears and orbits can escape. Drag \\(\\epsilon\\) to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 50
                        });
                        var epsilon = 0.3;

                        VizEngine.createSlider(controls, '\u03b5', -0.8, 1.5, epsilon, 0.05, function(v) { epsilon = v; draw(); });

                        function integrateRK4(x0, v0, dt, steps) {
                            var pts = [];
                            var x = x0, v = v0;
                            for (var i = 0; i < steps; i++) {
                                pts.push([x, v]);
                                var k1x = v;
                                var k1v = -x - epsilon * x * x * x;
                                var k2x = v + 0.5 * dt * k1v;
                                var xm1 = x + 0.5 * dt * k1x;
                                var k2v = -xm1 - epsilon * xm1 * xm1 * xm1;
                                var k3x = v + 0.5 * dt * k2v;
                                var xm2 = x + 0.5 * dt * k2x;
                                var k3v = -xm2 - epsilon * xm2 * xm2 * xm2;
                                var k4x = v + dt * k3v;
                                var xm3 = x + dt * k3x;
                                var k4v = -xm3 - epsilon * xm3 * xm3 * xm3;
                                x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x);
                                v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v);
                                if (Math.abs(x) > 10 || Math.abs(v) > 10) break;
                            }
                            return pts;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            viz.screenText('x', viz.width - 12, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('v', viz.originX + 10, 12, viz.colors.text, 11);

                            // Draw orbits at various energies
                            var orbitColors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.orange];
                            var amplitudes = [0.3, 0.6, 1.0, 1.4, 1.8];
                            for (var ai = 0; ai < amplitudes.length; ai++) {
                                var a = amplitudes[ai];
                                var pts = integrateRK4(a, 0, 0.01, 4000);
                                ctx.strokeStyle = orbitColors[ai % orbitColors.length];
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i < pts.length; i++) {
                                    var sc = viz.toScreen(pts[i][0], pts[i][1]);
                                    if (sc[0] < -20 || sc[0] > viz.width + 20 || sc[1] < -20 || sc[1] > viz.height + 20) {
                                        started = false; continue;
                                    }
                                    if (!started) { ctx.moveTo(sc[0], sc[1]); started = true; }
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.stroke();
                            }

                            // For softening spring with eps < 0, also draw separatrix region
                            if (epsilon < -0.01) {
                                var xSep = Math.sqrt(-1 / epsilon);
                                // Separatrix passes through saddle points at x = +/- xSep
                                var pts_sep = integrateRK4(xSep - 0.01, 0.01, 0.01, 3000);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var s2 = false;
                                for (var j = 0; j < pts_sep.length; j++) {
                                    var sc2 = viz.toScreen(pts_sep[j][0], pts_sep[j][1]);
                                    if (sc2[0] < -20 || sc2[0] > viz.width + 20 || sc2[1] < -20 || sc2[1] > viz.height + 20) { s2 = false; continue; }
                                    if (!s2) { ctx.moveTo(sc2[0], sc2[1]); s2 = true; }
                                    else ctx.lineTo(sc2[0], sc2[1]);
                                }
                                ctx.stroke();

                                viz.drawPoint(xSep, 0, viz.colors.red, 'saddle', 4);
                                viz.drawPoint(-xSep, 0, viz.colors.red, 'saddle', 4);
                            }

                            viz.drawPoint(0, 0, viz.colors.green, '', 4);

                            var label = epsilon > 0.01 ? 'Hardening' : (epsilon < -0.01 ? 'Softening' : 'Linear');
                            viz.screenText('Duffing: \u03b5 = ' + epsilon.toFixed(2) + ' (' + label + ')', viz.width / 2, viz.height - 12, viz.colors.white, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the energy \\(E = \\frac{1}{2}\\dot{x}^2 + \\frac{1}{2}x^2 + \\frac{1}{4}\\epsilon x^4\\) is conserved for the Duffing equation \\(\\ddot{x} + x + \\epsilon x^3 = 0\\).',
                    hint: 'Compute \\(dE/dt\\) and use the equation of motion.',
                    solution: '\\(\\frac{dE}{dt} = \\dot{x}\\ddot{x} + x\\dot{x} + \\epsilon x^3\\dot{x} = \\dot{x}(\\ddot{x} + x + \\epsilon x^3) = 0\\) by the equation of motion.'
                },
                {
                    question: 'For the Duffing oscillator with \\(\\epsilon < 0\\), find the equilibrium points and classify their stability.',
                    hint: 'Set \\(\\ddot{x} = 0\\) and \\(\\dot{x} = 0\\). The equilibria satisfy \\(x + \\epsilon x^3 = 0\\), i.e., \\(x(1 + \\epsilon x^2) = 0\\).',
                    solution: 'For \\(\\epsilon < 0\\): three equilibria at \\(x = 0\\) and \\(x = \\pm 1/\\sqrt{|\\epsilon|}\\). Linearizing \\(f(x) = -x - \\epsilon x^3\\): \\(f\'(x) = -1 - 3\\epsilon x^2\\). At \\(x = 0\\): \\(f\' = -1 < 0\\) (center/stable). At \\(x = \\pm 1/\\sqrt{|\\epsilon|}\\): \\(f\' = -1 + 3 = 2 > 0\\) (saddle points). The phase portrait shows a separatrix connecting the saddle points.'
                },
                {
                    question: 'The equation \\(y\'\' + (\\lambda - x^2)y = 0\\) is the quantum harmonic oscillator. Use the WKB condition \\(\\int_{-\\sqrt{\\lambda}}^{\\sqrt{\\lambda}} \\sqrt{\\lambda - x^2}\\,dx = (n + \\tfrac{1}{2})\\pi\\) to find the approximate eigenvalues.',
                    hint: 'The integral is \\(\\frac{\\pi\\lambda}{2}\\) (area of a semicircle of radius \\(\\sqrt{\\lambda}\\)).',
                    solution: '\\(\\int_{-\\sqrt{\\lambda}}^{\\sqrt{\\lambda}}\\sqrt{\\lambda - x^2}\\,dx = \\frac{\\pi\\lambda}{2}\\). Setting \\(\\frac{\\pi\\lambda}{2} = (n + \\frac{1}{2})\\pi\\) gives \\(\\lambda_n = 2n + 1\\), which are the exact eigenvalues. The WKB approximation is exact for the harmonic oscillator.'
                }
            ]
        }
    ]
});
