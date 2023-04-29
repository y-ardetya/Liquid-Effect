uniform float uProgress;
uniform vec2 uZoomScale;

varying vec2 vUv;

void main() {
    vec3 newPos = position;
    float angle = uProgress * 3.14159265 / 2.;
    float wave = cos(angle);
    float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
    newPos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
    newPos.y *= mix(1., uZoomScale.y + wave * c, uProgress);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
    vUv = uv;
}