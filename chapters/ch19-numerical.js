// === Chapter 19: Numerical Methods ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Numerical Methods',
    subtitle: 'When analytic solutions don\'t exist',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Numerical Methods?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Numerical Methods?',
            content: `
<h2>Why Numerical Methods?</h2>

<div class="env-block intuition">
    <div class="env-title">The Physicist's Dilemma</div>
    <div class="env-body">
        <p>Throughout this course, we have developed a powerful analytical toolkit: eigenfunction expansions, Green's functions, integral transforms, variational principles. These methods are elegant and yield exact answers. But nature is not always so accommodating. Most differential equations arising in real physical problems have no closed-form solutions. The three-body problem in celestial mechanics, turbulent fluid flow, quantum systems with more than a few particles, nonlinear wave propagation: all require numerical methods.</p>
    </div>
</div>

<p>Numerical methods are not a concession to ignorance. They are a complementary set of tools that extend the reach of mathematical physics from the handful of exactly solvable models to the full complexity of the physical world. The key insight is that a computer can perform billions of arithmetic operations per second, so if we can reduce a continuous mathematical problem to a sequence of arithmetic steps, we can approximate the answer to any desired accuracy.</p>

<h3>The Core Strategy: Discretization</h3>

<p>Nearly every numerical method follows the same meta-strategy:</p>
<ol>
    <li><strong>Discretize</strong> the continuous problem (replace integrals by sums, derivatives by differences, continuous domains by grids).</li>
    <li><strong>Solve</strong> the resulting finite algebraic system.</li>
    <li><strong>Analyze</strong> convergence, stability, and error.</li>
</ol>

<p>The art lies in choosing discretizations that converge rapidly, remain stable, and respect the physics (conservation laws, symmetries, boundary conditions).</p>

<h3>Sources of Error</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Types of Numerical Error)</div>
    <div class="env-body">
        <p>Three distinct types of error arise in numerical computation:</p>
        <ul>
            <li><strong>Truncation error</strong>: from replacing an infinite or continuous process by a finite one (e.g., truncating a Taylor series).</li>
            <li><strong>Round-off error</strong>: from representing real numbers with finite precision (typically IEEE 754 double precision, \\(\\sim 16\\) significant digits).</li>
            <li><strong>Discretization error</strong>: from replacing a continuous domain by a grid of finitely many points.</li>
        </ul>
    </div>
</div>

<p>A central theme of this chapter is <strong>order of accuracy</strong>. If a method's error behaves as \\(\\mathcal{O}(h^p)\\) where \\(h\\) is the step size, we say the method is <em>\\(p\\)-th order</em>. Higher order means faster convergence as \\(h \\to 0\\), but often at the cost of greater complexity per step.</p>

<div class="env-block remark">
    <div class="env-title">What This Chapter Covers</div>
    <div class="env-body">
        <p>We survey the essential numerical methods a mathematical physicist needs: root finding (Newton's method), numerical integration (Gauss quadrature), ODE solvers (Runge-Kutta), PDE solvers (finite differences), and Monte Carlo methods. Each connects back to analytical concepts developed in earlier chapters.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Root Finding
        // ================================================================
        {
            id: 'sec-root',
            title: 'Root Finding',
            content: `
<h2>Root Finding</h2>

<p>Many problems in physics reduce to finding \\(x\\) such that \\(f(x) = 0\\). Transcendental equations like \\(x = \\tan x\\) (waveguide modes), \\(e^{-x} = x\\) (fixed points), or the secular equations of quantum mechanics have no closed-form solutions. We need systematic numerical algorithms.</p>

<h3>Bisection Method</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.1 (Bisection Convergence)</div>
    <div class="env-body">
        <p>If \\(f\\) is continuous on \\([a, b]\\) and \\(f(a)f(b) < 0\\), then \\(f\\) has at least one root in \\((a, b)\\). The bisection method, which repeatedly halves the interval containing the root, produces a sequence \\(\\{c_n\\}\\) satisfying</p>
        \\[|c_n - r| \\le \\frac{b - a}{2^{n+1}}\\]
        <p>where \\(r\\) is the root. The method is first-order: each step gains roughly one binary digit of accuracy.</p>
    </div>
</div>

<p>Bisection is robust (it always converges given a sign change) but slow. We can do much better.</p>

<h3>Newton-Raphson Method</h3>

<p>Newton's method uses the tangent line at the current guess to find the next approximation:</p>

\\[x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}.\\]

<p>Geometrically, we follow the tangent line from \\((x_n, f(x_n))\\) to where it crosses the \\(x\\)-axis.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.2 (Newton's Method: Quadratic Convergence)</div>
    <div class="env-body">
        <p>If \\(f \\in C^2\\) near a simple root \\(r\\) (where \\(f'(r) \\ne 0\\)), and the initial guess \\(x_0\\) is sufficiently close to \\(r\\), then Newton's method converges <strong>quadratically</strong>:</p>
        \\[|x_{n+1} - r| \\le C |x_n - r|^2, \\qquad C = \\frac{|f''(r)|}{2|f'(r)|}.\\]
        <p>The number of correct digits approximately doubles with each iteration.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Computing \\(\\sqrt{2}\\)</div>
    <div class="env-body">
        <p>To find \\(\\sqrt{2}\\), solve \\(f(x) = x^2 - 2 = 0\\). Newton's iteration is</p>
        \\[x_{n+1} = x_n - \\frac{x_n^2 - 2}{2x_n} = \\frac{1}{2}\\left(x_n + \\frac{2}{x_n}\\right).\\]
        <p>Starting from \\(x_0 = 1\\):</p>
        <ul>
            <li>\\(x_1 = 1.5\\)</li>
            <li>\\(x_2 = 1.41\\overline{6}\\)</li>
            <li>\\(x_3 = 1.41421568...\\)</li>
            <li>\\(x_4 = 1.41421356237...\\) (already 11 correct digits!)</li>
        </ul>
        <p>This is the ancient Babylonian method for square roots, now understood as a special case of Newton's method.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">When Newton's Method Fails</div>
    <div class="env-body">
        <p>Newton's method can fail when: (1) \\(f'(x_n) = 0\\) (division by zero); (2) the iterates cycle or diverge (poor initial guess); (3) the root is multiple (convergence degrades to linear). In practice, one often combines bisection (for safety) with Newton's method (for speed): use bisection to get close, then switch to Newton for rapid convergence.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-newton-raphson"></div>
`,
            visualizations: [
                {
                    id: 'viz-newton-raphson',
                    title: 'Newton-Raphson Root Finding',
                    description: 'Watch Newton\'s method converge to a root. The tangent line at each guess leads to the next approximation. Observe the quadratic convergence: errors shrink dramatically with each step. Use the slider to choose the starting point and see how the initial guess affects convergence.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 280, scale: 50
                        });

                        var x0 = 3.0;
                        var maxIter = 8;
                        var animStep = 0;
                        var animating = false;

                        // f(x) = x^3 - 2x - 5, root near 2.0946
                        function f(x) { return x * x * x - 2 * x - 5; }
                        function fp(x) { return 3 * x * x - 2; }

                        VizEngine.createSlider(controls, 'x\u2080', -2, 4, x0, 0.1, function(v) {
                            x0 = v; animStep = 0; draw();
                        });

                        var stepBtn = VizEngine.createButton(controls, 'Step', function() {
                            if (animStep < maxIter) { animStep++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            animStep = 0; draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            animStep = 0;
                            var timer = setInterval(function() {
                                animStep++;
                                draw();
                                if (animStep >= maxIter) clearInterval(timer);
                            }, 600);
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw function
                            viz.drawFunction(f, -3, 5, viz.colors.blue, 2.5);

                            // Newton iterations
                            var xn = x0;
                            var iterData = [];
                            for (var i = 0; i < Math.min(animStep, maxIter); i++) {
                                var fxn = f(xn);
                                var fpxn = fp(xn);
                                if (Math.abs(fpxn) < 1e-12) break;
                                var xnext = xn - fxn / fpxn;

                                iterData.push({ x: xn, fx: fxn, xnext: xnext });

                                // Draw tangent line segment
                                var tLeft = Math.min(xn, xnext) - 0.5;
                                var tRight = Math.max(xn, xnext) + 0.5;
                                ctx.strokeStyle = viz.colors.orange + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                var tlx = tLeft, tly = fxn + fpxn * (tLeft - xn);
                                var trx = tRight, tryr = fxn + fpxn * (tRight - xn);
                                var p1 = viz.toScreen(tlx, tly);
                                var p2 = viz.toScreen(trx, tryr);
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Vertical line from (xn, 0) to (xn, f(xn))
                                viz.drawSegment(xn, 0, xn, fxn, viz.colors.teal + '66', 1, true);

                                // Point on curve
                                viz.drawPoint(xn, fxn, viz.colors.orange, 'x\u2080+' + i, 4);
                                // Point on x-axis
                                viz.drawPoint(xn, 0, viz.colors.teal, null, 4);

                                xn = xnext;
                            }

                            // Current point
                            if (animStep > 0 && iterData.length > 0) {
                                viz.drawPoint(xn, 0, viz.colors.green, null, 6);
                                viz.drawPoint(xn, f(xn), viz.colors.green, null, 4);
                            } else {
                                viz.drawPoint(x0, 0, viz.colors.red, 'x\u2080', 6);
                            }

                            // Title and info
                            viz.screenText('f(x) = x\u00B3 - 2x - 5', viz.width / 2, 18, viz.colors.blue, 13);

                            // Convergence table
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,monospace';
                            ctx.textAlign = 'left';
                            var tableX = 10, tableY = 36;
                            ctx.fillText('Iter   x_n          |f(x_n)|', tableX, tableY);
                            var xIter = x0;
                            for (var j = 0; j <= Math.min(animStep, maxIter); j++) {
                                var fv = Math.abs(f(xIter));
                                var color = fv < 1e-10 ? viz.colors.green : viz.colors.text;
                                ctx.fillStyle = color;
                                ctx.fillText(
                                    '  ' + j + '    ' + xIter.toFixed(8) + '   ' + fv.toExponential(2),
                                    tableX, tableY + 14 * (j + 1)
                                );
                                if (j < animStep) {
                                    var d = fp(xIter);
                                    if (Math.abs(d) < 1e-12) break;
                                    xIter = xIter - f(xIter) / d;
                                }
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Apply Newton\'s method to \\(f(x) = e^{-x} - x\\) starting from \\(x_0 = 0\\). Compute \\(x_1, x_2, x_3\\) by hand and verify quadratic convergence by checking that \\(|x_{n+1} - r|/|x_n - r|^2\\) is approximately constant. (The root is \\(r \\approx 0.567143\\).)',
                    hint: 'Newton\'s iteration is \\(x_{n+1} = x_n - \\frac{e^{-x_n} - x_n}{-e^{-x_n} - 1}\\). Compute each step and then the convergence ratios.',
                    solution: '\\(f\'(x) = -e^{-x} - 1\\). From \\(x_0 = 0\\): \\(x_1 = 0 - \\frac{1 - 0}{-1 - 1} = 0.5\\). Then \\(x_2 = 0.5 - \\frac{e^{-0.5} - 0.5}{-e^{-0.5} - 1} \\approx 0.566311\\). Then \\(x_3 \\approx 0.567143\\). The ratios \\(|x_2 - r|/|x_1 - r|^2 \\approx 0.19\\) and \\(|x_3 - r|/|x_2 - r|^2 \\approx 0.18\\) are nearly constant, confirming quadratic convergence.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Numerical Integration
        // ================================================================
        {
            id: 'sec-integration',
            title: 'Numerical Integration',
            content: `
<h2>Numerical Integration</h2>

<p>Evaluating definite integrals is one of the most common tasks in physics. Partition functions, scattering cross-sections, moments of distributions, normalization constants: all require integrals that often have no closed form. Numerical quadrature provides the answer.</p>

<h3>The Trapezoidal Rule</h3>

<p>The simplest approach: approximate \\(f\\) by a piecewise linear function and integrate exactly. With \\(n\\) equal subintervals of width \\(h = (b-a)/n\\):</p>

\\[\\int_a^b f(x)\\,dx \\approx T_n = h\\left[\\frac{f(a)}{2} + f(a+h) + f(a+2h) + \\cdots + f(b-h) + \\frac{f(b)}{2}\\right].\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 19.3 (Trapezoidal Rule Error)</div>
    <div class="env-body">
        <p>If \\(f \\in C^2[a,b]\\), then</p>
        \\[\\left|\\int_a^b f(x)\\,dx - T_n\\right| \\le \\frac{(b-a)^3}{12n^2} \\max_{x \\in [a,b]} |f''(x)|.\\]
        <p>The trapezoidal rule is second-order: \\(\\mathcal{O}(h^2)\\).</p>
    </div>
</div>

<h3>Simpson's Rule</h3>

<p>By fitting parabolas (instead of lines) through consecutive triplets of points, we get a remarkable improvement:</p>

\\[\\int_a^b f(x)\\,dx \\approx S_n = \\frac{h}{3}\\left[f(a) + 4f(a+h) + 2f(a+2h) + 4f(a+3h) + \\cdots + 4f(b-h) + f(b)\\right]\\]

<p>where \\(n\\) must be even.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.4 (Simpson's Rule Error)</div>
    <div class="env-body">
        <p>If \\(f \\in C^4[a,b]\\), then</p>
        \\[\\left|\\int_a^b f(x)\\,dx - S_n\\right| \\le \\frac{(b-a)^5}{180n^4} \\max_{x \\in [a,b]} |f^{(4)}(x)|.\\]
        <p>Simpson's rule is fourth-order: \\(\\mathcal{O}(h^4)\\), two orders better than the trapezoidal rule despite using the same grid points!</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why the Extra Accuracy?</div>
    <div class="env-body">
        <p>Simpson's rule is exact for polynomials up to degree 3, even though it is based on quadratic interpolation. The extra order comes from a symmetry cancellation: the cubic error terms cancel in pairs over each subinterval. This is an instance of a general principle in numerical analysis: symmetric methods often gain a free order of accuracy.</p>
    </div>
</div>

<h3>Gauss Quadrature</h3>

<p>All the above methods use equally spaced points. Gauss's insight was to ask: <em>if we are free to choose both the points and the weights, what is the best we can do?</em></p>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.5 (Gauss Quadrature)</div>
    <div class="env-body">
        <p>There exist unique points \\(x_1, \\ldots, x_n \\in (-1, 1)\\) (the roots of the Legendre polynomial \\(P_n(x)\\)) and weights \\(w_1, \\ldots, w_n\\) such that</p>
        \\[\\int_{-1}^{1} f(x)\\,dx \\approx \\sum_{i=1}^{n} w_i f(x_i)\\]
        <p>is exact for all polynomials of degree \\(\\le 2n - 1\\). This is the maximum achievable accuracy with \\(n\\) function evaluations.</p>
    </div>
</div>

<p>Note the connection to Chapter 12: the Gauss quadrature nodes are the zeros of Legendre polynomials, and the weights come from the Christoffel-Darboux formula. Orthogonal polynomials (Chapter 9) underpin the most powerful numerical integration methods.</p>

<div class="env-block example">
    <div class="env-title">Example: 3-Point Gauss Quadrature</div>
    <div class="env-body">
        <p>With \\(n = 3\\) points, we get nodes \\(x = 0, \\pm\\sqrt{3/5}\\) and weights \\(w = 8/9, 5/9, 5/9\\). This 3-point rule integrates polynomials up to degree 5 exactly. Compare: 3-point Simpson's (also 3 points) is only exact up to degree 3.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-simpson"></div>
`,
            visualizations: [
                {
                    id: 'viz-simpson',
                    title: 'Numerical Integration: Trapezoidal vs Simpson',
                    description: 'Compare the trapezoidal rule and Simpson\'s rule on the same integral. Watch how rapidly the errors decrease as you increase the number of subintervals. Simpson\'s fourth-order convergence vastly outperforms the trapezoidal second-order convergence.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 80, originY: 300, scale: 60
                        });

                        var nPanels = 4;
                        // f(x) = sin(pi*x), integral from 0 to 1 = 2/pi
                        function f(x) { return Math.sin(Math.PI * x); }
                        var exact = 2 / Math.PI;
                        var a = 0, b = 1;

                        VizEngine.createSlider(controls, 'n (subintervals)', 2, 20, nPanels, 2, function(v) {
                            nPanels = Math.round(v / 2) * 2; // ensure even
                            if (nPanels < 2) nPanels = 2;
                            draw();
                        });

                        function trapezoid(n) {
                            var h = (b - a) / n;
                            var sum = 0.5 * (f(a) + f(b));
                            for (var i = 1; i < n; i++) sum += f(a + i * h);
                            return sum * h;
                        }

                        function simpson(n) {
                            if (n % 2 !== 0) n++;
                            var h = (b - a) / n;
                            var sum = f(a) + f(b);
                            for (var i = 1; i < n; i++) {
                                sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
                            }
                            return sum * h / 3;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var n = nPanels;
                            var h = (b - a) / n;

                            // Draw coordinate system area
                            // Function curve
                            viz.drawFunction(f, -0.1, 1.1, viz.colors.blue, 2.5);

                            // Trapezoidal rule visualization (shaded)
                            for (var i = 0; i < n; i++) {
                                var xl = a + i * h;
                                var xr = xl + h;
                                var fl = f(xl), fr = f(xr);
                                // Trapezoid shape
                                ctx.fillStyle = viz.colors.teal + '33';
                                ctx.beginPath();
                                var p1 = viz.toScreen(xl, 0);
                                var p2 = viz.toScreen(xl, fl);
                                var p3 = viz.toScreen(xr, fr);
                                var p4 = viz.toScreen(xr, 0);
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.lineTo(p3[0], p3[1]);
                                ctx.lineTo(p4[0], p4[1]);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }

                            // x-axis
                            viz.drawSegment(-0.2, 0, 1.3, 0, viz.colors.axis, 1);
                            // y-axis
                            viz.drawSegment(0, -0.1, 0, 1.3, viz.colors.axis, 1);

                            // Axis labels
                            viz.drawText('0', 0, -0.12, viz.colors.text, 11);
                            viz.drawText('1', 1, -0.12, viz.colors.text, 11);
                            viz.drawText('1', -0.12, 1, viz.colors.text, 11);

                            // Results
                            var tVal = trapezoid(n);
                            var sVal = simpson(n);
                            var tErr = Math.abs(tVal - exact);
                            var sErr = Math.abs(sVal - exact);

                            var infoX = viz.width - 10;
                            ctx.textAlign = 'right';
                            ctx.font = '12px -apple-system,sans-serif';

                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('f(x) = sin(\u03C0x),  \u222B from 0 to 1 = 2/\u03C0', infoX, 20);

                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Exact: ' + exact.toFixed(10), infoX, 42);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Trapezoidal: ' + tVal.toFixed(10) + '  (err: ' + tErr.toExponential(2) + ')', infoX, 62);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Simpson:     ' + sVal.toFixed(10) + '  (err: ' + sErr.toExponential(2) + ')', infoX, 82);

                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('n = ' + n + ' subintervals', infoX, 102);

                            // Convergence comparison (small plot at bottom right)
                            var plotX = 340, plotY = 310, plotW = 200, plotH = 70;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(plotX, plotY, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Error vs n (log-log)', plotX + plotW / 2, plotY - 4);

                            var testNs = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
                            var minLog = -12, maxLog = 0;
                            var minN = Math.log10(2), maxN = Math.log10(20);

                            for (var ti = 0; ti < testNs.length - 1; ti++) {
                                var nn1 = testNs[ti], nn2 = testNs[ti + 1];
                                var te1 = Math.abs(trapezoid(nn1) - exact);
                                var te2 = Math.abs(trapezoid(nn2) - exact);
                                var se1 = Math.abs(simpson(nn1) - exact);
                                var se2 = Math.abs(simpson(nn2) - exact);

                                // Trap line
                                if (te1 > 0 && te2 > 0) {
                                    var tx1 = plotX + (Math.log10(nn1) - minN) / (maxN - minN) * plotW;
                                    var ty1 = plotY + plotH - (Math.log10(te1) - minLog) / (maxLog - minLog) * plotH;
                                    var tx2 = plotX + (Math.log10(nn2) - minN) / (maxN - minN) * plotW;
                                    var ty2 = plotY + plotH - (Math.log10(te2) - minLog) / (maxLog - minLog) * plotH;
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(tx1, ty1); ctx.lineTo(tx2, ty2); ctx.stroke();
                                }
                                // Simpson line
                                if (se1 > 0 && se2 > 0) {
                                    var sx1 = plotX + (Math.log10(nn1) - minN) / (maxN - minN) * plotW;
                                    var sy1 = plotY + plotH - (Math.log10(se1) - minLog) / (maxLog - minLog) * plotH;
                                    var sx2 = plotX + (Math.log10(nn2) - minN) / (maxN - minN) * plotW;
                                    var sy2 = plotY + plotH - (Math.log10(se2) - minLog) / (maxLog - minLog) * plotH;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                                }
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\int_0^1 e^{-x^2}\\,dx\\) using the trapezoidal rule with \\(n = 4\\) subintervals. Then compute it with Simpson\'s rule (same \\(n\\)). The exact value is \\(\\approx 0.746824\\). Which is more accurate, and by how much?',
                    hint: 'For the trapezoidal rule with \\(n=4\\), evaluate \\(f\\) at \\(x = 0, 0.25, 0.5, 0.75, 1\\). For Simpson\'s rule, use the same points with weights \\(1, 4, 2, 4, 1\\) times \\(h/3\\).',
                    solution: 'With \\(h = 0.25\\): \\(T_4 = 0.25[0.5 \\cdot 1 + e^{-0.0625} + e^{-0.25} + e^{-0.5625} + 0.5 \\cdot e^{-1}] \\approx 0.74298\\). \\(S_4 = \\frac{0.25}{3}[1 + 4e^{-0.0625} + 2e^{-0.25} + 4e^{-0.5625} + e^{-1}] \\approx 0.74682\\). Errors: trapezoidal \\(\\approx 3.8 \\times 10^{-3}\\), Simpson \\(\\approx 4 \\times 10^{-6}\\). Simpson is about 1000 times more accurate.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: ODE Solvers
        // ================================================================
        {
            id: 'sec-ode',
            title: 'ODE Solvers',
            content: `
<h2>ODE Solvers</h2>

<p>Consider the initial value problem</p>
\\[\\frac{dy}{dt} = f(t, y), \\qquad y(t_0) = y_0.\\]

<p>The Picard-Lindel&ouml;f theorem (Chapter 8) guarantees existence and uniqueness under mild conditions, but provides no practical way to compute the solution. Numerical ODE solvers do.</p>

<h3>Euler's Method</h3>

<p>The simplest approach: step forward along the tangent line.</p>

\\[y_{n+1} = y_n + h\\,f(t_n, y_n)\\]

<p>This is a first-order method: the local truncation error per step is \\(\\mathcal{O}(h^2)\\), and the global error after \\(N = (T - t_0)/h\\) steps is \\(\\mathcal{O}(h)\\).</p>

<div class="env-block remark">
    <div class="env-title">Why Euler Is Not Enough</div>
    <div class="env-body">
        <p>Euler's method is instructive but rarely used in practice. Its first-order convergence means that halving the step size only halves the error. For 6-digit accuracy you need millions of tiny steps, which is both slow and accumulates round-off error. We need higher-order methods.</p>
    </div>
</div>

<h3>The Runge-Kutta Family</h3>

<p>The idea: evaluate \\(f\\) at several cleverly chosen intermediate points within each step, then take a weighted average. The classic <strong>fourth-order Runge-Kutta (RK4)</strong> method is:</p>

\\[\\begin{aligned}
k_1 &= f(t_n,\\, y_n) \\\\
k_2 &= f\\!\\left(t_n + \\frac{h}{2},\\, y_n + \\frac{h}{2}k_1\\right) \\\\
k_3 &= f\\!\\left(t_n + \\frac{h}{2},\\, y_n + \\frac{h}{2}k_2\\right) \\\\
k_4 &= f(t_n + h,\\, y_n + h\\,k_3) \\\\[4pt]
y_{n+1} &= y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4).
\\end{aligned}\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 19.6 (RK4 Accuracy)</div>
    <div class="env-body">
        <p>The RK4 method has local truncation error \\(\\mathcal{O}(h^5)\\) and global error \\(\\mathcal{O}(h^4)\\). It requires 4 function evaluations per step. Halving \\(h\\) reduces the error by a factor of 16.</p>
    </div>
</div>

<p>The RK4 weights \\(1/6, 2/6, 2/6, 1/6\\) are exactly the Simpson's rule weights applied to the slope estimates. This is not a coincidence: Runge-Kutta methods are intimately connected to quadrature rules.</p>

<h3>Adaptive Step Size</h3>

<p>In practice, the solution may vary rapidly in some regions and slowly in others. <strong>Adaptive methods</strong> estimate the local error and adjust \\(h\\) accordingly:</p>

<ul>
    <li>Compute the step with step size \\(h\\) and also with two half-steps of size \\(h/2\\).</li>
    <li>The difference estimates the local error.</li>
    <li>If the error is too large, reject the step and try a smaller \\(h\\).</li>
    <li>If the error is very small, increase \\(h\\) to save work.</li>
</ul>

<p>The Runge-Kutta-Fehlberg (RKF45) method achieves this with embedded formulas that share function evaluations, making error estimation nearly free.</p>

<div class="env-block example">
    <div class="env-title">Example: Planetary Orbits</div>
    <div class="env-body">
        <p>The equations of motion for a planet in a gravitational field are \\(\\ddot{\\mathbf{r}} = -GM\\hat{r}/r^2\\). Converting to a first-order system and applying RK4 produces orbits that conserve energy to high accuracy. But near perihelion (closest approach), where the planet moves fastest, adaptive step control concentrates computational effort where it is needed most.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rk4"></div>
`,
            visualizations: [
                {
                    id: 'viz-rk4',
                    title: 'Euler vs RK4: Accuracy Comparison',
                    description: 'Solve the same ODE with Euler\'s method and RK4 using the same step size. The exact solution is shown for comparison. Observe how Euler drifts while RK4 stays on track, even with large steps.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 60, originY: 260, scale: 40
                        });

                        var hStep = 0.5;
                        // ODE: dy/dt = -y + sin(t), y(0) = 1
                        // Exact: y(t) = (3e^{-t} + sin(t) - cos(t))/2
                        function fODE(t, y) { return -y + Math.sin(t); }
                        function exact(t) { return (3 * Math.exp(-t) + Math.sin(t) - Math.cos(t)) / 2; }

                        VizEngine.createSlider(controls, 'Step size h', 0.1, 1.5, hStep, 0.1, function(v) {
                            hStep = v;
                            draw();
                        });

                        function eulerSolve(h, tMax) {
                            var pts = [{ t: 0, y: 1 }];
                            var t = 0, y = 1;
                            while (t < tMax - 1e-10) {
                                y = y + h * fODE(t, y);
                                t += h;
                                pts.push({ t: t, y: y });
                            }
                            return pts;
                        }

                        function rk4Solve(h, tMax) {
                            var pts = [{ t: 0, y: 1 }];
                            var t = 0, y = 1;
                            while (t < tMax - 1e-10) {
                                var k1 = fODE(t, y);
                                var k2 = fODE(t + h / 2, y + h / 2 * k1);
                                var k3 = fODE(t + h / 2, y + h / 2 * k2);
                                var k4 = fODE(t + h, y + h * k3);
                                y = y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
                                t += h;
                                pts.push({ t: t, y: y });
                            }
                            return pts;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var tMax = 10;

                            // Draw axes
                            viz.drawSegment(-0.3, 0, tMax + 0.5, 0, viz.colors.axis, 1);
                            viz.drawSegment(0, -1.5, 0, 2.5, viz.colors.axis, 1);

                            // Axis labels
                            for (var tt = 0; tt <= tMax; tt += 2) {
                                viz.drawText(tt.toString(), tt, -0.2, viz.colors.text, 10);
                            }
                            viz.drawText('t', tMax + 0.3, -0.2, viz.colors.text, 12);
                            viz.drawText('y', 0.3, 2.3, viz.colors.text, 12);

                            // Exact solution
                            viz.drawFunction(exact, 0, tMax, viz.colors.white, 2, 500);

                            // Euler
                            var ePts = eulerSolve(hStep, tMax);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < ePts.length; i++) {
                                var p = viz.toScreen(ePts[i].t, ePts[i].y);
                                if (i === 0) ctx.moveTo(p[0], p[1]);
                                else ctx.lineTo(p[0], p[1]);
                            }
                            ctx.stroke();
                            // Mark Euler points
                            for (var j = 0; j < ePts.length; j++) {
                                viz.drawPoint(ePts[j].t, ePts[j].y, viz.colors.red, null, 3);
                            }

                            // RK4
                            var rPts = rk4Solve(hStep, tMax);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var k = 0; k < rPts.length; k++) {
                                var pr = viz.toScreen(rPts[k].t, rPts[k].y);
                                if (k === 0) ctx.moveTo(pr[0], pr[1]);
                                else ctx.lineTo(pr[0], pr[1]);
                            }
                            ctx.stroke();
                            for (var m = 0; m < rPts.length; m++) {
                                viz.drawPoint(rPts[m].t, rPts[m].y, viz.colors.green, null, 3);
                            }

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var legX = 320, legY = 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillRect(legX - 14, legY - 3, 8, 8);
                            ctx.fillText('Exact', legX, legY + 4);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(legX - 14, legY + 15, 8, 8);
                            ctx.fillText('Euler', legX, legY + 22);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(legX - 14, legY + 33, 8, 8);
                            ctx.fillText('RK4', legX, legY + 40);

                            // Error at t=10
                            var eulerEnd = ePts[ePts.length - 1].y;
                            var rk4End = rPts[rPts.length - 1].y;
                            var exactEnd = exact(tMax);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,monospace';
                            ctx.textAlign = 'left';
                            ctx.fillText('h = ' + hStep.toFixed(1) + ',  Steps: ' + (ePts.length - 1), 10, viz.height - 60);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Euler error at t=10: ' + Math.abs(eulerEnd - exactEnd).toExponential(3), 10, viz.height - 44);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('RK4   error at t=10: ' + Math.abs(rk4End - exactEnd).toExponential(3), 10, viz.height - 28);

                            // Title
                            viz.screenText("y' = -y + sin(t),  y(0) = 1", viz.width / 2, 14, viz.colors.blue, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider \\(dy/dt = -2ty\\), \\(y(0) = 1\\), whose exact solution is \\(y(t) = e^{-t^2}\\). Perform one step of Euler\'s method and one step of RK4 with \\(h = 0.5\\). Compare both to the exact value \\(y(0.5) = e^{-0.25} \\approx 0.7788\\).',
                    hint: 'For Euler: \\(y_1 = y_0 + hf(0, 1) = 1 + 0.5 \\cdot 0 = 1\\). For RK4: compute \\(k_1 = f(0, 1) = 0\\), then \\(k_2 = f(0.25, 1) = -0.5\\), etc.',
                    solution: 'Euler: \\(y_1 = 1 + 0.5 \\cdot 0 = 1.000\\). Error: \\(0.221\\). RK4: \\(k_1 = 0\\), \\(k_2 = f(0.25, 1) = -0.5\\), \\(k_3 = f(0.25, 1 + 0.25(-0.5)) = f(0.25, 0.875) = -0.4375\\), \\(k_4 = f(0.5, 1 + 0.5(-0.4375)) = f(0.5, 0.78125) = -0.78125\\). \\(y_1 = 1 + \\frac{0.5}{6}(0 - 1 - 0.875 - 0.78125) = 1 - 0.2214 = 0.7786\\). Error: \\(0.0002\\). RK4 is about 1000 times more accurate.'
                },
                {
                    question: 'The simple pendulum satisfies \\(\\ddot{\\theta} + \\sin\\theta = 0\\). Convert this to a system of two first-order ODEs suitable for RK4, and write out the RK4 formulas for this system.',
                    hint: 'Let \\(y_1 = \\theta\\) and \\(y_2 = \\dot{\\theta}\\). Then \\(\\dot{y}_1 = y_2\\) and \\(\\dot{y}_2 = -\\sin(y_1)\\). RK4 extends to systems by computing \\(k\\)-vectors.',
                    solution: 'System: \\(\\dot{y}_1 = y_2\\), \\(\\dot{y}_2 = -\\sin(y_1)\\). RK4 computes 4 slope vectors: \\(\\mathbf{k}_1 = \\mathbf{f}(t_n, \\mathbf{y}_n)\\), \\(\\mathbf{k}_2 = \\mathbf{f}(t_n + h/2, \\mathbf{y}_n + (h/2)\\mathbf{k}_1)\\), etc., where \\(\\mathbf{f}(t, [y_1, y_2]) = [y_2, -\\sin(y_1)]\\). The update is \\(\\mathbf{y}_{n+1} = \\mathbf{y}_n + (h/6)(\\mathbf{k}_1 + 2\\mathbf{k}_2 + 2\\mathbf{k}_3 + \\mathbf{k}_4)\\). This preserves the fourth-order accuracy for each component.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: PDE Solvers
        // ================================================================
        {
            id: 'sec-pde',
            title: 'PDE Solvers',
            content: `
<h2>PDE Solvers</h2>

<p>The partial differential equations of mathematical physics (Chapter 17), such as the heat equation, wave equation, and Laplace's equation, are solved analytically only for simple geometries and boundary conditions. For realistic problems, we discretize both space and time.</p>

<h3>Finite Differences for PDEs</h3>

<p>Consider the 1D heat equation:</p>
\\[\\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}.\\]

<p>Discretize: let \\(u_j^n = u(j\\Delta x, n\\Delta t)\\). Replace derivatives by finite differences:</p>

\\[\\frac{u_j^{n+1} - u_j^n}{\\Delta t} = \\alpha\\,\\frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{(\\Delta x)^2}.\\]

<p>This gives the <strong>explicit forward-time central-space (FTCS)</strong> scheme:</p>

\\[u_j^{n+1} = u_j^n + r\\,(u_{j+1}^n - 2u_j^n + u_{j-1}^n), \\qquad r = \\frac{\\alpha\\,\\Delta t}{(\\Delta x)^2}.\\]

<h3>Stability and the CFL Condition</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.7 (von Neumann Stability for the Heat Equation)</div>
    <div class="env-body">
        <p>The FTCS scheme for the heat equation is stable if and only if</p>
        \\[r = \\frac{\\alpha\\,\\Delta t}{(\\Delta x)^2} \\le \\frac{1}{2}.\\]
        <p>If \\(r > 1/2\\), small perturbations grow exponentially and the numerical solution becomes wildly oscillatory and meaningless.</p>
    </div>
</div>

<p>This is a special case of the <strong>Courant-Friedrichs-Lewy (CFL) condition</strong>: the numerical domain of dependence must contain the physical domain of dependence. In physical terms, information cannot travel faster on the grid than it does in the PDE.</p>

<div class="env-block remark">
    <div class="env-title">Implicit Methods</div>
    <div class="env-body">
        <p>The stability restriction \\(r \\le 1/2\\) forces very small time steps for fine spatial grids. <strong>Implicit methods</strong> (such as the Crank-Nicolson scheme) avoid this restriction by evaluating the spatial derivative at time \\(n+1\\) as well as \\(n\\). The price: instead of an explicit update formula, you must solve a tridiagonal linear system at each time step. But since tridiagonal systems are solved in \\(\\mathcal{O}(N)\\) operations, this is efficient.</p>
    </div>
</div>

<h3>The Crank-Nicolson Scheme</h3>

<p>Average the explicit and implicit discretizations:</p>
\\[\\frac{u_j^{n+1} - u_j^n}{\\Delta t} = \\frac{\\alpha}{2}\\left[\\frac{u_{j+1}^{n+1} - 2u_j^{n+1} + u_{j-1}^{n+1}}{(\\Delta x)^2} + \\frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{(\\Delta x)^2}\\right].\\]

<p>This is second-order in both time and space, and is <strong>unconditionally stable</strong> for the heat equation. It is the standard method in practice.</p>

<div class="env-block example">
    <div class="env-title">Example: Cooling Rod</div>
    <div class="env-body">
        <p>A metal rod of length \\(L\\) has initial temperature profile \\(u(x, 0) = \\sin(\\pi x/L)\\) with both ends held at \\(u = 0\\). The exact solution (Chapter 17) is \\(u(x,t) = e^{-\\alpha\\pi^2 t/L^2}\\sin(\\pi x/L)\\). The FTCS scheme reproduces this exponential decay accurately when \\(r \\le 1/2\\), but produces garbage when \\(r > 1/2\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-finite-difference"></div>
`,
            visualizations: [
                {
                    id: 'viz-finite-difference',
                    title: 'Heat Equation: Stability Demo',
                    description: 'Solve the heat equation numerically with the FTCS scheme. When r <= 1/2, the solution smoothly diffuses. When r > 1/2, the instability is dramatic: wild oscillations destroy the solution within a few time steps. Drag the r slider past 0.5 to see the instability.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 60, originY: 340, scale: 1
                        });

                        var rParam = 0.4;
                        var timeStep = 0;
                        var maxTimeSteps = 200;
                        var Nx = 40;
                        var L = 1.0;
                        var dx = L / Nx;
                        var u = [];
                        var animId = null;

                        function initU() {
                            u = new Array(Nx + 1);
                            for (var i = 0; i <= Nx; i++) {
                                u[i] = Math.sin(Math.PI * i * dx / L);
                            }
                            timeStep = 0;
                        }

                        function stepFTCS() {
                            var uNew = new Array(Nx + 1);
                            uNew[0] = 0;
                            uNew[Nx] = 0;
                            for (var i = 1; i < Nx; i++) {
                                uNew[i] = u[i] + rParam * (u[i + 1] - 2 * u[i] + u[i - 1]);
                            }
                            u = uNew;
                            timeStep++;
                        }

                        VizEngine.createSlider(controls, 'r = \u03B1\u0394t/\u0394x\u00B2', 0.1, 0.8, rParam, 0.05, function(v) {
                            rParam = v;
                            initU();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Step \u00D710', function() {
                            for (var s = 0; s < 10; s++) stepFTCS();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animId) { clearInterval(animId); animId = null; return; }
                            animId = setInterval(function() {
                                stepFTCS();
                                draw();
                                if (timeStep >= maxTimeSteps) { clearInterval(animId); animId = null; }
                            }, 50);
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            if (animId) { clearInterval(animId); animId = null; }
                            initU();
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var plotX = 60, plotY = 40;
                            var plotW = viz.width - 100, plotH = 260;

                            // Background
                            ctx.fillStyle = '#111133';
                            ctx.fillRect(plotX, plotY, plotW, plotH);

                            // Stable/unstable indicator
                            var stable = rParam <= 0.5;
                            ctx.fillStyle = stable ? viz.colors.green + '44' : viz.colors.red + '44';
                            ctx.fillRect(plotX, plotY, plotW, 20);
                            ctx.fillStyle = stable ? viz.colors.green : viz.colors.red;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(stable ? 'STABLE (r \u2264 0.5)' : 'UNSTABLE (r > 0.5)', plotX + plotW / 2, plotY + 14);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY + plotH);
                            ctx.stroke();

                            // x labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('0', plotX, plotY + plotH + 14);
                            ctx.fillText('L', plotX + plotW, plotY + plotH + 14);

                            // Initial condition (faded)
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            for (var ii = 0; ii <= Nx; ii++) {
                                var xp = plotX + (ii / Nx) * plotW;
                                var yInit = Math.sin(Math.PI * ii / Nx);
                                var yp = plotY + plotH - yInit * plotH * 0.45 - plotH * 0.05;
                                if (ii === 0) ctx.moveTo(xp, yp);
                                else ctx.lineTo(xp, yp);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Current solution
                            var maxU = 0;
                            for (var mi = 0; mi <= Nx; mi++) maxU = Math.max(maxU, Math.abs(u[mi]));
                            var scaleU = maxU > 1e-10 ? Math.min(1, 1 / maxU) : 1;
                            if (maxU > 2) scaleU = 1 / maxU; // Auto-scale for unstable

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= Nx; i++) {
                                var px = plotX + (i / Nx) * plotW;
                                var py = plotY + plotH - u[i] * scaleU * plotH * 0.45 - plotH * 0.05;
                                py = Math.max(plotY, Math.min(plotY + plotH, py));
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Time step: ' + timeStep + '  |  r = ' + rParam.toFixed(2) + '  |  max|u| = ' + maxU.toExponential(2), plotX, plotY + plotH + 35);

                            // Exact solution (for comparison when stable)
                            if (stable && timeStep > 0) {
                                var alpha = 1; // normalized
                                var tPhys = rParam * dx * dx * timeStep / alpha;
                                ctx.strokeStyle = viz.colors.yellow + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                for (var ei = 0; ei <= Nx; ei++) {
                                    var ex = plotX + (ei / Nx) * plotW;
                                    var exactU = Math.exp(-Math.PI * Math.PI * tPhys) * Math.sin(Math.PI * ei / Nx);
                                    var ey = plotY + plotH - exactU * scaleU * plotH * 0.45 - plotH * 0.05;
                                    if (ei === 0) ctx.moveTo(ex, ey);
                                    else ctx.lineTo(ex, ey);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('(dashed: exact)', plotX + plotW - 90, plotY + plotH + 35);
                            }
                        }
                        initU();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the CFL stability condition \\(r \\le 1/2\\) for the FTCS heat equation scheme using von Neumann stability analysis. That is, substitute \\(u_j^n = G^n e^{ikj\\Delta x}\\) and show that \\(|G| \\le 1\\) requires \\(r \\le 1/2\\).',
                    hint: 'The amplification factor is \\(G = 1 - 4r\\sin^2(k\\Delta x/2)\\). For stability we need \\(|G| \\le 1\\).',
                    solution: 'Substituting \\(u_j^n = G^n e^{ikj\\Delta x}\\) into the FTCS scheme gives \\(G = 1 + r(e^{ik\\Delta x} - 2 + e^{-ik\\Delta x}) = 1 - 4r\\sin^2(k\\Delta x/2)\\). For \\(|G| \\le 1\\): we need \\(-1 \\le 1 - 4r\\sin^2(\\cdot) \\le 1\\). The upper bound is automatic. The lower bound requires \\(4r\\sin^2(\\cdot) \\le 2\\). Since \\(\\sin^2\\) can be 1, we need \\(4r \\le 2\\), i.e., \\(r \\le 1/2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Monte Carlo Methods
        // ================================================================
        {
            id: 'sec-monte-carlo',
            title: 'Monte Carlo Methods',
            content: `
<h2>Monte Carlo Methods</h2>

<p>Monte Carlo methods use random sampling to compute quantities that would be intractable by deterministic means. Named after the casino in Monaco (by Ulam and von Neumann during the Manhattan Project), they are indispensable in statistical mechanics, quantum field theory, financial physics, and high-dimensional integration.</p>

<h3>Basic Monte Carlo Integration</h3>

<p>To estimate \\(I = \\int_a^b f(x)\\,dx\\), draw \\(N\\) random points \\(x_1, \\ldots, x_N\\) uniformly from \\([a, b]\\):</p>

\\[I \\approx \\frac{b-a}{N}\\sum_{i=1}^{N} f(x_i).\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 19.8 (Monte Carlo Error)</div>
    <div class="env-body">
        <p>The Monte Carlo estimate converges as \\(\\mathcal{O}(1/\\sqrt{N})\\), regardless of the dimension of the integral. The error is</p>
        \\[\\sigma_I = \\frac{(b-a)\\,\\sigma_f}{\\sqrt{N}},\\]
        <p>where \\(\\sigma_f\\) is the standard deviation of \\(f\\) over \\([a, b]\\).</p>
    </div>
</div>

<p>The key insight: the convergence rate \\(\\mathcal{O}(N^{-1/2})\\) is independent of dimension. For a \\(d\\)-dimensional integral, deterministic methods like Simpson's rule converge as \\(\\mathcal{O}(N^{-4/d})\\), which is disastrous for \\(d > 8\\). Monte Carlo wins in high dimensions.</p>

<h3>Importance Sampling</h3>

<p>We can reduce \\(\\sigma_f\\) (and thus the error) by sampling from a distribution \\(p(x)\\) that concentrates points where \\(f\\) is large:</p>

\\[I = \\int \\frac{f(x)}{p(x)}\\,p(x)\\,dx \\approx \\frac{1}{N}\\sum_{i=1}^{N} \\frac{f(x_i)}{p(x_i)}, \\qquad x_i \\sim p(x).\\]

<p>The optimal choice \\(p(x) \\propto |f(x)|\\) reduces the variance to zero (but requires knowing the integral, a circular problem). In practice, choosing \\(p\\) to roughly match the shape of \\(f\\) can reduce variance by orders of magnitude.</p>

<h3>The Metropolis Algorithm and the Ising Model</h3>

<p>In statistical mechanics, we need to sample from the Boltzmann distribution \\(P(\\text{state}) \\propto e^{-E/k_BT}\\), where the number of states is astronomically large (e.g., \\(2^N\\) for \\(N\\) spins). The <strong>Metropolis algorithm</strong> generates a Markov chain that samples this distribution:</p>

<ol>
    <li>Start from any configuration.</li>
    <li>Propose a random change (e.g., flip one spin).</li>
    <li>If \\(\\Delta E \\le 0\\), accept the change.</li>
    <li>If \\(\\Delta E > 0\\), accept with probability \\(e^{-\\Delta E / k_BT}\\).</li>
</ol>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.9 (Detailed Balance)</div>
    <div class="env-body">
        <p>The Metropolis acceptance rule satisfies detailed balance: \\(P(s)\\,T(s \\to s') = P(s')\\,T(s' \\to s)\\), where \\(T\\) is the transition probability. This ensures the Markov chain converges to the Boltzmann distribution regardless of the initial configuration.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The 2D Ising Model</div>
    <div class="env-body">
        <p>On a square lattice, each site has spin \\(s_i = \\pm 1\\). The energy is \\(E = -J\\sum_{\\langle ij \\rangle} s_i s_j\\). At low temperature, neighboring spins align (ferromagnetic order). At high temperature, thermal fluctuations randomize the spins. Onsager showed that in 2D, a phase transition occurs at \\(T_c = 2J / \\ln(1 + \\sqrt{2}) \\approx 2.269\\,J/k_B\\). The Metropolis algorithm lets us simulate this transition directly.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-monte-carlo-pi"></div>

<div class="viz-placeholder" data-viz="viz-ising-model"></div>
`,
            visualizations: [
                {
                    id: 'viz-monte-carlo-pi',
                    title: 'Monte Carlo Estimation of \u03C0',
                    description: 'Throw random darts at a unit square containing a quarter-circle. The fraction landing inside the circle estimates \u03C0/4. Watch the estimate converge as more points are added, and observe the slow 1/\u221AN convergence rate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 40, originY: 360, scale: 300
                        });

                        var points = [];
                        var inside = 0;
                        var total = 0;
                        var animId = null;
                        var batchSize = 50;

                        VizEngine.createButton(controls, 'Add 100', function() {
                            addPoints(100);
                            draw();
                        });
                        VizEngine.createButton(controls, 'Add 1000', function() {
                            addPoints(1000);
                            draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animId) { clearInterval(animId); animId = null; return; }
                            animId = setInterval(function() {
                                addPoints(batchSize);
                                draw();
                                if (total > 20000) { clearInterval(animId); animId = null; }
                            }, 50);
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            if (animId) { clearInterval(animId); animId = null; }
                            points = []; inside = 0; total = 0;
                            draw();
                        });

                        function addPoints(n) {
                            for (var i = 0; i < n; i++) {
                                var x = Math.random();
                                var y = Math.random();
                                var inCircle = (x * x + y * y) <= 1;
                                if (inCircle) inside++;
                                total++;
                                if (points.length < 5000) {
                                    points.push({ x: x, y: y, inside: inCircle });
                                }
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw square
                            var sq = viz.toScreen(0, 0);
                            var sqEnd = viz.toScreen(1, 1);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(sq[0], sqEnd[1], sqEnd[0] - sq[0], sq[1] - sqEnd[1]);

                            // Draw quarter circle
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var a = 0; a <= Math.PI / 2; a += 0.01) {
                                var cx = Math.cos(a), cy = Math.sin(a);
                                var p = viz.toScreen(cx, cy);
                                if (a === 0) ctx.moveTo(p[0], p[1]);
                                else ctx.lineTo(p[0], p[1]);
                            }
                            ctx.stroke();

                            // Draw points
                            for (var i = 0; i < points.length; i++) {
                                var pt = points[i];
                                var pp = viz.toScreen(pt.x, pt.y);
                                ctx.fillStyle = pt.inside ? viz.colors.teal + 'aa' : viz.colors.red + '88';
                                ctx.fillRect(pp[0] - 1, pp[1] - 1, 2, 2);
                            }

                            // Estimate
                            var piEst = total > 0 ? 4 * inside / total : 0;
                            var err = Math.abs(piEst - Math.PI);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var infoX = 350, infoY = 30;
                            ctx.fillText('N = ' + total, infoX, infoY);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Inside: ' + inside, infoX, infoY + 22);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('\u03C0 \u2248 ' + piEst.toFixed(6), infoX, infoY + 50);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Error: ' + err.toFixed(6), infoX, infoY + 72);
                            ctx.fillText('Expected: ~' + (total > 0 ? (1 / Math.sqrt(total)).toFixed(4) : '--'), infoX, infoY + 92);

                            // Convergence plot (small)
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('1/\u221AN convergence', infoX + 80, infoY + 120);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ising-model',
                    title: '2D Ising Model: Phase Transition',
                    description: 'Watch the Ising model undergo a phase transition. At low temperature (T < T_c \u2248 2.27), spins order into large aligned domains. At high temperature, thermal noise destroys the order. The magnetization drops to zero at T_c. This is the quintessential Monte Carlo simulation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var N = 60; // grid size
                        var T = 1.5;
                        var Tc = 2 / Math.log(1 + Math.sqrt(2)); // ~2.269
                        var spins = [];
                        var animId = null;
                        var sweepsPer = 2;

                        function initSpins(ordered) {
                            spins = [];
                            for (var i = 0; i < N; i++) {
                                spins[i] = [];
                                for (var j = 0; j < N; j++) {
                                    spins[i][j] = ordered ? 1 : (Math.random() < 0.5 ? 1 : -1);
                                }
                            }
                        }

                        function energy(i, j) {
                            var s = spins[i][j];
                            var sum = spins[(i + 1) % N][j] + spins[(i - 1 + N) % N][j] +
                                      spins[i][(j + 1) % N] + spins[i][(j - 1 + N) % N];
                            return -s * sum; // J = 1
                        }

                        function metropolisSweep() {
                            for (var k = 0; k < N * N; k++) {
                                var i = Math.floor(Math.random() * N);
                                var j = Math.floor(Math.random() * N);
                                var dE = -2 * energy(i, j); // energy change on flip
                                if (dE <= 0 || Math.random() < Math.exp(-dE / T)) {
                                    spins[i][j] *= -1;
                                }
                            }
                        }

                        function magnetization() {
                            var m = 0;
                            for (var i = 0; i < N; i++)
                                for (var j = 0; j < N; j++)
                                    m += spins[i][j];
                            return Math.abs(m) / (N * N);
                        }

                        VizEngine.createSlider(controls, 'T / J', 0.5, 4.0, T, 0.1, function(v) {
                            T = v;
                        });

                        VizEngine.createButton(controls, 'Start/Stop', function() {
                            if (animId) { clearInterval(animId); animId = null; return; }
                            animId = setInterval(function() {
                                for (var s = 0; s < sweepsPer; s++) metropolisSweep();
                                draw();
                            }, 30);
                        });

                        VizEngine.createButton(controls, 'All Up', function() {
                            initSpins(true); draw();
                        });

                        VizEngine.createButton(controls, 'Random', function() {
                            initSpins(false); draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw spins
                            var cellSize = Math.min(5, Math.floor(330 / N));
                            var offX = 20, offY = 30;

                            for (var i = 0; i < N; i++) {
                                for (var j = 0; j < N; j++) {
                                    ctx.fillStyle = spins[i][j] === 1 ? viz.colors.teal : viz.colors.bg;
                                    ctx.fillRect(offX + i * cellSize, offY + j * cellSize, cellSize, cellSize);
                                }
                            }

                            // Border
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(offX, offY, N * cellSize, N * cellSize);

                            // Info panel
                            var mag = magnetization();
                            var infoX = offX + N * cellSize + 20;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('2D Ising Model', infoX, 45);
                            ctx.fillText(N + ' \u00D7 ' + N + ' lattice', infoX, 65);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('T = ' + T.toFixed(2) + ' J/k\u0392', infoX, 95);
                            ctx.fillText('T_c = ' + Tc.toFixed(3) + ' J/k\u0392', infoX, 115);

                            // Phase indicator
                            var phase = T < Tc ? 'Ordered (ferromagnetic)' : 'Disordered (paramagnetic)';
                            ctx.fillStyle = T < Tc ? viz.colors.teal : viz.colors.orange;
                            ctx.fillText(phase, infoX, 145);

                            // Magnetization bar
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('|M| = ' + mag.toFixed(3), infoX, 175);
                            var barW = 120, barH = 14;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(infoX, 185, barW, barH);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(infoX, 185, barW * mag, barH);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.strokeRect(infoX, 185, barW, barH);

                            // Legend
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(infoX, 220, 12, 12);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Spin +1', infoX + 18, 230);

                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(infoX, 238, 12, 12);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.strokeRect(infoX, 238, 12, 12);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Spin -1', infoX + 18, 248);

                            // Temperature arrow
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            var tcPos = offX + (Tc - 0.5) / 3.5 * (N * cellSize);
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('\u25BC T_c', Math.min(tcPos, offX + N * cellSize - 10), offY + N * cellSize + 18);
                        }

                        initSpins(true);
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Monte Carlo to estimate \\(\\int_0^1 \\int_0^1 \\int_0^1 \\int_0^1 (x_1^2 + x_2^2 + x_3^2 + x_4^2)\\,dx_1\\,dx_2\\,dx_3\\,dx_4\\). The exact answer is \\(4/3\\). With \\(N = 1000\\) random points in \\([0,1]^4\\), what error do you expect?',
                    hint: 'Each random point gives a sample of the integrand. The volume of \\([0,1]^4\\) is 1, so the estimate is just the sample mean. Expected error \\(\\sim \\sigma_f / \\sqrt{N}\\).',
                    solution: 'Draw \\(N = 1000\\) uniform points in \\([0,1]^4\\), compute \\(f = x_1^2 + x_2^2 + x_3^2 + x_4^2\\) at each, and average. The exact mean is \\(4 \\cdot 1/3 = 4/3\\). The variance of \\(f\\) is \\(\\text{Var}(f) = 4 \\cdot \\text{Var}(X^2) + 0 = 4(E[X^4] - (E[X^2])^2) = 4(1/5 - 1/9) = 4 \\cdot 4/45 \\approx 0.356\\). Expected error \\(\\approx \\sqrt{0.356/1000} \\approx 0.019\\), about 1.4% of the true value.'
                },
                {
                    question: 'In the 2D Ising model, argue physically why the critical temperature exists. Why doesn\'t thermal disorder destroy order for all \\(T > 0\\) (as it does in 1D)?',
                    hint: 'Think about the energy cost vs. entropy gain of creating a domain wall. In 1D a domain wall costs energy \\(2J\\) but gains \\(\\ln N\\) entropy. In 2D, a domain wall of length \\(L\\) costs \\(2JL\\) energy.',
                    solution: 'In 1D, a domain wall costs fixed energy \\(2J\\) but has \\(N-1\\) possible positions, so the free energy change \\(\\Delta F = 2J - k_BT\\ln(N-1) < 0\\) for any \\(T > 0\\) when \\(N \\to \\infty\\). Domain walls proliferate and destroy order. In 2D, creating a domain boundary of length \\(L\\) costs energy \\(\\sim 2JL\\), which grows with the boundary length. The entropy of boundary configurations grows slower (as \\(e^{cL}\\) for some constant \\(c\\)), so at low enough \\(T\\) the energy cost dominates, suppressing large domain walls and maintaining long-range order. The transition occurs at \\(T_c\\) where the energy-entropy balance shifts.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: The Mathematical Physicist's Toolkit (Coda)
        // ================================================================
        {
            id: 'sec-coda',
            title: 'The Mathematical Physicist\'s Toolkit',
            content: `
<h2>The Mathematical Physicist's Toolkit</h2>

<div class="env-block intuition">
    <div class="env-title">Looking Back</div>
    <div class="env-body">
        <p>We have arrived at the end of a long journey. Starting from vector calculus and curvilinear coordinates, we built a toolkit that spans the mathematical landscape a physicist encounters: linear algebra and group theory for symmetry, complex analysis for evaluation of integrals, differential equations and Green's functions for the response of physical systems, special functions for the solutions that arise in symmetric geometries, integral transforms for moving between domains, variational principles for finding extrema, and now numerical methods for everything that resists analytical attack.</p>
    </div>
</div>

<h3>The Structure of the Course</h3>

<p>The connections between topics are not incidental; they form a deeply coherent web:</p>

<ul>
    <li><strong>Sturm-Liouville theory</strong> (Chapter 9) provides the eigenfunction expansions that unify Fourier series (Chapter 14), Legendre polynomials (Chapter 12), and Bessel functions (Chapter 11) as special cases of the same abstract framework.</li>
    <li><strong>Green's functions</strong> (Chapter 10) express the solution of any linear PDE as a convolution with a fundamental response, connecting to integral transforms (Chapters 14, 15) through the spectral representation.</li>
    <li><strong>Group theory</strong> (Chapter 5) explains <em>why</em> certain special functions appear: they are basis functions for irreducible representations of the symmetry group of the problem.</li>
    <li><strong>Complex analysis</strong> (Chapters 6, 7) provides the machinery for evaluating the integrals that appear in all the above, from computing residues of Green's functions to deforming contours for asymptotic expansions.</li>
    <li><strong>Variational methods</strong> (Chapter 16) recast differential equations as optimization problems, revealing deep structural principles (Lagrangian mechanics, Hamilton's principle, Fermat's principle).</li>
    <li><strong>Numerical methods</strong> (this chapter) provide the practical means to solve the equations when the analytical tools reach their limits.</li>
</ul>

<h3>When to Use What</h3>

<div class="env-block remark">
    <div class="env-title">A Decision Guide</div>
    <div class="env-body">
        <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <tr style="border-bottom:1px solid #333;">
                <th style="text-align:left;padding:6px;">Problem Type</th>
                <th style="text-align:left;padding:6px;">Analytical Approach</th>
                <th style="text-align:left;padding:6px;">Numerical Approach</th>
            </tr>
            <tr style="border-bottom:1px solid #222;">
                <td style="padding:6px;">ODE with symmetry</td>
                <td style="padding:6px;">Special functions (Ch 11-13)</td>
                <td style="padding:6px;">RK4 / adaptive RK</td>
            </tr>
            <tr style="border-bottom:1px solid #222;">
                <td style="padding:6px;">Linear PDE, simple geometry</td>
                <td style="padding:6px;">Separation of variables + eigenfunction expansion (Ch 9, 17)</td>
                <td style="padding:6px;">Finite differences / spectral methods</td>
            </tr>
            <tr style="border-bottom:1px solid #222;">
                <td style="padding:6px;">Linear PDE, complex geometry</td>
                <td style="padding:6px;">Green's function (Ch 10, if known)</td>
                <td style="padding:6px;">Finite elements</td>
            </tr>
            <tr style="border-bottom:1px solid #222;">
                <td style="padding:6px;">High-dimensional integration</td>
                <td style="padding:6px;">(Usually impossible)</td>
                <td style="padding:6px;">Monte Carlo</td>
            </tr>
            <tr style="border-bottom:1px solid #222;">
                <td style="padding:6px;">Nonlinear PDE</td>
                <td style="padding:6px;">Perturbation theory / variational (Ch 16)</td>
                <td style="padding:6px;">Finite differences + iteration</td>
            </tr>
            <tr>
                <td style="padding:6px;">Statistical mechanics</td>
                <td style="padding:6px;">Transfer matrix / Onsager (Ch 18)</td>
                <td style="padding:6px;">Metropolis Monte Carlo</td>
            </tr>
        </table>
    </div>
</div>

<h3>The Interplay of Analytical and Numerical</h3>

<p>The best computational physics is not purely numerical. Analytical understanding guides the numerics:</p>

<ul>
    <li><strong>Asymptotics</strong> provide boundary conditions at infinity for numerical ODE solvers.</li>
    <li><strong>Conservation laws</strong> (from symmetries, via Noether's theorem and variational principles) constrain and validate numerical solutions.</li>
    <li><strong>Spectral theory</strong> reveals the natural basis in which to expand a numerical solution, reducing a PDE to a system of ODEs.</li>
    <li><strong>Dimensional analysis</strong> and <strong>scaling</strong> reduce the parameter space that needs to be explored numerically.</li>
</ul>

<p>Conversely, numerical experiments often reveal phenomena that analytical theory then explains: solitons were discovered numerically (Fermi-Pasta-Ulam-Tsingou), chaos was first seen in Lorenz's numerical weather simulations, and the universality of phase transitions was confirmed by Monte Carlo before renormalization group theory provided the explanation.</p>

<div class="env-block intuition">
    <div class="env-title">The Road Ahead</div>
    <div class="env-body">
        <p>This course has given you the mathematical language in which physics is written. Every topic we have studied is a living area of research: new special functions arise in string theory, new numerical methods exploit quantum computing, new applications of group theory appear in condensed matter physics, and the interplay between analysis and computation continues to deepen. The toolkit is yours. Use it well.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-toolkit-summary"></div>
`,
            visualizations: [
                {
                    id: 'viz-toolkit-summary',
                    title: 'The Complete Toolkit: Course Map',
                    description: 'A visual map of all the topics covered in this course and how they connect. Each node is a chapter; edges show mathematical dependencies and connections. Hover over any node to highlight its connections.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var chapters = [
                            { id: 0,  label: 'Vectors',        x: 60,  y: 60,  color: '#58a6ff' },
                            { id: 1,  label: 'Curvilinear',    x: 160, y: 40,  color: '#58a6ff' },
                            { id: 2,  label: 'Tensors',        x: 260, y: 55,  color: '#58a6ff' },
                            { id: 3,  label: 'Matrices',       x: 60,  y: 140, color: '#bc8cff' },
                            { id: 4,  label: 'Hilbert',        x: 160, y: 130, color: '#bc8cff' },
                            { id: 5,  label: 'Groups',         x: 260, y: 140, color: '#bc8cff' },
                            { id: 6,  label: 'Complex',        x: 370, y: 60,  color: '#f0883e' },
                            { id: 7,  label: 'Residues',       x: 460, y: 55,  color: '#f0883e' },
                            { id: 8,  label: 'ODEs',           x: 60,  y: 225, color: '#3fb950' },
                            { id: 9,  label: 'Sturm-L.',      x: 170, y: 215, color: '#3fb950' },
                            { id: 10, label: "Green's",        x: 280, y: 225, color: '#3fb950' },
                            { id: 11, label: 'Bessel',         x: 60,  y: 305, color: '#d29922' },
                            { id: 12, label: 'Legendre',       x: 170, y: 295, color: '#d29922' },
                            { id: 13, label: 'Gamma',          x: 280, y: 310, color: '#d29922' },
                            { id: 14, label: 'Fourier',        x: 380, y: 160, color: '#f778ba' },
                            { id: 15, label: 'Laplace',        x: 470, y: 150, color: '#f778ba' },
                            { id: 16, label: 'Variational',    x: 380, y: 250, color: '#3fb9a0' },
                            { id: 17, label: 'PDEs',           x: 470, y: 240, color: '#3fb9a0' },
                            { id: 18, label: 'Probability',    x: 380, y: 340, color: '#f85149' },
                            { id: 19, label: 'Numerical',      x: 470, y: 340, color: '#f85149' }
                        ];

                        // Connections (chapter pairs)
                        var edges = [
                            [0, 1], [1, 2], [0, 3], [3, 4], [4, 5],
                            [6, 7], [3, 8], [8, 9], [9, 10], [4, 9],
                            [9, 11], [9, 12], [7, 13], [9, 14], [14, 15],
                            [8, 16], [16, 17], [10, 17], [14, 17],
                            [18, 19], [17, 19], [1, 12], [5, 12],
                            [10, 15], [7, 10], [13, 11], [7, 14]
                        ];

                        var hoverId = -1;

                        function getChapter(id) {
                            for (var i = 0; i < chapters.length; i++) {
                                if (chapters[i].id === id) return chapters[i];
                            }
                            return null;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('Mathematical Physics: The Complete Toolkit', viz.width / 2, 16, viz.colors.white, 14);

                            // Draw edges
                            for (var e = 0; e < edges.length; e++) {
                                var c1 = getChapter(edges[e][0]);
                                var c2 = getChapter(edges[e][1]);
                                if (!c1 || !c2) continue;
                                var highlighted = (hoverId === c1.id || hoverId === c2.id);
                                ctx.strokeStyle = highlighted ? '#ffffff88' : '#ffffff22';
                                ctx.lineWidth = highlighted ? 2 : 0.8;
                                ctx.beginPath();
                                ctx.moveTo(c1.x, c1.y);
                                ctx.lineTo(c2.x, c2.y);
                                ctx.stroke();
                            }

                            // Draw nodes
                            for (var i = 0; i < chapters.length; i++) {
                                var ch = chapters[i];
                                var isHover = (hoverId === ch.id);
                                var r = isHover ? 18 : 14;

                                // Glow
                                if (isHover) {
                                    ctx.fillStyle = ch.color + '44';
                                    ctx.beginPath();
                                    ctx.arc(ch.x, ch.y, r + 6, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                ctx.fillStyle = ch.color;
                                ctx.beginPath();
                                ctx.arc(ch.x, ch.y, r, 0, Math.PI * 2);
                                ctx.fill();

                                // Chapter number
                                ctx.fillStyle = '#000';
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(ch.id.toString(), ch.x, ch.y);

                                // Label
                                ctx.fillStyle = isHover ? '#fff' : ch.color;
                                ctx.font = (isHover ? 'bold ' : '') + '10px -apple-system,sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText(ch.label, ch.x, ch.y + r + 3);
                            }

                            // Part labels
                            var parts = [
                                { label: 'A: Vectors', x: 160, y: 395, color: '#58a6ff' },
                                { label: 'B: Lin.Alg.', x: 260, y: 395, color: '#bc8cff' },
                                { label: 'C: Complex', x: 350, y: 395, color: '#f0883e' },
                                { label: 'D: DiffEq', x: 170, y: 410, color: '#3fb950' },
                                { label: 'E: Special', x: 270, y: 410, color: '#d29922' },
                                { label: 'F: Transforms+', x: 420, y: 410, color: '#f778ba' }
                            ];
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textBaseline = 'middle';
                            for (var pi = 0; pi < parts.length; pi++) {
                                ctx.fillStyle = parts[pi].color;
                                ctx.textAlign = 'center';
                                ctx.fillText(parts[pi].label, parts[pi].x, parts[pi].y);
                            }
                        }

                        // Mouse hover detection
                        viz.canvas.addEventListener('mousemove', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var found = -1;
                            for (var i = 0; i < chapters.length; i++) {
                                var dx = mx - chapters[i].x;
                                var dy = my - chapters[i].y;
                                if (dx * dx + dy * dy < 400) { found = chapters[i].id; break; }
                            }
                            if (found !== hoverId) { hoverId = found; draw(); }
                        });

                        viz.canvas.addEventListener('mouseleave', function() {
                            hoverId = -1; draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Choose a physical problem (e.g., hydrogen atom, vibrating drum, heat conduction in a cylinder) and trace the mathematical tools from this course that you would use to solve it. Identify which chapters are relevant and why.',
                    hint: 'For the hydrogen atom: you need separation of variables (Ch 17), which leads to Legendre/spherical harmonics (Ch 12) and Laguerre functions (Ch 13) via Sturm-Liouville theory (Ch 9). The group theory (Ch 5) explains the degeneracies.',
                    solution: '<strong>Hydrogen atom</strong>: Start with the Schrodinger PDE in spherical coordinates (Ch 1, Ch 17). Separation of variables produces radial and angular ODEs (Ch 8). The angular part yields spherical harmonics (Ch 12, a Sturm-Liouville problem on the sphere, Ch 9). The radial part yields associated Laguerre functions (Ch 13). The energy spectrum \\(E_n = -13.6/n^2\\) eV has degeneracy \\(n^2\\), explained by the SO(4) symmetry (Ch 5). Perturbation theory for fine structure uses variational methods (Ch 16). For multi-electron atoms, numerical methods (Ch 19) become essential.'
                },
                {
                    question: '(Essay) Reflect on the relationship between analytical and numerical methods in mathematical physics. When is an analytical solution more valuable than a numerical one, even when both are available? When is a numerical solution more informative?',
                    hint: 'Think about understanding vs. computation, scaling with parameters, discovering new phenomena, and validating results.',
                    solution: 'Analytical solutions provide insight that numerical solutions cannot: how the solution depends on parameters (analytically), what symmetries and conservation laws govern the system, asymptotic behavior, and rigorous error bounds. They serve as benchmarks for validating numerical codes. However, numerical solutions can handle realistic geometries, nonlinearities, and multi-physics coupling that no analytical method can touch. They can also discover phenomena (solitons, chaos, phase transitions) that analytical theory then explains. The most powerful approach combines both: analytical methods to understand the structure and reduce the problem, numerical methods to compute the answer for the specific case at hand. The physicist who masters both is far more capable than one who knows only one.'
                }
            ]
        }
    ]
});
