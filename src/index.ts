import draw from "./demos/webglStart";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl");
if (!gl) {
    alert("你不能使用webgl");
}

// 告诉webgl渲染窗口的尺寸大小
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.enable(gl.DEPTH_TEST);
gl.clearColor(0, 0, 0, 0); // 设定clearColor的颜色缓冲
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // 用clearColor的颜色，清屏

draw(gl);
