//data.js
const videoCategories = [
  {
    name: "Digital Films / TVCs / Theatre Ads",
    videos: [
      { title: "Malabar Gold & Diamonds | Diwali Video | Editor & Colorist", thumbnail: "./images/Digital/MGD_DIWALI.jpg", url: "https://youtu.be/kCU21Csqlck" },
      { title: "Ather | Meet the Owners - Deepak George | Editor", thumbnail: "./images/Digital/ATHER MEET THE OWNERS.jpg", url: "https://youtu.be/xk1RrvFFRHU" },
      { title: "Licious | Stock The Fridge Up | Ranga | Editor", thumbnail: "./images/Digital/LICIOUS RANGA.jpg", url: "https://www.youtube.com/watch?v=2Zoe050D8mA" },
      { title: "Licious | Stock The Fridge Up | Pushpa | Editor", thumbnail: "./images/Digital/LICIOUS PUSHPA.jpg", url: "https://www.youtube.com/watch?v=aIINH-jV5wk" },
      { title: "Ather | Meet the Juggernaut | Editor & Colorist", thumbnail: "./images/Digital/ATHER JUGGERNAUT.jpg", url: "https://youtu.be/sUuKKMqwzlE" },
      { title: "Ather | TVC & Theatre Ad | Editor & Colorist", thumbnail: "./images/Digital/ATHER TVC.THEATRE AD.jpg", url: "https://youtu.be/_0B66eXw7MU" },
      { title: "Ather Duo - Charger by Ather <br> Editor & Colorist", thumbnail: "./images/Digital/ATHER DUO CHARGER.jpg", url: "https://youtu.be/66dhT7NUkE0" },
      { title: "Ather | Magic of Engineering at Ather Community Day '24 | Editor & Colorist", thumbnail: "./images/Digital/ATHER MAGIC OF ENGINEERING.jpg", url: "https://youtu.be/FNwMN9ZjGQA" },
      { title: "OLA | Keynote at Sankalp '24 | Editor", thumbnail: "./images/Digital/OLA SANKALP.jpg", url: "https://youtu.be/4u8EkSaSe_g" },
      { title: "Tata.ev | Lifestyle Films - Gurgaon | Editor & Colorist", thumbnail: "./images/Digital/TATA.EV GURGAON.jpg", url: "https://www.youtube.com/playlist?list=PLfdZCcgmTH7yNwYZPBSHl6Ch8txNXBvS1" },
      { title: "Tata.ev | Lifestyle Films -  Kerala |<br> Editor & Colorist", thumbnail: "./images/Digital/TATA.EV KERALA.jpg", url: "https://www.youtube.com/playlist?list=PLfdZCcgmTH7wb3qVRPCvn90ZyLFQbaYpt" },
      { title: "MTR Vermicelli | Theatre & Digital Ad | Editor & Colorist", thumbnail: "./images/Digital/MTR.jpg", url: "https://youtu.be/BvYtafxgCj8" },
      { title: "Muthoot Fincorp | Digital Ad | Editor", thumbnail: "./images/Digital/MUTHOOT FINCORP.jpg", url: "https://youtu.be/KbW2WO9-Ykg" },
      { title: "Allergy | Government of Kerala | <br>Editor Colorist", thumbnail: "./images/Digital/ALLERGY.jpg", url: "https://youtu.be/xb90aqkDKJU" },
      { title: "Arista Vault | It's OK to FORGET | <br>Editor & Colorist", thumbnail: "./images/Digital/ARISTA VAULT.jpg", url: "https://youtu.be/4GXyzmLn3nc" },
      { title: "Mr. Butler Fizzo | Eda Mone | Editor & Colorist", thumbnail: "./images/Digital/MR BUTLER FIZZO EDA MONE.jpg", url: "https://youtu.be/mNb9LN-t9eI" },
      { title: "Ather | Product Film | Colorist", thumbnail: "./images/Digital/ATHER PRODUCT FILM.jpg", url: "https://youtu.be/ezTuwXHG7fE" },
      { title: "Prorganiq BCAA Film | Editor & Colorist", thumbnail: "./images/Digital/PRORGANIQ BCAA.jpg", url: "https://youtu.be/9i_C3keAukw" },
      { title: "Prorganiq Store Launch | Editor & Colorist", thumbnail: "./images/Digital/PRORGANIQ STORE LAUNCH.jpg", url: "https://youtu.be/U7-b_lmo6aU" },
      { title: "Zomato | Spec Ad | Editor", thumbnail: "./images/Digital/ZOMATO SPEC AD.jpg", url: "https://youtu.be/AuDFGGPrtp8" },
      { title: "Saregama Carvaan Mini | Spec Ad | Editor", thumbnail: "./images/Digital/SAREGAMA CARVAAN.jpg", url: "https://youtu.be/9u4lUA_wq88" },
    ]
  },
  {
    name: "Testimonial Films & Narratives",
    videos: [
      { title: "Federal Bank | The Story of Mookkannoor Mission | Editor & Colorist", thumbnail: "./images/Testimonials/FEDERAL BANK MOOKKANNOOR.jpg", url: "https://youtu.be/7Amt6yYYGzM?list=PLZj4xZ-8Qfp_VthMxcUpjDVniHdaPlbKg" },
      { title: "Federal Bank | Empowering Fisherman Communities in Nagercoil | Editor & Colorist", thumbnail: "./images/Testimonials/FB_FISHERMEN.jpg", url: "https://youtu.be/exWrGUKQyrU" },
      { title: "Indeed | Mechelonic Welding & Automation | Editor & Colorist", thumbnail: "./images/Testimonials/MECHALONIC - INDEED.jpg", url: "https://youtu.be/ZMUJRkrEoAc" },
      { title: "Indeed | FCOOS | Editor & Colorist", thumbnail: "./images/Testimonials/FCOOS - INDEED.jpg", url: "https://youtu.be/r7-fmK64pRM" },
      { title: "Federal Bank - 50 years in Hyderabad | Editor & Colorist", thumbnail: "./images/Testimonials/FB 50 YRS IN HYDERABAD.jpg", url: "https://www.youtube.com/playlist?list=PLfdZCcgmTH7xKqnz_9UjPhJlKK_zdq_6D" },
      { title: "Federal Bank - 50 Years in Bengaluru | Editor & Colorist", thumbnail: "./images/Testimonials/FB 50 YRS IN BANGALORE.jpg", url: "https://www.youtube.com/playlist?list=PLfdZCcgmTH7xuFRS57c3zg6LwUs60Ye3U" },
      { title: "Federal Bank - 50 years in Kolkata  Editor & Colorist", thumbnail: "./images/Testimonials/FB 50 YRS IN KOLKATA.jpg", url: "https://www.youtube.com/playlist?list=PLfdZCcgmTH7z-3Ov-C3uFagvof0Ed4FE8" },
      { title: "Federal Bank | Employee Stories | Chennai | Editor & Colorist", thumbnail: "./images/Testimonials/FEDERAL BANK_EMPLOYEE.jpg", url: "https://youtu.be/kgub2qH6UDY" },
      { title: "Netskope - Mastek | Editor & Colorist", thumbnail: "./images/Testimonials/NETSKOPE.jpg", url: "https://youtu.be/c4hpf42ZM9E" },
      { title: "Character Sketch-Gopal Ratna Awards | Ministry of Fisheries, Animal Husbandry and Dairying | Editor & Colorist", thumbnail: "./images/Testimonials/CHARACTER SKETCH.jpg", url: "https://youtu.be/nE_RAw-p-9s" },
    ]
  },
  {
    name: "Non-Fiction / Documentary Films",
    videos: [
      { title: "Ekam | Kannada Web Series | Official Casting Call Film | Editor & Colorist", thumbnail: "./images/Documentaries/EKAM CASTING CALL.jpg", url: "https://youtu.be/WRngO1HU2PI" },
      { title: "Tata.ev | Importance of Solar & EVs | Editor & Colorist", thumbnail: "./images/Documentaries/TATA EV DOCU.jpg", url: "https://youtu.be/-GEXEL_EYbk" },
      { title: "Into The Blues | English Documentary | Editor & Colorist", thumbnail: "./images/Documentaries/INTO THE BLUES.jpg", url: "https://www.youtube.com/watch?v=-Pehzsq2Z4g" },
      { title: "The Hands that make God | Malayalam Documentary | Editor", thumbnail: "./images/Documentaries/HANDS THAT MAKE GOD.jpg", url: "https://www.youtube.com/watch?v=BaQN2RwXvk0&feature=youtu.be" },
      { title: "Natsamraat | Marathi Documentary | Editor", thumbnail: "./images/Documentaries/NATSAMRAAT.jpg", url: "https://www.youtube.com/watch?v=Ie9Wfx1OuOs" },
      { title: "Neelakurinji Poothu | Malayalam Documentary | Editor", thumbnail: "./images/Documentaries/NEELAKURINJI.jpg", url: "https://www.youtube.com/watch?v=ehRkamCZ1aY" },
    ]
  },
  {
    name: "Fiction",
    videos: [
      
      { title: "Phas Gaya Sisyphus | Hindi Short | Editor", thumbnail: "./images/Fiction/PHAS GAYA SISYPHUS.jpg", url: "https://youtu.be/ufZ7Raizf0Q" },
      { title: "Pratheekshayode Appu | Malayalam Short | Editor & Colorist", thumbnail: "./images/Fiction/PRATHEEKSHAYODE APPU.jpg", url: "https://youtu.be/B_ArVanOtmI" },
      { title: "AJ vs THE MEDIUM | English Short | Editor", thumbnail: "./images/Fiction/AJ VS MEDIUM.jpg", url: "https://youtu.be/kwJUk00UQNE" },
      { title: "Kaambh | Malayalam Short | Editor", thumbnail: "./images/Fiction/KAAMBH.jpg", url: "https://www.youtube.com/watch?v=lNwnMhEBHDY&feature=youtu.be" },
      { title: "Meemu | Malayalam Short | Editor", thumbnail: "./images/Fiction/MEEMU.jpg", url: "https://www.youtube.com/watch?v=ipsAYZ5s_M0&feature=youtu.be" },
      { title: "Victims | Tamil Short | Editor", thumbnail: "./images/Fiction/VICTIMS.jpg", url: "https://www.youtube.com/watch?v=KaVZI4mo3S4" },
      { title: "Shalini | Malayalam-Tamil Short | Editor", thumbnail: "./images/Fiction/SHALINI.jpg", url: "https://www.youtube.com/watch?v=mUf14y_Uxas" },
      { title: "Avaladhu Veedu | Tamil Short | Editor", thumbnail: "./images/Fiction/AVALADHU VEEDU.jpg", url: "https://www.youtube.com/watch?v=HH8AkBarB-s" },
      { title: "The Stain | Tamil Short | Editor", thumbnail: "./images/Fiction/STAIN.jpg", url: "https://www.youtube.com/watch?v=7CBopgHWX4Q" },
      { title: "Mounam | Malayalam-Tamil Short | Editor & Colorist", thumbnail: "./images/Fiction/MOUNAM.jpg", url: "https://www.youtube.com/watch?v=ev6muISzR9s" },
      { title: "David | Malayalam Short | Editor & Colorist", thumbnail: "./images/Fiction/DAVID.jpg", url: "https://www.youtube.com/watch?v=zSjF4qmERhs" },
      { title: "Watan | Sindhi Short | Editor", thumbnail: "./images/Fiction/WATAN.jpg", url: "https://www.youtube.com/watch?v=kc5g83vVpEo&feature=youtu.be" },
      { title: "Gray | Malayalam Short | Editor", thumbnail: "./images/Fiction/GRAY.jpg", url: "https://www.youtube.com/watch?v=rKnZ174aSG8&feature=youtu.be" },
      { title: "EKAM | Kannada Web Series | Associate Editor", thumbnail: "./images/Fiction/EKAM.jpg", url: "https://www.youtube.com/watch?v=X1b698IHBEc" },
    ]
  },
  {
    name: "Music Videos",
    videos: [
      { title: "Kaathaloram | Mangosteen Club | Editor", thumbnail: "./images/Music_Videos/KAATHALORAM.jpg", url: "https://www.youtube.com/watch?v=3jl_fWMAl9k&feature=youtu.be" },
      { title: "Sooravali | Editor", thumbnail: "./images/Music_Videos/SOORAVALI.jpg", url: "https://www.youtube.com/watch?v=LseWdgDjiZQ&feature=youtu.be" },
      { title: "Aladhi Kadhale | Editor & Colorist", thumbnail: "./images/Music_Videos/ALADHI KADHALE.jpg", url: "https://www.youtube.com/watch?v=PLuCh3Nt6yc&feature=youtu.be" },
      { title: "Melam | Editor & Colorist", thumbnail: "./images/Music_Videos/MELAM.jpg", url: "https://www.youtube.com/watch?v=37aXDlkIL04&feature=youtu.be" },
      { title: "Theerangal | Editor", thumbnail: "./images/Music_Videos/THEERANGAL.jpg", url: "https://www.youtube.com/watch?v=1GX1Bpnev8Q&feature=youtu.be" },
      { title: "Mavelippattu | Mangosteen Club | Associate Editor", thumbnail: "./images/Music_Videos/MAVELIPPATTU.jpg", url: "https://www.youtube.com/watch?v=AGz0MoNlmVk" },
      { title: "Federal Bank | Rishta Anthem | Editor & Colorist", thumbnail: "./images/Music_Videos/FEDERAL BANK.jpg", url: "https://youtu.be/X6jYCy-usHE" },
      { title: "Iza | Editor", thumbnail: "./images/Music_Videos/IZA.jpg", url: "https://www.youtube.com/watch?v=XoiYLt8Wn4Q&feature=youtu.be" },
    ]
  }
];