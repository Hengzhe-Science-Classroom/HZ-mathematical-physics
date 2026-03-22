window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Hilbert Spaces',
    subtitle: 'Infinite-dimensional vector spaces for quantum mechanics',
    sections: [
        // ================================================================
        // SECTION 1: Why Infinite Dimensions?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Infinite Dimensions?',
            content: `
<h2>Why Infinite Dimensions?</h2>

<div class="env-block intuition">
    <div class="env-title">From Vectors to Functions</div>
    <div class="env-body">
        <p>In \\(\\mathbb{R}^3\\), a vector \\(\\mathbf{v} = (v_1, v_2, v_3)\\) is specified by three numbers. But a function \\(f(x)\\) on \\([0, 1]\\) is specified by its value at every point, an uncountable infinity of numbers. If we think of \\(f\\) as a "vector," we need infinitely many components. This is the leap from finite-dimensional linear algebra to Hilbert space theory.</p>
    </div>
</div>

<p>In Chapter 3, we studied matrices and eigenvalues in \\(\\mathbb{R}^n\\) and \\(\\mathbb{C}^n\\). These spaces are perfectly adequate for systems with finitely many degrees of freedom. But physics constantly demands more:</p>

<ul>
    <li><strong>Quantum mechanics:</strong> A particle's state is a wave function \\(\\psi(x)\\), an element of a function space. The Schrodinger equation is an eigenvalue problem on this infinite-dimensional space.</li>
    <li><strong>Vibrating strings and membranes:</strong> Normal modes are eigenfunctions of differential operators, and a general motion is a (possibly infinite) superposition of these modes.</li>
    <li><strong>Fourier analysis:</strong> Representing a function as \\(f(x) = \\sum_{n} c_n e_n(x)\\) is an expansion in an orthonormal basis of an infinite-dimensional space.</li>
    <li><strong>Statistical mechanics:</strong> The partition function sums over infinitely many states.</li>
</ul>

<p>The central question is: <em>how much of finite-dimensional linear algebra survives the passage to infinite dimensions?</em> The answer is: surprisingly much, provided we are careful about convergence. A Hilbert space is an inner product space that is "complete" (limits of Cauchy sequences exist), and this completeness is exactly what we need to make infinite sums and limits rigorous.</p>

<h3>The Analogy</h3>

<p>The following table makes the correspondence precise:</p>

<table class="env-table">
<thead>
<tr><th>Finite-dimensional (\\(\\mathbb{C}^n\\))</th><th>Infinite-dimensional (Hilbert space \\(\\mathcal{H}\\))</th></tr>
</thead>
<tbody>
<tr><td>Vector \\(\\mathbf{v} = (v_1, \\ldots, v_n)\\)</td><td>Function \\(f(x)\\) or sequence \\((c_1, c_2, \\ldots)\\)</td></tr>
<tr><td>Dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = \\sum_i u_i^* v_i\\)</td><td>Inner product \\(\\langle f, g \\rangle = \\int f^*(x) g(x) \\, dx\\)</td></tr>
<tr><td>Length \\(\\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v} \\cdot \\mathbf{v}}\\)</td><td>Norm \\(\\|f\\| = \\sqrt{\\langle f, f \\rangle}\\)</td></tr>
<tr><td>Basis \\(\\{\\mathbf{e}_1, \\ldots, \\mathbf{e}_n\\}\\)</td><td>Orthonormal basis \\(\\{e_1, e_2, \\ldots\\}\\) (countable)</td></tr>
<tr><td>Matrix \\(A\\)</td><td>Linear operator \\(\\hat{A}\\)</td></tr>
<tr><td>Eigenvalue equation \\(A\\mathbf{v} = \\lambda \\mathbf{v}\\)</td><td>\\(\\hat{A} f = \\lambda f\\) (spectral theory)</td></tr>
</tbody>
</table>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>David Hilbert (1862-1943) studied infinite-dimensional spaces in the context of integral equations around 1904-1910. John von Neumann formalized the axiomatic definition of Hilbert spaces in 1929-1930, precisely to give quantum mechanics a rigorous mathematical foundation. The spectral theorem for self-adjoint operators is the mathematical backbone of the measurement postulate in quantum mechanics.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Preview)</div>
    <div class="env-body">
        <p>A <strong>Hilbert space</strong> is a complete inner product space. We will unpack each word in the sections that follow: "inner product" (Section 2), "complete" (Section 3), and the consequences of having both (Sections 4-6).</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Inner Product Spaces
        // ================================================================
        {
            id: 'sec-inner-product',
            title: 'Inner Product Spaces',
            content: `
<h2>Inner Product Spaces</h2>

<div class="env-block intuition">
    <div class="env-title">Measuring Geometry in Function Space</div>
    <div class="env-body">
        <p>An inner product gives us two geometric tools: a way to measure <em>lengths</em> (norms) and <em>angles</em> (including orthogonality). In \\(\\mathbb{R}^3\\), the dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = |\\mathbf{u}| |\\mathbf{v}| \\cos\\theta\\) captures both. An inner product generalizes this to any vector space, including function spaces.</p>
    </div>
</div>

<h3>The Axioms</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.1 (Inner Product)</div>
    <div class="env-body">
        <p>An <strong>inner product</strong> on a vector space \\(V\\) over \\(\\mathbb{C}\\) is a function \\(\\langle \\cdot, \\cdot \\rangle : V \\times V \\to \\mathbb{C}\\) satisfying, for all \\(f, g, h \\in V\\) and \\(\\alpha \\in \\mathbb{C}\\):</p>
        <ol>
            <li><strong>Conjugate symmetry:</strong> \\(\\langle f, g \\rangle = \\overline{\\langle g, f \\rangle}\\)</li>
            <li><strong>Linearity in the second argument:</strong> \\(\\langle f, \\alpha g + h \\rangle = \\alpha \\langle f, g \\rangle + \\langle f, h \\rangle\\)</li>
            <li><strong>Positive definiteness:</strong> \\(\\langle f, f \\rangle \\geq 0\\), with equality if and only if \\(f = 0\\)</li>
        </ol>
        <p>A vector space equipped with an inner product is called an <strong>inner product space</strong> (or pre-Hilbert space).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physics Convention</div>
    <div class="env-body">
        <p>We adopt the physics convention (Dirac notation): the inner product is conjugate-linear in the <em>first</em> argument and linear in the second. Mathematicians often use the opposite convention. In Dirac notation, \\(\\langle f | g \\rangle\\) is the "bra-ket" inner product.</p>
    </div>
</div>

<h3>Key Examples</h3>

<div class="env-block example">
    <div class="env-title">Example 4.1: \\(\\mathbb{C}^n\\)</div>
    <div class="env-body">
        <p>For vectors \\(\\mathbf{u}, \\mathbf{v} \\in \\mathbb{C}^n\\):</p>
        \\[\\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\sum_{i=1}^{n} u_i^* v_i.\\]
        <p>This is the standard Hermitian inner product.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.2: \\(L^2([a,b])\\)</div>
    <div class="env-body">
        <p>For square-integrable functions on \\([a, b]\\):</p>
        \\[\\langle f, g \\rangle = \\int_a^b f^*(x) \\, g(x) \\, dx.\\]
        <p>This is the most important inner product in mathematical physics. The space \\(L^2([a,b])\\) consists of all functions for which \\(\\int_a^b |f(x)|^2 \\, dx < \\infty\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.3: \\(\\ell^2\\) (Sequence Space)</div>
    <div class="env-body">
        <p>For infinite sequences \\(\\mathbf{a} = (a_1, a_2, \\ldots)\\) with \\(\\sum |a_n|^2 < \\infty\\):</p>
        \\[\\langle \\mathbf{a}, \\mathbf{b} \\rangle = \\sum_{n=1}^{\\infty} a_n^* b_n.\\]
        <p>This is the infinite-dimensional analogue of \\(\\mathbb{C}^n\\). Every separable Hilbert space is isomorphic to \\(\\ell^2\\).</p>
    </div>
</div>

<h3>Norm and Distance</h3>

<p>From the inner product, we define the <strong>norm</strong> (length) and <strong>distance</strong>:</p>
\\[\\|f\\| = \\sqrt{\\langle f, f \\rangle}, \\qquad d(f, g) = \\|f - g\\|.\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 4.1 (Cauchy-Schwarz Inequality)</div>
    <div class="env-body">
        <p>For all \\(f, g\\) in an inner product space:</p>
        \\[|\\langle f, g \\rangle| \\leq \\|f\\| \\, \\|g\\|,\\]
        <p>with equality if and only if \\(f\\) and \\(g\\) are linearly dependent.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>If \\(g = 0\\), both sides are zero. Otherwise, set \\(\\alpha = \\langle g, f \\rangle / \\langle g, g \\rangle\\) and consider \\(h = f - \\alpha g\\). Then \\(0 \\leq \\langle h, h \\rangle = \\|f\\|^2 - |\\langle f, g \\rangle|^2 / \\|g\\|^2\\), which gives the inequality. Equality holds iff \\(h = 0\\), i.e., \\(f = \\alpha g\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<p>From Cauchy-Schwarz, we can define the <strong>angle</strong> between vectors via \\(\\cos\\theta = \\text{Re}\\,\\langle f, g \\rangle / (\\|f\\| \\|g\\|)\\).</p>

<h3>Orthogonality</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.2 (Orthogonality)</div>
    <div class="env-body">
        <p>Two vectors \\(f, g\\) are <strong>orthogonal</strong>, written \\(f \\perp g\\), if \\(\\langle f, g \\rangle = 0\\). A set \\(S\\) is <strong>orthogonal</strong> if every pair of distinct elements is orthogonal, and <strong>orthonormal</strong> if additionally \\(\\|e\\| = 1\\) for every \\(e \\in S\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.2 (Generalized Pythagorean Theorem)</div>
    <div class="env-body">
        <p>If \\(f_1, \\ldots, f_n\\) are mutually orthogonal, then</p>
        \\[\\left\\|\\sum_{k=1}^{n} f_k\\right\\|^2 = \\sum_{k=1}^{n} \\|f_k\\|^2.\\]
    </div>
</div>

<h3>Projection</h3>

<p>The <strong>projection</strong> of \\(f\\) onto a nonzero vector \\(g\\) is the vector in the direction of \\(g\\) closest to \\(f\\):</p>
\\[\\text{proj}_g f = \\frac{\\langle g, f \\rangle}{\\langle g, g \\rangle} \\, g.\\]
<p>The residual \\(f - \\text{proj}_g f\\) is orthogonal to \\(g\\), and this decomposition \\(f = \\text{proj}_g f + (f - \\text{proj}_g f)\\) is the simplest case of the projection theorem.</p>

<div class="viz-placeholder" data-viz="viz-inner-product"></div>
`,
            visualizations: [
                {
                    id: 'viz-inner-product',
                    title: 'Projection of One Function onto Another',
                    description: 'Choose two functions f (blue) and g (teal). The projection of f onto g is shown in orange. Watch how the projection changes as you adjust the functions. The residual f - proj is always orthogonal to g.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 80, originY: 220, scale: 50
                        });

                        var fType = 0;
                        var gType = 0;
                        var fFuncs = [
                            function(x) { return Math.sin(Math.PI * x); },
                            function(x) { return Math.cos(Math.PI * x); },
                            function(x) { return x * (1 - x) * 4; },
                            function(x) { return 1 - 2 * Math.abs(x - 0.5); }
                        ];
                        var gFuncs = [
                            function(x) { return Math.sin(2 * Math.PI * x); },
                            function(x) { return Math.cos(Math.PI * x); },
                            function(x) { return 1; },
                            function(x) { return x; }
                        ];
                        var fLabels = ['sin(pi x)', 'cos(pi x)', '4x(1-x)', 'triangle'];
                        var gLabels = ['sin(2pi x)', 'cos(pi x)', '1', 'x'];
                        var animPhase = 0;
                        var animating = true;

                        VizEngine.createSlider(controls, 'f(x)', 0, 3, 0, 1, function(v) {
                            fType = Math.round(v);
                        });
                        VizEngine.createSlider(controls, 'g(x)', 0, 3, 0, 1, function(v) {
                            gType = Math.round(v);
                        });

                        function numericalInnerProduct(f, g, a, b, n) {
                            var h = (b - a) / n;
                            var sum = 0;
                            for (var i = 0; i <= n; i++) {
                                var x = a + i * h;
                                var w = (i === 0 || i === n) ? 0.5 : 1;
                                sum += w * f(x) * g(x);
                            }
                            return sum * h;
                        }

                        viz.animate(function(t) {
                            animPhase = t * 0.001;
                            viz.clear();
                            var ctx = viz.ctx;
                            var f = fFuncs[fType];
                            var g = gFuncs[gType];

                            // Compute inner products
                            var fg = numericalInnerProduct(f, g, 0, 1, 200);
                            var gg = numericalInnerProduct(g, g, 0, 1, 200);
                            var coeff = gg > 1e-10 ? fg / gg : 0;

                            var projFunc = function(x) { return coeff * g(x); };
                            var residFunc = function(x) { return f(x) - projFunc(x); };

                            // Animate: fade in projection
                            var alpha = Math.min(1, 0.5 + 0.5 * Math.sin(animPhase * 0.5));

                            // Draw axes labels
                            viz.screenText('x', viz.width - 15, viz.originY + 15, viz.colors.text, 11);
                            viz.screenText('y', viz.originX - 15, 15, viz.colors.text, 11);

                            // Grid and axes
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 9; gx++) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = -3; gy <= 3; gy++) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Axis tick labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var tx = 0; tx <= 8; tx++) {
                                var val = tx * 0.2;
                                if (val > 1.01) break;
                                ctx.fillText(val.toFixed(1), viz.originX + val * 5 * viz.scale, viz.originY + 4);
                            }

                            // Draw functions
                            viz.drawFunction(f, 0, 1, viz.colors.blue, 2.5, 200);
                            viz.drawFunction(g, 0, 1, viz.colors.teal, 2, 200);
                            viz.drawFunction(projFunc, 0, 1, viz.colors.orange, 2.5, 200);

                            // Draw residual (dashed)
                            ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 4]);
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 200; i++) {
                                var x = i / 200;
                                var y = residFunc(x);
                                var sxx = viz.originX + x * 5 * viz.scale;
                                var syy = viz.originY - y * viz.scale;
                                if (!started) { ctx.moveTo(sxx, syy); started = true; } else ctx.lineTo(sxx, syy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Shading between f and proj
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= 200; i2++) {
                                var x2 = i2 / 200;
                                var sxx2 = viz.originX + x2 * 5 * viz.scale;
                                var syy2 = viz.originY - f(x2) * viz.scale;
                                if (i2 === 0) ctx.moveTo(sxx2, syy2); else ctx.lineTo(sxx2, syy2);
                            }
                            for (var i3 = 200; i3 >= 0; i3--) {
                                var x3 = i3 / 200;
                                var sxx3 = viz.originX + x3 * 5 * viz.scale;
                                var syy3 = viz.originY - projFunc(x3) * viz.scale;
                                ctx.lineTo(sxx3, syy3);
                            }
                            ctx.closePath(); ctx.fill();

                            // Legend
                            var ly = 15;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue; ctx.fillRect(viz.originX + 270, ly, 14, 3); ctx.fillText('f: ' + fLabels[fType], viz.originX + 290, ly + 5);
                            ctx.fillStyle = viz.colors.teal; ctx.fillRect(viz.originX + 270, ly + 18, 14, 3); ctx.fillText('g: ' + gLabels[gType], viz.originX + 290, ly + 23);
                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(viz.originX + 270, ly + 36, 14, 3); ctx.fillText('proj_g f', viz.originX + 290, ly + 41);
                            ctx.fillStyle = viz.colors.purple; ctx.fillRect(viz.originX + 270, ly + 54, 14, 3); ctx.fillText('residual', viz.originX + 290, ly + 59);

                            // Info text
                            var ipVal = fg.toFixed(4);
                            var coeffVal = coeff.toFixed(4);
                            var residNorm = Math.sqrt(numericalInnerProduct(residFunc, residFunc, 0, 1, 200));
                            var check = numericalInnerProduct(residFunc, g, 0, 1, 200);
                            viz.screenText(
                                '<f,g> = ' + ipVal + '    coeff = ' + coeffVal,
                                viz.width / 2, viz.height - 35, viz.colors.white, 12
                            );
                            viz.screenText(
                                '<residual, g> = ' + check.toFixed(6) + ' (should be ~0)',
                                viz.width / 2, viz.height - 15, viz.colors.text, 11
                            );
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(\\langle f, g \\rangle = \\int_0^1 f^*(x) g(x) \\, dx\\) satisfies all three inner product axioms for \\(L^2([0,1])\\).',
                    hint: 'Check conjugate symmetry, linearity, and positive definiteness separately. For positive definiteness, you need the fact that if \\(\\int |f|^2 = 0\\) then \\(f = 0\\) almost everywhere.',
                    solution: '(1) Conjugate symmetry: \\(\\overline{\\langle g,f\\rangle} = \\overline{\\int g^* f} = \\int \\overline{g^* f} = \\int f^* g = \\langle f,g\\rangle\\). (2) Linearity: \\(\\langle f, \\alpha g + h\\rangle = \\int f^*(\\alpha g + h) = \\alpha \\int f^* g + \\int f^* h\\). (3) \\(\\langle f,f\\rangle = \\int |f|^2 \\geq 0\\), and equals zero iff \\(f = 0\\) a.e.'
                },
                {
                    question: 'Show that \\(\\sin(n\\pi x)\\) and \\(\\sin(m\\pi x)\\) are orthogonal in \\(L^2([0,1])\\) for \\(n \\neq m\\). What is \\(\\|\\sin(n\\pi x)\\|\\)?',
                    hint: 'Use the product-to-sum identity: \\(\\sin A \\sin B = \\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]\\).',
                    solution: '\\(\\langle \\sin(n\\pi x), \\sin(m\\pi x) \\rangle = \\int_0^1 \\sin(n\\pi x) \\sin(m\\pi x) \\, dx = \\frac{1}{2} \\int_0^1 [\\cos((n-m)\\pi x) - \\cos((n+m)\\pi x)] \\, dx\\). For \\(n \\neq m\\), both integrals are \\(\\frac{\\sin(k\\pi)}{k\\pi} = 0\\). For the norm: \\(\\|\\sin(n\\pi x)\\|^2 = \\int_0^1 \\sin^2(n\\pi x) \\, dx = 1/2\\), so \\(\\|\\sin(n\\pi x)\\| = 1/\\sqrt{2}\\).'
                },
                {
                    question: 'Prove the parallelogram law: \\(\\|f + g\\|^2 + \\|f - g\\|^2 = 2\\|f\\|^2 + 2\\|g\\|^2\\). Why does this characterize inner product spaces among normed spaces?',
                    hint: 'Expand both \\(\\|f+g\\|^2 = \\langle f+g, f+g \\rangle\\) and \\(\\|f-g\\|^2\\) using bilinearity.',
                    solution: '\\(\\|f+g\\|^2 = \\|f\\|^2 + \\langle f,g\\rangle + \\langle g,f\\rangle + \\|g\\|^2\\) and \\(\\|f-g\\|^2 = \\|f\\|^2 - \\langle f,g\\rangle - \\langle g,f\\rangle + \\|g\\|^2\\). Adding gives \\(2\\|f\\|^2 + 2\\|g\\|^2\\). The Jordan-von Neumann theorem states that any normed space satisfying the parallelogram law admits an inner product (via the polarization identity), so this law is both necessary and sufficient.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Completeness & Hilbert Spaces
        // ================================================================
        {
            id: 'sec-completeness',
            title: 'Completeness & Hilbert Spaces',
            content: `
<h2>Completeness and Hilbert Spaces</h2>

<div class="env-block intuition">
    <div class="env-title">Why Completeness Matters</div>
    <div class="env-body">
        <p>Consider the rationals \\(\\mathbb{Q}\\). You can construct a sequence of rationals \\(1, 1.4, 1.41, 1.414, \\ldots\\) that "converges" to \\(\\sqrt{2}\\), but \\(\\sqrt{2} \\notin \\mathbb{Q}\\). The rationals have a "hole" where \\(\\sqrt{2}\\) should be. Completeness means: no holes. Every sequence that "should" converge actually does converge to an element of the space.</p>
    </div>
</div>

<h3>Cauchy Sequences</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.3 (Cauchy Sequence)</div>
    <div class="env-body">
        <p>A sequence \\(\\{f_n\\}\\) in a normed space is a <strong>Cauchy sequence</strong> if for every \\(\\varepsilon > 0\\), there exists \\(N\\) such that</p>
        \\[\\|f_m - f_n\\| < \\varepsilon \\quad \\text{for all } m, n > N.\\]
        <p>Intuitively: the terms get arbitrarily close to each other (though we have not said what they converge <em>to</em>).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 4.4 (Complete Space / Hilbert Space)</div>
    <div class="env-body">
        <p>An inner product space \\(\\mathcal{H}\\) is <strong>complete</strong> if every Cauchy sequence in \\(\\mathcal{H}\\) converges to an element of \\(\\mathcal{H}\\). A complete inner product space is called a <strong>Hilbert space</strong>.</p>
    </div>
</div>

<h3>Examples and Non-Examples</h3>

<div class="env-block example">
    <div class="env-title">Example 4.4: \\(L^2([a,b])\\) is a Hilbert Space</div>
    <div class="env-body">
        <p>The space of square-integrable functions on \\([a,b]\\) with the inner product \\(\\langle f, g \\rangle = \\int_a^b f^* g \\, dx\\) is complete. This is the content of the <strong>Riesz-Fischer theorem</strong>: every Cauchy sequence in \\(L^2\\) converges in \\(L^2\\) to a square-integrable function. The proof uses measure theory (specifically, that \\(L^p\\) spaces are complete for \\(1 \\leq p \\leq \\infty\\)).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.5: \\(C([0,1])\\) is NOT a Hilbert Space</div>
    <div class="env-body">
        <p>The space of continuous functions on \\([0,1]\\) with the \\(L^2\\) inner product is an inner product space but is <em>not</em> complete. Consider a sequence of continuous functions approaching a step function. The limit is in \\(L^2\\) but not in \\(C([0,1])\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.6: \\(\\ell^2\\) is a Hilbert Space</div>
    <div class="env-body">
        <p>The space of square-summable sequences \\(\\ell^2 = \\{(a_1, a_2, \\ldots) : \\sum |a_n|^2 < \\infty\\}\\) is complete. Moreover, \\(L^2\\) and \\(\\ell^2\\) are isomorphic as Hilbert spaces (via expansion in an orthonormal basis).</p>
    </div>
</div>

<h3>The Completion Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.3 (Completion)</div>
    <div class="env-body">
        <p>Every inner product space \\(V\\) can be "completed" to a Hilbert space \\(\\overline{V}\\) by adjoining the limits of all Cauchy sequences. The space \\(V\\) sits inside \\(\\overline{V}\\) as a dense subspace. This is exactly how \\(\\mathbb{R}\\) is constructed from \\(\\mathbb{Q}\\) and how \\(L^2\\) is constructed from continuous functions.</p>
    </div>
</div>

<h3>Why Physicists Care</h3>

<p>Completeness is what lets us write \\(\\psi = \\sum_{n=0}^{\\infty} c_n \\phi_n\\) and know the infinite sum converges. Without completeness, the partial sums \\(\\sum_{n=0}^{N} c_n \\phi_n\\) would form a Cauchy sequence with no limit in our space, and the expansion would be meaningless. Quantum mechanics <em>requires</em> Hilbert spaces because states are infinite superpositions of basis vectors.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.4 (Projection Theorem)</div>
    <div class="env-body">
        <p>Let \\(M\\) be a <strong>closed</strong> subspace of a Hilbert space \\(\\mathcal{H}\\). Then every \\(f \\in \\mathcal{H}\\) has a unique decomposition</p>
        \\[f = f_M + f_{M^\\perp}, \\quad f_M \\in M, \\; f_{M^\\perp} \\in M^\\perp,\\]
        <p>where \\(M^\\perp = \\{g \\in \\mathcal{H} : \\langle g, m \\rangle = 0 \\text{ for all } m \\in M\\}\\). Moreover, \\(f_M\\) is the unique element of \\(M\\) closest to \\(f\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark</div>
    <div class="env-body">
        <p>The projection theorem <em>requires</em> completeness. In incomplete inner product spaces, the closest point in a closed subspace may not exist. This is one of the main reasons we insist on working in Hilbert spaces rather than arbitrary inner product spaces.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that every convergent sequence is Cauchy, but give an example (in an incomplete space) of a Cauchy sequence that does not converge.',
                    hint: 'For the first part, use the triangle inequality. For the second, think of rational approximations to an irrational number.',
                    solution: 'If \\(f_n \\to f\\), then \\(\\|f_m - f_n\\| \\leq \\|f_m - f\\| + \\|f - f_n\\| < \\varepsilon\\) for large \\(m, n\\). Conversely, in \\(\\mathbb{Q}\\), the sequence \\(f_n = \\sum_{k=0}^{n} 1/k!\\) is Cauchy but converges to \\(e \\notin \\mathbb{Q}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Orthonormal Bases
        // ================================================================
        {
            id: 'sec-orthonormal',
            title: 'Orthonormal Bases',
            content: `
<h2>Orthonormal Bases</h2>

<div class="env-block intuition">
    <div class="env-title">Coordinates in Infinite Dimensions</div>
    <div class="env-body">
        <p>In \\(\\mathbb{R}^3\\), we write \\(\\mathbf{v} = v_1 \\mathbf{e}_1 + v_2 \\mathbf{e}_2 + v_3 \\mathbf{e}_3\\), where \\(v_k = \\mathbf{e}_k \\cdot \\mathbf{v}\\). In a Hilbert space, we write \\(f = \\sum_n c_n e_n\\) with \\(c_n = \\langle e_n, f \\rangle\\). The only new ingredient is that the sum is infinite and we need convergence.</p>
    </div>
</div>

<h3>Gram-Schmidt Orthogonalization</h3>

<p>Given any linearly independent set \\(\\{v_1, v_2, \\ldots\\}\\), the <strong>Gram-Schmidt process</strong> produces an orthonormal set \\(\\{e_1, e_2, \\ldots\\}\\) spanning the same subspace:</p>

<div class="env-block theorem">
    <div class="env-title">Algorithm 4.1 (Gram-Schmidt)</div>
    <div class="env-body">
        <p>Set \\(u_1 = v_1\\), \\(e_1 = u_1 / \\|u_1\\|\\). For \\(k \\geq 2\\):</p>
        \\[u_k = v_k - \\sum_{j=1}^{k-1} \\langle e_j, v_k \\rangle \\, e_j, \\qquad e_k = \\frac{u_k}{\\|u_k\\|}.\\]
        <p>Each \\(u_k\\) is the component of \\(v_k\\) orthogonal to \\(\\text{span}\\{e_1, \\ldots, e_{k-1}\\}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.7: Legendre Polynomials from Gram-Schmidt</div>
    <div class="env-body">
        <p>Start with \\(\\{1, x, x^2, \\ldots\\}\\) in \\(L^2([-1,1])\\). Gram-Schmidt produces (up to normalization) the Legendre polynomials: \\(P_0(x) = 1\\), \\(P_1(x) = x\\), \\(P_2(x) = \\tfrac{1}{2}(3x^2 - 1)\\), etc. These are orthogonal on \\([-1,1]\\) and form the natural basis for expanding functions in spherical coordinates.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-gram-schmidt"></div>

<h3>Fourier Series as Basis Expansion</h3>

<p>The set \\(\\{e^{in\\pi x / L}\\}_{n \\in \\mathbb{Z}}\\), appropriately normalized, forms an orthonormal basis for \\(L^2([-L, L])\\). The Fourier coefficients</p>
\\[c_n = \\langle e_n, f \\rangle = \\frac{1}{2L} \\int_{-L}^{L} f(x) e^{-in\\pi x/L} \\, dx\\]
<p>are exactly the "coordinates" of \\(f\\) in this basis. The Fourier series</p>
\\[f(x) = \\sum_{n=-\\infty}^{\\infty} c_n \\, e^{in\\pi x/L}\\]
<p>converges in the \\(L^2\\) norm (not necessarily pointwise). This is the infinite-dimensional analogue of writing a vector in terms of its components.</p>

<div class="viz-placeholder" data-viz="viz-fourier-as-basis"></div>

<h3>Bessel's Inequality and Parseval's Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.5 (Bessel's Inequality)</div>
    <div class="env-body">
        <p>For any orthonormal set \\(\\{e_n\\}\\) (not necessarily a basis) and any \\(f \\in \\mathcal{H}\\):</p>
        \\[\\sum_{n} |\\langle e_n, f \\rangle|^2 \\leq \\|f\\|^2.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.6 (Parseval's Theorem)</div>
    <div class="env-body">
        <p>If \\(\\{e_n\\}\\) is an orthonormal <strong>basis</strong> (i.e., its span is dense), then Bessel's inequality becomes equality:</p>
        \\[\\sum_{n} |\\langle e_n, f \\rangle|^2 = \\|f\\|^2.\\]
        <p>This is the infinite-dimensional Pythagorean theorem: the squared norm of a vector equals the sum of the squares of its components.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Separability</div>
    <div class="env-body">
        <p>A Hilbert space is <strong>separable</strong> if it has a countable orthonormal basis. All the Hilbert spaces that appear in physics (\\(L^2\\), \\(\\ell^2\\), Fock spaces) are separable. Every separable Hilbert space is isomorphic to \\(\\ell^2\\), so in a sense there is only <em>one</em> infinite-dimensional separable Hilbert space (up to isomorphism).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-gram-schmidt',
                    title: 'Gram-Schmidt Orthogonalization',
                    description: 'Watch the Gram-Schmidt process orthogonalize a set of vectors step by step. At each step, the projection onto the already-constructed basis is subtracted, leaving only the orthogonal component.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 260, scale: 50
                        });

                        var step = 0;
                        var maxStep = 4;
                        // Original vectors in R^2 (for visualization)
                        var vecs = [
                            [3, 1],
                            [1, 3],
                            [2, 2]
                        ];
                        // We'll show Gram-Schmidt on first 2 vectors in R^2
                        // plus a third to show it's in the span

                        VizEngine.createSlider(controls, 'Step', 0, 3, 0, 1, function(v) {
                            step = Math.round(v);
                            draw();
                        });

                        function dot2(u, v) { return u[0]*v[0] + u[1]*v[1]; }
                        function norm2(v) { return Math.sqrt(dot2(v, v)); }
                        function scale2(v, s) { return [v[0]*s, v[1]*s]; }
                        function sub2(u, v) { return [u[0]-v[0], u[1]-v[1]]; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var v1 = vecs[0];
                            var v2 = vecs[1];

                            // Step 0: Show original vectors
                            if (step >= 0) {
                                viz.drawVector(0, 0, v1[0], v1[1], viz.colors.blue + '66', 'v1', 1.5);
                                viz.drawVector(0, 0, v2[0], v2[1], viz.colors.teal + '66', 'v2', 1.5);
                            }

                            // Step 1: e1 = v1/||v1||
                            var e1 = scale2(v1, 1 / norm2(v1));
                            if (step >= 1) {
                                viz.drawVector(0, 0, e1[0] * 2, e1[1] * 2, viz.colors.blue, 'e1', 2.5);
                                viz.screenText('Step 1: e1 = v1 / ||v1||', viz.width / 2, 20, viz.colors.blue, 13);
                            }

                            // Step 2: u2 = v2 - <e1,v2> e1
                            var proj_coeff = dot2(e1, v2);
                            var proj_vec = scale2(e1, proj_coeff);
                            var u2 = sub2(v2, proj_vec);
                            if (step >= 2) {
                                // Show projection
                                viz.drawVector(0, 0, proj_vec[0], proj_vec[1], viz.colors.orange, 'proj', 1.5);
                                viz.drawSegment(v2[0], v2[1], proj_vec[0], proj_vec[1], viz.colors.orange + '88', 1, true);
                                // Show u2
                                viz.drawVector(0, 0, u2[0], u2[1], viz.colors.purple, 'u2', 2);
                                viz.screenText('Step 2: u2 = v2 - <e1,v2>e1', viz.width / 2, 20, viz.colors.purple, 13);
                            }

                            // Step 3: e2 = u2/||u2||
                            var e2 = scale2(u2, 1 / norm2(u2));
                            if (step >= 3) {
                                viz.drawVector(0, 0, e2[0] * 2, e2[1] * 2, viz.colors.teal, 'e2', 2.5);
                                viz.screenText('Step 3: e2 = u2 / ||u2||    (e1 . e2 = 0)', viz.width / 2, 20, viz.colors.teal, 13);

                                // Draw right angle indicator
                                var sz = 0.3;
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 1;
                                var p1 = viz.toScreen(e1[0]*sz, e1[1]*sz);
                                var p2 = viz.toScreen(e1[0]*sz + e2[0]*sz, e1[1]*sz + e2[1]*sz);
                                var p3 = viz.toScreen(e2[0]*sz, e2[1]*sz);
                                ctx.beginPath();
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.lineTo(p3[0], p3[1]);
                                ctx.stroke();
                            }

                            // Info
                            if (step === 0) {
                                viz.screenText('Original vectors v1, v2 (not orthogonal)', viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('v1 . v2 = ' + dot2(v1, v2).toFixed(1) + ' (nonzero)', viz.width / 2, viz.height - 20, viz.colors.text, 11);
                            }
                            if (step >= 1) {
                                viz.screenText('||e1|| = 1', 60, viz.height - 20, viz.colors.blue, 11);
                            }
                            if (step >= 3) {
                                viz.screenText('||e2|| = 1', 160, viz.height - 20, viz.colors.teal, 11);
                                viz.screenText('e1 . e2 = ' + dot2(e1, e2).toFixed(6), 300, viz.height - 20, viz.colors.white, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-fourier-as-basis',
                    title: 'Function as Infinite Sum of Orthonormal Basis',
                    description: 'A square wave (or other function) is built from sine/cosine basis functions. Increase the number of terms N to see the partial Fourier sum converge to the target function.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 80, originY: 200, scale: 50
                        });

                        var N = 1;
                        var funcType = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'N terms', 1, 30, 1, 1, function(v) {
                            N = Math.round(v);
                        });

                        VizEngine.createSlider(controls, 'Function', 0, 2, 0, 1, function(v) {
                            funcType = Math.round(v);
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            N = 1;
                            var interval = setInterval(function() {
                                N++;
                                if (N > 30) { clearInterval(interval); animating = false; }
                            }, 200);
                        });

                        var funcNames = ['Square wave', 'Sawtooth', 'Triangle'];

                        // Target functions on [-pi, pi]
                        function targetFunc(x) {
                            if (funcType === 0) {
                                // Square wave
                                var xm = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                                return xm < Math.PI ? 1 : -1;
                            } else if (funcType === 1) {
                                // Sawtooth
                                var xm2 = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                                return (xm2 / Math.PI) - 1;
                            } else {
                                // Triangle
                                var xm3 = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                                return xm3 < Math.PI ? (2 * xm3 / Math.PI - 1) : (3 - 2 * xm3 / Math.PI);
                            }
                        }

                        // Fourier partial sums
                        function fourierSum(x, n) {
                            var s = 0;
                            if (funcType === 0) {
                                // Square wave: (4/pi) * sum_{k odd} sin(kx)/k
                                for (var k = 1; k <= 2 * n - 1; k += 2) {
                                    s += Math.sin(k * x) / k;
                                }
                                s *= 4 / Math.PI;
                            } else if (funcType === 1) {
                                // Sawtooth: -(2/pi) * sum_{k=1}^{n} (-1)^k sin(kx)/k
                                for (var k2 = 1; k2 <= n; k2++) {
                                    s += Math.pow(-1, k2) * Math.sin(k2 * x) / k2;
                                }
                                s *= -2 / Math.PI;
                            } else {
                                // Triangle: (8/pi^2) * sum_{k odd} (-1)^((k-1)/2) sin(kx)/k^2
                                for (var k3 = 1; k3 <= 2 * n - 1; k3 += 2) {
                                    s += Math.pow(-1, (k3 - 1) / 2) * Math.sin(k3 * x) / (k3 * k3);
                                }
                                s *= 8 / (Math.PI * Math.PI);
                            }
                            return s;
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -8; gx <= 8; gx++) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = -3; gy <= 3; gy++) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }
                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();

                            // x-axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('-pi', viz.originX - Math.PI * viz.scale, viz.originY + 4);
                            ctx.fillText('pi', viz.originX + Math.PI * viz.scale, viz.originY + 4);

                            // Range for drawing
                            var xMin = -Math.PI - 0.3;
                            var xMax = Math.PI + 0.3;

                            // Target function (dashed)
                            ctx.strokeStyle = viz.colors.white + '55';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 400; i++) {
                                var x = xMin + (xMax - xMin) * i / 400;
                                var y = targetFunc(x);
                                var sxf = viz.originX + x * viz.scale;
                                var syf = viz.originY - y * viz.scale;
                                if (!started) { ctx.moveTo(sxf, syf); started = true; }
                                else ctx.lineTo(sxf, syf);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Fourier partial sum (solid)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            started = false;
                            for (var i2 = 0; i2 <= 400; i2++) {
                                var x2 = xMin + (xMax - xMin) * i2 / 400;
                                var y2 = fourierSum(x2, N);
                                var sxf2 = viz.originX + x2 * viz.scale;
                                var syf2 = viz.originY - y2 * viz.scale;
                                if (!started) { ctx.moveTo(sxf2, syf2); started = true; }
                                else ctx.lineTo(sxf2, syf2);
                            }
                            ctx.stroke();

                            // Draw individual basis functions faintly
                            if (N <= 8) {
                                var basisColors = [viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink, viz.colors.yellow, viz.colors.red, viz.colors.blue];
                                for (var bn = 0; bn < Math.min(N, 8); bn++) {
                                    ctx.strokeStyle = (basisColors[bn] || viz.colors.teal) + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    started = false;
                                    for (var ib = 0; ib <= 300; ib++) {
                                        var xb = xMin + (xMax - xMin) * ib / 300;
                                        var yb;
                                        if (funcType === 0) {
                                            var kb = 2 * bn + 1;
                                            yb = (4 / Math.PI) * Math.sin(kb * xb) / kb;
                                        } else if (funcType === 1) {
                                            var kb2 = bn + 1;
                                            yb = (-2 / Math.PI) * Math.pow(-1, kb2) * Math.sin(kb2 * xb) / kb2;
                                        } else {
                                            var kb3 = 2 * bn + 1;
                                            yb = (8 / (Math.PI * Math.PI)) * Math.pow(-1, (kb3 - 1) / 2) * Math.sin(kb3 * xb) / (kb3 * kb3);
                                        }
                                        var sxb = viz.originX + xb * viz.scale;
                                        var syb = viz.originY - yb * viz.scale;
                                        if (!started) { ctx.moveTo(sxb, syb); started = true; } else ctx.lineTo(sxb, syb);
                                    }
                                    ctx.stroke();
                                }
                            }

                            // Labels
                            viz.screenText(funcNames[funcType] + '  |  N = ' + N + ' terms', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Target (dashed) vs Fourier partial sum (blue)', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Apply Gram-Schmidt to \\(\\{1, x, x^2\\}\\) in \\(L^2([0,1])\\) and verify you get polynomials proportional to the shifted Legendre polynomials.',
                    hint: 'Compute \\(\\langle 1, 1 \\rangle = 1\\), \\(\\langle 1, x \\rangle = 1/2\\), \\(\\langle x, x \\rangle = 1/3\\), etc.',
                    solution: '\\(e_1 = 1\\). \\(u_2 = x - \\langle 1, x \\rangle \\cdot 1 = x - 1/2\\), \\(e_2 = (x - 1/2)/\\|x - 1/2\\| = \\sqrt{12}(x - 1/2)\\). \\(u_3 = x^2 - \\langle e_1, x^2 \\rangle e_1 - \\langle e_2, x^2 \\rangle e_2 = x^2 - x + 1/6\\), which is proportional to the shifted Legendre polynomial \\(\\tilde{P}_2(x)\\).'
                },
                {
                    question: 'Compute the Fourier coefficients \\(c_n\\) for the square wave \\(f(x) = \\text{sgn}(\\sin x)\\) on \\([-\\pi, \\pi]\\) and verify Parseval\\'s theorem: \\(\\sum |c_n|^2 = \\|f\\|^2\\).',
                    hint: 'Only the sine coefficients \\(b_n\\) are nonzero (why?). Compute \\(b_n = \\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx\\).',
                    solution: 'By symmetry (\\(f\\) is odd), \\(a_n = 0\\). \\(b_n = \\frac{2}{\\pi} \\int_0^{\\pi} \\sin(nx) \\, dx = \\frac{2}{n\\pi}(1 - \\cos n\\pi) = 4/(n\\pi)\\) for odd \\(n\\), 0 for even \\(n\\). Parseval: \\(\\sum_{n \\text{ odd}} (4/(n\\pi))^2 = (16/\\pi^2) \\sum_{k=0}^{\\infty} 1/(2k+1)^2 = (16/\\pi^2)(\\pi^2/8) = 2 = \\|f\\|^2 = \\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} 1 \\, dx = 2\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Linear Operators
        // ================================================================
        {
            id: 'sec-operators',
            title: 'Linear Operators',
            content: `
<h2>Linear Operators</h2>

<div class="env-block intuition">
    <div class="env-title">From Matrices to Operators</div>
    <div class="env-body">
        <p>A matrix \\(A\\) acts on a vector \\(\\mathbf{v}\\) to produce another vector \\(A\\mathbf{v}\\). A linear operator \\(\\hat{A}\\) acts on a function \\(f\\) to produce another function \\(\\hat{A}f\\). Differentiation, multiplication by \\(x\\), convolution with a kernel, are all linear operators on function spaces. Quantum mechanics elevates operators to observables: the Hamiltonian \\(\\hat{H}\\), momentum \\(\\hat{p} = -i\\hbar \\partial_x\\), position \\(\\hat{x}\\).</p>
    </div>
</div>

<h3>Bounded Operators</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.5 (Bounded Operator)</div>
    <div class="env-body">
        <p>A linear operator \\(A: \\mathcal{H} \\to \\mathcal{H}\\) is <strong>bounded</strong> if there exists \\(C > 0\\) such that \\(\\|Af\\| \\leq C\\|f\\|\\) for all \\(f\\). The smallest such \\(C\\) is the <strong>operator norm</strong>:</p>
        \\[\\|A\\| = \\sup_{\\|f\\| = 1} \\|Af\\|.\\]
        <p>Bounded operators are continuous: \\(f_n \\to f\\) implies \\(Af_n \\to Af\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Unbounded Operators</div>
    <div class="env-body">
        <p>Many important operators in physics are <em>unbounded</em>: the derivative \\(d/dx\\), the Laplacian \\(\\nabla^2\\), the position and momentum operators. These are only defined on dense subspaces (their "domains") and require more careful treatment. The spectral theorem still applies, but the technical details are more involved. We will encounter these in Chapter 9 (Sturm-Liouville theory).</p>
    </div>
</div>

<h3>Self-Adjoint (Hermitian) Operators</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.6 (Adjoint and Self-Adjoint)</div>
    <div class="env-body">
        <p>The <strong>adjoint</strong> \\(A^\\dagger\\) of a bounded operator \\(A\\) is defined by</p>
        \\[\\langle A^\\dagger f, g \\rangle = \\langle f, A g \\rangle \\quad \\text{for all } f, g \\in \\mathcal{H}.\\]
        <p>An operator is <strong>self-adjoint</strong> (or Hermitian) if \\(A = A^\\dagger\\), i.e., \\(\\langle Af, g \\rangle = \\langle f, Ag \\rangle\\) for all \\(f, g\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.8: Multiplication Operator</div>
    <div class="env-body">
        <p>On \\(L^2(\\mathbb{R})\\), define \\((Mf)(x) = x \\, f(x)\\). Then \\(\\langle Mf, g \\rangle = \\int x f^* g \\, dx = \\langle f, Mg \\rangle\\), so \\(M\\) is self-adjoint. This is the position operator in quantum mechanics. Note that it is unbounded (\\(\\|Mf\\|\\) can be arbitrarily large even if \\(\\|f\\| = 1\\)).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.9: Integral Operator</div>
    <div class="env-body">
        <p>On \\(L^2([a,b])\\), define \\((Kf)(x) = \\int_a^b k(x,y) f(y) \\, dy\\). If the kernel satisfies \\(k(x,y) = \\overline{k(y,x)}\\) (Hermitian kernel), then \\(K\\) is self-adjoint and bounded (if \\(k \\in L^2([a,b]^2)\\)).</p>
    </div>
</div>

<h3>Unitary Operators</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.7 (Unitary Operator)</div>
    <div class="env-body">
        <p>A bounded operator \\(U\\) is <strong>unitary</strong> if \\(U^\\dagger U = U U^\\dagger = I\\), equivalently, \\(U\\) is surjective and preserves inner products: \\(\\langle Uf, Ug \\rangle = \\langle f, g \\rangle\\).</p>
    </div>
</div>

<p>Unitary operators are the "rotations" of Hilbert space. They preserve norms and angles. In quantum mechanics, time evolution is unitary (\\(U(t) = e^{-iHt/\\hbar}\\)), which ensures probability is conserved.</p>

<h3>Compact Operators</h3>

<div class="env-block definition">
    <div class="env-title">Definition 4.8 (Compact Operator)</div>
    <div class="env-body">
        <p>A bounded operator \\(A\\) is <strong>compact</strong> if it maps bounded sets to sets with compact closure (i.e., every bounded sequence \\(\\{f_n\\}\\) has a subsequence for which \\(\\{Af_{n_k}\\}\\) converges). Equivalently, \\(A\\) is the norm limit of finite-rank operators.</p>
    </div>
</div>

<p>Compact operators are the "closest to finite-dimensional" among infinite-dimensional operators. Integral operators with \\(L^2\\) kernels are compact, and the spectral theorem takes its simplest form for compact self-adjoint operators.</p>

<div class="viz-placeholder" data-viz="viz-operators"></div>
`,
            visualizations: [
                {
                    id: 'viz-operators',
                    title: 'Operator Transforms a Function',
                    description: 'Choose a linear operator and see how it transforms a function. The original function (blue) is mapped to the transformed function (orange). Different operators have qualitatively different effects.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 80, originY: 200, scale: 50
                        });

                        var opType = 0;
                        var opNames = ['Multiply by x', 'Differentiate', 'Integrate', 'Fourier (low-pass)', 'Shift'];
                        var fType = 0;
                        var fNames = ['sin(2pi x)', 'x(1-x)', 'Step'];

                        VizEngine.createSlider(controls, 'Operator', 0, 4, 0, 1, function(v) {
                            opType = Math.round(v);
                        });
                        VizEngine.createSlider(controls, 'Input f', 0, 2, 0, 1, function(v) {
                            fType = Math.round(v);
                        });

                        function inputFunc(x) {
                            if (fType === 0) return Math.sin(2 * Math.PI * x);
                            if (fType === 1) return 4 * x * (1 - x);
                            return x < 0.5 ? 1 : -0.5;
                        }

                        function applyOp(f, opIdx) {
                            return function(x) {
                                if (opIdx === 0) { return x * f(x); } // Multiply by x
                                if (opIdx === 1) { // Numerical derivative
                                    var h = 0.001;
                                    return (f(x + h) - f(x - h)) / (2 * h);
                                }
                                if (opIdx === 2) { // Integral from 0 to x
                                    var n = 100;
                                    var dx = x / n;
                                    var s = 0;
                                    for (var i = 0; i < n; i++) {
                                        s += f(i * dx) * dx;
                                    }
                                    return s;
                                }
                                if (opIdx === 3) { // Low-pass: keep first 3 Fourier modes
                                    // Approximate by computing a few Fourier coefficients
                                    var nPts = 200;
                                    var a0 = 0;
                                    var ak = [0, 0, 0];
                                    var bk = [0, 0, 0];
                                    for (var j = 0; j < nPts; j++) {
                                        var xj = j / nPts;
                                        var fj = f(xj);
                                        a0 += fj;
                                        for (var kk = 0; kk < 3; kk++) {
                                            ak[kk] += fj * Math.cos(2 * Math.PI * (kk + 1) * xj);
                                            bk[kk] += fj * Math.sin(2 * Math.PI * (kk + 1) * xj);
                                        }
                                    }
                                    a0 /= nPts;
                                    var result = a0;
                                    for (var kk2 = 0; kk2 < 3; kk2++) {
                                        ak[kk2] *= 2 / nPts;
                                        bk[kk2] *= 2 / nPts;
                                        result += ak[kk2] * Math.cos(2 * Math.PI * (kk2 + 1) * x) + bk[kk2] * Math.sin(2 * Math.PI * (kk2 + 1) * x);
                                    }
                                    return result;
                                }
                                if (opIdx === 4) { // Shift by 0.1
                                    return f(x - 0.1);
                                }
                                return f(x);
                            };
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -2; gx <= 10; gx++) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = -3; gy <= 3; gy++) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();

                            var transformedFunc = applyOp(inputFunc, opType);

                            // Draw original
                            viz.drawFunction(inputFunc, 0, 1, viz.colors.blue, 2.5, 300);
                            // Draw transformed
                            viz.drawFunction(transformedFunc, 0, 1, viz.colors.orange, 2.5, 300);

                            // Arrow between functions
                            var arrowY = 30;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2 - 60, arrowY);
                            ctx.lineTo(viz.width / 2 + 40, arrowY);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2 + 40, arrowY);
                            ctx.lineTo(viz.width / 2 + 30, arrowY - 5);
                            ctx.moveTo(viz.width / 2 + 40, arrowY);
                            ctx.lineTo(viz.width / 2 + 30, arrowY + 5);
                            ctx.stroke();

                            viz.screenText('A', viz.width / 2 - 10, arrowY - 2, viz.colors.white, 14);

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue; ctx.fillRect(15, 55, 14, 3); ctx.fillText('f: ' + fNames[fType], 35, 60);
                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(15, 75, 14, 3); ctx.fillText('Af: ' + opNames[opType], 35, 80);

                            // x-axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('0', viz.originX, viz.originY + 4);
                            ctx.fillText('1', viz.originX + viz.scale, viz.originY + 4);
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the derivative operator \\(D = d/dx\\) on \\(L^2([0,1])\\) is unbounded. (Hint: consider \\(f_n(x) = \\sin(n\\pi x)\\).)',
                    hint: 'Compute \\(\\|f_n\\|\\) and \\(\\|Df_n\\|\\) and show their ratio grows without bound.',
                    solution: '\\(\\|f_n\\|^2 = \\int_0^1 \\sin^2(n\\pi x) \\, dx = 1/2\\), so \\(\\|f_n\\| = 1/\\sqrt{2}\\). \\(Df_n = n\\pi \\cos(n\\pi x)\\), so \\(\\|Df_n\\| = n\\pi/\\sqrt{2}\\). The ratio \\(\\|Df_n\\|/\\|f_n\\| = n\\pi \\to \\infty\\), so \\(D\\) is unbounded.'
                },
                {
                    question: 'Prove that eigenvalues of a self-adjoint operator are real.',
                    hint: 'If \\(Af = \\lambda f\\), compute \\(\\langle f, Af \\rangle\\) in two ways.',
                    solution: '\\(\\langle f, Af \\rangle = \\langle f, \\lambda f \\rangle = \\lambda \\|f\\|^2\\). Also \\(\\langle f, Af \\rangle = \\langle Af, f \\rangle^* = (\\lambda \\|f\\|^2)^* = \\bar{\\lambda} \\|f\\|^2\\) (using \\(A = A^\\dagger\\)). Since \\(f \\neq 0\\), \\(\\lambda = \\bar{\\lambda}\\), so \\(\\lambda \\in \\mathbb{R}\\).'
                },
                {
                    question: 'Show that eigenvectors of a self-adjoint operator corresponding to distinct eigenvalues are orthogonal.',
                    hint: 'If \\(Af = \\lambda f\\) and \\(Ag = \\mu g\\) with \\(\\lambda \\neq \\mu\\), compute \\(\\langle f, Ag \\rangle\\) two ways.',
                    solution: '\\(\\langle f, Ag \\rangle = \\mu \\langle f, g \\rangle\\). Also \\(\\langle f, Ag \\rangle = \\langle Af, g \\rangle = \\overline{\\lambda} \\langle f, g \\rangle = \\lambda \\langle f, g \\rangle\\) (since \\(\\lambda\\) is real). So \\((\\lambda - \\mu) \\langle f, g \\rangle = 0\\). Since \\(\\lambda \\neq \\mu\\), we get \\(\\langle f, g \\rangle = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Spectral Theorem
        // ================================================================
        {
            id: 'sec-spectral',
            title: 'Spectral Theorem',
            content: `
<h2>The Spectral Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Result</div>
    <div class="env-body">
        <p>In finite dimensions, the spectral theorem says: every Hermitian matrix can be diagonalized by a unitary change of basis, with real eigenvalues on the diagonal. In infinite dimensions, every compact self-adjoint operator can be "diagonalized" in an analogous sense. This is the mathematical foundation of quantum mechanics, where observables are self-adjoint operators and measurements yield eigenvalues.</p>
    </div>
</div>

<h3>Compact Self-Adjoint Operators</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.7 (Spectral Theorem for Compact Self-Adjoint Operators)</div>
    <div class="env-body">
        <p>Let \\(A\\) be a compact self-adjoint operator on a Hilbert space \\(\\mathcal{H}\\). Then:</p>
        <ol>
            <li>All eigenvalues are <strong>real</strong>.</li>
            <li>Eigenvectors corresponding to distinct eigenvalues are <strong>orthogonal</strong>.</li>
            <li>There exists an orthonormal basis \\(\\{e_n\\}\\) of \\(\\mathcal{H}\\) consisting of eigenvectors of \\(A\\).</li>
            <li>The eigenvalues \\(\\{\\lambda_n\\}\\) form a sequence converging to 0 (the only possible accumulation point).</li>
            <li>Every \\(f \\in \\mathcal{H}\\) has the expansion \\(Af = \\sum_n \\lambda_n \\langle e_n, f \\rangle \\, e_n\\).</li>
        </ol>
    </div>
</div>

<p>Property (5) is the operator analogue of matrix diagonalization: \\(A = \\sum_n \\lambda_n |e_n\\rangle\\langle e_n|\\) in Dirac notation.</p>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>We already proved (1) and (2) in the exercises of Section 5. For (3), one shows that \\(A\\) attains its norm on the unit ball (by compactness), and the maximizer is an eigenvector \\(e_1\\) with eigenvalue \\(\\lambda_1 = \\pm\\|A\\|\\). Restricting \\(A\\) to \\(\\{e_1\\}^\\perp\\) and repeating gives the full sequence. Convergence \\(\\lambda_n \\to 0\\) follows from compactness.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Physical Applications</h3>

<div class="env-block example">
    <div class="env-title">Example 4.10: Eigenfunctions of the Laplacian</div>
    <div class="env-body">
        <p>On \\(L^2([0, L])\\) with Dirichlet boundary conditions \\(f(0) = f(L) = 0\\), the eigenvalue problem</p>
        \\[-\\frac{d^2 f}{dx^2} = \\lambda f\\]
        <p>has eigenfunctions \\(f_n(x) = \\sin(n\\pi x / L)\\) with eigenvalues \\(\\lambda_n = (n\\pi/L)^2\\) for \\(n = 1, 2, 3, \\ldots\\). These are the normal modes of a vibrating string. Any function satisfying the boundary conditions can be expanded as \\(f = \\sum c_n f_n\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.11: Quantum Harmonic Oscillator</div>
    <div class="env-body">
        <p>The Hamiltonian \\(\\hat{H} = -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2} + \\frac{1}{2}m\\omega^2 x^2\\) has eigenvalues \\(E_n = \\hbar\\omega(n + 1/2)\\) and eigenfunctions involving Hermite polynomials times a Gaussian. The energy eigenstates form an orthonormal basis for the Hilbert space of the oscillator.</p>
    </div>
</div>

<h3>Connection to Quantum Mechanics</h3>

<p>The measurement postulate of quantum mechanics states:</p>
<ul>
    <li>An observable is represented by a self-adjoint operator \\(\\hat{A}\\) on the Hilbert space of states.</li>
    <li>The possible measurement outcomes are the eigenvalues \\(\\{\\lambda_n\\}\\) of \\(\\hat{A}\\).</li>
    <li>If the system is in state \\(|\\psi\\rangle\\), the probability of measuring \\(\\lambda_n\\) is \\(|\\langle e_n | \\psi \\rangle|^2\\).</li>
    <li>After measurement, the state "collapses" to the eigenstate \\(|e_n\\rangle\\).</li>
</ul>

<p>The spectral theorem guarantees that the eigenvalues are real (physical measurements yield real numbers), the eigenstates are orthogonal (distinct outcomes are distinguishable), and they form a complete basis (probabilities sum to 1 by Parseval).</p>

<div class="viz-placeholder" data-viz="viz-spectral"></div>
<div class="viz-placeholder" data-viz="viz-quantum-connection"></div>
`,
            visualizations: [
                {
                    id: 'viz-spectral',
                    title: 'Eigenfunction Expansion',
                    description: 'Eigenfunctions of the 1D Laplacian (modes of a vibrating string). A general function is decomposed into its eigenfunction components, with coefficients shown as bars.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 60, originY: 0, scale: 1
                        });

                        var nModes = 5;
                        var funcType = 0;
                        var funcNames = ['Plucked string', 'Struck string', 'Custom'];

                        VizEngine.createSlider(controls, 'Modes', 1, 12, 5, 1, function(v) {
                            nModes = Math.round(v);
                        });
                        VizEngine.createSlider(controls, 'Initial shape', 0, 2, 0, 1, function(v) {
                            funcType = Math.round(v);
                        });

                        // Target function on [0, 1]
                        function targetFunc(x) {
                            if (funcType === 0) {
                                // Plucked string: triangle at 1/3
                                if (x < 1/3) return 3 * x;
                                return 1.5 * (1 - x);
                            } else if (funcType === 1) {
                                // Struck: narrow bump
                                var c = 0.5, w = 0.1;
                                return Math.exp(-((x - c) / w) * ((x - c) / w));
                            } else {
                                // Custom: half sine + quarter
                                return Math.sin(Math.PI * x) + 0.3 * Math.sin(3 * Math.PI * x);
                            }
                        }

                        // Compute Fourier sine coefficients
                        function sineCoeff(f, n) {
                            var nPts = 500;
                            var s = 0;
                            for (var i = 0; i <= nPts; i++) {
                                var x = i / nPts;
                                var w = (i === 0 || i === nPts) ? 0.5 : 1;
                                s += w * f(x) * Math.sin(n * Math.PI * x);
                            }
                            return 2 * s / nPts;
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            var time = t * 0.001;

                            // Compute coefficients
                            var coeffs = [];
                            for (var n = 1; n <= nModes; n++) {
                                coeffs.push(sineCoeff(targetFunc, n));
                            }

                            // Top panel: function and approximation
                            var topH = 200;
                            var topOY = 120;
                            var plotScale = 80;
                            var plotOX = 80;
                            var plotW = 400;

                            // Background panel
                            ctx.fillStyle = '#0f0f28';
                            ctx.fillRect(plotOX - 10, 10, plotW + 30, topH - 10);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(plotOX, topOY); ctx.lineTo(plotOX + plotW, topOY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotOX, 20); ctx.lineTo(plotOX, topH); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('0', plotOX, topOY + 2);
                            ctx.fillText('1', plotOX + plotW, topOY + 2);

                            // Target function (dashed)
                            ctx.strokeStyle = viz.colors.white + '55'; ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var x = i / 300;
                                var y = targetFunc(x);
                                var sx = plotOX + x * plotW;
                                var sy = topOY - y * plotScale;
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Partial sum
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= 300; i2++) {
                                var x2 = i2 / 300;
                                var y2 = 0;
                                for (var n2 = 0; n2 < nModes; n2++) {
                                    y2 += coeffs[n2] * Math.sin((n2 + 1) * Math.PI * x2);
                                }
                                var sx2 = plotOX + x2 * plotW;
                                var sy2 = topOY - y2 * plotScale;
                                i2 === 0 ? ctx.moveTo(sx2, sy2) : ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Individual modes (faint)
                            var modeColors = [viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink, viz.colors.yellow, viz.colors.red, viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green];
                            for (var nm = 0; nm < Math.min(nModes, 6); nm++) {
                                ctx.strokeStyle = (modeColors[nm] || viz.colors.teal) + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var im = 0; im <= 200; im++) {
                                    var xm = im / 200;
                                    var ym = coeffs[nm] * Math.sin((nm + 1) * Math.PI * xm);
                                    var sxm = plotOX + xm * plotW;
                                    var sym = topOY - ym * plotScale;
                                    im === 0 ? ctx.moveTo(sxm, sym) : ctx.lineTo(sxm, sym);
                                }
                                ctx.stroke();
                            }

                            // Bottom panel: coefficient bar chart
                            var barTop = topH + 30;
                            var barH = 130;
                            var barOY = barTop + barH / 2 + 20;

                            viz.screenText('Eigenfunction Coefficients c_n = <e_n, f>', viz.width / 2, barTop, viz.colors.white, 12);

                            var barW = Math.min(35, (plotW - 20) / nModes);
                            var maxCoeff = 0;
                            for (var nc = 0; nc < nModes; nc++) maxCoeff = Math.max(maxCoeff, Math.abs(coeffs[nc]));
                            if (maxCoeff < 0.01) maxCoeff = 1;
                            var barScale = (barH / 2 - 10) / maxCoeff;

                            for (var nb = 0; nb < nModes; nb++) {
                                var bx = plotOX + 20 + nb * (barW + 4);
                                var bh = coeffs[nb] * barScale;
                                ctx.fillStyle = (modeColors[nb] || viz.colors.teal) + 'aa';
                                if (bh >= 0) {
                                    ctx.fillRect(bx, barOY - bh, barW, bh);
                                } else {
                                    ctx.fillRect(bx, barOY, barW, -bh);
                                }
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText('n=' + (nb + 1), bx + barW / 2, barOY + barH / 2 - 5);
                                ctx.fillText(coeffs[nb].toFixed(2), bx + barW / 2, barOY - bh - 12);
                            }

                            // Baseline
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(plotOX, barOY); ctx.lineTo(plotOX + plotW, barOY); ctx.stroke();

                            // Title and labels
                            viz.screenText(funcNames[funcType] + '  |  ' + nModes + ' modes', viz.width / 2, topH + 10, viz.colors.text, 11);
                            viz.screenText('Target (dashed) vs expansion (blue)', plotOX + plotW / 2, topH - 5, viz.colors.text, 10);
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-quantum-connection',
                    title: 'Wave Function in Hilbert Space',
                    description: 'A quantum state |psi> in a Hilbert space, shown as a superposition of energy eigenstates. The measurement probabilities |<e_n|psi>|^2 sum to 1 (Parseval). Click "Measure" to collapse the state.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var nLevels = 5;
                        var collapsed = -1;
                        var coeffs = [0.5, 0.6, 0.4, 0.3, 0.2];
                        // Normalize
                        var normSq = 0;
                        for (var i = 0; i < coeffs.length; i++) normSq += coeffs[i] * coeffs[i];
                        var normC = Math.sqrt(normSq);
                        for (var j = 0; j < coeffs.length; j++) coeffs[j] /= normC;

                        VizEngine.createButton(controls, 'Measure', function() {
                            // Random collapse weighted by |c_n|^2
                            var r = Math.random();
                            var cumul = 0;
                            for (var k = 0; k < nLevels; k++) {
                                cumul += coeffs[k] * coeffs[k];
                                if (r < cumul) { collapsed = k; break; }
                            }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            collapsed = -1;
                        });

                        VizEngine.createSlider(controls, 'c1', 0.1, 1, 0.5, 0.05, function(v) {
                            coeffs[0] = v; normalize(); collapsed = -1;
                        });
                        VizEngine.createSlider(controls, 'c2', 0.1, 1, 0.6, 0.05, function(v) {
                            coeffs[1] = v; normalize(); collapsed = -1;
                        });

                        function normalize() {
                            var s = 0;
                            for (var i = 0; i < nLevels; i++) s += coeffs[i] * coeffs[i];
                            var n = Math.sqrt(s);
                            for (var j = 0; j < nLevels; j++) coeffs[j] /= n;
                        }

                        // Eigenfunctions: particle in a box
                        function eigenFunc(n, x) {
                            return Math.sqrt(2) * Math.sin(n * Math.PI * x);
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            var time = t * 0.002;

                            // Layout
                            var wfLeft = 30, wfRight = 300, wfTop = 30, wfBot = 280;
                            var wfW = wfRight - wfLeft, wfH = wfBot - wfTop;
                            var wfOY = (wfTop + wfBot) / 2;

                            // Probability panel
                            var probLeft = 340, probRight = 540, probTop = 30, probBot = 280;

                            // Wave function panel background
                            ctx.fillStyle = '#0a0a22';
                            ctx.fillRect(wfLeft, wfTop, wfW, wfH);
                            ctx.fillRect(probLeft, probTop, probRight - probLeft, probBot - probTop);

                            viz.screenText('Wave function |psi(x)>', (wfLeft + wfRight) / 2, wfTop - 12, viz.colors.white, 12);
                            viz.screenText('Measurement probabilities', (probLeft + probRight) / 2, probTop - 12, viz.colors.white, 12);

                            // Compute psi(x) or collapsed state
                            var activeCoeffs = [];
                            if (collapsed >= 0) {
                                for (var ic = 0; ic < nLevels; ic++) activeCoeffs.push(ic === collapsed ? 1 : 0);
                            } else {
                                for (var ic2 = 0; ic2 < nLevels; ic2++) activeCoeffs.push(coeffs[ic2]);
                            }

                            // Draw psi
                            var funcScale = wfH / 5;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var ix = 0; ix <= 200; ix++) {
                                var x = ix / 200;
                                var psi = 0;
                                for (var n = 0; n < nLevels; n++) {
                                    // Add time evolution phase
                                    var phase = (collapsed >= 0) ? 0 : (n + 1) * (n + 1) * time;
                                    psi += activeCoeffs[n] * Math.cos(phase) * eigenFunc(n + 1, x);
                                }
                                var sx = wfLeft + x * wfW;
                                var sy = wfOY - psi * funcScale;
                                ix === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw |psi|^2 shaded
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.beginPath();
                            ctx.moveTo(wfLeft, wfOY);
                            for (var ix2 = 0; ix2 <= 200; ix2++) {
                                var x2 = ix2 / 200;
                                var psi2 = 0;
                                for (var n2 = 0; n2 < nLevels; n2++) {
                                    var phase2 = (collapsed >= 0) ? 0 : (n2 + 1) * (n2 + 1) * time;
                                    psi2 += activeCoeffs[n2] * Math.cos(phase2) * eigenFunc(n2 + 1, x2);
                                }
                                var sx2 = wfLeft + x2 * wfW;
                                var sy2 = wfOY - psi2 * psi2 * funcScale * 0.3;
                                ctx.lineTo(sx2, sy2);
                            }
                            ctx.lineTo(wfRight, wfOY);
                            ctx.closePath();
                            ctx.fill();

                            // x axis in wavefunction panel
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(wfLeft, wfOY); ctx.lineTo(wfRight, wfOY); ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('0', wfLeft, wfOY + 2);
                            ctx.fillText('L', wfRight, wfOY + 2);

                            // Probability bars
                            var barW = 25;
                            var barMaxH = 180;
                            var barGap = (probRight - probLeft - nLevels * barW) / (nLevels + 1);

                            var modeColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green];

                            var totalProb = 0;
                            for (var nb = 0; nb < nLevels; nb++) {
                                var prob = activeCoeffs[nb] * activeCoeffs[nb];
                                totalProb += prob;
                                var bx = probLeft + barGap + nb * (barW + barGap);
                                var bh = prob * barMaxH;

                                ctx.fillStyle = (modeColors[nb] || viz.colors.teal);
                                if (collapsed >= 0 && nb !== collapsed) ctx.fillStyle += '33';
                                ctx.fillRect(bx, probBot - bh, barW, bh);

                                // Label
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText('E' + (nb + 1), bx + barW / 2, probBot + 4);
                                ctx.fillText((prob * 100).toFixed(1) + '%', bx + barW / 2, probBot - bh - 14);
                            }

                            // Sum = 1 check
                            viz.screenText('Sum = ' + totalProb.toFixed(4) + ' (Parseval)', (probLeft + probRight) / 2, probBot + 22, viz.colors.text, 10);

                            // Status
                            var statusY = 310;
                            if (collapsed >= 0) {
                                viz.screenText('COLLAPSED to E' + (collapsed + 1) + ' eigenstate!', viz.width / 2, statusY, viz.colors.orange, 14);
                                viz.screenText('Measured energy: E_' + (collapsed + 1) + ' = ' + ((collapsed + 1) * (collapsed + 1)).toFixed(0) + ' (units of pi^2 hbar^2 / 2mL^2)', viz.width / 2, statusY + 20, viz.colors.text, 10);
                            } else {
                                viz.screenText('Superposition state: |psi> = sum c_n |E_n>', viz.width / 2, statusY, viz.colors.blue, 12);
                                viz.screenText('Time evolution shown (phases rotate at different rates)', viz.width / 2, statusY + 20, viz.colors.text, 10);
                            }

                            // Energy level diagram
                            var elLeft = 30, elRight = 540, elTop = 340, elBot = 390;
                            viz.screenText('Energy Levels', viz.width / 2, elTop - 5, viz.colors.text, 10);
                            for (var ne = 0; ne < nLevels; ne++) {
                                var ey = elBot - (ne + 1) * (ne + 1) / (nLevels * nLevels + 1) * (elBot - elTop - 10);
                                var elx1 = elLeft + 50 + ne * 90;
                                var elx2 = elx1 + 60;
                                ctx.strokeStyle = (modeColors[ne] || viz.colors.teal);
                                if (collapsed >= 0 && ne !== collapsed) ctx.strokeStyle += '44';
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(elx1, ey); ctx.lineTo(elx2, ey); ctx.stroke();
                                ctx.fillStyle = viz.colors.text; ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                ctx.fillText('n=' + (ne + 1), (elx1 + elx2) / 2, ey - 2);
                            }
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the eigenvalues and normalized eigenfunctions of the operator \\(-d^2/dx^2\\) on \\(L^2([0, \\pi])\\) with Dirichlet boundary conditions \\(f(0) = f(\\pi) = 0\\).',
                    hint: 'Solve \\(-f\'\' = \\lambda f\\) with \\(f(0) = f(\\pi) = 0\\). The general solution of \\(f\'\' + \\lambda f = 0\\) depends on the sign of \\(\\lambda\\).',
                    solution: 'For \\(\\lambda > 0\\), write \\(\\lambda = k^2\\). General solution: \\(f = A\\sin(kx) + B\\cos(kx)\\). \\(f(0) = 0 \\Rightarrow B = 0\\). \\(f(\\pi) = 0 \\Rightarrow \\sin(k\\pi) = 0 \\Rightarrow k = n\\) (integer). So \\(\\lambda_n = n^2\\), \\(f_n(x) = \\sqrt{2/\\pi} \\sin(nx)\\) for \\(n = 1, 2, 3, \\ldots\\).'
                },
                {
                    question: 'A particle in a box is in state \\(|\\psi\\rangle = \\frac{1}{\\sqrt{2}}|1\\rangle + \\frac{1}{2}|2\\rangle + \\frac{1}{2}|3\\rangle\\). What are the probabilities of measuring each energy \\(E_n\\)? Verify they sum to 1.',
                    hint: 'The probability of measuring \\(E_n\\) is \\(|c_n|^2\\) where \\(c_n = \\langle n | \\psi \\rangle\\).',
                    solution: '\\(P(E_1) = |1/\\sqrt{2}|^2 = 1/2\\), \\(P(E_2) = |1/2|^2 = 1/4\\), \\(P(E_3) = |1/2|^2 = 1/4\\). Sum: \\(1/2 + 1/4 + 1/4 = 1\\). \\(\\checkmark\\) (Parseval guarantees this, since \\(\\|\\psi\\|^2 = \\sum |c_n|^2\\) and we chose normalized \\(|\\psi\\rangle\\).)'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What Comes Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge to What Comes Next',
            content: `
<h2>Looking Ahead</h2>

<p>Hilbert space theory is the central pillar connecting the topics in this course. Here is how the ideas of this chapter flow into subsequent chapters:</p>

<h3>Group Theory (Chapter 5)</h3>
<p>Symmetry groups act on Hilbert spaces through <strong>unitary representations</strong>. The irreducible representations of a symmetry group decompose the Hilbert space into invariant subspaces, each carrying a definite "quantum number." This is why angular momentum is quantized: the rotation group \\(SO(3)\\) has discrete irreducible representations labeled by \\(\\ell = 0, 1, 2, \\ldots\\)</p>

<h3>Sturm-Liouville Theory (Chapter 9)</h3>
<p>The eigenvalue problems of mathematical physics (Bessel, Legendre, Hermite, Laguerre equations) are all Sturm-Liouville problems. The Sturm-Liouville theorem is a specialized version of the spectral theorem: the eigenfunctions form a complete orthonormal basis for the appropriate \\(L^2\\) space with a weight function. This chapter provided the abstract framework; Chapter 9 provides the concrete machinery.</p>

<h3>Green's Functions (Chapter 10)</h3>
<p>The Green's function \\(G(x, x')\\) of a differential operator \\(L\\) can be written as an eigenfunction expansion:</p>
\\[G(x, x') = \\sum_n \\frac{e_n(x) \\, e_n^*(x')}{\\lambda_n},\\]
<p>where \\(\\{e_n, \\lambda_n\\}\\) are the eigenfunctions and eigenvalues of \\(L\\). The spectral theorem guarantees convergence and completeness of this expansion.</p>

<h3>Fourier Analysis (Chapter 14)</h3>
<p>Fourier analysis is the spectral theory of the translation operator (or equivalently, \\(-d^2/dx^2\\) on \\(\\mathbb{R}\\)). The Fourier transform is a unitary operator on \\(L^2(\\mathbb{R})\\) (Plancherel theorem), and Parseval's theorem is the statement that it preserves norms.</p>

<h3>PDEs (Chapter 17)</h3>
<p>Separation of variables in PDEs works because the resulting ODEs are eigenvalue problems on Hilbert spaces. The completeness of the eigenfunctions guarantees that the general solution can be expanded in these modes.</p>

<div class="env-block remark">
    <div class="env-title">The Dirac Notation Revisited</div>
    <div class="env-body">
        <p>Having developed the theory, we can now fully appreciate Dirac's notation:</p>
        <table class="env-table">
        <thead>
        <tr><th>Dirac notation</th><th>Hilbert space meaning</th></tr>
        </thead>
        <tbody>
        <tr><td>\\(|\\psi\\rangle\\)</td><td>Vector \\(\\psi \\in \\mathcal{H}\\)</td></tr>
        <tr><td>\\(\\langle\\phi|\\)</td><td>Linear functional \\(f \\mapsto \\langle \\phi, f \\rangle\\)</td></tr>
        <tr><td>\\(\\langle\\phi|\\psi\\rangle\\)</td><td>Inner product \\(\\langle \\phi, \\psi \\rangle\\)</td></tr>
        <tr><td>\\(|\\phi\\rangle\\langle\\psi|\\)</td><td>Rank-1 operator \\(f \\mapsto \\langle \\psi, f \\rangle \\phi\\)</td></tr>
        <tr><td>\\(\\hat{A}|\\psi\\rangle = \\lambda|\\psi\\rangle\\)</td><td>Eigenvalue equation</td></tr>
        <tr><td>\\(\\sum_n |n\\rangle\\langle n| = I\\)</td><td>Completeness relation (Parseval)</td></tr>
        </tbody>
        </table>
        <p>The bra \\(\\langle\\phi|\\) is an element of the dual space \\(\\mathcal{H}^*\\). The Riesz representation theorem guarantees that every continuous linear functional on \\(\\mathcal{H}\\) is of this form, which is why Dirac notation works so seamlessly.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Summary</div>
    <div class="env-body">
        <p>A Hilbert space is a complete inner product space. Completeness ensures infinite sums converge. The inner product provides geometry (lengths, angles, projections). The spectral theorem for self-adjoint operators provides the bridge between abstract operator theory and concrete physics: eigenvalues are observables, eigenvectors are states, and the completeness of the eigenbasis encodes the totality of possible measurements.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'The Riesz representation theorem states that every continuous linear functional \\(\\phi: \\mathcal{H} \\to \\mathbb{C}\\) on a Hilbert space is of the form \\(\\phi(f) = \\langle g, f \\rangle\\) for a unique \\(g \\in \\mathcal{H}\\). Explain why this theorem fails for incomplete inner product spaces.',
                    hint: 'Consider the space of polynomials with the \\(L^2\\) inner product. Can you construct a continuous linear functional that is not representable?',
                    solution: 'In the space of polynomials on \\([0,1]\\), the functional \\(\\phi(p) = p(1/2)\\) (point evaluation) is continuous in the \\(L^2\\) norm. If the Riesz theorem held, there would exist a polynomial \\(g\\) with \\(p(1/2) = \\int_0^1 g(x) p(x) \\, dx\\) for all polynomials \\(p\\). But the Riesz representer would be \\(\\delta(x - 1/2)\\), which is not a polynomial. The theorem fails because the space is incomplete; the representer exists in \\(L^2\\) (as a distribution) but not in the subspace of polynomials.'
                },
                {
                    question: 'Show that the Fourier transform \\(\\hat{f}(k) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^{\\infty} f(x) e^{-ikx} \\, dx\\) is a unitary operator on \\(L^2(\\mathbb{R})\\), using the fact that \\(\\|\\hat{f}\\| = \\|f\\|\\) (Plancherel).',
                    hint: 'A bounded operator \\(U\\) is unitary iff \\(U^\\dagger U = I\\) and \\(U U^\\dagger = I\\). Plancherel says \\(\\langle \\hat{f}, \\hat{g} \\rangle = \\langle f, g \\rangle\\) (use polarization).',
                    solution: 'Plancherel gives \\(\\|\\hat{f}\\| = \\|f\\|\\), so the Fourier transform preserves norms. By the polarization identity, it also preserves inner products: \\(\\langle \\hat{f}, \\hat{g} \\rangle = \\langle f, g \\rangle\\). This means \\(\\mathcal{F}^\\dagger \\mathcal{F} = I\\). The inverse Fourier transform shows \\(\\mathcal{F} \\mathcal{F}^\\dagger = I\\), so \\(\\mathcal{F}\\) is unitary.'
                }
            ]
        }
    ]
});
