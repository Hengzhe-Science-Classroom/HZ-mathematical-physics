window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Fourier Analysis',
    subtitle: "From Fourier series to Fourier transform: the physicist's perspective",
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Fourier?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Fourier?',
            content: `
<h2>Why Fourier?</h2>

<div class="env-block intuition">
    <div class="env-title">A Physical Starting Point</div>
    <div class="env-body">
        <p>Strike a guitar string. The sound you hear is not a single pure tone but a superposition of many harmonics: the fundamental frequency, twice that frequency, three times, and so on. Fourier analysis is the mathematical framework that decomposes arbitrary signals into these pure sinusoidal components. It is, arguably, the single most useful tool in all of mathematical physics.</p>
    </div>
</div>

<p>Joseph Fourier's bold claim in 1807 was that <em>any</em> periodic function can be represented as a sum of sines and cosines. The mathematical establishment (Lagrange, Laplace, Legendre) was skeptical, and for good reason: making this precise required over a century of work and gave birth to much of modern analysis. But Fourier's physical intuition was right, and the machinery he introduced now permeates every branch of physics.</p>

<h3>Where Fourier Appears in Physics</h3>

<p>The ubiquity of Fourier methods stems from a simple fact: <strong>linear operators with constant coefficients are diagonal in the Fourier basis</strong>. If you have a linear PDE with constant coefficients, a Fourier transform converts differentiation into multiplication, turning a PDE into an algebraic equation.</p>

<ul>
    <li><strong>Heat equation:</strong> \\(\\partial_t u = \\kappa \\nabla^2 u\\). Fourier showed that each mode \\(e^{ikx}\\) decays independently: \\(\\hat{u}(k,t) = \\hat{u}(k,0)\\, e^{-\\kappa k^2 t}\\).</li>
    <li><strong>Wave equation:</strong> \\(\\partial_t^2 u = c^2 \\nabla^2 u\\). Each Fourier mode propagates as a traveling wave with dispersion relation \\(\\omega = c|k|\\).</li>
    <li><strong>Quantum mechanics:</strong> The momentum representation is the Fourier transform of the position representation. The uncertainty principle is a direct consequence of Fourier duality.</li>
    <li><strong>Electrodynamics:</strong> Plane waves \\(e^{i(\\mathbf{k}\\cdot\\mathbf{r} - \\omega t)}\\) form a complete basis for solutions of Maxwell's equations in free space.</li>
    <li><strong>Signal processing:</strong> Spectral analysis, filtering, and sampling theory are all Fourier-based.</li>
</ul>

<h3>The Central Theme</h3>

<p>Throughout this chapter, we develop two related but distinct tools:</p>

<ol>
    <li><strong>Fourier series</strong> (Chapter sections 2-3): for <em>periodic</em> functions on a finite interval. The expansion is a discrete sum over integer-labeled harmonics.</li>
    <li><strong>Fourier transform</strong> (Chapter sections 4-5): for <em>non-periodic</em> functions on the entire real line. The sum becomes an integral over a continuous spectrum.</li>
</ol>

<p>The passage from series to transform is the limit where the period \\(L \\to \\infty\\), and the discrete frequencies \\(k_n = 2\\pi n/L\\) merge into a continuum. We then develop the key results: the convolution theorem, the representation of the Dirac delta function, Parseval's theorem, and physical applications ranging from diffraction to quantum mechanics.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Fourier submitted his <em>Theorie analytique de la chaleur</em> to the Institut de France in 1807. The committee (Lagrange, Laplace, Monge, Lacroix) refused to publish it, partly because Fourier did not rigorously prove convergence. The full treatise appeared only in 1822. The convergence question launched Dirichlet's 1829 work, Riemann's theory of integration, and eventually Lebesgue's measure theory. Carleson's 1966 proof that the Fourier series of any \\(L^2\\) function converges almost everywhere earned him the Abel Prize in 2006.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Fourier Series
        // ================================================================
        {
            id: 'sec-series',
            title: 'Fourier Series',
            content: `
<h2>Fourier Series</h2>

<div class="env-block intuition">
    <div class="env-title">Building Blocks</div>
    <div class="env-body">
        <p>Think of Fourier series like building with LEGO: your building blocks are the functions \\(\\{1, \\cos(\\pi nx/L), \\sin(\\pi nx/L)\\}_{n=1}^{\\infty}\\). Any (reasonable) periodic function can be assembled from these pieces. The Fourier coefficients tell you how many of each piece to use.</p>
    </div>
</div>

<h3>Setup and Definitions</h3>

<p>Let \\(f(x)\\) be a periodic function with period \\(2L\\), so \\(f(x + 2L) = f(x)\\) for all \\(x\\). The <strong>Fourier series</strong> of \\(f\\) is</p>

\\[
f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left[ a_n \\cos\\!\\left(\\frac{n\\pi x}{L}\\right) + b_n \\sin\\!\\left(\\frac{n\\pi x}{L}\\right) \\right],
\\]

<p>where the Fourier coefficients are</p>

\\[
a_n = \\frac{1}{L} \\int_{-L}^{L} f(x)\\cos\\!\\left(\\frac{n\\pi x}{L}\\right) dx, \\qquad b_n = \\frac{1}{L} \\int_{-L}^{L} f(x)\\sin\\!\\left(\\frac{n\\pi x}{L}\\right) dx.
\\]

<div class="env-block definition">
    <div class="env-title">Definition (Orthogonality of Sines and Cosines)</div>
    <div class="env-body">
        <p>On the interval \\([-L, L]\\), the trigonometric functions satisfy the orthogonality relations:</p>
        \\[
        \\int_{-L}^{L} \\cos\\!\\left(\\frac{m\\pi x}{L}\\right)\\cos\\!\\left(\\frac{n\\pi x}{L}\\right)dx = L\\,\\delta_{mn}, \\quad
        \\int_{-L}^{L} \\sin\\!\\left(\\frac{m\\pi x}{L}\\right)\\sin\\!\\left(\\frac{n\\pi x}{L}\\right)dx = L\\,\\delta_{mn},
        \\]
        \\[
        \\int_{-L}^{L} \\cos\\!\\left(\\frac{m\\pi x}{L}\\right)\\sin\\!\\left(\\frac{n\\pi x}{L}\\right)dx = 0 \\quad \\text{for all } m, n.
        \\]
        <p>This is why the coefficient formulas work: multiply both sides of the Fourier expansion by \\(\\cos(m\\pi x/L)\\) and integrate; orthogonality kills every term except \\(a_m\\).</p>
    </div>
</div>

<h3>Complex Exponential Form</h3>

<p>Using Euler's formula \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\), we can write the Fourier series more compactly:</p>

\\[
f(x) = \\sum_{n=-\\infty}^{\\infty} c_n \\, e^{in\\pi x/L}, \\qquad c_n = \\frac{1}{2L}\\int_{-L}^{L} f(x)\\,e^{-in\\pi x/L}\\,dx.
\\]

<p>The real and complex forms are related by \\(c_0 = a_0/2\\), \\(c_n = (a_n - ib_n)/2\\), \\(c_{-n} = (a_n + ib_n)/2\\) for \\(n > 0\\). Physicists almost always prefer the exponential form because it treats positive and negative frequencies symmetrically and because \\(e^{ikx}\\) is an eigenfunction of \\(d/dx\\).</p>

<h3>Convergence</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.1 (Dirichlet Conditions)</div>
    <div class="env-body">
        <p>If \\(f(x)\\) is periodic with period \\(2L\\) and on \\([-L, L]\\) it is piecewise smooth (finitely many jump discontinuities, and \\(f'\\) exists and is piecewise continuous), then the Fourier series converges to</p>
        <ul>
            <li>\\(f(x)\\) at every point where \\(f\\) is continuous,</li>
            <li>\\(\\frac{1}{2}[f(x^+) + f(x^-)]\\) at every jump discontinuity.</li>
        </ul>
    </div>
</div>

<h3>The Gibbs Phenomenon</h3>

<p>At a jump discontinuity of height \\(h\\), the partial sums of the Fourier series overshoot by approximately \\(9\\%\\) on each side. More precisely, the maximum overshoot approaches</p>

\\[
\\frac{h}{\\pi}\\int_0^{\\pi} \\frac{\\sin t}{t}\\,dt - \\frac{h}{2} \\approx 0.0895\\,h
\\]

<p>as the number of terms \\(N \\to \\infty\\). This overshoot does <em>not</em> vanish; it merely narrows. This is the <strong>Gibbs phenomenon</strong>, and it explains why truncated Fourier series produce ringing artifacts near discontinuities.</p>

<div class="env-block example">
    <div class="env-title">Example: Square Wave</div>
    <div class="env-body">
        <p>The square wave \\(f(x) = \\text{sgn}(\\sin(\\pi x/L))\\) has the Fourier series</p>
        \\[
        f(x) = \\frac{4}{\\pi}\\sum_{n=0}^{\\infty} \\frac{\\sin((2n+1)\\pi x/L)}{2n+1} = \\frac{4}{\\pi}\\left[\\sin\\!\\left(\\frac{\\pi x}{L}\\right) + \\frac{1}{3}\\sin\\!\\left(\\frac{3\\pi x}{L}\\right) + \\frac{1}{5}\\sin\\!\\left(\\frac{5\\pi x}{L}\\right) + \\cdots\\right].
        \\]
        <p>Only odd harmonics appear (because the function is odd and has half-wave symmetry). The coefficients decay as \\(1/n\\), which is characteristic of functions with jump discontinuities.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fourier-series"></div>
`,
            visualizations: [
                {
                    id: 'viz-fourier-series',
                    title: 'Fourier Series: Building a Square Wave from Harmonics',
                    description: 'Watch a square wave emerge as you add more and more sinusoidal harmonics. Notice the Gibbs overshoot near the discontinuities, which persists no matter how many terms you include.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 50
                        });

                        var nTerms = 5;
                        var animating = false;
                        var animTime = 0;

                        var slider = VizEngine.createSlider(controls, 'Harmonics N', 1, 40, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            if (!animating) draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; return; }
                            animating = true;
                            animBtn.textContent = 'Stop';
                            animTime = 0;
                            viz.animate(function(t) {
                                animTime = t;
                                var phase = (t / 3000) % 1;
                                nTerms = Math.max(1, Math.round(phase * 40));
                                slider.value = nTerms;
                                slider.nextElementSibling.textContent = nTerms.toFixed(0);
                                draw();
                            });
                        });

                        function squareWave(x) {
                            var xn = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                            return xn < Math.PI ? 1 : -1;
                        }

                        function fourierApprox(x, N) {
                            var sum = 0;
                            for (var n = 0; n < N; n++) {
                                var k = 2 * n + 1;
                                sum += Math.sin(k * x) / k;
                            }
                            return sum * 4 / Math.PI;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw actual square wave
                            viz.drawFunction(squareWave, -5.5, 5.5, viz.colors.text + '66', 1.5, 500);

                            // Draw Fourier approximation
                            viz.drawFunction(function(x) { return fourierApprox(x, nTerms); }, -5.5, 5.5, viz.colors.blue, 2.5, 600);

                            // Draw individual harmonics faintly
                            for (var n = 0; n < Math.min(nTerms, 8); n++) {
                                var k = 2 * n + 1;
                                var amp = 4 / (Math.PI * k);
                                (function(kk, aa) {
                                    viz.drawFunction(function(x) { return aa * Math.sin(kk * x); }, -5.5, 5.5,
                                        [viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink, viz.colors.yellow, viz.colors.red, viz.colors.blue][n % 8] + '44', 1, 300);
                                })(k, amp);
                            }

                            // Labels
                            viz.screenText('N = ' + nTerms + ' harmonics', viz.width / 2, 18, viz.colors.white, 14);

                            // Gibbs indicator
                            if (nTerms >= 3) {
                                var peak = fourierApprox(Math.PI / (2 * (2 * nTerms - 1) + 1), nTerms);
                                viz.screenText('Peak overshoot: ' + (peak * 100).toFixed(1) + '% of amplitude', viz.width / 2, viz.height - 18, viz.colors.orange, 11);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(10, 10, 12, 3);
                            viz.screenText('Fourier approx', 28, 12, viz.colors.blue, 10, 'left');
                            ctx.fillStyle = viz.colors.text + '66';
                            ctx.fillRect(10, 22, 12, 3);
                            viz.screenText('Square wave', 28, 24, viz.colors.text, 10, 'left');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Fourier series of \\(f(x) = x\\) on \\([-\\pi, \\pi]\\). Which coefficients vanish, and why?',
                    hint: 'Since \\(f(x) = x\\) is an odd function, all the cosine coefficients \\(a_n\\) vanish. Use integration by parts for \\(b_n\\).',
                    solution: 'Since \\(f\\) is odd, \\(a_n = 0\\) for all \\(n\\). \\(b_n = \\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} x \\sin(nx)\\,dx = \\frac{2(-1)^{n+1}}{n}\\). So \\(f(x) = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(nx) = 2[\\sin x - \\frac{1}{2}\\sin 2x + \\frac{1}{3}\\sin 3x - \\cdots]\\).'
                },
                {
                    question: 'The Fourier coefficients of a square wave decay as \\(1/n\\). How fast do the Fourier coefficients of a triangular wave decay? Relate this to the smoothness of the function.',
                    hint: 'The triangular wave is the integral of the square wave. What does integration do to Fourier coefficients?',
                    solution: 'Integration multiplies the \\(n\\)-th Fourier coefficient by \\(1/(in\\pi/L)\\). Since the square wave coefficients go as \\(1/n\\), the triangular wave coefficients go as \\(1/n^2\\). In general, each additional derivative of smoothness gains a factor of \\(1/n\\) in decay. A function in \\(C^k\\) has coefficients decaying as \\(1/n^{k+1}\\); smooth functions have coefficients decaying faster than any power.'
                },
                {
                    question: 'Use the Fourier series of \\(f(x) = x\\) evaluated at \\(x = \\pi/2\\) to derive the Leibniz formula \\(\\pi/4 = 1 - 1/3 + 1/5 - 1/7 + \\cdots\\).',
                    hint: 'Substitute \\(x = \\pi/2\\) into the Fourier series from Exercise 1. Use \\(\\sin(n\\pi/2)\\) values.',
                    solution: 'Setting \\(x = \\pi/2\\): \\(\\pi/2 = 2[\\sin(\\pi/2) - \\frac{1}{2}\\sin(\\pi) + \\frac{1}{3}\\sin(3\\pi/2) - \\frac{1}{4}\\sin(2\\pi) + \\cdots] = 2[1 - 0 - 1/3 + 0 + 1/5 - \\cdots]\\). Therefore \\(\\pi/4 = 1 - 1/3 + 1/5 - 1/7 + \\cdots\\). This is the Leibniz formula (Gregory-Leibniz series).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Fourier Transform
        // ================================================================
        {
            id: 'sec-transform',
            title: 'Fourier Transform',
            content: `
<h2>The Fourier Transform</h2>

<div class="env-block intuition">
    <div class="env-title">From Discrete to Continuous</div>
    <div class="env-body">
        <p>A Fourier series decomposes a periodic function into harmonics at discrete frequencies \\(k_n = n\\pi/L\\). As the period \\(2L \\to \\infty\\), the spacing \\(\\Delta k = \\pi/L \\to 0\\) and the sum becomes an integral. The Fourier series morphs into the Fourier transform: a continuous "spectrum" of frequencies.</p>
    </div>
</div>

<h3>Definition</h3>

<p>The Fourier transform of a function \\(f(x)\\) is defined as</p>

\\[
\\hat{f}(k) = \\mathcal{F}[f](k) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^{\\infty} f(x)\\, e^{-ikx}\\, dx,
\\]

<p>and the inverse Fourier transform is</p>

\\[
f(x) = \\mathcal{F}^{-1}[\\hat{f}](x) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^{\\infty} \\hat{f}(k)\\, e^{ikx}\\, dk.
\\]

<div class="env-block remark">
    <div class="env-title">Convention Warning</div>
    <div class="env-body">
        <p>There are at least three common conventions for the placement of the \\(2\\pi\\) factor. We use the symmetric convention (\\(1/\\sqrt{2\\pi}\\) on both sides), common in mathematical physics. Engineers often put \\(1/(2\\pi)\\) on the inverse transform and use \\(f\\) (frequency in Hz) instead of \\(k\\) (angular frequency). Quantum mechanics often uses the same symmetric convention. Always check which convention a text uses.</p>
    </div>
</div>

<h3>Key Properties</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.2 (Properties of the Fourier Transform)</div>
    <div class="env-body">
        <p>Let \\(\\hat{f} = \\mathcal{F}[f]\\) and \\(\\hat{g} = \\mathcal{F}[g]\\). Then:</p>
        <ol>
            <li><strong>Linearity:</strong> \\(\\mathcal{F}[\\alpha f + \\beta g] = \\alpha\\hat{f} + \\beta\\hat{g}\\).</li>
            <li><strong>Derivative:</strong> \\(\\mathcal{F}[f'](k) = ik\\hat{f}(k)\\). (Differentiation becomes multiplication by \\(ik\\).)</li>
            <li><strong>Shift:</strong> \\(\\mathcal{F}[f(x-a)](k) = e^{-ika}\\hat{f}(k)\\). (A shift in position is a phase rotation in Fourier space.)</li>
            <li><strong>Scaling:</strong> \\(\\mathcal{F}[f(ax)](k) = \\frac{1}{|a|}\\hat{f}(k/a)\\). (Compression in \\(x\\) means expansion in \\(k\\).)</li>
            <li><strong>Conjugation:</strong> If \\(f\\) is real, then \\(\\hat{f}(-k) = \\hat{f}(k)^*\\).</li>
        </ol>
    </div>
</div>

<h3>The Gaussian: A Fixed Point</h3>

<div class="env-block example">
    <div class="env-title">Example: Fourier Transform of a Gaussian</div>
    <div class="env-body">
        <p>Let \\(f(x) = e^{-\\alpha x^2}\\) with \\(\\alpha > 0\\). Then</p>
        \\[
        \\hat{f}(k) = \\frac{1}{\\sqrt{2\\alpha}}\\, e^{-k^2/(4\\alpha)}.
        \\]
        <p>A Gaussian transforms into a Gaussian. A narrow Gaussian in \\(x\\)-space (large \\(\\alpha\\)) gives a wide Gaussian in \\(k\\)-space (small \\(1/(4\\alpha)\\)), and vice versa. This reciprocal spreading is the mathematical root of the uncertainty principle.</p>
    </div>
</div>

<h3>Plancherel/Parseval Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.3 (Parseval's Theorem for Fourier Transforms)</div>
    <div class="env-body">
        <p>If \\(f \\in L^2(\\mathbb{R})\\), then \\(\\hat{f} \\in L^2(\\mathbb{R})\\) and</p>
        \\[
        \\int_{-\\infty}^{\\infty} |f(x)|^2\\, dx = \\int_{-\\infty}^{\\infty} |\\hat{f}(k)|^2\\, dk.
        \\]
        <p>The total "energy" (squared integral) in position space equals the total energy in Fourier space. The Fourier transform is an <em>isometry</em> on \\(L^2\\).</p>
    </div>
</div>

<h3>The Uncertainty Principle</h3>

<p>Define the "width" of \\(f\\) in position space by the variance \\(\\Delta x^2 = \\langle x^2 \\rangle - \\langle x \\rangle^2\\) (using \\(|f|^2/\\|f\\|^2\\) as a probability density), and similarly \\(\\Delta k^2\\) for \\(\\hat{f}\\). Then:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.4 (Fourier Uncertainty Principle)</div>
    <div class="env-body">
        \\[
        \\Delta x \\cdot \\Delta k \\geq \\frac{1}{2}.
        \\]
        <p>Equality holds if and only if \\(f\\) is a Gaussian. A function cannot be simultaneously localized in both \\(x\\) and \\(k\\); this is a theorem of Fourier analysis, not quantum mechanics, though it becomes \\(\\Delta x \\cdot \\Delta p \\geq \\hbar/2\\) when we identify \\(p = \\hbar k\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fourier-transform"></div>
<div class="viz-placeholder" data-viz="viz-uncertainty"></div>
`,
            visualizations: [
                {
                    id: 'viz-fourier-transform',
                    title: 'Fourier Transform: Time Domain vs. Frequency Domain',
                    description: 'See a function and its Fourier transform side by side. Choose different functions to see how features in one domain map to features in the other.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 140, originY: 200, scale: 40
                        });

                        var funcType = 0;
                        var funcNames = ['Gaussian', 'Rectangle', 'Triangle', 'Exponential decay', 'Cosine packet'];

                        var selectBtn = VizEngine.createButton(controls, 'Next function', function() {
                            funcType = (funcType + 1) % funcNames.length;
                            draw();
                        });

                        function getFunc(type) {
                            switch (type) {
                                case 0: return { f: function(x) { return Math.exp(-x * x); }, ft: function(k) { return Math.exp(-k * k / 4) / Math.sqrt(2); }, name: 'Gaussian: e^{-x^2}' };
                                case 1: return { f: function(x) { return Math.abs(x) <= 1 ? 1 : 0; }, ft: function(k) { return k === 0 ? Math.sqrt(2 / Math.PI) : Math.sqrt(2 / Math.PI) * Math.sin(k) / k; }, name: 'Rectangle: rect(x)' };
                                case 2: return { f: function(x) { return Math.max(0, 1 - Math.abs(x)); }, ft: function(k) { return k === 0 ? Math.sqrt(2 / Math.PI) : Math.sqrt(2 / Math.PI) * (1 - Math.cos(k)) / (k * k); }, name: 'Triangle: tri(x)' };
                                case 3: return { f: function(x) { return x >= 0 ? Math.exp(-x) : 0; }, ft: function(k) { return 1 / (Math.sqrt(2 * Math.PI) * (1 + k * k)) * Math.sqrt(2); }, name: 'Exp decay: e^{-x}H(x)' };
                                case 4: return { f: function(x) { return Math.exp(-x * x / 4) * Math.cos(5 * x); }, ft: function(k) { return (Math.exp(-(k - 5) * (k - 5)) + Math.exp(-(k + 5) * (k + 5))) / Math.sqrt(2); }, name: 'Cosine packet' };
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var pair = getFunc(funcType);
                            var hw = viz.width / 2;

                            // Left panel: f(x)
                            ctx.save();
                            ctx.beginPath(); ctx.rect(0, 0, hw, viz.height); ctx.clip();
                            var leftViz = new VizEngine(body, { width: hw, height: viz.height, originX: hw / 2, originY: viz.height * 0.55, scale: 40 });
                            // Draw on main ctx instead
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.height * 0.55); ctx.lineTo(hw, viz.height * 0.55); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(hw / 2, 30); ctx.lineTo(hw / 2, viz.height - 20); ctx.stroke();

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 300; i++) {
                                var x = -3.2 + 6.4 * i / 300;
                                var y = pair.f(x);
                                var sx = hw / 2 + x * 40;
                                var sy = viz.height * 0.55 - y * 80;
                                if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.restore();

                            // Right panel: f-hat(k)
                            ctx.save();
                            ctx.beginPath(); ctx.rect(hw, 0, hw, viz.height); ctx.clip();
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(hw, viz.height * 0.55); ctx.lineTo(viz.width, viz.height * 0.55); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(hw + hw / 2, 30); ctx.lineTo(hw + hw / 2, viz.height - 20); ctx.stroke();

                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            started = false;
                            for (var j = 0; j <= 300; j++) {
                                var k = -8 + 16 * j / 300;
                                var fy = pair.ft(k);
                                var skx = hw + hw / 2 + k * 15;
                                var sky = viz.height * 0.55 - fy * 80;
                                if (!isFinite(sky)) { started = false; continue; }
                                if (!started) { ctx.moveTo(skx, sky); started = true; } else ctx.lineTo(skx, sky);
                            }
                            ctx.stroke();
                            ctx.restore();

                            // Dividing line
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(hw, 0); ctx.lineTo(hw, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            viz.screenText('f(x)', hw / 2, 20, viz.colors.blue, 14);
                            viz.screenText('x', hw - 15, viz.height * 0.55 - 8, viz.colors.text, 11);

                            viz.screenText('f\u0302(k)', hw + hw / 2, 20, viz.colors.orange, 14);
                            viz.screenText('k', viz.width - 15, viz.height * 0.55 - 8, viz.colors.text, 11);

                            viz.screenText(pair.name, viz.width / 2, viz.height - 12, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-uncertainty',
                    title: 'Uncertainty Principle: Narrow in x = Wide in k',
                    description: 'Adjust the width of a Gaussian in position space and watch its Fourier transform widen or narrow reciprocally. The product \\(\\Delta x \\cdot \\Delta k\\) stays at the minimum value 1/2.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 280, originY: 170, scale: 40
                        });

                        var sigma = 1.0;
                        var animating = false;

                        VizEngine.createSlider(controls, '\u03C3 (width)', 0.3, 3.0, sigma, 0.1, function(v) {
                            sigma = v;
                            if (!animating) draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; return; }
                            animating = true; animBtn.textContent = 'Stop';
                            viz.animate(function(t) {
                                sigma = 0.5 + 2.0 * (0.5 + 0.5 * Math.sin(t / 1500));
                                draw();
                            });
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var hw = viz.width / 2;

                            // Left: Gaussian in x
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(0, viz.height * 0.55); ctx.lineTo(hw, viz.height * 0.55); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(hw / 2, 30); ctx.lineTo(hw / 2, viz.height - 40); ctx.stroke();

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var x = -3.5 + 7 * i / 200;
                                var y = Math.exp(-x * x / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI));
                                var sx = hw / 2 + x * 35;
                                var sy = viz.height * 0.55 - y * 120;
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Right: Gaussian in k
                            var sigmaK = 1 / sigma;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(hw, viz.height * 0.55); ctx.lineTo(viz.width, viz.height * 0.55); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(hw + hw / 2, 30); ctx.lineTo(hw + hw / 2, viz.height - 40); ctx.stroke();

                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var j = 0; j <= 200; j++) {
                                var k = -3.5 + 7 * j / 200;
                                var yk = Math.exp(-k * k / (2 * sigmaK * sigmaK)) / (sigmaK * Math.sqrt(2 * Math.PI));
                                var skx = hw + hw / 2 + k * 35;
                                var sky = viz.height * 0.55 - yk * 120;
                                j === 0 ? ctx.moveTo(skx, sky) : ctx.lineTo(skx, sky);
                            }
                            ctx.stroke();

                            // Dividing line
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(hw, 0); ctx.lineTo(hw, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            viz.screenText('Position space', hw / 2, 16, viz.colors.blue, 12);
                            viz.screenText('\u0394x = ' + sigma.toFixed(2), hw / 2, viz.height - 28, viz.colors.blue, 12);

                            viz.screenText('Fourier space', hw + hw / 2, 16, viz.colors.orange, 12);
                            viz.screenText('\u0394k = ' + sigmaK.toFixed(2), hw + hw / 2, viz.height - 28, viz.colors.orange, 12);

                            viz.screenText('\u0394x \u00B7 \u0394k = ' + (sigma * sigmaK).toFixed(2) + ' \u2265 1/2', viz.width / 2, viz.height - 8, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the derivative property: if \\(\\hat{f}(k) = \\mathcal{F}[f](k)\\), show that \\(\\mathcal{F}[f\'](k) = ik\\hat{f}(k)\\).',
                    hint: 'Write out the Fourier transform of \\(f\'\\) and integrate by parts, assuming \\(f \\to 0\\) as \\(|x| \\to \\infty\\).',
                    solution: '\\(\\mathcal{F}[f\'](k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} f\'(x) e^{-ikx} dx\\). Integrating by parts: \\(= \\frac{1}{\\sqrt{2\\pi}}[f(x)e^{-ikx}]_{-\\infty}^{\\infty} + \\frac{ik}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} f(x) e^{-ikx} dx\\). The boundary term vanishes for \\(f \\in L^1\\), leaving \\(ik\\hat{f}(k)\\).'
                },
                {
                    question: 'Compute the Fourier transform of the rectangle function \\(\\Pi(x) = 1\\) for \\(|x| < 1/2\\), \\(0\\) otherwise.',
                    hint: 'Directly evaluate the integral \\(\\int_{-1/2}^{1/2} e^{-ikx} dx\\).',
                    solution: '\\(\\hat{\\Pi}(k) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-1/2}^{1/2} e^{-ikx} dx = \\frac{1}{\\sqrt{2\\pi}} \\frac{e^{ik/2} - e^{-ik/2}}{ik} = \\frac{1}{\\sqrt{2\\pi}} \\frac{\\sin(k/2)}{k/2} = \\sqrt{\\frac{1}{2\\pi}}\\,\\text{sinc}(k/2)\\). The sinc function: main lobe of width \\(\\sim 4\\pi\\), with decaying side lobes.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Convolution Theorem
        // ================================================================
        {
            id: 'sec-convolution',
            title: 'Convolution Theorem',
            content: `
<h2>Convolution Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">What is Convolution?</div>
    <div class="env-body">
        <p>Convolution is the mathematical operation that describes the "smearing" or "blurring" of one function by another. When you look through frosted glass, the image you see is the convolution of the original image with the glass's point-spread function. When a signal passes through a linear filter, the output is the convolution of the input with the filter's impulse response.</p>
    </div>
</div>

<h3>Definition of Convolution</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Convolution)</div>
    <div class="env-body">
        <p>The convolution of two functions \\(f\\) and \\(g\\) is defined as</p>
        \\[
        (f * g)(x) = \\int_{-\\infty}^{\\infty} f(t)\\, g(x - t)\\, dt.
        \\]
        <p>Convolution is commutative (\\(f * g = g * f\\)), associative, and distributes over addition.</p>
    </div>
</div>

<p>Geometrically, to evaluate \\((f * g)(x)\\): flip \\(g\\) to get \\(g(-t)\\), shift it by \\(x\\) to get \\(g(x-t)\\), multiply pointwise by \\(f(t)\\), and integrate. The visualization below shows this "slide and multiply" procedure.</p>

<h3>The Convolution Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.5 (Convolution Theorem)</div>
    <div class="env-body">
        <p>Convolution in one domain corresponds to multiplication in the other:</p>
        \\[
        \\mathcal{F}[f * g] = \\sqrt{2\\pi}\\; \\hat{f} \\cdot \\hat{g},
        \\]
        \\[
        \\mathcal{F}[f \\cdot g] = \\frac{1}{\\sqrt{2\\pi}}\\; \\hat{f} * \\hat{g}.
        \\]
        <p>(The factors of \\(\\sqrt{2\\pi}\\) depend on the Fourier convention.)</p>
    </div>
</div>

<p>This theorem is extraordinarily powerful. It means that any linear time-invariant operation (convolution in the time domain) becomes simple multiplication in the frequency domain. This is why the Fourier transform is the natural tool for analyzing linear systems.</p>

<h3>Physical Interpretation</h3>

<p>Consider a linear system with impulse response \\(h(t)\\). If the input is \\(f(t)\\), the output is \\(g(t) = (f * h)(t)\\). In the frequency domain:</p>

\\[
\\hat{g}(k) = \\sqrt{2\\pi}\\;\\hat{f}(k) \\cdot \\hat{h}(k).
\\]

<p>The function \\(\\hat{h}(k)\\) is the system's <strong>transfer function</strong>. It tells you the gain and phase shift at each frequency. This is the basis of all filter design: to attenuate high frequencies, choose \\(h\\) so that \\(\\hat{h}(k) \\to 0\\) for large \\(|k|\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Gaussian Smoothing</div>
    <div class="env-body">
        <p>Convolving \\(f\\) with a Gaussian \\(g_\\sigma(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-x^2/(2\\sigma^2)}\\) is a low-pass filter. In Fourier space, \\(\\hat{g}_\\sigma(k) = e^{-\\sigma^2 k^2/2}\\), which suppresses high-frequency components exponentially. The larger \\(\\sigma\\), the more aggressive the smoothing.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-convolution"></div>
`,
            visualizations: [
                {
                    id: 'viz-convolution',
                    title: 'Convolution: Slide, Multiply, Integrate',
                    description: 'Watch the convolution integral in action. The flipped and shifted function g(x-t) slides across f(t). The shaded area (their product) gives the convolution value at each point x.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 280, scale: 50
                        });

                        var xPos = -3;
                        var animating = false;

                        VizEngine.createSlider(controls, 'x position', -4, 4, xPos, 0.05, function(v) {
                            xPos = v;
                            if (!animating) draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; return; }
                            animating = true; animBtn.textContent = 'Stop';
                            viz.animate(function(t) {
                                xPos = -3.5 + 7 * ((t / 5000) % 1);
                                draw();
                            });
                        });

                        function f(t) { return Math.abs(t) <= 1 ? 1 : 0; }
                        function g(t) { return t >= 0 ? Math.exp(-t) : 0; }

                        function convValue(x) {
                            var sum = 0; var dt = 0.02;
                            for (var t = -5; t <= 5; t += dt) {
                                sum += f(t) * g(x - t) * dt;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Top panel: f(t) and g(x-t) overlay
                            var topOY = 120;
                            var scale = 50;

                            // f(t) - rectangle
                            ctx.fillStyle = viz.colors.blue + '33';
                            var fl = viz.width / 2 + (-1) * scale;
                            var fr = viz.width / 2 + (1) * scale;
                            ctx.fillRect(fl, topOY - 1 * 60, fr - fl, 60);
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2 + (-3) * scale, topOY);
                            ctx.lineTo(fl, topOY); ctx.lineTo(fl, topOY - 60);
                            ctx.lineTo(fr, topOY - 60); ctx.lineTo(fr, topOY);
                            ctx.lineTo(viz.width / 2 + 3 * scale, topOY);
                            ctx.stroke();

                            // g(x-t) - shifted exponential (flipped)
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 300; i++) {
                                var t = -5 + 10 * i / 300;
                                var gv = g(xPos - t);
                                if (gv < 0.001 && started) continue;
                                var sx = viz.width / 2 + t * scale;
                                var sy = topOY - gv * 60;
                                if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Shaded product
                            ctx.fillStyle = viz.colors.green + '44';
                            ctx.beginPath();
                            var dt = 0.02;
                            ctx.moveTo(viz.width / 2 + (-3) * scale, topOY);
                            for (var t2 = -3; t2 <= 3; t2 += dt) {
                                var prod = f(t2) * g(xPos - t2);
                                var sx2 = viz.width / 2 + t2 * scale;
                                var sy2 = topOY - prod * 60;
                                ctx.lineTo(sx2, sy2);
                            }
                            ctx.lineTo(viz.width / 2 + 3 * scale, topOY);
                            ctx.closePath(); ctx.fill();

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(20, topOY); ctx.lineTo(viz.width - 20, topOY); ctx.stroke();

                            viz.screenText('f(t)', 30, topOY - 65, viz.colors.blue, 11, 'left');
                            viz.screenText('g(x\u2212t)', 30, topOY - 50, viz.colors.orange, 11, 'left');

                            // Bottom panel: convolution result
                            var botOY = 310;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(20, botOY); ctx.lineTo(viz.width - 20, botOY); ctx.stroke();

                            // Full convolution curve
                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var ix = 0; ix <= 200; ix++) {
                                var xx = -4 + 8 * ix / 200;
                                var cv = convValue(xx);
                                var sxx = viz.width / 2 + xx * scale;
                                var syy = botOY - cv * 80;
                                ix === 0 ? ctx.moveTo(sxx, syy) : ctx.lineTo(sxx, syy);
                            }
                            ctx.stroke();

                            // Current point
                            var curVal = convValue(xPos);
                            var curSx = viz.width / 2 + xPos * scale;
                            var curSy = botOY - curVal * 80;
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(curSx, curSy, 5, 0, Math.PI * 2); ctx.fill();

                            // Vertical indicator
                            ctx.strokeStyle = viz.colors.white + '44'; ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(curSx, topOY); ctx.lineTo(curSx, botOY); ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('(f * g)(x)', 30, botOY - 65, viz.colors.green, 11, 'left');
                            viz.screenText('x = ' + xPos.toFixed(2) + ', (f*g)(x) = ' + curVal.toFixed(3), viz.width / 2, botOY + 22, viz.colors.white, 12);
                            viz.screenText('f = rect(t), g = e^{-t}H(t)', viz.width / 2, 16, viz.colors.text, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the convolution theorem: show that \\(\\mathcal{F}[f * g](k) = \\sqrt{2\\pi}\\, \\hat{f}(k)\\hat{g}(k)\\).',
                    hint: 'Write out the Fourier transform of the convolution integral, exchange the order of integration, and recognize the resulting integrals.',
                    solution: '\\(\\mathcal{F}[f*g](k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} \\left[\\int_{-\\infty}^{\\infty} f(t)g(x-t)dt\\right] e^{-ikx}dx\\). Exchanging order and substituting \\(u = x - t\\): \\(= \\frac{1}{\\sqrt{2\\pi}}\\int f(t)e^{-ikt}dt \\cdot \\int g(u)e^{-iku}du = \\sqrt{2\\pi}\\hat{f}(k)\\hat{g}(k)\\).'
                },
                {
                    question: 'Compute the convolution of two rectangle functions: \\((\\Pi * \\Pi)(x)\\), where \\(\\Pi(x) = 1\\) for \\(|x| < 1/2\\), 0 otherwise.',
                    hint: 'Use the definition directly, or use the convolution theorem and the known Fourier transform of \\(\\Pi\\).',
                    solution: 'Direct: \\((\\Pi * \\Pi)(x) = \\int_{-\\infty}^{\\infty} \\Pi(t)\\Pi(x-t)dt = \\int \\mathbf{1}_{|t|<1/2} \\mathbf{1}_{|x-t|<1/2} dt\\). The overlap of the two intervals \\([-1/2, 1/2]\\) and \\([x-1/2, x+1/2]\\) gives: \\(\\Lambda(x) = \\max(0, 1-|x|)\\) for \\(|x| < 1\\), which is the triangle function. Alternatively, \\(\\hat{\\Pi}(k) = \\text{sinc}(k/2)/\\sqrt{2\\pi}\\), so \\(\\widehat{\\Pi * \\Pi} = \\sqrt{2\\pi}\\,\\hat{\\Pi}^2 \\propto \\text{sinc}^2(k/2)\\), which is the transform of the triangle.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Delta Function & Distributions
        // ================================================================
        {
            id: 'sec-delta',
            title: 'Delta Function & Distributions',
            content: `
<h2>The Dirac Delta Function and Distributions</h2>

<div class="env-block intuition">
    <div class="env-title">An Infinitely Sharp Spike</div>
    <div class="env-body">
        <p>The Dirac delta "function" \\(\\delta(x)\\) is zero everywhere except at \\(x = 0\\), where it is "infinite," with total integral 1. It is not a function in the classical sense but rather a <em>distribution</em> (generalized function). It is indispensable in physics: point charges, point masses, impulse forces, and Green's functions all involve \\(\\delta\\).</p>
    </div>
</div>

<h3>Fourier Representation of the Delta Function</h3>

<p>The most illuminating way to understand \\(\\delta(x)\\) is through its Fourier representation. If we take the inverse Fourier transform of the constant function \\(\\hat{f}(k) = 1/\\sqrt{2\\pi}\\), we get</p>

\\[
\\delta(x) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} e^{ikx}\\, dk.
\\]

<p>This is the "completeness relation" for the Fourier basis: integrating over all plane waves gives a delta function, reflecting the fact that \\(\\{e^{ikx}\\}\\) is a complete orthonormal set (in the distributional sense).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.6 (Fourier Transform of \\(\\delta\\))</div>
    <div class="env-body">
        \\[
        \\mathcal{F}[\\delta](k) = \\frac{1}{\\sqrt{2\\pi}}, \\qquad \\mathcal{F}^{-1}\\left[\\frac{1}{\\sqrt{2\\pi}}\\right](x) = \\delta(x).
        \\]
        <p>The delta function has a flat spectrum: it contains all frequencies equally. Conversely, a single pure frequency \\(e^{ik_0 x}\\) has a delta function spectrum: \\(\\mathcal{F}[e^{ik_0 x}] = \\sqrt{2\\pi}\\,\\delta(k - k_0)\\).</p>
    </div>
</div>

<h3>Regularization</h3>

<p>The delta function is the limit of a sequence of ordinary functions. Common regularizations:</p>

<ul>
    <li><strong>Gaussian:</strong> \\(\\delta_\\epsilon(x) = \\frac{1}{\\epsilon\\sqrt{2\\pi}} e^{-x^2/(2\\epsilon^2)} \\to \\delta(x)\\) as \\(\\epsilon \\to 0\\).</li>
    <li><strong>Lorentzian:</strong> \\(\\delta_\\epsilon(x) = \\frac{1}{\\pi}\\frac{\\epsilon}{x^2 + \\epsilon^2} \\to \\delta(x)\\).</li>
    <li><strong>Sinc:</strong> \\(\\delta_N(x) = \\frac{1}{2\\pi}\\int_{-N}^{N} e^{ikx}dk = \\frac{\\sin(Nx)}{\\pi x} \\to \\delta(x)\\) as \\(N \\to \\infty\\).</li>
</ul>

<h3>Key Identities</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.7 (Properties of \\(\\delta\\))</div>
    <div class="env-body">
        <ol>
            <li><strong>Sifting:</strong> \\(\\int_{-\\infty}^{\\infty} f(x)\\delta(x - a)\\,dx = f(a)\\).</li>
            <li><strong>Scaling:</strong> \\(\\delta(ax) = \\frac{1}{|a|}\\delta(x)\\).</li>
            <li><strong>Composition:</strong> If \\(g(x_i) = 0\\) at simple zeros \\(x_i\\), then \\(\\delta(g(x)) = \\sum_i \\frac{\\delta(x - x_i)}{|g'(x_i)|}\\).</li>
            <li><strong>Derivative:</strong> \\(\\int_{-\\infty}^{\\infty} f(x)\\delta'(x-a)\\,dx = -f'(a)\\).</li>
            <li><strong>Convolution:</strong> \\(f * \\delta = f\\). (The delta function is the identity element for convolution.)</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Green's Function of the 1D Laplacian</div>
    <div class="env-body">
        <p>Solve \\(G''(x) = \\delta(x)\\). Taking the Fourier transform: \\((ik)^2 \\hat{G} = 1/\\sqrt{2\\pi}\\), so \\(\\hat{G}(k) = -1/(\\sqrt{2\\pi} k^2)\\). Inverting (with care for the distributional inversion), \\(G(x) = -|x|/2\\). This is the fundamental solution: the potential of a point charge in 1D.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that \\(\\delta(ax) = \\delta(x)/|a|\\) by applying the substitution \\(u = ax\\) inside the sifting integral.',
                    hint: 'Start with \\(\\int f(x)\\delta(ax)dx\\) and substitute \\(u = ax\\). Be careful with the sign of \\(a\\).',
                    solution: 'For \\(a > 0\\): \\(\\int f(x)\\delta(ax)dx\\). Let \\(u = ax\\), \\(dx = du/a\\). Then \\(\\int f(u/a)\\delta(u)du/a = f(0)/a\\). For \\(a < 0\\): same substitution gives \\(f(0)/|a|\\) (the limits flip, contributing a sign that cancels the sign of \\(a\\)). Combined: \\(\\int f(x)\\delta(ax)dx = f(0)/|a| = \\int f(x)[\\delta(x)/|a|]dx\\). Since this holds for all test functions \\(f\\), we have \\(\\delta(ax) = \\delta(x)/|a|\\).'
                },
                {
                    question: 'The 3D delta function in spherical coordinates is \\(\\delta^3(\\mathbf{r}) = \\frac{\\delta(r)}{4\\pi r^2}\\). Verify that \\(\\int \\delta^3(\\mathbf{r})\\,d^3r = 1\\).',
                    hint: 'Write \\(d^3r = r^2 \\sin\\theta\\, dr\\, d\\theta\\, d\\phi\\) and integrate.',
                    solution: '\\(\\int \\delta^3(\\mathbf{r})\\,d^3r = \\int_0^\\infty \\int_0^\\pi \\int_0^{2\\pi} \\frac{\\delta(r)}{4\\pi r^2} r^2 \\sin\\theta\\, d\\phi\\, d\\theta\\, dr = \\int_0^\\infty \\delta(r)\\,dr \\cdot \\frac{1}{4\\pi} \\cdot 4\\pi = \\int_0^\\infty \\delta(r)\\,dr = 1\\) (using the half-line convention \\(\\int_0^\\infty \\delta(r)dr = 1\\) for radial delta).'
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
<h2>Physical Applications of Fourier Analysis</h2>

<div class="env-block intuition">
    <div class="env-title">Fourier Analysis at Work</div>
    <div class="env-body">
        <p>This section showcases Fourier analysis in three major areas of physics: optics (diffraction), signal processing (spectral analysis), and quantum mechanics (momentum representation). In each case, the Fourier transform reveals structure invisible in the original representation.</p>
    </div>
</div>

<h3>Diffraction: Fourier Optics</h3>

<p>In the Fraunhofer (far-field) limit, the diffraction pattern produced by an aperture is the squared modulus of the Fourier transform of the aperture function. If the aperture transmittance is \\(A(x)\\), the intensity on a distant screen is</p>

\\[
I(\\theta) \\propto |\\hat{A}(k)|^2, \\qquad k = \\frac{2\\pi}{\\lambda}\\sin\\theta.
\\]

<div class="env-block example">
    <div class="env-title">Example: Single Slit Diffraction</div>
    <div class="env-body">
        <p>A single slit of width \\(a\\) has aperture function \\(A(x) = \\Pi(x/a)\\). Its Fourier transform is proportional to \\(\\text{sinc}(ka/2)\\), giving the familiar diffraction pattern</p>
        \\[
        I(\\theta) \\propto \\text{sinc}^2\\!\\left(\\frac{\\pi a \\sin\\theta}{\\lambda}\\right).
        \\]
        <p>The central maximum has angular width \\(\\sim 2\\lambda/a\\): narrower slits give wider diffraction patterns (uncertainty principle in action).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Double Slit</div>
    <div class="env-body">
        <p>Two slits of width \\(a\\), separated by distance \\(d\\), give \\(A(x) = \\Pi((x-d/2)/a) + \\Pi((x+d/2)/a)\\). By the shift property of the Fourier transform:</p>
        \\[
        I(\\theta) \\propto \\text{sinc}^2\\!\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right) \\cos^2\\!\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right).
        \\]
        <p>The sinc\\(^2\\) is the single-slit envelope; the cos\\(^2\\) gives the Young's double-slit interference fringes.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-diffraction"></div>

<h3>Spectral Analysis</h3>

<p>Given a signal \\(f(t)\\) that is a superposition of sinusoids with unknown frequencies, the power spectrum \\(|\\hat{f}(\\omega)|^2\\) reveals those frequencies as peaks. This is the basis of all spectral analysis, from radio astronomy to medical imaging.</p>

<div class="viz-placeholder" data-viz="viz-spectral-analysis"></div>

<h3>Quantum Mechanics: Position and Momentum</h3>

<p>In quantum mechanics, the position-space wavefunction \\(\\psi(x)\\) and the momentum-space wavefunction \\(\\tilde{\\psi}(p)\\) are related by Fourier transform:</p>

\\[
\\tilde{\\psi}(p) = \\frac{1}{\\sqrt{2\\pi\\hbar}} \\int_{-\\infty}^{\\infty} \\psi(x)\\, e^{-ipx/\\hbar}\\, dx.
\\]

<p>The probability of measuring momentum in \\([p, p+dp]\\) is \\(|\\tilde{\\psi}(p)|^2 dp\\). The uncertainty principle \\(\\Delta x \\cdot \\Delta p \\geq \\hbar/2\\) is the Fourier uncertainty principle (Theorem 14.4) with \\(k = p/\\hbar\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Free Particle Propagator</div>
    <div class="env-body">
        <p>The time evolution of a free particle is simplest in momentum space: \\(\\tilde{\\psi}(p, t) = \\tilde{\\psi}(p, 0)\\, e^{-ip^2t/(2m\\hbar)}\\). Each momentum component picks up a phase. The position-space propagator is obtained by inverse Fourier transform:</p>
        \\[
        K(x, t) = \\sqrt{\\frac{m}{2\\pi i \\hbar t}}\\, e^{imx^2/(2\\hbar t)},
        \\]
        <p>which is a spreading Gaussian (in the complex sense), demonstrating wavepacket dispersion.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-diffraction',
                    title: 'Diffraction Patterns: Single and Double Slit',
                    description: 'See how the diffraction pattern changes with slit width and separation. The pattern is the squared Fourier transform of the aperture function.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 100, scale: 40
                        });

                        var slitWidth = 1.0;
                        var slitSep = 3.0;
                        var mode = 0; // 0 = single, 1 = double

                        VizEngine.createSlider(controls, 'Slit width a', 0.3, 3.0, slitWidth, 0.1, function(v) { slitWidth = v; draw(); });
                        VizEngine.createSlider(controls, 'Separation d', 1.0, 8.0, slitSep, 0.1, function(v) { slitSep = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle single/double', function() { mode = 1 - mode; draw(); });

                        function sinc(x) { return Math.abs(x) < 1e-10 ? 1 : Math.sin(x) / x; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Top: aperture function
                            var topY = 80;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(20, topY); ctx.lineTo(viz.width - 20, topY); ctx.stroke();

                            ctx.fillStyle = viz.colors.blue + '55';
                            if (mode === 0) {
                                // single slit
                                var sl = viz.width / 2 - slitWidth / 2 * 40;
                                var sr = viz.width / 2 + slitWidth / 2 * 40;
                                ctx.fillRect(sl, topY - 30, sr - sl, 30);
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.strokeRect(sl, topY - 30, sr - sl, 30);
                            } else {
                                // double slit
                                var s1l = viz.width / 2 - slitSep / 2 * 40 - slitWidth / 2 * 40;
                                var s1r = viz.width / 2 - slitSep / 2 * 40 + slitWidth / 2 * 40;
                                var s2l = viz.width / 2 + slitSep / 2 * 40 - slitWidth / 2 * 40;
                                var s2r = viz.width / 2 + slitSep / 2 * 40 + slitWidth / 2 * 40;
                                ctx.fillRect(s1l, topY - 30, s1r - s1l, 30);
                                ctx.fillRect(s2l, topY - 30, s2r - s2l, 30);
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.strokeRect(s1l, topY - 30, s1r - s1l, 30);
                                ctx.strokeRect(s2l, topY - 30, s2r - s2l, 30);
                            }

                            viz.screenText('Aperture A(x)', viz.width / 2, 22, viz.colors.blue, 12);
                            viz.screenText(mode === 0 ? 'Single slit, a = ' + slitWidth.toFixed(1) : 'Double slit, a = ' + slitWidth.toFixed(1) + ', d = ' + slitSep.toFixed(1), viz.width / 2, 38, viz.colors.text, 11);

                            // Bottom: diffraction pattern
                            var botY = 280;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(20, botY); ctx.lineTo(viz.width - 20, botY); ctx.stroke();

                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath();
                            var maxI = 0;
                            var pts = [];
                            for (var i = 0; i <= 400; i++) {
                                var k = -15 + 30 * i / 400;
                                var env = sinc(k * slitWidth / 2);
                                var intensity;
                                if (mode === 0) {
                                    intensity = env * env;
                                } else {
                                    var interference = Math.cos(k * slitSep / 2);
                                    intensity = env * env * interference * interference;
                                }
                                pts.push({ k: k, I: intensity });
                                if (intensity > maxI) maxI = intensity;
                            }

                            // Intensity as bar fill (image)
                            var barY = botY + 15;
                            var barH = 40;
                            for (var pi = 0; pi < pts.length - 1; pi++) {
                                var sx1 = 20 + (viz.width - 40) * pi / pts.length;
                                var sx2 = 20 + (viz.width - 40) * (pi + 1) / pts.length;
                                var bright = Math.round(255 * pts[pi].I / maxI);
                                ctx.fillStyle = 'rgb(' + bright + ',' + Math.round(bright * 0.85) + ',' + Math.round(bright * 0.6) + ')';
                                ctx.fillRect(sx1, barY, sx2 - sx1 + 1, barH);
                            }

                            // Curve
                            for (var ci = 0; ci < pts.length; ci++) {
                                var csx = 20 + (viz.width - 40) * ci / pts.length;
                                var csy = botY - (pts[ci].I / maxI) * 150;
                                ci === 0 ? ctx.moveTo(csx, csy) : ctx.lineTo(csx, csy);
                            }
                            ctx.stroke();

                            viz.screenText('Intensity I(\u03B8) = |\u0046\u0302[A]|^2', viz.width / 2, botY - 158, viz.colors.orange, 12);
                            viz.screenText('Screen pattern', viz.width / 2, barY + barH + 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-spectral-analysis',
                    title: 'Spectral Analysis: Decomposing a Signal into Frequencies',
                    description: 'A compound signal is the sum of several sinusoids. The power spectrum reveals the hidden frequencies as distinct peaks.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 100, scale: 40
                        });

                        var freqs = [2, 5, 8];
                        var amps = [1.0, 0.6, 0.3];
                        var noise = 0.0;

                        VizEngine.createSlider(controls, 'Noise', 0, 1.0, noise, 0.05, function(v) { noise = v; draw(); });
                        VizEngine.createButton(controls, 'Random frequencies', function() {
                            freqs = [1 + Math.random() * 4, 4 + Math.random() * 4, 7 + Math.random() * 5].map(function(f) { return Math.round(f * 10) / 10; });
                            amps = [0.5 + Math.random() * 0.5, 0.3 + Math.random() * 0.4, 0.2 + Math.random() * 0.3];
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 512;
                            var dt = 0.02;
                            var signal = [];

                            // Build signal
                            var seed = 42;
                            function rng() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 - 0.5; }

                            for (var i = 0; i < N; i++) {
                                var t = i * dt;
                                var val = 0;
                                for (var fi = 0; fi < freqs.length; fi++) {
                                    val += amps[fi] * Math.sin(2 * Math.PI * freqs[fi] * t);
                                }
                                val += noise * 2 * rng();
                                signal.push(val);
                            }

                            // Top: time-domain signal
                            var topY = 90;
                            var topH = 70;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(30, topY); ctx.lineTo(viz.width - 20, topY); ctx.stroke();

                            var maxSig = 0;
                            for (var si = 0; si < signal.length; si++) maxSig = Math.max(maxSig, Math.abs(signal[si]));
                            if (maxSig < 0.01) maxSig = 1;

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var si2 = 0; si2 < Math.min(N, 300); si2++) {
                                var sx = 30 + (viz.width - 50) * si2 / 300;
                                var sy = topY - signal[si2] / maxSig * topH;
                                si2 === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            viz.screenText('Signal f(t)', viz.width / 2, 18, viz.colors.blue, 12);
                            viz.screenText('t', viz.width - 20, topY - 8, viz.colors.text, 10, 'right');

                            // DFT
                            var power = [];
                            var freqBins = [];
                            var maxFreq = 1 / (2 * dt); // Nyquist
                            for (var ki = 0; ki <= N / 2; ki++) {
                                var re = 0, im = 0;
                                for (var ni = 0; ni < N; ni++) {
                                    var angle = -2 * Math.PI * ki * ni / N;
                                    re += signal[ni] * Math.cos(angle);
                                    im += signal[ni] * Math.sin(angle);
                                }
                                power.push((re * re + im * im) / (N * N));
                                freqBins.push(ki / (N * dt));
                            }

                            // Bottom: power spectrum
                            var botY = 300;
                            var botH = 120;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(30, botY); ctx.lineTo(viz.width - 20, botY); ctx.stroke();

                            var maxPow = 0;
                            for (var pi = 0; pi < power.length; pi++) maxPow = Math.max(maxPow, power[pi]);
                            if (maxPow < 1e-10) maxPow = 1;

                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.beginPath();
                            ctx.moveTo(30, botY);
                            for (var pi2 = 0; pi2 < power.length; pi2++) {
                                if (freqBins[pi2] > 15) break;
                                var px = 30 + (viz.width - 50) * freqBins[pi2] / 15;
                                var py = botY - power[pi2] / maxPow * botH;
                                ctx.lineTo(px, py);
                            }
                            ctx.lineTo(30 + (viz.width - 50) * freqBins[Math.min(pi2, power.length - 1)] / 15, botY);
                            ctx.closePath(); ctx.fill();
                            ctx.beginPath();
                            for (var pi3 = 0; pi3 < power.length; pi3++) {
                                if (freqBins[pi3] > 15) break;
                                var px2 = 30 + (viz.width - 50) * freqBins[pi3] / 15;
                                var py2 = botY - power[pi3] / maxPow * botH;
                                pi3 === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
                            }
                            ctx.stroke();

                            // Mark true frequencies
                            for (var mf = 0; mf < freqs.length; mf++) {
                                var mx = 30 + (viz.width - 50) * freqs[mf] / 15;
                                ctx.strokeStyle = viz.colors.green + '88'; ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(mx, botY); ctx.lineTo(mx, botY - botH - 10); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText(freqs[mf].toFixed(1) + ' Hz', mx, botY - botH - 16, viz.colors.green, 10);
                            }

                            viz.screenText('Power Spectrum |f\u0302(\u03C9)|\u00B2', viz.width / 2, botY - botH - 36, viz.colors.orange, 12);
                            viz.screenText('Frequency (Hz)', viz.width / 2, botY + 18, viz.colors.text, 10);

                            // Freq axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '9px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            for (var fl = 0; fl <= 15; fl += 5) {
                                var flx = 30 + (viz.width - 50) * fl / 15;
                                ctx.fillText(fl.toString(), flx, botY + 10);
                            }

                            viz.screenText('Hidden frequencies: ' + freqs.map(function(f) { return f.toFixed(1); }).join(', ') + ' Hz', viz.width / 2, viz.height - 10, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In Fraunhofer diffraction, what happens to the central maximum width when the slit width \\(a\\) is doubled? Relate this to the scaling property of the Fourier transform.',
                    hint: 'The diffraction pattern is \\(\\text{sinc}^2(ka/2)\\). The first zeros occur at \\(k = \\pm 2\\pi/a\\).',
                    solution: 'The first zeros of \\(\\text{sinc}^2(ka/2)\\) are at \\(ka/2 = \\pm\\pi\\), i.e., \\(k = \\pm 2\\pi/a\\). Doubling \\(a\\) halves the angular width of the central maximum. This is the Fourier scaling property: compression in one domain means expansion in the other. Physically, wider slits give sharper diffraction patterns.'
                },
                {
                    question: 'A quantum particle in a box of width \\(L\\) has position-space wavefunctions \\(\\psi_n(x) = \\sqrt{2/L}\\sin(n\\pi x/L)\\). Show that the momentum-space representation consists of two peaks near \\(p = \\pm n\\pi\\hbar/L\\).',
                    hint: 'Compute \\(\\tilde{\\psi}_n(p) = \\frac{1}{\\sqrt{2\\pi\\hbar}}\\int_0^L \\psi_n(x) e^{-ipx/\\hbar} dx\\) using \\(\\sin(kx) = (e^{ikx} - e^{-ikx})/(2i)\\).',
                    solution: 'Writing \\(\\sin(n\\pi x/L) = (e^{in\\pi x/L} - e^{-in\\pi x/L})/(2i)\\), the integral becomes two terms: \\(\\int_0^L e^{i(n\\pi/L - p/\\hbar)x} dx\\) and \\(\\int_0^L e^{-i(n\\pi/L + p/\\hbar)x} dx\\). Each integral produces a sinc-like peak centered at \\(p = +n\\pi\\hbar/L\\) and \\(p = -n\\pi\\hbar/L\\) respectively. As \\(L \\to \\infty\\), these become delta functions, recovering the de Broglie relation \\(p = \\hbar k\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge — Looking Ahead
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Bridge: From Fourier to Laplace and Beyond</h2>

<div class="env-block intuition">
    <div class="env-title">The Bigger Picture</div>
    <div class="env-body">
        <p>Fourier analysis is a gateway to a family of integral transforms. Each transform is adapted to a particular class of problems. The Fourier transform handles problems on the full real line with constant coefficients; other transforms handle different geometries, boundary conditions, and physical requirements.</p>
    </div>
</div>

<h3>What We Established</h3>

<p>This chapter developed the core machinery:</p>

<ul>
    <li><strong>Fourier series:</strong> periodic functions decomposed into countable harmonics, with convergence governed by the Dirichlet conditions and the Gibbs phenomenon at discontinuities.</li>
    <li><strong>Fourier transform:</strong> the continuous analog for non-periodic functions, with the fundamental properties (derivative \\(\\to\\) multiplication, shift \\(\\to\\) phase, Parseval's theorem).</li>
    <li><strong>Convolution theorem:</strong> the deep connection between convolution and multiplication that underlies linear system theory.</li>
    <li><strong>Distributions:</strong> the delta function and its Fourier representation, essential for Green's functions and quantum mechanics.</li>
    <li><strong>Uncertainty principle:</strong> a mathematical theorem about Fourier pairs that becomes Heisenberg's relation in quantum mechanics.</li>
</ul>

<h3>Parseval's Theorem: Energy Conservation</h3>

<p>One theme deserves emphasis: Parseval's theorem (for series) and Plancherel's theorem (for transforms) express a conservation law. The "energy" (\\(L^2\\) norm) of a signal is the same whether computed in the time domain or the frequency domain:</p>

\\[
\\frac{a_0^2}{2} + \\sum_{n=1}^{\\infty}(a_n^2 + b_n^2) = \\frac{1}{L}\\int_{-L}^{L}|f(x)|^2\\,dx \\qquad \\text{(series)}
\\]

\\[
\\int_{-\\infty}^{\\infty}|f(x)|^2\\,dx = \\int_{-\\infty}^{\\infty}|\\hat{f}(k)|^2\\,dk \\qquad \\text{(transform)}
\\]

<p>This is why the Fourier transform preserves the physics: no energy is gained or lost in changing representation.</p>

<div class="viz-placeholder" data-viz="viz-parseval"></div>

<h3>What Comes Next</h3>

<p>In <strong>Chapter 15 (Laplace & Integral Transforms)</strong>, we generalize the Fourier transform in two directions:</p>

<ol>
    <li>The <strong>Laplace transform</strong> replaces \\(ik\\) with a complex variable \\(s = \\sigma + i\\omega\\), gaining the ability to handle initial-value problems and growing/decaying signals. Where the Fourier transform requires \\(f \\in L^1\\) or \\(L^2\\), the Laplace transform works for exponentially bounded functions.</li>
    <li>Other transforms (Mellin, Hankel, Hilbert) are adapted to specific symmetries: Mellin for scale invariance, Hankel for cylindrical geometry, Hilbert for analytic signal construction.</li>
</ol>

<p>The key idea remains the same: choose a basis of functions that diagonalize the operator of interest, expand, solve algebraically, and invert.</p>

<div class="env-block remark">
    <div class="env-title">Connection to Sturm-Liouville Theory</div>
    <div class="env-body">
        <p>The Fourier series is a special case of eigenfunction expansion for the Sturm-Liouville operator \\(-d^2/dx^2\\) on \\([-L, L]\\) with periodic boundary conditions. The eigenfunctions are \\(\\{e^{in\\pi x/L}\\}\\) and the eigenvalues are \\(\\{(n\\pi/L)^2\\}\\). Everything in this chapter is the constant-coefficient, flat-geometry case of the general theory in Chapters 9-10. When the geometry is spherical, the eigenfunctions become spherical harmonics (Ch. 12); when it is cylindrical, they become Bessel functions (Ch. 11).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-parseval',
                    title: "Parseval's Theorem: Energy in Time = Energy in Frequency",
                    description: "Parseval's theorem states that the total energy of a signal is the same whether computed from f(x) or from its Fourier coefficients. Watch the energy bars balance as you change the signal.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 100, scale: 40
                        });

                        var nCoeffs = 10;
                        var funcType = 0;
                        var funcNames = ['Square wave', 'Sawtooth', 'Triangle', 'Pulse train'];

                        VizEngine.createSlider(controls, 'Terms N', 1, 30, nCoeffs, 1, function(v) { nCoeffs = Math.round(v); draw(); });
                        VizEngine.createButton(controls, 'Next function', function() { funcType = (funcType + 1) % funcNames.length; draw(); });

                        function getCoeffs(type, N) {
                            var coeffs = [];
                            for (var n = 1; n <= N; n++) {
                                var bn;
                                switch (type) {
                                    case 0: // square wave
                                        bn = (n % 2 === 1) ? 4 / (Math.PI * n) : 0;
                                        coeffs.push({ n: n, an: 0, bn: bn });
                                        break;
                                    case 1: // sawtooth
                                        bn = 2 * Math.pow(-1, n + 1) / (Math.PI * n);
                                        coeffs.push({ n: n, an: 0, bn: bn });
                                        break;
                                    case 2: // triangle
                                        var an2 = (n % 2 === 1) ? -8 / (Math.PI * Math.PI * n * n) : 0;
                                        coeffs.push({ n: n, an: an2, bn: 0 });
                                        break;
                                    case 3: // pulse train (duty cycle 1/4)
                                        var an3 = 2 * Math.sin(n * Math.PI / 4) / (n * Math.PI);
                                        coeffs.push({ n: n, an: an3, bn: 0 });
                                        break;
                                }
                            }
                            return coeffs;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var coeffs = getCoeffs(funcType, nCoeffs);

                            // Compute energies
                            var timeEnergy;
                            switch (funcType) {
                                case 0: timeEnergy = 1.0; break; // integral of 1^2 over [-pi,pi]/(pi)
                                case 1: timeEnergy = 1.0 / 3; break; // integral of (x/pi)^2
                                case 2: timeEnergy = 1.0 / 3; break;
                                case 3: timeEnergy = 0.5; break;
                            }

                            var freqEnergy = 0;
                            for (var ci = 0; ci < coeffs.length; ci++) {
                                freqEnergy += (coeffs[ci].an * coeffs[ci].an + coeffs[ci].bn * coeffs[ci].bn) / 2;
                            }

                            // Top: signal waveform
                            var topY = 80;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(30, topY); ctx.lineTo(viz.width - 20, topY); ctx.stroke();

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var xi = 0; xi <= 300; xi++) {
                                var x = -Math.PI + 2 * Math.PI * xi / 300;
                                var y = 0;
                                for (var ci2 = 0; ci2 < coeffs.length; ci2++) {
                                    y += coeffs[ci2].an * Math.cos((ci2 + 1) * x) + coeffs[ci2].bn * Math.sin((ci2 + 1) * x);
                                }
                                var sx = 30 + (viz.width - 50) * xi / 300;
                                var sy = topY - y * 50;
                                xi === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            viz.screenText(funcNames[funcType] + ' (N = ' + nCoeffs + ')', viz.width / 2, 18, viz.colors.white, 13);

                            // Bottom: energy bar chart of |c_n|^2
                            var botTop = 180;
                            var botH = 120;
                            var barW = Math.min(20, (viz.width - 100) / nCoeffs);
                            var startX = (viz.width - nCoeffs * (barW + 3)) / 2;

                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.8;
                            ctx.beginPath(); ctx.moveTo(30, botTop + botH); ctx.lineTo(viz.width - 20, botTop + botH); ctx.stroke();

                            var maxCoeffSq = 0;
                            for (var mi = 0; mi < coeffs.length; mi++) {
                                var csq = coeffs[mi].an * coeffs[mi].an + coeffs[mi].bn * coeffs[mi].bn;
                                if (csq > maxCoeffSq) maxCoeffSq = csq;
                            }
                            if (maxCoeffSq < 1e-10) maxCoeffSq = 1;

                            for (var bi = 0; bi < coeffs.length; bi++) {
                                var energy_n = coeffs[bi].an * coeffs[bi].an + coeffs[bi].bn * coeffs[bi].bn;
                                var bh = (energy_n / maxCoeffSq) * botH;
                                var bx = startX + bi * (barW + 3);
                                ctx.fillStyle = viz.colors.orange + '88';
                                ctx.fillRect(bx, botTop + botH - bh, barW, bh);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx, botTop + botH - bh, barW, bh);

                                if (nCoeffs <= 20) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '8px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText((bi + 1).toString(), bx + barW / 2, botTop + botH + 10);
                                }
                            }

                            viz.screenText('|c_n|^2 (frequency-domain energy)', viz.width / 2, botTop - 10, viz.colors.orange, 11);

                            // Energy comparison
                            var pct = timeEnergy > 0 ? (freqEnergy / timeEnergy * 100) : 0;
                            viz.screenText('Time-domain energy: ' + timeEnergy.toFixed(4), viz.width / 2 - 120, viz.height - 35, viz.colors.blue, 11);
                            viz.screenText('Freq-domain energy (N=' + nCoeffs + '): ' + freqEnergy.toFixed(4), viz.width / 2 - 120, viz.height - 18, viz.colors.orange, 11);
                            viz.screenText('(' + pct.toFixed(1) + '% captured)', viz.width - 60, viz.height - 18, viz.colors.green, 11);

                            // Energy bar
                            var barStartX = 30;
                            var barEndX = viz.width - 30;
                            var barFullW = barEndX - barStartX;
                            var barYY = viz.height - 50;
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.fillRect(barStartX, barYY, barFullW, 8);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(barStartX, barYY, barFullW * Math.min(1, freqEnergy / timeEnergy), 8);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Use Parseval's theorem for the Fourier series of \\(f(x) = x\\) on \\([-\\pi, \\pi]\\) to show that \\(\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\).",
                    hint: "From Section 2, the Fourier series of \\(f(x) = x\\) has \\(b_n = 2(-1)^{n+1}/n\\). Parseval states \\(\\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} x^2 dx = \\sum b_n^2\\).",
                    solution: "Parseval: \\(\\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} x^2 dx = \\sum_{n=1}^{\\infty} b_n^2\\). Left side: \\(\\frac{1}{\\pi} \\cdot \\frac{2\\pi^3}{3} = \\frac{2\\pi^2}{3}\\). Right side: \\(\\sum_{n=1}^{\\infty} \\frac{4}{n^2}\\). So \\(\\frac{2\\pi^2}{3} = 4\\sum \\frac{1}{n^2}\\), giving \\(\\sum \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\). This is the Basel problem, first solved by Euler in 1735."
                },
                {
                    question: 'A signal is bandlimited: \\(\\hat{f}(k) = 0\\) for \\(|k| > k_{\\max}\\). State and prove the Shannon-Nyquist sampling theorem using Fourier analysis.',
                    hint: 'The signal can be reconstructed from samples at rate \\(\\geq 2k_{\\max}/(2\\pi)\\). Use the fact that multiplying \\(\\hat{f}\\) by \\(\\Pi(k/(2k_{\\max}))\\) does not change it.',
                    solution: 'Since \\(\\hat{f}\\) has compact support \\([-k_{\\max}, k_{\\max}]\\), we can expand it as a Fourier series in \\(k\\): \\(\\hat{f}(k) = \\sum_n c_n e^{-in\\pi k/k_{\\max}}\\). The coefficients \\(c_n\\) are proportional to \\(f(n\\pi/k_{\\max})\\), the samples of \\(f\\) at spacing \\(\\Delta x = \\pi/k_{\\max}\\). The sampling rate is \\(1/\\Delta x = k_{\\max}/\\pi\\), i.e., \\(2f_{\\max}\\) in Hz. Reconstruction: \\(f(x) = \\sum_n f(n\\Delta x)\\,\\text{sinc}(k_{\\max}(x - n\\Delta x)/\\pi)\\), using sinc interpolation.'
                },
                {
                    question: 'Show that the Fourier transform of \\(f(x) = e^{-|x|}\\) is a Lorentzian: \\(\\hat{f}(k) = \\sqrt{2/\\pi}\\, \\frac{1}{1+k^2}\\).',
                    hint: 'Split the integral into \\((-\\infty, 0)\\) and \\((0, \\infty)\\), using \\(e^{-|x|} = e^x\\) for \\(x < 0\\) and \\(e^{-x}\\) for \\(x > 0\\).',
                    solution: '\\(\\hat{f}(k) = \\frac{1}{\\sqrt{2\\pi}}\\left[\\int_0^\\infty e^{-x}e^{-ikx}dx + \\int_{-\\infty}^0 e^x e^{-ikx}dx\\right] = \\frac{1}{\\sqrt{2\\pi}}\\left[\\frac{1}{1+ik} + \\frac{1}{1-ik}\\right] = \\frac{1}{\\sqrt{2\\pi}} \\cdot \\frac{2}{1+k^2} = \\sqrt{\\frac{2}{\\pi}}\\frac{1}{1+k^2}\\). The exponential decay in position gives a Lorentzian (algebraic decay) in Fourier space.'
                }
            ]
        }
    ]
});
