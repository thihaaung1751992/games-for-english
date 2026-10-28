// Lesson content. Add a lesson here and every game picks it up.
// Each word: en, my (Burmese meaning), ex (example), exMy (example in Burmese)
//
// UNITS mirror the Shwequest path: three video lessons, then one boss.
// A lesson's difficulty level is its unit's level; games read it through getLevel() in common.js.
window.UNITS = [
  { n: 1, title: "First Steps",   mm: "ပထမခြေလှမ်းများ", level: 1 },
  { n: 2, title: "Market Talk",   mm: "ဈေးထဲက စကားများ", level: 2 },
  { n: 3, title: "The Long Trail", mm: "ခရီးရှည်လမ်း",    level: 3 },
  { n: 4, title: "Golden Peak",   mm: "ရွှေတောင်ထိပ်",    level: 4 }
];

window.TOPICS = [
  // ---------- Unit 1 · First Steps ----------
  {
    id: "l1", unit: 1, video: 1, name: "Greetings", mm: "နှုတ်ဆက်စကား", icon: "👋",
    words: [
      { en: "hello", my: "မင်္ဂလာပါ", ex: "Hello, how are you?", exMy: "မင်္ဂလာပါ၊ နေကောင်းလား။" },
      { en: "goodbye", my: "နှုတ်ဆက်ခွဲခွာသည့်စကား", ex: "Goodbye, see you tomorrow.", exMy: "သွားတော့မယ်နော်၊ မနက်ဖြန်တွေ့မယ်။" },
      { en: "please", my: "ကျေးဇူးပြု၍", ex: "Please sit down.", exMy: "ကျေးဇူးပြုပြီး ထိုင်ပါ။" },
      { en: "thanks", my: "ကျေးဇူးတင်ပါတယ်", ex: "Thanks for your help.", exMy: "ကူညီလို့ ကျေးဇူးတင်ပါတယ်။" },
      { en: "sorry", my: "တောင်းပန်ပါတယ်", ex: "I am sorry I am late.", exMy: "နောက်ကျလို့ တောင်းပန်ပါတယ်။" },
      { en: "welcome", my: "ကြိုဆိုပါတယ်", ex: "Welcome to our school.", exMy: "ကျွန်တော်တို့ကျောင်းကို ကြိုဆိုပါတယ်။" },
      { en: "friend", my: "သူငယ်ချင်း", ex: "He is my best friend.", exMy: "သူက ကျွန်တော့်/ကျွန်မရဲ့ အကောင်းဆုံး သူငယ်ချင်းပါ။" },
      { en: "name", my: "နာမည်", ex: "My name is Mya.", exMy: "ကျွန်တော့်/ကျွန်မနာမည်က မြပါ။" }
    ]
  },
  {
    id: "l2", unit: 1, video: 2, name: "Family", mm: "မိသားစု", icon: "👨‍👩‍👧",
    words: [
      { en: "mother", my: "အမေ", ex: "My mother cooks dinner.", exMy: "အမေက ညစာချက်တယ်။" },
      { en: "father", my: "အဖေ", ex: "My father drives a bus.", exMy: "အဖေက ဘတ်စ်ကား မောင်းတယ်။" },
      { en: "brother", my: "အစ်ကို / ညီ", ex: "My brother plays football.", exMy: "အစ်ကိုက ဘောလုံးကစားတယ်။" },
      { en: "sister", my: "အစ်မ / ညီမ", ex: "My sister is a nurse.", exMy: "အစ်မက သူနာပြုပါ။" },
      { en: "grandmother", my: "အဖွား", ex: "My grandmother tells good stories.", exMy: "အဖွားက ပုံပြင်ကောင်းကောင်း ပြောပြတယ်။" },
      { en: "uncle", my: "ဦးလေး", ex: "My uncle lives in Mandalay.", exMy: "ဦးလေးက မန္တလေးမှာ နေတယ်။" },
      { en: "neighbor", my: "အိမ်နီးချင်း", ex: "Our neighbor is very kind.", exMy: "ကျွန်တော်တို့ အိမ်နီးချင်းက အရမ်းကြင်နာတယ်။" },
      { en: "child", my: "ကလေး", ex: "The child is sleeping.", exMy: "ကလေး အိပ်နေတယ်။" }
    ]
  },
  {
    id: "l3", unit: 1, video: 3, name: "Days & Time", mm: "ရက်နှင့် အချိန်", icon: "📅",
    words: [
      { en: "today", my: "ဒီနေ့", ex: "Today is Monday.", exMy: "ဒီနေ့ တနင်္လာနေ့ပါ။" },
      { en: "tomorrow", my: "မနက်ဖြန်", ex: "I will call you tomorrow.", exMy: "မနက်ဖြန် ဖုန်းဆက်မယ်။" },
      { en: "yesterday", my: "မနေ့က", ex: "Yesterday it rained all day.", exMy: "မနေ့က တစ်နေ့လုံး မိုးရွာတယ်။" },
      { en: "week", my: "သီတင်းပတ်", ex: "I study English twice a week.", exMy: "တစ်ပတ်ကို နှစ်ကြိမ် အင်္ဂလိပ်စာ လေ့လာတယ်။" },
      { en: "month", my: "လ", ex: "She travels every month.", exMy: "သူမ လတိုင်း ခရီးသွားတယ်။" },
      { en: "always", my: "အမြဲတမ်း", ex: "He always wakes up early.", exMy: "သူ အမြဲတမ်း စောစောနိုးတယ်။" },
      { en: "never", my: "ဘယ်တော့မှ မ...", ex: "I never eat meat.", exMy: "ကျွန်တော်/ကျွန်မ အသားဘယ်တော့မှ မစားဘူး။" },
      { en: "sometimes", my: "တစ်ခါတစ်ရံ", ex: "Sometimes we walk to school.", exMy: "တစ်ခါတစ်ရံ ကျောင်းကို လမ်းလျှောက်သွားတယ်။" }
    ]
  },

  // ---------- Unit 2 · Market Talk ----------
  {
    id: "l4", unit: 2, video: 4, name: "Food & Drink", mm: "အစားအစာနှင့် သောက်စရာ", icon: "🍜",
    words: [
      { en: "rice", my: "ထမင်း", ex: "We eat rice every day.", exMy: "ကျွန်တော်တို့ နေ့တိုင်း ထမင်းစားတယ်။" },
      { en: "noodle", my: "ခေါက်ဆွဲ", ex: "This noodle soup is hot.", exMy: "ဒီခေါက်ဆွဲရည်က ပူတယ်။" },
      { en: "chicken", my: "ကြက်သား", ex: "She cooked chicken curry.", exMy: "သူမ ကြက်သားဟင်း ချက်တယ်။" },
      { en: "vegetable", my: "ဟင်းသီးဟင်းရွက်", ex: "Every vegetable here is fresh.", exMy: "ဒီက ဟင်းသီးဟင်းရွက် အားလုံး လတ်ဆတ်တယ်။" },
      { en: "fruit", my: "သစ်သီး", ex: "Fruit is good for you.", exMy: "သစ်သီးက ကျန်းမာရေးနဲ့ ညီတယ်။" },
      { en: "juice", my: "ဖျော်ရည်", ex: "I drink orange juice.", exMy: "လိမ္မော်ဖျော်ရည် သောက်တယ်။" },
      { en: "spicy", my: "စပ်သော", ex: "This salad is too spicy.", exMy: "ဒီသုပ်က အရမ်းစပ်တယ်။" },
      { en: "delicious", my: "အရသာရှိသော", ex: "The soup is delicious.", exMy: "ဟင်းချို အရသာရှိတယ်။" }
    ]
  },
  {
    id: "l5", unit: 2, video: 5, name: "Shopping", mm: "ဈေးဝယ်ခြင်း", icon: "🛍️",
    words: [
      { en: "price", my: "ဈေးနှုန်း", ex: "What is the price of this bag?", exMy: "ဒီအိတ်ရဲ့ ဈေးက ဘယ်လောက်လဲ။" },
      { en: "cheap", my: "ဈေးသက်သာသော", ex: "Rice is cheap in this market.", exMy: "ဒီဈေးမှာ ဆန်ဈေး သက်သာတယ်။" },
      { en: "expensive", my: "ဈေးကြီးသော", ex: "That phone is too expensive.", exMy: "အဲဒီဖုန်းက ဈေးအရမ်းကြီးတယ်။" },
      { en: "discount", my: "လျှော့ဈေး", ex: "Is there a discount today?", exMy: "ဒီနေ့ လျှော့ဈေး ရှိလား။" },
      { en: "receipt", my: "ပြေစာ", ex: "Keep the receipt, please.", exMy: "ပြေစာကို သိမ်းထားပါ။" },
      { en: "bargain", my: "ဈေးဆစ်သည်", ex: "You can bargain at the market.", exMy: "ဈေးမှာ ဈေးဆစ်လို့ရတယ်။" },
      { en: "cashier", my: "ငွေကိုင်", ex: "The cashier gave me change.", exMy: "ငွေကိုင်က ပြန်အမ်းငွေ ပေးတယ်။" },
      { en: "basket", my: "ခြင်းတောင်း", ex: "Put the apples in the basket.", exMy: "ပန်းသီးတွေကို ခြင်းတောင်းထဲ ထည့်ပါ။" }
    ]
  },
  {
    id: "l6", unit: 2, video: 6, name: "Money", mm: "ငွေကြေး", icon: "💰",
    words: [
      { en: "borrow", my: "ငှားသည်", ex: "Can I borrow your pen?", exMy: "မင်းရဲ့ ဘောပင် ငှားလို့ရမလား။" },
      { en: "lend", my: "ချေးသည်", ex: "I can lend you some money.", exMy: "ပိုက်ဆံနည်းနည်း ချေးပေးနိုင်တယ်။" },
      { en: "save", my: "စုသည်", ex: "I save money every month.", exMy: "လတိုင်း ပိုက်ဆံစုတယ်။" },
      { en: "spend", my: "သုံးစွဲသည်", ex: "Do not spend it all today.", exMy: "ဒီနေ့ အကုန်မသုံးပါနဲ့။" },
      { en: "earn", my: "ရှာဖွေသည်", ex: "She wants to earn more money.", exMy: "သူမ ပိုက်ဆံ ပိုရှာချင်တယ်။" },
      { en: "afford", my: "တတ်နိုင်သည်", ex: "We cannot afford a new car.", exMy: "ကားအသစ် မဝယ်နိုင်ဘူး။" },
      { en: "refund", my: "ပြန်အမ်းငွေ", ex: "I want a refund, please.", exMy: "ပြန်အမ်းငွေ လိုချင်ပါတယ်။" },
      { en: "owe", my: "ကြွေးတင်သည်", ex: "I owe him five dollars.", exMy: "သူ့ကို ဒေါ်လာ ငါးဒေါ်လာ ကြွေးတင်တယ်။" }
    ]
  },

  // ---------- Unit 3 · The Long Trail ----------
  {
    id: "l7", unit: 3, video: 7, name: "Travel", mm: "ခရီးသွားလာခြင်း", icon: "✈️",
    words: [
      { en: "ticket", my: "လက်မှတ်", ex: "I bought a train ticket.", exMy: "ရထားလက်မှတ် ဝယ်ခဲ့တယ်။" },
      { en: "passport", my: "နိုင်ငံကူးလက်မှတ်", ex: "Do not forget your passport.", exMy: "နိုင်ငံကူးလက်မှတ် မမေ့ပါနဲ့။" },
      { en: "luggage", my: "ခရီးဆောင်အိတ်", ex: "My luggage is very heavy.", exMy: "ကျွန်တော့်/ကျွန်မရဲ့ ခရီးဆောင်အိတ် အရမ်းလေးတယ်။" },
      { en: "airport", my: "လေဆိပ်", ex: "We arrived at the airport early.", exMy: "ကျွန်တော်တို့ လေဆိပ်ကို စောစောရောက်တယ်။" },
      { en: "journey", my: "ခရီးစဉ်", ex: "The journey took three hours.", exMy: "ခရီးစဉ်က သုံးနာရီကြာတယ်။" },
      { en: "destination", my: "ခရီးဆုံးနေရာ", ex: "Our destination is Bagan.", exMy: "ကျွန်တော်တို့ ခရီးဆုံးနေရာက ပုဂံပါ။" },
      { en: "delay", my: "နှောင့်နှေးခြင်း", ex: "There is a delay on this flight.", exMy: "ဒီလေယာဉ်ခရီးစဉ် နှောင့်နှေးနေတယ်။" },
      { en: "platform", my: "ရထားပလက်ဖောင်း", ex: "The train leaves from platform two.", exMy: "ရထားက ပလက်ဖောင်း နှစ်ကနေ ထွက်တယ်။" }
    ]
  },
  {
    id: "l8", unit: 3, video: 8, name: "Directions", mm: "လမ်းညွှန်", icon: "🧭",
    words: [
      { en: "straight", my: "ဖြောင့်ဖြောင့်", ex: "Go straight for two minutes.", exMy: "နှစ်မိနစ် ဖြောင့်ဖြောင့်သွားပါ။" },
      { en: "corner", my: "လမ်းထောင့်", ex: "Turn left at the corner.", exMy: "လမ်းထောင့်မှာ ဘယ်ဘက်ကွေ့ပါ။" },
      { en: "opposite", my: "မျက်နှာချင်းဆိုင်", ex: "The bank is opposite the school.", exMy: "ဘဏ်က ကျောင်းနဲ့ မျက်နှာချင်းဆိုင်မှာ ရှိတယ်။" },
      { en: "nearby", my: "အနီးအနား", ex: "Is there a bank nearby?", exMy: "အနီးအနားမှာ ဘဏ်ရှိလား။" },
      { en: "direction", my: "ဦးတည်ရာ", ex: "Which direction is the station?", exMy: "ဘူတာက ဘယ်ဘက်ဆီမှာလဲ။" },
      { en: "junction", my: "လမ်းဆုံ", ex: "Wait at the next junction.", exMy: "နောက်လမ်းဆုံမှာ စောင့်ပါ။" },
      { en: "bridge", my: "တံတား", ex: "Cross the bridge and turn right.", exMy: "တံတားကို ကူးပြီး ညာဘက်ကွေ့ပါ။" },
      { en: "distance", my: "အကွာအဝေး", ex: "The distance is about two miles.", exMy: "အကွာအဝေးက နှစ်မိုင်လောက် ရှိတယ်။" }
    ]
  },
  {
    id: "l9", unit: 3, video: 9, name: "Health", mm: "ကျန်းမာရေး", icon: "🏥",
    words: [
      { en: "headache", my: "ခေါင်းကိုက်ခြင်း", ex: "I have a bad headache.", exMy: "ခေါင်းအရမ်းကိုက်တယ်။" },
      { en: "fever", my: "အဖျား", ex: "She has a high fever.", exMy: "သူမ အဖျားများတယ်။" },
      { en: "medicine", my: "ဆေး", ex: "Take this medicine after dinner.", exMy: "ဒီဆေးကို ညစာစားပြီးရင် သောက်ပါ။" },
      { en: "hospital", my: "ဆေးရုံ", ex: "He works at the hospital.", exMy: "သူ ဆေးရုံမှာ အလုပ်လုပ်တယ်။" },
      { en: "symptom", my: "ရောဂါလက္ခဏာ", ex: "Cough is a common symptom.", exMy: "ချောင်းဆိုးတာ အဖြစ်များတဲ့ ရောဂါလက္ခဏာပါ။" },
      { en: "recover", my: "ပြန်လည်ကောင်းမွန်သည်", ex: "You will recover soon.", exMy: "မကြာခင် ပြန်ကောင်းလာမယ်။" },
      { en: "injury", my: "ဒဏ်ရာ", ex: "The injury is not serious.", exMy: "ဒဏ်ရာက မပြင်းထန်ဘူး။" },
      { en: "pharmacy", my: "ဆေးဆိုင်", ex: "The pharmacy is open until nine.", exMy: "ဆေးဆိုင်က ကိုးနာရီအထိ ဖွင့်တယ်။" }
    ]
  },

  // ---------- Unit 4 · Golden Peak ----------
  {
    id: "l10", unit: 4, video: 10, name: "Work", mm: "အလုပ်", icon: "💼",
    words: [
      { en: "deadline", my: "နောက်ဆုံးသတ်မှတ်ရက်", ex: "We must meet the deadline.", exMy: "နောက်ဆုံးသတ်မှတ်ရက်ကို မီအောင် လုပ်ရမယ်။" },
      { en: "manager", my: "မန်နေဂျာ", ex: "The manager approved my idea.", exMy: "မန်နေဂျာက ကျွန်တော့်/ကျွန်မစိတ်ကူးကို သဘောတူတယ်။" },
      { en: "colleague", my: "လုပ်ဖော်ကိုင်ဖက်", ex: "My colleague trained me.", exMy: "လုပ်ဖော်ကိုင်ဖက်က ကျွန်တော့်/ကျွန်မကို သင်ပေးတယ်။" },
      { en: "proposal", my: "အဆိုပြုလွှာ", ex: "She wrote a clear proposal.", exMy: "သူမ ရှင်းလင်းတဲ့ အဆိုပြုလွှာတစ်ခု ရေးတယ်။" },
      { en: "budget", my: "ဘတ်ဂျက်", ex: "The budget is very small.", exMy: "ဘတ်ဂျက်က အရမ်းနည်းတယ်။" },
      { en: "negotiate", my: "ညှိနှိုင်းသည်", ex: "They will negotiate the price.", exMy: "သူတို့ ဈေးနှုန်းကို ညှိနှိုင်းမယ်။" },
      { en: "promotion", my: "ရာထူးတိုးခြင်း", ex: "He got a promotion last year.", exMy: "သူ ပြီးခဲ့တဲ့နှစ်က ရာထူးတိုးတယ်။" },
      { en: "resign", my: "ရာထူးမှ နုတ်ထွက်သည်", ex: "She decided to resign.", exMy: "သူမ နုတ်ထွက်ဖို့ ဆုံးဖြတ်တယ်။" }
    ]
  },
  {
    id: "l11", unit: 4, video: 11, name: "Email & Calls", mm: "အီးမေးလ်နှင့် ဖုန်း", icon: "📧",
    words: [
      { en: "attach", my: "ပူးတွဲပို့သည်", ex: "Please attach the file.", exMy: "ဖိုင်ကို ပူးတွဲပို့ပေးပါ။" },
      { en: "forward", my: "ထပ်ဆင့်ပို့သည်", ex: "Can you forward this email?", exMy: "ဒီအီးမေးလ်ကို ထပ်ဆင့်ပို့ပေးနိုင်မလား။" },
      { en: "appointment", my: "ချိန်းဆိုမှု", ex: "I have an appointment at three.", exMy: "သုံးနာရီမှာ ချိန်းထားတာရှိတယ်။" },
      { en: "confirm", my: "အတည်ပြုသည်", ex: "Please confirm your booking.", exMy: "ကြိုတင်မှာယူမှုကို အတည်ပြုပေးပါ။" },
      { en: "postpone", my: "ရွှေ့ဆိုင်းသည်", ex: "We had to postpone the meeting.", exMy: "အစည်းအဝေးကို ရွှေ့ဆိုင်းရတယ်။" },
      { en: "urgent", my: "အလွန်အမြန်လိုသော", ex: "This is an urgent request.", exMy: "ဒါက အလွန်အမြန်လိုတဲ့ တောင်းဆိုချက်ပါ။" },
      { en: "apologize", my: "တောင်းပန်သည်", ex: "I apologize for the delay.", exMy: "နှောင့်နှေးမှုအတွက် တောင်းပန်ပါတယ်။" },
      { en: "regarding", my: "...နဲ့ ပတ်သက်၍", ex: "I am writing regarding your order.", exMy: "သင့်အော်ဒါနဲ့ ပတ်သက်ပြီး ရေးနေတာပါ။" }
    ]
  },
  {
    id: "l12", unit: 4, video: 12, name: "Opinions & Ideas", mm: "အမြင်နှင့် စိတ်ကူး", icon: "💡",
    words: [
      { en: "opinion", my: "အမြင်", ex: "In my opinion, it is a good plan.", exMy: "ကျွန်တော့်/ကျွန်မအမြင်မှာ ဒါက ကောင်းတဲ့ အစီအစဉ်ပါ။" },
      { en: "suggest", my: "အကြံပြုသည်", ex: "I suggest we start early.", exMy: "စောစောစဖို့ အကြံပြုပါတယ်။" },
      { en: "agree", my: "သဘောတူသည်", ex: "I agree with you.", exMy: "မင်းနဲ့ သဘောတူတယ်။" },
      { en: "disagree", my: "သဘောမတူပါ", ex: "I disagree with that idea.", exMy: "အဲဒီစိတ်ကူးကို သဘောမတူဘူး။" },
      { en: "advantage", my: "အားသာချက်", ex: "One advantage is the low price.", exMy: "အားသာချက်တစ်ခုက ဈေးနှုန်းနည်းတာပါ။" },
      { en: "achieve", my: "အောင်မြင်သည်", ex: "You can achieve your goals.", exMy: "မင်းရဲ့ ပန်းတိုင်တွေကို အောင်မြင်နိုင်ပါတယ်။" },
      { en: "challenge", my: "စိန်ခေါ်မှု", ex: "Learning English is a challenge.", exMy: "အင်္ဂလိပ်စာ သင်ယူတာက စိန်ခေါ်မှုတစ်ခုပါ။" },
      { en: "improve", my: "တိုးတက်စေသည်", ex: "I want to improve my speaking.", exMy: "စကားပြောကို တိုးတက်စေချင်တယ်။" }
    ]
  },

  // ---------- Bonus topics (not on the path; level 1 unless the hub picks another) ----------
  {
    id: "daily", bonus: true, track: "Everyday", name: "Daily Life", mm: "နေ့စဉ်ဘဝ", icon: "🏠",
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
    id: "school", bonus: true, track: "Everyday", name: "School", mm: "ကျောင်း", icon: "🎒",
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
    id: "office", bonus: true, track: "Workplace", name: "Office", mm: "ရုံးလုပ်ငန်း", icon: "🏢",
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
    id: "email", bonus: true, track: "Workplace", name: "Email Basics", mm: "အီးမေးလ် အခြေခံ", icon: "📬",
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
    id: "song", bonus: true, track: "Music", name: "Song: Heaven", mm: "သီချင်းထဲက စာလုံးများ", icon: "🎵",
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
