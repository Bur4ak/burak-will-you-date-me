const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContainer = document.getElementById('main-container');
const successContainer = document.getElementById('success-container');
const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const nameInput = document.getElementById('name-input');
const questionText = document.getElementById('question');
const successTitle = document.getElementById('success-title');
const backBtn = document.getElementById('back-btn');
const mainGif = document.getElementById('main-gif');

let userName = "";
let currentLang = "tr";

// Şarkıyı tanımla ve döngüye al
const proposalAudio = new Audio("A Tear in Space (Airlock) - Glass Animals.mp3");
proposalAudio.loop = true;

const translations = {
    tr: {
        startTitle: "Önce ismini yazar mısın? 🥺💕",
        namePlaceholder: "İsmini buraya yaz...",
        startBtn: "Devam Et ✨",
        questionSuffix: ", benimle çıkar mısın? 🥺👉👈",
        successTitleFull: (name) => `YAAAY! Biliyordum! 🎉❤️`,
        successText: "Artık Benimsin! ✨",
        yesBtn: "Evet! 🥰",
        noBtn: "Hayır 😒",
        backBtn: "← Geri"
    },
    en: {
        startTitle: "Could you write your name first? 🥺💕",
        namePlaceholder: "Write your name here...",
        startBtn: "Continue ✨",
        questionSuffix: ", will you go out with me? 🥺👉👈",
        successTitleFull: (name) => `YAAAY! I knew it! 🎉❤️`,
        successText: "You are mine now! ✨",
        yesBtn: "Yes! 🥰",
        noBtn: "No 😒",
        backBtn: "← Back"
    }
};

function updateLanguage(lang) {
    currentLang = lang;

    // Aktif dil butonunun stilini değiştir
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Giriş ekranı yazılarını güncelle
    document.querySelector('#start-container h1').innerHTML = translations[lang].startTitle;
    nameInput.placeholder = translations[lang].namePlaceholder;
    startBtn.innerHTML = translations[lang].startBtn;

    // Ana ekran butonlarını ve geri butonunu güncelle
    yesBtn.innerHTML = translations[lang].yesBtn;
    noBtn.innerHTML = translations[lang].noBtn;
    backBtn.innerHTML = translations[lang].backBtn;

    // Eğer isim girildiyse dinamik metinleri güncelle
    if (userName) {
        if (userName !== '67' && userName.toLowerCase() !== 'gay') {
            questionText.innerHTML = userName + translations[lang].questionSuffix;
        }
        successTitle.innerHTML = translations[lang].successTitleFull(userName);
    }

    document.querySelector('#success-container p').innerHTML = translations[lang].successText;
}

// Dil seçimi butonlarını dinle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        updateLanguage(btn.getAttribute('data-lang'));
    });
});

startBtn.addEventListener('click', () => {
    const enteredName = nameInput.value.trim();
    if (!enteredName) {
        nameInput.style.borderColor = '#ff0000';
        nameInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        setTimeout(() => {
            nameInput.style.borderColor = 'rgba(255, 0, 127, 0.3)';
            nameInput.style.boxShadow = 'none';
        }, 1000);
        return;
    }

    userName = enteredName;
    const buttonsContainer = document.querySelector('.buttons');

    if (userName === '67') {
        mainGif.src = './67.gif';
        questionText.classList.add('hidden');
        buttonsContainer.classList.add('hidden');
    } else if (userName.toLowerCase() === 'gay') {
        mainGif.src = './damn.gif';
        questionText.classList.add('hidden');
        buttonsContainer.classList.add('hidden');
    } else {
        mainGif.src = './cat.gif';
        questionText.classList.remove('hidden');
        buttonsContainer.classList.remove('hidden');

        questionText.innerHTML = userName + translations[currentLang].questionSuffix;
        successTitle.innerHTML = translations[currentLang].successTitleFull(userName);
    }

    startContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
});

nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startBtn.click();
    }
});

backBtn.addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    startContainer.classList.remove('hidden');

    noBtn.classList.remove('moving');
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.display = '';

    const buttonsContainer = document.querySelector('.buttons');
    if (noBtn.parentNode !== buttonsContainer) {
        buttonsContainer.appendChild(noBtn);
    }

    questionText.classList.remove('hidden');
    buttonsContainer.classList.remove('hidden');

    nameInput.value = "";
    nameInput.focus();
});

function moveButton() {
    if (!noBtn.classList.contains('moving')) {

        const rect = noBtn.getBoundingClientRect();
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
        noBtn.classList.add('moving');


        document.body.appendChild(noBtn);


        setTimeout(() => {
            moveToRandomPosition();
        }, 10);
    } else {
        moveToRandomPosition();
    }
}

function moveToRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;


    const padding = 50;
    const maxX = windowWidth - btnWidth - padding;
    const maxY = windowHeight - btnHeight - padding;
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));


    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}
noBtn.addEventListener('mouseover', moveButton);

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});


function burstHearts() {
    const heartCount = 40;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.zIndex = '999';
        heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        heart.innerHTML = ['❤️', '💖', '💝', '💕', '✨'][Math.floor(Math.random() * 5)];
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        heart.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        heart.style.pointerEvents = 'none';
        heart.style.textShadow = '0 0 10px #ff007f';

        document.body.appendChild(heart);


        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 250 + 100;
        const destX = centerX + Math.cos(angle) * velocity;
        const destY = centerY + Math.sin(angle) * velocity - 50;
        heart.offsetHeight;

        heart.style.transform = `translate(${destX - centerX}px, ${destY - centerY}px) scale(0)`;
        heart.style.opacity = '0';
        setTimeout(() => {
            heart.remove();
        }, 1200);
    }
}


yesBtn.addEventListener('click', () => {

    mainContainer.classList.add('hidden');

    noBtn.style.display = 'none';


    successContainer.classList.remove('hidden');


    setTimeout(() => {
        successContainer.classList.add('show');
    }, 50);

    // Müzik çalma ve 1 saniyede fade-in yapma logic
    proposalAudio.currentTime = 38; // 38. saniyeden başlat
    proposalAudio.volume = 0; // Başlangıç sesi 0
    proposalAudio.play().catch(err => {
        console.log("Audio play blocked by browser autoplay policy:", err);
    });

    // 1 saniyede fade-in
    const fadeDuration = 1000; // 1 saniye (1000ms)
    const fadeInterval = 50; // Her 50ms'de bir artır
    const volumeStep = fadeInterval / fadeDuration; // Adım başı artış miktarı

    const fadeIn = setInterval(() => {
        if (proposalAudio.volume < 1) {
            proposalAudio.volume = Math.min(1, proposalAudio.volume + volumeStep);
        } else {
            clearInterval(fadeIn);
        }
    }, fadeInterval);

    burstHearts();


    // İlk başta 3 konfeti (orta, sol, sağ) patlasın
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff007f', '#ff3399', '#ff99cc', '#ffffff']
    });


    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#ff007f', '#ff3399', '#ffffff']
        });
    }, 200);

    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#ff007f', '#ff3399', '#ffffff']
        });
    }, 350);

    // Sonrasında yanlardaki konfetiler 7 saniyede bir patlamaya devam etsin
    setInterval(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#ff007f', '#ff3399', '#ffffff']
        });

        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#ff007f', '#ff3399', '#ffffff']
            });
        }, 150); // Şık bir zincirleme efekt için hafif gecikmeyle
    }, 2000);
});


function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';


    heart.style.left = Math.random() * 100 + 'vw';


    heart.style.animationDuration = Math.random() * 3 + 4 + 's';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}


setInterval(createHeart, 400);

// Başarı ekranındaki gife tıklandığında da yan konfetileri tetikle
const successGif = document.querySelector('.success-gif');
successGif.addEventListener('click', () => {
    confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff007f', '#ff3399', '#ffffff']
    });

    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#ff007f', '#ff3399', '#ffffff']
        });
    }, 150);
});
