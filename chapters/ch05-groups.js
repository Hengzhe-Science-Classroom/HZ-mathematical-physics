window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Group Theory for Physicists',
    subtitle: 'Symmetry as a guiding principle in physics',
    sections: [
        // ================================================================
        // SECTION 1: Why Symmetry?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Symmetry?',
            content: `
<h2>Why Symmetry?</h2>

<div class="env-block intuition">
    <div class="env-title">The Unreasonable Power of Symmetry</div>
    <div class="env-body">
        <p>A snowflake has six-fold symmetry. An isolated hydrogen atom is spherically symmetric. Maxwell's equations are invariant under Lorentz transformations. In each case, the symmetry tells us something profound: it constrains what is possible, selects what is forbidden, and organizes what remains into elegant patterns.</p>
        <p>Group theory is the mathematical language of symmetry. It is not merely a tool that physicists borrow from pure mathematics; it is the <em>natural</em> framework in which the deepest laws of physics are expressed.</p>
    </div>
</div>

<p>Consider a simple question: why do crystals come in only 32 point-symmetry classes? Why are there exactly eight gluons? Why does the hydrogen atom have its particular degeneracy pattern? The answers all flow from group theory.</p>

<h3>Symmetry as Invariance</h3>

<p>Physically, a <strong>symmetry</strong> is a transformation that leaves something unchanged. More precisely, if \\(T\\) is a transformation and \\(\\mathcal{L}\\) is the Lagrangian of a system, we say the system has symmetry \\(T\\) when</p>

\\[
\\mathcal{L}(T[q], T[\\dot{q}]) = \\mathcal{L}(q, \\dot{q}).
\\]

<p>The set of all such transformations forms a mathematical structure called a <em>group</em>. This is no accident: the composition of two symmetries is again a symmetry, every symmetry can be undone, and doing nothing is trivially a symmetry. These are exactly the group axioms.</p>

<h3>What Group Theory Does for Physics</h3>

<p>Group theory gives physicists three things:</p>
<ol>
    <li><strong>Classification:</strong> It organizes states and particles into multiplets (irreducible representations).</li>
    <li><strong>Selection rules:</strong> It determines which transitions and interactions are allowed or forbidden, without solving any differential equations.</li>
    <li><strong>Conservation laws:</strong> Via Noether's theorem, every continuous symmetry corresponds to a conserved quantity.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Group theory entered physics through crystallography in the 19th century. Its role expanded dramatically with quantum mechanics: Wigner and Weyl showed in the 1920s-30s that symmetry groups classify quantum states. Today it is indispensable in particle physics, condensed matter, and quantum information.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-symmetry-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-symmetry-gallery',
                    title: 'Symmetry Gallery: Triangle, Square, Pentagon',
                    description: 'Explore the symmetries of regular polygons. Click the buttons to apply rotations and reflections. Notice how the vertices permute but the shape is unchanged.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var nSides = 3;
                        var currentAngle = 0;
                        var reflected = false;
                        var animTarget = 0;
                        var animReflect = false;

                        VizEngine.createButton(controls, 'Triangle', function() { nSides = 3; currentAngle = 0; reflected = false; draw(); });
                        VizEngine.createButton(controls, 'Square', function() { nSides = 4; currentAngle = 0; reflected = false; draw(); });
                        VizEngine.createButton(controls, 'Pentagon', function() { nSides = 5; currentAngle = 0; reflected = false; draw(); });
                        VizEngine.createButton(controls, 'Rotate', function() {
                            currentAngle += 2 * Math.PI / nSides;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Reflect', function() {
                            reflected = !reflected;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            currentAngle = 0; reflected = false; draw();
                        });

                        var vertexColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.red, viz.colors.yellow, viz.colors.pink];
                        var vertexLabels = ['1', '2', '3', '4', '5', '6', '7', '8'];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Symmetries of the Regular ' + ['', '', '', 'Triangle', 'Square', 'Pentagon'][nSides],
                                viz.width / 2, 20, viz.colors.white, 15);

                            // Draw the polygon outline (reference, faded)
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i <= nSides; i++) {
                                var a = 2 * Math.PI * i / nSides - Math.PI / 2;
                                var x = 2.2 * Math.cos(a), y = 2.2 * Math.sin(a);
                                var s = viz.toScreen(x, y);
                                i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw symmetry axes (dashed)
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 5]);
                            for (var k = 0; k < nSides; k++) {
                                var axAngle = Math.PI * k / nSides - Math.PI / 2;
                                var ax1 = viz.toScreen(2.8 * Math.cos(axAngle), 2.8 * Math.sin(axAngle));
                                var ax2 = viz.toScreen(-2.8 * Math.cos(axAngle), -2.8 * Math.sin(axAngle));
                                ctx.beginPath(); ctx.moveTo(ax1[0], ax1[1]); ctx.lineTo(ax2[0], ax2[1]); ctx.stroke();
                            }
                            ctx.setLineDash([]);

                            // Compute transformed vertices
                            var verts = [];
                            for (var j = 0; j < nSides; j++) {
                                var baseAngle = 2 * Math.PI * j / nSides - Math.PI / 2;
                                var eff = baseAngle + currentAngle;
                                var vx = 2.2 * Math.cos(eff);
                                var vy = 2.2 * Math.sin(eff);
                                if (reflected) vy = -vy;
                                verts.push([vx, vy]);
                            }

                            // Draw filled polygon
                            ctx.beginPath();
                            for (var m = 0; m < verts.length; m++) {
                                var sp = viz.toScreen(verts[m][0], verts[m][1]);
                                m === 0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.blue + '18';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Draw vertices with labels
                            for (var v = 0; v < verts.length; v++) {
                                var sv = viz.toScreen(verts[v][0], verts[v][1]);
                                ctx.fillStyle = vertexColors[v];
                                ctx.beginPath(); ctx.arc(sv[0], sv[1], 10, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fff';
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(vertexLabels[v], sv[0], sv[1]);
                            }

                            // Info
                            var orderD = 2 * nSides;
                            var rotCount = nSides;
                            var refCount = nSides;
                            viz.screenText('Group: D' + nSides + '  |  Order: ' + orderD +
                                '  |  Rotations: ' + rotCount + '  |  Reflections: ' + refCount,
                                viz.width / 2, viz.height - 40, viz.colors.teal, 12);
                            var stateStr = 'Rotation: ' + Math.round(currentAngle * 180 / Math.PI) + '\u00B0' +
                                (reflected ? '  +  Reflection' : '');
                            viz.screenText(stateStr, viz.width / 2, viz.height - 20, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'List all symmetries of an equilateral triangle. How many are there? Verify that the composition of any two symmetries is again a symmetry of the triangle.',
                    hint: 'There are 3 rotations (including the identity, by 0\\(^\\circ\\), 120\\(^\\circ\\), 240\\(^\\circ\\)) and 3 reflections (through each vertex to the midpoint of the opposite side).',
                    solution: 'The 6 symmetries form the dihedral group \\(D_3\\): rotations \\(\\{e, r, r^2\\}\\) by \\(0^\\circ, 120^\\circ, 240^\\circ\\) and reflections \\(\\{s_1, s_2, s_3\\}\\) through each axis. Composing any two gives another element of the set. For instance, \\(r \\circ s_1 = s_2\\) (rotating after reflecting sends one reflection axis to another). The closure property is verified by checking the full \\(6 \\times 6\\) Cayley table.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Groups
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Groups',
            content: `
<h2>Groups: The Axioms</h2>

<div class="env-block definition">
    <div class="env-title">Definition 5.1 (Group)</div>
    <div class="env-body">
        <p>A <strong>group</strong> is a set \\(G\\) together with a binary operation \\(\\cdot : G \\times G \\to G\\) satisfying:</p>
        <ol>
            <li><strong>Closure:</strong> For all \\(a, b \\in G\\), we have \\(a \\cdot b \\in G\\).</li>
            <li><strong>Associativity:</strong> For all \\(a, b, c \\in G\\), \\((a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)\\).</li>
            <li><strong>Identity:</strong> There exists \\(e \\in G\\) such that \\(e \\cdot a = a \\cdot e = a\\) for all \\(a \\in G\\).</li>
            <li><strong>Inverse:</strong> For each \\(a \\in G\\), there exists \\(a^{-1} \\in G\\) such that \\(a \\cdot a^{-1} = a^{-1} \\cdot a = e\\).</li>
        </ol>
        <p>If additionally \\(a \\cdot b = b \\cdot a\\) for all \\(a, b\\), the group is called <strong>abelian</strong> (commutative).</p>
    </div>
</div>

<h3>Key Examples</h3>

<div class="env-block example">
    <div class="env-title">Example: Integers Under Addition</div>
    <div class="env-body">
        <p>\\((\\mathbb{Z}, +)\\) is an abelian group: addition is closed and associative, \\(0\\) is the identity, and \\(-n\\) is the inverse of \\(n\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Rotation Group SO(2)</div>
    <div class="env-body">
        <p>Rotations in the plane by angle \\(\\theta\\) form a group under composition. The rotation matrix is</p>
        \\[R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}.\\]
        <p>Composition corresponds to matrix multiplication: \\(R(\\theta_1)R(\\theta_2) = R(\\theta_1 + \\theta_2)\\). The identity is \\(R(0) = I\\) and the inverse is \\(R(-\\theta)\\). This is SO(2), the special orthogonal group in 2D. It is abelian.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Permutation Group \\(S_n\\)</div>
    <div class="env-body">
        <p>The set of all permutations of \\(\\{1, 2, \\ldots, n\\}\\) forms a group \\(S_n\\) under composition, called the <strong>symmetric group</strong>. Its order is \\(|S_n| = n!\\). For \\(n \\geq 3\\), \\(S_n\\) is non-abelian.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Dihedral Group \\(D_n\\)</div>
    <div class="env-body">
        <p>The symmetries of a regular \\(n\\)-gon form the dihedral group \\(D_n\\) of order \\(2n\\), consisting of \\(n\\) rotations and \\(n\\) reflections. For \\(n \\geq 3\\) it is non-abelian.</p>
    </div>
</div>

<h3>Subgroups and Order</h3>

<div class="env-block definition">
    <div class="env-title">Definition 5.2 (Subgroup)</div>
    <div class="env-body">
        <p>A subset \\(H \\subseteq G\\) is a <strong>subgroup</strong> if it is itself a group under the same operation. We write \\(H \\leq G\\). Equivalently, \\(H\\) is a subgroup if \\(e \\in H\\), and for all \\(a, b \\in H\\), both \\(ab \\in H\\) and \\(a^{-1} \\in H\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.1 (Lagrange's Theorem)</div>
    <div class="env-body">
        <p>If \\(H\\) is a subgroup of a finite group \\(G\\), then \\(|H|\\) divides \\(|G|\\). The integer \\([G:H] = |G|/|H|\\) is called the <strong>index</strong> of \\(H\\) in \\(G\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rotation-group"></div>
`,
            visualizations: [
                {
                    id: 'viz-rotation-group',
                    title: 'The Rotation Group SO(2) and SO(3)',
                    description: 'Watch how a 2D rotation transforms a vector. Drag the angle slider to rotate. The circle shows the group manifold of SO(2); each point on the circle is a group element.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 180, originY: 200, scale: 55
                        });

                        var theta = 0.7;
                        VizEngine.createSlider(controls, '\u03B8', 0, 6.28, theta, 0.05, function(v) {
                            theta = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Left panel: rotation acting on a vector
                            viz.screenText('SO(2) Rotation on a Vector', 180, 20, viz.colors.white, 14);

                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.grid + '88', 1);

                            // Original vector
                            var vx = 2, vy = 0.8;
                            viz.drawVector(0, 0, vx, vy, viz.colors.blue + '66', 'v', 1.5);

                            // Rotated vector
                            var rx = vx * Math.cos(theta) - vy * Math.sin(theta);
                            var ry = vx * Math.sin(theta) + vy * Math.cos(theta);
                            viz.drawVector(0, 0, rx, ry, viz.colors.teal, 'R(\u03B8)v', 2);

                            // Arc showing angle
                            var arcR = 0.6;
                            var startA = Math.atan2(vy, vx);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var aStart = -startA;
                            var aEnd = -(startA + theta);
                            ctx.arc(viz.originX, viz.originY, arcR * viz.scale, aStart, aEnd, theta > 0);
                            ctx.stroke();

                            // Right panel: group manifold (circle)
                            var cx = 430, cy = 200, cr = 70;
                            viz.screenText('Group Manifold S\u00B9', cx, cy - cr - 20, viz.colors.white, 13);

                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                            ctx.stroke();

                            // Identity at top
                            var ex = cx + cr * Math.cos(-Math.PI / 2);
                            var ey = cy + cr * Math.sin(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('e', ex + 10, ey - 8, viz.colors.white, 11);

                            // Current element
                            var gx = cx + cr * Math.cos(theta - Math.PI / 2);
                            var gy = cy + cr * Math.sin(theta - Math.PI / 2);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(gx, gy, 6, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('R(\u03B8)', gx + 12, gy, viz.colors.teal, 11);

                            // Arc on manifold
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, cr, -Math.PI / 2, theta - Math.PI / 2, false);
                            ctx.stroke();

                            viz.screenText('\u03B8 = ' + theta.toFixed(2) + ' rad = ' + (theta * 180 / Math.PI).toFixed(1) + '\u00B0',
                                viz.width / 2, viz.height - 20, viz.colors.orange, 12);

                            // Rotation matrix display
                            var c = Math.cos(theta).toFixed(3);
                            var s = Math.sin(theta).toFixed(3);
                            viz.screenText('R(\u03B8) = [' + c + ', ' + (-Math.sin(theta)).toFixed(3) + '; ' + s + ', ' + c + ']',
                                viz.width / 2, viz.height - 40, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the set \\(\\{1, -1, i, -i\\}\\) under complex multiplication forms a group. What is its order? Is it abelian? Identify it as a known group.',
                    hint: 'Check all four axioms. Build the multiplication table. Compare with \\(\\mathbb{Z}_4\\).',
                    solution: 'Closure: products of \\(\\{1,-1,i,-i\\}\\) stay in the set (check all 16 products). Associativity: inherited from \\(\\mathbb{C}\\). Identity: \\(1\\). Inverses: \\(1^{-1}=1\\), \\((-1)^{-1}=-1\\), \\(i^{-1}=-i\\), \\((-i)^{-1}=i\\). Order 4, abelian (all products commute). This is the cyclic group \\(\\mathbb{Z}_4\\) (generated by \\(i\\): \\(i^1=i, i^2=-1, i^3=-i, i^4=1\\)).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Representations
        // ================================================================
        {
            id: 'sec-representations',
            title: 'Representations',
            content: `
<h2>Representations: Groups Acting as Matrices</h2>

<div class="env-block intuition">
    <div class="env-title">Why Matrices?</div>
    <div class="env-body">
        <p>Abstract groups are powerful, but physicists work with <em>states</em> in vector spaces (Hilbert spaces). A <strong>representation</strong> tells us how each group element acts on a vector space, concretely as a matrix. Different representations of the same group describe different "ways" the symmetry can manifest.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 5.3 (Representation)</div>
    <div class="env-body">
        <p>A <strong>representation</strong> of a group \\(G\\) on a vector space \\(V\\) is a homomorphism</p>
        \\[
        D: G \\to GL(V),
        \\]
        <p>i.e., a map assigning to each \\(g \\in G\\) an invertible linear operator \\(D(g)\\) on \\(V\\) such that \\(D(g_1 g_2) = D(g_1) D(g_2)\\) for all \\(g_1, g_2 \\in G\\). The <strong>dimension</strong> of the representation is \\(\\dim V\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Representations of \\(\\mathbb{Z}_2 = \\{e, a\\}\\)</div>
    <div class="env-body">
        <p>The simplest non-trivial group has two elements with \\(a^2 = e\\). It has two 1D representations:</p>
        <ul>
            <li><strong>Trivial:</strong> \\(D(e) = 1, \\; D(a) = 1\\).</li>
            <li><strong>Sign:</strong> \\(D(e) = 1, \\; D(a) = -1\\).</li>
        </ul>
        <p>In quantum mechanics, these correspond to even and odd parity states.</p>
    </div>
</div>

<h3>Reducible and Irreducible Representations</h3>

<div class="env-block definition">
    <div class="env-title">Definition 5.4 (Irreducible Representation)</div>
    <div class="env-body">
        <p>A representation \\(D\\) on \\(V\\) is <strong>reducible</strong> if there exists a proper invariant subspace \\(W \\subset V\\) (with \\(D(g)W \\subseteq W\\) for all \\(g\\)). It is <strong>irreducible</strong> (an "irrep") if no such subspace exists.</p>
    </div>
</div>

<p>Irreducible representations are the building blocks. Any representation of a finite group (or compact Lie group) can be decomposed into a direct sum of irreps. This is the content of Maschke's theorem:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.2 (Maschke's Theorem)</div>
    <div class="env-body">
        <p>Every representation of a finite group over \\(\\mathbb{C}\\) is completely reducible: it decomposes as a direct sum of irreducible representations.</p>
    </div>
</div>

<h3>Characters</h3>

<div class="env-block definition">
    <div class="env-title">Definition 5.5 (Character)</div>
    <div class="env-body">
        <p>The <strong>character</strong> of a representation \\(D\\) is the function \\(\\chi: G \\to \\mathbb{C}\\) defined by \\(\\chi(g) = \\text{Tr}\\, D(g)\\). Characters are constant on conjugacy classes and satisfy the orthogonality relations</p>
        \\[
        \\frac{1}{|G|} \\sum_{g \\in G} \\chi_i(g)^* \\chi_j(g) = \\delta_{ij}
        \\]
        <p>where the sum runs over all group elements and \\(i, j\\) label irreps.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Character Table of \\(S_3\\)</div>
    <div class="env-body">
        <p>The symmetric group \\(S_3\\) has 3 conjugacy classes (identity, transpositions, 3-cycles) and hence 3 irreps:</p>
        <table style="margin:0 auto;border-collapse:collapse;">
            <tr><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;"></th><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">\\(e\\)</th><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">\\((12)\\)</th><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">\\((123)\\)</th></tr>
            <tr><td style="padding:4px 12px;">\\(\\chi_1\\) (trivial)</td><td style="padding:4px 12px;text-align:center;">1</td><td style="padding:4px 12px;text-align:center;">1</td><td style="padding:4px 12px;text-align:center;">1</td></tr>
            <tr><td style="padding:4px 12px;">\\(\\chi_2\\) (sign)</td><td style="padding:4px 12px;text-align:center;">1</td><td style="padding:4px 12px;text-align:center;">-1</td><td style="padding:4px 12px;text-align:center;">1</td></tr>
            <tr><td style="padding:4px 12px;">\\(\\chi_3\\) (standard)</td><td style="padding:4px 12px;text-align:center;">2</td><td style="padding:4px 12px;text-align:center;">0</td><td style="padding:4px 12px;text-align:center;">-1</td></tr>
        </table>
        <p>Note that \\(1^2 + 1^2 + 2^2 = 6 = |S_3|\\), as required.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-representation"></div>
`,
            visualizations: [
                {
                    id: 'viz-representation',
                    title: 'How Group Elements Act as Matrices',
                    description: 'Watch how each element of the dihedral group D3 (symmetries of a triangle) transforms a 2D vector space. The colored arrows show where basis vectors are sent by the representation matrices.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 180, originY: 220, scale: 55
                        });

                        // D3 elements: identity, r(120), r(240), s1, s2, s3
                        var angle120 = 2 * Math.PI / 3;
                        var elements = [
                            { name: 'e (identity)', mat: [[1,0],[0,1]] },
                            { name: 'r (120\u00B0)', mat: [[Math.cos(angle120), -Math.sin(angle120)],[Math.sin(angle120), Math.cos(angle120)]] },
                            { name: 'r\u00B2 (240\u00B0)', mat: [[Math.cos(2*angle120), -Math.sin(2*angle120)],[Math.sin(2*angle120), Math.cos(2*angle120)]] },
                            { name: 's\u2081 (reflect x)', mat: [[1,0],[0,-1]] },
                            { name: 's\u2082', mat: [[Math.cos(angle120), Math.sin(angle120)],[Math.sin(angle120), -Math.cos(angle120)]] },
                            { name: 's\u2083', mat: [[Math.cos(2*angle120), Math.sin(2*angle120)],[Math.sin(2*angle120), -Math.cos(2*angle120)]] }
                        ];
                        var currentEl = 0;

                        for (var i = 0; i < elements.length; i++) {
                            (function(idx) {
                                VizEngine.createButton(controls, elements[idx].name, function() {
                                    currentEl = idx; draw();
                                });
                            })(i);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var el = elements[currentEl];

                            viz.screenText('Representation D: D\u2083 \u2192 GL(2,\u211D)', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('Element: ' + el.name, viz.width / 2, 42, viz.colors.teal, 13);

                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Original basis vectors (faded)
                            viz.drawVector(0, 0, 2, 0, viz.colors.blue + '55', null, 1.5);
                            viz.drawVector(0, 0, 0, 2, viz.colors.orange + '55', null, 1.5);
                            viz.screenText('e\u2081', 2.2, 0.2, viz.colors.blue + '55', 11);
                            viz.screenText('e\u2082', 0.2, 2.2, viz.colors.orange + '55', 11);

                            // Transformed basis vectors
                            var M = el.mat;
                            var e1x = M[0][0] * 2, e1y = M[1][0] * 2;
                            var e2x = M[0][1] * 2, e2y = M[1][1] * 2;
                            viz.drawVector(0, 0, e1x, e1y, viz.colors.blue, 'D(g)e\u2081', 2);
                            viz.drawVector(0, 0, e2x, e2y, viz.colors.orange, 'D(g)e\u2082', 2);

                            // Show the unit square transformation
                            viz.drawTransformedUnitSquare([[M[0][0], M[0][1]], [M[1][0], M[1][1]]],
                                viz.colors.purple + '15', viz.colors.purple + '44', 1);

                            // Matrix display
                            var m00 = M[0][0].toFixed(2), m01 = M[0][1].toFixed(2);
                            var m10 = M[1][0].toFixed(2), m11 = M[1][1].toFixed(2);
                            viz.screenText('D(g) = [' + m00 + ', ' + m01 + ' ; ' + m10 + ', ' + m11 + ']',
                                viz.width / 2, viz.height - 45, viz.colors.white, 12);
                            var tr = (M[0][0] + M[1][1]).toFixed(2);
                            var det = (M[0][0] * M[1][1] - M[0][1] * M[1][0]).toFixed(2);
                            viz.screenText('Tr(D) = \u03C7(g) = ' + tr + '    det(D) = ' + det,
                                viz.width / 2, viz.height - 25, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The group \\(\\mathbb{Z}_3 = \\{0, 1, 2\\}\\) (addition mod 3) has three 1D representations over \\(\\mathbb{C}\\). Find them. (Hint: if \\(D(1) = \\omega\\), then \\(D(2) = \\omega^2\\) and \\(\\omega^3 = 1\\).)',
                    hint: 'The cube roots of unity are \\(1, e^{2\\pi i/3}, e^{4\\pi i/3}\\).',
                    solution: 'Let \\(\\omega = e^{2\\pi i/3}\\). The three irreps are: \\(D_k(n) = \\omega^{kn}\\) for \\(k = 0, 1, 2\\). Explicitly: \\(D_0 = \\{1, 1, 1\\}\\), \\(D_1 = \\{1, \\omega, \\omega^2\\}\\), \\(D_2 = \\{1, \\omega^2, \\omega^4 = \\omega\\}\\). Each is 1-dimensional and satisfies the homomorphism property \\(D_k(m+n) = D_k(m)D_k(n)\\).'
                },
                {
                    question: 'Verify the orthogonality of characters for \\(S_3\\) using the character table given above.',
                    hint: 'The conjugacy classes have sizes 1, 3, 2 respectively. Use \\(\\frac{1}{6}\\sum_g \\chi_i(g)^* \\chi_j(g) = \\delta_{ij}\\).',
                    solution: 'For \\(\\chi_1\\) and \\(\\chi_2\\): \\(\\frac{1}{6}[1 \\cdot 1 \\cdot 1 + 3 \\cdot 1 \\cdot (-1) + 2 \\cdot 1 \\cdot 1] = \\frac{1}{6}(1 - 3 + 2) = 0\\). For \\(\\chi_1\\) and \\(\\chi_3\\): \\(\\frac{1}{6}[1 \\cdot 1 \\cdot 2 + 3 \\cdot 1 \\cdot 0 + 2 \\cdot 1 \\cdot (-1)] = \\frac{1}{6}(2 + 0 - 2) = 0\\). For \\(\\chi_3\\) and \\(\\chi_3\\): \\(\\frac{1}{6}[1 \\cdot 4 + 3 \\cdot 0 + 2 \\cdot 1] = \\frac{1}{6}(4 + 0 + 2) = 1\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Lie Groups & Algebras
        // ================================================================
        {
            id: 'sec-lie',
            title: 'Lie Groups & Algebras',
            content: `
<h2>Lie Groups and Lie Algebras</h2>

<div class="env-block intuition">
    <div class="env-title">From Discrete to Continuous</div>
    <div class="env-body">
        <p>The dihedral group \\(D_n\\) is <em>discrete</em>: you can list its elements. But rotations in 3D form a <em>continuous</em> group parameterized by three angles. These are <strong>Lie groups</strong>, named after Sophus Lie (1842-1899). The infinitesimal structure near the identity defines the <strong>Lie algebra</strong>, which captures the group's local behavior and is often easier to work with.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 5.6 (Lie Group)</div>
    <div class="env-body">
        <p>A <strong>Lie group</strong> is a group \\(G\\) that is also a smooth manifold, with the group operations (multiplication and inversion) being smooth maps.</p>
    </div>
</div>

<h3>The Classical Matrix Lie Groups</h3>

<p>The most important Lie groups in physics are matrix groups:</p>

<table style="margin:0 auto;border-collapse:collapse;font-size:0.95rem;">
    <tr><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">Group</th><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">Definition</th><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">dim</th><th style="padding:4px 12px;border-bottom:2px solid #4a4a7a;">Physics</th></tr>
    <tr><td style="padding:4px 12px;">GL(n,\\(\\mathbb{R}\\))</td><td style="padding:4px 12px;">invertible \\(n \\times n\\) real matrices</td><td style="padding:4px 12px;">\\(n^2\\)</td><td style="padding:4px 12px;">general linear transformations</td></tr>
    <tr><td style="padding:4px 12px;">O(n)</td><td style="padding:4px 12px;">\\(A^T A = I\\)</td><td style="padding:4px 12px;">\\(\\frac{n(n-1)}{2}\\)</td><td style="padding:4px 12px;">orthogonal transformations</td></tr>
    <tr><td style="padding:4px 12px;">SO(n)</td><td style="padding:4px 12px;">\\(A^T A = I\\), \\(\\det A = 1\\)</td><td style="padding:4px 12px;">\\(\\frac{n(n-1)}{2}\\)</td><td style="padding:4px 12px;">rotations in \\(\\mathbb{R}^n\\)</td></tr>
    <tr><td style="padding:4px 12px;">U(n)</td><td style="padding:4px 12px;">\\(A^\\dagger A = I\\)</td><td style="padding:4px 12px;">\\(n^2\\)</td><td style="padding:4px 12px;">unitary transformations</td></tr>
    <tr><td style="padding:4px 12px;">SU(n)</td><td style="padding:4px 12px;">\\(A^\\dagger A = I\\), \\(\\det A = 1\\)</td><td style="padding:4px 12px;">\\(n^2 - 1\\)</td><td style="padding:4px 12px;">QM symmetries, gauge theories</td></tr>
</table>

<h3>The Lie Algebra</h3>

<div class="env-block definition">
    <div class="env-title">Definition 5.7 (Lie Algebra)</div>
    <div class="env-body">
        <p>The <strong>Lie algebra</strong> \\(\\mathfrak{g}\\) of a Lie group \\(G\\) is the tangent space at the identity, equipped with a bilinear bracket \\([\\cdot, \\cdot]: \\mathfrak{g} \\times \\mathfrak{g} \\to \\mathfrak{g}\\) satisfying:</p>
        <ol>
            <li>\\([X, X] = 0\\) (antisymmetry: \\([X, Y] = -[Y, X]\\))</li>
            <li>\\([X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0\\) (Jacobi identity)</li>
        </ol>
        <p>For matrix Lie groups, \\([X, Y] = XY - YX\\) (the matrix commutator).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.3 (Exponential Map)</div>
    <div class="env-body">
        <p>For a matrix Lie group, the exponential map \\(\\exp: \\mathfrak{g} \\to G\\) is given by</p>
        \\[
        e^X = \\sum_{n=0}^{\\infty} \\frac{X^n}{n!}.
        \\]
        <p>Near the identity, every group element can be written as \\(g = e^{i\\theta^a T_a}\\) where \\(\\{T_a\\}\\) are the <strong>generators</strong> of the Lie algebra and \\(\\theta^a\\) are continuous parameters.</p>
    </div>
</div>

<h3>SO(3) and SU(2): The Physicist's Workhorse</h3>

<p>The rotation group SO(3) has Lie algebra \\(\\mathfrak{so}(3)\\) with generators \\(J_1, J_2, J_3\\) satisfying</p>
\\[
[J_i, J_j] = i\\epsilon_{ijk} J_k.
\\]
<p>These are the angular momentum commutation relations from quantum mechanics. The group SU(2) has the <em>same</em> Lie algebra but different global topology; it is the <strong>double cover</strong> of SO(3).</p>

<div class="env-block remark">
    <div class="env-title">Physics Connection</div>
    <div class="env-body">
        <p>The fact that SU(2) is the double cover of SO(3) explains spinors: a \\(2\\pi\\) rotation returns a spinor to \\(-\\psi\\), not \\(\\psi\\). Only after \\(4\\pi\\) does the state return to itself. Half-integer spin representations are representations of SU(2) that do <em>not</em> factor through SO(3).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-su2-spinors"></div>
`,
            visualizations: [
                {
                    id: 'viz-su2-spinors',
                    title: 'SU(2) Double Cover: The 4\u03C0 Rotation',
                    description: 'A spinor needs a full 4\u03C0 rotation to return to its original state. Watch the phase of a spin-1/2 state as we rotate. After 2\u03C0, the state picks up a minus sign; after 4\u03C0, it returns.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 1
                        });

                        var angle = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Rotation', 0, 12.57, 0, 0.05, function(v) {
                            angle = v; draw();
                        });
                        VizEngine.createButton(controls, 'Animate 4\u03C0', function() {
                            if (animating) return;
                            animating = true;
                            angle = 0;
                            var start = performance.now();
                            function step(t) {
                                var elapsed = (t - start) / 4000; // 4 seconds for full 4pi
                                if (elapsed >= 1) { angle = 4 * Math.PI; animating = false; draw(); return; }
                                angle = elapsed * 4 * Math.PI;
                                draw();
                                requestAnimationFrame(step);
                            }
                            requestAnimationFrame(step);
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('SU(2) Double Cover of SO(3)', viz.width / 2, 20, viz.colors.white, 15);

                            // Draw the "belt trick" visualization
                            // Show a circle for SO(3) and a double-wound circle for SU(2)
                            var cx1 = 160, cy = 200, r = 70;
                            var cx2 = 400;

                            // SO(3) circle
                            viz.screenText('SO(3)', cx1, cy - r - 15, viz.colors.blue, 13);
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx1, cy, r, 0, Math.PI * 2);
                            ctx.stroke();

                            // Current position on SO(3)
                            var so3angle = angle % (2 * Math.PI);
                            var sx1 = cx1 + r * Math.cos(so3angle - Math.PI / 2);
                            var sy1 = cy + r * Math.sin(so3angle - Math.PI / 2);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(sx1, sy1, 7, 0, Math.PI * 2); ctx.fill();

                            // Arc showing traversed angle on SO(3)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(cx1, cy, r, -Math.PI / 2, so3angle - Math.PI / 2, false);
                            ctx.stroke();

                            // SU(2) double circle
                            viz.screenText('SU(2)', cx2, cy - r - 15, viz.colors.teal, 13);
                            // Draw two concentric-ish loops to suggest double cover
                            ctx.strokeStyle = viz.colors.teal + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx2, cy, r, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.arc(cx2, cy, r - 12, 0, Math.PI * 2);
                            ctx.stroke();

                            // SU(2) element traverses outer circle first, then inner
                            var su2angle = angle % (4 * Math.PI);
                            var onOuter = su2angle < 2 * Math.PI;
                            var localAngle = onOuter ? su2angle : (su2angle - 2 * Math.PI);
                            var drawR = onOuter ? r : r - 12;
                            var sx2 = cx2 + drawR * Math.cos(localAngle - Math.PI / 2);
                            var sy2 = cy + drawR * Math.sin(localAngle - Math.PI / 2);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(sx2, sy2, 7, 0, Math.PI * 2); ctx.fill();

                            // Arc on SU(2)
                            if (onOuter) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(cx2, cy, r, -Math.PI / 2, localAngle - Math.PI / 2, false);
                                ctx.stroke();
                            } else {
                                // Full outer
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(cx2, cy, r, 0, Math.PI * 2);
                                ctx.stroke();
                                // Partial inner
                                ctx.beginPath();
                                ctx.arc(cx2, cy, r - 12, -Math.PI / 2, localAngle - Math.PI / 2, false);
                                ctx.stroke();
                            }

                            // Spinor phase
                            var phase = angle / 2; // SU(2) phase is half the rotation angle
                            var phaseFactor = Math.cos(phase); // Real part of e^{-i theta/2}
                            var phaseSign = Math.cos(phase) >= -0.001 ? '+' : '-';

                            // Phase indicator
                            var barY = cy + r + 50;
                            var barW = 200, barH = 20;
                            var barX = viz.width / 2 - barW / 2;

                            viz.screenText('Spinor phase: e^{-i\u03B8/2}', viz.width / 2, barY - 20, viz.colors.white, 12);

                            // Bar background
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(barX, barY, barW, barH);
                            // Phase bar (cos component)
                            var phW = Math.abs(Math.cos(phase)) * barW;
                            ctx.fillStyle = Math.cos(phase) >= 0 ? viz.colors.green + '88' : viz.colors.red + '88';
                            ctx.fillRect(barX + barW / 2, barY, (Math.cos(phase)) * barW / 2, barH);

                            // Labels
                            viz.screenText('+1', barX + barW + 15, barY + barH / 2, viz.colors.green, 11);
                            viz.screenText('-1', barX - 15, barY + barH / 2, viz.colors.red, 11);
                            viz.screenText('0', barX + barW / 2, barY + barH + 12, viz.colors.text, 10);

                            // Angle info
                            var turns = (angle / Math.PI).toFixed(2);
                            viz.screenText('\u03B8 = ' + turns + '\u03C0 rad',
                                viz.width / 2, viz.height - 30, viz.colors.orange, 13);
                            var realPart = Math.cos(phase).toFixed(3);
                            var imagPart = (-Math.sin(phase)).toFixed(3);
                            viz.screenText('|\u03C8\u27E9 \u2192 (' + realPart + ' + ' + imagPart + 'i)|\u03C8\u27E9',
                                viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the generators of SO(3) satisfy \\([J_i, J_j] = i\\epsilon_{ijk}J_k\\) using the explicit \\(3 \\times 3\\) matrices \\((J_k)_{mn} = -i\\epsilon_{kmn}\\).',
                    hint: 'Write out \\(J_1, J_2, J_3\\) explicitly and compute the commutators by matrix multiplication.',
                    solution: 'The generators are \\(J_1 = \\begin{pmatrix}0&0&0\\\\0&0&-i\\\\0&i&0\\end{pmatrix}\\), \\(J_2 = \\begin{pmatrix}0&0&i\\\\0&0&0\\\\-i&0&0\\end{pmatrix}\\), \\(J_3 = \\begin{pmatrix}0&-i&0\\\\i&0&0\\\\0&0&0\\end{pmatrix}\\). Direct computation gives \\([J_1,J_2] = J_1J_2 - J_2J_1 = iJ_3\\), and cyclically. These are exactly the angular momentum commutation relations.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Symmetry in Physics
        // ================================================================
        {
            id: 'sec-physics',
            title: 'Symmetry in Physics',
            content: `
<h2>Symmetry in Physics: Noether's Theorem and Conservation Laws</h2>

<div class="env-block intuition">
    <div class="env-title">The Deep Connection</div>
    <div class="env-body">
        <p>Why is energy conserved? Because the laws of physics do not change with time. Why is momentum conserved? Because the laws are the same everywhere in space. These are not mere coincidences but instances of one of the most profound results in theoretical physics: <strong>Noether's theorem</strong>.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.4 (Noether's Theorem, 1918)</div>
    <div class="env-body">
        <p>Every continuous symmetry of the action of a physical system corresponds to a conserved quantity. Specifically, if the Lagrangian \\(\\mathcal{L}(q, \\dot{q}, t)\\) is invariant under a continuous one-parameter family of transformations \\(q \\to q + \\epsilon \\delta q\\), then the quantity</p>
        \\[
        Q = \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}} \\delta q
        \\]
        <p>is conserved along solutions of the equations of motion: \\(\\frac{dQ}{dt} = 0\\).</p>
    </div>
</div>

<h3>The Symmetry-Conservation Dictionary</h3>

<table style="margin:0 auto;border-collapse:collapse;font-size:0.95rem;">
    <tr><th style="padding:6px 16px;border-bottom:2px solid #4a4a7a;">Symmetry</th><th style="padding:6px 16px;border-bottom:2px solid #4a4a7a;">Group</th><th style="padding:6px 16px;border-bottom:2px solid #4a4a7a;">Conserved Quantity</th></tr>
    <tr><td style="padding:6px 16px;">Time translation</td><td style="padding:6px 16px;">\\(\\mathbb{R}\\)</td><td style="padding:6px 16px;">Energy</td></tr>
    <tr><td style="padding:6px 16px;">Space translation</td><td style="padding:6px 16px;">\\(\\mathbb{R}^3\\)</td><td style="padding:6px 16px;">Linear momentum</td></tr>
    <tr><td style="padding:6px 16px;">Spatial rotation</td><td style="padding:6px 16px;">SO(3)</td><td style="padding:6px 16px;">Angular momentum</td></tr>
    <tr><td style="padding:6px 16px;">Lorentz boost</td><td style="padding:6px 16px;">SO(3,1)</td><td style="padding:6px 16px;">Center-of-mass motion</td></tr>
    <tr><td style="padding:6px 16px;">U(1) gauge</td><td style="padding:6px 16px;">U(1)</td><td style="padding:6px 16px;">Electric charge</td></tr>
    <tr><td style="padding:6px 16px;">SU(3) color</td><td style="padding:6px 16px;">SU(3)</td><td style="padding:6px 16px;">Color charge</td></tr>
</table>

<h3>Selection Rules</h3>

<p>Group theory also determines which transitions are <strong>allowed</strong> and which are <strong>forbidden</strong>. A matrix element \\(\\langle f | \\hat{O} | i \\rangle\\) vanishes unless the direct product of representations</p>
\\[
D_f^* \\otimes D_O \\otimes D_i
\\]
<p>contains the trivial (identity) representation. This is the <strong>Wigner-Eckart theorem</strong> in action, and it explains why certain spectral lines are missing, why certain nuclear decays are suppressed, and why certain chemical reactions are symmetry-forbidden.</p>

<div class="env-block example">
    <div class="env-title">Example: Electric Dipole Selection Rules</div>
    <div class="env-body">
        <p>For the hydrogen atom, the electric dipole operator transforms as a vector (the \\(\\ell = 1\\) representation of SO(3)). The selection rule is \\(\\Delta \\ell = \\pm 1\\) and \\(\\Delta m = 0, \\pm 1\\). Transitions like \\(2s \\to 1s\\) are forbidden by this rule (both states have the same parity under inversion).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-noether"></div>
`,
            visualizations: [
                {
                    id: 'viz-noether',
                    title: 'Noether\'s Theorem: Symmetry \u2192 Conservation',
                    description: 'See how spatial symmetries lead to conservation laws. A particle moves in a potential; when the potential has a symmetry, the corresponding quantity is conserved.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mode = 0; // 0: translation, 1: rotation, 2: time
                        VizEngine.createButton(controls, 'Translation \u2192 Momentum', function() { mode = 0; draw(); });
                        VizEngine.createButton(controls, 'Rotation \u2192 Angular Momentum', function() { mode = 1; draw(); });
                        VizEngine.createButton(controls, 'Time \u2192 Energy', function() { mode = 2; draw(); });

                        var t = 0;
                        var animating = false;
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { animating = false; return; }
                            animating = true;
                            t = 0;
                            function step() {
                                if (!animating) return;
                                t += 0.03;
                                if (t > 6.28) t = 0;
                                draw();
                                requestAnimationFrame(step);
                            }
                            requestAnimationFrame(step);
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (mode === 0) {
                                // Translation symmetry -> momentum conservation
                                viz.screenText('Translation Symmetry \u2192 Momentum Conservation', viz.width / 2, 25, viz.colors.white, 14);

                                // Uniform potential (flat landscape)
                                ctx.fillStyle = viz.colors.purple + '22';
                                ctx.fillRect(30, 200, 500, 100);
                                viz.screenText('V(x) = const (uniform potential)', viz.width / 2, 260, viz.colors.purple, 11);

                                // Particle moving with constant momentum
                                var px = 60 + ((t * 60) % 440);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(px, 180, 12, 0, Math.PI * 2); ctx.fill();
                                // Momentum arrow
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(px + 15, 180); ctx.lineTo(px + 55, 180); ctx.stroke();
                                // Arrow head
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.moveTo(px + 55, 180); ctx.lineTo(px + 45, 174); ctx.lineTo(px + 45, 186); ctx.closePath(); ctx.fill();
                                viz.screenText('p = const', px + 35, 165, viz.colors.teal, 12);

                                // Show shifted copies
                                for (var sh = 0; sh < 3; sh++) {
                                    var sx = 100 + sh * 150;
                                    ctx.strokeStyle = viz.colors.text + '33'; ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 5]);
                                    ctx.beginPath(); ctx.moveTo(sx, 140); ctx.lineTo(sx, 310); ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                                viz.screenText('Shift the system: physics unchanged \u2192 dp/dt = 0', viz.width / 2, 340, viz.colors.orange, 12);

                            } else if (mode === 1) {
                                // Rotation symmetry -> angular momentum
                                viz.screenText('Rotation Symmetry \u2192 Angular Momentum Conservation', viz.width / 2, 25, viz.colors.white, 14);

                                var cx = 280, cy = 210, orbitR = 100;

                                // Central potential (radial rings)
                                for (var ring = 4; ring >= 1; ring--) {
                                    ctx.strokeStyle = viz.colors.purple + (20 + ring * 10).toString(16);
                                    ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.arc(cx, cy, ring * 35, 0, Math.PI * 2); ctx.stroke();
                                }
                                viz.screenText('V(r) = V(|r|)', cx, cy, viz.colors.purple, 11);

                                // Orbiting particle
                                var ox = cx + orbitR * Math.cos(t);
                                var oy = cy + orbitR * Math.sin(t);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(ox, oy, 10, 0, Math.PI * 2); ctx.fill();

                                // Velocity tangent
                                var vx = -Math.sin(t), vy = Math.cos(t);
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + vx * 40, oy + vy * 40); ctx.stroke();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.moveTo(ox + vx * 40, oy + vy * 40);
                                ctx.lineTo(ox + vx * 40 - vy * 6 - vx * 8, oy + vy * 40 + vx * 6 - vy * 8);
                                ctx.lineTo(ox + vx * 40 + vy * 6 - vx * 8, oy + vy * 40 - vx * 6 - vy * 8);
                                ctx.closePath(); ctx.fill();

                                // Angular momentum vector (out of screen, shown as a symbol)
                                viz.screenText('L = r \u00D7 p = const', viz.width / 2, 350, viz.colors.orange, 13);
                                viz.screenText('Rotate the system: physics unchanged \u2192 dL/dt = 0', viz.width / 2, 375, viz.colors.text, 11);

                            } else {
                                // Time symmetry -> energy
                                viz.screenText('Time Translation Symmetry \u2192 Energy Conservation', viz.width / 2, 25, viz.colors.white, 14);

                                // Harmonic oscillator
                                var cx2 = 280, baseY = 300;
                                var amp = 80;
                                var x = amp * Math.cos(t * 1.5);
                                var v = -amp * Math.sin(t * 1.5);

                                // Spring
                                var springX = cx2 + x;
                                var nCoils = 12;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(80, 200);
                                for (var c = 0; c < nCoils; c++) {
                                    var frac = (c + 0.5) / nCoils;
                                    var sx2 = 80 + (springX - 80) * frac;
                                    var sy2 = 200 + (c % 2 === 0 ? -12 : 12);
                                    ctx.lineTo(sx2, sy2);
                                }
                                ctx.lineTo(springX, 200);
                                ctx.stroke();

                                // Wall
                                ctx.fillStyle = viz.colors.text + '44';
                                ctx.fillRect(60, 170, 20, 60);

                                // Mass
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(springX - 15, 185, 30, 30);

                                // Energy bars
                                var KE = 0.5 * v * v / (amp * amp);
                                var PE = 0.5 * x * x / (amp * amp);
                                var barX = 80, barW = 150, barH = 20;

                                viz.screenText('KE', barX - 20, baseY - 8, viz.colors.teal, 11);
                                ctx.fillStyle = viz.colors.grid; ctx.fillRect(barX, baseY - 18, barW, barH);
                                ctx.fillStyle = viz.colors.teal; ctx.fillRect(barX, baseY - 18, barW * KE, barH);

                                viz.screenText('PE', barX - 20, baseY + 16, viz.colors.orange, 11);
                                ctx.fillStyle = viz.colors.grid; ctx.fillRect(barX, baseY + 6, barW, barH);
                                ctx.fillStyle = viz.colors.orange; ctx.fillRect(barX, baseY + 6, barW * PE, barH);

                                viz.screenText('E', barX - 20, baseY + 40, viz.colors.green, 11);
                                ctx.fillStyle = viz.colors.grid; ctx.fillRect(barX, baseY + 30, barW, barH);
                                ctx.fillStyle = viz.colors.green; ctx.fillRect(barX, baseY + 30, barW * (KE + PE), barH);

                                viz.screenText('KE + PE = E = const', 400, baseY + 20, viz.colors.green, 13);
                                viz.screenText('Laws unchanged in time \u2192 dE/dt = 0', viz.width / 2, 375, viz.colors.text, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A free particle Lagrangian is \\(L = \\frac{1}{2}m\\dot{x}^2\\). Show explicitly that translation invariance (\\(x \\to x + a\\)) implies momentum conservation via Noether\'s theorem.',
                    hint: 'Under \\(x \\to x + \\epsilon\\), we have \\(\\delta x = 1\\). Apply \\(Q = \\frac{\\partial L}{\\partial \\dot{x}} \\delta x\\).',
                    solution: 'The Lagrangian \\(L = \\frac{1}{2}m\\dot{x}^2\\) depends only on \\(\\dot{x}\\), not on \\(x\\), so \\(\\partial L/\\partial x = 0\\). Under \\(x \\to x + \\epsilon\\), \\(\\delta x = 1\\). The Noether conserved quantity is \\(Q = \\frac{\\partial L}{\\partial \\dot{x}} \\cdot 1 = m\\dot{x} = p\\). Indeed, the Euler-Lagrange equation gives \\(\\frac{d}{dt}(m\\dot{x}) = 0\\), so \\(p\\) is constant. \\(\\square\\)'
                },
                {
                    question: 'What conservation law follows from the rotational symmetry of the Coulomb potential \\(V(r) = -\\frac{ke^2}{r}\\)?',
                    hint: 'The Coulomb potential depends only on \\(r = |\\mathbf{r}|\\), which is invariant under rotations.',
                    solution: 'The Coulomb potential \\(V = -ke^2/r\\) is spherically symmetric, invariant under the full rotation group SO(3). By Noether\'s theorem, the three components of angular momentum \\(\\mathbf{L} = \\mathbf{r} \\times \\mathbf{p}\\) are conserved. (In fact, the Coulomb potential has additional SO(4) symmetry leading to the conserved Runge-Lenz vector, which explains the \\(\\ell\\)-degeneracy of hydrogen.)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Classification
        // ================================================================
        {
            id: 'sec-classification',
            title: 'Classification',
            content: `
<h2>Classification: From Crystals to Quarks</h2>

<div class="env-block intuition">
    <div class="env-title">The Power of Classification</div>
    <div class="env-body">
        <p>One of group theory's greatest gifts to physics is <em>classification</em>: the complete enumeration of possibilities. If you know the symmetry group, you know what representations exist, and those representations tell you what physical states are possible. This is how crystallography, atomic physics, and particle physics organize their respective worlds.</p>
    </div>
</div>

<h3>Crystallographic Groups</h3>

<p>A crystal is a repeating pattern in space. The symmetries that map the pattern to itself form the <strong>space group</strong>. The point symmetries (ignoring translations) form the <strong>point group</strong>.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.5 (Crystallographic Restriction)</div>
    <div class="env-body">
        <p>In 2D, a lattice can only have rotational symmetries of order 1, 2, 3, 4, or 6. Fivefold symmetry is <strong>impossible</strong> for a periodic lattice. This gives exactly <strong>17 wallpaper groups</strong> in 2D and <strong>230 space groups</strong> in 3D.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof sketch (Crystallographic Restriction)</div>
    <div class="env-body">
        <p>If \\(R\\) is an \\(n\\)-fold rotation that is a symmetry of a lattice, then \\(\\text{Tr}(R)\\) must be an integer (since lattice vectors have integer coordinates in the lattice basis). For a 2D rotation, \\(\\text{Tr}(R) = 2\\cos(2\\pi/n)\\). The integers satisfying \\(|2\\cos(2\\pi/n)| \\leq 2\\) are \\(n = 1, 2, 3, 4, 6\\) only.</p>
    </div>
</div>

<h3>Particle Multiplets and SU(3) Flavor</h3>

<p>In the 1960s, Gell-Mann and Ne'eman noticed that hadrons (strongly interacting particles) group into multiplets that match the irreducible representations of SU(3). The <strong>Eightfold Way</strong> organized the mesons and baryons:</p>

<ul>
    <li>The <strong>octet</strong> (8-dimensional irrep): proton, neutron, \\(\\Sigma^+, \\Sigma^0, \\Sigma^-, \\Xi^0, \\Xi^-, \\Lambda\\)</li>
    <li>The <strong>decuplet</strong> (10-dimensional irrep): \\(\\Delta^{++}, \\Delta^+, \\Delta^0, \\Delta^-, \\Sigma^{*\\pm}, \\Sigma^{*0}, \\Xi^{*0}, \\Xi^{*-}, \\Omega^-\\)</li>
</ul>

<p>The \\(\\Omega^-\\) baryon was <em>predicted</em> by the decuplet representation before it was discovered experimentally in 1964. This is one of the great triumphs of group theory in physics.</p>

<div class="env-block remark">
    <div class="env-title">Quarks from Representations</div>
    <div class="env-body">
        <p>The fundamental representation of SU(3) is 3-dimensional. Gell-Mann proposed that this corresponds to three fundamental constituents: the <strong>quarks</strong> (up, down, strange). The mesons are \\(q\\bar{q}\\) (\\(\\mathbf{3} \\otimes \\bar{\\mathbf{3}} = \\mathbf{8} \\oplus \\mathbf{1}\\)) and baryons are \\(qqq\\) (\\(\\mathbf{3} \\otimes \\mathbf{3} \\otimes \\mathbf{3} = \\mathbf{10} \\oplus \\mathbf{8} \\oplus \\mathbf{8} \\oplus \\mathbf{1}\\)).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-crystal-symmetry"></div>

<div class="viz-placeholder" data-viz="viz-particle-multiplets"></div>
`,
            visualizations: [
                {
                    id: 'viz-crystal-symmetry',
                    title: 'Wallpaper Symmetry Patterns',
                    description: 'The crystallographic restriction limits 2D lattices to 2-, 3-, 4-, and 6-fold symmetry. Select a lattice type to see the allowed symmetries.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 40
                        });

                        var latticeType = 0; // 0:square, 1:hex, 2:rect, 3: oblique
                        var names = ['Square (C4)', 'Hexagonal (C6)', 'Rectangular (C2)', 'Oblique (C1)'];
                        var folds = [4, 6, 2, 1];

                        VizEngine.createButton(controls, 'Square', function() { latticeType = 0; draw(); });
                        VizEngine.createButton(controls, 'Hexagonal', function() { latticeType = 1; draw(); });
                        VizEngine.createButton(controls, 'Rectangular', function() { latticeType = 2; draw(); });
                        VizEngine.createButton(controls, 'Oblique', function() { latticeType = 3; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText(names[latticeType] + ' Lattice', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('Rotational symmetry: ' + folds[latticeType] + '-fold', viz.width / 2, 40, viz.colors.teal, 12);

                            // Define lattice vectors
                            var a1, a2;
                            if (latticeType === 0) { a1 = [1, 0]; a2 = [0, 1]; }
                            else if (latticeType === 1) { a1 = [1, 0]; a2 = [0.5, Math.sqrt(3)/2]; }
                            else if (latticeType === 2) { a1 = [1.3, 0]; a2 = [0, 0.8]; }
                            else { a1 = [1, 0]; a2 = [0.4, 0.9]; }

                            // Draw lattice points
                            var range = 5;
                            for (var i = -range; i <= range; i++) {
                                for (var j = -range; j <= range; j++) {
                                    var x = i * a1[0] + j * a2[0];
                                    var y = i * a1[1] + j * a2[1];
                                    var s = viz.toScreen(x, y);
                                    if (s[0] < 20 || s[0] > 540 || s[1] < 55 || s[1] > 350) continue;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(s[0], s[1], 4, 0, Math.PI * 2); ctx.fill();
                                }
                            }

                            // Draw lattice vectors
                            viz.drawVector(0, 0, a1[0], a1[1], viz.colors.orange, 'a\u2081', 2);
                            viz.drawVector(0, 0, a2[0], a2[1], viz.colors.teal, 'a\u2082', 2);

                            // Draw unit cell
                            viz.drawPolygon([[0,0], a1, [a1[0]+a2[0], a1[1]+a2[1]], a2],
                                viz.colors.purple + '15', viz.colors.purple + '55', 1.5);

                            // Show Wigner-Seitz cell outline (for square and hex)
                            if (latticeType === 0 || latticeType === 1) {
                                var n = folds[latticeType];
                                var wsVerts = [];
                                for (var k = 0; k < n; k++) {
                                    var ang = 2 * Math.PI * k / n + (latticeType === 0 ? Math.PI/4 : 0);
                                    var rd = latticeType === 0 ? 0.5 / Math.cos(Math.PI/4) * 0.71 : 1 / Math.sqrt(3);
                                    wsVerts.push([rd * Math.cos(ang), rd * Math.sin(ang)]);
                                }
                                ctx.strokeStyle = viz.colors.green + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                for (var w = 0; w <= wsVerts.length; w++) {
                                    var wv = wsVerts[w % wsVerts.length];
                                    var ws = viz.toScreen(wv[0], wv[1]);
                                    w === 0 ? ctx.moveTo(ws[0], ws[1]) : ctx.lineTo(ws[0], ws[1]);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            viz.screenText('Allowed rotations: n = 1, 2, 3, 4, 6 only (crystallographic restriction)',
                                viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-particle-multiplets',
                    title: 'Quark SU(3) Flavor Multiplets',
                    description: 'The weight diagrams of SU(3) flavor representations. Each dot is a hadron; its position encodes the quantum numbers (isospin I3, hypercharge Y). Select the octet or decuplet.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 220, scale: 80
                        });

                        var mode = 0; // 0: octet, 1: decuplet, 2: fundamental
                        VizEngine.createButton(controls, 'Fundamental (3)', function() { mode = 2; draw(); });
                        VizEngine.createButton(controls, 'Meson Octet (8)', function() { mode = 0; draw(); });
                        VizEngine.createButton(controls, 'Baryon Decuplet (10)', function() { mode = 1; draw(); });

                        // Particles: [I3, Y, name, color]
                        var octet = [
                            [1, 0, 'p', viz.colors.blue],
                            [-1, 0, 'n', viz.colors.blue],
                            [1, 0, '\u03A3\u207A', viz.colors.teal],
                            [0, 0, '\u03A3\u2070/\u039B', viz.colors.teal],
                            [-1, 0, '\u03A3\u207B', viz.colors.teal],
                            [0.5, -1, '\u039E\u2070', viz.colors.orange],
                            [-0.5, -1, '\u039E\u207B', viz.colors.orange]
                        ];
                        // Remap for proper baryon octet weight diagram
                        var baryonOctet = [
                            [0.5, 1, 'p', viz.colors.blue],
                            [-0.5, 1, 'n', viz.colors.blue],
                            [1, 0, '\u03A3\u207A', viz.colors.teal],
                            [0, 0, '\u03A3\u2070', viz.colors.teal],
                            [-1, 0, '\u03A3\u207B', viz.colors.teal],
                            [0, 0, '\u039B', viz.colors.green],
                            [0.5, -1, '\u039E\u2070', viz.colors.orange],
                            [-0.5, -1, '\u039E\u207B', viz.colors.orange]
                        ];

                        var decuplet = [
                            [1.5, 1, '\u0394\u207A\u207A', viz.colors.blue],
                            [0.5, 1, '\u0394\u207A', viz.colors.blue],
                            [-0.5, 1, '\u0394\u2070', viz.colors.blue],
                            [-1.5, 1, '\u0394\u207B', viz.colors.blue],
                            [1, 0, '\u03A3*\u207A', viz.colors.teal],
                            [0, 0, '\u03A3*\u2070', viz.colors.teal],
                            [-1, 0, '\u03A3*\u207B', viz.colors.teal],
                            [0.5, -1, '\u039E*\u2070', viz.colors.orange],
                            [-0.5, -1, '\u039E*\u207B', viz.colors.orange],
                            [0, -2, '\u03A9\u207B', viz.colors.red]
                        ];

                        var fundamental = [
                            [0.5, 1/3, 'u', viz.colors.blue],
                            [-0.5, 1/3, 'd', viz.colors.teal],
                            [0, -2/3, 's', viz.colors.orange]
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var particles, title;
                            if (mode === 0) { particles = baryonOctet; title = 'Baryon Octet (8)'; }
                            else if (mode === 1) { particles = decuplet; title = 'Baryon Decuplet (10)'; }
                            else { particles = fundamental; title = 'Fundamental Representation (3)'; }

                            viz.screenText('SU(3) Flavor: ' + title, viz.width / 2, 20, viz.colors.white, 14);

                            // Axes
                            viz.screenText('I\u2083', viz.width - 30, viz.originY + 4, viz.colors.text, 11);
                            viz.screenText('Y', viz.originX + 12, 55, viz.colors.text, 11);

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gy = -2; gy <= 2; gy++) {
                                var gys = viz.toScreen(0, gy);
                                ctx.beginPath(); ctx.moveTo(30, gys[1]); ctx.lineTo(530, gys[1]); ctx.stroke();
                            }
                            for (var gx = -2; gx <= 2; gx++) {
                                var gxs = viz.toScreen(gx, 0);
                                ctx.beginPath(); ctx.moveTo(gxs[0], 50); ctx.lineTo(gxs[0], 380); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(30, viz.originY); ctx.lineTo(530, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 50); ctx.lineTo(viz.originX, 380); ctx.stroke();

                            // Draw connecting lines for the multiplet outline
                            if (particles.length > 2) {
                                // Find convex hull-ish outline
                                var sorted = particles.slice().sort(function(a, b) {
                                    return a[1] !== b[1] ? b[1] - a[1] : a[0] - b[0];
                                });
                                ctx.strokeStyle = viz.colors.purple + '44';
                                ctx.lineWidth = 1.5;
                                // Connect extremal points at each Y level
                                var yLevels = {};
                                for (var p = 0; p < particles.length; p++) {
                                    var yKey = particles[p][1].toFixed(2);
                                    if (!yLevels[yKey]) yLevels[yKey] = [];
                                    yLevels[yKey].push(particles[p]);
                                }
                                var outline = [];
                                var keys = Object.keys(yLevels).sort(function(a, b) { return parseFloat(b) - parseFloat(a); });
                                // Top to bottom, leftmost then rightmost
                                for (var ki = 0; ki < keys.length; ki++) {
                                    var row = yLevels[keys[ki]].sort(function(a, b) { return a[0] - b[0]; });
                                    if (ki === 0 || ki === keys.length - 1) {
                                        for (var ri = 0; ri < row.length; ri++) outline.push(row[ri]);
                                    } else {
                                        outline.push(row[0]);
                                    }
                                }
                                // Go back up the right side
                                for (var ki2 = keys.length - 2; ki2 >= 1; ki2--) {
                                    var row2 = yLevels[keys[ki2]].sort(function(a, b) { return a[0] - b[0]; });
                                    outline.push(row2[row2.length - 1]);
                                }

                                if (outline.length > 2) {
                                    ctx.beginPath();
                                    var s0 = viz.toScreen(outline[0][0], outline[0][1]);
                                    ctx.moveTo(s0[0], s0[1]);
                                    for (var oi = 1; oi < outline.length; oi++) {
                                        var so = viz.toScreen(outline[oi][0], outline[oi][1]);
                                        ctx.lineTo(so[0], so[1]);
                                    }
                                    ctx.closePath();
                                    ctx.fillStyle = viz.colors.purple + '0a';
                                    ctx.fill();
                                    ctx.stroke();
                                }
                            }

                            // Draw particles
                            for (var i = 0; i < particles.length; i++) {
                                var pt = particles[i];
                                var sp = viz.toScreen(pt[0], pt[1]);
                                ctx.fillStyle = pt[3];
                                ctx.beginPath(); ctx.arc(sp[0], sp[1], 8, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fff';
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                // Label
                                ctx.fillStyle = pt[3];
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                ctx.fillText(pt[2], sp[0], sp[1] - 12);
                            }

                            if (mode === 1) {
                                viz.screenText('\u03A9\u207B predicted (1962), discovered (1964)', viz.width / 2, viz.height - 10, viz.colors.red, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the crystallographic restriction: if a rotation \\(R\\) of angle \\(2\\pi/n\\) is a symmetry of a 2D lattice, then \\(n \\in \\{1, 2, 3, 4, 6\\}\\).',
                    hint: 'Use the fact that the trace of a \\(2 \\times 2\\) rotation matrix is \\(2\\cos(2\\pi/n)\\), and in a lattice basis this trace must be an integer.',
                    solution: 'In a lattice basis \\(\\{\\mathbf{a}_1, \\mathbf{a}_2\\}\\), the rotation matrix has integer entries (it maps lattice vectors to lattice vectors). So \\(\\text{Tr}(R) \\in \\mathbb{Z}\\). But \\(\\text{Tr}(R) = 2\\cos(2\\pi/n)\\). Since \\(-1 \\leq \\cos(2\\pi/n) \\leq 1\\), we need \\(2\\cos(2\\pi/n) \\in \\{-2, -1, 0, 1, 2\\}\\), giving \\(\\cos(2\\pi/n) \\in \\{-1, -1/2, 0, 1/2, 1\\}\\), hence \\(n \\in \\{2, 3, 4, 6, 1\\}\\). \\(\\square\\)'
                },
                {
                    question: 'In SU(3) flavor, the meson octet arises from \\(\\mathbf{3} \\otimes \\bar{\\mathbf{3}} = \\mathbf{8} \\oplus \\mathbf{1}\\). What are the dimensions on each side? What is the physical interpretation of the singlet?',
                    hint: 'On the left: \\(3 \\times 3 = 9\\). On the right: \\(8 + 1 = 9\\). The singlet is invariant under all SU(3) transformations.',
                    solution: 'Dimensions: \\(3 \\times 3 = 9 = 8 + 1\\). \\(\\checkmark\\) The singlet is the flavor-symmetric combination \\(\\frac{1}{\\sqrt{3}}(u\\bar{u} + d\\bar{d} + s\\bar{s})\\), which is invariant under SU(3) flavor rotations. Physically, this corresponds to the \\(\\eta\'\\) meson (approximately). It is a "flavor-blind" state that treats all three quark flavors equally.'
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
<h2>Looking Ahead: From Groups to Complex Analysis</h2>

<p>Group theory gave us the language of symmetry; we can now classify states, derive conservation laws, and predict selection rules without solving equations. But physics also needs us to <em>compute</em>: to evaluate integrals, to solve differential equations, to sum series. For this, we turn to one of the most powerful analytical tools in all of mathematics: <strong>complex analysis</strong>.</p>

<h3>What We Have Learned</h3>

<ul>
    <li><strong>Groups</strong> formalize symmetry: closure, associativity, identity, inverse.</li>
    <li><strong>Representations</strong> make groups concrete: group elements act as matrices on vector spaces. Irreducible representations are the building blocks.</li>
    <li><strong>Lie groups</strong> are continuous symmetry groups. Their local structure is captured by Lie algebras and the exponential map.</li>
    <li><strong>Noether's theorem</strong> connects continuous symmetries to conserved quantities, one of the deepest results in theoretical physics.</li>
    <li><strong>Classification</strong>: group theory organizes crystals into 230 space groups and elementary particles into SU(3) multiplets.</li>
</ul>

<h3>The Road to Complex Analysis</h3>

<p>In Chapter 6, we enter the world of functions of a complex variable. The connection to group theory is closer than you might think:</p>

<ul>
    <li>Conformal mappings form a group (the Mobius group), and this group structure determines which physical problems can be mapped to simpler ones.</li>
    <li>The residue theorem lets us evaluate real integrals by deforming contours in the complex plane, a technique that relies on the topological (group-like) properties of closed curves.</li>
    <li>Special functions (Bessel, Legendre, hypergeometric) arise as matrix elements of group representations, connecting our algebraic machinery to the analytic tools of later chapters.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">The Unity of Mathematical Physics</div>
    <div class="env-body">
        <p>Group theory is not an isolated topic but a thread that runs through all of mathematical physics. When we study Fourier analysis (Chapter 14), we are decomposing functions into irreps of the translation group. When we solve Laplace's equation in spherical coordinates (Chapter 12), we are using the representation theory of SO(3). The language of groups, once learned, illuminates everything that follows.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'The Lorentz group SO(3,1) has 6 generators: 3 rotations and 3 boosts. Write down the number of generators for the Poincare group (Lorentz + translations in 4D spacetime). What conserved quantities do the extra generators correspond to?',
                    hint: 'Translations in 4D spacetime add 4 generators (one for each spacetime direction).',
                    solution: 'The Poincare group has \\(6 + 4 = 10\\) generators: 3 rotations (angular momentum \\(\\mathbf{L}\\)), 3 boosts (center-of-mass motion), 3 spatial translations (linear momentum \\(\\mathbf{p}\\)), and 1 time translation (energy \\(E\\)). The 10 conserved quantities are the cornerstone of relativistic physics.'
                }
            ]
        }
    ]
});
