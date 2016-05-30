precision mediump float;
uniform mat4 ModelViewMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

attribute vec4 Position;
attribute vec4 Normal;
attribute vec4 TexCoord;

uniform mediump mat4 ModelMatrix;
uniform mediump mat3 NormalMatrix;
varying mediump vec4 posVarying; // pos in world space
varying mediump vec3 normalVarying;     // normal in world spacevoid main() {

void main()
{
    posVarying = ModelMatrix * Position;
    normalVarying = normalize(NormalMatrix * vec3(Normal));
    // normalVarying = Normal;
    
	vec4 pos = ModelViewMatrix * Position;  // vertex position in eye coordinates
    gl_Position = ProjectionMatrix * pos;
}
