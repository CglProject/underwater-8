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
	
    float heigtStrech = 5.0;
    float widthStrech = 0.01;
    float speed = 1.0;
	float PI = 3.14159265359;
	
    waveCoords.x = waveCoords.x + ( sin(texCoordVarying.y * heigtStrech + passedTime * speed) * widthStrech );
	waveCoords.y = waveCoords.y + ( sin(texCoordVarying.x * heigtStrech + passedTime * speed) * widthStrech );
	
	
	/* FOG part */
	
	vec4 colorScene = texture2D(fogFbo_texture, waveCoords.st);
	vec4 colorDepthMap = texture2D(depthmap_texture, waveCoords.st);
	
	
	const float LOG2 = 1.442695;
	//vec4 fogColor = vec4(0.255, 0.412, 0.882, 1.0); // royalblue
    vec4 fogColor = vec4(0.118, 0.565, 1.0, 1.0);
	//float FogFragCoord = length(colorDepthMap);
	
	float FogFragCoord = colorDepthMap.x;
	
	float f = 100.0;
	float n = 0.1;
	
	//FogFragCoord = (2 * n) / (f + n - FogFragCoord * (f-n));
	
	FogFragCoord = 1.0 - clamp(90.0 * (0.500 - FogFragCoord), 0.0, 1.0);
	
	float fogDensity = 1.8;
	//float fogFactor = exp2( -fogDensity * fogDensity * FogFragCoord  * FogFragCoord  * LOG2 );
	float fogFactor = exp2( -fogDensity * FogFragCoord * LOG2 );
	//float fogFactor = (1 - FogFragCoord) / (1 - 0.3);
	fogFactor = clamp(fogFactor, 0.0, 1.0);
	
	
    gl_FragColor = mix(colorScene, fogColor, FogFragCoord);
    
    
    // Experiments (TODO: remove):
    
	//gl_FragColor = vec4(FogFragCoord, FogFragCoord, FogFragCoord, 1.0f);
	//gl_FragColor = texture2D(depthmap_texture, texCoordVarying.st);
	//gl_FragColor = colorScene;
    /*
    float C = 1.0;
    float depth_value = colorDepthMap.x;
    float far = 1.0;
    float zz = (exp(depth_value*log(C*far+1.0)) - 1.0)/C;
    // float intervalValue = (exp(depth_value*log(C*far+1.0)) - 1.0)/C;
    //float intervalValue = 1.0 / (10.0 * depth_value);
    // float intervalValue = 100000.0 * log(depth_value);
    // float intervalValue = zz / 0.6;
    float intervalValue = log(2.0 + depth_value) * 0.3;
    if (intervalValue < 0.1) {
        gl_FragColor = vec4(0.1, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.2) {
        gl_FragColor = vec4(0.2, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.3) {
        gl_FragColor = vec4(0.3, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.4) {
        gl_FragColor = vec4(0.4, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.5) {
        gl_FragColor = vec4(0.5, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.6) {
        gl_FragColor = vec4(0.6, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.7) {
        gl_FragColor = vec4(0.7, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.8) {
        gl_FragColor = vec4(0.8, 0.0, 0.0, 1.0);
    } else if (intervalValue < 0.9) {
        gl_FragColor = vec4(0.9, 0.0, 0.0, 1.0);
    }  else {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }*/
    
}
