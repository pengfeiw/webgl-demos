/**
 * 本例主要是为了描述webgl完整的绘制过程。
 * 1. 准备工作：清屏、设置z缓冲、告诉webgl绘制窗口尺寸。
 * 2. 创建着色器程序：编译顶点着色器和片段着色器，链接着色器为着色器程序。
 * 3. 绑定数据: 给着色器程序传递attribute、unifrom数据。
 * 4. 绘制：调用drawArrays绘制。
 */

// 顶点着色器代码
const vertex_source = `
    attribute vec3 aPos;
    
    void main() {
        gl_Position = vec4(aPos, 1);
    }
`;

// 片段着色器代码
const fragment_source = `
    precision mediump float;
    uniform vec3 uColor;

    void main() {
        gl_FragColor = vec4(uColor, 1.0);
    }
`;

// 三角形的顶点数据
const vertexs: number[] = [
    0, 0.5, 0,
    -0.5, 0, 0,
    0.5, 0, 0
];

const draw = (gl: WebGLRenderingContext) => {
    // 1.准备工作
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // 告诉webgl窗口大小
    gl.clearColor(0, 0, 0, 0); // 设定clearColor的颜色缓冲
    gl.clear(gl.COLOR_BUFFER_BIT); // 用clearColor的颜色，清屏

    // 2.创建着色器程序
    // 创建顶点着色器
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex_source); // 绑定着色器代码
    gl.compileShader(vertexShader); // 编译着色器
    var success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (!success) {
        throw "colud not compile vertex shader:" + gl.getShaderInfoLog(vertexShader);
    }
    // 创建片段着色器
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment_source); // 绑定着色器代码
    gl.compileShader(fragmentShader); // 编译着色器
    success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!success) {
        throw "colud not compile vertex shader:" + gl.getShaderInfoLog(fragmentShader);
    }
    // 链接着色器程序
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader); // 添加着色器
    gl.attachShader(program, fragmentShader); 
    gl.linkProgram(program);
    success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        throw "colud not link shader: " + gl.getProgramInfoLog(program);
    }
    // 已经链接成程序，可以删除着色器
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    gl.useProgram(program);

    // 3. 传递数据
    // 传递attribute数据
    const aPosAttLocation = gl.getAttribLocation(program, "aPos");
    const aPosAttBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aPosAttBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexs), gl.STATIC_DRAW);

    gl.vertexAttribPointer(aPosAttLocation, 3, gl.FLOAT, false, 0, 0); // 告诉gl如何解析数据
    gl.enableVertexAttribArray(aPosAttLocation);

    // 传递全局变量数据
    const uColorLocation = gl.getUniformLocation(program, "uColor");
    gl.uniform3f(uColorLocation, 0.36, 0.42, 0.60);

    // 4. 绘制
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};

export default draw;
