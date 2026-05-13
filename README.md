# تَعليم الحُروف العَرَبيّة لِلأَطفال

تطبيق تفاعلي لتعليم الأطفال (4–7 سنوات) الحروف العربية. يتضمن:

- شبكة الـ28 حرفًا مع التقدّم والنجوم
- صفحة تفصيلية لكل حرف: النطق، الحركات الثلاث (فتحة/ضمّة/كسرة)، أشكال الاتصال (مفرد/بداية/وسط/نهاية)
- شاشة كتابة بالتتبّع (تتبّع، نقاط مرقّمة، تلوين)
- لعبة اختيار الحرف
- ملف الإنجازات والشارات
- شخصية مرشدة (بومة / ببغاء / قطّة)
- 4 خلفيات قابلة للتبديل (حلوى/بحر/غروب/مرج) و5 خطوط

## التشغيل المحلي

```bash
npm install
npm run dev
```

ثم افتح `http://localhost:3000`.

## النشر على Vercel

ربط الـrepo مباشرة بـVercel — يبني تلقائيًا (Next.js 14, App Router).

## التقنية

- Next.js 14 (App Router) + React 18
- TypeScript
- CSS عادي (بدون Tailwind) مع متغيّرات CSS وRTL
- خطوط Google Fonts (Tajawal, Lalezar, Noto Naskh Arabic, …)
- Web Speech API للنطق (يُستبدل لاحقًا بتسجيلات صوتية حقيقية)

## بنية المشروع

```
app/
  layout.tsx           — RTL، خطوط
  page.tsx             — الـEntry
  globals.css          — كل الستايلات
  components/
    App.tsx            — التطبيق + التنقّل بين الشاشات
    HomeScreen.tsx
    LetterScreen.tsx
    WritingScreen.tsx
    GameScreen.tsx
    ProfileScreen.tsx
    Mascot.tsx
    AppBar.tsx
    BottomTabs.tsx
    Celebrate.tsx
    TweaksPanel.tsx
lib/
  data.ts              — الـ28 حرفًا + الحركات + أشكال الاتصال
```
