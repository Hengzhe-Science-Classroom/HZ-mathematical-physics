// === Chapter 6: Complex Functions & Integration ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Complex Functions & Integration',
    subtitle: 'Complex analysis as the physicist\'s power tool',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Complex Analysis?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Complex Analysis?',
            content: `
<h2>Why Complex Analysis?</h2>

<div class="env-block intuition">
    <div class="env-title">The Physicist's Power Tool</div>
    <div class="env-body">
        <p>Complex analysis is arguably the most powerful single branch of mathematics for physics. It unifies results from electrostatics, fluid dynamics, quantum mechanics, and signal processing under a single elegant framework. A physicist who masters complex analysis gains calculational superpowers: integrals that look impossible over the real line yield in minutes to contour methods, and conformal mappings turn intractable boundary-value problems into trivial ones.</p>
    </div>
</div>

<h3>Complex Numbers: A Lightning Review</h3>

<p>A complex number \\(z = x + iy\\) pairs a real part \\(x = \\operatorname{Re}z\\) and an imaginary part \\(y = \\operatorname{Im}z\\), where \\(i^2 = -1\\). Euler's formula provides the polar representation:</p>

\\[
z = re^{i\\theta} = r(\\cos\\theta + i\\sin\\theta), \\qquad r = |z| = \\sqrt{x^2+y^2},\\quad \\theta = \\arg z = \\arctan(y/x).
\\]

<p>Multiplication in polar form is beautifully geometric: magnitudes multiply, arguments add.</p>

\\[
z_1 z_2 = r_1 r_2 \\, e^{i(\\theta_1 + \\theta_2)}.
\\]

<h3>Why \\(\\mathbb{C}\\) Is Natural for Physics</h3>

<p>Three fundamental reasons make complex numbers indispensable:</p>

<ol>
    <li><strong>Algebraic completeness.</strong> Every polynomial of degree \\(n\\) has exactly \\(n\\) roots in \\(\\mathbb{C}\\) (Fundamental Theorem of Algebra). No more "this equation has no solutions" caveats.</li>
    <li><strong>Oscillations and waves.</strong> The relation \\(e^{i\\omega t} = \\cos\\omega t + i\\sin\\omega t\\) lets us replace trigonometric identities with exponential algebra. AC circuit analysis, quantum mechanics (\\(\\psi \\sim e^{i(kx - \\omega t)}\\)), and Fourier analysis all depend on this.</li>
    <li><strong>2D physics.</strong> A complex number \\(z = x + iy\\) is a point in the plane. Complex-differentiable functions automatically satisfy Laplace's equation, linking complex analysis directly to electrostatics and fluid flow.</li>
</ol>

<div class="env-block definition">
    <div class="env-title">Definition (Complex Function)</div>
    <div class="env-body">
        <p>A <strong>complex function</strong> \\(f: \\mathbb{C} \\to \\mathbb{C}\\) maps \\(z = x + iy\\) to \\(w = f(z) = u(x,y) + iv(x,y)\\), where \\(u\\) and \\(v\\) are real-valued functions of two real variables.</p>
    </div>
</div>

<p>The central question of complex analysis is: what does it mean for \\(f\\) to be <em>differentiable</em> as a function of a complex variable, rather than merely as a map \\(\\mathbb{R}^2 \\to \\mathbb{R}^2\\)? The answer, as we shall see, imposes remarkably strong constraints that have no analogue in real analysis.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Complex analysis was developed in the 19th century by Cauchy, Riemann, and Weierstrass. Their three approaches (integral, geometric, and power-series) turned out to be equivalent, a deep fact that physicists exploit constantly: a function that is differentiable once is differentiable infinitely many times and equals its own Taylor series.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Analytic Functions
        // ================================================================
        {
            id: 'sec-analytic',
            title: 'Analytic Functions',
            content: `
<h2>Analytic Functions</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Constraint</div>
    <div class="env-body">
        <p>In real analysis, a function can be differentiable without being smooth (think of \\(|x|\\) at the origin, differentiable nowhere, or \\(x|x|\\), differentiable but not twice). In complex analysis, differentiable once implies differentiable infinitely many times, analytic, and equal to its Taylor series everywhere in a disk. This is the miracle that makes everything work.</p>
    </div>
</div>

<h3>Complex Differentiability</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Complex Derivative)</div>
    <div class="env-body">
        <p>A function \\(f(z)\\) is <strong>complex-differentiable</strong> (holomorphic) at \\(z_0\\) if the limit</p>
        \\[
        f'(z_0) = \\lim_{\\Delta z \\to 0} \\frac{f(z_0 + \\Delta z) - f(z_0)}{\\Delta z}
        \\]
        <p>exists and is independent of the direction from which \\(\\Delta z \\to 0\\) in the complex plane.</p>
    </div>
</div>

<p>This direction-independence is the crucial difference from real differentiability. In \\(\\mathbb{R}\\), the limit approaches from the left or right. In \\(\\mathbb{C}\\), \\(\\Delta z\\) can approach zero from any direction in the plane, and the limit must be the same along all paths.</p>

<h3>The Cauchy-Riemann Equations</h3>

<p>Writing \\(f(z) = u(x,y) + iv(x,y)\\) and taking the limit along the real axis (\\(\\Delta z = \\Delta x\\)) and then the imaginary axis (\\(\\Delta z = i\\Delta y\\)) gives:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.1 (Cauchy-Riemann Equations)</div>
    <div class="env-body">
        <p>If \\(f(z) = u + iv\\) is holomorphic at \\(z\\), then</p>
        \\[
        \\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}.
        \\]
        <p>Conversely, if \\(u\\) and \\(v\\) have continuous first partial derivatives satisfying these equations, then \\(f\\) is holomorphic.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = z^2\\)</div>
    <div class="env-body">
        <p>With \\(z = x + iy\\), we have \\(f = (x+iy)^2 = (x^2-y^2) + 2ixy\\), so \\(u = x^2 - y^2\\), \\(v = 2xy\\). Check: \\(u_x = 2x = v_y\\) and \\(u_y = -2y = -v_x\\). The Cauchy-Riemann equations hold everywhere, so \\(z^2\\) is entire (holomorphic on all of \\(\\mathbb{C}\\)).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Non-example: \\(f(z) = \\bar{z} = x - iy\\)</div>
    <div class="env-body">
        <p>Here \\(u = x\\), \\(v = -y\\). Then \\(u_x = 1\\) but \\(v_y = -1\\). The Cauchy-Riemann equations fail everywhere, so \\(\\bar{z}\\) is nowhere holomorphic, despite being perfectly smooth as a real map.</p>
    </div>
</div>

<h3>Physical Consequences</h3>

<p>Taking second derivatives of the Cauchy-Riemann equations gives</p>
\\[
\\nabla^2 u = u_{xx} + u_{yy} = 0, \\qquad \\nabla^2 v = v_{xx} + v_{yy} = 0.
\\]

<p>Both \\(u\\) and \\(v\\) are <strong>harmonic functions</strong>. This means every holomorphic function automatically solves the 2D Laplace equation. In electrostatics, \\(u\\) can represent the potential and \\(v\\) the stream function (or vice versa). In fluid dynamics, \\(f(z)\\) is the complex potential of an irrotational, incompressible flow.</p>

<h3>Conformal Mapping</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.2 (Conformal Property)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic at \\(z_0\\) and \\(f'(z_0) \\neq 0\\), then \\(f\\) is <strong>conformal</strong> at \\(z_0\\): it preserves angles between curves and the sense of rotation. The local magnification factor is \\(|f'(z_0)|\\) and the local rotation angle is \\(\\arg f'(z_0)\\).</p>
    </div>
</div>

<p>Conformal mappings are the physicist's tool for solving Laplace's equation in complicated geometries. The idea: if you know the solution in a simple domain (say, the upper half-plane), a conformal map carries it to a complicated domain (say, the exterior of an airfoil) while preserving the harmonic property.</p>

<div class="env-block example">
    <div class="env-title">Example: Joukowski Airfoil</div>
    <div class="env-body">
        <p>The Joukowski transform \\(w = z + 1/z\\) maps a circle in the \\(z\\)-plane to an airfoil shape in the \\(w\\)-plane. The flow around a cylinder (easy to compute) maps to flow around an airfoil (physically relevant). This is how early aerodynamicists computed lift before numerical methods existed.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-conformal-flow"></div>
`,
            visualizations: [
                {
                    id: 'viz-conformal-flow',
                    title: 'Conformal Mapping: From Circle to Airfoil',
                    description: 'The Joukowski transform \\(w = z + 1/z\\) maps a circle to an airfoil. Drag the circle center to change the airfoil shape. The grid lines map conformally, preserving angles at every intersection.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 80
                        });

                        var cx = -0.15, cy = 0.15;
                        var handle = viz.addDraggable('center', cx, cy, viz.colors.orange, 6);

                        function joukowski(zr, zi) {
                            var denom = zr * zr + zi * zi;
                            if (denom < 1e-10) return [zr, zi];
                            return [zr + zr / denom, zi - zi / denom];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            cx = handle.x;
                            cy = handle.y;
                            var R = Math.sqrt((1 - cx) * (1 - cx) + cy * cy);

                            // Left half: z-plane (circle + grid)
                            viz.screenText('z-plane', 140, 18, viz.colors.text, 12);
                            viz.screenText('w-plane', 420, 18, viz.colors.text, 12);

                            // Divider
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(280, 0);
                            ctx.lineTo(280, 360);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw circle in z-plane (left half)
                            var lOx = 140, lOy = 180, lS = 70;
                            // Draw grid lines and their images
                            var nLines = 12;
                            for (var k = 0; k < nLines; k++) {
                                var theta0 = 2 * Math.PI * k / nLines;
                                // Radial line from center to circle edge
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                var ex = cx + R * Math.cos(theta0);
                                var ey = cy + R * Math.sin(theta0);
                                ctx.moveTo(lOx + cx * lS, lOy - cy * lS);
                                ctx.lineTo(lOx + ex * lS, lOy - ey * lS);
                                ctx.stroke();
                            }

                            // Draw the circle
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(lOx + cx * lS, lOy - cy * lS, R * lS, 0, Math.PI * 2);
                            ctx.stroke();

                            // Mark the critical points z = +1, -1
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(lOx + 1 * lS, lOy, 3, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(lOx - 1 * lS, lOy, 3, 0, Math.PI * 2);
                            ctx.fill();

                            // Center handle
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(lOx + cx * lS, lOy - cy * lS, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Right half: w-plane (airfoil image)
                            var rOx = 420, rOy = 180, rS = 70;
                            // Map the circle through Joukowski
                            var nPts = 300;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var j = 0; j <= nPts; j++) {
                                var t = 2 * Math.PI * j / nPts;
                                var zr = cx + R * Math.cos(t);
                                var zi = cy + R * Math.sin(t);
                                var w = joukowski(zr, zi);
                                var sx = rOx + w[0] * rS;
                                var sy = rOy - w[1] * rS;
                                if (j === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Map grid lines (streamlines around circle -> around airfoil)
                            for (var k2 = 0; k2 < nLines; k2++) {
                                var theta2 = 2 * Math.PI * k2 / nLines;
                                ctx.strokeStyle = viz.colors.grid + '88';
                                ctx.lineWidth = 0.7;
                                ctx.beginPath();
                                var started = false;
                                for (var s = 0; s <= 60; s++) {
                                    var rr = R + (4 - R) * s / 60;
                                    var pzr = cx + rr * Math.cos(theta2);
                                    var pzi = cy + rr * Math.sin(theta2);
                                    var pw = joukowski(pzr, pzi);
                                    var psx = rOx + pw[0] * rS;
                                    var psy = rOy - pw[1] * rS;
                                    if (psx < 280 || psx > 560 || psy < 0 || psy > 360) { started = false; continue; }
                                    if (!started) { ctx.moveTo(psx, psy); started = true; }
                                    else ctx.lineTo(psx, psy);
                                }
                                ctx.stroke();
                            }

                            // Labels
                            viz.screenText('Circle', lOx, lOy + R * lS + 18, viz.colors.blue, 11);
                            viz.screenText('Airfoil', rOx, rOy + 80, viz.colors.teal, 11);
                            viz.screenText('w = z + 1/z', 280, 345, viz.colors.white, 12);

                            viz.drawDraggables();
                        }

                        // Override draggable screen positions for the left-half coordinate system
                        var origToScreen = viz.toScreen.bind(viz);
                        handle._customDraw = true;

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(f(z) = e^z\\) satisfies the Cauchy-Riemann equations everywhere. What are \\(u(x,y)\\) and \\(v(x,y)\\)?',
                    hint: 'Write \\(e^z = e^{x+iy} = e^x(\\cos y + i\\sin y)\\).',
                    solution: '\\(u = e^x \\cos y\\), \\(v = e^x \\sin y\\). Then \\(u_x = e^x \\cos y = v_y\\) and \\(u_y = -e^x \\sin y = -v_x\\). The equations hold for all \\((x,y)\\), so \\(e^z\\) is entire.'
                },
                {
                    question: 'Show that \\(f(z) = |z|^2\\) is differentiable only at \\(z = 0\\). Why does this not make it holomorphic at \\(z=0\\)?',
                    hint: '\\(|z|^2 = x^2 + y^2\\), so \\(u = x^2 + y^2\\), \\(v = 0\\). Apply Cauchy-Riemann.',
                    solution: 'Cauchy-Riemann gives \\(2x = 0\\) and \\(2y = 0\\), which holds only at \\(x = y = 0\\). Holomorphic requires differentiability in a neighborhood, not just at a point. Since \\(f\\) is not differentiable at any point near the origin, it is not holomorphic there.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Cauchy's Integral Theorem & Formula
        // ================================================================
        {
            id: 'sec-cauchy',
            title: "Cauchy's Integral Theorem & Formula",
            content: `
<h2>Cauchy's Integral Theorem &amp; Formula</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Miracle</div>
    <div class="env-body">
        <p>Cauchy's theorem says: if \\(f\\) is holomorphic inside a closed contour, then \\(\\oint f(z)\\,dz = 0\\). This is far stronger than anything in real analysis. Its consequence, the Cauchy integral formula, says that knowing \\(f\\) on a boundary circle determines \\(f\\) everywhere inside. This rigidity is why holomorphic functions are so powerful.</p>
    </div>
</div>

<h3>Contour Integrals</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Contour Integral)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [a,b] \\to \\mathbb{C}\\) be a smooth curve and \\(f\\) continuous on \\(\\gamma\\). The <strong>contour integral</strong> is</p>
        \\[
        \\int_\\gamma f(z)\\,dz = \\int_a^b f(\\gamma(t))\\,\\gamma'(t)\\,dt.
        \\]
        <p>This reduces a complex integral to a real integral via the parametrization.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\oint_{|z|=1} \\frac{dz}{z}\\)</div>
    <div class="env-body">
        <p>Parametrize the unit circle by \\(z = e^{it}\\), \\(0 \\le t \\le 2\\pi\\). Then \\(dz = ie^{it}\\,dt\\) and</p>
        \\[
        \\oint_{|z|=1} \\frac{dz}{z} = \\int_0^{2\\pi} \\frac{ie^{it}}{e^{it}}\\,dt = \\int_0^{2\\pi} i\\,dt = 2\\pi i.
        \\]
        <p>This is <em>not</em> zero because \\(1/z\\) is not holomorphic at \\(z=0\\), which lies inside the contour.</p>
    </div>
</div>

<h3>Cauchy's Integral Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.3 (Cauchy's Integral Theorem)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic in a simply connected domain \\(D\\), then for every closed contour \\(\\gamma\\) in \\(D\\),</p>
        \\[
        \\oint_\\gamma f(z)\\,dz = 0.
        \\]
    </div>
</div>

<p>The proof uses Green's theorem and the Cauchy-Riemann equations. Writing \\(f\\,dz = (u+iv)(dx+i\\,dy)\\) and applying Green's theorem to the real and imaginary parts, the Cauchy-Riemann equations make both surface integrals vanish.</p>

<h3>Cauchy's Integral Formula</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.4 (Cauchy's Integral Formula)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic inside and on a simple closed contour \\(C\\), and \\(z_0\\) is any point inside \\(C\\), then</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0}\\,dz.
        \\]
    </div>
</div>

<p>This is remarkable: the values of \\(f\\) on the boundary completely determine \\(f\\) inside. Nothing like this holds for real functions. Differentiating under the integral sign gives the <strong>generalized formula</strong> for the \\(n\\)-th derivative:</p>

\\[
f^{(n)}(z_0) = \\frac{n!}{2\\pi i} \\oint_C \\frac{f(z)}{(z - z_0)^{n+1}}\\,dz.
\\]

<p>This proves that holomorphic functions are infinitely differentiable.</p>

<div class="env-block example">
    <div class="env-title">Example: Computing an Integral via Cauchy's Formula</div>
    <div class="env-body">
        <p>Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz\\).</p>
        <p>Here \\(f(z) = e^z\\) is entire, and \\(z_0 = 1\\) lies inside \\(|z| = 2\\). By Cauchy's integral formula:</p>
        \\[
        \\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz = 2\\pi i \\cdot f(1) = 2\\pi i \\cdot e.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-cauchy-formula"></div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-formula',
                    title: "Cauchy's Integral Formula: Boundary Determines Interior",
                    description: 'The contour integral of \\(f(z)/(z - z_0)\\) around \\(C\\) recovers \\(f(z_0)\\). Drag \\(z_0\\) inside the contour to see the formula in action. Move it outside, and the integral gives zero.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 60
                        });

                        var z0 = viz.addDraggable('z0', 0.5, 0.3, viz.colors.orange, 7);
                        var contourR = 2.0;

                        VizEngine.createSlider(controls, 'Contour radius', 0.5, 3.0, contourR, 0.1, function(v) {
                            contourR = v;
                        });

                        // f(z) = z^2 + 1 for this demo
                        function fReal(x, y) {
                            // (x+iy)^2 + 1 = x^2 - y^2 + 1 + 2ixy
                            return [x * x - y * y + 1, 2 * x * y];
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var R = contourR;
                            var zx = z0.x, zy = z0.y;
                            var inside = (zx * zx + zy * zy) < R * R;

                            // Draw contour
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var csx = viz.originX;
                            var csy = viz.originY;
                            ctx.arc(csx, csy, R * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            // Direction arrow on contour
                            var arrowAngle = t * 0.001;
                            var ax = R * Math.cos(arrowAngle);
                            var ay = R * Math.sin(arrowAngle);
                            var aScreen = viz.toScreen(ax, ay);
                            // Tangent direction (CCW)
                            var tx = -Math.sin(arrowAngle);
                            var ty = Math.cos(arrowAngle);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(aScreen[0] + tx * 10 - ty * 5, aScreen[1] - ty * 10 - tx * 5);
                            ctx.lineTo(aScreen[0] + tx * 10 + ty * 5, aScreen[1] - ty * 10 + tx * 5);
                            ctx.lineTo(aScreen[0] + tx * 18, aScreen[1] - ty * 18);
                            ctx.closePath();
                            ctx.fill();

                            // Compute the integral numerically
                            var N = 500;
                            var sumRe = 0, sumIm = 0;
                            for (var k = 0; k < N; k++) {
                                var th = 2 * Math.PI * k / N;
                                var dth = 2 * Math.PI / N;
                                var zr = R * Math.cos(th);
                                var zi = R * Math.sin(th);
                                var fv = fReal(zr, zi);
                                // f(z) / (z - z0) * dz, where dz = i*R*e^{ith}*dth
                                var dr = zr - zx, di = zi - zy;
                                var denom = dr * dr + di * di;
                                if (denom < 1e-10) continue;
                                // f/(z-z0)
                                var qr = (fv[0] * dr + fv[1] * di) / denom;
                                var qi = (fv[1] * dr - fv[0] * di) / denom;
                                // multiply by dz = iR e^{ith} dth = R(-sin th + i cos th) dth
                                var dzr = R * (-Math.sin(th)) * dth;
                                var dzi = R * Math.cos(th) * dth;
                                sumRe += qr * dzr - qi * dzi;
                                sumIm += qr * dzi + qi * dzr;
                            }

                            // f(z0) for comparison
                            var fz0 = fReal(zx, zy);

                            // Display results
                            var integralVal = '(' + sumRe.toFixed(3) + ') + (' + sumIm.toFixed(3) + ')i';
                            var recoveredRe = sumIm / (2 * Math.PI);  // 1/(2pi i) * integral
                            var recoveredIm = -sumRe / (2 * Math.PI);
                            // Actually: 1/(2pi i) * (a + bi) = (a+bi)/(2pi i) = (a+bi)(-i)/(2pi) = (b - ai)/(2pi)
                            recoveredRe = sumIm / (2 * Math.PI);
                            recoveredIm = -sumRe / (2 * Math.PI);

                            viz.screenText('f(z) = z\u00B2 + 1', viz.width / 2, 16, viz.colors.white, 13);

                            if (inside) {
                                viz.screenText('z\u2080 is INSIDE C', viz.width / 2, viz.height - 60, viz.colors.green, 12);
                                viz.screenText(
                                    'f(z\u2080) = ' + fz0[0].toFixed(3) + ' + ' + fz0[1].toFixed(3) + 'i',
                                    viz.width / 2, viz.height - 42, viz.colors.white, 12
                                );
                                viz.screenText(
                                    '(1/2\u03C0i)\u222E = ' + recoveredRe.toFixed(3) + ' + ' + recoveredIm.toFixed(3) + 'i',
                                    viz.width / 2, viz.height - 24, viz.colors.teal, 12
                                );
                            } else {
                                viz.screenText('z\u2080 is OUTSIDE C', viz.width / 2, viz.height - 60, viz.colors.red, 12);
                                viz.screenText(
                                    '\u222E f/(z-z\u2080) dz = ' + sumRe.toFixed(3) + ' + ' + sumIm.toFixed(3) + 'i \u2248 0',
                                    viz.width / 2, viz.height - 42, viz.colors.text, 12
                                );
                            }

                            // Draw z0
                            viz.drawPoint(zx, zy, inside ? viz.colors.orange : viz.colors.red, 'z\u2080', 6);

                            // Labels
                            viz.drawText('C', R * 0.7, R * 0.7, viz.colors.blue, 14);
                            viz.drawText('Re', (viz.width / 2 - 20) / viz.scale, -0.3, viz.colors.text, 11);
                            viz.drawText('Im', 0.3, (viz.originY - 10) / viz.scale, viz.colors.text, 11);

                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=3} \\frac{\\sin z}{z - \\pi/2}\\,dz\\).',
                    hint: 'Identify \\(f(z) = \\sin z\\) and \\(z_0 = \\pi/2\\). Is \\(z_0\\) inside \\(|z|=3\\)?',
                    solution: 'Since \\(\\pi/2 \\approx 1.57 < 3\\), the point is inside. By Cauchy\'s formula: \\(\\oint \\frac{\\sin z}{z - \\pi/2}\\,dz = 2\\pi i \\cdot \\sin(\\pi/2) = 2\\pi i\\).'
                },
                {
                    question: 'Use the generalized Cauchy formula to evaluate \\(\\displaystyle\\oint_{|z|=1} \\frac{e^z}{z^3}\\,dz\\).',
                    hint: 'This is \\(\\frac{f(z)}{(z-0)^{2+1}}\\,dz\\) with \\(f(z)=e^z\\) and \\(n=2\\).',
                    solution: 'By the generalized formula with \\(z_0 = 0\\) and \\(n=2\\): \\(\\oint \\frac{e^z}{z^3}\\,dz = \\frac{2\\pi i}{2!} f\'\'(0) = \\frac{2\\pi i}{2} \\cdot 1 = \\pi i\\), since \\(f\'\'(z) = e^z\\) and \\(f\'\'(0) = 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Taylor & Laurent Series
        // ================================================================
        {
            id: 'sec-series',
            title: 'Taylor & Laurent Series',
            content: `
<h2>Taylor &amp; Laurent Series</h2>

<div class="env-block intuition">
    <div class="env-title">Power Series in \\(\\mathbb{C}\\)</div>
    <div class="env-body">
        <p>In real analysis, a function can be smooth without equaling its Taylor series (think of \\(e^{-1/x^2}\\)). In complex analysis, holomorphic implies analytic: the Taylor series converges to the function in the largest disk that avoids singularities. Laurent series extend this to functions with isolated singularities, introducing negative powers that encode the singular behavior.</p>
    </div>
</div>

<h3>Taylor Series</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.5 (Taylor's Theorem for Holomorphic Functions)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic in a disk \\(|z - z_0| < R\\), then</p>
        \\[
        f(z) = \\sum_{n=0}^{\\infty} a_n (z - z_0)^n, \\qquad a_n = \\frac{f^{(n)}(z_0)}{n!} = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{(z-z_0)^{n+1}}\\,dz,
        \\]
        <p>and the series converges absolutely and uniformly on compact subsets. The radius of convergence \\(R\\) equals the distance from \\(z_0\\) to the nearest singularity.</p>
    </div>
</div>

<p>The radius of convergence has a beautiful geometric interpretation: it is the distance from \\(z_0\\) to the nearest singularity in the complex plane. This explains why the real Taylor series of \\(1/(1+x^2)\\) has radius of convergence 1: the singularities are at \\(z = \\pm i\\), distance 1 from the origin.</p>

<h3>Laurent Series</h3>

<p>When \\(f\\) has an isolated singularity at \\(z_0\\), the Taylor series breaks down, but we can expand in a <strong>Laurent series</strong> that includes negative powers:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.6 (Laurent Series)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic in the annulus \\(r < |z - z_0| < R\\), then</p>
        \\[
        f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n = \\underbrace{\\sum_{n=0}^{\\infty} a_n (z-z_0)^n}_{\\text{analytic part}} + \\underbrace{\\sum_{n=1}^{\\infty} a_{-n} (z-z_0)^{-n}}_{\\text{principal part}}.
        \\]
    </div>
</div>

<h3>Classification of Singularities</h3>

<p>The principal part of the Laurent series classifies isolated singularities:</p>

<div class="env-block definition">
    <div class="env-title">Definition (Singularity Types)</div>
    <div class="env-body">
        <ul>
            <li><strong>Removable singularity:</strong> No negative powers (\\(a_{-n} = 0\\) for all \\(n \\ge 1\\)). Example: \\(\\frac{\\sin z}{z}\\) at \\(z = 0\\).</li>
            <li><strong>Pole of order \\(m\\):</strong> Finitely many negative powers, with \\(a_{-m} \\neq 0\\) being the most negative. Example: \\(\\frac{1}{z^2}\\) has a pole of order 2 at \\(z = 0\\).</li>
            <li><strong>Essential singularity:</strong> Infinitely many negative powers. Example: \\(e^{1/z}\\) at \\(z = 0\\).</li>
        </ul>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.7 (Casorati-Weierstrass)</div>
    <div class="env-body">
        <p>Near an essential singularity, \\(f\\) takes values arbitrarily close to any complex number. (Picard's theorem strengthens this: \\(f\\) takes every value, with at most one exception, infinitely often.)</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(e^{1/z}\\) near \\(z = 0\\)</div>
    <div class="env-body">
        <p>\\(e^{1/z} = 1 + \\frac{1}{z} + \\frac{1}{2!z^2} + \\frac{1}{3!z^3} + \\cdots\\). The Laurent series has infinitely many negative powers, so \\(z = 0\\) is an essential singularity. Near the origin, this function oscillates wildly, taking values near any complex number.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-singularity-types"></div>
<div class="viz-placeholder" data-viz="viz-laurent-expansion"></div>
`,
            visualizations: [
                {
                    id: 'viz-singularity-types',
                    title: 'Domain Coloring: Singularity Types',
                    description: 'Domain coloring represents complex functions by mapping the argument to hue and the magnitude to brightness. Compare a pole (\\(1/z^2\\)), a removable singularity (\\(\\sin z/z\\)), and an essential singularity (\\(e^{1/z}\\)). The wild color oscillations near \\(z=0\\) for \\(e^{1/z}\\) reveal the Casorati-Weierstrass theorem in action.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 240,
                            originX: 280, originY: 120, scale: 40
                        });

                        var funcChoice = 0;
                        var labels = ['1/z\u00B2 (pole)', 'sin(z)/z (removable)', 'exp(1/z) (essential)'];

                        var funcs = [
                            function(re, im) {
                                // 1/z^2
                                var d = re * re + im * im;
                                if (d < 1e-10) return [1e6, 0];
                                var zr = re / d, zi = -im / d; // 1/z
                                return [zr * zr - zi * zi, 2 * zr * zi]; // (1/z)^2
                            },
                            function(re, im) {
                                // sin(z)/z
                                var d = Math.sqrt(re * re + im * im);
                                if (d < 1e-10) return [1, 0];
                                // sin(z) = sin(x)cosh(y) + icos(x)sinh(y)
                                var sr = Math.sin(re) * Math.cosh(im);
                                var si = Math.cos(re) * Math.sinh(im);
                                // divide by z
                                var dd = re * re + im * im;
                                return [(sr * re + si * im) / dd, (si * re - sr * im) / dd];
                            },
                            function(re, im) {
                                // exp(1/z)
                                var d = re * re + im * im;
                                if (d < 1e-10) return [1e6, 0];
                                var invr = re / d, invi = -im / d;
                                var expR = Math.exp(invr);
                                if (!isFinite(expR)) return [1e6, 0];
                                return [expR * Math.cos(invi), expR * Math.sin(invi)];
                            }
                        ];

                        VizEngine.createButton(controls, '1/z\u00B2 (pole)', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'sin(z)/z', function() { funcChoice = 1; draw(); });
                        VizEngine.createButton(controls, 'exp(1/z)', function() { funcChoice = 2; draw(); });

                        function draw() {
                            viz.drawDomainColoring(funcs[funcChoice], [-3.5, 3.5], [-1.5, 1.5]);
                            // Label
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(0,0,0,0.6)';
                            ctx.fillRect(0, 0, viz.width, 24);
                            viz.screenText(labels[funcChoice], viz.width / 2, 13, viz.colors.white, 13);
                            // Mark origin
                            var ox = viz.width * (0 + 3.5) / 7;
                            var oy = viz.height * (1.5 - 0) / 3;
                            ctx.strokeStyle = '#ffffff88';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(ox, oy, 6, 0, Math.PI * 2);
                            ctx.stroke();
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-laurent-expansion',
                    title: 'Laurent Series: Animated Partial Sums',
                    description: 'Watch the Laurent series of \\(1/(1-z)\\) build up term by term. The blue curve shows the partial sum; the dashed white curve shows the exact function. Increase N to add more terms.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 280, originY: 170, scale: 60
                        });

                        var N = 3;
                        var thetaParam = 0;

                        VizEngine.createSlider(controls, 'Terms N', 1, 15, N, 1, function(v) {
                            N = Math.round(v);
                        });

                        // We plot f(z) = 1/(1-z) on a circle |z| = r, r < 1
                        // Taylor: sum_{n=0}^{N} z^n
                        // Parametrize z = r*e^{itheta}, plot Re(f) vs theta

                        var r = 0.7;

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Background info
                            viz.screenText('f(z) = 1/(1-z),  z = 0.7 e^{i\u03B8}', viz.width / 2, 16, viz.colors.white, 12);
                            viz.screenText('Taylor partial sum: N = ' + N + ' terms', viz.width / 2, 34, viz.colors.blue, 11);

                            // Axes for theta vs Re(f)
                            var leftPad = 60, rightPad = 20, topPad = 55, bottomPad = 40;
                            var plotW = viz.width - leftPad - rightPad;
                            var plotH = viz.height - topPad - bottomPad;

                            // y range: -3 to 3
                            var yMin = -3, yMax = 3;

                            function toPlot(theta, val) {
                                var px = leftPad + (theta / (2 * Math.PI)) * plotW;
                                var py = topPad + (1 - (val - yMin) / (yMax - yMin)) * plotH;
                                return [px, py];
                            }

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var yy = yMin; yy <= yMax; yy++) {
                                var gp = toPlot(0, yy);
                                ctx.beginPath();
                                ctx.moveTo(leftPad, gp[1]);
                                ctx.lineTo(leftPad + plotW, gp[1]);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(yy.toString(), leftPad - 6, gp[1] + 3);
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03B8', leftPad + plotW / 2, viz.height - 8);
                            ctx.textAlign = 'center';
                            var piLabels = [0, 0.5, 1, 1.5, 2];
                            for (var pi = 0; pi < piLabels.length; pi++) {
                                var xp = leftPad + (piLabels[pi] / 2) * plotW;
                                ctx.fillText(piLabels[pi] === 0 ? '0' : piLabels[pi] + '\u03C0', xp, topPad + plotH + 16);
                            }

                            var steps = 300;

                            // Exact function: Re(1/(1-z)) where z = r*e^{itheta}
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= steps; i++) {
                                var th = 2 * Math.PI * i / steps;
                                var zr2 = r * Math.cos(th), zi2 = r * Math.sin(th);
                                var dr2 = 1 - zr2, di2 = -zi2;
                                var dd2 = dr2 * dr2 + di2 * di2;
                                var fRe = dr2 / dd2;
                                if (fRe < yMin || fRe > yMax) { started = false; continue; }
                                var pp = toPlot(th, fRe);
                                if (!started) { ctx.moveTo(pp[0], pp[1]); started = true; }
                                else ctx.lineTo(pp[0], pp[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Partial sum: sum_{n=0}^{N-1} z^n
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            started = false;
                            for (var j = 0; j <= steps; j++) {
                                var th2 = 2 * Math.PI * j / steps;
                                var zr3 = r * Math.cos(th2), zi3 = r * Math.sin(th2);
                                // Compute sum z^n
                                var sRe = 0, sIm = 0;
                                var pwr = 1, pwi = 0;
                                for (var n = 0; n < N; n++) {
                                    sRe += pwr;
                                    sIm += pwi;
                                    // multiply by z
                                    var nr = pwr * zr3 - pwi * zi3;
                                    var ni = pwr * zi3 + pwi * zr3;
                                    pwr = nr;
                                    pwi = ni;
                                }
                                if (sRe < yMin || sRe > yMax) { started = false; continue; }
                                var pp2 = toPlot(th2, sRe);
                                if (!started) { ctx.moveTo(pp2[0], pp2[1]); started = true; }
                                else ctx.lineTo(pp2[0], pp2[1]);
                            }
                            ctx.stroke();

                            // Legend
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.moveTo(leftPad + 10, viz.height - 28);
                            ctx.lineTo(leftPad + 40, viz.height - 28);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Exact', leftPad + 44, viz.height - 25);

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(leftPad + 110, viz.height - 28);
                            ctx.lineTo(leftPad + 140, viz.height - 28);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Partial sum', leftPad + 144, viz.height - 25);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Taylor series of \\(\\frac{1}{1+z^2}\\) about \\(z_0 = 0\\). What is its radius of convergence, and why?',
                    hint: 'Use the geometric series \\(1/(1-w) = \\sum w^n\\) with \\(w = -z^2\\). Where are the singularities?',
                    solution: '\\(\\frac{1}{1+z^2} = \\sum_{n=0}^{\\infty} (-1)^n z^{2n}\\). The singularities are at \\(z = \\pm i\\), distance 1 from the origin, so \\(R = 1\\). This explains why the real series \\(\\sum (-1)^n x^{2n}\\) converges only for \\(|x| < 1\\) despite \\(1/(1+x^2)\\) being smooth everywhere on \\(\\mathbb{R}\\).'
                },
                {
                    question: 'Find the Laurent series of \\(f(z) = \\frac{e^z}{z^2}\\) about \\(z = 0\\). Classify the singularity.',
                    hint: 'Divide the Taylor series of \\(e^z\\) by \\(z^2\\).',
                    solution: '\\(\\frac{e^z}{z^2} = \\frac{1}{z^2} \\sum_{n=0}^\\infty \\frac{z^n}{n!} = \\frac{1}{z^2} + \\frac{1}{z} + \\frac{1}{2} + \\frac{z}{6} + \\cdots\\). The most negative power is \\(z^{-2}\\), so \\(z = 0\\) is a pole of order 2.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Contour Integration & the Residue Theorem
        // ================================================================
        {
            id: 'sec-contour',
            title: 'Contour Integration & the Residue Theorem',
            content: `
<h2>Contour Integration &amp; the Residue Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Residues as Charges</div>
    <div class="env-body">
        <p>Think of singularities as "charges" in the complex plane. The residue at a pole is like the charge enclosed. The residue theorem says the contour integral equals \\(2\\pi i\\) times the total enclosed charge, exactly like Gauss's law. This analogy is not accidental; both follow from the same topological structure.</p>
    </div>
</div>

<h3>The Residue</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Residue)</div>
    <div class="env-body">
        <p>The <strong>residue</strong> of \\(f\\) at an isolated singularity \\(z_0\\) is the coefficient \\(a_{-1}\\) in the Laurent expansion:</p>
        \\[
        \\operatorname{Res}_{z=z_0} f(z) = a_{-1} = \\frac{1}{2\\pi i} \\oint_C f(z)\\,dz,
        \\]
        <p>where \\(C\\) is any small circle around \\(z_0\\) containing no other singularity.</p>
    </div>
</div>

<h3>Computing Residues</h3>

<p>For practical computation:</p>
<ul>
    <li><strong>Simple pole</strong> (order 1): \\(\\operatorname{Res}_{z=z_0} f = \\lim_{z \\to z_0} (z - z_0) f(z)\\).</li>
    <li><strong>Pole of order \\(m\\)</strong>: \\(\\operatorname{Res}_{z=z_0} f = \\frac{1}{(m-1)!} \\lim_{z \\to z_0} \\frac{d^{m-1}}{dz^{m-1}} [(z-z_0)^m f(z)]\\).</li>
    <li><strong>Quotient rule</strong>: If \\(f = g/h\\) with \\(g(z_0) \\neq 0\\), \\(h(z_0) = 0\\), \\(h'(z_0) \\neq 0\\), then \\(\\operatorname{Res}_{z=z_0} = g(z_0)/h'(z_0)\\).</li>
</ul>

<h3>The Residue Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.8 (Residue Theorem)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic inside and on a simple closed contour \\(C\\), except at isolated singularities \\(z_1, \\ldots, z_n\\) inside \\(C\\), then</p>
        \\[
        \\oint_C f(z)\\,dz = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}_{z=z_k} f(z).
        \\]
    </div>
</div>

<h3>Applications to Real Integrals</h3>

<p>The residue theorem is the physicist's method for evaluating difficult real integrals. The strategy: embed the real integral in a contour integral, close the contour, and compute residues.</p>

<div class="env-block example">
    <div class="env-title">Example: \\(\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^2}\\)</div>
    <div class="env-body">
        <p>The integrand is \\(1/(z^2 + 1) = 1/[(z+i)(z-i)]\\). Close the contour with a large semicircle in the upper half-plane. The pole at \\(z = i\\) is inside; the pole at \\(z = -i\\) is outside.</p>
        \\[
        \\operatorname{Res}_{z=i} \\frac{1}{z^2+1} = \\frac{1}{2i}
        \\]
        <p>The semicircular arc contribution vanishes as \\(R \\to \\infty\\) (Jordan's lemma). Therefore:</p>
        \\[
        \\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^2} = 2\\pi i \\cdot \\frac{1}{2i} = \\pi.
        \\]
        <p>This matches \\([\\arctan x]_{-\\infty}^{\\infty} = \\pi\\), but the contour method generalizes to integrals that have no elementary antiderivative.</p>
    </div>
</div>

<div class="env-block example">
    <div name="env-title">Example: \\(\\displaystyle\\int_0^{2\\pi} \\frac{d\\theta}{2 + \\cos\\theta}\\)</div>
    <div class="env-body">
        <p>Substitute \\(z = e^{i\\theta}\\), so \\(\\cos\\theta = (z + 1/z)/2\\) and \\(d\\theta = dz/(iz)\\). The integral becomes a contour integral around \\(|z| = 1\\):</p>
        \\[
        \\oint_{|z|=1} \\frac{dz/(iz)}{2 + (z+1/z)/2} = \\oint \\frac{2\\,dz}{i(4z + z^2 + 1)} = \\frac{2}{i} \\oint \\frac{dz}{z^2 + 4z + 1}.
        \\]
        <p>The roots are \\(z = -2 \\pm \\sqrt{3}\\). Only \\(z = -2 + \\sqrt{3} \\approx -0.27\\) lies inside \\(|z|=1\\). Computing the residue gives \\(\\int_0^{2\\pi} \\frac{d\\theta}{2+\\cos\\theta} = \\frac{2\\pi}{\\sqrt{3}}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-contour-deformation"></div>
`,
            visualizations: [
                {
                    id: 'viz-contour-deformation',
                    title: 'Contour Deformation: Integral Unchanged if Analytic Between',
                    description: 'Two contours enclose the same singularities, so the integral is the same. Drag the control point to deform the outer contour. The residue theorem guarantees the integral value stays constant as long as the enclosed singularities do not change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 50
                        });

                        var deform = viz.addDraggable('deform', 2.5, 1.5, viz.colors.teal, 7);

                        // Singularities
                        var poles = [
                            { x: 1, y: 0.5, label: 'z\u2081' },
                            { x: -0.5, y: -0.3, label: 'z\u2082' }
                        ];

                        viz.animate(function(t) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Inner contour (fixed circle)
                            ctx.strokeStyle = viz.colors.blue + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            var innerR = 1.8;
                            var cs = viz.toScreen(0, 0);
                            ctx.beginPath();
                            ctx.arc(cs[0], cs[1], innerR * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Outer contour (deformable ellipse-like)
                            var dx = deform.x, dy = deform.y;
                            var outerPts = 200;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= outerPts; i++) {
                                var th = 2 * Math.PI * i / outerPts;
                                // Base circle + deformation
                                var baseR = 2.5;
                                var rx = baseR + 0.5 * Math.cos(th) * (dx - 2.5);
                                var ry = baseR + 0.5 * Math.sin(th) * (dy - 1.5);
                                var px = rx * Math.cos(th);
                                var py = ry * Math.sin(th);
                                var sp = viz.toScreen(px, py);
                                if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Draw poles
                            for (var p = 0; p < poles.length; p++) {
                                viz.drawPoint(poles[p].x, poles[p].y, viz.colors.red, poles[p].label, 5);
                                // X mark for singularity
                                var ps = viz.toScreen(poles[p].x, poles[p].y);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(ps[0] - 5, ps[1] - 5);
                                ctx.lineTo(ps[0] + 5, ps[1] + 5);
                                ctx.moveTo(ps[0] + 5, ps[1] - 5);
                                ctx.lineTo(ps[0] - 5, ps[1] + 5);
                                ctx.stroke();
                            }

                            // Labels
                            viz.screenText('Both contours enclose the same singularities', viz.width / 2, 16, viz.colors.white, 12);
                            viz.screenText('\u222E\u2081 f dz = \u222E\u2082 f dz = 2\u03C0i \u2211 Res', viz.width / 2, viz.height - 16, viz.colors.teal, 12);
                            viz.screenText('C\u2081 (inner)', 120, 75, viz.colors.blue, 10);
                            viz.screenText('C\u2082 (outer)', 440, 60, viz.colors.teal, 10);

                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\operatorname{Res}_{z=0} \\frac{z^2 + 1}{z^3(z-2)}\\).',
                    hint: 'This is a pole of order 3 at \\(z=0\\). Use the formula with \\(m=3\\), or expand in partial fractions.',
                    solution: 'Let \\(g(z) = z^3 f(z) = \\frac{z^2+1}{z-2}\\). Then \\(\\operatorname{Res} = \\frac{1}{2!}g\'\'(0)\\). We have \\(g(z) = \\frac{z^2+1}{z-2}\\), \\(g\'(z) = \\frac{2z(z-2) - (z^2+1)}{(z-2)^2} = \\frac{z^2 - 4z - 1}{(z-2)^2}\\), \\(g\'\'(z)\\) evaluated at \\(z=0\\): compute \\(g\'(0) = \\frac{-1}{4}\\). Using the quotient rule carefully, \\(g\'\'(0) = \\frac{-2 \\cdot 4 - (-1) \\cdot 2(-4)}{16} = \\frac{-8-8}{16} = -1\\). So \\(\\operatorname{Res} = -1/2\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{x^2}{(x^2+1)(x^2+4)}\\,dx\\) using contour integration.',
                    hint: 'Partial fractions: \\(\\frac{x^2}{(x^2+1)(x^2+4)} = \\frac{A}{x^2+1} + \\frac{B}{x^2+4}\\). Find A, B, then use the known result for \\(\\int \\frac{dx}{x^2+a^2} = \\pi/a\\).',
                    solution: 'Partial fractions give \\(A = -1/3\\), \\(B = 4/3\\). So the integral is \\(-\\frac{1}{3}\\cdot\\pi + \\frac{4}{3}\\cdot\\frac{\\pi}{2} = -\\frac{\\pi}{3} + \\frac{2\\pi}{3} = \\frac{\\pi}{3}\\). Alternatively, close in the upper half-plane: poles at \\(z = i\\) (residue \\(-i/6\\)) and \\(z = 2i\\) (residue \\(i/3\\)). Total: \\(2\\pi i(-i/6 + i/3) = 2\\pi i \\cdot i/6 = \\pi/3\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\int_0^{2\\pi} \\frac{d\\theta}{5 + 4\\cos\\theta}\\).',
                    hint: 'Substitute \\(z = e^{i\\theta}\\). The integral becomes a contour integral around \\(|z|=1\\). Find the poles inside the unit circle.',
                    solution: 'After substitution: \\(\\oint_{|z|=1} \\frac{dz}{i(2z^2+5z+2)} = \\frac{1}{i}\\oint \\frac{dz}{(2z+1)(z+2)}\\). The roots are \\(z = -1/2\\) (inside) and \\(z = -2\\) (outside). \\(\\operatorname{Res}_{z=-1/2} = \\frac{1}{2(-1/2)+2\\cdot 1} = \\frac{1}{-1+2} \\cdot \\frac{1}{2} = \\frac{1}{2\\cdot(3/2)} = \\frac{1}{3}\\). The integral is \\(2\\pi i \\cdot \\frac{1}{i} \\cdot \\frac{1}{3} = \\frac{2\\pi}{3}\\).'
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
<h2>Looking Ahead: Residues &amp; Physical Applications</h2>

<div class="env-block intuition">
    <div class="env-title">What We Have Built</div>
    <div class="env-body">
        <p>This chapter established the core machinery of complex analysis: analytic functions and the Cauchy-Riemann equations, Cauchy's integral theorem and formula, Taylor and Laurent series with singularity classification, and the residue theorem. These are the tools; the next chapter puts them to work.</p>
    </div>
</div>

<h3>Summary of Key Results</h3>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #30363d;">
    <th style="text-align:left;padding:6px;color:#8b949e;">Result</th>
    <th style="text-align:left;padding:6px;color:#8b949e;">Statement</th>
    <th style="text-align:left;padding:6px;color:#8b949e;">Physical Meaning</th>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Cauchy-Riemann</td>
    <td style="padding:6px;">\\(u_x = v_y,\\; u_y = -v_x\\)</td>
    <td style="padding:6px;">Holomorphic \\(\\Rightarrow\\) harmonic \\(\\Rightarrow\\) solves Laplace</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Cauchy's Theorem</td>
    <td style="padding:6px;">\\(\\oint f\\,dz = 0\\) if analytic inside</td>
    <td style="padding:6px;">No "charge" enclosed \\(\\Rightarrow\\) no net flux</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Cauchy's Formula</td>
    <td style="padding:6px;">\\(f(z_0) = \\frac{1}{2\\pi i}\\oint \\frac{f}{z-z_0}\\,dz\\)</td>
    <td style="padding:6px;">Boundary values determine interior</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Residue Theorem</td>
    <td style="padding:6px;">\\(\\oint f\\,dz = 2\\pi i \\sum \\mathrm{Res}\\)</td>
    <td style="padding:6px;">Gauss's law for singularities</td>
</tr>
</table>

<h3>What Comes Next</h3>

<p>Chapter 7 develops the physical applications in depth:</p>
<ul>
    <li><strong>Evaluation of real integrals</strong>: trigonometric integrals, integrals with branch cuts, principal value integrals, Fourier-type integrals via Jordan's lemma.</li>
    <li><strong>Summation of series</strong>: using the residue theorem to evaluate \\(\\sum_{n=1}^{\\infty} 1/n^2 = \\pi^2/6\\).</li>
    <li><strong>Dispersion relations</strong>: Kramers-Kronig relations linking the real and imaginary parts of a causal response function, fundamental to optics and scattering theory.</li>
    <li><strong>Green's functions</strong>: contour integral representations of propagators in quantum mechanics and electrodynamics.</li>
    <li><strong>Asymptotic methods</strong>: the method of steepest descent (saddle-point approximation) for evaluating integrals in the large-parameter limit, essential for statistical mechanics and semiclassical quantum mechanics.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">The Unreasonable Effectiveness</div>
    <div class="env-body">
        <p>It is striking that the simple requirement of complex differentiability (the Cauchy-Riemann equations) has such far-reaching consequences: infinite differentiability, power series representations, the residue theorem, conformal invariance. Hadamard called complex analysis "the most remarkable jewel of mathematics," and for physicists it is also the most useful one. The tools of this chapter will appear again and again throughout this course: in solving ODEs and PDEs (Chapters 8-10), in the theory of special functions (Chapters 11-13), and in integral transform methods (Chapters 14-15).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-branch-cut"></div>
`,
            visualizations: [
                {
                    id: 'viz-branch-cut',
                    title: 'Branch Cuts and Multi-valued Functions',
                    description: 'The function \\(\\sqrt{z}\\) is multi-valued: going around the origin, the value jumps. The branch cut (shown as a red line) makes the function single-valued. Toggle between \\(\\sqrt{z}\\) and \\(\\log z\\) to see different branch structures.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 280, originY: 170, scale: 40
                        });

                        var funcChoice = 0;
                        var labels = ['\u221Az (branch cut on negative real axis)', 'log z (branch cut on negative real axis)'];

                        var funcs = [
                            function(re, im) {
                                // sqrt(z): principal branch
                                var r = Math.sqrt(re * re + im * im);
                                var theta = Math.atan2(im, re); // -pi to pi
                                var sqrtR = Math.sqrt(r);
                                return [sqrtR * Math.cos(theta / 2), sqrtR * Math.sin(theta / 2)];
                            },
                            function(re, im) {
                                // log(z): principal branch
                                var r = Math.sqrt(re * re + im * im);
                                if (r < 1e-10) return [0, 0];
                                var theta = Math.atan2(im, re);
                                return [Math.log(r), theta];
                            }
                        ];

                        VizEngine.createButton(controls, '\u221Az', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'log z', function() { funcChoice = 1; draw(); });

                        function draw() {
                            var xRange = [-3.5, 3.5];
                            var yRange = [-2.1, 2.1];
                            viz.drawDomainColoring(funcs[funcChoice], xRange, yRange);

                            var ctx = viz.ctx;
                            // Draw branch cut as red line on negative real axis
                            var yMid = viz.height * (yRange[1] - 0) / (yRange[1] - yRange[0]);
                            var xLeft = 0;
                            var xMid = viz.width * (0 - xRange[0]) / (xRange[1] - xRange[0]);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(xLeft, yMid);
                            ctx.lineTo(xMid, yMid);
                            ctx.stroke();

                            // Origin marker
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(xMid, yMid, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Label
                            ctx.fillStyle = 'rgba(0,0,0,0.65)';
                            ctx.fillRect(0, 0, viz.width, 26);
                            viz.screenText(labels[funcChoice], viz.width / 2, 14, viz.colors.white, 12);

                            // Branch cut label
                            viz.screenText('Branch cut', xMid / 2, yMid - 12, viz.colors.red, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\log z\\) cannot be defined as a single-valued continuous function on \\(\\mathbb{C} \\setminus \\{0\\}\\). What is the monodromy?',
                    hint: 'Consider what happens to \\(\\arg z\\) as you traverse a loop around the origin.',
                    solution: 'If \\(\\log z = \\ln|z| + i\\arg z\\), then going counterclockwise around the origin increases \\(\\arg z\\) by \\(2\\pi\\), so \\(\\log z\\) jumps by \\(2\\pi i\\). This \\(2\\pi i\\) is the monodromy. Any branch cut from 0 to \\(\\infty\\) makes \\(\\log\\) single-valued on the complement.'
                },
                {
                    question: 'Prove that if \\(f\\) is entire and bounded, then \\(f\\) is constant (Liouville\'s theorem). Use Cauchy\'s integral formula for the derivative.',
                    hint: 'Apply the generalized Cauchy formula for \\(f\'(z_0)\\) with a circle of radius \\(R\\), then let \\(R \\to \\infty\\).',
                    solution: 'By Cauchy\'s formula, \\(|f\'(z_0)| = |\\frac{1}{2\\pi i} \\oint_{|z-z_0|=R} \\frac{f(z)}{(z-z_0)^2}\\,dz| \\le \\frac{1}{2\\pi} \\cdot \\frac{M}{R^2} \\cdot 2\\pi R = M/R\\) where \\(M = \\sup|f|\\). As \\(R \\to \\infty\\), \\(|f\'(z_0)| \\le M/R \\to 0\\). So \\(f\'\\equiv 0\\), meaning \\(f\\) is constant.'
                },
                {
                    question: 'The Fundamental Theorem of Algebra follows from Liouville\'s theorem. Give the proof.',
                    hint: 'Assume \\(p(z)\\) is a nonconstant polynomial with no roots. Then \\(1/p(z)\\) is entire. Show it is bounded.',
                    solution: 'If \\(p(z)\\) has no roots, then \\(g(z) = 1/p(z)\\) is entire. Since \\(p\\) is a polynomial of degree \\(n \\ge 1\\), \\(|p(z)| \\to \\infty\\) as \\(|z| \\to \\infty\\), so \\(|g(z)| \\to 0\\). In particular, \\(|g(z)| \\le 1\\) for \\(|z| \\ge R\\) for some large \\(R\\), and \\(|g|\\) is bounded on the compact disk \\(|z| \\le R\\) by continuity. So \\(g\\) is entire and bounded, hence constant by Liouville, contradicting \\(g(z) \\to 0\\). Therefore \\(p\\) must have a root.'
                }
            ]
        }
    ]
});
