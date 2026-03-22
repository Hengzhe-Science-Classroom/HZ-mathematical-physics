window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Matrices & Eigenvalues',
    subtitle: 'Linear algebra as the physicist uses it',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Matrices?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Matrices?',
            content: `
<h2>Why Matrices?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Idea</div>
    <div class="env-body">
        <p>A matrix is a linear map made concrete. Every rotation, reflection, strain, and Lorentz boost that a physicist writes down is, at bottom, a matrix acting on a vector. The eigenvectors of that matrix are the directions along which the map acts by pure scaling, and the eigenvalues are the scale factors. Finding them is the single most useful computation in physics.</p>
    </div>
</div>

<p>Matrices appear everywhere in physics:</p>
<ul>
    <li>The <strong>inertia tensor</strong> \\(I_{ij}\\) relates angular velocity \\(\\omega_j\\) to angular momentum \\(L_i = I_{ij}\\omega_j\\). Diagonalizing \\(I\\) yields the principal axes of a rigid body.</li>
    <li>In quantum mechanics, every observable is a <strong>Hermitian matrix</strong> (or operator). Its eigenvalues are the possible measurement outcomes; its eigenvectors are the corresponding states.</li>
    <li><strong>Normal modes</strong> of coupled oscillators are the eigenvectors of \\(M^{-1}K\\), where \\(M\\) and \\(K\\) are the mass and stiffness matrices.</li>
    <li><strong>Lorentz transformations</strong> in special relativity are \\(4\\times 4\\) matrices preserving the Minkowski metric.</li>
</ul>

<p>This chapter treats \\(n \\times n\\) matrices over \\(\\mathbb{R}\\) or \\(\\mathbb{C}\\). We move from operations (multiplication, determinant, inverse) through the eigenvalue problem and diagonalization to the special matrix families (Hermitian, unitary, orthogonal) that dominate physics, and close with the SVD.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Matrix)</div>
    <div class="env-body">
        <p>An \\(m \\times n\\) <strong>matrix</strong> \\(A\\) is a rectangular array of numbers \\(a_{ij}\\) with \\(i = 1,\\dots,m\\) (rows) and \\(j = 1,\\dots,n\\) (columns). We write \\(A \\in \\mathbb{R}^{m \\times n}\\) or \\(A \\in \\mathbb{C}^{m \\times n}\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Notation</div>
    <div class="env-body">
        <p>Throughout this chapter, bold uppercase (\\(\\mathbf{A}\\)) denotes a matrix, bold lowercase (\\(\\mathbf{v}\\)) a column vector, and plain lowercase (\\(\\lambda\\)) a scalar. The Einstein summation convention is used where indicated.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-matrix-transform"></div>
`,
            visualizations: [
                {
                    id: 'viz-matrix-transform',
                    title: 'Matrix as a Linear Transformation',
                    description: 'A 2x2 matrix transforms every point in the plane. The unit square (white) maps to the parallelogram (colored). Drag the sliders to change the matrix entries and watch the plane deform in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 50 });
                        var a = 1, b = 0, c = 0, d = 1;
                        var t = 0;

                        VizEngine.createSlider(controls, 'a\u2081\u2081', -3, 3, a, 0.1, function(v) { a = v; });
                        VizEngine.createSlider(controls, 'a\u2081\u2082', -3, 3, b, 0.1, function(v) { b = v; });
                        VizEngine.createSlider(controls, 'a\u2082\u2081', -3, 3, c, 0.1, function(v) { c = v; });
                        VizEngine.createSlider(controls, 'a\u2082\u2082', -3, 3, d, 0.1, function(v) { d = v; });

                        VizEngine.createButton(controls, 'Rotation 45\u00b0', function() {
                            var ang = Math.PI / 4;
                            a = Math.cos(ang); b = -Math.sin(ang);
                            c = Math.sin(ang); d = Math.cos(ang);
                        });
                        VizEngine.createButton(controls, 'Shear', function() {
                            a = 1; b = 0.8; c = 0; d = 1;
                        });
                        VizEngine.createButton(controls, 'Reflection', function() {
                            a = 0; b = 1; c = 1; d = 0;
                        });

                        viz.animate(function(time) {
                            t = time * 0.001;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var M = [[a, b], [c, d]];
                            var det = a * d - b * c;

                            // Draw transformed grid lines
                            var ctx = viz.ctx;
                            ctx.globalAlpha = 0.15;
                            for (var i = -5; i <= 5; i++) {
                                var p1 = VizEngine.matVec(M, [i, -5]);
                                var p2 = VizEngine.matVec(M, [i, 5]);
                                var s1 = viz.toScreen(p1[0], p1[1]);
                                var s2 = viz.toScreen(p2[0], p2[1]);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();

                                p1 = VizEngine.matVec(M, [-5, i]);
                                p2 = VizEngine.matVec(M, [5, i]);
                                s1 = viz.toScreen(p1[0], p1[1]);
                                s2 = viz.toScreen(p2[0], p2[1]);
                                ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
                            }
                            ctx.globalAlpha = 1.0;

                            // Unit square outline
                            viz.drawPolygon([[0,0],[1,0],[1,1],[0,1]], null, viz.colors.text + '66', 1);

                            // Transformed parallelogram
                            var v1 = VizEngine.matVec(M, [1, 0]);
                            var v2 = VizEngine.matVec(M, [0, 1]);
                            var v3 = VizEngine.matVec(M, [1, 1]);
                            viz.drawPolygon(
                                [[0,0], v1, v3, v2],
                                viz.colors.blue + '33', viz.colors.blue, 2
                            );

                            // Basis vectors
                            viz.drawVector(0, 0, 1, 0, viz.colors.text + '88', null, 1);
                            viz.drawVector(0, 0, 0, 1, viz.colors.text + '88', null, 1);
                            viz.drawVector(0, 0, v1[0], v1[1], viz.colors.orange, 'Ae\u2081', 2.5);
                            viz.drawVector(0, 0, v2[0], v2[1], viz.colors.teal, 'Ae\u2082', 2.5);

                            // Info
                            viz.screenText('A = [[' + a.toFixed(1) + ', ' + b.toFixed(1) + '], [' + c.toFixed(1) + ', ' + d.toFixed(1) + ']]', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('det(A) = ' + det.toFixed(2), viz.width / 2, 38, det < 0 ? viz.colors.red : viz.colors.teal, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Matrix Operations
        // ================================================================
        {
            id: 'sec-operations',
            title: 'Matrix Operations',
            content: `
<h2>Matrix Operations</h2>

<h3>Addition and Scalar Multiplication</h3>

<p>These are entry-wise: if \\(A, B \\in \\mathbb{R}^{m \\times n}\\) and \\(\\alpha \\in \\mathbb{R}\\),</p>
\\[(A + B)_{ij} = a_{ij} + b_{ij}, \\qquad (\\alpha A)_{ij} = \\alpha\\, a_{ij}.\\]

<h3>Matrix Multiplication</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Matrix Multiplication)</div>
    <div class="env-body">
        <p>If \\(A \\in \\mathbb{R}^{m \\times p}\\) and \\(B \\in \\mathbb{R}^{p \\times n}\\), their product \\(C = AB \\in \\mathbb{R}^{m \\times n}\\) has entries</p>
        \\[c_{ij} = \\sum_{k=1}^{p} a_{ik}\\, b_{kj}.\\]
        <p>The number of columns of \\(A\\) must equal the number of rows of \\(B\\). In general, \\(AB \\neq BA\\): matrix multiplication is <strong>not commutative</strong>.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physical Interpretation</div>
    <div class="env-body">
        <p>The product \\(AB\\) represents the <em>composition</em> of two linear maps: first apply \\(B\\), then \\(A\\). Non-commutativity reflects the physical fact that the order of operations matters: rotating then reflecting is generally different from reflecting then rotating.</p>
    </div>
</div>

<h3>Transpose and Conjugate Transpose</h3>

<div class="env-block definition">
    <div class="env-title">Definition</div>
    <div class="env-body">
        <p>The <strong>transpose</strong> \\(A^T\\) has \\((A^T)_{ij} = a_{ji}\\). The <strong>conjugate transpose</strong> (Hermitian adjoint) \\(A^\\dagger\\) has \\((A^\\dagger)_{ij} = \\bar{a}_{ji}\\). Key identities:</p>
        \\[(AB)^T = B^T A^T, \\qquad (AB)^\\dagger = B^\\dagger A^\\dagger.\\]
    </div>
</div>

<h3>The Determinant</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Determinant)</div>
    <div class="env-body">
        <p>For \\(A \\in \\mathbb{R}^{n \\times n}\\), the determinant is</p>
        \\[\\det A = \\sum_{\\sigma \\in S_n} \\mathrm{sgn}(\\sigma) \\prod_{i=1}^{n} a_{i,\\sigma(i)},\\]
        <p>where the sum is over all permutations of \\(\\{1,\\dots,n\\}\\). For \\(2 \\times 2\\):</p>
        \\[\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.1 (Properties of the Determinant)</div>
    <div class="env-body">
        <ol>
            <li>\\(\\det(AB) = \\det A \\cdot \\det B\\).</li>
            <li>\\(\\det(A^T) = \\det A\\).</li>
            <li>\\(A\\) is invertible if and only if \\(\\det A \\neq 0\\).</li>
            <li>\\(\\det(\\alpha A) = \\alpha^n \\det A\\) for \\(A \\in \\mathbb{R}^{n \\times n}\\).</li>
        </ol>
    </div>
</div>

<h3>The Inverse</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Inverse Matrix)</div>
    <div class="env-body">
        <p>If \\(\\det A \\neq 0\\), there exists a unique matrix \\(A^{-1}\\) such that \\(AA^{-1} = A^{-1}A = I\\). For \\(2 \\times 2\\):</p>
        \\[\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Rotation Matrix Inverse</div>
    <div class="env-body">
        <p>A rotation by angle \\(\\theta\\) is given by \\(R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\). Its inverse is \\(R(-\\theta) = R(\\theta)^T\\), reflecting the fact that rotations are orthogonal: \\(R^T R = I\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-determinant"></div>
`,
            visualizations: [
                {
                    id: 'viz-determinant',
                    title: 'Determinant as Signed Area',
                    description: 'The absolute value of the determinant equals the area of the parallelogram spanned by the column vectors. When det < 0, the orientation is flipped. Drag the arrow tips to reshape the parallelogram.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 50 });

                        var d1 = viz.addDraggable('v1', 2, 0.5, viz.colors.orange);
                        var d2 = viz.addDraggable('v2', -0.5, 2, viz.colors.teal);

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ax = d1.x, ay = d1.y;
                            var bx = d2.x, by = d2.y;
                            var det = ax * by - ay * bx;

                            // Parallelogram
                            viz.drawPolygon(
                                [[0,0],[ax,ay],[ax+bx,ay+by],[bx,by]],
                                (det >= 0 ? viz.colors.blue : viz.colors.red) + '33',
                                det >= 0 ? viz.colors.blue : viz.colors.red, 2
                            );

                            // Column vectors
                            viz.drawVector(0, 0, ax, ay, viz.colors.orange, 'v\u2081', 2.5);
                            viz.drawVector(0, 0, bx, by, viz.colors.teal, 'v\u2082', 2.5);

                            // Info
                            viz.screenText('det = ' + det.toFixed(2), viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('|det| = area = ' + Math.abs(det).toFixed(2), viz.width / 2, 38, viz.colors.teal, 12);
                            if (det < 0) {
                                viz.screenText('Negative: orientation reversed', viz.width / 2, 56, viz.colors.red, 11);
                            }

                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that for the rotation matrix \\(R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\), we have \\(\\det R = 1\\) and \\(R^T R = I\\).',
                    hint: 'Compute \\(\\det R = \\cos^2\\theta + \\sin^2\\theta\\). For \\(R^T R\\), multiply out and use the Pythagorean identity.',
                    solution: '\\(\\det R = \\cos\\theta \\cdot \\cos\\theta - (-\\sin\\theta)(\\sin\\theta) = \\cos^2\\theta + \\sin^2\\theta = 1\\). For \\(R^T R\\): the (1,1) entry is \\(\\cos^2\\theta + \\sin^2\\theta = 1\\), the (1,2) entry is \\(-\\cos\\theta\\sin\\theta + \\sin\\theta\\cos\\theta = 0\\), and similarly for the others. So \\(R^T R = I\\).'
                },
                {
                    question: 'Show that \\(\\det(AB) = \\det(BA)\\) even though \\(AB \\neq BA\\) in general.',
                    hint: 'Use the product rule for determinants.',
                    solution: '\\(\\det(AB) = \\det A \\cdot \\det B = \\det B \\cdot \\det A = \\det(BA)\\). The determinant is a scalar, and scalar multiplication is commutative.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Eigenvalues & Eigenvectors
        // ================================================================
        {
            id: 'sec-eigenvalues',
            title: 'Eigenvalues & Eigenvectors',
            content: `
<h2>Eigenvalues & Eigenvectors</h2>

<div class="env-block intuition">
    <div class="env-title">Physical Meaning: Principal Axes</div>
    <div class="env-body">
        <p>Apply a force to a rubber sheet stretched over a frame. Most points move in a complicated direction. But certain special directions just stretch (or compress) without turning. Those are the <strong>eigenvectors</strong>, and the stretch factors are the <strong>eigenvalues</strong>. Finding these directions simplifies everything: the complicated deformation reduces to independent scalings along the eigenvector axes.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Eigenvalue Problem)</div>
    <div class="env-body">
        <p>Let \\(A \\in \\mathbb{C}^{n \\times n}\\). A scalar \\(\\lambda \\in \\mathbb{C}\\) is an <strong>eigenvalue</strong> of \\(A\\) if there exists a nonzero vector \\(\\mathbf{v}\\) such that</p>
        \\[A\\mathbf{v} = \\lambda \\mathbf{v}.\\]
        <p>The vector \\(\\mathbf{v}\\) is called an <strong>eigenvector</strong> corresponding to \\(\\lambda\\). The set of all eigenvectors for a given \\(\\lambda\\) (together with \\(\\mathbf{0}\\)) forms the <strong>eigenspace</strong> \\(E_\\lambda = \\ker(A - \\lambda I)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.2 (Characteristic Polynomial)</div>
    <div class="env-body">
        <p>The eigenvalues of \\(A\\) are the roots of the <strong>characteristic polynomial</strong>:</p>
        \\[p(\\lambda) = \\det(A - \\lambda I) = 0.\\]
        <p>This is a polynomial of degree \\(n\\), so (counting multiplicities over \\(\\mathbb{C}\\)) there are exactly \\(n\\) eigenvalues.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: 2\\(\\times\\)2 Eigenvalues</div>
    <div class="env-body">
        <p>For \\(A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}\\), the characteristic polynomial is</p>
        \\[\\det\\begin{pmatrix} 3-\\lambda & 1 \\\\ 0 & 2-\\lambda \\end{pmatrix} = (3-\\lambda)(2-\\lambda) = 0,\\]
        <p>giving \\(\\lambda_1 = 3\\), \\(\\lambda_2 = 2\\). For \\(\\lambda_1 = 3\\): \\((A - 3I)\\mathbf{v} = 0\\) gives \\(v_2 = 0\\), so \\(\\mathbf{v}_1 = (1, 0)^T\\). For \\(\\lambda_2 = 2\\): \\(v_1 + v_2 = 0\\), so \\(\\mathbf{v}_2 = (1, -1)^T\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.3 (Trace and Determinant)</div>
    <div class="env-body">
        <p>For any \\(n \\times n\\) matrix \\(A\\) with eigenvalues \\(\\lambda_1, \\dots, \\lambda_n\\):</p>
        \\[\\mathrm{tr}\\,A = \\sum_{i=1}^n \\lambda_i, \\qquad \\det A = \\prod_{i=1}^n \\lambda_i.\\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physics Connection</div>
    <div class="env-body">
        <p>In quantum mechanics, the trace of a density matrix \\(\\rho\\) is always 1 (conservation of probability). The eigenvalues of \\(\\rho\\) are the probabilities of being in each eigenstate, and they must sum to 1.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-eigenvalue-visualizer"></div>
`,
            visualizations: [
                {
                    id: 'viz-eigenvalue-visualizer',
                    title: 'Eigenvectors Under Transformation',
                    description: 'Blue vectors are generic: the matrix rotates and stretches them. Orange vectors are eigenvectors: they keep their direction (or reverse it) and only get scaled by the eigenvalue. Adjust the matrix to see how eigenvectors change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 55 });
                        var a = 2, b = 1, c = 0, d = 1;

                        VizEngine.createSlider(controls, 'a\u2081\u2081', -3, 3, a, 0.1, function(v) { a = v; });
                        VizEngine.createSlider(controls, 'a\u2081\u2082', -3, 3, b, 0.1, function(v) { b = v; });
                        VizEngine.createSlider(controls, 'a\u2082\u2081', -3, 3, c, 0.1, function(v) { c = v; });
                        VizEngine.createSlider(controls, 'a\u2082\u2082', -3, 3, d, 0.1, function(v) { d = v; });

                        viz.animate(function(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var M = [[a, b], [c, d]];
                            var evals = VizEngine.eigenvalues2(M);

                            // Draw several generic vectors and their images
                            var nSamp = 12;
                            for (var i = 0; i < nSamp; i++) {
                                var ang = (2 * Math.PI * i) / nSamp;
                                var vx = Math.cos(ang), vy = Math.sin(ang);
                                var mv = VizEngine.matVec(M, [vx, vy]);
                                viz.drawVector(0, 0, vx, vy, viz.colors.blue + '55', null, 1);
                                viz.drawVector(0, 0, mv[0], mv[1], viz.colors.blue + 'aa', null, 1.5);
                            }

                            if (evals) {
                                // Draw eigenvectors
                                for (var ei = 0; ei < 2; ei++) {
                                    var lam = evals[ei];
                                    var ev = VizEngine.eigenvector2(M, lam);
                                    var col = ei === 0 ? viz.colors.orange : viz.colors.green;

                                    // Extended eigenvector line
                                    viz.drawLine(0, 0, ev[0], ev[1], col + '44', 1, true);

                                    // Original eigenvector
                                    viz.drawVector(0, 0, ev[0] * 1.5, ev[1] * 1.5, col, null, 2.5);
                                    // Transformed eigenvector
                                    viz.drawVector(0, 0, ev[0] * 1.5 * lam, ev[1] * 1.5 * lam, col, '\u03bb' + (ei+1) + '=' + lam.toFixed(2), 2.5);
                                }
                                viz.screenText('\u03bb\u2081 = ' + evals[0].toFixed(3) + ',  \u03bb\u2082 = ' + evals[1].toFixed(3), viz.width / 2, 20, viz.colors.white, 13);
                                viz.screenText('tr = ' + (a + d).toFixed(2) + ',  det = ' + (a*d - b*c).toFixed(2), viz.width / 2, 38, viz.colors.teal, 11);
                            } else {
                                viz.screenText('Complex eigenvalues (rotation-like)', viz.width / 2, 20, viz.colors.pink, 13);
                                viz.screenText('tr\u00b2 < 4 det : no real eigenvectors', viz.width / 2, 38, viz.colors.text, 11);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the eigenvalues and eigenvectors of \\(A = \\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix}\\).',
                    hint: 'Compute \\(\\det(A - \\lambda I) = (4 - \\lambda)(3 - \\lambda) - 2 = 0\\).',
                    solution: 'The characteristic polynomial is \\(\\lambda^2 - 7\\lambda + 10 = 0\\), giving \\(\\lambda_1 = 5\\), \\(\\lambda_2 = 2\\). For \\(\\lambda_1 = 5\\): \\(-v_1 + 2v_2 = 0\\), so \\(\\mathbf{v}_1 = (2, 1)^T\\). For \\(\\lambda_2 = 2\\): \\(2v_1 + 2v_2 = 0\\), so \\(\\mathbf{v}_2 = (1, -1)^T\\).'
                },
                {
                    question: 'Show that the eigenvalues of a triangular matrix (upper or lower) are its diagonal entries.',
                    hint: 'What does \\(\\det(A - \\lambda I)\\) look like when \\(A\\) is triangular?',
                    solution: 'If \\(A\\) is triangular, then \\(A - \\lambda I\\) is also triangular with diagonal entries \\(a_{ii} - \\lambda\\). The determinant of a triangular matrix is the product of its diagonal entries: \\(\\det(A - \\lambda I) = \\prod_i (a_{ii} - \\lambda) = 0\\), so \\(\\lambda_i = a_{ii}\\).'
                },
                {
                    question: 'If \\(\\lambda\\) is an eigenvalue of \\(A\\) with eigenvector \\(\\mathbf{v}\\), show that \\(\\lambda^k\\) is an eigenvalue of \\(A^k\\) with the same eigenvector.',
                    hint: 'Apply \\(A\\) repeatedly and use \\(A\\mathbf{v} = \\lambda\\mathbf{v}\\) each time.',
                    solution: '\\(A^2 \\mathbf{v} = A(A\\mathbf{v}) = A(\\lambda\\mathbf{v}) = \\lambda A\\mathbf{v} = \\lambda^2 \\mathbf{v}\\). By induction, \\(A^k \\mathbf{v} = \\lambda^k \\mathbf{v}\\). So \\(\\lambda^k\\) is an eigenvalue of \\(A^k\\) with eigenvector \\(\\mathbf{v}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Diagonalization
        // ================================================================
        {
            id: 'sec-diagonalization',
            title: 'Diagonalization',
            content: `
<h2>Diagonalization</h2>

<div class="env-block intuition">
    <div class="env-title">Normal Modes</div>
    <div class="env-body">
        <p>Two masses coupled by springs form a system whose equations of motion involve a matrix. When you diagonalize that matrix, you discover the <strong>normal modes</strong>: independent oscillation patterns where both masses move in sync at a single frequency. Each normal mode is an eigenvector; each frequency is determined by the corresponding eigenvalue. The complicated coupled motion is just a superposition of these simple modes.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Diagonalizable Matrix)</div>
    <div class="env-body">
        <p>A matrix \\(A \\in \\mathbb{C}^{n \\times n}\\) is <strong>diagonalizable</strong> if there exists an invertible matrix \\(P\\) and a diagonal matrix \\(D\\) such that</p>
        \\[A = PDP^{-1}, \\qquad D = \\mathrm{diag}(\\lambda_1, \\dots, \\lambda_n).\\]
        <p>The columns of \\(P\\) are the eigenvectors of \\(A\\), and the diagonal entries of \\(D\\) are the eigenvalues.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.4 (Diagonalizability)</div>
    <div class="env-body">
        <p>\\(A\\) is diagonalizable if and only if it has \\(n\\) linearly independent eigenvectors. Sufficient conditions include:</p>
        <ol>
            <li>\\(A\\) has \\(n\\) distinct eigenvalues.</li>
            <li>\\(A\\) is Hermitian (or real symmetric).</li>
            <li>\\(A\\) is normal (\\(A^\\dagger A = AA^\\dagger\\)).</li>
        </ol>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why Diagonalization Matters</div>
    <div class="env-body">
        <p>In the eigenbasis, the matrix is diagonal and everything simplifies:</p>
        <ul>
            <li>\\(A^k = P D^k P^{-1}\\), and \\(D^k = \\mathrm{diag}(\\lambda_1^k, \\dots, \\lambda_n^k)\\): matrix powers become trivial.</li>
            <li>\\(e^{At} = P \\,\\mathrm{diag}(e^{\\lambda_1 t}, \\dots, e^{\\lambda_n t})\\, P^{-1}\\): the matrix exponential (crucial for ODEs) decomposes into scalar exponentials.</li>
            <li>Coupled ODEs \\(\\dot{\\mathbf{x}} = A\\mathbf{x}\\) decouple into \\(n\\) independent equations \\(\\dot{y}_i = \\lambda_i y_i\\).</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Decoupling Two Coupled Oscillators</div>
    <div class="env-body">
        <p>Two identical masses \\(m\\) on springs with stiffness \\(k\\) and coupling stiffness \\(\\kappa\\):</p>
        \\[m\\ddot{x}_1 = -kx_1 - \\kappa(x_1 - x_2), \\qquad m\\ddot{x}_2 = -kx_2 - \\kappa(x_2 - x_1).\\]
        <p>In matrix form: \\(m\\ddot{\\mathbf{x}} = -K\\mathbf{x}\\) where \\(K = \\begin{pmatrix} k+\\kappa & -\\kappa \\\\ -\\kappa & k+\\kappa \\end{pmatrix}\\).</p>
        <p>The eigenvalues of \\(K\\) are \\(k\\) (eigenvector \\((1,1)^T\\): in-phase mode) and \\(k + 2\\kappa\\) (eigenvector \\((1,-1)^T\\): out-of-phase mode). The normal mode frequencies are \\(\\omega_1 = \\sqrt{k/m}\\) and \\(\\omega_2 = \\sqrt{(k+2\\kappa)/m}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-normal-modes"></div>
`,
            visualizations: [
                {
                    id: 'viz-normal-modes',
                    title: 'Coupled Oscillators & Normal Modes',
                    description: 'Two masses connected by springs. The "in-phase" mode (both move together) and "out-of-phase" mode (they move oppositely) are the eigenvectors of the stiffness matrix. Toggle between modes or see the general motion as superposition.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 80
                        });

                        var mode = 0; // 0 = both, 1 = in-phase, 2 = out-of-phase
                        var coupling = 0.5;
                        var amp1 = 1.0, amp2 = 0.5;

                        VizEngine.createSlider(controls, 'Coupling \u03ba', 0, 2, coupling, 0.1, function(v) { coupling = v; });
                        VizEngine.createSlider(controls, 'Mode 1 amp', 0, 1, amp1, 0.1, function(v) { amp1 = v; });
                        VizEngine.createSlider(controls, 'Mode 2 amp', 0, 1, amp2, 0.1, function(v) { amp2 = v; });
                        VizEngine.createButton(controls, 'In-phase only', function() { amp1 = 1; amp2 = 0; });
                        VizEngine.createButton(controls, 'Out-of-phase only', function() { amp1 = 0; amp2 = 1; });
                        VizEngine.createButton(controls, 'Superposition', function() { amp1 = 0.7; amp2 = 0.7; });

                        viz.animate(function(time) {
                            var t = time * 0.002;
                            viz.clear();

                            var ctx = viz.ctx;
                            var k = 1.0;
                            var w1 = Math.sqrt(k);
                            var w2 = Math.sqrt(k + 2 * coupling);

                            // Normal mode contributions
                            var q1 = amp1 * Math.cos(w1 * t);
                            var q2 = amp2 * Math.cos(w2 * t);

                            // Physical coordinates: x1 = q1 + q2, x2 = q1 - q2
                            var x1 = q1 + q2;
                            var x2 = q1 - q2;

                            // Layout
                            var wallL = 40, wallR = viz.width - 40;
                            var centerY = viz.height / 2;
                            var restPos1 = viz.width * 0.33;
                            var restPos2 = viz.width * 0.67;
                            var massR = 18;
                            var disp = 50; // pixels per unit displacement

                            var pos1 = restPos1 + x1 * disp;
                            var pos2 = restPos2 + x2 * disp;

                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            viz.screenText('Coupled Oscillators: Normal Mode Decomposition', viz.width / 2, 20, viz.colors.white, 13);

                            // Walls
                            ctx.fillStyle = viz.colors.axis;
                            ctx.fillRect(wallL - 4, centerY - 40, 4, 80);
                            ctx.fillRect(wallR, centerY - 40, 4, 80);

                            // Draw springs as zigzag
                            function drawSpring(x1s, x2s, y, color, segments) {
                                segments = segments || 12;
                                var len = x2s - x1s;
                                var segLen = len / segments;
                                var amp = 8;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(x1s, y);
                                for (var i = 1; i < segments; i++) {
                                    var sx = x1s + i * segLen;
                                    var sy = y + (i % 2 === 0 ? 0 : (i % 4 === 1 ? amp : -amp));
                                    ctx.lineTo(sx, sy);
                                }
                                ctx.lineTo(x2s, y);
                                ctx.stroke();
                            }

                            // Spring: wall to mass1
                            drawSpring(wallL, pos1 - massR, centerY, viz.colors.teal);
                            // Spring: mass1 to mass2 (coupling)
                            drawSpring(pos1 + massR, pos2 - massR, centerY, viz.colors.orange);
                            // Spring: mass2 to wall
                            drawSpring(pos2 + massR, wallR, centerY, viz.colors.teal);

                            // Masses
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(pos1, centerY, massR, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('m\u2081', pos1, centerY);

                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.arc(pos2, centerY, massR, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('m\u2082', pos2, centerY);

                            // Mode info
                            viz.screenText('\u03c9\u2081 = ' + w1.toFixed(2) + ' (in-phase: \u2192\u2192)', 150, viz.height - 50, viz.colors.teal, 11);
                            viz.screenText('\u03c9\u2082 = ' + w2.toFixed(2) + ' (out-of-phase: \u2192\u2190)', 400, viz.height - 50, viz.colors.orange, 11);
                            viz.screenText('x\u2081 = ' + x1.toFixed(2) + '   x\u2082 = ' + x2.toFixed(2), viz.width / 2, viz.height - 25, viz.colors.white, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Diagonalize \\(A = \\begin{pmatrix} 5 & 4 \\\\ 1 & 2 \\end{pmatrix}\\) and compute \\(A^3\\) using \\(A = PDP^{-1}\\).',
                    hint: 'First find eigenvalues \\(\\lambda = 6, 1\\) and eigenvectors. Then \\(A^3 = PD^3 P^{-1}\\).',
                    solution: 'Eigenvalues: \\(\\lambda^2 - 7\\lambda + 6 = 0\\) gives \\(\\lambda_1 = 6\\), \\(\\lambda_2 = 1\\). Eigenvectors: \\(\\mathbf{v}_1 = (4,1)^T\\), \\(\\mathbf{v}_2 = (-1,1)^T\\). So \\(P = \\begin{pmatrix} 4 & -1 \\\\ 1 & 1 \\end{pmatrix}\\), \\(D = \\begin{pmatrix} 6 & 0 \\\\ 0 & 1 \\end{pmatrix}\\). Then \\(A^3 = P\\begin{pmatrix} 216 & 0 \\\\ 0 & 1 \\end{pmatrix}P^{-1} = \\begin{pmatrix} 173 & 172 \\\\ 43 & 44 \\end{pmatrix}\\).'
                },
                {
                    question: 'A matrix has eigenvalues \\(\\lambda_1 = 3\\) and \\(\\lambda_2 = -1\\). What happens to \\(A^n \\mathbf{v}\\) as \\(n \\to \\infty\\) for a generic vector \\(\\mathbf{v}\\)?',
                    hint: 'Write \\(\\mathbf{v}\\) in the eigenbasis. Which component dominates?',
                    solution: 'Write \\(\\mathbf{v} = c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2\\). Then \\(A^n \\mathbf{v} = c_1 \\cdot 3^n \\mathbf{v}_1 + c_2 \\cdot (-1)^n \\mathbf{v}_2\\). As \\(n \\to \\infty\\), the \\(3^n\\) term dominates (assuming \\(c_1 \\neq 0\\)), so \\(A^n \\mathbf{v} \\approx c_1 \\cdot 3^n \\mathbf{v}_1\\). The vector aligns with \\(\\mathbf{v}_1\\) and grows exponentially.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Special Matrices
        // ================================================================
        {
            id: 'sec-special',
            title: 'Special Matrices',
            content: `
<h2>Special Matrices</h2>

<p>Physics privileges certain families of matrices because they have guaranteed spectral properties. Each family corresponds to a symmetry or conservation law.</p>

<h3>Hermitian (Self-Adjoint) Matrices</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Hermitian Matrix)</div>
    <div class="env-body">
        <p>A matrix \\(H \\in \\mathbb{C}^{n \\times n}\\) is <strong>Hermitian</strong> if \\(H^\\dagger = H\\), i.e., \\(\\bar{h}_{ji} = h_{ij}\\). A real Hermitian matrix is called <strong>symmetric</strong>: \\(A^T = A\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.5 (Spectral Theorem for Hermitian Matrices)</div>
    <div class="env-body">
        <p>If \\(H\\) is Hermitian, then:</p>
        <ol>
            <li>All eigenvalues are <strong>real</strong>.</li>
            <li>Eigenvectors corresponding to distinct eigenvalues are <strong>orthogonal</strong>.</li>
            <li>\\(H\\) is unitarily diagonalizable: \\(H = U\\Lambda U^\\dagger\\), where \\(U\\) is unitary and \\(\\Lambda\\) is real diagonal.</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof (Eigenvalues are Real)</div>
    <div class="env-body">
        <p>Let \\(H\\mathbf{v} = \\lambda \\mathbf{v}\\) with \\(\\mathbf{v} \\neq 0\\). Then \\(\\mathbf{v}^\\dagger H \\mathbf{v} = \\lambda \\mathbf{v}^\\dagger \\mathbf{v} = \\lambda \\|\\mathbf{v}\\|^2\\). Taking the conjugate transpose: \\(\\mathbf{v}^\\dagger H^\\dagger \\mathbf{v} = \\bar{\\lambda} \\|\\mathbf{v}\\|^2\\). Since \\(H = H^\\dagger\\), we have \\(\\lambda = \\bar{\\lambda}\\), so \\(\\lambda \\in \\mathbb{R}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Physics: Observables are Hermitian</div>
    <div class="env-body">
        <p>In quantum mechanics, every observable (energy, position, momentum, spin) is represented by a Hermitian operator. The requirement that measurement outcomes be real numbers is precisely the statement that eigenvalues are real. The orthogonality of eigenvectors corresponds to distinguishable measurement outcomes.</p>
    </div>
</div>

<h3>Unitary and Orthogonal Matrices</h3>

<div class="env-block definition">
    <div class="env-title">Definition</div>
    <div class="env-body">
        <p>A matrix \\(U \\in \\mathbb{C}^{n \\times n}\\) is <strong>unitary</strong> if \\(U^\\dagger U = UU^\\dagger = I\\). Equivalently, \\(U^{-1} = U^\\dagger\\).</p>
        <p>A real unitary matrix is called <strong>orthogonal</strong>: \\(O^T O = I\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.6 (Properties of Unitary Matrices)</div>
    <div class="env-body">
        <ol>
            <li>All eigenvalues have \\(|\\lambda| = 1\\) (they lie on the unit circle in \\(\\mathbb{C}\\)).</li>
            <li>\\(|\\det U| = 1\\).</li>
            <li>Unitary transformations preserve inner products: \\(\\langle U\\mathbf{x}, U\\mathbf{y} \\rangle = \\langle \\mathbf{x}, \\mathbf{y} \\rangle\\).</li>
        </ol>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physics: Time Evolution is Unitary</div>
    <div class="env-body">
        <p>In quantum mechanics, the time-evolution operator \\(U(t) = e^{-iHt/\\hbar}\\) is unitary when \\(H\\) is Hermitian. This preserves the norm of the state vector: probability is conserved over time.</p>
    </div>
</div>

<h3>Normal Matrices</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Normal Matrix)</div>
    <div class="env-body">
        <p>\\(A\\) is <strong>normal</strong> if \\(A^\\dagger A = AA^\\dagger\\). Both Hermitian and unitary matrices are normal. Normal matrices are exactly the unitarily diagonalizable matrices.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-hermitian"></div>

<div class="viz-placeholder" data-viz="viz-principal-axes"></div>
`,
            visualizations: [
                {
                    id: 'viz-hermitian',
                    title: 'Hermitian Matrix: Real Eigenvalues, Orthogonal Eigenvectors',
                    description: 'A real symmetric (Hermitian) matrix always has real eigenvalues and perpendicular eigenvectors. Adjust the matrix entries (constrained to be symmetric) and verify these properties.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 55 });
                        var a11 = 2.0, a12 = 1.0, a22 = 1.0;

                        VizEngine.createSlider(controls, 'a\u2081\u2081', -3, 3, a11, 0.1, function(v) { a11 = v; });
                        VizEngine.createSlider(controls, 'a\u2081\u2082 = a\u2082\u2081', -3, 3, a12, 0.1, function(v) { a12 = v; });
                        VizEngine.createSlider(controls, 'a\u2082\u2082', -3, 3, a22, 0.1, function(v) { a22 = v; });

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var M = [[a11, a12], [a12, a22]];
                            var evals = VizEngine.eigenvalues2(M);

                            // Transform unit circle to ellipse
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var ang = (2 * Math.PI * i) / 100;
                                var vx = Math.cos(ang), vy = Math.sin(ang);
                                var mv = VizEngine.matVec(M, [vx, vy]);
                                var s = viz.toScreen(mv[0], mv[1]);
                                if (i === 0) ctx.moveTo(s[0], s[1]);
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.blue + '11';
                            ctx.fill();
                            ctx.stroke();

                            if (evals) {
                                var ev1 = VizEngine.eigenvector2(M, evals[0]);
                                var ev2 = VizEngine.eigenvector2(M, evals[1]);

                                // Eigenvectors (scaled by eigenvalue for visualization)
                                var len1 = Math.min(Math.abs(evals[0]), 3);
                                var len2 = Math.min(Math.abs(evals[1]), 3);

                                viz.drawVector(0, 0, ev1[0] * len1, ev1[1] * len1, viz.colors.orange, '\u03bb\u2081=' + evals[0].toFixed(2), 2.5);
                                viz.drawVector(0, 0, ev2[0] * len2, ev2[1] * len2, viz.colors.green, '\u03bb\u2082=' + evals[1].toFixed(2), 2.5);

                                // Show right angle marker
                                var dot = ev1[0] * ev2[0] + ev1[1] * ev2[1];
                                viz.screenText('v\u2081 \u00b7 v\u2082 = ' + dot.toFixed(4) + ' (orthogonal!)', viz.width / 2, viz.height - 25, viz.colors.teal, 12);
                            }

                            viz.screenText('Symmetric: A = A\u1d40', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('[[' + a11.toFixed(1) + ', ' + a12.toFixed(1) + '], [' + a12.toFixed(1) + ', ' + a22.toFixed(1) + ']]', viz.width / 2, 36, viz.colors.text, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-principal-axes',
                    title: 'Inertia Tensor: Principal Axes',
                    description: 'An ellipse represents a 2D cross-section of the inertia tensor. Diagonalization reveals the principal axes (eigenvectors) and principal moments (eigenvalues). Drag the "mass points" to reshape the body.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 40 });

                        // Point masses
                        var d1 = viz.addDraggable('m1', 2, 0.5, viz.colors.blue);
                        var d2 = viz.addDraggable('m2', -1, 2, viz.colors.blue);
                        var d3 = viz.addDraggable('m3', 1, -1.5, viz.colors.blue);
                        var d4 = viz.addDraggable('m4', -2, -0.5, viz.colors.blue);

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var points = [
                                [d1.x, d1.y], [d2.x, d2.y],
                                [d3.x, d3.y], [d4.x, d4.y]
                            ];

                            // Compute 2D inertia tensor (each mass = 1)
                            var Ixx = 0, Iyy = 0, Ixy = 0;
                            for (var i = 0; i < points.length; i++) {
                                var px = points[i][0], py = points[i][1];
                                Ixx += py * py;
                                Iyy += px * px;
                                Ixy -= px * py;
                            }

                            var M = [[Ixx, Ixy], [Ixy, Iyy]];
                            var evals = VizEngine.eigenvalues2(M);

                            // Draw the mass points
                            for (var j = 0; j < points.length; j++) {
                                viz.drawPoint(points[j][0], points[j][1], viz.colors.blue, 'm' + (j+1), 7);
                            }

                            if (evals && evals[0] > 0 && evals[1] > 0) {
                                var ev1 = VizEngine.eigenvector2(M, evals[0]);
                                var ev2 = VizEngine.eigenvector2(M, evals[1]);

                                // Draw principal axes
                                var axLen = 3.5;
                                viz.drawSegment(-ev1[0]*axLen, -ev1[1]*axLen, ev1[0]*axLen, ev1[1]*axLen, viz.colors.orange, 2.5, true);
                                viz.drawSegment(-ev2[0]*axLen, -ev2[1]*axLen, ev2[0]*axLen, ev2[1]*axLen, viz.colors.green, 2.5, true);

                                // Draw inertia ellipse
                                var angle = Math.atan2(ev1[1], ev1[0]);
                                var r1 = 1.0 / Math.sqrt(evals[0] / points.length);
                                var r2 = 1.0 / Math.sqrt(evals[1] / points.length);
                                viz.drawEllipse(0, 0, r1, r2, angle, null, viz.colors.white + '66');

                                viz.screenText('I\u2081 = ' + evals[0].toFixed(2), 100, viz.height - 40, viz.colors.orange, 12);
                                viz.screenText('I\u2082 = ' + evals[1].toFixed(2), 100, viz.height - 22, viz.colors.green, 12);
                            }

                            viz.screenText('Drag masses to reshape the rigid body', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('Dashed lines = principal axes (eigenvectors of I)', viz.width / 2, 36, viz.colors.text, 11);
                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the eigenvalues of a unitary matrix have modulus 1.',
                    hint: 'If \\(U\\mathbf{v} = \\lambda \\mathbf{v}\\), compute \\(\\|U\\mathbf{v}\\|^2\\) two ways.',
                    solution: '\\(\\|U\\mathbf{v}\\|^2 = (U\\mathbf{v})^\\dagger (U\\mathbf{v}) = \\mathbf{v}^\\dagger U^\\dagger U \\mathbf{v} = \\mathbf{v}^\\dagger \\mathbf{v} = \\|\\mathbf{v}\\|^2\\). Also \\(\\|U\\mathbf{v}\\|^2 = |\\lambda|^2 \\|\\mathbf{v}\\|^2\\). Since \\(\\mathbf{v} \\neq 0\\), dividing gives \\(|\\lambda|^2 = 1\\), so \\(|\\lambda| = 1\\).'
                },
                {
                    question: 'Show that if \\(A\\) is both Hermitian and unitary, then \\(A^2 = I\\).',
                    hint: 'Hermitian: \\(A^\\dagger = A\\). Unitary: \\(A^\\dagger A = I\\).',
                    solution: 'Since \\(A\\) is unitary, \\(A^\\dagger A = I\\). Since \\(A\\) is Hermitian, \\(A^\\dagger = A\\). Substituting: \\(A \\cdot A = A^2 = I\\). The eigenvalues must be both real (Hermitian) and on the unit circle (unitary), so \\(\\lambda = \\pm 1\\), confirming \\(A^2 = I\\).'
                },
                {
                    question: 'The Pauli matrices \\(\\sigma_x = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\), \\(\\sigma_y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}\\), \\(\\sigma_z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\). Verify they are Hermitian, unitary, and have eigenvalues \\(\\pm 1\\).',
                    hint: 'Check \\(\\sigma_i^\\dagger = \\sigma_i\\), \\(\\sigma_i^2 = I\\), and solve \\(\\det(\\sigma_i - \\lambda I) = 0\\).',
                    solution: 'For \\(\\sigma_z\\): \\(\\sigma_z^\\dagger = \\sigma_z^T = \\sigma_z\\) (Hermitian). \\(\\sigma_z^2 = I\\) (so \\(\\sigma_z^{-1} = \\sigma_z = \\sigma_z^\\dagger\\), unitary). \\(\\det(\\sigma_z - \\lambda I) = (1-\\lambda)(-1-\\lambda) = -(1-\\lambda^2) = 0\\), giving \\(\\lambda = \\pm 1\\). The same pattern holds for \\(\\sigma_x\\) and \\(\\sigma_y\\) (verify by direct computation).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: SVD & Pseudoinverse
        // ================================================================
        {
            id: 'sec-svd',
            title: 'SVD & Pseudoinverse',
            content: `
<h2>SVD & Pseudoinverse</h2>

<div class="env-block intuition">
    <div class="env-title">Every Matrix = Rotate, Stretch, Rotate</div>
    <div class="env-body">
        <p>The singular value decomposition says that <em>any</em> matrix, not just square or symmetric ones, can be decomposed as a rotation, followed by axis-aligned stretching, followed by another rotation. This is the most general "eigenvalue-like" decomposition and is the workhorse of data analysis, signal processing, and numerical computation.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Singular Value Decomposition)</div>
    <div class="env-body">
        <p>Any \\(m \\times n\\) matrix \\(A\\) (real or complex) can be written as</p>
        \\[A = U \\Sigma V^\\dagger,\\]
        <p>where \\(U \\in \\mathbb{C}^{m \\times m}\\) is unitary, \\(V \\in \\mathbb{C}^{n \\times n}\\) is unitary, and \\(\\Sigma \\in \\mathbb{R}^{m \\times n}\\) is "diagonal" with non-negative entries \\(\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq 0\\) called the <strong>singular values</strong>.</p>
    </div>
</div>

<div class="env-block theorem">
    <div name="env-title">Theorem 3.7 (SVD and Eigenvalues)</div>
    <div class="env-body">
        <p>The singular values of \\(A\\) are the square roots of the eigenvalues of \\(A^\\dagger A\\) (equivalently, of \\(AA^\\dagger\\)). The columns of \\(V\\) are eigenvectors of \\(A^\\dagger A\\); the columns of \\(U\\) are eigenvectors of \\(AA^\\dagger\\).</p>
    </div>
</div>

<h3>The Moore-Penrose Pseudoinverse</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Pseudoinverse)</div>
    <div class="env-body">
        <p>Given the SVD \\(A = U\\Sigma V^\\dagger\\), the <strong>pseudoinverse</strong> is</p>
        \\[A^+ = V \\Sigma^+ U^\\dagger,\\]
        <p>where \\(\\Sigma^+\\) replaces each nonzero \\(\\sigma_i\\) by \\(1/\\sigma_i\\) and transposes. If \\(A\\) is invertible, \\(A^+ = A^{-1}\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Least Squares via Pseudoinverse</div>
    <div class="env-body">
        <p>The least-squares solution to the overdetermined system \\(A\\mathbf{x} = \\mathbf{b}\\) (more equations than unknowns) is \\(\\mathbf{x} = A^+ \\mathbf{b}\\). This minimizes \\(\\|A\\mathbf{x} - \\mathbf{b}\\|^2\\) and, among all minimizers, picks the one with smallest \\(\\|\\mathbf{x}\\|\\).</p>
    </div>
</div>

<h3>Low-Rank Approximation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.8 (Eckart-Young)</div>
    <div class="env-body">
        <p>The best rank-\\(k\\) approximation to \\(A\\) (in the Frobenius or operator norm) is obtained by keeping only the \\(k\\) largest singular values:</p>
        \\[A_k = \\sum_{i=1}^{k} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^\\dagger.\\]
        <p>The approximation error is \\(\\|A - A_k\\| = \\sigma_{k+1}\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physics: Principal Component Analysis</div>
    <div class="env-body">
        <p>In data analysis, the SVD of a data matrix extracts the principal components: the directions of maximum variance. Keeping only the first \\(k\\) singular values/vectors is PCA truncation, and it optimally captures the most information in \\(k\\) dimensions.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-svd"></div>
`,
            visualizations: [
                {
                    id: 'viz-svd',
                    title: 'SVD: Rotate, Stretch, Rotate',
                    description: 'Watch a matrix decompose into three steps: first V rotates, then Sigma stretches along the axes, then U rotates again. The animation cycles through the three stages.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 55 });
                        var mA = 1.5, mB = 0.8, mC = 0.5, mD = 1.2;

                        VizEngine.createSlider(controls, 'a', -2, 2, mA, 0.1, function(v) { mA = v; });
                        VizEngine.createSlider(controls, 'b', -2, 2, mB, 0.1, function(v) { mB = v; });
                        VizEngine.createSlider(controls, 'c', -2, 2, mC, 0.1, function(v) { mC = v; });
                        VizEngine.createSlider(controls, 'd', -2, 2, mD, 0.1, function(v) { mD = v; });

                        function svd2x2(a, b, c, d) {
                            // Compute SVD of 2x2 matrix via A^T A eigendecomposition
                            var ata00 = a*a + c*c, ata01 = a*b + c*d;
                            var ata11 = b*b + d*d;
                            var tr = ata00 + ata11;
                            var det = ata00*ata11 - ata01*ata01;
                            var disc = Math.sqrt(Math.max(0, tr*tr - 4*det));
                            var s1sq = (tr + disc) / 2;
                            var s2sq = (tr - disc) / 2;
                            var sig1 = Math.sqrt(Math.max(0, s1sq));
                            var sig2 = Math.sqrt(Math.max(0, s2sq));

                            // V: eigenvectors of A^T A
                            var vAngle;
                            if (Math.abs(ata01) > 1e-10) {
                                vAngle = Math.atan2(s1sq - ata00, ata01);
                            } else {
                                vAngle = ata00 >= ata11 ? 0 : Math.PI / 2;
                            }
                            var cosV = Math.cos(vAngle), sinV = Math.sin(vAngle);

                            // U: compute from A * v_i / sigma_i
                            var uAngle;
                            if (sig1 > 1e-10) {
                                var ux = (a * cosV + b * sinV) / sig1;
                                var uy = (c * cosV + d * sinV) / sig1;
                                uAngle = Math.atan2(uy, ux);
                            } else {
                                uAngle = 0;
                            }

                            // Check orientation: ensure det(U)*det(V) matches sign of det(A)
                            var detA = a*d - b*c;
                            var cosU = Math.cos(uAngle), sinU = Math.sin(uAngle);
                            var detUV = 1; // both rotations have det=1
                            if (detA < 0) {
                                // Flip sign of second singular value conceptually, or adjust V
                                sig2 = -sig2; // we will handle display
                            }

                            return {
                                sig1: Math.abs(sig1), sig2: Math.abs(sig2),
                                uAngle: uAngle, vAngle: vAngle,
                                detA: detA
                            };
                        }

                        viz.animate(function(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var svdRes = svd2x2(mA, mB, mC, mD);
                            var phase = ((time * 0.0005) % 3);
                            var t;

                            // 3 phases: V^T rotate, Sigma stretch, U rotate
                            // phase 0-1: apply V^T, phase 1-2: apply Sigma, phase 2-3: apply U
                            var label;
                            var nPts = 32;
                            var ctx = viz.ctx;

                            // Draw original unit circle and transformed
                            for (var pass = 0; pass < 2; pass++) {
                                ctx.beginPath();
                                for (var i = 0; i <= nPts; i++) {
                                    var ang = (2 * Math.PI * i) / nPts;
                                    var px = Math.cos(ang), py = Math.sin(ang);

                                    if (pass === 1) {
                                        // Apply partial SVD based on phase
                                        var cosV = Math.cos(svdRes.vAngle), sinV = Math.sin(svdRes.vAngle);
                                        var cosU = Math.cos(svdRes.uAngle), sinU = Math.sin(svdRes.uAngle);

                                        // Step 1: V^T (rotate into V basis)
                                        var vt = Math.min(phase, 1);
                                        var cv = Math.cos(-svdRes.vAngle * vt), sv = Math.sin(-svdRes.vAngle * vt);
                                        var rx = px * cv - py * sv;
                                        var ry = px * sv + py * cv;

                                        // Step 2: Sigma (stretch)
                                        if (phase > 1) {
                                            var st = Math.min(phase - 1, 1);
                                            var sx = 1 + (svdRes.sig1 - 1) * st;
                                            var sy = 1 + (svdRes.sig2 - 1) * st;
                                            if (svdRes.detA < 0) sy = 1 + (svdRes.sig2 - 1) * st;
                                            rx *= sx;
                                            ry *= sy;
                                        }

                                        // Step 3: U (rotate to output)
                                        if (phase > 2) {
                                            var ut = Math.min(phase - 2, 1);
                                            var cu = Math.cos(svdRes.uAngle * ut), su = Math.sin(svdRes.uAngle * ut);
                                            var tmp = rx;
                                            rx = tmp * cu - ry * su;
                                            ry = tmp * su + ry * cu;
                                        }

                                        px = rx; py = ry;
                                    }

                                    var s = viz.toScreen(px, py);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.closePath();
                                if (pass === 0) {
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.lineWidth = 1;
                                    ctx.stroke();
                                } else {
                                    ctx.fillStyle = viz.colors.blue + '22';
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.stroke();
                                }
                            }

                            // Phase label
                            if (phase < 1) label = 'Step 1: V\u1d40 (rotate into right singular basis)';
                            else if (phase < 2) label = 'Step 2: \u03a3 (stretch by singular values)';
                            else label = 'Step 3: U (rotate to output basis)';

                            viz.screenText(label, viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('\u03c3\u2081 = ' + svdRes.sig1.toFixed(2) + ',  \u03c3\u2082 = ' + svdRes.sig2.toFixed(2), viz.width / 2, 36, viz.colors.teal, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the SVD of \\(A = \\begin{pmatrix} 3 & 0 \\\\ 0 & -2 \\end{pmatrix}\\).',
                    hint: 'A diagonal matrix is already "almost" in SVD form. What are the singular values?',
                    solution: 'Singular values are the absolute values of the diagonal: \\(\\sigma_1 = 3\\), \\(\\sigma_2 = 2\\). We need \\(\\sigma_1 \\geq \\sigma_2 \\geq 0\\), so \\(\\Sigma = \\begin{pmatrix} 3 & 0 \\\\ 0 & 2 \\end{pmatrix}\\). Since the (2,2) entry is negative, \\(U = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\), \\(V = I\\). Check: \\(U\\Sigma V^T = \\begin{pmatrix} 3 & 0 \\\\ 0 & -2 \\end{pmatrix} = A\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Show that for any matrix \\(A\\), the singular values of \\(A\\) and \\(A^T\\) are the same.',
                    hint: 'Consider the relationship between \\(A^T A\\) and \\(AA^T\\).',
                    solution: 'The singular values of \\(A\\) are \\(\\sqrt{\\lambda_i(A^T A)}\\) and those of \\(A^T\\) are \\(\\sqrt{\\lambda_i(A A^T)}\\). But \\(A^T A\\) and \\(AA^T\\) have the same nonzero eigenvalues: if \\(A^T A \\mathbf{v} = \\lambda \\mathbf{v}\\) with \\(\\lambda \\neq 0\\), then \\(AA^T (A\\mathbf{v}) = A(A^T A \\mathbf{v}) = \\lambda (A\\mathbf{v})\\). So the singular values coincide.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What's Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Where Matrices Lead',
            content: `
<h2>Bridge: Where Matrices Lead</h2>

<p>This chapter treated finite-dimensional linear algebra: \\(n \\times n\\) matrices acting on \\(\\mathbb{R}^n\\) or \\(\\mathbb{C}^n\\). Physics demands the infinite-dimensional generalization.</p>

<div class="env-block remark">
    <div class="env-title">From Matrices to Operators</div>
    <div class="env-body">
        <p>Every concept in this chapter has an infinite-dimensional counterpart:</p>
        <table style="width:100%; border-collapse:collapse; margin:10px 0;">
            <tr style="border-bottom:1px solid #30363d;">
                <th style="text-align:left; padding:6px;">Finite-dimensional</th>
                <th style="text-align:left; padding:6px;">Infinite-dimensional</th>
                <th style="text-align:left; padding:6px;">Chapter</th>
            </tr>
            <tr style="border-bottom:1px solid #1a1a40;">
                <td style="padding:6px;">\\(\\mathbb{C}^n\\)</td>
                <td style="padding:6px;">Hilbert space \\(L^2\\)</td>
                <td style="padding:6px;">Ch. 4</td>
            </tr>
            <tr style="border-bottom:1px solid #1a1a40;">
                <td style="padding:6px;">Matrix \\(A\\)</td>
                <td style="padding:6px;">Linear operator \\(\\hat{A}\\)</td>
                <td style="padding:6px;">Ch. 4</td>
            </tr>
            <tr style="border-bottom:1px solid #1a1a40;">
                <td style="padding:6px;">Eigenvalue equation</td>
                <td style="padding:6px;">Sturm-Liouville problem</td>
                <td style="padding:6px;">Ch. 9</td>
            </tr>
            <tr style="border-bottom:1px solid #1a1a40;">
                <td style="padding:6px;">Eigenvector expansion</td>
                <td style="padding:6px;">Fourier series / eigenfunction expansion</td>
                <td style="padding:6px;">Ch. 14</td>
            </tr>
            <tr style="border-bottom:1px solid #1a1a40;">
                <td style="padding:6px;">Diagonalization</td>
                <td style="padding:6px;">Spectral theorem for operators</td>
                <td style="padding:6px;">Ch. 9</td>
            </tr>
            <tr>
                <td style="padding:6px;">Symmetry group \\(\\mathrm{O}(n)\\), \\(\\mathrm{U}(n)\\)</td>
                <td style="padding:6px;">Representation theory</td>
                <td style="padding:6px;">Ch. 5</td>
            </tr>
        </table>
    </div>
</div>

<h3>Key Ideas to Carry Forward</h3>

<ol>
    <li><strong>Eigenvalue decomposition is the physicist's Swiss army knife.</strong> Whenever a physical system is linear (or linearized), the eigenvectors reveal the natural degrees of freedom, and the eigenvalues reveal the dynamics along each one.</li>
    <li><strong>Hermiticity guarantees real measurements.</strong> The spectral theorem for Hermitian operators is the mathematical foundation of quantum measurement theory.</li>
    <li><strong>Unitary evolution preserves probability.</strong> The structure \\(U^\\dagger U = I\\) is the algebraic expression of conservation of probability in quantum mechanics (and conservation of energy in classical mechanics via symplectic structure).</li>
    <li><strong>The SVD generalizes eigendecomposition</strong> to non-square and non-normal matrices, making it the tool of choice for data-driven physics (PCA, reduced-order models, tensor networks).</li>
</ol>

<div class="env-block intuition">
    <div class="env-title">Looking Ahead: Hilbert Spaces</div>
    <div class="env-body">
        <p>In Chapter 4, \\(\\mathbb{C}^n\\) becomes an infinite-dimensional space of functions, the inner product becomes an integral, and matrices become differential operators. But the core ideas, eigenvalues, orthogonality, spectral decomposition, are exactly the same. The finite-dimensional theory in this chapter is your template for everything that follows.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'The matrix \\(A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}\\) is not diagonalizable. Show this by finding its eigenvalues and counting independent eigenvectors. What is its Jordan normal form?',
                    hint: 'The only eigenvalue is \\(\\lambda = 0\\) (with algebraic multiplicity 2). Check the geometric multiplicity.',
                    solution: '\\(\\det(A - \\lambda I) = \\lambda^2 = 0\\), so \\(\\lambda = 0\\) with algebraic multiplicity 2. The eigenspace \\(\\ker(A) = \\mathrm{span}\\{(1,0)^T\\}\\) has dimension 1 (geometric multiplicity 1). Since 1 < 2, \\(A\\) is not diagonalizable. Its Jordan normal form is \\(J = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix} = A\\) itself.'
                },
                {
                    question: 'For a real \\(3 \\times 3\\) matrix, the characteristic polynomial has degree 3. Show that it must have at least one real eigenvalue.',
                    hint: 'Use the intermediate value theorem: a cubic polynomial with real coefficients changes sign.',
                    solution: 'The characteristic polynomial \\(p(\\lambda) = -\\lambda^3 + \\cdots\\) is a real cubic. As \\(\\lambda \\to +\\infty\\), \\(p(\\lambda) \\to -\\infty\\), and as \\(\\lambda \\to -\\infty\\), \\(p(\\lambda) \\to +\\infty\\). By the intermediate value theorem, \\(p\\) has at least one real root. (Alternatively: complex roots of real polynomials come in conjugate pairs, and 3 is odd, so at least one root is real.)'
                },
                {
                    question: 'Show that similar matrices (\\(B = P^{-1}AP\\)) have the same eigenvalues, determinant, and trace.',
                    hint: 'For eigenvalues, look at \\(\\det(B - \\lambda I)\\). For trace and determinant, use the product properties.',
                    solution: '\\(\\det(B - \\lambda I) = \\det(P^{-1}AP - \\lambda P^{-1}IP) = \\det(P^{-1}(A - \\lambda I)P) = \\det(P^{-1})\\det(A - \\lambda I)\\det(P) = \\det(A - \\lambda I)\\). So the characteristic polynomials are identical, giving the same eigenvalues. Since eigenvalues determine trace (sum) and determinant (product), these are also equal.'
                }
            ]
        }
    ]
});
