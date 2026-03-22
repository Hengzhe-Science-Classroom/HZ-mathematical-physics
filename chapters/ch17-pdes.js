// === Chapter 17: PDEs of Mathematical Physics ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'PDEs of Mathematical Physics',
    subtitle: 'Heat, wave, Laplace, and Schrödinger equations',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why PDEs Rule Physics
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why PDEs Rule Physics',
            content: `
<h2>Why PDEs Rule Physics</h2>

<div class="env-block intuition">
    <div class="env-title">From ODEs to PDEs</div>
    <div class="env-body">
        <p>In earlier chapters, we studied ODEs: equations involving functions of <em>one</em> variable. But physical quantities, such as temperature in a rod, displacement of a membrane, or the quantum wave function, depend on both <strong>space</strong> and <strong>time</strong>. The moment a quantity depends on more than one independent variable, its governing equation becomes a <strong>partial differential equation</strong> (PDE).</p>
    </div>
</div>

<p>A partial differential equation relates a function \\(u(x_1, \\ldots, x_n)\\) to its partial derivatives. The <strong>order</strong> of the PDE is the highest-order partial derivative that appears. Almost every fundamental law of physics, when expressed locally, takes the form of a PDE.</p>

<h3>The Big Three</h3>

<p>Three second-order linear PDEs dominate mathematical physics. Each models a fundamentally different physical process:</p>

<div class="env-block definition">
    <div class="env-title">The Three Classical PDEs</div>
    <div class="env-body">
        <p><strong>Heat (diffusion) equation</strong> (parabolic):
        \\[\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u\\]</p>
        <p><strong>Wave equation</strong> (hyperbolic):
        \\[\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u\\]</p>
        <p><strong>Laplace equation</strong> (elliptic):
        \\[\\nabla^2 u = 0\\]</p>
    </div>
</div>

<h3>Classification by Discriminant</h3>

<p>A general second-order linear PDE in two variables has the form</p>
\\[A\\frac{\\partial^2 u}{\\partial x^2} + 2B\\frac{\\partial^2 u}{\\partial x \\partial y} + C\\frac{\\partial^2 u}{\\partial y^2} + \\text{(lower order)} = 0.\\]

<p>Just as the sign of \\(b^2 - 4ac\\) classifies conic sections, the discriminant \\(\\Delta = B^2 - AC\\) classifies PDEs:</p>

<div class="env-block theorem">
    <div class="env-title">Classification of Second-Order PDEs</div>
    <div class="env-body">
        <ul>
            <li><strong>Elliptic</strong> (\\(\\Delta < 0\\)): Laplace/Poisson type. Boundary value problems; smooth solutions.</li>
            <li><strong>Parabolic</strong> (\\(\\Delta = 0\\)): Heat/diffusion type. Initial-boundary value problems; smoothing effect.</li>
            <li><strong>Hyperbolic</strong> (\\(\\Delta > 0\\)): Wave type. Initial value problems; finite propagation speed.</li>
        </ul>
    </div>
</div>

<p>This classification has deep physical content: elliptic equations describe equilibria, parabolic equations describe diffusion and irreversible relaxation, and hyperbolic equations describe wave propagation with causality.</p>

<h3>Well-Posedness: Hadamard's Criteria</h3>

<div class="env-block definition">
    <div class="env-title">Well-Posed Problem (Hadamard, 1902)</div>
    <div class="env-body">
        <p>A PDE problem is <strong>well-posed</strong> if:</p>
        <ol>
            <li><strong>Existence</strong>: A solution exists.</li>
            <li><strong>Uniqueness</strong>: The solution is unique.</li>
            <li><strong>Stability</strong>: The solution depends continuously on the data.</li>
        </ol>
        <p>Each PDE type requires specific boundary/initial conditions to be well-posed. Imposing the wrong conditions leads to instability or non-existence.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physical Interpretation</div>
    <div class="env-body">
        <p>Well-posedness is not just mathematics; it reflects physics. The heat equation requires an initial temperature distribution and boundary conditions (insulated, held at fixed temperature, etc.). The wave equation requires both an initial displacement and an initial velocity. The Laplace equation requires only boundary values, since it describes a timeless equilibrium.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-classification"></div>
`,
            visualizations: [
                {
                    id: 'viz-classification',
                    title: 'PDE Classification: Elliptic, Parabolic, Hyperbolic',
                    description: 'Adjust coefficients A, B, C to see how the discriminant \\(\\Delta = B^2 - AC\\) classifies the PDE. The characteristic curves (real for hyperbolic, degenerate for parabolic, none for elliptic) are shown.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 50
                        });

                        var A = 1, B = 0, C = 1;

                        VizEngine.createSlider(controls, 'A', -3, 3, A, 0.1, function(v) { A = v; draw(); });
                        VizEngine.createSlider(controls, 'B', -3, 3, B, 0.1, function(v) { B = v; draw(); });
                        VizEngine.createSlider(controls, 'C', -3, 3, C, 0.1, function(v) { C = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var disc = B * B - A * C;

                            // Determine type
                            var type, color;
                            if (Math.abs(disc) < 0.05) {
                                type = 'Parabolic'; color = viz.colors.orange;
                            } else if (disc < 0) {
                                type = 'Elliptic'; color = viz.colors.blue;
                            } else {
                                type = 'Hyperbolic'; color = viz.colors.red;
                            }

                            // Draw coordinate grid
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw characteristic directions for hyperbolic case
                            if (disc > 0.05) {
                                var sqrtDisc = Math.sqrt(disc);
                                // Characteristic slopes: dy/dx = (B +/- sqrt(disc)) / A if A != 0
                                if (Math.abs(A) > 0.01) {
                                    var m1 = (B + sqrtDisc) / A;
                                    var m2 = (B - sqrtDisc) / A;
                                    // Draw characteristic lines through origin
                                    for (var k = -3; k <= 3; k++) {
                                        viz.drawSegment(-5, -5 * m1 + k, 5, 5 * m1 + k, viz.colors.red + '66', 1.5);
                                        viz.drawSegment(-5, -5 * m2 + k, 5, 5 * m2 + k, viz.colors.orange + '66', 1.5);
                                    }
                                }
                            }

                            // For parabolic, draw single family of characteristics
                            if (Math.abs(disc) < 0.05 && Math.abs(A) > 0.01) {
                                var m = B / A;
                                for (var k2 = -3; k2 <= 3; k2++) {
                                    viz.drawSegment(-5, -5 * m + k2, 5, 5 * m + k2, viz.colors.orange + '88', 2);
                                }
                            }

                            // Draw the conic Ax^2 + 2Bxy + Cy^2 = 1 (if bounded)
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var th = 0; th <= 2 * Math.PI + 0.02; th += 0.02) {
                                var cosT = Math.cos(th), sinT = Math.sin(th);
                                var val = A * cosT * cosT + 2 * B * cosT * sinT + C * sinT * sinT;
                                if (val > 0.01) {
                                    var r = 1.0 / Math.sqrt(val);
                                    var px = r * cosT, py = r * sinT;
                                    var sp = viz.toScreen(px, py);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                            }
                            ctx.stroke();

                            // Labels
                            viz.screenText(type, viz.width / 2, 25, color, 18);
                            viz.screenText(
                                'Delta = B² - AC = ' + disc.toFixed(2),
                                viz.width / 2, 50, viz.colors.text, 13
                            );

                            // Equation
                            viz.screenText(
                                A.toFixed(1) + ' u_xx + ' + (2*B).toFixed(1) + ' u_xy + ' + C.toFixed(1) + ' u_yy + ... = 0',
                                viz.width / 2, viz.height - 20, viz.colors.white, 12
                            );

                            // Physical examples
                            var examples = {
                                'Elliptic': 'Laplace, Poisson (equilibrium)',
                                'Parabolic': 'Heat, diffusion (relaxation)',
                                'Hyperbolic': 'Wave, vibration (propagation)'
                            };
                            viz.screenText(examples[type], viz.width / 2, viz.height - 40, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Heat Equation
        // ================================================================
        {
            id: 'sec-heat',
            title: 'Heat Equation',
            content: `
<h2>The Heat Equation</h2>

<div class="env-block intuition">
    <div class="env-title">Diffusion Smooths Everything</div>
    <div class="env-body">
        <p>Drop a blob of ink into still water. Over time, the sharp concentration spike spreads out and flattens. Heat does the same: a localized hot spot cools while warming its surroundings. The heat equation captures this smoothing mathematically: the rate of temperature change at a point is proportional to the <em>curvature</em> of the temperature profile there.</p>
    </div>
</div>

<h3>Derivation from Fourier's Law</h3>

<p>Consider a thin rod of length \\(L\\) with temperature \\(u(x,t)\\). <strong>Fourier's law</strong> states that heat flux is proportional to the negative temperature gradient:</p>
\\[q = -\\kappa \\frac{\\partial u}{\\partial x}\\]
<p>where \\(\\kappa\\) is the thermal conductivity. Conservation of energy in a small element \\([x, x+dx]\\) gives</p>
\\[\\rho c_p \\frac{\\partial u}{\\partial t} dx = \\kappa \\frac{\\partial^2 u}{\\partial x^2} dx\\]
<p>yielding the <strong>heat equation</strong>:</p>

<div class="env-block theorem">
    <div class="env-title">The 1D Heat Equation</div>
    <div class="env-body">
        \\[\\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}, \\quad \\alpha = \\frac{\\kappa}{\\rho c_p}\\]
        <p>where \\(\\alpha\\) is the <strong>thermal diffusivity</strong> (units: m²/s).</p>
    </div>
</div>

<h3>Separation of Variables</h3>

<p>For a rod of length \\(L\\) with boundary conditions \\(u(0,t) = u(L,t) = 0\\), we seek solutions of the form \\(u(x,t) = X(x)T(t)\\). Substituting:</p>
\\[X T' = \\alpha X'' T \\quad \\Rightarrow \\quad \\frac{T'}{\\alpha T} = \\frac{X''}{X} = -\\lambda\\]

<p>The spatial equation \\(X'' + \\lambda X = 0\\) with \\(X(0) = X(L) = 0\\) has the eigenvalues and eigenfunctions</p>
\\[\\lambda_n = \\left(\\frac{n\\pi}{L}\\right)^2, \\quad X_n(x) = \\sin\\left(\\frac{n\\pi x}{L}\\right), \\quad n = 1, 2, 3, \\ldots\\]

<p>The temporal equation gives \\(T_n(t) = e^{-\\alpha \\lambda_n t}\\), so the general solution is the <strong>Fourier sine series</strong>:</p>

<div class="env-block theorem">
    <div class="env-title">Fourier Solution of the Heat Equation</div>
    <div class="env-body">
        \\[u(x,t) = \\sum_{n=1}^{\\infty} b_n \\sin\\left(\\frac{n\\pi x}{L}\\right) e^{-\\alpha(n\\pi/L)^2 t}\\]
        <p>where the coefficients are determined by the initial condition \\(u(x,0) = f(x)\\):</p>
        \\[b_n = \\frac{2}{L} \\int_0^L f(x) \\sin\\left(\\frac{n\\pi x}{L}\\right) dx.\\]
    </div>
</div>

<h3>Key Properties</h3>

<div class="env-block remark">
    <div class="env-title">Physics of the Solution</div>
    <div class="env-body">
        <ul>
            <li><strong>Exponential decay</strong>: Each mode decays as \\(e^{-\\alpha(n\\pi/L)^2 t}\\). Higher modes (shorter wavelengths) decay <em>much faster</em> because the exponent scales as \\(n^2\\).</li>
            <li><strong>Smoothing</strong>: The rapid decay of high-frequency components means the solution becomes smoother as \\(t\\) increases, regardless of how rough the initial condition was.</li>
            <li><strong>Irreversibility</strong>: You cannot run the heat equation backwards in time (the exponentials would blow up). This reflects the second law of thermodynamics.</li>
            <li><strong>Infinite propagation speed</strong>: Any perturbation is instantly felt everywhere (though exponentially small at large distances). This is an artifact of the continuum approximation.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-heat-diffusion"></div>
`,
            visualizations: [
                {
                    id: 'viz-heat-diffusion',
                    title: 'Heat Diffusion on a Rod',
                    description: 'Watch a 1D temperature profile evolve under the heat equation. The initial condition is a sum of Fourier sine modes. Higher modes decay faster, leaving only the fundamental at late times. Adjust the diffusivity and initial shape.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 60, originY: 300, scale: 1
                        });

                        var alpha = 0.5;
                        var initType = 0; // 0=step, 1=triangle, 2=sine
                        var nModes = 40;
                        var L = 1.0;
                        var plotW = 440, plotH = 240;
                        var plotX0 = 80, plotY0 = 40;

                        VizEngine.createSlider(controls, 'Diffusivity alpha', 0.1, 2.0, alpha, 0.1, function(v) {
                            alpha = v; computeCoeffs(); time = 0;
                        });

                        var initBtn = VizEngine.createButton(controls, 'Initial: Step', function() {
                            initType = (initType + 1) % 3;
                            var names = ['Step', 'Triangle', 'Delta-like'];
                            initBtn.textContent = 'Initial: ' + names[initType];
                            computeCoeffs(); time = 0;
                        });

                        var bn = [];
                        function computeCoeffs() {
                            bn = [];
                            for (var n = 1; n <= nModes; n++) {
                                var val = 0;
                                if (initType === 0) {
                                    // Step function: u(x,0) = 1 for 0.25 < x < 0.75
                                    // b_n = (2/L) integral of sin(n*pi*x/L) from 0.25 to 0.75
                                    val = (2 / (n * Math.PI)) * (Math.cos(n * Math.PI * 0.25) - Math.cos(n * Math.PI * 0.75));
                                } else if (initType === 1) {
                                    // Triangle: peaks at x = 0.5
                                    // b_n = (8/(n^2 pi^2)) sin(n*pi/2)
                                    val = (8 / (n * n * Math.PI * Math.PI)) * Math.sin(n * Math.PI / 2);
                                } else {
                                    // Sharp peak (approximate delta at x=0.5)
                                    // b_n = 2 sin(n*pi*0.5)
                                    val = 2 * Math.sin(n * Math.PI * 0.5);
                                }
                                bn.push(val);
                            }
                        }
                        computeCoeffs();

                        function evalU(x, t) {
                            var sum = 0;
                            for (var n = 1; n <= nModes; n++) {
                                sum += bn[n-1] * Math.sin(n * Math.PI * x / L) * Math.exp(-alpha * (n * Math.PI / L) * (n * Math.PI / L) * t);
                            }
                            return sum;
                        }

                        var time = 0;
                        var speed = 0.003;

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;
                            time += speed;
                            if (time > 2.0) time = 0;

                            // Draw plot background
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX0, plotY0, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(plotX0, plotY0, plotW, plotH);

                            // Axis labels
                            viz.screenText('x', plotX0 + plotW / 2, plotY0 + plotH + 25, viz.colors.text, 12);
                            viz.screenText('u(x,t)', plotX0 - 30, plotY0 + plotH / 2, viz.colors.text, 11);

                            // Ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var xt = 0; xt <= 1.0; xt += 0.25) {
                                var px = plotX0 + xt * plotW;
                                ctx.fillText(xt.toFixed(2), px, plotY0 + plotH + 4);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.beginPath(); ctx.moveTo(px, plotY0); ctx.lineTo(px, plotY0 + plotH); ctx.stroke();
                            }

                            // Find max for scaling
                            var uMax = 0;
                            for (var ix = 0; ix <= 100; ix++) {
                                var xv = ix / 100.0;
                                var uv = Math.abs(evalU(xv, 0));
                                if (uv > uMax) uMax = uv;
                            }
                            if (uMax < 0.5) uMax = 0.5;
                            uMax *= 1.1;

                            // Draw initial condition (ghost)
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i0 = 0; i0 <= 200; i0++) {
                                var x0 = i0 / 200.0;
                                var u0 = evalU(x0, 0);
                                var sx0 = plotX0 + x0 * plotW;
                                var sy0 = plotY0 + plotH - (u0 / uMax) * plotH;
                                if (i0 === 0) ctx.moveTo(sx0, sy0); else ctx.lineTo(sx0, sy0);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw current solution
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var x = i / 200.0;
                                var u = evalU(x, time);
                                var sx = plotX0 + x * plotW;
                                var sy = plotY0 + plotH - (u / uMax) * plotH;
                                sy = Math.max(plotY0, Math.min(plotY0 + plotH, sy));
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Time display
                            viz.screenText('t = ' + time.toFixed(3), plotX0 + plotW - 60, plotY0 + 15, viz.colors.teal, 13);
                            viz.screenText('Heat Equation: du/dt = alpha * d²u/dx²', viz.width / 2, plotY0 + plotH + 45, viz.colors.white, 13);

                            // Show mode amplitudes
                            var barX0 = plotX0 + plotW + 20;
                            if (barX0 + 60 < viz.width) {
                                viz.screenText('Modes', barX0 + 20, plotY0, viz.colors.text, 10);
                                for (var m = 0; m < Math.min(8, nModes); m++) {
                                    var amp = Math.abs(bn[m] * Math.exp(-alpha * ((m+1) * Math.PI / L) * ((m+1) * Math.PI / L) * time));
                                    var barH = Math.min(25, amp / uMax * 25);
                                    var by = plotY0 + 15 + m * 28;
                                    ctx.fillStyle = viz.colors.blue + '88';
                                    ctx.fillRect(barX0, by, barH * 2, 12);
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('n=' + (m+1), barX0 + barH * 2 + 4, by + 9);
                                }
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the heat equation \\(u_t = \\alpha u_{xx}\\) on \\([0, L]\\) with \\(u(0,t) = u(L,t) = 0\\) and initial condition \\(u(x,0) = \\sin(3\\pi x / L)\\). Find the solution \\(u(x,t)\\).',
                    hint: 'The initial condition is already a single eigenfunction. What is its time evolution?',
                    solution: 'Since \\(u(x,0) = \\sin(3\\pi x/L)\\) is the \\(n=3\\) eigenfunction, the solution is simply \\[u(x,t) = \\sin\\left(\\frac{3\\pi x}{L}\\right) e^{-\\alpha(3\\pi/L)^2 t}.\\] Only one Fourier coefficient is nonzero: \\(b_3 = 1\\), all others are zero.'
                },
                {
                    question: 'Show that the "energy" \\(E(t) = \\int_0^L u^2(x,t)\\,dx\\) is a decreasing function of time for the heat equation with zero boundary conditions.',
                    hint: 'Differentiate \\(E(t)\\) under the integral sign, use the PDE to replace \\(u_t\\), and integrate by parts.',
                    solution: '\\(E\'(t) = 2\\int_0^L u \\cdot u_t\\,dx = 2\\alpha \\int_0^L u \\cdot u_{xx}\\,dx\\). Integration by parts gives \\(= 2\\alpha [u \\cdot u_x]_0^L - 2\\alpha \\int_0^L u_x^2\\,dx = -2\\alpha \\int_0^L u_x^2\\,dx \\leq 0\\). So \\(E(t)\\) is non-increasing, with equality only if \\(u_x \\equiv 0\\), i.e., \\(u \\equiv 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Wave Equation
        // ================================================================
        {
            id: 'sec-wave',
            title: 'Wave Equation',
            content: `
<h2>The Wave Equation</h2>

<div class="env-block intuition">
    <div class="env-title">Vibrations, Not Diffusion</div>
    <div class="env-body">
        <p>Pluck a guitar string and it vibrates. Unlike heat, which diffuses and dies away, waves <em>propagate</em> and <em>oscillate</em>. The wave equation is second-order in time (acceleration, not velocity), which permits oscillatory solutions and a finite propagation speed.</p>
    </div>
</div>

<h3>Derivation from Newton's Second Law</h3>

<p>Consider a taut string of linear density \\(\\mu\\) under tension \\(T\\). For small transverse displacements \\(u(x,t)\\), Newton's second law on a small element gives:</p>

<div class="env-block theorem">
    <div class="env-title">The 1D Wave Equation</div>
    <div class="env-body">
        \\[\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}, \\quad c = \\sqrt{\\frac{T}{\\mu}}\\]
        <p>where \\(c\\) is the <strong>wave speed</strong>.</p>
    </div>
</div>

<h3>d'Alembert's Solution (Infinite String)</h3>

<p>For the initial value problem on \\(-\\infty < x < \\infty\\) with \\(u(x,0) = f(x)\\) and \\(u_t(x,0) = g(x)\\), d'Alembert's formula gives:</p>

<div class="env-block theorem">
    <div class="env-title">d'Alembert's Solution (1747)</div>
    <div class="env-body">
        \\[u(x,t) = \\frac{1}{2}\\bigl[f(x - ct) + f(x + ct)\\bigr] + \\frac{1}{2c}\\int_{x-ct}^{x+ct} g(s)\\,ds\\]
    </div>
</div>

<p>The solution splits the initial profile into two half-amplitude pulses traveling in opposite directions at speed \\(c\\). This factorization comes from rewriting the wave equation as</p>
\\[\\left(\\frac{\\partial}{\\partial t} - c\\frac{\\partial}{\\partial x}\\right)\\left(\\frac{\\partial}{\\partial t} + c\\frac{\\partial}{\\partial x}\\right)u = 0.\\]

<h3>Normal Modes (Finite String)</h3>

<p>For a string of length \\(L\\) fixed at both ends, separation of variables gives</p>
\\[u(x,t) = \\sum_{n=1}^{\\infty} \\sin\\left(\\frac{n\\pi x}{L}\\right) \\Bigl[A_n \\cos(\\omega_n t) + B_n \\sin(\\omega_n t)\\Bigr]\\]

<p>where the <strong>natural frequencies</strong> are</p>
\\[\\omega_n = \\frac{n\\pi c}{L}, \\quad n = 1, 2, 3, \\ldots\\]

<div class="env-block remark">
    <div class="env-title">The Harmonic Series in Music</div>
    <div class="env-body">
        <p>The frequencies \\(\\omega_n = n\\omega_1\\) form an integer harmonic series. The \\(n=1\\) mode is the fundamental; \\(n=2\\) is the first overtone (octave); \\(n=3\\) gives the musical fifth, etc. This is why strings produce "pleasant" tones: the overtones have simple frequency ratios, unlike drums (whose normal modes involve Bessel zeros, Ch. 11).</p>
    </div>
</div>

<h3>Contrast with the Heat Equation</h3>

<div class="env-block remark">
    <div class="env-title">Waves vs. Heat</div>
    <div class="env-body">
        <ul>
            <li><strong>Time dependence</strong>: Heat modes decay as \\(e^{-\\alpha \\lambda_n t}\\); wave modes oscillate as \\(\\cos(\\omega_n t)\\) or \\(\\sin(\\omega_n t)\\). No energy loss in the ideal wave equation.</li>
            <li><strong>Propagation speed</strong>: Finite (\\(c\\)) for waves; infinite for heat (an artifact).</li>
            <li><strong>Reversibility</strong>: The wave equation is time-reversible (\\(t \\to -t\\) is also a solution). The heat equation is not.</li>
            <li><strong>Initial conditions</strong>: Waves need two (\\(u\\) and \\(u_t\\)); heat needs one (\\(u\\)).</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-wave-propagation"></div>
`,
            visualizations: [
                {
                    id: 'viz-wave-propagation',
                    title: 'Vibrating String: Normal Modes',
                    description: 'Watch a vibrating string as a superposition of normal modes. Adjust the amplitudes of the first few harmonics and the wave speed to see how standing waves form.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 60, originY: 300, scale: 1
                        });

                        var c = 1.0;
                        var amps = [1.0, 0.0, 0.3, 0.0];
                        var L = 1.0;
                        var plotW = 440, plotH = 240;
                        var plotX0 = 60, plotY0 = 30;

                        VizEngine.createSlider(controls, 'Mode 1', 0, 1, amps[0], 0.1, function(v) { amps[0] = v; });
                        VizEngine.createSlider(controls, 'Mode 2', 0, 1, amps[1], 0.1, function(v) { amps[1] = v; });
                        VizEngine.createSlider(controls, 'Mode 3', 0, 1, amps[2], 0.1, function(v) { amps[2] = v; });
                        VizEngine.createSlider(controls, 'Mode 4', 0, 1, amps[3], 0.1, function(v) { amps[3] = v; });
                        VizEngine.createSlider(controls, 'Wave speed c', 0.2, 3, c, 0.1, function(v) { c = v; });

                        function evalU(x, t) {
                            var sum = 0;
                            for (var n = 0; n < amps.length; n++) {
                                var nn = n + 1;
                                var omega = nn * Math.PI * c / L;
                                sum += amps[n] * Math.sin(nn * Math.PI * x / L) * Math.cos(omega * t);
                            }
                            return sum;
                        }

                        var time = 0;

                        viz.animate(function(timestamp) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time = (timestamp || 0) / 1000.0;

                            // Plot area
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX0, plotY0, plotW, plotH);

                            // Zero line
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            var zeroY = plotY0 + plotH / 2;
                            ctx.beginPath(); ctx.moveTo(plotX0, zeroY); ctx.lineTo(plotX0 + plotW, zeroY); ctx.stroke();

                            // Fixed endpoints
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(plotX0, zeroY, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(plotX0 + plotW, zeroY, 5, 0, Math.PI * 2); ctx.fill();

                            // Find amplitude scale
                            var aMax = 0;
                            for (var k = 0; k < amps.length; k++) aMax += Math.abs(amps[k]);
                            if (aMax < 0.1) aMax = 0.1;
                            var scale = plotH * 0.4 / aMax;

                            // Draw individual modes (faint)
                            var modeColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple];
                            for (var m = 0; m < amps.length; m++) {
                                if (Math.abs(amps[m]) < 0.01) continue;
                                ctx.strokeStyle = modeColors[m] + '55';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var j = 0; j <= 200; j++) {
                                    var xm = j / 200.0;
                                    var nn = m + 1;
                                    var omega = nn * Math.PI * c / L;
                                    var um = amps[m] * Math.sin(nn * Math.PI * xm / L) * Math.cos(omega * time);
                                    var sxm = plotX0 + xm * plotW;
                                    var sym = zeroY - um * scale;
                                    if (j === 0) ctx.moveTo(sxm, sym); else ctx.lineTo(sxm, sym);
                                }
                                ctx.stroke();
                            }

                            // Draw total displacement
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var x = i / 200.0;
                                var u = evalU(x, time);
                                var sx = plotX0 + x * plotW;
                                var sy = zeroY - u * scale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Legend
                            var legY = plotY0 + plotH + 20;
                            for (var ml = 0; ml < amps.length; ml++) {
                                var lx = plotX0 + ml * 120;
                                ctx.fillStyle = modeColors[ml];
                                ctx.fillRect(lx, legY, 10, 10);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('n=' + (ml+1) + ' (omega=' + ((ml+1) * Math.PI * c / L).toFixed(1) + ')', lx + 14, legY + 9);
                            }

                            viz.screenText('Wave Equation: d²u/dt² = c² d²u/dx²', viz.width / 2, plotY0 + plotH + 45, viz.colors.white, 13);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A string of length \\(L = 1\\) is released from rest with initial shape \\(u(x,0) = x(1-x)\\). Find the Fourier sine coefficients \\(b_n\\).',
                    hint: 'Compute \\(b_n = 2\\int_0^1 x(1-x)\\sin(n\\pi x)\\,dx\\) by integration by parts (twice).',
                    solution: 'Integration by parts twice gives \\(b_n = \\frac{4}{n^3 \\pi^3}[1 - (-1)^n]\\). So \\(b_n = 0\\) for even \\(n\\), and \\(b_n = \\frac{8}{n^3\\pi^3}\\) for odd \\(n\\). The rapid \\(n^{-3}\\) decay reflects the smoothness of the parabolic initial shape.'
                },
                {
                    question: 'Use d\'Alembert\'s formula to find the solution for \\(u(x,0) = e^{-x^2}\\), \\(u_t(x,0) = 0\\) on the infinite line, with \\(c = 1\\).',
                    hint: 'With \\(g(x) = 0\\), the integral term vanishes.',
                    solution: 'Since \\(g = 0\\), d\'Alembert gives \\(u(x,t) = \\frac{1}{2}[e^{-(x-t)^2} + e^{-(x+t)^2}]\\). This is two Gaussian pulses, each with half the original amplitude, traveling in opposite directions at speed \\(c = 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Laplace and Poisson Equations
        // ================================================================
        {
            id: 'sec-laplace',
            title: 'Laplace & Poisson Equations',
            content: `
<h2>Laplace and Poisson Equations</h2>

<div class="env-block intuition">
    <div class="env-title">The Physics of Equilibrium</div>
    <div class="env-body">
        <p>Wait long enough and the temperature distribution in a body stops changing. What remains satisfies \\(\\nabla^2 u = 0\\): the Laplace equation. It says that the value of \\(u\\) at any point is the <em>average</em> of its values on any surrounding sphere. This mean-value property is why solutions are so smooth and why the equation appears everywhere: electrostatics, gravitational potential, steady-state fluid flow, conformal mapping.</p>
    </div>
</div>

<h3>The Equations</h3>

<div class="env-block definition">
    <div class="env-title">Laplace and Poisson Equations</div>
    <div class="env-body">
        <p><strong>Laplace equation</strong> (homogeneous): \\(\\nabla^2 u = 0\\). Solutions are called <strong>harmonic functions</strong>.</p>
        <p><strong>Poisson equation</strong> (with source): \\(\\nabla^2 u = -\\rho/\\epsilon_0\\). In electrostatics, \\(\\rho\\) is charge density and \\(u\\) is the electric potential.</p>
    </div>
</div>

<h3>Boundary Conditions</h3>

<p>The Laplace equation is elliptic, requiring boundary conditions (not initial conditions):</p>
<ul>
    <li><strong>Dirichlet</strong>: \\(u\\) specified on the boundary (temperature held fixed).</li>
    <li><strong>Neumann</strong>: \\(\\partial u/\\partial n\\) specified on the boundary (heat flux fixed; insulation means \\(\\partial u/\\partial n = 0\\)).</li>
    <li><strong>Robin (mixed)</strong>: \\(\\alpha u + \\beta \\partial u/\\partial n = g\\) on the boundary (convective heat transfer).</li>
</ul>

<h3>Solution in a Rectangle</h3>

<p>Consider \\(\\nabla^2 u = 0\\) on \\([0,a] \\times [0,b]\\) with \\(u = 0\\) on three sides and \\(u(x, b) = f(x)\\). Separation of variables \\(u = X(x)Y(y)\\) gives:</p>
\\[X'' + \\lambda X = 0, \\quad Y'' - \\lambda Y = 0.\\]

<p>The solution satisfying the homogeneous boundary conditions is:</p>
<div class="env-block theorem">
    <div class="env-title">Laplace Solution on a Rectangle</div>
    <div class="env-body">
        \\[u(x,y) = \\sum_{n=1}^{\\infty} c_n \\sin\\left(\\frac{n\\pi x}{a}\\right) \\frac{\\sinh(n\\pi y/a)}{\\sinh(n\\pi b/a)}\\]
        <p>where \\(c_n = \\frac{2}{a}\\int_0^a f(x)\\sin(n\\pi x/a)\\,dx\\).</p>
    </div>
</div>

<h3>Key Properties of Harmonic Functions</h3>

<div class="env-block theorem">
    <div class="env-title">Properties of Solutions to \\(\\nabla^2 u = 0\\)</div>
    <div class="env-body">
        <ol>
            <li><strong>Mean-value property</strong>: \\(u(\\mathbf{r}_0) = \\frac{1}{|S|}\\oint_S u\\,dS\\) for any sphere \\(S\\) centered at \\(\\mathbf{r}_0\\).</li>
            <li><strong>Maximum principle</strong>: A harmonic function attains its maximum and minimum on the boundary, never in the interior (unless constant).</li>
            <li><strong>Uniqueness</strong>: The Dirichlet problem has a unique solution.</li>
            <li><strong>Smoothness</strong>: Harmonic functions are infinitely differentiable (real-analytic) in the interior.</li>
        </ol>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Connection to Complex Analysis</div>
    <div class="env-body">
        <p>In 2D, harmonic functions are the real and imaginary parts of analytic (holomorphic) functions (Ch. 6). This connection makes conformal mapping a powerful tool for solving 2D Laplace problems.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-laplace-2d"></div>
`,
            visualizations: [
                {
                    id: 'viz-laplace-2d',
                    title: 'Steady-State Temperature (2D Laplace)',
                    description: 'A rectangular plate with the top edge held at a non-uniform temperature and the other three edges at zero. The heatmap shows the steady-state temperature \\(u(x,y)\\) solving \\(\\nabla^2 u = 0\\). Adjust the boundary condition on the top edge.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var topMode = 0; // 0 = sin, 1 = step, 2 = parabola
                        var nTerms = 30;
                        var a = 1.0, b = 1.0;
                        var plotX0 = 80, plotY0 = 30, plotW = 380, plotH = 300;

                        var modeBtn = VizEngine.createButton(controls, 'Top BC: sin(pi*x)', function() {
                            topMode = (topMode + 1) % 3;
                            var names = ['sin(pi*x)', 'Step', 'Parabola'];
                            modeBtn.textContent = 'Top BC: ' + names[topMode];
                            draw();
                        });

                        function getCoeffs() {
                            var cn = [];
                            for (var n = 1; n <= nTerms; n++) {
                                var val = 0;
                                if (topMode === 0) {
                                    // sin(pi*x/a) -> cn = delta_{n,1}
                                    val = (n === 1) ? 1.0 : 0.0;
                                } else if (topMode === 1) {
                                    // Step: f(x) = 1 for 0.25 < x < 0.75
                                    val = (2.0 / (n * Math.PI)) * (Math.cos(n * Math.PI * 0.25) - Math.cos(n * Math.PI * 0.75));
                                } else {
                                    // Parabola: f(x) = 4x(1-x)
                                    // 2*int_0^1 4x(1-x) sin(npi x) dx = 32/(n^3 pi^3) [1 - (-1)^n]
                                    val = (n % 2 === 0) ? 0 : 32.0 / (n * n * n * Math.PI * Math.PI * Math.PI) * 2;
                                }
                                cn.push(val);
                            }
                            return cn;
                        }

                        function evalU(x, y, cn) {
                            var sum = 0;
                            for (var n = 1; n <= nTerms; n++) {
                                if (Math.abs(cn[n-1]) < 1e-10) continue;
                                var sinhRatio = Math.sinh(n * Math.PI * y / a) / Math.sinh(n * Math.PI * b / a);
                                if (!isFinite(sinhRatio)) sinhRatio = 0;
                                sum += cn[n-1] * Math.sin(n * Math.PI * x / a) * sinhRatio;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cn = getCoeffs();

                            // Compute heatmap
                            var res = 2;
                            var nx = Math.floor(plotW / res), ny = Math.floor(plotH / res);
                            var vMin = Infinity, vMax = -Infinity;
                            var vals = new Float64Array(nx * ny);
                            for (var iy = 0; iy < ny; iy++) {
                                for (var ix = 0; ix < nx; ix++) {
                                    var x = (ix + 0.5) / nx;
                                    var y = (iy + 0.5) / ny;
                                    var v = evalU(x, y, cn);
                                    vals[iy * nx + ix] = v;
                                    if (v < vMin) vMin = v;
                                    if (v > vMax) vMax = v;
                                }
                            }
                            var range = vMax - vMin || 1;

                            // Draw heatmap
                            for (var iy2 = 0; iy2 < ny; iy2++) {
                                for (var ix2 = 0; ix2 < nx; ix2++) {
                                    var t = (vals[iy2 * nx + ix2] - vMin) / range;
                                    var rgb = VizEngine.colormapSample(t, 'inferno');
                                    ctx.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                                    // y=0 at bottom, y=b at top
                                    ctx.fillRect(plotX0 + ix2 * res, plotY0 + plotH - (iy2 + 1) * res, res, res);
                                }
                            }

                            // Draw contour lines (approximate)
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.lineWidth = 0.5;
                            var nContours = 8;
                            for (var ci = 1; ci < nContours; ci++) {
                                var level = vMin + ci * range / nContours;
                                for (var iy3 = 0; iy3 < ny - 1; iy3++) {
                                    for (var ix3 = 0; ix3 < nx - 1; ix3++) {
                                        var v00 = vals[iy3 * nx + ix3];
                                        var v10 = vals[iy3 * nx + ix3 + 1];
                                        var v01 = vals[(iy3 + 1) * nx + ix3];
                                        // Simple horizontal crossing
                                        if ((v00 - level) * (v10 - level) < 0) {
                                            var frac = (level - v00) / (v10 - v00);
                                            var px = plotX0 + (ix3 + frac) * res;
                                            var py = plotY0 + plotH - (iy3 + 0.5) * res;
                                            ctx.beginPath(); ctx.arc(px, py, 0.5, 0, Math.PI * 2); ctx.stroke();
                                        }
                                    }
                                }
                            }

                            // Border and labels
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(plotX0, plotY0, plotW, plotH);

                            // Boundary labels
                            viz.screenText('u = 0', plotX0 + plotW / 2, plotY0 + plotH + 15, viz.colors.text, 11);
                            viz.screenText('u = f(x)', plotX0 + plotW / 2, plotY0 - 10, viz.colors.teal, 12);
                            viz.screenText('u=0', plotX0 - 20, plotY0 + plotH / 2, viz.colors.text, 10);
                            viz.screenText('u=0', plotX0 + plotW + 18, plotY0 + plotH / 2, viz.colors.text, 10);

                            // Colorbar
                            var cbX = plotX0 + plotW + 40, cbW = 15, cbH = plotH;
                            for (var ci2 = 0; ci2 < cbH; ci2++) {
                                var t2 = ci2 / cbH;
                                var rgb2 = VizEngine.colormapSample(t2, 'inferno');
                                ctx.fillStyle = 'rgb(' + rgb2[0] + ',' + rgb2[1] + ',' + rgb2[2] + ')';
                                ctx.fillRect(cbX, plotY0 + plotH - ci2, cbW, 1);
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(vMax.toFixed(2), cbX + cbW + 4, plotY0 + 8);
                            ctx.fillText(vMin.toFixed(2), cbX + cbW + 4, plotY0 + plotH);

                            viz.screenText('Laplace: nabla^2 u = 0', viz.width / 2, plotY0 + plotH + 35, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the mean-value property for harmonic functions in 2D: if \\(\\nabla^2 u = 0\\), then \\(u(x_0, y_0) = \\frac{1}{2\\pi R}\\oint_{|\\mathbf{r} - \\mathbf{r}_0| = R} u\\,ds\\).',
                    hint: 'Apply Green\'s second identity to \\(u\\) and \\(\\ln|\\mathbf{r} - \\mathbf{r}_0|\\) on the annular region between a small circle of radius \\(\\epsilon\\) and the circle of radius \\(R\\).',
                    solution: 'Apply Green\'s second identity to \\(u\\) and \\(v = \\ln r\\) (fundamental solution of \\(\\nabla^2\\) in 2D) on the annulus \\(\\epsilon < |\\mathbf{r} - \\mathbf{r}_0| < R\\). Since \\(\\nabla^2 u = \\nabla^2 v = 0\\) in the annulus, the boundary terms give \\(\\frac{1}{2\\pi R}\\oint_{r=R} u\\,ds = \\frac{1}{2\\pi\\epsilon}\\oint_{r=\\epsilon} u\\,ds\\). As \\(\\epsilon \\to 0\\), the right side approaches \\(u(\\mathbf{r}_0)\\) by continuity.'
                },
                {
                    question: 'Use the maximum principle to prove uniqueness of the Dirichlet problem: if \\(\\nabla^2 u_1 = \\nabla^2 u_2 = 0\\) in \\(\\Omega\\) and \\(u_1 = u_2\\) on \\(\\partial\\Omega\\), then \\(u_1 = u_2\\) everywhere.',
                    hint: 'Consider \\(w = u_1 - u_2\\). What are the boundary values and interior extrema of \\(w\\)?',
                    solution: 'Let \\(w = u_1 - u_2\\). Then \\(\\nabla^2 w = 0\\) in \\(\\Omega\\) and \\(w = 0\\) on \\(\\partial\\Omega\\). By the maximum principle, \\(w\\) attains its max and min on \\(\\partial\\Omega\\), where \\(w = 0\\). So \\(0 \\leq w \\leq 0\\), i.e., \\(w \\equiv 0\\) and \\(u_1 = u_2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Schrödinger Equation
        // ================================================================
        {
            id: 'sec-schrodinger',
            title: 'Schrödinger Equation',
            content: `
<h2>The Schrödinger Equation</h2>

<div class="env-block intuition">
    <div class="env-title">From Classical Waves to Quantum Mechanics</div>
    <div class="env-body">
        <p>De Broglie's relation \\(p = \\hbar k\\) and Einstein's \\(E = \\hbar \\omega\\) suggest that quantum particles behave like waves. Schrödinger's great insight (1926) was to write down the wave equation governing these "matter waves," using the classical energy relation \\(E = p^2/2m + V\\) as a guide.</p>
    </div>
</div>

<h3>The Time-Dependent Schrödinger Equation</h3>

<p>Replacing \\(E \\to i\\hbar \\partial/\\partial t\\) and \\(p \\to -i\\hbar \\nabla\\) in the classical Hamiltonian \\(H = p^2/2m + V\\):</p>

<div class="env-block theorem">
    <div class="env-title">Time-Dependent Schrödinger Equation</div>
    <div class="env-body">
        \\[i\\hbar \\frac{\\partial \\Psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\nabla^2 \\Psi + V(\\mathbf{r})\\Psi\\]
        <p>where \\(\\Psi(\\mathbf{r}, t)\\) is the complex-valued <strong>wave function</strong> and \\(|\\Psi|^2\\) gives the probability density.</p>
    </div>
</div>

<p>Note the crucial difference from the classical wave equation: the Schrödinger equation is <strong>first-order in time</strong> and involves \\(i\\), making it a parabolic-type equation in disguise, but with complex coefficients that produce oscillation rather than decay.</p>

<h3>Stationary States and the Time-Independent Equation</h3>

<p>Separating \\(\\Psi(\\mathbf{r}, t) = \\psi(\\mathbf{r})e^{-iEt/\\hbar}\\) gives the <strong>time-independent</strong> Schrödinger equation, an eigenvalue problem:</p>

<div class="env-block theorem">
    <div class="env-title">Time-Independent Schrödinger Equation</div>
    <div class="env-body">
        \\[-\\frac{\\hbar^2}{2m}\\nabla^2 \\psi + V(\\mathbf{r})\\psi = E\\psi\\]
        <p>This is a Sturm-Liouville problem (Ch. 9). The eigenvalues \\(E_n\\) are the allowed energies; the eigenfunctions \\(\\psi_n\\) are the stationary states.</p>
    </div>
</div>

<h3>Particle in a Box</h3>

<p>The simplest quantum system: a particle of mass \\(m\\) confined to \\([0, L]\\) with \\(V = 0\\) inside and \\(V = \\infty\\) outside (infinite square well).</p>

<div class="env-block example">
    <div class="env-title">Infinite Square Well</div>
    <div class="env-body">
        <p>The eigenvalues and normalized eigenfunctions are:</p>
        \\[E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}, \\quad \\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right), \\quad n = 1, 2, 3, \\ldots\\]
        <p>These are identical to the wave equation normal modes! The key difference is the physics: here \\(|\\psi_n|^2\\) gives a <em>probability distribution</em>, and the energies \\(E_n \\propto n^2\\) are <strong>quantized</strong>.</p>
    </div>
</div>

<h3>The Hydrogen Atom</h3>

<p>In spherical coordinates with the Coulomb potential \\(V(r) = -e^2/(4\\pi\\epsilon_0 r)\\), separation of variables gives \\(\\psi_{nlm}(r,\\theta,\\phi) = R_{nl}(r) Y_l^m(\\theta,\\phi)\\), where \\(Y_l^m\\) are spherical harmonics (Ch. 12) and \\(R_{nl}\\) are associated Laguerre functions. The energy eigenvalues are:</p>
\\[E_n = -\\frac{13.6\\text{ eV}}{n^2}, \\quad n = 1, 2, 3, \\ldots\\]

<div class="env-block remark">
    <div class="env-title">PDEs Unify Quantum Mechanics</div>
    <div class="env-body">
        <p>The entire machinery of this course, from separation of variables (Ch. 8-9), to special functions (Bessel Ch. 11, Legendre/spherical harmonics Ch. 12), to Green's functions (Ch. 10), finds its most spectacular application in quantum mechanics. The Schrödinger equation is where all these tools converge.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-schrodinger"></div>
<div class="viz-placeholder" data-viz="viz-hydrogen"></div>
`,
            visualizations: [
                {
                    id: 'viz-schrodinger',
                    title: 'Particle in a Box: Quantum Wave Functions',
                    description: 'The stationary states of a particle in an infinite square well. The blue curve is \\(\\psi_n(x)\\); the shaded region is the probability density \\(|\\psi_n|^2\\). Watch the time evolution of a superposition state.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 60, originY: 300, scale: 1
                        });

                        var nState = 1;
                        var showSuper = false;
                        var plotW = 420, plotH = 260;
                        var plotX0 = 70, plotY0 = 30;

                        VizEngine.createSlider(controls, 'Quantum number n', 1, 8, nState, 1, function(v) {
                            nState = Math.round(v);
                        });

                        var superBtn = VizEngine.createButton(controls, 'Superposition: OFF', function() {
                            showSuper = !showSuper;
                            superBtn.textContent = 'Superposition: ' + (showSuper ? 'ON (n=1+2)' : 'OFF');
                        });

                        var L = 1.0;
                        var hbar = 1.0, m = 1.0;

                        function psi(x, n) {
                            return Math.sqrt(2 / L) * Math.sin(n * Math.PI * x / L);
                        }

                        function energy(n) {
                            return n * n * Math.PI * Math.PI * hbar * hbar / (2 * m * L * L);
                        }

                        var time = 0;

                        viz.animate(function(timestamp) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time = (timestamp || 0) / 1000.0;

                            // Plot area
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX0, plotY0, plotW, plotH);

                            // Potential walls
                            ctx.fillStyle = viz.colors.text + '33';
                            ctx.fillRect(plotX0 - 10, plotY0, 10, plotH);
                            ctx.fillRect(plotX0 + plotW, plotY0, 10, plotH);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('V=inf', plotX0 - 5, plotY0 - 5);
                            ctx.fillText('V=inf', plotX0 + plotW + 5, plotY0 - 5);

                            var zeroY = plotY0 + plotH * 0.65;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(plotX0, zeroY); ctx.lineTo(plotX0 + plotW, zeroY); ctx.stroke();

                            var scale = plotH * 0.28;

                            if (!showSuper) {
                                // Draw |psi|^2 shaded
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.beginPath();
                                ctx.moveTo(plotX0, zeroY);
                                for (var i = 0; i <= 200; i++) {
                                    var x = i / 200.0;
                                    var p = psi(x, nState);
                                    var prob = p * p;
                                    ctx.lineTo(plotX0 + x * plotW, zeroY - prob * scale * L);
                                }
                                ctx.lineTo(plotX0 + plotW, zeroY);
                                ctx.closePath(); ctx.fill();

                                // Draw psi
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i2 = 0; i2 <= 200; i2++) {
                                    var x2 = i2 / 200.0;
                                    var p2 = psi(x2, nState);
                                    var sx = plotX0 + x2 * plotW;
                                    var sy = zeroY - p2 * scale * Math.sqrt(L) * 0.7;
                                    if (i2 === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();

                                // Energy level
                                var En = energy(nState);
                                viz.screenText(
                                    'n = ' + nState + '    E_n = ' + (nState * nState).toString() + ' * (pi^2 hbar^2 / 2mL^2)',
                                    viz.width / 2, plotY0 + plotH + 20, viz.colors.teal, 12
                                );

                                // Node count
                                viz.screenText(
                                    (nState - 1) + ' node' + (nState - 1 !== 1 ? 's' : '') + ' (zeros inside the box)',
                                    viz.width / 2, plotY0 + plotH + 40, viz.colors.text, 11
                                );
                            } else {
                                // Superposition: c1*psi1*exp(-iE1t) + c2*psi2*exp(-iE2t)
                                var E1 = energy(1), E2 = energy(2);
                                var omega = (E2 - E1) / hbar;
                                var c1 = 1 / Math.sqrt(2), c2 = 1 / Math.sqrt(2);

                                // Draw |Psi(x,t)|^2
                                ctx.fillStyle = viz.colors.purple + '33';
                                ctx.beginPath();
                                ctx.moveTo(plotX0, zeroY);
                                for (var j = 0; j <= 200; j++) {
                                    var xj = j / 200.0;
                                    var p1 = psi(xj, 1), p2s = psi(xj, 2);
                                    // Re part of c1*psi1*exp(-iE1t) + c2*psi2*exp(-iE2t)
                                    var reP = c1 * p1 * Math.cos(E1 * time / hbar) + c2 * p2s * Math.cos(E2 * time / hbar);
                                    var imP = -c1 * p1 * Math.sin(E1 * time / hbar) - c2 * p2s * Math.sin(E2 * time / hbar);
                                    var prob2 = reP * reP + imP * imP;
                                    ctx.lineTo(plotX0 + xj * plotW, zeroY - prob2 * scale * L);
                                }
                                ctx.lineTo(plotX0 + plotW, zeroY);
                                ctx.closePath(); ctx.fill();

                                // Draw Re(Psi)
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= 200; j2++) {
                                    var xj2 = j2 / 200.0;
                                    var pp1 = psi(xj2, 1), pp2 = psi(xj2, 2);
                                    var rePart = c1 * pp1 * Math.cos(E1 * time / hbar) + c2 * pp2 * Math.cos(E2 * time / hbar);
                                    var sxx = plotX0 + xj2 * plotW;
                                    var syy = zeroY - rePart * scale * Math.sqrt(L) * 0.7;
                                    if (j2 === 0) ctx.moveTo(sxx, syy); else ctx.lineTo(sxx, syy);
                                }
                                ctx.stroke();

                                viz.screenText(
                                    'Superposition: (psi_1 + psi_2)/sqrt(2)',
                                    viz.width / 2, plotY0 + plotH + 20, viz.colors.purple, 12
                                );
                                viz.screenText(
                                    'Probability sloshes at freq omega = (E2-E1)/hbar',
                                    viz.width / 2, plotY0 + plotH + 40, viz.colors.text, 11
                                );
                            }

                            // Title labels
                            viz.screenText('blue: psi(x)    shaded: |psi|^2', viz.width / 2, plotY0 + plotH + 55, viz.colors.text, 10);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-hydrogen',
                    title: 'Hydrogen Atom: Radial Wave Functions',
                    description: 'The radial wave functions \\(R_{nl}(r)\\) and radial probability densities \\(r^2|R_{nl}|^2\\) for the hydrogen atom. Select quantum numbers \\(n\\) and \\(l\\) to see how the wave function changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 80, originY: 300, scale: 1
                        });

                        var nQ = 2, lQ = 0;
                        var plotW = 420, plotH = 260;
                        var plotX0 = 80, plotY0 = 30;

                        VizEngine.createSlider(controls, 'n', 1, 4, nQ, 1, function(v) {
                            nQ = Math.round(v);
                            if (lQ >= nQ) lQ = nQ - 1;
                        });
                        VizEngine.createSlider(controls, 'l', 0, 3, lQ, 1, function(v) {
                            lQ = Math.round(v);
                            if (lQ >= nQ) lQ = nQ - 1;
                        });

                        // Hydrogen radial wave functions (in units of a0)
                        function radialR(n, l, r) {
                            // Simplified analytic forms for n=1..4
                            var rho = 2 * r / n;
                            if (n === 1 && l === 0) return 2 * Math.exp(-r);
                            if (n === 2 && l === 0) return (1 / (2 * Math.sqrt(2))) * (2 - r) * Math.exp(-r / 2);
                            if (n === 2 && l === 1) return (1 / (2 * Math.sqrt(6))) * r * Math.exp(-r / 2);
                            if (n === 3 && l === 0) return (2 / (81 * Math.sqrt(3))) * (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3);
                            if (n === 3 && l === 1) return (8 / (27 * Math.sqrt(6))) * (1 - r / 6) * r * Math.exp(-r / 3);
                            if (n === 3 && l === 2) return (4 / (81 * Math.sqrt(30))) * r * r * Math.exp(-r / 3);
                            if (n === 4 && l === 0) return (1 / 96) * (192 - 144 * r + 24 * r * r - r * r * r) * Math.exp(-r / 4) / Math.sqrt(1);
                            if (n === 4 && l === 1) return (1 / (32 * Math.sqrt(15))) * r * (80 - 20 * r + r * r) * Math.exp(-r / 4) / Math.sqrt(3);
                            if (n === 4 && l === 2) return (1 / (96 * Math.sqrt(5))) * r * r * (12 - r) * Math.exp(-r / 4);
                            if (n === 4 && l === 3) return (1 / (96 * Math.sqrt(35))) * r * r * r * Math.exp(-r / 4);
                            return 0;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ensure l < n
                            var l = Math.min(lQ, nQ - 1);

                            // Plot area
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX0, plotY0, plotW, plotH);

                            var rMax = nQ * nQ * 3 + 5;
                            var steps = 300;

                            // Find scaling
                            var maxR = 0, maxProb = 0;
                            for (var i = 0; i <= steps; i++) {
                                var r = (i / steps) * rMax;
                                var Rval = radialR(nQ, l, r);
                                maxR = Math.max(maxR, Math.abs(Rval));
                                maxProb = Math.max(maxProb, r * r * Rval * Rval);
                            }
                            if (maxR < 1e-6) maxR = 1;
                            if (maxProb < 1e-6) maxProb = 1;

                            var midY = plotY0 + plotH * 0.5;

                            // Draw R(r) (wave function)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= steps; i2++) {
                                var r2 = (i2 / steps) * rMax;
                                var R2 = radialR(nQ, l, r2);
                                var sx = plotX0 + (r2 / rMax) * plotW;
                                var sy = midY - (R2 / maxR) * plotH * 0.35;
                                if (i2 === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw r^2 |R(r)|^2 (probability density) - shaded
                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.beginPath();
                            ctx.moveTo(plotX0, midY);
                            for (var i3 = 0; i3 <= steps; i3++) {
                                var r3 = (i3 / steps) * rMax;
                                var R3 = radialR(nQ, l, r3);
                                var prob = r3 * r3 * R3 * R3;
                                var sx3 = plotX0 + (r3 / rMax) * plotW;
                                var sy3 = midY - (prob / maxProb) * plotH * 0.35;
                                ctx.lineTo(sx3, sy3);
                            }
                            ctx.lineTo(plotX0 + plotW, midY);
                            ctx.closePath(); ctx.fill();

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i4 = 0; i4 <= steps; i4++) {
                                var r4 = (i4 / steps) * rMax;
                                var R4 = radialR(nQ, l, r4);
                                var prob4 = r4 * r4 * R4 * R4;
                                var sx4 = plotX0 + (r4 / rMax) * plotW;
                                var sy4 = midY - (prob4 / maxProb) * plotH * 0.35;
                                if (i4 === 0) ctx.moveTo(sx4, sy4); else ctx.lineTo(sx4, sy4);
                            }
                            ctx.stroke();

                            // Zero line
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(plotX0, midY); ctx.lineTo(plotX0 + plotW, midY); ctx.stroke();

                            // Axes
                            viz.screenText('r / a_0', plotX0 + plotW / 2, plotY0 + plotH + 15, viz.colors.text, 12);

                            // Ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var tickStep = Math.max(1, Math.floor(rMax / 6));
                            for (var rt = 0; rt <= rMax; rt += tickStep) {
                                var tx = plotX0 + (rt / rMax) * plotW;
                                ctx.fillText(rt.toString(), tx, plotY0 + plotH + 4);
                            }

                            // Labels
                            viz.screenText(
                                'n = ' + nQ + ', l = ' + l + '    E_n = -13.6/' + (nQ * nQ) + ' eV = ' + (-13.6 / (nQ * nQ)).toFixed(2) + ' eV',
                                viz.width / 2, plotY0 + plotH + 35, viz.colors.teal, 12
                            );

                            // Legend
                            var legY2 = plotY0 + 15;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(plotX0 + 10, legY2, 12, 3);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('R_nl(r)', plotX0 + 26, legY2 + 4);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(plotX0 + 100, legY2, 12, 3);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('r^2 |R_nl|^2', plotX0 + 116, legY2 + 4);

                            // Number of radial nodes
                            var nodes = nQ - l - 1;
                            viz.screenText(
                                'Radial nodes: ' + nodes,
                                plotX0 + plotW - 60, legY2 + 4, viz.colors.text, 10
                            );
                        }

                        draw();
                        // Redraw on slider change via animation frame trick
                        var prevN = nQ, prevL = lQ;
                        viz.animate(function() {
                            var l = Math.min(lQ, nQ - 1);
                            if (nQ !== prevN || l !== prevL) {
                                prevN = nQ; prevL = l; lQ = l;
                                draw();
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the infinite square well, show that the eigenfunctions \\(\\psi_n(x) = \\sqrt{2/L}\\sin(n\\pi x/L)\\) are orthonormal: \\(\\int_0^L \\psi_m \\psi_n\\,dx = \\delta_{mn}\\).',
                    hint: 'Use the product-to-sum formula: \\(\\sin A \\sin B = \\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]\\).',
                    solution: '\\(\\int_0^L \\frac{2}{L}\\sin(m\\pi x/L)\\sin(n\\pi x/L)\\,dx = \\frac{1}{L}\\int_0^L [\\cos((m-n)\\pi x/L) - \\cos((m+n)\\pi x/L)]\\,dx\\). For \\(m \\neq n\\), both integrals of cosines over full periods vanish, giving 0. For \\(m = n\\), the first cosine becomes 1 and integrates to \\(L\\), while the second still vanishes, giving \\(1\\).'
                },
                {
                    question: 'A particle is in the state \\(\\Psi(x,0) = \\frac{1}{\\sqrt{2}}[\\psi_1(x) + \\psi_2(x)]\\). Find \\(\\langle x \\rangle(t)\\) and show the expectation value oscillates.',
                    hint: 'Compute \\(\\langle x \\rangle = \\int_0^L x|\\Psi(x,t)|^2 dx\\). The cross terms between \\(\\psi_1\\) and \\(\\psi_2\\) produce the time dependence.',
                    solution: 'With \\(\\Psi = \\frac{1}{\\sqrt{2}}[\\psi_1 e^{-iE_1 t/\\hbar} + \\psi_2 e^{-iE_2 t/\\hbar}]\\), \\(|\\Psi|^2 = \\frac{1}{2}[\\psi_1^2 + \\psi_2^2 + 2\\psi_1\\psi_2\\cos(\\omega_{21}t)]\\) where \\(\\omega_{21} = (E_2 - E_1)/\\hbar\\). The time-dependent part gives \\(\\langle x \\rangle(t) = \\frac{L}{2} - \\frac{16L}{9\\pi^2}\\cos(\\omega_{21}t)\\). The expectation value oscillates about the center with amplitude \\(\\frac{16L}{9\\pi^2} \\approx 0.18L\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: The Helmholtz Equation
        // ================================================================
        {
            id: 'sec-helmholtz',
            title: 'Helmholtz Equation',
            content: `
<h2>The Helmholtz Equation</h2>

<div class="env-block intuition">
    <div class="env-title">The Spatial Part of Every Wave</div>
    <div class="env-body">
        <p>Whenever you separate the time dependence from a wave equation (electromagnetic, acoustic, quantum), the spatial part satisfies the Helmholtz equation. It is the "universal eigenvalue equation for the Laplacian" and appears in waveguides, resonant cavities, scattering theory, and quantum bound states.</p>
    </div>
</div>

<h3>The Equation</h3>

<div class="env-block definition">
    <div class="env-title">Helmholtz Equation</div>
    <div class="env-body">
        \\[(\\nabla^2 + k^2)\\psi = 0\\]
        <p>where \\(k\\) is the <strong>wave number</strong>. This is the eigenvalue equation \\(-\\nabla^2 \\psi = k^2 \\psi\\).</p>
    </div>
</div>

<h3>Origin from Time-Harmonic Waves</h3>

<p>Starting from the wave equation \\(u_{tt} = c^2 \\nabla^2 u\\) and assuming time-harmonic solutions \\(u(\\mathbf{r}, t) = \\psi(\\mathbf{r})e^{-i\\omega t}\\):</p>
\\[-\\omega^2 \\psi = c^2 \\nabla^2 \\psi \\quad \\Rightarrow \\quad \\nabla^2 \\psi + k^2 \\psi = 0, \\quad k = \\omega/c.\\]

<h3>Waveguide Modes</h3>

<p>Consider a rectangular waveguide with cross-section \\([0, a] \\times [0, b]\\) and perfectly conducting walls. The transverse modes satisfy the 2D Helmholtz equation with Dirichlet boundary conditions:</p>
\\[\\psi_{mn}(x, y) = \\sin\\left(\\frac{m\\pi x}{a}\\right)\\sin\\left(\\frac{n\\pi y}{b}\\right)\\]
<p>with eigenvalues (cutoff wave numbers)</p>
\\[k_{mn}^2 = \\left(\\frac{m\\pi}{a}\\right)^2 + \\left(\\frac{n\\pi}{b}\\right)^2.\\]

<div class="env-block remark">
    <div class="env-title">Cutoff Frequencies</div>
    <div class="env-body">
        <p>A mode \\((m,n)\\) propagates only if \\(\\omega > c k_{mn}\\), i.e., the frequency exceeds the cutoff. Below cutoff, the mode is evanescent. This is why waveguides act as high-pass filters: only frequencies above the fundamental cutoff \\(k_{10}\\) (or \\(k_{01}\\)) can propagate.</p>
    </div>
</div>

<h3>Drumhead Vibrations</h3>

<p>A circular drumhead of radius \\(a\\) vibrating at frequency \\(\\omega\\) satisfies the Helmholtz equation in polar coordinates. The solutions involve <strong>Bessel functions</strong> (Ch. 11):</p>
\\[\\psi_{mn}(r, \\theta) = J_m(k_{mn}r)[A_m \\cos m\\theta + B_m \\sin m\\theta]\\]
<p>where \\(k_{mn} = j_{mn}/a\\) with \\(j_{mn}\\) the \\(n\\)-th zero of \\(J_m\\). Unlike the string, the eigenvalues \\(j_{mn}\\) are <em>not</em> equally spaced, which is why drums have an indefinite pitch compared to strings.</p>

<div class="viz-placeholder" data-viz="viz-helmholtz-modes"></div>
`,
            visualizations: [
                {
                    id: 'viz-helmholtz-modes',
                    title: 'Waveguide / Cavity Modes',
                    description: 'The standing wave patterns in a rectangular cavity. Select mode numbers \\(m\\) and \\(n\\) to see \\(\\sin(m\\pi x/a)\\sin(n\\pi y/b)\\). The color shows displacement (blue = negative, red = positive).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mMode = 1, nMode = 1;
                        var plotX0 = 80, plotY0 = 30, plotW = 350, plotH = 300;

                        VizEngine.createSlider(controls, 'm', 1, 6, mMode, 1, function(v) { mMode = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'n', 1, 6, nMode, 1, function(v) { nMode = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var res = 2;
                            var nx = Math.floor(plotW / res), ny = Math.floor(plotH / res);

                            for (var iy = 0; iy < ny; iy++) {
                                for (var ix = 0; ix < nx; ix++) {
                                    var x = (ix + 0.5) / nx;
                                    var y = (iy + 0.5) / ny;
                                    var val = Math.sin(mMode * Math.PI * x) * Math.sin(nMode * Math.PI * y);
                                    // Map [-1,1] to coolwarm
                                    var t = (val + 1) / 2;
                                    var rgb = VizEngine.colormapSample(t, 'coolwarm');
                                    ctx.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                                    ctx.fillRect(plotX0 + ix * res, plotY0 + ny * res - (iy + 1) * res, res, res);
                                }
                            }

                            // Draw nodal lines (where sin = 0)
                            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                            ctx.lineWidth = 1;
                            for (var mi = 1; mi < mMode; mi++) {
                                var xn = (mi / mMode) * plotW;
                                ctx.beginPath(); ctx.moveTo(plotX0 + xn, plotY0); ctx.lineTo(plotX0 + xn, plotY0 + plotH); ctx.stroke();
                            }
                            for (var ni = 1; ni < nMode; ni++) {
                                var yn = (ni / nMode) * plotH;
                                ctx.beginPath(); ctx.moveTo(plotX0, plotY0 + plotH - yn); ctx.lineTo(plotX0 + plotW, plotY0 + plotH - yn); ctx.stroke();
                            }

                            // Border
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(plotX0, plotY0, plotW, plotH);

                            // Eigenvalue info
                            var kSq = (mMode * Math.PI) * (mMode * Math.PI) + (nMode * Math.PI) * (nMode * Math.PI);
                            viz.screenText(
                                'Mode (' + mMode + ', ' + nMode + ')    k² = ' + (mMode * mMode) + 'pi²/a² + ' + (nMode * nMode) + 'pi²/b²',
                                viz.width / 2, plotY0 + plotH + 20, viz.colors.teal, 12
                            );

                            var nodalCount = (mMode - 1) + (nMode - 1);
                            viz.screenText(
                                'Nodal lines: ' + nodalCount + '    White lines = nodes (zero displacement)',
                                viz.width / 2, plotY0 + plotH + 40, viz.colors.text, 11
                            );

                            // Colorbar
                            var cbX = plotX0 + plotW + 30, cbW = 15, cbH = plotH;
                            for (var ci = 0; ci < cbH; ci++) {
                                var tc = ci / cbH;
                                var rgbc = VizEngine.colormapSample(tc, 'coolwarm');
                                ctx.fillStyle = 'rgb(' + rgbc[0] + ',' + rgbc[1] + ',' + rgbc[2] + ')';
                                ctx.fillRect(cbX, plotY0 + plotH - ci, cbW, 1);
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('+1', cbX + cbW + 4, plotY0 + 8);
                            ctx.fillText('0', cbX + cbW + 4, plotY0 + plotH / 2);
                            ctx.fillText('-1', cbX + cbW + 4, plotY0 + plotH);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the eigenvalues and eigenfunctions of \\(-\\nabla^2 \\psi = k^2 \\psi\\) on a square \\([0, \\pi] \\times [0, \\pi]\\) with \\(\\psi = 0\\) on all boundaries.',
                    hint: 'Separate variables: \\(\\psi(x,y) = X(x)Y(y)\\).',
                    solution: 'Separation gives \\(X_m(x) = \\sin(mx)\\), \\(Y_n(y) = \\sin(ny)\\), so \\(\\psi_{mn} = \\sin(mx)\\sin(ny)\\) with \\(k_{mn}^2 = m^2 + n^2\\). Note the degeneracies: \\(k_{12}^2 = k_{21}^2 = 5\\), \\(k_{13}^2 = k_{31}^2 = 10\\), etc.'
                },
                {
                    question: 'The mode \\((m,n) = (2,1)\\) and \\((1,2)\\) on a square have the same eigenvalue (degeneracy). Show that any linear combination \\(\\alpha \\psi_{21} + \\beta \\psi_{12}\\) is also an eigenfunction with the same eigenvalue.',
                    hint: 'The Helmholtz equation is linear.',
                    solution: 'If \\(\\nabla^2 \\psi_{21} = -5\\psi_{21}\\) and \\(\\nabla^2 \\psi_{12} = -5\\psi_{12}\\), then \\(\\nabla^2(\\alpha\\psi_{21} + \\beta\\psi_{12}) = -5(\\alpha\\psi_{21} + \\beta\\psi_{12})\\) by linearity. The boundary conditions are also satisfied by linearity (both vanish on the boundary). So any linear combination is an eigenfunction with \\(k^2 = 5\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What's Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Back and Forward',
            content: `
<h2>Looking Back and Forward</h2>

<div class="env-block intuition">
    <div class="env-title">Where All the Threads Meet</div>
    <div class="env-body">
        <p>This chapter is the capstone of Part F. Every tool we have built, from Fourier analysis (Ch. 14) and Laplace transforms (Ch. 15) to variational methods (Ch. 16), finds its natural application in solving PDEs. The special functions of Part E (Bessel, Legendre, Hermite) arise as eigenfunctions when we separate variables in different coordinate systems. Green's functions (Ch. 10) provide the most general solution framework.</p>
    </div>
</div>

<h3>The Toolbox in Action</h3>

<p>Every PDE solution method we have seen draws on earlier chapters:</p>

<table style="width:100%; border-collapse: collapse; margin: 1em 0;">
    <tr style="border-bottom: 1px solid #30363d;">
        <th style="text-align:left; padding:6px; color: var(--accent-blue);">Method</th>
        <th style="text-align:left; padding:6px; color: var(--accent-blue);">Origin</th>
        <th style="text-align:left; padding:6px; color: var(--accent-blue);">PDE Application</th>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Separation of variables</td>
        <td style="padding:6px;">Sturm-Liouville (Ch. 9)</td>
        <td style="padding:6px;">All classical PDEs in standard geometries</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Fourier series/transform</td>
        <td style="padding:6px;">Ch. 14</td>
        <td style="padding:6px;">Heat and wave on finite/infinite domains</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Laplace transform</td>
        <td style="padding:6px;">Ch. 15</td>
        <td style="padding:6px;">Initial value problems; transient response</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Green's functions</td>
        <td style="padding:6px;">Ch. 10</td>
        <td style="padding:6px;">Inhomogeneous PDEs; point sources</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Bessel functions</td>
        <td style="padding:6px;">Ch. 11</td>
        <td style="padding:6px;">Cylindrical geometry (waveguides, drums)</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Spherical harmonics</td>
        <td style="padding:6px;">Ch. 12</td>
        <td style="padding:6px;">Spherical geometry (hydrogen atom, multipoles)</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Variational methods</td>
        <td style="padding:6px;">Ch. 16</td>
        <td style="padding:6px;">Rayleigh-Ritz approximation; finite elements</td>
    </tr>
    <tr>
        <td style="padding:6px;">Conformal mapping</td>
        <td style="padding:6px;">Ch. 6-7</td>
        <td style="padding:6px;">2D Laplace in irregular domains</td>
    </tr>
</table>

<h3>PDE Classification Summary</h3>

<p>The three types of second-order PDEs, their physical character, and the appropriate boundary/initial conditions:</p>

<table style="width:100%; border-collapse: collapse; margin: 1em 0;">
    <tr style="border-bottom: 1px solid #30363d;">
        <th style="text-align:left; padding:6px; color: var(--accent-teal);">Type</th>
        <th style="text-align:left; padding:6px; color: var(--accent-teal);">Prototype</th>
        <th style="text-align:left; padding:6px; color: var(--accent-teal);">Physics</th>
        <th style="text-align:left; padding:6px; color: var(--accent-teal);">Conditions</th>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Elliptic</td>
        <td style="padding:6px;">\\(\\nabla^2 u = 0\\)</td>
        <td style="padding:6px;">Equilibrium</td>
        <td style="padding:6px;">Boundary values</td>
    </tr>
    <tr style="border-bottom: 1px solid #1a1a40;">
        <td style="padding:6px;">Parabolic</td>
        <td style="padding:6px;">\\(u_t = \\alpha \\nabla^2 u\\)</td>
        <td style="padding:6px;">Diffusion</td>
        <td style="padding:6px;">Initial + boundary</td>
    </tr>
    <tr>
        <td style="padding:6px;">Hyperbolic</td>
        <td style="padding:6px;">\\(u_{tt} = c^2 \\nabla^2 u\\)</td>
        <td style="padding:6px;">Waves</td>
        <td style="padding:6px;">Two initial + boundary</td>
    </tr>
</table>

<h3>Beyond the Classics</h3>

<p>The PDEs of this chapter are all <strong>linear</strong>. Modern physics is full of nonlinear PDEs:</p>
<ul>
    <li><strong>Navier-Stokes</strong> (fluid dynamics): the Clay Millennium Prize problem.</li>
    <li><strong>Einstein field equations</strong> (general relativity): a system of 10 coupled nonlinear PDEs.</li>
    <li><strong>Yang-Mills equations</strong> (gauge theory): another Millennium Prize problem.</li>
    <li><strong>Nonlinear Schrödinger</strong> (solitons, BEC): leads to the beautiful mathematics of integrable systems.</li>
</ul>

<p>The linear theory of this chapter is the foundation on which all these are built, through perturbation theory, linearization, and numerical methods (Ch. 19).</p>

<div class="env-block remark">
    <div class="env-title">The Physicist's Perspective</div>
    <div class="env-body">
        <p>A mathematician classifies PDEs. A physicist writes down the <em>right</em> PDE for a given physical situation and then uses every tool available to extract the physics from its solution. The classification matters because it tells you what questions are well-posed, what boundary conditions to impose, and what qualitative behavior to expect. It is the compass that guides the choice of method.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Classify the following PDE: \\(3u_{xx} + 4u_{xy} + u_{yy} + u_x = 0\\). What is the physical character of its solutions?',
                    hint: 'Compute \\(\\Delta = B^2 - AC\\) where the PDE is \\(Au_{xx} + 2Bu_{xy} + Cu_{yy} + \\ldots = 0\\).',
                    solution: 'Here \\(A = 3\\), \\(2B = 4\\) so \\(B = 2\\), \\(C = 1\\). \\(\\Delta = B^2 - AC = 4 - 3 = 1 > 0\\). The equation is <strong>hyperbolic</strong>, describing wave-like propagation with two families of real characteristic curves.'
                },
                {
                    question: 'The Telegrapher\'s equation \\(u_{tt} + au_t + bu = c^2 u_{xx}\\) models a lossy transmission line. By trying \\(u = e^{-\\gamma t} v\\), reduce this to a simpler PDE for \\(v\\). Under what condition does it become a pure wave equation?',
                    hint: 'Choose \\(\\gamma\\) to eliminate the \\(v_t\\) term.',
                    solution: 'Let \\(u = e^{-\\gamma t} v\\). Then \\(u_t = e^{-\\gamma t}(v_t - \\gamma v)\\) and \\(u_{tt} = e^{-\\gamma t}(v_{tt} - 2\\gamma v_t + \\gamma^2 v)\\). Substituting: \\(v_{tt} - 2\\gamma v_t + \\gamma^2 v + a(v_t - \\gamma v) + bv = c^2 v_{xx}\\). Setting the coefficient of \\(v_t\\) to zero: \\(-2\\gamma + a = 0\\), so \\(\\gamma = a/2\\). The \\(v\\) equation becomes \\(v_{tt} + (b + a^2/4 - a^2/2)v = c^2 v_{xx}\\), i.e., \\(v_{tt} = c^2 v_{xx} - (b - a^2/4)v\\). This is a pure wave equation when \\(b = a^2/4\\).'
                }
            ]
        }
    ]
});
