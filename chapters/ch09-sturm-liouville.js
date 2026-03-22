window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Sturm-Liouville & Eigenfunction Expansions',
    subtitle: 'The spectral theory behind separation of variables',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Sturm-Liouville?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Sturm-Liouville Theory?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>You have seen separation of variables produce ODEs of the form \\(X''(x) + \\lambda X(x) = 0\\) with boundary conditions. Only special values of \\(\\lambda\\) give nontrivial solutions. These special values are <em>eigenvalues</em>, and the corresponding solutions are <em>eigenfunctions</em>. Sturm-Liouville theory is the general framework that explains why this works, why the eigenvalues are real, why the eigenfunctions are orthogonal, and why you can expand arbitrary functions in terms of them.</p>
    </div>
</div>

<p>Every physicist's workhorse, the method of separation of variables, rests on a single mathematical foundation: the Sturm-Liouville eigenvalue problem. When you separate the heat equation, wave equation, or Schrodinger equation in any coordinate system, each separated ODE is a Sturm-Liouville problem. The special functions of mathematical physics (Legendre polynomials, Bessel functions, Hermite polynomials, spherical harmonics) are all eigenfunctions of particular Sturm-Liouville operators.</p>

<h3>A Unifying Structure</h3>

<p>Consider these familiar equations:</p>

<div class="env-block example">
    <div class="env-title">Example: Separated ODEs from Physics</div>
    <div class="env-body">
        <ol>
            <li><strong>Vibrating string:</strong> \\(X'' + \\lambda X = 0\\), with \\(X(0) = X(L) = 0\\).</li>
            <li><strong>Legendre equation:</strong> \\(\\frac{d}{dx}\\left[(1 - x^2)\\frac{dP}{dx}\\right] + \\ell(\\ell+1) P = 0\\).</li>
            <li><strong>Bessel equation:</strong> \\(\\frac{d}{dx}\\left[x\\frac{dR}{dx}\\right] + \\left(\\lambda x - \\frac{m^2}{x}\\right)R = 0\\).</li>
            <li><strong>Quantum harmonic oscillator:</strong> \\(-\\psi'' + x^2 \\psi = \\lambda \\psi\\).</li>
        </ol>
        <p>Every one of these is a Sturm-Liouville problem. The theory we develop here applies to all of them simultaneously.</p>
    </div>
</div>

<h3>What the Theory Guarantees</h3>

<p>For a properly posed Sturm-Liouville problem, the theory guarantees:</p>
<ol>
    <li><strong>Discrete eigenvalues:</strong> There is a countable sequence \\(\\lambda_1 < \\lambda_2 < \\lambda_3 < \\cdots \\to \\infty\\).</li>
    <li><strong>Real eigenvalues:</strong> Every \\(\\lambda_n\\) is real.</li>
    <li><strong>Orthogonal eigenfunctions:</strong> If \\(\\lambda_m \\neq \\lambda_n\\), then \\(\\langle \\phi_m, \\phi_n \\rangle_w = 0\\) with respect to a weight function \\(w(x)\\).</li>
    <li><strong>Completeness:</strong> Any "reasonable" function can be expanded as \\(f(x) = \\sum_{n=1}^{\\infty} c_n \\phi_n(x)\\).</li>
</ol>

<p>These four properties are <em>exactly</em> what you need for separation of variables to work. The eigenfunction expansion is a generalized Fourier series, and completeness ensures you can satisfy arbitrary initial or boundary conditions.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Jacques Charles Francois Sturm (1803-1855) and Joseph Liouville (1809-1882) developed this theory in a series of papers in the 1830s. Their work predated the formal notion of a Hilbert space by decades, yet they proved results about eigenvalues, orthogonality, and completeness that anticipated functional analysis. It was one of the first great triumphs of spectral theory.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Sturm-Liouville Problem
        // ================================================================
        {
            id: 'sec-problem',
            title: 'The Sturm-Liouville Problem',
            content: `
<h2>The Sturm-Liouville Problem</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Sturm-Liouville Equation)</div>
    <div class="env-body">
        <p>A <strong>Sturm-Liouville equation</strong> on an interval \\([a, b]\\) is a second-order ODE of the form</p>
        \\[
        \\frac{d}{dx}\\left[p(x)\\frac{dy}{dx}\\right] + q(x)y + \\lambda\\, w(x)\\, y = 0,
        \\]
        <p>or equivalently,</p>
        \\[
        \\mathcal{L}[y] = -\\lambda\\, w(x)\\, y, \\qquad \\mathcal{L} = -\\frac{d}{dx}\\left[p(x)\\frac{d}{dx}\\right] - q(x),
        \\]
        <p>where \\(p(x) > 0\\), \\(w(x) > 0\\) on \\((a, b)\\), and \\(p, p', q, w\\) are continuous. Here \\(\\lambda\\) is the eigenvalue parameter and \\(w(x)\\) is the <strong>weight function</strong>.</p>
    </div>
</div>

<p>The operator \\(\\mathcal{L}\\) is a second-order differential operator. The minus sign is a convention that makes the eigenvalues come out positive for many physical problems.</p>

<h3>Boundary Conditions</h3>

<p>The equation alone does not determine the eigenvalues. We need boundary conditions at \\(x = a\\) and \\(x = b\\). There are three common types:</p>

<div class="env-block definition">
    <div class="env-title">Definition (Types of Boundary Conditions)</div>
    <div class="env-body">
        <ol>
            <li><strong>Regular Sturm-Liouville problem:</strong> \\(p(a) > 0\\), \\(p(b) > 0\\), with separated boundary conditions:
            \\[
            \\alpha_1 y(a) + \\alpha_2 y'(a) = 0, \\qquad \\beta_1 y(b) + \\beta_2 y'(b) = 0.
            \\]</li>
            <li><strong>Periodic boundary conditions:</strong> \\(y(a) = y(b)\\) and \\(y'(a) = y'(b)\\).</li>
            <li><strong>Singular Sturm-Liouville problem:</strong> \\(p(a) = 0\\) or \\(p(b) = 0\\) (or the interval is unbounded). The boundary condition is replaced by a <em>regularity</em> requirement: the solution must remain bounded.</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Classifying Physical Problems</div>
    <div class="env-body">
        <ul>
            <li><strong>Vibrating string</strong> \\((X'' + \\lambda X = 0,\\; X(0) = X(L) = 0)\\): Regular. Here \\(p = 1\\), \\(q = 0\\), \\(w = 1\\), with Dirichlet conditions.</li>
            <li><strong>Legendre equation</strong> on \\([-1, 1]\\): Singular, since \\(p(x) = 1 - x^2\\) vanishes at \\(x = \\pm 1\\). The boundary condition is boundedness of \\(P(\\pm 1)\\).</li>
            <li><strong>Bessel equation</strong> on \\([0, R]\\): Singular at \\(x = 0\\) since \\(p(x) = x\\) vanishes there. We require \\(R(0)\\) bounded; at \\(x = R\\) we impose \\(R(R) = 0\\).</li>
        </ul>
    </div>
</div>

<h3>Self-Adjointness: The Key Property</h3>

<p>The reason Sturm-Liouville theory works is that \\(\\mathcal{L}\\) is a <strong>self-adjoint</strong> (Hermitian) operator with respect to the weighted inner product</p>
\\[
\\langle f, g \\rangle_w = \\int_a^b f(x)\\, g(x)\\, w(x)\\, dx.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 9.1 (Self-Adjointness via Lagrange's Identity)</div>
    <div class="env-body">
        <p>For functions \\(u, v\\) satisfying the boundary conditions of a Sturm-Liouville problem,</p>
        \\[
        \\langle \\mathcal{L}u, v \\rangle_w = \\langle u, \\mathcal{L}v \\rangle_w.
        \\]
        <p>This follows from integration by parts (Green's/Lagrange's identity):</p>
        \\[
        \\int_a^b \\left[u\\,\\mathcal{L}v - v\\,\\mathcal{L}u\\right] w\\, dx = \\left[p(x)\\left(u v' - v u'\\right)\\right]_a^b = 0,
        \\]
        <p>where the boundary term vanishes because of the boundary conditions.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Write out \\(\\langle \\mathcal{L}u, v \\rangle_w\\) and integrate by parts twice. The first integration by parts gives</p>
        \\[
        \\int_a^b \\frac{d}{dx}\\left[p\\, u'\\right] v\\, dx = \\left[p\\, u' v\\right]_a^b - \\int_a^b p\\, u' v'\\, dx.
        \\]
        <p>The second term is symmetric in \\(u\\) and \\(v\\). The boundary term vanishes when both \\(u\\) and \\(v\\) satisfy the Sturm-Liouville boundary conditions. This is exactly the condition for self-adjointness.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<p>Self-adjointness of \\(\\mathcal{L}\\) is the differential-equation analogue of a real symmetric matrix. All the beautiful spectral properties (real eigenvalues, orthogonal eigenfunctions, completeness) flow from this single property.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Put the equation \\(x^2 y\'\' + x y\' + (\\lambda x^2 - m^2) y = 0\\) (Bessel\'s equation) into Sturm-Liouville form. Identify \\(p(x)\\), \\(q(x)\\), and \\(w(x)\\).',
                    hint: 'Divide through by \\(x\\) to get the form \\(\\frac{d}{dx}[p\\, y\'] + q\\, y + \\lambda\\, w\\, y = 0\\). Check that \\(\\frac{d}{dx}[x\\, y\'] = x y\'\' + y\'\\).',
                    solution: 'Dividing by \\(x\\): \\(x y\'\' + y\' + (\\lambda x - m^2/x) y = 0\\). Note \\(\\frac{d}{dx}[x\\, y\'] = x y\'\' + y\'\\). So the SL form is \\(\\frac{d}{dx}[x\\, y\'] + (-m^2/x) y + \\lambda\\, x\\, y = 0\\). Thus \\(p(x) = x\\), \\(q(x) = -m^2/x\\), \\(w(x) = x\\). This is singular at \\(x = 0\\) since \\(p(0) = 0\\).'
                },
                {
                    question: 'Show that the operator \\(\\mathcal{L}y = -y\'\'\\) with \\(y(0) = y(\\pi) = 0\\) is self-adjoint. That is, verify \\(\\langle \\mathcal{L}u, v \\rangle = \\langle u, \\mathcal{L}v \\rangle\\) where \\(\\langle f, g \\rangle = \\int_0^\\pi f g\\, dx\\).',
                    hint: 'Integrate \\(\\int_0^\\pi (-u\'\')v\\, dx\\) by parts twice and use the boundary conditions to kill the boundary terms.',
                    solution: '\\(\\int_0^\\pi (-u\'\')v\\, dx = [-u\' v]_0^\\pi + \\int_0^\\pi u\' v\'\\, dx\\). The boundary term: \\(-u\'(\\pi)v(\\pi) + u\'(0)v(0) = 0\\) since \\(v(0) = v(\\pi) = 0\\). Similarly, \\(\\int_0^\\pi u\' v\'\\, dx = [u v\']_0^\\pi - \\int_0^\\pi u v\'\'\\, dx = 0 + \\int_0^\\pi u(-v\'\')\\, dx\\), using \\(u(0) = u(\\pi) = 0\\). So \\(\\langle \\mathcal{L}u, v \\rangle = \\langle u, \\mathcal{L}v \\rangle\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Eigenvalues & Eigenfunctions
        // ================================================================
        {
            id: 'sec-eigenvalues',
            title: 'Eigenvalues & Eigenfunctions',
            content: `
<h2>Eigenvalues and Eigenfunctions</h2>

<div class="env-block intuition">
    <div class="env-title">The Matrix Analogy</div>
    <div class="env-body">
        <p>A real symmetric matrix has real eigenvalues and orthogonal eigenvectors. The Sturm-Liouville operator \\(\\mathcal{L}\\) is the infinite-dimensional generalization: a self-adjoint operator on a function space. Its eigenvalues are real, its eigenfunctions are orthogonal, and they span the space. This is the spectral theorem for differential operators.</p>
    </div>
</div>

<h3>Reality of Eigenvalues</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.2 (Eigenvalues are Real)</div>
    <div class="env-body">
        <p>All eigenvalues of a Sturm-Liouville problem are real.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose \\(\\mathcal{L}\\phi = -\\lambda w \\phi\\). Take the complex conjugate: \\(\\mathcal{L}\\bar{\\phi} = -\\bar{\\lambda} w \\bar{\\phi}\\) (since \\(p, q, w\\) are real). Now compute:</p>
        \\[
        \\langle \\mathcal{L}\\phi, \\bar{\\phi} \\rangle_w = -\\lambda \\int_a^b |\\phi|^2 w\\, dx,
        \\]
        \\[
        \\langle \\phi, \\mathcal{L}\\bar{\\phi} \\rangle_w = -\\bar{\\lambda} \\int_a^b |\\phi|^2 w\\, dx.
        \\]
        <p>By self-adjointness, these are equal. Since \\(\\int_a^b |\\phi|^2 w\\, dx > 0\\) for a nontrivial \\(\\phi\\), we get \\(\\lambda = \\bar{\\lambda}\\), so \\(\\lambda \\in \\mathbb{R}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Orthogonality of Eigenfunctions</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.3 (Orthogonality)</div>
    <div class="env-body">
        <p>Eigenfunctions corresponding to distinct eigenvalues are orthogonal with respect to the weight function \\(w(x)\\):</p>
        \\[
        \\lambda_m \\neq \\lambda_n \\implies \\int_a^b \\phi_m(x)\\, \\phi_n(x)\\, w(x)\\, dx = 0.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We have \\(\\mathcal{L}\\phi_m = -\\lambda_m w \\phi_m\\) and \\(\\mathcal{L}\\phi_n = -\\lambda_n w \\phi_n\\). By self-adjointness:</p>
        \\[
        \\langle \\mathcal{L}\\phi_m, \\phi_n \\rangle_w = \\langle \\phi_m, \\mathcal{L}\\phi_n \\rangle_w.
        \\]
        <p>The left side gives \\(-\\lambda_m \\langle \\phi_m, \\phi_n \\rangle_w\\) and the right gives \\(-\\lambda_n \\langle \\phi_m, \\phi_n \\rangle_w\\). Subtracting:</p>
        \\[
        (\\lambda_n - \\lambda_m) \\int_a^b \\phi_m \\phi_n w\\, dx = 0.
        \\]
        <p>Since \\(\\lambda_m \\neq \\lambda_n\\), the integral must vanish.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>The Eigenvalue Spectrum</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.4 (Properties of the Spectrum)</div>
    <div class="env-body">
        <p>For a regular Sturm-Liouville problem:</p>
        <ol>
            <li>There are countably infinitely many eigenvalues \\(\\lambda_1 < \\lambda_2 < \\lambda_3 < \\cdots\\).</li>
            <li>\\(\\lambda_n \\to \\infty\\) as \\(n \\to \\infty\\).</li>
            <li>Each eigenvalue is simple (non-degenerate): the eigenspace is one-dimensional.</li>
            <li>The \\(n\\)-th eigenfunction \\(\\phi_n\\) has exactly \\(n - 1\\) zeros in the open interval \\((a, b)\\) (the <strong>oscillation theorem</strong>).</li>
        </ol>
    </div>
</div>

<p>Property (4) is remarkable and deeply physical. For a vibrating string, \\(\\phi_1\\) is the fundamental mode (no interior zeros), \\(\\phi_2\\) has one node, \\(\\phi_3\\) has two nodes, and so on. Higher eigenvalues correspond to higher-frequency oscillations with more nodes.</p>

<div class="env-block example">
    <div class="env-title">Example: The Canonical Problem</div>
    <div class="env-body">
        <p>Consider \\(-y'' = \\lambda y\\) on \\([0, \\pi]\\) with \\(y(0) = y(\\pi) = 0\\). Here \\(p = 1\\), \\(q = 0\\), \\(w = 1\\).</p>
        <p>For \\(\\lambda > 0\\), write \\(\\lambda = \\mu^2\\). The general solution is \\(y = A\\sin(\\mu x) + B\\cos(\\mu x)\\). Applying \\(y(0) = 0\\) gives \\(B = 0\\). Applying \\(y(\\pi) = 0\\) gives \\(A\\sin(\\mu\\pi) = 0\\), so \\(\\mu = n\\) for \\(n = 1, 2, 3, \\ldots\\).</p>
        <p>Eigenvalues: \\(\\lambda_n = n^2\\). Eigenfunctions: \\(\\phi_n(x) = \\sin(nx)\\).</p>
        <p>Verify the oscillation theorem: \\(\\sin(nx)\\) has exactly \\(n - 1\\) zeros in \\((0, \\pi)\\) at \\(x = k\\pi/n\\), \\(k = 1, \\ldots, n-1\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-eigenvalue-spectrum"></div>

<div class="viz-placeholder" data-viz="viz-orthogonality"></div>
`,
            visualizations: [
                {
                    id: 'viz-eigenvalue-spectrum',
                    title: 'Eigenvalue Spectrum & Eigenfunctions',
                    description: 'The eigenvalues of -y\'\' = λy on [0, π] with Dirichlet conditions are λₙ = n². Below the number line, each eigenfunction sin(nx) is plotted, showing the oscillation theorem: the n-th eigenfunction has n-1 interior zeros.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var maxN = 5;
                        VizEngine.createSlider(controls, 'Max n', 2, 8, maxN, 1, function(v) {
                            maxN = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Title
                            viz.screenText('Eigenvalue Spectrum: \u03BBn = n\u00B2', W / 2, 18, viz.colors.white, 15);

                            // --- Number line for eigenvalues ---
                            var nlY = 55;
                            var nlLeft = 50;
                            var nlRight = W - 30;
                            var maxLam = maxN * maxN + 2;

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(nlLeft, nlY);
                            ctx.lineTo(nlRight, nlY);
                            ctx.stroke();

                            // Tick marks and eigenvalue dots
                            var eigenColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange,
                                viz.colors.green, viz.colors.purple, viz.colors.red, viz.colors.yellow, viz.colors.pink];

                            for (var n = 1; n <= maxN; n++) {
                                var lam = n * n;
                                var sx = nlLeft + (lam / maxLam) * (nlRight - nlLeft);
                                var col = eigenColors[(n - 1) % eigenColors.length];

                                // Dot
                                ctx.fillStyle = col;
                                ctx.beginPath();
                                ctx.arc(sx, nlY, 6, 0, Math.PI * 2);
                                ctx.fill();

                                // Label
                                ctx.fillStyle = col;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('\u03BB' + n + '=' + lam, sx, nlY + 10);
                            }

                            // Zero mark
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('0', nlLeft, nlY + 10);

                            // Arrow at end
                            ctx.fillStyle = viz.colors.axis;
                            ctx.beginPath();
                            ctx.moveTo(nlRight, nlY);
                            ctx.lineTo(nlRight - 8, nlY - 4);
                            ctx.lineTo(nlRight - 8, nlY + 4);
                            ctx.closePath();
                            ctx.fill();

                            // --- Eigenfunction plots ---
                            var plotTop = 95;
                            var plotH = (H - plotTop - 20) / maxN;
                            var plotLeft = 60;
                            var plotRight = W - 30;
                            var plotW = plotRight - plotLeft;

                            for (var nn = 1; nn <= maxN; nn++) {
                                var centerY = plotTop + (nn - 0.5) * plotH;
                                var amp = plotH * 0.35;
                                var col2 = eigenColors[(nn - 1) % eigenColors.length];

                                // Horizontal axis for this eigenfunction
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(plotLeft, centerY);
                                ctx.lineTo(plotRight, centerY);
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = col2;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u03C6' + nn, plotLeft - 8, centerY);

                                // Plot sin(n*x) for x in [0, pi]
                                ctx.strokeStyle = col2;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= 200; i++) {
                                    var t = i / 200;
                                    var x = t * Math.PI;
                                    var y = Math.sin(nn * x);
                                    var px = plotLeft + t * plotW;
                                    var py = centerY - y * amp;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Mark zeros (nodes) in the interior
                                for (var k = 1; k < nn; k++) {
                                    var zeroX = plotLeft + (k / nn) * plotW;
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.beginPath();
                                    ctx.arc(zeroX, centerY, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = col2;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(zeroX, centerY, 3, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Node count label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText((nn - 1) + ' node' + (nn - 1 !== 1 ? 's' : ''), plotRight + 4, centerY);
                            }

                            // x-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('0', plotLeft, plotTop + maxN * plotH + 2);
                            ctx.fillText('\u03C0', plotRight, plotTop + maxN * plotH + 2);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-orthogonality',
                    title: 'Orthogonality of Eigenfunctions',
                    description: 'The inner product of sin(mx) and sin(nx) over [0, π] vanishes when m ≠ n. The visualization shows the integrand sin(mx)sin(nx): positive and negative areas cancel perfectly. When m = n, the integrand is always non-negative.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mVal = 1, nVal = 2;
                        VizEngine.createSlider(controls, 'm', 1, 6, mVal, 1, function(v) {
                            mVal = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'n', 1, 6, nVal, 1, function(v) {
                            nVal = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            var isOrthogonal = (mVal !== nVal);
                            var titleColor = isOrthogonal ? viz.colors.teal : viz.colors.orange;
                            viz.screenText('Integrand: sin(' + mVal + 'x) \u00B7 sin(' + nVal + 'x)', W / 2, 18, viz.colors.white, 14);

                            // Compute integral numerically for display
                            var integral = 0;
                            var steps = 500;
                            var dx = Math.PI / steps;
                            for (var i = 0; i < steps; i++) {
                                var x = (i + 0.5) * dx;
                                integral += Math.sin(mVal * x) * Math.sin(nVal * x) * dx;
                            }

                            viz.screenText('\u222B\u2080\u1D28 sin(' + mVal + 'x)sin(' + nVal + 'x)dx = ' + integral.toFixed(4),
                                W / 2, 38, titleColor, 13);
                            if (isOrthogonal) {
                                viz.screenText('Orthogonal! Positive and negative areas cancel.', W / 2, 55, viz.colors.teal, 11);
                            } else {
                                viz.screenText('Same eigenfunction: integral = \u03C0/2 \u2248 ' + (Math.PI / 2).toFixed(4), W / 2, 55, viz.colors.orange, 11);
                            }

                            // Plot region
                            var plotLeft = 50, plotRight = W - 30;
                            var plotW = plotRight - plotLeft;
                            var plotCenterY = H / 2 + 20;
                            var plotAmp = (H - 130) / 2 * 0.8;

                            // Horizontal axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotCenterY);
                            ctx.lineTo(plotRight, plotCenterY);
                            ctx.stroke();

                            // Fill areas (positive = green-ish, negative = red-ish)
                            var pts = 400;
                            for (var j = 0; j < pts; j++) {
                                var t1 = j / pts;
                                var t2 = (j + 1) / pts;
                                var x1 = t1 * Math.PI;
                                var x2 = t2 * Math.PI;
                                var y1 = Math.sin(mVal * x1) * Math.sin(nVal * x1);
                                var y2 = Math.sin(mVal * x2) * Math.sin(nVal * x2);
                                var yMid = (y1 + y2) / 2;

                                var px1 = plotLeft + t1 * plotW;
                                var px2 = plotLeft + t2 * plotW;

                                if (Math.abs(yMid) > 0.001) {
                                    ctx.fillStyle = yMid > 0 ? viz.colors.teal + '44' : viz.colors.red + '44';
                                    ctx.beginPath();
                                    ctx.moveTo(px1, plotCenterY);
                                    ctx.lineTo(px1, plotCenterY - y1 * plotAmp);
                                    ctx.lineTo(px2, plotCenterY - y2 * plotAmp);
                                    ctx.lineTo(px2, plotCenterY);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Plot the integrand curve
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var ii = 0; ii <= 300; ii++) {
                                var tt = ii / 300;
                                var xx = tt * Math.PI;
                                var yy = Math.sin(mVal * xx) * Math.sin(nVal * xx);
                                var ppx = plotLeft + tt * plotW;
                                var ppy = plotCenterY - yy * plotAmp;
                                if (ii === 0) ctx.moveTo(ppx, ppy);
                                else ctx.lineTo(ppx, ppy);
                            }
                            ctx.stroke();

                            // x-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('0', plotLeft, plotCenterY + plotAmp + 10);
                            ctx.fillText('\u03C0', plotRight, plotCenterY + plotAmp + 10);

                            // y labels
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('+1', plotLeft - 6, plotCenterY - plotAmp);
                            ctx.fillText('-1', plotLeft - 6, plotCenterY + plotAmp);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the eigenvalues of the Sturm-Liouville problem \\(-y\'\' = \\lambda y\\) on \\([0, L]\\) with \\(y(0) = 0\\), \\(y\'(L) = 0\\) (mixed Dirichlet-Neumann conditions) are \\(\\lambda_n = \\left(\\frac{(2n-1)\\pi}{2L}\\right)^2\\).',
                    hint: 'The general solution for \\(\\lambda = \\mu^2 > 0\\) is \\(y = A\\sin(\\mu x) + B\\cos(\\mu x)\\). Apply \\(y(0) = 0\\) to get \\(B = 0\\). Then \\(y\'(L) = A\\mu\\cos(\\mu L) = 0\\) requires \\(\\cos(\\mu L) = 0\\).',
                    solution: 'From \\(y(0) = 0\\): \\(B = 0\\). From \\(y\'(L) = 0\\): \\(A\\mu\\cos(\\mu L) = 0\\). For nontrivial solution \\(A \\neq 0\\), \\(\\mu \\neq 0\\), so \\(\\cos(\\mu L) = 0\\). This gives \\(\\mu L = (2n-1)\\pi/2\\), so \\(\\mu_n = (2n-1)\\pi/(2L)\\) and \\(\\lambda_n = \\mu_n^2 = [(2n-1)\\pi/(2L)]^2\\) for \\(n = 1, 2, 3, \\ldots\\). The eigenfunctions are \\(\\phi_n(x) = \\sin\\left(\\frac{(2n-1)\\pi x}{2L}\\right)\\).'
                },
                {
                    question: 'Verify orthogonality directly: show that \\(\\int_0^\\pi \\sin(mx)\\sin(nx)\\, dx = 0\\) for positive integers \\(m \\neq n\\).',
                    hint: 'Use the product-to-sum identity: \\(\\sin(mx)\\sin(nx) = \\frac{1}{2}[\\cos((m-n)x) - \\cos((m+n)x)]\\).',
                    solution: 'By the product-to-sum formula: \\(\\int_0^\\pi \\sin(mx)\\sin(nx)\\, dx = \\frac{1}{2}\\int_0^\\pi [\\cos((m-n)x) - \\cos((m+n)x)]\\, dx = \\frac{1}{2}\\left[\\frac{\\sin((m-n)x)}{m-n} - \\frac{\\sin((m+n)x)}{m+n}\\right]_0^\\pi\\). Since \\(m-n\\) and \\(m+n\\) are nonzero integers, \\(\\sin(k\\pi) = 0\\) for all integers \\(k\\). Both terms vanish, giving 0. \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Eigenfunction Expansions
        // ================================================================
        {
            id: 'sec-expansion',
            title: 'Eigenfunction Expansions',
            content: `
<h2>Eigenfunction Expansions</h2>

<div class="env-block intuition">
    <div class="env-title">Generalized Fourier Series</div>
    <div class="env-body">
        <p>You already know that any "reasonable" function on \\([0, \\pi]\\) can be written as \\(f(x) = \\sum_{n=1}^\\infty b_n \\sin(nx)\\). But there is nothing special about \\(\\sin(nx)\\). The same idea works for <em>any</em> complete orthogonal system: Legendre polynomials, Bessel functions, Hermite polynomials, or any other set of Sturm-Liouville eigenfunctions. The eigenfunction expansion is the universal generalization of Fourier series.</p>
    </div>
</div>

<h3>The Expansion Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.5 (Completeness / Eigenfunction Expansion)</div>
    <div class="env-body">
        <p>Let \\(\\{\\phi_n\\}_{n=1}^\\infty\\) be the eigenfunctions of a regular Sturm-Liouville problem with weight \\(w(x)\\). If \\(f\\) is piecewise smooth on \\([a, b]\\), then</p>
        \\[
        f(x) = \\sum_{n=1}^{\\infty} c_n\\, \\phi_n(x), \\qquad c_n = \\frac{\\langle f, \\phi_n \\rangle_w}{\\langle \\phi_n, \\phi_n \\rangle_w} = \\frac{\\int_a^b f(x)\\, \\phi_n(x)\\, w(x)\\, dx}{\\int_a^b \\phi_n(x)^2\\, w(x)\\, dx}.
        \\]
        <p>The series converges pointwise to \\(f(x)\\) at points of continuity, and to \\(\\frac{1}{2}[f(x^+) + f(x^-)]\\) at jump discontinuities.</p>
    </div>
</div>

<p>The coefficients \\(c_n\\) are determined by the orthogonality of the eigenfunctions. The formula is obtained by multiplying both sides by \\(\\phi_m(x) w(x)\\), integrating, and using \\(\\langle \\phi_m, \\phi_n \\rangle_w = 0\\) for \\(m \\neq n\\).</p>

<h3>Parseval's Equality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.6 (Parseval's Equality)</div>
    <div class="env-body">
        <p>If \\(f(x) = \\sum_{n=1}^\\infty c_n \\phi_n(x)\\) in the \\(L^2_w\\) sense, then</p>
        \\[
        \\int_a^b |f(x)|^2 w(x)\\, dx = \\sum_{n=1}^{\\infty} c_n^2 \\|\\phi_n\\|_w^2.
        \\]
        <p>This is the "energy conservation" identity: the total energy of \\(f\\) equals the sum of energies in each mode.</p>
    </div>
</div>

<h3>Computing Coefficients: The Recipe</h3>

<div class="env-block remark">
    <div class="env-title">Practical Recipe</div>
    <div class="env-body">
        <p>To expand \\(f(x)\\) in the eigenfunctions of a Sturm-Liouville problem:</p>
        <ol>
            <li>Solve the eigenvalue problem to find \\(\\lambda_n\\) and \\(\\phi_n(x)\\).</li>
            <li>Compute the norms \\(\\|\\phi_n\\|_w^2 = \\int_a^b \\phi_n^2 w\\, dx\\).</li>
            <li>Compute the coefficients \\(c_n = \\frac{1}{\\|\\phi_n\\|_w^2} \\int_a^b f(x) \\phi_n(x) w(x)\\, dx\\).</li>
            <li>Write \\(f(x) = \\sum_{n=1}^\\infty c_n \\phi_n(x)\\).</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Expanding a Step Function</div>
    <div class="env-body">
        <p>Expand \\(f(x) = 1\\) on \\([0, \\pi]\\) in the eigenfunctions \\(\\sin(nx)\\).</p>
        <p>The norm: \\(\\|\\sin(nx)\\|^2 = \\int_0^\\pi \\sin^2(nx)\\, dx = \\pi/2\\).</p>
        <p>The coefficients: \\(c_n = \\frac{2}{\\pi}\\int_0^\\pi \\sin(nx)\\, dx = \\frac{2}{\\pi}\\left[-\\frac{\\cos(nx)}{n}\\right]_0^\\pi = \\frac{2}{n\\pi}[1 - (-1)^n]\\).</p>
        <p>So \\(c_n = 0\\) for even \\(n\\), and \\(c_n = \\frac{4}{n\\pi}\\) for odd \\(n\\). The expansion is</p>
        \\[
        1 = \\frac{4}{\\pi}\\left[\\sin x + \\frac{\\sin 3x}{3} + \\frac{\\sin 5x}{5} + \\cdots\\right] \\quad \\text{on } (0, \\pi).
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-expansion"></div>

<div class="viz-placeholder" data-viz="viz-completeness"></div>
`,
            visualizations: [
                {
                    id: 'viz-expansion',
                    title: 'Eigenfunction Expansion',
                    description: 'Expand an arbitrary function in eigenfunctions sin(nx). Choose the target function, then watch the partial sums converge as you add more terms. The coefficients cₙ are shown as a bar chart.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var nTerms = 3;
                        var funcChoice = 0;
                        var animating = false;

                        var functions = [
                            { name: 'f(x) = 1', fn: function() { return 1; }, label: 'Constant' },
                            { name: 'f(x) = x', fn: function(x) { return x; }, label: 'Linear' },
                            { name: 'f(x) = x(\u03C0-x)', fn: function(x) { return x * (Math.PI - x); }, label: 'Parabola' },
                            { name: 'f(x) = step', fn: function(x) { return x < Math.PI / 2 ? 1 : 0; }, label: 'Step' }
                        ];

                        VizEngine.createSlider(controls, 'Terms N', 1, 20, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Constant', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'Linear', function() { funcChoice = 1; draw(); });
                        VizEngine.createButton(controls, 'Parabola', function() { funcChoice = 2; draw(); });
                        VizEngine.createButton(controls, 'Step', function() { funcChoice = 3; draw(); });

                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            nTerms = 1;
                            function step() {
                                draw();
                                nTerms++;
                                if (nTerms > 20) { animating = false; nTerms = 20; draw(); return; }
                                setTimeout(step, 300);
                            }
                            step();
                        });

                        // Compute Fourier sine coefficients
                        function computeCoeffs(f, N) {
                            var coeffs = [];
                            var steps = 500;
                            var dx = Math.PI / steps;
                            for (var n = 1; n <= N; n++) {
                                var sum = 0;
                                for (var i = 0; i < steps; i++) {
                                    var x = (i + 0.5) * dx;
                                    sum += f(x) * Math.sin(n * x) * dx;
                                }
                                coeffs.push(sum * 2 / Math.PI);
                            }
                            return coeffs;
                        }

                        function partialSum(coeffs, x) {
                            var s = 0;
                            for (var n = 0; n < coeffs.length; n++) {
                                s += coeffs[n] * Math.sin((n + 1) * x);
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var f = functions[funcChoice].fn;
                            var coeffs = computeCoeffs(f, nTerms);

                            viz.screenText('Eigenfunction Expansion: ' + functions[funcChoice].name, W / 2, 16, viz.colors.white, 14);
                            viz.screenText('N = ' + nTerms + ' terms', W / 2, 34, viz.colors.teal, 12);

                            // --- Function plot ---
                            var plotLeft = 50, plotRight = 350;
                            var plotW = plotRight - plotLeft;
                            var plotTop = 55, plotBottom = 300;
                            var plotH = plotBottom - plotTop;
                            var plotCenterY = (plotTop + plotBottom) / 2;

                            // Find y range
                            var yMin = Infinity, yMax = -Infinity;
                            for (var i = 0; i <= 200; i++) {
                                var x = (i / 200) * Math.PI;
                                var yf = f(x);
                                var ys = partialSum(coeffs, x);
                                yMin = Math.min(yMin, yf, ys);
                                yMax = Math.max(yMax, yf, ys);
                            }
                            var yRange = Math.max(yMax - yMin, 0.1);
                            yMin -= yRange * 0.1;
                            yMax += yRange * 0.1;
                            yRange = yMax - yMin;

                            function toPlotY(v) { return plotBottom - (v - yMin) / yRange * plotH; }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotBottom);
                            ctx.lineTo(plotRight, plotBottom);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotTop);
                            ctx.lineTo(plotLeft, plotBottom);
                            ctx.stroke();

                            // Target function (dashed)
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            for (var j = 0; j <= 200; j++) {
                                var xj = (j / 200) * Math.PI;
                                var yj = f(xj);
                                var px = plotLeft + (j / 200) * plotW;
                                var py = toPlotY(yj);
                                if (j === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Partial sum
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var k = 0; k <= 300; k++) {
                                var xk = (k / 300) * Math.PI;
                                var yk = partialSum(coeffs, xk);
                                var pkx = plotLeft + (k / 300) * plotW;
                                var pky = toPlotY(yk);
                                if (k === 0) ctx.moveTo(pkx, pky);
                                else ctx.lineTo(pkx, pky);
                            }
                            ctx.stroke();

                            // Legend
                            ctx.setLineDash([5, 3]);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft + 10, plotTop + 15);
                            ctx.lineTo(plotLeft + 35, plotTop + 15);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x)', plotLeft + 40, plotTop + 18);

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft + 10, plotTop + 30);
                            ctx.lineTo(plotLeft + 35, plotTop + 30);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Partial sum', plotLeft + 40, plotTop + 33);

                            // x labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('0', plotLeft, plotBottom + 14);
                            ctx.fillText('\u03C0', plotRight, plotBottom + 14);

                            // --- Coefficient bar chart ---
                            var barLeft = 390, barRight = W - 15;
                            var barW = barRight - barLeft;
                            var barTop = 55, barBottom = 300;
                            var barH = barBottom - barTop;

                            viz.screenText('c\u2099', (barLeft + barRight) / 2, 48, viz.colors.orange, 12);

                            // Find max coeff for scaling
                            var maxCoeff = 0;
                            for (var nc = 0; nc < coeffs.length; nc++) {
                                maxCoeff = Math.max(maxCoeff, Math.abs(coeffs[nc]));
                            }
                            if (maxCoeff < 0.01) maxCoeff = 1;

                            var barMidY = (barTop + barBottom) / 2;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(barLeft, barMidY);
                            ctx.lineTo(barRight, barMidY);
                            ctx.stroke();

                            var bw = Math.min(12, (barW - 4) / nTerms - 1);
                            var bStart = barLeft + (barW - nTerms * (bw + 1)) / 2;

                            for (var nb = 0; nb < coeffs.length; nb++) {
                                var bx = bStart + nb * (bw + 1);
                                var barVal = coeffs[nb];
                                var bh = (barVal / maxCoeff) * (barH / 2 - 10);
                                ctx.fillStyle = barVal >= 0 ? viz.colors.orange + 'cc' : viz.colors.red + 'cc';
                                ctx.fillRect(bx, barMidY - Math.max(bh, 0), bw, Math.abs(bh));
                            }

                            // Bar chart label
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('n', (barLeft + barRight) / 2, barBottom + 12);

                            // Parseval info
                            var energy = 0;
                            for (var ne = 0; ne < coeffs.length; ne++) {
                                energy += coeffs[ne] * coeffs[ne] * Math.PI / 2;
                            }
                            var trueEnergy = 0;
                            for (var ie = 0; ie < 500; ie++) {
                                var xe = (ie + 0.5) * Math.PI / 500;
                                trueEnergy += f(xe) * f(xe) * Math.PI / 500;
                            }
                            var pct = trueEnergy > 0 ? (energy / trueEnergy * 100) : 100;

                            viz.screenText('Energy captured: ' + pct.toFixed(1) + '%', W / 2, H - 30, viz.colors.white, 12);
                            viz.screenText('(Parseval: \u2211 c\u2099\u00B2||\u03C6\u2099||\u00B2 / ||f||\u00B2)', W / 2, H - 14, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-completeness',
                    title: 'Completeness: More Terms = Better Approximation',
                    description: 'Watch an animated build-up of the eigenfunction expansion. Each new term adds a correction, and the approximation converges to the target function. The error shrinks to zero.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var targetFn = function(x) { return x * (Math.PI - x); };
                        var targetName = 'x(\u03C0 - x)';
                        var currentN = 1;
                        var maxAnim = 15;

                        VizEngine.createButton(controls, 'Reset', function() { currentN = 1; draw(); });
                        VizEngine.createButton(controls, 'Add Term', function() { if (currentN < maxAnim) { currentN++; draw(); } });
                        VizEngine.createButton(controls, 'Animate', function() {
                            currentN = 1;
                            function step() {
                                draw();
                                if (currentN >= maxAnim) return;
                                currentN++;
                                setTimeout(step, 350);
                            }
                            step();
                        });

                        function computeCoeffs(N) {
                            var coeffs = [];
                            var steps = 500;
                            var dx = Math.PI / steps;
                            for (var n = 1; n <= N; n++) {
                                var sum = 0;
                                for (var i = 0; i < steps; i++) {
                                    var x = (i + 0.5) * dx;
                                    sum += targetFn(x) * Math.sin(n * x) * dx;
                                }
                                coeffs.push(sum * 2 / Math.PI);
                            }
                            return coeffs;
                        }

                        function partialSum(coeffs, x) {
                            var s = 0;
                            for (var n = 0; n < coeffs.length; n++) {
                                s += coeffs[n] * Math.sin((n + 1) * x);
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var coeffs = computeCoeffs(currentN);

                            viz.screenText('Completeness: f(x) = ' + targetName, W / 2, 16, viz.colors.white, 14);
                            viz.screenText('N = ' + currentN + ' terms', W / 2, 34, viz.colors.teal, 12);

                            var plotLeft = 50, plotRight = W - 40;
                            var plotW = plotRight - plotLeft;
                            var plotTop = 50, plotBottom = 280;
                            var plotH = plotBottom - plotTop;

                            // y range
                            var yMin = 0, yMax = 0;
                            for (var i = 0; i <= 200; i++) {
                                var x = (i / 200) * Math.PI;
                                yMax = Math.max(yMax, targetFn(x));
                            }
                            yMax *= 1.15;
                            yMin = -yMax * 0.15;
                            var yRange = yMax - yMin;

                            function toY(v) { return plotBottom - (v - yMin) / yRange * plotH; }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, toY(0));
                            ctx.lineTo(plotRight, toY(0));
                            ctx.stroke();

                            // Shade error region
                            ctx.beginPath();
                            for (var j = 0; j <= 200; j++) {
                                var xj = (j / 200) * Math.PI;
                                var px = plotLeft + (j / 200) * plotW;
                                var py = toY(targetFn(xj));
                                if (j === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            for (var jj = 200; jj >= 0; jj--) {
                                var xjj = (jj / 200) * Math.PI;
                                var pxx = plotLeft + (jj / 200) * plotW;
                                var pyy = toY(partialSum(coeffs, xjj));
                                ctx.lineTo(pxx, pyy);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.red + '22';
                            ctx.fill();

                            // Target function
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            for (var k = 0; k <= 200; k++) {
                                var xk = (k / 200) * Math.PI;
                                var pkx = plotLeft + (k / 200) * plotW;
                                var pky = toY(targetFn(xk));
                                if (k === 0) ctx.moveTo(pkx, pky);
                                else ctx.lineTo(pkx, pky);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Partial sum
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var m = 0; m <= 300; m++) {
                                var xm = (m / 300) * Math.PI;
                                var pmx = plotLeft + (m / 300) * plotW;
                                var pmy = toY(partialSum(coeffs, xm));
                                if (m === 0) ctx.moveTo(pmx, pmy);
                                else ctx.lineTo(pmx, pmy);
                            }
                            ctx.stroke();

                            // L2 error
                            var err = 0;
                            var norm = 0;
                            var dxe = Math.PI / 400;
                            for (var ie = 0; ie < 400; ie++) {
                                var xe = (ie + 0.5) * dxe;
                                var diff = targetFn(xe) - partialSum(coeffs, xe);
                                err += diff * diff * dxe;
                                norm += targetFn(xe) * targetFn(xe) * dxe;
                            }
                            var relErr = norm > 0 ? Math.sqrt(err / norm) * 100 : 0;

                            viz.screenText('Relative L\u00B2 error: ' + relErr.toFixed(2) + '%', W / 2, H - 50, viz.colors.orange, 12);
                            viz.screenText('(shaded region = error)', W / 2, H - 34, viz.colors.text, 10);

                            // x labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('0', plotLeft, plotBottom + 14);
                            ctx.fillText('\u03C0', plotRight, plotBottom + 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Expand \\(f(x) = x\\) on \\([0, \\pi]\\) in the Fourier sine series (eigenfunctions of \\(-y\'\' = \\lambda y\\), \\(y(0) = y(\\pi) = 0\\)). Find a general formula for the coefficients \\(c_n\\).',
                    hint: 'Integrate by parts: \\(\\int_0^\\pi x \\sin(nx)\\, dx\\). You will need \\([\\text{boundary terms}]\\) and a remaining integral of \\(\\cos(nx)\\).',
                    solution: 'The coefficients are \\(c_n = \\frac{2}{\\pi}\\int_0^\\pi x \\sin(nx)\\, dx\\). Integrating by parts: \\(\\int_0^\\pi x\\sin(nx)\\,dx = [-x\\cos(nx)/n]_0^\\pi + \\int_0^\\pi \\cos(nx)/n\\, dx = -\\pi(-1)^n/n + [\\sin(nx)/n^2]_0^\\pi = -\\pi(-1)^n/n\\). So \\(c_n = \\frac{2}{\\pi} \\cdot \\frac{-\\pi(-1)^n}{n} = \\frac{2(-1)^{n+1}}{n}\\). The expansion is \\(x = 2\\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n}\\sin(nx)\\).'
                },
                {
                    question: 'Show that the Fourier sine coefficients of \\(f(x) = x(\\pi - x)\\) on \\([0, \\pi]\\) are \\(c_n = \\frac{8}{\\pi n^3}\\) for odd \\(n\\) and \\(c_n = 0\\) for even \\(n\\).',
                    hint: 'Note that \\(f(x) = f(\\pi - x)\\) (the function is symmetric about \\(x = \\pi/2\\)). Use this symmetry, or compute directly via integration by parts twice.',
                    solution: '\\(c_n = \\frac{2}{\\pi}\\int_0^\\pi x(\\pi - x)\\sin(nx)\\, dx\\). Expanding and integrating by parts twice: \\(\\int_0^\\pi x(\\pi-x)\\sin(nx)\\, dx = \\frac{2[1-(-1)^n]}{n^3}\\). So \\(c_n = \\frac{2}{\\pi} \\cdot \\frac{2[1-(-1)^n]}{n^3}\\). For even \\(n\\): \\(1 - 1 = 0\\). For odd \\(n\\): \\(c_n = \\frac{2}{\\pi}\\cdot\\frac{4}{n^3} = \\frac{8}{\\pi n^3}\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Physical Examples
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Physical Examples',
            content: `
<h2>Physical Examples</h2>

<div class="env-block intuition">
    <div class="env-title">The Physics Behind the Math</div>
    <div class="env-body">
        <p>Sturm-Liouville eigenvalue problems arise whenever you separate a PDE and impose boundary conditions. The eigenvalues determine the allowed frequencies (vibrations), energies (quantum mechanics), or decay rates (diffusion). The eigenfunctions are the spatial mode shapes.</p>
    </div>
</div>

<h3>The Vibrating String</h3>

<p>The wave equation \\(u_{tt} = c^2 u_{xx}\\) on a string of length \\(L\\), fixed at both ends (\\(u(0,t) = u(L,t) = 0\\)), separates as \\(u(x,t) = X(x)T(t)\\), giving</p>
\\[
X'' + \\lambda X = 0, \\quad X(0) = X(L) = 0.
\\]
<p>This is the prototypical regular Sturm-Liouville problem. The eigenvalues and eigenfunctions are</p>
\\[
\\lambda_n = \\left(\\frac{n\\pi}{L}\\right)^2, \\qquad X_n(x) = \\sin\\left(\\frac{n\\pi x}{L}\\right), \\quad n = 1, 2, 3, \\ldots
\\]
<p>The corresponding time equation gives \\(T_n(t) = A_n\\cos(\\omega_n t) + B_n\\sin(\\omega_n t)\\) with \\(\\omega_n = cn\\pi/L\\). The general solution is</p>
\\[
u(x,t) = \\sum_{n=1}^\\infty \\sin\\left(\\frac{n\\pi x}{L}\\right)\\left[A_n\\cos\\left(\\frac{cn\\pi t}{L}\\right) + B_n\\sin\\left(\\frac{cn\\pi t}{L}\\right)\\right].
\\]
<p>The coefficients \\(A_n\\) and \\(B_n\\) are determined by the initial displacement and velocity via eigenfunction expansion.</p>

<h3>The Quantum Particle in a Box</h3>

<p>The time-independent Schrodinger equation for a particle in an infinite square well of width \\(L\\) is</p>
\\[
-\\frac{\\hbar^2}{2m}\\psi'' = E\\psi, \\quad \\psi(0) = \\psi(L) = 0.
\\]
<p>This is exactly the same Sturm-Liouville problem as the vibrating string! The eigenvalues give the <strong>quantized energy levels</strong>:</p>
\\[
E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}, \\quad n = 1, 2, 3, \\ldots
\\]
<p>The eigenfunctions \\(\\psi_n(x) = \\sqrt{2/L}\\sin(n\\pi x/L)\\) are the stationary states (normalized). The energy is proportional to \\(n^2\\), so the spacing between levels <em>increases</em> with \\(n\\).</p>

<div class="viz-placeholder" data-viz="viz-quantum-well"></div>

<h3>The Vibrating Circular Drum</h3>

<p>The wave equation on a circular drum of radius \\(a\\) in polar coordinates gives, after separation, a Bessel equation for the radial part:</p>
\\[
\\frac{d}{dr}\\left[r\\frac{dR}{dr}\\right] + \\left(\\lambda r - \\frac{m^2}{r}\\right)R = 0, \\quad R(a) = 0, \\quad R(0) \\text{ bounded}.
\\]
<p>This is a singular Sturm-Liouville problem (\\(p(r) = r\\) vanishes at \\(r = 0\\)). The eigenfunctions are Bessel functions \\(J_m(\\alpha_{mn} r/a)\\), where \\(\\alpha_{mn}\\) is the \\(n\\)-th zero of \\(J_m\\). The eigenvalues are \\(\\lambda_{mn} = (\\alpha_{mn}/a)^2\\).</p>

<p>The angular part gives \\(\\cos(m\\theta)\\) and \\(\\sin(m\\theta)\\). The drum modes are</p>
\\[
u_{mn}(r, \\theta, t) = J_m\\left(\\frac{\\alpha_{mn} r}{a}\\right)\\begin{cases}\\cos(m\\theta)\\\\\\sin(m\\theta)\\end{cases} \\cos(\\omega_{mn} t),
\\]
<p>where \\(\\omega_{mn} = c\\, \\alpha_{mn}/a\\). These are the Chladni patterns seen when sand collects at the nodal lines of a vibrating plate.</p>

<div class="viz-placeholder" data-viz="viz-vibrating-drum"></div>

<div class="env-block remark">
    <div class="env-title">Why the Drum Does Not Sound Like a Piano</div>
    <div class="env-body">
        <p>For a string, the eigenvalues are \\(\\lambda_n = n^2\\), so the frequencies are \\(\\omega_n = n\\omega_1\\): a harmonic series. For a circular drum, the eigenvalues \\(\\alpha_{mn}^2\\) are zeros of Bessel functions, which are <em>not</em> integer multiples of one another. This is why drums produce sounds with an inharmonic, "noisy" quality compared to string instruments.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-quantum-well',
                    title: 'Quantum Particle in a Box',
                    description: 'Energy levels and wave functions for a particle in an infinite square well. Each energy level Eₙ ∝ n² is shown as a horizontal line, with the corresponding wave function ψₙ(x) plotted on that level. The probability density |ψₙ|² is shaded.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var maxLevel = 5;
                        var showProb = false;

                        VizEngine.createSlider(controls, 'Levels', 2, 8, maxLevel, 1, function(v) {
                            maxLevel = Math.round(v);
                            draw();
                        });
                        VizEngine.createButton(controls, 'Toggle |\u03C8|\u00B2', function() {
                            showProb = !showProb;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            viz.screenText('Infinite Square Well: Energy Levels & Wave Functions', W / 2, 16, viz.colors.white, 14);

                            // Well walls
                            var wellLeft = 120, wellRight = 440;
                            var wellW = wellRight - wellLeft;
                            var wellTop = 40, wellBottom = H - 40;
                            var wellH = wellBottom - wellTop;

                            // Draw the walls
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(wellLeft, wellTop);
                            ctx.lineTo(wellLeft, wellBottom);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(wellRight, wellTop);
                            ctx.lineTo(wellRight, wellBottom);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(wellLeft, wellBottom);
                            ctx.lineTo(wellRight, wellBottom);
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('0', wellLeft, wellBottom + 14);
                            ctx.fillText('L', wellRight, wellBottom + 14);

                            // Energy levels and wave functions
                            var maxE = maxLevel * maxLevel;
                            var energyColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange,
                                viz.colors.green, viz.colors.purple, viz.colors.red, viz.colors.yellow, viz.colors.pink];

                            for (var n = 1; n <= maxLevel; n++) {
                                var En = n * n;
                                var levelY = wellBottom - (En / maxE) * (wellH - 40) - 20;
                                var col = energyColors[(n - 1) % energyColors.length];

                                // Energy level line
                                ctx.strokeStyle = col + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(wellLeft, levelY);
                                ctx.lineTo(wellRight, levelY);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Energy label
                                ctx.fillStyle = col;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('E' + n + ' = ' + En + 'E\u2081', wellLeft - 8, levelY);

                                // Wave function on this level
                                var amp = Math.min(25, (wellH - 40) / maxE * (2 * n - 1) * 0.35);
                                amp = Math.min(amp, 25);

                                if (showProb) {
                                    // |psi|^2 shading
                                    ctx.fillStyle = col + '33';
                                    ctx.beginPath();
                                    ctx.moveTo(wellLeft, levelY);
                                    for (var i = 0; i <= 150; i++) {
                                        var t = i / 150;
                                        var psi2 = Math.pow(Math.sin(n * Math.PI * t), 2);
                                        var px = wellLeft + t * wellW;
                                        var py = levelY - psi2 * amp;
                                        ctx.lineTo(px, py);
                                    }
                                    ctx.lineTo(wellRight, levelY);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // psi_n(x)
                                ctx.strokeStyle = col;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j = 0; j <= 200; j++) {
                                    var tj = j / 200;
                                    var psiVal = showProb ? Math.pow(Math.sin(n * Math.PI * tj), 2) : Math.sin(n * Math.PI * tj);
                                    var pxj = wellLeft + tj * wellW;
                                    var pyj = levelY - psiVal * amp;
                                    if (j === 0) ctx.moveTo(pxj, pyj);
                                    else ctx.lineTo(pxj, pyj);
                                }
                                ctx.stroke();

                                // n label on right
                                ctx.fillStyle = col;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('n=' + n, wellRight + 8, levelY);
                            }

                            viz.screenText(showProb ? 'Showing |\u03C8\u2099(x)|\u00B2 (probability density)' : 'Showing \u03C8\u2099(x) (wave function)',
                                W / 2, H - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-vibrating-drum',
                    title: 'Vibrating Drum Modes',
                    description: 'The modes of a circular drum are described by Bessel functions Jₘ(αₘₙ r/a). Choose the angular number m and radial number n to see the mode shape. The animation shows the oscillation in time. Nodal lines (where the displacement is zero) are shown in white.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mVal = 0, nVal = 1;
                        var time = 0;
                        var anim = false;

                        // Pre-computed Bessel zeros alpha_{m,n} for m=0..4, n=1..5
                        var besselZeros = [
                            [2.4048, 5.5201, 8.6537, 11.7915, 14.9309], // J_0
                            [3.8317, 7.0156, 10.1735, 13.3237, 16.4706], // J_1
                            [5.1356, 8.4172, 11.6198, 14.7960, 17.9598], // J_2
                            [6.3802, 9.7610, 13.0152, 16.2235, 19.4094], // J_3
                            [7.5883, 11.0647, 14.3725, 17.6160, 20.8269]  // J_4
                        ];

                        VizEngine.createSlider(controls, 'Angular m', 0, 4, mVal, 1, function(v) {
                            mVal = Math.round(v); draw();
                        });
                        VizEngine.createSlider(controls, 'Radial n', 1, 4, nVal, 1, function(v) {
                            nVal = Math.round(v); draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (anim) { viz.stopAnimation(); anim = false; return; }
                            anim = true;
                            viz.animate(function(t) {
                                time = t * 0.002;
                                draw();
                            });
                        });

                        // Approximate Bessel function J_m(x) using series
                        function besselJ(m, x) {
                            var sum = 0;
                            var term = 1;
                            // (x/2)^m / m!
                            var xHalf = x / 2;
                            var pow = 1;
                            for (var i = 0; i < m; i++) pow *= xHalf;
                            var mFact = 1;
                            for (var ii = 1; ii <= m; ii++) mFact *= ii;
                            term = pow / mFact;
                            sum = term;
                            for (var k = 1; k <= 25; k++) {
                                term *= -(x * x) / (4 * k * (k + m));
                                sum += term;
                                if (Math.abs(term) < 1e-12) break;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            var alpha = besselZeros[mVal][nVal - 1];
                            viz.screenText('Drum Mode (m=' + mVal + ', n=' + nVal + ')   \u03B1=' + alpha.toFixed(4), W / 2, 16, viz.colors.white, 13);

                            // Draw the drum as a filled circle with Bessel mode coloring
                            var cx = W / 2, cy = H / 2 + 10;
                            var radius = Math.min(W, H) / 2 - 50;

                            // Pixel-by-pixel rendering of the mode
                            var imgSize = Math.ceil(radius * 2);
                            var x0 = Math.floor(cx - radius);
                            var y0 = Math.floor(cy - radius);

                            for (var py = 0; py < imgSize; py += 2) {
                                for (var px = 0; px < imgSize; px += 2) {
                                    var dx = (px - radius);
                                    var dy = (py - radius);
                                    var r = Math.sqrt(dx * dx + dy * dy);
                                    if (r > radius) continue;

                                    var rNorm = r / radius; // 0 to 1
                                    var theta = Math.atan2(dy, dx);

                                    var radialPart = besselJ(mVal, alpha * rNorm);
                                    var angularPart = Math.cos(mVal * theta);
                                    var timePart = Math.cos(time * alpha);
                                    var val = radialPart * angularPart * timePart;

                                    // Color mapping
                                    var intensity = Math.max(-1, Math.min(1, val / Math.max(0.5, Math.abs(besselJ(mVal, alpha * 0.5)))));
                                    var red, green, blue;
                                    if (intensity > 0) {
                                        red = Math.round(30 + 60 * intensity);
                                        green = Math.round(50 + 150 * intensity);
                                        blue = Math.round(200 + 55 * intensity);
                                    } else {
                                        red = Math.round(200 + 55 * (-intensity));
                                        green = Math.round(50 + 50 * (-intensity));
                                        blue = Math.round(30 + 60 * (-intensity));
                                    }

                                    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
                                    ctx.fillRect(x0 + px, y0 + py, 2, 2);
                                }
                            }

                            // Draw drum boundary
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw nodal lines (radial)
                            if (mVal > 0) {
                                ctx.strokeStyle = viz.colors.white + '88';
                                ctx.lineWidth = 1;
                                for (var ml = 0; ml < mVal; ml++) {
                                    var angle = Math.PI / (2 * mVal) + ml * Math.PI / mVal;
                                    ctx.beginPath();
                                    ctx.moveTo(cx - radius * Math.cos(angle), cy - radius * Math.sin(angle));
                                    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
                                    ctx.stroke();
                                }
                            }

                            // Draw nodal circles (radial zeros of J_m inside [0, alpha])
                            ctx.strokeStyle = viz.colors.white + '88';
                            ctx.lineWidth = 1;
                            for (var ni = 0; ni < nVal - 1; ni++) {
                                var innerZero = besselZeros[mVal][ni];
                                var nodalR = (innerZero / alpha) * radius;
                                ctx.beginPath();
                                ctx.arc(cx, cy, nodalR, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Info
                            viz.screenText('Nodal circles: ' + (nVal - 1) + '    Nodal diameters: ' + mVal,
                                W / 2, H - 30, viz.colors.text, 11);
                            viz.screenText('Blue = positive displacement, Red = negative', W / 2, H - 14, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A string of length \\(L = 1\\) is plucked so that its initial displacement is a triangle: \\(u(x,0) = x\\) for \\(0 \\leq x \\leq 1/2\\) and \\(u(x,0) = 1 - x\\) for \\(1/2 \\leq x \\leq 1\\), with \\(u_t(x,0) = 0\\). Find the eigenfunction expansion of the solution.',
                    hint: 'Since \\(u_t(x,0) = 0\\), all \\(B_n = 0\\). The coefficients \\(A_n = 2\\int_0^1 u(x,0)\\sin(n\\pi x)\\, dx\\). Split the integral at \\(x = 1/2\\).',
                    solution: '\\(A_n = 2\\int_0^{1/2} x\\sin(n\\pi x)\\, dx + 2\\int_{1/2}^1 (1-x)\\sin(n\\pi x)\\, dx\\). By symmetry of the triangle about \\(x = 1/2\\), both integrals are equal: \\(A_n = 4\\int_0^{1/2} x\\sin(n\\pi x)\\, dx\\). Integrating by parts: \\(A_n = \\frac{4\\sin(n\\pi/2)}{n^2\\pi^2}\\). So \\(A_n = 0\\) for even \\(n\\), and \\(A_n = \\frac{4(-1)^{(n-1)/2}}{n^2\\pi^2}\\) for odd \\(n\\). The solution is \\(u(x,t) = \\frac{4}{\\pi^2}\\sum_{k=0}^\\infty \\frac{(-1)^k}{(2k+1)^2}\\sin((2k+1)\\pi x)\\cos((2k+1)\\pi ct)\\).'
                },
                {
                    question: 'For the quantum particle in a box, show that the probability of finding the particle in the left half of the box in state \\(\\psi_n\\) is \\(P_{\\text{left}} = \\frac{1}{2} - \\frac{\\sin(n\\pi)}{2n\\pi}\\). Evaluate this for \\(n = 1\\) and \\(n = 2\\).',
                    hint: 'Compute \\(\\int_0^{L/2} |\\psi_n(x)|^2\\, dx\\) with \\(\\psi_n = \\sqrt{2/L}\\sin(n\\pi x/L)\\). Use the identity \\(\\sin^2\\theta = \\frac{1 - \\cos(2\\theta)}{2}\\).',
                    solution: '\\(P = \\frac{2}{L}\\int_0^{L/2} \\sin^2(n\\pi x/L)\\, dx = \\frac{2}{L}\\int_0^{L/2} \\frac{1 - \\cos(2n\\pi x/L)}{2}\\, dx = \\frac{1}{L}\\left[x - \\frac{L\\sin(2n\\pi x/L)}{2n\\pi}\\right]_0^{L/2} = \\frac{1}{2} - \\frac{\\sin(n\\pi)}{2n\\pi}\\). Since \\(\\sin(n\\pi) = 0\\) for all integer \\(n\\), \\(P_{\\text{left}} = 1/2\\) for all \\(n\\). The particle is equally likely to be in either half, which follows from the symmetry \\(|\\sin(n\\pi x/L)|^2 = |\\sin(n\\pi(L-x)/L)|^2\\).'
                },
                {
                    question: 'The first few zeros of \\(J_0(x)\\) are \\(\\alpha_{01} \\approx 2.405\\), \\(\\alpha_{02} \\approx 5.520\\), \\(\\alpha_{03} \\approx 8.654\\). Compute the ratios \\(\\omega_{02}/\\omega_{01}\\) and \\(\\omega_{03}/\\omega_{01}\\) for the radially symmetric modes of a circular drum. Compare these with the harmonic ratios 2:1 and 3:1 of a string.',
                    hint: 'The frequency is \\(\\omega_{0n} = c\\, \\alpha_{0n}/a\\), so the ratio is \\(\\alpha_{0n}/\\alpha_{01}\\).',
                    solution: '\\(\\omega_{02}/\\omega_{01} = \\alpha_{02}/\\alpha_{01} = 5.520/2.405 \\approx 2.295\\). \\(\\omega_{03}/\\omega_{01} = 8.654/2.405 \\approx 3.598\\). For a string, the ratios would be exactly 2.000 and 3.000. The drum overtones are not harmonic; they are about 15% and 20% sharp, respectively. This inharmonicity is why drums produce a less defined pitch than strings.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge — Looking Forward
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Forward',
            content: `
<h2>Looking Forward: Green's Functions and Special Functions</h2>

<div class="env-block intuition">
    <div class="env-title">Where We Stand</div>
    <div class="env-body">
        <p>We now have the complete theoretical framework for separation of variables. Given a PDE with boundary conditions, we separate into ODEs, identify each as a Sturm-Liouville problem, find the eigenvalues and eigenfunctions, and expand the solution. The theory guarantees that this works: the eigenvalues are real, the eigenfunctions are orthogonal, and any reasonable initial/boundary data can be expanded.</p>
    </div>
</div>

<h3>The Road to Green's Functions (Chapter 10)</h3>

<p>The eigenfunction expansion gives us one way to solve inhomogeneous problems. If \\(\\mathcal{L}y = f\\), expand both \\(y\\) and \\(f\\) in eigenfunctions:</p>
\\[
y = \\sum_n a_n \\phi_n, \\quad f = \\sum_n f_n \\phi_n \\implies a_n = \\frac{f_n}{\\lambda_n}.
\\]
<p>The <strong>Green's function</strong> \\(G(x, x')\\) is the response to a point source \\(f(x) = \\delta(x - x')\\). It has the eigenfunction expansion</p>
\\[
G(x, x') = \\sum_n \\frac{\\phi_n(x)\\phi_n(x')}{\\lambda_n \\|\\phi_n\\|_w^2}.
\\]
<p>This connects Sturm-Liouville theory directly to the method of Green's functions, which we develop in Chapter 10.</p>

<h3>The Road to Special Functions (Chapters 11-13)</h3>

<p>The "special functions" of mathematical physics are simply the eigenfunctions of specific Sturm-Liouville problems arising from common coordinate systems:</p>

<table>
<thead>
<tr><th>Coordinate System</th><th>S-L Problem</th><th>Eigenfunctions</th><th>Chapter</th></tr>
</thead>
<tbody>
<tr><td>Cartesian</td><td>\\(-y'' = \\lambda y\\)</td><td>\\(\\sin(nx)\\), \\(\\cos(nx)\\)</td><td>This chapter</td></tr>
<tr><td>Cylindrical (radial)</td><td>Bessel equation</td><td>\\(J_m(\\alpha_{mn} r)\\)</td><td>Ch 11</td></tr>
<tr><td>Spherical (angular)</td><td>Legendre equation</td><td>\\(P_\\ell(\\cos\\theta)\\), \\(Y_\\ell^m\\)</td><td>Ch 12</td></tr>
<tr><td>Quantum oscillator</td><td>Hermite equation</td><td>\\(H_n(x) e^{-x^2/2}\\)</td><td>Ch 13</td></tr>
</tbody>
</table>

<p>In each case, the general Sturm-Liouville theory tells us <em>in advance</em> that the eigenvalues will be real, the eigenfunctions orthogonal (with appropriate weight), and the set complete. The specific chapters derive the detailed properties of each function family, but the overarching structure is always Sturm-Liouville theory.</p>

<h3>The Bigger Picture: Spectral Theory</h3>

<p>Sturm-Liouville theory for ODEs is the gateway to <em>spectral theory</em> in functional analysis. The key insight, that a self-adjoint operator on a function space has a spectral decomposition analogous to diagonalization of a symmetric matrix, generalizes far beyond second-order ODEs. It underlies:</p>
<ul>
    <li>Quantum mechanics (observables as self-adjoint operators on Hilbert space)</li>
    <li>Vibration analysis (normal modes of any linear elastic system)</li>
    <li>Signal processing (the Fourier transform as a spectral decomposition)</li>
    <li>Stability analysis (eigenvalues determine stability of equilibria)</li>
</ul>

<p>The transition from finite-dimensional linear algebra (Chapter 3-4) through Sturm-Liouville theory (this chapter) to general spectral theory is one of the great unifying themes of mathematical physics.</p>

<div class="env-block remark">
    <div class="env-title">The Punchline</div>
    <div class="env-body">
        <p>Sturm-Liouville theory is to differential equations what the spectral theorem is to linear algebra. It guarantees that every self-adjoint differential operator has a "basis of eigenfunctions" in which the operator becomes diagonal. This is why separation of variables works, why Fourier series converge, and why quantum mechanics uses Hilbert spaces.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Write down the Green\'s function for \\(-y\'\' = f(x)\\) on \\([0, \\pi]\\) with \\(y(0) = y(\\pi) = 0\\) using the eigenfunction expansion. Then use the identity \\(\\sum_{n=1}^\\infty \\frac{\\sin(nx)\\sin(nx\')}{n^2} = \\frac{\\pi}{2}\\min(x,x\') - \\frac{xx\'}{2\\pi} + \\text{const.}\\) (not required to prove) to write \\(G\\) in closed form.',
                    hint: 'The eigenvalues are \\(\\lambda_n = n^2\\) and the normalized eigenfunctions are \\(\\phi_n = \\sqrt{2/\\pi}\\sin(nx)\\). So \\(G(x,x\') = \\sum_n \\phi_n(x)\\phi_n(x\')/(n^2)\\).',
                    solution: '\\(G(x, x\') = \\frac{2}{\\pi}\\sum_{n=1}^\\infty \\frac{\\sin(nx)\\sin(nx\')}{n^2}\\). The closed form is \\(G(x,x\') = \\frac{1}{\\pi}[\\pi\\min(x,x\') - xx\'/\\pi \\cdot \\text{(boundary correction)}]\\). More precisely, \\(G(x,x\') = \\frac{1}{\\pi}[\\min(x,x\')(\\pi - \\max(x,x\'))]\\) or equivalently \\(G(x,x\') = \\frac{x_<(\\pi - x_>)}{\\pi}\\) where \\(x_< = \\min(x,x\')\\), \\(x_> = \\max(x,x\')\\). One can verify: \\(-G_{xx} = \\delta(x - x\')\\) with \\(G(0,x\') = G(\\pi,x\') = 0\\).'
                },
                {
                    question: 'Explain in one paragraph why the Legendre polynomials \\(P_\\ell(x)\\) on \\([-1,1]\\) are orthogonal with weight \\(w(x) = 1\\), citing the Sturm-Liouville framework.',
                    hint: 'Identify the Legendre equation as a Sturm-Liouville problem and apply Theorem 9.3.',
                    solution: 'The Legendre equation \\(\\frac{d}{dx}[(1-x^2)P\'] + \\ell(\\ell+1)P = 0\\) is a singular Sturm-Liouville problem on \\([-1,1]\\) with \\(p(x) = 1-x^2\\), \\(q(x) = 0\\), \\(w(x) = 1\\), and eigenvalue \\(\\lambda_\\ell = \\ell(\\ell+1)\\). Since \\(p(\\pm 1) = 0\\), this is a singular problem where the boundary condition is boundedness of \\(P(\\pm 1)\\). The Sturm-Liouville operator \\(\\mathcal{L}\\) is self-adjoint with respect to the inner product \\(\\langle f, g \\rangle = \\int_{-1}^1 fg\\, dx\\). By Theorem 9.3, eigenfunctions with distinct eigenvalues are orthogonal: \\(\\int_{-1}^1 P_\\ell(x) P_k(x)\\, dx = 0\\) for \\(\\ell \\neq k\\). \\(\\checkmark\\)'
                }
            ]
        }
    ]
});
