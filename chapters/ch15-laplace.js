// === Chapter 15: Laplace & Integral Transforms ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Laplace & Integral Transforms',
    subtitle: 'Transform methods for differential equations',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Transform?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Transform?',
            content: `
<h2>Why Transform?</h2>

<div class="env-block intuition">
    <div class="env-title">The Core Idea</div>
    <div class="env-body">
        <p>Solving a differential equation directly can be hard. But what if you could change the problem into algebra, solve it there, and then change back? That is the essence of every integral transform: convert calculus into multiplication, solve, invert.</p>
    </div>
</div>

<p>Consider a simple ODE with constant coefficients:</p>
\\[
y'' + 3y' + 2y = e^{-t}, \\quad y(0)=1,\\; y'(0)=0.
\\]

<p>Solving this directly requires finding the homogeneous solution, a particular solution, and matching initial conditions. The Laplace transform converts this into an algebraic equation in one step. Derivatives become polynomials in the transform variable \\(s\\), and the initial conditions are automatically incorporated.</p>

<h3>The General Pattern</h3>

<p>An <strong>integral transform</strong> maps a function \\(f(t)\\) to a new function \\(F(s)\\) via a kernel \\(K(s,t)\\):</p>
\\[
F(s) = \\int_a^b K(s,t)\\, f(t)\\, dt.
\\]

<p>Different choices of kernel, limits, and variables yield different transforms, each suited to particular classes of problems:</p>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #333;">
    <th style="text-align:left;padding:6px;">Transform</th>
    <th style="text-align:left;padding:6px;">Kernel \\(K(s,t)\\)</th>
    <th style="text-align:left;padding:6px;">Domain</th>
    <th style="text-align:left;padding:6px;">Best for</th>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">Fourier</td>
    <td style="padding:6px;">\\(e^{-i\\omega t}\\)</td>
    <td style="padding:6px;">\\((-\\infty,\\infty)\\)</td>
    <td style="padding:6px;">Steady-state, spectral analysis</td>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">Laplace</td>
    <td style="padding:6px;">\\(e^{-st}\\)</td>
    <td style="padding:6px;">\\([0,\\infty)\\)</td>
    <td style="padding:6px;">Initial-value problems, stability</td>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">Mellin</td>
    <td style="padding:6px;">\\(t^{s-1}\\)</td>
    <td style="padding:6px;">\\((0,\\infty)\\)</td>
    <td style="padding:6px;">Multiplicative problems, asymptotics</td>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">Hankel</td>
    <td style="padding:6px;">\\(t\\,J_\\nu(st)\\)</td>
    <td style="padding:6px;">\\([0,\\infty)\\)</td>
    <td style="padding:6px;">Cylindrical symmetry</td>
</tr>
<tr>
    <td style="padding:6px;">Z-transform</td>
    <td style="padding:6px;">\\(z^{-n}\\)</td>
    <td style="padding:6px;">\\(\\mathbb{Z}_{\\ge 0}\\)</td>
    <td style="padding:6px;">Discrete-time / difference equations</td>
</tr>
</table>

<h3>Why the Laplace Transform Is Central</h3>

<p>The Laplace transform occupies a privileged position because:</p>
<ol>
    <li><strong>Causal systems</strong>: It naturally handles functions defined for \\(t \\ge 0\\), matching physical causality.</li>
    <li><strong>Initial conditions</strong>: They enter the transform of derivatives directly, no separate matching step.</li>
    <li><strong>Stability analysis</strong>: Poles of the transform in the complex \\(s\\)-plane immediately reveal whether a system is stable, oscillatory, or divergent.</li>
    <li><strong>Generality</strong>: It handles exponentially growing signals that the Fourier transform cannot (the Fourier transform is the special case \\(s = i\\omega\\), i.e., the imaginary axis of the \\(s\\)-plane).</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Pierre-Simon Laplace introduced the transform in his work on probability theory (1782). Oliver Heaviside later developed operational calculus (1890s) to solve telegraph equations. Gustav Doetsch placed the theory on rigorous footing in the 1930s, unifying Heaviside's operational methods with complex analysis.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-laplace-pipeline"></div>
`,
            visualizations: [
                {
                    id: 'viz-laplace-pipeline',
                    title: 'The Transform Pipeline',
                    description: 'Watch an ODE get converted to algebra and back. The animation shows the three-step pipeline: transform, solve algebraically, invert. Click "Run Pipeline" to animate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var phase = 0; // 0=ODE, 1=transforming, 2=algebra, 3=inverting, 4=solution
                        var t0 = 0;
                        var running = false;

                        VizEngine.createButton(controls, 'Run Pipeline', function() {
                            phase = 0; t0 = performance.now(); running = true;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            phase = 0; running = false; draw(0);
                        });

                        var boxes = [
                            { x: 40, y: 60, w: 200, h: 70, label: "ODE + ICs", color: viz.colors.blue,
                              text: "y'' + 3y' + 2y = e^{-t}", sub: "y(0)=1, y'(0)=0" },
                            { x: 310, y: 60, w: 210, h: 70, label: "Algebraic Eq.", color: viz.colors.teal,
                              text: "(s\u00B2+3s+2)Y(s) = ...", sub: "Polynomial in s" },
                            { x: 310, y: 200, w: 210, h: 70, label: "Y(s) solved", color: viz.colors.orange,
                              text: "Y(s) = partial fractions", sub: "Poles at s=-1, s=-2" },
                            { x: 40, y: 200, w: 200, h: 70, label: "Solution y(t)", color: viz.colors.green,
                              text: "y(t) = Ae^{-t} + Be^{-2t} + ...", sub: "Back in time domain" }
                        ];

                        var arrows = [
                            { from: 0, to: 1, label: "Laplace Transform" },
                            { from: 1, to: 2, label: "Algebra" },
                            { from: 2, to: 3, label: "Inverse Laplace" }
                        ];

                        function draw(timestamp) {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('The Transform Pipeline', viz.width / 2, 25, viz.colors.white, 16);

                            var elapsed = running ? (timestamp - t0) / 1000 : 0;
                            var activeBox = 0;
                            if (elapsed > 1) activeBox = 1;
                            if (elapsed > 2.5) activeBox = 2;
                            if (elapsed > 4) activeBox = 3;
                            if (elapsed > 5.5) { running = false; activeBox = 3; }

                            // Draw arrows
                            for (var ai = 0; ai < arrows.length; ai++) {
                                var a = arrows[ai];
                                var fb = boxes[a.from], tb = boxes[a.to];
                                var fx, fy, tx, ty;

                                if (a.from === 0 && a.to === 1) {
                                    fx = fb.x + fb.w; fy = fb.y + fb.h / 2;
                                    tx = tb.x; ty = tb.y + tb.h / 2;
                                } else if (a.from === 1 && a.to === 2) {
                                    fx = fb.x + fb.w / 2; fy = fb.y + fb.h;
                                    tx = tb.x + tb.w / 2; ty = tb.y;
                                } else {
                                    fx = fb.x; fy = fb.y + fb.h / 2;
                                    tx = tb.x + tb.w; ty = tb.y + tb.h / 2;
                                }

                                var arrowActive = (ai < activeBox);
                                var arrowColor = arrowActive ? viz.colors.yellow : viz.colors.axis;

                                ctx.strokeStyle = arrowColor;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx, ty); ctx.stroke();

                                // Arrowhead
                                var dx = tx - fx, dy = ty - fy;
                                var len = Math.sqrt(dx * dx + dy * dy);
                                var ang = Math.atan2(dy, dx);
                                ctx.fillStyle = arrowColor;
                                ctx.beginPath();
                                ctx.moveTo(tx, ty);
                                ctx.lineTo(tx - 10 * Math.cos(ang - 0.4), ty - 10 * Math.sin(ang - 0.4));
                                ctx.lineTo(tx - 10 * Math.cos(ang + 0.4), ty - 10 * Math.sin(ang + 0.4));
                                ctx.closePath(); ctx.fill();

                                // Arrow label
                                var mx = (fx + tx) / 2, my = (fy + ty) / 2;
                                ctx.fillStyle = arrowColor;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                if (ai === 0) ctx.fillText(a.label, mx, my - 6);
                                else if (ai === 1) { ctx.textAlign = 'left'; ctx.fillText(a.label, mx + 6, my + 4); }
                                else ctx.fillText(a.label, mx, my - 6);
                            }

                            // Draw boxes
                            for (var bi = 0; bi < boxes.length; bi++) {
                                var b = boxes[bi];
                                var active = (bi <= activeBox);
                                var highlight = (bi === activeBox && running);

                                ctx.fillStyle = active ? b.color + '33' : '#111122';
                                ctx.strokeStyle = highlight ? viz.colors.yellow : (active ? b.color : viz.colors.axis);
                                ctx.lineWidth = highlight ? 3 : 1.5;
                                ctx.beginPath();
                                ctx.roundRect(b.x, b.y, b.w, b.h, 8);
                                ctx.fill(); ctx.stroke();

                                ctx.fillStyle = active ? b.color : viz.colors.text;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText(b.label, b.x + b.w / 2, b.y + 10);

                                ctx.fillStyle = active ? viz.colors.white : viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(b.text, b.x + b.w / 2, b.y + b.h / 2 + 2);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(b.sub, b.x + b.w / 2, b.y + b.h - 12);
                            }

                            // Bottom summary
                            var step = ['1. Start with ODE', '2. Apply Laplace Transform', '3. Solve algebraically', '4. Invert to get y(t)'];
                            var si = Math.min(activeBox, 3);
                            viz.screenText(step[si], viz.width / 2, viz.height - 30, viz.colors.yellow, 13);
                        }

                        draw(0);
                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the integral transform \\(F(s) = \\int_0^\\infty K(s,t)\\,f(t)\\,dt\\). For \\(K(s,t) = e^{-st}\\) and \\(f(t) = 1\\), compute \\(F(s)\\) and determine for which values of \\(s\\) the integral converges.',
                    hint: 'Evaluate \\(\\int_0^\\infty e^{-st}\\,dt\\). When does this improper integral converge?',
                    solution: '\\(F(s) = \\int_0^\\infty e^{-st}\\,dt = \\left[-\\frac{1}{s}e^{-st}\\right]_0^\\infty = \\frac{1}{s}\\), valid for \\(\\mathrm{Re}(s) > 0\\). The exponential decays only when the real part of \\(s\\) is positive.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Laplace Transform
        // ================================================================
        {
            id: 'sec-laplace',
            title: 'The Laplace Transform',
            content: `
<h2>The Laplace Transform</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Laplace Transform)</div>
    <div class="env-body">
        <p>The <strong>Laplace transform</strong> of a function \\(f(t)\\) defined for \\(t \\ge 0\\) is</p>
        \\[
        \\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^\\infty e^{-st}\\, f(t)\\, dt,
        \\]
        <p>defined for all complex \\(s\\) for which the integral converges absolutely.</p>
    </div>
</div>

<h3>Basic Transforms</h3>

<p>From the definition, one can compute transforms of elementary functions directly:</p>

<div class="env-block theorem">
    <div class="env-title">Table of Fundamental Transforms</div>
    <div class="env-body">
        \\[
        \\begin{aligned}
        \\mathcal{L}\\{1\\} &= \\frac{1}{s}, \\quad s > 0 \\\\[4pt]
        \\mathcal{L}\\{t^n\\} &= \\frac{n!}{s^{n+1}}, \\quad s > 0,\\; n = 0,1,2,\\ldots \\\\[4pt]
        \\mathcal{L}\\{e^{at}\\} &= \\frac{1}{s-a}, \\quad s > a \\\\[4pt]
        \\mathcal{L}\\{\\sin(\\omega t)\\} &= \\frac{\\omega}{s^2 + \\omega^2}, \\quad s > 0 \\\\[4pt]
        \\mathcal{L}\\{\\cos(\\omega t)\\} &= \\frac{s}{s^2 + \\omega^2}, \\quad s > 0
        \\end{aligned}
        \\]
    </div>
</div>

<h3>Key Properties</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.1 (Linearity)</div>
    <div class="env-body">
        <p>\\(\\mathcal{L}\\{\\alpha f + \\beta g\\} = \\alpha F(s) + \\beta G(s)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.2 (Derivative Rule)</div>
    <div class="env-body">
        <p>If \\(\\mathcal{L}\\{f\\} = F(s)\\), then</p>
        \\[
        \\mathcal{L}\\{f'(t)\\} = sF(s) - f(0),
        \\]
        \\[
        \\mathcal{L}\\{f''(t)\\} = s^2 F(s) - sf(0) - f'(0).
        \\]
        <p>More generally, \\(\\mathcal{L}\\{f^{(n)}\\} = s^n F(s) - s^{n-1}f(0) - \\cdots - f^{(n-1)}(0)\\).</p>
    </div>
</div>

<p>This is the property that makes the Laplace transform so powerful for initial-value problems: differentiation in the \\(t\\)-domain becomes multiplication by \\(s\\) in the \\(s\\)-domain, with initial conditions automatically included.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.3 (Shifting Theorems)</div>
    <div class="env-body">
        <p><strong>First shifting theorem</strong> (s-shift): If \\(\\mathcal{L}\\{f(t)\\} = F(s)\\), then</p>
        \\[
        \\mathcal{L}\\{e^{at}f(t)\\} = F(s - a).
        \\]
        <p><strong>Second shifting theorem</strong> (t-shift): If \\(u(t-a)\\) denotes the unit step function shifted by \\(a\\), then</p>
        \\[
        \\mathcal{L}\\{f(t-a)\\,u(t-a)\\} = e^{-as}F(s), \\quad a > 0.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.4 (Convolution Theorem)</div>
    <div class="env-body">
        <p>Define the convolution \\((f * g)(t) = \\int_0^t f(\\tau)\\,g(t-\\tau)\\,d\\tau\\). Then</p>
        \\[
        \\mathcal{L}\\{f * g\\} = F(s)\\cdot G(s).
        \\]
        <p>Convolution in the time domain corresponds to multiplication in the \\(s\\)-domain.</p>
    </div>
</div>

<h3>The Inverse Laplace Transform</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Bromwich Integral)</div>
    <div class="env-body">
        <p>The inverse Laplace transform is given by the contour integral</p>
        \\[
        f(t) = \\mathcal{L}^{-1}\\{F(s)\\} = \\frac{1}{2\\pi i} \\int_{\\gamma - i\\infty}^{\\gamma + i\\infty} e^{st}\\, F(s)\\, ds,
        \\]
        <p>where \\(\\gamma\\) is a real number greater than the real part of all singularities of \\(F(s)\\).</p>
    </div>
</div>

<p>In practice, we rarely evaluate the Bromwich integral directly. Instead, we use partial fractions to decompose \\(F(s)\\) into terms whose inverses we recognize from the table.</p>

<div class="env-block example">
    <div class="env-title">Example: Partial Fractions</div>
    <div class="env-body">
        <p>Find \\(\\mathcal{L}^{-1}\\left\\{\\frac{5s+3}{s^2+3s+2}\\right\\}\\).</p>
        <p>Factor: \\(s^2+3s+2 = (s+1)(s+2)\\). Partial fractions:</p>
        \\[
        \\frac{5s+3}{(s+1)(s+2)} = \\frac{-2}{s+1} + \\frac{7}{s+2}.
        \\]
        <p>Inverting term by term: \\(f(t) = -2e^{-t} + 7e^{-2t}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-s-plane"></div>
`,
            visualizations: [
                {
                    id: 'viz-s-plane',
                    title: 'The Complex s-Plane',
                    description: 'Poles and zeros in the complex s-plane determine system behavior. Drag the pole to see how its position affects the time-domain response. Poles in the left half-plane (Re(s)<0) give decaying signals; right half-plane gives growing signals; imaginary axis gives oscillation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 50
                        });

                        var pole = viz.addDraggable('pole', -1, 1.5, viz.colors.red, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Label axes
                            viz.screenText('Re(s)', viz.width - 30, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('Im(s)', viz.originX + 25, 14, viz.colors.text, 11);

                            // Shade stability regions
                            // Left half-plane (stable)
                            ctx.fillStyle = viz.colors.green + '11';
                            ctx.fillRect(0, 0, viz.originX, viz.height);
                            // Right half-plane (unstable)
                            ctx.fillStyle = viz.colors.red + '11';
                            ctx.fillRect(viz.originX, 0, viz.width - viz.originX, viz.height);

                            viz.screenText('Stable', 60, 20, viz.colors.green, 11);
                            viz.screenText('Unstable', viz.width - 60, 20, viz.colors.red, 11);

                            // Draw pole as X
                            var sigma = pole.x;
                            var omega = pole.y;
                            var psx = viz.originX + sigma * viz.scale;
                            var psy = viz.originY - omega * viz.scale;

                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(psx - 7, psy - 7); ctx.lineTo(psx + 7, psy + 7); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(psx + 7, psy - 7); ctx.lineTo(psx - 7, psy + 7); ctx.stroke();

                            // Conjugate pole
                            if (Math.abs(omega) > 0.05) {
                                var psy2 = viz.originY + omega * viz.scale;
                                ctx.strokeStyle = viz.colors.red + '88';
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(psx - 6, psy2 - 6); ctx.lineTo(psx + 6, psy2 + 6); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(psx + 6, psy2 - 6); ctx.lineTo(psx - 6, psy2 + 6); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('conjugate', psx + 12, psy2);
                            }

                            // Draw time-domain response in a sub-panel
                            var panelX = 10, panelY = viz.height - 120, panelW = 200, panelH = 100;
                            ctx.fillStyle = '#0a0a18';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.fillRect(panelX, panelY, panelW, panelH);
                            ctx.strokeRect(panelX, panelY, panelW, panelH);
                            viz.screenText('Time response', panelX + panelW / 2, panelY - 8, viz.colors.white, 11);

                            // Plot e^(sigma*t) * cos(omega*t) for t in [0, tMax]
                            var tMax = 5;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 200; i++) {
                                var tt = tMax * i / 200;
                                var val = Math.exp(sigma * tt) * Math.cos(omega * tt);
                                // Clamp
                                if (val > 5) val = 5;
                                if (val < -5) val = -5;
                                var px = panelX + 10 + (panelW - 20) * i / 200;
                                var py = panelY + panelH / 2 - val * (panelH / 2 - 5) / 5;
                                py = Math.max(panelY + 2, Math.min(panelY + panelH - 2, py));
                                if (!started) { ctx.moveTo(px, py); started = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '66';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(panelX, panelY + panelH / 2);
                            ctx.lineTo(panelX + panelW, panelY + panelH / 2);
                            ctx.stroke();

                            // Info
                            var behavior = sigma < -0.05 ? 'Decaying' : (sigma > 0.05 ? 'Growing' : 'Marginal');
                            if (Math.abs(omega) > 0.05) behavior += ' oscillation';
                            else behavior += ' (real)';
                            viz.screenText('s = ' + sigma.toFixed(2) + ' + ' + omega.toFixed(2) + 'i', viz.width - 120, viz.height - 50, viz.colors.white, 11);
                            viz.screenText(behavior, viz.width - 120, viz.height - 35, sigma < -0.05 ? viz.colors.green : (sigma > 0.05 ? viz.colors.red : viz.colors.yellow), 11);

                            viz.drawDraggables();
                        }

                        draw();
                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Laplace transform of \\(f(t) = t\\,e^{-2t}\\) using the first shifting theorem.',
                    hint: 'Start with \\(\\mathcal{L}\\{t\\} = 1/s^2\\). The first shifting theorem says \\(\\mathcal{L}\\{e^{at}g(t)\\} = G(s-a)\\).',
                    solution: '\\(\\mathcal{L}\\{t\\} = 1/s^2\\). By the first shifting theorem with \\(a=-2\\): \\(\\mathcal{L}\\{t\\,e^{-2t}\\} = \\frac{1}{(s+2)^2}\\), valid for \\(s > -2\\).'
                },
                {
                    question: 'Show that if \\(F(s) = \\mathcal{L}\\{f(t)\\}\\), then \\(\\mathcal{L}\\{tf(t)\\} = -F\'(s)\\).',
                    hint: 'Differentiate \\(F(s) = \\int_0^\\infty e^{-st}f(t)\\,dt\\) with respect to \\(s\\) under the integral sign.',
                    solution: '\\(F\'(s) = \\frac{d}{ds}\\int_0^\\infty e^{-st}f(t)\\,dt = \\int_0^\\infty (-t)e^{-st}f(t)\\,dt = -\\mathcal{L}\\{tf(t)\\}\\). Therefore \\(\\mathcal{L}\\{tf(t)\\} = -F\'(s)\\). Interchange of differentiation and integration is justified by uniform convergence for \\(\\mathrm{Re}(s)\\) in a compact set to the right of the abscissa of convergence.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Solving ODEs & PDEs
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Solving ODEs & PDEs',
            content: `
<h2>Solving ODEs and PDEs with the Laplace Transform</h2>

<div class="env-block intuition">
    <div class="env-title">The Recipe</div>
    <div class="env-body">
        <p>For a linear ODE with constant coefficients and given initial conditions:</p>
        <ol>
            <li>Take the Laplace transform of both sides, using the derivative rule.</li>
            <li>Solve the resulting algebraic equation for \\(Y(s)\\).</li>
            <li>Decompose \\(Y(s)\\) by partial fractions.</li>
            <li>Invert each term using the table.</li>
        </ol>
    </div>
</div>

<h3>Example: Second-Order ODE</h3>

<div class="env-block example">
    <div class="env-title">Example: Damped Oscillator</div>
    <div class="env-body">
        <p>Solve \\(y'' + 2y' + 5y = 0\\), with \\(y(0)=1\\), \\(y'(0)=0\\).</p>
        <p><strong>Step 1.</strong> Transform: \\([s^2 Y - s - 0] + 2[sY - 1] + 5Y = 0\\).</p>
        <p><strong>Step 2.</strong> Solve: \\((s^2 + 2s + 5)Y = s + 2\\), so \\(Y(s) = \\frac{s+2}{s^2+2s+5}\\).</p>
        <p><strong>Step 3.</strong> Complete the square: \\(s^2+2s+5 = (s+1)^2 + 4\\). Write</p>
        \\[
        Y(s) = \\frac{(s+1) + 1}{(s+1)^2 + 4} = \\frac{s+1}{(s+1)^2+4} + \\frac{1}{(s+1)^2+4}.
        \\]
        <p><strong>Step 4.</strong> Invert using the s-shift: \\(y(t) = e^{-t}\\cos 2t + \\tfrac{1}{2}e^{-t}\\sin 2t\\).</p>
    </div>
</div>

<h3>Circuit Analysis</h3>

<p>In an RLC circuit with resistance \\(R\\), inductance \\(L\\), and capacitance \\(C\\), Kirchhoff's voltage law gives:</p>
\\[
L\\frac{di}{dt} + Ri + \\frac{1}{C}\\int_0^t i(\\tau)\\,d\\tau = V(t).
\\]

<p>Taking the Laplace transform (with zero initial conditions):</p>
\\[
LsI(s) + RI(s) + \\frac{1}{Cs}I(s) = V(s),
\\]
<p>so the <strong>impedance</strong> in the \\(s\\)-domain is</p>
\\[
Z(s) = Ls + R + \\frac{1}{Cs}.
\\]

<p>Each circuit element has a simple transform-domain impedance: \\(R\\) for a resistor, \\(Ls\\) for an inductor, \\(1/(Cs)\\) for a capacitor. Circuit analysis reduces to Ohm's law with complex impedances.</p>

<div class="viz-placeholder" data-viz="viz-circuit-analysis"></div>

<h3>Mechanical Systems</h3>

<p>The equation of motion for a spring-mass-damper system is identical in form:</p>
\\[
m\\ddot{x} + c\\dot{x} + kx = F(t).
\\]

<p>The Laplace transform gives \\((ms^2 + cs + k)X(s) = F(s) + \\text{(initial condition terms)}\\). The <strong>transfer function</strong></p>
\\[
H(s) = \\frac{1}{ms^2 + cs + k}
\\]
<p>encodes the complete dynamical response. Its poles determine whether the system is underdamped, critically damped, or overdamped.</p>

<h3>Application to PDEs</h3>

<p>For a PDE like the heat equation \\(u_t = \\alpha^2 u_{xx}\\) on a semi-infinite rod \\(x \\ge 0\\), taking the Laplace transform in \\(t\\) converts the PDE to an ODE in \\(x\\):</p>
\\[
sU(x,s) - u(x,0) = \\alpha^2 U_{xx}(x,s).
\\]
<p>This ODE can be solved, and the inverse Laplace transform recovers \\(u(x,t)\\).</p>
`,
            visualizations: [
                {
                    id: 'viz-circuit-analysis',
                    title: 'RLC Circuit via Laplace Transform',
                    description: 'An RLC series circuit driven by a step voltage. Adjust R, L, C to see underdamped, critically damped, and overdamped responses. The transform-domain impedance and poles are shown.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var R = 2, L = 1, C = 0.5;
                        VizEngine.createSlider(controls, 'R', 0.1, 10, R, 0.1, function(v) { R = v; draw(); });
                        VizEngine.createSlider(controls, 'L', 0.1, 5, L, 0.1, function(v) { L = v; draw(); });
                        VizEngine.createSlider(controls, 'C', 0.05, 2, C, 0.05, function(v) { C = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Circuit diagram (schematic)
                            var cx = 60, cy = 50;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;

                            // Battery
                            ctx.beginPath(); ctx.moveTo(cx, cy + 20); ctx.lineTo(cx, cy + 80); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx - 8, cy + 40); ctx.lineTo(cx + 8, cy + 40); ctx.stroke();
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(cx - 5, cy + 48); ctx.lineTo(cx + 5, cy + 48); ctx.stroke();
                            viz.screenText('V', cx - 16, cy + 44, viz.colors.yellow, 10);

                            // Top wire
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx, cy + 20); ctx.lineTo(cx + 30, cy + 20); ctx.stroke();

                            // Resistor (zigzag)
                            ctx.beginPath(); ctx.moveTo(cx + 30, cy + 20);
                            for (var zi = 0; zi < 6; zi++) {
                                ctx.lineTo(cx + 35 + zi * 8, cy + 20 + (zi % 2 === 0 ? -6 : 6));
                            }
                            ctx.lineTo(cx + 85, cy + 20); ctx.stroke();
                            viz.screenText('R=' + R.toFixed(1), cx + 57, cy + 8, viz.colors.text, 9);

                            // Inductor (bumps)
                            ctx.beginPath(); ctx.moveTo(cx + 85, cy + 20);
                            for (var li = 0; li < 4; li++) {
                                ctx.arc(cx + 95 + li * 12, cy + 20, 6, Math.PI, 0);
                            }
                            ctx.lineTo(cx + 145, cy + 20); ctx.stroke();
                            viz.screenText('L=' + L.toFixed(1), cx + 115, cy + 8, viz.colors.text, 9);

                            // Capacitor
                            ctx.beginPath(); ctx.moveTo(cx + 145, cy + 20); ctx.lineTo(cx + 170, cy + 20); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx + 170, cy + 12); ctx.lineTo(cx + 170, cy + 28); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx + 176, cy + 12); ctx.lineTo(cx + 176, cy + 28); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx + 176, cy + 20); ctx.lineTo(cx + 200, cy + 20); ctx.stroke();
                            viz.screenText('C=' + C.toFixed(2), cx + 173, cy + 8, viz.colors.text, 9);

                            // Bottom wire
                            ctx.beginPath(); ctx.moveTo(cx + 200, cy + 20); ctx.lineTo(cx + 200, cy + 80); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx + 200, cy + 80); ctx.lineTo(cx, cy + 80); ctx.stroke();

                            // Compute poles
                            // Z(s) = Ls + R + 1/(Cs), characteristic eq: Ls^2 + Rs + 1/C = 0
                            var disc = R * R - 4 * L / C;
                            var p1r, p1i, p2r, p2i;
                            var dampType;
                            if (Math.abs(disc) < 1e-6) {
                                p1r = -R / (2 * L); p1i = 0;
                                p2r = p1r; p2i = 0;
                                dampType = 'Critically damped';
                            } else if (disc > 0) {
                                var sq = Math.sqrt(disc);
                                p1r = (-R + sq) / (2 * L); p1i = 0;
                                p2r = (-R - sq) / (2 * L); p2i = 0;
                                dampType = 'Overdamped';
                            } else {
                                p1r = -R / (2 * L); p1i = Math.sqrt(-disc) / (2 * L);
                                p2r = p1r; p2i = -p1i;
                                dampType = 'Underdamped';
                            }

                            // Display impedance info
                            viz.screenText('Z(s) = ' + L.toFixed(1) + 's + ' + R.toFixed(1) + ' + 1/(' + C.toFixed(2) + 's)', 300, cy + 50, viz.colors.teal, 11);
                            viz.screenText('Poles: s = ' + p1r.toFixed(2) + (p1i !== 0 ? ' \u00B1 ' + Math.abs(p1i).toFixed(2) + 'i' : (p1r !== p2r ? ', ' + p2r.toFixed(2) : ' (double)')), 300, cy + 68, viz.colors.orange, 11);
                            viz.screenText(dampType, 300, cy + 86, dampType === 'Underdamped' ? viz.colors.blue : (dampType === 'Overdamped' ? viz.colors.green : viz.colors.yellow), 12);

                            // Plot current response i(t) for step input V=1
                            // I(s) = V(s)/Z(s) = 1/(s*(Ls + R + 1/(Cs))) = C/(LCs^2 + RCs + 1)
                            var panelX = 30, panelY = 150, panelW = 500, panelH = 200;
                            ctx.fillStyle = '#0a0a18';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.fillRect(panelX, panelY, panelW, panelH);
                            ctx.strokeRect(panelX, panelY, panelW, panelH);

                            viz.screenText('Current i(t) for unit step voltage', panelX + panelW / 2, panelY - 8, viz.colors.white, 12);
                            viz.screenText('t', panelX + panelW - 10, panelY + panelH + 14, viz.colors.text, 10);
                            viz.screenText('i(t)', panelX - 5, panelY + 10, viz.colors.text, 10, 'right');

                            // Numerical solution (compute current for step input)
                            var tMax = 15;
                            var dt = 0.01;
                            var nSteps = Math.floor(tMax / dt);
                            var maxVal = 0;
                            var iVals = [];

                            // State: [q, q'] where i = q'
                            // Lq'' + Rq' + q/C = V (=1 for t>0)
                            var q = 0, qd = 0; // q(0)=0 (no charge), q'(0)=0 (no current)
                            for (var step = 0; step <= nSteps; step++) {
                                var curr = qd;
                                iVals.push(curr);
                                if (Math.abs(curr) > maxVal) maxVal = Math.abs(curr);
                                var qdd = (1 - R * qd - q / C) / L;
                                q += qd * dt;
                                qd += qdd * dt;
                            }
                            if (maxVal < 0.01) maxVal = 0.01;

                            // Plot
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var plotStarted = false;
                            for (var pi = 0; pi < iVals.length; pi += 3) {
                                var px = panelX + 5 + (panelW - 10) * pi / nSteps;
                                var py = panelY + panelH / 2 - iVals[pi] * (panelH / 2 - 10) / maxVal;
                                py = Math.max(panelY + 2, Math.min(panelY + panelH - 2, py));
                                if (!plotStarted) { ctx.moveTo(px, py); plotStarted = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(panelX, panelY + panelH / 2);
                            ctx.lineTo(panelX + panelW, panelY + panelH / 2);
                            ctx.stroke();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Solve the initial value problem \\(y\'\' + 4y = \\sin t\\), \\(y(0)=0\\), \\(y\'(0)=1\\) using the Laplace transform.',
                    hint: 'Transform both sides. You should get \\((s^2+4)Y(s) - 1 = \\frac{1}{s^2+1}\\). Solve for \\(Y(s)\\) and use partial fractions.',
                    solution: 'Taking the transform: \\((s^2+4)Y = 1 + \\frac{1}{s^2+1}\\), so \\(Y = \\frac{1}{s^2+4} + \\frac{1}{(s^2+1)(s^2+4)}\\). Partial fractions on the second term: \\(\\frac{1}{(s^2+1)(s^2+4)} = \\frac{1}{3}\\left(\\frac{1}{s^2+1} - \\frac{1}{s^2+4}\\right)\\). So \\(Y = \\frac{1}{s^2+4} + \\frac{1}{3}\\cdot\\frac{1}{s^2+1} - \\frac{1}{3}\\cdot\\frac{1}{s^2+4} = \\frac{2}{3}\\cdot\\frac{1}{s^2+4} + \\frac{1}{3}\\cdot\\frac{1}{s^2+1}\\). Inverting: \\(y(t) = \\frac{1}{3}\\sin 2t + \\frac{1}{3}\\sin t\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Z-Transform
        // ================================================================
        {
            id: 'sec-z-transform',
            title: 'The Z-Transform',
            content: `
<h2>The Z-Transform</h2>

<div class="env-block intuition">
    <div class="env-title">Discrete-Time Counterpart</div>
    <div class="env-body">
        <p>The Z-transform is to difference equations what the Laplace transform is to differential equations. If a system operates at discrete time steps \\(n = 0, 1, 2, \\ldots\\) (as in a digital computer), the Z-transform is the natural tool.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Z-Transform)</div>
    <div class="env-body">
        <p>The <strong>Z-transform</strong> of a sequence \\(\\{x[n]\\}_{n=0}^\\infty\\) is</p>
        \\[
        X(z) = \\mathcal{Z}\\{x[n]\\} = \\sum_{n=0}^{\\infty} x[n]\\, z^{-n},
        \\]
        <p>defined for \\(|z| > R\\), where \\(R\\) is the radius of convergence.</p>
    </div>
</div>

<h3>Connection to the Laplace Transform</h3>

<p>If we sample a continuous signal \\(f(t)\\) at intervals \\(T\\), creating \\(x[n] = f(nT)\\), the substitution \\(z = e^{sT}\\) relates the two transforms:</p>
\\[
X(z)\\big|_{z=e^{sT}} = \\sum_{n=0}^\\infty f(nT)\\,e^{-snT} \\approx \\frac{1}{T}F(s).
\\]

<p>Key consequence: the left half of the \\(s\\)-plane (\\(\\mathrm{Re}(s)<0\\), stable) maps to the <strong>interior of the unit circle</strong> \\(|z|<1\\). Stability in discrete time means all poles of \\(X(z)\\) lie inside the unit circle.</p>

<h3>Basic Z-Transforms</h3>

<div class="env-block theorem">
    <div class="env-title">Table of Z-Transforms</div>
    <div class="env-body">
        \\[
        \\begin{aligned}
        \\mathcal{Z}\\{\\delta[n]\\} &= 1 \\\\[4pt]
        \\mathcal{Z}\\{u[n]\\} &= \\frac{z}{z-1}, \\quad |z|>1 \\\\[4pt]
        \\mathcal{Z}\\{a^n u[n]\\} &= \\frac{z}{z-a}, \\quad |z|>|a| \\\\[4pt]
        \\mathcal{Z}\\{n\\,a^n u[n]\\} &= \\frac{az}{(z-a)^2}, \\quad |z|>|a|
        \\end{aligned}
        \\]
    </div>
</div>

<h3>Solving Difference Equations</h3>

<p>The Z-transform converts a linear recurrence into a polynomial equation, just as the Laplace transform converts an ODE:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.5 (Shift Property)</div>
    <div class="env-body">
        <p>\\(\\mathcal{Z}\\{x[n-1]\\} = z^{-1}X(z) + x[-1]\\), and more generally, a delay of \\(k\\) steps introduces a factor \\(z^{-k}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Fibonacci via Z-Transform</div>
    <div class="env-body">
        <p>Solve \\(x[n] = x[n-1] + x[n-2]\\), with \\(x[0]=0\\), \\(x[1]=1\\).</p>
        <p>Taking the Z-transform: \\(X(z) = z^{-1}X(z) + z^{-2}X(z) + z^{-1}\\) (after accounting for initial conditions).</p>
        <p>Solving: \\(X(z) = \\frac{z^{-1}}{1 - z^{-1} - z^{-2}} = \\frac{z}{z^2 - z - 1}\\).</p>
        <p>Partial fractions with the golden ratio \\(\\phi = (1+\\sqrt{5})/2\\) and \\(\\hat{\\phi} = (1-\\sqrt{5})/2\\):</p>
        \\[
        x[n] = \\frac{\\phi^n - \\hat{\\phi}^n}{\\sqrt{5}} = \\frac{1}{\\sqrt{5}}\\left[\\left(\\frac{1+\\sqrt{5}}{2}\\right)^n - \\left(\\frac{1-\\sqrt{5}}{2}\\right)^n\\right].
        \\]
        <p>This is Binet's formula for the Fibonacci numbers.</p>
    </div>
</div>

<h3>Digital Filters</h3>

<p>A digital filter is a system described by a difference equation. Its <strong>transfer function</strong> in the Z-domain is</p>
\\[
H(z) = \\frac{Y(z)}{X(z)} = \\frac{b_0 + b_1 z^{-1} + \\cdots + b_M z^{-M}}{1 + a_1 z^{-1} + \\cdots + a_N z^{-N}}.
\\]
<p>The poles and zeros of \\(H(z)\\) in the complex \\(z\\)-plane determine the filter's frequency response. Evaluating \\(H(z)\\) on the unit circle \\(z = e^{i\\omega}\\) gives the frequency response \\(H(e^{i\\omega})\\).</p>

<div class="viz-placeholder" data-viz="viz-z-transform"></div>
`,
            visualizations: [
                {
                    id: 'viz-z-transform',
                    title: 'Z-Transform: Poles, Zeros, and the Unit Circle',
                    description: 'The unit circle in the z-plane plays the role of the imaginary axis in the s-plane. Drag the pole to see how its position relative to the unit circle determines stability and frequency response of a discrete-time system.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 200, originY: 190, scale: 100
                        });

                        var poleR = viz.addDraggable('poleR', 0.7, 0.5, viz.colors.red, 8);
                        var zeroR = viz.addDraggable('zeroR', -0.8, 0.0, viz.colors.blue, 7);

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Grid
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Unit circle
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            viz.screenText('|z|=1', viz.originX + viz.scale + 8, viz.originY - 10, viz.colors.yellow, 10);

                            // Labels
                            viz.screenText('Re(z)', viz.originX + 180, viz.originY - 8, viz.colors.text, 10);
                            viz.screenText('Im(z)', viz.originX + 10, 12, viz.colors.text, 10);

                            // Draw zero as O
                            var zx = zeroR.x, zy = zeroR.y;
                            var zsx = viz.originX + zx * viz.scale;
                            var zsy = viz.originY - zy * viz.scale;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(zsx, zsy, 7, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw pole as X
                            var px = poleR.x, py = poleR.y;
                            var psx = viz.originX + px * viz.scale;
                            var psy = viz.originY - py * viz.scale;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(psx - 7, psy - 7); ctx.lineTo(psx + 7, psy + 7); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(psx + 7, psy - 7); ctx.lineTo(psx - 7, psy + 7); ctx.stroke();

                            // Conjugate pole if imaginary part nonzero
                            if (Math.abs(py) > 0.02) {
                                var cpsy = viz.originY + py * viz.scale;
                                ctx.strokeStyle = viz.colors.red + '66';
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(psx - 5, cpsy - 5); ctx.lineTo(psx + 5, cpsy + 5); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(psx + 5, cpsy - 5); ctx.lineTo(psx - 5, cpsy + 5); ctx.stroke();
                            }

                            // Stability check
                            var poleMag = Math.sqrt(px * px + py * py);
                            var stable = poleMag < 1;
                            viz.screenText('Pole at z = ' + px.toFixed(2) + '+' + py.toFixed(2) + 'i', 430, 30, viz.colors.white, 11);
                            viz.screenText('|pole| = ' + poleMag.toFixed(3), 430, 48, viz.colors.white, 11);
                            viz.screenText(stable ? 'STABLE (|pole|<1)' : 'UNSTABLE (|pole|>1)', 430, 66, stable ? viz.colors.green : viz.colors.red, 12);

                            // Frequency response |H(e^jw)| in sub-panel
                            var panelX = 320, panelY = 130, panelW = 220, panelH = 120;
                            ctx.fillStyle = '#0a0a18';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.fillRect(panelX, panelY, panelW, panelH);
                            ctx.strokeRect(panelX, panelY, panelW, panelH);
                            viz.screenText('|H(e^{j\u03C9})|', panelX + panelW / 2, panelY - 8, viz.colors.white, 10);

                            // Compute frequency response
                            var maxH = 0;
                            var freqResp = [];
                            for (var fi = 0; fi <= 200; fi++) {
                                var w = Math.PI * fi / 200;
                                var ejw_re = Math.cos(w), ejw_im = Math.sin(w);
                                // H(z) = (z - zero) / (z - pole) for single pole/zero
                                var numRe = ejw_re - zx, numIm = ejw_im - zy;
                                var denRe = ejw_re - px, denIm = ejw_im - py;
                                var numMag = Math.sqrt(numRe * numRe + numIm * numIm);
                                var denMag = Math.sqrt(denRe * denRe + denIm * denIm);
                                var hMag = denMag < 1e-10 ? 100 : numMag / denMag;
                                freqResp.push(hMag);
                                if (hMag < 50 && hMag > maxH) maxH = hMag;
                            }
                            if (maxH < 0.1) maxH = 1;

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var fStarted = false;
                            for (var fi2 = 0; fi2 < freqResp.length; fi2++) {
                                var fPx = panelX + 5 + (panelW - 10) * fi2 / 200;
                                var fVal = Math.min(freqResp[fi2], maxH * 1.2);
                                var fPy = panelY + panelH - 5 - (panelH - 10) * fVal / (maxH * 1.2);
                                if (!fStarted) { ctx.moveTo(fPx, fPy); fStarted = true; }
                                else ctx.lineTo(fPx, fPy);
                            }
                            ctx.stroke();

                            viz.screenText('0', panelX + 5, panelY + panelH + 10, viz.colors.text, 9);
                            viz.screenText('\u03C0', panelX + panelW - 5, panelY + panelH + 10, viz.colors.text, 9);
                            viz.screenText('\u03C9', panelX + panelW / 2, panelY + panelH + 12, viz.colors.text, 9);

                            // Impulse response in sub-panel
                            var pX2 = 320, pY2 = 270, pW2 = 220, pH2 = 90;
                            ctx.fillStyle = '#0a0a18';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.fillRect(pX2, pY2, pW2, pH2);
                            ctx.strokeRect(pX2, pY2, pW2, pH2);
                            viz.screenText('Impulse response h[n]', pX2 + pW2 / 2, pY2 - 8, viz.colors.white, 10);

                            // h[n] for pole at p: h[n] ~ p^n (simplified single pole)
                            var nMax = 20;
                            var hMax = 0;
                            var hVals = [];
                            for (var ni = 0; ni <= nMax; ni++) {
                                // p^n (complex): (px + i*py)^n
                                var mag = Math.pow(poleMag, ni);
                                var ang = Math.atan2(py, px) * ni;
                                var hVal = mag * Math.cos(ang);
                                hVals.push(hVal);
                                if (Math.abs(hVal) > hMax && Math.abs(hVal) < 50) hMax = Math.abs(hVal);
                            }
                            if (hMax < 0.1) hMax = 1;

                            for (var hi = 0; hi <= nMax; hi++) {
                                var bx = pX2 + 10 + (pW2 - 20) * hi / nMax;
                                var bh = hVals[hi];
                                if (Math.abs(bh) > hMax * 1.5) bh = Math.sign(bh) * hMax * 1.5;
                                var barH = (pH2 / 2 - 5) * bh / (hMax * 1.2);
                                var by0 = pY2 + pH2 / 2;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(bx - 2, by0 - Math.max(barH, 0), 4, Math.abs(barH));
                            }

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(pX2, pY2 + pH2 / 2);
                            ctx.lineTo(pX2 + pW2, pY2 + pH2 / 2);
                            ctx.stroke();

                            viz.drawDraggables();
                        }

                        draw();
                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Z-transform of the sequence \\(x[n] = 3^n u[n]\\), where \\(u[n]\\) is the unit step. For what values of \\(z\\) does the transform converge?',
                    hint: 'Use the geometric series formula: \\(\\sum_{n=0}^\\infty r^n = \\frac{1}{1-r}\\) for \\(|r|<1\\).',
                    solution: '\\(X(z) = \\sum_{n=0}^\\infty 3^n z^{-n} = \\sum_{n=0}^\\infty (3/z)^n = \\frac{1}{1-3/z} = \\frac{z}{z-3}\\), converging for \\(|z| > 3\\).'
                },
                {
                    question: 'Solve the difference equation \\(y[n] - 0.5\\,y[n-1] = \\delta[n]\\) (unit impulse input) with \\(y[-1]=0\\) using the Z-transform.',
                    hint: 'Take the Z-transform of both sides. Use \\(\\mathcal{Z}\\{y[n-1]\\} = z^{-1}Y(z)\\) (since \\(y[-1]=0\\)).',
                    solution: '\\(Y(z) - 0.5\\,z^{-1}Y(z) = 1\\). Factor: \\(Y(z)(1 - 0.5z^{-1}) = 1\\), so \\(Y(z) = \\frac{1}{1-0.5z^{-1}} = \\frac{z}{z-0.5}\\). Inverting: \\(y[n] = (0.5)^n u[n]\\). The system is stable since the pole at \\(z=0.5\\) lies inside the unit circle.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Mellin & Hankel Transforms
        // ================================================================
        {
            id: 'sec-mellin',
            title: 'Mellin & Hankel Transforms',
            content: `
<h2>Mellin and Hankel Transforms</h2>

<p>The Laplace and Fourier transforms are the most common, but two other integral transforms arise naturally in physics: the Mellin transform (for problems with multiplicative structure) and the Hankel transform (for cylindrical symmetry).</p>

<h3>The Mellin Transform</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Mellin Transform)</div>
    <div class="env-body">
        <p>The <strong>Mellin transform</strong> of \\(f(t)\\), defined for \\(t > 0\\), is</p>
        \\[
        \\mathcal{M}\\{f\\}(s) = \\int_0^\\infty t^{s-1}\\, f(t)\\, dt,
        \\]
        <p>defined in a strip \\(a < \\mathrm{Re}(s) < b\\) of the complex plane.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Relation to Laplace</div>
    <div class="env-body">
        <p>The substitution \\(t = e^{-u}\\) converts the Mellin transform into a two-sided Laplace transform: \\(\\mathcal{M}\\{f\\}(s) = \\int_{-\\infty}^{\\infty} e^{-su}\\, f(e^{-u})\\, du\\). The Mellin transform is thus the Laplace transform in logarithmic coordinates.</p>
    </div>
</div>

<h3>Applications of the Mellin Transform</h3>

<p>The Mellin transform is especially useful for:</p>
<ul>
    <li><strong>Asymptotic expansions</strong>: The poles of the Mellin transform encode the asymptotic behavior of \\(f(t)\\) as \\(t \\to 0^+\\) and \\(t \\to \\infty\\).</li>
    <li><strong>Multiplicative convolution</strong>: Just as the Laplace transform turns additive convolution into multiplication, the Mellin transform does the same for the multiplicative convolution \\((f \\star g)(x) = \\int_0^\\infty f(x/t)\\,g(t)\\,\\frac{dt}{t}\\).</li>
    <li><strong>Special functions</strong>: The Gamma function is itself a Mellin transform: \\(\\Gamma(s) = \\mathcal{M}\\{e^{-t}\\}(s)\\).</li>
    <li><strong>Number theory</strong>: The Riemann zeta function is related to the Mellin transform of the theta function.</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example: Mellin Transform of \\(e^{-t}\\)</div>
    <div class="env-body">
        <p>\\(\\mathcal{M}\\{e^{-t}\\}(s) = \\int_0^\\infty t^{s-1} e^{-t}\\,dt = \\Gamma(s)\\), valid for \\(\\mathrm{Re}(s) > 0\\).</p>
        <p>This is the definition of the Gamma function; the Mellin transform provides its natural setting.</p>
    </div>
</div>

<h3>The Hankel Transform</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Hankel Transform)</div>
    <div class="env-body">
        <p>The <strong>Hankel transform of order \\(\\nu\\)</strong> of \\(f(r)\\) is</p>
        \\[
        \\tilde{f}(k) = \\int_0^\\infty f(r)\\, J_\\nu(kr)\\, r\\, dr,
        \\]
        <p>where \\(J_\\nu\\) is the Bessel function of the first kind of order \\(\\nu\\).</p>
    </div>
</div>

<p>The Hankel transform is self-reciprocal: the inversion formula has the same form as the forward transform. It arises naturally when applying the Fourier transform in polar coordinates.</p>

<h3>Physical Application: Diffraction</h3>

<p>Consider a circular aperture of radius \\(a\\) illuminated by a plane wave. The diffraction pattern involves the Hankel transform (with \\(\\nu=0\\)) of the aperture function. The result is the Airy pattern:</p>
\\[
I(\\theta) \\propto \\left[\\frac{2J_1(ka\\sin\\theta)}{ka\\sin\\theta}\\right]^2,
\\]
<p>where \\(J_1\\) is the Bessel function of order 1. The Hankel transform converts the radially symmetric aperture into the angular intensity distribution.</p>

<div class="env-block example">
    <div class="env-title">Example: Heat Equation in Cylindrical Coordinates</div>
    <div class="env-body">
        <p>For the heat equation \\(u_t = \\alpha^2 \\nabla^2 u\\) with radial symmetry (no \\(\\theta\\) or \\(z\\) dependence), the Laplacian becomes \\(\\nabla^2 u = u_{rr} + \\frac{1}{r}u_r\\). Applying the Hankel transform of order 0 in \\(r\\) gives</p>
        \\[
        \\frac{d\\tilde{U}}{dt} = -\\alpha^2 k^2 \\tilde{U},
        \\]
        <p>which is a simple ODE: \\(\\tilde{U}(k,t) = \\tilde{U}(k,0)\\,e^{-\\alpha^2 k^2 t}\\). The inverse Hankel transform recovers \\(u(r,t)\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-transfer-function"></div>
`,
            visualizations: [
                {
                    id: 'viz-transfer-function',
                    title: 'Transfer Function: Frequency Response',
                    description: 'A transfer function H(s) = 1/(s^2 + 2\u03B6\u03C9s + \u03C9^2) characterizes a second-order system. Adjust the damping ratio \u03B6 and natural frequency \u03C9 to see the Bode magnitude plot (frequency response evaluated along the imaginary axis s = j\u03C9).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var zeta = 0.3, wn = 2.0;
                        VizEngine.createSlider(controls, '\u03B6 (damping)', 0.05, 2, zeta, 0.05, function(v) { zeta = v; draw(); });
                        VizEngine.createSlider(controls, '\u03C9n (nat. freq)', 0.5, 8, wn, 0.1, function(v) { wn = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Bode magnitude plot
                            var panelX = 60, panelY = 40, panelW = 460, panelH = 160;
                            ctx.fillStyle = '#0a0a18';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.fillRect(panelX, panelY, panelW, panelH);
                            ctx.strokeRect(panelX, panelY, panelW, panelH);
                            viz.screenText('Bode Magnitude Plot: |H(j\u03C9)|  [dB]', panelX + panelW / 2, panelY - 12, viz.colors.white, 12);

                            // Log frequency axis: 0.01 to 100 rad/s
                            var wMin = 0.01, wMax = 100;
                            var dbMin = -60, dbMax = 40;

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var db = dbMin; db <= dbMax; db += 20) {
                                var gy = panelY + panelH - (db - dbMin) / (dbMax - dbMin) * panelH;
                                ctx.beginPath(); ctx.moveTo(panelX, gy); ctx.lineTo(panelX + panelW, gy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(db + ' dB', panelX - 4, gy + 3);
                            }
                            for (var dec = -2; dec <= 2; dec++) {
                                var gx = panelX + (dec + 2) / 4 * panelW;
                                ctx.beginPath(); ctx.moveTo(gx, panelY); ctx.lineTo(gx, panelY + panelH); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('10^' + dec, gx, panelY + panelH + 12);
                            }

                            // 0 dB line
                            var zeroDB_y = panelY + panelH - (0 - dbMin) / (dbMax - dbMin) * panelH;
                            ctx.strokeStyle = viz.colors.yellow + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(panelX, zeroDB_y); ctx.lineTo(panelX + panelW, zeroDB_y); ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot |H(jw)| in dB
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var pStarted = false;
                            for (var i = 0; i <= 400; i++) {
                                var logw = Math.log10(wMin) + (Math.log10(wMax) - Math.log10(wMin)) * i / 400;
                                var w = Math.pow(10, logw);
                                // H(jw) = 1/((jw)^2 + 2*zeta*wn*(jw) + wn^2)
                                // = 1/(-w^2 + 2j*zeta*wn*w + wn^2)
                                var realPart = wn * wn - w * w;
                                var imagPart = 2 * zeta * wn * w;
                                var mag = 1.0 / Math.sqrt(realPart * realPart + imagPart * imagPart);
                                var dBval = 20 * Math.log10(mag);
                                dBval = Math.max(dbMin, Math.min(dbMax, dBval));
                                var px = panelX + (logw - Math.log10(wMin)) / (Math.log10(wMax) - Math.log10(wMin)) * panelW;
                                var py = panelY + panelH - (dBval - dbMin) / (dbMax - dbMin) * panelH;
                                if (!pStarted) { ctx.moveTo(px, py); pStarted = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Mark resonance frequency
                            if (zeta < 1) {
                                var wRes = wn * Math.sqrt(1 - 2 * zeta * zeta);
                                if (wRes > wMin && wRes < wMax) {
                                    var rxLog = Math.log10(wRes);
                                    var rx = panelX + (rxLog - Math.log10(wMin)) / (Math.log10(wMax) - Math.log10(wMin)) * panelW;
                                    ctx.strokeStyle = viz.colors.red + '88';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(rx, panelY); ctx.lineTo(rx, panelY + panelH); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('\u03C9_res', rx, panelY + panelH + 24, viz.colors.red, 9);
                                }
                            }

                            viz.screenText('\u03C9 (rad/s)', panelX + panelW / 2, panelY + panelH + 30, viz.colors.text, 10);

                            // Phase plot
                            var pY2 = 230, pH2 = 120;
                            ctx.fillStyle = '#0a0a18';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.fillRect(panelX, pY2, panelW, pH2);
                            ctx.strokeRect(panelX, pY2, panelW, pH2);
                            viz.screenText('Phase \u2220H(j\u03C9)  [degrees]', panelX + panelW / 2, pY2 - 12, viz.colors.white, 12);

                            // Phase grid
                            for (var ph = -180; ph <= 0; ph += 45) {
                                var pgy = pY2 + pH2 - (ph + 180) / 180 * pH2;
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(panelX, pgy); ctx.lineTo(panelX + panelW, pgy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(ph + '\u00B0', panelX - 4, pgy + 3);
                            }

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var phStarted = false;
                            for (var j = 0; j <= 400; j++) {
                                var logw2 = Math.log10(wMin) + (Math.log10(wMax) - Math.log10(wMin)) * j / 400;
                                var w2 = Math.pow(10, logw2);
                                var re2 = wn * wn - w2 * w2;
                                var im2 = 2 * zeta * wn * w2;
                                var phase = -Math.atan2(im2, re2) * 180 / Math.PI;
                                var ppx = panelX + (logw2 - Math.log10(wMin)) / (Math.log10(wMax) - Math.log10(wMin)) * panelW;
                                var ppy = pY2 + pH2 - (phase + 180) / 180 * pH2;
                                ppy = Math.max(pY2, Math.min(pY2 + pH2, ppy));
                                if (!phStarted) { ctx.moveTo(ppx, ppy); phStarted = true; }
                                else ctx.lineTo(ppx, ppy);
                            }
                            ctx.stroke();

                            // Info
                            var peakGain = (zeta < 0.707) ? 1 / (2 * zeta * Math.sqrt(1 - zeta * zeta)) : 1;
                            viz.screenText('\u03B6 = ' + zeta.toFixed(2) + ', \u03C9n = ' + wn.toFixed(1) + ', peak gain = ' + (20 * Math.log10(peakGain)).toFixed(1) + ' dB',
                                viz.width / 2, viz.height - 10, viz.colors.white, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Mellin transform of \\(f(t) = (1+t)^{-1}\\) is \\(\\pi/\\sin(\\pi s)\\) for \\(0 < \\mathrm{Re}(s) < 1\\).',
                    hint: 'Compute \\(\\int_0^\\infty \\frac{t^{s-1}}{1+t}\\,dt\\). Use the substitution \\(u = t/(1+t)\\) to relate this to the Beta function \\(B(s, 1-s)\\), then use the reflection formula \\(\\Gamma(s)\\Gamma(1-s) = \\pi/\\sin(\\pi s)\\).',
                    solution: 'With \\(u = t/(1+t)\\), \\(t = u/(1-u)\\), \\(dt = du/(1-u)^2\\): \\(\\int_0^\\infty \\frac{t^{s-1}}{1+t}dt = \\int_0^1 u^{s-1}(1-u)^{-s}du = B(s,1-s) = \\frac{\\Gamma(s)\\Gamma(1-s)}{\\Gamma(1)} = \\frac{\\pi}{\\sin(\\pi s)}\\) by the reflection formula.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Integral Transforms in Context',
            content: `
<h2>The Zoo of Integral Transforms</h2>

<p>We have now met a family of integral transforms, each tailored to a different class of problems. The following visualization summarizes their relationships and domains of applicability.</p>

<div class="viz-placeholder" data-viz="viz-integral-transform-zoo"></div>

<h3>Choosing the Right Transform</h3>

<div class="env-block remark">
    <div class="env-title">A Decision Guide</div>
    <div class="env-body">
        <p><strong>Is the problem on \\([0,\\infty)\\) with initial conditions?</strong> Use the Laplace transform.</p>
        <p><strong>Is the problem on \\((-\\infty,\\infty)\\) with no preferred direction?</strong> Use the Fourier transform.</p>
        <p><strong>Is the problem in discrete time?</strong> Use the Z-transform.</p>
        <p><strong>Does the problem have cylindrical symmetry?</strong> Use the Hankel transform.</p>
        <p><strong>Does the problem involve multiplicative structure or power-law behavior?</strong> Use the Mellin transform.</p>
    </div>
</div>

<h3>The Unifying Thread</h3>

<p>All these transforms share a common structure: they decompose a function into a "basis" of simpler functions (exponentials, Bessel functions, power functions), transforming a difficult problem into a simpler one. The choice of basis reflects the symmetry of the problem:</p>

<ul>
    <li><strong>Fourier</strong>: translational symmetry (plane waves \\(e^{i\\omega t}\\))</li>
    <li><strong>Laplace</strong>: causal + exponential growth/decay (\\(e^{st}\\) with \\(\\mathrm{Re}(s) \\ne 0\\))</li>
    <li><strong>Hankel</strong>: cylindrical symmetry (Bessel functions \\(J_\\nu(kr)\\))</li>
    <li><strong>Mellin</strong>: scale symmetry (power functions \\(t^{s-1}\\))</li>
    <li><strong>Z</strong>: discrete translational symmetry (\\(z^{-n}\\))</li>
</ul>

<h3>Bridge to Variational Calculus</h3>

<p>In the next chapter, we turn from transforming equations to optimizing functionals. The calculus of variations asks: among all curves connecting two points, which one minimizes a given integral? This question underlies the principle of least action in mechanics, Fermat's principle in optics, and the geodesic equation in general relativity.</p>

<p>The Euler-Lagrange equation, which we will derive, is itself a differential equation. The tools of this chapter (Laplace transform, Green's functions from Chapter 10) will continue to be useful in solving the resulting equations of motion.</p>

<div class="env-block intuition">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>Transform methods solve differential equations by converting them to algebra. Variational methods derive the correct differential equations from a physical principle. Together, they form a complete framework: the calculus of variations tells us <em>which</em> equation to solve, and integral transforms tell us <em>how</em> to solve it.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-integral-transform-zoo',
                    title: 'The Integral Transform Zoo',
                    description: 'A comparative overview of the major integral transforms, showing their kernels, domains, and relationships. The Laplace transform (center) connects to all others through limiting cases or variable substitutions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var transforms = [
                            { name: 'Laplace', kernel: 'e^{-st}', domain: '[0,\u221E)', color: viz.colors.blue, x: 280, y: 180 },
                            { name: 'Fourier', kernel: 'e^{-i\u03C9t}', domain: '(-\u221E,\u221E)', color: viz.colors.teal, x: 100, y: 70 },
                            { name: 'Z-transform', kernel: 'z^{-n}', domain: '\u2124\u2265\u2080', color: viz.colors.orange, x: 460, y: 70 },
                            { name: 'Mellin', kernel: 't^{s-1}', domain: '(0,\u221E)', color: viz.colors.purple, x: 100, y: 300 },
                            { name: 'Hankel', kernel: 'tJ\u1D65(kt)', domain: '[0,\u221E)', color: viz.colors.green, x: 460, y: 300 }
                        ];

                        var connections = [
                            { from: 0, to: 1, label: 's = i\u03C9' },
                            { from: 0, to: 2, label: 'z = e^{sT}' },
                            { from: 0, to: 3, label: 't = e^{-u}' },
                            { from: 1, to: 4, label: 'polar coords' }
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('The Integral Transform Family', viz.width / 2, 20, viz.colors.white, 16);

                            // Draw connections
                            for (var ci = 0; ci < connections.length; ci++) {
                                var conn = connections[ci];
                                var f = transforms[conn.from], t = transforms[conn.to];
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y); ctx.stroke();
                                ctx.setLineDash([]);

                                var mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2;
                                // Background for label
                                ctx.fillStyle = '#0c0c20';
                                var tw = ctx.measureText(conn.label).width + 8;
                                ctx.fillRect(mx - tw / 2, my - 8, tw, 16);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(conn.label, mx, my);
                            }

                            // Draw transform boxes
                            for (var ti = 0; ti < transforms.length; ti++) {
                                var tr = transforms[ti];
                                var bw = 130, bh = 80;
                                var bx = tr.x - bw / 2, by = tr.y - bh / 2;

                                // Glow for Laplace (central)
                                if (ti === 0) {
                                    ctx.shadowColor = tr.color;
                                    ctx.shadowBlur = 15;
                                }

                                ctx.fillStyle = tr.color + '22';
                                ctx.strokeStyle = tr.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(bx, by, bw, bh, 10);
                                ctx.fill(); ctx.stroke();

                                ctx.shadowBlur = 0;

                                // Name
                                ctx.fillStyle = tr.color;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText(tr.name, tr.x, by + 8);

                                // Kernel
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('K = ' + tr.kernel, tr.x, tr.y + 2);

                                // Domain
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(tr.domain, tr.x, by + bh - 6);
                            }

                            // Bottom summary
                            viz.screenText('All transforms: F(s) = \u222B K(s,t) f(t) dt', viz.width / 2, viz.height - 20, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The bilateral Laplace transform is defined as \\(\\int_{-\\infty}^{\\infty} e^{-st} f(t)\\,dt\\). Show that restricting to \\(s = i\\omega\\) recovers the Fourier transform (up to a possible sign convention).',
                    hint: 'Substitute \\(s = i\\omega\\) into the bilateral Laplace transform and compare with the definition \\(\\hat{f}(\\omega) = \\int_{-\\infty}^{\\infty} e^{-i\\omega t} f(t)\\,dt\\).',
                    solution: 'With \\(s = i\\omega\\): \\(\\int_{-\\infty}^{\\infty} e^{-i\\omega t} f(t)\\,dt = \\hat{f}(\\omega)\\), which is exactly the Fourier transform. The (one-sided) Laplace transform further restricts to \\(t \\ge 0\\), adding the ability to handle causal signals and exponentially growing functions by allowing \\(\\mathrm{Re}(s) > 0\\). The Fourier transform exists only when the function is absolutely integrable; the Laplace transform extends this by the exponential damping factor \\(e^{-\\sigma t}\\) (where \\(s = \\sigma + i\\omega\\)).'
                }
            ]
        }
    ]
});
