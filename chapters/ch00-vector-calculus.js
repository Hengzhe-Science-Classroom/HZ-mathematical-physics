window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Vector Calculus Review',
    subtitle: 'Gradient, divergence, curl, and the integral theorems',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Vector Calculus?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Vector Calculus?',
            content: `
<h2>Why Vector Calculus?</h2>

<div class="env-block intuition">
    <div class="env-title">The Language of Fields</div>
    <div class="env-body">
        <p>A temperature distribution in a room assigns a number to each point in space: that is a <strong>scalar field</strong> \\(T(\\mathbf{r})\\). The wind blowing through a window assigns a velocity vector to each point: that is a <strong>vector field</strong> \\(\\mathbf{v}(\\mathbf{r})\\). Vector calculus is the language that lets us describe how these fields change, flow, and interact.</p>
    </div>
</div>

<p>Nearly every equation in physics is an equation about fields. Maxwell's equations, the Navier-Stokes equations, the Schrodinger equation, Einstein's field equations: all are written in the language of vector calculus (or its generalizations). This chapter reviews the three fundamental differential operators and the two great integral theorems that connect them.</p>

<h3>Scalar and Vector Fields</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Scalar Field)</div>
    <div class="env-body">
        <p>A <strong>scalar field</strong> is a function \\(f: \\mathbb{R}^3 \\to \\mathbb{R}\\) that assigns a real number to each point in space. Examples: temperature \\(T(\\mathbf{r})\\), pressure \\(p(\\mathbf{r})\\), electric potential \\(\\phi(\\mathbf{r})\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Vector Field)</div>
    <div class="env-body">
        <p>A <strong>vector field</strong> is a function \\(\\mathbf{F}: \\mathbb{R}^3 \\to \\mathbb{R}^3\\) that assigns a vector to each point in space. Examples: velocity \\(\\mathbf{v}(\\mathbf{r})\\), electric field \\(\\mathbf{E}(\\mathbf{r})\\), magnetic field \\(\\mathbf{B}(\\mathbf{r})\\).</p>
    </div>
</div>

<h3>The Three Differential Operators</h3>

<p>The central object is the <strong>nabla operator</strong> (or "del"):</p>

\\[
\\nabla = \\hat{\\mathbf{x}}\\,\\frac{\\partial}{\\partial x} + \\hat{\\mathbf{y}}\\,\\frac{\\partial}{\\partial y} + \\hat{\\mathbf{z}}\\,\\frac{\\partial}{\\partial z}.
\\]

<p>Applied in three different ways, \\(\\nabla\\) produces the three fundamental operations:</p>

<table class="env-table" style="width:100%; margin:1em 0;">
<tr><th>Operation</th><th>Notation</th><th>Input</th><th>Output</th><th>Physical Meaning</th></tr>
<tr><td>Gradient</td><td>\\(\\nabla f\\)</td><td>Scalar field</td><td>Vector field</td><td>Direction of steepest ascent</td></tr>
<tr><td>Divergence</td><td>\\(\\nabla \\cdot \\mathbf{F}\\)</td><td>Vector field</td><td>Scalar field</td><td>Net outward flux per unit volume</td></tr>
<tr><td>Curl</td><td>\\(\\nabla \\times \\mathbf{F}\\)</td><td>Vector field</td><td>Vector field</td><td>Local rotation of the field</td></tr>
</table>

<p>These three operators, together with the two integral theorems of Gauss and Stokes, form the backbone of classical field theory. The rest of this chapter develops each in turn.</p>

<div class="env-block remark">
    <div class="env-title">What This Chapter Assumes</div>
    <div class="env-body">
        <p>We assume familiarity with multivariable calculus at the level of partial derivatives, multiple integrals, and the chain rule. The visualizations in this chapter work in \\(\\mathbb{R}^2\\) for clarity; the full \\(\\mathbb{R}^3\\) versions are notationally heavier but conceptually identical.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Gradient
        // ================================================================
        {
            id: 'sec-gradient',
            title: 'Gradient',
            content: `
<h2>The Gradient</h2>

<div class="env-block intuition">
    <div class="env-title">Hiking Uphill</div>
    <div class="env-body">
        <p>Imagine standing on a hillside. The gradient \\(\\nabla f\\) at your location is a vector that points in the direction of steepest ascent, and its magnitude tells you how steep that climb is. If you walk perpendicular to the gradient, you stay at the same elevation: you are walking along a level curve (contour line).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Gradient)</div>
    <div class="env-body">
        <p>The <strong>gradient</strong> of a scalar field \\(f(x,y,z)\\) is the vector field</p>
        \\[\\nabla f = \\frac{\\partial f}{\\partial x}\\,\\hat{\\mathbf{x}} + \\frac{\\partial f}{\\partial y}\\,\\hat{\\mathbf{y}} + \\frac{\\partial f}{\\partial z}\\,\\hat{\\mathbf{z}}.\\]
    </div>
</div>

<h3>The Directional Derivative</h3>

<p>The gradient controls how \\(f\\) changes in any direction. The rate of change of \\(f\\) in the direction of a unit vector \\(\\hat{\\mathbf{n}}\\) is the <strong>directional derivative</strong>:</p>

\\[
D_{\\hat{\\mathbf{n}}} f = \\nabla f \\cdot \\hat{\\mathbf{n}} = |\\nabla f|\\cos\\theta,
\\]

<p>where \\(\\theta\\) is the angle between \\(\\nabla f\\) and \\(\\hat{\\mathbf{n}}\\). This immediately gives us three key facts:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.1 (Properties of the Gradient)</div>
    <div class="env-body">
        <ol>
            <li>\\(f\\) increases most rapidly in the direction of \\(\\nabla f\\), at rate \\(|\\nabla f|\\).</li>
            <li>\\(f\\) decreases most rapidly in the direction of \\(-\\nabla f\\).</li>
            <li>\\(\\nabla f\\) is perpendicular to the level surfaces \\(f = \\text{const}\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof (Statement 3)</div>
    <div class="env-body">
        <p>Let \\(\\mathbf{r}(t)\\) be a curve lying entirely on the level surface \\(f(\\mathbf{r}) = c\\). Then \\(\\frac{d}{dt}f(\\mathbf{r}(t)) = 0\\). By the chain rule, \\(\\nabla f \\cdot \\frac{d\\mathbf{r}}{dt} = 0\\). Since \\(\\frac{d\\mathbf{r}}{dt}\\) is tangent to the level surface, \\(\\nabla f\\) is perpendicular to every tangent direction, hence normal to the surface.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Temperature Field</div>
    <div class="env-body">
        <p>Consider \\(T(x,y) = x^2 + y^2\\) (temperature increasing outward from the origin). Then</p>
        \\[\\nabla T = 2x\\,\\hat{\\mathbf{x}} + 2y\\,\\hat{\\mathbf{y}}.\\]
        <p>At the point \\((1,1)\\), \\(\\nabla T = (2,2)\\), pointing radially outward. The level curves \\(T = c\\) are circles centered at the origin, and \\(\\nabla T\\) is indeed perpendicular to these circles.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-gradient-field"></div>
`,
            visualizations: [
                {
                    id: 'viz-gradient-field',
                    title: 'Gradient Field Explorer',
                    description: 'A scalar field is shown as a colored heatmap. The gradient vectors (white arrows) point in the direction of steepest ascent, perpendicular to the level curves (gray). Drag the point to explore different locations.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var funcChoice = 0;
                        var funcs = [
                            { name: 'x² + y²', f: function(x,y){return x*x+y*y;}, gx: function(x,y){return 2*x;}, gy: function(x,y){return 2*y;} },
                            { name: 'sin(x)cos(y)', f: function(x,y){return Math.sin(x)*Math.cos(y);}, gx: function(x,y){return Math.cos(x)*Math.cos(y);}, gy: function(x,y){return -Math.sin(x)*Math.sin(y);} },
                            { name: 'x² - y²', f: function(x,y){return x*x-y*y;}, gx: function(x,y){return 2*x;}, gy: function(x,y){return -2*y;} },
                            { name: 'exp(-(x²+y²))', f: function(x,y){return Math.exp(-(x*x+y*y));}, gx: function(x,y){return -2*x*Math.exp(-(x*x+y*y));}, gy: function(x,y){return -2*y*Math.exp(-(x*x+y*y));} }
                        ];

                        var probe = viz.addDraggable('probe', 1.5, 1, viz.colors.white, 8, function() { draw(); });

                        VizEngine.createSlider(controls, 'Function', 0, 3, funcChoice, 1, function(v) {
                            funcChoice = Math.round(v);
                            draw();
                        });

                        function draw() {
                            var fn = funcs[funcChoice];
                            var ctx = viz.ctx;

                            // Draw heatmap
                            var xRange = [-4.5, 4.5];
                            var yRange = [-3.3, 3.3];
                            viz.drawHeatmap(fn.f, xRange, yRange, 'viridis');

                            // Draw level curves (contours)
                            ctx.strokeStyle = '#ffffff33';
                            ctx.lineWidth = 0.8;
                            var fMin = Infinity, fMax = -Infinity;
                            for (var sx = 0; sx < viz.width; sx += 20) {
                                for (var sy = 0; sy < viz.height; sy += 20) {
                                    var pt = viz.toMath(sx, sy);
                                    var val = fn.f(pt[0], pt[1]);
                                    if (isFinite(val)) { fMin = Math.min(fMin, val); fMax = Math.max(fMax, val); }
                                }
                            }
                            var nContours = 10;
                            for (var ci = 1; ci < nContours; ci++) {
                                var level = fMin + (fMax - fMin) * ci / nContours;
                                // Simple marching: draw short segments where function crosses level
                                var step = 0.15;
                                for (var cx = -4.5; cx < 4.5; cx += step) {
                                    for (var cy = -3.3; cy < 3.3; cy += step) {
                                        var v00 = fn.f(cx, cy) - level;
                                        var v10 = fn.f(cx + step, cy) - level;
                                        var v01 = fn.f(cx, cy + step) - level;
                                        if ((v00 > 0) !== (v10 > 0)) {
                                            var t = v00 / (v00 - v10);
                                            var px = viz.toScreen(cx + t * step, cy);
                                            ctx.fillStyle = '#ffffff44';
                                            ctx.fillRect(px[0], px[1], 1.5, 1.5);
                                        }
                                        if ((v00 > 0) !== (v01 > 0)) {
                                            var t2 = v00 / (v00 - v01);
                                            var py = viz.toScreen(cx, cy + t2 * step);
                                            ctx.fillStyle = '#ffffff44';
                                            ctx.fillRect(py[0], py[1], 1.5, 1.5);
                                        }
                                    }
                                }
                            }

                            // Draw gradient arrows on a grid
                            var arrowStep = 1.0;
                            for (var ax = -4; ax <= 4; ax += arrowStep) {
                                for (var ay = -3; ay <= 3; ay += arrowStep) {
                                    var gx = fn.gx(ax, ay);
                                    var gy = fn.gy(ax, ay);
                                    var mag = Math.sqrt(gx * gx + gy * gy);
                                    if (mag < 0.01) continue;
                                    var sc = Math.min(0.4, 0.4 * mag / (mag + 1));
                                    viz.drawVector(ax, ay, ax + gx * sc / mag * 0.8, ay + gy * sc / mag * 0.8, '#ffffffaa', null, 1.2);
                                }
                            }

                            // Draw probe point and its gradient
                            var px2 = probe.x, py2 = probe.y;
                            var gxP = fn.gx(px2, py2), gyP = fn.gy(px2, py2);
                            var magP = Math.sqrt(gxP * gxP + gyP * gyP);
                            if (magP > 0.01) {
                                viz.drawVector(px2, py2, px2 + gxP * 0.7 / magP, py2 + gyP * 0.7 / magP, viz.colors.orange, null, 3);
                            }
                            viz.drawDraggables();

                            // Info text
                            viz.screenText('f = ' + fn.name, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText(
                                '∇f(' + px2.toFixed(1) + ',' + py2.toFixed(1) + ') = (' +
                                gxP.toFixed(2) + ', ' + gyP.toFixed(2) + ')  |∇f| = ' + magP.toFixed(2),
                                viz.width / 2, viz.height - 12, viz.colors.orange, 12
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\nabla f\\) for \\(f(x,y,z) = x^2 y + y z^3\\). Evaluate it at \\((1, 2, -1)\\).',
                    hint: 'Take partial derivatives with respect to each variable separately.',
                    solution: '\\(\\nabla f = (2xy,\\, x^2 + z^3,\\, 3yz^2)\\). At \\((1,2,-1)\\): \\(\\nabla f = (4,\\, 0,\\, 6)\\).'
                },
                {
                    question: 'Show that \\(\\nabla(fg) = f\\nabla g + g\\nabla f\\) (the product rule for gradients).',
                    hint: 'Write out the \\(x\\)-component of \\(\\nabla(fg)\\) using the ordinary product rule for partial derivatives, then generalize.',
                    solution: 'The \\(x\\)-component of \\(\\nabla(fg)\\) is \\(\\frac{\\partial}{\\partial x}(fg) = f\\frac{\\partial g}{\\partial x} + g\\frac{\\partial f}{\\partial x}\\). The same holds for \\(y\\) and \\(z\\). Combining: \\(\\nabla(fg) = f\\nabla g + g\\nabla f\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Divergence
        // ================================================================
        {
            id: 'sec-divergence',
            title: 'Divergence',
            content: `
<h2>The Divergence</h2>

<div class="env-block intuition">
    <div class="env-title">Sources and Sinks</div>
    <div class="env-body">
        <p>Imagine a fluid flowing through space. At some points, fluid might be created (a source, like a faucet) or destroyed (a sink, like a drain). The divergence \\(\\nabla \\cdot \\mathbf{F}\\) measures the net rate at which "stuff" is being produced at each point. Positive divergence means the field is spreading out (source); negative means it is converging (sink); zero means the flow is incompressible locally.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Divergence)</div>
    <div class="env-body">
        <p>The <strong>divergence</strong> of a vector field \\(\\mathbf{F} = F_x\\hat{\\mathbf{x}} + F_y\\hat{\\mathbf{y}} + F_z\\hat{\\mathbf{z}}\\) is the scalar field</p>
        \\[\\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}.\\]
    </div>
</div>

<h3>Physical Interpretation</h3>

<p>Consider a small box centered at a point \\(\\mathbf{r}\\) with sides \\(\\Delta x, \\Delta y, \\Delta z\\). The net outward flux of \\(\\mathbf{F}\\) through the six faces of this box, per unit volume, approaches \\(\\nabla \\cdot \\mathbf{F}\\) as the box shrinks to zero:</p>

\\[
\\nabla \\cdot \\mathbf{F}(\\mathbf{r}) = \\lim_{V \\to 0} \\frac{1}{V} \\oint_S \\mathbf{F} \\cdot d\\mathbf{A}.
\\]

<p>This is the "microscopic" version of Gauss's theorem (which we prove later).</p>

<div class="env-block example">
    <div class="env-title">Example: Radial Fields</div>
    <div class="env-body">
        <p>For the radial field \\(\\mathbf{F} = \\mathbf{r} = x\\hat{\\mathbf{x}} + y\\hat{\\mathbf{y}} + z\\hat{\\mathbf{z}}\\):</p>
        \\[\\nabla \\cdot \\mathbf{F} = 1 + 1 + 1 = 3.\\]
        <p>Uniform positive divergence everywhere: the field is expanding uniformly, like a balloon inflating.</p>
        <p>For \\(\\mathbf{F} = \\hat{\\mathbf{r}}/r^2 = \\mathbf{r}/r^3\\) (the Coulomb field), \\(\\nabla \\cdot \\mathbf{F} = 0\\) everywhere except at \\(r = 0\\), where it is singular. This is why we need \\(\\nabla \\cdot (\\hat{\\mathbf{r}}/r^2) = 4\\pi\\delta^3(\\mathbf{r})\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.2 (Divergence of a Cross Product)</div>
    <div class="env-body">
        <p>For vector fields \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\):</p>
        \\[\\nabla \\cdot (\\mathbf{A} \\times \\mathbf{B}) = \\mathbf{B} \\cdot (\\nabla \\times \\mathbf{A}) - \\mathbf{A} \\cdot (\\nabla \\times \\mathbf{B}).\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-divergence-field"></div>
`,
            visualizations: [
                {
                    id: 'viz-divergence-field',
                    title: 'Divergence: Sources and Sinks',
                    description: 'The vector field is shown by arrows. Regions of positive divergence (sources) are colored red; negative divergence (sinks) are blue. Watch the animated particles flow outward from sources and inward toward sinks.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var fieldChoice = 0;
                        var fields = [
                            {
                                name: 'F = (x, y) [source]',
                                fx: function(x,y){return x;}, fy: function(x,y){return y;},
                                div: function(x,y){return 2;}
                            },
                            {
                                name: 'F = (-y, x) [vortex, div=0]',
                                fx: function(x,y){return -y;}, fy: function(x,y){return x;},
                                div: function(x,y){return 0;}
                            },
                            {
                                name: 'F = (x², -2xy) [variable div]',
                                fx: function(x,y){return x*x;}, fy: function(x,y){return -2*x*y;},
                                div: function(x,y){return 2*x - 2*x;}
                            },
                            {
                                name: 'F = (sin(x), cos(y))',
                                fx: function(x,y){return Math.sin(x);}, fy: function(x,y){return Math.cos(y);},
                                div: function(x,y){return Math.cos(x) - Math.sin(y);}
                            }
                        ];

                        VizEngine.createSlider(controls, 'Field', 0, 3, fieldChoice, 1, function(v) {
                            fieldChoice = Math.round(v);
                            initParticles();
                        });

                        // Particles for animation
                        var particles = [];
                        var nParticles = 200;

                        function initParticles() {
                            particles = [];
                            for (var i = 0; i < nParticles; i++) {
                                particles.push({
                                    x: (Math.random() - 0.5) * 8,
                                    y: (Math.random() - 0.5) * 6,
                                    life: Math.random() * 200
                                });
                            }
                        }
                        initParticles();

                        viz.animate(function(t) {
                            var fl = fields[fieldChoice];
                            var ctx = viz.ctx;
                            viz.clear();

                            // Background: divergence heatmap
                            var pw = 70, ph = 50;
                            for (var pi = 0; pi < pw; pi++) {
                                for (var pj = 0; pj < ph; pj++) {
                                    var mx = -4.5 + 9 * pi / pw;
                                    var my = -3.3 + 6.6 * pj / ph;
                                    var dv = fl.div(mx, my);
                                    var intensity = Math.max(-1, Math.min(1, dv / 3));
                                    var r, g, b;
                                    if (intensity > 0) {
                                        r = Math.round(40 + 180 * intensity);
                                        g = Math.round(30);
                                        b = Math.round(30);
                                    } else {
                                        r = Math.round(30);
                                        g = Math.round(30);
                                        b = Math.round(40 + 180 * (-intensity));
                                    }
                                    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    var sx = pi * viz.width / pw;
                                    var sy = pj * viz.height / ph;
                                    ctx.fillRect(sx, sy, viz.width / pw + 1, viz.height / ph + 1);
                                }
                            }

                            // Draw vector arrows
                            var step = 1.0;
                            for (var ax = -4; ax <= 4; ax += step) {
                                for (var ay = -3; ay <= 3; ay += step) {
                                    var fxx = fl.fx(ax, ay);
                                    var fyy = fl.fy(ax, ay);
                                    var mag = Math.sqrt(fxx * fxx + fyy * fyy);
                                    if (mag < 0.01) continue;
                                    var sc = Math.min(0.4, 0.35 * mag / (mag + 0.5));
                                    viz.drawVector(ax, ay, ax + fxx * sc / mag, ay + fyy * sc / mag, '#ffffff88', null, 1);
                                }
                            }

                            // Animate particles
                            var dt = 0.02;
                            for (var k = 0; k < particles.length; k++) {
                                var p = particles[k];
                                var vx = fl.fx(p.x, p.y);
                                var vy = fl.fy(p.x, p.y);
                                p.x += vx * dt;
                                p.y += vy * dt;
                                p.life -= 1;
                                if (p.life <= 0 || Math.abs(p.x) > 5 || Math.abs(p.y) > 4) {
                                    p.x = (Math.random() - 0.5) * 8;
                                    p.y = (Math.random() - 0.5) * 6;
                                    p.life = 150 + Math.random() * 100;
                                }
                                var sp = viz.toScreen(p.x, p.y);
                                var alpha = Math.min(1, p.life / 30);
                                ctx.fillStyle = 'rgba(58,166,255,' + (alpha * 0.8).toFixed(2) + ')';
                                ctx.beginPath();
                                ctx.arc(sp[0], sp[1], 2, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            viz.screenText(fl.name, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText('Red = source (div > 0)     Blue = sink (div < 0)', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\nabla \\cdot \\mathbf{F}\\) for \\(\\mathbf{F} = (x^2 z,\\, -2y^3 z^2,\\, xy^2 z)\\).',
                    hint: 'Take \\(\\partial F_x/\\partial x + \\partial F_y/\\partial y + \\partial F_z/\\partial z\\).',
                    solution: '\\(\\nabla \\cdot \\mathbf{F} = 2xz - 6y^2 z^2 + xy^2\\).'
                },
                {
                    question: 'Show that \\(\\nabla \\cdot (f\\mathbf{F}) = f(\\nabla \\cdot \\mathbf{F}) + \\mathbf{F} \\cdot (\\nabla f)\\).',
                    hint: 'Expand \\(\\frac{\\partial}{\\partial x}(fF_x)\\) using the product rule, then sum over all components.',
                    solution: '\\(\\frac{\\partial}{\\partial x}(fF_x) = f\\frac{\\partial F_x}{\\partial x} + F_x\\frac{\\partial f}{\\partial x}\\). Summing over \\(x,y,z\\): \\(\\nabla \\cdot(f\\mathbf{F}) = f(\\nabla \\cdot \\mathbf{F}) + \\mathbf{F} \\cdot \\nabla f\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Curl
        // ================================================================
        {
            id: 'sec-curl',
            title: 'Curl',
            content: `
<h2>The Curl</h2>

<div class="env-block intuition">
    <div class="env-title">The Paddle Wheel Test</div>
    <div class="env-body">
        <p>Place a tiny paddle wheel in a flowing fluid. If the flow makes the paddle wheel spin, the field has nonzero curl at that point. The curl vector points along the axis of rotation (by the right-hand rule), and its magnitude measures how fast the paddle spins.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Curl)</div>
    <div class="env-body">
        <p>The <strong>curl</strong> of a vector field \\(\\mathbf{F} = F_x\\hat{\\mathbf{x}} + F_y\\hat{\\mathbf{y}} + F_z\\hat{\\mathbf{z}}\\) is the vector field</p>
        \\[
        \\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\hat{\\mathbf{x}} & \\hat{\\mathbf{y}} & \\hat{\\mathbf{z}} \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ F_x & F_y & F_z \\end{vmatrix}
        = \\left(\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z}\\right)\\hat{\\mathbf{x}} + \\left(\\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x}\\right)\\hat{\\mathbf{y}} + \\left(\\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y}\\right)\\hat{\\mathbf{z}}.
        \\]
    </div>
</div>

<h3>Two Key Identities</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.3 (Vanishing Compositions)</div>
    <div class="env-body">
        <p>For any sufficiently smooth scalar field \\(f\\) and vector field \\(\\mathbf{F}\\):</p>
        <ol>
            <li>\\(\\nabla \\times (\\nabla f) = \\mathbf{0}\\) (the curl of a gradient is zero).</li>
            <li>\\(\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0\\) (the divergence of a curl is zero).</li>
        </ol>
        <p>Physically: (1) conservative forces have no rotation; (2) magnetic field lines never have sources or sinks.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>(1) The \\(x\\)-component of \\(\\nabla \\times (\\nabla f)\\) is \\(\\frac{\\partial^2 f}{\\partial y \\partial z} - \\frac{\\partial^2 f}{\\partial z \\partial y} = 0\\) by equality of mixed partials. Similarly for the \\(y\\)- and \\(z\\)-components.</p>
        <p>(2) Write \\(\\mathbf{G} = \\nabla \\times \\mathbf{F}\\). Then \\(\\nabla \\cdot \\mathbf{G}\\) involves sums of mixed partials that cancel pairwise by the same symmetry argument.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Rigid Rotation</div>
    <div class="env-body">
        <p>A fluid in rigid rotation about the \\(z\\)-axis has velocity \\(\\mathbf{v} = \\omega(-y, x, 0)\\). Then</p>
        \\[\\nabla \\times \\mathbf{v} = \\left(\\frac{\\partial(0)}{\\partial y} - \\frac{\\partial(\\omega x)}{\\partial z}, \\frac{\\partial(-\\omega y)}{\\partial z} - \\frac{\\partial(0)}{\\partial x}, \\frac{\\partial(\\omega x)}{\\partial x} - \\frac{\\partial(-\\omega y)}{\\partial y}\\right) = (0,0,2\\omega).\\]
        <p>The curl is uniform, pointing along the axis of rotation. Its magnitude \\(2\\omega\\) is twice the angular velocity.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-curl-field"></div>
`,
            visualizations: [
                {
                    id: 'viz-curl-field',
                    title: 'Curl: Rotation of a Vector Field',
                    description: 'The vector field is shown by arrows. A paddle wheel (circle with spokes) at the draggable point shows the local rotation. Fields with nonzero curl make the paddle spin.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var fieldChoice = 0;
                        var fields = [
                            {
                                name: 'F = (-y, x) [rigid rotation]',
                                fx: function(x,y){return -y;}, fy: function(x,y){return x;},
                                curlz: function(x,y){return 2;}
                            },
                            {
                                name: 'F = (x, y) [irrotational]',
                                fx: function(x,y){return x;}, fy: function(x,y){return y;},
                                curlz: function(x,y){return 0;}
                            },
                            {
                                name: 'F = (-y/(x²+y²), x/(x²+y²))',
                                fx: function(x,y){var r2=x*x+y*y; return r2<0.01?0:-y/r2;},
                                fy: function(x,y){var r2=x*x+y*y; return r2<0.01?0:x/r2;},
                                curlz: function(x,y){return 0;} // irrotational except at origin
                            },
                            {
                                name: 'F = (y², -x²)',
                                fx: function(x,y){return y*y;}, fy: function(x,y){return -x*x;},
                                curlz: function(x,y){return -2*x - 2*y;}
                            }
                        ];

                        var probe = viz.addDraggable('paddle', 1, 1, viz.colors.teal, 8, function(){});

                        VizEngine.createSlider(controls, 'Field', 0, 3, fieldChoice, 1, function(v) {
                            fieldChoice = Math.round(v);
                        });

                        var startTime = performance.now();

                        viz.animate(function(t) {
                            var fl = fields[fieldChoice];
                            var ctx = viz.ctx;
                            viz.clear();
                            viz.drawGrid();

                            // Draw vector arrows
                            var step = 1.0;
                            for (var ax = -4; ax <= 4; ax += step) {
                                for (var ay = -3; ay <= 3; ay += step) {
                                    var fxx = fl.fx(ax, ay);
                                    var fyy = fl.fy(ax, ay);
                                    var mag = Math.sqrt(fxx * fxx + fyy * fyy);
                                    if (mag < 0.01) continue;
                                    var sc = Math.min(0.4, 0.35 * mag / (mag + 0.5));
                                    viz.drawVector(ax, ay, ax + fxx * sc / mag, ay + fyy * sc / mag, '#ffffff66', null, 1);
                                }
                            }

                            // Draw paddle wheel at probe location
                            var px = probe.x, py = probe.y;
                            var curlVal = fl.curlz(px, py);
                            var elapsed = (t - startTime) / 1000;
                            var angle = curlVal * elapsed * 0.5;
                            var sp = viz.toScreen(px, py);
                            var pr = 18;

                            // Paddle circle
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], pr, 0, Math.PI * 2);
                            ctx.stroke();

                            // Spokes
                            for (var si = 0; si < 4; si++) {
                                var sa = angle + si * Math.PI / 2;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(sp[0], sp[1]);
                                ctx.lineTo(sp[0] + pr * Math.cos(sa), sp[1] - pr * Math.sin(sa));
                                ctx.stroke();
                                // Paddle blade
                                var bladeLen = 8;
                                var bx = sp[0] + pr * Math.cos(sa);
                                var by = sp[1] - pr * Math.sin(sa);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(bx - bladeLen * Math.sin(sa), by - bladeLen * Math.cos(sa));
                                ctx.lineTo(bx + bladeLen * Math.sin(sa), by + bladeLen * Math.cos(sa));
                                ctx.stroke();
                            }

                            viz.drawDraggables();

                            viz.screenText(fl.name, viz.width / 2, 16, viz.colors.white, 14);
                            var curlStr = '(∇ × F)_z = ' + curlVal.toFixed(2);
                            var spinDir = curlVal > 0.01 ? ' (CCW)' : (curlVal < -0.01 ? ' (CW)' : ' (no spin)');
                            viz.screenText(curlStr + spinDir, viz.width / 2, viz.height - 12, viz.colors.teal, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\nabla \\times \\mathbf{F}\\) for \\(\\mathbf{F} = (yz,\\, xz,\\, xy)\\). What do you notice?',
                    hint: 'Use the determinant formula. Then check whether \\(\\mathbf{F} = \\nabla f\\) for some \\(f\\).',
                    solution: '\\((\\nabla \\times \\mathbf{F})_x = \\frac{\\partial(xy)}{\\partial y} - \\frac{\\partial(xz)}{\\partial z} = x - x = 0\\). Similarly all components vanish. So \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\). Indeed, \\(\\mathbf{F} = \\nabla(xyz)\\), confirming that the curl of a gradient is zero.'
                },
                {
                    question: 'Verify that \\(\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0\\) for \\(\\mathbf{F} = (x^2 y,\\, yz^2,\\, zx)\\).',
                    hint: 'First compute \\(\\nabla \\times \\mathbf{F}\\), then take its divergence.',
                    solution: '\\(\\nabla \\times \\mathbf{F} = (-2yz - 0, -(z - 0), (0 - x^2)) = (-2yz, -z, -x^2)\\) (correction: compute carefully). Actually: \\((\\nabla \\times \\mathbf{F})_x = \\partial(zx)/\\partial y - \\partial(yz^2)/\\partial z = 0 - 2yz = -2yz\\), \\((\\nabla \\times \\mathbf{F})_y = \\partial(x^2 y)/\\partial z - \\partial(zx)/\\partial x = 0 - z = -z\\), \\((\\nabla \\times \\mathbf{F})_z = \\partial(yz^2)/\\partial x - \\partial(x^2 y)/\\partial y = 0 - x^2 = -x^2\\). Then \\(\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = \\partial(-2yz)/\\partial x + \\partial(-z)/\\partial y + \\partial(-x^2)/\\partial z = 0 + 0 + 0 = 0\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Gauss's Theorem (Divergence Theorem)
        // ================================================================
        {
            id: 'sec-gauss',
            title: "Gauss's Theorem",
            content: `
<h2>Gauss's Theorem (The Divergence Theorem)</h2>

<div class="env-block intuition">
    <div class="env-title">Adding Up All the Sources</div>
    <div class="env-body">
        <p>If you know the divergence (source strength) at every point inside a volume, you can compute the total flux through the boundary surface by simply adding up all the sources. This is Gauss's theorem: it converts a volume integral of divergence into a surface integral of flux.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.4 (Gauss's Divergence Theorem)</div>
    <div class="env-body">
        <p>Let \\(V\\) be a compact region in \\(\\mathbb{R}^3\\) bounded by a closed surface \\(S = \\partial V\\), and let \\(\\mathbf{F}\\) be a continuously differentiable vector field. Then</p>
        \\[\\oint_S \\mathbf{F} \\cdot d\\mathbf{A} = \\int_V (\\nabla \\cdot \\mathbf{F})\\, dV,\\]
        <p>where \\(d\\mathbf{A} = \\hat{\\mathbf{n}}\\,dA\\) is the outward-pointing area element.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Divide \\(V\\) into infinitesimal boxes. For each box, the flux out of one face cancels the flux into the adjacent face of the neighboring box. The only surviving contributions come from the external boundary \\(S\\). Summing the divergence over all boxes gives the volume integral on the right; the uncanceled boundary fluxes give the surface integral on the left.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Applications in Physics</h3>

<div class="env-block example">
    <div class="env-title">Example: Gauss's Law (Electrostatics)</div>
    <div class="env-body">
        <p>Maxwell's first equation states \\(\\nabla \\cdot \\mathbf{E} = \\rho/\\varepsilon_0\\). Applying the divergence theorem to a closed surface \\(S\\) enclosing a charge \\(Q\\):</p>
        \\[\\oint_S \\mathbf{E} \\cdot d\\mathbf{A} = \\int_V \\frac{\\rho}{\\varepsilon_0}\\,dV = \\frac{Q}{\\varepsilon_0}.\\]
        <p>This is Gauss's law in integral form: the electric flux through any closed surface equals the enclosed charge divided by \\(\\varepsilon_0\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Continuity Equation</div>
    <div class="env-body">
        <p>For fluid of density \\(\\rho\\) and velocity \\(\\mathbf{v}\\), conservation of mass gives \\(\\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot (\\rho\\mathbf{v}) = 0\\). Integrating over a volume \\(V\\) and applying the divergence theorem:</p>
        \\[\\frac{d}{dt}\\int_V \\rho\\,dV = -\\oint_S \\rho\\mathbf{v} \\cdot d\\mathbf{A}.\\]
        <p>The rate of change of mass inside \\(V\\) equals the net mass flux inward through \\(S\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-gauss-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-gauss-theorem',
                    title: "Gauss's Theorem: Flux = Integral of Divergence",
                    description: 'A circular region (2D analogue) contains a source field. The flux through the boundary (green arrows on the circle) equals the integral of divergence inside. Resize the region to see how both sides of the theorem change together.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var radius = 2.0;
                        var sourceX = 0, sourceY = 0;

                        VizEngine.createSlider(controls, 'Radius', 0.5, 3.5, radius, 0.1, function(v) {
                            radius = v;
                            draw();
                        });

                        var srcDrag = viz.addDraggable('src', sourceX, sourceY, viz.colors.orange, 8, function(x, y) {
                            sourceX = x; sourceY = y;
                            draw();
                        });

                        function fieldFx(x, y) { return x - sourceX; }
                        function fieldFy(x, y) { return y - sourceY; }
                        function divF(x, y) { return 2; } // div of (x-sx, y-sy) = 2

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw the vector field
                            var step = 0.8;
                            for (var ax = -4; ax <= 4; ax += step) {
                                for (var ay = -3; ay <= 3; ay += step) {
                                    var fxx = fieldFx(ax, ay);
                                    var fyy = fieldFy(ax, ay);
                                    var mag = Math.sqrt(fxx * fxx + fyy * fyy);
                                    if (mag < 0.01) continue;
                                    var sc = Math.min(0.35, 0.25 * mag / (mag + 0.5));
                                    viz.drawVector(ax, ay, ax + fxx * sc / mag, ay + fyy * sc / mag, '#ffffff44', null, 0.8);
                                }
                            }

                            // Draw the boundary circle
                            viz.drawCircle(sourceX, sourceY, radius, null, viz.colors.teal, 2.5);

                            // Shade interior
                            var sp = viz.toScreen(sourceX, sourceY);
                            ctx.fillStyle = viz.colors.teal + '15';
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], radius * viz.scale, 0, Math.PI * 2);
                            ctx.fill();

                            // Draw flux arrows on boundary
                            var nArrows = 24;
                            var totalFlux = 0;
                            for (var i = 0; i < nArrows; i++) {
                                var theta = 2 * Math.PI * i / nArrows;
                                var bx = sourceX + radius * Math.cos(theta);
                                var by = sourceY + radius * Math.sin(theta);
                                var fx = fieldFx(bx, by);
                                var fy = fieldFy(bx, by);
                                // Normal is (cos theta, sin theta)
                                var fluxLocal = fx * Math.cos(theta) + fy * Math.sin(theta);
                                totalFlux += fluxLocal * (2 * Math.PI * radius / nArrows);

                                var arrowLen = 0.3 * Math.abs(fluxLocal) / (Math.abs(fluxLocal) + 0.5);
                                var col = fluxLocal > 0 ? viz.colors.green : viz.colors.red;
                                viz.drawVector(bx, by, bx + arrowLen * Math.cos(theta), by + arrowLen * Math.sin(theta), col, null, 2);
                            }

                            // Compute integral of divergence = 2 * pi * r^2
                            var divIntegral = 2 * Math.PI * radius * radius;

                            viz.drawDraggables();

                            viz.screenText("Gauss's Theorem (2D analogue)", viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText(
                                'Flux through boundary = ' + totalFlux.toFixed(2) +
                                '     ∫ div F dA = ' + divIntegral.toFixed(2),
                                viz.width / 2, viz.height - 12, viz.colors.teal, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the divergence theorem to evaluate \\(\\oint_S \\mathbf{r} \\cdot d\\mathbf{A}\\), where \\(S\\) is the surface of a sphere of radius \\(R\\) centered at the origin and \\(\\mathbf{r} = (x,y,z)\\).',
                    hint: '\\(\\nabla \\cdot \\mathbf{r} = 3\\). The volume of the sphere is \\(\\frac{4}{3}\\pi R^3\\).',
                    solution: '\\(\\oint_S \\mathbf{r} \\cdot d\\mathbf{A} = \\int_V \\nabla \\cdot \\mathbf{r}\\,dV = 3 \\int_V dV = 3 \\cdot \\frac{4}{3}\\pi R^3 = 4\\pi R^3\\). Check: directly, on the sphere \\(\\mathbf{r} \\cdot \\hat{\\mathbf{n}} = R\\), so the flux is \\(R \\cdot 4\\pi R^2 = 4\\pi R^3\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Let \\(\\mathbf{F} = (x^3, y^3, z^3)\\). Use the divergence theorem to compute the flux of \\(\\mathbf{F}\\) through the surface of the unit cube \\([0,1]^3\\).',
                    hint: '\\(\\nabla \\cdot \\mathbf{F} = 3x^2 + 3y^2 + 3z^2\\). Integrate over the unit cube.',
                    solution: '\\(\\nabla \\cdot \\mathbf{F} = 3(x^2 + y^2 + z^2)\\). Then \\(\\int_0^1\\int_0^1\\int_0^1 3(x^2+y^2+z^2)\\,dx\\,dy\\,dz = 3 \\cdot 3 \\cdot \\frac{1}{3} = 3\\). (Each integral \\(\\int_0^1 x^2\\,dx = 1/3\\), and by symmetry the three terms each contribute \\(3 \\cdot 1/3 = 1\\).)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Stokes's Theorem
        // ================================================================
        {
            id: 'sec-stokes',
            title: "Stokes's Theorem",
            content: `
<h2>Stokes's Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Adding Up All the Vortices</div>
    <div class="env-body">
        <p>Stokes's theorem is the curl analogue of Gauss's theorem. Instead of relating flux to divergence, it relates <strong>circulation</strong> (the line integral of \\(\\mathbf{F}\\) around a closed loop) to the <strong>surface integral of the curl</strong>. If you tile a surface with tiny loops, the internal edges cancel, leaving only the boundary circulation. The curl at each tiny loop measures the local circulation per unit area.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.5 (Stokes's Theorem)</div>
    <div class="env-body">
        <p>Let \\(S\\) be an oriented surface in \\(\\mathbb{R}^3\\) bounded by a closed curve \\(C = \\partial S\\) (oriented by the right-hand rule relative to \\(\\hat{\\mathbf{n}}\\)). If \\(\\mathbf{F}\\) is continuously differentiable, then</p>
        \\[\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{A}.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Subdivide \\(S\\) into tiny patches. For each patch, the line integral around its boundary is approximately \\((\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}}\\,\\Delta A\\). When we sum over all patches, the internal edges cancel (each edge is traversed in opposite directions by adjacent patches). The surviving boundary gives \\(\\oint_C \\mathbf{F} \\cdot d\\mathbf{r}\\); the sum of curl contributions gives \\(\\int_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{A}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Important Corollary: Conservative Fields</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 0.6 (Conservative Fields and Path Independence)</div>
    <div class="env-body">
        <p>If \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\) everywhere in a simply connected domain, then:</p>
        <ol>
            <li>\\(\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 0\\) for every closed curve \\(C\\).</li>
            <li>\\(\\mathbf{F} = \\nabla f\\) for some scalar potential \\(f\\).</li>
            <li>\\(\\int_A^B \\mathbf{F} \\cdot d\\mathbf{r} = f(B) - f(A)\\) (path independence).</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Faraday's Law</div>
    <div class="env-body">
        <p>Maxwell's third equation states \\(\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}\\). Applying Stokes's theorem:</p>
        \\[\\oint_C \\mathbf{E} \\cdot d\\mathbf{r} = -\\frac{d}{dt}\\int_S \\mathbf{B} \\cdot d\\mathbf{A} = -\\frac{d\\Phi_B}{dt}.\\]
        <p>This is Faraday's law of induction: the EMF around a loop equals the negative rate of change of magnetic flux through the loop.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-stokes-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-stokes-theorem',
                    title: "Stokes's Theorem: Circulation = Surface Integral of Curl",
                    description: 'A closed curve (boundary) encloses a surface. The circulation around the boundary (line integral) equals the integral of the curl over the surface. Adjust the loop size to see both sides change together.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var loopRadius = 2.0;
                        var fieldChoice = 0;
                        var fields = [
                            {
                                name: 'F = (-y, x) [curl = 2]',
                                fx: function(x,y){return -y;}, fy: function(x,y){return x;},
                                curlz: function(x,y){return 2;}
                            },
                            {
                                name: 'F = (y², -x²) [curl = -2x-2y]',
                                fx: function(x,y){return y*y;}, fy: function(x,y){return -x*x;},
                                curlz: function(x,y){return -2*x - 2*y;}
                            },
                            {
                                name: 'F = (x, y) [curl = 0]',
                                fx: function(x,y){return x;}, fy: function(x,y){return y;},
                                curlz: function(x,y){return 0;}
                            }
                        ];

                        VizEngine.createSlider(controls, 'Loop radius', 0.5, 3.5, loopRadius, 0.1, function(v) {
                            loopRadius = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Field', 0, 2, fieldChoice, 1, function(v) {
                            fieldChoice = Math.round(v);
                            draw();
                        });

                        function draw() {
                            var fl = fields[fieldChoice];
                            var ctx = viz.ctx;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw vector field
                            var step = 0.8;
                            for (var ax = -4; ax <= 4; ax += step) {
                                for (var ay = -3; ay <= 3; ay += step) {
                                    var fxx = fl.fx(ax, ay);
                                    var fyy = fl.fy(ax, ay);
                                    var mag = Math.sqrt(fxx * fxx + fyy * fyy);
                                    if (mag < 0.01) continue;
                                    var sc = Math.min(0.35, 0.25 * mag / (mag + 0.5));
                                    viz.drawVector(ax, ay, ax + fxx * sc / mag, ay + fyy * sc / mag, '#ffffff44', null, 0.8);
                                }
                            }

                            // Draw surface (filled circle) and boundary
                            var sp = viz.toScreen(0, 0);
                            ctx.fillStyle = viz.colors.purple + '20';
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], loopRadius * viz.scale, 0, Math.PI * 2);
                            ctx.fill();

                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], loopRadius * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw circulation arrows on boundary
                            var nArrows = 20;
                            var circTotal = 0;
                            for (var i = 0; i < nArrows; i++) {
                                var theta = 2 * Math.PI * i / nArrows;
                                var bx = loopRadius * Math.cos(theta);
                                var by = loopRadius * Math.sin(theta);
                                var fx = fl.fx(bx, by);
                                var fy = fl.fy(bx, by);
                                // Tangent vector (CCW): (-sin theta, cos theta)
                                var dot = fx * (-Math.sin(theta)) + fy * Math.cos(theta);
                                circTotal += dot * (2 * Math.PI * loopRadius / nArrows);

                                // Draw small tangent arrow
                                var arrowLen = 0.25 * Math.abs(dot) / (Math.abs(dot) + 0.3);
                                var col = dot > 0 ? viz.colors.green : viz.colors.red;
                                var tx = -Math.sin(theta) * arrowLen * Math.sign(dot);
                                var ty = Math.cos(theta) * arrowLen * Math.sign(dot);
                                viz.drawVector(bx, by, bx + tx, by + ty, col, null, 1.5);
                            }

                            // Compute surface integral of curl (numerical)
                            var curlIntegral = 0;
                            var nSteps = 40;
                            var da = (2 * loopRadius / nSteps);
                            for (var ix = 0; ix < nSteps; ix++) {
                                for (var iy = 0; iy < nSteps; iy++) {
                                    var gx = -loopRadius + (ix + 0.5) * da;
                                    var gy = -loopRadius + (iy + 0.5) * da;
                                    if (gx * gx + gy * gy > loopRadius * loopRadius) continue;
                                    curlIntegral += fl.curlz(gx, gy) * da * da;
                                }
                            }

                            // Direction arrow on boundary
                            var arrowTheta = Math.PI / 4;
                            var arrowBx = loopRadius * Math.cos(arrowTheta);
                            var arrowBy = loopRadius * Math.sin(arrowTheta);
                            viz.drawVector(arrowBx, arrowBy,
                                arrowBx - 0.3 * Math.sin(arrowTheta),
                                arrowBy + 0.3 * Math.cos(arrowTheta),
                                viz.colors.purple, null, 2.5);

                            viz.screenText(fl.name, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText(
                                '∮ F·dr = ' + circTotal.toFixed(2) +
                                '     ∫∫ (∇×F)·dA = ' + curlIntegral.toFixed(2),
                                viz.width / 2, viz.height - 12, viz.colors.purple, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Stokes\'s theorem to evaluate \\(\\oint_C \\mathbf{F} \\cdot d\\mathbf{r}\\) where \\(\\mathbf{F} = (-y^2, x, z^2)\\) and \\(C\\) is the circle \\(x^2 + y^2 = 4\\) in the plane \\(z = 0\\), oriented counterclockwise.',
                    hint: 'Compute \\(\\nabla \\times \\mathbf{F}\\) and integrate its \\(z\\)-component over the disk \\(x^2 + y^2 \\leq 4\\).',
                    solution: '\\(\\nabla \\times \\mathbf{F} = (0 - 0, 0 - 0, 1 - (-2y)) = (0, 0, 1 + 2y)\\). The surface is the disk in the \\(z=0\\) plane, so \\(\\hat{\\mathbf{n}} = \\hat{\\mathbf{z}}\\). \\(\\int_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{A} = \\int_S (1 + 2y)\\,dA\\). By symmetry, \\(\\int_S 2y\\,dA = 0\\). So the answer is \\(\\int_S 1\\,dA = \\pi \\cdot 4 = 4\\pi\\).'
                },
                {
                    question: 'Explain why Stokes\'s theorem implies that if \\(\\mathbf{F} = \\nabla f\\), then \\(\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 0\\) for any closed curve \\(C\\).',
                    hint: 'What is \\(\\nabla \\times (\\nabla f)\\)?',
                    solution: 'We showed that \\(\\nabla \\times (\\nabla f) = \\mathbf{0}\\). By Stokes\'s theorem, \\(\\oint_C \\nabla f \\cdot d\\mathbf{r} = \\int_S \\mathbf{0} \\cdot d\\mathbf{A} = 0\\). Conservative forces do zero net work around any closed loop.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Curvilinear Coordinates
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: Beyond Cartesian Coordinates</h2>

<p>Everything in this chapter was written in Cartesian coordinates \\((x, y, z)\\). But many physical problems have symmetries that make Cartesian coordinates awkward. A hydrogen atom is spherically symmetric; a coaxial cable is cylindrically symmetric. In such cases, using Cartesian coordinates throws away the symmetry and makes the mathematics unnecessarily complicated.</p>

<div class="env-block intuition">
    <div class="env-title">The Challenge of Curvilinear Coordinates</div>
    <div class="env-body">
        <p>In Cartesian coordinates, the gradient is simply \\(\\nabla f = (\\partial_x f, \\partial_y f, \\partial_z f)\\). But in spherical coordinates \\((r, \\theta, \\phi)\\), the gradient becomes</p>
        \\[\\nabla f = \\frac{\\partial f}{\\partial r}\\hat{\\mathbf{r}} + \\frac{1}{r}\\frac{\\partial f}{\\partial \\theta}\\hat{\\boldsymbol{\\theta}} + \\frac{1}{r\\sin\\theta}\\frac{\\partial f}{\\partial \\phi}\\hat{\\boldsymbol{\\phi}}.\\]
        <p>Where do the factors of \\(1/r\\) and \\(1/(r\\sin\\theta)\\) come from? The next chapter answers this question by developing the theory of curvilinear coordinates and metric tensors.</p>
    </div>
</div>

<h3>The Laplacian: \\(\\nabla^2 f\\)</h3>

<p>Combining the gradient and divergence gives the <strong>Laplacian</strong>:</p>

\\[
\\nabla^2 f = \\nabla \\cdot (\\nabla f) = \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2} + \\frac{\\partial^2 f}{\\partial z^2}.
\\]

<p>The Laplacian appears in virtually every equation of mathematical physics:</p>

<table class="env-table" style="width:100%; margin:1em 0;">
<tr><th>Equation</th><th>Form</th><th>Domain</th></tr>
<tr><td>Laplace's equation</td><td>\\(\\nabla^2 \\phi = 0\\)</td><td>Electrostatics, gravity</td></tr>
<tr><td>Poisson's equation</td><td>\\(\\nabla^2 \\phi = -\\rho/\\varepsilon_0\\)</td><td>Electrostatics with sources</td></tr>
<tr><td>Heat equation</td><td>\\(\\partial_t u = \\alpha\\nabla^2 u\\)</td><td>Diffusion, thermal conduction</td></tr>
<tr><td>Wave equation</td><td>\\(\\partial_{tt} u = c^2 \\nabla^2 u\\)</td><td>Acoustics, electrodynamics</td></tr>
<tr><td>Schrodinger equation</td><td>\\(i\\hbar \\partial_t \\Psi = -\\frac{\\hbar^2}{2m}\\nabla^2 \\Psi + V\\Psi\\)</td><td>Quantum mechanics</td></tr>
</table>

<div class="viz-placeholder" data-viz="viz-vector-identities"></div>

<div class="viz-placeholder" data-viz="viz-laplacian"></div>

<h3>Summary of Vector Calculus Identities</h3>

<p>For reference, here are the key identities established in this chapter, plus a few more that are proved in the exercises:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.7 (Vector Calculus Identity Sheet)</div>
    <div class="env-body">
        <ol>
            <li>\\(\\nabla(fg) = f\\nabla g + g\\nabla f\\)</li>
            <li>\\(\\nabla \\cdot (f\\mathbf{F}) = f(\\nabla \\cdot \\mathbf{F}) + \\mathbf{F} \\cdot \\nabla f\\)</li>
            <li>\\(\\nabla \\times (f\\mathbf{F}) = f(\\nabla \\times \\mathbf{F}) + (\\nabla f) \\times \\mathbf{F}\\)</li>
            <li>\\(\\nabla \\times (\\nabla f) = \\mathbf{0}\\)</li>
            <li>\\(\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0\\)</li>
            <li>\\(\\nabla \\times (\\nabla \\times \\mathbf{F}) = \\nabla(\\nabla \\cdot \\mathbf{F}) - \\nabla^2 \\mathbf{F}\\) (BAC-CAB rule)</li>
            <li>\\(\\nabla \\cdot (\\mathbf{A} \\times \\mathbf{B}) = \\mathbf{B} \\cdot (\\nabla \\times \\mathbf{A}) - \\mathbf{A} \\cdot (\\nabla \\times \\mathbf{B})\\)</li>
        </ol>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">What Comes Next</div>
    <div class="env-body">
        <p>In Chapter 1, we develop general curvilinear coordinates and derive the expressions for gradient, divergence, curl, and Laplacian in spherical and cylindrical coordinates. In Chapter 2, we meet tensors, which provide a coordinate-free language for these operations. The integral theorems of this chapter will reappear in more general form throughout the course.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-vector-identities',
                    title: 'Vector Calculus Identity Gallery',
                    description: 'A visual reference for the key vector calculus identities. Each identity is displayed with its name and physical interpretation. Click through the gallery to review them all.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var identities = [
                            {
                                name: 'Curl of Gradient = 0',
                                formula: '∇ × (∇f) = 0',
                                meaning: 'Conservative forces have no rotation. If F = ∇f, there are no closed-loop vortices.',
                                color: '#58a6ff'
                            },
                            {
                                name: 'Divergence of Curl = 0',
                                formula: '∇ · (∇ × F) = 0',
                                meaning: 'Magnetic field lines never begin or end. The curl field is always solenoidal (source-free).',
                                color: '#3fb9a0'
                            },
                            {
                                name: 'BAC-CAB Rule',
                                formula: '∇ × (∇ × F) = ∇(∇ · F) - ∇²F',
                                meaning: 'Connects curl-of-curl to the Laplacian. Essential for deriving the electromagnetic wave equation.',
                                color: '#f0883e'
                            },
                            {
                                name: 'Product Rule (Divergence)',
                                formula: '∇ · (fF) = f(∇ · F) + F · ∇f',
                                meaning: 'Scaling a field by a scalar changes its divergence by two contributions: how F spreads and how f varies along F.',
                                color: '#bc8cff'
                            },
                            {
                                name: 'Product Rule (Curl)',
                                formula: '∇ × (fF) = f(∇ × F) + (∇f) × F',
                                meaning: 'Scaling a field by a scalar changes its curl by two contributions: the existing rotation scaled, plus a new rotation from the gradient of the scalar.',
                                color: '#3fb950'
                            },
                            {
                                name: "Gauss's Theorem",
                                formula: '∮_S F · dA = ∫_V (∇ · F) dV',
                                meaning: 'Total outward flux through a closed surface = integral of divergence over the enclosed volume.',
                                color: '#f85149'
                            },
                            {
                                name: "Stokes's Theorem",
                                formula: '∮_C F · dr = ∫_S (∇ × F) · dA',
                                meaning: 'Circulation around a closed loop = integral of curl over any surface bounded by the loop.',
                                color: '#d29922'
                            }
                        ];

                        var currentIdx = 0;

                        VizEngine.createButton(controls, '← Prev', function() {
                            currentIdx = (currentIdx - 1 + identities.length) % identities.length;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Next →', function() {
                            currentIdx = (currentIdx + 1) % identities.length;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var id = identities[currentIdx];

                            // Card background
                            ctx.fillStyle = '#111133';
                            ctx.strokeStyle = id.color;
                            ctx.lineWidth = 2;
                            var margin = 30;
                            var cardX = margin, cardY = 30;
                            var cardW = viz.width - 2 * margin, cardH = viz.height - 60;
                            ctx.beginPath();
                            ctx.roundRect(cardX, cardY, cardW, cardH, 12);
                            ctx.fill();
                            ctx.stroke();

                            // Identity number
                            viz.screenText((currentIdx + 1) + ' / ' + identities.length, viz.width / 2, 18, viz.colors.text, 11);

                            // Name
                            ctx.fillStyle = id.color;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(id.name, viz.width / 2, 80);

                            // Formula (large)
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.fillText(id.formula, viz.width / 2, 150);

                            // Meaning
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            // Word wrap
                            var words = id.meaning.split(' ');
                            var lines = [];
                            var line = '';
                            var maxW = cardW - 60;
                            for (var w = 0; w < words.length; w++) {
                                var test = line + (line ? ' ' : '') + words[w];
                                if (ctx.measureText(test).width > maxW && line) {
                                    lines.push(line);
                                    line = words[w];
                                } else {
                                    line = test;
                                }
                            }
                            if (line) lines.push(line);
                            for (var li = 0; li < lines.length; li++) {
                                ctx.fillText(lines[li], viz.width / 2, 210 + li * 22);
                            }

                            // Decorative element: colored bar
                            ctx.fillStyle = id.color + '44';
                            ctx.fillRect(cardX + 20, cardH + cardY - 30, cardW - 40, 4);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-laplacian',
                    title: 'The Laplacian and the Heat Equation',
                    description: 'The Laplacian measures how a function differs from its local average. This visualization shows a temperature distribution evolving under the heat equation: hot spots cool down (negative Laplacian), cold spots warm up (positive Laplacian).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        // 1D heat equation simulation
                        var N = 200;
                        var u = new Float64Array(N);
                        var uNew = new Float64Array(N);
                        var dx = 1.0 / N;
                        var alpha = 0.4; // dt/dx^2 ratio (stability: < 0.5)
                        var paused = false;

                        // Initial condition: two Gaussian bumps
                        function resetIC() {
                            for (var i = 0; i < N; i++) {
                                var x = i / N;
                                u[i] = 1.5 * Math.exp(-((x - 0.3) * (x - 0.3)) * 200) +
                                       1.0 * Math.exp(-((x - 0.7) * (x - 0.7)) * 300);
                            }
                        }
                        resetIC();

                        VizEngine.createButton(controls, 'Reset', function() {
                            resetIC();
                        });
                        VizEngine.createButton(controls, 'Pause/Play', function() {
                            paused = !paused;
                        });

                        var stepsPerFrame = 3;

                        viz.animate(function(t) {
                            var ctx = viz.ctx;
                            viz.clear();

                            // Time-step the heat equation
                            if (!paused) {
                                for (var s = 0; s < stepsPerFrame; s++) {
                                    for (var i = 1; i < N - 1; i++) {
                                        uNew[i] = u[i] + alpha * (u[i+1] - 2 * u[i] + u[i-1]);
                                    }
                                    uNew[0] = 0; uNew[N-1] = 0; // Dirichlet BCs
                                    var tmp = u; u = uNew; uNew = tmp;
                                }
                            }

                            // Draw axes
                            var chartL = 50, chartR = viz.width - 30;
                            var chartT = 50, chartB = viz.height - 60;
                            var chartW = chartR - chartL, chartH = chartB - chartT;

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(chartL, chartB);
                            ctx.lineTo(chartR, chartB);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(chartL, chartT);
                            ctx.lineTo(chartL, chartB);
                            ctx.stroke();

                            // Labels
                            viz.screenText('u(x, t)', chartL - 5, chartT - 15, viz.colors.white, 13, 'center');
                            viz.screenText('x', chartR + 10, chartB + 5, viz.colors.text, 12, 'center');
                            viz.screenText('0', chartL - 15, chartB + 2, viz.colors.text, 10, 'center');
                            viz.screenText('1', chartR, chartB + 15, viz.colors.text, 10, 'center');

                            // Compute Laplacian for coloring
                            var laplacian = new Float64Array(N);
                            for (var i2 = 1; i2 < N - 1; i2++) {
                                laplacian[i2] = (u[i2+1] - 2 * u[i2] + u[i2-1]) / (dx * dx);
                            }

                            // Find max for scaling
                            var uMax = 0.01;
                            for (var i3 = 0; i3 < N; i3++) uMax = Math.max(uMax, Math.abs(u[i3]));

                            // Draw colored bars showing Laplacian sign
                            for (var i4 = 0; i4 < N; i4++) {
                                var xp = chartL + (i4 / N) * chartW;
                                var barW = chartW / N + 1;
                                var lap = laplacian[i4];
                                var intensity = Math.min(1, Math.abs(lap) / (uMax * 50 + 1));
                                if (lap > 0) {
                                    ctx.fillStyle = 'rgba(248,81,73,' + (intensity * 0.3).toFixed(2) + ')';
                                } else {
                                    ctx.fillStyle = 'rgba(56,166,255,' + (intensity * 0.3).toFixed(2) + ')';
                                }
                                ctx.fillRect(xp, chartT, barW, chartH);
                            }

                            // Draw temperature curve
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i5 = 0; i5 < N; i5++) {
                                var xp2 = chartL + (i5 / N) * chartW;
                                var yp = chartB - (u[i5] / (uMax * 1.3)) * chartH;
                                if (i5 === 0) ctx.moveTo(xp2, yp);
                                else ctx.lineTo(xp2, yp);
                            }
                            ctx.stroke();

                            // Draw Laplacian curve (scaled)
                            var lapMax = 0.01;
                            for (var i6 = 0; i6 < N; i6++) lapMax = Math.max(lapMax, Math.abs(laplacian[i6]));
                            ctx.strokeStyle = viz.colors.orange + 'aa';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            var lapMid = (chartT + chartB) / 2;
                            for (var i7 = 1; i7 < N - 1; i7++) {
                                var xp3 = chartL + (i7 / N) * chartW;
                                var yp2 = lapMid - (laplacian[i7] / (lapMax * 1.3)) * (chartH * 0.3);
                                if (i7 === 1) ctx.moveTo(xp3, yp2);
                                else ctx.lineTo(xp3, yp2);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('Heat Equation: ∂u/∂t = α∇²u', viz.width / 2, 20, viz.colors.white, 15);
                            viz.screenText('White: u(x,t)     Orange dashed: ∇²u     Red bg: ∇²u > 0 (warming)     Blue bg: ∇²u < 0 (cooling)', viz.width / 2, viz.height - 15, viz.colors.text, 10);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Laplacian \\(\\nabla^2 f\\) for \\(f = e^{-r^2}\\) where \\(r^2 = x^2 + y^2 + z^2\\). Show that \\(\\nabla^2 f = (4r^2 - 6)e^{-r^2}\\).',
                    hint: 'Use the chain rule: \\(\\partial f/\\partial x = -2xe^{-r^2}\\), then take the second derivative.',
                    solution: '\\(\\partial f/\\partial x = -2xe^{-r^2}\\). \\(\\partial^2 f/\\partial x^2 = (-2 + 4x^2)e^{-r^2}\\). By symmetry in \\(y\\) and \\(z\\): \\(\\nabla^2 f = (-2+4x^2) + (-2+4y^2) + (-2+4z^2))e^{-r^2} = (4r^2 - 6)e^{-r^2}\\).'
                },
                {
                    question: 'Derive the BAC-CAB identity \\(\\nabla \\times (\\nabla \\times \\mathbf{F}) = \\nabla(\\nabla \\cdot \\mathbf{F}) - \\nabla^2 \\mathbf{F}\\) by computing the \\(x\\)-component of both sides.',
                    hint: 'Let \\(\\mathbf{F} = (F_x, F_y, F_z)\\). The \\(x\\)-component of \\(\\nabla \\times (\\nabla \\times \\mathbf{F})\\) involves second partial derivatives of \\(F_x, F_y, F_z\\). Rearrange to get the \\(x\\)-component of \\(\\nabla(\\nabla \\cdot \\mathbf{F}) - \\nabla^2 \\mathbf{F}\\).',
                    solution: '\\((\\nabla \\times \\mathbf{F})_y = \\partial_x F_z - \\partial_z F_x\\), \\((\\nabla \\times \\mathbf{F})_z = \\partial_y F_x - \\partial_x F_y\\). The \\(x\\)-component of \\(\\nabla \\times (\\nabla \\times \\mathbf{F})\\) is \\(\\partial_y(\\partial_y F_x - \\partial_x F_y) - \\partial_z(\\partial_x F_z - \\partial_z F_x) = \\partial_y^2 F_x + \\partial_z^2 F_x - \\partial_x \\partial_y F_y - \\partial_x \\partial_z F_z\\). Add and subtract \\(\\partial_x^2 F_x\\): \\(= \\partial_x(\\partial_x F_x + \\partial_y F_y + \\partial_z F_z) - (\\partial_x^2 + \\partial_y^2 + \\partial_z^2) F_x = [\\nabla(\\nabla \\cdot \\mathbf{F})]_x - (\\nabla^2 \\mathbf{F})_x\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Show that if \\(\\nabla^2 f = 0\\) (\\(f\\) is harmonic), then the average value of \\(f\\) on any sphere equals \\(f\\) at the center. (Hint: use the divergence theorem.)',
                    hint: 'Consider \\(\\oint_S \\nabla f \\cdot d\\mathbf{A} = \\int_V \\nabla^2 f\\,dV = 0\\). The average value theorem for harmonic functions follows from this.',
                    solution: 'By the divergence theorem, \\(\\oint_S \\nabla f \\cdot \\hat{\\mathbf{n}}\\,dA = \\int_V \\nabla^2 f\\,dV = 0\\). This says the normal derivative of \\(f\\) averages to zero on any sphere. Now consider \\(g(R) = \\frac{1}{4\\pi R^2}\\oint_{|\\mathbf{r}|=R} f\\,dA\\), the average of \\(f\\) on a sphere of radius \\(R\\). Differentiating with respect to \\(R\\) and using \\(\\partial f/\\partial n = \\partial f/\\partial r\\), one shows \\(g\'(R) = \\frac{1}{4\\pi R^2}\\oint \\frac{\\partial f}{\\partial r}\\,dA = \\frac{1}{4\\pi R^2} \\int_V \\nabla^2 f\\,dV = 0\\). So \\(g(R)\\) is constant, and \\(\\lim_{R \\to 0} g(R) = f(\\mathbf{0})\\).'
                },
                {
                    question: 'Prove identity (6) from the identity sheet: \\(\\nabla \\times (f\\mathbf{F}) = f(\\nabla \\times \\mathbf{F}) + (\\nabla f) \\times \\mathbf{F}\\).',
                    hint: 'Compute the \\(x\\)-component of \\(\\nabla \\times (f\\mathbf{F})\\) using the product rule for partial derivatives.',
                    solution: 'The \\(x\\)-component of \\(\\nabla \\times (f\\mathbf{F})\\) is \\(\\partial_y(fF_z) - \\partial_z(fF_y) = f\\partial_y F_z + F_z \\partial_y f - f\\partial_z F_y - F_y \\partial_z f\\). This equals \\(f(\\partial_y F_z - \\partial_z F_y) + (\\partial_y f \\cdot F_z - \\partial_z f \\cdot F_y) = f(\\nabla \\times \\mathbf{F})_x + [(\\nabla f) \\times \\mathbf{F}]_x\\). Repeat for \\(y\\)- and \\(z\\)-components. \\(\\checkmark\\)'
                }
            ]
        }
    ]
});
