// ============================================================================
// Chapter 16 — Variational Calculus
// The principle of least action and beyond
// ============================================================================
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Variational Calculus',
    subtitle: 'The principle of least action and beyond',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Functionals and Nature's Optimization
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Functionals and Nature's Optimization</h2>

<div class="env-block intuition">
    <div class="env-title">A Question That Changed Physics</div>
    <div class="env-body">
        <p>Light travels between two points. If it passes through media with different speeds, what path does it take? Fermat's answer (1662): the path that minimizes travel time. This "principle of least time" hints at something deeper: nature doesn't just evolve according to differential equations; it selects paths that optimize certain quantities.</p>
    </div>
</div>

<p>In ordinary calculus, we find numbers \\(x\\) that extremize a function \\(f(x)\\). In <strong>variational calculus</strong>, we find <em>functions</em> \\(y(x)\\) that extremize a <strong>functional</strong>: a rule that assigns a number to each function.</p>

<div class="env-block definition">
    <div class="env-title">Definition 16.1 (Functional)</div>
    <div class="env-body">
        <p>A <strong>functional</strong> is a mapping \\(J: \\mathcal{F} \\to \\mathbb{R}\\) from a space of functions to the real numbers. We write</p>
        \\[
        J[y] = \\int_a^b F\\bigl(x, y(x), y'(x)\\bigr)\\, dx,
        \\]
        <p>where \\(F\\) is a given function of three variables called the <strong>Lagrangian density</strong> (or integrand), and \\(y\\) ranges over admissible functions satisfying boundary conditions \\(y(a) = y_a\\), \\(y(b) = y_b\\).</p>
    </div>
</div>

<h3>Functions vs. Functionals</h3>

<p>The distinction is subtle but crucial:</p>
<ul>
    <li><strong>Function:</strong> input is a number, output is a number. Example: \\(f(x) = x^2\\).</li>
    <li><strong>Functional:</strong> input is a <em>function</em>, output is a number. Example: \\(J[y] = \\int_0^1 (y')^2\\, dx\\).</li>
</ul>

<p>Just as calculus asks "at what \\(x\\) is \\(f\\) stationary?", variational calculus asks "for what \\(y(x)\\) is \\(J\\) stationary?"</p>

<div class="env-block example">
    <div class="env-title">Example: Arc Length</div>
    <div class="env-body">
        <p>The arc length of a curve \\(y(x)\\) from \\((a, y_a)\\) to \\((b, y_b)\\) is</p>
        \\[
        L[y] = \\int_a^b \\sqrt{1 + (y')^2}\\, dx.
        \\]
        <p>This is a functional: plug in different curves \\(y(x)\\), get different lengths. Which curve minimizes \\(L\\)? The straight line, of course. But the machinery we develop here handles problems where the answer is far less obvious.</p>
    </div>
</div>

<h3>Historical Context</h3>

<div class="env-block remark">
    <div class="env-title">The Bernoulli Challenge</div>
    <div class="env-body">
        <p>In 1696, Johann Bernoulli posed a famous challenge: find the curve of fastest descent between two points under gravity (the brachistochrone problem). Solutions came from Newton, Leibniz, L'Hopital, Jakob Bernoulli, and Johann himself. The answer, a cycloid, could not be found by ordinary calculus. Euler (1744) and Lagrange (1755) then developed the general theory of the calculus of variations, which became the mathematical backbone of analytical mechanics.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-least-action"></div>
`,
            visualizations: [
                {
                    id: 'viz-least-action',
                    title: 'Comparing Paths: The Action Integral',
                    description: 'Three different paths connect the same endpoints. For each path, the action \\(S = \\int L\\, dt\\) is computed. The true path (in blue) has the smallest action. Drag the control point to deform the green trial path and watch the action change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 340, scale: 50
                        });

                        // Free-fall problem: y(t) under gravity from (0,8) to (2,0)
                        // True path: y = 8 - 2t^2 (free fall from height 8, g=4 for nice numbers)
                        // L = T - V = 0.5*m*v^2 - m*g*y, set m=1, g=4
                        var g = 4;
                        var tMax = 2;
                        var y0 = 8, y1 = 0;
                        var cpY = 6; // control point y for trial path

                        var drag = viz.addDraggable('cp', 1, cpY, viz.colors.green, 8, function(mx, my) {
                            drag.x = 1; // lock x
                            cpY = Math.max(0, Math.min(9, my));
                            drag.y = cpY;
                        });

                        function truePath(t) { return y0 - 0.5 * g * t * t; }
                        function trialPath(t) {
                            // Quadratic through (0,y0), (1,cpY), (2,y1)
                            var a = y0;
                            var c2 = y1 - 2 * cpY + y0;
                            var c1 = cpY - y0 - c2 * 0.25;
                            // y = a + c1*t + c2*t^2... let's use Lagrange interpolation
                            var L0 = (t - 1) * (t - 2) / ((0 - 1) * (0 - 2));
                            var L1 = (t - 0) * (t - 2) / ((1 - 0) * (1 - 2));
                            var L2 = (t - 0) * (t - 1) / ((2 - 0) * (2 - 1));
                            return y0 * L0 + cpY * L1 + y1 * L2;
                        }
                        function sinPath(t) {
                            return y0 * (1 - t / tMax) + y1 * (t / tMax) + 2 * Math.sin(Math.PI * t / tMax);
                        }

                        function computeAction(yFunc) {
                            var n = 500;
                            var dt = tMax / n;
                            var S = 0;
                            for (var i = 0; i < n; i++) {
                                var t = (i + 0.5) * dt;
                                var yv = yFunc(t);
                                var yp = (yFunc(t + dt * 0.01) - yFunc(t - dt * 0.01)) / (0.02 * dt);
                                var T = 0.5 * yp * yp;
                                var V = g * yv;
                                S += (T - V) * dt;
                            }
                            return S;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes labels
                            viz.screenText('t', viz.width - 15, viz.originY - 10, viz.colors.text, 12);
                            viz.screenText('y(t)', viz.originX + 20, 15, viz.colors.text, 12);

                            // Draw grid lines
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var t = 0; t <= 2; t += 0.5) {
                                var sx = viz.originX + t * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var yy = 0; yy <= 9; yy += 2) {
                                var sy = viz.originY - yy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axis
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Tick labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var tt = 0; tt <= 2; tt++) {
                                ctx.fillText(tt.toString(), viz.originX + tt * viz.scale, viz.originY + 4);
                            }
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var yyy = 0; yyy <= 8; yyy += 2) {
                                ctx.fillText(yyy.toString(), viz.originX - 6, viz.originY - yyy * viz.scale);
                            }

                            // Draw paths
                            // True path (blue)
                            viz.drawFunction(function(t) { return truePath(t); }, 0, tMax, viz.colors.blue, 3, 200);
                            // Trial path (green)
                            viz.drawFunction(function(t) { return trialPath(t); }, 0, tMax, viz.colors.green, 2, 200);
                            // Sin path (orange)
                            viz.drawFunction(function(t) { return sinPath(t); }, 0, tMax, viz.colors.orange, 2, 200);

                            // Endpoints
                            viz.drawPoint(0, y0, viz.colors.white, null, 5);
                            viz.drawPoint(tMax, y1, viz.colors.white, null, 5);

                            // Draggable
                            viz.drawDraggables();

                            // Compute actions
                            var S_true = computeAction(truePath);
                            var S_trial = computeAction(trialPath);
                            var S_sin = computeAction(sinPath);

                            // Legend
                            var lx = viz.width - 200, ly = 25;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('True path: S = ' + S_true.toFixed(2), lx, ly);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Trial path: S = ' + S_trial.toFixed(2), lx, ly + 18);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Sin path:   S = ' + S_sin.toFixed(2), lx, ly + 36);

                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('(g = ' + g + ', m = 1)', lx, ly + 56);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain in your own words the difference between a function and a functional. Give an example of each that arises in physics.',
                    hint: 'Think about what serves as the "input" in each case.',
                    solution: 'A function maps numbers to numbers: e.g., the gravitational potential \\(V(r) = -GM/r\\). A functional maps functions to numbers: e.g., the arc length \\(L[y] = \\int_a^b \\sqrt{1+(y\')^2}\\,dx\\), which takes an entire curve \\(y(x)\\) and returns a single number (its length). In physics, the action \\(S[q] = \\int L(q, \\dot{q}, t)\\,dt\\) is the central functional of analytical mechanics.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Euler-Lagrange Equation
        // ================================================================
        {
            id: 'sec-euler-lagrange',
            title: 'Euler-Lagrange Equation',
            content: `
<h2>The Euler-Lagrange Equation</h2>

<div class="env-block intuition">
    <div class="env-title">From \\(f'(x)=0\\) to \\(\\delta J = 0\\)</div>
    <div class="env-body">
        <p>To extremize \\(f(x)\\), we set \\(f'(x) = 0\\). To extremize a functional \\(J[y]\\), we need the analogous condition. The idea: perturb the candidate path \\(y(x)\\) by a small "variation" \\(\\epsilon\\,\\eta(x)\\) and require that the first-order change in \\(J\\) vanishes for all perturbations \\(\\eta\\).</p>
    </div>
</div>

<h3>Derivation</h3>

<p>Consider the functional</p>
\\[
J[y] = \\int_a^b F(x, y, y')\\, dx
\\]
<p>with boundary conditions \\(y(a) = y_a,\\; y(b) = y_b\\). Let \\(y(x)\\) be the extremal (optimal path), and define a one-parameter family of comparison paths:</p>
\\[
Y(x) = y(x) + \\epsilon\\, \\eta(x),
\\]
<p>where \\(\\eta(x)\\) is an arbitrary smooth function satisfying \\(\\eta(a) = \\eta(b) = 0\\) (so the perturbed path still meets the boundary conditions), and \\(\\epsilon\\) is a small parameter.</p>

<p>Substituting into \\(J\\) and differentiating with respect to \\(\\epsilon\\) at \\(\\epsilon = 0\\):</p>
\\[
\\frac{d}{d\\epsilon}\\bigg|_{\\epsilon=0} J[y + \\epsilon\\eta]
= \\int_a^b \\left(\\frac{\\partial F}{\\partial y}\\eta + \\frac{\\partial F}{\\partial y'}\\eta'\\right) dx = 0.
\\]

<p>Integrating the second term by parts:</p>
\\[
\\int_a^b \\frac{\\partial F}{\\partial y'}\\eta'\\, dx = \\left[\\frac{\\partial F}{\\partial y'}\\eta\\right]_a^b - \\int_a^b \\frac{d}{dx}\\frac{\\partial F}{\\partial y'}\\, \\eta\\, dx.
\\]

<p>The boundary term vanishes since \\(\\eta(a) = \\eta(b) = 0\\), so</p>
\\[
\\int_a^b \\left(\\frac{\\partial F}{\\partial y} - \\frac{d}{dx}\\frac{\\partial F}{\\partial y'}\\right)\\eta\\, dx = 0.
\\]

<p>Since \\(\\eta\\) is arbitrary, the <strong>fundamental lemma of the calculus of variations</strong> gives us:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.1 (Euler-Lagrange Equation)</div>
    <div class="env-body">
        <p>A necessary condition for \\(y(x)\\) to be an extremal of \\(J[y] = \\int_a^b F(x,y,y')\\,dx\\) is</p>
        \\[
        \\frac{\\partial F}{\\partial y} - \\frac{d}{dx}\\frac{\\partial F}{\\partial y'} = 0.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Shortest Path in the Plane</div>
    <div class="env-body">
        <p>For arc length, \\(F = \\sqrt{1 + (y')^2}\\). Then \\(\\partial F/\\partial y = 0\\) and</p>
        \\[
        \\frac{\\partial F}{\\partial y'} = \\frac{y'}{\\sqrt{1+(y')^2}}.
        \\]
        <p>The E-L equation gives \\(\\frac{d}{dx}\\frac{y'}{\\sqrt{1+(y')^2}} = 0\\), so \\(y' = \\text{const}\\). The extremal is a straight line.</p>
    </div>
</div>

<h3>Special Cases</h3>

<div class="env-block theorem">
    <div class="env-title">Beltrami Identity</div>
    <div class="env-body">
        <p>If \\(F\\) does not depend explicitly on \\(x\\) (i.e., \\(\\partial F/\\partial x = 0\\)), then the Euler-Lagrange equation admits the first integral</p>
        \\[
        F - y'\\frac{\\partial F}{\\partial y'} = C \\quad (\\text{constant}).
        \\]
        <p>This is especially useful for the brachistochrone and geodesic problems.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-euler-lagrange"></div>
`,
            visualizations: [
                {
                    id: 'viz-euler-lagrange',
                    title: 'Variation of a Path',
                    description: 'The blue curve is the extremal \\(y(x)\\). The green curve shows \\(y(x) + \\epsilon\\,\\eta(x)\\), a perturbed path. Adjust \\(\\epsilon\\) and the shape of \\(\\eta\\) to see how the functional value changes. At the extremal, \\(\\delta J = 0\\) to first order.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 300, scale: 60
                        });

                        var epsilon = 0.0;
                        var mode = 1; // which eta

                        VizEngine.createSlider(controls, '\u03b5', -1.5, 1.5, 0, 0.05, function(v) { epsilon = v; });
                        VizEngine.createSlider(controls, '\u03b7 mode', 1, 3, 1, 1, function(v) { mode = Math.round(v); });

                        // Extremal for shortest path: straight line from (0,0) to (4,3)
                        var xa = 0, ya = 0, xb = 4, yb = 3;
                        function yTrue(x) { return ya + (yb - ya) * (x - xa) / (xb - xa); }

                        function eta(x) {
                            // Vanishes at endpoints
                            var u = (x - xa) / (xb - xa); // 0 to 1
                            if (mode === 1) return Math.sin(Math.PI * u);
                            if (mode === 2) return Math.sin(2 * Math.PI * u);
                            return u * (1 - u) * Math.sin(3 * Math.PI * u);
                        }

                        function yPerturbed(x) { return yTrue(x) + epsilon * eta(x); }

                        // Arc length functional
                        function arcLength(yFunc) {
                            var n = 400;
                            var dx = (xb - xa) / n;
                            var L = 0;
                            for (var i = 0; i < n; i++) {
                                var x = xa + (i + 0.5) * dx;
                                var yp = (yFunc(x + dx * 0.01) - yFunc(x - dx * 0.01)) / (0.02 * dx);
                                L += Math.sqrt(1 + yp * yp) * dx;
                            }
                            return L;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 4; gx++) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = -1; gy <= 4; gy++) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Variation band (shaded area between paths)
                            if (Math.abs(epsilon) > 0.01) {
                                viz.shadeBetween(yTrue, yPerturbed, xa, xb, viz.colors.green + '22');
                            }

                            // True path
                            viz.drawFunction(yTrue, xa - 0.2, xb + 0.2, viz.colors.blue, 3, 200);
                            // Perturbed path
                            viz.drawFunction(yPerturbed, xa, xb, viz.colors.green, 2, 200);
                            // Eta function (faint)
                            viz.drawFunction(function(x) { return epsilon * eta(x); }, xa, xb, viz.colors.purple, 1, 200);

                            // Endpoints
                            viz.drawPoint(xa, ya, viz.colors.white, 'A', 5);
                            viz.drawPoint(xb, yb, viz.colors.white, 'B', 5);

                            // Compute arc lengths
                            var Ltrue = arcLength(yTrue);
                            var Lpert = arcLength(yPerturbed);
                            var dL = Lpert - Ltrue;

                            // Info
                            var lx = viz.width - 220, ly = 20;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('L[y] = ' + Ltrue.toFixed(4), lx, ly);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('L[y+\u03b5\u03b7] = ' + Lpert.toFixed(4), lx, ly + 18);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('\u0394L = ' + dL.toFixed(4), lx, ly + 36);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('(\u03b5 = ' + epsilon.toFixed(2) + ', mode ' + mode + ')', lx, ly + 54);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the Euler-Lagrange equation for \\(J[y] = \\int_0^1 \\bigl[(y\')^2 + y^2\\bigr]\\, dx\\) with \\(y(0)=0,\\; y(1)=1\\). Solve the resulting ODE.',
                    hint: 'With \\(F = (y\')^2 + y^2\\), compute \\(\\partial F/\\partial y\\) and \\(\\partial F/\\partial y\'\\), then apply the E-L equation. The ODE is \\(y\'\' - y = 0\\).',
                    solution: 'Here \\(\\partial F/\\partial y = 2y\\) and \\(\\partial F/\\partial y\' = 2y\'\\). The E-L equation is \\(2y - \\frac{d}{dx}(2y\') = 0\\), i.e., \\(y\'\' - y = 0\\). The general solution is \\(y = A\\cosh x + B\\sinh x\\). With \\(y(0)=0\\), \\(A=0\\). With \\(y(1)=1\\), \\(B = 1/\\sinh 1\\). So \\(y(x) = \\sinh(x)/\\sinh(1)\\).'
                },
                {
                    question: 'Prove the Beltrami identity: if \\(F\\) does not depend explicitly on \\(x\\), then \\(F - y\'\\, \\partial F/\\partial y\' = C\\). (Hint: compute \\(\\frac{d}{dx}[F - y\'F_{y\'}]\\) and use the E-L equation.)',
                    hint: 'Use the chain rule: \\(\\frac{dF}{dx} = F_x + F_y y\' + F_{y\'} y\'\'\\). When \\(F_x = 0\\), simplify using E-L.',
                    solution: 'Compute \\(\\frac{d}{dx}(F - y\' F_{y\'}) = F_x + F_y y\' + F_{y\'} y\'\' - y\'\' F_{y\'} - y\' \\frac{d}{dx}F_{y\'} = F_x + y\'\\bigl(F_y - \\frac{d}{dx}F_{y\'}\\bigr)\\). By E-L the parenthesis vanishes. If also \\(F_x = 0\\), we get \\(\\frac{d}{dx}(F - y\' F_{y\'}) = 0\\), so \\(F - y\' F_{y\'} = C\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Brachistochrone
        // ================================================================
        {
            id: 'sec-brachistochrone',
            title: 'The Brachistochrone',
            content: `
<h2>The Brachistochrone: Curve of Fastest Descent</h2>

<div class="env-block intuition">
    <div class="env-title">The Physical Setup</div>
    <div class="env-body">
        <p>A bead slides frictionlessly under gravity from point \\(A\\) to point \\(B\\) (which is lower and to the right). What shape of wire gets it there fastest? The straight line is not the answer: a steeper initial drop lets the bead build up speed early, more than compensating for the longer path.</p>
    </div>
</div>

<h3>Formulation</h3>

<p>Place the origin at \\(A\\), with \\(x\\) pointing down and \\(y\\) pointing right. By conservation of energy, the speed at depth \\(x\\) is \\(v = \\sqrt{2gx}\\). An infinitesimal arc length is \\(ds = \\sqrt{1 + (y')^2}\\, dx\\), so the travel time is</p>
\\[
T[y] = \\int_0^{x_1} \\frac{\\sqrt{1 + (y')^2}}{\\sqrt{2gx}}\\, dx.
\\]

<p>Here \\(F(x, y, y') = \\frac{\\sqrt{1+(y')^2}}{\\sqrt{2gx}}\\) does not depend on \\(y\\) explicitly, so \\(\\partial F/\\partial y = 0\\) and the E-L equation simplifies to \\(\\frac{\\partial F}{\\partial y'} = C\\). Alternatively, since \\(F\\) does not depend on \\(y\\), we get a conservation law directly.</p>

<h3>The Solution: A Cycloid</h3>

<p>After some algebra (using the Beltrami identity since \\(F\\) does not depend on \\(y\\)), the solution is the <strong>cycloid</strong>:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.2 (Brachistochrone Solution)</div>
    <div class="env-body">
        <p>The curve of fastest descent is the cycloid, parametrized by</p>
        \\[
        x(\\theta) = R(\\theta - \\sin\\theta), \\quad y(\\theta) = R(1 - \\cos\\theta),
        \\]
        <p>where \\(R\\) is determined by the endpoint conditions.</p>
    </div>
</div>

<p>A cycloid is the curve traced by a point on the rim of a wheel rolling without slipping. It is also the <strong>tautochrone</strong>: the period of oscillation is the same regardless of the starting amplitude (Huygens, 1659).</p>

<div class="env-block remark">
    <div class="env-title">An Elegant Connection</div>
    <div class="env-body">
        <p>The brachistochrone and tautochrone properties of the cycloid are distinct results, but the fact that the same curve satisfies both is not a coincidence: both follow from the variational structure of the problem. Lagrange later showed this connection through his general framework.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-brachistochrone"></div>
`,
            visualizations: [
                {
                    id: 'viz-brachistochrone',
                    title: 'Brachistochrone Race: Straight vs Cycloid vs Parabola',
                    description: 'Watch three beads race under gravity from the same start to the same finish. The cycloid (blue) always wins. Press Reset to restart the race.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 40, originY: 30, scale: 1
                        });

                        // We work in screen coordinates for this viz
                        var startX = 50, startY = 40;
                        var endX = 500, endY = 330;
                        var gAcc = 600; // pixels/s^2

                        // Cycloid: parametric, from (startX,startY) to (endX,endY)
                        // x(theta) = startX + R*(theta - sin(theta))
                        // y(theta) = startY + R*(1 - cos(theta))
                        // Find R and theta_end to hit (endX, endY)
                        function findCycloidR() {
                            var dx = endX - startX;
                            var dy = endY - startY;
                            // Solve: R*(theta - sin(theta)) = dx, R*(1 - cos(theta)) = dy
                            // Newton iteration on theta
                            var th = Math.PI;
                            for (var iter = 0; iter < 50; iter++) {
                                var ratio = (th - Math.sin(th)) / (1 - Math.cos(th));
                                var target = dx / dy;
                                var f = ratio - target;
                                var denom = (1 - Math.cos(th));
                                var df = (1 - Math.cos(th)) / denom - (th - Math.sin(th)) * Math.sin(th) / (denom * denom);
                                th -= f / df;
                                if (th < 0.1) th = 0.1;
                                if (th > 2 * Math.PI - 0.1) th = 2 * Math.PI - 0.1;
                            }
                            var R = dy / (1 - Math.cos(th));
                            return { R: R, thetaEnd: th };
                        }

                        var cyc = findCycloidR();

                        function cycloidPt(frac) {
                            var th = frac * cyc.thetaEnd;
                            return {
                                x: startX + cyc.R * (th - Math.sin(th)),
                                y: startY + cyc.R * (1 - Math.cos(th))
                            };
                        }

                        function straightPt(frac) {
                            return {
                                x: startX + frac * (endX - startX),
                                y: startY + frac * (endY - startY)
                            };
                        }

                        function parabolaPt(frac) {
                            // Parabola y = startY + A*(x-startX)^2 through endpoints
                            var dx = endX - startX;
                            var dy = endY - startY;
                            var px = startX + frac * dx;
                            var t = (px - startX) / dx;
                            var py = startY + dy * t * t;
                            return { x: px, y: py };
                        }

                        // Compute arc length parameter tables for time-of-descent
                        function buildPath(ptFunc, n) {
                            var pts = [];
                            for (var i = 0; i <= n; i++) {
                                pts.push(ptFunc(i / n));
                            }
                            return pts;
                        }

                        // Compute time of descent along a path using energy conservation
                        // At height drop dy from start, speed = sqrt(2*g*dy)
                        function descentTime(pts) {
                            var t = 0;
                            for (var i = 1; i < pts.length; i++) {
                                var dx = pts[i].x - pts[i-1].x;
                                var dy = pts[i].y - pts[i-1].y;
                                var ds = Math.sqrt(dx*dx + dy*dy);
                                var drop1 = pts[i-1].y - startY;
                                var drop2 = pts[i].y - startY;
                                var avgDrop = (drop1 + drop2) / 2;
                                if (avgDrop < 0.5) avgDrop = 0.5;
                                var v = Math.sqrt(2 * gAcc * avgDrop);
                                t += ds / v;
                            }
                            return t;
                        }

                        var nPts = 400;
                        var cycPath = buildPath(cycloidPt, nPts);
                        var strPath = buildPath(straightPt, nPts);
                        var parPath = buildPath(parabolaPt, nPts);

                        var cycTime = descentTime(cycPath);
                        var strTime = descentTime(strPath);
                        var parTime = descentTime(parPath);

                        var t0 = null;
                        var running = true;
                        var maxTime = Math.max(cycTime, strTime, parTime);

                        function getBeadPos(path, totalTime, elapsed) {
                            if (elapsed >= totalTime) return path[path.length - 1];
                            // Find position by accumulating time
                            var tAcc = 0;
                            for (var i = 1; i < path.length; i++) {
                                var dx = path[i].x - path[i-1].x;
                                var dy = path[i].y - path[i-1].y;
                                var ds = Math.sqrt(dx*dx + dy*dy);
                                var drop = ((path[i-1].y - startY) + (path[i].y - startY)) / 2;
                                if (drop < 0.5) drop = 0.5;
                                var v = Math.sqrt(2 * gAcc * drop);
                                var dt = ds / v;
                                if (tAcc + dt >= elapsed) {
                                    var frac = (elapsed - tAcc) / dt;
                                    return {
                                        x: path[i-1].x + frac * (path[i].x - path[i-1].x),
                                        y: path[i-1].y + frac * (path[i].y - path[i-1].y)
                                    };
                                }
                                tAcc += dt;
                            }
                            return path[path.length - 1];
                        }

                        VizEngine.createButton(controls, 'Reset', function() {
                            t0 = null; running = true;
                        });

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var elapsed = running ? (timestamp - t0) / 1000 : maxTime;

                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('Brachistochrone Race', viz.width / 2, 15, viz.colors.white, 15);

                            // Draw tracks
                            ctx.lineWidth = 2;
                            // Straight
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            for (var i = 0; i < strPath.length; i++) {
                                i === 0 ? ctx.moveTo(strPath[i].x, strPath[i].y) : ctx.lineTo(strPath[i].x, strPath[i].y);
                            }
                            ctx.stroke();

                            // Parabola
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.beginPath();
                            for (var j = 0; j < parPath.length; j++) {
                                j === 0 ? ctx.moveTo(parPath[j].x, parPath[j].y) : ctx.lineTo(parPath[j].x, parPath[j].y);
                            }
                            ctx.stroke();

                            // Cycloid
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var k = 0; k < cycPath.length; k++) {
                                k === 0 ? ctx.moveTo(cycPath[k].x, cycPath[k].y) : ctx.lineTo(cycPath[k].x, cycPath[k].y);
                            }
                            ctx.stroke();

                            // Start and end markers
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(startX, startY, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(endX, endY, 5, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('A', startX - 15, startY, viz.colors.white, 12);
                            viz.screenText('B', endX + 15, endY, viz.colors.white, 12);

                            // Beads
                            var bCyc = getBeadPos(cycPath, cycTime, elapsed);
                            var bStr = getBeadPos(strPath, strTime, elapsed);
                            var bPar = getBeadPos(parPath, parTime, elapsed);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(bCyc.x, bCyc.y, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(bStr.x, bStr.y, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.arc(bPar.x, bPar.y, 7, 0, Math.PI * 2); ctx.fill();

                            // Legend and times
                            var lx = 60, ly = viz.height - 60;
                            ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Cycloid: ' + cycTime.toFixed(3) + 's', lx, ly);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Straight: ' + strTime.toFixed(3) + 's', lx + 160, ly);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Parabola: ' + parTime.toFixed(3) + 's', lx + 330, ly);

                            if (elapsed >= maxTime) running = false;
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the brachistochrone integrand \\(F = \\sqrt{(1+(y\')^2)/(2gx)}\\) satisfies \\(\\partial F/\\partial y = 0\\), and hence the E-L equation reduces to \\(\\partial F/\\partial y\' = C\\).',
                    hint: '\\(F\\) depends only on \\(x\\) and \\(y\'\\), not on \\(y\\) itself.',
                    solution: 'Since \\(F = \\sqrt{(1+(y\')^2)/(2gx)}\\) contains no \\(y\\) (only \\(x\\) and \\(y\'\\)), we have \\(\\partial F/\\partial y = 0\\). The E-L equation \\(\\partial F/\\partial y - \\frac{d}{dx}(\\partial F/\\partial y\') = 0\\) then gives \\(\\frac{d}{dx}(\\partial F/\\partial y\') = 0\\), so \\(\\partial F/\\partial y\' = C\\). This yields \\(\\frac{y\'}{\\sqrt{2gx(1+(y\')^2)}} = C\\), which after algebra leads to the cycloid parametrization.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Lagrangian Mechanics
        // ================================================================
        {
            id: 'sec-lagrangian',
            title: 'Lagrangian Mechanics',
            content: `
<h2>Lagrangian Mechanics</h2>

<div class="env-block intuition">
    <div class="env-title">Why Reformulate Mechanics?</div>
    <div class="env-body">
        <p>Newton's \\(\\mathbf{F} = m\\mathbf{a}\\) works beautifully for a single particle in Cartesian coordinates. But what about a pendulum? A bead on a rotating hoop? A double pendulum? With constraints, it becomes painful to track all the forces (including constraint forces that do no work). Lagrange's reformulation eliminates constraint forces entirely: choose coordinates that respect the constraints, form the Lagrangian, and the equations of motion follow from a single variational principle.</p>
    </div>
</div>

<h3>The Action Principle</h3>

<div class="env-block definition">
    <div class="env-title">Definition 16.2 (Lagrangian and Action)</div>
    <div class="env-body">
        <p>For a mechanical system with generalized coordinates \\(q_1, \\ldots, q_n\\), the <strong>Lagrangian</strong> is</p>
        \\[
        L(q, \\dot{q}, t) = T - V,
        \\]
        <p>where \\(T\\) is the kinetic energy and \\(V\\) the potential energy. The <strong>action</strong> is</p>
        \\[
        S[q] = \\int_{t_1}^{t_2} L(q, \\dot{q}, t)\\, dt.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.3 (Hamilton's Principle)</div>
    <div class="env-body">
        <p>The physical trajectory \\(q(t)\\) between fixed endpoints \\(q(t_1)\\) and \\(q(t_2)\\) is the one for which the action \\(S[q]\\) is stationary:</p>
        \\[
        \\delta S = 0.
        \\]
        <p>The resulting Euler-Lagrange equations are the <strong>Lagrange equations of motion</strong>:</p>
        \\[
        \\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}_i} - \\frac{\\partial L}{\\partial q_i} = 0, \\quad i = 1, \\ldots, n.
        \\]
    </div>
</div>

<h3>Example: The Simple Pendulum</h3>

<div class="env-block example">
    <div class="env-title">Example: Simple Pendulum via Lagrangian</div>
    <div class="env-body">
        <p>A mass \\(m\\) on a rigid rod of length \\(\\ell\\). The single generalized coordinate is \\(\\theta\\). The velocity is \\(v = \\ell\\dot{\\theta}\\), so \\(T = \\frac{1}{2}m\\ell^2\\dot{\\theta}^2\\). Taking the potential zero at the pivot, \\(V = -mg\\ell\\cos\\theta\\). Thus</p>
        \\[
        L = \\frac{1}{2}m\\ell^2\\dot{\\theta}^2 + mg\\ell\\cos\\theta.
        \\]
        <p>The E-L equation:</p>
        \\[
        m\\ell^2\\ddot{\\theta} + mg\\ell\\sin\\theta = 0 \\quad \\Rightarrow \\quad \\ddot{\\theta} = -\\frac{g}{\\ell}\\sin\\theta.
        \\]
        <p>No constraint forces appear. We never needed to think about tension in the rod.</p>
    </div>
</div>

<h3>The Double Pendulum</h3>

<p>The double pendulum, two rigid links pivoting under gravity, is the prototypical example of <strong>deterministic chaos</strong> in classical mechanics. With generalized coordinates \\((\\theta_1, \\theta_2)\\), the Lagrangian is:</p>
\\[
L = \\frac{1}{2}(m_1+m_2)\\ell_1^2\\dot{\\theta}_1^2 + \\frac{1}{2}m_2\\ell_2^2\\dot{\\theta}_2^2 + m_2\\ell_1\\ell_2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1-\\theta_2)
\\]
\\[
\\quad + (m_1+m_2)g\\ell_1\\cos\\theta_1 + m_2 g\\ell_2\\cos\\theta_2.
\\]

<p>Try deriving this from \\(T = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2\\) and the position vectors. The resulting E-L equations are coupled, nonlinear, and exhibit sensitive dependence on initial conditions: tiny changes in \\((\\theta_1(0), \\theta_2(0))\\) lead to wildly different trajectories.</p>

<div class="viz-placeholder" data-viz="viz-lagrangian"></div>
`,
            visualizations: [
                {
                    id: 'viz-lagrangian',
                    title: 'Double Pendulum: Chaos from a Lagrangian',
                    description: 'The double pendulum is integrated numerically from the Lagrangian equations. Watch the chaotic motion unfold. Press Reset to try different initial conditions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 100, scale: 1
                        });

                        var m1 = 1, m2 = 1, l1 = 90, l2 = 90, grav = 1.5;
                        var th1, th2, w1, w2;
                        var trail = [];
                        var maxTrail = 800;

                        function reset() {
                            th1 = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
                            th2 = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
                            w1 = 0; w2 = 0;
                            trail = [];
                        }
                        reset();

                        VizEngine.createButton(controls, 'Reset', reset);

                        function derivatives(th1, th2, w1, w2) {
                            var dth = th1 - th2;
                            var den = 2 * m1 + m2 - m2 * Math.cos(2 * dth);
                            var a1 = (-grav * (2 * m1 + m2) * Math.sin(th1) - m2 * grav * Math.sin(th1 - 2 * th2) - 2 * Math.sin(dth) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(dth))) / (l1 * den);
                            var a2 = (2 * Math.sin(dth) * (w1 * w1 * l1 * (m1 + m2) + grav * (m1 + m2) * Math.cos(th1) + w2 * w2 * l2 * m2 * Math.cos(dth))) / (l2 * den);
                            return [w1, w2, a1, a2];
                        }

                        function step(dt) {
                            // RK4
                            var k1 = derivatives(th1, th2, w1, w2);
                            var k2 = derivatives(th1 + dt/2*k1[0], th2 + dt/2*k1[1], w1 + dt/2*k1[2], w2 + dt/2*k1[3]);
                            var k3 = derivatives(th1 + dt/2*k2[0], th2 + dt/2*k2[1], w1 + dt/2*k2[2], w2 + dt/2*k2[3]);
                            var k4 = derivatives(th1 + dt*k3[0], th2 + dt*k3[1], w1 + dt*k3[2], w2 + dt*k3[3]);
                            th1 += dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]);
                            th2 += dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]);
                            w1  += dt/6*(k1[2]+2*k2[2]+2*k3[2]+k4[2]);
                            w2  += dt/6*(k1[3]+2*k2[3]+2*k3[3]+k4[3]);
                        }

                        function draw() {
                            for (var s = 0; s < 8; s++) step(0.15);

                            viz.clear();
                            var ctx = viz.ctx;
                            var ox = viz.originX, oy = viz.originY;

                            // Positions
                            var x1 = ox + l1 * Math.sin(th1);
                            var y1 = oy + l1 * Math.cos(th1);
                            var x2 = x1 + l2 * Math.sin(th2);
                            var y2 = y1 + l2 * Math.cos(th2);

                            trail.push({x: x2, y: y2});
                            if (trail.length > maxTrail) trail.shift();

                            // Trail
                            for (var i = 1; i < trail.length; i++) {
                                var alpha = (i / trail.length * 0.7).toFixed(2);
                                ctx.strokeStyle = 'rgba(88,166,255,' + alpha + ')';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(trail[i-1].x, trail[i-1].y);
                                ctx.lineTo(trail[i].x, trail[i].y);
                                ctx.stroke();
                            }

                            // Rods
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(x1, y1); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

                            // Pivot
                            ctx.fillStyle = viz.colors.text;
                            ctx.beginPath(); ctx.arc(ox, oy, 4, 0, Math.PI * 2); ctx.fill();

                            // Masses
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(x1, y1, 10, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(x2, y2, 10, 0, Math.PI * 2); ctx.fill();

                            // Labels
                            viz.screenText('Double Pendulum (Lagrangian Mechanics)', viz.width / 2, viz.height - 20, viz.colors.text, 12);
                            viz.screenText('\u03b8\u2081 = ' + (th1 * 180 / Math.PI % 360).toFixed(1) + '\u00b0', 80, viz.height - 40, viz.colors.teal, 11, 'left');
                            viz.screenText('\u03b8\u2082 = ' + (th2 * 180 / Math.PI % 360).toFixed(1) + '\u00b0', 80, viz.height - 55, viz.colors.orange, 11, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bead of mass \\(m\\) slides without friction on a parabolic wire \\(y = ax^2\\) under gravity. Using \\(x\\) as the generalized coordinate, find the Lagrangian and derive the equation of motion.',
                    hint: 'The velocity is \\(v^2 = \\dot{x}^2 + \\dot{y}^2 = \\dot{x}^2(1 + 4a^2x^2)\\). The potential energy is \\(V = mgax^2\\).',
                    solution: 'We have \\(y = ax^2\\), so \\(\\dot{y} = 2ax\\dot{x}\\) and \\(v^2 = \\dot{x}^2(1+4a^2x^2)\\). Thus \\(T = \\frac{m}{2}(1+4a^2x^2)\\dot{x}^2\\) and \\(V = mgax^2\\). The Lagrangian is \\(L = \\frac{m}{2}(1+4a^2x^2)\\dot{x}^2 - mgax^2\\). The E-L equation gives \\(\\frac{d}{dt}[m(1+4a^2x^2)\\dot{x}] - 4ma^2x\\dot{x}^2 + 2mgax = 0\\), which simplifies to \\((1+4a^2x^2)\\ddot{x} + 4a^2x\\dot{x}^2 + 2gax = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Hamiltonian Mechanics
        // ================================================================
        {
            id: 'sec-hamiltonian',
            title: 'Hamiltonian Mechanics',
            content: `
<h2>Hamiltonian Mechanics</h2>

<div class="env-block intuition">
    <div class="env-title">From Velocities to Momenta</div>
    <div class="env-body">
        <p>Lagrangian mechanics uses coordinates and velocities \\((q, \\dot{q})\\). Hamilton's reformulation trades velocities for momenta \\((q, p)\\), turning \\(n\\) second-order equations into \\(2n\\) first-order equations. This is not just a formal trick: it reveals the geometric structure of mechanics (symplectic geometry) and directly connects to quantum mechanics, statistical mechanics, and modern mathematics.</p>
    </div>
</div>

<h3>The Legendre Transform</h3>

<div class="env-block definition">
    <div class="env-title">Definition 16.3 (Conjugate Momentum and Hamiltonian)</div>
    <div class="env-body">
        <p>Given a Lagrangian \\(L(q, \\dot{q}, t)\\), the <strong>conjugate momentum</strong> is</p>
        \\[
        p_i = \\frac{\\partial L}{\\partial \\dot{q}_i}.
        \\]
        <p>The <strong>Hamiltonian</strong> is defined by the Legendre transform:</p>
        \\[
        H(q, p, t) = \\sum_i p_i \\dot{q}_i - L(q, \\dot{q}, t),
        \\]
        <p>where \\(\\dot{q}\\) is expressed in terms of \\((q, p)\\) by inverting the momentum relation.</p>
    </div>
</div>

<p>For systems where \\(T\\) is a quadratic function of \\(\\dot{q}\\) and \\(V\\) depends only on \\(q\\), the Hamiltonian equals the total energy: \\(H = T + V\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.4 (Hamilton's Equations)</div>
    <div class="env-body">
        <p>The equations of motion in Hamiltonian form are</p>
        \\[
        \\dot{q}_i = \\frac{\\partial H}{\\partial p_i}, \\qquad \\dot{p}_i = -\\frac{\\partial H}{\\partial q_i}.
        \\]
        <p>These are \\(2n\\) first-order ODEs, symmetric in a sense: \\(q\\) and \\(p\\) play dual roles.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Harmonic Oscillator</div>
    <div class="env-body">
        <p>With \\(L = \\frac{1}{2}m\\dot{q}^2 - \\frac{1}{2}kq^2\\), we get \\(p = m\\dot{q}\\), so \\(\\dot{q} = p/m\\), and</p>
        \\[
        H = \\frac{p^2}{2m} + \\frac{1}{2}kq^2.
        \\]
        <p>Hamilton's equations: \\(\\dot{q} = p/m\\), \\(\\dot{p} = -kq\\). Phase space trajectories are ellipses \\(p^2/(2mE) + kq^2/(2E) = 1\\).</p>
    </div>
</div>

<h3>Phase Space and Liouville's Theorem</h3>

<p>The state of a Hamiltonian system is a point \\((q, p)\\) in <strong>phase space</strong>. As the system evolves, this point traces a trajectory. A collection of systems with different initial conditions fills a region of phase space.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.5 (Liouville's Theorem)</div>
    <div class="env-body">
        <p>Hamiltonian flow preserves phase-space volume. If a set of initial conditions occupies volume \\(\\Omega\\) in phase space, the evolved set at any later time occupies the same volume \\(\\Omega\\). Formally,</p>
        \\[
        \\frac{\\partial \\dot{q}_i}{\\partial q_i} + \\frac{\\partial \\dot{p}_i}{\\partial p_i} = \\frac{\\partial^2 H}{\\partial q_i \\partial p_i} - \\frac{\\partial^2 H}{\\partial p_i \\partial q_i} = 0.
        \\]
        <p>The phase-space "fluid" is incompressible.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-hamiltonian-flow"></div>
`,
            visualizations: [
                {
                    id: 'viz-hamiltonian-flow',
                    title: 'Phase Space Flow and Liouville\'s Theorem',
                    description: 'Phase space of a nonlinear pendulum \\(H = p^2/2 - \\cos q\\). A cloud of initial conditions evolves under Hamilton\'s equations. The cloud deforms but its area is preserved (Liouville). The red contours are constant-energy curves.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 40
                        });

                        var particles = [];
                        var nParticles = 200;
                        var time = 0;

                        function resetParticles() {
                            particles = [];
                            time = 0;
                            // Cluster of initial conditions
                            var q0 = 1.0, p0 = 0.5;
                            for (var i = 0; i < nParticles; i++) {
                                var angle = Math.random() * Math.PI * 2;
                                var r = Math.sqrt(Math.random()) * 0.4;
                                particles.push({
                                    q: q0 + r * Math.cos(angle),
                                    p: p0 + r * Math.sin(angle)
                                });
                            }
                        }
                        resetParticles();

                        VizEngine.createButton(controls, 'Reset', resetParticles);

                        // H = p^2/2 - cos(q) (pendulum with m=1, g=1, l=1)
                        function stepParticle(pt, dt) {
                            // Symplectic Euler (leapfrog)
                            pt.p -= Math.sin(pt.q) * dt;  // dp/dt = -dH/dq = -sin(q)
                            pt.q += pt.p * dt;             // dq/dt = dH/dp = p
                        }

                        function draw() {
                            // Step
                            for (var s = 0; s < 4; s++) {
                                for (var i = 0; i < particles.length; i++) {
                                    stepParticle(particles[i], 0.02);
                                }
                                time += 0.02;
                            }

                            viz.clear();
                            var ctx = viz.ctx;

                            // Grid and axes
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('q', viz.width - 15, viz.originY - 10, viz.colors.text, 12);
                            viz.screenText('p', viz.originX + 12, 15, viz.colors.text, 12);

                            // Energy contours
                            // H = p^2/2 - cos(q), so p = +-sqrt(2(E + cos(q)))
                            var energies = [-0.5, 0, 0.5, 1.0, 1.5, 2.5];
                            for (var ei = 0; ei < energies.length; ei++) {
                                var E = energies[ei];
                                ctx.strokeStyle = viz.colors.red + '44'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var qi = -180; qi <= 180; qi++) {
                                    var q = qi * Math.PI / 180;
                                    var val = 2 * (E + Math.cos(q));
                                    if (val < 0) { started = false; continue; }
                                    var p = Math.sqrt(val);
                                    var sx = viz.originX + q * viz.scale;
                                    var sy = viz.originY - p * viz.scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                }
                                ctx.stroke();
                                ctx.beginPath(); started = false;
                                for (var qj = -180; qj <= 180; qj++) {
                                    var q2 = qj * Math.PI / 180;
                                    var val2 = 2 * (E + Math.cos(q2));
                                    if (val2 < 0) { started = false; continue; }
                                    var p2 = -Math.sqrt(val2);
                                    var sx2 = viz.originX + q2 * viz.scale;
                                    var sy2 = viz.originY - p2 * viz.scale;
                                    if (!started) { ctx.moveTo(sx2, sy2); started = true; } else { ctx.lineTo(sx2, sy2); }
                                }
                                ctx.stroke();
                            }

                            // Separatrix (E = 1, the boundary between libration and rotation)
                            ctx.strokeStyle = viz.colors.yellow + '88'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var sepStarted = false;
                            for (var qs = -180; qs <= 180; qs++) {
                                var qv = qs * Math.PI / 180;
                                var valS = 2 * (1 + Math.cos(qv));
                                if (valS < 0) { sepStarted = false; continue; }
                                var pS = Math.sqrt(valS);
                                var sxS = viz.originX + qv * viz.scale;
                                var syS = viz.originY - pS * viz.scale;
                                if (!sepStarted) { ctx.moveTo(sxS, syS); sepStarted = true; } else { ctx.lineTo(sxS, syS); }
                            }
                            ctx.stroke();
                            ctx.beginPath(); sepStarted = false;
                            for (var qt = -180; qt <= 180; qt++) {
                                var qv2 = qt * Math.PI / 180;
                                var valS2 = 2 * (1 + Math.cos(qv2));
                                if (valS2 < 0) { sepStarted = false; continue; }
                                var pS2 = -Math.sqrt(valS2);
                                var sxS2 = viz.originX + qv2 * viz.scale;
                                var syS2 = viz.originY - pS2 * viz.scale;
                                if (!sepStarted) { ctx.moveTo(sxS2, syS2); sepStarted = true; } else { ctx.lineTo(sxS2, syS2); }
                            }
                            ctx.stroke();

                            // Particles
                            for (var pi = 0; pi < particles.length; pi++) {
                                var pt = particles[pi];
                                var pq = pt.q;
                                // Wrap q into [-pi, pi] for display
                                while (pq > Math.PI) pq -= 2 * Math.PI;
                                while (pq < -Math.PI) pq += 2 * Math.PI;
                                var psx = viz.originX + pq * viz.scale;
                                var psy = viz.originY - pt.p * viz.scale;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(psx - 1.5, psy - 1.5, 3, 3);
                            }

                            // Info
                            viz.screenText('H = p\u00b2/2 \u2212 cos q  (pendulum phase space)', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                            viz.screenText('t = ' + time.toFixed(1), viz.width - 50, 20, viz.colors.white, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Starting from \\(L = \\frac{1}{2}m\\ell^2\\dot{\\theta}^2 + mg\\ell\\cos\\theta\\) for the pendulum, perform the Legendre transform to obtain \\(H\\) and write Hamilton\'s equations.',
                    hint: 'The conjugate momentum is \\(p_\\theta = \\partial L/\\partial \\dot{\\theta} = m\\ell^2\\dot{\\theta}\\), so \\(\\dot{\\theta} = p_\\theta/(m\\ell^2)\\).',
                    solution: 'We have \\(p_\\theta = m\\ell^2\\dot{\\theta}\\). The Hamiltonian is \\(H = p_\\theta\\dot{\\theta} - L = p_\\theta^2/(m\\ell^2) - \\frac{1}{2}p_\\theta^2/(m\\ell^2) - mg\\ell\\cos\\theta = \\frac{p_\\theta^2}{2m\\ell^2} - mg\\ell\\cos\\theta\\). Hamilton\'s equations: \\(\\dot{\\theta} = \\partial H/\\partial p_\\theta = p_\\theta/(m\\ell^2)\\), \\(\\dot{p}_\\theta = -\\partial H/\\partial \\theta = -mg\\ell\\sin\\theta\\).'
                },
                {
                    question: 'Prove Liouville\'s theorem for a general Hamiltonian \\(H(q,p)\\): the phase-space divergence of the Hamiltonian vector field vanishes.',
                    hint: 'The Hamiltonian vector field is \\((\\dot{q}, \\dot{p}) = (\\partial H/\\partial p, -\\partial H/\\partial q)\\). Compute \\(\\nabla \\cdot (\\dot{q}, \\dot{p})\\).',
                    solution: 'The divergence is \\(\\frac{\\partial \\dot{q}}{\\partial q} + \\frac{\\partial \\dot{p}}{\\partial p} = \\frac{\\partial^2 H}{\\partial q \\partial p} - \\frac{\\partial^2 H}{\\partial p \\partial q} = 0\\) by equality of mixed partials. Hence the flow is divergence-free and preserves phase-space volume.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Constraints & Lagrange Multipliers
        // ================================================================
        {
            id: 'sec-constraints',
            title: 'Constraints & Lagrange Multipliers',
            content: `
<h2>Constraints and Lagrange Multipliers</h2>

<div class="env-block intuition">
    <div class="env-title">Optimization with Side Conditions</div>
    <div class="env-body">
        <p>Often we want to extremize a functional subject to a constraint. For instance: among all closed curves of a given perimeter, which one encloses the most area? This is the famous <strong>isoperimetric problem</strong>. The method of Lagrange multipliers extends naturally from finite-dimensional optimization to the calculus of variations.</p>
    </div>
</div>

<h3>Constrained Variational Problems</h3>

<p>Suppose we want to extremize</p>
\\[
J[y] = \\int_a^b F(x, y, y')\\, dx
\\]
<p>subject to an <strong>integral constraint</strong> (isoperimetric condition):</p>
\\[
K[y] = \\int_a^b G(x, y, y')\\, dx = \\ell \\quad (\\text{given constant}).
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 16.6 (Isoperimetric Euler-Lagrange)</div>
    <div class="env-body">
        <p>The constrained extremal satisfies the Euler-Lagrange equation for the augmented integrand</p>
        \\[
        \\hat{F} = F + \\lambda\\, G,
        \\]
        <p>where \\(\\lambda\\) is a <strong>Lagrange multiplier</strong> determined by the constraint \\(K[y] = \\ell\\). That is:</p>
        \\[
        \\frac{\\partial \\hat{F}}{\\partial y} - \\frac{d}{dx}\\frac{\\partial \\hat{F}}{\\partial y'} = 0.
        \\]
    </div>
</div>

<h3>The Isoperimetric Problem</h3>

<div class="env-block example">
    <div class="env-title">Example: Maximum Area for Fixed Perimeter</div>
    <div class="env-body">
        <p>Among all simple closed curves of perimeter \\(P\\), which encloses the maximum area?</p>
        <p>Parametrize by arc length: \\((x(s), y(s))\\) with \\(0 \\le s \\le P\\). The area (by Green's theorem) is</p>
        \\[
        A = \\frac{1}{2}\\oint (x\\, dy - y\\, dx).
        \\]
        <p>The constraint is \\(x'^2 + y'^2 = 1\\) (arc-length parametrization). The Euler-Lagrange equations with Lagrange multiplier \\(\\lambda\\) yield \\(x'' = -\\lambda y'\\), \\(y'' = \\lambda x'\\), whose solution is</p>
        \\[
        x(s) = R\\cos(s/R), \\quad y(s) = R\\sin(s/R), \\quad R = P/(2\\pi).
        \\]
        <p>This is a <strong>circle</strong>. The circle maximizes area for a given perimeter.</p>
    </div>
</div>

<h3>Holonomic Constraints in Mechanics</h3>

<p>In mechanics, <strong>holonomic constraints</strong> are of the form \\(g(q_1, \\ldots, q_n, t) = 0\\). They restrict the configuration space to a lower-dimensional manifold. The method of Lagrange multipliers in mechanics modifies the E-L equations to</p>
\\[
\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}_i} - \\frac{\\partial L}{\\partial q_i} = \\lambda \\frac{\\partial g}{\\partial q_i},
\\]
<p>where the right-hand side represents the <strong>constraint force</strong>. The multiplier \\(\\lambda\\) gives the magnitude of the constraint force, something Lagrangian mechanics usually eliminates but sometimes we need.</p>

<div class="viz-placeholder" data-viz="viz-isoperimetric"></div>

<div class="viz-placeholder" data-viz="viz-geodesic-sphere"></div>
`,
            visualizations: [
                {
                    id: 'viz-isoperimetric',
                    title: 'Isoperimetric Problem: Maximum Area for Fixed Perimeter',
                    description: 'Drag the control points to reshape the closed curve while keeping its perimeter approximately constant. The circle (shown in blue) always achieves the maximum area for that perimeter.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 40
                        });

                        // The optimal circle
                        var perim = 4 * Math.PI; // perimeter = 4pi, so R = 2
                        var R = perim / (2 * Math.PI);
                        var circleArea = Math.PI * R * R;

                        // Deformable shape: N control points on a closed curve
                        var N = 12;
                        var angles = [];
                        var radii = [];
                        for (var i = 0; i < N; i++) {
                            angles.push(2 * Math.PI * i / N);
                            radii.push(R);
                        }

                        var nSides = 1; // deformation mode
                        VizEngine.createSlider(controls, 'Deformation', 0, 2, 0, 0.05, function(v) {
                            var def = v;
                            for (var i = 0; i < N; i++) {
                                var th = angles[i];
                                radii[i] = R * (1 + def * 0.3 * Math.cos(2 * th) - def * 0.15 * Math.cos(3 * th));
                            }
                        });

                        function getPoints() {
                            var pts = [];
                            // Smooth interpolation around the loop
                            var nSmooth = 200;
                            for (var i = 0; i < nSmooth; i++) {
                                var t = 2 * Math.PI * i / nSmooth;
                                // Interpolate radius using cubic
                                var idx = t / (2 * Math.PI) * N;
                                var i0 = Math.floor(idx) % N;
                                var i1 = (i0 + 1) % N;
                                var frac = idx - Math.floor(idx);
                                var r = radii[i0] * (1 - frac) + radii[i1] * frac;
                                pts.push({ x: r * Math.cos(t), y: r * Math.sin(t) });
                            }
                            return pts;
                        }

                        function computePerimeter(pts) {
                            var p = 0;
                            for (var i = 0; i < pts.length; i++) {
                                var j = (i + 1) % pts.length;
                                var dx = pts[j].x - pts[i].x;
                                var dy = pts[j].y - pts[i].y;
                                p += Math.sqrt(dx * dx + dy * dy);
                            }
                            return p;
                        }

                        function computeArea(pts) {
                            var a = 0;
                            for (var i = 0; i < pts.length; i++) {
                                var j = (i + 1) % pts.length;
                                a += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
                            }
                            return Math.abs(a) / 2;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Grid
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Circle (optimal)
                            viz.drawCircle(0, 0, R, null, viz.colors.blue + '66', 1.5);

                            // Deformed shape
                            var pts = getPoints();
                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                            ctx.fillStyle = viz.colors.green + '22';
                            ctx.beginPath();
                            for (var i = 0; i <= pts.length; i++) {
                                var p = pts[i % pts.length];
                                var sx = viz.originX + p.x * viz.scale;
                                var sy = viz.originY - p.y * viz.scale;
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Compute metrics
                            var P_curve = computePerimeter(pts);
                            var A_curve = computeArea(pts);

                            // For comparison, circle with same perimeter
                            var R_equiv = P_curve / (2 * Math.PI);
                            var A_circle = Math.PI * R_equiv * R_equiv;
                            var ratio = A_curve / A_circle;

                            // Info
                            var lx = 15, ly = 25;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Curve area: ' + A_curve.toFixed(2), lx, ly);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Circle area (same P): ' + A_circle.toFixed(2), lx, ly + 18);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Ratio A/A_circle = ' + ratio.toFixed(4), lx, ly + 36);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('Perimeter = ' + P_curve.toFixed(2), lx, ly + 54);
                            ctx.fillText('Isoperimetric inequality: A \u2264 P\u00b2/(4\u03c0)', lx, ly + 68);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-geodesic-sphere',
                    title: 'Geodesics on a Sphere: Great Circles',
                    description: 'The shortest path between two points on a sphere is a great circle arc, the variational solution on a curved surface. Drag the endpoints to see different great circles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 1
                        });

                        var R = 140; // sphere radius in pixels
                        // Two points in spherical coords (theta, phi)
                        var th1 = 0.8, ph1 = -0.6;
                        var th2 = 1.8, ph2 = 0.9;

                        VizEngine.createSlider(controls, '\u03b8\u2081', 0.2, 2.9, th1, 0.05, function(v) { th1 = v; });
                        VizEngine.createSlider(controls, '\u03b8\u2082', 0.2, 2.9, th2, 0.05, function(v) { th2 = v; });
                        VizEngine.createSlider(controls, '\u03c6\u2081', -3.1, 3.1, ph1, 0.1, function(v) { ph1 = v; });
                        VizEngine.createSlider(controls, '\u03c6\u2082', -3.1, 3.1, ph2, 0.1, function(v) { ph2 = v; });

                        function sphereToCart(theta, phi) {
                            return {
                                x: Math.sin(theta) * Math.cos(phi),
                                y: Math.sin(theta) * Math.sin(phi),
                                z: Math.cos(theta)
                            };
                        }

                        // Simple oblique projection
                        var tiltX = 0.35, tiltZ = -0.4;
                        function project(p) {
                            // Rotate around x-axis
                            var y1 = p.y * Math.cos(tiltX) - p.z * Math.sin(tiltX);
                            var z1 = p.y * Math.sin(tiltX) + p.z * Math.cos(tiltX);
                            // Rotate around z-axis
                            var x2 = p.x * Math.cos(tiltZ) - y1 * Math.sin(tiltZ);
                            var y2 = p.x * Math.sin(tiltZ) + y1 * Math.cos(tiltZ);
                            return { x: x2 * R + viz.originX, y: -z1 * R + viz.originY, depth: y2 };
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw wireframe sphere
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            // Latitude lines
                            for (var lat = 1; lat < 6; lat++) {
                                var theta = lat * Math.PI / 6;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 100; i++) {
                                    var phi = 2 * Math.PI * i / 100;
                                    var pt = project(sphereToCart(theta, phi));
                                    if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
                                    else ctx.lineTo(pt.x, pt.y);
                                }
                                ctx.stroke();
                            }
                            // Longitude lines
                            for (var lon = 0; lon < 12; lon++) {
                                var phi = 2 * Math.PI * lon / 12;
                                ctx.beginPath();
                                var started2 = false;
                                for (var j = 0; j <= 100; j++) {
                                    var theta2 = Math.PI * j / 100;
                                    var pt2 = project(sphereToCart(theta2, phi));
                                    if (!started2) { ctx.moveTo(pt2.x, pt2.y); started2 = true; }
                                    else ctx.lineTo(pt2.x, pt2.y);
                                }
                                ctx.stroke();
                            }

                            // Great circle through the two points
                            var p1 = sphereToCart(th1, ph1);
                            var p2 = sphereToCart(th2, ph2);
                            // Normal to plane: n = p1 x p2
                            var nx = p1.y * p2.z - p1.z * p2.y;
                            var ny = p1.z * p2.x - p1.x * p2.z;
                            var nz = p1.x * p2.y - p1.y * p2.x;
                            var nLen = Math.sqrt(nx*nx + ny*ny + nz*nz);
                            if (nLen < 1e-10) nLen = 1e-10;
                            nx /= nLen; ny /= nLen; nz /= nLen;

                            // Two orthonormal vectors in the plane of the great circle
                            var e1 = { x: p1.x, y: p1.y, z: p1.z };
                            // e2 = n x e1
                            var e2 = {
                                x: ny * e1.z - nz * e1.y,
                                y: nz * e1.x - nx * e1.z,
                                z: nx * e1.y - ny * e1.x
                            };

                            // Full great circle
                            ctx.strokeStyle = viz.colors.blue + '55'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var gcStarted = false;
                            for (var gi = 0; gi <= 200; gi++) {
                                var ang = 2 * Math.PI * gi / 200;
                                var gpt = {
                                    x: Math.cos(ang) * e1.x + Math.sin(ang) * e2.x,
                                    y: Math.cos(ang) * e1.y + Math.sin(ang) * e2.y,
                                    z: Math.cos(ang) * e1.z + Math.sin(ang) * e2.z
                                };
                                var gp = project(gpt);
                                if (!gcStarted) { ctx.moveTo(gp.x, gp.y); gcStarted = true; }
                                else ctx.lineTo(gp.x, gp.y);
                            }
                            ctx.stroke();

                            // Geodesic arc between the two points (short arc)
                            var dot12 = p1.x*p2.x + p1.y*p2.y + p1.z*p2.z;
                            var angle12 = Math.acos(Math.max(-1, Math.min(1, dot12)));
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                            ctx.beginPath();
                            var arcStarted = false;
                            for (var ai = 0; ai <= 100; ai++) {
                                var t = ai / 100;
                                var a = angle12;
                                if (Math.abs(Math.sin(a)) < 1e-10) break;
                                var w1 = Math.sin((1 - t) * a) / Math.sin(a);
                                var w2 = Math.sin(t * a) / Math.sin(a);
                                var apt = {
                                    x: w1 * p1.x + w2 * p2.x,
                                    y: w1 * p1.y + w2 * p2.y,
                                    z: w1 * p1.z + w2 * p2.z
                                };
                                var ap = project(apt);
                                if (!arcStarted) { ctx.moveTo(ap.x, ap.y); arcStarted = true; }
                                else ctx.lineTo(ap.x, ap.y);
                            }
                            ctx.stroke();

                            // Points
                            var pp1 = project(p1);
                            var pp2 = project(p2);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(pp1.x, pp1.y, 6, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(pp2.x, pp2.y, 6, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('P\u2081', pp1.x + 10, pp1.y - 10, viz.colors.orange, 12, 'left');
                            viz.screenText('P\u2082', pp2.x + 10, pp2.y - 10, viz.colors.green, 12, 'left');

                            // Arc length
                            var arcLen = angle12;
                            viz.screenText('Geodesic (great circle arc)', viz.width / 2, viz.height - 30, viz.colors.teal, 12);
                            viz.screenText('Arc length = ' + arcLen.toFixed(3) + ' rad = ' + (arcLen * 180 / Math.PI).toFixed(1) + '\u00b0', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the method of Lagrange multipliers to find the curve \\(y(x)\\) that extremizes \\(\\int_0^1 y\\, dx\\) subject to \\(\\int_0^1 \\sqrt{1+(y\')^2}\\, dx = L\\) (fixed arc length) and \\(y(0) = y(1) = 0\\). What shape emerges?',
                    hint: 'Form \\(\\hat{F} = y + \\lambda\\sqrt{1+(y\')^2}\\). The E-L equation with the Beltrami identity (since \\(\\hat{F}\\) has no explicit \\(x\\)-dependence) simplifies things.',
                    solution: 'The augmented integrand is \\(\\hat{F} = y + \\lambda\\sqrt{1+(y\')^2}\\). Since \\(\\hat{F}\\) has no explicit \\(x\\), the Beltrami identity gives \\(\\hat{F} - y\'\\hat{F}_{y\'} = C\\). This yields \\(y + \\lambda/\\sqrt{1+(y\')^2} = C\\). After rearranging and integrating, the solution is a circular arc: \\((x-a)^2 + (y-b)^2 = \\lambda^2\\), with \\(a, b, \\lambda\\) determined by boundary conditions and the length constraint. A circular arc is a piece of a circle, consistent with the isoperimetric inequality.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to PDEs
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: From Variational Calculus to PDEs</h2>

<div class="env-block intuition">
    <div class="env-title">The Variational Principle as a Unifying Theme</div>
    <div class="env-body">
        <p>We have seen the calculus of variations applied to curves and particle mechanics. But the same ideas extend to fields: functions of multiple variables. The Euler-Lagrange equation for fields becomes a partial differential equation, and Hamilton's principle becomes the foundation for all of modern field theory.</p>
    </div>
</div>

<h3>Functionals of Multiple Variables</h3>

<p>When the unknown is a function of two or more variables, \\(u(x_1, \\ldots, x_n)\\), the action becomes a multiple integral:</p>
\\[
J[u] = \\int_{\\Omega} F(x_1, \\ldots, x_n, u, u_{x_1}, \\ldots, u_{x_n})\\, dV.
\\]

<p>The Euler-Lagrange equation generalizes to:</p>
\\[
\\frac{\\partial F}{\\partial u} - \\sum_{i=1}^n \\frac{\\partial}{\\partial x_i}\\frac{\\partial F}{\\partial u_{x_i}} = 0.
\\]

<div class="env-block example">
    <div class="env-title">Example: Laplace's Equation from a Variational Principle</div>
    <div class="env-body">
        <p>The <strong>Dirichlet functional</strong></p>
        \\[
        D[u] = \\int_{\\Omega} |\\nabla u|^2\\, dV = \\int_{\\Omega} \\sum_i \\left(\\frac{\\partial u}{\\partial x_i}\\right)^2 dV
        \\]
        <p>has the Euler-Lagrange equation \\(\\nabla^2 u = 0\\), which is <strong>Laplace's equation</strong>. So the harmonic function (solution to Laplace's equation) is the one that minimizes the "energy" functional \\(D[u]\\) among functions with prescribed boundary values. This is Dirichlet's principle.</p>
    </div>
</div>

<h3>From Particles to Fields</h3>

<p>In classical field theory (electromagnetism, general relativity, quantum field theory), the "path" being varied is a <strong>field configuration</strong> over spacetime. The action for a scalar field \\(\\phi(x,t)\\) takes the form</p>
\\[
S[\\phi] = \\int \\mathcal{L}(\\phi, \\partial_\\mu \\phi)\\, d^4x,
\\]
<p>and Hamilton's principle \\(\\delta S = 0\\) yields the field equations. For electromagnetism, it yields Maxwell's equations. For gravity, it yields Einstein's field equations (the Einstein-Hilbert action).</p>

<h3>Connections We Have Built</h3>

<table>
    <tr><th>Variational Problem</th><th>Euler-Lagrange Equation</th><th>Physical/Math Context</th></tr>
    <tr><td>Minimize arc length</td><td>\\(y'' = 0\\)</td><td>Straight line (geodesic in flat space)</td></tr>
    <tr><td>Minimize travel time</td><td>Cycloid ODE</td><td>Brachistochrone</td></tr>
    <tr><td>Stationarize action \\(\\int L\\,dt\\)</td><td>Lagrange equations</td><td>Classical mechanics</td></tr>
    <tr><td>Minimize Dirichlet energy</td><td>\\(\\nabla^2 u = 0\\)</td><td>Electrostatics, heat equilibrium</td></tr>
    <tr><td>Stationarize Einstein-Hilbert</td><td>\\(G_{\\mu\\nu} = 8\\pi T_{\\mu\\nu}\\)</td><td>General relativity</td></tr>
</table>

<h3>What Comes Next</h3>

<p>In <strong>Chapter 17</strong>, we study the partial differential equations of mathematical physics: Laplace, Poisson, the heat equation, and the wave equation. Many of these can be derived from variational principles, and the techniques of this chapter (conservation laws, symmetries, Lagrange multipliers) carry over to the PDE setting. The deep connection between symmetries and conservation laws (Noether's theorem) becomes a cornerstone of modern physics.</p>

<div class="env-block remark">
    <div class="env-title">Noether's Theorem (Preview)</div>
    <div class="env-body">
        <p>Every continuous symmetry of the action corresponds to a conserved quantity. Time translation symmetry gives energy conservation. Spatial translation gives momentum conservation. Rotational symmetry gives angular momentum conservation. This profound result, due to Emmy Noether (1918), is perhaps the deepest consequence of the variational formulation of physics.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Derive the Euler-Lagrange equation for the Dirichlet functional \\(D[u] = \\int_\\Omega |\\nabla u|^2\\, dV\\) in two dimensions, confirming that it yields Laplace\'s equation \\(\\nabla^2 u = 0\\).',
                    hint: 'Write \\(F = u_x^2 + u_y^2\\). Compute \\(\\partial F/\\partial u\\), \\(\\partial F/\\partial u_x\\), and \\(\\partial F/\\partial u_y\\), then apply the multi-variable E-L equation.',
                    solution: 'With \\(F = u_x^2 + u_y^2\\), we have \\(\\partial F/\\partial u = 0\\), \\(\\partial F/\\partial u_x = 2u_x\\), \\(\\partial F/\\partial u_y = 2u_y\\). The E-L equation is \\(0 - \\frac{\\partial}{\\partial x}(2u_x) - \\frac{\\partial}{\\partial y}(2u_y) = 0\\), i.e., \\(u_{xx} + u_{yy} = 0\\), which is \\(\\nabla^2 u = 0\\), Laplace\'s equation.'
                },
                {
                    question: 'The wave equation \\(u_{tt} - c^2 u_{xx} = 0\\) can be derived from the Lagrangian density \\(\\mathcal{L} = \\frac{1}{2}(u_t^2 - c^2 u_x^2)\\). Verify this using the field-theoretic Euler-Lagrange equation \\(\\frac{\\partial \\mathcal{L}}{\\partial u} - \\frac{\\partial}{\\partial t}\\frac{\\partial \\mathcal{L}}{\\partial u_t} - \\frac{\\partial}{\\partial x}\\frac{\\partial \\mathcal{L}}{\\partial u_x} = 0\\).',
                    hint: 'Direct computation: \\(\\partial\\mathcal{L}/\\partial u = 0\\), \\(\\partial\\mathcal{L}/\\partial u_t = u_t\\), \\(\\partial\\mathcal{L}/\\partial u_x = -c^2 u_x\\).',
                    solution: 'We have \\(\\partial\\mathcal{L}/\\partial u = 0\\), \\(\\partial\\mathcal{L}/\\partial u_t = u_t\\), \\(\\partial\\mathcal{L}/\\partial u_x = -c^2 u_x\\). The E-L equation gives \\(0 - \\frac{\\partial}{\\partial t}(u_t) - \\frac{\\partial}{\\partial x}(-c^2 u_x) = 0\\), i.e., \\(-u_{tt} + c^2 u_{xx} = 0\\), or \\(u_{tt} = c^2 u_{xx}\\), the wave equation.'
                }
            ]
        }
    ]
});
