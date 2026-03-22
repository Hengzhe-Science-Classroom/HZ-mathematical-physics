// === Chapter 11: Bessel Functions ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Bessel Functions',
    subtitle: 'The functions of cylindrical symmetry',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Bessel Functions?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Bessel Functions?</h2>

<div class="env-block intuition">
    <div class="env-title">Cylindrical Symmetry is Everywhere</div>
    <div class="env-body">
        <p>Strike a circular drum. The vibrating membrane satisfies the wave equation in polar coordinates. Separate variables and the radial part becomes Bessel's equation. The same equation appears in heat conduction through a cylindrical rod, electromagnetic modes in a circular waveguide, diffraction through a circular aperture, quantum mechanics of the hydrogen atom in cylindrical coordinates, and the buckling of circular plates.</p>
        <p>Bessel functions are to cylindrical geometry what sines and cosines are to rectangular geometry.</p>
    </div>
</div>

<h3>From the Wave Equation to Bessel's Equation</h3>

<p>Consider the vibration of a circular drumhead of radius \\(a\\). The displacement \\(u(r, \\theta, t)\\) satisfies the wave equation in polar coordinates:</p>

\\[
\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\left( \\frac{\\partial^2 u}{\\partial r^2} + \\frac{1}{r}\\frac{\\partial u}{\\partial r} + \\frac{1}{r^2}\\frac{\\partial^2 u}{\\partial \\theta^2} \\right).
\\]

<p>We look for separable solutions \\(u(r,\\theta,t) = R(r)\\,\\Theta(\\theta)\\,T(t)\\). After separating the angular and time parts, the radial equation becomes</p>

\\[
r^2 R'' + r R' + (k^2 r^2 - n^2) R = 0,
\\]

<p>where \\(n\\) is an integer (from the periodicity condition on \\(\\theta\\)) and \\(k\\) is a separation constant related to frequency. The substitution \\(x = kr\\) puts this into <strong>Bessel's equation</strong>:</p>

\\[
x^2 y'' + x y' + (x^2 - \\nu^2)y = 0.
\\]

<p>This is a second-order linear ODE with a regular singular point at \\(x = 0\\). Its solutions are the <strong>Bessel functions</strong>.</p>

<h3>Where Bessel Functions Appear</h3>

<table>
<thead><tr><th>Physical Problem</th><th>Equation</th><th>Role of Bessel Functions</th></tr></thead>
<tbody>
<tr><td>Vibrating drum</td><td>Wave equation, polar coords</td><td>Radial eigenfunctions</td></tr>
<tr><td>Heat flow in cylinder</td><td>Diffusion equation, cylindrical</td><td>Radial modes</td></tr>
<tr><td>Electromagnetic waveguide</td><td>Helmholtz equation</td><td>Transverse field profiles</td></tr>
<tr><td>Fraunhofer diffraction</td><td>Circular aperture</td><td>Airy pattern via \\(J_1\\)</td></tr>
<tr><td>Quantum scattering</td><td>Free-particle radial Schrodinger</td><td>Partial-wave solutions</td></tr>
<tr><td>Gravitational lensing</td><td>Deflection integrals</td><td>Hankel transforms</td></tr>
</tbody>
</table>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Friedrich Wilhelm Bessel (1784-1846) was a German astronomer and mathematician. He systematically studied these functions around 1824 while analyzing planetary perturbations, though Daniel Bernoulli had encountered \\(J_0\\) as early as 1732 in the study of hanging chains. The notation \\(J_\\nu\\) was introduced by Hansen (1843) and standardized by Watson in his 1922 treatise, which remains the definitive reference.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-bessel-functions"></div>
`,
            visualizations: [
                {
                    id: 'viz-bessel-functions',
                    title: 'Bessel Functions of the First Kind \\(J_n(x)\\)',
                    description: 'The Bessel functions \\(J_0\\) through \\(J_5\\) are oscillatory but not periodic; their amplitude decays as \\(x^{-1/2}\\). Use the slider to highlight a specific order.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 50, originY: 200, scale: 22
                        });

                        var highlight = 0;
                        VizEngine.createSlider(controls, 'Highlight order n', 0, 5, 0, 1, function(v) {
                            highlight = Math.round(v);
                            draw();
                        });

                        // Bessel J_n via series
                        function besselJ(n, x) {
                            var sum = 0;
                            for (var m = 0; m <= 30; m++) {
                                var sign = (m % 2 === 0) ? 1 : -1;
                                var num = Math.pow(x / 2, 2 * m + n);
                                var denom = factorialGamma(m) * gammaFunc(m + n + 1);
                                if (denom === 0 || !isFinite(num)) break;
                                sum += sign * num / denom;
                            }
                            return sum;
                        }

                        function factorialGamma(m) {
                            var r = 1;
                            for (var i = 2; i <= m; i++) r *= i;
                            return r;
                        }

                        function gammaFunc(n) {
                            // For positive integers, gamma(n) = (n-1)!
                            if (n <= 0 && n === Math.floor(n)) return Infinity;
                            var r = 1;
                            for (var i = 2; i < n; i++) r *= i;
                            return r;
                        }

                        var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.pink];
                        var labels = ['J\u2080', 'J\u2081', 'J\u2082', 'J\u2083', 'J\u2084', 'J\u2085'];

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var xMin = 0, xMax = 22;

                            // Draw all orders
                            for (var n = 0; n <= 5; n++) {
                                var col = colors[n];
                                var lw = (n === highlight) ? 3 : 1.2;
                                var alpha = (n === highlight) ? '' : '88';
                                viz.drawFunction(function(x) { return besselJ(n, x); }.bind(null, n), xMin, xMax, col + alpha, lw, 500);
                            }
                            // Rebind for closure issue: redraw highlighted on top
                            (function(hn) {
                                viz.drawFunction(function(x) { return besselJ(hn, x); }, xMin, xMax, colors[hn], 3, 500);
                            })(highlight);

                            // Legend
                            var ctx = viz.ctx;
                            for (var i = 0; i <= 5; i++) {
                                var lx = viz.width - 90;
                                var ly = 20 + i * 18;
                                ctx.fillStyle = colors[i];
                                ctx.fillRect(lx, ly, 14, 3);
                                ctx.font = (i === highlight ? 'bold ' : '') + '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(labels[i], lx + 18, ly + 2);
                            }

                            viz.screenText('x', viz.width - 15, viz.originY + 15, viz.colors.text, 12);
                            viz.screenText('J\u2099(x)', 15, 15, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Bessel's Equation
        // ================================================================
        {
            id: 'sec-equation',
            title: "Bessel's Equation",
            content: `
<h2>Bessel's Equation and Its Solutions</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Bessel's Equation)</div>
    <div class="env-body">
        <p><strong>Bessel's equation of order \\(\\nu\\)</strong> is</p>
        \\[
        x^2 y'' + x y' + (x^2 - \\nu^2) y = 0,
        \\]
        <p>where \\(\\nu \\geq 0\\) is a parameter (the <em>order</em>). It has a regular singular point at \\(x = 0\\) and an irregular singular point at \\(x = \\infty\\).</p>
    </div>
</div>

<h3>Frobenius Solution: Bessel Functions of the First Kind</h3>

<p>Since \\(x = 0\\) is a regular singular point, we apply the <strong>Frobenius method</strong>. We assume a solution of the form</p>

\\[
y(x) = \\sum_{m=0}^{\\infty} a_m \\, x^{m+s},
\\]

<p>substitute into Bessel's equation, and find the indicial equation \\(s^2 - \\nu^2 = 0\\), giving \\(s = \\pm \\nu\\).</p>

<p>Taking \\(s = \\nu\\) and solving the recurrence relation, we obtain</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.1 (Bessel Function of the First Kind)</div>
    <div class="env-body">
        <p>The <strong>Bessel function of the first kind</strong> of order \\(\\nu\\) is</p>
        \\[
        J_\\nu(x) = \\sum_{m=0}^{\\infty} \\frac{(-1)^m}{m! \\, \\Gamma(m + \\nu + 1)} \\left(\\frac{x}{2}\\right)^{2m+\\nu}.
        \\]
        <p>For integer order \\(\\nu = n\\), this simplifies to</p>
        \\[
        J_n(x) = \\sum_{m=0}^{\\infty} \\frac{(-1)^m}{m! \\, (m+n)!} \\left(\\frac{x}{2}\\right)^{2m+n}.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof (Frobenius Method)</div>
    <div class="env-body">
        <p>Substituting \\(y = \\sum a_m x^{m+s}\\) into \\(x^2 y'' + xy' + (x^2 - \\nu^2)y = 0\\):</p>
        <ul>
            <li>\\(x^2 y'' = \\sum a_m (m+s)(m+s-1) x^{m+s}\\)</li>
            <li>\\(xy' = \\sum a_m (m+s) x^{m+s}\\)</li>
            <li>\\(x^2 y = \\sum a_m x^{m+s+2}\\)</li>
            <li>\\(-\\nu^2 y = -\\nu^2 \\sum a_m x^{m+s}\\)</li>
        </ul>
        <p>Combining and setting the coefficient of \\(x^{m+s}\\) to zero:</p>
        <ul>
            <li>\\(m = 0\\): \\(a_0 [s^2 - \\nu^2] = 0\\). Since \\(a_0 \\neq 0\\), we get the indicial equation \\(s = \\pm \\nu\\).</li>
            <li>\\(m = 1\\): \\(a_1 [(1+s)^2 - \\nu^2] = 0\\). For \\(s = \\nu\\), this gives \\(a_1(1 + 2\\nu) = 0\\), so \\(a_1 = 0\\) (assuming \\(\\nu \\neq -1/2\\)).</li>
            <li>General \\(m \\geq 2\\): \\(a_m [(m+s)^2 - \\nu^2] + a_{m-2} = 0\\), giving the recurrence</li>
        </ul>
        \\[
        a_m = -\\frac{a_{m-2}}{(m+s)^2 - \\nu^2} = -\\frac{a_{m-2}}{m(m + 2\\nu)}.
        \\]
        <p>Since \\(a_1 = 0\\), all odd coefficients vanish. With \\(a_0 = \\frac{1}{2^\\nu \\Gamma(\\nu+1)}\\) (by convention), the even coefficients \\(a_{2m}\\) yield exactly \\(J_\\nu(x)\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Bessel Functions of the Second Kind (Neumann Functions)</h3>

<p>When \\(\\nu\\) is an integer \\(n\\), the two Frobenius roots \\(s = n\\) and \\(s = -n\\) differ by an integer, and \\(J_{-n}(x) = (-1)^n J_n(x)\\), so \\(J_n\\) and \\(J_{-n}\\) are not linearly independent. We need a second solution.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Neumann Function)</div>
    <div class="env-body">
        <p>The <strong>Bessel function of the second kind</strong> (Neumann function) is defined by</p>
        \\[
        Y_\\nu(x) = \\frac{J_\\nu(x) \\cos(\\nu\\pi) - J_{-\\nu}(x)}{\\sin(\\nu\\pi)}.
        \\]
        <p>For integer \\(\\nu = n\\), this is understood as a limit \\(Y_n(x) = \\lim_{\\nu \\to n} Y_\\nu(x)\\). The function \\(Y_n(x)\\) is singular at \\(x = 0\\), with \\(Y_n(x) \\to -\\infty\\) as \\(x \\to 0^+\\).</p>
    </div>
</div>

<p>The general solution to Bessel's equation of integer order is</p>

\\[
y(x) = A \\, J_n(x) + B \\, Y_n(x).
\\]

<p>In physical problems where the solution must be finite at the origin (e.g., vibrations of a complete drum), we require \\(B = 0\\) and keep only \\(J_n\\).</p>

<h3>Asymptotic Behavior</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.2 (Asymptotics)</div>
    <div class="env-body">
        <p>For large \\(x \\gg \\nu\\):</p>
        \\[
        J_\\nu(x) \\sim \\sqrt{\\frac{2}{\\pi x}} \\cos\\!\\left(x - \\frac{\\nu\\pi}{2} - \\frac{\\pi}{4}\\right), \\qquad
        Y_\\nu(x) \\sim \\sqrt{\\frac{2}{\\pi x}} \\sin\\!\\left(x - \\frac{\\nu\\pi}{2} - \\frac{\\pi}{4}\\right).
        \\]
        <p>Near the origin:</p>
        \\[
        J_\\nu(x) \\sim \\frac{1}{\\Gamma(\\nu+1)}\\left(\\frac{x}{2}\\right)^\\nu, \\qquad
        Y_0(x) \\sim \\frac{2}{\\pi}\\ln\\frac{x}{2}, \\qquad
        Y_n(x) \\sim -\\frac{(n-1)!}{\\pi}\\left(\\frac{2}{x}\\right)^n \\;(n \\geq 1).
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-neumann-functions"></div>
<div class="viz-placeholder" data-viz="viz-bessel-zeros"></div>
`,
            visualizations: [
                {
                    id: 'viz-neumann-functions',
                    title: 'Neumann Functions \\(Y_n(x)\\): Singular at the Origin',
                    description: 'The Neumann functions \\(Y_n(x)\\) diverge logarithmically (for \\(n=0\\)) or as a power law (for \\(n \\geq 1\\)) as \\(x \\to 0\\). They oscillate for large \\(x\\) with decaying amplitude, just like \\(J_n\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 50, originY: 200, scale: 22
                        });

                        var highlight = 0;
                        VizEngine.createSlider(controls, 'Highlight order n', 0, 4, 0, 1, function(v) {
                            highlight = Math.round(v);
                            draw();
                        });

                        function besselJ(n, x) {
                            if (x <= 0) return n === 0 ? 1 : 0;
                            var sum = 0;
                            for (var m = 0; m <= 30; m++) {
                                var sign = (m % 2 === 0) ? 1 : -1;
                                var num = Math.pow(x / 2, 2 * m + n);
                                var denom = factorial(m) * factorial(m + n);
                                if (denom === 0 || !isFinite(num)) break;
                                sum += sign * num / denom;
                            }
                            return sum;
                        }

                        function factorial(n) {
                            var r = 1;
                            for (var i = 2; i <= n; i++) r *= i;
                            return r;
                        }

                        // Y_n via asymptotic for x > threshold, series-based otherwise
                        function besselY(n, x) {
                            if (x <= 0.01) return -1e6;
                            // Use the asymptotic form for moderate-to-large x
                            if (x > 1.5 + n) {
                                return Math.sqrt(2 / (Math.PI * x)) * Math.sin(x - n * Math.PI / 2 - Math.PI / 4);
                            }
                            // For small x, use limiting forms
                            if (n === 0) {
                                // Y_0 ~ (2/pi)(ln(x/2) + gamma) J_0 + series
                                var gamma = 0.5772156649;
                                var j0 = besselJ(0, x);
                                var sum = 0;
                                for (var m = 1; m <= 20; m++) {
                                    var hm = 0;
                                    for (var k = 1; k <= m; k++) hm += 1 / k;
                                    var sign = (m % 2 === 0) ? 1 : -1;
                                    var term = sign * hm * Math.pow(x / 2, 2 * m) / (factorial(m) * factorial(m));
                                    sum += term;
                                }
                                return (2 / Math.PI) * ((Math.log(x / 2) + gamma) * j0 + sum);
                            }
                            // For n >= 1, leading singular term
                            var leading = -(factorial(n - 1) / Math.PI) * Math.pow(2 / x, n);
                            return leading;
                        }

                        var colors = [viz.colors.red, viz.colors.orange, viz.colors.yellow, viz.colors.pink, viz.colors.purple];
                        var labels = ['Y\u2080', 'Y\u2081', 'Y\u2082', 'Y\u2083', 'Y\u2084'];

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            for (var n = 0; n <= 4; n++) {
                                var col = colors[n];
                                var lw = (n === highlight) ? 3 : 1.2;
                                var alpha = (n === highlight) ? '' : '88';
                                (function(nn) {
                                    viz.drawFunction(function(x) {
                                        var val = besselY(nn, x);
                                        return (val < -4) ? NaN : val;
                                    }, 0.05, 22, col + alpha, lw, 500);
                                })(n);
                            }
                            // Redraw highlighted on top
                            (function(hn) {
                                viz.drawFunction(function(x) {
                                    var val = besselY(hn, x);
                                    return (val < -4) ? NaN : val;
                                }, 0.05, 22, colors[hn], 3, 500);
                            })(highlight);

                            // Legend
                            var ctx = viz.ctx;
                            for (var i = 0; i <= 4; i++) {
                                var lx = viz.width - 90;
                                var ly = 20 + i * 18;
                                ctx.fillStyle = colors[i];
                                ctx.fillRect(lx, ly, 14, 3);
                                ctx.font = (i === highlight ? 'bold ' : '') + '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(labels[i], lx + 18, ly + 2);
                            }

                            viz.screenText('x', viz.width - 15, viz.originY + 15, viz.colors.text, 12);
                            viz.screenText('Y\u2099(x)', 15, 15, viz.colors.white, 13);
                            viz.screenText('singular at x = 0', 180, 20, viz.colors.red, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-bessel-zeros',
                    title: 'Zeros of \\(J_n(x)\\) and Node Lines on a Drum',
                    description: 'Left: the zeros of \\(J_n\\) determine the allowed vibration frequencies of a circular drum. Right: the node lines (circles and radii) for the mode \\((n, m)\\). Adjust the angular and radial mode numbers.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var modeN = 0, modeM = 1;
                        VizEngine.createSlider(controls, 'Angular n', 0, 4, 0, 1, function(v) {
                            modeN = Math.round(v); draw();
                        });
                        VizEngine.createSlider(controls, 'Radial m', 1, 5, 1, 1, function(v) {
                            modeM = Math.round(v); draw();
                        });

                        function besselJ(n, x) {
                            if (x < 0) return (n % 2 === 0 ? 1 : -1) * besselJ(n, -x);
                            var sum = 0;
                            for (var k = 0; k <= 30; k++) {
                                var sign = (k % 2 === 0) ? 1 : -1;
                                var num = Math.pow(x / 2, 2 * k + n);
                                var denom = fact(k) * fact(k + n);
                                if (!isFinite(num) || denom === 0) break;
                                sum += sign * num / denom;
                            }
                            return sum;
                        }
                        function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        // Find zeros of J_n by bisection
                        function findZeros(n, count) {
                            var zeros = [];
                            var dx = 0.01;
                            var x = (n === 0) ? 0.5 : n * 0.5;
                            while (zeros.length < count && x < 100) {
                                var f1 = besselJ(n, x);
                                var f2 = besselJ(n, x + dx);
                                if (f1 * f2 < 0) {
                                    // bisect
                                    var lo = x, hi = x + dx;
                                    for (var i = 0; i < 50; i++) {
                                        var mid = (lo + hi) / 2;
                                        if (besselJ(n, lo) * besselJ(n, mid) < 0) hi = mid;
                                        else lo = mid;
                                    }
                                    zeros.push((lo + hi) / 2);
                                }
                                x += dx;
                            }
                            return zeros;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Left panel: J_n with zeros marked
                            var leftW = W * 0.48;
                            var rightX = W * 0.52;
                            var rightW = W * 0.48;

                            // Draw J_n on left
                            var plotL = 20, plotR = leftW - 10;
                            var plotT = 40, plotB = H - 30;
                            var plotH = plotB - plotT;
                            var xMax = 20;
                            var yScale = plotH / 2.4;
                            var yCenter = plotT + plotH * 0.4;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(plotL, yCenter); ctx.lineTo(plotR, yCenter); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotT); ctx.lineTo(plotL, plotB); ctx.stroke();

                            // Draw function
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 400; i++) {
                                var x = xMax * i / 400;
                                var y = besselJ(modeN, x);
                                var sx = plotL + (plotR - plotL) * x / xMax;
                                var sy = yCenter - y * yScale;
                                if (!isFinite(y)) { started = false; continue; }
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Mark zeros
                            var zeros = findZeros(modeN, 8);
                            for (var z = 0; z < zeros.length; z++) {
                                var zx = plotL + (plotR - plotL) * zeros[z] / xMax;
                                ctx.fillStyle = (z === modeM - 1) ? viz.colors.orange : viz.colors.teal;
                                ctx.beginPath(); ctx.arc(zx, yCenter, (z === modeM - 1) ? 6 : 4, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(zeros[z].toFixed(2), zx, yCenter + 14);
                            }

                            viz.screenText('J' + String.fromCharCode(8320 + modeN) + '(x) and its zeros', leftW / 2, 20, viz.colors.white, 12);

                            // Right panel: drum with node lines
                            var cx = rightX + rightW / 2;
                            var cy = H / 2 + 10;
                            var drumR = Math.min(rightW, H - 60) / 2 - 10;

                            // Draw drum boundary
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, drumR, 0, Math.PI * 2); ctx.stroke();

                            // Draw node pattern using color
                            var zeroVal = zeros[modeM - 1] || 5;
                            var imgSize = Math.ceil(drumR * 2);
                            for (var py = -drumR; py <= drumR; py += 2) {
                                for (var px = -drumR; px <= drumR; px += 2) {
                                    var r = Math.sqrt(px * px + py * py);
                                    if (r > drumR) continue;
                                    var theta = Math.atan2(py, px);
                                    var rNorm = r / drumR;
                                    var val = besselJ(modeN, zeroVal * rNorm) * Math.cos(modeN * theta);
                                    var intensity = Math.abs(val);
                                    if (val > 0) {
                                        ctx.fillStyle = 'rgba(88,166,255,' + (intensity * 0.8) + ')';
                                    } else {
                                        ctx.fillStyle = 'rgba(248,81,73,' + (intensity * 0.8) + ')';
                                    }
                                    ctx.fillRect(cx + px, cy + py, 2, 2);
                                }
                            }

                            // Redraw boundary
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, drumR, 0, Math.PI * 2); ctx.stroke();

                            viz.screenText('Mode (' + modeN + ', ' + modeM + ')', cx, 20, viz.colors.white, 12);
                            viz.screenText('Blue = +, Red = \u2013', cx, H - 10, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify by direct substitution that \\(J_0(x) = \\sum_{m=0}^{\\infty} \\frac{(-1)^m}{(m!)^2}\\left(\\frac{x}{2}\\right)^{2m}\\) satisfies Bessel\'s equation with \\(\\nu = 0\\).',
                    hint: 'Compute \\(y\' = J_0\'(x)\\) and \\(y\'\' = J_0\'\'(x)\\) term by term from the series, then substitute into \\(x^2 y\'\' + x y\' + x^2 y = 0\\).',
                    solution: 'Differentiating term by term: \\(J_0\'(x) = \\sum_{m=1}^{\\infty} \\frac{(-1)^m \\cdot 2m}{(m!)^2 \\cdot 2^{2m}} x^{2m-1}\\). After substitution, the coefficient of \\(x^{2m}\\) in \\(x^2 y\'\' + xy\' + x^2 y\\) becomes \\(\\frac{(-1)^m}{(m!)^2 2^{2m}}[(2m)^2 - (2m)^2] + \\frac{(-1)^{m-1}}{((m-1)!)^2 2^{2m-2}} \\cdot \\frac{1}{1}\\). The recurrence relation guarantees this vanishes identically for each \\(m\\).'
                },
                {
                    question: 'Show that \\(J_{-n}(x) = (-1)^n J_n(x)\\) for integer \\(n \\geq 0\\).',
                    hint: 'In the series for \\(J_{-n}\\), the first \\(n\\) terms vanish because \\(\\Gamma(m - n + 1) = \\infty\\) for \\(m = 0, 1, \\ldots, n-1\\). Re-index the remaining sum.',
                    solution: 'From \\(J_{-n}(x) = \\sum_{m=0}^{\\infty} \\frac{(-1)^m}{m!\\,\\Gamma(m-n+1)}(x/2)^{2m-n}\\), terms with \\(m < n\\) vanish since \\(\\Gamma\\) has poles at non-positive integers. Setting \\(m = k + n\\): \\(J_{-n}(x) = \\sum_{k=0}^{\\infty} \\frac{(-1)^{k+n}}{(k+n)!\\,k!}(x/2)^{2k+n} = (-1)^n J_n(x)\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Properties
        // ================================================================
        {
            id: 'sec-properties',
            title: 'Properties',
            content: `
<h2>Properties of Bessel Functions</h2>

<h3>Recurrence Relations</h3>

<p>Bessel functions satisfy a pair of recurrence relations that connect \\(J_{\\nu-1}\\), \\(J_\\nu\\), and \\(J_{\\nu+1}\\):</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.3 (Recurrence Relations)</div>
    <div class="env-body">
        \\[
        J_{\\nu-1}(x) + J_{\\nu+1}(x) = \\frac{2\\nu}{x} J_\\nu(x),
        \\]
        \\[
        J_{\\nu-1}(x) - J_{\\nu+1}(x) = 2 J_\\nu'(x).
        \\]
        <p>Equivalently:</p>
        \\[
        \\frac{d}{dx}\\bigl[x^\\nu J_\\nu(x)\\bigr] = x^\\nu J_{\\nu-1}(x), \\qquad
        \\frac{d}{dx}\\bigl[x^{-\\nu} J_\\nu(x)\\bigr] = -x^{-\\nu} J_{\\nu+1}(x).
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof (First Recurrence)</div>
    <div class="env-body">
        <p>From the series \\(J_\\nu(x) = \\sum_m \\frac{(-1)^m}{m!\\,\\Gamma(m+\\nu+1)}(x/2)^{2m+\\nu}\\), compute \\(\\frac{d}{dx}[x^\\nu J_\\nu]\\):</p>
        \\[
        \\frac{d}{dx}[x^\\nu J_\\nu] = \\sum_{m=0}^{\\infty} \\frac{(-1)^m (2m+2\\nu)}{m!\\,\\Gamma(m+\\nu+1) \\cdot 2^{2m+\\nu}} x^{2m+2\\nu-1}.
        \\]
        <p>Using \\(\\Gamma(m+\\nu+1) = (m+\\nu)\\Gamma(m+\\nu)\\), the right side simplifies to \\(x^\\nu J_{\\nu-1}(x)\\). A similar calculation with \\(x^{-\\nu}J_\\nu\\) gives the second identity. Adding and subtracting these yields the two recurrence relations.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Derivative of \\(J_0\\)</div>
    <div class="env-body">
        <p>Setting \\(\\nu = 0\\) in the second differentiation formula: \\(\\frac{d}{dx}[J_0(x)] = -J_1(x)\\). This is the Bessel-function analogue of \\(\\frac{d}{dx}[\\cos x] = -\\sin x\\).</p>
    </div>
</div>

<h3>Orthogonality</h3>

<p>Bessel functions satisfy an orthogonality relation on \\([0, a]\\) with weight \\(r\\):</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.4 (Orthogonality of Bessel Functions)</div>
    <div class="env-body">
        <p>Let \\(\\alpha_{nm}\\) and \\(\\alpha_{nk}\\) be two distinct positive zeros of \\(J_n\\). Then</p>
        \\[
        \\int_0^a r \\, J_n\\!\\left(\\frac{\\alpha_{nm}}{a}r\\right) J_n\\!\\left(\\frac{\\alpha_{nk}}{a}r\\right) dr = 0, \\qquad m \\neq k.
        \\]
        <p>The normalization integral is</p>
        \\[
        \\int_0^a r \\, \\left[J_n\\!\\left(\\frac{\\alpha_{nm}}{a}r\\right)\\right]^2 dr = \\frac{a^2}{2}\\left[J_{n+1}(\\alpha_{nm})\\right]^2.
        \\]
    </div>
</div>

<p>This orthogonality allows us to expand functions in <strong>Fourier-Bessel series</strong>, exactly as we expand in Fourier sine/cosine series using the orthogonality of trigonometric functions.</p>

<h3>Generating Function</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.5 (Generating Function)</div>
    <div class="env-body">
        <p>The Bessel functions of integer order are generated by</p>
        \\[
        e^{(x/2)(t - 1/t)} = \\sum_{n=-\\infty}^{\\infty} J_n(x)\\, t^n.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Write \\(e^{(x/2)t} = \\sum_{k=0}^{\\infty} \\frac{(x/2)^k}{k!} t^k\\) and \\(e^{-(x/2)/t} = \\sum_{j=0}^{\\infty} \\frac{(-1)^j (x/2)^j}{j!} t^{-j}\\). Multiplying and collecting powers of \\(t^n\\) gives \\(J_n(x)\\) as the coefficient of \\(t^n\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Integral Representations</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.6 (Integral Representations)</div>
    <div class="env-body">
        <p>For integer order \\(n\\):</p>
        \\[
        J_n(x) = \\frac{1}{\\pi} \\int_0^\\pi \\cos(x \\sin\\theta - n\\theta)\\, d\\theta.
        \\]
        <p>For general order \\(\\nu > -1/2\\):</p>
        \\[
        J_\\nu(x) = \\frac{(x/2)^\\nu}{\\Gamma(\\nu + 1/2)\\,\\Gamma(1/2)} \\int_{-1}^{1} e^{ixt}(1 - t^2)^{\\nu - 1/2}\\, dt.
        \\]
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Use the recurrence \\(J_{\\nu-1}(x) - J_{\\nu+1}(x) = 2J_\\nu\'(x)\\) to show that \\(J_0\'(x) = -J_1(x)\\).',
                    hint: 'Set \\(\\nu = 0\\) and use \\(J_{-1}(x) = -J_1(x)\\).',
                    solution: 'With \\(\\nu = 0\\): \\(J_{-1}(x) - J_1(x) = 2J_0\'(x)\\). Since \\(J_{-1}(x) = (-1)^1 J_1(x) = -J_1(x)\\), we get \\(-J_1(x) - J_1(x) = 2J_0\'(x)\\), so \\(J_0\'(x) = -J_1(x)\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Derive the identity \\(\\int_0^x t\\, J_0(t)\\, dt = x\\, J_1(x)\\) from the recurrence relation \\(\\frac{d}{dx}[x J_1(x)] = x J_0(x)\\).',
                    hint: 'The recurrence \\(\\frac{d}{dx}[x^\\nu J_\\nu(x)] = x^\\nu J_{\\nu-1}(x)\\) with \\(\\nu = 1\\) gives \\(\\frac{d}{dx}[xJ_1(x)] = xJ_0(x)\\). Integrate both sides.',
                    solution: 'Setting \\(\\nu = 1\\): \\(\\frac{d}{dx}[x J_1(x)] = x J_0(x)\\). Integrating from 0 to \\(x\\): \\(x J_1(x) - [0 \\cdot J_1(0)] = \\int_0^x t J_0(t)\\,dt\\). Since \\(J_1(0) = 0\\), we get \\(\\int_0^x t J_0(t)\\,dt = x J_1(x)\\). \\(\\checkmark\\)'
                },
            ]
        },

        // ================================================================
        // SECTION 4: Modified Bessel Functions
        // ================================================================
        {
            id: 'sec-modified',
            title: 'Modified Bessel Functions',
            content: `
<h2>Modified Bessel Functions</h2>

<div class="env-block intuition">
    <div class="env-title">From Oscillation to Growth/Decay</div>
    <div class="env-body">
        <p>Bessel's equation with \\(x^2\\) replaced by \\(-x^2\\) gives the <strong>modified Bessel equation</strong>. The solutions no longer oscillate; instead they grow or decay exponentially. The relationship is analogous to \\(\\cos x \\leftrightarrow \\cosh x\\) and \\(\\sin x \\leftrightarrow \\sinh x\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Modified Bessel Equation)</div>
    <div class="env-body">
        <p>The <strong>modified Bessel equation</strong> of order \\(\\nu\\) is</p>
        \\[
        x^2 y'' + x y' - (x^2 + \\nu^2)y = 0.
        \\]
        <p>This is obtained from Bessel's equation by replacing \\(x \\to ix\\). Its solutions are the <strong>modified Bessel functions</strong>.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (\\(I_\\nu\\) and \\(K_\\nu\\))</div>
    <div class="env-body">
        <p>The <strong>modified Bessel function of the first kind</strong> is</p>
        \\[
        I_\\nu(x) = i^{-\\nu} J_\\nu(ix) = \\sum_{m=0}^{\\infty} \\frac{1}{m!\\,\\Gamma(m+\\nu+1)} \\left(\\frac{x}{2}\\right)^{2m+\\nu}.
        \\]
        <p>Note: no alternating signs, so \\(I_\\nu\\) grows monotonically.</p>
        <p>The <strong>modified Bessel function of the second kind</strong> is</p>
        \\[
        K_\\nu(x) = \\frac{\\pi}{2} \\frac{I_{-\\nu}(x) - I_\\nu(x)}{\\sin(\\nu\\pi)},
        \\]
        <p>which decays exponentially as \\(x \\to \\infty\\).</p>
    </div>
</div>

<h3>Asymptotic Behavior</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.7 (Modified Bessel Asymptotics)</div>
    <div class="env-body">
        <p>For large \\(x\\):</p>
        \\[
        I_\\nu(x) \\sim \\frac{e^x}{\\sqrt{2\\pi x}}, \\qquad K_\\nu(x) \\sim \\sqrt{\\frac{\\pi}{2x}}\\, e^{-x}.
        \\]
        <p>Near \\(x = 0\\): \\(I_\\nu(x) \\sim \\frac{1}{\\Gamma(\\nu+1)}(x/2)^\\nu\\), and \\(K_0(x) \\sim -\\ln(x/2)\\).</p>
    </div>
</div>

<h3>Physical Significance</h3>

<p>Modified Bessel functions arise whenever the separated equation has a different sign from the standard Bessel case:</p>
<ul>
    <li><strong>\\(I_\\nu\\):</strong> describes exponentially growing/bounded solutions inside a cylinder (e.g., the potential inside a conducting cylinder with given boundary data).</li>
    <li><strong>\\(K_\\nu\\):</strong> describes exponentially decaying solutions outside a cylinder (e.g., evanescent fields outside a waveguide, screened Coulomb potential in plasma physics).</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example: Screened Coulomb (Yukawa) Potential</div>
    <div class="env-body">
        <p>In a plasma or in nuclear physics, the screened Coulomb potential in cylindrical coordinates involves \\(K_0(\\kappa r)\\), where \\(\\kappa\\) is the inverse screening length. The exponential decay of \\(K_0\\) at large \\(r\\) ensures the potential is short-ranged.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-modified-bessel"></div>
`,
            visualizations: [
                {
                    id: 'viz-modified-bessel',
                    title: 'Modified Bessel Functions: \\(I_n\\) (Growth) and \\(K_n\\) (Decay)',
                    description: '\\(I_n(x)\\) grows exponentially; \\(K_n(x)\\) decays exponentially. These are the Bessel-function analogues of \\(\\cosh\\) and \\(e^{-x}\\). Use the slider to select the order.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 50, originY: 340, scale: 60
                        });

                        var order = 0;
                        VizEngine.createSlider(controls, 'Order n', 0, 3, 0, 1, function(v) {
                            order = Math.round(v);
                            draw();
                        });

                        function besselI(n, x) {
                            if (x < 0) return 0;
                            var sum = 0;
                            for (var m = 0; m <= 30; m++) {
                                var num = Math.pow(x / 2, 2 * m + n);
                                var denom = fact(m) * fact(m + n);
                                if (!isFinite(num) || denom === 0) break;
                                sum += num / denom;
                            }
                            return sum;
                        }

                        function besselK(n, x) {
                            if (x <= 0.05) return 1e6;
                            // Use asymptotic for moderate x
                            if (x > 2) {
                                return Math.sqrt(Math.PI / (2 * x)) * Math.exp(-x);
                            }
                            // Small x approximations
                            if (n === 0) {
                                return -Math.log(x / 2) - 0.5772156649 + besselI(0, x) * 0.01;
                            }
                            // For n >= 1, leading term
                            return 0.5 * fact(n - 1) * Math.pow(2 / x, n);
                        }

                        function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Custom coordinate system for this viz
                            var plotL = 50, plotR = viz.width - 20;
                            var plotT = 30, plotB = 340;
                            var xMax = 5, yMaxI = 5, yMaxK = 5;

                            // Background grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= xMax; gx++) {
                                var sx = plotL + (plotR - plotL) * gx / xMax;
                                ctx.beginPath(); ctx.moveTo(sx, plotT); ctx.lineTo(sx, plotB); ctx.stroke();
                            }
                            for (var gy = 0; gy <= 5; gy++) {
                                var sy = plotB - (plotB - plotT) * gy / yMaxI;
                                ctx.beginPath(); ctx.moveTo(plotL, sy); ctx.lineTo(plotR, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotT); ctx.lineTo(plotL, plotB); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var lx = 0; lx <= xMax; lx++) {
                                ctx.fillText(lx, plotL + (plotR - plotL) * lx / xMax, plotB + 14);
                            }
                            ctx.textAlign = 'right';
                            for (var ly = 0; ly <= 5; ly++) {
                                ctx.fillText(ly, plotL - 5, plotB - (plotB - plotT) * ly / yMaxI + 3);
                            }

                            function toSx(x) { return plotL + (plotR - plotL) * x / xMax; }
                            function toSy(y) { return plotB - (plotB - plotT) * Math.min(y, yMaxI) / yMaxI; }

                            // Draw I_n
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 300; i++) {
                                var x = xMax * i / 300;
                                var y = besselI(order, x);
                                if (!isFinite(y) || y > yMaxI * 1.1) { started = false; continue; }
                                var sx = toSx(x), sy = toSy(y);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw K_n
                            ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            started = false;
                            for (var i = 1; i <= 300; i++) {
                                var x = xMax * i / 300;
                                var y = besselK(order, x);
                                if (!isFinite(y) || y > yMaxK * 1.1 || y < 0) { started = false; continue; }
                                var sx = toSx(x), sy = toSy(y);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(plotR - 120, 10, 14, 3);
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('I' + String.fromCharCode(8320 + order) + '(x)', plotR - 102, 14);

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(plotR - 120, 28, 14, 3);
                            ctx.fillText('K' + String.fromCharCode(8320 + order) + '(x)', plotR - 102, 32);

                            viz.screenText('x', plotR + 5, plotB + 5, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(I_n(x) = i^{-n} J_n(ix)\\) by substituting \\(x \\to ix\\) into the series for \\(J_n\\).',
                    hint: 'Replace every \\(x\\) by \\(ix\\) in \\(J_n(x) = \\sum_m \\frac{(-1)^m}{m!(m+n)!}(x/2)^{2m+n}\\) and simplify \\(i^{2m+n}\\).',
                    solution: '\\(J_n(ix) = \\sum_m \\frac{(-1)^m}{m!(m+n)!}(ix/2)^{2m+n} = \\sum_m \\frac{(-1)^m i^{2m+n}}{m!(m+n)!}(x/2)^{2m+n}\\). Since \\(i^{2m} = (-1)^m\\), we get \\(J_n(ix) = i^n \\sum_m \\frac{1}{m!(m+n)!}(x/2)^{2m+n} = i^n I_n(x)\\). Thus \\(I_n(x) = i^{-n} J_n(ix)\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Show that the modified Bessel functions satisfy the recurrence \\(I_{\\nu-1}(x) - I_{\\nu+1}(x) = \\frac{2\\nu}{x} I_\\nu(x)\\) (note the sign difference from the \\(J_\\nu\\) recurrence).',
                    hint: 'Start from \\(J_{\\nu-1}(x) + J_{\\nu+1}(x) = \\frac{2\\nu}{x}J_\\nu(x)\\) and substitute \\(x \\to ix\\), using \\(I_\\nu(x) = i^{-\\nu}J_\\nu(ix)\\).',
                    solution: 'Replace \\(x\\) by \\(ix\\): \\(J_{\\nu-1}(ix) + J_{\\nu+1}(ix) = \\frac{2\\nu}{ix}J_\\nu(ix)\\). Using \\(J_\\nu(ix) = i^\\nu I_\\nu(x)\\): \\(i^{\\nu-1}I_{\\nu-1}(x) + i^{\\nu+1}I_{\\nu+1}(x) = \\frac{2\\nu}{ix} i^\\nu I_\\nu(x)\\). Dividing by \\(i^{\\nu-1}\\): \\(I_{\\nu-1}(x) + i^2 I_{\\nu+1}(x) = \\frac{2\\nu}{x} \\cdot \\frac{i^\\nu}{i^\\nu} I_\\nu(x)\\). Since \\(i^2 = -1\\): \\(I_{\\nu-1}(x) - I_{\\nu+1}(x) = \\frac{2\\nu}{x}I_\\nu(x)\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Physical Applications
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Physical Applications',
            content: `
<h2>Physical Applications of Bessel Functions</h2>

<h3>1. Vibrations of a Circular Drum</h3>

<p>The displacement of an ideal circular membrane of radius \\(a\\), clamped at its edge, satisfies the wave equation. The normal modes are</p>

\\[
u_{nm}(r, \\theta, t) = J_n\\!\\left(\\frac{\\alpha_{nm}}{a} r\\right) \\bigl[A \\cos(n\\theta) + B \\sin(n\\theta)\\bigr] \\cos(\\omega_{nm} t + \\phi),
\\]

<p>where \\(\\alpha_{nm}\\) is the \\(m\\)-th positive zero of \\(J_n\\), and the frequency is \\(\\omega_{nm} = c\\,\\alpha_{nm}/a\\). The boundary condition \\(u(a, \\theta, t) = 0\\) forces \\(J_n(\\alpha_{nm}) = 0\\), which quantizes the allowed frequencies.</p>

<div class="env-block remark">
    <div class="env-title">Why Drums Sound Different from Strings</div>
    <div class="env-body">
        <p>For a vibrating string, the overtones are integer multiples of the fundamental: \\(f_n = n f_1\\). For a circular drum, the frequencies are proportional to the zeros of \\(J_n\\), which are <strong>not</strong> integer multiples of each other. This inharmonicity is why drums produce a less definite pitch than strings.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-drum-modes"></div>

<h3>2. Electromagnetic Waveguides</h3>

<p>In a cylindrical waveguide of radius \\(a\\), the transverse electric (TE) and transverse magnetic (TM) modes are determined by Bessel functions. For TM modes, the longitudinal electric field satisfies</p>

\\[
E_z(r, \\theta) = E_0 \\, J_n\\!\\left(\\frac{\\alpha_{nm}}{a}r\\right) e^{in\\theta},
\\]

<p>where the boundary condition \\(E_z(a) = 0\\) again requires \\(J_n(\\alpha_{nm}) = 0\\). For TE modes, the condition \\(J_n'(\\beta_{nm}) = 0\\) at the wall determines the allowed modes, where \\(\\beta_{nm}\\) are zeros of \\(J_n'\\).</p>

<p>The <strong>cutoff frequency</strong> for each mode is</p>

\\[
f_{nm}^{\\text{cutoff}} = \\frac{c\\,\\alpha_{nm}}{2\\pi a} \\quad (\\text{TM}), \\qquad f_{nm}^{\\text{cutoff}} = \\frac{c\\,\\beta_{nm}}{2\\pi a} \\quad (\\text{TE}).
\\]

<div class="viz-placeholder" data-viz="viz-waveguide"></div>

<h3>3. Fraunhofer Diffraction Through a Circular Aperture</h3>

<p>The far-field diffraction pattern of a circular aperture of radius \\(a\\) is the <strong>Airy pattern</strong>:</p>

\\[
I(\\theta) = I_0 \\left[\\frac{2J_1(ka\\sin\\theta)}{ka\\sin\\theta}\\right]^2,
\\]

<p>where \\(k = 2\\pi/\\lambda\\). The first dark ring occurs where \\(J_1 = 0\\), at \\(ka\\sin\\theta = 3.8317\\ldots\\), giving the Rayleigh criterion for the angular resolution of telescopes and microscopes.</p>

<h3>4. Heat Conduction in a Cylinder</h3>

<p>The temperature in a long cylinder of radius \\(a\\), with initial temperature distribution \\(T_0(r)\\) and boundary \\(T(a,t) = 0\\), evolves as</p>

\\[
T(r,t) = \\sum_{m=1}^{\\infty} c_m \\, J_0\\!\\left(\\frac{\\alpha_{0m}}{a}r\\right) e^{-\\kappa (\\alpha_{0m}/a)^2 t},
\\]

<p>where the coefficients \\(c_m\\) are determined by the Fourier-Bessel expansion of \\(T_0(r)\\). Each mode decays exponentially with a rate proportional to \\(\\alpha_{0m}^2\\); higher modes decay faster, leaving the fundamental \\(J_0(\\alpha_{01} r/a)\\) as the long-time profile.</p>

<div class="viz-placeholder" data-viz="viz-hankel"></div>
`,
            visualizations: [
                {
                    id: 'viz-drum-modes',
                    title: 'Vibrating Circular Drum: Animated Modes',
                    description: 'Watch the circular membrane vibrate in its normal modes. The color indicates displacement (blue = up, red = down). Higher modes have more node lines and higher frequencies.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 400, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var modeN = 0, modeM = 1, speed = 1.0;
                        VizEngine.createSlider(controls, 'Angular n', 0, 4, 0, 1, function(v) { modeN = Math.round(v); });
                        VizEngine.createSlider(controls, 'Radial m', 1, 5, 1, 1, function(v) { modeM = Math.round(v); });
                        VizEngine.createSlider(controls, 'Speed', 0.1, 3, 1, 0.1, function(v) { speed = v; });

                        function besselJ(n, x) {
                            var sum = 0;
                            for (var k = 0; k <= 25; k++) {
                                var sign = (k % 2 === 0) ? 1 : -1;
                                var num = Math.pow(x / 2, 2 * k + n);
                                var denom = fact(k) * fact(k + n);
                                if (!isFinite(num) || denom === 0) break;
                                sum += sign * num / denom;
                            }
                            return sum;
                        }
                        function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        // Precompute zeros
                        function findZero(n, idx) {
                            var zeros = [];
                            var dx = 0.02;
                            var x = (n === 0) ? 0.5 : n * 0.5;
                            while (zeros.length < idx && x < 100) {
                                var f1 = besselJ(n, x);
                                var f2 = besselJ(n, x + dx);
                                if (f1 * f2 < 0) {
                                    var lo = x, hi = x + dx;
                                    for (var i = 0; i < 40; i++) {
                                        var mid = (lo + hi) / 2;
                                        if (besselJ(n, lo) * besselJ(n, mid) < 0) hi = mid;
                                        else lo = mid;
                                    }
                                    zeros.push((lo + hi) / 2);
                                }
                                x += dx;
                            }
                            return zeros[idx - 1] || 5;
                        }

                        var cx = 200, cy = 200, drumR = 170;

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.001 * speed;

                            var zeroVal = findZero(modeN, modeM);
                            var omega = zeroVal; // frequency proportional to zero

                            // Draw drum surface
                            var step = 3;
                            for (var py = -drumR; py <= drumR; py += step) {
                                for (var px = -drumR; px <= drumR; px += step) {
                                    var r = Math.sqrt(px * px + py * py);
                                    if (r > drumR) continue;
                                    var theta = Math.atan2(py, px);
                                    var rNorm = r / drumR;
                                    var spatial = besselJ(modeN, zeroVal * rNorm) * Math.cos(modeN * theta);
                                    var val = spatial * Math.cos(omega * time);

                                    var intensity = Math.min(Math.abs(val) * 2, 1);
                                    if (val > 0) {
                                        ctx.fillStyle = 'rgba(88,166,255,' + (0.15 + intensity * 0.7) + ')';
                                    } else {
                                        ctx.fillStyle = 'rgba(248,81,73,' + (0.15 + intensity * 0.7) + ')';
                                    }
                                    ctx.fillRect(cx + px, cy + py, step, step);
                                }
                            }

                            // Drum boundary
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, drumR, 0, Math.PI * 2); ctx.stroke();

                            // Labels
                            viz.screenText('Mode (' + modeN + ', ' + modeM + ')', cx, 15, viz.colors.white, 13);
                            viz.screenText('\u03B1 = ' + zeroVal.toFixed(4), cx, viz.height - 12, viz.colors.teal, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-waveguide',
                    title: 'Electromagnetic Modes in a Cylindrical Waveguide',
                    description: 'The transverse field pattern of TM modes in a circular waveguide. The field vanishes at the conducting wall. Select different mode numbers to see the pattern.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 400, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var modeN = 0, modeM = 1;
                        VizEngine.createSlider(controls, 'Angular n', 0, 3, 0, 1, function(v) { modeN = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Radial m', 1, 4, 1, 1, function(v) { modeM = Math.round(v); draw(); });

                        function besselJ(n, x) {
                            var sum = 0;
                            for (var k = 0; k <= 25; k++) {
                                var sign = (k % 2 === 0) ? 1 : -1;
                                var num = Math.pow(x / 2, 2 * k + n);
                                var denom = fact(k) * fact(k + n);
                                if (!isFinite(num) || denom === 0) break;
                                sum += sign * num / denom;
                            }
                            return sum;
                        }
                        function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        function findZero(n, idx) {
                            var zeros = [];
                            var dx = 0.02, x = (n === 0) ? 0.5 : n * 0.5;
                            while (zeros.length < idx && x < 80) {
                                if (besselJ(n, x) * besselJ(n, x + dx) < 0) {
                                    var lo = x, hi = x + dx;
                                    for (var i = 0; i < 40; i++) {
                                        var mid = (lo + hi) / 2;
                                        if (besselJ(n, lo) * besselJ(n, mid) < 0) hi = mid; else lo = mid;
                                    }
                                    zeros.push((lo + hi) / 2);
                                }
                                x += dx;
                            }
                            return zeros[idx - 1] || 5;
                        }

                        var cx = 200, cy = 200, wgR = 170;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var zeroVal = findZero(modeN, modeM);

                            // Draw field intensity
                            var step = 3;
                            for (var py = -wgR; py <= wgR; py += step) {
                                for (var px = -wgR; px <= wgR; px += step) {
                                    var r = Math.sqrt(px * px + py * py);
                                    if (r > wgR) continue;
                                    var theta = Math.atan2(py, px);
                                    var rNorm = r / wgR;
                                    var Ez = besselJ(modeN, zeroVal * rNorm) * Math.cos(modeN * theta);
                                    var absEz = Math.abs(Ez);
                                    var hue, sat, light;
                                    if (Ez >= 0) {
                                        ctx.fillStyle = 'rgba(63,185,160,' + Math.min(absEz * 1.5, 0.9) + ')';
                                    } else {
                                        ctx.fillStyle = 'rgba(188,140,255,' + Math.min(absEz * 1.5, 0.9) + ')';
                                    }
                                    ctx.fillRect(cx + px, cy + py, step, step);
                                }
                            }

                            // Waveguide wall
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.arc(cx, cy, wgR, 0, Math.PI * 2); ctx.stroke();

                            viz.screenText('TM' + modeN + modeM + ' mode', cx, 15, viz.colors.white, 13);
                            viz.screenText('E\u2096 field pattern', cx, 32, viz.colors.text, 10);
                            viz.screenText('Teal = +, Purple = \u2013', cx, viz.height - 12, viz.colors.text, 10);
                            viz.screenText('Cutoff \u221d \u03B1 = ' + zeroVal.toFixed(3), cx, viz.height - 28, viz.colors.yellow, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-hankel',
                    title: 'Hankel Functions: Outgoing and Incoming Cylindrical Waves',
                    description: 'The Hankel functions \\(H_n^{(1)} = J_n + iY_n\\) and \\(H_n^{(2)} = J_n - iY_n\\) represent outgoing and incoming cylindrical waves. This shows \\(\\operatorname{Re}[H_0^{(1)}(kr)]\\) as a wave propagating outward from the origin.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 400, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var kVal = 2.0;
                        VizEngine.createSlider(controls, 'Wavenumber k', 0.5, 5, 2, 0.1, function(v) { kVal = v; });

                        var cx = 200, cy = 200, maxR = 180;

                        function besselJ0(x) {
                            var sum = 0;
                            for (var m = 0; m <= 25; m++) {
                                var sign = (m % 2 === 0) ? 1 : -1;
                                var num = Math.pow(x / 2, 2 * m);
                                var denom = 1;
                                for (var i = 1; i <= m; i++) denom *= i * i;
                                if (!isFinite(num)) break;
                                sum += sign * num / denom;
                            }
                            return sum;
                        }

                        // Use asymptotic for Re[H_0^(1)] = J_0 for display, modulated with time
                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.003;

                            var step = 3;
                            for (var py = -maxR; py <= maxR; py += step) {
                                for (var px = -maxR; px <= maxR; px += step) {
                                    var r = Math.sqrt(px * px + py * py);
                                    if (r > maxR || r < 2) continue;
                                    var rPhys = r / maxR * 15;
                                    var kr = kVal * rPhys;
                                    // Re[H_0^(1)(kr) * e^{-iwt}] ~ sqrt(2/pi*kr) * cos(kr - pi/4 - wt)
                                    var amp = Math.sqrt(2 / (Math.PI * Math.max(kr, 0.1)));
                                    var val = amp * Math.cos(kr - Math.PI / 4 - kVal * time * 3);
                                    var intensity = Math.min(Math.abs(val) * 2, 1);
                                    if (val > 0) {
                                        ctx.fillStyle = 'rgba(88,166,255,' + (0.1 + intensity * 0.8) + ')';
                                    } else {
                                        ctx.fillStyle = 'rgba(248,81,73,' + (0.1 + intensity * 0.8) + ')';
                                    }
                                    ctx.fillRect(cx + px, cy + py, step, step);
                                }
                            }

                            // Source point
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('Re[H\u2080\u207d\u00b9\u207e(kr) e\u207b\u2071\u1d61\u1d57]', cx, 15, viz.colors.white, 12);
                            viz.screenText('Outgoing cylindrical wave', cx, 32, viz.colors.teal, 10);
                            viz.screenText('k = ' + kVal.toFixed(1), cx, viz.height - 12, viz.colors.yellow, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A circular drum of radius \\(a = 0.3\\) m is struck. The fundamental mode has \\(n = 0, m = 1\\). Given that \\(\\alpha_{01} \\approx 2.4048\\) and the wave speed is \\(c = 200\\) m/s, find the fundamental frequency.',
                    hint: 'The frequency is \\(f_{01} = c\\alpha_{01}/(2\\pi a)\\).',
                    solution: '\\(f_{01} = \\frac{c \\alpha_{01}}{2\\pi a} = \\frac{200 \\times 2.4048}{2\\pi \\times 0.3} = \\frac{480.96}{1.8850} \\approx 255.1\\) Hz.'
                },
                {
                    question: 'In Fraunhofer diffraction through a circular aperture, show that the angular radius of the first dark ring is approximately \\(\\theta_1 \\approx 1.22 \\lambda / (2a)\\).',
                    hint: 'The first dark ring occurs at \\(J_1(ka\\sin\\theta) = 0\\), i.e., \\(ka\\sin\\theta = \\alpha_{11} \\approx 3.8317\\). Use \\(k = 2\\pi/\\lambda\\) and the small-angle approximation.',
                    solution: 'From \\(ka\\sin\\theta_1 = 3.8317\\): \\(\\frac{2\\pi a}{\\lambda} \\sin\\theta_1 = 3.8317\\), so \\(\\sin\\theta_1 = \\frac{3.8317\\lambda}{2\\pi a} = \\frac{1.220\\lambda}{2a}\\). For small angles, \\(\\theta_1 \\approx 1.22\\lambda/(2a)\\), which is the Rayleigh criterion. \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: From Cylinders to Spheres</h2>

<div class="env-block intuition">
    <div class="env-title">The Pattern of Special Functions</div>
    <div class="env-body">
        <p>We have seen that Bessel functions are the natural eigenfunctions for problems with cylindrical symmetry, just as sines and cosines serve rectangular geometry. This pattern continues: <strong>spherical symmetry</strong> leads to an entirely different family of special functions.</p>
    </div>
</div>

<h3>Summary: What We Learned</h3>

<ol>
    <li><strong>Bessel's equation</strong> arises from separation of variables in cylindrical coordinates. Its regular singular point at the origin demands the Frobenius method.</li>
    <li><strong>\\(J_\\nu(x)\\)</strong> and <strong>\\(Y_\\nu(x)\\)</strong> are the two linearly independent solutions; \\(J_\\nu\\) is regular at the origin while \\(Y_\\nu\\) is singular.</li>
    <li>Bessel functions satisfy powerful <strong>recurrence relations</strong>, orthogonality with weight \\(r\\), a generating function, and integral representations.</li>
    <li>The <strong>modified Bessel functions</strong> \\(I_\\nu\\) and \\(K_\\nu\\) handle the exponentially growing/decaying case.</li>
    <li><strong>Physical applications</strong> span drum vibrations, waveguides, diffraction, heat conduction, and beyond.</li>
</ol>

<h3>Connection to Legendre Functions and Spherical Harmonics</h3>

<p>In the next chapter, we turn to <strong>Legendre polynomials</strong> and <strong>spherical harmonics</strong>, the eigenfunctions of the angular part of the Laplacian in spherical coordinates. Where Bessel functions solve</p>

\\[
x^2 y'' + xy' + (x^2 - \\nu^2)y = 0 \\quad \\text{(cylindrical radial equation)},
\\]

<p>Legendre's equation is</p>

\\[
(1 - x^2) y'' - 2xy' + \\ell(\\ell+1)y = 0 \\quad \\text{(spherical angular equation)}.
\\]

<p>Together, Bessel and Legendre functions form the backbone of solutions to Laplace's, Helmholtz's, and the wave equations in the most physically important coordinate systems.</p>

<table>
<thead><tr><th>Symmetry</th><th>Coordinate</th><th>Special Function</th><th>Equation</th></tr></thead>
<tbody>
<tr><td>Rectangular</td><td>Cartesian</td><td>\\(\\sin, \\cos, e^{ikx}\\)</td><td>\\(y'' + k^2 y = 0\\)</td></tr>
<tr><td>Cylindrical</td><td>Polar / Cylindrical</td><td>\\(J_\\nu, Y_\\nu\\) (Bessel)</td><td>\\(x^2y'' + xy' + (x^2 - \\nu^2)y = 0\\)</td></tr>
<tr><td>Spherical</td><td>Spherical</td><td>\\(P_\\ell, Y_\\ell^m\\) (Legendre)</td><td>\\((1-x^2)y'' - 2xy' + \\ell(\\ell+1)y = 0\\)</td></tr>
</tbody>
</table>

<div class="env-block remark">
    <div class="env-title">A Unifying Perspective</div>
    <div class="env-body">
        <p>All three families (trigonometric, Bessel, Legendre) are eigenfunctions of <strong>Sturm-Liouville operators</strong> on appropriate intervals with appropriate boundary conditions. The orthogonality, completeness, and expansion theorems we proved in Chapter 9 apply to all of them. The deeper unifying framework is the representation theory of symmetry groups: trigonometric functions are related to the translation group, Bessel functions to the Euclidean group \\(E(2)\\), and spherical harmonics to the rotation group \\(SO(3)\\).</p>
    </div>
</div>

<h3>Key Formulas Reference</h3>

<table>
<thead><tr><th>Formula</th><th>Expression</th></tr></thead>
<tbody>
<tr><td>Bessel's equation</td><td>\\(x^2 y'' + xy' + (x^2 - \\nu^2)y = 0\\)</td></tr>
<tr><td>\\(J_\\nu(x)\\)</td><td>\\(\\displaystyle\\sum_{m=0}^{\\infty} \\frac{(-1)^m}{m!\\Gamma(m+\\nu+1)}(x/2)^{2m+\\nu}\\)</td></tr>
<tr><td>Recurrence</td><td>\\(J_{\\nu-1} + J_{\\nu+1} = (2\\nu/x)J_\\nu\\)</td></tr>
<tr><td>Orthogonality</td><td>\\(\\int_0^a r\\,J_n(\\alpha_{nm}r/a)\\,J_n(\\alpha_{nk}r/a)\\,dr = 0\\;(m \\neq k)\\)</td></tr>
<tr><td>Generating function</td><td>\\(e^{(x/2)(t-1/t)} = \\sum_{n=-\\infty}^{\\infty} J_n(x)\\,t^n\\)</td></tr>
<tr><td>Large-\\(x\\) asymptotics</td><td>\\(J_\\nu \\sim \\sqrt{2/(\\pi x)}\\cos(x - \\nu\\pi/2 - \\pi/4)\\)</td></tr>
<tr><td>Modified Bessel</td><td>\\(I_\\nu(x) = i^{-\\nu}J_\\nu(ix)\\), \\(K_\\nu \\sim \\sqrt{\\pi/(2x)}\\,e^{-x}\\)</td></tr>
</tbody>
</table>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'The first five positive zeros of \\(J_0\\) are approximately 2.405, 5.520, 8.654, 11.792, 14.931. Verify that the spacing approaches \\(\\pi\\) for large zeros, consistent with the asymptotic form \\(J_0(x) \\sim \\sqrt{2/(\\pi x)}\\cos(x - \\pi/4)\\).',
                    hint: 'If \\(J_0(x) \\approx \\sqrt{2/(\\pi x)}\\cos(x - \\pi/4)\\), consecutive zeros are separated by \\(\\pi\\). Compute the differences of the given zeros.',
                    solution: 'Differences: \\(5.520 - 2.405 = 3.115\\), \\(8.654 - 5.520 = 3.134\\), \\(11.792 - 8.654 = 3.138\\), \\(14.931 - 11.792 = 3.139\\). These approach \\(\\pi \\approx 3.14159\\). The asymptotic zeros of \\(\\cos(x - \\pi/4)\\) are at \\(x - \\pi/4 = (2m+1)\\pi/2\\), spaced exactly \\(\\pi\\) apart. \\(\\checkmark\\)'
                },
                {
                    question: 'Show that the Wronskian of \\(J_\\nu\\) and \\(Y_\\nu\\) is \\(W[J_\\nu, Y_\\nu] = 2/(\\pi x)\\). Why does this guarantee they are linearly independent for all \\(x > 0\\)?',
                    hint: 'For a second-order ODE \\(y\'\' + p(x)y\' + q(x)y = 0\\), Abel\'s formula gives \\(W(x) = W(x_0)\\exp(-\\int_{x_0}^x p(s)ds)\\). Bessel\'s equation in standard form has \\(p(x) = 1/x\\).',
                    solution: 'Bessel\'s equation in standard form is \\(y\'\' + (1/x)y\' + (1 - \\nu^2/x^2)y = 0\\). Abel\'s formula: \\(W(x) = C \\exp(-\\int 1/x\\,dx) = C/x\\). The constant \\(C = 2/\\pi\\) is determined by comparing with the small-\\(x\\) behavior of \\(J_\\nu\\) and \\(Y_\\nu\\). Since \\(W = 2/(\\pi x) \\neq 0\\) for all \\(x > 0\\), the two functions are linearly independent on \\((0, \\infty)\\). \\(\\checkmark\\)'
                }
            ]
        }
    ]
});
