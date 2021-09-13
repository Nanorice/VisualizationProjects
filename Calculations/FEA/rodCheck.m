clear 
kmax=24; 
imax=kmax+1; 
icons = input('consistent or diagonal? enter (1 or 0) ... '); 
xmec=[2 1; 1 2]; 
xmed=[3 0; 0 3]; 
if icons == 1, 
    label = ['consistent mass']; 
    xme = xmec; 
else
    label = ['diagonal mass'];
    xme = xmed; 
end
xke=[1 -1; -1 1]; 
loclam=eig(xke,xme); 
disp([loclam sqrt(6*real(loclam))]); 
xm=zeros(imax); xk=zeros(imax); 
for k=1:kmax ic(1) = k; 
    ic(2) = k + 1; 
    xm(ic,ic) = xm(ic,ic) + xme; 
    xk(ic,ic) = xk(ic,ic) + xke; 
end
[ve ei] = eig(xk,xm); 
omstar=sqrt(6*(diag(ei))); 
omstar=real(omstar); 
[omstarsort,ii]=sort(omstar); 
omstarsort(1)=0; 
for i=2:kmax+1 
    ckstar(i)=omstarsort(i)*kmax/((i-1)*pi); 
end; 
ckstar(1)=1;

figure(1) 
subplot(3,1,1); 
tt = ['angular frequencies - ' label]; 
plot(omstarsort','o'); 
title(tt) 
subplot(3,1,2); 
plot(ckstar','o'); 
ylabel('phase velocities') 
subplot(3,1,3); 
plot(omstarsort,ckstar); 
xlabel('velocity vs. frequency') 
str_icons = int2str(icons); 
file_name = ['disp2w1' str_icons]; 
% print('-deps', file_name); 
print('-dmeta', file_name);

figure(2) 
for i=1:imax 
    subplot(5,5,i) 
    plot(ve(:,ii(i))); 
    axis('off') 
    title(int2str(i)); 
end
text(-3,-1,label); 
str_icons = int2str(icons); 
% file_name = ['disp2w2' str_icons]; 
print('-deps', file_name); 
print('-dmeta', file_name);