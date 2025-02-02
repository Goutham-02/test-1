import One from './components/One.jsx'

function App() {

  return (
    <>
      <One topic={"Experiment 3"} text={
        `
clear all;
clc;
N = 10^5; 
MOD_TYPE = 'PAM'; 
M = 4; 
d = ceil(M.*rand(1,N)); 
u = modulate(MOD_TYPE,M,d);
figure; stem(real(u)); 
title('PAM modulated symbols u(k)');
xlim([0 20])
ylim([-5 5])

L=4;
v=[u;zeros(L-1,length(u))];

v=v(:).';e
figure;stem(real(v)); title('Oversampled symbols v(n)');
xlim([0 150])
ylim([-5 5])

beta = 0.3;
Nsym=8;
L=4;
[p,t,filtDelay] = srrcFunction(beta,L,Nsym);
s=conv(v,p,'full');
figure; plot(real(s),'r'); title('Pulse shaped symbols s(n)');
xlim([0 150])
ylim([-5 5])

EbN0dB = 1000; 
snr = 10*log10(log2(M))+EbN0dB;

r = add_awgn_noise(s,snr,L); 

figure; plot(real(r),'r');title('Received signal r(n)');
xlim([0 150])
ylim([-5 5])

vCap=conv(r,p,'full');
figure; plot(real(vCap),'r');
title('After matched filtering $\hat{v}$(n)','Interpreter','Latex');
xlim([0 150])
ylim([-20 20])

uCap = vCap(2*filtDelay+1:L:end-(2*filtDelay))/L;

figure; stem(real(uCap)); hold on;
title('After symbol rate sampler $\hat{u}$(n)',...
'Interpreter','Latex');
dCap = demodulate(MOD_TYPE,M,uCap); 
xlim([0 20])
ylim([-5 5])

figure; 
plotEyeDiagram(vCap,L,3*L,2*filtDelay,100);
xlim([0 3])
ylim([-15 15])
`
      } />

      <One topic={"7A - FSEL"} text={
        `
clc;clear all;close all;
fs = 1e6;                   % Sample rate (1 MHz)
numSamples = 10000;          % Number of samples
numPaths = 5;                % Number of multipath components
maxDelay = 3e-6;             % Maximum delay spread (3 microseconds)
dopplerShift = 100;          % Maximum Doppler shift (100 Hz)
% Generate an impulse signal (delta function)
impulseSignal = [1; zeros(numSamples-1, 1)];  % An impulse signal
% Create a frequency-selective Rayleigh fading channel
rayleighChan = comm.RayleighChannel( ...
    'SampleRate', fs, ...
    'PathDelays', linspace(0, maxDelay, numPaths), ...  % Multipath delays
    'AveragePathGains', [-2 -3 -6 -8 -10], ...          % Path gains (dB)
    'MaximumDopplerShift', dopplerShift, ...            % Doppler shift
    'NormalizePathGains', true);
% Pass the impulse signal through the frequency-selective fading channel
rxImpulseSignal = rayleighChan(impulseSignal);
% Plot the impulse response
timeAxis = (0:numSamples-1)/fs;  % Time axis for plotting
figure;
stem(timeAxis(1:100), 20*log10(abs(rxImpulseSignal(1:100))));  % Plot first 100 samples in dB
title('Impulse Response of Frequency-Selective Rayleigh Fading Channel');
xlabel('Time (s)');ylabel('Gain (dB)');grid on;
% Frequency Response
NFFT = 1024;  % FFT size for frequency response
freqResponse = fft(rxImpulseSignal, NFFT);  % FFT of the received impulse signal
freqAxis = linspace(-fs/2, fs/2, NFFT);  % Frequency axis
% Plot the frequency response
figure;
plot(freqAxis/1e6, 20*log10(abs(fftshift(freqResponse))));  % Shift zero frequency to center
title('Frequency Response of Frequency-Selective Rayleigh Fading Channel');
xlabel('Frequency (MHz)');ylabel('Magnitude (dB)');grid on;
`
      } />

      <One topic={"7B - Non Selective"} text={
        `
clc;clear all;close all
fs = 1e6;                   % Sample rate (1 MHz)
numSamples = 10000;         % Number of samples
maxDopplerShift = 100;      % Maximum Doppler shift (100 Hz)


% Generate random data signal (complex baseband)
txSignal = (randn(numSamples, 1) + 1j*randn(numSamples, 1));  % Complex Gaussian signal
% Create flat Rayleigh fading channel
rayleighChan = comm.RayleighChannel( ...
    'SampleRate', fs, ...
    'MaximumDopplerShift', maxDopplerShift, ... % Doppler shift
    'NormalizePathGains', true);                % Normalize path gains
% Pass the signal through the flat Rayleigh fading channel
rxSignal = rayleighChan(txSignal);
% Plot the transmitted and received signals (first 100 samples)
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
% Compute and plot the power spectral density (PSD) of the transmitted and received signals
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
clear all;

Fs = 1000;
fc = 100;
fp = 4;
bit_t = 0.1;

m = [0 0 1 1 1 1 0 0];
for bit = 1:length(m)
if(m(bit)==0)
m(bit) = -1;
end
end
message = repmat(m,fp,1);
message = reshape(message,1,[]);

pn_code = randi([0,1],1,length(m)*fp);
for bit = 1:length(pn_code)
if(pn_code(bit)==0)
pn_code(bit) = -1;
end
end
DSSS = message.*pn_code;

t = 0:1/Fs:(bit_t-1/Fs);
s0 = -1*cos(2*pi*fc*t);
s1 = cos(2*pi*fc*t);
carrier = [];
BPSK = [];
for i = 1:length(DSSS)
if (DSSS(i) == 1)
BPSK = [BPSK s1];
elseif (DSSS(i) == -1)
BPSK = [BPSK s0];
end
carrier = [carrier s1];

end
rx =[];
for i = 1:length(pn_code)
if(pn_code(i)==1)
rx = [rx BPSK((((i-1)*length(t))+1):i*length(t))];
else
rx = [rx (-1)*BPSK((((i-1)*length(t))+1):i*length(t))];
end
end
demod = rx.*carrier;
result = [];
for i = 1:length(m)
x = length(t)*fp;
cx = sum(carrier(((i-1)*x)+1:i*x).*demod(((i-1)*x)+1:i*x));
if(cx>0)
result = [result 1];
else
result = [result -1];
end
end
pn_codeWrong = randi([0,1],1,length(m)*fp);
resultWrong = [];
rx2 =[];
for i = 1:length(pn_code)
if(pn_codeWrong(i)==1)
rx2 = [rx2 BPSK((((i-1)*length(t))+1):i*length(t))];
else
rx2 = [rx2 (-1)*BPSK((((i-1)*length(t))+1):i*length(t))];
end
end
demod2 = rx2.*carrier;
for i = 1:length(m)
x = length(t)*fp;
cx = sum(carrier(((i-1)*x)+1:i*x).*demod2(((i-1)*x)+1:i*x));
if(cx>0)
resultWrong = [resultWrong 1];
else
resultWrong = [resultWrong -1];

end
end
message1 = repmat(result,fp,1);
message1 = reshape(message1,1,[]);
message2 = repmat(resultWrong,fp,1);
message2 = reshape(message2,1,[]);

pn_size = length(pn_code);
tpn = linspace(0,length(m)*bit_t-bit_t/fp,pn_size);
tm = 0:bit_t/fp:length(m)*bit_t-bit_t/fp;
figure
subplot(311)
stairs(tm,message,'linewidth',2)
title('Message bit sequence')
axis([0 length(m)*bit_t -1 1]);
subplot(312)
stairs(tpn,pn_code,'linewidth',2)
title('Pseudo-random code');
axis([0 length(m)*bit_t -1 1]);
subplot(313)
stairs(tpn,DSSS,'linewidth',2)
title('Modulated signal');
axis([0 length(m)*bit_t -1 1]);
figure
subplot(311)
stairs(tm,message,'linewidth',2)
title('Message bit sequence')
axis([0 length(m)*bit_t -1 1]);
subplot(312)
stairs(tm,message1,'linewidth',2)
title('Received message using true pseudo-random code')
axis([0 length(m)*bit_t -1 1]);
subplot(313)
stairs(tm,message2,'linewidth',2)
title('Received message using wrong pseudo-random code')
axis([0 length(m)*bit_t -1 1]);

f = linspace(-Fs/2,Fs/2,1024);
figure
subplot(311)
plot(f,abs(fftshift(fft(message,1024))),'linewidth',2);

title('Message spectrum')
subplot(312)
plot(f,abs(fftshift(fft(pn_code,1024))),'linewidth',2);
title('Pseudo-random code spectrum');
subplot(313)
plot(f,abs(fftshift(fft(DSSS,1024))),'linewidth',2);
title('Modulated signal spectrum');
figure;
subplot(311)
plot(f,abs(fftshift(fft(BPSK,1024))),'linewidth',2);
title('Transmitted signal spectrum');
subplot(312)
plot(f,abs(fftshift(fft(rx,1024))),'linewidth',2);
title('Received signal multiplied by pseudo code');
subplot(313)
plot(f,abs(fftshift(fft(demod,1024))),'linewidth',2);
title('Demodulated signal spectrum before decision device ');
        `
      } />

      <One topic={"FHSS"} text={
        `
CS2 FHSS

clc; clear all;
num_bits = 20;               
samples_per_bit = 120;            
num_carriers = 6;                  
samples = [10, 20, 30, 40, 60, 120];


disp('Enter your bit sequence as a series of 1s and 0s separated by spaces (e.g., "1 0 1 1 0"):');
manual_input = input('', 's'); g
bit_sequence = str2num(manual_input); 

if length(bit_sequence) ~= num_bits
    error('The number of bits entered must match the defined number of bits (%d).', num_bits);
end

sequence = 2 * bit_sequence - 1;

input_signal = repelem(sequence, samples_per_bit);


t_carrier = linspace(0, 2*pi*num_bits, samples_per_bit*num_bits);
carrier_signal = cos(t_carrier); 


figure(1);
subplot(4,1,1); plot(input_signal); axis([-100 2400 -1.5 1.5]);
title('\bf\it Original Bit Sequence');


bpsk_mod_signal = input_signal .* carrier_signal;
subplot(4,1,2); plot(bpsk_mod_signal); axis([-100 2400 -1.5 1.5]);
title('\bf\it BPSK Modulated Signal');


carriers = cell(1, num_carriers);
for i = 1:num_carriers
    t = linspace(0, 2*pi, samples(i) + 1); t(end) = []; % Time for each carrier
    carriers{i} = repmat(cos(t), 1, ceil(samples_per_bit / length(t)));
    carriers{i} = carriers{i}(1:samples_per_bit); % Trim to exact length
end


spread_signal = [];
for i = 1:num_bits
    carrier_idx = randi([1, num_carriers]); 
    spread_signal = [spread_signal carriers{carrier_idx}];
end
subplot(4,1,3); plot(spread_signal); axis([-100 2400 -1.5 1.5]);
title('\bf\it Spread Signal with 6 frequencies');


freq_hopped_sig = bpsk_mod_signal .* spread_signal;
subplot(4,1,4); plot(freq_hopped_sig); axis([-100 2400 -1.5 1.5]);
title('\bf\it Frequency Hopped Spread Spectrum Signal');


bpsk_demodulated = freq_hopped_sig ./ spread_signal;
figure(2);
subplot(2,1,1); plot(bpsk_demodulated); axis([-100 2400 -1.5 1.5]);
title('\bf Demodulated BPSK Signal from Wide Spread');


original_BPSK_signal = bpsk_demodulated ./ carrier_signal;
subplot(2,1,2); plot(original_BPSK_signal); axis([-100 2400 -1.5 1.5]);
title('\bf Transmitted Original Bit Sequence');
`
      } />

      <One topic={"Experiment 8"} text={
`

Conversation opened. 3 messages. 1 message unread.

Skip to content
Using RV College of Engineering, Bangalore, India. Mail with screen readers

1 of 3,267
Fwd: Exp 6 and 8 Lab codes
Inbox

SADHALE APOORV SACHIN
AttachmentsFri, Jan 10, 11:50 AM
For Lab of CS Exp 6 and 8 ---------- Forwarded message --------- From: Nethravathi K.A. <nethravathika@rvce.edu.in> Date: Fri, 10 Jan, 2025, 11:48 am Subject: E

SHREYAS ARADHYA K
AttachmentsMon, Jan 13, 11:40 AM
---------- Forwarded message --------- From: SADHALE APOORV SACHIN <sapoorvsachin.ec22@rvce.edu.in> Date: Fri, Jan 10, 2025 at 11:50 AM Subject: Fwd: Exp 6 and

SHASHANK DHARAMSHETTY
Attachments
3:44 PM (2 minutes ago)
to me



 2 Attachments
  •  Scanned by Gmail
% MATLAB Code for Carrier Phase Estimation 
% Parameters
clear all; clc;
N = 1000;          % Number of symbols
SNR_dB = 10;       % Signal-to-Noise Ratio in dB
M = 4;             % QPSK modulation order
loop_bandwidth = 0.01; % PLL loop bandwidth
true_phase = pi / 3; % True phase of the carrier

% Generate QPSK symbols
tx_symbols = exp(1j * (2 * pi * (0:M-1) / M)); % QPSK constellation points
tx_data = randi([0 M-1], N, 1);                % Random data
tx_signal = tx_symbols(tx_data + 1);           % Modulated signal

% Add noise to the transmitted signal
noise = (1/sqrt(2*10^(SNR_dB/10))) * (randn(N, 1) + 1j * randn(N, 1));
rx_signal = tx_signal .* exp(1j * true_phase) + noise; % Received signal

% 1. Maximum Likelihood Carrier Phase Estimation
estimated_phase_ml = angle(sum(conj(tx_signal) .* rx_signal)); % ML estimation
%fprintf('True Phase: %.2f rad, Estimated Phase (ML): %.2f rad\n', true_phase, estimated_phase_ml);

% 2. Phase-Locked Loop (PLL) Implementation
phase_error_pll = zeros(N, 1); % Phase error for PLL
estimated_phase_pll = zeros(N, 1); % Estimated phase for PLL
current_phase_estimate_pll = 0; % Initial phase estimate for PLL

for n = 1:N
    % Phase detection
    phase_error_pll(n) = angle(rx_signal(n) * exp(-1j * current_phase_estimate_pll)); 
    current_phase_estimate_pll = current_phase_estimate_pll + loop_bandwidth * phase_error_pll(n);
    estimated_phase_pll(n) = current_phase_estimate_pll;
end

% 3. Apply Phase Correction to Received Signal
corrected_rx_signal = rx_signal .* exp(-1j * estimated_phase_pll); % Corrected received signal

% Plot Original and Corrected Constellation Diagrams
figure;
subplot(2, 1, 1);
scatter(real(rx_signal), imag(rx_signal), 'filled');
title('Received Signal Constellation Diagram');
xlabel('In-Phase');
ylabel('Quadrature');
axis equal;
grid on;

subplot(2, 1, 2);
scatter(real(corrected_rx_signal), imag(corrected_rx_signal), 'filled');
title('Corrected Signal Constellation Diagram');
xlabel('In-Phase');
ylabel('Quadrature');
axis equal;
grid on;

% 4. Effect of Additive Noise on Phase Estimate
SNR_dB_range = 0:2:20; % SNR range for variance calculation
phase_error_variance = zeros(length(SNR_dB_range), 1);

for idx = 1:length(SNR_dB_range)
    SNR_dB = SNR_dB_range(idx);
    noise_variance = 1/(2*10^(SNR_dB/10));
    noise = sqrt(noise_variance) * (randn(N, 1) + 1j * randn(N, 1));
    
    % Received signal with noise
    rx_signal = exp(1j * true_phase) + noise; % Use a single reference for variance calculation
    
    % ML phase estimation
    estimated_phase = angle(sum(rx_signal));
    
    % Phase error variance
    phase_error_variance(idx) = var(angle(rx_signal) - true_phase);
end

% Plot the phase error variance as a function of SNR
figure;
plot(SNR_dB_range, phase_error_variance);
xlabel('SNR (dB)');
ylabel('Phase Error Variance');
title('Effect of Noise on Phase Estimation');

% 5. Decision-Directed and Non-Decision-Directed Loops
phase_error_dd = zeros(N, 1); % Decision-directed phase error
phase_error_ndd = zeros(N, 1); % Non-decision-directed phase error
estimated_phase_dd = zeros(N, 1);
estimated_phase_ndd = zeros(N, 1);

% Initialization
current_phase_estimate_dd = 0;
current_phase_estimate_ndd = 0;

for n = 1:N
    % Simulate received signal with phase offset and noise
    noise = (1/sqrt(2*10^(SNR_dB))) * (randn + 1j * randn);
    rx_signal = tx_signal(n) * exp(1j * true_phase) + noise;

    % Decision-Directed (DD) Loop
    detected_symbol = exp(1j * round(angle(rx_signal) * M / (2 * pi)) * 2 * pi / M); % Symbol detection
    phase_error_dd(n) = angle(detected_symbol * exp(-1j * current_phase_estimate_dd)); 
    current_phase_estimate_dd = current_phase_estimate_dd + loop_bandwidth * phase_error_dd(n);
    estimated_phase_dd(n) = current_phase_estimate_dd;

    % Non-Decision-Directed (NDD) Loop
    phase_error_ndd(n) = angle(rx_signal * exp(-1j * current_phase_estimate_ndd));
    current_phase_estimate_ndd = current_phase_estimate_ndd + loop_bandwidth * phase_error_ndd(n);
    estimated_phase_ndd(n) = current_phase_estimate_ndd;
end

% Plot the results for DD and NDD loops
figure;
subplot(2, 1, 1);
plot(1:N, estimated_phase_dd);
title('Decision-Directed Phase Estimate');
xlabel('Samples');
ylabel('Estimated Phase (radians)');

subplot(2, 1, 2);
plot(1:N, estimated_phase_ndd);
title('Non-Decision-Directed Phase Estimate');
xlabel('Samples');
ylabel('Estimated Phase (radians)');
Expt8_car_phase_est[1].m
Displaying Expt6[1].m.
`
      } />

      <One topic={"Experiment 6"} text={
`
L        = 4;         % Oversampling factor
rollOff  = 0.5;       % Pulse shaping roll-off factor
rcDelay  = 10;  
% Filter:
htx = rcosdesign(rollOff, 6, 4);
% Note half of the target delay is used, because when combined
% to the matched filter, the total delay will be achieved.
hrx  = conj(fliplr(htx));
p = conv(htx,hrx);
M = 2; % PAM Order

% Arbitrary binary sequence alternating between 0 and 1
data = zeros(1, 2*rcDelay);
data(1:2:end) = 1;

% PAM-modulated symbols:
txSym = real(pammod(data, M));

% Upsampling
txUpSequence = upsample(txSym, L);

% Pulse Shaping
txSequence = filter(htx, 1, txUpSequence);

%Delay in channel  random channel propagation delay in units of sampling intervals (not symbol intervals)
timeOffset = 1; % Delay (in samples) added
% Delayed sequence
rxDelayed = [zeros(1, timeOffset), txSequence(1:end-timeOffset)];

% Received sequence with Delayed
mfOutput = filter(hrx, 1, rxDelayed); % Matched filter output

rxSym = downsample(mfOutput, L);
% Generate a vector that shows the selected samples
selectedSamples = upsample(rxSym, L);
selectedSamples(selectedSamples == 0) = NaN;

% scatter plot
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

%Symbol timing recovery
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

