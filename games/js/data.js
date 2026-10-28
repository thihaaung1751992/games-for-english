// Lesson content. Add a topic here and every game picks it up.
// Each word: en, my (Burmese meaning), ex (example), exMy (example in Burmese)
window.TOPICS = [
  {
    id: "daily", track: "Everyday", name: "Daily Life", mm: "နေ့စဉ်ဘဝ", icon: "🏠",
    words: [
      { en: "breakfast", my: "မနက်စာ", ex: "I have breakfast at seven.", exMy: "ကျွန်တော်/ကျွန်မ ခုနစ်နာရီမှာ မနက်စာစားတယ်။" },
      { en: "shower", my: "ရေချိုးခြင်း", ex: "He takes a shower every morning.", exMy: "သူ မနက်တိုင်း ရေချိုးတယ်။" },
      { en: "bus", my: "ဘတ်စ်ကား", ex: "The bus is late today.", exMy: "ဒီနေ့ ဘတ်စ်ကား နောက်ကျတယ်။" },
      { en: "phone", my: "ဖုန်း", ex: "Where is my phone?", exMy: "ကျွန်တော့်/ကျွန်မရဲ့ ဖုန်း ဘယ်မှာလဲ။" },
      { en: "homework", my: "အိမ်စာ", ex: "I finish my homework after dinner.", exMy: "ညစာစားပြီးရင် အိမ်စာလုပ်တယ်။" },
      { en: "music", my: "ဂီတ", ex: "She listens to music on the way home.", exMy: "သူမ အိမ်ပြန်ရင်း ဂီတနားထောင်တယ်။" },
      { en: "family", my: "မိသားစု", ex: "My family lives in Yangon.", exMy: "ကျွန်တော့်/ကျွန်မရဲ့ မိသားစု ရန်ကုန်မှာနေတယ်။" },
      { en: "weekend", my: "စနေ၊ တနင်္ဂနွေ ရက်ပိတ်ရက်", ex: "We rest at the weekend.", exMy: "ကျွန်တော်တို့ စနေ၊ တနင်္ဂနွေမှာ အနားယူတယ်။" }
    ]
  },
  {
    id: "school", track: "Everyday", name: "School", mm: "ကျောင်း", icon: "🎒",
    words: [
      { en: "teacher", my: "ဆရာ / ဆရာမ", ex: "The teacher explains the lesson.", exMy: "ဆရာက သင်ခန်းစာကို ရှင်းပြတယ်။" },
      { en: "classroom", my: "စာသင်ခန်း", ex: "The classroom is clean.", exMy: "စာသင်ခန်း သန့်ရှင်းတယ်။" },
      { en: "exam", my: "စာမေးပွဲ", ex: "The exam starts at nine.", exMy: "စာမေးပွဲ ကိုးနာရီမှာ စတယ်။" },
      { en: "lesson", my: "သင်ခန်းစာ", ex: "Today's lesson is easy.", exMy: "ဒီနေ့ သင်ခန်းစာက လွယ်တယ်။" },
      { en: "notebook", my: "မှတ်စုစာအုပ်", ex: "Write it in your notebook.", exMy: "မှတ်စုစာအုပ်ထဲမှာ ရေးပါ။" },
      { en: "library", my: "စာကြည့်တိုက်", ex: "I study in the library.", exMy: "ကျွန်တော်/ကျွန်မ စာကြည့်တိုက်မှာ စာကျက်တယ်။" },
      { en: "answer", my: "အဖြေ", ex: "Do you know the answer?", exMy: "အဖြေကို သိလား။" },
      { en: "practice", my: "လေ့ကျင့်ခြင်း", ex: "Practice makes you better.", exMy: "လေ့ကျင့်ရင် ပိုတော်လာမယ်။" }
    ]
  },
  {
    id: "office", track: "Workplace", name: "Office", mm: "ရုံးလုပ်ငန်း", icon: "💼",
    words: [
      { en: "meeting", my: "အစည်းအဝေး", ex: "The meeting is at ten o'clock.", exMy: "အစည်းအဝေး ဆယ်နာရီမှာ ရှိတယ်။" },
      { en: "deadline", my: "နောက်ဆုံးသတ်မှတ်ရက်", ex: "The deadline is Friday.", exMy: "နောက်ဆုံးသတ်မှတ်ရက်က သောကြာနေ့ပါ။" },
      { en: "manager", my: "မန်နေဂျာ", ex: "The manager approved the plan.", exMy: "မန်နေဂျာက အစီအစဉ်ကို သဘောတူတယ်။" },
      { en: "colleague", my: "လုပ်ဖော်ကိုင်ဖက်", ex: "My colleague helped me.", exMy: "ကျွန်တော့်/ကျွန်မရဲ့ လုပ်ဖော်ကိုင်ဖက်က ကူညီတယ်။" },
      { en: "report", my: "အစီရင်ခံစာ", ex: "I am writing a report.", exMy: "ကျွန်တော်/ကျွန်မ အစီရင်ခံစာ ရေးနေတယ်။" },
      { en: "schedule", my: "အချိန်ဇယား", ex: "Please check the schedule.", exMy: "အချိန်ဇယားကို စစ်ကြည့်ပါ။" },
      { en: "customer", my: "ဖောက်သည်", ex: "The customer called us.", exMy: "ဖောက်သည်က ကျွန်တော်တို့ကို ဖုန်းဆက်တယ်။" },
      { en: "salary", my: "လစာ", ex: "The salary is paid monthly.", exMy: "လစာကို လစဉ်ပေးတယ်။" }
    ]
  },
  {
    id: "email", track: "Workplace", name: "Email & Calls", mm: "အီးမေးလ်နှင့် ဖုန်း", icon: "📧",
    words: [
      { en: "attach", my: "ပူးတွဲပို့သည်", ex: "Please attach the file.", exMy: "ဖိုင်ကို ပူးတွဲပို့ပေးပါ။" },
      { en: "reply", my: "ပြန်စာပေးသည်", ex: "I will reply tomorrow.", exMy: "ကျွန်တော်/ကျွန်မ မနက်ဖြန် ပြန်စာပေးမယ်။" },
      { en: "forward", my: "ထပ်ဆင့်ပို့သည်", ex: "Can you forward this email?", exMy: "ဒီအီးမေးလ်ကို ထပ်ဆင့်ပို့ပေးနိုင်မလား။" },
      { en: "appointment", my: "ချိန်းဆိုမှု", ex: "I have an appointment at three.", exMy: "သုံးနာရီမှာ ချိန်းထားတာရှိတယ်။" },
      { en: "confirm", my: "အတည်ပြုသည်", ex: "Please confirm your booking.", exMy: "ကြိုတင်မှာယူမှုကို အတည်ပြုပေးပါ။" },
      { en: "cancel", my: "ပယ်ဖျက်သည်", ex: "We had to cancel the meeting.", exMy: "အစည်းအဝေးကို ပယ်ဖျက်ရတယ်။" },
      { en: "available", my: "အားလပ်သော", ex: "Are you available on Monday?", exMy: "တနင်္လာနေ့ အားလား။" },
      { en: "urgent", my: "အလွန်အမြန်လိုသော", ex: "This is an urgent request.", exMy: "ဒါက အလွန်အမြန်လိုတဲ့ တောင်းဆိုချက်ပါ။" }
    ]
  },
  {
    // Vocabulary and themes from the song "Heaven"; the lyrics themselves are not reproduced.
    id: "song", track: "Music", name: "Song: Heaven", mm: "သီချင်းထဲက စာလုံးများ", icon: "🎵",
    words: [
      { en: "young", my: "ငယ်ရွယ်သော", ex: "We were young when we met.", exMy: "ကျွန်တော်တို့ ဆုံတုန်းက ငယ်ရွယ်သေးတယ်။" },
      { en: "wild", my: "ရိုင်းစိုင်းသော၊ ထိန်းမနိုင်သော", ex: "The party got wild last night.", exMy: "မနေ့ညက ပါတီက ထိန်းမနိုင်လောက်အောင် စည်ကားတယ်။" },
      { en: "free", my: "လွတ်လပ်သော", ex: "I feel free on weekends.", exMy: "စနေ၊ တနင်္ဂနွေတွေမှာ လွတ်လပ်တယ်လို့ ခံစားရတယ်။" },
      { en: "heart", my: "နှလုံးသား", ex: "She has a kind heart.", exMy: "သူမမှာ ကြင်နာတဲ့ နှလုံးသားရှိတယ်။" },
      { en: "believe", my: "ယုံကြည်သည်", ex: "I believe in you.", exMy: "ကျွန်တော်/ကျွန်မ မင်းကို ယုံကြည်တယ်။" },
      { en: "dream", my: "အိပ်မက်", ex: "My dream is to travel the world.", exMy: "ကျွန်တော့်/ကျွန်မရဲ့ အိပ်မက်က ကမ္ဘာပတ်ခရီးသွားဖို့ပါ။" },
      { en: "wait", my: "စောင့်သည်", ex: "Please wait for me here.", exMy: "ဒီမှာ ကျွန်တော့်/ကျွန်မကို စောင့်ပေးပါ။" },
      { en: "change", my: "ပြောင်းလဲသည်", ex: "Nothing will change my mind.", exMy: "ဘာမှ ကျွန်တော့်/ကျွန်မစိတ်ကို မပြောင်းနိုင်ဘူး။" }
    ]
  }
];
