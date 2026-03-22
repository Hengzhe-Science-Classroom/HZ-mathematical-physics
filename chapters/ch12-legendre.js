window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Legendre Polynomials & Spherical Harmonics',
    subtitle: 'The functions of spherical symmetry',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Spherical Symmetry?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Spherical Symmetry?',
            content: `
<h2>Why Spherical Symmetry?</h2>

<div class="env-block intuition">
    <div class="env-title">A Fundamental Question</div>
    <div class="env-body">
        <p>You place a point charge at the origin. What is the electric potential everywhere? In Cartesian coordinates, the Laplace equation \\(\\nabla^2 \\Phi = 0\\) yields messy partial derivatives. But the problem has spherical symmetry: the physics depends on \\(r, \\theta, \\varphi\\), not on \\(x, y, z\\). Separating variables in spherical coordinates produces a radial equation (easy) and an angular equation whose solutions are precisely the Legendre polynomials and spherical harmonics.</p>
    </div>
</div>

<p>Many fundamental problems in physics possess spherical symmetry, or at least axial symmetry about some axis. The gravitational field of the Earth, the Coulomb potential of an atom, the vibrations of a sphere, the cosmic microwave background radiation: all are most naturally described in spherical coordinates \\((r, \\theta, \\varphi)\\).</p>

<h3>Laplace's Equation in Spherical Coordinates</h3>

<p>The Laplacian in spherical coordinates takes the form</p>

\\[
\\nabla^2 \\Phi = \\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\left(r^2 \\frac{\\partial \\Phi}{\\partial r}\\right) + \\frac{1}{r^2 \\sin\\theta}\\frac{\\partial}{\\partial\\theta}\\left(\\sin\\theta\\frac{\\partial \\Phi}{\\partial\\theta}\\right) + \\frac{1}{r^2 \\sin^2\\theta}\\frac{\\partial^2 \\Phi}{\\partial\\varphi^2} = 0.
\\]

<p>We separate variables by writing \\(\\Phi(r,\\theta,\\varphi) = R(r)\\,Y(\\theta,\\varphi)\\). The radial part gives \\(R(r) = A r^\\ell + B r^{-(\\ell+1)}\\) for integer \\(\\ell \\geq 0\\), and the angular part satisfies</p>

\\[
\\frac{1}{\\sin\\theta}\\frac{\\partial}{\\partial\\theta}\\left(\\sin\\theta\\frac{\\partial Y}{\\partial\\theta}\\right) + \\frac{1}{\\sin^2\\theta}\\frac{\\partial^2 Y}{\\partial\\varphi^2} + \\ell(\\ell+1)Y = 0.
\\]

<p>This is the <strong>angular eigenvalue equation</strong>. Its solutions are the <em>spherical harmonics</em> \\(Y_\\ell^m(\\theta,\\varphi)\\), constructed from Legendre polynomials. The separation constant \\(\\ell(\\ell+1)\\) arises naturally from requiring regularity at the poles.</p>

<h3>Roadmap</h3>

<p>We build up the theory layer by layer:</p>
<ol>
    <li><strong>Legendre polynomials</strong> \\(P_n(x)\\): solutions for azimuthal symmetry (\\(\\varphi\\)-independent problems)</li>
    <li><strong>Associated Legendre functions</strong> \\(P_\\ell^m(x)\\): the \\(\\theta\\)-dependent part when \\(\\varphi\\)-dependence is present</li>
    <li><strong>Spherical harmonics</strong> \\(Y_\\ell^m(\\theta,\\varphi)\\): the complete angular eigenfunctions</li>
    <li><strong>Addition theorem</strong>: connecting products of spherical harmonics to Legendre polynomials</li>
    <li><strong>Physical applications</strong>: multipole expansions, quantum mechanics, cosmology</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Adrien-Marie Legendre introduced these polynomials in 1782 while studying the gravitational attraction of ellipsoids. Pierre-Simon Laplace developed the spherical harmonics shortly after in his monumental <em>Mecanique Celeste</em>. The connection to quantum mechanics came in the 1920s when Schrodinger's equation for the hydrogen atom separated into exactly the same angular equation.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Legendre Polynomials P_n
        // ================================================================
        {
            id: 'sec-legendre',
            title: 'Legendre Polynomials P_n',
            content: `
<h2>Legendre Polynomials \\(P_n(x)\\)</h2>

<div class="env-block intuition">
    <div class="env-title">The Core Idea</div>
    <div class="env-body">
        <p>Legendre polynomials are the polynomial solutions to a second-order ODE that appears whenever you solve Laplace's equation with axial symmetry. They form a complete orthogonal set on \\([-1,1]\\), meaning any reasonable function on that interval can be expanded in terms of them, just as Fourier series expand functions in sines and cosines.</p>
    </div>
</div>

<h3>Legendre's Differential Equation</h3>

<p>Substituting \\(x = \\cos\\theta\\) into the angular equation with \\(m = 0\\) (azimuthal symmetry) yields <strong>Legendre's equation</strong>:</p>

\\[
(1 - x^2)y'' - 2xy' + n(n+1)y = 0, \\qquad x \\in [-1, 1].
\\]

<p>This is a Sturm-Liouville problem. For integer \\(n \\geq 0\\), one solution is a polynomial of degree \\(n\\); the other solution (\\(Q_n(x)\\), the Legendre function of the second kind) is singular at \\(x = \\pm 1\\) and is discarded for physical problems requiring regularity at the poles.</p>

<h3>Three Equivalent Definitions</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Rodrigues' Formula)</div>
    <div class="env-body">
        <p>The Legendre polynomial of degree \\(n\\) is</p>
        \\[P_n(x) = \\frac{1}{2^n n!}\\frac{d^n}{dx^n}\\left[(x^2 - 1)^n\\right].\\]
    </div>
</div>

<p>This compact formula generates all Legendre polynomials. Applying it:</p>
<ul>
    <li>\\(P_0(x) = 1\\)</li>
    <li>\\(P_1(x) = x\\)</li>
    <li>\\(P_2(x) = \\tfrac{1}{2}(3x^2 - 1)\\)</li>
    <li>\\(P_3(x) = \\tfrac{1}{2}(5x^3 - 3x)\\)</li>
    <li>\\(P_4(x) = \\tfrac{1}{8}(35x^4 - 30x^2 + 3)\\)</li>
    <li>\\(P_5(x) = \\tfrac{1}{8}(63x^5 - 70x^3 + 15x)\\)</li>
    <li>\\(P_6(x) = \\tfrac{1}{16}(231x^6 - 315x^4 + 105x^2 - 5)\\)</li>
</ul>

<div class="env-block definition">
    <div class="env-title">Definition (Generating Function)</div>
    <div class="env-body">
        <p>The Legendre polynomials are generated by</p>
        \\[\\frac{1}{\\sqrt{1 - 2xt + t^2}} = \\sum_{n=0}^{\\infty} P_n(x)\\,t^n, \\qquad |t| < 1.\\]
        <p>This has a beautiful physical interpretation: the left side is the reciprocal distance \\(1/|\\mathbf{r} - \\mathbf{r}'|\\) in an expansion about \\(t = r'/r\\) and \\(x = \\cos\\gamma\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Recurrence Relation)</div>
    <div class="env-body">
        <p>The three-term recurrence:</p>
        \\[(n+1)P_{n+1}(x) = (2n+1)\\,x\\,P_n(x) - n\\,P_{n-1}(x),\\]
        <p>with \\(P_0(x) = 1\\) and \\(P_1(x) = x\\). This is the most efficient way to compute \\(P_n(x)\\) numerically.</p>
    </div>
</div>

<h3>Orthogonality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.1 (Orthogonality of Legendre Polynomials)</div>
    <div class="env-body">
        <p>The Legendre polynomials satisfy</p>
        \\[\\int_{-1}^{1} P_m(x)\\,P_n(x)\\,dx = \\frac{2}{2n+1}\\,\\delta_{mn},\\]
        <p>where \\(\\delta_{mn}\\) is the Kronecker delta. They form a complete orthogonal basis for \\(L^2[-1,1]\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Legendre's equation in self-adjoint form is \\(\\frac{d}{dx}[(1-x^2)P_n'] + n(n+1)P_n = 0\\). For \\(m \\neq n\\), multiply Legendre's equation for \\(P_n\\) by \\(P_m\\) and vice versa, subtract, and integrate by parts. The boundary terms vanish because \\((1-x^2)\\) vanishes at \\(x = \\pm 1\\), leaving \\([n(n+1) - m(m+1)]\\int P_m P_n\\,dx = 0\\). Since \\(m \\neq n\\), the integral must be zero.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Key Properties</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.2 (Properties of \\(P_n\\))</div>
    <div class="env-body">
        <ol>
            <li><strong>Normalization:</strong> \\(P_n(1) = 1\\) for all \\(n\\).</li>
            <li><strong>Parity:</strong> \\(P_n(-x) = (-1)^n P_n(x)\\). Even \\(n\\) gives an even function; odd \\(n\\) gives an odd function.</li>
            <li><strong>Zeros:</strong> \\(P_n(x)\\) has exactly \\(n\\) simple zeros in \\((-1, 1)\\).</li>
            <li><strong>Bound:</strong> \\(|P_n(x)| \\leq 1\\) for \\(x \\in [-1,1]\\).</li>
            <li><strong>Completeness:</strong> Any \\(f \\in L^2[-1,1]\\) can be expanded as \\(f(x) = \\sum_{n=0}^{\\infty} a_n P_n(x)\\) with \\(a_n = \\frac{2n+1}{2}\\int_{-1}^{1} f(x)P_n(x)\\,dx\\).</li>
        </ol>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-legendre-polynomials"></div>
`,
            visualizations: [
                {
                    id: 'viz-legendre-polynomials',
                    title: 'Legendre Polynomials & Orthogonality',
                    description: 'Explore P_0 through P_6 on [-1,1]. Toggle individual polynomials. The lower panel shows the orthogonality integral: select two polynomials and watch the integrand cancel to zero (or not).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 280, originY: 180, scale: 200
                        });

                        // Legendre polynomial by recurrence
                        function legendreP(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return x;
                            var prev2 = 1, prev1 = x, curr;
                            for (var k = 1; k < n; k++) {
                                curr = ((2 * k + 1) * x * prev1 - k * prev2) / (k + 1);
                                prev2 = prev1;
                                prev1 = curr;
                            }
                            return prev1;
                        }

                        var showP = [true, true, true, true, false, false, false];
                        var pColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.red, viz.colors.yellow];
                        var orthoM = 1, orthoN = 2;

                        // Toggles for P_0 through P_6
                        for (var i = 0; i <= 6; i++) {
                            (function(idx) {
                                var btn = VizEngine.createButton(controls, 'P' + idx, function() {
                                    showP[idx] = !showP[idx];
                                    btn.style.borderColor = showP[idx] ? pColors[idx] : '#30363d';
                                    btn.style.color = showP[idx] ? pColors[idx] : '#555';
                                    draw();
                                });
                                btn.style.borderColor = showP[idx] ? pColors[idx] : '#30363d';
                                btn.style.color = showP[idx] ? pColors[idx] : '#555';
                                btn.style.marginRight = '4px';
                            })(i);
                        }

                        // Orthogonality selectors
                        var orthoDiv = document.createElement('div');
                        orthoDiv.style.cssText = 'margin-top:6px;display:flex;align-items:center;gap:6px;';
                        var orthoLabel = document.createElement('span');
                        orthoLabel.style.cssText = 'color:#8b949e;font-size:0.78rem;';
                        orthoLabel.textContent = 'Orthogonality:';
                        orthoDiv.appendChild(orthoLabel);

                        VizEngine.createSlider(orthoDiv, 'm', 0, 6, orthoM, 1, function(v) {
                            orthoM = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(orthoDiv, 'n', 0, 6, orthoN, 1, function(v) {
                            orthoN = Math.round(v);
                            draw();
                        });
                        controls.appendChild(orthoDiv);

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Upper panel: Legendre polynomials
                            // Grid and axes
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -1; gx <= 1; gx += 0.5) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, 260); ctx.stroke();
                            }
                            for (var gy = -1; gy <= 1; gy += 0.5) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, 260); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('-1', viz.originX - viz.scale, viz.originY + 4);
                            ctx.fillText('1', viz.originX + viz.scale, viz.originY + 4);
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('1', viz.originX - 6, viz.originY - viz.scale);
                            ctx.fillText('-1', viz.originX - 6, viz.originY + viz.scale);

                            // Draw polynomials
                            for (var pi = 0; pi <= 6; pi++) {
                                if (!showP[pi]) continue;
                                ctx.strokeStyle = pColors[pi]; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var si = 0; si <= 300; si++) {
                                    var x = -1 + 2 * si / 300;
                                    var y = legendreP(pi, x);
                                    var px = viz.originX + x * viz.scale;
                                    var py = viz.originY - y * viz.scale;
                                    if (py < -20 || py > 280) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // Legend
                            var legX = 10, legY = 10;
                            ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            for (var li = 0; li <= 6; li++) {
                                if (!showP[li]) continue;
                                ctx.fillStyle = pColors[li];
                                ctx.fillText('P' + li + '(x)', legX, legY);
                                legY += 16;
                            }

                            // Lower panel: orthogonality
                            var orthoY0 = 340;
                            var orthoH = 80;
                            var orthoScale = orthoH / 2;

                            // Separator
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(20, 280); ctx.lineTo(viz.width - 20, 280); ctx.stroke();

                            viz.screenText('Orthogonality: integral of P' + orthoM + ' \u00B7 P' + orthoN, viz.width / 2, 292, viz.colors.white, 12);

                            // Axis for ortho panel
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(80, orthoY0); ctx.lineTo(viz.width - 20, orthoY0); ctx.stroke();

                            // Draw integrand P_m * P_n and shade
                            var integral = 0;
                            var dx = 2 / 200;
                            ctx.beginPath();
                            var firstOrtho = true;
                            for (var oi = 0; oi <= 200; oi++) {
                                var ox = -1 + 2 * oi / 200;
                                var val = legendreP(orthoM, ox) * legendreP(orthoN, ox);
                                integral += val * dx;
                                var opx = 80 + (ox + 1) / 2 * (viz.width - 100);
                                var opy = orthoY0 - val * orthoScale;
                                if (firstOrtho) { ctx.moveTo(opx, opy); firstOrtho = false; }
                                else ctx.lineTo(opx, opy);
                            }
                            ctx.strokeStyle = viz.colors.pink; ctx.lineWidth = 2; ctx.stroke();

                            // Shade positive/negative
                            for (var si2 = 0; si2 < 200; si2++) {
                                var x1 = -1 + 2 * si2 / 200;
                                var x2 = -1 + 2 * (si2 + 1) / 200;
                                var v1 = legendreP(orthoM, x1) * legendreP(orthoN, x1);
                                var v2 = legendreP(orthoM, x2) * legendreP(orthoN, x2);
                                var avg = (v1 + v2) / 2;
                                var px1 = 80 + (x1 + 1) / 2 * (viz.width - 100);
                                var px2 = 80 + (x2 + 1) / 2 * (viz.width - 100);
                                ctx.fillStyle = avg > 0 ? viz.colors.teal + '44' : viz.colors.red + '44';
                                ctx.fillRect(px1, Math.min(orthoY0, orthoY0 - avg * orthoScale), px2 - px1, Math.abs(avg * orthoScale));
                            }

                            // Integral value
                            var expected = (orthoM === orthoN) ? 2 / (2 * orthoN + 1) : 0;
                            viz.screenText(
                                '\u222B P' + orthoM + ' P' + orthoN + ' dx = ' + integral.toFixed(4) +
                                (orthoM === orthoN ? '  =  2/(2\u00B7' + orthoN + '+1) = ' + expected.toFixed(4) : '  =  0'),
                                viz.width / 2, viz.height - 12, orthoM === orthoN ? viz.colors.teal : viz.colors.red, 12
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify Rodrigues\' formula for \\(P_3(x)\\). Compute \\(\\frac{1}{2^3 \\cdot 3!}\\frac{d^3}{dx^3}(x^2-1)^3\\) and confirm you get \\(\\frac{1}{2}(5x^3 - 3x)\\).',
                    hint: 'First expand \\((x^2-1)^3 = x^6 - 3x^4 + 3x^2 - 1\\), then differentiate three times.',
                    solution: '\\((x^2-1)^3 = x^6 - 3x^4 + 3x^2 - 1\\). First derivative: \\(6x^5 - 12x^3 + 6x\\). Second: \\(30x^4 - 36x^2 + 6\\). Third: \\(120x^3 - 72x\\). Multiply by \\(\\frac{1}{2^3 \\cdot 3!} = \\frac{1}{48}\\): \\(\\frac{120x^3 - 72x}{48} = \\frac{5x^3 - 3x}{2} = P_3(x)\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Using the recurrence relation \\((n+1)P_{n+1} = (2n+1)xP_n - nP_{n-1}\\), compute \\(P_4(x)\\) from \\(P_2\\) and \\(P_3\\).',
                    hint: 'Set \\(n = 3\\): \\(4P_4 = 7xP_3 - 3P_2\\).',
                    solution: '\\(4P_4 = 7x \\cdot \\frac{1}{2}(5x^3 - 3x) - 3 \\cdot \\frac{1}{2}(3x^2 - 1) = \\frac{35x^4 - 21x^2}{2} - \\frac{9x^2 - 3}{2} = \\frac{35x^4 - 30x^2 + 3}{2}\\). So \\(P_4 = \\frac{1}{8}(35x^4 - 30x^2 + 3)\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Show that \\(\\int_{-1}^{1} x\\,P_n(x)\\,dx = 0\\) for all \\(n \\neq 1\\).',
                    hint: 'Note that \\(x = P_1(x)\\) and use orthogonality.',
                    solution: 'Since \\(x = P_1(x)\\), the integral is \\(\\int_{-1}^{1} P_1(x) P_n(x)\\,dx = \\frac{2}{3}\\delta_{1n}\\). For \\(n \\neq 1\\), this is zero by orthogonality of Legendre polynomials.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Associated Legendre Functions P_n^m
        // ================================================================
        {
            id: 'sec-associated',
            title: 'Associated Legendre Functions P_n^m',
            content: `
<h2>Associated Legendre Functions \\(P_\\ell^m(x)\\)</h2>

<div class="env-block intuition">
    <div class="env-title">Beyond Azimuthal Symmetry</div>
    <div class="env-body">
        <p>When the physical problem has \\(\\varphi\\)-dependence (e.g., the hydrogen atom under a magnetic field, or a charge distribution without axial symmetry), we need the full angular equation, not just the \\(m = 0\\) case. The associated Legendre functions generalize Legendre polynomials to handle the \\(\\varphi\\)-dependent modes.</p>
    </div>
</div>

<h3>The Associated Legendre Equation</h3>

<p>Separating the angular equation further via \\(Y(\\theta,\\varphi) = \\Theta(\\theta)\\,e^{im\\varphi}\\) with \\(x = \\cos\\theta\\) gives the <strong>associated Legendre equation</strong>:</p>

\\[
(1 - x^2)y'' - 2xy' + \\left[\\ell(\\ell+1) - \\frac{m^2}{1 - x^2}\\right]y = 0.
\\]

<p>For integer \\(m\\) with \\(|m| \\leq \\ell\\), the regular solution is the associated Legendre function \\(P_\\ell^m(x)\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Associated Legendre Function)</div>
    <div class="env-body">
        <p>For \\(m \\geq 0\\):</p>
        \\[P_\\ell^m(x) = (-1)^m (1 - x^2)^{m/2} \\frac{d^m}{dx^m} P_\\ell(x).\\]
        <p>For negative \\(m\\):</p>
        \\[P_\\ell^{-m}(x) = (-1)^m \\frac{(\\ell - m)!}{(\\ell + m)!}\\,P_\\ell^m(x).\\]
        <p>The factor \\((1-x^2)^{m/2} = \\sin^m\\theta\\) ensures regularity at the poles. Note \\(P_\\ell^0(x) = P_\\ell(x)\\).</p>
    </div>
</div>

<h3>Key Properties</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.3 (Orthogonality of Associated Legendre Functions)</div>
    <div class="env-body">
        <p>For fixed \\(m\\):</p>
        \\[\\int_{-1}^{1} P_\\ell^m(x)\\,P_{\\ell'}^m(x)\\,dx = \\frac{2}{2\\ell+1}\\frac{(\\ell+m)!}{(\\ell-m)!}\\,\\delta_{\\ell\\ell'}.\\]
    </div>
</div>

<p>The first few associated Legendre functions:</p>
<ul>
    <li>\\(P_1^1(x) = -(1-x^2)^{1/2} = -\\sin\\theta\\)</li>
    <li>\\(P_2^1(x) = -3x(1-x^2)^{1/2} = -3\\cos\\theta\\sin\\theta\\)</li>
    <li>\\(P_2^2(x) = 3(1-x^2) = 3\\sin^2\\theta\\)</li>
    <li>\\(P_3^1(x) = -\\frac{3}{2}(5x^2-1)(1-x^2)^{1/2}\\)</li>
    <li>\\(P_3^2(x) = 15x(1-x^2)\\)</li>
    <li>\\(P_3^3(x) = -15(1-x^2)^{3/2}\\)</li>
</ul>

<div class="env-block remark">
    <div class="env-title">The Condon-Shortley Phase</div>
    <div class="env-body">
        <p>The factor \\((-1)^m\\) in the definition is the <strong>Condon-Shortley phase convention</strong>, standard in physics. Some mathematics texts omit it. This seemingly minor choice propagates through all formulas involving spherical harmonics. Always check which convention a source uses.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-associated-legendre"></div>
`,
            visualizations: [
                {
                    id: 'viz-associated-legendre',
                    title: 'Associated Legendre Functions',
                    description: 'Explore P_l^m(x) for various l and m. Use sliders to change quantum numbers and watch how the number of zeros and the envelope change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 200
                        });

                        var lVal = 3, mVal = 0;

                        VizEngine.createSlider(controls, 'l', 0, 6, lVal, 1, function(v) {
                            lVal = Math.round(v);
                            if (mVal > lVal) { mVal = lVal; mSlider.value = mVal; }
                            draw();
                        });
                        var mSlider = VizEngine.createSlider(controls, 'm', 0, 6, mVal, 1, function(v) {
                            mVal = Math.min(Math.round(v), lVal);
                            draw();
                        });

                        function legendreP(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return x;
                            var p2 = 1, p1 = x, c;
                            for (var k = 1; k < n; k++) {
                                c = ((2*k+1)*x*p1 - k*p2)/(k+1);
                                p2 = p1; p1 = c;
                            }
                            return p1;
                        }

                        function assocLegendre(l, m, x) {
                            if (m < 0) m = -m; // Simplified: show |m| version
                            if (m > l) return 0;
                            // Compute P_l(x) then differentiate m times numerically
                            // For accuracy, use the recurrence approach
                            // Start with P_m^m, then build up
                            var pmm = 1;
                            if (m > 0) {
                                var somx2 = Math.sqrt(1 - x * x);
                                var fact = 1;
                                for (var i = 1; i <= m; i++) {
                                    pmm *= -fact * somx2;
                                    fact += 2;
                                }
                            }
                            if (l === m) return pmm;
                            var pmm1 = x * (2 * m + 1) * pmm;
                            if (l === m + 1) return pmm1;
                            var pll = 0;
                            for (var ll = m + 2; ll <= l; ll++) {
                                pll = ((2 * ll - 1) * x * pmm1 - (ll + m - 1) * pmm) / (ll - m);
                                pmm = pmm1;
                                pmm1 = pll;
                            }
                            return pll;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Clamp m
                            var m = Math.min(mVal, lVal);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -1; gx <= 1; gx += 0.5) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 20); ctx.lineTo(sx, viz.height - 20); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(20, viz.originY); ctx.lineTo(viz.width - 20, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 20); ctx.lineTo(viz.originX, viz.height - 20); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('-1', viz.originX - viz.scale, viz.originY + 4);
                            ctx.fillText('1', viz.originX + viz.scale, viz.originY + 4);
                            ctx.fillText('x', viz.width - 14, viz.originY + 4);

                            // Find max for scaling
                            var maxVal = 0;
                            for (var si = 0; si <= 100; si++) {
                                var xv = -1 + 2 * si / 100;
                                var v = Math.abs(assocLegendre(lVal, m, xv));
                                if (isFinite(v) && v > maxVal) maxVal = v;
                            }
                            var yScale = maxVal > 0 ? 150 / maxVal : 150;

                            // Draw envelope sin^m(theta) for reference
                            if (m > 0) {
                                ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                var envStarted = false;
                                for (var ei = 0; ei <= 300; ei++) {
                                    var ex = -1 + 2 * ei / 300;
                                    var env = Math.pow(1 - ex * ex, m / 2) * maxVal;
                                    var epx = viz.originX + ex * viz.scale;
                                    var epy = viz.originY - env / maxVal * 150;
                                    if (!envStarted) { ctx.moveTo(epx, epy); envStarted = true; }
                                    else ctx.lineTo(epx, epy);
                                }
                                ctx.stroke();
                                ctx.beginPath(); envStarted = false;
                                for (var ei2 = 0; ei2 <= 300; ei2++) {
                                    var ex2 = -1 + 2 * ei2 / 300;
                                    var env2 = -Math.pow(1 - ex2 * ex2, m / 2) * maxVal;
                                    var epx2 = viz.originX + ex2 * viz.scale;
                                    var epy2 = viz.originY - env2 / maxVal * 150;
                                    if (!envStarted) { ctx.moveTo(epx2, epy2); envStarted = true; }
                                    else ctx.lineTo(epx2, epy2);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Draw the function
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 400; i++) {
                                var x = -1 + 2 * i / 400;
                                var y = assocLegendre(lVal, m, x);
                                if (!isFinite(y)) { started = false; continue; }
                                var px = viz.originX + x * viz.scale;
                                var py = viz.originY - y / (maxVal || 1) * 150;
                                if (py < 10 || py > viz.height - 10) { started = false; continue; }
                                if (!started) { ctx.moveTo(px, py); started = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Title
                            viz.screenText('P' + lVal + '^' + m + '(x)', viz.width / 2, 15, viz.colors.white, 16);

                            // Info
                            var nZeros = lVal - m;
                            viz.screenText(
                                'l = ' + lVal + ',  m = ' + m + '    |    ' + nZeros + ' zero' + (nZeros !== 1 ? 's' : '') + ' in (-1,1)',
                                viz.width / 2, viz.height - 15, viz.colors.teal, 12
                            );

                            // Y-axis scale marks
                            if (maxVal > 0) {
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                                ctx.fillText(maxVal.toFixed(1), viz.originX - 6, viz.originY - 150);
                                ctx.fillText((-maxVal).toFixed(1), viz.originX - 6, viz.originY + 150);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(P_2^2(x) = 3(1-x^2)\\) using the definition \\(P_\\ell^m(x) = (-1)^m(1-x^2)^{m/2}\\frac{d^m}{dx^m}P_\\ell(x)\\).',
                    hint: 'Start with \\(P_2(x) = \\frac{1}{2}(3x^2-1)\\) and differentiate twice.',
                    solution: '\\(P_2(x) = \\frac{1}{2}(3x^2-1)\\). First derivative: \\(3x\\). Second derivative: \\(3\\). Then \\(P_2^2(x) = (-1)^2(1-x^2)^1 \\cdot 3 = 3(1-x^2)\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Spherical Harmonics Y_l^m
        // ================================================================
        {
            id: 'sec-spherical',
            title: 'Spherical Harmonics Y_l^m',
            content: `
<h2>Spherical Harmonics \\(Y_\\ell^m(\\theta,\\varphi)\\)</h2>

<div class="env-block intuition">
    <div class="env-title">Angular Eigenfunctions</div>
    <div class="env-body">
        <p>Spherical harmonics are to the sphere what Fourier modes \\(e^{in\\theta}\\) are to the circle. They form a complete orthonormal basis for square-integrable functions on the unit sphere \\(S^2\\). Any angular pattern, from the shape of electron orbitals to the temperature fluctuations of the cosmic microwave background, can be decomposed into spherical harmonics.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Spherical Harmonics)</div>
    <div class="env-body">
        <p>For integer \\(\\ell \\geq 0\\) and \\(-\\ell \\leq m \\leq \\ell\\):</p>
        \\[Y_\\ell^m(\\theta,\\varphi) = \\sqrt{\\frac{2\\ell+1}{4\\pi}\\frac{(\\ell-m)!}{(\\ell+m)!}}\\,P_\\ell^m(\\cos\\theta)\\,e^{im\\varphi}.\\]
        <p>The square root prefactor ensures orthonormality over the sphere.</p>
    </div>
</div>

<h3>Orthonormality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.4 (Orthonormality of Spherical Harmonics)</div>
    <div class="env-body">
        \\[\\int_0^{2\\pi}\\int_0^{\\pi} Y_\\ell^m(\\theta,\\varphi)^* \\, Y_{\\ell'}^{m'}(\\theta,\\varphi)\\,\\sin\\theta\\,d\\theta\\,d\\varphi = \\delta_{\\ell\\ell'}\\delta_{mm'}.\\]
        <p>The integration measure \\(\\sin\\theta\\,d\\theta\\,d\\varphi = d\\Omega\\) is the solid angle element on the sphere.</p>
    </div>
</div>

<h3>Important Special Cases</h3>

<p>The first few spherical harmonics, written in real form for visualization:</p>

<ul>
    <li>\\(Y_0^0 = \\frac{1}{\\sqrt{4\\pi}}\\) (constant; the "monopole")</li>
    <li>\\(Y_1^0 = \\sqrt{\\frac{3}{4\\pi}}\\cos\\theta\\) (dipole along \\(z\\))</li>
    <li>\\(Y_1^{\\pm 1} = \\mp\\sqrt{\\frac{3}{8\\pi}}\\sin\\theta\\,e^{\\pm i\\varphi}\\) (dipole in \\(x\\)-\\(y\\) plane)</li>
    <li>\\(Y_2^0 = \\sqrt{\\frac{5}{16\\pi}}(3\\cos^2\\theta - 1)\\) (quadrupole)</li>
</ul>

<h3>Real Spherical Harmonics</h3>

<p>For visualization and many applications, it is convenient to use real combinations:</p>

\\[
Y_{\\ell m}^{\\text{cos}} = \\frac{1}{\\sqrt{2}}(Y_\\ell^{-m} + (-1)^m Y_\\ell^m), \\qquad
Y_{\\ell m}^{\\text{sin}} = \\frac{i}{\\sqrt{2}}(Y_\\ell^{-m} - (-1)^m Y_\\ell^m).
\\]

<p>These are real-valued functions that separate into \\(\\cos(m\\varphi)\\) and \\(\\sin(m\\varphi)\\) factors.</p>

<h3>Completeness</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.5 (Completeness on \\(S^2\\))</div>
    <div class="env-body">
        <p>Any square-integrable function on the sphere can be expanded as</p>
        \\[f(\\theta,\\varphi) = \\sum_{\\ell=0}^{\\infty} \\sum_{m=-\\ell}^{\\ell} a_{\\ell m}\\, Y_\\ell^m(\\theta,\\varphi),\\]
        <p>where \\(a_{\\ell m} = \\int Y_\\ell^m(\\theta,\\varphi)^*\\, f(\\theta,\\varphi)\\, d\\Omega\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-spherical-harmonics"></div>
`,
            visualizations: [
                {
                    id: 'viz-spherical-harmonics',
                    title: 'Spherical Harmonics on the Sphere',
                    description: 'See real spherical harmonics Y_l^m painted on the unit sphere. The radius is modulated by |Y_l^m| and colored by sign (blue = positive, red = negative). Rotate with the time slider.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 280, originY: 220, scale: 1
                        });

                        var lVal = 2, mVal = 0, rotAngle = 0.5;

                        VizEngine.createSlider(controls, 'l', 0, 5, lVal, 1, function(v) {
                            lVal = Math.round(v);
                            if (mVal > lVal) mVal = lVal;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'm', 0, 5, mVal, 1, function(v) {
                            mVal = Math.min(Math.round(v), lVal);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Rotate', 0, 6.28, rotAngle, 0.05, function(v) {
                            rotAngle = v;
                            draw();
                        });

                        function assocLegendre(l, m, x) {
                            if (m > l) return 0;
                            var pmm = 1;
                            if (m > 0) {
                                var somx2 = Math.sqrt(Math.max(0, 1 - x * x));
                                var fact = 1;
                                for (var i = 1; i <= m; i++) {
                                    pmm *= -fact * somx2;
                                    fact += 2;
                                }
                            }
                            if (l === m) return pmm;
                            var pmm1 = x * (2 * m + 1) * pmm;
                            if (l === m + 1) return pmm1;
                            var pll = 0;
                            for (var ll = m + 2; ll <= l; ll++) {
                                pll = ((2 * ll - 1) * x * pmm1 - (ll + m - 1) * pmm) / (ll - m);
                                pmm = pmm1;
                                pmm1 = pll;
                            }
                            return pll;
                        }

                        function realYlm(l, m, theta, phi) {
                            // Real spherical harmonic (using cos(m*phi) for m >= 0)
                            var absm = Math.abs(m);
                            var plm = assocLegendre(l, absm, Math.cos(theta));
                            // Normalization
                            var num = (2 * l + 1);
                            var facRatio = 1;
                            for (var i = l - absm + 1; i <= l + absm; i++) facRatio *= i;
                            var norm = Math.sqrt(num / (4 * Math.PI * facRatio));
                            if (absm > 0) norm *= Math.sqrt(2);
                            var angular = m >= 0 ? Math.cos(absm * phi) : Math.sin(absm * phi);
                            return norm * plm * angular;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var m = Math.min(mVal, lVal);
                            var R = 140; // base sphere radius in pixels

                            viz.screenText('Y' + lVal + '^' + m + '(\u03B8, \u03C6)  [real form]', viz.width / 2, 18, viz.colors.white, 15);

                            // Precompute the Y values on a grid
                            var nTheta = 60, nPhi = 80;
                            var vals = [];
                            var maxAbs = 0;
                            for (var it = 0; it <= nTheta; it++) {
                                vals[it] = [];
                                for (var ip = 0; ip <= nPhi; ip++) {
                                    var theta = Math.PI * it / nTheta;
                                    var phi = 2 * Math.PI * ip / nPhi;
                                    var y = realYlm(lVal, m, theta, phi);
                                    vals[it][ip] = y;
                                    if (Math.abs(y) > maxAbs) maxAbs = Math.abs(y);
                                }
                            }
                            if (maxAbs === 0) maxAbs = 1;

                            // 3D projection with rotation
                            var cosR = Math.cos(rotAngle), sinR = Math.sin(rotAngle);
                            var tilt = 0.4;
                            var cosT = Math.cos(tilt), sinT = Math.sin(tilt);

                            function project(theta, phi, rMod) {
                                var r = R * (0.3 + 0.7 * Math.abs(rMod) / maxAbs);
                                var x3 = r * Math.sin(theta) * Math.cos(phi);
                                var y3 = r * Math.sin(theta) * Math.sin(phi);
                                var z3 = r * Math.cos(theta);
                                // Rotate around y-axis
                                var x4 = x3 * cosR + z3 * sinR;
                                var z4 = -x3 * sinR + z3 * cosR;
                                // Tilt around x-axis
                                var y4 = y3 * cosT - z4 * sinT;
                                var z5 = y3 * sinT + z4 * cosT;
                                return { px: viz.originX + x4, py: viz.originY - y4, z: z5 };
                            }

                            // Collect quads for painter's algorithm
                            var quads = [];
                            for (var it2 = 0; it2 < nTheta; it2++) {
                                for (var ip2 = 0; ip2 < nPhi; ip2++) {
                                    var t0 = Math.PI * it2 / nTheta;
                                    var t1 = Math.PI * (it2 + 1) / nTheta;
                                    var p0 = 2 * Math.PI * ip2 / nPhi;
                                    var p1 = 2 * Math.PI * (ip2 + 1) / nPhi;

                                    var v00 = vals[it2][ip2];
                                    var v10 = vals[it2 + 1][ip2];
                                    var v11 = vals[it2 + 1][ip2 + 1];
                                    var v01 = vals[it2][ip2 + 1];
                                    var avgVal = (v00 + v10 + v11 + v01) / 4;

                                    var c0 = project(t0, p0, v00);
                                    var c1 = project(t1, p0, v10);
                                    var c2 = project(t1, p1, v11);
                                    var c3 = project(t0, p1, v01);

                                    var avgZ = (c0.z + c1.z + c2.z + c3.z) / 4;

                                    quads.push({
                                        pts: [c0, c1, c2, c3],
                                        z: avgZ,
                                        val: avgVal
                                    });
                                }
                            }

                            // Sort by z (back to front)
                            quads.sort(function(a, b) { return a.z - b.z; });

                            // Draw quads
                            for (var qi = 0; qi < quads.length; qi++) {
                                var q = quads[qi];
                                var t = q.val / maxAbs; // -1 to 1
                                // Color: blue for positive, red for negative
                                var brightness = 0.3 + 0.7 * (q.z + R) / (2 * R); // lighting
                                brightness = Math.max(0.15, Math.min(1, brightness));
                                var r, g, b;
                                if (t >= 0) {
                                    r = Math.round(30 * brightness);
                                    g = Math.round((100 + 155 * t) * brightness);
                                    b = Math.round(255 * brightness);
                                } else {
                                    r = Math.round(255 * brightness);
                                    g = Math.round((100 + 155 * (1 + t)) * brightness);
                                    b = Math.round(30 * brightness);
                                }

                                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                ctx.beginPath();
                                ctx.moveTo(q.pts[0].px, q.pts[0].py);
                                ctx.lineTo(q.pts[1].px, q.pts[1].py);
                                ctx.lineTo(q.pts[2].px, q.pts[2].py);
                                ctx.lineTo(q.pts[3].px, q.pts[3].py);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Legend
                            var legW = 120, legH = 14;
                            var legX = viz.width - legW - 30, legY = viz.height - 40;
                            for (var li = 0; li < legW; li++) {
                                var lt = -1 + 2 * li / legW;
                                if (lt >= 0) {
                                    ctx.fillStyle = 'rgb(30,' + Math.round(100 + 155 * lt) + ',255)';
                                } else {
                                    ctx.fillStyle = 'rgb(255,' + Math.round(100 + 155 * (1 + lt)) + ',30)';
                                }
                                ctx.fillRect(legX + li, legY, 1, legH);
                            }
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('\u2212', legX, legY + legH + 2);
                            ctx.fillText('0', legX + legW / 2, legY + legH + 2);
                            ctx.fillText('+', legX + legW, legY + legH + 2);

                            // Number of angular nodes
                            var angularNodes = lVal;
                            var mNodes = m > 0 ? m : 0;
                            viz.screenText(
                                (lVal - m) + ' polar node' + (lVal - m !== 1 ? 's' : '') + ' + ' +
                                m + ' azimuthal node plane' + (m !== 1 ? 's' : '') +
                                ' = ' + angularNodes + ' total',
                                viz.width / 2, viz.height - 10, viz.colors.teal, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(Y_1^0(\\theta,\\varphi) = \\sqrt{\\frac{3}{4\\pi}}\\cos\\theta\\) is normalized: \\(\\int |Y_1^0|^2 d\\Omega = 1\\).',
                    hint: 'Use \\(d\\Omega = \\sin\\theta\\,d\\theta\\,d\\varphi\\) and \\(\\int_0^\\pi \\cos^2\\theta\\sin\\theta\\,d\\theta = 2/3\\).',
                    solution: '\\(\\int_0^{2\\pi}d\\varphi \\int_0^\\pi \\frac{3}{4\\pi}\\cos^2\\theta\\,\\sin\\theta\\,d\\theta = 2\\pi \\cdot \\frac{3}{4\\pi} \\cdot \\frac{2}{3} = 1\\). \\(\\checkmark\\)'
                },
                {
                    question: 'How many independent spherical harmonics exist for a given \\(\\ell\\)? What is the total count up to and including \\(\\ell = L\\)?',
                    hint: 'For each \\(\\ell\\), \\(m\\) ranges from \\(-\\ell\\) to \\(\\ell\\).',
                    solution: 'For given \\(\\ell\\): \\(2\\ell + 1\\) harmonics. Total up to \\(L\\): \\(\\sum_{\\ell=0}^{L}(2\\ell+1) = (L+1)^2\\). For example, \\(L=2\\) gives \\(1+3+5 = 9 = 3^2\\) harmonics.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Addition Theorem
        // ================================================================
        {
            id: 'sec-addition',
            title: 'Addition Theorem',
            content: `
<h2>The Addition Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">A Remarkable Identity</div>
    <div class="env-body">
        <p>Suppose you know the directions \\((\\theta_1,\\varphi_1)\\) and \\((\\theta_2,\\varphi_2)\\) of two unit vectors, and the angle \\(\\gamma\\) between them. The addition theorem says that \\(P_\\ell(\\cos\\gamma)\\), which looks like it should involve \\(\\gamma\\) alone, can be decomposed into a sum of products of spherical harmonics evaluated at the two directions separately. This is the angular analogue of the addition formula for cosines.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.6 (Addition Theorem for Spherical Harmonics)</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be the angle between directions \\((\\theta_1,\\varphi_1)\\) and \\((\\theta_2,\\varphi_2)\\). Then</p>
        \\[P_\\ell(\\cos\\gamma) = \\frac{4\\pi}{2\\ell+1}\\sum_{m=-\\ell}^{\\ell} Y_\\ell^m(\\theta_1,\\varphi_1)^*\\,Y_\\ell^m(\\theta_2,\\varphi_2).\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Idea</div>
    <div class="env-body">
        <p>Fix \\(\\hat{\\mathbf{r}}_1\\) and consider \\(P_\\ell(\\hat{\\mathbf{r}}_1 \\cdot \\hat{\\mathbf{r}}_2)\\) as a function of \\(\\hat{\\mathbf{r}}_2\\). This function satisfies the angular Laplacian eigenvalue equation with eigenvalue \\(\\ell(\\ell+1)\\), so it must be a linear combination of \\(Y_\\ell^m(\\theta_2,\\varphi_2)\\) for \\(m = -\\ell, \\ldots, \\ell\\). The coefficients are determined by orthonormality and the normalization \\(P_\\ell(1) = 1\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Consequences</h3>

<p>The addition theorem is the foundation of <strong>multipole expansions</strong>. The Coulomb potential of a charge at \\(\\mathbf{r}'\\) evaluated at \\(\\mathbf{r}\\) (with \\(r > r'\\)) is:</p>

\\[
\\frac{1}{|\\mathbf{r} - \\mathbf{r}'|} = \\sum_{\\ell=0}^{\\infty} \\frac{r'^\\ell}{r^{\\ell+1}} P_\\ell(\\cos\\gamma) = \\sum_{\\ell=0}^{\\infty}\\sum_{m=-\\ell}^{\\ell} \\frac{4\\pi}{2\\ell+1}\\frac{r'^\\ell}{r^{\\ell+1}}Y_\\ell^m(\\theta',\\varphi')^* Y_\\ell^m(\\theta,\\varphi).
\\]

<p>This separates the source coordinates \\((r',\\theta',\\varphi')\\) from the field coordinates \\((r,\\theta,\\varphi)\\), which is essential for computing multipole moments.</p>

<div class="viz-placeholder" data-viz="viz-addition-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-addition-theorem',
                    title: 'Addition Theorem Visualization',
                    description: 'See how P_l(cos gamma) is reconstructed from the sum of Y_l^m products. Choose a reference direction and watch the partial sums build up.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 230
                        });

                        var lVal = 3;
                        var theta1 = 0.5, phi1 = 0.3; // fixed reference direction

                        VizEngine.createSlider(controls, 'l', 1, 6, lVal, 1, function(v) {
                            lVal = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, '\u03B8\u2081', 0, 3.14, theta1, 0.05, function(v) {
                            theta1 = v;
                            draw();
                        });

                        function legendreP(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return x;
                            var p2 = 1, p1 = x, c;
                            for (var k = 1; k < n; k++) {
                                c = ((2*k+1)*x*p1 - k*p2)/(k+1);
                                p2 = p1; p1 = c;
                            }
                            return p1;
                        }

                        function assocLeg(l, m, x) {
                            if (m > l) return 0;
                            var pmm = 1;
                            if (m > 0) {
                                var somx2 = Math.sqrt(Math.max(0, 1 - x*x));
                                var f = 1;
                                for (var i = 1; i <= m; i++) { pmm *= -f * somx2; f += 2; }
                            }
                            if (l === m) return pmm;
                            var pmm1 = x * (2*m+1) * pmm;
                            if (l === m+1) return pmm1;
                            var pll = 0;
                            for (var ll = m+2; ll <= l; ll++) {
                                pll = ((2*ll-1)*x*pmm1 - (ll+m-1)*pmm)/(ll-m);
                                pmm = pmm1; pmm1 = pll;
                            }
                            return pll;
                        }

                        function factorial(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        function ylmReal(l, m, theta, phi) {
                            var absm = Math.abs(m);
                            var plm = assocLeg(l, absm, Math.cos(theta));
                            var norm = Math.sqrt((2*l+1)/(4*Math.PI) * factorial(l-absm)/factorial(l+absm));
                            if (m > 0) return norm * plm * Math.sqrt(2) * Math.cos(m * phi);
                            if (m < 0) return norm * plm * Math.sqrt(2) * Math.sin(absm * phi);
                            return norm * plm;
                        }

                        // Complex Y_l^m value (returns [re, im])
                        function ylmComplex(l, m, theta, phi) {
                            var absm = Math.abs(m);
                            var plm = assocLeg(l, absm, Math.cos(theta));
                            var norm = Math.sqrt((2*l+1)/(4*Math.PI) * factorial(l-absm)/factorial(l+absm));
                            if (m < 0) {
                                var sign = (absm % 2 === 0) ? 1 : -1;
                                norm *= sign;
                            }
                            var re = norm * plm * Math.cos(m * phi);
                            var im = norm * plm * Math.sin(m * phi);
                            return [re, im];
                        }

                        function additionSum(l, theta1v, phi1v, theta2, phi2) {
                            var sum = 0;
                            for (var m = -l; m <= l; m++) {
                                var y1 = ylmComplex(l, m, theta1v, phi1v);
                                var y2 = ylmComplex(l, m, theta2, phi2);
                                // Y1* . Y2 = (re1 - i*im1)(re2 + i*im2) real part = re1*re2 + im1*im2
                                sum += y1[0]*y2[0] + y1[1]*y2[1];
                            }
                            return sum * 4 * Math.PI / (2 * l + 1);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Addition Theorem: P' + lVal + '(cos \u03B3)', viz.width / 2, 15, viz.colors.white, 15);

                            // Plot P_l(cos gamma) vs gamma directly, and compare with sum formula
                            // gamma from 0 to pi
                            var plotLeft = 60, plotRight = viz.width - 30;
                            var plotTop = 45, plotBottom = 280;
                            var plotW = plotRight - plotLeft;
                            var plotH = plotBottom - plotTop;
                            var midY = (plotTop + plotBottom) / 2;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(plotLeft, plotBottom); ctx.lineTo(plotRight, plotBottom); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotLeft, plotTop); ctx.lineTo(plotLeft, plotBottom); ctx.stroke();
                            // Zero line
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(plotLeft, midY); ctx.lineTo(plotRight, midY); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('0', plotLeft, plotBottom + 4);
                            ctx.fillText('\u03C0/2', plotLeft + plotW/2, plotBottom + 4);
                            ctx.fillText('\u03C0', plotRight, plotBottom + 4);
                            ctx.fillText('\u03B3', plotRight + 10, plotBottom + 4);
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('1', plotLeft - 4, plotTop);
                            ctx.fillText('-1', plotLeft - 4, plotBottom);

                            // Draw P_l(cos gamma) (exact)
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var gamma = Math.PI * i / 300;
                                var val = legendreP(lVal, Math.cos(gamma));
                                var px = plotLeft + (gamma / Math.PI) * plotW;
                                var py = midY - val * (plotH / 2);
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw addition theorem sum (should overlay exactly)
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            for (var j = 0; j <= 100; j++) {
                                var gamma2 = Math.PI * j / 100;
                                // theta2 = gamma2 relative to fixed direction
                                // For simplicity, set phi2 = phi1 so cos(gamma) = cos(theta1)cos(theta2) + sin(theta1)sin(theta2)
                                // Actually compute proper gamma
                                var theta2 = gamma2;
                                var phi2 = 0;
                                var val2 = additionSum(lVal, theta1, phi1, theta2, phi2);
                                var px2 = plotLeft + (gamma2 / Math.PI) * plotW;
                                // Compute actual gamma between (theta1,phi1) and (theta2,phi2)
                                var cosGamma = Math.cos(theta1)*Math.cos(theta2) + Math.sin(theta1)*Math.sin(theta2)*Math.cos(phi1-phi2);
                                var actualGamma = Math.acos(Math.max(-1, Math.min(1, cosGamma)));
                                var px2a = plotLeft + (actualGamma / Math.PI) * plotW;
                                var py2 = midY - val2 * (plotH / 2);
                                if (j === 0) ctx.moveTo(px2a, py2); else ctx.lineTo(px2a, py2);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            ctx.fillStyle = viz.colors.blue; ctx.fillRect(plotLeft + 10, plotTop + 5, 20, 3);
                            ctx.fillStyle = viz.colors.blue; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('P_l(cos \u03B3) exact', plotLeft + 35, plotTop + 10);

                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(plotLeft + 10, plotTop + 22, 20, 3);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('\u03A3 Y*Y sum', plotLeft + 35, plotTop + 27);

                            // Lower panel: show partial sums m by m
                            var partY = 310;
                            viz.screenText('Partial sums: adding each m term', viz.width / 2, partY - 5, viz.colors.text, 11);
                            var barW = Math.min(30, plotW / (2 * lVal + 2));
                            var barStart = viz.width / 2 - (2 * lVal + 1) * barW / 2;
                            // Pick gamma = pi/3 as example
                            var testGamma = Math.PI / 3;
                            var testTheta2 = testGamma;
                            var testPhi2 = 0;
                            var cumSum = 0;
                            var target = legendreP(lVal, Math.cos(testGamma));

                            for (var mi = -lVal; mi <= lVal; mi++) {
                                var y1c = ylmComplex(lVal, mi, theta1, phi1);
                                var y2c = ylmComplex(lVal, mi, testTheta2, testPhi2);
                                var term = (y1c[0]*y2c[0] + y1c[1]*y2c[1]) * 4 * Math.PI / (2 * lVal + 1);
                                cumSum += term;

                                var bx = barStart + (mi + lVal) * barW;
                                var maxBar = 50;
                                var barH = (cumSum / (Math.abs(target) || 1)) * maxBar;
                                barH = Math.max(-maxBar, Math.min(maxBar, barH));

                                ctx.fillStyle = viz.colors.purple + '88';
                                if (barH >= 0) {
                                    ctx.fillRect(bx + 2, partY + 30 - barH, barW - 4, barH);
                                } else {
                                    ctx.fillRect(bx + 2, partY + 30, barW - 4, -barH);
                                }
                                ctx.fillStyle = viz.colors.text; ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText('m=' + mi, bx + barW/2, partY + 32 + Math.abs(barH));
                            }

                            // Target line
                            var targetBarH = target / (Math.abs(target) || 1) * 50;
                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
                            ctx.beginPath(); ctx.moveTo(barStart, partY + 30 - targetBarH); ctx.lineTo(barStart + (2*lVal+1)*barW, partY + 30 - targetBarH); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green; ctx.font = '10px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillText('P_l(cos 60\u00B0) = ' + target.toFixed(3), barStart + (2*lVal+1)*barW + 5, partY + 27 - targetBarH);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the addition theorem for \\(\\ell = 1\\) to derive the identity \\(\\cos\\gamma = \\cos\\theta_1\\cos\\theta_2 + \\sin\\theta_1\\sin\\theta_2\\cos(\\varphi_1 - \\varphi_2)\\).',
                    hint: 'Write out \\(Y_1^m\\) for \\(m = -1, 0, 1\\) and compute the sum explicitly.',
                    solution: 'For \\(\\ell=1\\): \\(P_1(\\cos\\gamma) = \\cos\\gamma\\). The addition theorem gives \\(\\cos\\gamma = \\frac{4\\pi}{3}\\sum_{m=-1}^{1}Y_1^{m*}(\\theta_1,\\varphi_1)Y_1^m(\\theta_2,\\varphi_2)\\). Substituting \\(Y_1^0 = \\sqrt{3/4\\pi}\\cos\\theta\\) and \\(Y_1^{\\pm 1} = \\mp\\sqrt{3/8\\pi}\\sin\\theta\\,e^{\\pm i\\varphi}\\), the \\(m=0\\) term gives \\(\\cos\\theta_1\\cos\\theta_2\\) and the \\(m = \\pm 1\\) terms combine to \\(\\sin\\theta_1\\sin\\theta_2\\cos(\\varphi_1-\\varphi_2)\\). This is exactly the spherical law of cosines.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Physical Applications
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Physical Applications',
            content: `
<h2>Physical Applications</h2>

<div class="env-block intuition">
    <div class="env-title">Why This Matters</div>
    <div class="env-body">
        <p>Legendre polynomials and spherical harmonics are not abstract curiosities; they are the language in which nature speaks whenever spherical geometry is involved. From the shape of gravitational fields to the quantum structure of atoms to the relic radiation from the Big Bang, these functions appear universally.</p>
    </div>
</div>

<h3>1. Gravitational and Electric Multipoles</h3>

<p>The potential due to an arbitrary charge (or mass) distribution at distances large compared to the source size can be expanded in <strong>multipole moments</strong>:</p>

\\[
\\Phi(\\mathbf{r}) = \\frac{1}{4\\pi\\epsilon_0}\\sum_{\\ell=0}^{\\infty}\\sum_{m=-\\ell}^{\\ell} \\frac{4\\pi}{2\\ell+1}\\frac{q_{\\ell m}}{r^{\\ell+1}}Y_\\ell^m(\\theta,\\varphi),
\\]

<p>where the <strong>multipole moments</strong> are</p>

\\[
q_{\\ell m} = \\int \\rho(\\mathbf{r}')\\,r'^\\ell\\,Y_\\ell^m(\\theta',\\varphi')^*\\,d^3r'.
\\]

<p>The \\(\\ell = 0\\) term is the monopole (total charge), \\(\\ell = 1\\) the dipole (charge separation), \\(\\ell = 2\\) the quadrupole (charge distribution shape), and so on. Each successive term falls off faster with distance: \\(1/r^{\\ell+1}\\).</p>

<div class="viz-placeholder" data-viz="viz-multipole-expansion"></div>

<h3>2. Quantum Angular Momentum</h3>

<p>In quantum mechanics, the spherical harmonics are simultaneous eigenfunctions of the angular momentum operators:</p>

\\[
\\hat{L}^2 Y_\\ell^m = \\hbar^2 \\ell(\\ell+1)\\,Y_\\ell^m, \\qquad \\hat{L}_z Y_\\ell^m = \\hbar m\\,Y_\\ell^m.
\\]

<p>The quantum number \\(\\ell\\) determines the total angular momentum magnitude \\(\\sqrt{\\ell(\\ell+1)}\\,\\hbar\\), and \\(m\\) determines its \\(z\\)-component \\(m\\hbar\\). This is why atomic orbitals have their characteristic shapes: the angular part of a hydrogen wavefunction is precisely \\(Y_\\ell^m(\\theta,\\varphi)\\).</p>

<ul>
    <li>\\(\\ell = 0\\): <strong>s-orbitals</strong> (spherical)</li>
    <li>\\(\\ell = 1\\): <strong>p-orbitals</strong> (dumbbell-shaped, 3 orientations)</li>
    <li>\\(\\ell = 2\\): <strong>d-orbitals</strong> (cloverleaf, 5 orientations)</li>
    <li>\\(\\ell = 3\\): <strong>f-orbitals</strong> (complex, 7 orientations)</li>
</ul>

<div class="viz-placeholder" data-viz="viz-orbital-shapes"></div>

<h3>3. The Cosmic Microwave Background</h3>

<p>The temperature fluctuations \\(\\Delta T(\\theta,\\varphi)\\) of the CMB are expanded in spherical harmonics:</p>

\\[
\\frac{\\Delta T}{T}(\\theta,\\varphi) = \\sum_{\\ell=1}^{\\infty}\\sum_{m=-\\ell}^{\\ell} a_{\\ell m}\\,Y_\\ell^m(\\theta,\\varphi).
\\]

<p>The <strong>angular power spectrum</strong> \\(C_\\ell = \\frac{1}{2\\ell+1}\\sum_m |a_{\\ell m}|^2\\) encodes the physics of the early universe. The famous acoustic peaks in \\(C_\\ell\\) (at \\(\\ell \\approx 200, 540, 800, \\ldots\\)) are the fingerprints of sound waves in the primordial plasma. Measuring these peaks has determined the curvature, composition, and age of the universe with percent-level precision.</p>

<div class="viz-placeholder" data-viz="viz-cmb"></div>
`,
            visualizations: [
                {
                    id: 'viz-multipole-expansion',
                    title: 'Multipole Expansion of a Potential',
                    description: 'See the potential of a charge distribution decomposed into monopole, dipole, quadrupole, and higher terms. Each successive term captures finer angular structure.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 60
                        });

                        var maxL = 0;

                        VizEngine.createSlider(controls, 'Max l', 0, 4, maxL, 1, function(v) {
                            maxL = Math.round(v);
                            draw();
                        });

                        function legendreP(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return x;
                            var p2 = 1, p1 = x, c;
                            for (var k = 1; k < n; k++) {
                                c = ((2*k+1)*x*p1 - k*p2)/(k+1);
                                p2 = p1; p1 = c;
                            }
                            return p1;
                        }

                        // Model: two charges at +d and -d along z-axis (dipole)
                        // plus a quadrupole perturbation
                        var charges = [
                            { q: 1.0, z: 0.5 },
                            { q: -0.7, z: -0.5 },
                            { q: 0.3, z: 0.0 }
                        ];

                        // Compute multipole moments q_l (axial, so m=0 only)
                        function multipoleQ(l) {
                            var q = 0;
                            for (var i = 0; i < charges.length; i++) {
                                var ch = charges[i];
                                var rp = Math.abs(ch.z);
                                var cosTheta = ch.z >= 0 ? 1 : -1;
                                if (rp < 1e-10) cosTheta = 1;
                                q += ch.q * Math.pow(rp, l) * legendreP(l, cosTheta);
                            }
                            return q;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var names = ['Monopole', 'Dipole', 'Quadrupole', 'Octupole', 'Hexadecapole'];
                            var titleParts = [];
                            for (var ti = 0; ti <= maxL; ti++) titleParts.push(names[ti] || 'l=' + ti);
                            viz.screenText('Multipole expansion: ' + titleParts.join(' + '), viz.width / 2, 15, viz.colors.white, 13);

                            // Draw potential as heatmap using pixel-by-pixel coloring
                            var pw = viz.width, ph = viz.height;
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;

                            // Compute exact potential and multipole approximation
                            var vMin = -2, vMax = 2;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var x = (px - viz.originX) / viz.scale;
                                    var y = (viz.originY - py) / viz.scale;
                                    var r = Math.sqrt(x * x + y * y);

                                    var val = 0;
                                    if (r > 0.8) {
                                        var cosTheta = y / r;
                                        for (var l = 0; l <= maxL; l++) {
                                            val += multipoleQ(l) * legendreP(l, cosTheta) / Math.pow(r, l + 1);
                                        }
                                    }

                                    var t = (val - vMin) / (vMax - vMin);
                                    t = Math.max(0, Math.min(1, t));

                                    // Diverging colormap: blue (negative) - white (zero) - red (positive)
                                    var rv, gv, bv;
                                    if (t < 0.5) {
                                        var s = t * 2;
                                        rv = Math.round(30 + 225 * s);
                                        gv = Math.round(30 + 225 * s);
                                        bv = Math.round(200 + 55 * s);
                                    } else {
                                        var s2 = (t - 0.5) * 2;
                                        rv = Math.round(255 - 55 * (1 - s2));
                                        gv = Math.round(255 - 225 * s2);
                                        bv = Math.round(255 - 225 * s2);
                                    }

                                    if (r <= 0.8) {
                                        rv = 20; gv = 20; bv = 40;
                                    }

                                    var idx = (py * pw + px) * 4;
                                    data[idx] = rv; data[idx+1] = gv; data[idx+2] = bv; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            // Draw charges
                            for (var ci = 0; ci < charges.length; ci++) {
                                var ch = charges[ci];
                                var csx = viz.originX;
                                var csy = viz.originY - ch.z * viz.scale;
                                ctx.beginPath(); ctx.arc(csx, csy, 6, 0, Math.PI * 2);
                                ctx.fillStyle = ch.q > 0 ? viz.colors.red : viz.colors.blue;
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1; ctx.stroke();
                                ctx.fillStyle = viz.colors.white; ctx.font = 'bold 9px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(ch.q > 0 ? '+' : '\u2212', csx, csy);
                            }

                            // Multipole moment values
                            var infoY = viz.height - 35;
                            ctx.fillStyle = '#00000088';
                            ctx.fillRect(5, infoY - 5, viz.width - 10, 35);
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            var infoStr = '';
                            for (var li = 0; li <= Math.min(maxL, 4); li++) {
                                infoStr += 'q' + li + ' = ' + multipoleQ(li).toFixed(3) + '   ';
                            }
                            ctx.fillText(infoStr, 15, infoY);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-orbital-shapes',
                    title: 'Hydrogen Orbital Shapes',
                    description: 'Visualize the angular probability distributions |Y_l^m|^2 that define the shapes of s, p, d, and f orbitals. These are the angular parts of hydrogen wavefunctions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var orbitalType = 0; // 0=s, 1=p, 2=d, 3=f

                        VizEngine.createButton(controls, 's (l=0)', function() { orbitalType = 0; draw(); });
                        VizEngine.createButton(controls, 'p (l=1)', function() { orbitalType = 1; draw(); });
                        VizEngine.createButton(controls, 'd (l=2)', function() { orbitalType = 2; draw(); });
                        VizEngine.createButton(controls, 'f (l=3)', function() { orbitalType = 3; draw(); });

                        function assocLeg(l, m, x) {
                            if (m > l) return 0;
                            var pmm = 1;
                            if (m > 0) {
                                var somx2 = Math.sqrt(Math.max(0, 1 - x*x));
                                var f = 1;
                                for (var i = 1; i <= m; i++) { pmm *= -f * somx2; f += 2; }
                            }
                            if (l === m) return pmm;
                            var pmm1 = x * (2*m+1) * pmm;
                            if (l === m+1) return pmm1;
                            var pll = 0;
                            for (var ll = m+2; ll <= l; ll++) {
                                pll = ((2*ll-1)*x*pmm1 - (ll+m-1)*pmm)/(ll-m);
                                pmm = pmm1; pmm1 = pll;
                            }
                            return pll;
                        }

                        function factorial(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        function realYlm(l, m, theta, phi) {
                            var absm = Math.abs(m);
                            var plm = assocLeg(l, absm, Math.cos(theta));
                            var norm = Math.sqrt((2*l+1)/(4*Math.PI) * factorial(l-absm)/factorial(l+absm));
                            if (absm > 0) norm *= Math.sqrt(2);
                            var angular = m >= 0 ? Math.cos(absm * phi) : Math.sin(absm * phi);
                            return norm * plm * angular;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var l = orbitalType;
                            var orbitals = [];
                            var orbNames = {0: ['s'], 1: ['p_z', 'p_x', 'p_y'], 2: ['d_z\u00B2', 'd_xz', 'd_yz', 'd_x\u00B2-y\u00B2', 'd_xy'], 3: ['f_z\u00B3', 'f_xz\u00B2', 'f_yz\u00B2', 'f_z(x\u00B2-y\u00B2)', 'f_xyz', 'f_x(x\u00B2-3y\u00B2)', 'f_y(3x\u00B2-y\u00B2)']};
                            var names = orbNames[l];

                            // m values: 0, 1, -1, 2, -2, 3, -3
                            var mVals = [0];
                            for (var mi = 1; mi <= l; mi++) { mVals.push(mi); mVals.push(-mi); }

                            var count = 2 * l + 1;
                            var cols = Math.min(count, 4);
                            var rows = Math.ceil(count / cols);
                            var cellW = viz.width / cols;
                            var cellH = (viz.height - 40) / rows;
                            var R = Math.min(cellW, cellH) * 0.35;

                            viz.screenText('l = ' + l + ' orbitals  (' + names.length + ' orientations)', viz.width / 2, 15, viz.colors.white, 14);

                            for (var oi = 0; oi < count; oi++) {
                                var m = mVals[oi];
                                var col = oi % cols;
                                var row = Math.floor(oi / cols);
                                var cx = cellW * (col + 0.5);
                                var cy = 40 + cellH * (row + 0.5);

                                // Draw cross-section in xz plane (phi=0)
                                // Angular probability |Y_l^m|^2 as polar plot
                                var nPts = 200;
                                ctx.beginPath();
                                for (var j = 0; j <= nPts; j++) {
                                    var theta = Math.PI * j / nPts;
                                    var yVal = realYlm(l, m, theta, 0);
                                    var rr = Math.abs(yVal);
                                    var px = cx + rr * R * 4 * Math.sin(theta);
                                    var py = cy - rr * R * 4 * Math.cos(theta);
                                    if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                                }
                                ctx.closePath();

                                // Fill by sign at theta=0
                                var topVal = realYlm(l, m, 0.1, 0);
                                ctx.fillStyle = topVal >= 0 ? viz.colors.blue + '44' : viz.colors.red + '44';
                                ctx.fill();
                                ctx.strokeStyle = topVal >= 0 ? viz.colors.blue : viz.colors.red;
                                ctx.lineWidth = 1.5;
                                ctx.stroke();

                                // Also draw the negative lobe
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= nPts; j2++) {
                                    var theta2 = Math.PI * j2 / nPts;
                                    var yVal2 = realYlm(l, m, theta2, 0);
                                    var rr2 = Math.abs(yVal2);
                                    var px2 = cx - rr2 * R * 4 * Math.sin(theta2);
                                    var py2 = cy - rr2 * R * 4 * Math.cos(theta2);
                                    if (j2 === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
                                }
                                ctx.closePath();
                                var botVal = realYlm(l, m, Math.PI - 0.1, 0);
                                ctx.fillStyle = botVal >= 0 ? viz.colors.blue + '44' : viz.colors.red + '44';
                                ctx.fill();
                                ctx.strokeStyle = botVal >= 0 ? viz.colors.blue : viz.colors.red;
                                ctx.lineWidth = 1.5;
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                ctx.fillText(names[oi] || 'm=' + m, cx, cy + cellH * 0.45);

                                // Axis hint
                                ctx.strokeStyle = viz.colors.axis + '44'; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(cx, cy - R * 1.3); ctx.lineTo(cx, cy + R * 1.3); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(cx - R * 1.3, cy); ctx.lineTo(cx + R * 1.3, cy); ctx.stroke();
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-cmb',
                    title: 'CMB Spherical Harmonic Decomposition',
                    description: 'A simulated CMB temperature map decomposed into spherical harmonics. The power spectrum C_l shows the famous acoustic peaks that reveal the geometry of the universe.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var maxL = 20;

                        VizEngine.createSlider(controls, 'Max l', 1, 30, maxL, 1, function(v) {
                            maxL = Math.round(v);
                            draw();
                        });

                        // Generate random a_lm coefficients with a realistic-ish power spectrum
                        // C_l ~ l(l+1) with acoustic peaks
                        var rng = (function() {
                            var s = 12345;
                            return function() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
                        })();

                        function gaussRand() {
                            var u1 = rng(), u2 = rng();
                            return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2);
                        }

                        // Model power spectrum with acoustic peaks
                        function modelCl(l) {
                            if (l === 0) return 0;
                            // Sachs-Wolfe plateau + acoustic peaks (simplified)
                            var base = 1000 / (l * (l + 1));
                            // Acoustic peaks at l ~ 200, 540, 800
                            var peak1 = 3 * Math.exp(-(l - 10) * (l - 10) / 20);
                            var peak2 = 2 * Math.exp(-(l - 20) * (l - 20) / 30);
                            var peak3 = 1.2 * Math.exp(-(l - 28) * (l - 28) / 25);
                            return base + peak1 + peak2 + peak3;
                        }

                        // Pre-generate coefficients
                        var alm = {};
                        for (var l = 0; l <= 40; l++) {
                            var cl = modelCl(l);
                            for (var m = -l; m <= l; m++) {
                                alm[l + ',' + m] = gaussRand() * Math.sqrt(cl);
                            }
                        }

                        function assocLeg(l, m, x) {
                            if (m > l) return 0;
                            var pmm = 1;
                            if (m > 0) {
                                var somx2 = Math.sqrt(Math.max(0, 1 - x*x));
                                var f = 1;
                                for (var i = 1; i <= m; i++) { pmm *= -f * somx2; f += 2; }
                            }
                            if (l === m) return pmm;
                            var pmm1 = x * (2*m+1) * pmm;
                            if (l === m+1) return pmm1;
                            var pll = 0;
                            for (var ll = m+2; ll <= l; ll++) {
                                pll = ((2*ll-1)*x*pmm1 - (ll+m-1)*pmm)/(ll-m);
                                pmm = pmm1; pmm1 = pll;
                            }
                            return pll;
                        }

                        function factorial(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

                        function realYlm(l, m, theta, phi) {
                            var absm = Math.abs(m);
                            var plm = assocLeg(l, absm, Math.cos(theta));
                            var norm = Math.sqrt((2*l+1)/(4*Math.PI) * factorial(l-absm)/factorial(l+absm));
                            if (absm > 0) norm *= Math.sqrt(2);
                            var angular = m >= 0 ? Math.cos(absm * phi) : Math.sin(absm * phi);
                            return norm * plm * angular;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Simulated CMB Temperature Fluctuations (max l = ' + maxL + ')', viz.width / 2, 12, viz.colors.white, 13);

                            // Mollweide projection of the CMB
                            var mapW = viz.width - 40, mapH = 180;
                            var mapX0 = 20, mapY0 = 30;
                            var mapCx = mapX0 + mapW / 2, mapCy = mapY0 + mapH / 2;
                            var mapRx = mapW / 2, mapRy = mapH / 2;

                            // Draw Mollweide map
                            var imgData = ctx.createImageData(mapW, mapH);
                            var data = imgData.data;
                            var vMin = Infinity, vMax = -Infinity;
                            var valBuf = new Float32Array(mapW * mapH);

                            for (var py = 0; py < mapH; py++) {
                                for (var px = 0; px < mapW; px++) {
                                    // Mollweide inverse
                                    var xn = (px - mapW / 2) / (mapW / 2);
                                    var yn = (py - mapH / 2) / (mapH / 2);
                                    if (xn * xn + yn * yn > 1) {
                                        valBuf[py * mapW + px] = NaN;
                                        continue;
                                    }
                                    var auxTheta = Math.asin(yn);
                                    var lat = Math.asin((2 * auxTheta + Math.sin(2 * auxTheta)) / Math.PI);
                                    var lon = Math.PI * xn / Math.cos(auxTheta);
                                    if (Math.abs(lon) > Math.PI) { valBuf[py * mapW + px] = NaN; continue; }

                                    var theta = Math.PI / 2 - lat;
                                    var phi = lon + Math.PI;

                                    var temp = 0;
                                    for (var l = 1; l <= Math.min(maxL, 30); l++) {
                                        for (var m = -l; m <= l; m++) {
                                            temp += (alm[l + ',' + m] || 0) * realYlm(l, m, theta, phi);
                                        }
                                    }
                                    valBuf[py * mapW + px] = temp;
                                    if (temp < vMin) vMin = temp;
                                    if (temp > vMax) vMax = temp;
                                }
                            }

                            var range = Math.max(Math.abs(vMin), Math.abs(vMax)) || 1;
                            for (var i = 0; i < mapW * mapH; i++) {
                                var val = valBuf[i];
                                var idx = i * 4;
                                if (isNaN(val)) {
                                    data[idx] = 12; data[idx+1] = 12; data[idx+2] = 32; data[idx+3] = 255;
                                    continue;
                                }
                                var t = val / range; // -1 to 1
                                t = Math.max(-1, Math.min(1, t));
                                // CMB-style colormap: blue -> black -> red -> yellow
                                var rv, gv, bv;
                                if (t < -0.5) {
                                    var s = (t + 1) * 2;
                                    rv = 0; gv = 0; bv = Math.round(100 + 155 * s);
                                } else if (t < 0) {
                                    var s2 = (t + 0.5) * 2;
                                    rv = 0; gv = 0; bv = Math.round(255 * (1 - s2));
                                } else if (t < 0.5) {
                                    var s3 = t * 2;
                                    rv = Math.round(255 * s3); gv = 0; bv = 0;
                                } else {
                                    var s4 = (t - 0.5) * 2;
                                    rv = 255; gv = Math.round(220 * s4); bv = 0;
                                }
                                data[idx] = rv; data[idx+1] = gv; data[idx+2] = bv; data[idx+3] = 255;
                            }
                            ctx.putImageData(imgData, mapX0, mapY0);

                            // Mollweide outline
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.ellipse(mapCx, mapCy, mapRx, mapRy, 0, 0, 2 * Math.PI);
                            ctx.stroke();

                            // Power spectrum plot below
                            var specTop = mapY0 + mapH + 30;
                            var specH = viz.height - specTop - 30;
                            var specLeft = 60, specRight = viz.width - 20;
                            var specW = specRight - specLeft;

                            viz.screenText('Angular Power Spectrum  C_l', viz.width / 2, specTop - 15, viz.colors.white, 12);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(specLeft, specTop + specH); ctx.lineTo(specRight, specTop + specH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(specLeft, specTop); ctx.lineTo(specLeft, specTop + specH); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('l', specRight, specTop + specH + 4);

                            // Compute and plot C_l
                            var cls = [];
                            var maxCl = 0;
                            var plotMaxL = 30;
                            for (var cl = 1; cl <= plotMaxL; cl++) {
                                var clVal = 0;
                                for (var cm = -cl; cm <= cl; cm++) {
                                    var a = alm[cl + ',' + cm] || 0;
                                    clVal += a * a;
                                }
                                clVal /= (2 * cl + 1);
                                // Plot l(l+1)C_l
                                var plotVal = cl * (cl + 1) * clVal;
                                cls.push(plotVal);
                                if (plotVal > maxCl) maxCl = plotVal;
                            }

                            // Draw measured C_l bars
                            var barW = specW / plotMaxL;
                            for (var bi = 0; bi < cls.length; bi++) {
                                var bx = specLeft + bi * barW;
                                var bh = (cls[bi] / (maxCl || 1)) * (specH - 10);
                                var isIncluded = (bi + 1) <= maxL;
                                ctx.fillStyle = isIncluded ? viz.colors.orange : viz.colors.text + '44';
                                ctx.fillRect(bx + 1, specTop + specH - bh, barW - 2, bh);
                            }

                            // Model curve
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var mi = 1; mi <= plotMaxL; mi++) {
                                var modVal = mi * (mi + 1) * modelCl(mi);
                                var mx = specLeft + (mi - 0.5) * barW;
                                var my = specTop + specH - (modVal / (maxCl || 1)) * (specH - 10);
                                if (mi === 1) ctx.moveTo(mx, my); else ctx.lineTo(mx, my);
                            }
                            ctx.stroke();

                            // L labels
                            for (var li = 5; li <= plotMaxL; li += 5) {
                                var lx = specLeft + (li - 0.5) * barW;
                                ctx.fillStyle = viz.colors.text; ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText(li.toString(), lx, specTop + specH + 3);
                            }

                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('l(l+1)C_l', specLeft - 4, specTop + 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A point charge \\(q\\) sits at position \\((0, 0, d)\\). Write the potential for \\(r > d\\) as a multipole expansion and identify the first three terms (monopole, dipole, quadrupole).',
                    hint: 'Use the generating function expansion: \\(1/|\\mathbf{r} - \\mathbf{r}\'| = \\sum_l (r\'/r)^l P_l(\\cos\\theta)/r\\) with \\(r\' = d\\).',
                    solution: '\\(\\Phi = \\frac{q}{4\\pi\\epsilon_0}\\sum_{l=0}^{\\infty}\\frac{d^l}{r^{l+1}}P_l(\\cos\\theta)\\). Monopole (\\(l=0\\)): \\(\\frac{q}{4\\pi\\epsilon_0 r}\\). Dipole (\\(l=1\\)): \\(\\frac{qd\\cos\\theta}{4\\pi\\epsilon_0 r^2}\\). Quadrupole (\\(l=2\\)): \\(\\frac{qd^2(3\\cos^2\\theta-1)}{8\\pi\\epsilon_0 r^3}\\).'
                },
                {
                    question: 'In the hydrogen atom, what are the allowed values of \\(\\ell\\) and \\(m\\) for the \\(n = 3\\) energy level? How many distinct angular wavefunctions exist?',
                    hint: 'For principal quantum number \\(n\\), \\(\\ell\\) ranges from \\(0\\) to \\(n-1\\), and for each \\(\\ell\\), \\(m\\) ranges from \\(-\\ell\\) to \\(\\ell\\).',
                    solution: 'For \\(n=3\\): \\(\\ell = 0, 1, 2\\). For \\(\\ell=0\\): \\(m=0\\) (1 state). For \\(\\ell=1\\): \\(m=-1,0,1\\) (3 states). For \\(\\ell=2\\): \\(m=-2,-1,0,1,2\\) (5 states). Total: \\(1+3+5 = 9\\) distinct angular wavefunctions. Including spin (factor of 2): 18 states total, which equals \\(2n^2\\).'
                },
                {
                    question: 'The CMB dipole (\\(\\ell = 1\\)) has amplitude \\(\\Delta T/T \\approx 1.2 \\times 10^{-3}\\), much larger than higher multipoles (\\(\\sim 10^{-5}\\)). Why is this dipole not considered cosmologically significant?',
                    hint: 'Think about what happens when you observe isotropic radiation while moving.',
                    solution: 'The \\(\\ell=1\\) dipole is dominated by the Doppler effect from Earth\'s motion relative to the CMB rest frame (\\(v \\approx 370\\) km/s toward Leo). This kinematic dipole is not intrinsic to the CMB. After subtracting it, the intrinsic anisotropies at \\(\\ell \\geq 2\\) are at the \\(10^{-5}\\) level and carry genuine cosmological information (primordial density fluctuations).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Forward',
            content: `
<h2>Looking Forward</h2>

<p>The Legendre polynomials and spherical harmonics form one branch of a larger family. Here we pause to connect what we have learned and preview what comes next.</p>

<h3>What We Have Built</h3>

<p>Starting from the simple requirement of solving Laplace's equation in spherical coordinates, we constructed a hierarchy of special functions:</p>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #333;">
    <th style="text-align:left;padding:6px;">Function</th>
    <th style="text-align:left;padding:6px;">Domain</th>
    <th style="text-align:left;padding:6px;">Role</th>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">\\(P_n(x)\\)</td>
    <td style="padding:6px;">\\([-1,1]\\)</td>
    <td style="padding:6px;">Axially symmetric angular solutions</td>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">\\(P_\\ell^m(x)\\)</td>
    <td style="padding:6px;">\\([-1,1]\\)</td>
    <td style="padding:6px;">Polar angle factor with azimuthal number \\(m\\)</td>
</tr>
<tr style="border-bottom:1px solid #222;">
    <td style="padding:6px;">\\(Y_\\ell^m(\\theta,\\varphi)\\)</td>
    <td style="padding:6px;">\\(S^2\\)</td>
    <td style="padding:6px;">Complete angular eigenfunctions on the sphere</td>
</tr>
</table>

<h3>Connections to Other Special Functions</h3>

<p>The Legendre/spherical harmonic story parallels other eigenfunction expansions we will encounter:</p>

<ul>
    <li><strong>Bessel functions</strong> (cylindrical geometry): Just as Legendre polynomials arise in spherical problems, Bessel functions \\(J_n(x)\\) arise when separating the Laplacian in cylindrical coordinates. Where Legendre polynomials have finitely many zeros in \\([-1,1]\\), Bessel functions have infinitely many on \\([0,\\infty)\\).</li>
    <li><strong>Hermite and Laguerre polynomials</strong> (quantum harmonic oscillator and radial hydrogen atom): These are orthogonal polynomials on different domains with different weight functions, but share the Sturm-Liouville structure.</li>
    <li><strong>Wigner D-matrices</strong> (rotation group): Spherical harmonics are a special case of the representation matrices of SO(3). This group-theoretic perspective unifies angular momentum theory in quantum mechanics.</li>
</ul>

<h3>The Bigger Picture</h3>

<div class="env-block remark">
    <div class="env-title">Symmetry Determines the Functions</div>
    <div class="env-body">
        <p>There is a deep pattern here: <strong>the symmetry of the physical problem determines the coordinate system, which determines the special functions</strong>. Spherical symmetry gives Legendre/spherical harmonics. Cylindrical symmetry gives Bessel functions. Translational symmetry gives Fourier modes. This is not a coincidence; it is the mathematical expression of the fact that the eigenfunctions of the Laplacian in a given geometry are adapted to the symmetry group of that geometry.</p>
    </div>
</div>

<p>In the next chapter, we will see Bessel functions perform the same role for cylindrical and circular geometries that spherical harmonics perform for the sphere.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Summarize the analogy: what is the "Fourier transform on the sphere"? In what sense does it generalize the Fourier series?',
                    hint: 'Compare the expansion in spherical harmonics with the Fourier series on the circle.',
                    solution: 'The Fourier series expands functions on the circle \\(S^1\\) in terms of \\(e^{in\\theta}\\), eigenfunctions of \\(d^2/d\\theta^2\\). The spherical harmonic expansion does the same for \\(S^2\\), using \\(Y_\\ell^m\\) as eigenfunctions of the angular Laplacian. In both cases: orthonormal eigenbasis, Parseval identity, convolution theorem. The "multipole index" \\(\\ell\\) is the analogue of frequency \\(n\\), and \\(m\\) is an additional degree of freedom from the extra dimension of the sphere. The angular power spectrum \\(C_\\ell\\) is the analogue of the Fourier power spectrum \\(|\\hat{f}_n|^2\\).'
                }
            ]
        }
    ]
});
