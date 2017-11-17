/**
 * Contains all of the parameters needed for controlling the camera.
 * @return {Camera}
 */

//D'Angelo Guiton Trent
function Camera() {

    this.fov = 60;           // Field-of-view in Y direction angle (in degrees)
    this.zNear = 0.1;        // camera's far plane
    this.zFar = 500;         // camera's near plane

// Camera *initial* location and orientation parameters
    this.eye_start = vec4([0, 4, 25, 1]); // initial camera location (needed for reseting)   
    this.VPN = vec4([0, 0, 1, 0]);  // used to initialize uvn
    this.VUP = vec4([0, 1, 0, 0]);  // used to initialize uvn  

// Current camera location and orientation parameters
    this.eye = vec4(this.eye_start);     // camera location
    this.viewRotation;  // rotational part of matrix that transforms between World and Camera coord   

    this.calcUVN();  // initializes viewRotation
}

/**
 * Reset the camera location and orientation
 * @return none
 */
Camera.prototype.reset = function () {
    this.eye = vec4(this.eye_start);
    this.calcUVN();
};

/**
 * Calculate the *initial* viewRotation matrix of camera
 * based on VPN and VUP
 * @return none
 */
Camera.prototype.calcUVN = function () {
    this.viewRotation = mat4(1);  // identity - placeholder only

// TO DO:  COMPLETE THIS CODE
    var n = vec4(normalize(this.VPN, true));

    var u = vec4(cross(this.VUP, n), 0);
    u = normalize(u, true);
    //console.log('u = ' + u);
    var v = vec4(cross(n, u), 0);
    //console.log('cross nu = ' + cross(n,u),0);
    //console.log('v= ' + v);
    //console.log('n= ' + n);
    var t = vec4(0, 0, 0, 1);

    this.viewRotation = mat4(u, v, n, t);
    this.viewRotation.matrix = true;
    //printm(this.viewRotation);
};

/**
 * Calculate the camera's view matrix given the 
 * current eye and viewRotation
 * @return view matrix (mat4)
 */

//calculates V = R^-1 * T^-1 = R^1*T^1
Camera.prototype.calcViewMat = function () {
    var mv = mat4(1);  // identity - placeholder only
// TO DO:  COMPLETE THIS CODE

    var eyeTranslate = translate(-this.eye[0], -this.eye[1], -this.eye[2]);

    //console.log('hi');
    //printm(this.viewRotation);
    var tempRot = this.viewRotation;

    //setting the new 
    var mv = mult(tempRot, eyeTranslate);

    return mv;
};

/** 
 * Calculate the camera's projection matrix. Here we 
 * use a perspective projection.
 * @return the projection matrix
 */
Camera.prototype.calcProjectionMat = function () {
    aspect = canvas.width / canvas.height;
    return perspective(this.fov, aspect, this.zNear, this.zFar);
};

/**
 * Update the camera's eye and viewRotation matrices 
 * based on the user's mouse actions
 * @return none
 */
Camera.prototype.motion = function () {

    switch (mouseState.action) {
        case mouseState.actionChoice.TUMBLE:  // left mouse button
            // amount of rotation around axes 
            var dy = -0.05 * mouseState.delx;  // angle around y due to mouse drag along x
            var dx = -0.05 * mouseState.dely;  // angle around x due to mouse drag along y

            var ry = rotateY(10 * dy);  // rotation matrix around y
            var rx = rotateX(10 * dx);  // rotation matrix around x

//          TO DO: NEED TO IMPLEMENT TUMBLE FUNCTION
            this.tumble(rx, ry);   //  <----  NEED TO IMPLEMENT THIS FUNCTION BELOW!!!
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        case mouseState.actionChoice.TRACK:  // PAN   - right mouse button
            var dx = -0.05 * mouseState.delx; // amount to pan along x
            var dy = 0.05 * mouseState.dely;  // amount to pan along y
            //this.eye = add(this.eye, this.viewRotation[3]);

            //this.eye = mult(translate(dx, dy, 0), this.eye);

            this.eye = add(this.eye, scale(dx, this.viewRotation[0]));
            this.eye = add(this.eye, scale(dy, this.viewRotation[0]));
            //  Calculate this.eye 
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        case mouseState.actionChoice.DOLLY:   // middle mouse button
            var dx = 0.05 * mouseState.delx;  // amount to move backward/forward
            var dy = 0.05 * mouseState.dely;
            //this.eye = mult(translate(0, 0, -dx), this.eye);
            //

            this.eye = add(this.eye, scale(dx, this.viewRotation[2]));

            //  Calculate this.eye 
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        default:
            console.log("unknown action: " + mouseState.action);
    }
    render();


    function scale(s, u)
    {
        if (!Array.isArray(u)) {
            throw "scale: second parameter " + u + " is not a vector";
        }

        var result = [];
        for (var i = 0; i < u.length; ++i) {
            result.push(s * u[i]);
        }

        return result;
    }
    ;
};

/**
 * Rotate about the world coordinate system about y (left/right mouse drag) and/or 
 * about a line parallel to the camera's x-axis and going through the WCS origin 
 * (up/down mouse drag).
 * @param {mat4} rx  rotation matrix around x
 * @param {mat4} ry  rotation matrix around y
 * @return none
 */
Camera.prototype.tumble = function (rx, ry) {
    // TO DO:  IMPLEMENT THIS FUNCTION
    // We want to rotate about the world coordinate system along a direction parallel to the
    // camera's x axis. We first determine the coordinates of the WCS origin expressed in the eye coordinates.
    // We then translate this point to the camera (origin in camera coordinates) and do a rotation about x.
    // We then translate back. The result is then composed with the view matrix to give a new view matrix.
    //  When done, should have new value for eye and viewRotation

    // DO THIS CONTROL LAST - IT IS THE MOST DIFFICULT PART
    var view = this.calcViewMat();  // current view matrix
    //console.log('the ViewMat = ');
    //printm(view);
    tumblePoint = vec4(0, 0, 0, 1);
    nTumblePoint = negate(tumblePoint);
    tumblePointPrime = mult(view, tumblePoint);
    nTumblePointPrime = negate(tumblePointPrime);

    //console.log('tumblePoint = ' + tumblePoint);
    //console.log('nTumblePoint = ' + nTumblePoint);
    //console.log('tumblePointPrime = ' + tumblePointPrime);
    //console.log('ntumblePointPrime = ' + nTumblePointPrime);



    //T(P)
    //var TP = transpose(mat4(f, s, t, tumblePoint));
    var TP = translate(tumblePoint[0], tumblePoint[1], tumblePoint[2]);
    //transpose(TP);
    //console.log('TP = ' + TP);
    //printm(TP);

    //T(-P)
    //var TNP = transpose(mat4(f, s, t, nTumblePoint));
    var TNP = translate(nTumblePoint[0], nTumblePoint[1], nTumblePoint[2]);
    //transpose(TNP);
    //console.log('TNP = ' + TNP);
    //printm(TNP);

    //T(P')
    //var TPP = transpose(mat4(f, s, t, tumblePointPrime));
    var TPP = translate(tumblePointPrime[0], tumblePointPrime[1], tumblePointPrime[2]);
    //transpose(TPP);
    //console.log('TPP = ' + TPP);
    //printm(TPP);

    //T(-P')
    //var TNPP = transpose(mat4(f, s, t, nTumblePointPrime));
    var TNPP = translate(nTumblePointPrime[0], nTumblePointPrime[1], nTumblePointPrime[2]);
    //transpose(TNPP);
    //console.log('TNPP = ' + TNPP);
    //printm(TNPP);


    var A = mult(mult(TP, ry), TNP);


    //console.log('A = ');
    //printm(A);

    var B = mult(mult(TPP, rx), TNPP);
    //console.log('B = ');
    //printm(B);


    var viewNew = mult(mult(B, view), A);





    //console.log('this is the viewNew');
    //printm(viewNew);
    this.viewRotation = mat4Copy(viewNew);
    //console.log('this is the copy of viewNew');
    //printm(this.viewRotation);
    this.viewRotation [0][3] = 0;
    this.viewRotation [1][3] = 0;
    this.viewRotation [2][3] = 0;
    this.viewRotation [3][3] = 1;
    //console.log('this is the viewRot');
    //printm(this.viewRotation);
//
//
//
    var Teye = mult(transpose(this.viewRotation), viewNew);
    //console.log('this is the Teye');
    //printm(Teye);
    this.eye = vec4(-Teye[0][3], -Teye[1][3], -Teye[2][3], 1);
    //console.log('Teye (0,3) = ' + -Teye[0][3]);
    //console.log('Teye (0,3) = ' + -Teye[0][3]);
    //console.log('Teye (0,3) = ' + -Teye[0][3]);
    //console.log('New eye = ' + this.eye);


    // need to get eye position back
    //  Here, rotInverse is the inverse of the rotational part of the view matrix.
    //  eye = -rotInverse*view*origin  -> this gives the location of the WCS origin in the eye coordinates


};

Camera.prototype.keyAction = function (key) {
    var alpha = 1.0;  // used to control the amount of a turn during the flythrough 
    switch (key) {     // different keys should be used because these do thing sin browser
        case 'W':  // turn right - this is implemented
            console.log("turn right");
            this.viewRotation = mult(rotateY(alpha), this.viewRotation);
            break;
        case 'E':   // turn left
            console.log("turn left");
            this.viewRotation = mult(rotateY(-alpha), this.viewRotation);
            break;
        case 'S':  // turn up   
            console.log(" turn up");
            this.viewRotation = mult(rotateX(alpha), this.viewRotation);
            break;
        case 'D':  // turn down
            console.log("turn down");
            this.viewRotation = mult(rotateX(-alpha), this.viewRotation);
            break;
        case 'X':  // bank right
            console.log("bank right");
            this.viewRotation = mult(rotateZ(alpha), this.viewRotation);
            break;
        case 'C':  // bank left
            console.log("bank left");
            this.viewRotation = mult(rotateZ(-alpha), this.viewRotation);
            break;
        case 'Q':  // move forward
            console.log("move forward");
            var thing = scale(alpha, this.viewRotation[2]);
            this.eye = add(this.eye, thing);
            break;
        case 'A':  //  move backward
            console.log("move backward");
            var thing = scale(-alpha, this.viewRotation[2]);
            this.eye = add(this.eye, thing);
            break;
        case 'R':  //  reset
            console.log("reset");
            this.reset();
            break;
        case 'L':
            lightAngleY = lightAngleY + 10;
            break;
        case 'K':
            console.log("Moving the Light Dogg");
            lightAngleX = lightAngleX + 10;
            break;
        case 'J':
            console.log("Moving the Light Dogg");
            lightAngleX = lightAngleX+10;
            lightAngleY = lightAngleY+5;
            break;

    }


    function scale(s, u)
    {
        if (!Array.isArray(u)) {
            throw "scale: second parameter " + u + " is not a vector";
        }

        var result = [];
        for (var i = 0; i < u.length; ++i) {
            result.push(s * u[i]);
        }

        return result;
    }
    ;



};
