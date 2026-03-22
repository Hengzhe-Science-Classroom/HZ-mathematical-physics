window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Residues & Physical Applications',
    subtitle: 'Computing real integrals and solving physics problems via residues',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Residues Matter
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Residues Matter',
            content: `
<h2>Why Residues Matter</h2>

<div class="env-block intuition">
    <div class="env-title">A Surprising Shortcut</div>
    <div class="env-body">
        <p>Consider the integral \\(\\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^2}\\). You can compute it by finding an antiderivative (\\(\\arctan x\\)), but there is a more powerful approach: extend the integrand to the complex plane, close the contour with a semicircle at infinity, and read off the answer from the singular structure of the function. The result, \\(\\pi\\), drops out from a single residue calculation.</p>
        <p>This is not a parlor trick. It is the standard method for an enormous class of integrals that arise constantly in physics, from quantum field theory scattering amplitudes to signal processing response functions.</p>
    </div>
</div>

<p>In Chapter 6, we developed the Cauchy integral formula and the Laurent series. Those tools showed that the behavior of an analytic function near its singularities determines everything about it. The <strong>residue</strong> at an isolated singularity is the single Laurent coefficient that controls the value of contour integrals.</p>

<p>This chapter puts that machinery to work. We will:</p>
<ol>
    <li>State and prove the Residue Theorem</li>
    <li>Develop systematic techniques for evaluating real integrals by contour methods</li>
    <li>Apply residues to physics: Kramers-Kronig relations (causality), Green's functions (propagators), and scattering theory (S-matrix poles)</li>
</ol>

<h3>The Central Idea</h3>

<p>If \\(f(z)\\) has an isolated singularity at \\(z_0\\), its Laurent series is</p>
\\[
f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n.
\\]
<p>The coefficient \\(a_{-1}\\) plays a special role. By direct integration of each term around a small circle \\(|z - z_0| = \\epsilon\\):</p>
\\[
\\oint_{|z-z_0|=\\epsilon} (z - z_0)^n \\, dz = \\begin{cases} 2\\pi i & \\text{if } n = -1, \\\\ 0 & \\text{otherwise.} \\end{cases}
\\]
<p>So the entire contour integral is determined by \\(a_{-1}\\) alone:</p>
\\[
\\oint_{|z-z_0|=\\epsilon} f(z)\\,dz = 2\\pi i \\, a_{-1}.
\\]

<div class="env-block definition">
    <div class="env-title">Definition 7.1 (Residue)</div>
    <div class="env-body">
        <p>The <strong>residue</strong> of \\(f\\) at an isolated singularity \\(z_0\\) is the coefficient \\(a_{-1}\\) in its Laurent expansion about \\(z_0\\):</p>
        \\[
        \\operatorname{Res}_{z=z_0} f(z) = a_{-1} = \\frac{1}{2\\pi i} \\oint_{|z-z_0|=\\epsilon} f(z)\\,dz.
        \\]
    </div>
</div>

<p>The residue extracts exactly the information that survives integration around a singularity. Everything else (the analytic part and the higher-order poles) integrates to zero.</p>

<div class="viz-placeholder" data-viz="viz-residue-computation"></div>
`,
            visualizations: [
                {
                    id: 'viz-residue-computation',
                    title: 'Step-by-Step Residue Calculator',
                    description: 'Select a function and singularity to see the Laurent expansion and residue computation step by step. The domain coloring shows the phase portrait, with the singularity structure visible as color vortices.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 60
                        });

                        var funcIdx = 0;
                        var funcs = [
                            {
                                name: '1/(z\u00B2+1)',
                                f: function(re, im) {
                                    // f(z) = 1/(z^2+1)
                                    var zr = re, zi = im;
                                    var dr = zr*zr - zi*zi + 1, di = 2*zr*zi;
                                    var mag2 = dr*dr + di*di;
                                    if (mag2 < 1e-12) return [1e6, 0];
                                    return [dr/mag2, -di/mag2];
                                },
                                poles: [{re:0, im:1, label:'z=i', res_re: 0, res_im: -0.5},
                                        {re:0, im:-1, label:'z=-i', res_re: 0, res_im: 0.5}],
                                info: 'Simple poles at z=\u00B1i. Res(z=i) = 1/(2i) = -i/2.'
                            },
                            {
                                name: '1/z\u00B2',
                                f: function(re, im) {
                                    var mag2 = re*re + im*im;
                                    if (mag2 < 1e-12) return [1e6, 0];
                                    var ir = re/mag2, ii = -im/mag2;
                                    return [ir*ir - ii*ii, 2*ir*ii];
                                },
                                poles: [{re:0, im:0, label:'z=0 (order 2)', res_re: 0, res_im: 0}],
                                info: 'Order-2 pole at z=0. Laurent: 1/z\u00B2. Residue = a\u208B\u2081 = 0.'
                            },
                            {
                                name: 'e^z/z\u00B2',
                                f: function(re, im) {
                                    var mag2 = re*re + im*im;
                                    if (mag2 < 1e-12) return [1e6, 0];
                                    // e^z = e^re * (cos(im) + i sin(im))
                                    var er = Math.exp(re)*Math.cos(im), ei = Math.exp(re)*Math.sin(im);
                                    // divide by z^2
                                    var ir = re/mag2, ii = -im/mag2;
                                    var i2r = ir*ir - ii*ii, i2i = 2*ir*ii;
                                    return [er*i2r - ei*i2i, er*i2i + ei*i2r];
                                },
                                poles: [{re:0, im:0, label:'z=0 (order 2)', res_re: 1, res_im: 0}],
                                info: 'e^z/z\u00B2: Laurent = 1/z\u00B2 + 1/z + 1/2 + ... Residue = 1.'
                            },
                            {
                                name: 'z/(z\u00B2-1)',
                                f: function(re, im) {
                                    var dr = re*re - im*im - 1, di = 2*re*im;
                                    var mag2 = dr*dr + di*di;
                                    if (mag2 < 1e-12) return [1e6, 0];
                                    return [(re*dr + im*di)/mag2, (im*dr - re*di)/mag2];
                                },
                                poles: [{re:1, im:0, label:'z=1', res_re: 0.5, res_im: 0},
                                        {re:-1, im:0, label:'z=-1', res_re: 0.5, res_im: 0}],
                                info: 'Simple poles at z=\u00B11. Res(z=1) = 1/2, Res(z=-1) = 1/2.'
                            }
                        ];

                        var btnContainer = document.createElement('div');
                        btnContainer.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
                        controls.appendChild(btnContainer);
                        funcs.forEach(function(fn, idx) {
                            var b = VizEngine.createButton(btnContainer, fn.name, function() {
                                funcIdx = idx;
                                draw();
                            });
                            if (idx === 0) b.style.borderColor = viz.colors.blue;
                        });

                        function draw() {
                            var fn = funcs[funcIdx];
                            // Domain coloring
                            var xR = [-4, 4], yR = [-3.5, 3.5];
                            viz.drawDomainColoring(fn.f, xR, yR);

                            var ctx = viz.ctx;
                            // Draw axes lightly over domain coloring
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(0, viz.height/2); ctx.lineTo(viz.width, viz.height/2);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(viz.width/2, 0); ctx.lineTo(viz.width/2, viz.height);
                            ctx.stroke();

                            // Mark poles
                            fn.poles.forEach(function(p) {
                                var sx = viz.width/2 + p.re * (viz.width/8);
                                var sy = viz.height/2 - p.im * (viz.height/7);
                                ctx.strokeStyle = '#ff4444';
                                ctx.lineWidth = 2;
                                var cr = 8;
                                ctx.beginPath();
                                ctx.moveTo(sx - cr, sy - cr); ctx.lineTo(sx + cr, sy + cr);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sx + cr, sy - cr); ctx.lineTo(sx - cr, sy + cr);
                                ctx.stroke();

                                ctx.fillStyle = '#ffffff';
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(p.label, sx + 12, sy - 4);
                            });

                            // Info box
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(8, viz.height - 60, viz.width - 16, 52);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = ' + fn.name, 16, viz.height - 54);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(fn.info, 16, viz.height - 36);

                            // Update button highlights
                            var btns = btnContainer.querySelectorAll('button');
                            btns.forEach(function(b, i) {
                                b.style.borderColor = (i === funcIdx) ? viz.colors.blue : '#30363d';
                            });
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Residue Theorem
        // ================================================================
        {
            id: 'sec-residue-theorem',
            title: 'The Residue Theorem',
            content: `
<h2>The Residue Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">From Local to Global</div>
    <div class="env-body">
        <p>The Cauchy integral theorem says that contour integrals of analytic functions around closed loops vanish. The Residue Theorem is its generalization: when the contour encloses singularities, the integral does not vanish but equals \\(2\\pi i\\) times the sum of the residues inside. Each singularity makes an independent, additive contribution.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.1 (Residue Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic in a simply connected domain \\(D\\) except at finitely many isolated singularities \\(z_1, z_2, \\ldots, z_n \\in D\\). Let \\(C\\) be a positively oriented simple closed contour in \\(D\\) that encloses all the \\(z_k\\). Then</p>
        \\[
        \\oint_C f(z)\\,dz = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}_{z=z_k} f(z).
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof sketch</div>
    <div class="env-body">
        <p>Deform \\(C\\) into small circles \\(C_k\\) around each \\(z_k\\). By the deformation theorem (Chapter 6), the integral over \\(C\\) equals the sum of integrals over the \\(C_k\\). Each \\(\\oint_{C_k} f(z)\\,dz = 2\\pi i \\operatorname{Res}_{z=z_k} f(z)\\) by the definition of residue.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Computing Residues in Practice</h3>

<p>The definition of residue as a Laurent coefficient is conceptually clean but often impractical. Here are the standard computational shortcuts:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.2 (Residue Formulas)</div>
    <div class="env-body">
        <p><strong>Simple pole:</strong> If \\(f\\) has a simple pole at \\(z_0\\),</p>
        \\[
        \\operatorname{Res}_{z=z_0} f(z) = \\lim_{z \\to z_0} (z - z_0) f(z).
        \\]
        <p><strong>Simple pole of a quotient:</strong> If \\(f(z) = g(z)/h(z)\\) with \\(g(z_0) \\neq 0\\), \\(h(z_0) = 0\\), \\(h'(z_0) \\neq 0\\),</p>
        \\[
        \\operatorname{Res}_{z=z_0} \\frac{g(z)}{h(z)} = \\frac{g(z_0)}{h'(z_0)}.
        \\]
        <p><strong>Pole of order \\(m\\):</strong></p>
        \\[
        \\operatorname{Res}_{z=z_0} f(z) = \\frac{1}{(m-1)!} \\lim_{z \\to z_0} \\frac{d^{m-1}}{dz^{m-1}} \\left[(z-z_0)^m f(z)\\right].
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = \\frac{z}{(z-1)(z+2)^2}\\)</div>
    <div class="env-body">
        <p><strong>At \\(z=1\\):</strong> Simple pole. \\(\\operatorname{Res}_{z=1} = \\frac{1}{(1+2)^2} = \\frac{1}{9}\\).</p>
        <p><strong>At \\(z=-2\\):</strong> Double pole. \\(\\operatorname{Res}_{z=-2} = \\frac{d}{dz}\\left[\\frac{z}{z-1}\\right]_{z=-2} = \\frac{(z-1) - z}{(z-1)^2}\\bigg|_{z=-2} = \\frac{-1}{9}\\).</p>
        <p>Check: the residues sum to zero, consistent with the fact that \\(f(z) \\to 0\\) fast enough at infinity (the integral over a large circle vanishes).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">When Residues Sum to Zero</div>
    <div class="env-body">
        <p>If \\(f(z) = O(1/z^2)\\) as \\(z \\to \\infty\\), the sum of <em>all</em> residues (including at infinity, if any) is zero. This provides a useful check: compute all but one residue, then get the last one for free. In physics, this constraint often encodes a conservation law.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute the residue of \\(f(z) = \\frac{e^z}{z^3}\\) at \\(z = 0\\).',
                    hint: 'This is a pole of order 3. Either use the formula for order-\\(m\\) poles or expand \\(e^z\\) in its Taylor series and identify the \\(z^{-1}\\) coefficient.',
                    solution: 'Expanding \\(e^z = 1 + z + z^2/2 + \\cdots\\), we get \\(e^z/z^3 = z^{-3} + z^{-2} + z^{-1}/2 + \\cdots\\). So \\(\\operatorname{Res}_{z=0} = a_{-1} = 1/2\\).'
                },
                {
                    question: 'Let \\(f(z) = \\frac{\\sin z}{z^2}\\). What is the residue at \\(z = 0\\)? Is this a pole or a removable singularity?',
                    hint: 'Expand \\(\\sin z = z - z^3/6 + \\cdots\\) and divide by \\(z^2\\).',
                    solution: '\\(\\sin z / z^2 = 1/z - z/6 + z^3/120 - \\cdots\\). The coefficient of \\(z^{-1}\\) is \\(a_{-1} = 1\\). This is a simple pole (not removable, because the \\(z^{-1}\\) term is present).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Evaluating Real Integrals
        // ================================================================
        {
            id: 'sec-real-integrals',
            title: 'Evaluating Real Integrals',
            content: `
<h2>Evaluating Real Integrals</h2>

<div class="env-block intuition">
    <div class="env-title">The Contour Integration Strategy</div>
    <div class="env-body">
        <p>The basic strategy is always the same: (1) embed the real integral as part of a contour integral in the complex plane, (2) close the contour so that the extra piece either vanishes or is computable, (3) apply the Residue Theorem. The art lies in choosing the right contour.</p>
    </div>
</div>

<h3>Type I: Rational Functions of \\(\\cos\\theta\\) and \\(\\sin\\theta\\)</h3>

<p>Integrals of the form \\(\\int_0^{2\\pi} R(\\cos\\theta, \\sin\\theta)\\,d\\theta\\) can be converted to contour integrals over the unit circle \\(|z| = 1\\) using</p>
\\[
z = e^{i\\theta}, \\quad \\cos\\theta = \\frac{z + z^{-1}}{2}, \\quad \\sin\\theta = \\frac{z - z^{-1}}{2i}, \\quad d\\theta = \\frac{dz}{iz}.
\\]

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Compute \\(I = \\int_0^{2\\pi} \\frac{d\\theta}{2 + \\cos\\theta}\\).</p>
        <p>Substituting: \\(I = \\oint_{|z|=1} \\frac{1}{2 + (z+z^{-1})/2} \\cdot \\frac{dz}{iz} = \\oint \\frac{2\\,dz}{i(4z + z^2 + 1)} = \\frac{2}{i} \\oint \\frac{dz}{z^2 + 4z + 1}\\).</p>
        <p>The roots are \\(z = -2 \\pm \\sqrt{3}\\). Only \\(z_0 = -2 + \\sqrt{3}\\) lies inside the unit circle. The residue at \\(z_0\\) is \\(1/(2\\sqrt{3})\\), giving \\(I = 2\\pi/\\sqrt{3}\\).</p>
    </div>
</div>

<h3>Type II: Rational Functions on \\((-\\infty, \\infty)\\)</h3>

<p>For \\(\\int_{-\\infty}^{\\infty} \\frac{P(x)}{Q(x)}\\,dx\\) where \\(\\deg Q \\geq \\deg P + 2\\) and \\(Q\\) has no real zeros, close with a large semicircle in the upper half-plane (UHP).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.3 (Semicircular Contour)</div>
    <div class="env-body">
        <p>Let \\(f(x) = P(x)/Q(x)\\) be a rational function with \\(\\deg Q \\geq \\deg P + 2\\) and no real poles. Then</p>
        \\[
        \\int_{-\\infty}^{\\infty} f(x)\\,dx = 2\\pi i \\sum_{\\operatorname{Im} z_k > 0} \\operatorname{Res}_{z=z_k} f(z).
        \\]
        <p>The sum runs over poles in the upper half-plane only.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-semicircular-contour"></div>

<h3>Jordan's Lemma</h3>

<p>For integrals involving oscillating functions like \\(\\int_{-\\infty}^{\\infty} f(x) e^{iax}\\,dx\\) (with \\(a > 0\\)), the semicircular arc vanishes even when \\(f\\) decays only as \\(1/z\\), thanks to the exponential damping of \\(e^{iaz}\\) in the UHP.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.4 (Jordan's Lemma)</div>
    <div class="env-body">
        <p>Let \\(f(z) \\to 0\\) uniformly as \\(|z| \\to \\infty\\) in the upper half-plane, and let \\(a > 0\\). Then for the semicircular arc \\(C_R\\) of radius \\(R\\) in the UHP,</p>
        \\[
        \\lim_{R \\to \\infty} \\int_{C_R} f(z) e^{iaz}\\,dz = 0.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-jordan-lemma"></div>

<div class="env-block example">
    <div class="env-title">Example: The Fourier Transform of a Lorentzian</div>
    <div class="env-body">
        <p>Compute \\(\\int_{-\\infty}^{\\infty} \\frac{e^{i\\omega t}}{\\omega^2 + \\gamma^2}\\,d\\omega\\) for \\(\\gamma > 0\\), \\(t > 0\\).</p>
        <p>Close in the UHP (since \\(t > 0\\), \\(e^{i\\omega t}\\) is damped there). The pole at \\(\\omega = i\\gamma\\) has residue \\(e^{-\\gamma t}/(2i\\gamma)\\). So the integral equals \\(2\\pi i \\cdot e^{-\\gamma t}/(2i\\gamma) = \\pi e^{-\\gamma t}/\\gamma\\).</p>
        <p>This is the Fourier transform of a Lorentzian lineshape, fundamental to spectroscopy and resonance physics.</p>
    </div>
</div>

<h3>Type III: Integrals with Branch Cuts</h3>

<p>Functions like \\(x^{\\alpha}\\) (for non-integer \\(\\alpha\\)) have branch cuts. The <strong>keyhole contour</strong> wraps around the branch cut, and the discontinuity across the cut gives the desired integral.</p>

<div class="env-block example">
    <div class="env-title">Example: \\(\\int_0^{\\infty} \\frac{x^{-1/2}}{1+x}\\,dx\\)</div>
    <div class="env-body">
        <p>Use the keyhole contour around the positive real axis with \\(z^{-1/2}\\) having a branch cut on \\([0, \\infty)\\). Above the cut: \\(z^{-1/2} = x^{-1/2}\\). Below: \\(z^{-1/2} = -x^{-1/2}\\) (the phase picks up \\(e^{-i\\pi}\\)). The contour integral gives \\(2\\int_0^{\\infty} \\frac{x^{-1/2}}{1+x}\\,dx = 2\\pi i \\cdot \\operatorname{Res}_{z=-1} z^{-1/2}/(1+z)\\).</p>
        <p>At \\(z = -1 = e^{i\\pi}\\): \\(z^{-1/2} = e^{-i\\pi/2} = -i\\). So \\(\\operatorname{Res} = -i\\), and \\(I = \\pi i \\cdot (-i) = \\pi\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-semicircular-contour',
                    title: 'Semicircular Contour for Real Integrals',
                    description: 'Watch the semicircular contour close in the upper half-plane. As the radius R grows, the arc contribution vanishes and the real-axis piece becomes the integral we want. Poles in the UHP are highlighted; the residue sum gives the answer.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 280, scale: 40
                        });

                        var R = 2.0;
                        var t = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Radius R', 1, 6, R, 0.5, function(v) {
                            R = v; draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true; R = 1; t = 0;
                            viz.animate(function(ts) {
                                t = ts * 0.001;
                                R = 1 + 5 * Math.min(1, t / 3);
                                draw();
                                if (R >= 6) { viz.stopAnimation(); animating = false; }
                            });
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw the contour: real axis from -R to R, then semicircular arc
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;

                            // Real axis part
                            var sxL = viz.toScreen(-R, 0);
                            var sxR = viz.toScreen(R, 0);
                            ctx.beginPath();
                            ctx.moveTo(sxL[0], sxL[1]);
                            ctx.lineTo(sxR[0], sxR[1]);
                            ctx.stroke();

                            // Arrow on real axis
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            var mid = viz.toScreen(0, 0);
                            ctx.moveTo(mid[0] + 8, mid[1]);
                            ctx.lineTo(mid[0] - 2, mid[1] - 5);
                            ctx.lineTo(mid[0] - 2, mid[1] + 5);
                            ctx.closePath(); ctx.fill();

                            // Semicircular arc in UHP
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var steps = 80;
                            for (var i = 0; i <= steps; i++) {
                                var angle = Math.PI * i / steps;
                                var px = R * Math.cos(angle);
                                var py = R * Math.sin(angle);
                                var s = viz.toScreen(px, py);
                                if (i === 0) ctx.moveTo(s[0], s[1]);
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            // Arrow on arc
                            var aAngle = Math.PI * 0.5;
                            var ax = R * Math.cos(aAngle), ay = R * Math.sin(aAngle);
                            var as = viz.toScreen(ax, ay);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(as[0] - 6, as[1]);
                            ctx.lineTo(as[0] + 2, as[1] - 5);
                            ctx.lineTo(as[0] + 2, as[1] + 5);
                            ctx.closePath(); ctx.fill();

                            // Poles of 1/(z^2+1): z = i (in UHP), z = -i (in LHP)
                            viz.drawPoint(0, 1, viz.colors.red, 'z=i', 6);
                            viz.drawPoint(0, -1, viz.colors.text, 'z=-i', 4);

                            // Label: UHP pole enclosed?
                            var enclosed = R > 1;
                            ctx.fillStyle = enclosed ? viz.colors.green : viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(enclosed ? 'Pole z=i enclosed' : 'Pole z=i not yet enclosed', 10, 20);

                            // Label contour parts
                            viz.screenText('Real axis', viz.width/2, viz.height - 50, viz.colors.blue, 11);
                            viz.screenText('Arc C_R (vanishes as R\u2192\u221E)', viz.width/2, 30, viz.colors.orange, 11);

                            // R value
                            viz.screenText('R = ' + R.toFixed(1), viz.width - 60, viz.height - 20, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-jordan-lemma',
                    title: "Jordan's Lemma: Why the Arc Vanishes",
                    description: 'Jordan\'s lemma shows that e^{iaz} provides exponential damping on the semicircular arc when a > 0 (upper half-plane) or a < 0 (lower half-plane). The animation shows |e^{iaz}| on the arc, which decays rapidly away from the real axis.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 280, scale: 40
                        });

                        var aVal = 2.0;
                        var RVal = 3.0;

                        VizEngine.createSlider(controls, 'a', 0.5, 5, aVal, 0.5, function(v) {
                            aVal = v; draw();
                        });
                        VizEngine.createSlider(controls, 'R', 1, 6, RVal, 0.5, function(v) {
                            RVal = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw semicircular arc colored by |e^{iaz}|
                            var steps = 200;
                            for (var i = 0; i < steps; i++) {
                                var angle1 = Math.PI * i / steps;
                                var angle2 = Math.PI * (i + 1) / steps;
                                var x1 = RVal * Math.cos(angle1), y1 = RVal * Math.sin(angle1);
                                var x2 = RVal * Math.cos(angle2), y2 = RVal * Math.sin(angle2);

                                // |e^{ia(x+iy)}| = e^{-ay}
                                var decay = Math.exp(-aVal * y1);
                                var r = Math.round(255 * decay);
                                var g = Math.round(100 * decay);
                                var b = Math.round(50 * (1 - decay));
                                ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                ctx.lineWidth = 4;

                                var s1 = viz.toScreen(x1, y1);
                                var s2 = viz.toScreen(x2, y2);
                                ctx.beginPath();
                                ctx.moveTo(s1[0], s1[1]);
                                ctx.lineTo(s2[0], s2[1]);
                                ctx.stroke();
                            }

                            // Real axis
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            var sL = viz.toScreen(-RVal, 0), sR = viz.toScreen(RVal, 0);
                            ctx.beginPath();
                            ctx.moveTo(sL[0], sL[1]);
                            ctx.lineTo(sR[0], sR[1]);
                            ctx.stroke();

                            // Colorbar legend
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(viz.width - 140, 10, 130, 70);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('|e^{iaz}| on arc:', viz.width - 132, 28);
                            ctx.fillStyle = 'rgb(255,100,0)';
                            ctx.fillText('\u25A0 near 1 (no decay)', viz.width - 132, 46);
                            ctx.fillStyle = 'rgb(0,0,50)';
                            ctx.fillText('\u25A0 near 0 (damped)', viz.width - 132, 64);

                            // Max damping annotation
                            var topPt = viz.toScreen(0, RVal);
                            var decayTop = Math.exp(-aVal * RVal);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('|e^{iaz}| = e^{-' + aVal.toFixed(1) + '\u00B7' + RVal.toFixed(1) + '} = ' + decayTop.toExponential(1), topPt[0], topPt[1] - 14);

                            viz.screenText("Jordan's Lemma: exponential damping in UHP", viz.width/2, viz.height - 15, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\int_{-\\infty}^{\\infty} \\frac{dx}{(x^2+1)(x^2+4)}\\) using the semicircular contour.',
                    hint: 'The UHP poles are at \\(z = i\\) and \\(z = 2i\\). Use partial fractions or the quotient residue formula at each.',
                    solution: 'Res at \\(z=i\\): \\(\\frac{1}{2i(i^2+4)} = \\frac{1}{2i \\cdot 3} = \\frac{1}{6i}\\). Res at \\(z=2i\\): \\(\\frac{1}{(4i^2+1) \\cdot 4i} = \\frac{1}{-3 \\cdot 4i} = \\frac{-1}{12i}\\). Sum = \\(\\frac{1}{6i} - \\frac{1}{12i} = \\frac{1}{12i}\\). Integral = \\(2\\pi i / (12i) = \\pi/6\\).'
                },
                {
                    question: 'Evaluate \\(\\int_{-\\infty}^{\\infty} \\frac{\\cos x}{x^2 + 1}\\,dx\\).',
                    hint: 'Write \\(\\cos x = \\operatorname{Re}(e^{ix})\\) and apply Jordan\'s lemma with the UHP pole at \\(z = i\\).',
                    solution: '\\(\\int_{-\\infty}^{\\infty} \\frac{e^{ix}}{x^2+1}dx = 2\\pi i \\cdot \\frac{e^{i \\cdot i}}{2i} = 2\\pi i \\cdot \\frac{e^{-1}}{2i} = \\pi/e\\). Taking the real part gives \\(\\pi/e\\).'
                },
                {
                    question: 'Evaluate \\(\\int_0^{\\infty} \\frac{x^{1/3}}{1+x^2}\\,dx\\) using a keyhole contour.',
                    hint: 'Use \\(z^{1/3}\\) with a branch cut on \\([0,\\infty)\\). Below the cut, \\(z^{1/3} \\to z^{1/3} e^{2\\pi i/3}\\). The poles are at \\(z = \\pm i\\).',
                    solution: 'The contour integral gives \\((1 - e^{2\\pi i/3}) I = 2\\pi i [\\text{Res}_{z=i} + \\text{Res}_{z=-i}]\\). Working through: Res at \\(z=i = e^{i\\pi/2}\\) is \\(e^{i\\pi/6}/(2i)\\); Res at \\(z=-i = e^{i3\\pi/2}\\) is \\(e^{i\\pi/2}/(-2i)\\). After algebra, \\(I = \\pi/(2\\cos(\\pi/6)) = \\pi/\\sqrt{3}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Kramers-Kronig Relations
        // ================================================================
        {
            id: 'sec-dispersion',
            title: 'Kramers-Kronig Relations',
            content: `
<h2>Kramers-Kronig Relations</h2>

<div class="env-block intuition">
    <div class="env-title">Causality Forces a Connection</div>
    <div class="env-body">
        <p>When you push a physical system, it responds. <strong>Causality</strong> demands that the response cannot precede the cause: \\(\\chi(t) = 0\\) for \\(t < 0\\). This seemingly obvious physical requirement, when translated to the frequency domain via the Fourier transform, forces a remarkable mathematical constraint: the real and imaginary parts of the response function \\(\\chi(\\omega)\\) are not independent. Each determines the other through an integral relation.</p>
    </div>
</div>

<h3>The Physics Setup</h3>

<p>A linear response function \\(\\chi(t)\\) relates an output \\(y(t)\\) to an input \\(x(t)\\) via convolution:</p>
\\[
y(t) = \\int_{-\\infty}^{\\infty} \\chi(t - t') x(t') \\, dt'.
\\]
<p><strong>Causality</strong> requires \\(\\chi(\\tau) = 0\\) for \\(\\tau < 0\\). In the frequency domain, the susceptibility is</p>
\\[
\\tilde{\\chi}(\\omega) = \\int_0^{\\infty} \\chi(t) e^{i\\omega t} \\, dt.
\\]
<p>Because \\(\\chi(t) = 0\\) for \\(t < 0\\), the lower limit is 0, not \\(-\\infty\\). This makes \\(\\tilde{\\chi}(\\omega)\\) analytic in the <em>upper</em> half-plane (for \\(\\operatorname{Im}\\omega > 0\\), the factor \\(e^{i\\omega t}\\) decays for \\(t > 0\\)).</p>

<h3>Derivation via Contour Integration</h3>

<p>Apply the Cauchy integral formula to \\(\\tilde{\\chi}(\\omega)\\) along the real axis with a large semicircle in the UHP. At a real point \\(\\omega_0\\), deform around the pole with a small semicircle of radius \\(\\epsilon\\):</p>
\\[
\\tilde{\\chi}(\\omega_0) = \\frac{1}{\\pi i} \\mathcal{P} \\int_{-\\infty}^{\\infty} \\frac{\\tilde{\\chi}(\\omega)}{\\omega - \\omega_0} \\, d\\omega,
\\]
<p>where \\(\\mathcal{P}\\) denotes the Cauchy principal value. Separating into real and imaginary parts:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.5 (Kramers-Kronig Relations)</div>
    <div class="env-body">
        <p>If \\(\\tilde{\\chi}(\\omega) = \\chi'(\\omega) + i\\chi''(\\omega)\\) is the frequency-domain response of a causal system, then</p>
        \\[
        \\chi'(\\omega_0) = \\frac{1}{\\pi} \\mathcal{P} \\int_{-\\infty}^{\\infty} \\frac{\\chi''(\\omega)}{\\omega - \\omega_0} \\, d\\omega, \\qquad
        \\chi''(\\omega_0) = -\\frac{1}{\\pi} \\mathcal{P} \\int_{-\\infty}^{\\infty} \\frac{\\chi'(\\omega)}{\\omega - \\omega_0} \\, d\\omega.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-kramers-kronig"></div>

<div class="env-block example">
    <div class="env-title">Example: The Drude Model</div>
    <div class="env-body">
        <p>The Drude model for the dielectric function of a metal gives \\(\\epsilon(\\omega) = 1 - \\omega_p^2/(\\omega^2 + i\\gamma\\omega)\\). The imaginary part (absorption) is a Lorentzian peak centered at \\(\\omega = 0\\). The Kramers-Kronig relations predict the dispersive real part from the absorptive imaginary part, and vice versa. Optical measurements of one determine the other.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Sum Rules</div>
    <div class="env-body">
        <p>Kramers-Kronig relations yield <strong>sum rules</strong> by taking \\(\\omega_0 \\to 0\\) or \\(\\omega_0 \\to \\infty\\). The most famous is the f-sum rule in condensed matter physics: \\(\\int_0^{\\infty} \\omega \\, \\chi''(\\omega) \\, d\\omega = \\pi \\omega_p^2 / 2\\), which constrains the integrated absorption in terms of the plasma frequency. These sum rules are powerful experimental cross-checks.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-kramers-kronig',
                    title: 'Kramers-Kronig: Real and Imaginary Parts Linked by Causality',
                    description: "Adjust the resonance parameters and see how the real and imaginary parts of a causal response function are tied together. Changing one automatically constrains the other through the Kramers-Kronig relations.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 80, originY: 200, scale: 30
                        });

                        var omega0 = 3.0;
                        var gamma = 0.8;

                        VizEngine.createSlider(controls, '\u03C9\u2080 (resonance)', 1, 6, omega0, 0.5, function(v) {
                            omega0 = v; draw();
                        });
                        VizEngine.createSlider(controls, '\u03B3 (damping)', 0.2, 3, gamma, 0.2, function(v) {
                            gamma = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Lorentzian susceptibility: chi(omega) = 1/( omega0^2 - omega^2 - i*gamma*omega )
                            var wMin = 0.1, wMax = 10;
                            var nPts = 400;
                            var realPart = [], imagPart = [];
                            var maxAbs = 0;

                            for (var i = 0; i <= nPts; i++) {
                                var w = wMin + (wMax - wMin) * i / nPts;
                                var dr = omega0 * omega0 - w * w;
                                var di = -gamma * w;
                                var mag2 = dr * dr + di * di;
                                var chiR = dr / mag2;
                                var chiI = -di / mag2;
                                realPart.push({w: w, v: chiR});
                                imagPart.push({w: w, v: chiI});
                                maxAbs = Math.max(maxAbs, Math.abs(chiR), Math.abs(chiI));
                            }

                            // Scaling
                            var plotLeft = 80, plotRight = viz.width - 30;
                            var plotTop = 30, plotBot = viz.height - 40;
                            var plotH = (plotBot - plotTop) / 2;
                            var plotW = plotRight - plotLeft;
                            var yScale = (plotH - 20) / maxAbs;

                            // Draw axes for real part (top half)
                            var yMidTop = plotTop + plotH / 2;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, yMidTop);
                            ctx.lineTo(plotRight, yMidTop);
                            ctx.stroke();

                            // Real part curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var px = plotLeft + (realPart[i].w - wMin) / (wMax - wMin) * plotW;
                                var py = yMidTop - realPart[i].v * yScale;
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw axes for imaginary part (bottom half)
                            var yMidBot = plotTop + plotH + plotH / 2;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, yMidBot);
                            ctx.lineTo(plotRight, yMidBot);
                            ctx.stroke();

                            // Imaginary part curve
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var px = plotLeft + (imagPart[i].w - wMin) / (wMax - wMin) * plotW;
                                var py = yMidBot - imagPart[i].v * yScale;
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText("\u03C7'(\u03C9)  (dispersion)", plotLeft + 5, plotTop + 16);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText("\u03C7''(\u03C9)  (absorption)", plotLeft + 5, plotTop + plotH + 16);

                            // Omega axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var w = 1; w <= 9; w += 2) {
                                var px = plotLeft + (w - wMin) / (wMax - wMin) * plotW;
                                ctx.fillText(w.toString(), px, plotBot + 2);
                            }
                            ctx.fillText('\u03C9', plotRight + 10, plotBot + 2);

                            // Resonance marker
                            var resX = plotLeft + (omega0 - wMin) / (wMax - wMin) * plotW;
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(resX, plotTop);
                            ctx.lineTo(resX, plotBot);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('\u03C9\u2080=' + omega0.toFixed(1), resX, plotBot + 14);

                            // KK arrow
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            var arrX = plotRight - 40;
                            ctx.beginPath();
                            ctx.moveTo(arrX, yMidTop + 20);
                            ctx.lineTo(arrX, yMidBot - 20);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(arrX, yMidBot - 20);
                            ctx.lineTo(arrX - 4, yMidBot - 28);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(arrX, yMidBot - 20);
                            ctx.lineTo(arrX + 4, yMidBot - 28);
                            ctx.stroke();
                            // Up arrow
                            ctx.beginPath();
                            ctx.moveTo(arrX + 12, yMidBot - 20);
                            ctx.lineTo(arrX + 12, yMidTop + 20);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(arrX + 12, yMidTop + 20);
                            ctx.lineTo(arrX + 8, yMidTop + 28);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(arrX + 12, yMidTop + 20);
                            ctx.lineTo(arrX + 16, yMidTop + 28);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('KK', arrX + 6, (yMidTop + yMidBot) / 2 + 4);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A causal response function has imaginary part \\(\\chi\'\'(\\omega) = \\gamma/[(\\omega - \\omega_0)^2 + \\gamma^2]\\) (a Lorentzian). Use the Kramers-Kronig relation to find \\(\\chi\'(\\omega)\\).',
                    hint: 'This is the principal-value integral of a Lorentzian divided by \\((\\omega\' - \\omega)\\). Use partial fractions or recognize it as the real part of \\(1/(\\omega_0 - \\omega - i\\gamma)\\).',
                    solution: 'Direct computation or recognizing that \\(\\chi(\\omega) = 1/(\\omega_0 - \\omega - i\\gamma)\\) gives \\(\\chi\'(\\omega) = (\\omega_0 - \\omega)/[(\\omega - \\omega_0)^2 + \\gamma^2]\\). The dispersive part is an antisymmetric lineshape, while the absorptive part is symmetric.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Green's Functions via Contour Integration
        // ================================================================
        {
            id: 'sec-green',
            title: "Green's Functions via Contour Integration",
            content: `
<h2>Green's Functions via Contour Integration</h2>

<div class="env-block intuition">
    <div class="env-title">The Propagator Problem</div>
    <div class="env-body">
        <p>Given a linear differential operator \\(L\\), the Green's function \\(G(t)\\) satisfies \\(L G(t) = \\delta(t)\\). In the frequency domain, \\(\\tilde{G}(\\omega) = 1/\\tilde{L}(\\omega)\\). To get \\(G(t)\\) back, we compute an inverse Fourier transform, which is a contour integral. The question of <em>which</em> Green's function we get (retarded, advanced, Feynman) reduces to <em>how we close the contour</em>, which is dictated by the physical boundary conditions.</p>
    </div>
</div>

<h3>The Retarded Green's Function</h3>

<p>Consider the damped harmonic oscillator: \\(\\ddot{x} + 2\\gamma \\dot{x} + \\omega_0^2 x = f(t)\\). In Fourier space:</p>
\\[
\\tilde{G}(\\omega) = \\frac{1}{\\omega_0^2 - \\omega^2 - 2i\\gamma\\omega}.
\\]
<p>The poles are at \\(\\omega = -i\\gamma \\pm \\sqrt{\\omega_0^2 - \\gamma^2}\\). For an underdamped oscillator (\\(\\gamma < \\omega_0\\)), both poles lie in the <em>lower</em> half-plane.</p>

<p>The inverse Fourier transform is</p>
\\[
G(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} \\tilde{G}(\\omega) e^{-i\\omega t} \\, d\\omega.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 7.6 (Retarded Green's Function)</div>
    <div class="env-body">
        <p>For the damped oscillator with \\(\\gamma > 0\\) (underdamped: \\(\\gamma < \\omega_0\\)):</p>
        <ul>
            <li><strong>For \\(t > 0\\):</strong> Close in the LHP (where \\(e^{-i\\omega t}\\) decays). The contour encloses both poles. The result is \\(G(t) = \\frac{1}{\\omega_d} e^{-\\gamma t} \\sin(\\omega_d t)\\), where \\(\\omega_d = \\sqrt{\\omega_0^2 - \\gamma^2}\\).</li>
            <li><strong>For \\(t < 0\\):</strong> Close in the UHP (where \\(e^{-i\\omega t}\\) decays). No poles are enclosed. \\(G(t) = 0\\).</li>
        </ul>
        <p>This is the <strong>retarded</strong> (causal) Green's function: the response comes after the impulse.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-retarded-greens"></div>

<h3>Retarded vs. Advanced vs. Feynman</h3>

<p>The choice of Green's function is a choice of pole prescription:</p>
<ul>
    <li><strong>Retarded:</strong> All poles in the LHP (physical dissipation). \\(G_R(t) = 0\\) for \\(t < 0\\).</li>
    <li><strong>Advanced:</strong> All poles in the UHP. \\(G_A(t) = 0\\) for \\(t > 0\\). Useful in time-reversal arguments.</li>
    <li><strong>Feynman:</strong> Positive-frequency poles shifted below the real axis, negative-frequency poles above. This gives the time-ordered propagator of quantum field theory.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">The \\(i\\epsilon\\) Prescription</div>
    <div class="env-body">
        <p>In quantum field theory, the Feynman propagator \\(G_F\\) for a free scalar field is</p>
        \\[
        \\tilde{G}_F(k) = \\frac{1}{k^2 - m^2 + i\\epsilon},
        \\]
        <p>where the \\(i\\epsilon\\) shifts the poles to enforce the Feynman boundary condition. The residue theorem then gives the correct Feynman propagator in position space: positive frequencies propagate forward in time, negative frequencies backward.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-retarded-greens',
                    title: 'Retarded Green\'s Function: Closing the Contour',
                    description: 'The poles of the damped oscillator propagator lie in the lower half-plane. For t > 0, we close the contour below, enclosing the poles and getting a damped oscillation. For t < 0, we close above, enclosing nothing, giving G = 0 (causality).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 180, scale: 50
                        });

                        var gammaVal = 0.3;
                        var omega0 = 2.0;
                        var tSign = 1; // 1 = t>0, -1 = t<0

                        VizEngine.createSlider(controls, '\u03B3 (damping)', 0.1, 1.5, gammaVal, 0.1, function(v) {
                            gammaVal = v; draw();
                        });
                        VizEngine.createSlider(controls, '\u03C9\u2080', 1, 4, omega0, 0.5, function(v) {
                            omega0 = v; draw();
                        });
                        var tBtnContainer = document.createElement('div');
                        tBtnContainer.style.cssText = 'display:flex;gap:6px;';
                        controls.appendChild(tBtnContainer);
                        var btnPos = VizEngine.createButton(tBtnContainer, 't > 0 (close below)', function() {
                            tSign = 1; draw();
                        });
                        var btnNeg = VizEngine.createButton(tBtnContainer, 't < 0 (close above)', function() {
                            tSign = -1; draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var wd = Math.sqrt(Math.max(omega0 * omega0 - gammaVal * gammaVal, 0.01));

                            // Poles at omega = -i*gamma +/- wd
                            var p1x = wd, p1y = -gammaVal;
                            var p2x = -wd, p2y = -gammaVal;

                            viz.drawPoint(p1x, p1y, viz.colors.red, null, 7);
                            viz.drawPoint(p2x, p2y, viz.colors.red, null, 7);
                            viz.drawText('\u03C9\u2081', p1x + 0.2, p1y - 0.3, viz.colors.red, 12);
                            viz.drawText('\u03C9\u2082', p2x - 0.4, p2y - 0.3, viz.colors.red, 12);

                            // Contour: real axis + semicircle
                            var R = 4;
                            // Real axis
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            var sL = viz.toScreen(-R, 0), sR = viz.toScreen(R, 0);
                            ctx.beginPath();
                            ctx.moveTo(sL[0], sL[1]);
                            ctx.lineTo(sR[0], sR[1]);
                            ctx.stroke();

                            // Semicircle
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var steps = 100;
                            for (var i = 0; i <= steps; i++) {
                                var angle;
                                if (tSign > 0) {
                                    // Close below: angle from 0 to -pi
                                    angle = -Math.PI * i / steps;
                                } else {
                                    // Close above: angle from 0 to pi
                                    angle = Math.PI * i / steps;
                                }
                                var px = R * Math.cos(angle);
                                var py = R * Math.sin(angle);
                                var s = viz.toScreen(px, py);
                                if (i === 0) ctx.moveTo(s[0], s[1]);
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            // Arrow on the arc
                            var arrowAngle = tSign > 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
                            var ax = R * Math.cos(arrowAngle), ay = R * Math.sin(arrowAngle);
                            var as = viz.toScreen(ax, ay);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            if (tSign > 0) {
                                ctx.moveTo(as[0] + 6, as[1]);
                                ctx.lineTo(as[0] - 2, as[1] - 5);
                                ctx.lineTo(as[0] - 2, as[1] + 5);
                            } else {
                                ctx.moveTo(as[0] - 6, as[1]);
                                ctx.lineTo(as[0] + 2, as[1] - 5);
                                ctx.lineTo(as[0] + 2, as[1] + 5);
                            }
                            ctx.closePath(); ctx.fill();

                            // Highlight which half plane
                            if (tSign > 0) {
                                ctx.fillStyle = 'rgba(88,166,255,0.06)';
                                ctx.fillRect(0, viz.originY, viz.width, viz.height - viz.originY);
                                viz.screenText('Close in LHP: encloses poles \u2192 G(t) = damped oscillation', viz.width/2, viz.height - 50, viz.colors.green, 11);
                            } else {
                                ctx.fillStyle = 'rgba(88,166,255,0.06)';
                                ctx.fillRect(0, 0, viz.width, viz.originY);
                                viz.screenText('Close in UHP: no poles enclosed \u2192 G(t) = 0 (causality!)', viz.width/2, viz.height - 50, viz.colors.red, 11);
                            }

                            // Labels
                            viz.screenText('Re \u03C9', viz.width - 30, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('Im \u03C9', viz.originX + 20, 12, viz.colors.text, 11);

                            // Info
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(8, viz.height - 35, viz.width - 16, 28);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u03C9_d = ' + wd.toFixed(2) + '   poles at \u03C9 = ' + wd.toFixed(2) + ' - ' + gammaVal.toFixed(2) + 'i  and  \u03C9 = -' + wd.toFixed(2) + ' - ' + gammaVal.toFixed(2) + 'i', 16, viz.height - 18);

                            // Button highlight
                            btnPos.style.borderColor = (tSign > 0) ? viz.colors.green : '#30363d';
                            btnNeg.style.borderColor = (tSign < 0) ? viz.colors.red : '#30363d';
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Compute the retarded Green's function for the undamped oscillator \\(\\ddot{x} + \\omega_0^2 x = \\delta(t)\\) using contour integration. (Hint: add an infinitesimal damping \\(i\\epsilon\\) and take \\(\\epsilon \\to 0\\).)",
                    hint: 'The poles of \\(1/(\\omega_0^2 - \\omega^2 - i\\epsilon)\\) are at \\(\\omega \\approx \\pm \\omega_0 - i\\epsilon/(2\\omega_0)\\), both in the LHP.',
                    solution: 'With \\(i\\epsilon\\) prescription, poles at \\(\\omega = \\pm\\omega_0 - i\\epsilon\'\\). For \\(t > 0\\), close below, pick up both residues: \\(G_R(t) = \\sin(\\omega_0 t)/\\omega_0\\). For \\(t < 0\\), close above, no poles: \\(G_R(t) = 0\\). So \\(G_R(t) = \\theta(t) \\sin(\\omega_0 t)/\\omega_0\\).'
                },
                {
                    question: 'Show that the Feynman propagator \\(G_F(t) = -\\frac{i}{2\\omega_0} e^{-i\\omega_0|t|}\\) for a free scalar field follows from placing the positive-frequency pole below the real axis and the negative-frequency pole above.',
                    hint: 'For \\(t > 0\\), close in the LHP (catches the positive-frequency pole). For \\(t < 0\\), close in the UHP (catches the negative-frequency pole).',
                    solution: 'For \\(t>0\\): close below, residue at \\(\\omega = \\omega_0 - i\\epsilon\\) gives \\(-i e^{-i\\omega_0 t}/(2\\omega_0)\\). For \\(t<0\\): close above, residue at \\(\\omega = -\\omega_0 + i\\epsilon\\) gives \\(-i e^{i\\omega_0 t}/(2\\omega_0)\\). Combining: \\(G_F(t) = -i e^{-i\\omega_0|t|}/(2\\omega_0)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Scattering Amplitudes
        // ================================================================
        {
            id: 'sec-scattering',
            title: 'Scattering Amplitudes',
            content: `
<h2>Scattering Amplitudes</h2>

<div class="env-block intuition">
    <div class="env-title">Reading Physics from Singularities</div>
    <div class="env-body">
        <p>The scattering matrix \\(S(E)\\), viewed as a function of complex energy \\(E\\), has a singularity structure that encodes the complete physics of the problem. <strong>Poles on the negative real axis</strong> correspond to bound states. <strong>Branch cuts along the positive real axis</strong> correspond to the continuum of scattering states. The residue at each pole gives the coupling strength. This is one of the deepest connections between complex analysis and physics.</p>
    </div>
</div>

<h3>The S-Matrix in the Complex Energy Plane</h3>

<p>For a one-dimensional scattering problem with a potential \\(V(x)\\), the S-matrix element \\(S(k)\\) (where \\(E = \\hbar^2 k^2 / 2m\\)) is a meromorphic function of the complex momentum \\(k\\). Its analytic structure:</p>

<ul>
    <li><strong>Bound states:</strong> Poles at \\(k = i\\kappa_n\\) (purely imaginary, positive imaginary part), corresponding to \\(E_n = -\\hbar^2 \\kappa_n^2 / 2m < 0\\). The wavefunction decays as \\(e^{-\\kappa_n |x|}\\).</li>
    <li><strong>Resonances:</strong> Poles at \\(k = k_r - i\\Gamma/2\\) in the lower half-plane. These are quasi-bound states with energy \\(E_r\\) and width \\(\\Gamma\\) (inverse lifetime). They appear as Breit-Wigner peaks in the cross section.</li>
    <li><strong>Branch cut:</strong> The square root \\(k = \\sqrt{2mE}/\\hbar\\) introduces a branch cut, typically along the positive real energy axis (the scattering continuum).</li>
</ul>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.7 (Breit-Wigner Resonance)</div>
    <div class="env-body">
        <p>Near a resonance at energy \\(E_r\\) with width \\(\\Gamma\\), the scattering cross section has the form</p>
        \\[
        \\sigma(E) \\propto \\frac{\\Gamma^2/4}{(E - E_r)^2 + \\Gamma^2/4}.
        \\]
        <p>This Lorentzian profile arises from the pole of \\(S(E)\\) at \\(E = E_r - i\\Gamma/2\\). The residue at the pole determines the peak height and the coupling to the scattering channels.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-scattering-poles"></div>

<div class="env-block example">
    <div class="env-title">Example: Square Well S-Matrix</div>
    <div class="env-body">
        <p>For a one-dimensional square well of depth \\(V_0\\) and width \\(a\\), the S-matrix poles in the complex \\(k\\)-plane are determined by the transcendental equation \\(\\kappa \\cot(\\kappa a/2) = -ik\\) (even parity) or \\(\\kappa \\tan(\\kappa a/2) = ik\\) (odd parity), where \\(\\kappa^2 = k^2 + 2mV_0/\\hbar^2\\).</p>
        <p>The bound-state poles (\\(k = i\\kappa_n\\)) are on the positive imaginary axis. As \\(V_0\\) increases, new poles climb up the imaginary axis: each new bound state "emerges" from the origin.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Dispersion Relations for Scattering Amplitudes</div>
    <div class="env-body">
        <p>The analyticity of \\(S(E)\\) in the complex energy plane (a consequence of causality) allows us to write dispersion relations analogous to Kramers-Kronig. These relate the real part of the forward scattering amplitude to an integral over the total cross section (via the optical theorem). In particle physics, these are the <strong>Mandelstam dispersion relations</strong>, which were foundational to the S-matrix bootstrap program of the 1960s.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-scattering-poles',
                    title: 'S-Matrix Poles in the Complex Energy Plane',
                    description: 'Bound states appear as poles on the negative real axis. Resonances are poles in the lower half-plane. Drag the resonance pole to see how the Breit-Wigner cross section changes shape: narrower poles give sharper resonances.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 200, originY: 210, scale: 30
                        });

                        // Draggable resonance pole
                        var resE = 3.0, resGamma = 1.0;
                        var draggable = viz.addDraggable('res-pole', resE, -resGamma / 2, viz.colors.orange, 8, function(x, y) {
                            resE = Math.max(0.5, x);
                            resGamma = Math.max(0.2, -2 * y);
                            draggable.x = resE;
                            draggable.y = -resGamma / 2;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Branch cut along positive real axis
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 4;
                            var s0 = viz.toScreen(0, 0), sR = viz.toScreen(10, 0);
                            ctx.beginPath();
                            ctx.moveTo(s0[0], s0[1]);
                            ctx.lineTo(sR[0], sR[1]);
                            ctx.stroke();
                            // Zigzag for branch cut
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            var zigH = 4;
                            for (var i = 0; i < 30; i++) {
                                var xp = 0.3 + i * 0.3;
                                if (xp > 9) break;
                                var sp = viz.toScreen(xp, 0);
                                ctx.beginPath();
                                ctx.moveTo(sp[0], sp[1] - zigH);
                                ctx.lineTo(sp[0] + 4, sp[1] + zigH);
                                ctx.stroke();
                            }

                            // Bound states: fixed poles on negative real axis
                            var boundStates = [-1.5, -4.0];
                            boundStates.forEach(function(e, idx) {
                                viz.drawPoint(e, 0, viz.colors.blue, 'E_' + (idx + 1), 7);
                            });

                            // Resonance pole (draggable)
                            viz.drawPoint(resE, -resGamma / 2, viz.colors.orange, null, 8);
                            viz.drawText('E_r - i\u0393/2', resE + 0.3, -resGamma / 2 - 0.5, viz.colors.orange, 11);
                            // Mirror pole
                            viz.drawPoint(resE, resGamma / 2, viz.colors.orange + '66', null, 5);

                            viz.drawDraggables();

                            // Labels
                            viz.screenText('Re E', viz.width - 30, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('Im E', viz.originX + 20, 12, viz.colors.text, 11);
                            viz.screenText('Branch cut (continuum)', viz.width - 100, viz.originY + 20, viz.colors.red, 10);
                            viz.screenText('Bound states', 30, viz.originY - 10, viz.colors.blue, 10);

                            // Breit-Wigner cross section in inset
                            var insetL = 320, insetT = 10, insetW = 220, insetH = 120;
                            ctx.fillStyle = 'rgba(12,12,32,0.9)';
                            ctx.fillRect(insetL, insetT, insetW, insetH);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(insetL, insetT, insetW, insetH);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03C3(E) Breit-Wigner', insetL + insetW / 2, insetT + 14);

                            // Plot BW
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var eMin = Math.max(0.1, resE - 4), eMax = resE + 4;
                            var maxSigma = 4 / (resGamma * resGamma);
                            for (var i = 0; i <= 200; i++) {
                                var e = eMin + (eMax - eMin) * i / 200;
                                var sigma = (resGamma * resGamma / 4) / ((e - resE) * (e - resE) + resGamma * resGamma / 4);
                                var px = insetL + 10 + (i / 200) * (insetW - 20);
                                var py = insetT + insetH - 10 - sigma / maxSigma * (insetH - 30);
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Label resonance energy
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var resXpx = insetL + 10 + ((resE - eMin) / (eMax - eMin)) * (insetW - 20);
                            ctx.fillText('E_r=' + resE.toFixed(1), resXpx, insetT + insetH - 1);
                            ctx.fillText('\u0393=' + resGamma.toFixed(1), insetL + insetW - 30, insetT + 30);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A scattering amplitude has a pole at \\(E = E_0 - i\\Gamma/2\\). Write the cross section near this energy and show it has a maximum at \\(E = E_0\\) with full width at half maximum equal to \\(\\Gamma\\).',
                    hint: 'Write \\(|S(E)|^2\\) with \\(S(E) \\propto 1/(E - E_0 + i\\Gamma/2)\\), then find where \\(|S|^2\\) drops to half its peak value.',
                    solution: '\\(|S|^2 \\propto 1/[(E-E_0)^2 + \\Gamma^2/4]\\). Maximum at \\(E=E_0\\) with value \\(4/\\Gamma^2\\). Half-max when \\((E-E_0)^2 = \\Gamma^2/4\\), i.e., \\(E = E_0 \\pm \\Gamma/2\\). FWHM = \\(\\Gamma\\).'
                },
                {
                    question: 'Why must bound-state poles of the S-matrix lie on the positive imaginary \\(k\\)-axis (not the negative imaginary axis)?',
                    hint: 'Consider the asymptotic form of the wavefunction \\(\\psi(x) \\sim e^{ikx}\\) for large \\(x\\), and require normalizability.',
                    solution: 'For \\(k = i\\kappa\\) with \\(\\kappa > 0\\): \\(\\psi \\sim e^{ikx} = e^{-\\kappa x}\\), which decays for \\(x \\to +\\infty\\) (normalizable). For \\(k = -i\\kappa\\): \\(\\psi \\sim e^{\\kappa x}\\), which blows up (non-normalizable). So physical bound states require \\(\\operatorname{Im} k > 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What Comes Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Integral Gallery & Looking Ahead',
            content: `
<h2>Gallery of Physics Integrals Solved by Residues</h2>

<p>We close this chapter with a gallery of important integrals from physics, each solved by a contour method. These recur throughout mathematical physics; mastering them builds fluency with the residue toolkit.</p>

<div class="viz-placeholder" data-viz="viz-integral-gallery"></div>

<h3>Summary of Contour Methods</h3>

<table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:0.90em;">
    <tr style="border-bottom:2px solid var(--border-default);">
        <th style="padding:8px; text-align:left;">Integral Type</th>
        <th style="padding:8px; text-align:left;">Contour</th>
        <th style="padding:8px; text-align:left;">Key Idea</th>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">\\(\\int_0^{2\\pi} R(\\cos\\theta, \\sin\\theta)\\,d\\theta\\)</td>
        <td style="padding:8px;">Unit circle \\(|z|=1\\)</td>
        <td style="padding:8px;">Substitute \\(z=e^{i\\theta}\\)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">\\(\\int_{-\\infty}^{\\infty} P(x)/Q(x)\\,dx\\)</td>
        <td style="padding:8px;">Semicircle (UHP or LHP)</td>
        <td style="padding:8px;">\\(\\deg Q \\geq \\deg P + 2\\)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">\\(\\int_{-\\infty}^{\\infty} f(x)e^{iax}\\,dx\\)</td>
        <td style="padding:8px;">Semicircle + Jordan's lemma</td>
        <td style="padding:8px;">\\(a>0\\): close in UHP</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">\\(\\int_0^{\\infty} x^{\\alpha-1} R(x)\\,dx\\)</td>
        <td style="padding:8px;">Keyhole (branch cut on \\([0,\\infty)\\))</td>
        <td style="padding:8px;">Phase discontinuity across cut</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">\\(\\sum_{n=-\\infty}^{\\infty} f(n)\\)</td>
        <td style="padding:8px;">Rectangular or large circle</td>
        <td style="padding:8px;">Use \\(\\pi \\cot(\\pi z)\\) which has residue 1 at each integer</td>
    </tr>
    <tr>
        <td style="padding:8px;">Green's functions / propagators</td>
        <td style="padding:8px;">Real axis + semicircle</td>
        <td style="padding:8px;">Pole prescription encodes boundary conditions</td>
    </tr>
</table>

<div class="env-block remark">
    <div class="env-title">What Comes Next</div>
    <div class="env-body">
        <p>In <strong>Chapter 8</strong>, we turn to ordinary differential equations in physics. Many of the techniques we have developed here, especially the use of Green's functions and the Fourier transform, will reappear in the context of solving ODEs with boundary conditions. The interplay between complex analysis and differential equations is one of the central themes of mathematical physics: the singularity structure of solutions in the complex plane determines the qualitative behavior of physical systems.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-integral-gallery',
                    title: 'Gallery: Physics Integrals Solved by Residues',
                    description: 'Browse through important physics integrals and their contour solutions. Each entry shows the integral, the contour used, the residues, and the final answer.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var integrals = [
                            {
                                name: 'Gaussian Fourier transform',
                                integral: '\u222B e^{-x\u00B2} cos(2bx) dx = \u221A\u03C0 e^{-b\u00B2}',
                                contour: 'Shift contour: z = x + ib',
                                answer: '\u221A\u03C0 e^{-b\u00B2}',
                                color: '#58a6ff'
                            },
                            {
                                name: 'Fresnel integral',
                                integral: '\u222B\u2080^\u221E cos(x\u00B2) dx = \u221A(\u03C0/2) / 2',
                                contour: 'Pie-slice contour, angle \u03C0/4',
                                answer: '\u221A(2\u03C0) / 4',
                                color: '#3fb9a0'
                            },
                            {
                                name: 'Dirichlet integral',
                                integral: '\u222B\u2080^\u221E sin(x)/x dx = \u03C0/2',
                                contour: 'Indent around x=0 + semicircle',
                                answer: '\u03C0/2',
                                color: '#f0883e'
                            },
                            {
                                name: 'Planck integral',
                                integral: '\u222B\u2080^\u221E x\u00B3/(e^x-1) dx = \u03C0\u2074/15',
                                contour: 'Rectangular contour, height 2\u03C0i',
                                answer: '\u03C0\u2074/15',
                                color: '#bc8cff'
                            },
                            {
                                name: 'Coulomb integral',
                                integral: '\u222B\u2080^\u221E sin(x)/(x(x\u00B2+1)) dx = \u03C0(1-e^{-1})/2',
                                contour: 'Indent at 0 + UHP semicircle + Jordan',
                                answer: '\u03C0(1-1/e)/2',
                                color: '#3fb950'
                            },
                            {
                                name: 'Basel sum via residues',
                                integral: '\u03A3 1/n\u00B2 = \u03C0\u00B2/6',
                                contour: '\u03C0 cot(\u03C0z)/z\u00B2 around large square',
                                answer: '\u03C0\u00B2/6',
                                color: '#f85149'
                            }
                        ];

                        var currentIdx = 0;

                        var prevBtn = VizEngine.createButton(controls, '\u25C0 Prev', function() {
                            currentIdx = (currentIdx - 1 + integrals.length) % integrals.length;
                            draw();
                        });
                        var nextBtn = VizEngine.createButton(controls, 'Next \u25B6', function() {
                            currentIdx = (currentIdx + 1) % integrals.length;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var item = integrals[currentIdx];

                            // Title
                            ctx.fillStyle = item.color;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(item.name, viz.width / 2, 40);

                            // Counter
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText((currentIdx + 1) + ' / ' + integrals.length, viz.width / 2, 60);

                            // Integral
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.fillText(item.integral, viz.width / 2, 120);

                            // Contour method
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Contour: ' + item.contour, viz.width / 2, 170);

                            // Draw a schematic contour based on type
                            var cx = viz.width / 2, cy = 280;
                            var R = 80;

                            ctx.strokeStyle = item.color;
                            ctx.lineWidth = 2.5;

                            if (currentIdx === 0) {
                                // Shifted contour: horizontal line
                                ctx.beginPath();
                                ctx.moveTo(cx - R, cy);
                                ctx.lineTo(cx + R, cy);
                                ctx.stroke();
                                ctx.setLineDash([4,3]);
                                ctx.beginPath();
                                ctx.moveTo(cx - R, cy - 40);
                                ctx.lineTo(cx + R, cy - 40);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('z = x', cx + R + 10, cy);
                                ctx.fillText('z = x + ib', cx + R + 10, cy - 40);
                            } else if (currentIdx === 1) {
                                // Pie slice
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.lineTo(cx + R, cy);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(cx, cy, R, 0, -Math.PI/4, true);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                var ax = cx + R * Math.cos(Math.PI/4);
                                var ay = cy - R * Math.sin(Math.PI/4);
                                ctx.lineTo(ax, ay);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('\u03C0/4', cx + 30, cy - 20);
                            } else if (currentIdx === 2) {
                                // Indented semicircle
                                ctx.beginPath();
                                ctx.moveTo(cx - R, cy);
                                ctx.lineTo(cx - 12, cy);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(cx, cy, 12, Math.PI, 0, true);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(cx + 12, cy);
                                ctx.lineTo(cx + R, cy);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(cx, cy, R, 0, Math.PI);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 3, 0, Math.PI*2);
                                ctx.fill();
                            } else if (currentIdx === 3) {
                                // Rectangle
                                ctx.beginPath();
                                ctx.moveTo(cx - R, cy);
                                ctx.lineTo(cx + R, cy);
                                ctx.lineTo(cx + R, cy - 60);
                                ctx.lineTo(cx - R, cy - 60);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('height = 2\u03C0i', cx + R + 10, cy - 30);
                                // Poles at 2pi*i*n
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(cx, cy - 60, 4, 0, Math.PI*2);
                                ctx.fill();
                            } else if (currentIdx === 4) {
                                // Indent + semicircle + Jordan
                                ctx.beginPath();
                                ctx.moveTo(cx - R, cy);
                                ctx.lineTo(cx - 8, cy);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(cx, cy, 8, Math.PI, 0, true);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(cx + 8, cy);
                                ctx.lineTo(cx + R, cy);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(cx, cy, R, 0, Math.PI);
                                ctx.stroke();
                                // Pole at z=i
                                viz.screenText('\u00D7 z=i', cx + 5, cy - 45, viz.colors.red, 11, 'left');
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(cx, cy - 40, 4, 0, Math.PI * 2);
                                ctx.fill();
                            } else {
                                // Large square for sum
                                var s = 70;
                                ctx.beginPath();
                                ctx.moveTo(cx - s, cy - s);
                                ctx.lineTo(cx + s, cy - s);
                                ctx.lineTo(cx + s, cy + s);
                                ctx.lineTo(cx - s, cy + s);
                                ctx.closePath();
                                ctx.stroke();
                                // Integer poles
                                for (var n = -2; n <= 2; n++) {
                                    ctx.fillStyle = (n === 0) ? viz.colors.red : viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(cx + n * 25, cy, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('integer poles of \u03C0cot(\u03C0z)', cx, cy + s + 14);
                            }

                            // Result box
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(20, viz.height - 45, viz.width - 40, 35);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Result: ' + item.answer, viz.width / 2, viz.height - 22);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\int_0^{\\infty} \\frac{\\sin x}{x}\\,dx\\) using contour integration.',
                    hint: 'Consider \\(\\oint (e^{iz}/z)\\,dz\\) around the indented semicircle (indent at \\(z=0\\) from below, large arc in UHP). The function \\(e^{iz}/z\\) has no poles inside the contour.',
                    solution: 'The large semicircle gives 0 by Jordan\'s lemma. The indent gives \\(-\\pi i \\cdot \\operatorname{Res}_{z=0} (e^{iz}/z) = -\\pi i\\). The real axis integral is \\(\\int_{-\\infty}^{\\infty} e^{ix}/x \\, dx\\) (principal value). Since the total contour integral is 0: \\(\\mathrm{PV}\\int e^{ix}/x \\, dx = \\pi i\\). Taking imaginary parts: \\(\\int_{-\\infty}^{\\infty} \\sin x / x \\, dx = \\pi\\), so \\(\\int_0^{\\infty} \\sin x / x \\, dx = \\pi/2\\).'
                },
                {
                    question: 'Use the residue method with \\(\\pi \\cot(\\pi z)\\) to evaluate \\(\\sum_{n=1}^{\\infty} \\frac{1}{n^2}\\).',
                    hint: 'Consider \\(\\oint \\pi \\cot(\\pi z) / z^2 \\, dz\\) around a large square contour. The function \\(\\pi \\cot(\\pi z)\\) has residue 1 at each integer.',
                    solution: 'Residues at \\(z = n \\neq 0\\): \\(1/n^2\\). Residue at \\(z = 0\\): expand \\(\\pi \\cot(\\pi z)/z^2 = 1/z^3 \\cdot (1/\\pi z)(\\pi z \\cot(\\pi z))\\). Using \\(\\pi z \\cot(\\pi z) = 1 - \\pi^2 z^2/3 + \\cdots\\), the residue at 0 is \\(-\\pi^2/3\\). The contour integral vanishes for large squares, giving \\(0 = -\\pi^2/3 + 2\\sum_{n=1}^\\infty 1/n^2\\). Hence \\(\\sum 1/n^2 = \\pi^2/6\\).'
                },
                {
                    question: 'The Planck distribution gives the energy density of blackbody radiation proportional to \\(\\int_0^{\\infty} \\frac{x^3}{e^x - 1}\\,dx\\). Evaluate this integral.',
                    hint: 'Expand \\(1/(e^x-1) = \\sum_{k=1}^\\infty e^{-kx}\\), exchange sum and integral, then use \\(\\int_0^\\infty x^3 e^{-kx}\\,dx = 6/k^4\\).',
                    solution: '\\(\\int_0^\\infty \\frac{x^3}{e^x-1}dx = \\sum_{k=1}^\\infty \\int_0^\\infty x^3 e^{-kx} dx = \\sum_{k=1}^\\infty \\frac{6}{k^4} = 6 \\zeta(4) = 6 \\cdot \\frac{\\pi^4}{90} = \\frac{\\pi^4}{15}\\). (The value \\(\\zeta(4) = \\pi^4/90\\) can itself be proved by the cotangent residue method.)'
                }
            ]
        }
    ]
});
