
let timeout; 
let sapaanDiterima = false;
let warung = false;



function returnToLogo() { 
  const chatInput = document.getElementById('chatInput');
  const chatLogo = document.getElementById('logoContainer');
  const links = document.querySelectorAll('.link');


  chatInput.classList.add('hidden');
  chatLogo.style.display = 'flex'; 
}

document.getElementById('chatLogo').addEventListener('click', function () {
  const chatInput = document.getElementById('chatInput');
  const chatLogo = document.getElementById('logoContainer');

  chatInput.classList.remove('hidden');
  chatLogo.style.display = 'none'; 
  resetTimeout();
});

document.getElementById('chatInput').addEventListener('click', function () {
  const chatBox = document.getElementById('chatBox');
  chatBox.classList.add('active');
  
  resetTimeout();
});

function resetTimeout() {
  clearTimeout(timeout); 
  timeout = setTimeout(returnToLogo, 60000); // Set timer 1 menit (60000 ms)
}

document.addEventListener('click', function (event) {
  const chatBox = document.getElementById('chatBox');
  const chatInput = document.getElementById('chatInput');

  if (!chatBox.contains(event.target) && !chatInput.contains(event.target)) {
    chatBox.classList.remove('active');
  }
  
  resetTimeout();
});

document.getElementById('userInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
    resetTimeout(); 
  }
});

function sendMessage() {
  const chatBox = document.getElementById('chatBox');
  const userInput = document.getElementById('userInput').value;

  if (userInput.trim() !== '') {
    const userMessage = `<div class="message user-message"><div class="bubble">${userInput}</div></div>`;
    chatBox.innerHTML += userMessage;

    document.getElementById('userInput').value = '';

    chatBox.scrollTop = chatBox.scrollHeight;

    const typingIndicator = `<div id="typingIndicator" class="message bot-message"><div class="bubble bot-bubble"><div class="typing-indicator"><span class="typing-dots"></span><span class="typing-dots"></span><span class="typing-dots"></span></div></div></div>`;
    chatBox.innerHTML += typingIndicator;
    chatBox.scrollTop = chatBox.scrollHeight;

    
    setTimeout(() => {
      const typingElement = document.getElementById('typingIndicator');
      typingElement.remove();

      const botResponse = getBotResponse(userInput);
      const botMessage = `<div class="message bot-message"><div class="bubble bot-bubble">${botResponse}</div></div>`;
      chatBox.innerHTML += botMessage;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1500);
  }
}



links.forEach(link => {
  link.addEventListener('click', function (event) {
      event.preventDefault(); // Mencegah default action dari link
      
      // Ambil id dari href
      const targetId = this.getAttribute('href').substring(1);
      
      // Dapatkan elemen yang memiliki id tersebut
      const targetElement = document.getElementById(targetId);
      
      // Scroll ke elemen tersebut
      if (targetElement) {
          targetElement.scrollIntoView({
              behavior: 'smooth', // Tambahkan efek smooth saat scroll
              block: 'start'
          });
      }
  });
});

function getBotResponse(input) {
      const pesan = input.toLowerCase();

      if (pesan.includes("halo") || pesan.includes("hai") || pesan.includes("selamat pagi") || 
          pesan.includes("selamat siang") || pesan.includes("selamat malam") || pesan.includes("selamat sore") || 
          pesan.includes("hi") || pesan.includes("halo")) {

          const waktu = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          sapaanDiterima = true;  

          return `Hallo ada yang bisa saya bantu? Waktu menunjukan pukul ${waktu}.<br>
          Selamat datang di situs kami, Saya adalah asisten yang dapat membantu anda dalam menemukan yang anda perlukan seputar jamu.<br>
          Apakah perlu saya kasih menu produk yang ada di website kami? `;

      
      } else if (sapaanDiterima && (
        pesan.includes("ya") || 
        pesan.includes("iya") || 
        pesan.includes("boleh") || 
        pesan.includes("oke") || 
        pesan.includes("silakan") || 
        pesan.includes("mau") || 
        pesan.includes("ingin") || 
        pesan.includes("pengen")
        || 
        pesan.includes("tentu")
      )) {
        return `Baik! Kami memiliki beberapa produk yang tersedia seperti:<br>
1. Cengkeh: Rp25.000 <br>
2. Beras Kencur: Rp20.000 <br>
3. Galian Singset: Rp28.000 <br>
4. Jahe: Rp22.000 <br>
5. Pahitan: Rp23.000 <br>
6. Daun Pepaya: Rp22.000 <br>
7. Kunci Sirih: Rp25.000 <br>
8. Brotowali: Rp24.000 <br>
9. Kunyit Asam: Rp22.000 <br>
<br>

 Jika ingin memesan produk silakan klik <a href="produk/produk1.html" class="link">Disini</a> <br>`
        

;



        
      }else if (sapaanDiterima && pesan.includes("1")) {
        return `Rasakan manfaat cengkeh asli dalam setiap teguk. Bantu redakan batuk, hangatkan tubuh, dan jaga daya tahanmu dengan Jamu Cengkeh herbal alami.`;
      } else if (sapaanDiterima && pesan.includes("2")) {
        return `Segarkan badan dan kembalikan energi dengan Jamu Beras Kencur! Cocok untuk meningkatkan stamina, menghilangkan pegal, dan menambah nafsu makan.`;
      } else if (sapaanDiterima && pesan.includes("3")) {
        return `Rahasia tubuh singset dan segar alami! Jamu Galian Singset membantu melangsingkan tubuh, menjaga kebugaran, dan merawat kecantikan dari dalam.`;
      } else if (sapaanDiterima && pesan.includes("4")) {
        return `Hangatkan tubuh dan kuatkan imun dengan Jamu Jahe murni! Nikmati kehangatan alami untuk kesehatan harianmu.`;
      } else if (sapaanDiterima && pesan.includes("5")) {
        return `Detoks alami tubuhmu dengan Jamu Pahitan! Bantu bersihkan darah kotor, lawan jerawat dari dalam, dan jaga gula darah tetap stabil.`;
      } else if (sapaanDiterima && pesan.includes("6")) {
        return `Bangkitkan nafsu makan dan segarkan tubuh dengan Jamu Daun Pepaya! Pahitnya alami, manfaatnya luar biasa untuk pencernaan dan energi.`;
      } else if (sapaanDiterima && pesan.includes("7")) {
        return `Jaga kebersihan dan kesegaran dari dalam dengan Jamu Kunci Sirih! Solusi alami untuk kesehatan organ kewanitaan dan mengurangi bau badan.`;
      } else if (sapaanDiterima && pesan.includes("8")) {
        return `Sehatkan tubuh dengan pahit yang bermanfaat! Jamu Brotowali membantu menurunkan gula darah, segarkan badan, dan bersihkan darah dari dalam.`;
      } else if (sapaanDiterima && pesan.includes("9")) {
        return `Segar, sehat, dan penuh manfaat! Jamu Kunyit Asam bantu melancarkan haid, cerahkan kulit, dan lawan radikal bebas dengan rasa yang nikmat.`;
      
        

          //[pesan lain]

      } else if (pesan.includes("beras kencur") || pesan.includes("jamu beras kencur") || pesan.includes("bahan beras kencur") || pesan.includes("harga beras kencur") || pesan.includes("manfaat beras kencur")) {
        return `**Beras Kencur**<br>
      - Manfaat: Menambah energi dan stamina, meredakan pegal linu dan sakit badan, meningkatkan nafsu makan, memberikan efek segar dan rileks, menjaga daya tahan tubuh.<br>
      - Harga: Rp20.000 (250 ml), Rp35.000 (500 ml), Paket 3 botol 500 ml: Rp100.000.<br>`;
        
      } else if (pesan.includes("kunyit asam") || pesan.includes("jamu kunyit asam") || pesan.includes("bahan kunyit asam") || pesan.includes("harga kunyit asam") || pesan.includes("manfaat kunyit asam")) {
        return `**Kunyit Asam**<br>
      - Manfaat: Melancarkan haid dan mengurangi nyeri, menyegarkan tubuh, menjaga kesehatan kulit, menurunkan berat badan, menangkal radikal bebas.<br>
      - Harga: Rp22.000 (250 ml), Rp40.000 (500 ml), Paket 3 botol 500 ml: Rp115.000.<br>`;
      
      } else if (pesan.includes("pahitan") || pesan.includes("jamu pahitan") || pesan.includes("bahan pahitan") || pesan.includes("harga pahitan") || pesan.includes("manfaat pahitan")) {
        return `**Pahitan**<br>
      - Manfaat: Mengatasi jerawat, menurunkan kadar gula darah, membersihkan darah kotor, mengurangi bau badan dan mulut, menjaga pencernaan.<br>
      - Harga: Rp23.000 (250 ml), Rp42.000 (500 ml), Paket 3 botol 500 ml: Rp120.000.<br>`;
      
      } else if (pesan.includes("galian singset") || pesan.includes("jamu galian singset") || pesan.includes("bahan galian singset") || pesan.includes("harga galian singset") || pesan.includes("manfaat galian singset")) {
        return `**Galian Singset**<br>
      - Manfaat: Mengencangkan tubuh setelah melahirkan, melangsingkan badan, menjaga organ kewanitaan, melancarkan metabolisme, menambah rasa percaya diri.<br>
      - Harga: Rp28.000 (250 ml), Rp50.000 (500 ml), Paket 3 botol 500 ml: Rp140.000.<br>`;
      
      } else if (pesan.includes("jahe") || pesan.includes("jamu jahe") || pesan.includes("bahan jahe") || pesan.includes("harga jahe") || pesan.includes("manfaat jahe")) {
        return `**Jahe**<br>
      - Manfaat: Menghangatkan tubuh, meredakan masuk angin dan mual, meningkatkan daya tahan tubuh, melancarkan peredaran darah, mengurangi pegal dan capek.<br>
      - Harga: Rp22.000 (250 ml), Rp40.000 (500 ml), Paket 3 botol 500 ml: Rp115.000.<br>`;
      
      } else if (pesan.includes("cengkeh") || pesan.includes("jamu cengkeh") || pesan.includes("bahan cengkeh") || pesan.includes("harga cengkeh") || pesan.includes("manfaat cengkeh")) {
        return `**Cengkeh**<br>
      - Manfaat: Meredakan sakit gigi, menghangatkan tubuh, mengatasi masuk angin, meningkatkan daya tahan tubuh, menyegarkan napas.<br>
      - Harga: Rp25.000 (250 ml), Rp45.000 (500 ml), Paket 3 botol 500 ml: Rp125.000.<br>`;
      
      } else if (pesan.includes("daun pepaya") || pesan.includes("jamu daun pepaya") || pesan.includes("bahan daun pepaya") || pesan.includes("harga daun pepaya") || pesan.includes("manfaat daun pepaya")) {
        return `**Daun Pepaya**<br>
      - Manfaat: Meningkatkan nafsu makan, menurunkan gula darah, melancarkan pencernaan, menambah energi, membantu detoks alami.<br>
      - Harga: Rp22.000 (250 ml), Rp40.000 (500 ml), Paket 3 botol 500 ml: Rp115.000.<br>`;
      
      } else if (pesan.includes("kunci sirih") || pesan.includes("jamu kunci sirih") || pesan.includes("bahan kunci sirih") || pesan.includes("harga kunci sirih") || pesan.includes("manfaat kunci sirih")) {
        return `**Kunci Sirih**<br>
      - Manfaat: Menjaga organ kewanitaan, mengurangi bau badan dan keputihan, mengencangkan otot tubuh, menjaga keseimbangan flora tubuh, meningkatkan rasa percaya diri.<br>
      - Harga: Rp25.000 (250 ml), Rp45.000 (500 ml), Paket 3 botol 500 ml: Rp130.000.<br>`;
      
      } else if (pesan.includes("brotowali") || pesan.includes("jamu brotowali") || pesan.includes("bahan brotowali") || pesan.includes("harga brotowali") || pesan.includes("manfaat brotowali")) {
        return `**Brotowali**<br>
      - Manfaat: Menurunkan gula darah, menyegarkan badan, mengatasi gatal-gatal dan masalah kulit, meredakan demam, membersihkan darah kotor.<br>
      - Harga: Rp24.000 (250 ml), Rp43.000 (500 ml), Paket 3 botol 500 ml: Rp123.000.<br>`;
      }
      

      


      // penjelasan lain
      else if (pesan.includes("apa itu cengkeh") || pesan.includes("pengertian cengkeh") || pesan.includes("definisi cengkeh") || pesan.includes("cengkeh itu apa") || pesan.includes("apa manfaat cengkeh")) {
  return "Jamu Cengkeh adalah jamu tradisional yang menggunakan cengkeh sebagai bahan utama, dikenal untuk menghangatkan tubuh, meredakan masuk angin, dan mengatasi gangguan pencernaan.";
} else if (pesan.includes("darimana cengkeh") || pesan.includes("asalnya cengkeh") || pesan.includes("cengkeh dari mana") || pesan.includes("cengkeh asalnya dari mana")) {
  return "Jamu Cengkeh berasal dari Indonesia, memanfaatkan rempah cengkeh yang telah lama digunakan dalam pengobatan tradisional.";
}

else if (pesan.includes("apa itu beras kencur") || pesan.includes("pengertian beras kencur") || pesan.includes("definisi beras kencur") || pesan.includes("beras kencur itu apa") || pesan.includes("apa kegunaan beras kencur")) {
  return "Beras Kencur adalah jamu tradisional Indonesia yang memiliki rasa manis dan segar dengan aroma khas kencur. Jamu ini sering dikonsumsi untuk meningkatkan stamina dan meredakan batuk.";
} else if (pesan.includes("darimana beras kencur") || pesan.includes("asalnya beras kencur") || pesan.includes("beras kencur dari mana") || pesan.includes("beras kencur asalnya dari mana")) {
  return "Beras Kencur berasal dari Indonesia dan telah dikenal sejak lama sebagai jamu yang berkhasiat untuk kesehatan, terutama dalam meningkatkan daya tahan tubuh.";
}

else if (pesan.includes("apa itu galian singset") || pesan.includes("pengertian galian singset") || pesan.includes("definisi galian singset") || pesan.includes("galian singset itu apa") || pesan.includes("apa manfaat galian singset")) {
  return "Galian Singset adalah jamu tradisional yang sering dikonsumsi untuk membantu menjaga berat badan, memperindah bentuk tubuh, serta melancarkan metabolisme dan pencernaan.";
} else if (pesan.includes("darimana galian singset") || pesan.includes("asalnya galian singset") || pesan.includes("galian singset dari mana") || pesan.includes("galian singset asalnya dari mana")) {
  return "Galian Singset berasal dari pengobatan tradisional Jawa yang banyak digunakan oleh wanita untuk menjaga kebugaran dan kecantikan tubuh secara alami.";
}

else if (pesan.includes("apa itu jahe") || pesan.includes("pengertian jahe") || pesan.includes("definisi jahe") || pesan.includes("jahe itu apa") || pesan.includes("apa manfaat jahe")) {
  return "Jamu Jahe adalah minuman herbal yang terbuat dari jahe, dikenal untuk menghangatkan tubuh, meredakan mual, dan memperbaiki sirkulasi darah.";
} else if (pesan.includes("darimana jahe") || pesan.includes("asalnya jahe") || pesan.includes("jahe dari mana") || pesan.includes("jahe asalnya dari mana")) {
  return "Jahe digunakan secara luas di seluruh Indonesia sebagai bahan utama dalam berbagai jamu tradisional karena manfaat kesehatannya.";
}

else if (pesan.includes("apa itu pahitan") || pesan.includes("pengertian pahitan") || pesan.includes("definisi pahitan") || pesan.includes("pahitan itu apa") || pesan.includes("apa manfaat pahitan")) {
  return "Pahitan adalah jamu dengan rasa pahit yang terbuat dari bahan herbal seperti brotowali dan sambiloto, berkhasiat untuk kesehatan tubuh dan mengatasi masalah kulit.";
} else if (pesan.includes("darimana pahitan") || pesan.includes("asalnya pahitan") || pesan.includes("pahitan dari mana") || pesan.includes("pahitan asalnya dari mana")) {
  return "Jamu Pahitan berasal dari pengobatan tradisional Jawa dan telah lama digunakan untuk membersihkan darah dan meningkatkan kesehatan tubuh.";
}

else if (pesan.includes("apa itu daun pepaya") || pesan.includes("pengertian daun pepaya") || pesan.includes("definisi daun pepaya") || pesan.includes("daun pepaya itu apa") || pesan.includes("apa manfaat daun pepaya")) {
  return "Jamu Daun Pepaya adalah jamu yang menggunakan daun pepaya sebagai bahan utama, dipercaya membantu melancarkan pencernaan dan menurunkan demam.";
} else if (pesan.includes("darimana daun pepaya") || pesan.includes("asalnya daun pepaya") || pesan.includes("daun pepaya dari mana") || pesan.includes("daun pepaya asalnya dari mana")) {
  return "Jamu Daun Pepaya berasal dari berbagai daerah di Indonesia dan digunakan dalam pengobatan tradisional untuk manfaat pencernaan dan kesehatan umum.";
}

else if (pesan.includes("apa itu kunci sirih") || pesan.includes("pengertian kunci sirih") || pesan.includes("definisi kunci sirih") || pesan.includes("kunci sirih itu apa") || pesan.includes("apa manfaat kunci sirih")) {
  return "Jamu Kunci Sirih merupakan jamu tradisional yang sering dikonsumsi wanita, terbuat dari kunci (temu kunci) dan daun sirih untuk menjaga kesehatan organ intim dan bau badan.";
} else if (pesan.includes("darimana kunci sirih") || pesan.includes("asalnya kunci sirih") || pesan.includes("kunci sirih dari mana") || pesan.includes("kunci sirih asalnya dari mana")) {
  return "Kunci Sirih berasal dari tradisi jamu Jawa yang digunakan oleh perempuan untuk menjaga kebersihan dan kesehatan tubuh secara alami.";
}

else if (pesan.includes("apa itu brotowali") || pesan.includes("pengertian brotowali") || pesan.includes("definisi brotowali") || pesan.includes("brotowali itu apa") || pesan.includes("apa manfaat brotowali")) {
  return "Jamu Brotowali adalah jamu pahit yang dikenal untuk menurunkan kadar gula darah, meningkatkan daya tahan tubuh, dan membantu detoksifikasi.";
} else if (pesan.includes("darimana brotowali") || pesan.includes("asalnya brotowali") || pesan.includes("brotowali dari mana") || pesan.includes("brotowali asalnya dari mana")) {
  return "Brotowali berasal dari tanaman merambat yang tumbuh di wilayah tropis Indonesia dan telah digunakan dalam pengobatan tradisional sejak lama.";
}

else if (pesan.includes("apa itu kunyit asam") || pesan.includes("pengertian kunyit asam") || pesan.includes("definisi kunyit asam") || pesan.includes("kunyit asam itu apa") || pesan.includes("apa manfaat kunyit asam")) {
  return "Kunyit Asam adalah jamu tradisional yang dibuat dari kunyit dan asam jawa, memiliki rasa asam menyegarkan dan sering digunakan untuk membantu melancarkan haid serta meningkatkan daya tahan tubuh.";
} else if (pesan.includes("darimana kunyit asam") || pesan.includes("asalnya kunyit asam") || pesan.includes("kunyit asam dari mana") || pesan.includes("kunyit asam asalnya dari mana")) {
  return "Kunyit Asam berasal dari budaya pengobatan tradisional di Indonesia dan telah digunakan selama berabad-abad untuk manfaat kesehatan.";
}


else if (
  pesan.includes("masuk angin") ||
  pesan.includes("flu") ||
  pesan.includes("meriang") ||
  pesan.includes("batuk") ||
  pesan.includes("pilek") ||
  pesan.includes("demam")
) {
  return "Untuk keluhan seperti masuk angin atau flu, kamu bisa coba Jamu Cengkeh atau Jamu Jahe. Keduanya bisa menghangatkan tubuh dan membantu meredakan gejala.";
} else if (
  pesan.includes("stamina") ||
  pesan.includes("tenaga") ||
  pesan.includes("lelah") ||
  pesan.includes("capek") ||
  pesan.includes("lesu")
) {
  return "Kalau kamu merasa lelah atau kurang stamina, Jamu Beras Kencur dan Jamu Jahe bisa membantu memulihkan tenaga dan menyegarkan tubuh.";
} else if (
  pesan.includes("haid") ||
  pesan.includes("menstruasi") ||
  pesan.includes("nyeri haid") ||
  pesan.includes("datang bulan")
) {
  return "Untuk keluhan seputar haid, kamu bisa coba Jamu Kunyit Asam atau Jamu Kunci Sirih. Keduanya dikenal membantu melancarkan dan meredakan nyeri haid.";
} else if (
  pesan.includes("bau badan") ||
  pesan.includes("kewanitaan") ||
  pesan.includes("organ intim") ||
  pesan.includes("keputihan")
) {
  return "Untuk menjaga kesehatan kewanitaan dan mengurangi bau badan, Jamu Kunci Sirih sangat cocok untuk dikonsumsi secara rutin.";
} else if (
  pesan.includes("berat badan") ||
  pesan.includes("pelangsing") ||
  pesan.includes("kurus") ||
  pesan.includes("langsing")
) {
  return "Kalau kamu ingin menjaga bentuk tubuh atau menurunkan berat badan, Jamu Galian Singset bisa jadi pilihan karena membantu melancarkan metabolisme.";
} else if (
  pesan.includes("asam urat") ||
  pesan.includes("nyeri sendi") ||
  pesan.includes("rematik") ||
  pesan.includes("sakit tulang")
) {
  return "Untuk keluhan nyeri sendi atau rematik, Jamu Brotowali bisa membantu meredakan peradangan dan meningkatkan daya tahan tubuh.";
} else if (
  pesan.includes("kulit") ||
  pesan.includes("jerawat") ||
  pesan.includes("bisul") ||
  pesan.includes("darah kotor")
) {
  return "Untuk membantu membersihkan darah dan merawat kulit, kamu bisa konsumsi Jamu Pahitan atau Brotowali.";
} else if (
  pesan.includes("pencernaan") ||
  pesan.includes("lambung") ||
  pesan.includes("perut kembung") ||
  pesan.includes("maag")
) {
  return "Kalau kamu mengalami masalah pencernaan, Jamu Daun Pepaya dan Jamu Kunyit Asam bisa membantu meredakan gejala tersebut.";
} else if (
  pesan.includes("detoks") ||
  pesan.includes("racun") ||
  pesan.includes("membersihkan tubuh") ||
  pesan.includes("toksin")
) {
  return "Untuk membantu detoksifikasi dan membersihkan tubuh dari racun, kamu bisa konsumsi Jamu Pahitan atau Brotowali.";
}
 
    


  }
