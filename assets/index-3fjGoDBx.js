import{n as p,u as b,r as t,j as s,G as a,M as _,C as y,a as j,b as w,c as C,d as M,A as E}from"./index-CGEdwFb9.js";const A=o=>(e,i)=>{const{mode:n}=i;switch(n){case"reset":return{...e,mode:"solution",solution:"",guess:"",guesses:[],valid:!1,error:""};case"add-letter":{if(e.mode==="solution"){const r=(e.solution+i.letter).substring(0,o);return{...e,solution:r,valid:r.length===o,error:""}}else if(e.mode==="guess"){const r=(e.guess+i.letter).substring(0,o);return{...e,guess:r,valid:r.length===o,error:""}}return e}case"commit":return e.valid?e.mode==="solution"?{...e,mode:"guess"}:e.mode==="guess"?{...e,guesses:[...e.guesses.filter(r=>r!==e.guess),e.guess],guess:"",valid:!1}:e:{...e,error:"Ikke nok bokstaver"};case"remove-letter":{if(e.mode==="solution"){const r=e.solution.substring(0,Math.max(0,e.solution.length-1));return{...e,solution:r,valid:r.length===o,error:""}}else if(e.mode==="guess"){const r=e.guess.substring(0,Math.max(0,e.guess.length-1));return{...e,guess:r,valid:r.length===o,error:""}}return e}case"remove-guess":return{...e,guesses:e.guesses.filter(r=>r!==i.guess)};case"reset-guess":return{...e,guess:""};default:return p(n,e)}},B="_info_1twco_1",L="_container_1twco_10",R="_grid_1twco_16",G="_words_1twco_22",c={info:B,container:L,grid:R,words:G},I=()=>s.jsx(s.Fragment,{}),P=()=>{const[o]=b(),e=o.length,[i,n]=t.useReducer(A(e),{mode:"solution",solution:"",guess:"",guesses:[],valid:!1,error:""}),{solution:r,guesses:g,guess:h,error:f,mode:m,valid:d}=i;t.useEffect(()=>{const l=u=>{if(u.ctrlKey||u.metaKey)return;if(u.code==="Enter"){n({mode:"commit"});return}if(u.code==="Backspace"){n({mode:"remove-letter"});return}const v=u.key.toLocaleLowerCase();E[v]&&n({mode:"add-letter",letter:v})};return window.addEventListener("keydown",l),()=>{window.removeEventListener("keydown",l)}},[]);const x=t.useCallback(l=>()=>{n({mode:"remove-guess",guess:l})},[]),k=t.useMemo(()=>g.map((l,u)=>s.jsx(a,{guess:l,onClick:x(l),Icon:_},`${l}-${u}`)),[g,x]);return s.jsx(y.Provider,{value:{word:r,gameNumber:-1},children:s.jsxs("div",{className:c.container,children:[s.jsxs("div",{className:c.grid,children:[s.jsxs("div",{className:c.info,children:[s.jsx("h1",{children:"Ordle puslespillbygger"}),s.jsxs("ol",{children:[s.jsx("li",{children:"Skriv et ord som er løsningen"}),s.jsx("li",{children:"Skriv ord som er gjetninger"}),s.jsx("li",{children:"Vis mulige løsninger på den høyre siden"})]})]}),f&&s.jsx("span",{style:{textAlign:"center"},children:f}),k,s.jsx(a,{length:e,guess:h,Icon:m==="guess"?d?j:w:I,onClick:()=>{d&&h.length===e?n({mode:"commit"}):n({mode:"reset-guess"})}}),s.jsx(a,{length:e,guess:r,Icon:m==="solution"?d?j:w:C,onClick:()=>{n(m==="solution"&&d?{mode:"commit"}:{mode:"reset"})}})]}),s.jsx(K,{guesses:g})]})})},K=({guesses:o})=>{const{remainders:e,formattedCount:i}=M(o),n=t.useMemo(()=>e.length>3e3?s.jsx("div",{style:{textAlign:"center"},children:s.jsx("em",{children:"(masse ord)"})}):s.jsx("ul",{children:e.sort().map(r=>s.jsx("li",{children:r},r))}),[e]);return s.jsxs("div",{className:c.words,children:[s.jsxs("h2",{children:[i," mulige"]}),n]})};export{P as default};
