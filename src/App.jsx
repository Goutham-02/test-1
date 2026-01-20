import One from './components/One.jsx'

function App() {

    return (
        <div style={{ padding: "20px" }}>

            <One topic={"6. BER vs SNR (1G–5G)"} text={
                `clc; clear;
SNR = 0:2:30; M = [2 2 4 16 64]; BER = zeros(5,length(SNR));
for g = 1:5
  for i = 1:length(SNR)
    d = randi([0 M(g)-1],1e5,1);
    s = qammod(d,M(g),'UnitAveragePower',true);
    r = awgn(s,SNR(i),'measured');
    BER(g,i) = sum(qamdemod(r,M(g),'UnitAveragePower',true)~=d)/(1e5*log2(M(g)));
  end
end
semilogy(SNR,BER,'LineWidth',1.5); grid on;
xlabel('SNR(dB)'); ylabel('BER'); title('BER vs SNR (1G–5G)');
legend('1G','2G','3G','4G','5G');`
            } />

            <One topic={"7.a Constellation Plot (QAM)"} text={
                `clc; clear;
M = [4 16 64]; N = 64;
for i = 1:3
 d = randi([0 M(i)-1],N*50,1);
 s = qammod(d,M(i),'UnitAveragePower',true);
 ifft(reshape(s,N,[]));               % OFDM (no plot needed)
 figure; scatterplot(s);
 title(['Constellation - ' num2str(M(i)) '-QAM']);
end`
            } />

            <One topic={"7.b BER of OFDM with CP"} text={
                `clc; clear;
M = [4 16 64]; SNR = 0:2:30; N = 64; CP = 16; BER = zeros(3,length(SNR));
for m = 1:3
 for i = 1:length(SNR)
  d = randi([0 M(m)-1],N*200,1);
  s = qammod(d,M(m),'UnitAveragePower',true);
  x = ifft(reshape(s,N,[])); x = [x(end-CP+1:end,:); x];
  r = awgn(x(:),SNR(i),'measured');
  rM = reshape(r,N+CP,[]); y = fft(rM(CP+1:end,:));
  BER(m,i) = mean(qamdemod(y(:),M(m),'UnitAveragePower',true)~=d);
 end
end
semilogy(SNR,BER,'LineWidth',1.5); grid on;
legend('QPSK','16QAM','64QAM'); xlabel('SNR'); ylabel('BER');`
            } />

            <One topic={"7.c OFDM Time Domain (With vs Without CP)"} text={
                `clc; clear;
M = [4 16 64]; N = 64; CP = 16;
for i = 1:3
 d = randi([0 M(i)-1],N*20,1);
 s = qammod(d,M(i),'UnitAveragePower',true);
 x = ifft(reshape(s,N,[]));          % OFDM (no CP)
 xCP = [x(end-CP+1:end,:); x];       % OFDM with CP
 subplot(3,1,i);
 plot(real(x(:)),'b'); hold on;
 plot(real(xCP(:)),'r--'); grid on;
 title([num2str(M(i)) '-QAM OFDM Time Domain']);
 legend('Without CP','With CP');
end`
            } />

            <One topic={"8.a Latency vs Fronthaul (SA vs NSA)"} text={
                `clc; clear;
fh = 0:0.5:5;                     % Fronthaul latency (ms)
latSA = 0.2 + fh;                  % SA latency
latNSA = 0.2 + fh/2;               % NSA latency
plot(fh,latSA,'-o',fh,latNSA,'-s','LineWidth',1.5); grid on;
xlabel('Fronthaul Latency (ms)');
ylabel('Total Latency (ms)');
legend('SA','NSA','Location','northwest');
title('Latency vs Fronthaul Latency (5G CU–DU Split)');`
            } />

            <One topic={"8.b Throughput vs Fronthaul (SA vs NSA)"} text={
                `clc; clear;
fh = 0:0.5:5;                     % Fronthaul latency (ms)
thSA = 1*(1 - (0.2+fh)/10);       % SA throughput (Gbps)
thNSA = 1.2*(1 - (0.2+fh/2)/10);  % NSA throughput (Gbps)
plot(fh,thSA,'-o',fh,thNSA,'-s','LineWidth',1.5); grid on;
xlabel('Fronthaul Latency (ms)');
ylabel('Throughput (Gbps)');
legend('SA','NSA','Location','northeast');
title('Throughput vs Fronthaul Latency (5G CU–DU Split)');`
            } />

            <One topic={"8.c 5G Protocol Stack (SA vs NSA)"} text={
                `clc; clear;
SA_UP = {'PHY-DU','MAC-DU','RLC-CU','PDCP-CU','SDAP-CU'};
SA_CP = {'PHY-DU','MAC-DU','RLC-CU','PDCP-CU','RRC','NAS'};
NSA_UP = {'PHY-DU','MAC-DU','RLC-LTE','PDCP-LTE','SDAP-LTE'};
NSA_CP = {'PHY-DU','MAC-DU','RLC-LTE','PDCP-LTE','RRC','NAS'};
subplot(2,2,1); barh(ones(1,5)); set(gca,'yticklabel',SA_UP); title('SA User Plane');
subplot(2,2,2); barh(ones(1,6)); set(gca,'yticklabel',SA_CP); title('SA Control Plane');
subplot(2,2,3); barh(ones(1,5)); set(gca,'yticklabel',NSA_UP); title('NSA User Plane');
subplot(2,2,4); barh(ones(1,6)); set(gca,'yticklabel',NSA_CP); title('NSA Control Plane');`
            } />

            <One topic={"9. Numerology & Resource Grid"} text={
                `clc; clear;
mu = [0 1 2];                     % Change as required
N = 64; L = 14;

for i = 1:length(mu)
 grid = qammod(randi([0 3],N*L,1),4,'UnitAveragePower',true);
 grid = reshape(grid,N,L);
 tx = ifft(grid,[],1);

 figure; plot(abs(tx(:))); grid on;
 title(['Time-Domain OFDM (\\mu=' num2str(mu(i)) ')']);

 figure; imagesc(abs(grid)); axis xy; colorbar;
 title(['Resource Grid (\\mu=' num2str(mu(i)) ')']);
end`
            } />

            <One topic={"10.a Received Signal (No Beamforming)"} text={
                `clc; clear;
Ntx=4; Nsc=256; M=4; SNR=10;
pilot = exp(1j*2*pi*randi([0 M-1],1,Nsc)/M);
H = (randn(1,Ntx,Nsc)+1j*randn(1,Ntx,Nsc))/sqrt(2);
noise = (randn(1,Nsc)+1j*randn(1,Nsc))/sqrt(2)*10^(-SNR/20);

for k = 1:Nsc
 rx(k) = H(:,:,k)*pilot(k)*ones(Ntx,1) + noise(k);
end

figure; plot(real(pilot),'b'); hold on;
plot(real(noise),'k'); plot(real(rx),'r'); grid on;
legend('Tx','Noise','Rx'); title('Received Signal (No Beamforming)');`
            } />

            <One topic={"10.b EGT Beamforming"} text={
                `clc; clear;
Ntx=4; Nsc=256; M=4; SNR=10;
pilot = exp(1j*2*pi*randi([0 M-1],1,Nsc)/M);
H = (randn(1,Ntx,Nsc)+1j*randn(1,Ntx,Nsc))/sqrt(2);
noise = (randn(1,Nsc)+1j*randn(1,Nsc))/sqrt(2)*10^(-SNR/20);

for k=1:Nsc
 w = exp(1j*angle(H(:,:,k)')); w = w/norm(w);   % EGT weights
 rx(k) = H(:,:,k)*w*pilot(k) + noise(k);
end

figure; plot(real(pilot),'b'); hold on;
plot(real(noise),'k'); plot(real(rx),'m'); grid on;
legend('Tx','Noise','EGT Rx'); title('EGT Beamforming');`
            } />

            <One topic={"10.c MRT Beamforming"} text={
                `clc; clear;
Ntx=4; Nsc=256; M=4; SNR=10;
pilot = exp(1j*2*pi*randi([0 M-1],1,Nsc)/M);
H = (randn(1,Ntx,Nsc)+1j*randn(1,Ntx,Nsc))/sqrt(2);
noise = (randn(1,Nsc)+1j*randn(1,Nsc))/sqrt(2)*10^(-SNR/20);

for k=1:Nsc
 w = H(:,:,k)'; w = w/norm(w);                    % MRT weights
 rx(k) = H(:,:,k)*w*pilot(k) + noise(k);
end

figure; plot(real(pilot),'b'); hold on;
plot(real(noise),'k'); plot(real(rx),'r'); grid on;
legend('Tx','Noise','MRT Rx'); title('MRT Beamforming');`
            } />

            <One topic={"11. Uplink Resource Grid (PRACH & PUCCH)"} text={
                `clc; clear;
Nsc = 72; Nsym = 14; SC = 12;
grid = zeros(Nsc,Nsym);                 % 0=unused

grid((2-1)*SC+1:3*SC,1:4) = 1;           % PRACH
grid((1-1)*SC+1:1*SC,13:14) = 2;         % PUCCH
grid((6-1)*SC+1:6*SC,13:14) = 2;         % PUCCH

figure; imagesc(grid); axis xy; grid on;
colormap([1 1 1; 1 0 0; 0 0 1]);
xlabel('OFDM Symbols'); ylabel('Subcarriers');
title('Uplink Resource Grid: PRACH & PUCCH');`
            } />

            <h2>Part C: IoT Sensors (Arduino/Embedded)</h2>
            <hr />

            <One topic={"2.1 Temperature & Humidity (DHT11)"} text={``} />
            <One topic={"2.2 Ultrasonic Sensor"} text={``} />
            <One topic={"2.3 Soil Moisture Sensor"} text={``} />
            <One topic={"2.4 Light Sensor"} text={``} />

        </div>
    )
}

export default App