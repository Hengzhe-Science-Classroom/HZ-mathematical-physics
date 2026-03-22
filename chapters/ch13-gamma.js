// ============================================================================
// Chapter 13 — The Gamma & Hypergeometric Functions
// Tier 4 · 6 sections · 6 visualizations · 8 exercises
// ============================================================================
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'The Gamma & Hypergeometric Functions',
    subtitle: 'Generalizing factorials and unifying special functions',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Generalize the Factorial?</h2>

<div class="env-block intuition">
    <div class="env-title">A Question That Launched a Theory</div>
    <div class="env-body">
        <p>We know that \\(n! = 1 \\times 2 \\times \\cdots \\times n\\) for positive integers \\(n\\). But what is \\((\\tfrac{1}{2})!\\)? Is there a smooth function that passes through all the factorial values \\(0! = 1,\\; 1! = 1,\\; 2! = 2,\\; 3! = 6, \\ldots\\) and also makes sense for non-integer arguments?</p>
        <p>This question, posed by Goldbach to Euler in 1729, led Euler to discover the <strong>Gamma function</strong>, arguably the single most important "special" function in all of mathematical physics.</p>
    </div>
</div>

<p>The factorial appears everywhere in physics: in combinatorics, in Taylor series, in quantum mechanics (creation/annihilation operators), in statistical mechanics (partition functions), and in the normalization of probability distributions. But nature does not restrict itself to integers. Angular momentum quantum numbers can be half-integer; Fourier transforms produce integrals involving \\(s!\\) for complex \\(s\\); and the volume of an \\(n\\)-dimensional sphere involves \\((n/2)!\\) even when \\(n\\) is odd.</p>

<h3>What This Chapter Covers</h3>

<p>We develop a hierarchy of increasingly general functions:</p>
<ol>
    <li>The <strong>Gamma function</strong> \\(\\Gamma(z)\\): the analytic continuation of \\(n!\\) to the complex plane.</li>
    <li>The <strong>Beta function</strong> \\(B(a,b)\\): a two-parameter integral intimately linked to \\(\\Gamma\\).</li>
    <li>The <strong>hypergeometric function</strong> \\({}_2F_1(a,b;c;z)\\): a master function that encompasses Legendre, Chebyshev, Jacobi polynomials, and many more as special cases.</li>
    <li>The <strong>confluent hypergeometric function</strong> \\({}_1F_1(a;c;z)\\) (Kummer's function): the limit that connects the hypergeometric family to Bessel, Laguerre, and Hermite functions.</li>
</ol>

<p>Together, these functions form a unifying framework: virtually every "named" function in mathematical physics turns out to be a special case or limit of the hypergeometric function.</p>

<div class="env-block remark">
    <div class="env-title">Historical Context</div>
    <div class="env-body">
        <p>Euler discovered the Gamma function in 1729. The Beta function was studied by Euler and later Legendre (who gave \\(\\Gamma\\) its name and notation in 1811). The hypergeometric function was systematically developed by Gauss (1812) and later by Kummer, Riemann, and many others. This chapter follows the historical trajectory from specific to general.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Gamma Function
        // ================================================================
        {
            id: 'sec-gamma',
            title: 'The Gamma Function',
            content: `
<h2>The Gamma Function</h2>

<h3>Euler's Integral Definition</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Gamma Function)</div>
    <div class="env-body">
        <p>For \\(\\operatorname{Re}(z) > 0\\), the Gamma function is defined by</p>
        \\[\\Gamma(z) = \\int_0^\\infty t^{z-1} e^{-t}\\, dt.\\]
    </div>
</div>

<p>The integral converges absolutely for \\(\\operatorname{Re}(z) > 0\\). For \\(z = n+1\\) with \\(n\\) a non-negative integer, repeated integration by parts gives \\(\\Gamma(n+1) = n!\\). So the Gamma function is the "shifted factorial": \\(\\Gamma(z) = (z-1)!\\) when \\(z\\) is a positive integer. The shift is a historical accident (Legendre's convention); some authors prefer the Pi function \\(\\Pi(z) = \\Gamma(z+1) = z!\\).</p>

<h3>The Recursion Relation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.1 (Functional Equation)</div>
    <div class="env-body">
        <p>For all \\(z\\) where \\(\\Gamma(z)\\) is defined:</p>
        \\[\\Gamma(z+1) = z\\,\\Gamma(z).\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Integrate by parts with \\(u = t^z\\), \\(dv = e^{-t}\\,dt\\):</p>
        \\[\\Gamma(z+1) = \\int_0^\\infty t^z e^{-t}\\,dt = \\bigl[-t^z e^{-t}\\bigr]_0^\\infty + z\\int_0^\\infty t^{z-1} e^{-t}\\,dt = z\\,\\Gamma(z).\\]
        <p>The boundary term vanishes for \\(\\operatorname{Re}(z) > 0\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<p>This recursion allows <strong>analytic continuation</strong> to the left half-plane: writing \\(\\Gamma(z) = \\Gamma(z+1)/z\\), we can define \\(\\Gamma\\) for \\(\\operatorname{Re}(z) > -1\\) (except \\(z = 0\\)), then for \\(\\operatorname{Re}(z) > -2\\) (except \\(z = 0, -1\\)), and so on. The result is that \\(\\Gamma(z)\\) is meromorphic on all of \\(\\mathbb{C}\\), with simple poles at \\(z = 0, -1, -2, \\ldots\\)</p>

<h3>Special Values</h3>

<div class="env-block example">
    <div class="env-title">Key Values</div>
    <div class="env-body">
        <ul>
            <li>\\(\\Gamma(1) = 0! = 1\\)</li>
            <li>\\(\\Gamma(1/2) = \\sqrt{\\pi}\\) (from the Gaussian integral \\(\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}\\))</li>
            <li>\\(\\Gamma(n + 1/2) = \\frac{(2n)!}{4^n\\, n!}\\sqrt{\\pi}\\) (the "double factorial" relation)</li>
        </ul>
    </div>
</div>

<h3>Euler's Reflection Formula</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.2 (Reflection Formula)</div>
    <div class="env-body">
        <p>For \\(z \\notin \\mathbb{Z}\\):</p>
        \\[\\Gamma(z)\\,\\Gamma(1-z) = \\frac{\\pi}{\\sin(\\pi z)}.\\]
    </div>
</div>

<p>This beautiful identity connects the Gamma function to trigonometry. Setting \\(z = 1/2\\) immediately gives \\(\\Gamma(1/2)^2 = \\pi\\), hence \\(\\Gamma(1/2) = \\sqrt{\\pi}\\). The reflection formula also shows that \\(\\Gamma\\) has no zeros: the right side is never zero, and neither is \\(\\sin(\\pi z)\\) (except at integers, where \\(\\Gamma\\) has poles on one side).</p>

<h3>Stirling's Approximation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.3 (Stirling's Formula)</div>
    <div class="env-body">
        <p>As \\(|z| \\to \\infty\\) in any fixed sector \\(|\\arg z| < \\pi - \\delta\\):</p>
        \\[\\Gamma(z) \\sim \\sqrt{\\frac{2\\pi}{z}} \\left(\\frac{z}{e}\\right)^z \\left(1 + \\frac{1}{12z} + \\frac{1}{288z^2} + \\cdots\\right).\\]
        <p>In particular, for large positive \\(n\\):</p>
        \\[n! \\sim \\sqrt{2\\pi n}\\left(\\frac{n}{e}\\right)^n.\\]
    </div>
</div>

<p>Stirling's approximation is not just a curiosity; it is essential for statistical mechanics (deriving the Boltzmann distribution), for asymptotic analysis of quantum amplitudes, and for evaluating binomial coefficients in the thermodynamic limit.</p>

<div class="viz-placeholder" data-viz="viz-gamma-function"></div>
<div class="viz-placeholder" data-viz="viz-stirling"></div>
`,
            visualizations: [
                {
                    id: 'viz-gamma-function',
                    title: 'The Gamma Function on the Real Line',
                    description: 'The Gamma function \\(\\Gamma(x)\\) for real \\(x\\). Notice the poles at \\(0, -1, -2, \\ldots\\) and the smooth interpolation of factorials (shown as orange dots). Drag the slider to explore different regions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 400,
                            originX: 290, originY: 220, scale: 40
                        });

                        var xCenter = 2;
                        var yScale = 1;

                        VizEngine.createSlider(controls, 'Center x', -5, 8, xCenter, 0.5, function(v) {
                            xCenter = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Y scale', 0.2, 5, yScale, 0.1, function(v) {
                            yScale = v;
                            draw();
                        });

                        // Lanczos approximation for Gamma(x), x > 0
                        function gammaPositive(x) {
                            if (x < 0.5) {
                                return Math.PI / (Math.sin(Math.PI * x) * gammaPositive(1 - x));
                            }
                            x -= 1;
                            var g = 7;
                            var c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                                771.32342877765313, -176.61502916214059, 12.507343278686905,
                                -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
                            var t = c[0];
                            for (var i = 1; i < g + 2; i++) {
                                t += c[i] / (x + i);
                            }
                            var w = x + g + 0.5;
                            return Math.sqrt(2 * Math.PI) * Math.pow(w, x + 0.5) * Math.exp(-w) * t;
                        }

                        function gammaReal(x) {
                            if (Math.abs(x - Math.round(x)) < 1e-10 && x <= 0) return NaN;
                            if (x > 0) return gammaPositive(x);
                            // Reflection
                            return Math.PI / (Math.sin(Math.PI * x) * gammaPositive(1 - x));
                        }

                        function draw() {
                            viz.originX = 290 - xCenter * 40;
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var xMin = xCenter - 7;
                            var xMax = xCenter + 7;

                            // Draw Gamma(x) in segments (break at poles)
                            var poles = [];
                            for (var p = 0; p >= xMin - 1; p--) poles.push(p);

                            // Draw between poles
                            function drawSegment(a, b) {
                                var eps = 0.02;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 500; i++) {
                                    var xx = (a + eps) + ((b - eps) - (a + eps)) * i / 500;
                                    var yy = gammaReal(xx) * yScale;
                                    if (!isFinite(yy) || Math.abs(yy) > 200) { started = false; continue; }
                                    var pt = viz.toScreen(xx, yy);
                                    if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                    else { ctx.lineTo(pt[0], pt[1]); }
                                }
                                ctx.stroke();
                            }

                            // Segments between poles
                            var boundaries = poles.slice().sort((a, b) => a - b);
                            boundaries.unshift(xMin - 1);
                            boundaries.push(xMax + 1);
                            for (var s = 0; s < boundaries.length - 1; s++) {
                                drawSegment(boundaries[s], boundaries[s + 1]);
                            }

                            // Draw pole lines
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.red + '66';
                            ctx.lineWidth = 1;
                            for (var q = 0; q < poles.length; q++) {
                                var sx = viz.toScreen(poles[q], 0)[0];
                                ctx.beginPath();
                                ctx.moveTo(sx, 0);
                                ctx.lineTo(sx, viz.height);
                                ctx.stroke();
                            }
                            ctx.setLineDash([]);

                            // Mark factorial values
                            for (var n = 0; n <= 8; n++) {
                                var gv = gammaReal(n + 1);
                                if (Math.abs(gv * yScale) < 200) {
                                    viz.drawPoint(n + 1, gv * yScale, viz.colors.orange, n + '!=' + Math.round(gv), 5);
                                }
                            }

                            // Mark Gamma(1/2) = sqrt(pi)
                            var ghalf = gammaReal(0.5);
                            if (Math.abs(ghalf * yScale) < 200) {
                                viz.drawPoint(0.5, ghalf * yScale, viz.colors.teal, '\u0393(1/2)=\u221A\u03C0', 5);
                            }

                            // Title
                            viz.screenText('\u0393(x) on the real line', viz.width / 2, 16, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-stirling',
                    title: "Stirling's Approximation",
                    description: "Compare \\(\\Gamma(x+1) = x!\\) with Stirling's approximation \\(\\sqrt{2\\pi x}(x/e)^x\\). The approximation is surprisingly good even for small \\(x\\). The animated bar shows the relative error.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 400,
                            originX: 60, originY: 360, scale: 1
                        });

                        var nMax = 10;
                        var animTime = 0;
                        var showLog = true;

                        VizEngine.createSlider(controls, 'n max', 3, 20, nMax, 1, function(v) {
                            nMax = Math.round(v);
                        });

                        VizEngine.createButton(controls, 'Toggle log/linear', function() {
                            showLog = !showLog;
                        });

                        function factorial(n) {
                            var r = 1;
                            for (var i = 2; i <= n; i++) r *= i;
                            return r;
                        }

                        function stirling(n) {
                            if (n <= 0) return 1;
                            return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n);
                        }

                        function drawFrame(t) {
                            animTime = t * 0.001;
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText("Stirling's Approximation: n! vs \u221A(2\u03C0n)(n/e)\u207F", viz.width / 2, 16, viz.colors.white, 14);

                            var barW = Math.min(35, (viz.width - 120) / nMax / 2 - 2);
                            var chartBottom = 340;
                            var chartTop = 50;
                            var chartH = chartBottom - chartTop;
                            var startX = 80;

                            // Compute values
                            var facts = [];
                            var stirs = [];
                            var maxVal = 1;
                            for (var i = 1; i <= nMax; i++) {
                                var f = factorial(i);
                                var s = stirling(i);
                                facts.push(f);
                                stirs.push(s);
                                maxVal = Math.max(maxVal, f, s);
                            }

                            var maxLog = showLog ? Math.log10(maxVal) : maxVal;
                            if (maxLog < 1) maxLog = 1;

                            // Animate reveal
                            var revealCount = Math.min(nMax, Math.floor(animTime * 3) + 1);

                            // Y axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            if (showLog) {
                                for (var p = 0; p <= Math.ceil(Math.log10(maxVal)); p++) {
                                    var yy = chartBottom - (p / Math.log10(maxVal)) * chartH;
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.fillText('10^' + p, startX - 10, yy);
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(startX - 5, yy);
                                    ctx.lineTo(viz.width - 20, yy);
                                    ctx.stroke();
                                }
                            }

                            // Draw bars
                            for (var j = 0; j < revealCount; j++) {
                                var xBase = startX + j * (barW * 2 + 12);
                                var fVal = showLog ? Math.log10(Math.max(facts[j], 1)) : facts[j];
                                var sVal = showLog ? Math.log10(Math.max(stirs[j], 1)) : stirs[j];
                                var scale = showLog ? Math.log10(maxVal) : maxVal;

                                var hF = (fVal / scale) * chartH;
                                var hS = (sVal / scale) * chartH;

                                // Exact (blue)
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(xBase, chartBottom - hF, barW, hF);

                                // Stirling (teal)
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillRect(xBase + barW + 2, chartBottom - hS, barW, hS);

                                // Label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText((j + 1).toString(), xBase + barW + 1, chartBottom + 4);

                                // Relative error
                                var relErr = Math.abs(facts[j] - stirs[j]) / facts[j] * 100;
                                ctx.fillStyle = relErr < 1 ? viz.colors.green : (relErr < 5 ? viz.colors.yellow : viz.colors.orange);
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.fillText(relErr.toFixed(1) + '%', xBase + barW + 1, chartBottom + 16);
                            }

                            // Legend
                            var legY = 32;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(startX, legY, 12, 12);
                            ctx.fillText('n! (exact)', startX + 16, legY + 10);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(startX + 120, legY, 12, 12);
                            ctx.fillText('Stirling', startX + 136, legY + 10);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('% = relative error', startX + 220, legY + 10);

                            if (showLog) {
                                viz.screenText('(log\u2081\u2080 scale)', startX - 30, chartTop - 10, viz.colors.text, 10);
                            }
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\Gamma(7/2)\\) exactly.',
                    hint: 'Use \\(\\Gamma(z+1) = z\\,\\Gamma(z)\\) repeatedly to reduce to \\(\\Gamma(1/2) = \\sqrt{\\pi}\\).',
                    solution: '\\(\\Gamma(7/2) = \\frac{5}{2}\\Gamma(5/2) = \\frac{5}{2}\\cdot\\frac{3}{2}\\Gamma(3/2) = \\frac{5}{2}\\cdot\\frac{3}{2}\\cdot\\frac{1}{2}\\Gamma(1/2) = \\frac{15}{8}\\sqrt{\\pi}\\).'
                },
                {
                    question: 'Use the reflection formula to show that \\(\\Gamma(1/4)\\,\\Gamma(3/4) = \\pi\\sqrt{2}\\).',
                    hint: 'Set \\(z = 1/4\\) in \\(\\Gamma(z)\\Gamma(1-z) = \\pi/\\sin(\\pi z)\\) and evaluate \\(\\sin(\\pi/4)\\).',
                    solution: '\\(\\Gamma(1/4)\\,\\Gamma(3/4) = \\frac{\\pi}{\\sin(\\pi/4)} = \\frac{\\pi}{\\sqrt{2}/2} = \\pi\\sqrt{2}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Beta Function
        // ================================================================
        {
            id: 'sec-beta',
            title: 'The Beta Function',
            content: `
<h2>The Beta Function</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Beta Function)</div>
    <div class="env-body">
        <p>For \\(\\operatorname{Re}(a) > 0\\) and \\(\\operatorname{Re}(b) > 0\\):</p>
        \\[B(a,b) = \\int_0^1 t^{a-1}(1-t)^{b-1}\\,dt.\\]
    </div>
</div>

<p>The Beta function is an Euler integral of the first kind (the Gamma function being Euler's integral of the second kind). It arises naturally whenever we need to integrate products of powers over a finite interval.</p>

<h3>Connection to the Gamma Function</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.4 (Beta-Gamma Relation)</div>
    <div class="env-body">
        \\[B(a,b) = \\frac{\\Gamma(a)\\,\\Gamma(b)}{\\Gamma(a+b)}.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Write \\(\\Gamma(a)\\Gamma(b)\\) as a double integral, switch to polar-like coordinates \\(t = u^2,\\, s = v^2\\), then use the substitution \\(u = r\\cos\\theta,\\, v = r\\sin\\theta\\). The radial integral gives \\(\\Gamma(a+b)\\) and the angular integral gives \\(B(a,b)\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<p>This relation is enormously useful: it converts a single integral (the Beta function) into a ratio of Gamma functions, which are often easier to evaluate or look up.</p>

<h3>Symmetry and Special Values</h3>

<div class="env-block example">
    <div class="env-title">Properties of the Beta Function</div>
    <div class="env-body">
        <ul>
            <li><strong>Symmetry:</strong> \\(B(a,b) = B(b,a)\\) (substitute \\(t \\to 1-t\\) in the integral).</li>
            <li>\\(B(a,1) = 1/a\\).</li>
            <li>\\(B(1/2, 1/2) = \\pi\\) (because \\(\\Gamma(1/2)^2/\\Gamma(1) = \\pi\\)).</li>
            <li>For positive integers: \\(B(m,n) = \\frac{(m-1)!(n-1)!}{(m+n-1)!}\\).</li>
        </ul>
    </div>
</div>

<h3>Alternative Representations</h3>

<p>The substitution \\(t = u/(1+u)\\) transforms the Beta integral into:</p>
\\[B(a,b) = \\int_0^\\infty \\frac{u^{a-1}}{(1+u)^{a+b}}\\,du.\\]

<p>And the substitution \\(t = \\sin^2\\theta\\) gives the trigonometric form:</p>
\\[B(a,b) = 2\\int_0^{\\pi/2} \\sin^{2a-1}\\theta\\,\\cos^{2b-1}\\theta\\,d\\theta.\\]

<div class="env-block example">
    <div class="env-title">Application: Volume of the \\(n\\)-Ball</div>
    <div class="env-body">
        <p>The volume of the unit ball in \\(\\mathbb{R}^n\\) is</p>
        \\[V_n = \\frac{\\pi^{n/2}}{\\Gamma(n/2 + 1)}.\\]
        <p>This is derived by expressing the volume integral in polar coordinates, where the angular integrals reduce to Beta functions.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-beta-surface"></div>
`,
            visualizations: [
                {
                    id: 'viz-beta-surface',
                    title: 'The Beta Function B(a,b)',
                    description: 'A heatmap of \\(B(a,b) = \\Gamma(a)\\Gamma(b)/\\Gamma(a+b)\\) as a function of \\(a\\) and \\(b\\). Bright regions indicate large values (near the axes where \\(a\\) or \\(b\\) is small). The symmetry \\(B(a,b) = B(b,a)\\) is visible as reflection across the diagonal.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var aMax = 5;

                        VizEngine.createSlider(controls, 'Range', 2, 10, aMax, 1, function(v) {
                            aMax = Math.round(v);
                            draw();
                        });

                        function gammaPositive(x) {
                            if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gammaPositive(1 - x));
                            x -= 1;
                            var g = 7;
                            var c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                                771.32342877765313, -176.61502916214059, 12.507343278686905,
                                -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
                            var t = c[0];
                            for (var i = 1; i < g + 2; i++) t += c[i] / (x + i);
                            var w = x + g + 0.5;
                            return Math.sqrt(2 * Math.PI) * Math.pow(w, x + 0.5) * Math.exp(-w) * t;
                        }

                        function betaFn(a, b) {
                            if (a <= 0 || b <= 0) return NaN;
                            return gammaPositive(a) * gammaPositive(b) / gammaPositive(a + b);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var margin = 60;
                            var plotW = viz.width - margin - 40;
                            var plotH = viz.height - margin - 50;
                            var plotX = margin;
                            var plotY = 40;

                            viz.screenText('B(a, b) = \u0393(a)\u0393(b)/\u0393(a+b)', viz.width / 2, 18, viz.colors.white, 14);

                            // Compute heatmap
                            var res = 120;
                            var imgData = ctx.createImageData(res, res);
                            var data = imgData.data;
                            var vMin = Infinity, vMax = -Infinity;
                            var vals = new Float64Array(res * res);

                            for (var py = 0; py < res; py++) {
                                for (var px = 0; px < res; px++) {
                                    var a = 0.1 + (aMax - 0.1) * px / res;
                                    var b = 0.1 + (aMax - 0.1) * (res - 1 - py) / res;
                                    var v = Math.log10(Math.max(betaFn(a, b), 1e-10));
                                    vals[py * res + px] = v;
                                    if (isFinite(v)) { vMin = Math.min(vMin, v); vMax = Math.max(vMax, v); }
                                }
                            }

                            var range = vMax - vMin || 1;
                            for (var i = 0; i < res * res; i++) {
                                var t = Math.max(0, Math.min(1, (vals[i] - vMin) / range));
                                // Inferno-like
                                var r = Math.round(255 * Math.min(1, 1.1 * t + 0.15 * Math.sin(t * 3.14)));
                                var g = Math.round(255 * Math.max(0, t * t));
                                var bl = Math.round(255 * Math.max(0, Math.sin(t * 1.57)));
                                data[i * 4] = r;
                                data[i * 4 + 1] = g;
                                data[i * 4 + 2] = bl;
                                data[i * 4 + 3] = 255;
                            }

                            // Draw heatmap onto an offscreen canvas, then scale
                            var offCanvas = document.createElement('canvas');
                            offCanvas.width = res;
                            offCanvas.height = res;
                            var offCtx = offCanvas.getContext('2d');
                            offCtx.putImageData(imgData, 0, 0);

                            ctx.imageSmoothingEnabled = true;
                            ctx.drawImage(offCanvas, plotX, plotY, plotW, plotH);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var tick = 1; tick <= aMax; tick++) {
                                var tx = plotX + (tick - 0.1) / (aMax - 0.1) * plotW;
                                ctx.fillText(tick.toString(), tx, plotY + plotH + 4);
                            }
                            viz.screenText('a', plotX + plotW / 2, plotY + plotH + 30, viz.colors.white, 13);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var tick2 = 1; tick2 <= aMax; tick2++) {
                                var ty = plotY + plotH - (tick2 - 0.1) / (aMax - 0.1) * plotH;
                                ctx.fillText(tick2.toString(), plotX - 6, ty);
                            }
                            viz.screenText('b', plotX - 30, plotY + plotH / 2, viz.colors.white, 13);

                            // Color bar label
                            viz.screenText('log\u2081\u2080 B(a,b)', viz.width - 30, plotY + plotH / 2, viz.colors.text, 10);

                            // Diagonal symmetry line
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\int_0^1 x^3(1-x)^4\\,dx\\) using the Beta function.',
                    hint: 'Identify this as \\(B(4, 5)\\) and use the Beta-Gamma relation.',
                    solution: '\\(\\int_0^1 x^3(1-x)^4\\,dx = B(4,5) = \\frac{\\Gamma(4)\\Gamma(5)}{\\Gamma(9)} = \\frac{3! \\cdot 4!}{8!} = \\frac{6 \\cdot 24}{40320} = \\frac{1}{280}\\).'
                },
                {
                    question: 'Show that \\(\\int_0^{\\pi/2} \\sin^5\\theta\\,\\cos^3\\theta\\,d\\theta = \\frac{1}{24}\\) using the Beta function.',
                    hint: 'The trigonometric Beta form gives \\(\\frac{1}{2}B(3, 2)\\). Convert to Gamma functions.',
                    solution: 'Using \\(2\\int_0^{\\pi/2}\\sin^{2a-1}\\theta\\cos^{2b-1}\\theta\\,d\\theta = B(a,b)\\), we have \\(2a-1 = 5\\) and \\(2b-1 = 3\\), so \\(a = 3, b = 2\\). The integral is \\(\\frac{1}{2}B(3,2) = \\frac{1}{2}\\frac{\\Gamma(3)\\Gamma(2)}{\\Gamma(5)} = \\frac{1}{2}\\frac{2 \\cdot 1}{24} = \\frac{1}{24}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Hypergeometric Function 2F1
        // ================================================================
        {
            id: 'sec-hypergeometric',
            title: 'The Hypergeometric Function \u2082F\u2081',
            content: `
<h2>The Hypergeometric Function \\({}_2F_1\\)</h2>

<div class="env-block intuition">
    <div class="env-title">The "Master Function" of Mathematical Physics</div>
    <div class="env-body">
        <p>Many of the special functions we have encountered (Legendre polynomials, Chebyshev polynomials, Jacobi polynomials, etc.) are actually the <em>same</em> function with different parameter choices. The hypergeometric function \\({}_2F_1\\) is the unifying framework that reveals these connections.</p>
    </div>
</div>

<h3>Definition as a Power Series</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Gauss Hypergeometric Function)</div>
    <div class="env-body">
        \\[{}_2F_1(a, b; c; z) = \\sum_{n=0}^{\\infty} \\frac{(a)_n\\,(b)_n}{(c)_n\\,n!}\\,z^n, \\quad |z| < 1,\\]
        <p>where \\((a)_n = a(a+1)(a+2)\\cdots(a+n-1) = \\Gamma(a+n)/\\Gamma(a)\\) is the <strong>Pochhammer symbol</strong> (rising factorial), with \\((a)_0 = 1\\).</p>
    </div>
</div>

<p>The name "hypergeometric" comes from the fact that the ratio of successive terms is a <em>rational function</em> of \\(n\\):</p>
\\[\\frac{c_{n+1}}{c_n} = \\frac{(a+n)(b+n)}{(c+n)(n+1)}\\,z.\\]

<p>An ordinary geometric series has constant ratio \\(z\\); here the ratio depends on \\(n\\), hence "hyper-geometric."</p>

<h3>Euler's Integral Representation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.5 (Euler Integral)</div>
    <div class="env-body">
        <p>For \\(\\operatorname{Re}(c) > \\operatorname{Re}(b) > 0\\) and \\(|z| < 1\\):</p>
        \\[{}_2F_1(a, b; c; z) = \\frac{\\Gamma(c)}{\\Gamma(b)\\,\\Gamma(c-b)} \\int_0^1 t^{b-1}(1-t)^{c-b-1}(1-zt)^{-a}\\,dt.\\]
    </div>
</div>

<h3>The Hypergeometric Differential Equation</h3>

<p>The function \\(y = {}_2F_1(a,b;c;z)\\) satisfies the ODE:</p>
\\[z(1-z)\\,y'' + [c - (a+b+1)z]\\,y' - ab\\,y = 0.\\]

<p>This is a second-order Fuchsian equation with three regular singular points at \\(z = 0, 1, \\infty\\). Remarkably, <em>any</em> second-order linear ODE with exactly three regular singular points can be transformed into this form (Riemann's theorem).</p>

<h3>Special Functions as Special Cases</h3>

<p>The power of \\({}_2F_1\\) lies in the vast number of special functions it contains:</p>

<div class="env-block example">
    <div class="env-title">The Hypergeometric Zoo</div>
    <div class="env-body">
        <ul>
            <li><strong>Legendre polynomials:</strong> \\(P_\\ell(x) = {}_2F_1(-\\ell, \\ell+1; 1; \\tfrac{1-x}{2})\\)</li>
            <li><strong>Chebyshev polynomials:</strong> \\(T_n(x) = {}_2F_1(-n, n; \\tfrac{1}{2}; \\tfrac{1-x}{2})\\)</li>
            <li><strong>Jacobi polynomials:</strong> \\(P_n^{(\\alpha,\\beta)}(x) = \\frac{(\\alpha+1)_n}{n!}\\,{}_2F_1(-n, n+\\alpha+\\beta+1; \\alpha+1; \\tfrac{1-x}{2})\\)</li>
            <li><strong>Gegenbauer polynomials:</strong> \\(C_n^\\lambda(x) = \\frac{(2\\lambda)_n}{n!}\\,{}_2F_1(-n, n+2\\lambda; \\lambda+\\tfrac{1}{2}; \\tfrac{1-x}{2})\\)</li>
            <li><strong>Complete elliptic integrals:</strong> \\(K(k) = \\frac{\\pi}{2}\\,{}_2F_1(\\tfrac{1}{2}, \\tfrac{1}{2}; 1; k^2)\\)</li>
            <li><strong>Logarithm:</strong> \\(\\ln(1+z) = z\\,{}_2F_1(1, 1; 2; -z)\\)</li>
            <li><strong>Arcsin:</strong> \\(\\arcsin(z) = z\\,{}_2F_1(\\tfrac{1}{2}, \\tfrac{1}{2}; \\tfrac{3}{2}; z^2)\\)</li>
        </ul>
    </div>
</div>

<h3>Gauss's Summation Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.6 (Gauss Sum at \\(z = 1\\))</div>
    <div class="env-body">
        <p>For \\(\\operatorname{Re}(c - a - b) > 0\\):</p>
        \\[{}_2F_1(a, b; c; 1) = \\frac{\\Gamma(c)\\,\\Gamma(c-a-b)}{\\Gamma(c-a)\\,\\Gamma(c-b)}.\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-hypergeometric-unifier"></div>
`,
            visualizations: [
                {
                    id: 'viz-hypergeometric-unifier',
                    title: 'The Hypergeometric Unifier',
                    description: 'See how different parameter choices of \\({}_2F_1(a,b;c;z)\\) yield familiar special functions. Select a function from the menu to see its hypergeometric representation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 400,
                            originX: 290, originY: 260, scale: 50
                        });

                        var presets = [
                            { name: 'P\u2082(x) Legendre', a: -2, b: 3, c: 1, transform: 'legendre', label: '\u2082F\u2081(-2, 3; 1; (1-x)/2)' },
                            { name: 'P\u2083(x) Legendre', a: -3, b: 4, c: 1, transform: 'legendre', label: '\u2082F\u2081(-3, 4; 1; (1-x)/2)' },
                            { name: 'T\u2083(x) Chebyshev', a: -3, b: 3, c: 0.5, transform: 'legendre', label: '\u2082F\u2081(-3, 3; 1/2; (1-x)/2)' },
                            { name: 'ln(1+z)', a: 1, b: 1, c: 2, transform: 'log', label: 'z\u00B7\u2082F\u2081(1, 1; 2; -z)' },
                            { name: 'arcsin(z)', a: 0.5, b: 0.5, c: 1.5, transform: 'arcsin', label: 'z\u00B7\u2082F\u2081(1/2, 1/2; 3/2; z\u00B2)' },
                            { name: '(1-z)^(-a), a=2', a: 2, b: 1, c: 1, transform: 'direct', label: '\u2082F\u2081(2, 1; 1; z) = (1-z)\u207B\u00B2' }
                        ];

                        var currentPreset = 0;

                        // Create preset buttons
                        presets.forEach(function(p, idx) {
                            VizEngine.createButton(controls, p.name, function() {
                                currentPreset = idx;
                                draw();
                            });
                        });

                        function pochhammer(a, n) {
                            var r = 1;
                            for (var i = 0; i < n; i++) r *= (a + i);
                            return r;
                        }

                        function hyp2f1(a, b, c, z, terms) {
                            terms = terms || 60;
                            var sum = 0;
                            for (var n = 0; n < terms; n++) {
                                var term = pochhammer(a, n) * pochhammer(b, n) / (pochhammer(c, n) * pochhammer(1, n)) * Math.pow(z, n);
                                if (!isFinite(term)) break;
                                sum += term;
                                if (Math.abs(term) < 1e-15) break;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var p = presets[currentPreset];

                            viz.screenText(p.label, viz.width / 2, 16, viz.colors.teal, 13);
                            viz.screenText(p.name, viz.width / 2, 34, viz.colors.white, 15);

                            // Plot the function
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;

                            for (var i = 0; i <= 400; i++) {
                                var x, y;
                                if (p.transform === 'legendre') {
                                    x = -1 + 2 * i / 400;
                                    var zArg = (1 - x) / 2;
                                    y = hyp2f1(p.a, p.b, p.c, zArg);
                                } else if (p.transform === 'log') {
                                    x = -0.95 + 1.9 * i / 400;
                                    y = x * hyp2f1(1, 1, 2, -x);
                                } else if (p.transform === 'arcsin') {
                                    x = -0.99 + 1.98 * i / 400;
                                    y = x * hyp2f1(0.5, 0.5, 1.5, x * x);
                                } else {
                                    x = -0.9 + 1.8 * i / 400;
                                    y = hyp2f1(p.a, p.b, p.c, x);
                                }

                                if (!isFinite(y) || Math.abs(y) > 50) { started = false; continue; }
                                var pt = viz.toScreen(x, y);
                                if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                else { ctx.lineTo(pt[0], pt[1]); }
                            }
                            ctx.stroke();

                            // Comparison with known function (dashed)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            started = false;
                            for (var j = 0; j <= 400; j++) {
                                var xc, yc;
                                if (p.transform === 'legendre' && p.a === -2 && p.b === 3) {
                                    xc = -1 + 2 * j / 400;
                                    yc = (3 * xc * xc - 1) / 2; // P2
                                } else if (p.transform === 'legendre' && p.a === -3 && p.b === 4) {
                                    xc = -1 + 2 * j / 400;
                                    yc = (5 * xc * xc * xc - 3 * xc) / 2; // P3
                                } else if (p.transform === 'legendre' && p.a === -3 && p.b === 3) {
                                    xc = -1 + 2 * j / 400;
                                    yc = 4 * xc * xc * xc - 3 * xc; // T3
                                } else if (p.transform === 'log') {
                                    xc = -0.95 + 1.9 * j / 400;
                                    yc = Math.log(1 + xc);
                                } else if (p.transform === 'arcsin') {
                                    xc = -0.99 + 1.98 * j / 400;
                                    yc = Math.asin(xc);
                                } else {
                                    xc = -0.9 + 1.8 * j / 400;
                                    yc = 1 / ((1 - xc) * (1 - xc));
                                }
                                if (!isFinite(yc) || Math.abs(yc) > 50) { started = false; continue; }
                                var ptc = viz.toScreen(xc, yc);
                                if (!started) { ctx.moveTo(ptc[0], ptc[1]); started = true; }
                                else { ctx.lineTo(ptc[0], ptc[1]); }
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            var ly = viz.height - 20;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(10, ly - 6, 20, 3);
                            ctx.fillText('\u2082F\u2081 series', 34, ly);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.setLineDash([6, 4]);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.moveTo(160, ly - 4); ctx.lineTo(180, ly - 4); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillText('Known form', 184, ly);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\({}_2F_1(a, b; b; z) = (1-z)^{-a}\\) by simplifying the series.',
                    hint: 'When \\(c = b\\), the Pochhammer symbols \\((b)_n\\) cancel from numerator and denominator.',
                    solution: 'When \\(c = b\\), \\(\\frac{(a)_n(b)_n}{(b)_n\\,n!}z^n = \\frac{(a)_n}{n!}z^n\\). This is the binomial series for \\((1-z)^{-a}\\), since \\(\\frac{(a)_n}{n!} = \\binom{a+n-1}{n} = (-1)^n\\binom{-a}{n}\\). Hence \\({}_2F_1(a,b;b;z) = \\sum_n \\binom{-a}{n}(-z)^n = (1-z)^{-a}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Confluent Hypergeometric (Kummer)
        // ================================================================
        {
            id: 'sec-confluent',
            title: 'Confluent Hypergeometric Functions',
            content: `
<h2>Confluent Hypergeometric Functions</h2>

<div class="env-block intuition">
    <div class="env-title">Confluence of Singularities</div>
    <div class="env-body">
        <p>The hypergeometric equation has three regular singular points at \\(0, 1, \\infty\\). What happens if we merge two of them? Replace \\(z \\to z/b\\) in \\({}_2F_1(a,b;c;z/b)\\) and let \\(b \\to \\infty\\). The singular points at \\(1\\) and \\(\\infty\\) "flow together" (confluent), producing a new function with an <em>irregular</em> singularity at \\(\\infty\\). This limiting process yields Kummer's confluent hypergeometric function.</p>
    </div>
</div>

<h3>Definition</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Kummer's Function / Confluent Hypergeometric)</div>
    <div class="env-body">
        \\[{}_1F_1(a; c; z) = M(a, c, z) = \\sum_{n=0}^{\\infty} \\frac{(a)_n}{(c)_n\\,n!}\\,z^n.\\]
        <p>This series converges for all \\(z \\in \\mathbb{C}\\).</p>
    </div>
</div>

<p>Kummer's function satisfies the <strong>confluent hypergeometric equation</strong>:</p>
\\[z\\,y'' + (c - z)\\,y' - a\\,y = 0.\\]

<p>This is perhaps the single most commonly encountered second-order ODE in quantum mechanics, after the harmonic oscillator.</p>

<h3>Special Functions as Confluent Cases</h3>

<div class="env-block example">
    <div class="env-title">The Confluent Zoo</div>
    <div class="env-body">
        <ul>
            <li><strong>Laguerre polynomials:</strong> \\(L_n^\\alpha(x) = \\binom{n+\\alpha}{n}\\,{}_1F_1(-n; \\alpha+1; x)\\)</li>
            <li><strong>Hermite polynomials:</strong>
                \\[H_{2n}(x) = (-1)^n \\frac{(2n)!}{n!}\\,{}_1F_1(-n; \\tfrac{1}{2}; x^2), \\quad H_{2n+1}(x) = (-1)^n \\frac{(2n+1)!}{n!}\\,2x\\,{}_1F_1(-n; \\tfrac{3}{2}; x^2)\\]
            </li>
            <li><strong>Bessel functions:</strong> \\(J_\\nu(z) = \\frac{(z/2)^\\nu}{\\Gamma(\\nu+1)} e^{-iz}\\,{}_1F_1(\\nu + \\tfrac{1}{2}; 2\\nu + 1; 2iz)\\)</li>
            <li><strong>Error function:</strong> \\(\\operatorname{erf}(x) = \\frac{2x}{\\sqrt{\\pi}}\\,{}_1F_1(\\tfrac{1}{2}; \\tfrac{3}{2}; -x^2)\\)</li>
            <li><strong>Exponential:</strong> \\(e^z = {}_1F_1(a; a; z)\\) for any \\(a\\)</li>
            <li><strong>Incomplete gamma:</strong> \\(\\gamma(a, z) = \\frac{z^a}{a}\\,{}_1F_1(a; a+1; -z)\\)</li>
        </ul>
    </div>
</div>

<h3>Kummer's Transformations</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.7 (Kummer's First Transformation)</div>
    <div class="env-body">
        \\[{}_1F_1(a; c; z) = e^z\\,{}_1F_1(c - a; c; -z).\\]
    </div>
</div>

<p>This is the confluent analogue of Euler's transformation for \\({}_2F_1\\). It is extremely useful for deriving asymptotic expansions and for numerical computation.</p>

<h3>The Hydrogen Atom Connection</h3>

<p>The radial Schrodinger equation for the hydrogen atom, after separating angular dependence, reduces to the confluent hypergeometric equation. The bound-state solutions are associated Laguerre polynomials, which are just terminating \\({}_1F_1\\) series. The quantization condition (integer quantum numbers) arises because \\({}_1F_1\\) must terminate to be normalizable.</p>

<div class="viz-placeholder" data-viz="viz-confluent"></div>
`,
            visualizations: [
                {
                    id: 'viz-confluent',
                    title: 'Confluent Hypergeometric \u2081F\u2081(a; c; x)',
                    description: 'Explore Kummer\'s function \\({}_1F_1(a; c; x)\\) by varying the parameters \\(a\\) and \\(c\\). For negative integer \\(a\\), the series terminates and produces polynomial special cases (Laguerre, Hermite).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 400,
                            originX: 200, originY: 260, scale: 30
                        });

                        var aParam = -3;
                        var cParam = 1;

                        VizEngine.createSlider(controls, 'a', -5, 5, aParam, 0.5, function(v) {
                            aParam = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'c', 0.5, 5, cParam, 0.5, function(v) {
                            cParam = v;
                            draw();
                        });

                        function pochhammer(a, n) {
                            var r = 1;
                            for (var i = 0; i < n; i++) r *= (a + i);
                            return r;
                        }

                        function hyp1f1(a, c, z, terms) {
                            terms = terms || 80;
                            var sum = 0;
                            for (var n = 0; n < terms; n++) {
                                var term = pochhammer(a, n) / (pochhammer(c, n) * pochhammer(1, n)) * Math.pow(z, n);
                                if (!isFinite(term)) break;
                                if (Math.abs(term) < 1e-15 && n > 5) break;
                                sum += term;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Determine if it's a polynomial
                            var isPoly = (aParam <= 0 && Math.abs(aParam - Math.round(aParam)) < 0.01);
                            var desc = '\u2081F\u2081(' + aParam.toFixed(1) + '; ' + cParam.toFixed(1) + '; x)';
                            if (isPoly) desc += '  (polynomial of degree ' + Math.round(-aParam) + ')';

                            viz.screenText(desc, viz.width / 2, 16, viz.colors.white, 13);

                            // Draw the function
                            var xMin = -2;
                            var xMax = 8;

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 500; i++) {
                                var x = xMin + (xMax - xMin) * i / 500;
                                var y = hyp1f1(aParam, cParam, x);
                                if (!isFinite(y) || Math.abs(y) > 100) { started = false; continue; }
                                var pt = viz.toScreen(x, y);
                                if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                else { ctx.lineTo(pt[0], pt[1]); }
                            }
                            ctx.stroke();

                            // Mark zeros with dots
                            var prevY = hyp1f1(aParam, cParam, xMin);
                            for (var j = 1; j <= 500; j++) {
                                var xj = xMin + (xMax - xMin) * j / 500;
                                var yj = hyp1f1(aParam, cParam, xj);
                                if (isFinite(prevY) && isFinite(yj) && prevY * yj < 0) {
                                    // Bisect for zero
                                    var lo = xj - (xMax - xMin) / 500, hi = xj;
                                    for (var k = 0; k < 20; k++) {
                                        var mid = (lo + hi) / 2;
                                        if (hyp1f1(aParam, cParam, lo) * hyp1f1(aParam, cParam, mid) < 0) hi = mid;
                                        else lo = mid;
                                    }
                                    viz.drawPoint((lo + hi) / 2, 0, viz.colors.orange, null, 5);
                                }
                                prevY = yj;
                            }

                            // Special case labels
                            if (Math.abs(aParam + 3) < 0.1 && Math.abs(cParam - 1) < 0.1) {
                                viz.screenText('~ L\u2083(x) (Laguerre)', viz.width / 2, 36, viz.colors.teal, 12);
                            } else if (Math.abs(aParam - cParam) < 0.1) {
                                viz.screenText('= e^x', viz.width / 2, 36, viz.colors.teal, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\({}_1F_1(a; a; z) = e^z\\) by examining the series.',
                    hint: 'When \\(c = a\\), the Pochhammer symbols \\((a)_n\\) in numerator and denominator cancel.',
                    solution: 'When \\(c = a\\): \\({}_1F_1(a; a; z) = \\sum_{n=0}^{\\infty} \\frac{(a)_n}{(a)_n\\,n!}z^n = \\sum_{n=0}^{\\infty} \\frac{z^n}{n!} = e^z\\).'
                },
                {
                    question: 'Show that taking \\(z \\to z/b\\) in \\({}_2F_1(a, b; c; z/b)\\) and letting \\(b \\to \\infty\\) gives \\({}_1F_1(a; c; z)\\).',
                    hint: 'Examine the \\(n\\)-th term: \\(\\frac{(a)_n(b)_n}{(c)_n\\,n!}(z/b)^n\\). What happens to \\((b)_n / b^n\\) as \\(b \\to \\infty\\)?',
                    solution: '\\((b)_n = b(b+1)\\cdots(b+n-1)\\). So \\((b)_n / b^n = 1 \\cdot (1+1/b) \\cdots (1+(n-1)/b) \\to 1\\) as \\(b \\to \\infty\\). Therefore the \\(n\\)-th term \\(\\to \\frac{(a)_n}{(c)_n\\,n!}z^n\\), which is the \\(n\\)-th term of \\({}_1F_1(a;c;z)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'The Web of Special Functions',
            content: `
<h2>The Web of Special Functions</h2>

<div class="env-block intuition">
    <div class="env-title">Seeing the Big Picture</div>
    <div class="env-body">
        <p>We have now met a remarkable hierarchy. At the top sits the generalized hypergeometric function \\({}_pF_q\\). Below it, \\({}_2F_1\\) (Gauss) and \\({}_1F_1\\) (Kummer) are the two workhorses. Below them, a vast web of "named" functions are connected by specialization, limits, and transformations. This section maps those connections.</p>
    </div>
</div>

<h3>The Hierarchy</h3>

<p>The logical structure is:</p>
\\[{}_pF_q \\;\\supset\\; {}_2F_1 \\;\\xrightarrow{\\text{confluence}}\\; {}_1F_1 \\;\\xrightarrow{\\text{further limits}}\\; {}_0F_1 \\;(\\text{Bessel})\\]

<p>And specialization within each level:</p>
<ul>
    <li>\\({}_2F_1\\) \\(\\to\\) Legendre, Chebyshev, Gegenbauer, Jacobi (polynomial cases when \\(a\\) or \\(b\\) is a negative integer), elliptic integrals (non-polynomial cases)</li>
    <li>\\({}_1F_1\\) \\(\\to\\) Laguerre, Hermite, error function, Coulomb wave functions</li>
    <li>\\({}_0F_1\\) \\(\\to\\) Bessel functions \\(J_\\nu\\), Airy functions</li>
</ul>

<h3>Why Does This Matter for Physics?</h3>

<p>The unification is not merely aesthetic. It has practical consequences:</p>

<ol>
    <li><strong>Transformation formulas</strong> for \\({}_2F_1\\) and \\({}_1F_1\\) automatically yield transformation formulas for all their specializations. Kummer's transformation becomes a Laguerre identity; Euler's transformation becomes a Legendre identity.</li>
    <li><strong>Recurrence relations</strong> follow from contiguous relations of the hypergeometric functions, giving a single derivation for all special functions simultaneously.</li>
    <li><strong>Integral representations</strong> (Euler, Barnes) apply uniformly, providing a single framework for asymptotic analysis.</li>
    <li><strong>Connection formulas</strong> between solutions at different singular points (the monodromy problem) are solved once at the hypergeometric level and inherited by all special cases.</li>
</ol>

<h3>The Gamma Function as the Foundation</h3>

<p>The Gamma function is the bedrock of this entire hierarchy. Every coefficient in the hypergeometric series involves Gamma functions (via the Pochhammer symbol). Every integral representation uses Gamma functions as normalizing factors. Gauss's summation theorem is a ratio of Gamma functions. Even the asymptotic behavior of special functions ultimately traces back to Stirling's formula for \\(\\Gamma\\).</p>

<h3>Looking Forward</h3>

<p>In the remaining chapters, we will encounter these functions repeatedly:</p>
<ul>
    <li><strong>Fourier analysis</strong> (Ch. 14): the Gamma function appears in the Fourier transforms of power functions and in the theory of distributions.</li>
    <li><strong>Laplace transforms</strong> (Ch. 15): the Laplace transform of \\(t^{s-1}\\) is \\(\\Gamma(s)/p^s\\), the simplest transform of all.</li>
    <li><strong>PDEs</strong> (Ch. 17): separation of variables in various coordinate systems produces hypergeometric and confluent hypergeometric equations.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Notation Guide</div>
    <div class="env-body">
        <p>The notation can be confusing across different textbooks. Here is a concordance:</p>
        <ul>
            <li>\\(\\Gamma(z)\\) = Euler/Legendre. Some authors use \\(\\Pi(z) = \\Gamma(z+1) = z!\\).</li>
            <li>\\(B(a,b)\\) = Beta function. Some write \\(\\mathrm{B}(a,b)\\) with a Roman B.</li>
            <li>\\({}_2F_1(a,b;c;z)\\) = Gauss hypergeometric. Also written \\(F(a,b;c;z)\\) or \\(F(a,b,c;z)\\).</li>
            <li>\\({}_1F_1(a;c;z) = M(a,c,z)\\) = Kummer/confluent hypergeometric. The second solution is \\(U(a,c,z)\\).</li>
            <li>\\((a)_n\\) = Pochhammer symbol = rising factorial. Beware: some combinatorics texts use this for the falling factorial.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-special-function-web"></div>
`,
            visualizations: [
                {
                    id: 'viz-special-function-web',
                    title: 'Web of Special Function Relationships',
                    description: 'An interactive map showing how the major special functions of mathematical physics are related through the hypergeometric hierarchy. Hover over a node to see its definition and connections.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 460,
                            originX: 0, originY: 0, scale: 1
                        });

                        // Nodes: {name, x, y, color, level, info}
                        var nodes = [
                            { name: '\u2082F\u2081', x: 290, y: 50, color: '#58a6ff', info: 'Gauss Hypergeometric' },
                            { name: '\u2081F\u2081', x: 290, y: 140, color: '#3fb9a0', info: 'Kummer / Confluent' },
                            { name: '\u2080F\u2081', x: 290, y: 230, color: '#f0883e', info: 'Bessel kernel' },
                            // 2F1 children
                            { name: 'P\u2097(x)', x: 80, y: 110, color: '#bc8cff', info: 'Legendre polynomials' },
                            { name: 'T\u2099(x)', x: 170, y: 110, color: '#bc8cff', info: 'Chebyshev polynomials' },
                            { name: 'C\u2099\u03BB(x)', x: 410, y: 80, color: '#bc8cff', info: 'Gegenbauer polynomials' },
                            { name: 'P\u2099^(\u03B1\u03B2)', x: 500, y: 110, color: '#bc8cff', info: 'Jacobi polynomials' },
                            { name: 'K(k)', x: 60, y: 60, color: '#d29922', info: 'Elliptic integrals' },
                            // 1F1 children
                            { name: 'L\u2099^\u03B1(x)', x: 120, y: 200, color: '#f778ba', info: 'Laguerre polynomials' },
                            { name: 'H\u2099(x)', x: 200, y: 220, color: '#f778ba', info: 'Hermite polynomials' },
                            { name: 'erf(x)', x: 420, y: 180, color: '#f778ba', info: 'Error function' },
                            { name: '\u03B3(a,z)', x: 500, y: 200, color: '#f778ba', info: 'Incomplete gamma' },
                            // 0F1 children
                            { name: 'J\u1D65(z)', x: 180, y: 310, color: '#3fb950', info: 'Bessel functions' },
                            { name: 'Ai(x)', x: 400, y: 310, color: '#3fb950', info: 'Airy functions' },
                            // Gamma at bottom
                            { name: '\u0393(z)', x: 290, y: 400, color: '#f85149', info: 'Gamma function (foundation)' },
                            { name: 'B(a,b)', x: 430, y: 400, color: '#f85149', info: 'Beta function' }
                        ];

                        // Edges: [from_idx, to_idx, label]
                        var edges = [
                            [0, 1, 'b\u2192\u221E'],
                            [1, 2, 'a\u2192\u221E'],
                            [0, 3, 'a=-\u2113'],
                            [0, 4, 'a=-n'],
                            [0, 5, 'special c'],
                            [0, 6, 'Jacobi'],
                            [0, 7, 'a=b=1/2'],
                            [1, 8, 'a=-n'],
                            [1, 9, 'a=-n'],
                            [1, 10, 'a=1/2'],
                            [1, 11, 'incomplete'],
                            [2, 12, '\u03BD param'],
                            [2, 13, 'Airy limit'],
                            [14, 0, 'coefficients'],
                            [14, 1, 'coefficients'],
                            [15, 14, '\u0393 ratio']
                        ];

                        var hoverNode = -1;

                        viz.canvas.addEventListener('mousemove', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var found = -1;
                            for (var i = 0; i < nodes.length; i++) {
                                var dx = mx - nodes[i].x;
                                var dy = my - nodes[i].y;
                                if (dx * dx + dy * dy < 900) { found = i; break; }
                            }
                            if (found !== hoverNode) {
                                hoverNode = found;
                                draw();
                            }
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Hierarchy of Special Functions', viz.width / 2, 18, viz.colors.white, 15);

                            // Draw edges
                            for (var e = 0; e < edges.length; e++) {
                                var fromN = nodes[edges[e][0]];
                                var toN = nodes[edges[e][1]];
                                var isHovered = (hoverNode === edges[e][0] || hoverNode === edges[e][1]);

                                ctx.strokeStyle = isHovered ? viz.colors.white : viz.colors.axis;
                                ctx.lineWidth = isHovered ? 2 : 1;
                                ctx.beginPath();
                                ctx.moveTo(fromN.x, fromN.y);
                                ctx.lineTo(toN.x, toN.y);
                                ctx.stroke();

                                // Edge label
                                var lx = (fromN.x + toN.x) / 2;
                                var ly = (fromN.y + toN.y) / 2;
                                ctx.fillStyle = isHovered ? viz.colors.teal : viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(edges[e][2], lx + 8, ly - 6);
                            }

                            // Draw nodes
                            for (var i = 0; i < nodes.length; i++) {
                                var n = nodes[i];
                                var isH = (i === hoverNode);
                                var r = isH ? 26 : 22;

                                // Glow
                                if (isH) {
                                    ctx.fillStyle = n.color + '33';
                                    ctx.beginPath();
                                    ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Circle
                                ctx.fillStyle = isH ? n.color : n.color + 'aa';
                                ctx.beginPath();
                                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                                ctx.fill();

                                // Border
                                ctx.strokeStyle = isH ? viz.colors.white : n.color;
                                ctx.lineWidth = isH ? 2 : 1;
                                ctx.beginPath();
                                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = (isH ? 'bold ' : '') + '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(n.name, n.x, n.y);
                            }

                            // Hover info
                            if (hoverNode >= 0) {
                                var hn = nodes[hoverNode];
                                viz.screenText(hn.info, viz.width / 2, viz.height - 16, viz.colors.white, 13);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The volume of the unit \\(n\\)-ball is \\(V_n = \\pi^{n/2}/\\Gamma(n/2 + 1)\\). Compute \\(V_1, V_2, V_3, V_4, V_5\\) and verify against known formulas.',
                    hint: 'Use \\(\\Gamma(1) = 1\\), \\(\\Gamma(3/2) = \\sqrt{\\pi}/2\\), \\(\\Gamma(2) = 1\\), \\(\\Gamma(5/2) = 3\\sqrt{\\pi}/4\\), \\(\\Gamma(3) = 2\\).',
                    solution: '\\(V_1 = \\pi^{1/2}/\\Gamma(3/2) = \\sqrt{\\pi}/(\\sqrt{\\pi}/2) = 2\\) (length of diameter). \\(V_2 = \\pi/\\Gamma(2) = \\pi\\) (area of unit disk). \\(V_3 = \\pi^{3/2}/\\Gamma(5/2) = \\pi^{3/2}/(3\\sqrt{\\pi}/4) = 4\\pi/3\\) (volume of unit sphere). \\(V_4 = \\pi^2/\\Gamma(3) = \\pi^2/2\\). \\(V_5 = \\pi^{5/2}/\\Gamma(7/2) = \\pi^{5/2}/(15\\sqrt{\\pi}/8) = 8\\pi^2/15\\).'
                }
            ]
        }
    ]
});
