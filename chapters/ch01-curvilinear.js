window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Curvilinear Coordinates',
    subtitle: 'Cylindrical, spherical, and beyond',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Leave Cartesian Coordinates?</h2>

<div class="env-block intuition">
    <div class="env-title">The Shape of the Problem</div>
    <div class="env-body">
        <p>Consider solving Laplace's equation \\(\\nabla^2 \\phi = 0\\) inside a sphere. In Cartesian coordinates, the boundary \\(x^2 + y^2 + z^2 = R^2\\) is a complicated constraint coupling all three variables. In spherical coordinates, the same boundary is simply \\(r = R\\), a constant surface in one coordinate. The equation separates, and the solution falls out as a product of radial and angular functions.</p>
        <p>This is the core lesson: <strong>the right coordinate system turns a hard problem into a tractable one.</strong></p>
    </div>
</div>

<p>Cartesian coordinates \\((x, y, z)\\) are universal but rarely natural. Physical systems have symmetries: pipes are cylindrical, planets are spherical, waveguides may be elliptical. When the geometry of the problem matches the geometry of the coordinate system, boundary conditions simplify, differential equations separate, and solutions become expressible in closed form.</p>

<h3>What Changes, What Stays</h3>

<p>The physical laws (Maxwell's equations, the heat equation, Schrodinger's equation) do not change when we switch coordinates. The gradient, divergence, curl, and Laplacian are coordinate-independent differential operators. But their <em>expressions</em> in terms of coordinate derivatives change, sometimes dramatically. The purpose of this chapter is to develop the general machinery for writing these operators in any orthogonal curvilinear coordinate system.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Coordinate System)</div>
    <div class="env-body">
        <p>A <strong>coordinate system</strong> in \\(\\mathbb{R}^3\\) is a smooth, invertible map</p>
        \\[(q_1, q_2, q_3) \\mapsto (x, y, z) = \\bigl(x(q_1, q_2, q_3),\\; y(q_1, q_2, q_3),\\; z(q_1, q_2, q_3)\\bigr)\\]
        <p>defined on some open region. The surfaces \\(q_i = \\text{const}\\) are called <strong>coordinate surfaces</strong>, and the curves along which only one \\(q_i\\) varies are <strong>coordinate curves</strong>.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Why Spherical Wins</div>
    <div class="env-body">
        <p>The gravitational potential of a point mass at the origin is \\(\\phi = -GM/r\\). In Cartesian coordinates, this is \\(\\phi = -GM/\\sqrt{x^2+y^2+z^2}\\). Computing \\(\\nabla^2 \\phi\\) in Cartesian requires differentiating through the square root twice in each variable, a painful exercise. In spherical coordinates, \\(\\phi = \\phi(r)\\) depends only on \\(r\\), and the spherical Laplacian reduces to \\(\\frac{1}{r^2}\\frac{d}{dr}\\bigl(r^2 \\frac{d\\phi}{dr}\\bigr) = 0\\), which is immediate.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">A Recurring Theme</div>
    <div class="env-body">
        <p>Throughout mathematical physics, the choice of coordinate system is not just a convenience but a strategic decision. Separation of variables (Chapter 17) succeeds only in coordinate systems where the differential equation <em>separates</em>, and each such system corresponds to a specific family of special functions (Chapters 11, 12). Curvilinear coordinates are the thread connecting geometry to analysis.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: General Curvilinear Coordinates
        // ================================================================
        {
            id: 'sec-general',
            title: 'General Curvilinear Coordinates',
            content: `
<h2>General Curvilinear Coordinates</h2>

<div class="env-block intuition">
    <div class="env-title">Scale Factors: The Heartbeat of Curvilinear Geometry</div>
    <div class="env-body">
        <p>In Cartesian coordinates, moving \\(dx\\) in the \\(x\\)-direction changes your position by a distance \\(dx\\). In polar coordinates, moving \\(d\\theta\\) in the \\(\\theta\\)-direction at radius \\(r\\) changes your position by \\(r\\,d\\theta\\), not just \\(d\\theta\\). The factor \\(r\\) is the <strong>scale factor</strong> for the \\(\\theta\\) coordinate. Scale factors encode how much physical distance corresponds to a unit change in each coordinate.</p>
    </div>
</div>

<h3>Scale Factors and the Metric</h3>

<p>Given a coordinate transformation \\((q_1, q_2, q_3) \\to (x, y, z)\\), define the position vector \\(\\mathbf{r} = x\\,\\hat{\\mathbf{x}} + y\\,\\hat{\\mathbf{y}} + z\\,\\hat{\\mathbf{z}}\\). The tangent vector along the \\(q_i\\)-curve is</p>

\\[\\frac{\\partial \\mathbf{r}}{\\partial q_i} = \\frac{\\partial x}{\\partial q_i}\\hat{\\mathbf{x}} + \\frac{\\partial y}{\\partial q_i}\\hat{\\mathbf{y}} + \\frac{\\partial z}{\\partial q_i}\\hat{\\mathbf{z}}.\\]

<div class="env-block definition">
    <div class="env-title">Definition (Scale Factors)</div>
    <div class="env-body">
        <p>The <strong>scale factor</strong> (or metric coefficient) for the coordinate \\(q_i\\) is</p>
        \\[h_i = \\left|\\frac{\\partial \\mathbf{r}}{\\partial q_i}\\right| = \\sqrt{\\left(\\frac{\\partial x}{\\partial q_i}\\right)^2 + \\left(\\frac{\\partial y}{\\partial q_i}\\right)^2 + \\left(\\frac{\\partial z}{\\partial q_i}\\right)^2}.\\]
        <p>The unit tangent vector along the \\(q_i\\)-curve is \\(\\hat{\\mathbf{e}}_i = \\frac{1}{h_i}\\frac{\\partial \\mathbf{r}}{\\partial q_i}\\).</p>
    </div>
</div>

<p>The infinitesimal displacement vector is</p>
\\[d\\mathbf{r} = \\sum_i \\frac{\\partial \\mathbf{r}}{\\partial q_i} dq_i = \\sum_i h_i\\, dq_i\\, \\hat{\\mathbf{e}}_i.\\]

<h3>Orthogonal Coordinates and the Metric Tensor</h3>

<p>We restrict to <strong>orthogonal</strong> coordinate systems, where the coordinate curves are mutually perpendicular at every point: \\(\\hat{\\mathbf{e}}_i \\cdot \\hat{\\mathbf{e}}_j = \\delta_{ij}\\). Most coordinate systems of physical interest (cylindrical, spherical, ellipsoidal, paraboloidal, etc.) are orthogonal.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Metric Tensor for Orthogonal Coordinates)</div>
    <div class="env-body">
        <p>For an orthogonal curvilinear system, the metric tensor is diagonal:</p>
        \\[g_{ij} = h_i^2 \\,\\delta_{ij}, \\qquad ds^2 = h_1^2\\,dq_1^2 + h_2^2\\,dq_2^2 + h_3^2\\,dq_3^2.\\]
        <p>The arc length element \\(ds\\) encodes all the geometry. Every differential operator can be expressed in terms of \\(h_1, h_2, h_3\\) and their derivatives.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.1 (Characterization via Scale Factors)</div>
    <div class="env-body">
        <p>In an orthogonal curvilinear system \\((q_1, q_2, q_3)\\) with scale factors \\(h_1, h_2, h_3\\):</p>
        <ul>
            <li><strong>Line element:</strong> \\(d\\ell_i = h_i\\, dq_i\\)</li>
            <li><strong>Area elements:</strong> \\(dA_{ij} = h_i h_j\\, dq_i\\, dq_j\\) (on the surface \\(q_k = \\text{const}\\))</li>
            <li><strong>Volume element:</strong> \\(dV = h_1 h_2 h_3\\, dq_1\\, dq_2\\, dq_3\\)</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Scale Factors for Cylindrical Coordinates</div>
    <div class="env-body">
        <p>Cylindrical: \\(x = \\rho\\cos\\phi,\\; y = \\rho\\sin\\phi,\\; z = z\\). Compute:</p>
        \\[h_\\rho = \\sqrt{\\cos^2\\phi + \\sin^2\\phi + 0} = 1, \\quad h_\\phi = \\sqrt{(-\\rho\\sin\\phi)^2 + (\\rho\\cos\\phi)^2} = \\rho, \\quad h_z = 1.\\]
        <p>So \\(ds^2 = d\\rho^2 + \\rho^2 d\\phi^2 + dz^2\\) and \\(dV = \\rho\\, d\\rho\\, d\\phi\\, dz\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-scale-factors"></div>
`,
            visualizations: [
                {
                    id: 'viz-scale-factors',
                    title: 'Scale Factors Visualized',
                    description: 'See how the scale factors \\(h_1, h_2, h_3\\) control the physical size of coordinate increments. Drag the point to different locations and observe how the local basis vectors stretch or shrink.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var coordType = 'cylindrical';
                        var btn1 = VizEngine.createButton(controls, 'Cylindrical', function() { coordType = 'cylindrical'; draw(); });
                        var btn2 = VizEngine.createButton(controls, 'Spherical', function() { coordType = 'spherical'; draw(); });

                        var pt = viz.addDraggable('pt', 2.0, 1.5, viz.colors.white, 8, function() { draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var px = pt.x, py = pt.y;
                            var r = Math.sqrt(px * px + py * py);
                            if (r < 0.3) { px = 0.3; py = 0; r = 0.3; }
                            var theta = Math.atan2(py, px);

                            if (coordType === 'cylindrical') {
                                // Draw constant-r circle
                                viz.drawCircle(0, 0, r, null, viz.colors.blue + '44', 1);
                                // Draw constant-theta ray
                                viz.drawSegment(0, 0, px * 3 / r, py * 3 / r, viz.colors.teal + '44', 1);

                                // Scale factors: h_rho=1, h_phi=rho
                                var hr = 1.0;
                                var hphi = r;
                                var vecLen = 0.8;

                                // e_rho direction (radial)
                                var erx = Math.cos(theta), ery = Math.sin(theta);
                                viz.drawVector(px, py, px + erx * vecLen * hr, py + ery * vecLen * hr, viz.colors.blue, 'e_r (h=1)', 2.5);

                                // e_phi direction (tangential)
                                var epx = -Math.sin(theta), epy = Math.cos(theta);
                                viz.drawVector(px, py, px + epx * vecLen, py + epy * vecLen, viz.colors.teal, 'e_\u03c6 (h=\u03c1)', 2.5);

                                // Show scaled e_phi
                                ctx.setLineDash([4, 3]);
                                var sx1 = viz.toScreen(px, py);
                                var sx2 = viz.toScreen(px + epx * vecLen * hphi, py + epy * vecLen * hphi);
                                ctx.strokeStyle = viz.colors.teal + '88';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sx1[0], sx1[1]);
                                ctx.lineTo(sx2[0], sx2[1]);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                viz.screenText('Cylindrical (2D slice): h\u1D68 = 1, h\u03c6 = \u03c1 = ' + r.toFixed(2), viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('Physical length of d\u03c6 arc = \u03c1 d\u03c6 (grows with distance from axis)', viz.width / 2, viz.height - 15, viz.colors.teal, 11);
                            } else {
                                // Spherical (2D slice: r, theta plane)
                                viz.drawCircle(0, 0, r, null, viz.colors.orange + '44', 1);
                                viz.drawSegment(0, 0, px * 3 / r, py * 3 / r, viz.colors.purple + '44', 1);

                                var hr = 1.0;
                                var htheta = r;
                                var vecLen = 0.8;

                                var erx = Math.cos(theta), ery = Math.sin(theta);
                                viz.drawVector(px, py, px + erx * vecLen * hr, py + ery * vecLen * hr, viz.colors.orange, 'e_r (h=1)', 2.5);

                                var etx = -Math.sin(theta), ety = Math.cos(theta);
                                viz.drawVector(px, py, px + etx * vecLen, py + ety * vecLen, viz.colors.purple, 'e_\u03b8 (h=r)', 2.5);

                                ctx.setLineDash([4, 3]);
                                var s1 = viz.toScreen(px, py);
                                var s2 = viz.toScreen(px + etx * vecLen * htheta, py + ety * vecLen * htheta);
                                ctx.strokeStyle = viz.colors.purple + '88';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(s1[0], s1[1]);
                                ctx.lineTo(s2[0], s2[1]);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                viz.screenText('Spherical (2D slice): h_r = 1, h_\u03b8 = r = ' + r.toFixed(2), viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('Physical length of d\u03b8 arc = r d\u03b8 (grows with radius)', viz.width / 2, viz.height - 15, viz.colors.purple, 11);
                            }

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the scale factors for spherical coordinates \\((r, \\theta, \\phi)\\) where \\(x = r\\sin\\theta\\cos\\phi\\), \\(y = r\\sin\\theta\\sin\\phi\\), \\(z = r\\cos\\theta\\).',
                    hint: 'Compute \\(\\partial\\mathbf{r}/\\partial r\\), \\(\\partial\\mathbf{r}/\\partial\\theta\\), \\(\\partial\\mathbf{r}/\\partial\\phi\\) and take the magnitude of each.',
                    solution: '\\(h_r = 1\\), \\(h_\\theta = r\\), \\(h_\\phi = r\\sin\\theta\\). Therefore \\(ds^2 = dr^2 + r^2 d\\theta^2 + r^2\\sin^2\\theta\\, d\\phi^2\\) and \\(dV = r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\phi\\).'
                },
                {
                    question: 'For parabolic cylindrical coordinates \\(x = \\frac{1}{2}(u^2 - v^2)\\), \\(y = uv\\), \\(z = z\\), show that the system is orthogonal and find the scale factors.',
                    hint: 'Compute \\(\\partial\\mathbf{r}/\\partial u\\) and \\(\\partial\\mathbf{r}/\\partial v\\), then check their dot product is zero.',
                    solution: '\\(\\partial\\mathbf{r}/\\partial u = (u, v, 0)\\) and \\(\\partial\\mathbf{r}/\\partial v = (-v, u, 0)\\). Their dot product is \\(-uv + vu = 0\\), confirming orthogonality. Scale factors: \\(h_u = \\sqrt{u^2 + v^2}\\), \\(h_v = \\sqrt{u^2 + v^2}\\), \\(h_z = 1\\).'
                },
            ]
        },

        // ================================================================
        // SECTION 3: Cylindrical Coordinates
        // ================================================================
        {
            id: 'sec-cylindrical',
            title: 'Cylindrical Coordinates',
            content: `
<h2>Cylindrical Coordinates</h2>

<div class="env-block intuition">
    <div class="env-title">Polar Plus a Vertical Axis</div>
    <div class="env-body">
        <p>Cylindrical coordinates \\((\\rho, \\phi, z)\\) are simply polar coordinates in the \\(xy\\)-plane, extended vertically. Any problem with axial symmetry (symmetry about the \\(z\\)-axis) is a natural candidate: current-carrying wires, solenoids, pipes, waveguides, vortex flows.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Cylindrical Coordinates)</div>
    <div class="env-body">
        <p>The cylindrical coordinate system \\((\\rho, \\phi, z)\\) is defined by</p>
        \\[x = \\rho\\cos\\phi, \\quad y = \\rho\\sin\\phi, \\quad z = z,\\]
        <p>with \\(\\rho \\geq 0\\), \\(0 \\leq \\phi < 2\\pi\\), and \\(z \\in \\mathbb{R}\\).</p>
        <p>Scale factors: \\(h_\\rho = 1\\), \\(h_\\phi = \\rho\\), \\(h_z = 1\\).</p>
    </div>
</div>

<h3>The Coordinate Surfaces</h3>

<p>Each coordinate being held constant defines a family of surfaces:</p>
<ul>
    <li>\\(\\rho = \\text{const}\\): cylinders coaxial with the \\(z\\)-axis (hence the name)</li>
    <li>\\(\\phi = \\text{const}\\): half-planes emanating from the \\(z\\)-axis</li>
    <li>\\(z = \\text{const}\\): horizontal planes</li>
</ul>

<p>The intersection of any two of these surfaces is a coordinate curve. For instance, fixing \\(\\rho\\) and \\(z\\) gives a circle of radius \\(\\rho\\) at height \\(z\\).</p>

<h3>Unit Vectors</h3>

<p>The cylindrical unit vectors are</p>
\\[\\hat{\\boldsymbol{\\rho}} = \\cos\\phi\\,\\hat{\\mathbf{x}} + \\sin\\phi\\,\\hat{\\mathbf{y}}, \\quad \\hat{\\boldsymbol{\\phi}} = -\\sin\\phi\\,\\hat{\\mathbf{x}} + \\cos\\phi\\,\\hat{\\mathbf{y}}, \\quad \\hat{\\mathbf{z}} = \\hat{\\mathbf{z}}.\\]

<div class="env-block warning">
    <div class="env-title">Position-Dependent Basis Vectors</div>
    <div class="env-body">
        <p>Unlike Cartesian \\(\\hat{\\mathbf{x}}, \\hat{\\mathbf{y}}, \\hat{\\mathbf{z}}\\), the cylindrical unit vectors \\(\\hat{\\boldsymbol{\\rho}}\\) and \\(\\hat{\\boldsymbol{\\phi}}\\) <em>depend on the point</em> (specifically, on \\(\\phi\\)). This is why \\(\\frac{\\partial \\hat{\\boldsymbol{\\rho}}}{\\partial \\phi} = \\hat{\\boldsymbol{\\phi}}\\) and \\(\\frac{\\partial \\hat{\\boldsymbol{\\phi}}}{\\partial \\phi} = -\\hat{\\boldsymbol{\\rho}}\\). You must account for these derivatives when differentiating vector fields in curvilinear coordinates.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Velocity in Cylindrical Coordinates</div>
    <div class="env-body">
        <p>The position vector is \\(\\mathbf{r} = \\rho\\,\\hat{\\boldsymbol{\\rho}} + z\\,\\hat{\\mathbf{z}}\\). Taking the time derivative:</p>
        \\[\\mathbf{v} = \\dot{\\rho}\\,\\hat{\\boldsymbol{\\rho}} + \\rho\\dot{\\phi}\\,\\hat{\\boldsymbol{\\phi}} + \\dot{z}\\,\\hat{\\mathbf{z}}.\\]
        <p>The \\(\\rho\\dot{\\phi}\\) term is the tangential velocity from the angular motion, the reason the scale factor \\(h_\\phi = \\rho\\) appears automatically.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-cylindrical-grid"></div>
`,
            visualizations: [
                {
                    id: 'viz-cylindrical-grid',
                    title: 'Cylindrical Coordinate Grid',
                    description: 'The cylindrical grid viewed from above (a 2D slice at fixed z). Circles are constant-\\(\\rho\\) surfaces; radial lines are constant-\\(\\phi\\) surfaces. Drag the point to read off its cylindrical coordinates.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 55
                        });

                        var pt = viz.addDraggable('pt', 2, 1, viz.colors.orange, 8, function() { draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw cylindrical grid: circles + radial lines
                            for (var r = 0.5; r <= 4; r += 0.5) {
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = r % 1 === 0 ? 0.8 : 0.3;
                                ctx.beginPath();
                                var sc = viz.toScreen(0, 0);
                                ctx.arc(sc[0], sc[1], r * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                            for (var a = 0; a < 12; a++) {
                                var angle = a * Math.PI / 6;
                                var ex = 4 * Math.cos(angle), ey = 4 * Math.sin(angle);
                                viz.drawSegment(0, 0, ex, ey, viz.colors.grid, 0.5);
                            }

                            // Axes labels
                            viz.drawText('x', 4.3, 0, viz.colors.text, 12, 'left');
                            viz.drawText('y', 0, 4.3, viz.colors.text, 12, 'center', 'bottom');

                            // Point info
                            var px = pt.x, py = pt.y;
                            var rho = Math.sqrt(px * px + py * py);
                            var phi = Math.atan2(py, px);
                            if (phi < 0) phi += 2 * Math.PI;

                            // Highlight the rho circle and phi ray
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var c = viz.toScreen(0, 0);
                            ctx.arc(c[0], c[1], rho * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            viz.drawSegment(0, 0, px * 5 / Math.max(rho, 0.01), py * 5 / Math.max(rho, 0.01), viz.colors.teal + '66', 2);

                            // Unit vectors at the point
                            var ur = [Math.cos(phi), Math.sin(phi)];
                            var up = [-Math.sin(phi), Math.cos(phi)];
                            var vl = 0.7;
                            viz.drawVector(px, py, px + ur[0] * vl, py + ur[1] * vl, viz.colors.blue, '\u03c1\u0302', 2);
                            viz.drawVector(px, py, px + up[0] * vl, py + up[1] * vl, viz.colors.teal, '\u03c6\u0302', 2);

                            // Info text
                            viz.screenText('\u03c1 = ' + rho.toFixed(2) + ',  \u03c6 = ' + (phi * 180 / Math.PI).toFixed(1) + '\u00b0 (' + phi.toFixed(2) + ' rad)', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('(x, y) = (' + px.toFixed(2) + ', ' + py.toFixed(2) + ')', viz.width / 2, viz.height - 15, viz.colors.text, 11);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert the point \\((x, y, z) = (-3, 4, 7)\\) to cylindrical coordinates.',
                    hint: '\\(\\rho = \\sqrt{x^2+y^2}\\), \\(\\phi = \\arctan(y/x)\\) (adjust for quadrant), \\(z = z\\).',
                    solution: '\\(\\rho = \\sqrt{9+16} = 5\\), \\(\\phi = \\arctan(4/(-3)) + \\pi = \\pi - \\arctan(4/3) \\approx 2.214\\) rad (second quadrant), \\(z = 7\\). So \\((\\rho, \\phi, z) = (5, \\pi - \\arctan(4/3), 7)\\).'
                },
            ]
        },

        // ================================================================
        // SECTION 4: Spherical Coordinates
        // ================================================================
        {
            id: 'sec-spherical',
            title: 'Spherical Coordinates',
            content: `
<h2>Spherical Coordinates</h2>

<div class="env-block intuition">
    <div class="env-title">The Physicist's Spherical Coordinates</div>
    <div class="env-body">
        <p>Beware: mathematicians and physicists use different conventions. In physics, \\(\\theta\\) is the polar angle (colatitude, measured from the \\(z\\)-axis, \\(0 \\leq \\theta \\leq \\pi\\)) and \\(\\phi\\) is the azimuthal angle (longitude, \\(0 \\leq \\phi < 2\\pi\\)). Many mathematics texts swap these labels. We follow the physics convention throughout.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Spherical Coordinates)</div>
    <div class="env-body">
        <p>The spherical coordinate system \\((r, \\theta, \\phi)\\) is defined by</p>
        \\[x = r\\sin\\theta\\cos\\phi, \\quad y = r\\sin\\theta\\sin\\phi, \\quad z = r\\cos\\theta,\\]
        <p>with \\(r \\geq 0\\), \\(0 \\leq \\theta \\leq \\pi\\), \\(0 \\leq \\phi < 2\\pi\\).</p>
        <p>Scale factors: \\(h_r = 1\\), \\(h_\\theta = r\\), \\(h_\\phi = r\\sin\\theta\\).</p>
    </div>
</div>

<h3>Coordinate Surfaces</h3>

<ul>
    <li>\\(r = \\text{const}\\): spheres centered at the origin</li>
    <li>\\(\\theta = \\text{const}\\): cones about the \\(z\\)-axis (\\(\\theta = \\pi/2\\) is the equatorial plane)</li>
    <li>\\(\\phi = \\text{const}\\): half-planes through the \\(z\\)-axis (same as in cylindrical)</li>
</ul>

<h3>Unit Vectors</h3>

\\[\\hat{\\mathbf{r}} = \\sin\\theta\\cos\\phi\\,\\hat{\\mathbf{x}} + \\sin\\theta\\sin\\phi\\,\\hat{\\mathbf{y}} + \\cos\\theta\\,\\hat{\\mathbf{z}},\\]
\\[\\hat{\\boldsymbol{\\theta}} = \\cos\\theta\\cos\\phi\\,\\hat{\\mathbf{x}} + \\cos\\theta\\sin\\phi\\,\\hat{\\mathbf{y}} - \\sin\\theta\\,\\hat{\\mathbf{z}},\\]
\\[\\hat{\\boldsymbol{\\phi}} = -\\sin\\phi\\,\\hat{\\mathbf{x}} + \\cos\\phi\\,\\hat{\\mathbf{y}}.\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 1.2 (Solid Angle Element)</div>
    <div class="env-body">
        <p>The element of solid angle in spherical coordinates is</p>
        \\[d\\Omega = \\sin\\theta\\, d\\theta\\, d\\phi.\\]
        <p>The full solid angle subtended by a complete sphere is \\(\\int_0^{2\\pi}\\int_0^{\\pi}\\sin\\theta\\,d\\theta\\,d\\phi = 4\\pi\\) steradians.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Surface Area of a Sphere</div>
    <div class="env-body">
        <p>The area element on a sphere of radius \\(R\\) is \\(dA = h_\\theta h_\\phi\\, d\\theta\\, d\\phi = R^2\\sin\\theta\\, d\\theta\\, d\\phi\\). Integrating:</p>
        \\[A = \\int_0^{2\\pi}\\!\\int_0^{\\pi} R^2\\sin\\theta\\, d\\theta\\, d\\phi = R^2 \\cdot 2 \\cdot 2\\pi = 4\\pi R^2.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Volume of a Sphere</div>
    <div class="env-body">
        \\[V = \\int_0^{2\\pi}\\!\\int_0^{\\pi}\\!\\int_0^R r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\phi = \\frac{R^3}{3}\\cdot 2 \\cdot 2\\pi = \\frac{4}{3}\\pi R^3.\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-spherical-grid"></div>
`,
            visualizations: [
                {
                    id: 'viz-spherical-grid',
                    title: 'Spherical Coordinate Grid',
                    description: 'A 2D slice (the \\(xz\\)-plane, \\(\\phi = 0\\)) of the spherical grid. Circular arcs are constant \\(r\\); radial lines are constant \\(\\theta\\). Drag the point to read off \\((r, \\theta)\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 55
                        });

                        var pt = viz.addDraggable('pt', 1.5, 2.0, viz.colors.orange, 8, function() { draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw spherical grid in xz-plane
                            // Constant r: semicircles
                            for (var r = 0.5; r <= 4; r += 0.5) {
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = r % 1 === 0 ? 0.8 : 0.3;
                                ctx.beginPath();
                                var c = viz.toScreen(0, 0);
                                ctx.arc(c[0], c[1], r * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Constant theta: radial lines from origin
                            for (var ti = 0; ti < 12; ti++) {
                                var ang = ti * Math.PI / 6;
                                viz.drawSegment(0, 0, 4 * Math.cos(ang), 4 * Math.sin(ang), viz.colors.grid, 0.4);
                            }

                            // Axes
                            viz.drawSegment(-4, 0, 4, 0, viz.colors.axis, 1);
                            viz.drawSegment(0, -3.5, 0, 3.5, viz.colors.axis, 1);
                            viz.drawText('x (equator)', 4.2, -0.3, viz.colors.text, 10, 'left');
                            viz.drawText('z (pole)', 0.3, 3.5, viz.colors.text, 10, 'left');

                            // Point data: in xz-plane, x = r sin(theta), z = r cos(theta)
                            var px = pt.x, pz = pt.y;
                            var r = Math.sqrt(px * px + pz * pz);
                            if (r < 0.2) r = 0.2;
                            var theta = Math.atan2(px, pz); // angle from z-axis
                            if (theta < 0) theta += Math.PI;

                            // Highlight r-circle
                            ctx.strokeStyle = viz.colors.orange + '55';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var c2 = viz.toScreen(0, 0);
                            ctx.arc(c2[0], c2[1], r * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            // Highlight theta ray
                            viz.drawSegment(0, 0, px * 5 / r, pz * 5 / r, viz.colors.purple + '55', 2);

                            // Draw theta arc from z-axis to point
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var arcR = Math.min(r, 1.2) * viz.scale;
                            // In screen coords, z is up = -y screen, x is right
                            // angle from z-axis: starts at -PI/2 in canvas coords
                            var startAngle = -Math.PI / 2; // z-axis (up)
                            var endAngle = -Math.PI / 2 + theta;
                            ctx.arc(c2[0], c2[1], arcR, startAngle, endAngle);
                            ctx.stroke();

                            // Unit vectors
                            var vl = 0.6;
                            // e_r: radial outward
                            var erx = px / r, erz = pz / r;
                            viz.drawVector(px, pz, px + erx * vl, pz + erz * vl, viz.colors.orange, 'r\u0302', 2);

                            // e_theta: perpendicular, in direction of increasing theta
                            var etx = pz / r, etz = -px / r;
                            viz.drawVector(px, pz, px + etx * vl, pz + etz * vl, viz.colors.purple, '\u03b8\u0302', 2);

                            // Info
                            viz.screenText('r = ' + r.toFixed(2) + ',  \u03b8 = ' + (theta * 180 / Math.PI).toFixed(1) + '\u00b0 (' + theta.toFixed(2) + ' rad)', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('xz-plane slice (\u03c6 = 0):  x = r sin\u03b8,  z = r cos\u03b8', viz.width / 2, viz.height - 15, viz.colors.text, 11);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert \\((x, y, z) = (1, 1, \\sqrt{2})\\) to spherical coordinates.',
                    hint: '\\(r = \\sqrt{x^2+y^2+z^2}\\), \\(\\theta = \\arccos(z/r)\\), \\(\\phi = \\arctan(y/x)\\).',
                    solution: '\\(r = \\sqrt{1+1+2} = 2\\), \\(\\theta = \\arccos(\\sqrt{2}/2) = \\pi/4\\), \\(\\phi = \\arctan(1/1) = \\pi/4\\). So \\((r, \\theta, \\phi) = (2, \\pi/4, \\pi/4)\\).'
                },
                {
                    question: 'Compute the volume enclosed between two concentric spheres of radii \\(a\\) and \\(b\\) (with \\(a < b\\)) and within the cone \\(\\theta \\leq \\alpha\\).',
                    hint: 'Integrate \\(r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\phi\\) over the appropriate limits.',
                    solution: '\\(V = \\int_0^{2\\pi}\\int_0^\\alpha\\int_a^b r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\phi = 2\\pi \\cdot \\frac{b^3-a^3}{3} \\cdot (1 - \\cos\\alpha)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Differential Operators in Curvilinear Coordinates
        // ================================================================
        {
            id: 'sec-operators',
            title: 'Differential Operators',
            content: `
<h2>Differential Operators in Curvilinear Coordinates</h2>

<div class="env-block intuition">
    <div class="env-title">One Formula to Rule Them All</div>
    <div class="env-body">
        <p>The gradient, divergence, curl, and Laplacian all have universal expressions in terms of the scale factors \\(h_1, h_2, h_3\\). You do not need to re-derive them for each coordinate system. Memorize the general formulas, plug in the scale factors, and every specific result follows.</p>
    </div>
</div>

<h3>Gradient</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.3 (Gradient in Curvilinear Coordinates)</div>
    <div class="env-body">
        <p>For a scalar field \\(f(q_1, q_2, q_3)\\):</p>
        \\[\\nabla f = \\sum_{i=1}^{3} \\frac{1}{h_i}\\frac{\\partial f}{\\partial q_i}\\,\\hat{\\mathbf{e}}_i = \\frac{1}{h_1}\\frac{\\partial f}{\\partial q_1}\\hat{\\mathbf{e}}_1 + \\frac{1}{h_2}\\frac{\\partial f}{\\partial q_2}\\hat{\\mathbf{e}}_2 + \\frac{1}{h_3}\\frac{\\partial f}{\\partial q_3}\\hat{\\mathbf{e}}_3.\\]
    </div>
</div>

<p>The factor \\(1/h_i\\) converts the coordinate derivative \\(\\partial f/\\partial q_i\\) into the rate of change per unit <em>distance</em> along the \\(q_i\\)-curve.</p>

<h3>Divergence</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.4 (Divergence in Curvilinear Coordinates)</div>
    <div class="env-body">
        <p>For a vector field \\(\\mathbf{F} = F_1\\hat{\\mathbf{e}}_1 + F_2\\hat{\\mathbf{e}}_2 + F_3\\hat{\\mathbf{e}}_3\\):</p>
        \\[\\nabla \\cdot \\mathbf{F} = \\frac{1}{h_1 h_2 h_3}\\left[\\frac{\\partial}{\\partial q_1}(h_2 h_3 F_1) + \\frac{\\partial}{\\partial q_2}(h_1 h_3 F_2) + \\frac{\\partial}{\\partial q_3}(h_1 h_2 F_3)\\right].\\]
    </div>
</div>

<h3>Curl</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.5 (Curl in Curvilinear Coordinates)</div>
    <div class="env-body">
        <p>For a vector field \\(\\mathbf{F} = F_1\\hat{\\mathbf{e}}_1 + F_2\\hat{\\mathbf{e}}_2 + F_3\\hat{\\mathbf{e}}_3\\):</p>
        \\[\\nabla \\times \\mathbf{F} = \\frac{1}{h_1 h_2 h_3}
        \\begin{vmatrix}
        h_1\\hat{\\mathbf{e}}_1 & h_2\\hat{\\mathbf{e}}_2 & h_3\\hat{\\mathbf{e}}_3 \\\\
        \\dfrac{\\partial}{\\partial q_1} & \\dfrac{\\partial}{\\partial q_2} & \\dfrac{\\partial}{\\partial q_3} \\\\
        h_1 F_1 & h_2 F_2 & h_3 F_3
        \\end{vmatrix}\\]
    </div>
</div>

<h3>Laplacian</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.6 (Laplacian in Curvilinear Coordinates)</div>
    <div class="env-body">
        <p>The scalar Laplacian \\(\\nabla^2 f = \\nabla \\cdot (\\nabla f)\\) is</p>
        \\[\\nabla^2 f = \\frac{1}{h_1 h_2 h_3}\\left[
        \\frac{\\partial}{\\partial q_1}\\!\\left(\\frac{h_2 h_3}{h_1}\\frac{\\partial f}{\\partial q_1}\\right) +
        \\frac{\\partial}{\\partial q_2}\\!\\left(\\frac{h_1 h_3}{h_2}\\frac{\\partial f}{\\partial q_2}\\right) +
        \\frac{\\partial}{\\partial q_3}\\!\\left(\\frac{h_1 h_2}{h_3}\\frac{\\partial f}{\\partial q_3}\\right)
        \\right].\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Laplacian in Spherical Coordinates</div>
    <div class="env-body">
        <p>With \\(h_r = 1\\), \\(h_\\theta = r\\), \\(h_\\phi = r\\sin\\theta\\):</p>
        \\[\\nabla^2 f = \\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\!\\left(r^2 \\frac{\\partial f}{\\partial r}\\right) + \\frac{1}{r^2\\sin\\theta}\\frac{\\partial}{\\partial \\theta}\\!\\left(\\sin\\theta \\frac{\\partial f}{\\partial \\theta}\\right) + \\frac{1}{r^2\\sin^2\\theta}\\frac{\\partial^2 f}{\\partial \\phi^2}.\\]
        <p>This is the fundamental equation for separation of variables in spherical geometry (Chapter 12).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Divergence in Cylindrical Coordinates</div>
    <div class="env-body">
        <p>With \\(h_\\rho = 1\\), \\(h_\\phi = \\rho\\), \\(h_z = 1\\):</p>
        \\[\\nabla \\cdot \\mathbf{F} = \\frac{1}{\\rho}\\frac{\\partial}{\\partial \\rho}(\\rho F_\\rho) + \\frac{1}{\\rho}\\frac{\\partial F_\\phi}{\\partial \\phi} + \\frac{\\partial F_z}{\\partial z}.\\]
        <p>The \\(1/\\rho\\) factor in the first term accounts for the expanding cross-section as \\(\\rho\\) increases.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-laplacian-spherical"></div>
<div class="viz-placeholder" data-viz="viz-curl-spherical"></div>
`,
            visualizations: [
                {
                    id: 'viz-laplacian-spherical',
                    title: 'Laplacian in Spherical Coordinates',
                    description: 'Visualize how the spherical Laplacian separates into radial and angular parts. The heatmap shows \\(\\nabla^2 f\\) for a chosen function \\(f(r,\\theta)\\) in the \\(xz\\)-plane.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 55
                        });

                        var funcChoice = 0;
                        var funcs = [
                            { name: 'r\u00b2 cos\u03b8', fn: function(r, th) { return r * r * Math.cos(th); },
                              lap: function(r, th) { return 6 * Math.cos(th) - 2 * Math.cos(th); } },
                            { name: '1/r', fn: function(r, th) { return 1 / Math.max(r, 0.1); },
                              lap: function(r, th) { return 0; } },
                            { name: 'r\u00b3 P\u2083(cos\u03b8)', fn: function(r, th) { var c = Math.cos(th); return r * r * r * (5 * c * c * c - 3 * c) / 2; },
                              lap: function(r, th) { return 0; } }
                        ];

                        VizEngine.createButton(controls, 'r\u00b2cos\u03b8', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, '1/r', function() { funcChoice = 1; draw(); });
                        VizEngine.createButton(controls, 'r\u00b3P\u2083', function() { funcChoice = 2; draw(); });

                        function draw() {
                            var f = funcs[funcChoice];
                            // Draw heatmap of f in xz-plane
                            viz.drawHeatmap(function(x, y) {
                                var r = Math.sqrt(x * x + y * y);
                                var th = Math.atan2(Math.abs(x), y);
                                if (r < 0.05) return 0;
                                return f.fn(r, th);
                            }, [-4, 4], [-3.5, 3.5], 'coolwarm');

                            var ctx = viz.ctx;
                            // Overlay coordinate grid
                            ctx.globalAlpha = 0.3;
                            for (var r = 1; r <= 3; r++) {
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                var c = viz.toScreen(0, 0);
                                ctx.arc(c[0], c[1], r * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                            ctx.globalAlpha = 1.0;

                            // Labels
                            ctx.fillStyle = '#000000cc';
                            ctx.fillRect(0, 0, viz.width, 35);
                            viz.screenText('f(r,\u03b8) = ' + f.name + '   |   \u2207\u00b2f = ' + (funcChoice === 0 ? '4cos\u03b8' : '0 (harmonic)'), viz.width / 2, 18, viz.colors.white, 13);
                            ctx.fillStyle = '#000000cc';
                            ctx.fillRect(0, viz.height - 25, viz.width, 25);
                            viz.screenText('Heatmap of f in the xz-plane (coolwarm colormap)', viz.width / 2, viz.height - 10, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-curl-spherical',
                    title: 'Curl in Spherical Coordinates',
                    description: 'Visualize the curl of a vector field in spherical coordinates, shown component by component. The field \\(\\mathbf{F} = F_\\phi(r,\\theta)\\hat{\\boldsymbol{\\phi}}\\) (toroidal) produces a poloidal curl.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 55
                        });

                        var fieldChoice = 0;
                        VizEngine.createButton(controls, 'F = r sin\u03b8 \u03c6\u0302', function() { fieldChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'F = (1/r) \u03c6\u0302', function() { fieldChoice = 1; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            var ctx = viz.ctx;

                            // Draw in xz-plane: F is in phi direction (out of page)
                            // curl F has r and theta components in the xz-plane
                            var spacing = 0.6;
                            for (var xi = -3.5; xi <= 3.5; xi += spacing) {
                                for (var zi = -3; zi <= 3; zi += spacing) {
                                    var r = Math.sqrt(xi * xi + zi * zi);
                                    if (r < 0.3 || r > 3.8) continue;
                                    var theta = Math.atan2(Math.abs(xi), zi);
                                    var sinTh = Math.sin(theta), cosTh = Math.cos(theta);

                                    var curlR, curlTh;
                                    if (fieldChoice === 0) {
                                        // F = r sin(theta) phi_hat => F_phi = r sin(theta)
                                        // curl_r = (1/(r sin theta)) d(sin(theta) * F_phi)/dtheta = (1/(r sin theta)) d(r sin^2 theta)/dtheta = 2 cos(theta)
                                        // curl_theta = -(1/r) d(r F_phi)/dr = -(1/r) d(r^2 sin theta)/dr = -2 sin(theta)
                                        curlR = 2 * cosTh;
                                        curlTh = -2 * sinTh;
                                    } else {
                                        // F = (1/r) phi_hat => F_phi = 1/r
                                        // curl_r = (1/(r sin theta)) d(sin(theta)/r)/dtheta = cos(theta)/(r^2 sin theta)
                                        // curl_theta = -(1/r) d(r*(1/r))/dr = -(1/r) d(1)/dr = 0
                                        curlR = cosTh / (r * r * Math.max(sinTh, 0.01));
                                        curlTh = 0;
                                    }

                                    // Convert (curlR, curlTh) in spherical to (dx, dz) in xz-plane
                                    // e_r = (sinTh, cosTh) in (x,z), e_theta = (cosTh, -sinTh) in (x,z)
                                    var sign = xi >= 0 ? 1 : -1;
                                    var dx = sign * (curlR * sinTh + curlTh * cosTh);
                                    var dz = curlR * cosTh - curlTh * sinTh;

                                    var mag = Math.sqrt(dx * dx + dz * dz);
                                    var maxLen = 0.4;
                                    if (mag > 0.01) {
                                        var scale = Math.min(maxLen, mag * 0.15) / mag;
                                        viz.drawVector(xi, zi, xi + dx * scale, zi + dz * scale, viz.colors.teal, null, 1.5);
                                    }
                                }
                            }

                            // Reference circle
                            ctx.strokeStyle = viz.colors.orange + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            var c = viz.toScreen(0, 0);
                            ctx.arc(c[0], c[1], 2 * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            var label = fieldChoice === 0
                                ? '\u2207\u00d7(r sin\u03b8 \u03c6\u0302) = 2cos\u03b8 r\u0302 - 2sin\u03b8 \u03b8\u0302'
                                : '\u2207\u00d7((1/r)\u03c6\u0302): purely radial at poles';
                            viz.screenText(label, viz.width / 2, 18, viz.colors.white, 12);
                            viz.screenText('\u2207\u00d7F shown as arrows in the xz-plane (F points out of page)', viz.width / 2, viz.height - 12, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the Laplacian in cylindrical coordinates by substituting \\(h_\\rho = 1, h_\\phi = \\rho, h_z = 1\\) into the general formula.',
                    hint: 'Compute each term of \\(\\frac{1}{h_1 h_2 h_3}[\\partial_1(\\frac{h_2 h_3}{h_1}\\partial_1 f) + \\cdots]\\) separately.',
                    solution: '\\(\\nabla^2 f = \\frac{1}{\\rho}\\frac{\\partial}{\\partial\\rho}\\left(\\rho\\frac{\\partial f}{\\partial\\rho}\\right) + \\frac{1}{\\rho^2}\\frac{\\partial^2 f}{\\partial\\phi^2} + \\frac{\\partial^2 f}{\\partial z^2}\\). The first term can be expanded as \\(\\frac{\\partial^2 f}{\\partial\\rho^2} + \\frac{1}{\\rho}\\frac{\\partial f}{\\partial\\rho}\\).'
                },
                {
                    question: 'Compute \\(\\nabla \\cdot (r^2 \\hat{\\mathbf{r}})\\) in spherical coordinates.',
                    hint: 'Here \\(F_r = r^2, F_\\theta = F_\\phi = 0\\). Use the divergence formula.',
                    solution: '\\(\\nabla \\cdot (r^2 \\hat{\\mathbf{r}}) = \\frac{1}{r^2}\\frac{\\partial}{\\partial r}(r^2 \\cdot r^2) = \\frac{1}{r^2}\\frac{\\partial}{\\partial r}(r^4) = \\frac{4r^3}{r^2} = 4r\\).'
                },
            ]
        },

        // ================================================================
        // SECTION 6: Jacobians & Volume Elements
        // ================================================================
        {
            id: 'sec-jacobian',
            title: 'Jacobians & Volume Elements',
            content: `
<h2>Jacobians and Volume Elements</h2>

<div class="env-block intuition">
    <div class="env-title">How Volumes Distort Under Coordinate Changes</div>
    <div class="env-body">
        <p>When you change variables in an integral, you must account for how the coordinate transformation stretches or compresses volume. The Jacobian determinant is the local volume magnification factor: it tells you how a tiny cube in \\((q_1, q_2, q_3)\\) space maps to a (possibly non-cubic) parallelepiped in \\((x, y, z)\\) space.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Jacobian Matrix and Determinant)</div>
    <div class="env-body">
        <p>Given a transformation \\((q_1, q_2, q_3) \\mapsto (x, y, z)\\), the <strong>Jacobian matrix</strong> is</p>
        \\[J = \\begin{pmatrix} \\partial x/\\partial q_1 & \\partial x/\\partial q_2 & \\partial x/\\partial q_3 \\\\ \\partial y/\\partial q_1 & \\partial y/\\partial q_2 & \\partial y/\\partial q_3 \\\\ \\partial z/\\partial q_1 & \\partial z/\\partial q_2 & \\partial z/\\partial q_3 \\end{pmatrix}\\]
        <p>and the <strong>Jacobian determinant</strong> is \\(\\mathcal{J} = \\det(J)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.7 (Change of Variables in Integrals)</div>
    <div class="env-body">
        <p>Under the coordinate transformation \\((q_1, q_2, q_3) \\to (x, y, z)\\):</p>
        \\[\\iiint f(x,y,z)\\, dx\\, dy\\, dz = \\iiint f(\\mathbf{r}(q_1,q_2,q_3))\\, |\\mathcal{J}|\\, dq_1\\, dq_2\\, dq_3.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.8 (Jacobian and Scale Factors)</div>
    <div class="env-body">
        <p>For an orthogonal coordinate system, the Jacobian determinant is simply the product of scale factors:</p>
        \\[|\\mathcal{J}| = h_1 h_2 h_3.\\]
        <p>This is consistent with \\(dV = h_1 h_2 h_3\\, dq_1\\, dq_2\\, dq_3\\) from Theorem 1.1.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>For orthogonal coordinates, the columns of \\(J\\) are \\(\\partial\\mathbf{r}/\\partial q_i = h_i \\hat{\\mathbf{e}}_i\\). Since the \\(\\hat{\\mathbf{e}}_i\\) are orthonormal, \\(\\det(J) = h_1 h_2 h_3 \\det(\\hat{\\mathbf{e}}_1, \\hat{\\mathbf{e}}_2, \\hat{\\mathbf{e}}_3) = \\pm h_1 h_2 h_3\\). For a right-handed system, the sign is positive.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Jacobian for Spherical Coordinates</div>
    <div class="env-body">
        <p>Direct computation of \\(\\det(J)\\) for \\(x = r\\sin\\theta\\cos\\phi,\\; y = r\\sin\\theta\\sin\\phi,\\; z = r\\cos\\theta\\):</p>
        \\[\\mathcal{J} = \\det\\begin{pmatrix} \\sin\\theta\\cos\\phi & r\\cos\\theta\\cos\\phi & -r\\sin\\theta\\sin\\phi \\\\ \\sin\\theta\\sin\\phi & r\\cos\\theta\\sin\\phi & r\\sin\\theta\\cos\\phi \\\\ \\cos\\theta & -r\\sin\\theta & 0 \\end{pmatrix} = r^2\\sin\\theta.\\]
        <p>Alternatively: \\(h_r h_\\theta h_\\phi = 1 \\cdot r \\cdot r\\sin\\theta = r^2\\sin\\theta\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Integrating a Gaussian in Spherical Coordinates</div>
    <div class="env-body">
        <p>Compute \\(I = \\iiint e^{-r^2} dV\\) over all space. In spherical:</p>
        \\[I = \\int_0^{2\\pi}\\!\\int_0^\\pi\\!\\int_0^\\infty e^{-r^2} r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\phi = 4\\pi \\int_0^\\infty r^2 e^{-r^2} dr = 4\\pi \\cdot \\frac{\\sqrt{\\pi}}{4} = \\pi^{3/2}.\\]
        <p>This also proves that the Gaussian integral in 3D is \\((\\sqrt{\\pi})^3\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-jacobian"></div>
`,
            visualizations: [
                {
                    id: 'viz-jacobian',
                    title: 'Jacobian: Area Distortion',
                    description: 'See how a small square in coordinate space maps to a distorted parallelogram in physical space. The area ratio is \\(|\\mathcal{J}|\\). Drag the point to different locations to see how the distortion varies.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 55
                        });

                        var pt = viz.addDraggable('pt', 1.5, 1.0, viz.colors.white, 8, function() { draw(); });

                        var dq = 0.3;
                        VizEngine.createSlider(controls, 'Cell size', 0.1, 0.6, dq, 0.05, function(v) { dq = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // We illustrate polar -> Cartesian: (r, theta) -> (x, y)
                            // The user drags in Cartesian, we compute polar coords
                            var px = pt.x, py = pt.y;
                            var r = Math.sqrt(px * px + py * py);
                            if (r < 0.3) r = 0.3;
                            var theta = Math.atan2(py, px);

                            // Draw the polar grid element at (r, theta)
                            // Corner points in polar: (r, theta), (r+dr, theta), (r, theta+dtheta), (r+dr, theta+dtheta)
                            var dr = dq, dth = dq;
                            var corners = [
                                [r, theta],
                                [r + dr, theta],
                                [r + dr, theta + dth],
                                [r, theta + dth]
                            ];

                            // Map to Cartesian
                            var carts = corners.map(function(c) {
                                return [c[0] * Math.cos(c[1]), c[0] * Math.sin(c[1])];
                            });

                            // Fill the cell with the approximate arc
                            ctx.fillStyle = viz.colors.teal + '33';
                            ctx.beginPath();
                            // Draw arcs for inner and outer radii
                            var nArc = 20;
                            for (var i = 0; i <= nArc; i++) {
                                var a = theta + dth * i / nArc;
                                var s = viz.toScreen(r * Math.cos(a), r * Math.sin(a));
                                if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
                            }
                            for (var i = nArc; i >= 0; i--) {
                                var a = theta + dth * i / nArc;
                                var s = viz.toScreen((r + dr) * Math.cos(a), (r + dr) * Math.sin(a));
                                ctx.lineTo(s[0], s[1]);
                            }
                            ctx.closePath();
                            ctx.fill();

                            // Outline
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= nArc; i++) {
                                var a = theta + dth * i / nArc;
                                var s = viz.toScreen(r * Math.cos(a), r * Math.sin(a));
                                if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();
                            ctx.beginPath();
                            for (var i = 0; i <= nArc; i++) {
                                var a = theta + dth * i / nArc;
                                var s = viz.toScreen((r + dr) * Math.cos(a), (r + dr) * Math.sin(a));
                                if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            // Radial lines
                            viz.drawSegment(r * Math.cos(theta), r * Math.sin(theta),
                                           (r + dr) * Math.cos(theta), (r + dr) * Math.sin(theta),
                                           viz.colors.teal, 2);
                            viz.drawSegment(r * Math.cos(theta + dth), r * Math.sin(theta + dth),
                                           (r + dr) * Math.cos(theta + dth), (r + dr) * Math.sin(theta + dth),
                                           viz.colors.teal, 2);

                            // Show the reference grid circle
                            ctx.strokeStyle = viz.colors.blue + '33';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            var c = viz.toScreen(0, 0);
                            ctx.arc(c[0], c[1], r * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            // Jacobian = r for polar coordinates
                            var jac = r;
                            var coordArea = dr * dth;
                            var physArea = jac * coordArea;

                            viz.screenText('Polar: (r, \u03b8) = (' + r.toFixed(2) + ', ' + (theta * 180 / Math.PI).toFixed(1) + '\u00b0)   |J| = r = ' + r.toFixed(2), viz.width / 2, 18, viz.colors.white, 12);
                            viz.screenText('Coordinate area: dr\u00b7d\u03b8 = ' + coordArea.toFixed(3) + '   Physical area: r\u00b7dr\u00b7d\u03b8 = ' + physArea.toFixed(3), viz.width / 2, viz.height - 12, viz.colors.teal, 11);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Jacobian determinant for cylindrical coordinates directly from the definition, without using the scale factor shortcut.',
                    hint: 'Write out the full \\(3 \\times 3\\) Jacobian matrix \\(\\partial(x,y,z)/\\partial(\\rho,\\phi,z)\\) and compute its determinant.',
                    solution: '\\(J = \\begin{pmatrix} \\cos\\phi & -\\rho\\sin\\phi & 0 \\\\ \\sin\\phi & \\rho\\cos\\phi & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}\\). \\(\\det(J) = 1 \\cdot (\\rho\\cos^2\\phi + \\rho\\sin^2\\phi) = \\rho\\). This equals \\(h_\\rho h_\\phi h_z = 1 \\cdot \\rho \\cdot 1 = \\rho\\). \\(\\checkmark\\)'
                },
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Tensors and Special Functions
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: From Coordinates to Tensors and Special Functions</h2>

<div class="env-block intuition">
    <div class="env-title">The Bigger Picture</div>
    <div class="env-body">
        <p>Curvilinear coordinates are not an end in themselves. They are the starting point for two major threads in mathematical physics:</p>
        <ol>
            <li><strong>Tensors</strong> (Chapter 2): The scale factors \\(h_i\\) are really the square roots of the diagonal metric tensor components \\(g_{ii}\\). The general theory of tensors extends everything in this chapter to non-orthogonal and even non-Euclidean (curved) coordinate systems, which is the language of general relativity.</li>
            <li><strong>Separation of variables and special functions</strong> (Chapters 11, 12, 17): The Laplacian's form in each coordinate system determines which PDEs separate and what special functions arise. The spherical Laplacian leads to Legendre polynomials and spherical harmonics; the cylindrical Laplacian leads to Bessel functions.</li>
        </ol>
    </div>
</div>

<h3>From Scale Factors to the Metric Tensor</h3>

<p>In this chapter we wrote \\(ds^2 = h_1^2 dq_1^2 + h_2^2 dq_2^2 + h_3^2 dq_3^2\\) for orthogonal coordinates. In Chapter 2, we will generalize to</p>

\\[ds^2 = \\sum_{i,j} g_{ij}\\, dq^i\\, dq^j,\\]

<p>where the metric tensor \\(g_{ij}\\) can have off-diagonal terms. This is necessary for non-orthogonal coordinates and for curved spaces like the surface of a sphere (which has its own intrinsic metric).</p>

<h3>Separation of Variables: A Preview</h3>

<p>Consider the Helmholtz equation \\(\\nabla^2 f + k^2 f = 0\\). In spherical coordinates, trying \\(f = R(r)\\Theta(\\theta)\\Phi(\\phi)\\) and substituting into the spherical Laplacian yields three separate ODEs:</p>

\\[\\frac{d^2 \\Phi}{d\\phi^2} + m^2 \\Phi = 0 \\quad \\text{(azimuthal)},\\]
\\[\\frac{1}{\\sin\\theta}\\frac{d}{d\\theta}\\left(\\sin\\theta\\frac{d\\Theta}{d\\theta}\\right) + \\left[\\ell(\\ell+1) - \\frac{m^2}{\\sin^2\\theta}\\right]\\Theta = 0 \\quad \\text{(associated Legendre)},\\]
\\[\\frac{d}{dr}\\left(r^2 \\frac{dR}{dr}\\right) + \\left[k^2 r^2 - \\ell(\\ell+1)\\right]R = 0 \\quad \\text{(spherical Bessel)}.\\]

<p>The first equation gives trigonometric functions, the second gives associated Legendre polynomials \\(P_\\ell^m(\\cos\\theta)\\), and the third gives spherical Bessel functions \\(j_\\ell(kr)\\). The entire machinery of special functions is driven by the choice of coordinate system.</p>

<h3>The Coordinate Gallery</h3>

<p>Beyond cylindrical and spherical, a rich family of orthogonal coordinate systems exists. Each one leads to its own form of the Laplacian, its own separable equations, and its own special functions. The visualization below shows several important coordinate systems used in physics.</p>

<div class="viz-placeholder" data-viz="viz-coordinate-gallery"></div>

<div class="env-block remark">
    <div class="env-title">How to Choose Coordinates</div>
    <div class="env-body">
        <p><strong>Match the symmetry of the boundary</strong>: use cylindrical for axial symmetry, spherical for central-force problems, ellipsoidal for confocal geometry, paraboloidal for certain scattering problems. When no coordinate system makes the boundary simple, numerical methods (Chapter 19) become essential.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-coordinate-gallery',
                    title: 'Gallery of Orthogonal Coordinate Systems',
                    description: 'Explore the coordinate curves for cylindrical, spherical, parabolic, and elliptic systems. Each button switches the displayed system, showing its constant-coordinate curves.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 400,
                            originX: 290, originY: 200, scale: 50
                        });

                        var sysChoice = 0;
                        VizEngine.createButton(controls, 'Cylindrical', function() { sysChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'Spherical', function() { sysChoice = 1; draw(); });
                        VizEngine.createButton(controls, 'Parabolic', function() { sysChoice = 2; draw(); });
                        VizEngine.createButton(controls, 'Elliptic', function() { sysChoice = 3; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var names = ['Cylindrical (\u03c1, \u03c6)', 'Spherical (r, \u03b8)', 'Parabolic (u, v)', 'Elliptic (\u03be, \u03b7)'];
                            viz.screenText(names[sysChoice] + ' coordinate curves (2D cross-section)', viz.width / 2, 18, viz.colors.white, 13);

                            if (sysChoice === 0) {
                                // Cylindrical: circles + radial lines
                                for (var r = 0.5; r <= 4; r += 0.5) {
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = r % 1 === 0 ? 1.2 : 0.5;
                                    ctx.beginPath();
                                    var c = viz.toScreen(0, 0);
                                    ctx.arc(c[0], c[1], r * viz.scale, 0, Math.PI * 2);
                                    ctx.stroke();
                                }
                                for (var a = 0; a < 24; a++) {
                                    var angle = a * Math.PI / 12;
                                    viz.drawSegment(0, 0, 4 * Math.cos(angle), 4 * Math.sin(angle),
                                                   a % 2 === 0 ? viz.colors.teal : viz.colors.teal + '66', a % 2 === 0 ? 1 : 0.5);
                                }
                                viz.screenText('\u03c1 = const (circles), \u03c6 = const (rays)', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                            } else if (sysChoice === 1) {
                                // Spherical (in xz plane): circles (r=const) and radial rays (theta=const)
                                for (var r = 0.5; r <= 4; r += 0.5) {
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = r % 1 === 0 ? 1.2 : 0.5;
                                    ctx.beginPath();
                                    var c = viz.toScreen(0, 0);
                                    ctx.arc(c[0], c[1], r * viz.scale, 0, Math.PI * 2);
                                    ctx.stroke();
                                }
                                for (var a = 0; a < 24; a++) {
                                    var angle = a * Math.PI / 12;
                                    viz.drawSegment(0, 0, 4 * Math.cos(angle), 4 * Math.sin(angle),
                                                   a % 2 === 0 ? viz.colors.purple : viz.colors.purple + '66', a % 2 === 0 ? 1 : 0.5);
                                }
                                viz.screenText('r = const (circles), \u03b8 = const (rays) [xz-plane cross-section]', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                            } else if (sysChoice === 2) {
                                // Parabolic: u=const are upward parabolas, v=const are downward
                                // x = uv, y = (u^2 - v^2)/2 => parametric curves
                                for (var u = 0.3; u <= 3; u += 0.3) {
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    var started = false;
                                    for (var t = -4; t <= 4; t += 0.05) {
                                        var xx = u * t;
                                        var yy = (u * u - t * t) / 2;
                                        if (Math.abs(xx) > 5 || Math.abs(yy) > 4) { started = false; continue; }
                                        var s = viz.toScreen(xx, yy);
                                        if (!started) { ctx.moveTo(s[0], s[1]); started = true; } else ctx.lineTo(s[0], s[1]);
                                    }
                                    ctx.stroke();
                                }
                                for (var v = 0.3; v <= 3; v += 0.3) {
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    var started = false;
                                    for (var t = -4; t <= 4; t += 0.05) {
                                        var xx = t * v;
                                        var yy = (t * t - v * v) / 2;
                                        if (Math.abs(xx) > 5 || Math.abs(yy) > 4) { started = false; continue; }
                                        var s = viz.toScreen(xx, yy);
                                        if (!started) { ctx.moveTo(s[0], s[1]); started = true; } else ctx.lineTo(s[0], s[1]);
                                    }
                                    ctx.stroke();
                                }
                                viz.screenText('u = const (green parabolas \u2191), v = const (red parabolas \u2193)', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                            } else {
                                // Elliptic: x = a cosh(xi) cos(eta), y = a sinh(xi) sin(eta)
                                var a = 1.0;
                                // xi = const: ellipses
                                for (var xi = 0.3; xi <= 2.5; xi += 0.3) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    for (var i = 0; i <= 100; i++) {
                                        var eta = 2 * Math.PI * i / 100;
                                        var xx = a * Math.cosh(xi) * Math.cos(eta);
                                        var yy = a * Math.sinh(xi) * Math.sin(eta);
                                        var s = viz.toScreen(xx, yy);
                                        if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
                                    }
                                    ctx.closePath();
                                    ctx.stroke();
                                }
                                // eta = const: hyperbolas
                                for (var ei = 0; ei < 12; ei++) {
                                    var eta = ei * Math.PI / 6;
                                    ctx.strokeStyle = viz.colors.pink;
                                    ctx.lineWidth = 0.8;
                                    ctx.beginPath();
                                    var started = false;
                                    for (var xi = 0; xi <= 2.5; xi += 0.02) {
                                        var xx = a * Math.cosh(xi) * Math.cos(eta);
                                        var yy = a * Math.sinh(xi) * Math.sin(eta);
                                        if (Math.abs(xx) > 5.5 || Math.abs(yy) > 4) { started = false; continue; }
                                        var s = viz.toScreen(xx, yy);
                                        if (!started) { ctx.moveTo(s[0], s[1]); started = true; } else ctx.lineTo(s[0], s[1]);
                                    }
                                    ctx.stroke();
                                }
                                // Foci
                                viz.drawPoint(a, 0, viz.colors.white, 'F\u2081', 4);
                                viz.drawPoint(-a, 0, viz.colors.white, 'F\u2082', 4);
                                viz.screenText('\u03be = const (yellow ellipses), \u03b7 = const (pink hyperbolas), foci at (\u00b1a, 0)', viz.width / 2, viz.height - 12, viz.colors.text, 10);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Helmholtz equation \\(\\nabla^2 f + k^2 f = 0\\) separates in exactly 11 orthogonal coordinate systems in \\(\\mathbb{R}^3\\) (Eisenhart\'s theorem). Name at least five of them.',
                    hint: 'Think of the most common ones first: Cartesian, cylindrical, spherical. Then recall systems used in specialized physics problems.',
                    solution: 'The 11 are: Cartesian, cylindrical, spherical, prolate spheroidal, oblate spheroidal, parabolic cylindrical, paraboloidal, elliptic cylindrical, ellipsoidal, conical, and confocal paraboloidal.'
                },
                {
                    question: 'In elliptic cylindrical coordinates \\(x = a\\cosh\\xi\\cos\\eta\\), \\(y = a\\sinh\\xi\\sin\\eta\\), \\(z = z\\), show that the scale factors are \\(h_\\xi = h_\\eta = a\\sqrt{\\sinh^2\\xi + \\sin^2\\eta}\\) and \\(h_z = 1\\).',
                    hint: 'Compute \\(\\partial x/\\partial\\xi\\), \\(\\partial y/\\partial\\xi\\), etc., and use \\(\\cosh^2\\xi - \\sinh^2\\xi = 1\\) and \\(\\cos^2\\eta + \\sin^2\\eta = 1\\).',
                    solution: '\\(\\partial x/\\partial\\xi = a\\sinh\\xi\\cos\\eta\\), \\(\\partial y/\\partial\\xi = a\\cosh\\xi\\sin\\eta\\). So \\(h_\\xi^2 = a^2(\\sinh^2\\xi\\cos^2\\eta + \\cosh^2\\xi\\sin^2\\eta) = a^2(\\sinh^2\\xi + \\sin^2\\eta)\\). Similarly \\(h_\\eta^2 = a^2(\\cosh^2\\xi\\sin^2\\eta + \\sinh^2\\xi\\cos^2\\eta) = a^2(\\sinh^2\\xi + \\sin^2\\eta)\\). So \\(h_\\xi = h_\\eta = a\\sqrt{\\sinh^2\\xi + \\sin^2\\eta}\\). \\(h_z = 1\\) trivially.'
                },
            ]
        }
    ]
});
