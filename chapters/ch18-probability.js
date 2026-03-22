// === Chapter 18: Probability & Statistics in Physics ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Probability & Statistics in Physics',
    subtitle: 'From error analysis to statistical mechanics',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Physicists Need Probability
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Physicists Need Probability',
            content: `
<h2>Why Physicists Need Probability</h2>

<div class="env-block intuition">
    <div class="env-title">A Fundamental Shift</div>
    <div class="env-body">
        <p>Classical mechanics is deterministic: give me initial conditions and I will tell you the future. Yet every measurement has uncertainty, every gas has \\(10^{23}\\) particles, and quantum mechanics is intrinsically probabilistic. Probability is not a crutch for ignorance; it is a foundational language of physics.</p>
    </div>
</div>

<p>Probability enters physics through at least three distinct doors:</p>

<ol>
    <li><strong>Measurement uncertainty.</strong> No instrument is perfect. When you report \\(g = 9.81 \\pm 0.02\\;\\text{m/s}^2\\), you are making a probabilistic statement about where the true value lies.</li>
    <li><strong>Statistical mechanics.</strong> A mole of gas has \\(\\sim 6 \\times 10^{23}\\) molecules. Tracking each one is impossible and unnecessary. Instead, we describe the <em>distribution</em> of energies, velocities, and positions. Thermodynamics emerges from probability.</li>
    <li><strong>Quantum mechanics.</strong> The Born rule states that \\(|\\psi(x)|^2\\,dx\\) gives the probability of finding a particle between \\(x\\) and \\(x + dx\\). Probability is not a limitation of our knowledge; it is the theory itself.</li>
</ol>

<h3>Basic Definitions</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.1 (Probability)</div>
    <div class="env-body">
        <p>A <strong>probability distribution</strong> on a sample space \\(\\Omega\\) assigns a number \\(P(A) \\in [0,1]\\) to each event \\(A \\subseteq \\Omega\\), satisfying:</p>
        <ol>
            <li>\\(P(\\Omega) = 1\\)</li>
            <li>For mutually exclusive events \\(A_1, A_2, \\ldots\\): \\(P(\\bigcup_i A_i) = \\sum_i P(A_i)\\)</li>
        </ol>
    </div>
</div>

<p>For a continuous random variable \\(X\\) with probability density function (PDF) \\(f(x)\\), the probability that \\(X\\) lies between \\(a\\) and \\(b\\) is</p>

\\[
P(a \\le X \\le b) = \\int_a^b f(x)\\,dx.
\\]

<h3>Expectation and Variance</h3>

<p>The <strong>expectation value</strong> (mean) of a function \\(g(X)\\) is</p>

\\[
\\langle g(X) \\rangle = \\int_{-\\infty}^{\\infty} g(x)\\,f(x)\\,dx.
\\]

<p>The <strong>variance</strong> measures the spread of a distribution:</p>

\\[
\\text{Var}(X) = \\langle (X - \\langle X \\rangle)^2 \\rangle = \\langle X^2 \\rangle - \\langle X \\rangle^2.
\\]

<p>The <strong>standard deviation</strong> \\(\\sigma = \\sqrt{\\text{Var}(X)}\\) has the same units as \\(X\\), making it the natural measure of uncertainty.</p>

<div class="env-block remark">
    <div class="env-title">Physicist's Notation</div>
    <div class="env-body">
        <p>Physicists write \\(\\langle X \\rangle\\) for the mean and \\(\\langle (\\Delta X)^2 \\rangle\\) for the variance. Statisticians write \\(\\mu\\) and \\(\\sigma^2\\). The mathematics is identical.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A particle in a box of length \\(L\\) has probability density \\(f(x) = \\frac{2}{L}\\sin^2\\left(\\frac{\\pi x}{L}\\right)\\) for \\(0 \\le x \\le L\\). Verify that \\(\\int_0^L f(x)\\,dx = 1\\), then compute \\(\\langle x \\rangle\\) and \\(\\langle x^2 \\rangle\\).',
                    hint: 'Use the identity \\(\\sin^2\\theta = \\frac{1}{2}(1 - \\cos 2\\theta)\\) and standard integration.',
                    solution: 'Normalization: \\(\\int_0^L \\frac{2}{L}\\sin^2(\\pi x/L)\\,dx = \\frac{2}{L} \\cdot \\frac{L}{2} = 1\\). By symmetry \\(\\langle x \\rangle = L/2\\). For \\(\\langle x^2 \\rangle\\), integrate \\(\\frac{2}{L}\\int_0^L x^2 \\sin^2(\\pi x/L)\\,dx = \\frac{L^2}{3} - \\frac{L^2}{2\\pi^2}\\), so \\(\\text{Var}(x) = \\frac{L^2}{12}(1 - \\frac{6}{\\pi^2})\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Key Distributions
        // ================================================================
        {
            id: 'sec-distributions',
            title: 'Key Distributions',
            content: `
<h2>Key Distributions</h2>

<p>Certain probability distributions appear so frequently in physics that they deserve individual study. We focus on three: the Gaussian, the Poisson, and the Boltzmann distribution.</p>

<h3>The Gaussian (Normal) Distribution</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.2 (Gaussian Distribution)</div>
    <div class="env-body">
        <p>A random variable \\(X\\) follows the <strong>Gaussian</strong> (normal) distribution with mean \\(\\mu\\) and variance \\(\\sigma^2\\) if its PDF is</p>
        \\[
        f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right).
        \\]
        <p>We write \\(X \\sim \\mathcal{N}(\\mu, \\sigma^2)\\).</p>
    </div>
</div>

<p>The Gaussian is central to physics for several reasons:</p>
<ul>
    <li>The <strong>central limit theorem</strong>: the sum of many independent random variables tends to a Gaussian, regardless of the individual distributions. This explains why measurement errors are approximately normal.</li>
    <li>It maximizes entropy (disorder) for a given mean and variance, making it the "least informative" distribution consistent with known first and second moments.</li>
    <li>The <strong>68-95-99.7 rule</strong>: about 68.3% of data lies within \\(\\pm 1\\sigma\\), 95.4% within \\(\\pm 2\\sigma\\), and 99.7% within \\(\\pm 3\\sigma\\).</li>
</ul>

<div class="viz-placeholder" data-viz="viz-gaussian"></div>

<h3>The Poisson Distribution</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.3 (Poisson Distribution)</div>
    <div class="env-body">
        <p>A discrete random variable \\(N\\) follows the <strong>Poisson distribution</strong> with parameter \\(\\lambda > 0\\) if</p>
        \\[
        P(N = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad k = 0, 1, 2, \\ldots
        \\]
        <p>The mean and variance are both \\(\\lambda\\). We write \\(N \\sim \\text{Poisson}(\\lambda)\\).</p>
    </div>
</div>

<p>The Poisson distribution governs <strong>rare events in large samples</strong>: radioactive decays in a fixed time window, photon counts on a detector, cosmic ray hits. If events occur independently at a constant average rate \\(\\lambda\\), the count follows a Poisson distribution.</p>

<div class="viz-placeholder" data-viz="viz-poisson"></div>

<h3>The Boltzmann Distribution</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.4 (Boltzmann Distribution)</div>
    <div class="env-body">
        <p>In thermal equilibrium at temperature \\(T\\), the probability of a system being in state \\(i\\) with energy \\(E_i\\) is</p>
        \\[
        P_i = \\frac{e^{-E_i / k_B T}}{Z}, \\quad Z = \\sum_i e^{-E_i / k_B T},
        \\]
        <p>where \\(k_B\\) is Boltzmann's constant and \\(Z\\) is the <strong>partition function</strong>.</p>
    </div>
</div>

<p>The Boltzmann distribution is the foundation of statistical mechanics. Higher-energy states are exponentially suppressed. At low temperatures, only the ground state is significantly populated; at high temperatures, many states contribute.</p>

<div class="viz-placeholder" data-viz="viz-boltzmann"></div>
`,
            visualizations: [
                {
                    id: 'viz-gaussian',
                    title: 'The Gaussian Distribution',
                    description: 'Adjust \\(\\mu\\) and \\(\\sigma\\) to see how the bell curve changes shape. The shaded regions show the 68-95-99.7 rule.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 300, scale: 50
                        });

                        var mu = 0, sigma = 1;

                        VizEngine.createSlider(controls, '\u03BC', -3, 3, mu, 0.1, function(v) {
                            mu = v; draw();
                        });
                        VizEngine.createSlider(controls, '\u03C3', 0.3, 3, sigma, 0.1, function(v) {
                            sigma = v; draw();
                        });

                        function gaussian(x) {
                            var z = (x - mu) / sigma;
                            return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw x-axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            var axisY = viz.originY;
                            ctx.moveTo(0, axisY);
                            ctx.lineTo(viz.width, axisY);
                            ctx.stroke();

                            // Shade 3-sigma region (99.7%)
                            viz.shadeBetween(
                                function(x) { return gaussian(x); },
                                function() { return 0; },
                                mu - 3 * sigma, mu + 3 * sigma,
                                viz.colors.purple + '15'
                            );
                            // Shade 2-sigma region (95.4%)
                            viz.shadeBetween(
                                function(x) { return gaussian(x); },
                                function() { return 0; },
                                mu - 2 * sigma, mu + 2 * sigma,
                                viz.colors.teal + '20'
                            );
                            // Shade 1-sigma region (68.3%)
                            viz.shadeBetween(
                                function(x) { return gaussian(x); },
                                function() { return 0; },
                                mu - sigma, mu + sigma,
                                viz.colors.blue + '30'
                            );

                            // Draw the curve
                            viz.drawFunction(gaussian, -5, 5, viz.colors.blue, 2.5);

                            // Sigma lines
                            var sigmaColors = [viz.colors.blue, viz.colors.teal, viz.colors.purple];
                            var sigmaLabels = ['68.3%', '95.4%', '99.7%'];
                            for (var s = 1; s <= 3; s++) {
                                var xL = mu - s * sigma;
                                var xR = mu + s * sigma;
                                var yLine = gaussian(mu) * (1.05 + s * 0.08);
                                var sxL = viz.toScreen(xL, 0)[0];
                                var sxR = viz.toScreen(xR, 0)[0];
                                var sy = viz.toScreen(0, yLine)[1];

                                ctx.strokeStyle = sigmaColors[s - 1] + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(sxL, axisY);
                                ctx.lineTo(sxL, sy);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sxR, axisY);
                                ctx.lineTo(sxR, sy);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Label
                                ctx.fillStyle = sigmaColors[s - 1];
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(sigmaLabels[s - 1], (sxL + sxR) / 2, sy - 2);
                            }

                            // Mean line
                            var smx = viz.toScreen(mu, 0)[0];
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            ctx.moveTo(smx, axisY);
                            ctx.lineTo(smx, viz.toScreen(0, gaussian(mu))[1]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Axis tick labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = -5; t <= 5; t++) {
                                if (t === 0 && Math.abs(mu) > 0.3) continue;
                                var tsx = viz.toScreen(t, 0)[0];
                                if (tsx > 10 && tsx < viz.width - 10) {
                                    ctx.fillText(t.toString(), tsx, axisY + 4);
                                }
                            }

                            // Title
                            viz.screenText('\u03BC = ' + mu.toFixed(1) + ', \u03C3 = ' + sigma.toFixed(1), viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('f(x) = (1/\u03C3\u221A2\u03C0) exp[-(x-\u03BC)\u00B2/2\u03C3\u00B2]', viz.width / 2, 36, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-poisson',
                    title: 'The Poisson Distribution',
                    description: 'Adjust \\(\\lambda\\) (the expected count) and see how the distribution changes. For large \\(\\lambda\\), it approaches a Gaussian with mean and variance both equal to \\(\\lambda\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 60, originY: 310, scale: 1
                        });

                        var lambda = 5;

                        VizEngine.createSlider(controls, '\u03BB', 0.5, 25, lambda, 0.5, function(v) {
                            lambda = v; draw();
                        });

                        function poissonPMF(k, lam) {
                            // log-space to avoid overflow
                            var logP = k * Math.log(lam) - lam;
                            for (var i = 2; i <= k; i++) logP -= Math.log(i);
                            return Math.exp(logP);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var kMax = Math.min(Math.ceil(lambda + 4 * Math.sqrt(lambda) + 5), 50);
                            var values = [];
                            var maxP = 0;
                            for (var k = 0; k <= kMax; k++) {
                                var p = poissonPMF(k, lambda);
                                values.push(p);
                                if (p > maxP) maxP = p;
                            }

                            var barW = Math.min(20, (viz.width - 120) / (kMax + 1));
                            var chartH = 250;
                            var chartBottom = 300;
                            var startX = 70;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(startX - 5, chartBottom);
                            ctx.lineTo(viz.width - 10, chartBottom);
                            ctx.stroke();

                            // Bars
                            for (var i = 0; i < values.length; i++) {
                                var h = (values[i] / maxP) * chartH;
                                var bx = startX + i * barW;
                                var isNearMean = Math.abs(i - lambda) < 0.6;

                                ctx.fillStyle = isNearMean ? viz.colors.orange : viz.colors.blue + 'bb';
                                ctx.fillRect(bx, chartBottom - h, Math.max(barW - 1, 2), h);

                                // Label every few bars
                                if (kMax <= 20 || i % Math.ceil(kMax / 15) === 0) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText(i.toString(), bx + barW / 2, chartBottom + 3);
                                }
                            }

                            // Mean indicator
                            var meanX = startX + lambda * barW + barW / 2;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(meanX, chartBottom);
                            ctx.lineTo(meanX, chartBottom - chartH - 10);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            viz.screenText('Poisson(\u03BB = ' + lambda.toFixed(1) + ')', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Mean = Var = \u03BB = ' + lambda.toFixed(1), viz.width / 2, 36, viz.colors.teal, 11);
                            viz.screenText('k', viz.width / 2, chartBottom + 18, viz.colors.text, 11);
                            viz.screenText('P(k)', 30, chartBottom - chartH / 2, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-boltzmann',
                    title: 'Boltzmann Energy Distribution',
                    description: 'See how thermal energy distributes particles across energy levels. At low \\(T\\), particles crowd the ground state. At high \\(T\\), higher states become accessible.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 80, originY: 320, scale: 1
                        });

                        var kT = 1.0;
                        var nLevels = 15;

                        VizEngine.createSlider(controls, 'k\u2083T', 0.2, 5, kT, 0.1, function(v) {
                            kT = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Energy levels: E_i = i (linear spacing)
                            var probs = [];
                            var Z = 0;
                            for (var i = 0; i < nLevels; i++) {
                                var boltz = Math.exp(-i / kT);
                                probs.push(boltz);
                                Z += boltz;
                            }
                            for (var j = 0; j < nLevels; j++) probs[j] /= Z;

                            var barH = 18;
                            var gap = 3;
                            var chartLeft = 100;
                            var chartW = 380;
                            var startY = 40;

                            for (var n = 0; n < nLevels; n++) {
                                var y = startY + n * (barH + gap);
                                var w = probs[n] * chartW / probs[0];

                                // Energy level line
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(chartLeft, y + barH / 2);
                                ctx.lineTo(chartLeft + chartW, y + barH / 2);
                                ctx.stroke();

                                // Probability bar
                                var alpha = Math.max(0.3, probs[n] / probs[0]);
                                var r = Math.round(88 + 167 * (1 - n / nLevels));
                                var g = Math.round(166 - 80 * (n / nLevels));
                                var b = 255;
                                ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
                                ctx.fillRect(chartLeft, y, Math.max(w, 2), barH);

                                // Level label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('E\u2082 = ' + n, chartLeft - 8, y + barH / 2);

                                // Probability value
                                if (probs[n] > 0.005) {
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText((probs[n] * 100).toFixed(1) + '%', chartLeft + w + 5, y + barH / 2);
                                }
                            }

                            // Partition function
                            viz.screenText('k\u2083T = ' + kT.toFixed(1) + '    Z = ' + Z.toFixed(2), viz.width / 2, viz.height - 22, viz.colors.teal, 12);
                            viz.screenText('P\u1d62 = e^{-E\u1d62/k\u2083T} / Z', viz.width / 2, viz.height - 6, viz.colors.text, 10);

                            // Mean energy
                            var meanE = 0;
                            for (var m = 0; m < nLevels; m++) meanE += m * probs[m];
                            viz.screenText('Boltzmann Distribution   \u27E8E\u27E9 = ' + meanE.toFixed(2), viz.width / 2, 18, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Gaussian distribution \\(f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^2/2\\sigma^2}\\) is properly normalized, i.e., \\(\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1\\).',
                    hint: 'Substitute \\(u = (x - \\mu)/(\\sigma\\sqrt{2})\\) and use the Gaussian integral \\(\\int_{-\\infty}^{\\infty} e^{-u^2}\\,du = \\sqrt{\\pi}\\).',
                    solution: 'Let \\(u = (x - \\mu)/(\\sigma\\sqrt{2})\\), so \\(dx = \\sigma\\sqrt{2}\\,du\\). Then \\(\\int f\\,dx = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\cdot \\sigma\\sqrt{2} \\int_{-\\infty}^{\\infty} e^{-u^2}\\,du = \\frac{\\sqrt{2}}{\\sqrt{2\\pi}} \\cdot \\sqrt{\\pi} = 1\\).'
                },
                {
                    question: 'A Geiger counter records an average of 3.2 counts per second from a radioactive source. What is the probability of recording exactly 5 counts in a one-second interval?',
                    hint: 'Use the Poisson distribution with \\(\\lambda = 3.2\\).',
                    solution: '\\(P(5) = \\frac{3.2^5 e^{-3.2}}{5!} = \\frac{335.54 \\times 0.04076}{120} \\approx 0.1140\\), or about 11.4%.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Error Analysis
        // ================================================================
        {
            id: 'sec-error',
            title: 'Error Analysis',
            content: `
<h2>Error Analysis</h2>

<div class="env-block intuition">
    <div class="env-title">The Experimenter's Creed</div>
    <div class="env-body">
        <p>A measurement without an uncertainty is meaningless. Reporting \\(v = 343\\;\\text{m/s}\\) says nothing about the quality of your experiment. Reporting \\(v = 343 \\pm 2\\;\\text{m/s}\\) tells the reader (and yourself) how much to trust the result.</p>
    </div>
</div>

<h3>Propagation of Errors</h3>

<p>Suppose you measure quantities \\(x_1, x_2, \\ldots, x_n\\) with uncertainties \\(\\sigma_1, \\sigma_2, \\ldots, \\sigma_n\\), and compute a derived quantity \\(q = q(x_1, \\ldots, x_n)\\). If the errors are independent and small, the uncertainty in \\(q\\) follows from a first-order Taylor expansion:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.1 (Error Propagation Formula)</div>
    <div class="env-body">
        \\[
        \\sigma_q^2 = \\sum_{i=1}^{n} \\left(\\frac{\\partial q}{\\partial x_i}\\right)^2 \\sigma_i^2.
        \\]
        <p>For correlated variables, add cross terms: \\(\\sigma_q^2 = \\sum_{i,j} \\frac{\\partial q}{\\partial x_i}\\frac{\\partial q}{\\partial x_j}\\text{Cov}(x_i, x_j)\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Pendulum Period</div>
    <div class="env-body">
        <p>The period of a simple pendulum is \\(T = 2\\pi\\sqrt{L/g}\\). Measuring \\(L = 1.00 \\pm 0.01\\;\\text{m}\\) and \\(g = 9.81 \\pm 0.03\\;\\text{m/s}^2\\):</p>
        \\[
        \\frac{\\partial T}{\\partial L} = \\frac{\\pi}{\\sqrt{gL}}, \\quad \\frac{\\partial T}{\\partial g} = -\\frac{\\pi\\sqrt{L}}{g^{3/2}}.
        \\]
        <p>Plugging in: \\(T = 2.006\\;\\text{s}\\), \\(\\sigma_T \\approx 0.010\\;\\text{s}\\), so \\(T = 2.006 \\pm 0.010\\;\\text{s}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-error-propagation"></div>

<h3>Least Squares Fitting</h3>

<p>Given data points \\((x_i, y_i)\\) with uncertainties \\(\\sigma_i\\), we fit a model \\(y = f(x; \\mathbf{a})\\) by minimizing the <strong>chi-squared</strong> statistic:</p>

<div class="env-block definition">
    <div class="env-title">Definition 18.5 (Chi-Squared)</div>
    <div class="env-body">
        \\[
        \\chi^2 = \\sum_{i=1}^{N} \\left(\\frac{y_i - f(x_i; \\mathbf{a})}{\\sigma_i}\\right)^2.
        \\]
        <p>Each term measures how many standard deviations the data point lies from the model. A good fit has \\(\\chi^2 \\approx N - p\\), where \\(p\\) is the number of fitted parameters.</p>
    </div>
</div>

<p>For a linear model \\(y = a + bx\\), the least-squares solution has a closed form. Define \\(S = \\sum 1/\\sigma_i^2\\), \\(S_x = \\sum x_i/\\sigma_i^2\\), \\(S_{xx} = \\sum x_i^2/\\sigma_i^2\\), \\(S_y = \\sum y_i/\\sigma_i^2\\), \\(S_{xy} = \\sum x_i y_i/\\sigma_i^2\\), and \\(\\Delta = S \\cdot S_{xx} - S_x^2\\). Then:</p>

\\[
a = \\frac{S_{xx}\\,S_y - S_x\\,S_{xy}}{\\Delta}, \\quad b = \\frac{S\\,S_{xy} - S_x\\,S_y}{\\Delta}.
\\]

<div class="viz-placeholder" data-viz="viz-chi-squared"></div>
`,
            visualizations: [
                {
                    id: 'viz-error-propagation',
                    title: 'Error Propagation Visualizer',
                    description: 'Enter measurement values and their uncertainties for the formula \\(q = x \\cdot y\\). See how input errors propagate to the output.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 0, originY: 0, scale: 1
                        });

                        var xVal = 5.0, dxVal = 0.3, yVal = 3.0, dyVal = 0.2;

                        VizEngine.createSlider(controls, 'x', 1, 10, xVal, 0.1, function(v) { xVal = v; draw(); });
                        VizEngine.createSlider(controls, '\u03B4x', 0.01, 1, dxVal, 0.01, function(v) { dxVal = v; draw(); });
                        VizEngine.createSlider(controls, 'y', 1, 10, yVal, 0.1, function(v) { yVal = v; draw(); });
                        VizEngine.createSlider(controls, '\u03B4y', 0.01, 1, dyVal, 0.01, function(v) { dyVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // q = x * y,  dq/dx = y,  dq/dy = x
                            var q = xVal * yVal;
                            var dq = Math.sqrt(yVal * yVal * dxVal * dxVal + xVal * xVal * dyVal * dyVal);
                            var relX = dxVal / xVal;
                            var relY = dyVal / yVal;
                            var relQ = dq / q;

                            // Title
                            viz.screenText('Error Propagation: q = x \u00D7 y', viz.width / 2, 20, viz.colors.white, 15);

                            // Input boxes
                            var boxW = 200, boxH = 80;
                            var y1 = 60;

                            // x box
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(40, y1, boxW, boxH);
                            viz.screenText('x = ' + xVal.toFixed(1) + ' \u00B1 ' + dxVal.toFixed(2), 140, y1 + 25, viz.colors.blue, 14);
                            viz.screenText('Relative: ' + (relX * 100).toFixed(1) + '%', 140, y1 + 50, viz.colors.text, 11);

                            // y box
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(320, y1, boxW, boxH);
                            viz.screenText('y = ' + yVal.toFixed(1) + ' \u00B1 ' + dyVal.toFixed(2), 420, y1 + 25, viz.colors.teal, 14);
                            viz.screenText('Relative: ' + (relY * 100).toFixed(1) + '%', 420, y1 + 50, viz.colors.text, 11);

                            // Arrow down
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2, y1 + boxH + 5);
                            ctx.lineTo(viz.width / 2, y1 + boxH + 40);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2 - 6, y1 + boxH + 34);
                            ctx.lineTo(viz.width / 2, y1 + boxH + 42);
                            ctx.lineTo(viz.width / 2 + 6, y1 + boxH + 34);
                            ctx.fill();

                            // Formula
                            viz.screenText('\u03C3\u2091\u00B2 = y\u00B2\u03C3\u2093\u00B2 + x\u00B2\u03C3\u1D67\u00B2', viz.width / 2, y1 + boxH + 60, viz.colors.text, 12);

                            // Result box
                            var ry = y1 + boxH + 80;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(130, ry, 300, boxH);
                            viz.screenText('q = ' + q.toFixed(2) + ' \u00B1 ' + dq.toFixed(2), viz.width / 2, ry + 25, viz.colors.orange, 16);
                            viz.screenText('Relative uncertainty: ' + (relQ * 100).toFixed(1) + '%', viz.width / 2, ry + 50, viz.colors.text, 12);

                            // Contribution breakdown
                            var contX = (yVal * yVal * dxVal * dxVal) / (dq * dq) * 100;
                            var contY = (xVal * xVal * dyVal * dyVal) / (dq * dq) * 100;
                            var barY = ry + boxH + 20;
                            var barW = 300;

                            viz.screenText('Error budget:', viz.width / 2, barY, viz.colors.text, 11);
                            barY += 18;

                            ctx.fillStyle = viz.colors.blue + 'aa';
                            ctx.fillRect(130, barY, barW * contX / 100, 16);
                            ctx.fillStyle = viz.colors.teal + 'aa';
                            ctx.fillRect(130 + barW * contX / 100, barY, barW * contY / 100, 16);

                            viz.screenText('x: ' + contX.toFixed(0) + '%', 130 + barW * contX / 200, barY + 8, viz.colors.white, 10);
                            viz.screenText('y: ' + contY.toFixed(0) + '%', 130 + barW * contX / 100 + barW * contY / 200, barY + 8, viz.colors.white, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-chi-squared',
                    title: 'Chi-Squared Fitting',
                    description: 'Fit a line \\(y = a + bx\\) to noisy data. Adjust the slope and intercept to minimize \\(\\chi^2\\). The best fit turns green.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 320, scale: 28
                        });

                        // Generate noisy data
                        var trueA = 1.0, trueB = 2.0;
                        var nPts = 12;
                        var dataX = [], dataY = [], dataSig = [];
                        var rng = function() { return (Math.random() + Math.random() + Math.random() - 1.5) * 2; };
                        for (var i = 0; i < nPts; i++) {
                            var xi = 0.5 + i * 0.8;
                            var sig = 0.5 + Math.random() * 0.5;
                            var yi = trueA + trueB * xi + rng() * sig;
                            dataX.push(xi);
                            dataY.push(yi);
                            dataSig.push(sig);
                        }

                        var fitA = 0.5, fitB = 1.5;

                        VizEngine.createSlider(controls, 'a (intercept)', -3, 5, fitA, 0.1, function(v) { fitA = v; draw(); });
                        VizEngine.createSlider(controls, 'b (slope)', -1, 5, fitB, 0.1, function(v) { fitB = v; draw(); });

                        // Compute best fit
                        var S = 0, Sx = 0, Sxx = 0, Sy = 0, Sxy = 0;
                        for (var k = 0; k < nPts; k++) {
                            var w = 1 / (dataSig[k] * dataSig[k]);
                            S += w; Sx += dataX[k] * w; Sxx += dataX[k] * dataX[k] * w;
                            Sy += dataY[k] * w; Sxy += dataX[k] * dataY[k] * w;
                        }
                        var Delta = S * Sxx - Sx * Sx;
                        var bestA = (Sxx * Sy - Sx * Sxy) / Delta;
                        var bestB = (S * Sxy - Sx * Sy) / Delta;

                        VizEngine.createButton(controls, 'Best Fit', function() {
                            fitA = Math.round(bestA * 10) / 10;
                            fitB = Math.round(bestB * 10) / 10;
                            draw();
                        });

                        function chiSq(a, b) {
                            var chi2 = 0;
                            for (var i = 0; i < nPts; i++) {
                                var resid = (dataY[i] - a - b * dataX[i]) / dataSig[i];
                                chi2 += resid * resid;
                            }
                            return chi2;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Grid and axes
                            viz.drawGrid(2);
                            viz.drawAxes();

                            // Fit line
                            var chi2 = chiSq(fitA, fitB);
                            var bestChi2 = chiSq(bestA, bestB);
                            var isGood = chi2 < bestChi2 * 1.1;
                            var lineColor = isGood ? viz.colors.green : viz.colors.orange;

                            viz.drawFunction(function(x) { return fitA + fitB * x; }, -1, 12, lineColor, 2);

                            // Data points with error bars
                            for (var i = 0; i < nPts; i++) {
                                // Error bar
                                var sxp = viz.toScreen(dataX[i], dataY[i] + dataSig[i]);
                                var sxm = viz.toScreen(dataX[i], dataY[i] - dataSig[i]);
                                ctx.strokeStyle = viz.colors.text + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(sxp[0], sxp[1]);
                                ctx.lineTo(sxm[0], sxm[1]);
                                ctx.stroke();
                                // Caps
                                ctx.beginPath();
                                ctx.moveTo(sxp[0] - 3, sxp[1]);
                                ctx.lineTo(sxp[0] + 3, sxp[1]);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sxm[0] - 3, sxm[1]);
                                ctx.lineTo(sxm[0] + 3, sxm[1]);
                                ctx.stroke();

                                // Data point
                                viz.drawPoint(dataX[i], dataY[i], viz.colors.blue, null, 4);
                            }

                            // Labels
                            viz.screenText('y = ' + fitA.toFixed(1) + ' + ' + fitB.toFixed(1) + 'x', viz.width / 2, 18, lineColor, 14);
                            viz.screenText('\u03C7\u00B2 = ' + chi2.toFixed(1) + '   (best: ' + bestChi2.toFixed(1) + ',  \u03BD = ' + (nPts - 2) + ')', viz.width / 2, 38, viz.colors.text, 12);
                            viz.screenText('\u03C7\u00B2/\u03BD = ' + (chi2 / (nPts - 2)).toFixed(2), viz.width / 2, 54, isGood ? viz.colors.green : viz.colors.red, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You measure the radius of a sphere as \\(r = 5.0 \\pm 0.1\\;\\text{cm}\\). What is the volume and its uncertainty? (\\(V = \\frac{4}{3}\\pi r^3\\))',
                    hint: 'Compute \\(dV/dr = 4\\pi r^2\\), then \\(\\sigma_V = |dV/dr| \\cdot \\sigma_r\\).',
                    solution: '\\(V = \\frac{4}{3}\\pi (5.0)^3 = 523.6\\;\\text{cm}^3\\). \\(dV/dr = 4\\pi r^2 = 314.2\\;\\text{cm}^2\\). \\(\\sigma_V = 314.2 \\times 0.1 = 31.4\\;\\text{cm}^3\\). So \\(V = 524 \\pm 31\\;\\text{cm}^3\\). The relative error triples: \\(\\sigma_V/V = 3\\sigma_r/r = 6\\%\\).'
                },
                {
                    question: 'A linear fit to 10 data points gives \\(\\chi^2 = 15.3\\) with 2 fit parameters. Is this a good fit? What if \\(\\chi^2 = 3.1\\)?',
                    hint: 'For \\(\\nu = N - p = 8\\) degrees of freedom, a good fit has \\(\\chi^2/\\nu \\approx 1\\).',
                    solution: '\\(\\nu = 10 - 2 = 8\\). For \\(\\chi^2 = 15.3\\): \\(\\chi^2/\\nu = 1.91\\), somewhat high, suggesting the model does not perfectly describe the data (or errors are underestimated). For \\(\\chi^2 = 3.1\\): \\(\\chi^2/\\nu = 0.39\\), suspiciously low, suggesting errors may be overestimated.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Statistical Mechanics
        // ================================================================
        {
            id: 'sec-stat-mech',
            title: 'Statistical Mechanics',
            content: `
<h2>Statistical Mechanics</h2>

<div class="env-block intuition">
    <div class="env-title">From Microstates to Thermodynamics</div>
    <div class="env-body">
        <p>A gas at room temperature has \\(\\sim 10^{23}\\) molecules. We cannot track them individually, but we do not need to. Statistical mechanics bridges the microscopic (particles, energy levels) and the macroscopic (temperature, pressure, entropy) through probability.</p>
    </div>
</div>

<h3>The Microcanonical Ensemble</h3>

<p>The simplest setup: an isolated system with fixed energy \\(E\\), volume \\(V\\), and particle number \\(N\\). The fundamental postulate of statistical mechanics is:</p>

<div class="env-block theorem">
    <div class="env-title">Postulate (Equal a Priori Probability)</div>
    <div class="env-body">
        <p>For an isolated system in equilibrium, every accessible microstate is equally probable. If there are \\(\\Omega(E)\\) microstates with energy \\(E\\), each has probability \\(1/\\Omega(E)\\).</p>
    </div>
</div>

<p>Entropy connects to microstate counting via <strong>Boltzmann's formula</strong>:</p>

\\[
S = k_B \\ln \\Omega(E).
\\]

<h3>The Canonical Ensemble</h3>

<p>A more practical setup: a system in thermal contact with a heat bath at temperature \\(T\\). The system can exchange energy, so its energy fluctuates. The probability of microstate \\(i\\) is the Boltzmann distribution:</p>

\\[
P_i = \\frac{e^{-\\beta E_i}}{Z}, \\quad \\beta = \\frac{1}{k_B T}.
\\]

<h3>The Partition Function</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.6 (Partition Function)</div>
    <div class="env-body">
        <p>The <strong>partition function</strong> is</p>
        \\[
        Z = \\sum_i e^{-\\beta E_i} = \\sum_i e^{-E_i / k_B T}.
        \\]
        <p>All thermodynamic quantities follow from \\(Z\\):</p>
        <ul>
            <li>Free energy: \\(F = -k_B T \\ln Z\\)</li>
            <li>Average energy: \\(\\langle E \\rangle = -\\frac{\\partial \\ln Z}{\\partial \\beta}\\)</li>
            <li>Entropy: \\(S = k_B (\\ln Z + \\beta \\langle E \\rangle)\\)</li>
            <li>Heat capacity: \\(C_V = \\frac{\\partial \\langle E \\rangle}{\\partial T} = k_B \\beta^2 \\langle (\\Delta E)^2 \\rangle\\)</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Two-Level System</div>
    <div class="env-body">
        <p>A system with two states, energies \\(0\\) and \\(\\varepsilon\\). The partition function is</p>
        \\[Z = 1 + e^{-\\beta\\varepsilon}.\\]
        <p>Average energy: \\(\\langle E \\rangle = \\frac{\\varepsilon\\,e^{-\\beta\\varepsilon}}{1 + e^{-\\beta\\varepsilon}} = \\frac{\\varepsilon}{e^{\\beta\\varepsilon} + 1}.\\)</p>
        <p>At low \\(T\\): \\(\\langle E \\rangle \\to 0\\) (ground state dominates). At high \\(T\\): \\(\\langle E \\rangle \\to \\varepsilon/2\\) (equipartition).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-partition-function"></div>
`,
            visualizations: [
                {
                    id: 'viz-partition-function',
                    title: 'Partition Function & Thermodynamics',
                    description: 'A quantum harmonic oscillator with \\(E_n = (n + 1/2)\\hbar\\omega\\). Adjust temperature to see how the partition function determines all thermodynamic quantities.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var kT = 1.0; // in units of hbar*omega
                        var nMax = 20;

                        VizEngine.createSlider(controls, 'k\u2083T / \u0127\u03C9', 0.1, 5, kT, 0.1, function(v) {
                            kT = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Compute partition function for QHO: E_n = n + 0.5
                            var beta = 1 / kT;
                            var Z = 0;
                            var probs = [];
                            for (var n = 0; n < nMax; n++) {
                                var En = n + 0.5;
                                var boltz = Math.exp(-beta * En);
                                probs.push(boltz);
                                Z += boltz;
                            }
                            for (var j = 0; j < nMax; j++) probs[j] /= Z;

                            // Thermodynamic quantities
                            var avgE = 0, avgE2 = 0;
                            for (var m = 0; m < nMax; m++) {
                                var Em = m + 0.5;
                                avgE += Em * probs[m];
                                avgE2 += Em * Em * probs[m];
                            }
                            var F = -kT * Math.log(Z);
                            var S = (Math.log(Z) + beta * avgE); // in units of k_B
                            var Cv = beta * beta * (avgE2 - avgE * avgE); // in units of k_B

                            // Left panel: energy level populations
                            var panelLeft = 30;
                            var panelRight = 250;
                            var barMaxW = 160;
                            var levelH = 16;
                            var startY = 50;
                            var nShow = Math.min(nMax, 15);

                            viz.screenText('Energy Level Populations', (panelLeft + panelRight) / 2, 20, viz.colors.white, 13);
                            for (var i = 0; i < nShow; i++) {
                                var y = startY + i * levelH;
                                var w = probs[i] / probs[0] * barMaxW;

                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(panelLeft + 30, y + levelH / 2);
                                ctx.lineTo(panelRight, y + levelH / 2);
                                ctx.stroke();

                                var hue = 220 - i * 12;
                                ctx.fillStyle = 'hsl(' + hue + ',70%,60%)';
                                ctx.fillRect(panelLeft + 30, y + 1, Math.max(w, 1), levelH - 2);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('n=' + i, panelLeft + 25, y + levelH / 2);
                            }

                            // Right panel: thermodynamic quantities
                            var rpX = 310;
                            viz.screenText('Thermodynamic Quantities', 420, 20, viz.colors.white, 13);
                            viz.screenText('(units: \u0127\u03C9 and k\u2083)', 420, 36, viz.colors.text, 10);

                            var items = [
                                ['Z = ' + Z.toFixed(3), viz.colors.blue],
                                ['\u27E8E\u27E9 = ' + avgE.toFixed(3) + ' \u0127\u03C9', viz.colors.teal],
                                ['F = ' + F.toFixed(3) + ' \u0127\u03C9', viz.colors.orange],
                                ['S = ' + S.toFixed(3) + ' k\u2083', viz.colors.green],
                                ['C\u1D65 = ' + Cv.toFixed(3) + ' k\u2083', viz.colors.purple]
                            ];

                            for (var q = 0; q < items.length; q++) {
                                viz.screenText(items[q][0], rpX + 110, 70 + q * 28, items[q][1], 14, 'center', 'middle');
                            }

                            // Plot <E> vs kT
                            var plotLeft = rpX + 10, plotTop = 210, plotW = 220, plotH = 130;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotTop + plotH);
                            ctx.lineTo(plotLeft + plotW, plotTop + plotH);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotTop + plotH);
                            ctx.lineTo(plotLeft, plotTop);
                            ctx.stroke();

                            viz.screenText('k\u2083T/\u0127\u03C9', plotLeft + plotW / 2, plotTop + plotH + 14, viz.colors.text, 10);
                            viz.screenText('\u27E8E\u27E9', plotLeft - 10, plotTop + plotH / 2, viz.colors.text, 10);

                            // Curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var t = 0; t <= 100; t++) {
                                var tkT = 0.1 + t * 4.9 / 100;
                                var tBeta = 1 / tkT;
                                var tZ = 0, tE = 0;
                                for (var nn = 0; nn < nMax; nn++) {
                                    var bz = Math.exp(-tBeta * (nn + 0.5));
                                    tZ += bz;
                                    tE += (nn + 0.5) * bz;
                                }
                                tE /= tZ;
                                var px = plotLeft + (tkT - 0.1) / 4.9 * plotW;
                                var py = plotTop + plotH - (tE / 10) * plotH;
                                if (t === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Current point
                            var cpx = plotLeft + (kT - 0.1) / 4.9 * plotW;
                            var cpy = plotTop + plotH - (avgE / 10) * plotH;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(cpx, cpy, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Classical limit line
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            for (var tc = 0; tc <= 100; tc++) {
                                var tckT = 0.1 + tc * 4.9 / 100;
                                var clE = tckT; // classical: <E> = kT
                                var pcx = plotLeft + (tckT - 0.1) / 4.9 * plotW;
                                var pcy = plotTop + plotH - (clE / 10) * plotH;
                                if (tc === 0) ctx.moveTo(pcx, pcy); else ctx.lineTo(pcx, pcy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('classical kT', plotLeft + plotW - 30, plotTop + 10, viz.colors.text + '66', 9);

                            viz.screenText('k\u2083T = ' + kT.toFixed(1) + ' \u0127\u03C9', viz.width / 2, viz.height - 10, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For a two-level system with energies \\(0\\) and \\(\\varepsilon\\), compute the partition function, average energy, and heat capacity \\(C_V\\) as functions of temperature.',
                    hint: 'Start with \\(Z = 1 + e^{-\\beta\\varepsilon}\\), use \\(\\langle E \\rangle = -\\partial \\ln Z / \\partial \\beta\\), and \\(C_V = d\\langle E \\rangle / dT\\).',
                    solution: '\\(Z = 1 + e^{-\\beta\\varepsilon}\\). \\(\\langle E \\rangle = \\varepsilon e^{-\\beta\\varepsilon}/(1 + e^{-\\beta\\varepsilon}) = \\varepsilon/(e^{\\beta\\varepsilon} + 1)\\). \\(C_V = k_B (\\beta\\varepsilon)^2 \\frac{e^{\\beta\\varepsilon}}{(e^{\\beta\\varepsilon}+1)^2}\\). This is the Schottky anomaly: \\(C_V\\) has a peak near \\(k_BT \\sim \\varepsilon/2\\) and vanishes at both \\(T \\to 0\\) and \\(T \\to \\infty\\).'
                },
                {
                    question: 'Show that the quantum harmonic oscillator partition function \\(Z = \\sum_{n=0}^{\\infty} e^{-\\beta(n+1/2)\\hbar\\omega}\\) can be summed exactly, giving \\(Z = \\frac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}}\\).',
                    hint: 'Factor out \\(e^{-\\beta\\hbar\\omega/2}\\) and use the geometric series \\(\\sum_{n=0}^{\\infty} r^n = 1/(1-r)\\) for \\(|r| < 1\\).',
                    solution: '\\(Z = e^{-\\beta\\hbar\\omega/2} \\sum_{n=0}^{\\infty} (e^{-\\beta\\hbar\\omega})^n = \\frac{e^{-\\beta\\hbar\\omega/2}}{1 - e^{-\\beta\\hbar\\omega}}\\). This can be rewritten as \\(Z = \\frac{1}{2\\sinh(\\beta\\hbar\\omega/2)}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Random Processes
        // ================================================================
        {
            id: 'sec-random-processes',
            title: 'Random Processes',
            content: `
<h2>Random Processes</h2>

<div class="env-block intuition">
    <div class="env-title">From Dice to Diffusion</div>
    <div class="env-body">
        <p>A random process is a sequence of random variables indexed by time (or space). The simplest example, the random walk, connects to diffusion, Brownian motion, and the foundations of stochastic physics.</p>
    </div>
</div>

<h3>The Random Walk</h3>

<p>At each time step, a particle takes a step of length \\(a\\) in a random direction. After \\(N\\) steps, the displacement is</p>

\\[
\\mathbf{R}_N = \\sum_{i=1}^N \\mathbf{s}_i,
\\]

<p>where each \\(\\mathbf{s}_i\\) is an independent random step. Key results:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.2 (Random Walk)</div>
    <div class="env-body">
        <p>For a symmetric random walk in \\(d\\) dimensions with step length \\(a\\):</p>
        <ul>
            <li>\\(\\langle \\mathbf{R}_N \\rangle = 0\\) (no net drift)</li>
            <li>\\(\\langle R_N^2 \\rangle = N a^2\\) (root-mean-square distance grows as \\(\\sqrt{N}\\))</li>
        </ul>
        <p>In the continuum limit (many small steps), this becomes the <strong>diffusion equation</strong>:</p>
        \\[
        \\frac{\\partial P}{\\partial t} = D \\nabla^2 P, \\quad D = \\frac{a^2}{2d\\,\\Delta t}.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-random-walk"></div>

<h3>Brownian Motion</h3>

<p>In 1827, Robert Brown observed pollen grains jiggling in water. Einstein's 1905 analysis showed this is a random walk at the molecular scale. The <strong>mean square displacement</strong> of a Brownian particle is</p>

\\[
\\langle r^2 \\rangle = 2d\\,D\\,t,
\\]

<p>where \\(D = k_B T / (6\\pi \\eta a)\\) is the diffusion coefficient (Stokes-Einstein relation), \\(\\eta\\) is viscosity, and \\(a\\) is particle radius.</p>

<h3>The Langevin Equation</h3>

<p>The Langevin equation describes a Brownian particle with friction:</p>

\\[
m\\frac{dv}{dt} = -\\gamma v + \\xi(t),
\\]

<p>where \\(\\gamma\\) is the drag coefficient and \\(\\xi(t)\\) is a random force satisfying \\(\\langle \\xi(t) \\rangle = 0\\) and \\(\\langle \\xi(t)\\xi(t') \\rangle = 2\\gamma k_B T\\,\\delta(t - t')\\) (the fluctuation-dissipation theorem).</p>

<div class="env-block remark">
    <div class="env-title">Fluctuation-Dissipation</div>
    <div class="env-body">
        <p>The noise strength \\(2\\gamma k_B T\\) is not arbitrary. It is determined by the requirement that the particle reaches thermal equilibrium at temperature \\(T\\). The same friction that dissipates energy also provides the random kicks that maintain thermal motion. This is a deep principle: dissipation and fluctuation are two sides of the same coin.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-random-walk',
                    title: '2D Random Walk',
                    description: 'Watch particles perform random walks. The green circle shows the theoretical root-mean-square distance \\(\\sqrt{N}a\\). Many particles together illustrate the diffusion process.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 4
                        });

                        var nParticles = 30;
                        var stepSize = 1;
                        var step = 0;
                        var maxSteps = 500;
                        var particles = [];
                        var running = false;

                        VizEngine.createSlider(controls, 'Particles', 5, 100, nParticles, 5, function(v) {
                            nParticles = Math.round(v);
                            reset();
                        });

                        VizEngine.createButton(controls, 'Start', function() {
                            if (!running) {
                                running = true;
                                animate();
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            running = false;
                            reset();
                        });

                        function reset() {
                            step = 0;
                            particles = [];
                            for (var i = 0; i < nParticles; i++) {
                                particles.push({ x: 0, y: 0, trail: [{ x: 0, y: 0 }] });
                            }
                            draw();
                        }

                        function animate() {
                            if (!running || step >= maxSteps) { running = false; return; }
                            step++;
                            for (var i = 0; i < particles.length; i++) {
                                var angle = Math.random() * 2 * Math.PI;
                                particles[i].x += stepSize * Math.cos(angle);
                                particles[i].y += stepSize * Math.sin(angle);
                                if (particles[i].trail.length < 200) {
                                    particles[i].trail.push({ x: particles[i].x, y: particles[i].y });
                                } else {
                                    particles[i].trail.shift();
                                    particles[i].trail.push({ x: particles[i].x, y: particles[i].y });
                                }
                            }
                            draw();
                            requestAnimationFrame(animate);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // RMS circle
                            var rms = stepSize * Math.sqrt(step);
                            if (step > 0) {
                                var sr = rms * viz.scale;
                                var cx = viz.originX, cy = viz.originY;
                                ctx.strokeStyle = viz.colors.green + '55';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.arc(cx, cy, sr, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Particle trails and positions
                            for (var i = 0; i < particles.length; i++) {
                                var p = particles[i];
                                var hue = (i * 360 / particles.length) % 360;

                                // Trail
                                if (p.trail.length > 1 && particles.length <= 30) {
                                    ctx.strokeStyle = 'hsla(' + hue + ',60%,50%,0.3)';
                                    ctx.lineWidth = 0.8;
                                    ctx.beginPath();
                                    var sp0 = viz.toScreen(p.trail[0].x, p.trail[0].y);
                                    ctx.moveTo(sp0[0], sp0[1]);
                                    for (var t = 1; t < p.trail.length; t++) {
                                        var spt = viz.toScreen(p.trail[t].x, p.trail[t].y);
                                        ctx.lineTo(spt[0], spt[1]);
                                    }
                                    ctx.stroke();
                                }

                                // Current position
                                var sp = viz.toScreen(p.x, p.y);
                                ctx.fillStyle = 'hsl(' + hue + ',60%,60%)';
                                ctx.beginPath();
                                ctx.arc(sp[0], sp[1], 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Origin marker
                            viz.drawPoint(0, 0, viz.colors.white, null, 3);

                            // Stats
                            var actualRms = 0;
                            for (var j = 0; j < particles.length; j++) {
                                actualRms += particles[j].x * particles[j].x + particles[j].y * particles[j].y;
                            }
                            actualRms = Math.sqrt(actualRms / particles.length);

                            viz.screenText('Step ' + step + ' / ' + maxSteps, viz.width / 2, 16, viz.colors.white, 13);
                            viz.screenText('Theory: r_rms = \u221AN = ' + rms.toFixed(1) + '   Measured: ' + actualRms.toFixed(1), viz.width / 2, 34, viz.colors.text, 11);
                            viz.screenText(nParticles + ' particles, step size = ' + stepSize, viz.width / 2, viz.height - 10, viz.colors.text, 10);
                        }

                        reset();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 1D random walk has step size \\(a = 1\\) and takes \\(N\\) steps. Show that \\(\\langle R_N^2 \\rangle = Na^2\\) by computing \\(\\langle (\\sum_i s_i)^2 \\rangle\\) where each \\(s_i = \\pm a\\) with equal probability.',
                    hint: 'Expand the square: \\(\\langle (\\sum s_i)^2 \\rangle = \\sum_i \\langle s_i^2 \\rangle + \\sum_{i \\neq j} \\langle s_i s_j \\rangle\\). Use independence.',
                    solution: '\\(\\langle s_i^2 \\rangle = a^2\\) for all \\(i\\). Since steps are independent, \\(\\langle s_i s_j \\rangle = \\langle s_i \\rangle \\langle s_j \\rangle = 0\\) for \\(i \\neq j\\). So \\(\\langle R_N^2 \\rangle = \\sum_i a^2 = Na^2\\).'
                },
                {
                    question: 'Using the Stokes-Einstein relation \\(D = k_BT/(6\\pi\\eta a)\\), estimate the diffusion coefficient of a 1 \\(\\mu\\)m pollen grain in water at 300 K. How far does it diffuse in 1 second? (\\(\\eta_{\\text{water}} \\approx 10^{-3}\\;\\text{Pa}\\cdot\\text{s}\\))',
                    hint: 'Compute \\(D\\), then use \\(\\langle r^2 \\rangle = 4Dt\\) for 2D.',
                    solution: '\\(D = (1.38 \\times 10^{-23} \\times 300)/(6\\pi \\times 10^{-3} \\times 5 \\times 10^{-7}) = 4.39 \\times 10^{-13}\\;\\text{m}^2/\\text{s}\\). In 2D after 1 s: \\(\\sqrt{\\langle r^2 \\rangle} = \\sqrt{4Dt} \\approx 1.3\\;\\mu\\text{m}\\). The grain barely moves, as Brown observed.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Further Topics
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge to Further Topics',
            content: `
<h2>Bridge to Further Topics</h2>

<p>This chapter introduced the probabilistic toolkit that physicists use daily. Let us place what we have learned in the broader landscape of mathematical physics.</p>

<h3>What We Have Covered</h3>

<ul>
    <li><strong>Distributions.</strong> The Gaussian (measurement errors, central limit theorem), Poisson (counting rare events), and Boltzmann (thermal equilibrium) are the three pillars.</li>
    <li><strong>Error analysis.</strong> Propagation of uncertainties and chi-squared fitting are the experimenter's bread and butter.</li>
    <li><strong>Statistical mechanics.</strong> The partition function is a generating function for all thermodynamic quantities, connecting microstates to macroscopic observables.</li>
    <li><strong>Random processes.</strong> The random walk provides a microscopic model for diffusion, connecting particle-level dynamics to the diffusion equation (a PDE from Chapter 17).</li>
</ul>

<h3>Connections</h3>

<div class="env-block remark">
    <div class="env-title">Links to Earlier Chapters</div>
    <div class="env-body">
        <p><strong>Fourier analysis (Ch 14).</strong> The characteristic function \\(\\phi(k) = \\langle e^{ikX} \\rangle\\) is the Fourier transform of the probability density. The central limit theorem is most elegantly proved by showing that characteristic functions of sums converge to the Gaussian characteristic function.</p>
        <p><strong>PDEs (Ch 17).</strong> The diffusion equation \\(\\partial P/\\partial t = D\\nabla^2 P\\) is a parabolic PDE. Its Green's function is the Gaussian propagator. The heat equation is the diffusion equation for temperature.</p>
        <p><strong>Special functions (Ch 11-13).</strong> The quantum harmonic oscillator partition function connects to generating functions for Hermite polynomials. Angular momentum statistics in molecular physics involve Legendre functions and spherical harmonics.</p>
        <p><strong>Complex analysis (Ch 6-7).</strong> The steepest-descent (saddle-point) method for evaluating partition functions in the thermodynamic limit is a technique from complex analysis.</p>
    </div>
</div>

<h3>Where to Go Next</h3>

<p>The ideas in this chapter open doors to several advanced topics:</p>

<ol>
    <li><strong>Quantum statistical mechanics.</strong> Bosons obey Bose-Einstein statistics (\\(\\langle n \\rangle = 1/(e^{\\beta\\varepsilon} - 1)\\)); fermions obey Fermi-Dirac statistics (\\(\\langle n \\rangle = 1/(e^{\\beta\\varepsilon} + 1)\\)). These lead to phenomena like Bose-Einstein condensation and the Fermi sea.</li>
    <li><strong>Information theory.</strong> Shannon entropy \\(H = -\\sum p_i \\ln p_i\\) is Boltzmann entropy with \\(k_B = 1\\). The maximum entropy principle provides a principled way to assign probability distributions.</li>
    <li><strong>Stochastic differential equations.</strong> The Langevin equation generalizes to Ito and Stratonovich calculus, with applications from finance to biophysics.</li>
    <li><strong>Monte Carlo methods (Ch 19).</strong> Numerical sampling from probability distributions (Metropolis algorithm, importance sampling) powers modern computational physics. We will see these in the next chapter.</li>
</ol>

<div class="env-block intuition">
    <div class="env-title">A Closing Thought</div>
    <div class="env-body">
        <p>Maxwell wrote in 1871: "The true logic of this world is the calculus of probabilities." From experimental uncertainties to the arrow of time, probability is not merely a mathematical tool; it is woven into the fabric of physical law.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the Boltzmann distribution maximizes the entropy \\(S = -k_B \\sum_i P_i \\ln P_i\\) subject to the constraints \\(\\sum_i P_i = 1\\) and \\(\\sum_i P_i E_i = \\langle E \\rangle\\).',
                    hint: 'Use Lagrange multipliers. Introduce \\(\\alpha\\) for the normalization constraint and \\(\\beta\\) for the energy constraint, then vary \\(P_j\\).',
                    solution: 'Maximize \\(\\mathcal{L} = -\\sum P_i \\ln P_i - \\alpha(\\sum P_i - 1) - \\beta(\\sum P_i E_i - \\langle E \\rangle)\\). Setting \\(\\partial \\mathcal{L}/\\partial P_j = 0\\): \\(-\\ln P_j - 1 - \\alpha - \\beta E_j = 0\\), so \\(P_j = e^{-1-\\alpha-\\beta E_j}\\). The normalization constraint fixes \\(e^{-1-\\alpha} = 1/Z\\), giving \\(P_j = e^{-\\beta E_j}/Z\\), the Boltzmann distribution.'
                },
                {
                    question: 'The fluctuation-dissipation theorem requires \\(\\langle \\xi(t)\\xi(t\') \\rangle = 2\\gamma k_BT\\,\\delta(t-t\')\\). Starting from the Langevin equation \\(m\\dot{v} = -\\gamma v + \\xi\\), show that in the long-time limit \\(\\langle \\frac{1}{2}mv^2 \\rangle = \\frac{1}{2}k_BT\\), consistent with equipartition.',
                    hint: 'Solve the Langevin equation for \\(v(t)\\), compute \\(\\langle v^2 \\rangle\\) using the noise correlator, and take \\(t \\to \\infty\\).',
                    solution: 'The solution is \\(v(t) = v_0 e^{-\\gamma t/m} + \\frac{1}{m}\\int_0^t e^{-\\gamma(t-t\')/m}\\xi(t\')\\,dt\'\\). Computing \\(\\langle v^2 \\rangle\\) and using the noise correlator gives \\(\\langle v^2 \\rangle = v_0^2 e^{-2\\gamma t/m} + \\frac{k_BT}{m}(1 - e^{-2\\gamma t/m})\\). As \\(t \\to \\infty\\): \\(\\langle v^2 \\rangle \\to k_BT/m\\), so \\(\\langle \\frac{1}{2}mv^2 \\rangle = \\frac{1}{2}k_BT\\). Equipartition is satisfied.'
                }
            ]
        }
    ]
});
