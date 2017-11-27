var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal;     // shader variable attrib location for normals 
var vTexCoord;
var uColor;       // shader uniform variable location for color
var uTexture;
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var checkerboard;
var road;
var imageTexture;
var greyscale;
var uColorMode;
var camera = new Camera();
var stack = new MatrixStack();
var lighting = new Lighting();
var lightAngleY = 5;
var lightAngleX = 5;
var program;
var markettex;
var officetex;
var factorytex;

window.onload = function init()
{
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.309, 0.505, 0.74, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    shaderSetup();


    Shapes.initShapes();  // create the primitive and other shapes       

    lighting.setUp();

    checkerboard = new Checkerboard();
    greyscale = new Greyscale();
    imageTexture = new ImageTexture("../textures/test.jpg");
    road = new ImageTexture("../textures/Road.jpg");
    markettex = new ImageTexture("../textures/market.jpg");
    officetex = new ImageTexture("../textures/office.jpg");
    factorytex = new ImageTexture("../textures/factory.jpg");

    render();
};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    vNormal = gl.getAttribLocation(program, "vNormal");
    vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    // colors but we keep it in for possible use later.

    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uTexture = gl.getUniformLocation(program, "uTexture");
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
    uColorMode = gl.getUniformLocation(program, "uColorMode");
}



function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));

    var viewMat = camera.calcViewMat();   // View matrix

    stack.clear();
    stack.multiply(viewMat);

    stack.push();
    var rotatex = rotateX(lightAngleX);
    var rotatey = rotateY(lightAngleY);
    var rotatexy = mult(rotatex, rotatey);
    

    var rotate = mult(rotatexy, lighting.light_position);

    //viewMat * (LightAngleY*lightPosition)
    var lpos = mult(viewMat,rotate);
    gl.uniform4fv(uLight_position, lpos);



    // Need these 2 lines since camera is sitting at origin. 
    // Without them, you would be sitting inside the cube.
    // REMOVE once camera controls are working
    stack.multiply(rotateY(lightAngleY));
    stack.multiply(rotateX(lightAngleX));
    stack.multiply(translate(lighting.light_position[0], lighting.light_position[1], lighting.light_position[2]));
    stack.multiply(scalem(0.1, 0.1, 0.1));
    gl.uniform1f(uColorMode, 2);
    //console.log(uColorMode);
    imageTexture.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();


    stack.push();
    stack.multiply(scalem(3, 0.01, 10));
    stack.multiply(translate(0,-0.5,0));
    gl.uniform1f(uColorMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    road.activate();
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.road);
    stack.pop();
    
    stack.push();
    mar = new Market();
    mar.drawMarket();
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2,0,0));
    off = new Office();
    off.drawOffice();
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-2,0,0));
    fac = new Factory();
    fac.drawFactory();
    stack.pop();
}

