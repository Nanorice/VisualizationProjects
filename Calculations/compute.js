// defines elements number
let kmax = 24;
let imax = kmax +1;
x = numeric.linspace(0,1,24)
// mass and stiffness matrix
let xmec = [[2, 1],[1, 2]];
let xke = [[1, -1][-1, 1]];
let xme = xmec;
let xm = [];
for (let i = 0; i < imax; i++) {
  xm[i] = Array(imax).fill(0);
}
let xk = xm;
xm[0][0] = 2; xm[0][1] = 1; xm[kmax][kmax] = 2; xm[kmax][kmax-1] = 1;
xk[0][0] = 1; xk[0][1] = -1; xk[kmax][kmax] = 1; xk[kmax][kmax-1] = -1;
for (let k = 1; k < kmax; k++) {
  xm[k][k] = 4;
  xm[k][k+1] = 1;
  xm[k][k-1] = 1;

  xk[k][k] = 2;
  xk[k][k+1] = -1;
  xk[k][k-1] = -1;
}
let a = nj.dot(xk,xm)
console.log(a)
