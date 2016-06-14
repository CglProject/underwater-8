$B_SHADER_VERSION
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D fogFbo_texture;
uniform sampler2D depthmap_texture;

uniform float passedTime;

varying vec4 texCoordVarying;

void main()
{
	
		
	/* DISTORTION part */
	
	vec2 waveCoords = texCoordVarying.st;
	
    float heigtStrechX = 5.0;
    float widthStrechX = 0.01;
    float heigtStrechY = 3.0;
    float widthStrechY = 0.005;
    float speed = 1.0;
	float PI = 3.14159265359;
	
    waveCoords.x = waveCoords.x + ( sin(texCoordVarying.y * heigtStrechX + passedTime * speed) * widthStrechX );
	waveCoords.y = waveCoords.y + ( sin(texCoordVarying.x * heigtStrechY + passedTime * speed) * widthStrechY );
	
	
	/* FOG part */
	
	vec4 colorScene = texture2D(fogFbo_texture, waveCoords.st);
	vec4 colorDepthMap = texture2D(depthmap_texture, waveCoords.st);
	
	//vec4 fogColor = vec4(0.255, 0.412, 0.882, 1.0); // royalblue
    vec4 fogColor = vec4(0.118, 0.565, 1.0, 1.0);
	
	float FogFragCoord = colorDepthMap.x;
    
	// x FogFragCoord = 1.0 - clamp(90.0 * (0.500 - FogFragCoord), 0.0, 1.0);
	// const float LOG2 = 1.442695;
	// float fogDensity = 1.8;
	// // float fogFactor = exp2( -fogDensity * fogDensity * FogFragCoord  * FogFragCoord  * LOG2 );
	// float fogFactor = exp2( -fogDensity * FogFragCoord * LOG2 );
	// // float fogFactor = (1 - FogFragCoord) / (1 - 0.3);
	// fogFactor = clamp(fogFactor, 0.0, 1.0);
    
    float fogMixingFactor = 1.0 - clamp(90.0 * (0.500 - FogFragCoord), 0.0, 1.0);
	
    gl_FragColor = mix(colorScene, fogColor, fogMixingFactor);
}
