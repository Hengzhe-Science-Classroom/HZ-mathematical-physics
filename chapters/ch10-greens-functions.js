window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: "Green's Functions",
    subtitle: 'The response to a point source',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Green's Functions?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Idea</div>
    <div class="env-body">
        <p>Suppose you know how a system responds to a single, sharp kick at one point. Can you predict its response to <em>any</em> input? The answer is yes, and the tool that makes this possible is the <strong>Green's function</strong>.</p>
    </div>
</div>

<p>Throughout physics, we encounter linear differential equations of the form</p>

\\[
L\\,u(\\mathbf{r}) = f(\\mathbf{r}),
\\]

<p>where \\(L\\) is a linear differential operator (Laplacian, wave operator, Helmholtz operator, etc.) and \\(f\\) is a known source or forcing term. Solving this equation directly for every possible \\(f\\) is impractical. Instead, we ask a more fundamental question: what happens when the source is concentrated at a single point?</p>

<p>If we can solve</p>

\\[
L\\,G(\\mathbf{r}, \\mathbf{r}') = \\delta(\\mathbf{r} - \\mathbf{r}'),
\\]

<p>then the <strong>superposition principle</strong> (which holds because \\(L\\) is linear) lets us build the general solution as</p>

\\[
u(\\mathbf{r}) = \\int G(\\mathbf{r}, \\mathbf{r}')\\,f(\\mathbf{r}')\\,d\\mathbf{r}'.
\\]

<p>This is the same logic as the impulse response in engineering: know the response to a delta function, and you can handle anything via convolution.</p>

<h3>A Simple 1D Example</h3>

<p>Consider a string under tension, loaded by a distributed force \\(f(x)\\). The deflection \\(u(x)\\) satisfies</p>

\\[
-u''(x) = f(x), \\quad u(0) = u(1) = 0.
\\]

<p>If we can find \\(G(x, x')\\) satisfying \\(-G'' = \\delta(x - x')\\) with the same boundary conditions, then</p>

\\[
u(x) = \\int_0^1 G(x, x')\\,f(x')\\,dx'.
\\]

<p>The Green's function \\(G(x, x')\\) for this problem turns out to be a simple piecewise-linear function (a "tent" shape), and the integral above gives the deflection for <em>any</em> loading \\(f\\).</p>

<h3>Why This Matters in Physics</h3>

<p>Green's functions appear everywhere in physics:</p>
<ul>
    <li><strong>Electrostatics</strong>: the potential due to a charge distribution is an integral of the Coulomb Green's function against the charge density.</li>
    <li><strong>Quantum mechanics</strong>: the propagator that evolves quantum states is a Green's function of the Schrodinger equation.</li>
    <li><strong>Acoustics and elasticity</strong>: radiation from vibrating bodies, scattering problems.</li>
    <li><strong>Quantum field theory</strong>: Feynman propagators are Green's functions of the Klein-Gordon and Dirac equations.</li>
</ul>

<p>The concept unifies an enormous range of physical problems under a single mathematical framework. Once you internalize the idea, you see the pattern repeating across all of theoretical physics.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>George Green (1793-1841) was a self-taught English miller who, in his 1828 "Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism," introduced the function that now bears his name. His work was largely ignored until William Thomson (Lord Kelvin) rediscovered it in 1845. Green also proved what we now call Green's theorem, connecting volume integrals to surface integrals.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-impulse-response',
                    title: 'Impulse Response: From Delta Source to Green\'s Function',
                    description: 'A point source (delta function) at position x\' produces the Green\'s function response G(x, x\'). Drag the source position to see how the response changes. The animation shows how the response builds up over time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 300, scale: 450
                        });

                        var xPrime = 0.4;
                        var animPhase = 0;
                        var animating = true;

                        var drag = viz.addDraggable('src', xPrime, 0, viz.colors.orange, 8, function(wx) {
                            xPrime = Math.max(0.05, Math.min(0.95, wx));
                            drag.x = xPrime;
                            drag.y = 0;
                        });

                        function greens(x, xp) {
                            if (x <= xp) return x * (1 - xp);
                            return xp * (1 - x);
                        }

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText("Green's Function: -u'' = \u03B4(x - x')", viz.width / 2, 20, viz.colors.white, 15);
                            viz.screenText('u(0) = u(1) = 0', viz.width / 2, 38, viz.colors.text, 11);

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(60, 300); ctx.lineTo(510, 300);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(60, 300); ctx.lineTo(60, 60);
                            ctx.stroke();

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var i = 0; i <= 10; i++) {
                                var xv = i / 10;
                                var sx = 60 + xv * 450;
                                if (i % 2 === 0) ctx.fillText(xv.toFixed(1), sx, 304);
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(sx, 300); ctx.lineTo(sx, 60); ctx.stroke();
                            }
                            ctx.fillText('x', 530, 296);

                            // Y-axis label
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('G', 52, 55);

                            // Animation envelope
                            var env = animating ? Math.min(1, (t % 3000) / 1500) : 1;

                            // Draw the Green's function
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = 200;
                            for (var j = 0; j <= steps; j++) {
                                var x = j / steps;
                                var g = greens(x, xPrime) * env;
                                var sx2 = 60 + x * 450;
                                var sy2 = 300 - g * 900;
                                if (j === 0) ctx.moveTo(sx2, sy2);
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Fill under curve
                            ctx.fillStyle = viz.colors.blue + '15';
                            ctx.beginPath();
                            ctx.moveTo(60, 300);
                            for (var k = 0; k <= steps; k++) {
                                var x3 = k / steps;
                                var g3 = greens(x3, xPrime) * env;
                                ctx.lineTo(60 + x3 * 450, 300 - g3 * 900);
                            }
                            ctx.lineTo(510, 300);
                            ctx.closePath();
                            ctx.fill();

                            // Source position marker (vertical line)
                            var sxp = 60 + xPrime * 450;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(sxp, 300); ctx.lineTo(sxp, 60); ctx.stroke();
                            ctx.setLineDash([]);

                            // Delta function arrow at source
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(sxp, 300);
                            ctx.lineTo(sxp, 300 - 40 * env);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(sxp, 300 - 44 * env);
                            ctx.lineTo(sxp - 5, 300 - 34 * env);
                            ctx.lineTo(sxp + 5, 300 - 34 * env);
                            ctx.closePath();
                            ctx.fill();

                            // Peak value annotation
                            var peakVal = xPrime * (1 - xPrime) * env;
                            viz.screenText("x' = " + xPrime.toFixed(2), sxp, 320, viz.colors.orange, 11);
                            viz.screenText('G_max = ' + peakVal.toFixed(3), viz.width / 2, 350, viz.colors.blue, 12);
                            viz.screenText('\u03B4(x - x\')', sxp + 20, 300 - 44 * env, viz.colors.orange, 11, 'left');

                            // Draggable
                            drag.x = xPrime;
                            drag.y = 0;
                            var dsx = 60 + xPrime * 450;
                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.beginPath(); ctx.arc(dsx, 300, 12, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(dsx, 300, 8, 0, Math.PI * 2); ctx.fill();
                        }

                        // Override draggable to use screen coordinates
                        viz.canvas.onmousedown = function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var dsx = 60 + xPrime * 450;
                            if (Math.abs(mx - dsx) < 20 && Math.abs(my - 300) < 20) {
                                viz._draggingSource = true;
                            }
                        };
                        viz.canvas.onmousemove = function(e) {
                            if (!viz._draggingSource) return;
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            xPrime = Math.max(0.05, Math.min(0.95, (mx - 60) / 450));
                        };
                        viz.canvas.onmouseup = function() { viz._draggingSource = false; };
                        viz.canvas.onmouseleave = function() { viz._draggingSource = false; };

                        VizEngine.createButton(controls, animating ? 'Pause' : 'Play', function() {
                            animating = !animating;
                            this.textContent = animating ? 'Pause' : 'Play';
                        });

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Verify that the Green's function \\(G(x, x') = x_{<}(1 - x_{>})\\), where \\(x_{<} = \\min(x, x')\\) and \\(x_{>} = \\max(x, x')\\), satisfies the boundary conditions \\(G(0, x') = G(1, x') = 0\\).",
                    hint: "Set \\(x = 0\\) and \\(x = 1\\) in each piece of the piecewise definition.",
                    solution: "For \\(x = 0\\): since \\(0 \\le x'\\) always, \\(G(0, x') = 0 \\cdot (1 - x') = 0\\). For \\(x = 1\\): since \\(1 \\ge x'\\) always, \\(G(1, x') = x'(1 - 1) = 0\\). Both boundary conditions are satisfied. \\(\\checkmark\\)"
                }
            ]
        },

        // ================================================================
        // SECTION 2: Green's Functions — Definition
        // ================================================================
        {
            id: 'sec-definition',
            title: "Green's Functions",
            content: `
<h2>Green's Functions: Definition and Properties</h2>

<div class="env-block definition">
    <div class="env-title">Definition 10.1 (Green's Function)</div>
    <div class="env-body">
        <p>Let \\(L\\) be a linear differential operator acting on functions defined on a domain \\(\\Omega\\), with boundary conditions imposed on \\(\\partial\\Omega\\). The <strong>Green's function</strong> \\(G(\\mathbf{r}, \\mathbf{r}')\\) is the solution to</p>
        \\[
        L\\,G(\\mathbf{r}, \\mathbf{r}') = \\delta(\\mathbf{r} - \\mathbf{r}'),
        \\]
        <p>subject to the same (homogeneous) boundary conditions. The variable \\(\\mathbf{r}\\) is the <em>field point</em> (where we observe) and \\(\\mathbf{r}'\\) is the <em>source point</em> (where the delta function sits).</p>
    </div>
</div>

<p>The power of this definition lies in the <strong>superposition integral</strong>. If \\(L\\,u = f\\), then</p>

\\[
u(\\mathbf{r}) = \\int_{\\Omega} G(\\mathbf{r}, \\mathbf{r}')\\,f(\\mathbf{r}')\\,d\\mathbf{r}'.
\\]

<p>This works because \\(L\\) is linear:</p>

\\[
L\\,u(\\mathbf{r}) = L \\int G(\\mathbf{r}, \\mathbf{r}')\\,f(\\mathbf{r}')\\,d\\mathbf{r}' = \\int \\underbrace{L\\,G(\\mathbf{r}, \\mathbf{r}')}_{\\delta(\\mathbf{r} - \\mathbf{r}')}\\,f(\\mathbf{r}')\\,d\\mathbf{r}' = f(\\mathbf{r}).
\\]

<h3>Symmetry of the Green's Function</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.1 (Reciprocity / Symmetry)</div>
    <div class="env-body">
        <p>For a self-adjoint operator \\(L\\) (i.e., \\(\\langle u, Lv \\rangle = \\langle Lu, v \\rangle\\) for all \\(u, v\\) satisfying the boundary conditions), the Green's function is symmetric:</p>
        \\[
        G(\\mathbf{r}, \\mathbf{r}') = G(\\mathbf{r}', \\mathbf{r}).
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Let \\(G_1(\\mathbf{r}) = G(\\mathbf{r}, \\mathbf{r}_1)\\) and \\(G_2(\\mathbf{r}) = G(\\mathbf{r}, \\mathbf{r}_2)\\) be Green's functions with sources at \\(\\mathbf{r}_1\\) and \\(\\mathbf{r}_2\\). Self-adjointness gives</p>
        \\[
        \\langle G_1, LG_2 \\rangle = \\langle LG_1, G_2 \\rangle.
        \\]
        <p>The left side is \\(\\langle G_1, \\delta(\\cdot - \\mathbf{r}_2) \\rangle = G(\\mathbf{r}_2, \\mathbf{r}_1)\\). The right side is \\(\\langle \\delta(\\cdot - \\mathbf{r}_1), G_2 \\rangle = G(\\mathbf{r}_1, \\mathbf{r}_2)\\). Therefore \\(G(\\mathbf{r}_1, \\mathbf{r}_2) = G(\\mathbf{r}_2, \\mathbf{r}_1)\\). \\(\\square\\)</p>
    </div>
</div>

<p>Physically, reciprocity means: if a source at \\(\\mathbf{r}'\\) produces a response at \\(\\mathbf{r}\\), then a source at \\(\\mathbf{r}\\) produces the same response at \\(\\mathbf{r}'\\). This is the mathematical expression of the physical principle of reciprocity in acoustics, electrostatics, and elasticity.</p>

<h3>Boundary Conditions and Uniqueness</h3>

<p>The Green's function depends critically on the boundary conditions. Common types:</p>

<ul>
    <li><strong>Dirichlet</strong>: \\(G = 0\\) on \\(\\partial\\Omega\\). The source response vanishes at the boundary.</li>
    <li><strong>Neumann</strong>: \\(\\partial G/\\partial n = 0\\) on \\(\\partial\\Omega\\) (or a modified version for the Laplacian).</li>
    <li><strong>Free-space (no boundary)</strong>: \\(G \\to 0\\) as \\(|\\mathbf{r} - \\mathbf{r}'| \\to \\infty\\).</li>
</ul>

<p>For a given operator and boundary conditions, the Green's function is <strong>unique</strong> (provided the homogeneous equation \\(Lu = 0\\) has only the trivial solution with those boundary conditions).</p>

<h3>Connection to the Impulse Response</h3>

<p>In the language of linear systems theory, the Green's function is the <strong>impulse response</strong>. The source \\(f(\\mathbf{r})\\) is the input, the solution \\(u(\\mathbf{r})\\) is the output, and the superposition integral is a <strong>convolution</strong> (in the free-space case where \\(G\\) depends only on \\(\\mathbf{r} - \\mathbf{r}'\\)):</p>

\\[
u = G * f.
\\]

<p>This connects the PDE world to Fourier analysis: in Fourier space, convolution becomes multiplication, so \\(\\hat{u} = \\hat{G}\\,\\hat{f}\\).</p>
`,
            visualizations: [
                {
                    id: 'viz-eigenfunction-greens',
                    title: "Eigenfunction Expansion of Green's Function",
                    description: "The Green's function can be expanded in the eigenfunctions of L. Watch how adding more terms in the expansion G = sum phi_n(x)phi_n(x\') / lambda_n converges to the exact Green's function.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 300, scale: 450
                        });

                        var nTerms = 3;
                        var xPrime = 0.35;

                        VizEngine.createSlider(controls, 'Terms N', 1, 30, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, "x'", 0.05, 0.95, xPrime, 0.05, function(v) {
                            xPrime = v;
                            draw();
                        });

                        function exactGreens(x, xp) {
                            if (x <= xp) return x * (1 - xp);
                            return xp * (1 - x);
                        }

                        function eigenfuncGreens(x, xp, N) {
                            var sum = 0;
                            for (var n = 1; n <= N; n++) {
                                var lam = n * n * Math.PI * Math.PI;
                                var phi = Math.sin(n * Math.PI * x);
                                var phip = Math.sin(n * Math.PI * xp);
                                sum += 2 * phi * phip / lam;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText("Eigenfunction Expansion of G(x, x')", viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText("G = \u03A3 2 sin(n\u03C0x) sin(n\u03C0x') / (n\u00B2\u03C0\u00B2)", viz.width / 2, 38, viz.colors.text, 11);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(60, 300); ctx.lineTo(510, 300); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(60, 300); ctx.lineTo(60, 60); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var i = 0; i <= 10; i += 2) {
                                var xv = i / 10;
                                var sx = 60 + xv * 450;
                                ctx.fillText(xv.toFixed(1), sx, 304);
                            }

                            var yScale = 900;

                            // Exact Green's function
                            ctx.strokeStyle = viz.colors.white + '44'; ctx.lineWidth = 6;
                            ctx.beginPath();
                            for (var j = 0; j <= 200; j++) {
                                var x = j / 200;
                                var g = exactGreens(x, xPrime);
                                var sx2 = 60 + x * 450;
                                var sy2 = 300 - g * yScale;
                                if (j === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Eigenfunction expansion
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var k = 0; k <= 200; k++) {
                                var x2 = k / 200;
                                var gApprox = eigenfuncGreens(x2, xPrime, nTerms);
                                var sx3 = 60 + x2 * 450;
                                var sy3 = 300 - gApprox * yScale;
                                if (k === 0) ctx.moveTo(sx3, sy3); else ctx.lineTo(sx3, sy3);
                            }
                            ctx.stroke();

                            // Source position
                            var sxp = 60 + xPrime * 450;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(sxp, 300); ctx.lineTo(sxp, 60); ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.white + '66';
                            ctx.fillRect(380, 58, 12, 3);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Exact', 396, 64);

                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(380, 80); ctx.lineTo(392, 80); ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('N = ' + nTerms + ' terms', 396, 84);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText("x' = " + xPrime.toFixed(2), 396, 104);

                            // Error metric
                            var maxErr = 0;
                            for (var m = 0; m <= 100; m++) {
                                var xt = m / 100;
                                var err = Math.abs(exactGreens(xt, xPrime) - eigenfuncGreens(xt, xPrime, nTerms));
                                if (err > maxErr) maxErr = err;
                            }
                            viz.screenText('Max error: ' + maxErr.toExponential(2), viz.width / 2, 350, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Show that the eigenfunction expansion of the Green's function for \\(-u'' = f\\) on \\([0, 1]\\) with Dirichlet conditions is \\(G(x, x') = \\sum_{n=1}^{\\infty} \\frac{2\\sin(n\\pi x)\\sin(n\\pi x')}{n^2 \\pi^2}\\).",
                    hint: "The eigenfunctions of \\(-d^2/dx^2\\) on \\([0,1]\\) with Dirichlet conditions are \\(\\phi_n(x) = \\sqrt{2}\\sin(n\\pi x)\\) with eigenvalues \\(\\lambda_n = n^2\\pi^2\\). Use the bilinear expansion \\(G = \\sum \\phi_n(x)\\phi_n(x')/\\lambda_n\\).",
                    solution: "The normalized eigenfunctions are \\(\\phi_n(x) = \\sqrt{2}\\sin(n\\pi x)\\) with \\(\\lambda_n = n^2\\pi^2\\). The eigenfunction expansion is \\(G(x,x') = \\sum_{n=1}^\\infty \\frac{\\phi_n(x)\\phi_n(x')}{\\lambda_n} = \\sum_{n=1}^\\infty \\frac{2\\sin(n\\pi x)\\sin(n\\pi x')}{n^2\\pi^2}\\). Convergence follows from \\(\\sum 1/n^2 < \\infty\\). One can verify this equals \\(x_<(1 - x_>)\\) by computing the Fourier sine series of the piecewise-linear function."
                },
                {
                    question: "Prove that if \\(L\\) is self-adjoint, the Green's function must be real-valued (assuming real boundary conditions and a real domain).",
                    hint: "Take the complex conjugate of the defining equation \\(LG = \\delta\\) and use uniqueness.",
                    solution: "If \\(LG(\\mathbf{r}, \\mathbf{r}') = \\delta(\\mathbf{r} - \\mathbf{r}')\\), taking complex conjugates gives \\(L\\overline{G}(\\mathbf{r}, \\mathbf{r}') = \\delta(\\mathbf{r} - \\mathbf{r}')\\) (since \\(L\\) has real coefficients and \\(\\delta\\) is real). Both \\(G\\) and \\(\\overline{G}\\) satisfy the same equation with the same boundary conditions. By uniqueness, \\(G = \\overline{G}\\), so \\(G\\) is real."
                }
            ]
        },

        // ================================================================
        // SECTION 3: Constructing Green's Functions
        // ================================================================
        {
            id: 'sec-construction',
            title: "Constructing Green's Functions",
            content: `
<h2>Constructing Green's Functions</h2>

<p>There are several general strategies for finding the Green's function. Which method is best depends on the operator, the domain geometry, and the boundary conditions.</p>

<h3>Method 1: Eigenfunction Expansion</h3>

<p>If the eigenfunctions \\(\\{\\phi_n\\}\\) and eigenvalues \\(\\{\\lambda_n\\}\\) of \\(L\\) are known (i.e., \\(L\\phi_n = \\lambda_n \\phi_n\\)), then the Green's function has the <strong>bilinear expansion</strong>:</p>

\\[
G(\\mathbf{r}, \\mathbf{r}') = \\sum_n \\frac{\\phi_n(\\mathbf{r})\\,\\phi_n^*(\\mathbf{r}')}{\\lambda_n}.
\\]

<p>This follows directly from expanding \\(\\delta(\\mathbf{r} - \\mathbf{r}')\\) in the eigenfunction basis: \\(\\delta(\\mathbf{r} - \\mathbf{r}') = \\sum_n \\phi_n(\\mathbf{r})\\,\\phi_n^*(\\mathbf{r}')\\) (the completeness relation), so</p>

\\[
LG = \\sum_n \\frac{\\lambda_n \\phi_n(\\mathbf{r})\\,\\phi_n^*(\\mathbf{r}')}{\\lambda_n} = \\sum_n \\phi_n(\\mathbf{r})\\,\\phi_n^*(\\mathbf{r}') = \\delta(\\mathbf{r} - \\mathbf{r}').
\\]

<div class="env-block example">
    <div class="env-title">Example: Green's Function on a Rectangle</div>
    <div class="env-body">
        <p>For \\(-\\nabla^2 G = \\delta\\) on the rectangle \\([0, a] \\times [0, b]\\) with Dirichlet conditions, the eigenfunctions are \\(\\phi_{mn}(x,y) = \\frac{2}{\\sqrt{ab}}\\sin\\frac{m\\pi x}{a}\\sin\\frac{n\\pi y}{b}\\) with \\(\\lambda_{mn} = \\pi^2(m^2/a^2 + n^2/b^2)\\). Therefore:</p>
        \\[
        G(\\mathbf{r}, \\mathbf{r}') = \\frac{4}{ab} \\sum_{m,n=1}^{\\infty} \\frac{\\sin\\frac{m\\pi x}{a}\\sin\\frac{n\\pi y}{b}\\sin\\frac{m\\pi x'}{a}\\sin\\frac{n\\pi y'}{b}}{\\pi^2(m^2/a^2 + n^2/b^2)}.
        \\]
    </div>
</div>

<h3>Method 2: Fourier Transform</h3>

<p>In free space (no boundaries), translational invariance means \\(G\\) depends only on \\(\\mathbf{r} - \\mathbf{r}'\\). Taking the Fourier transform of \\(LG = \\delta\\) converts the PDE into an algebraic equation:</p>

\\[
\\widetilde{L}(\\mathbf{k})\\,\\hat{G}(\\mathbf{k}) = 1,
\\]

<p>where \\(\\widetilde{L}(\\mathbf{k})\\) is the symbol of \\(L\\) in Fourier space. Then \\(\\hat{G} = 1/\\widetilde{L}\\), and we invert:</p>

\\[
G(\\mathbf{r} - \\mathbf{r}') = \\int \\frac{e^{i\\mathbf{k}\\cdot(\\mathbf{r} - \\mathbf{r}')}}{\\widetilde{L}(\\mathbf{k})} \\frac{d\\mathbf{k}}{(2\\pi)^d}.
\\]

<div class="env-block example">
    <div class="env-title">Example: Helmholtz Equation in 3D Free Space</div>
    <div class="env-body">
        <p>For \\((\\nabla^2 + k_0^2)G = -\\delta\\), the Fourier transform gives \\((-k^2 + k_0^2)\\hat{G} = -1\\), so \\(\\hat{G} = 1/(k^2 - k_0^2)\\). Inverting (with appropriate \\(i\\epsilon\\) prescription for the pole):</p>
        \\[
        G(\\mathbf{r}) = \\frac{e^{ik_0 r}}{4\\pi r} \\quad \\text{(outgoing wave)}.
        \\]
    </div>
</div>

<h3>Method 3: Method of Images</h3>

<p>For simple geometries (half-spaces, spheres, wedges), we can construct the Green's function by starting with the free-space Green's function and adding <strong>image sources</strong> placed outside the domain so that the boundary conditions are satisfied.</p>

<p>The idea is physically intuitive: an image charge placed behind a grounded conducting plane creates a potential that, together with the real charge, vanishes on the plane. The mathematical content is that the image terms are solutions of the homogeneous equation inside the domain, so adding them does not spoil \\(LG = \\delta\\) inside.</p>

<div class="env-block example">
    <div class="env-title">Example: Half-Space with Dirichlet Conditions</div>
    <div class="env-body">
        <p>For the Laplacian in the half-space \\(z > 0\\) with \\(G = 0\\) on \\(z = 0\\):</p>
        \\[
        G(\\mathbf{r}, \\mathbf{r}') = \\frac{1}{4\\pi|\\mathbf{r} - \\mathbf{r}'|} - \\frac{1}{4\\pi|\\mathbf{r} - \\mathbf{r}'_\\text{image}|},
        \\]
        <p>where \\(\\mathbf{r}'_\\text{image} = (x', y', -z')\\) is the reflection of the source through the plane.</p>
    </div>
</div>

<h3>Method 4: Direct Construction (1D)</h3>

<p>For a second-order ODE \\(L[y] = f\\) on \\([a, b]\\), the Green's function can be constructed directly from two linearly independent solutions of the homogeneous equation \\(Ly = 0\\):</p>

\\[
G(x, x') = \\begin{cases}
c_1 \\, y_1(x) \\, y_2(x') & x < x', \\\\
c_2 \\, y_1(x') \\, y_2(x) & x > x',
\\end{cases}
\\]

<p>where \\(y_1\\) satisfies the left boundary condition, \\(y_2\\) satisfies the right, and the constants are fixed by continuity of \\(G\\) and a unit jump in \\(G'\\) at \\(x = x'\\). The jump condition comes from integrating \\(LG = \\delta\\) across \\(x'\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.2 (Jump Condition)</div>
    <div class="env-body">
        <p>For the operator \\(L = \\frac{d}{dx}\\bigl[p(x)\\frac{d}{dx}\\bigr] + q(x)\\), the Green's function satisfies:</p>
        <ol>
            <li>\\(G\\) is continuous at \\(x = x'\\),</li>
            <li>\\(\\displaystyle p(x')\\left[\\frac{\\partial G}{\\partial x}\\bigg|_{x = x'^+} - \\frac{\\partial G}{\\partial x}\\bigg|_{x = x'^-}\\right] = 1\\).</li>
        </ol>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-image-charges',
                    title: 'Method of Images: Electrostatic Green\'s Functions',
                    description: 'A charge near a grounded conducting plane. The image charge (reflection) ensures the potential vanishes on the boundary. Drag the real charge to see how the potential and image change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 80
                        });

                        var qx = 1.5, qy = 1.2;

                        var drag = viz.addDraggable('charge', qx, qy, viz.colors.blue, 8, function(wx, wy) {
                            if (wx < 0.15) wx = 0.15;
                            qx = wx; qy = wy;
                            drag.x = qx; drag.y = qy;
                        });

                        function potential(x, y, cx, cy, sign) {
                            var dx = x - cx, dy = y - cy;
                            var r = Math.sqrt(dx * dx + dy * dy);
                            if (r < 0.08) return sign * 5;
                            return sign / r;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Compute potential field via heatmap-like rendering
                            var pw = viz.width, ph = viz.height;
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var wx = (px - viz.originX) / viz.scale;
                                    var wy = (viz.originY - py) / viz.scale;

                                    // Real charge at (qx, qy), image at (-qx, qy)
                                    var V = potential(wx, wy, qx, qy, 1) + potential(wx, wy, -qx, qy, -1);

                                    // Map potential to color
                                    var t = Math.atan(V * 0.8) / Math.PI + 0.5;
                                    var r, g, b;
                                    if (V > 0) {
                                        r = Math.round(40 + 180 * t);
                                        g = Math.round(60 + 80 * (1 - t));
                                        b = Math.round(200 * (1 - t));
                                    } else {
                                        r = Math.round(40 * t);
                                        g = Math.round(60 + 80 * t);
                                        b = Math.round(100 + 155 * (1 - t));
                                    }

                                    var idx = (py * pw + px) * 4;
                                    data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            // Draw the conducting plane (x = 0)
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, 0);
                            ctx.lineTo(viz.originX, viz.height);
                            ctx.stroke();

                            // Shade left half slightly
                            ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
                            ctx.fillRect(0, 0, viz.originX, viz.height);

                            // Draw equipotential V = 0 line (should be on the plane)
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Real charge
                            var scx = viz.originX + qx * viz.scale;
                            var scy = viz.originY - qy * viz.scale;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(scx, scy, 10, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('+q', scx, scy);

                            // Image charge
                            var imx = viz.originX - qx * viz.scale;
                            var imy = viz.originY - qy * viz.scale;
                            ctx.fillStyle = viz.colors.red + '88';
                            ctx.beginPath(); ctx.arc(imx, imy, 10, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('-q', imx, imy);

                            // Dashed line connecting charge to image
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(scx, scy); ctx.lineTo(imx, imy); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            viz.screenText('Method of Images: Grounded Plane', viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText('V = 0 on boundary', viz.originX + 4, viz.height - 16, viz.colors.yellow, 10, 'left');
                            viz.screenText('Real charge (drag me)', scx, scy - 20, viz.colors.blue, 10);
                            viz.screenText('Image charge', imx, imy - 20, viz.colors.red, 10);
                            viz.screenText('Conductor', viz.originX - 50, 16, viz.colors.text, 10);
                        }

                        draw();
                        // Redraw on drag
                        var origMove = viz.canvas.onmousemove;
                        viz.canvas.addEventListener('mousemove', function() { draw(); });
                        viz.canvas.addEventListener('mouseup', function() { draw(); });
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Use the Fourier transform method to derive the free-space Green's function for the 3D Laplacian: \\(\\nabla^2 G = \\delta(\\mathbf{r})\\).",
                    hint: "In Fourier space, \\(-k^2 \\hat{G} = 1\\), so \\(\\hat{G} = -1/k^2\\). Convert the inverse Fourier transform to spherical coordinates in \\(\\mathbf{k}\\)-space.",
                    solution: "Taking the Fourier transform: \\(-k^2 \\hat{G}(\\mathbf{k}) = 1\\), so \\(\\hat{G} = -1/k^2\\). The inverse transform in 3D, using spherical coordinates in \\(k\\)-space with the axis along \\(\\mathbf{r}\\): \\(G(r) = -\\frac{1}{(2\\pi)^3}\\int_0^\\infty \\frac{4\\pi k^2}{k^2} \\frac{\\sin kr}{kr} dk = -\\frac{1}{2\\pi^2 r}\\int_0^\\infty \\frac{\\sin kr}{k} dk = -\\frac{1}{2\\pi^2 r} \\cdot \\frac{\\pi}{2} = -\\frac{1}{4\\pi r}\\). Therefore \\(G(\\mathbf{r}) = -1/(4\\pi|\\mathbf{r}|)\\)."
                }
            ]
        },

        // ================================================================
        // SECTION 4: Electrostatic Green's Functions
        // ================================================================
        {
            id: 'sec-electrostatics',
            title: "Electrostatic Green's Functions",
            content: `
<h2>Electrostatic Green's Functions</h2>

<p>Electrostatics provides the most physically transparent examples of Green's functions. The electrostatic potential \\(\\Phi\\) satisfies Poisson's equation:</p>

\\[
\\nabla^2 \\Phi(\\mathbf{r}) = -\\frac{\\rho(\\mathbf{r})}{\\epsilon_0},
\\]

<p>where \\(\\rho\\) is the charge density. The Green's function \\(G\\) satisfies \\(\\nabla^2 G = \\delta(\\mathbf{r} - \\mathbf{r}')\\), so the potential is</p>

\\[
\\Phi(\\mathbf{r}) = -\\frac{1}{\\epsilon_0} \\int G(\\mathbf{r}, \\mathbf{r}')\\,\\rho(\\mathbf{r}')\\,d^3r'.
\\]

<h3>Free-Space Green's Function (Coulomb)</h3>

<p>In free space with no boundaries:</p>

\\[
G_0(\\mathbf{r}, \\mathbf{r}') = -\\frac{1}{4\\pi|\\mathbf{r} - \\mathbf{r}'|}.
\\]

<p>This is just the potential of a unit point charge at \\(\\mathbf{r}'\\), divided by \\(-4\\pi\\epsilon_0\\). The familiar Coulomb potential is recovered:</p>

\\[
\\Phi(\\mathbf{r}) = \\frac{1}{4\\pi\\epsilon_0} \\int \\frac{\\rho(\\mathbf{r}')}{|\\mathbf{r} - \\mathbf{r}'|}\\,d^3r'.
\\]

<h3>Green's Function for a Grounded Sphere</h3>

<p>One of the most elegant applications of the method of images. For a grounded conducting sphere of radius \\(a\\) centered at the origin, a point charge \\(q\\) at position \\(\\mathbf{r}'\\) (with \\(|\\mathbf{r}'| > a\\), i.e., outside the sphere) has an image charge:</p>

<ul>
    <li><strong>Image location</strong>: \\(\\mathbf{r}'_\\text{img} = \\frac{a^2}{r'^2}\\,\\mathbf{r}'\\) (inside the sphere, along the same radial line).</li>
    <li><strong>Image magnitude</strong>: \\(q' = -\\frac{a}{r'}\\,q\\).</li>
</ul>

<p>The Green's function for the exterior of the sphere is</p>

\\[
G(\\mathbf{r}, \\mathbf{r}') = -\\frac{1}{4\\pi|\\mathbf{r} - \\mathbf{r}'|} + \\frac{a/r'}{4\\pi|\\mathbf{r} - \\frac{a^2}{r'^2}\\mathbf{r}'|}.
\\]

<p>One can verify that \\(G = 0\\) when \\(|\\mathbf{r}| = a\\), confirming the Dirichlet boundary condition on the sphere.</p>

<h3>Green's Second Identity and the Boundary Term</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.3 (Solution via Green's Function)</div>
    <div class="env-body">
        <p>The full solution to \\(\\nabla^2 \\Phi = -\\rho/\\epsilon_0\\) in a volume \\(V\\) with boundary \\(S\\) is</p>
        \\[
        \\Phi(\\mathbf{r}) = -\\frac{1}{\\epsilon_0}\\int_V G(\\mathbf{r}, \\mathbf{r}')\\,\\rho(\\mathbf{r}')\\,d^3r' + \\oint_S \\left[\\Phi(\\mathbf{r}')\\frac{\\partial G}{\\partial n'} - G(\\mathbf{r}, \\mathbf{r}')\\frac{\\partial \\Phi}{\\partial n'}\\right] dS'.
        \\]
        <p>For Dirichlet conditions (\\(G = 0\\) on \\(S\\)), the second term in the surface integral vanishes, and we get a boundary contribution from \\(\\Phi\\,\\partial G/\\partial n'\\) alone.</p>
    </div>
</div>

<p>This shows that the Green's function encodes not just the response to interior sources, but also how boundary values propagate into the interior.</p>

<h3>Electrostatic Energy</h3>

<p>The electrostatic energy of a charge distribution is</p>

\\[
W = \\frac{1}{2}\\int\\int \\frac{\\rho(\\mathbf{r})\\,\\rho(\\mathbf{r}')}{4\\pi\\epsilon_0|\\mathbf{r} - \\mathbf{r}'|}\\,d^3r\\,d^3r' = -\\frac{\\epsilon_0}{2}\\int\\int \\rho(\\mathbf{r})\\,G_0(\\mathbf{r}, \\mathbf{r}')\\,\\rho(\\mathbf{r}')\\,d^3r\\,d^3r'.
\\]

<p>The Green's function thus appears as the kernel of the energy bilinear form. Its symmetry \\(G(\\mathbf{r}, \\mathbf{r}') = G(\\mathbf{r}', \\mathbf{r})\\) ensures that the energy is real and properly defined.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: "Derive the image charge location and magnitude for a point charge \\(q\\) at distance \\(d\\) from a grounded conducting sphere of radius \\(a\\) (with \\(d > a\\)).",
                    hint: "Place an image charge \\(q'\\) at distance \\(d'\\) from the center along the same line. Require \\(G = 0\\) on the sphere surface. Use the law of cosines to compare the distances from the two charges to an arbitrary point on the sphere.",
                    solution: "For a point on the sphere at position \\(\\mathbf{r}\\) with \\(|\\mathbf{r}| = a\\), the potential must vanish: \\(q/|\\mathbf{r} - d\\hat{z}| + q'/|\\mathbf{r} - d'\\hat{z}| = 0\\). By the law of cosines: \\(|\\mathbf{r} - d\\hat{z}|^2 = a^2 + d^2 - 2ad\\cos\\theta\\) and \\(|\\mathbf{r} - d'\\hat{z}|^2 = a^2 + d'^2 - 2ad'\\cos\\theta\\). Setting \\(q'/q = -a/d\\) and \\(d' = a^2/d\\), we get \\(|\\mathbf{r} - d'\\hat{z}|^2 = (a/d)^2(a^2 + d^2 - 2ad\\cos\\theta) = (a/d)^2|\\mathbf{r} - d\\hat{z}|^2\\), so \\(q/|\\mathbf{r} - d\\hat{z}| + q'/|\\mathbf{r} - d'\\hat{z}| = (q - q \\cdot (a/d)/(a/d))/|\\mathbf{r} - d\\hat{z}| = 0\\). \\(\\checkmark\\)"
                },
                {
                    question: "Using Green's second identity, show that \\(\\Phi(\\mathbf{r}) = -\\frac{1}{4\\pi}\\oint_S \\Phi(\\mathbf{r}')\\frac{\\partial}{\\partial n'}\\frac{1}{|\\mathbf{r} - \\mathbf{r}'|}\\,dS'\\) for a harmonic function (\\(\\nabla^2\\Phi = 0\\)) inside \\(V\\).",
                    hint: "Apply Green's second identity with \\(u = \\Phi\\) and \\(v = 1/|\\mathbf{r} - \\mathbf{r}'|\\). Note that \\(\\nabla'^2(1/|\\mathbf{r}-\\mathbf{r}'|) = -4\\pi\\delta(\\mathbf{r} - \\mathbf{r}')\\).",
                    solution: "Green's second identity: \\(\\int_V (u\\nabla^2 v - v\\nabla^2 u)\\,dV = \\oint_S (u\\partial v/\\partial n - v \\partial u/\\partial n)\\,dS\\). Set \\(u = \\Phi\\), \\(v = 1/|\\mathbf{r}-\\mathbf{r}'|\\). Then \\(\\nabla'^2 u = 0\\) and \\(\\nabla'^2 v = -4\\pi\\delta(\\mathbf{r}-\\mathbf{r}')\\). Left side: \\(-4\\pi\\Phi(\\mathbf{r})\\). Right side: \\(\\oint_S [\\Phi \\partial(1/|\\mathbf{r}-\\mathbf{r}'|)/\\partial n' - (1/|\\mathbf{r}-\\mathbf{r}'|)\\partial\\Phi/\\partial n']\\,dS'\\). Since \\(\\Phi\\) is harmonic, the second surface integral is the normal derivative contribution. Rearranging gives the stated formula."
                }
            ]
        },

        // ================================================================
        // SECTION 5: Time-Dependent Green's Functions
        // ================================================================
        {
            id: 'sec-time',
            title: "Time-Dependent Green's Functions",
            content: `
<h2>Time-Dependent Green's Functions</h2>

<p>When the operator involves time, the Green's function acquires a causal structure. The most important distinction is between <strong>retarded</strong>, <strong>advanced</strong>, and <strong>Feynman</strong> propagators.</p>

<h3>The Retarded Green's Function</h3>

<p>Consider the wave equation in 3D:</p>

\\[
\\left(\\nabla^2 - \\frac{1}{c^2}\\frac{\\partial^2}{\\partial t^2}\\right) G = \\delta^3(\\mathbf{r} - \\mathbf{r}')\\,\\delta(t - t').
\\]

<p>The <strong>retarded</strong> Green's function satisfies the causality condition \\(G_{\\text{ret}} = 0\\) for \\(t < t'\\) (no response before the source acts):</p>

\\[
G_{\\text{ret}}(\\mathbf{r}, t; \\mathbf{r}', t') = -\\frac{\\delta\\bigl(t - t' - |\\mathbf{r} - \\mathbf{r}'|/c\\bigr)}{4\\pi|\\mathbf{r} - \\mathbf{r}'|}.
\\]

<p>The delta function enforces that the signal travels at speed \\(c\\): the response at \\(\\mathbf{r}\\) arrives exactly at the retarded time \\(t = t' + |\\mathbf{r} - \\mathbf{r}'|/c\\). This is the mathematical expression of the <strong>light cone</strong>.</p>

<h3>The Advanced Green's Function</h3>

<p>The <strong>advanced</strong> Green's function has the opposite causality: \\(G_{\\text{adv}} = 0\\) for \\(t > t'\\):</p>

\\[
G_{\\text{adv}}(\\mathbf{r}, t; \\mathbf{r}', t') = -\\frac{\\delta\\bigl(t - t' + |\\mathbf{r} - \\mathbf{r}'|/c\\bigr)}{4\\pi|\\mathbf{r} - \\mathbf{r}'|}.
\\]

<p>While mathematically valid, the advanced propagator violates our physical intuition about causality. It is useful, however, in time-reversal arguments and in the Wheeler-Feynman absorber theory.</p>

<h3>The Diffusion (Heat) Green's Function</h3>

<p>The heat equation \\(\\partial u/\\partial t = D\\nabla^2 u\\) has a different character because it is first-order in time. Its Green's function (also called the <strong>heat kernel</strong>) is</p>

\\[
G(\\mathbf{r}, t; \\mathbf{r}', t') = \\frac{\\Theta(t - t')}{[4\\pi D(t - t')]^{d/2}} \\exp\\left(-\\frac{|\\mathbf{r} - \\mathbf{r}'|^2}{4D(t - t')}\\right),
\\]

<p>where \\(d\\) is the spatial dimension and \\(\\Theta\\) is the Heaviside step function enforcing causality. This is a spreading Gaussian, the fundamental solution of diffusion.</p>

<h3>The Feynman Propagator</h3>

<p>In relativistic quantum field theory, neither the retarded nor the advanced propagator is the right choice. The <strong>Feynman propagator</strong> \\(G_F\\) is defined by its behavior in the complex frequency plane: positive-frequency modes propagate forward in time, while negative-frequency (antiparticle) modes propagate backward.</p>

<p>For the Klein-Gordon equation \\((\\Box + m^2)\\phi = 0\\), the Feynman propagator in momentum space is</p>

\\[
\\hat{G}_F(k) = \\frac{1}{k^2 - m^2 + i\\epsilon},
\\]

<p>where \\(k^2 = k_0^2 - |\\mathbf{k}|^2\\) and the \\(i\\epsilon\\) prescription shifts the poles off the real axis in a specific way. This gives a propagator that is time-ordered: it propagates particles forward and antiparticles backward in time.</p>

<div class="env-block remark">
    <div class="env-title">Retarded vs. Feynman: A Comparison</div>
    <div class="env-body">
        <p>The retarded propagator is the "classical" choice, used for radiation and signal propagation. The Feynman propagator is the "quantum" choice, essential for computing scattering amplitudes and loop diagrams. They differ in how they handle the poles at \\(k_0 = \\pm\\omega_k\\) in the complex \\(k_0\\)-plane: retarded pushes both poles below the real axis, Feynman pushes one above and one below.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-retarded-propagator',
                    title: 'Retarded Propagator and the Light Cone',
                    description: 'A point source emits at (x\', t\'). The retarded Green\'s function is nonzero only on the forward light cone. Watch the wavefront expand outward at speed c.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 350, scale: 60
                        });

                        var time = 0;
                        var speed = 1.0;

                        VizEngine.createSlider(controls, 'c (speed)', 0.3, 3.0, speed, 0.1, function(v) {
                            speed = v;
                        });

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time = (t % 8000) / 1000;

                            viz.screenText('Retarded Propagator: Light Cone', viz.width / 2, 16, viz.colors.white, 14);

                            // Draw spacetime diagram axes
                            // Horizontal: x, Vertical: t (upward)
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            // x axis
                            ctx.beginPath(); ctx.moveTo(20, 350); ctx.lineTo(540, 350); ctx.stroke();
                            // t axis
                            ctx.beginPath(); ctx.moveTo(280, 380); ctx.lineTo(280, 30); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('x', 540, 354);
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('t', 274, 35);

                            // Light cone from origin
                            var coneHeight = 300;
                            ctx.fillStyle = viz.colors.blue + '10';
                            ctx.beginPath();
                            ctx.moveTo(280, 350);
                            ctx.lineTo(280 + coneHeight / speed, 350 - coneHeight);
                            ctx.lineTo(280 - coneHeight / speed, 350 - coneHeight);
                            ctx.closePath();
                            ctx.fill();

                            // Light cone edges
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(280, 350);
                            ctx.lineTo(280 + coneHeight / speed, 350 - coneHeight);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(280, 350);
                            ctx.lineTo(280 - coneHeight / speed, 350 - coneHeight);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels on light cone
                            ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('x = ct', 280 + coneHeight / (2 * speed) + 6, 350 - coneHeight / 2);
                            ctx.textAlign = 'right';
                            ctx.fillText('x = -ct', 280 - coneHeight / (2 * speed) - 6, 350 - coneHeight / 2);

                            // Causal region label
                            ctx.fillStyle = viz.colors.blue; ctx.textAlign = 'center';
                            ctx.fillText('Causal (future)', 280, 200);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Spacelike (acausal)', 430, 330);

                            // Animated wavefront
                            var waveT = time * 40;
                            if (waveT > 0 && waveT < coneHeight) {
                                var waveX = waveT / speed;
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(280 - waveX, 350 - waveT);
                                ctx.lineTo(280 + waveX, 350 - waveT);
                                ctx.stroke();

                                // Wavefront dots
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(280 - waveX, 350 - waveT, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(280 + waveX, 350 - waveT, 4, 0, Math.PI * 2); ctx.fill();

                                // Time indicator
                                ctx.setLineDash([2, 2]);
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(20, 350 - waveT); ctx.lineTo(540, 350 - waveT); ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.teal; ctx.textAlign = 'left';
                                ctx.fillText('t = ' + (waveT / 40).toFixed(1), 22, 350 - waveT - 8);
                            }

                            // Source event
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(280, 350, 6, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange; ctx.textAlign = 'left';
                            ctx.fillText("\u03B4(x)\u03B4(t) source", 290, 358);

                            // c value display
                            viz.screenText('c = ' + speed.toFixed(1), viz.width / 2, viz.height - 10, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-feynman-propagator',
                    title: 'Feynman vs Retarded: Contour Prescriptions',
                    description: 'The retarded and Feynman propagators differ in how their poles are displaced in the complex k_0 plane. The contour prescription determines causality properties.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var showRetarded = true;
                        var showFeynman = true;
                        var omega = 2.0;

                        VizEngine.createSlider(controls, '\u03C9_k', 0.5, 4.0, omega, 0.1, function(v) {
                            omega = v;
                            draw();
                        });

                        var btnR = VizEngine.createButton(controls, 'Retarded: ON', function() {
                            showRetarded = !showRetarded;
                            btnR.textContent = 'Retarded: ' + (showRetarded ? 'ON' : 'OFF');
                            draw();
                        });
                        var btnF = VizEngine.createButton(controls, 'Feynman: ON', function() {
                            showFeynman = !showFeynman;
                            btnF.textContent = 'Feynman: ' + (showFeynman ? 'ON' : 'OFF');
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Pole Prescriptions in the Complex k\u2080 Plane', viz.width / 2, 16, viz.colors.white, 14);

                            // Draw axes
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Axis labels
                            viz.screenText('Re k\u2080', viz.width - 20, viz.originY + 18, viz.colors.text, 11);
                            viz.screenText('Im k\u2080', viz.originX + 25, 30, viz.colors.text, 11);

                            var eps = 0.35;

                            // Retarded poles: both below real axis
                            if (showRetarded) {
                                // +omega - i*eps
                                var rx1 = omega, ry1 = -eps;
                                var rx2 = -omega, ry2 = -eps;
                                viz.drawPoint(rx1, ry1, viz.colors.blue, null, 7);
                                viz.drawPoint(rx2, ry2, viz.colors.blue, null, 7);

                                // X marks
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                var s1 = viz.toScreen(rx1, ry1);
                                ctx.beginPath(); ctx.moveTo(s1[0]-5, s1[1]-5); ctx.lineTo(s1[0]+5, s1[1]+5); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(s1[0]+5, s1[1]-5); ctx.lineTo(s1[0]-5, s1[1]+5); ctx.stroke();
                                var s2 = viz.toScreen(rx2, ry2);
                                ctx.beginPath(); ctx.moveTo(s2[0]-5, s2[1]-5); ctx.lineTo(s2[0]+5, s2[1]+5); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(s2[0]+5, s2[1]-5); ctx.lineTo(s2[0]-5, s2[1]+5); ctx.stroke();

                                viz.drawText('+\u03C9 - i\u03B5', rx1, ry1 - 0.5, viz.colors.blue, 10);
                                viz.drawText('-\u03C9 - i\u03B5', rx2, ry2 - 0.5, viz.colors.blue, 10);

                                // Retarded contour: close in upper half-plane for t>0
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 3]);
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(-4, 0)[0], viz.toScreen(-4, 0)[1]);
                                ctx.lineTo(viz.toScreen(4, 0)[0], viz.toScreen(4, 0)[1]);
                                ctx.stroke();
                                // Semicircle in upper half
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, 4 * viz.scale, 0, -Math.PI, true);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Arrow on contour
                                var ax = viz.toScreen(3.5, 0);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.moveTo(ax[0], ax[1]);
                                ctx.lineTo(ax[0] - 8, ax[1] - 5);
                                ctx.lineTo(ax[0] - 8, ax[1] + 5);
                                ctx.closePath(); ctx.fill();
                            }

                            // Feynman poles: +omega - i*eps and -omega + i*eps
                            if (showFeynman) {
                                var fx1 = omega, fy1 = -eps;
                                var fx2 = -omega, fy2 = eps;
                                viz.drawPoint(fx1, fy1, viz.colors.teal, null, 7);
                                viz.drawPoint(fx2, fy2, viz.colors.teal, null, 7);

                                // Circles around poles
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.5;
                                var sf1 = viz.toScreen(fx1, fy1);
                                ctx.beginPath(); ctx.arc(sf1[0], sf1[1], 8, 0, Math.PI * 2); ctx.stroke();
                                var sf2 = viz.toScreen(fx2, fy2);
                                ctx.beginPath(); ctx.arc(sf2[0], sf2[1], 8, 0, Math.PI * 2); ctx.stroke();

                                viz.drawText('+\u03C9 - i\u03B5', fx1 + 0.6, fy1, viz.colors.teal, 10, 'left');
                                viz.drawText('-\u03C9 + i\u03B5', fx2 - 0.6, fy2, viz.colors.teal, 10, 'right');
                            }

                            // Legend
                            var ly = 350;
                            if (showRetarded) {
                                ctx.fillStyle = viz.colors.blue; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Retarded: both poles below (causal)', 40, ly);
                            }
                            if (showFeynman) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Feynman: one above, one below (time-ordered)', 40, ly + 18);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Verify that the retarded Green's function \\(G_{\\text{ret}} = -\\frac{\\delta(t - t' - |\\mathbf{r}-\\mathbf{r}'|/c)}{4\\pi|\\mathbf{r}-\\mathbf{r}'|}\\) satisfies the wave equation \\((\\nabla^2 - c^{-2}\\partial_t^2)G = \\delta^3(\\mathbf{r}-\\mathbf{r}')\\delta(t-t')\\) away from \\(\\mathbf{r} = \\mathbf{r}'\\).",
                    hint: "Let \\(R = |\\mathbf{r} - \\mathbf{r}'|\\) and \\(\\tau = t - t'\\). The retarded Green's function depends on \\(R\\) and \\(\\tau\\) only through the combination \\(\\tau - R/c\\). Use the chain rule for the Laplacian in spherical coordinates centered at \\(\\mathbf{r}'\\).",
                    solution: "Let \\(u = \\tau - R/c\\). Then \\(G = -\\delta(u)/(4\\pi R)\\). For \\(R \\neq 0\\), \\(\\nabla^2 G = \\frac{1}{R^2}\\frac{d}{dR}(R^2 \\frac{dG}{dR}) = \\frac{1}{R^2}\\frac{d}{dR}(R^2 [\\frac{\\delta(u)}{4\\pi R^2} + \\frac{\\delta'(u)}{4\\pi cR}]) = \\frac{\\delta''(u)}{4\\pi c^2 R}\\). Also \\(\\frac{1}{c^2}\\partial_t^2 G = -\\frac{\\delta''(u)}{4\\pi c^2 R}\\). So \\(\\nabla^2 G - c^{-2}\\partial_t^2 G = 0\\) for \\(R \\neq 0\\). The delta function source is recovered by integrating over a small sphere around \\(R = 0\\)."
                },
                {
                    question: "Write down the Green's function for the 1D heat equation \\(\\partial_t u = D \\partial_x^2 u\\) and verify it satisfies the initial condition \\(G(x, 0; x', 0) = \\delta(x - x')\\).",
                    hint: "The heat kernel in 1D is a Gaussian. Check the limit as \\(t \\to 0^+\\).",
                    solution: "The Green's function is \\(G(x,t;x',0) = \\frac{\\Theta(t)}{\\sqrt{4\\pi Dt}}\\exp\\left(-\\frac{(x-x')^2}{4Dt}\\right)\\). As \\(t \\to 0^+\\), the Gaussian becomes infinitely narrow and tall while maintaining unit area (\\(\\int_{-\\infty}^{\\infty} G\\,dx = 1\\) for all \\(t > 0\\)). This is a standard representation of \\(\\delta(x - x')\\). Verification: \\(\\partial_t G = G\\left(\\frac{(x-x')^2}{4Dt^2} - \\frac{1}{2t}\\right)\\) and \\(D\\partial_x^2 G = DG\\left(\\frac{(x-x')^2}{4D^2t^2} - \\frac{1}{2Dt}\\right) = G\\left(\\frac{(x-x')^2}{4Dt^2} - \\frac{1}{2t}\\right) = \\partial_t G\\). \\(\\checkmark\\)"
                }
            ]
        },

        // ================================================================
        // SECTION 6: Green's Functions in Quantum Mechanics
        // ================================================================
        {
            id: 'sec-quantum',
            title: "Green's Functions in Quantum Mechanics",
            content: `
<h2>Green's Functions in Quantum Mechanics</h2>

<p>In quantum mechanics, Green's functions take on a new and deeper significance. They encode the dynamics of quantum systems, connect to scattering theory, and provide the bridge to quantum field theory.</p>

<h3>The Resolvent Operator</h3>

<p>Given a Hamiltonian \\(H\\), the <strong>resolvent</strong> (or Green's operator) is defined as</p>

\\[
\\hat{G}(z) = \\frac{1}{z - H},
\\]

<p>where \\(z\\) is a complex energy parameter. This is an operator-valued function of \\(z\\), defined for \\(z\\) not in the spectrum of \\(H\\). In the position representation:</p>

\\[
G(\\mathbf{r}, \\mathbf{r}'; z) = \\langle \\mathbf{r} | \\hat{G}(z) | \\mathbf{r}' \\rangle = \\sum_n \\frac{\\psi_n(\\mathbf{r})\\,\\psi_n^*(\\mathbf{r}')}{z - E_n}.
\\]

<p>The poles of the resolvent are exactly the energy eigenvalues \\(E_n\\), and the residues give the projectors \\(|\\psi_n\\rangle\\langle\\psi_n|\\). This spectral representation connects the Green's function directly to the physics of the system.</p>

<h3>The Quantum Propagator</h3>

<p>The time-domain Green's function (propagator) gives the probability amplitude for a particle to travel from \\(\\mathbf{r}'\\) at time \\(t'\\) to \\(\\mathbf{r}\\) at time \\(t\\):</p>

\\[
K(\\mathbf{r}, t; \\mathbf{r}', t') = \\langle \\mathbf{r} | e^{-iH(t-t')/\\hbar} | \\mathbf{r}' \\rangle = \\sum_n \\psi_n(\\mathbf{r})\\,\\psi_n^*(\\mathbf{r}')\\,e^{-iE_n(t-t')/\\hbar}.
\\]

<p>The propagator is related to the resolvent by a Fourier transform in time (or equivalently, a Laplace transform).</p>

<div class="env-block example">
    <div class="env-title">Example: Free-Particle Propagator</div>
    <div class="env-body">
        <p>For a free particle (\\(H = p^2/2m\\)) in 1D, the propagator is</p>
        \\[
        K(x, t; x', 0) = \\sqrt{\\frac{m}{2\\pi i\\hbar t}} \\exp\\left(\\frac{im(x-x')^2}{2\\hbar t}\\right).
        \\]
        <p>This looks like the heat kernel with \\(D \\to i\\hbar/2m\\), reflecting the deep connection between quantum mechanics and diffusion (Wick rotation).</p>
    </div>
</div>

<h3>The Lippmann-Schwinger Equation</h3>

<p>Scattering theory provides one of the most important applications of Green's functions in quantum mechanics. Consider a particle scattered by a potential \\(V\\). The full Hamiltonian is \\(H = H_0 + V\\), where \\(H_0\\) is the free-particle Hamiltonian.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.4 (Lippmann-Schwinger Equation)</div>
    <div class="env-body">
        <p>The scattering state \\(|\\psi^+\\rangle\\) (with outgoing-wave boundary conditions) satisfies</p>
        \\[
        |\\psi^+\\rangle = |\\phi\\rangle + G_0^+(E)\\,V\\,|\\psi^+\\rangle,
        \\]
        <p>where \\(|\\phi\\rangle\\) is the incident plane wave, \\(G_0^+(E) = 1/(E - H_0 + i\\epsilon)\\) is the retarded free-particle Green's operator, and \\(E\\) is the scattering energy.</p>
    </div>
</div>

<p>In position space, this becomes an integral equation:</p>

\\[
\\psi^+(\\mathbf{r}) = \\phi(\\mathbf{r}) + \\int G_0^+(\\mathbf{r}, \\mathbf{r}'; E)\\,V(\\mathbf{r}')\\,\\psi^+(\\mathbf{r}')\\,d^3r'.
\\]

<p>The Born approximation replaces \\(\\psi^+\\) in the integral by \\(\\phi\\), giving the first-order scattering amplitude. Iterating produces the <strong>Born series</strong>:</p>

\\[
|\\psi^+\\rangle = |\\phi\\rangle + G_0^+ V |\\phi\\rangle + G_0^+ V G_0^+ V |\\phi\\rangle + \\cdots
\\]

<p>This is the perturbative expansion of scattering in terms of the free-particle Green's function, and it is the precursor of Feynman diagrams in quantum field theory.</p>

<h3>Density of States</h3>

<p>The Green's function also gives the <strong>density of states</strong>:</p>

\\[
\\rho(E) = -\\frac{1}{\\pi} \\text{Im}\\,\\text{Tr}\\,G^+(E) = \\sum_n \\delta(E - E_n).
\\]

<p>This connects the analytic properties of the Green's function (poles, branch cuts) directly to observable spectral properties.</p>
`,
            visualizations: [
                {
                    id: 'viz-quantum-propagator',
                    title: 'Free-Particle Quantum Propagator',
                    description: 'The quantum propagator K(x, t; 0, 0) for a free particle. The real and imaginary parts oscillate with a Gaussian-like envelope. Watch how the wave packet spreads over time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 260, scale: 40
                        });

                        var time = 0.5;
                        var mass = 1.0;
                        var hbar = 1.0;

                        VizEngine.createSlider(controls, 'Time t', 0.1, 5.0, time, 0.1, function(v) {
                            time = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Mass m', 0.2, 3.0, mass, 0.1, function(v) {
                            mass = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Free-Particle Propagator K(x, t; 0, 0)', viz.width / 2, 16, viz.colors.white, 14);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(20, 260); ctx.lineTo(540, 260); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(280, 20); ctx.lineTo(280, 360); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('x', 540, 264);
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('K', 274, 25);

                            // The free-particle propagator: K = sqrt(m/(2*pi*i*hbar*t)) * exp(i*m*x^2/(2*hbar*t))
                            var prefactor = Math.sqrt(mass / (2 * Math.PI * hbar * time));
                            var phase0 = -Math.PI / 4; // from sqrt(1/i)

                            var xRange = 6.5;
                            var steps = 400;
                            var yScale = 80;

                            // Real part
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var j = 0; j <= steps; j++) {
                                var x = -xRange + 2 * xRange * j / steps;
                                var arg = mass * x * x / (2 * hbar * time) + phase0;
                                var re = prefactor * Math.cos(arg);
                                var sx = 280 + x * 40;
                                var sy = 260 - re * yScale;
                                if (sy < 10 || sy > 370) { started = false; continue; }
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Imaginary part
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                            ctx.beginPath();
                            started = false;
                            for (var k = 0; k <= steps; k++) {
                                var x2 = -xRange + 2 * xRange * k / steps;
                                var arg2 = mass * x2 * x2 / (2 * hbar * time) + phase0;
                                var im = prefactor * Math.sin(arg2);
                                var sx2 = 280 + x2 * 40;
                                var sy2 = 260 - im * yScale;
                                if (sy2 < 10 || sy2 > 370) { started = false; continue; }
                                if (!started) { ctx.moveTo(sx2, sy2); started = true; }
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // |K|^2 envelope
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            for (var m2 = 0; m2 <= steps; m2++) {
                                var x3 = -xRange + 2 * xRange * m2 / steps;
                                var env = prefactor; // |K| is constant for free particle
                                var sx3 = 280 + x3 * 40;
                                var sy3 = 260 - env * yScale;
                                if (m2 === 0) ctx.moveTo(sx3, sy3); else ctx.lineTo(sx3, sy3);
                            }
                            ctx.stroke();
                            ctx.beginPath();
                            for (var m3 = 0; m3 <= steps; m3++) {
                                var x4 = -xRange + 2 * xRange * m3 / steps;
                                var sx4 = 280 + x4 * 40;
                                var sy4 = 260 + prefactor * yScale;
                                if (m3 === 0) ctx.moveTo(sx4, sy4); else ctx.lineTo(sx4, sy4);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue; ctx.fillText('Re K', 40, 40);
                            ctx.fillStyle = viz.colors.teal; ctx.fillText('Im K', 40, 56);
                            ctx.fillStyle = viz.colors.orange; ctx.fillText('|K| envelope', 40, 72);

                            // Info
                            viz.screenText('t = ' + time.toFixed(1) + ', m = ' + mass.toFixed(1), viz.width / 2, 370, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Show that the free-particle propagator \\(K(x, t; x', 0) = \\sqrt{\\frac{m}{2\\pi i\\hbar t}} e^{im(x-x')^2/(2\\hbar t)}\\) satisfies the composition property: \\(K(x, t_2; x', 0) = \\int K(x, t_2; x'', t_1)\\,K(x'', t_1; x', 0)\\,dx''\\).",
                    hint: "This is a Gaussian integral. Complete the square in the exponent of \\(x''\\).",
                    solution: "The integral is \\(\\int \\sqrt{\\frac{m}{2\\pi i\\hbar(t_2-t_1)}}e^{im(x-x'')^2/(2\\hbar(t_2-t_1))} \\sqrt{\\frac{m}{2\\pi i\\hbar t_1}}e^{im(x''-x')^2/(2\\hbar t_1)} dx''\\). Combining the exponents: the \\(x''\\)-dependent part is \\(im/(2\\hbar)[\\frac{(x-x'')^2}{t_2-t_1} + \\frac{(x''-x')^2}{t_1}]\\). This is a Gaussian in \\(x''\\). Completing the square and evaluating gives \\(\\sqrt{\\frac{m}{2\\pi i\\hbar t_2}}e^{im(x-x')^2/(2\\hbar t_2)}\\), confirming the composition property. This is the quantum-mechanical analog of the Chapman-Kolmogorov equation."
                },
                {
                    question: "Derive the Born approximation for the scattering amplitude \\(f(\\theta)\\) from the Lippmann-Schwinger equation for a central potential \\(V(r)\\).",
                    hint: "The scattering amplitude is related to the asymptotic form of \\(\\psi^+\\). In the Born approximation, replace \\(\\psi^+\\) by the plane wave \\(e^{i\\mathbf{k}\\cdot\\mathbf{r}}\\) inside the integral.",
                    solution: "The Lippmann-Schwinger equation gives \\(\\psi^+(\\mathbf{r}) = e^{i\\mathbf{k}\\cdot\\mathbf{r}} + \\int G_0^+(\\mathbf{r},\\mathbf{r}')V(\\mathbf{r}')\\psi^+(\\mathbf{r}')d^3r'\\). For large \\(r\\), \\(G_0^+(\\mathbf{r},\\mathbf{r}') \\to -\\frac{m}{2\\pi\\hbar^2}\\frac{e^{ikr}}{r}e^{-i\\mathbf{k}'\\cdot\\mathbf{r}'}\\) where \\(\\mathbf{k}' = k\\hat{r}\\). Born approximation (\\(\\psi^+ \\approx e^{i\\mathbf{k}\\cdot\\mathbf{r}}\\)): \\(f(\\theta) = -\\frac{m}{2\\pi\\hbar^2}\\int e^{-i\\mathbf{q}\\cdot\\mathbf{r}'}V(r')d^3r'\\) where \\(\\mathbf{q} = \\mathbf{k}' - \\mathbf{k}\\), \\(|\\mathbf{q}| = 2k\\sin(\\theta/2)\\). For a central potential: \\(f(\\theta) = -\\frac{2m}{\\hbar^2 q}\\int_0^\\infty r'V(r')\\sin(qr')dr'\\)."
                },
                {
                    question: "Show that the density of states \\(\\rho(E) = -\\frac{1}{\\pi}\\text{Im}\\,\\text{Tr}\\,G^+(E)\\) reproduces \\(\\rho(E) = \\sum_n \\delta(E - E_n)\\) for a discrete spectrum.",
                    hint: "Use \\(G^+(E) = \\lim_{\\epsilon \\to 0^+} 1/(E + i\\epsilon - H)\\) and the identity \\(\\text{Im}\\frac{1}{x + i\\epsilon} = -\\frac{\\epsilon}{x^2 + \\epsilon^2} \\to -\\pi\\delta(x)\\).",
                    solution: "\\(\\text{Tr}\\,G^+(E) = \\sum_n \\frac{1}{E + i\\epsilon - E_n}\\). Taking the imaginary part: \\(\\text{Im}\\,\\text{Tr}\\,G^+ = \\sum_n \\frac{-\\epsilon}{(E-E_n)^2 + \\epsilon^2}\\). As \\(\\epsilon \\to 0^+\\), \\(\\frac{\\epsilon}{(E-E_n)^2 + \\epsilon^2} \\to \\pi\\delta(E-E_n)\\). Therefore \\(-\\frac{1}{\\pi}\\text{Im}\\,\\text{Tr}\\,G^+ = \\sum_n \\delta(E - E_n)\\). \\(\\checkmark\\)"
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge — What Comes Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: What Comes Next',
            content: `
<h2>Bridge: Green's Functions and Beyond</h2>

<p>Green's functions are not an isolated technique; they sit at the crossroads of almost every branch of mathematical physics. Let us survey the connections to what comes before and after.</p>

<h3>Connections to Earlier Chapters</h3>

<ul>
    <li><strong>Sturm-Liouville Theory (Ch. 9)</strong>: The eigenfunction expansion of the Green's function is a direct application of the completeness of Sturm-Liouville eigenfunctions. The Green's function is essentially the <em>inverse</em> of the Sturm-Liouville operator, expressed in the eigenfunction basis.</li>
    <li><strong>Complex Analysis (Ch. 6-7)</strong>: The pole structure of the resolvent \\(G(z) = 1/(z - H)\\) is analyzed using techniques of complex analysis. The \\(i\\epsilon\\) prescriptions for retarded, advanced, and Feynman propagators are contour deformation arguments. Residue calculus evaluates the inverse Fourier transforms that give Green's functions in closed form.</li>
    <li><strong>ODEs (Ch. 8)</strong>: The direct construction method (matching at \\(x = x'\\)) uses the theory of homogeneous solutions and the Wronskian from ODE theory. The jump condition is derived by integrating the ODE across the singular point.</li>
</ul>

<h3>Connections to Later Chapters</h3>

<ul>
    <li><strong>Bessel and Legendre Functions (Ch. 11-12)</strong>: Green's functions in cylindrical and spherical geometries are expanded in Bessel functions and spherical harmonics, respectively. The addition theorem for spherical harmonics gives the multipole expansion of the Coulomb Green's function.</li>
    <li><strong>Fourier Analysis (Ch. 14)</strong>: Free-space Green's functions are computed by Fourier transform. The convolution theorem connects the PDE to its algebraic counterpart in Fourier space.</li>
    <li><strong>PDEs of Mathematical Physics (Ch. 17)</strong>: Green's functions provide general solution formulas for the Laplace, wave, heat, and Helmholtz equations. Boundary value problems are solved systematically using the Green's function plus the appropriate surface integral.</li>
</ul>

<h3>The Bigger Picture</h3>

<p>Green's functions embody the philosophy of <em>linearity and superposition</em>. Once you understand how a system responds to a point source, you understand everything (for a linear system). This idea extends far beyond differential equations:</p>

<ul>
    <li>In <strong>quantum field theory</strong>, the Green's functions (correlation functions) are the fundamental objects from which all physical predictions are derived. The entire S-matrix can be reconstructed from the hierarchy of \\(n\\)-point Green's functions.</li>
    <li>In <strong>condensed matter physics</strong>, the single-particle Green's function encodes the quasiparticle spectrum, lifetimes, and the effects of interactions through the self-energy.</li>
    <li>In <strong>signal processing</strong>, the impulse response / transfer function formalism is the engineering incarnation of Green's functions.</li>
</ul>

<div class="env-block intuition">
    <div class="env-title">The Unifying Theme</div>
    <div class="env-body">
        <p>If you understand one idea from this chapter, let it be this: <strong>the Green's function is the inverse of the operator</strong>. Just as \\(A^{-1}\\) solves \\(A\\mathbf{x} = \\mathbf{b}\\) in linear algebra, the Green's function \\(G = L^{-1}\\) solves \\(Lu = f\\) in the continuous setting. The entire chapter is an exploration of what this means for differential operators on various domains, with various boundary conditions, in various physical contexts.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-greens-gallery',
                    title: "Gallery: Green's Functions for Major Equations",
                    description: "Compare the Green's functions for the Laplace, Helmholtz, wave, and heat equations. Each encodes different physics: static vs. propagating, causal vs. non-causal.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 60, originY: 210, scale: 40
                        });

                        var selected = 0;
                        var labels = ['Laplace 3D', 'Helmholtz 3D', 'Heat 1D', 'Wave 1D'];

                        var btnLaplace = VizEngine.createButton(controls, 'Laplace 3D', function() { selected = 0; draw(); });
                        var btnHelm = VizEngine.createButton(controls, 'Helmholtz 3D', function() { selected = 1; draw(); });
                        var btnHeat = VizEngine.createButton(controls, 'Heat 1D', function() { selected = 2; draw(); });
                        var btnWave = VizEngine.createButton(controls, 'Wave 1D', function() { selected = 3; draw(); });

                        var param = 1.0;
                        VizEngine.createSlider(controls, 'Parameter', 0.1, 5.0, param, 0.1, function(v) {
                            param = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var title, formula, color, func;

                            if (selected === 0) {
                                title = "Laplace: G = -1/(4\u03C0r)";
                                formula = "\u2207\u00B2G = \u03B4(r)";
                                color = viz.colors.blue;
                                func = function(r) { return r < 0.1 ? -1/(4*Math.PI*0.1) : -1/(4*Math.PI*r); };
                            } else if (selected === 1) {
                                title = "Helmholtz: G = -e^{ik\u2080r}/(4\u03C0r)";
                                formula = "(\u2207\u00B2 + k\u2080\u00B2)G = -\u03B4(r),  k\u2080 = " + param.toFixed(1);
                                color = viz.colors.teal;
                                func = function(r) {
                                    if (r < 0.1) r = 0.1;
                                    return -Math.cos(param * r) / (4 * Math.PI * r);
                                };
                            } else if (selected === 2) {
                                title = "Heat kernel: G = exp(-x\u00B2/4Dt)/\u221A(4\u03C0Dt)";
                                formula = "\u2202\u209CG = D\u2202\u2093\u00B2G,  t = " + param.toFixed(1);
                                color = viz.colors.orange;
                                func = function(x) {
                                    var D = 1;
                                    var t = param;
                                    return Math.exp(-x*x/(4*D*t)) / Math.sqrt(4*Math.PI*D*t);
                                };
                            } else {
                                title = "Wave 1D: G = \u0398(t-|x|/c)/(2c)";
                                formula = "(\u2202\u209C\u00B2 - c\u00B2\u2202\u2093\u00B2)G = \u03B4(x)\u03B4(t),  ct = " + param.toFixed(1);
                                color = viz.colors.purple;
                                func = function(x) {
                                    var ct = param;
                                    return Math.abs(x) <= ct ? 0.5 : 0;
                                };
                            }

                            viz.screenText(title, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText(formula, viz.width / 2, 36, viz.colors.text, 11);

                            // Axes
                            var axisY = 280;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(30, axisY); ctx.lineTo(530, axisY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(280, 50); ctx.lineTo(280, 400); ctx.stroke();

                            var xLabel = (selected <= 1) ? 'r' : 'x';
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(xLabel, 535, axisY + 2);
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('G', 274, 52);

                            // Plot function
                            var xMin = (selected <= 1) ? 0.05 : -6;
                            var xMax = (selected <= 1) ? 6 : 6;
                            var steps = 400;
                            var xScale = 40;
                            var yScale;

                            // Autoscale
                            var maxAbsY = 0;
                            for (var pre = 0; pre <= steps; pre++) {
                                var xp = xMin + (xMax - xMin) * pre / steps;
                                var yp = func(xp);
                                if (isFinite(yp) && Math.abs(yp) > maxAbsY) maxAbsY = Math.abs(yp);
                            }
                            yScale = maxAbsY > 0 ? 180 / maxAbsY : 100;

                            // Fill area
                            ctx.fillStyle = color + '15';
                            ctx.beginPath();
                            ctx.moveTo(280 + xMin * xScale, axisY);
                            for (var f1 = 0; f1 <= steps; f1++) {
                                var x1 = xMin + (xMax - xMin) * f1 / steps;
                                var y1 = func(x1);
                                if (!isFinite(y1)) y1 = 0;
                                ctx.lineTo(280 + x1 * xScale, axisY - y1 * yScale);
                            }
                            ctx.lineTo(280 + xMax * xScale, axisY);
                            ctx.closePath();
                            ctx.fill();

                            // Curve
                            ctx.strokeStyle = color; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var j = 0; j <= steps; j++) {
                                var x2 = xMin + (xMax - xMin) * j / steps;
                                var y2 = func(x2);
                                if (!isFinite(y2) || Math.abs(y2 * yScale) > 250) { started = false; continue; }
                                var sx = 280 + x2 * xScale;
                                var sy = axisY - y2 * yScale;
                                if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Highlight buttons
                            [btnLaplace, btnHelm, btnHeat, btnWave].forEach(function(btn, i) {
                                btn.style.borderColor = (i === selected) ? '#58a6ff' : '#30363d';
                                btn.style.color = (i === selected) ? '#58a6ff' : '#c9d1d9';
                            });
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Explain why the Green's function for the Laplace equation in 3D (\\(G \\sim -1/r\\)) decays as a power law, while the Helmholtz Green's function (\\(G \\sim e^{ikr}/r\\)) oscillates. What physical difference does this reflect?",
                    hint: "Think about the difference between static fields (no propagation) and wave phenomena.",
                    solution: "The Laplace equation describes static fields (electrostatics, gravity). The \\(1/r\\) decay reflects the geometric spreading of field lines in 3D, with no oscillation because there is no wave propagation. The Helmholtz equation describes monochromatic waves at frequency \\(\\omega = ck\\). The \\(e^{ikr}/r\\) factor combines the same geometric \\(1/r\\) spreading with oscillation at wavenumber \\(k\\), representing the phase accumulation as the wave propagates outward. The transition from Laplace to Helmholtz is the transition from statics to dynamics."
                },
                {
                    question: "Show that the 1D heat kernel \\(G(x,t) = \\frac{1}{\\sqrt{4\\pi Dt}}e^{-x^2/(4Dt)}\\) has the semigroup property: \\(\\int G(x-y, t_1)G(y, t_2)dy = G(x, t_1 + t_2)\\).",
                    hint: "This is a convolution of two Gaussians. The convolution of Gaussians is a Gaussian with variances that add.",
                    solution: "The integral is \\(\\int \\frac{1}{\\sqrt{4\\pi Dt_1}}e^{-(x-y)^2/(4Dt_1)} \\cdot \\frac{1}{\\sqrt{4\\pi Dt_2}}e^{-y^2/(4Dt_2)} dy\\). The exponent in \\(y\\) is \\(-\\frac{(x-y)^2}{4Dt_1} - \\frac{y^2}{4Dt_2} = -\\frac{t_2(x-y)^2 + t_1 y^2}{4Dt_1 t_2}\\). Completing the square: \\(y_0 = xt_2/(t_1+t_2)\\), and the remaining \\(x\\)-dependent part gives \\(-x^2/(4D(t_1+t_2))\\). The Gaussian integral over \\(y\\) contributes \\(\\sqrt{4\\pi D t_1 t_2/(t_1+t_2)}\\). Combining all factors: \\(\\frac{1}{\\sqrt{4\\pi D(t_1+t_2)}}e^{-x^2/(4D(t_1+t_2))} = G(x, t_1+t_2)\\). \\(\\checkmark\\)"
                },
                {
                    question: "The Green's function for the 1D operator \\(L = -d^2/dx^2 + \\kappa^2\\) on \\((-\\infty, \\infty)\\) (the modified Helmholtz / screened Poisson equation) is \\(G(x, x') = \\frac{e^{-\\kappa|x-x'|}}{2\\kappa}\\). Verify this by Fourier transform.",
                    hint: "In Fourier space, \\((-d^2/dx^2 + \\kappa^2)\\) becomes \\((k^2 + \\kappa^2)\\). Compute the inverse Fourier transform of \\(1/(k^2 + \\kappa^2)\\).",
                    solution: "Fourier transforming \\(LG = \\delta\\) gives \\((k^2 + \\kappa^2)\\hat{G} = 1\\), so \\(\\hat{G}(k) = 1/(k^2 + \\kappa^2)\\). Inverse transform: \\(G(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty} \\frac{e^{ikx}}{k^2 + \\kappa^2}dk\\). The integrand has poles at \\(k = \\pm i\\kappa\\). For \\(x > 0\\), close in the upper half-plane, picking up the pole at \\(k = i\\kappa\\): residue \\(= e^{-\\kappa x}/(2i\\kappa)\\), giving \\(G = e^{-\\kappa x}/(2\\kappa)\\). For \\(x < 0\\), close below, getting \\(e^{\\kappa x}/(2\\kappa)\\). Combined: \\(G(x) = e^{-\\kappa|x|}/(2\\kappa)\\). \\(\\checkmark\\)"
                },
                {
                    question: "(Challenge) Derive the multipole expansion of the Coulomb Green's function in 3D: \\(\\frac{1}{|\\mathbf{r} - \\mathbf{r}'|} = \\sum_{l=0}^{\\infty} \\frac{r_<^l}{r_>^{l+1}} \\frac{4\\pi}{2l+1} \\sum_{m=-l}^{l} Y_l^m(\\hat{r})\\,Y_l^{m*}(\\hat{r}')\\).",
                    hint: "Start from the generating function for Legendre polynomials and use the addition theorem for spherical harmonics.",
                    solution: "The generating function gives \\(\\frac{1}{|\\mathbf{r}-\\mathbf{r}'|} = \\sum_{l=0}^\\infty \\frac{r_<^l}{r_>^{l+1}} P_l(\\cos\\gamma)\\), where \\(\\gamma\\) is the angle between \\(\\mathbf{r}\\) and \\(\\mathbf{r}'\\). The addition theorem states \\(P_l(\\cos\\gamma) = \\frac{4\\pi}{2l+1}\\sum_{m=-l}^{l} Y_l^m(\\hat{r})Y_l^{m*}(\\hat{r}')\\). Substituting gives the stated expansion. This is the foundation of the multipole expansion in electrostatics and appears directly in the eigenfunction expansion of the Green's function for the Laplacian in spherical coordinates."
                }
            ]
        }
    ]
});
