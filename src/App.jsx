import One from './components/One.jsx'

function App() {

  return (
    <>
      <One topic={"Experiment 3"} text={
        `
clc; clear; close all;
N = 1e5; M = 4; L = 4; beta = 1; Nsym = 8; EbN0dB = 100;
snr = 10*log10(log2(M)) + EbN0dB;
d = randi([0 M-1], 1, N);
u = pammod(d, M);
s = filter(rcosdesign(beta, Nsym, L), 1, upsample(u, L));
r = awgn(s, snr, 'measured');
vCap = filter(rcosdesign(beta, Nsym, L), 1, r);
filtDelay = Nsym * L / 2;
dCap = vCap(2*filtDelay+1:L:end-(2*filtDelay))/L;
upsampled_u = upsample(u, L);
figure;
subplot(3,2,1); stem(u(1:20)); title('PAM Modulated Symbols');
subplot(3,2,2); stem(upsampled_u(1:150)); title('Oversampled Symbols');
subplot(3,2,3); plot(s(1:150), 'r'); title('Pulse Shaped Symbols');
subplot(3,2,4); plot(r(1:150), 'r'); title('Received Signal');
subplot(3,2,5); plot(vCap(1:150), 'r'); title('Matched Filter Output');
subplot(3,2,6); stem(dCap(1:20)); title('Symbol Rate Sampled Output');
figure;
plotEyeDiagram(vCap, L, 3*L,2*filtDelay,100)
`
      } />

      <One topic={"7A - FSEL"} text={
`
clc;clear all;close all;
fs = 1e6;
numSamples = 10000;         
numPaths = 5;             
maxDelay = 3e-6;             
dopplerShift = 100;         
% Generate an impulse signal (delta function)
impulseSignal = [1; zeros(numSamples-1, 1)];  
% Create a frequency-selective Rayleigh fading channel
rayleighChan = comm.RayleighChannel( ...
    'SampleRate', fs, ...
    'PathDelays', linspace(0, maxDelay, numPaths), ...  
    'AveragePathGains', [-2 -3 -6 -8 -10], ...          
    'MaximumDopplerShift', dopplerShift, ...            
    'NormalizePathGains', true);
% Pass the impulse signal through the frequency-selective fading channel
rxImpulseSignal = rayleighChan(impulseSignal);
% Plot the impulse response
timeAxis = (0:numSamples-1)/fs;  
figure;
stem(timeAxis(1:100), 20*log10(abs(rxImpulseSignal(1:100))));  
title('Impulse Response of Frequency-Selective Rayleigh Fading Channel');
xlabel('Time (s)');ylabel('Gain (dB)');grid on;
% Frequency Response
NFFT = 1024;  % FFT size for frequency response
freqResponse = fft(rxImpulseSignal, NFFT);  
freqAxis = linspace(-fs/2, fs/2, NFFT);  
figure;
plot(freqAxis/1e6, 20*log10(abs(fftshift(freqResponse))));  
title('Frequency Response of Frequency-Selective Rayleigh Fading Channel');
xlabel('Frequency (MHz)');ylabel('Magnitude (dB)');grid on;
`
      } />

      <One topic={"7B - Non Selective"} text={
`
clc;clear all;close all
fs = 1e6;                   
numSamples = 10000;         
maxDopplerShift = 100;      
txSignal = (randn(numSamples, 1) + 1j*randn(numSamples, 1)); 
rayleighChan = comm.RayleighChannel( ...
    'SampleRate', fs, ...
    'MaximumDopplerShift', maxDopplerShift, ... 
    'NormalizePathGains', true);            

rxSignal = rayleighChan(txSignal);

figure;subplot(2, 1, 1);
plot(real(txSignal(1:100)), 'b-o');hold on;
plot(imag(txSignal(1:100)), 'r-x');
title('Transmitted Signal (First 100 Samples)');
xlabel('Sample Index');ylabel('Amplitude');
legend('Real Part', 'Imaginary Part');grid on;
subplot(2, 1, 2);
plot(real(rxSignal(1:100)), 'b-o');hold on;
plot(imag(rxSignal(1:100)), 'r-x');
title('Received Signal through Flat Rayleigh Fading Channel (First 100 Samples)');
xlabel('Sample Index');ylabel('Amplitude');
legend('Real Part', 'Imaginary Part');grid on;

figure;
pwelch(txSignal, [], [], [], fs, 'centered');hold on;
pwelch(rxSignal, [], [], [], fs, 'centered');
title('Power Spectral Density (PSD) of Transmitted and Received Signals');
xlabel('Frequency (Hz)');ylabel('Power/Frequency (dB/Hz)');
legend('Transmitted Signal', 'Received Signal');grid on;
`
      } />

      <One topic={"DSSS"} text={
        `
clc;close all;clear all;
Fs = 1000; fc = 100; fp = 4; bit_t = 0.1;
m = [0 0 1 1 1 1 0 0]*2-1;
message = reshape(repmat(m, fp, 1), 1, []);

pn_code = randi([0,1], 1, length(message))*2-1;
DSSS = message .* pn_code;

t = 0:1/Fs:(bit_t-1/Fs);
carrier = cos(2*pi*fc*t);
BPSK = reshape(kron(DSSS, carrier), 1, []);

rx = BPSK .* reshape(kron(pn_code, ones(1, length(t))), 1, []);
demod = rx .* reshape(repmat(carrier, 1, length(DSSS)), 1, []);

pn_size = length(pn_code); tpn = linspace(0, length(m)*bit_t-bit_t/fp, pn_size);
tm = 0:bit_t/fp:length(m)*bit_t-bit_t/fp;

figure;
subplot(3,1,1); stairs(tm, message, 'linewidth', 2); title('Message');
subplot(3,1,2); stairs(tpn, pn_code, 'linewidth', 2); title('PN Code');
subplot(3,1,3); stairs(tpn, DSSS, 'linewidth', 2); title('DSSS Signal');

f = linspace(-Fs/2, Fs/2, 1024);
figure;
subplot(3,1,1); plot(f, abs(fftshift(fft(message, 1024))),'linewidth',2); title('Message Spectrum');
subplot(3,1,2); plot(f, abs(fftshift(fft(pn_code, 1024))),'linewidth',2); title('PN Code Spectrum');
subplot(3,1,3); plot(f, abs(fftshift(fft(DSSS, 1024))),'linewidth',2); title('DSSS Spectrum');

figure;
subplot(3,1,1); plot(f, abs(fftshift(fft(BPSK, 1024))),'linewidth',2); title('Transmitted Signal');
subplot(3,1,2); plot(f, abs(fftshift(fft(rx, 1024))),'linewidth',2); title('Received Signal');
subplot(3,1,3); plot(f, abs(fftshift(fft(demod, 1024))),'linewidth',2); title('Demodulated Signal');
`
      } />

      <One topic={"FHSS"} text={
        `
clc; close all;clear all;

num_bits = 20; samples_per_bit = 120; num_carriers = 6; samples = [10, 20, 30, 40, 60, 120];
disp('Enter your bit sequence:');
bit_sequence = str2num(input('', 's'));
if length(bit_sequence) ~= num_bits, error('Bit length mismatch!'); end

input_signal = repelem(2*bit_sequence - 1, samples_per_bit);

carrier_signal = cos(linspace(0, 2*pi*num_bits, samples_per_bit*num_bits));
bpsk_mod_signal = input_signal .* carrier_signal;

carriers = cell(1, num_carriers);
for i = 1:num_carriers
    t = linspace(0, 2*pi, samples(i) + 1); t(end) = [];
    carriers{i} = repmat(cos(t), 1, ceil(samples_per_bit / length(t)));
    carriers{i} = carriers{i}(1:samples_per_bit);
end

spread_signal = [];
for i = 1:num_bits
    carrier_idx = randi([1, num_carriers]);
    spread_signal = [spread_signal carriers{carrier_idx}];
end

freq_hopped_sig = bpsk_mod_signal .* spread_signal;
bpsk_demodulated = freq_hopped_sig ./ spread_signal;
original_BPSK_signal = bpsk_demodulated ./ carrier_signal;

figure(1);
subplot(4,1,1); plot(input_signal); title('Original Bit Sequence');
subplot(4,1,2); plot(bpsk_mod_signal); title('BPSK Modulated Signal');
subplot(4,1,3); plot(spread_signal); title('Spread Signal with 6 Frequencies');
subplot(4,1,4); plot(freq_hopped_sig); title('Frequency Hopped Spread Signal');
figure(2);
subplot(2,1,1); plot(bpsk_demodulated); title('Demodulated BPSK Signal');
subplot(2,1,2); plot(original_BPSK_signal); title('Transmitted Original Bit Sequence');
`
      } />

      <One topic={"Experiment 8 A"} text={
`
clear all; clc;
N = 1000; SNR_dB = 10; M = 4; loop_bandwidth = 0.01; true_phase = pi/3;
tx_symbols = exp(1j * (2 * pi * (0:M-1) / M));
tx_data = randi([0 M-1], N, 1);
tx_signal = tx_symbols(tx_data + 1);
noise = (1/sqrt(2*10^(SNR_dB/10))) * (randn(N, 1) + 1j * randn(N, 1));
rx_signal = tx_signal .* exp(1j * true_phase) + noise;

figure; 
subplot(2, 1, 1); scatter(real(rx_signal), imag(rx_signal), 'filled'); 
title('Received Signal Constellation Diagram'); xlabel('In-Phase'); ylabel('Quadrature'); axis equal;

phase_error_dd = zeros(N, 1);
estimated_phase_dd = zeros(N, 1);
current_phase_estimate_dd = 0;
for n = 1:N
    detected_symbol = exp(1j * round(angle(rx_signal(n)) * M / (2 * pi)) * 2 * pi / M);
    phase_error_dd(n) = angle(detected_symbol * exp(-1j * current_phase_estimate_dd));
    current_phase_estimate_dd = current_phase_estimate_dd + loop_bandwidth * phase_error_dd(n);
    estimated_phase_dd(n) = current_phase_estimate_dd;
end

corrected_rx_signal = rx_signal .* exp(-1j * estimated_phase_dd);

subplot(2, 1, 2); scatter(real(corrected_rx_signal), imag(corrected_rx_signal), 'filled'); 
title('Corrected Signal Constellation Diagram'); xlabel('In-Phase'); ylabel('Quadrature'); axis equal;

figure;
plot(1:N, estimated_phase_dd); 
title('Decision-Directed Phase Estimate'); xlabel('Samples'); ylabel('Estimated Phase (radians)');
`
      } />

<One topic={"Experiment 8 B"} text={
`
clear all; clc;

N = 1000;
SNR_dB = 10;
M = 4;
loop_bandwidth = 0.01;
true_phase = pi/3;

tx_symbols = exp(1j * (2 * pi * (0:M-1) / M));
tx_data = randi([0 M-1], N, 1);
tx_signal = tx_symbols(tx_data + 1);

noise = (1/sqrt(2*10^(SNR_dB/10))) * (randn(N, 1) + 1j * randn(N, 1));
rx_signal = tx_signal .* exp(1j * true_phase) + noise;

phase_error_ndd = zeros(N, 1);
estimated_phase_ndd = zeros(N, 1);
current_phase_estimate_ndd = 0;

for n = 1:N
    phase_error_ndd(n) = angle(rx_signal(n) * exp(-1j * current_phase_estimate_ndd));
    current_phase_estimate_ndd = current_phase_estimate_ndd + loop_bandwidth * phase_error_ndd(n);
    estimated_phase_ndd(n) = current_phase_estimate_ndd;
end

figure;
scatter(real(tx_signal), imag(tx_signal), 'filled');
title('Transmitted Signal Constellation');
xlabel('In-Phase');
ylabel('Quadrature');
axis equal;

figure;
scatter(real(rx_signal), imag(rx_signal), 'filled');
title('Received Signal Constellation');
xlabel('In-Phase');
ylabel('Quadrature');
axis equal;

figure;
plot(1:N, estimated_phase_ndd);
title('Non-Decision-Directed Phase Estimate');
xlabel('Samples');
ylabel('Estimated Phase (radians)');
`
      } />

      <One topic={"Experiment 6"} text={
`
L        = 4;         
rollOff  = 0.5;      
rcDelay  = 10;  

htx = rcosdesign(rollOff, 6, 4);

hrx  = conj(fliplr(htx));
p = conv(htx,hrx);
M = 2;
data = zeros(1, 2*rcDelay);
data(1:2:end) = 1;


txSym = real(pammod(data, M));


txUpSequence = upsample(txSym, L);


txSequence = filter(htx, 1, txUpSequence);


timeOffset = 1; 
rxDelayed = [zeros(1, timeOffset), txSequence(1:end-timeOffset)];


mfOutput = filter(hrx, 1, rxDelayed);

rxSym = downsample(mfOutput, L);

selectedSamples = upsample(rxSym, L);
selectedSamples(selectedSamples == 0) = NaN;


figure
plot(complex(rxSym(rcDelay+1:end)), 'o')
grid on
xlim([-1.5 1.5])
title('Rx Scatterplot')
xlabel('In-phase (I)')
ylabel('Quadrature (Q)')

figure
stem(rxSym)
title('Symbol Sequence with delay')
xlabel('Symbol Index')
ylabel('Amplitude')


rxSym = downsample(mfOutput, L, timeOffset);

selectedSamples = upsample(rxSym, L);
selectedSamples(selectedSamples == 0) = NaN;

figure
plot(complex(rxSym(rcDelay+1:end)), 'o')
grid on
xlim([-1.5 1.5])
title('Rx Scatterplot')
xlabel('In-phase (I)')
ylabel('Quadrature (Q)')

figure
stem(rxSym)
title('Symbol Sequence without delay')
xlabel('Symbol Index')
ylabel('Amplitude')
`
      } />

    </>
  )
}

export default App

