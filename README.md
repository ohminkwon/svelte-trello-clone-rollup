# Svelte Trello clone 버전
Svelte.js를 사용하는 Trello 클론 프로젝트입니다.  
[DEMO]()
## 기본 template 생성
```bash
npx degit sveltejs/template '프로젝트 이름'
```

## 기본 패키지
- svelte: SvelteJS 핵심 패키지(3.xx.x 버전을 사용)
- @rollup/plugin-commonjs: CommonJS 모듈을 ES6로 변환(15버전을 사용)  
- @rollup/plugin-node-resolve: node-modules 에서 써드파티 모듈을 사용하기 위해 필요(9버전을 사용)

```bash
npm i -D svelte@^3 @rollup/plugin-commonjs@^15 @rollup/plugin-node-resolve@^9
```
- rollup: 프로젝트를 번들링하는 핵심 패키지
- rollup-plugin-livereload: 실시간 Reload 서버를 사용
- rollup-plugin-svelte: Svelte 싱글 파일 컴포넌트(SFC)를 컴파일
- rollup-plugin-terser: 컴파일 결과를 압축해 더 작은 번들 결과 생성
- sirv-cli: SPA 서버를 실행

## 추가 패키지  

### SCSS 관련  
- svelte-preprocess: PostCSS(Autoprefixer), SCSS, TypeScript 등을 지원하는 Svelte 전 처리기
- node-sass: SCSS를 CSS로 컴파일

설치이후, rollup.config.js 에서 다음과 같이 추가
```js
import sveltePreprocess from 'svelte-preprocess';
//...
plugins: [
		svelte({
			preprocess: sveltePreprocess(), //해당 위치에 추가
			compilerOptions: {} //...
```

설정 완료후, 확장툴의 svelte for VS Code의 extension setting에서

Svelte > Language-server:Runtime 항목에 다음과 같이 node 경로를 추가해준다.
![예시-00](./public/images/example/example-00.png)

node 경로는 맥의 경우 which node // 윈도우의 경우 where node 를 통해 확인할 수 있다.

### 추가 패키지
- autoprefixer: CSS에 자동으로 공급 업체 접두사(Vendor prefix)를 적용합니다.(9버전을 사용하면 내부에서 postcss를 설치합니다, 10버전 이상은 postcss를 별도 설치해야 합니다)  

```bash
npm i -D autoprefixer@^9
```
  
```scss
{
	display: -ms-flexbox;
  display: -webkit-flex;
  display: -moz-box;
}	
```
  
위와 같은 브라우저별 대응을 자동으로 처리해준다.

autoprefixer 설치 이후, 아래와 같이 rollup.config.js 에 추가

```js
plugins: [
		svelte({
			preprocess: sveltePreprocess({
				postcss: {
					plugins:[
						require('autoprefixer')()
					]
				}
			}),
```
pakage.json 에 브라우저 대응을 위한 아래 내용 추가  

```json
"browserslist":[
    "> 1%",
    "last 2 versions"
  ],
	"devDependencies": { //...}
```
  
- @rollup/plugin-alias: 경로 별칭을 사용해 더 편리하게 모듈을 적용

```
npm i -D @rollup/plugin-alias
```
설치후, rollup.config.js에 다음과 같이 추가
```js
import path from 'path';
import alias from '@rollup/plugin-alias';
//...이하 생략
	plugins:[
		//...
		commonjs(),
			//경로 추가
			alias({
				entries: [
					{
						find: '~',
						replacement: path.resolve(__dirname, 'src/')
					}
				]
			}),
	]
```