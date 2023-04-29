uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uImageResolution;

varying vec2 vUv;

//!
//? u = uv
//? s = screen size
//? i = image size

vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
    float rs = s.x / s.y; //* Aspect Plane Size
    float ri = i.x / i.y; //* Aspect Image Size
    vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); //* new st
    vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; //* offset
    return u * s / st + o;
}

void main () {
    vec2 uv = CoverUV(vUv, uResolution, uImageResolution);
    vec3 texture = texture2D(uTexture, uv).rgb;
    gl_FragColor = vec4(texture, 1.0);
}