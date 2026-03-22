// ============================================================
//  Chapter 2 — Tensors
//  "Quantities that transform properly"
//  7 sections · 6 visualizations · 10 exercises
// ============================================================
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Tensors',
    subtitle: 'Quantities that transform properly',
    sections: [

        // ================================================================
        // SECTION 1: Motivation — Why Tensors?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Tensors?',
            content: `
<h2>Why Tensors?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Problem</div>
    <div class="env-body">
        <p>Physics must not depend on the coordinates you happen to choose. A fluid's stress, a material's elasticity, spacetime curvature — none of these change just because you rotated your axes or switched from Cartesian to spherical coordinates. The objects that carry this coordinate-independence are <strong>tensors</strong>.</p>
    </div>
</div>

<p>You already know scalars and vectors. A scalar (temperature, mass, charge) is a single number that does not change under coordinate transformations. A vector (velocity, force, electric field) has components that <em>do</em> change, but in a very specific, predictable way: they transform according to the same rule as the coordinate displacements \\(dx^i\\).</p>

<p>But many physical quantities need <em>more</em> than a single direction. Stress in a material relates a force <em>vector</em> to a surface-normal <em>vector</em>. The moment of inertia relates an angular-velocity vector to an angular-momentum vector. The electromagnetic field combines electric and magnetic fields into a single object that mixes them under Lorentz boosts. These are all tensors of rank 2 (or higher).</p>

<h3>What Makes Something a Tensor?</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Informal)</div>
    <div class="env-body">
        <p>A <strong>tensor</strong> is a multi-indexed quantity whose components transform in a definite, homogeneous way under coordinate changes. The transformation rule is the <em>defining property</em>: if it transforms correctly, it is a tensor; if it does not, it is not.</p>
    </div>
</div>

<p>This "transformation law" viewpoint is the classical physicist's definition, and it is the one we develop in this chapter. (An equivalent, more modern approach defines tensors as multilinear maps on vectors and covectors; we touch on that perspective in the bridge section.)</p>

<h3>Scalars, Vectors, and Beyond</h3>

<p>Organizing by the number of indices:</p>

<table class="styled-table">
    <thead>
        <tr><th>Rank</th><th>Indices</th><th>Examples</th></tr>
    </thead>
    <tbody>
        <tr><td>0 (scalar)</td><td>none</td><td>Temperature \\(T\\), energy \\(E\\)</td></tr>
        <tr><td>1 (vector)</td><td>1</td><td>Velocity \\(v^i\\), gradient \\(\\partial_i \\phi\\)</td></tr>
        <tr><td>2</td><td>2</td><td>Stress \\(\\sigma^{ij}\\), metric \\(g_{ij}\\), inertia \\(I_{ij}\\)</td></tr>
        <tr><td>3</td><td>3</td><td>Levi-Civita symbol \\(\\epsilon_{ijk}\\)</td></tr>
        <tr><td>4</td><td>4</td><td>Riemann curvature \\(R^i{}_{jkl}\\), elasticity \\(C_{ijkl}\\)</td></tr>
    </tbody>
</table>

<p>Each additional index adds a "slot" that transforms independently. A rank-2 tensor in 3D has \\(3^2 = 9\\) components; a rank-4 tensor has \\(3^4 = 81\\) (though symmetries often reduce the independent count dramatically).</p>

<div class="env-block remark">
    <div class="env-title">Notation Convention</div>
    <div class="env-body">
        <p>Throughout this chapter we use Latin indices \\(i, j, k, \\ldots\\) running from 1 to \\(n\\) (usually \\(n=3\\)) for spatial tensors, and Greek indices \\(\\mu, \\nu, \\ldots\\) running from 0 to 3 for spacetime (relativistic) tensors. Upper indices are called <em>contravariant</em>, lower indices <em>covariant</em>.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-transformation"></div>
`,
            visualizations: [
                {
                    id: 'viz-transformation',
                    title: 'Vector Components Under Rotation',
                    description: 'A vector is a geometric arrow that does not change; only its components change when you rotate the coordinate axes. Drag the angle slider to rotate the basis and watch the components update according to the rotation matrix.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 50 });
                        var theta = 0;
                        var vx = 3, vy = 2;

                        VizEngine.createSlider(controls, '\u03b8 (deg)', -180, 180, 0, 1, function(v) {
                            theta = v * Math.PI / 180;
                        });

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();

                            var ct = Math.cos(theta), st = Math.sin(theta);
                            var ctx = viz.ctx;

                            // Rotated axes
                            var axLen = 5;
                            viz.drawSegment(0, 0, axLen * ct, axLen * st, viz.colors.blue + '66', 1.5);
                            viz.drawSegment(0, 0, -axLen * st, axLen * ct, viz.colors.teal + '66', 1.5);
                            viz.drawText("e'₁", axLen * ct + 0.3, axLen * st + 0.3, viz.colors.blue, 12);
                            viz.drawText("e'₂", -axLen * st + 0.3, axLen * ct + 0.3, viz.colors.teal, 12);

                            // Original axes (faint)
                            viz.drawSegment(0, 0, axLen, 0, viz.colors.text + '44', 1);
                            viz.drawSegment(0, 0, 0, axLen, viz.colors.text + '44', 1);
                            viz.drawText('e₁', axLen + 0.2, -0.3, viz.colors.text + '88', 11);
                            viz.drawText('e₂', 0.3, axLen + 0.2, viz.colors.text + '88', 11);

                            // The vector itself (invariant)
                            viz.drawVector(0, 0, vx, vy, viz.colors.orange, 'v', 2.5);

                            // Components in original frame
                            viz.drawSegment(vx, 0, vx, vy, viz.colors.text + '44', 1, true);
                            viz.drawSegment(0, vy, vx, vy, viz.colors.text + '44', 1, true);

                            // Components in rotated frame
                            var vx2 = ct * vx + st * vy;
                            var vy2 = -st * vx + ct * vy;

                            // Project onto rotated axes
                            var projX_end_x = vx2 * ct;
                            var projX_end_y = vx2 * st;
                            var projY_end_x = -vy2 * st;
                            var projY_end_y = vy2 * ct;

                            viz.drawSegment(0, 0, projX_end_x, projX_end_y, viz.colors.blue, 2, true);
                            viz.drawSegment(projX_end_x, projX_end_y, vx, vy, viz.colors.teal, 2, true);

                            // Info panel
                            var px = 10, py = 16;
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(px - 4, py - 12, 230, 90);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Original:  v = (' + vx.toFixed(1) + ', ' + vy.toFixed(1) + ')', px, py);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText("Rotated:   v' = (" + vx2.toFixed(2) + ', ' + vy2.toFixed(2) + ')', px, py + 18);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('\u03b8 = ' + (theta * 180 / Math.PI).toFixed(0) + '\u00b0', px, py + 38);
                            ctx.fillText('|v| = ' + Math.sqrt(vx*vx + vy*vy).toFixed(3) + ' (invariant)', px, py + 54);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A vector in 2D has components \\((3, 4)\\) in frame \\(S\\). Find its components in frame \\(S\'\\) that is rotated by \\(30°\\) counterclockwise relative to \\(S\\). Verify that the magnitude is unchanged.',
                    hint: 'Apply the rotation matrix: \\(v\'^i = R^i{}_j \\, v^j\\) where \\(R = \\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix}\\).',
                    solution: 'With \\(\\theta = 30°\\): \\(v\'_1 = 3\\cos 30° + 4\\sin 30° = 3(0.866) + 4(0.5) = 4.598\\), \\(v\'_2 = -3\\sin 30° + 4\\cos 30° = -1.5 + 3.464 = 1.964\\). Magnitude: \\(\\sqrt{4.598^2 + 1.964^2} = \\sqrt{21.14 + 3.86} = \\sqrt{25} = 5\\). In the original frame: \\(\\sqrt{9+16} = 5\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Covariant & Contravariant
        // ================================================================
        {
            id: 'sec-covariant',
            title: 'Covariant & Contravariant',
            content: `
<h2>Covariant and Contravariant Vectors</h2>

<div class="env-block intuition">
    <div class="env-title">Two Ways to Describe a Vector</div>
    <div class="env-body">
        <p>Imagine stretching the \\(x\\)-axis by a factor of 2. A displacement vector pointing along \\(x\\) does not physically change, but its \\(x\\)-component gets <em>halved</em> (since each unit of the new axis is twice as long). This is <strong>contravariant</strong> behavior: components change inversely to the basis.</p>
        <p>Now consider the gradient \\(\\partial \\phi / \\partial x\\). If \\(x\\) gets stretched by 2, the rate of change per unit \\(x\\) gets <em>doubled</em>. This is <strong>covariant</strong> behavior: components change the same way as the basis.</p>
    </div>
</div>

<h3>Coordinate Transformations</h3>

<p>Consider a change of coordinates \\(x^i \\to x'^i(x^1, \\ldots, x^n)\\). The Jacobian matrix and its inverse are:</p>

\\[
\\frac{\\partial x'^i}{\\partial x^j}, \\qquad \\frac{\\partial x^j}{\\partial x'^i}.
\\]

<div class="env-block definition">
    <div class="env-title">Definition (Contravariant Vector)</div>
    <div class="env-body">
        <p>A set of \\(n\\) quantities \\(V^i\\) forms a <strong>contravariant vector</strong> (or rank-(1,0) tensor) if under a coordinate change they transform as</p>
        \\[V'^i = \\frac{\\partial x'^i}{\\partial x^j} \\, V^j.\\]
        <p>The prototype is the coordinate differential \\(dx^i\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Covariant Vector)</div>
    <div class="env-body">
        <p>A set of \\(n\\) quantities \\(\\omega_i\\) forms a <strong>covariant vector</strong> (or rank-(0,1) tensor, or <em>covector</em>) if they transform as</p>
        \\[\\omega'_i = \\frac{\\partial x^j}{\\partial x'^i} \\, \\omega_j.\\]
        <p>The prototype is the gradient \\(\\partial \\phi / \\partial x^i\\).</p>
    </div>
</div>

<p>Notice the pattern: contravariant indices transform with \\(\\partial x' / \\partial x\\) (the "forward" Jacobian), while covariant indices transform with \\(\\partial x / \\partial x'\\) (the "backward" Jacobian). These are inverses of each other.</p>

<h3>General Tensors</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Tensor of Type \\((p, q)\\))</div>
    <div class="env-body">
        <p>A <strong>tensor of type \\((p, q)\\)</strong> (or rank \\(p+q\\)) is a quantity with \\(p\\) upper (contravariant) and \\(q\\) lower (covariant) indices that transforms as</p>
        \\[
        T'^{i_1 \\cdots i_p}{}_{j_1 \\cdots j_q} =
        \\frac{\\partial x'^{i_1}}{\\partial x^{k_1}} \\cdots \\frac{\\partial x'^{i_p}}{\\partial x^{k_p}}
        \\frac{\\partial x^{l_1}}{\\partial x'^{j_1}} \\cdots \\frac{\\partial x^{l_q}}{\\partial x'^{j_q}}
        \\, T^{k_1 \\cdots k_p}{}_{l_1 \\cdots l_q}.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Is the Christoffel Symbol a Tensor?</div>
    <div class="env-body">
        <p>The Christoffel symbol \\(\\Gamma^i_{jk}\\) has three indices, but it does <em>not</em> transform as a tensor. Under a coordinate change, it picks up an extra inhomogeneous term \\(\\partial^2 x'^i / \\partial x^j \\partial x^k\\). This is why \\(\\Gamma^i_{jk}\\) is called a <em>connection</em>, not a tensor. In contrast, the difference of two connections <em>is</em> a tensor.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.1 (Quotient Rule)</div>
    <div class="env-body">
        <p>If \\(T^{i_1 \\cdots}{}_{j_1 \\cdots} \\, V^{j_1} \\cdots\\) is a tensor for <em>every</em> tensor \\(V\\), then \\(T\\) is a tensor. More precisely: if the contraction of an unknown quantity with an arbitrary tensor always yields a tensor, then the unknown quantity is itself a tensor.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why Two Types?</div>
    <div class="env-body">
        <p>In Cartesian coordinates with an orthonormal basis, covariant and contravariant components are numerically identical, and the distinction seems pedantic. The difference becomes essential in curvilinear coordinates or when the metric is non-trivial (e.g., on a curved surface or in general relativity). There, the metric tensor \\(g_{ij}\\) mediates between the two types.</p>
    </div>
</div>
`,
            exercises: [
                {
                    question: 'A contravariant vector in 2D Cartesian has components \\(V^x = 2\\), \\(V^y = 1\\). Find its polar components \\(V^r\\) and \\(V^\\theta\\) at the point \\((x, y) = (1, 1)\\).',
                    hint: 'Use \\(V\'^i = \\frac{\\partial x\'^i}{\\partial x^j} V^j\\). You need \\(\\partial r/\\partial x\\), \\(\\partial r/\\partial y\\), \\(\\partial \\theta/\\partial x\\), \\(\\partial \\theta/\\partial y\\).',
                    solution: 'At \\((1,1)\\): \\(r = \\sqrt{2}\\), \\(\\theta = \\pi/4\\). We have \\(\\frac{\\partial r}{\\partial x} = \\cos\\theta = \\frac{1}{\\sqrt{2}}\\), \\(\\frac{\\partial r}{\\partial y} = \\sin\\theta = \\frac{1}{\\sqrt{2}}\\), \\(\\frac{\\partial \\theta}{\\partial x} = -\\frac{\\sin\\theta}{r} = -\\frac{1}{2}\\), \\(\\frac{\\partial \\theta}{\\partial y} = \\frac{\\cos\\theta}{r} = \\frac{1}{2}\\). So \\(V^r = \\frac{2+1}{\\sqrt{2}} = \\frac{3}{\\sqrt{2}} \\approx 2.12\\), \\(V^\\theta = \\frac{-2+1}{2} = -\\frac{1}{2}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Metric Tensor
        // ================================================================
        {
            id: 'sec-metric',
            title: 'The Metric Tensor',
            content: `
<h2>The Metric Tensor</h2>

<div class="env-block intuition">
    <div class="env-title">Measuring Distance</div>
    <div class="env-body">
        <p>In Cartesian coordinates, the distance between nearby points is \\(ds^2 = dx^2 + dy^2 + dz^2\\). In polar coordinates, it becomes \\(ds^2 = dr^2 + r^2 \\, d\\theta^2\\). The coefficients — 1 and \\(r^2\\) — encode how the coordinate grid is "stretched." The metric tensor \\(g_{ij}\\) collects all these stretching factors into a single object.</p>
    </div>
</div>

<h3>Definition and Properties</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Metric Tensor)</div>
    <div class="env-body">
        <p>The <strong>metric tensor</strong> \\(g_{ij}\\) is a symmetric, positive-definite (0,2)-tensor defined by the line element</p>
        \\[ds^2 = g_{ij} \\, dx^i \\, dx^j.\\]
        <p>It provides three fundamental operations:</p>
        <ol>
            <li><strong>Distance:</strong> \\(ds^2 = g_{ij} \\, dx^i \\, dx^j\\)</li>
            <li><strong>Inner product:</strong> \\(\\mathbf{u} \\cdot \\mathbf{v} = g_{ij} \\, u^i \\, v^j\\)</li>
            <li><strong>Index raising/lowering:</strong> converts between contravariant and covariant components</li>
        </ol>
    </div>
</div>

<h3>Raising and Lowering Indices</h3>

<p>The inverse metric \\(g^{ij}\\) is defined by \\(g^{ik} g_{kj} = \\delta^i_j\\). Using the metric and its inverse, we can freely convert between index positions:</p>

\\[
V_i = g_{ij} \\, V^j \\qquad \\text{(lowering)}, \\qquad V^i = g^{ij} \\, V_j \\qquad \\text{(raising)}.
\\]

<div class="env-block example">
    <div class="env-title">Example: Polar Coordinates</div>
    <div class="env-body">
        <p>In 2D polar coordinates, \\(ds^2 = dr^2 + r^2 \\, d\\theta^2\\), so</p>
        \\[g_{ij} = \\begin{pmatrix} 1 & 0 \\\\ 0 & r^2 \\end{pmatrix}, \\qquad g^{ij} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1/r^2 \\end{pmatrix}.\\]
        <p>A contravariant vector \\(V^r = 3\\), \\(V^\\theta = 2\\) has covariant components \\(V_r = g_{rr} V^r = 3\\), \\(V_\\theta = g_{\\theta\\theta} V^\\theta = 2r^2\\). The covariant component \\(V_\\theta\\) depends on position through \\(r\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Spherical Coordinates</div>
    <div class="env-body">
        <p>In spherical coordinates \\((r, \\theta, \\phi)\\), the line element is \\(ds^2 = dr^2 + r^2 d\\theta^2 + r^2 \\sin^2\\theta \\, d\\phi^2\\), giving</p>
        \\[g_{ij} = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & r^2 & 0 \\\\ 0 & 0 & r^2 \\sin^2\\theta \\end{pmatrix}.\\]
        <p>The volume element is \\(\\sqrt{\\det g} \\, dr\\,d\\theta\\,d\\phi = r^2 \\sin\\theta \\, dr\\,d\\theta\\,d\\phi\\), the familiar Jacobian.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.2 (Metric Determines Geometry)</div>
    <div class="env-body">
        <p>All intrinsic geometric information (distances, angles, volumes, curvature) is encoded in the metric tensor. Two spaces with the same metric tensor are intrinsically identical, regardless of how they are embedded in a higher-dimensional space.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-metric-tensor"></div>
`,
            visualizations: [
                {
                    id: 'viz-metric-tensor',
                    title: 'Metric Tensor: Distorted Coordinate Grid',
                    description: 'See how the metric tensor distorts the coordinate grid. In Cartesian coordinates the grid is uniform; in polar coordinates the angular spacing grows with radius. Toggle between coordinate systems to see the metric at work.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 40 });
                        var mode = 0; // 0=cartesian, 1=polar, 2=custom

                        var gxx = 1, gyy = 1, gxy = 0;

                        VizEngine.createButton(controls, 'Cartesian', function() { mode = 0; });
                        VizEngine.createButton(controls, 'Polar', function() { mode = 1; });
                        VizEngine.createButton(controls, 'Custom Metric', function() { mode = 2; });

                        var slGxx = VizEngine.createSlider(controls, 'g₁₁', 0.2, 3, 1, 0.1, function(v) { gxx = v; });
                        var slGyy = VizEngine.createSlider(controls, 'g₂₂', 0.2, 3, 1, 0.1, function(v) { gyy = v; });
                        var slGxy = VizEngine.createSlider(controls, 'g₁₂', -1.5, 1.5, 0, 0.1, function(v) { gxy = v; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (mode === 0) {
                                // Cartesian: uniform grid
                                viz.drawGrid();
                                viz.drawAxes();
                                viz.screenText('Cartesian: g_ij = \u03b4_ij (identity)', viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('ds\u00b2 = dx\u00b2 + dy\u00b2', viz.width / 2, 38, viz.colors.teal, 12);

                                // Draw a small "unit circle" at origin
                                viz.drawCircle(0, 0, 1, null, viz.colors.orange, 2);
                                viz.drawText('unit circle', 1.5, 1.2, viz.colors.orange, 11);
                            } else if (mode === 1) {
                                // Polar coordinate lines
                                viz.screenText('Polar: ds\u00b2 = dr\u00b2 + r\u00b2 d\u03b8\u00b2', viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('g_rr = 1, g_\u03b8\u03b8 = r\u00b2', viz.width / 2, 38, viz.colors.teal, 12);

                                // Radial lines
                                for (var a = 0; a < 2 * Math.PI; a += Math.PI / 12) {
                                    var ex = 6 * Math.cos(a), ey = 6 * Math.sin(a);
                                    viz.drawSegment(0, 0, ex, ey, viz.colors.grid, 0.8);
                                }
                                // Circular lines
                                for (var rr = 1; rr <= 5; rr++) {
                                    ctx.strokeStyle = viz.colors.blue + '66';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    var sc = viz.toScreen(0, 0);
                                    ctx.arc(sc[0], sc[1], rr * viz.scale, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Show a small displacement at two radii
                                var dtheta = Math.PI / 12;
                                for (var ri = 0; ri < 2; ri++) {
                                    var rad = ri === 0 ? 1.5 : 3.5;
                                    var col = ri === 0 ? viz.colors.orange : viz.colors.green;
                                    var a1 = Math.PI / 6, a2 = a1 + dtheta;
                                    ctx.strokeStyle = col; ctx.lineWidth = 3;
                                    ctx.beginPath();
                                    ctx.arc(sc[0], sc[1], rad * viz.scale, -a2, -a1);
                                    ctx.stroke();
                                    var arcLen = (rad * dtheta).toFixed(2);
                                    var mx = rad * Math.cos((a1 + a2) / 2);
                                    var my = rad * Math.sin((a1 + a2) / 2);
                                    viz.drawText('r\u0394\u03b8=' + arcLen, mx + 0.8, my + 0.3, col, 11);
                                }

                                viz.screenText('Same \u0394\u03b8, different arc length: g_\u03b8\u03b8 = r\u00b2 grows with r', viz.width / 2, viz.height - 20, viz.colors.text, 11);
                            } else {
                                // Custom metric: draw deformed grid
                                viz.screenText('Custom Metric', viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('g = [' + gxx.toFixed(1) + ', ' + gxy.toFixed(1) + '; ' + gxy.toFixed(1) + ', ' + gyy.toFixed(1) + ']', viz.width / 2, 38, viz.colors.teal, 12);

                                // Eigenvalues of g for the ellipse
                                var det = gxx * gyy - gxy * gxy;
                                if (det <= 0.01) {
                                    viz.screenText('Metric is degenerate (det \u2264 0)', viz.width / 2, viz.height / 2, viz.colors.red, 14);
                                    return;
                                }

                                // Use Cholesky-like decomposition to draw grid
                                // g = L L^T, map (u,v) -> L (u,v)
                                var sqGxx = Math.sqrt(gxx);
                                var l21 = gxy / sqGxx;
                                var l22 = Math.sqrt(gyy - l21 * l21);

                                function mapPt(u, v) {
                                    return [sqGxx * u, l21 * u + l22 * v];
                                }

                                // Draw transformed grid
                                for (var gu = -5; gu <= 5; gu++) {
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.7;
                                    ctx.beginPath();
                                    for (var step = -5; step <= 5; step += 0.2) {
                                        var pp = mapPt(gu, step);
                                        var sp = viz.toScreen(pp[0], pp[1]);
                                        step === -5 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                    }
                                    ctx.stroke();
                                    ctx.beginPath();
                                    for (var step2 = -5; step2 <= 5; step2 += 0.2) {
                                        var pp2 = mapPt(step2, gu);
                                        var sp2 = viz.toScreen(pp2[0], pp2[1]);
                                        step2 === -5 ? ctx.moveTo(sp2[0], sp2[1]) : ctx.lineTo(sp2[0], sp2[1]);
                                    }
                                    ctx.stroke();
                                }

                                // Draw the "unit circle" = ellipse defined by g
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var th = 0; th <= 2 * Math.PI + 0.01; th += 0.05) {
                                    var uu = Math.cos(th), vv = Math.sin(th);
                                    var pp3 = mapPt(uu, vv);
                                    var sp3 = viz.toScreen(pp3[0], pp3[1]);
                                    th === 0 ? ctx.moveTo(sp3[0], sp3[1]) : ctx.lineTo(sp3[0], sp3[1]);
                                }
                                ctx.stroke();

                                viz.drawText('"unit circle" of metric', 0, -3.5, viz.colors.orange, 11);
                                viz.screenText('det(g) = ' + det.toFixed(2), viz.width / 2, viz.height - 20, viz.colors.text, 11);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write down the metric tensor \\(g_{ij}\\) for 2D coordinates \\((u, v)\\) defined by \\(x = u + v\\), \\(y = u - v\\). Is this metric diagonal?',
                    hint: 'Compute \\(dx = du + dv\\), \\(dy = du - dv\\), then expand \\(ds^2 = dx^2 + dy^2\\) in terms of \\(du\\) and \\(dv\\).',
                    solution: '\\(ds^2 = (du+dv)^2 + (du-dv)^2 = 2\\,du^2 + 2\\,dv^2\\). So \\(g_{ij} = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}\\). Yes, it is diagonal. These coordinates are Cartesian axes rotated by \\(45°\\) and scaled by \\(\\sqrt{2}\\).'
                },
                {
                    question: 'In 2D with metric \\(g_{ij} = \\begin{pmatrix} 4 & 1 \\\\ 1 & 2 \\end{pmatrix}\\), find (a) the length of the vector \\(V^i = (1, 1)\\), and (b) the angle between \\(V^i = (1, 0)\\) and \\(W^i = (0, 1)\\).',
                    hint: 'Length squared is \\(g_{ij} V^i V^j\\). For the angle, use \\(\\cos\\alpha = \\frac{g_{ij} V^i W^j}{|V||W|}\\).',
                    solution: '(a) \\(|V|^2 = g_{11}(1)^2 + 2g_{12}(1)(1) + g_{22}(1)^2 = 4 + 2 + 2 = 8\\), so \\(|V| = 2\\sqrt{2}\\). (b) \\(g_{ij}V^i W^j = g_{12} = 1\\), \\(|V| = \\sqrt{g_{11}} = 2\\), \\(|W| = \\sqrt{g_{22}} = \\sqrt{2}\\). \\(\\cos\\alpha = 1/(2\\sqrt{2}) \\approx 0.354\\), \\(\\alpha \\approx 69.3°\\). The non-diagonal metric makes the coordinate axes non-orthogonal.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Tensor Operations
        // ================================================================
        {
            id: 'sec-operations',
            title: 'Tensor Operations',
            content: `
<h2>Tensor Operations</h2>

<p>Tensors form an algebra. You can add them, multiply them, and contract them, and the results are always tensors. This is a powerful structural guarantee.</p>

<h3>Outer Product (Tensor Product)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Outer Product)</div>
    <div class="env-body">
        <p>Given a type-\\((p, q)\\) tensor \\(A\\) and a type-\\((r, s)\\) tensor \\(B\\), their <strong>outer product</strong> \\(C = A \\otimes B\\) is a type-\\((p+r, q+s)\\) tensor with components</p>
        \\[C^{i_1 \\cdots i_p \\, k_1 \\cdots k_r}{}_{j_1 \\cdots j_q \\, l_1 \\cdots l_s} = A^{i_1 \\cdots i_p}{}_{j_1 \\cdots j_q} \\, B^{k_1 \\cdots k_r}{}_{l_1 \\cdots l_s}.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>If \\(u^i\\) and \\(v^j\\) are contravariant vectors, then \\(T^{ij} = u^i v^j\\) is a rank-2 contravariant tensor. In 3D, this gives a \\(3 \\times 3\\) matrix. Not every rank-2 tensor is an outer product of two vectors (those that are are called <em>simple</em> or <em>decomposable</em>).</p>
    </div>
</div>

<h3>Contraction</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Contraction)</div>
    <div class="env-body">
        <p><strong>Contraction</strong> is setting one upper index equal to one lower index and summing. If \\(T^{ij}{}_{k}\\) is a (2,1)-tensor, then \\(S^j = T^{ij}{}_{i}\\) is a (1,0)-tensor (a vector). Contraction reduces rank by 2.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Trace of a Matrix</div>
    <div class="env-body">
        <p>The trace of a matrix \\(A^i{}_j\\) is \\(\\text{tr}(A) = A^i{}_i = A^1{}_1 + A^2{}_2 + \\cdots + A^n{}_n\\). This is a contraction, and the result is a scalar (invariant under coordinate changes).</p>
    </div>
</div>

<h3>Symmetrization and Antisymmetrization</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Symmetric and Antisymmetric Parts)</div>
    <div class="env-body">
        <p>For a rank-2 tensor \\(T_{ij}\\):</p>
        <ul>
            <li><strong>Symmetric part:</strong> \\(T_{(ij)} = \\frac{1}{2}(T_{ij} + T_{ji})\\)</li>
            <li><strong>Antisymmetric part:</strong> \\(T_{[ij]} = \\frac{1}{2}(T_{ij} - T_{ji})\\)</li>
        </ul>
        <p>Every rank-2 tensor decomposes uniquely: \\(T_{ij} = T_{(ij)} + T_{[ij]}\\).</p>
    </div>
</div>

<p>A symmetric tensor in \\(n\\) dimensions has \\(\\frac{n(n+1)}{2}\\) independent components. An antisymmetric tensor has \\(\\frac{n(n-1)}{2}\\). Together: \\(\\frac{n(n+1)}{2} + \\frac{n(n-1)}{2} = n^2\\). \\(\\checkmark\\)</p>

<h3>Inner Product via Contraction</h3>

<p>The dot product of two vectors can be written as a two-step process: outer product followed by contraction.</p>

\\[\\mathbf{u} \\cdot \\mathbf{v} = g_{ij} \\, u^i \\, v^j = u_i \\, v^i.\\]

<p>More generally, any "product with summed indices" is a contraction of an outer product.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.3 (Tensor Operations Preserve Tensor Character)</div>
    <div class="env-body">
        <p>The following operations on tensors yield tensors:</p>
        <ol>
            <li>Addition of tensors of the same type</li>
            <li>Scalar multiplication</li>
            <li>Outer product of any two tensors</li>
            <li>Contraction of any one upper with any one lower index</li>
            <li>Symmetrization or antisymmetrization over indices of the same type</li>
        </ol>
    </div>
</div>
`,
            exercises: [
                {
                    question: 'Let \\(A^i{}_j\\) be a (1,1)-tensor in 3D with components \\(A^1{}_1 = 2\\), \\(A^1{}_2 = 3\\), \\(A^2{}_1 = -1\\), \\(A^2{}_2 = 4\\), \\(A^3{}_3 = 1\\), and all other components zero. Compute the contraction \\(A^i{}_i\\). Is the result a scalar?',
                    hint: 'Sum the diagonal entries.',
                    solution: '\\(A^i{}_i = A^1{}_1 + A^2{}_2 + A^3{}_3 = 2 + 4 + 1 = 7\\). Yes, the contraction of a (1,1)-tensor is a scalar (invariant), which is the trace.'
                },
                {
                    question: 'Decompose the matrix \\(T_{ij} = \\begin{pmatrix} 1 & 4 \\\\ 2 & 3 \\end{pmatrix}\\) into its symmetric and antisymmetric parts.',
                    hint: 'Use \\(T_{(ij)} = \\frac{1}{2}(T_{ij} + T_{ji})\\) and \\(T_{[ij]} = \\frac{1}{2}(T_{ij} - T_{ji})\\).',
                    solution: '\\(T_{(ij)} = \\frac{1}{2}\\begin{pmatrix} 2 & 6 \\\\ 6 & 6 \\end{pmatrix} = \\begin{pmatrix} 1 & 3 \\\\ 3 & 3 \\end{pmatrix}\\), \\(T_{[ij]} = \\frac{1}{2}\\begin{pmatrix} 0 & 2 \\\\ -2 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\). Check: sum gives \\(\\begin{pmatrix} 1 & 4 \\\\ 2 & 3 \\end{pmatrix} = T_{ij}\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Physical Tensors
        // ================================================================
        {
            id: 'sec-physical',
            title: 'Physical Tensors',
            content: `
<h2>Physical Tensors</h2>

<p>Tensors are not just mathematical abstractions. Nearly every branch of physics uses rank-2 (and higher) tensors as fundamental objects. Here we examine three iconic examples.</p>

<h3>The Stress Tensor \\(\\sigma_{ij}\\)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Cauchy Stress Tensor)</div>
    <div class="env-body">
        <p>The <strong>stress tensor</strong> \\(\\sigma_{ij}\\) at a point in a continuous medium gives the \\(i\\)-th component of the force per unit area acting on a surface element whose outward normal points in the \\(j\\)-th direction:</p>
        \\[dF_i = \\sigma_{ij} \\, \\hat{n}_j \\, dA.\\]
        <p>It is symmetric (\\(\\sigma_{ij} = \\sigma_{ji}\\)) by the balance of angular momentum, so it has 6 independent components in 3D.</p>
    </div>
</div>

<p>The diagonal components \\(\\sigma_{11}, \\sigma_{22}, \\sigma_{33}\\) are <em>normal stresses</em> (tension or compression). The off-diagonal components \\(\\sigma_{12}, \\sigma_{13}, \\sigma_{23}\\) are <em>shear stresses</em>.</p>

<div class="env-block remark">
    <div class="env-title">Why Stress Needs a Tensor</div>
    <div class="env-body">
        <p>A scalar cannot describe stress because the force depends on the <em>orientation</em> of the surface you cut. A vector fails because there are three independent surface orientations and three force components. You need a \\(3 \\times 3\\) object: the stress tensor.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-stress-tensor"></div>

<h3>The Moment of Inertia Tensor \\(I_{ij}\\)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Inertia Tensor)</div>
    <div class="env-body">
        <p>The <strong>moment of inertia tensor</strong> maps angular velocity \\(\\omega^j\\) to angular momentum \\(L^i\\):</p>
        \\[L_i = I_{ij} \\, \\omega^j.\\]
        <p>For a rigid body with mass distribution \\(\\rho(\\mathbf{r})\\):</p>
        \\[I_{ij} = \\int \\rho(\\mathbf{r}) \\left( |\\mathbf{r}|^2 \\delta_{ij} - r_i r_j \\right) dV.\\]
        <p>It is symmetric and positive-definite, so it has 3 real principal axes with positive principal moments \\(I_1, I_2, I_3\\). The inertia ellipsoid is a visual representation of these principal values.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-inertia-tensor"></div>

<h3>The Electromagnetic Field Tensor \\(F_{\\mu\\nu}\\)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Field Strength Tensor)</div>
    <div class="env-body">
        <p>In special relativity, the electric field \\(\\mathbf{E}\\) and magnetic field \\(\\mathbf{B}\\) combine into the antisymmetric rank-2 <strong>electromagnetic field tensor</strong>:</p>
        \\[
        F_{\\mu\\nu} = \\begin{pmatrix}
        0 & E_x/c & E_y/c & E_z/c \\\\
        -E_x/c & 0 & -B_z & B_y \\\\
        -E_y/c & B_z & 0 & -B_x \\\\
        -E_z/c & -B_y & B_x & 0
        \\end{pmatrix}.
        \\]
        <p>Being antisymmetric (\\(F_{\\mu\\nu} = -F_{\\nu\\mu}\\)), it has \\(\\frac{4 \\times 3}{2} = 6\\) independent components, matching the 3 components of \\(\\mathbf{E}\\) plus 3 of \\(\\mathbf{B}\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why One Tensor Instead of Two Vectors?</div>
    <div class="env-body">
        <p>Under a Lorentz boost, \\(\\mathbf{E}\\) and \\(\\mathbf{B}\\) mix: a pure electric field in one frame has a magnetic component in another. The tensor \\(F_{\\mu\\nu}\\) is the natural object because it transforms homogeneously under the Lorentz group. Maxwell's equations in tensor form are elegantly compact:</p>
        \\[\\partial_\\mu F^{\\mu\\nu} = \\mu_0 J^\\nu, \\qquad \\partial_{[\\mu} F_{\\nu\\lambda]} = 0.\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-em-tensor"></div>
`,
            visualizations: [
                {
                    id: 'viz-stress-tensor',
                    title: 'Stress Tensor on a Material Element',
                    description: 'Drag the angle slider to rotate the surface orientation and see how the stress vector (traction) changes. The stress tensor maps the surface normal to the force per unit area acting on that surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 50 });

                        // Stress tensor components (symmetric)
                        var s11 = 2, s22 = 1, s12 = 0.8;
                        var angle = 0;

                        VizEngine.createSlider(controls, 'Surface angle', 0, 360, 0, 1, function(v) { angle = v * Math.PI / 180; });
                        VizEngine.createSlider(controls, '\u03c3\u2081\u2081', -2, 3, s11, 0.1, function(v) { s11 = v; });
                        VizEngine.createSlider(controls, '\u03c3\u2082\u2082', -2, 3, s22, 0.1, function(v) { s22 = v; });
                        VizEngine.createSlider(controls, '\u03c3\u2081\u2082', -2, 2, s12, 0.1, function(v) { s12 = v; });

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Draw material element (square centered at origin)
                            var hw = 1.5;
                            viz.drawPolygon([[-hw,-hw],[hw,-hw],[hw,hw],[-hw,hw]], viz.colors.blue + '11', viz.colors.blue + '44', 1);

                            // Surface normal
                            var nx = Math.cos(angle), ny = Math.sin(angle);

                            // Traction vector: t_i = sigma_ij n_j
                            var tx = s11 * nx + s12 * ny;
                            var ty = s12 * nx + s22 * ny;

                            // Draw the surface (a line perpendicular to n)
                            var px = -ny * 2, py = nx * 2;
                            viz.drawSegment(-px, -py, px, py, viz.colors.teal, 2);

                            // Draw normal
                            viz.drawVector(0, 0, nx * 1.5, ny * 1.5, viz.colors.white, 'n\u0302', 1.5);

                            // Draw traction
                            viz.drawVector(0, 0, tx, ty, viz.colors.orange, 't', 2.5);

                            // Normal and shear components
                            var tn = tx * nx + ty * ny; // normal component
                            var ts = -tx * ny + ty * nx; // shear component

                            // Info
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(8, 8, 230, 80);
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('\u03c3 = [' + s11.toFixed(1) + ', ' + s12.toFixed(1) + '; ' + s12.toFixed(1) + ', ' + s22.toFixed(1) + ']', 14, 14);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('t = (' + tx.toFixed(2) + ', ' + ty.toFixed(2) + ')', 14, 32);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Normal stress: ' + tn.toFixed(2), 14, 50);
                            ctx.fillText('Shear stress:  ' + ts.toFixed(2), 14, 66);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-inertia-tensor',
                    title: 'Moment of Inertia Ellipsoid',
                    description: 'The inertia tensor can be visualized as an ellipsoid whose principal axes align with the eigenvectors and whose semi-axes are proportional to 1/sqrt(I_k). Adjust the principal moments to reshape the ellipsoid and see how angular momentum L relates to angular velocity omega.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 60 });
                        var I1 = 1, I2 = 2, I3 = 3;
                        var omAngle = 0; // angle of omega in the 1-2 plane

                        VizEngine.createSlider(controls, 'I\u2081', 0.3, 5, I1, 0.1, function(v) { I1 = v; });
                        VizEngine.createSlider(controls, 'I\u2082', 0.3, 5, I2, 0.1, function(v) { I2 = v; });
                        VizEngine.createSlider(controls, '\u03c9 angle', 0, 360, 0, 1, function(v) { omAngle = v * Math.PI / 180; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw ellipse for the 2D projection of the inertia ellipsoid
                            // Semi-axes: a = 1/sqrt(I1), b = 1/sqrt(I2) (scaled for display)
                            var sc = 2;
                            var a = sc / Math.sqrt(I1);
                            var b = sc / Math.sqrt(I2);

                            // Draw ellipse
                            viz.drawEllipse(0, 0, a, b, 0, viz.colors.blue + '22', viz.colors.blue);

                            // Principal axes
                            viz.drawSegment(-a - 0.5, 0, a + 0.5, 0, viz.colors.blue + '66', 1, true);
                            viz.drawSegment(0, -b - 0.5, 0, b + 0.5, viz.colors.teal + '66', 1, true);
                            viz.drawText('I\u2081=' + I1.toFixed(1), a + 0.3, -0.3, viz.colors.blue, 11);
                            viz.drawText('I\u2082=' + I2.toFixed(1), 0.3, b + 0.3, viz.colors.teal, 11);

                            // Omega vector
                            var omLen = 2;
                            var ox = omLen * Math.cos(omAngle);
                            var oy = omLen * Math.sin(omAngle);
                            viz.drawVector(0, 0, ox, oy, viz.colors.green, '\u03c9', 2);

                            // L = I * omega
                            var lx = I1 * ox;
                            var ly = I2 * oy;
                            // Normalize for display
                            var lLen = Math.sqrt(lx * lx + ly * ly);
                            var lDisp = 2.5;
                            if (lLen > 0.01) {
                                var lxd = lx / lLen * lDisp;
                                var lyd = ly / lLen * lDisp;
                                viz.drawVector(0, 0, lxd, lyd, viz.colors.orange, 'L', 2);
                            }

                            // Angle between omega and L
                            var dot = ox * lx + oy * ly;
                            var omMag = Math.sqrt(ox * ox + oy * oy);
                            var lMag = Math.sqrt(lx * lx + ly * ly);
                            var cosA = (omMag > 0.01 && lMag > 0.01) ? dot / (omMag * lMag) : 1;
                            var angleDeg = Math.acos(Math.min(1, Math.max(-1, cosA))) * 180 / Math.PI;

                            viz.screenText('Inertia Ellipsoid (2D cross-section)', viz.width / 2, 18, viz.colors.white, 13);
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('L = I\u00b7\u03c9 \u2014 angle between \u03c9 and L: ' + angleDeg.toFixed(1) + '\u00b0', viz.width / 2, viz.height - 30);
                            ctx.fillText('L \u2225 \u03c9 only when \u03c9 aligns with a principal axis (I\u2081 = I\u2082 or along an axis)', viz.width / 2, viz.height - 14);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-em-tensor',
                    title: 'Electromagnetic Field Tensor F_\u03bc\u03bd',
                    description: 'The 4x4 antisymmetric tensor F combines E and B. Adjust E and B components to see how the tensor matrix changes. The upper-right triangle encodes E/c, and the lower-right 3x3 block encodes B.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, originX: 0, originY: 0, scale: 1 });
                        var Ex = 1, Ey = 0, Ez = 0;
                        var Bx = 0, By = 0, Bz = 0.5;

                        VizEngine.createSlider(controls, 'E_x', -2, 2, Ex, 0.1, function(v) { Ex = v; });
                        VizEngine.createSlider(controls, 'E_y', -2, 2, Ey, 0.1, function(v) { Ey = v; });
                        VizEngine.createSlider(controls, 'B_z', -2, 2, Bz, 0.1, function(v) { Bz = v; });
                        VizEngine.createSlider(controls, 'B_x', -2, 2, Bx, 0.1, function(v) { Bx = v; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Electromagnetic Field Tensor F_\u03bc\u03bd', viz.width / 2, 20, viz.colors.white, 14);

                            // Build F matrix (using c=1 convention for display)
                            var F = [
                                [0, Ex, Ey, Ez],
                                [-Ex, 0, -Bz, By],
                                [-Ey, Bz, 0, -Bx],
                                [-Ez, -By, Bx, 0]
                            ];

                            var labels = ['\u03bc=0', '\u03bc=1', '\u03bc=2', '\u03bc=3'];
                            var colLabels = ['\u03bd=0', '\u03bd=1', '\u03bd=2', '\u03bd=3'];

                            // Draw matrix
                            var cellW = 80, cellH = 40;
                            var startX = (viz.width - 4 * cellW) / 2 + 20;
                            var startY = 70;

                            // Column labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            for (var c = 0; c < 4; c++) {
                                ctx.fillText(colLabels[c], startX + c * cellW + cellW / 2, startY - 4);
                            }

                            for (var row = 0; row < 4; row++) {
                                // Row label
                                ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                                ctx.fillText(labels[row], startX - 8, startY + row * cellH + cellH / 2);

                                for (var col = 0; col < 4; col++) {
                                    var val = F[row][col];
                                    var cx = startX + col * cellW;
                                    var cy = startY + row * cellH;

                                    // Color: E components blue, B components teal, zero grey
                                    var isE = (row === 0 || col === 0) && !(row === 0 && col === 0);
                                    var isZero = Math.abs(val) < 0.001;
                                    var bgCol, txtCol;
                                    if (isZero) {
                                        bgCol = viz.colors.bg; txtCol = viz.colors.text + '44';
                                    } else if (isE) {
                                        var intensity = Math.min(1, Math.abs(val) / 2);
                                        bgCol = viz.colors.blue + Math.round(intensity * 50 + 10).toString(16).padStart(2, '0');
                                        txtCol = viz.colors.blue;
                                    } else {
                                        var intensityB = Math.min(1, Math.abs(val) / 2);
                                        bgCol = viz.colors.teal + Math.round(intensityB * 50 + 10).toString(16).padStart(2, '0');
                                        txtCol = viz.colors.teal;
                                    }

                                    ctx.fillStyle = bgCol;
                                    ctx.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);

                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.5;
                                    ctx.strokeRect(cx, cy, cellW, cellH);

                                    ctx.fillStyle = txtCol;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(val.toFixed(1), cx + cellW / 2, cy + cellH / 2);
                                }
                            }

                            // Legend
                            var legY = startY + 4 * cellH + 20;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(startX, legY, 12, 12);
                            ctx.fillText('E components (row 0 / col 0)', startX + 18, legY + 10);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(startX + 230, legY, 12, 12);
                            ctx.fillText('B components (spatial block)', startX + 248, legY + 10);

                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('F_\u03bc\u03bd = -F_\u03bd\u03bc (antisymmetric) \u2192 6 independent components = 3(E) + 3(B)', startX, legY + 30);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The stress tensor in a fluid at rest is \\(\\sigma_{ij} = -p \\, \\delta_{ij}\\), where \\(p\\) is the pressure. Show that the force per unit area on <em>any</em> surface is normal to the surface with magnitude \\(p\\).',
                    hint: 'Compute the traction \\(t_i = \\sigma_{ij} n_j\\) and show it equals \\(-p \\, n_i\\).',
                    solution: '\\(t_i = \\sigma_{ij} n_j = -p \\, \\delta_{ij} n_j = -p \\, n_i\\). The traction is \\(-p \\hat{n}\\), which is anti-parallel to the normal with magnitude \\(p\\). This is isotropic compression, as expected for a fluid at rest.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Einstein Summation Convention
        // ================================================================
        {
            id: 'sec-einstein',
            title: 'Einstein Summation Convention',
            content: `
<h2>Einstein Summation Convention</h2>

<div class="env-block intuition">
    <div class="env-title">Dropping the Sigma</div>
    <div class="env-body">
        <p>In tensor equations, summation signs appear so frequently that they become visual clutter. Einstein's convention is simple: <strong>any index that appears exactly twice in a single term (once up, once down) is automatically summed over.</strong> An index that appears only once is a <em>free</em> index and is not summed.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Einstein Convention)</div>
    <div class="env-body">
        <p>A <strong>repeated index</strong> (also called a <em>dummy index</em>) appearing once as a superscript and once as a subscript in the same term implies summation over that index from 1 to \\(n\\) (or 0 to 3 in relativity):</p>
        \\[a_i b^i \\equiv \\sum_{i=1}^{n} a_i b^i.\\]
        <p>A <strong>free index</strong> appears exactly once (same position on both sides of an equation) and represents \\(n\\) separate equations.</p>
    </div>
</div>

<h3>Rules</h3>

<ol>
    <li>A repeated index must appear <em>once up and once down</em>.</li>
    <li>No index may appear three or more times in a single term.</li>
    <li>Free indices must match (same letter, same position) on every term of an equation.</li>
    <li>Dummy indices can be freely renamed: \\(a_i b^i = a_j b^j = a_k b^k\\).</li>
</ol>

<h3>Examples</h3>

<table class="styled-table">
    <thead>
        <tr><th>Einstein notation</th><th>Explicit form</th><th>Meaning</th></tr>
    </thead>
    <tbody>
        <tr><td>\\(a_i b^i\\)</td><td>\\(\\sum_i a_i b^i\\)</td><td>dot product</td></tr>
        <tr><td>\\(A^i{}_j x^j\\)</td><td>\\(\\sum_j A^i{}_j x^j\\)</td><td>matrix-vector product</td></tr>
        <tr><td>\\(A^i{}_k B^k{}_j\\)</td><td>\\(\\sum_k A^i{}_k B^k{}_j\\)</td><td>matrix multiplication</td></tr>
        <tr><td>\\(A^i{}_i\\)</td><td>\\(\\sum_i A^i{}_i\\)</td><td>trace</td></tr>
        <tr><td>\\(g_{ij} V^j\\)</td><td>\\(\\sum_j g_{ij} V^j\\)</td><td>index lowering</td></tr>
        <tr><td>\\(\\partial_\\mu F^{\\mu\\nu}\\)</td><td>\\(\\sum_\\mu \\partial_\\mu F^{\\mu\\nu}\\)</td><td>divergence of \\(F\\)</td></tr>
        <tr><td>\\(T^{ij} = A^i B^j\\)</td><td>(no sum; both free)</td><td>outer product</td></tr>
    </tbody>
</table>

<div class="env-block remark">
    <div class="env-title">Einstein's Own Assessment</div>
    <div class="env-body">
        <p>Einstein reportedly called the summation convention his "greatest contribution to mathematics." While said in jest, it is true that this simple notational device makes tensor equations dramatically more compact and easier to manipulate. Without it, general relativity's field equations would be nearly unreadable.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-einstein-convention"></div>

<h3>The Kronecker Delta and Levi-Civita Symbol</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Kronecker Delta)</div>
    <div class="env-body">
        <p>\\(\\delta^i_j = \\begin{cases} 1 & \\text{if } i = j, \\\\ 0 & \\text{if } i \\neq j. \\end{cases}\\)</p>
        <p>It acts as the identity: \\(\\delta^i_j V^j = V^i\\) and \\(\\delta^i_i = n\\) (the dimension).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Levi-Civita Symbol)</div>
    <div class="env-body">
        <p>In 3D, \\(\\epsilon_{ijk}\\) equals \\(+1\\) for even permutations of \\((1,2,3)\\), \\(-1\\) for odd permutations, and 0 if any two indices are equal. The cross product is \\((\\mathbf{a} \\times \\mathbf{b})^i = \\epsilon^{ijk} a_j b_k\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.4 (\\(\\epsilon\\)-\\(\\delta\\) Identity)</div>
    <div class="env-body">
        <p>\\(\\epsilon_{ijk} \\epsilon_{imn} = \\delta_{jm} \\delta_{kn} - \\delta_{jn} \\delta_{km}.\\)</p>
        <p>This identity is immensely useful for simplifying vector identities like \\(\\mathbf{A} \\times (\\mathbf{B} \\times \\mathbf{C})\\) using index notation.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-einstein-convention',
                    title: 'Einstein Summation: Animated',
                    description: 'Watch how a repeated index triggers automatic summation. The animation highlights each term in the sum as the dummy index runs through its values.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, originX: 0, originY: 0, scale: 1 });

                        var examples = [
                            {
                                label: 'Dot product: a_i b^i',
                                a: [2, 3, 1],
                                b: [4, -1, 5],
                                build: function(idx) {
                                    var terms = [];
                                    for (var i = 0; i <= idx; i++) {
                                        terms.push('a_' + (i+1) + 'b^' + (i+1) + ' = ' + this.a[i] + '\u00b7' + this.b[i] + ' = ' + (this.a[i]*this.b[i]));
                                    }
                                    var sum = 0;
                                    for (var j = 0; j <= idx; j++) sum += this.a[j] * this.b[j];
                                    return { terms: terms, partial: sum, done: idx >= 2, total: this.a[0]*this.b[0]+this.a[1]*this.b[1]+this.a[2]*this.b[2] };
                                }
                            },
                            {
                                label: 'Matrix-vector: A^i_j x^j (row i=1)',
                                A: [[1, 2, 0], [3, -1, 4], [0, 2, 1]],
                                x: [1, 2, 3],
                                build: function(idx) {
                                    var terms = [];
                                    for (var j = 0; j <= idx; j++) {
                                        terms.push('A^1_' + (j+1) + 'x^' + (j+1) + ' = ' + this.A[0][j] + '\u00b7' + this.x[j] + ' = ' + (this.A[0][j]*this.x[j]));
                                    }
                                    var sum = 0;
                                    for (var k = 0; k <= idx; k++) sum += this.A[0][k] * this.x[k];
                                    return { terms: terms, partial: sum, done: idx >= 2, total: 1*1+2*2+0*3 };
                                }
                            },
                            {
                                label: 'Trace: A^i_i',
                                diag: [5, -2, 7],
                                build: function(idx) {
                                    var terms = [];
                                    for (var i = 0; i <= idx; i++) {
                                        terms.push('A^' + (i+1) + '_' + (i+1) + ' = ' + this.diag[i]);
                                    }
                                    var sum = 0;
                                    for (var j = 0; j <= idx; j++) sum += this.diag[j];
                                    return { terms: terms, partial: sum, done: idx >= 2, total: 10 };
                                }
                            }
                        ];

                        var exIdx = 0;
                        var stepIdx = 0;
                        var animTimer = null;

                        VizEngine.createButton(controls, 'Dot product', function() { exIdx = 0; stepIdx = 0; startAnim(); });
                        VizEngine.createButton(controls, 'Matrix-vector', function() { exIdx = 1; stepIdx = 0; startAnim(); });
                        VizEngine.createButton(controls, 'Trace', function() { exIdx = 2; stepIdx = 0; startAnim(); });

                        function startAnim() {
                            if (animTimer) clearInterval(animTimer);
                            stepIdx = -1;
                            animTimer = setInterval(function() {
                                stepIdx++;
                                if (stepIdx > 2) { clearInterval(animTimer); animTimer = null; }
                                draw();
                            }, 900);
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var ex = examples[exIdx];

                            viz.screenText('Einstein Summation Convention', viz.width / 2, 20, viz.colors.white, 15);
                            viz.screenText(ex.label, viz.width / 2, 48, viz.colors.teal, 13);

                            var clampedStep = Math.max(0, Math.min(2, stepIdx));
                            var result = ex.build(clampedStep);

                            var y = 90;
                            for (var t = 0; t < result.terms.length; t++) {
                                var isCurrent = (t === clampedStep);
                                ctx.fillStyle = isCurrent ? viz.colors.orange : viz.colors.text;
                                ctx.font = (isCurrent ? 'bold ' : '') + '14px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillText((isCurrent ? '\u25b6 ' : '  ') + 'i=' + (t+1) + ':  ' + result.terms[t], 60, y);
                                y += 30;
                            }

                            // Running sum
                            y += 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Running sum = ' + result.partial, 60, y);

                            if (result.done) {
                                y += 30;
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('Final result = ' + result.total, 60, y);
                            }

                            // Visual: highlight dummy vs free
                            y += 50;
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Repeated index (dummy): summed automatically', 60, y);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(40, y - 2, 12, 12);
                            y += 20;
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Free index: represents a separate equation for each value', 60, y);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(40, y - 2, 12, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Rewrite the following expressions using explicit summation signs, identifying which indices are free and which are dummy: (a) \\(T^{ij}{}_{j}\\), (b) \\(g_{ij} g^{jk}\\), (c) \\(\\epsilon_{ijk} A^j B^k\\).',
                    hint: 'A repeated index (one up, one down) is dummy (summed). A non-repeated index is free.',
                    solution: '(a) \\(T^{ij}{}_{j} = \\sum_j T^{ij}{}_{j}\\). Free: \\(i\\). Dummy: \\(j\\). (b) \\(g_{ij} g^{jk} = \\sum_j g_{ij} g^{jk} = \\delta_i^k\\). Free: \\(i, k\\). Dummy: \\(j\\). (c) \\(\\epsilon_{ijk} A^j B^k = \\sum_j \\sum_k \\epsilon_{ijk} A^j B^k\\). Free: \\(i\\). Dummy: \\(j, k\\). This is the \\(i\\)-th component of \\(\\mathbf{A} \\times \\mathbf{B}\\).'
                },
                {
                    question: 'Using the \\(\\epsilon\\)-\\(\\delta\\) identity, prove that \\(\\mathbf{A} \\times (\\mathbf{B} \\times \\mathbf{C}) = \\mathbf{B}(\\mathbf{A} \\cdot \\mathbf{C}) - \\mathbf{C}(\\mathbf{A} \\cdot \\mathbf{B})\\) (the BAC-CAB rule).',
                    hint: 'Write the \\(i\\)-th component: \\(\\epsilon_{ijk} A^j \\epsilon_{klm} B^l C^m\\). Use \\(\\epsilon_{ijk} \\epsilon_{klm} = \\delta_{il}\\delta_{jm} - \\delta_{im}\\delta_{jl}\\).',
                    solution: '\\([\\mathbf{A} \\times (\\mathbf{B} \\times \\mathbf{C})]_i = \\epsilon_{ijk} A_j (\\epsilon_{klm} B_l C_m) = (\\delta_{il}\\delta_{jm} - \\delta_{im}\\delta_{jl}) A_j B_l C_m = A_j B_i C_j - A_j B_j C_i = B_i (A_j C_j) - C_i (A_j B_j) = B_i(\\mathbf{A} \\cdot \\mathbf{C}) - C_i(\\mathbf{A} \\cdot \\mathbf{B})\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: Tensors in the Language of Matrices</h2>

<p>In this chapter we defined tensors by their transformation laws and explored their index gymnastics. But there is a complementary perspective that becomes essential for computation: <strong>matrices</strong>.</p>

<h3>Tensors as Matrices</h3>

<p>A rank-2 tensor \\(T^i{}_j\\) in \\(n\\) dimensions has \\(n^2\\) components that naturally arrange into an \\(n \\times n\\) matrix. The tensor operations we studied translate directly:</p>

<table class="styled-table">
    <thead>
        <tr><th>Tensor operation</th><th>Matrix operation</th></tr>
    </thead>
    <tbody>
        <tr><td>Contraction \\(T^i{}_i\\)</td><td>Trace \\(\\text{tr}(T)\\)</td></tr>
        <tr><td>Product \\(A^i{}_k B^k{}_j\\)</td><td>Matrix multiplication \\(AB\\)</td></tr>
        <tr><td>Symmetrization</td><td>\\(\\frac{1}{2}(T + T^\\top)\\)</td></tr>
        <tr><td>Antisymmetrization</td><td>\\(\\frac{1}{2}(T - T^\\top)\\)</td></tr>
        <tr><td>Coordinate change</td><td>Similarity transform \\(T' = R T R^{-1}\\)</td></tr>
    </tbody>
</table>

<h3>The Eigenvalue Connection</h3>

<p>The <em>principal axes</em> of a symmetric tensor (stress, inertia, metric at a point) are its <strong>eigenvectors</strong>, and the principal values are its <strong>eigenvalues</strong>. Finding these is the central computational problem of Chapter 3.</p>

<div class="env-block remark">
    <div class="env-title">Preview: Eigenvalues and Physics</div>
    <div class="env-body">
        <p>The stress tensor's eigenvalues are the principal stresses. The inertia tensor's eigenvalues are the principal moments. The metric tensor's eigenvalues determine local geometry. In quantum mechanics, observable eigenvalues are the only values that can be measured. Eigenvalue theory is the bridge between tensor algebra and physical prediction.</p>
    </div>
</div>

<h3>The Modern Viewpoint</h3>

<p>In modern differential geometry and physics, a tensor of type \\((p, q)\\) is defined as a <strong>multilinear map</strong>:</p>

\\[
T: \\underbrace{V^* \\times \\cdots \\times V^*}_{p} \\times \\underbrace{V \\times \\cdots \\times V}_{q} \\to \\mathbb{R}
\\]

<p>where \\(V\\) is a vector space and \\(V^*\\) its dual. This definition is coordinate-free; the transformation law emerges as a consequence rather than a postulate. We will see this viewpoint develop naturally as we study Hilbert spaces (Chapter 4) and group theory (Chapter 5).</p>

<div class="env-block remark">
    <div class="env-title">What Lies Ahead</div>
    <div class="env-body">
        <ul>
            <li><strong>Chapter 3 (Matrices & Eigenvalues)</strong>: Systematic methods for diagonalizing the tensor objects we met here. Spectral theorems, matrix decompositions, numerical algorithms.</li>
            <li><strong>Chapter 5 (Group Theory)</strong>: Tensor transformation laws as representations of groups. The deep reason tensors "work" is that they carry representations of the symmetry group of the underlying space.</li>
            <li><strong>Chapter 8 (ODEs)</strong>: Tensor fields in physics lead to systems of differential equations. The stress tensor gives rise to the equations of elasticity; the electromagnetic tensor to Maxwell's equations.</li>
        </ul>
    </div>
</div>
`,
            exercises: [
                {
                    question: 'The 2D rotation matrix \\(R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\) transforms vector components. Verify that \\(R(\\theta)^{-1} = R(-\\theta) = R(\\theta)^\\top\\).',
                    hint: 'Compute \\(R(\\theta)R(-\\theta)\\) directly, or note that \\(R\\) is orthogonal.',
                    solution: '\\(R(\\theta)R(-\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix} = \\begin{pmatrix} \\cos^2\\theta + \\sin^2\\theta & 0 \\\\ 0 & \\cos^2\\theta + \\sin^2\\theta \\end{pmatrix} = I\\). Also \\(R(-\\theta)_{ij} = R(\\theta)_{ji} = R(\\theta)^\\top_{ij}\\). So \\(R^{-1} = R^\\top\\): the rotation matrix is orthogonal. \\(\\checkmark\\)'
                }
            ]
        }

    ] // end sections
});
