precision mediump float;
uniform sampler2D CausticsTexture;

varying mediump vec4 posVarying; // pos in world space
varying mediump vec3 normalVarying;     // normal in world spacevoid main() {



void main()
{
    // Texture coordinates for caustics
    float caustX = posVarying.x / 100.0;
    float caustZ = posVarying.z / 100.0;
    
    vec4 caust = vec4(vec3(0.0), 1.0);
    vec3 up = vec3(0.0, 1.0, 0.0);
    float upAngle = dot(up, normalVarying);
    if (upAngle > 0.0) {
        // sharp edge:
        // caust = texture2D(CausticsTexture, vec2(caustX, caustZ))
        
        // softer edge
        vec4 caustTexCol = texture2D(CausticsTexture, vec2(caustX, caustZ));
        caust = upAngle * upAngle * upAngle * caustTexCol * caustTexCol;
    }
    vec4 caustTT = texture2D(CausticsTexture, vec2(caustX, caustZ));
    
    
    gl_FragColor = clamp(vec4(1.000, 0.749, 1.000,1) + caust, 0.0, 1.0);
    gl_FragColor = clamp(vec4(caustX, caustZ, 1.0, 1.0), 0.0, 1.0);
    gl_FragColor = caustTT;
}
