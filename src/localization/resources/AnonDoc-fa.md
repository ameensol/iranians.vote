# ابزارهای آزادی
## راه حل برای رای‌گیری الکترونیکی

ژانویه ۲۰۲۴

***چکیده.*** این مقاله یک بررسی عمیق از روش‌ها و چارچوب‌های تکنولوژیکی پیشرفته‌ای که برای ساخت یک سیستم رای‌گیری دیجیتال قوی ضروری است، ارائه می‌دهد. تحلیل جامع ما شامل چندین مرحله حیاتی است: ایجاد پروفایل‌های شخصی رای‌دهندگان با استفاده از داده‌های گذرنامه بیومتریک، تولید و تأیید مدارک صلاحیت، و پیاده‌سازی مدارک قابل تأیید برای احراز هویت. علاوه بر این، ما به پیچیدگی‌های ایجاد نظرسنجی، تدوین فهرست‌های رای‌دهندگان، پیچیدگی‌های فرایند رای‌گیری، و روش‌های محاسبه نتایج پرداخته‌ایم. همچنین، ما یک بحث دقیق در مورد ادعاها و فرضیات امنیتی ارائه می‌دهیم تا اطمینان حاصل شود که تمامیت و امنیت فرآیند رای‌گیری در بالاترین سطح ممکن است.

## ایجاد پروفایل
اول از همه، سیستم‌های رای‌گیری اغلب باید به زیرساختی متکی باشند که منبعی از اطلاعات در مورد واقعی بودن، یکتایی و صلاحیت رای‌دهندگان باشد. یافتن منبعی که هر سه ویژگی را تأیید کند، در برخی موارد (از جمله در انتخابات در کشورهای استبدادی) بسیار دشوار است. به عنوان مثال انتخابات دولتی:

- یکتایی و واقعی بودن می‌تواند به داده‌های بیومتریک یا به طور دقیق‌تر، روش‌ها و پروتکل‌هایی که به آن‌ها نیاز دارند، متکی باشد.
- صلاحیت (شهروندی و سن) دشوارتر است زیرا دولت تنها منبع تأیید چنین پارامترهایی است.

### گذرنامه به عنوان تنظیم هویت کاربر
گذرنامه بیومتریک وسیله‌ای برای ارائه این سه ویژگی است (مسائل تقلب در گذرنامه‌ها و امکان چاپ آن‌ها توسط دولت را بعداً مورد بررسی قرار خواهیم داد) - این گذرنامه تأیید شهروندی (صلاحیت) را انجام می‌دهد، اطلاعات مربوط به سن فرد را ذخیره می‌کند (صلاحیت)، و از طریق شماره گذرنامه یک شناسه یکتا فراهم می‌کند (یکتایی). علاوه بر این، اطلاعات مربوط به مرجعی که آن را صادر کرده است (واقعیت) را ذخیره می‌کند. علاوه بر این، قابلیت‌های اضافی گذرنامه‌های بیومتریک (از جمله پیاده‌سازی برخی از روش‌های رمزنگاری) آن را به ابزاری نسبتاً قابل اعتماد برای سازماندهی انتخابات تبدیل می‌کند.

از اینجا به بعد، وقتی کلمه گذرنامه را به کار می‌بریم، به گذرنامه‌های بیومتریکی که استاندارد Doc 9303 Machine Readable Travel Documents را پیاده‌سازی می‌کنند، اشاره داریم [1].

### خواندن و رمزگشایی داده‌ها از گذرنامه
برای ایجاد یک پروفایل، کاربر باید اطلاعات گذرنامه را ارائه دهد یا 'بخواند'. برای این کار، کاربر می‌تواند از تلفن همراه خود با یک خواننده RFID استفاده کند (از اینجا به بعد، از کلمه "**دستگاه**" استفاده خواهیم کرد). فرایند خواندن شامل مراحل زیر است:
1. تولید کلیدها برای احراز هویت و دریافت داده‌ها از گذرنامه.
2. دریافت داده‌ها از گذرنامه و تأیید محلی آن‌ها.
3. ذخیره محلی داده‌های مربوط به گذرنامه در دستگاه.

<img src="images/tech-doc-en/1.png"/>

برای تولید کلیدهای احراز هویت و دریافت داده‌ها از تراشه گذرنامه:
1. دستگاه منطقه قابل خواندن ماشین گذرنامه (**MRZ**) را با استفاده از دوربین اسکن می‌کند.
2. دستگاه کلیدهای دسترسی پایه اسناد (**K<sub>**Enc**</sub>** و **K<sub>MAC</sub>**) را استخراج می‌کند.
3. دستگاه‌های دارای تراشه کلیدها را به یکدیگر احراز هویت می‌کنند و کلیدهای نشست KS<sub>Enc</sub>** و **KS<sub>MAC</sub>** را استخراج می‌کنند.

این کلیدها پیام‌ها بین دستگاه و گذرنامه را احراز هویت و رمزگذاری می‌کنند. دستگاه داده‌ها را از تراشه می‌خواند و به صورت محلی تأیید می‌کند:
1. دستگاه شیء امنیتی سند (**SOD**) را می‌خواند و گواهی امضاکننده سند (**CDS**) را دریافت می‌کند - گواهی کلید عمومی مرجعی که گذرنامه را صادر و تأیید کرده است.
2. دستگاه مسیر تأیید را از مرجع اعتماد (مرجع گواهی) به CDS با تأیید امضایی که SOD را پوشش می‌دهد، ایجاد و تأیید می‌کند.
3. دستگاه گروه‌های داده (**DGs**) را از گذرنامه می‌خواند.
4. دستگاه تأیید می‌کند که همه DGها معتبر و کامل هستند با مقایسه هش همه DGها با مقادیر هش مربوطه در SOD.

اگر همه تأییدیه‌ها به درستی انجام شود، به این معنی است که دستگاه گذرنامه معتبر را اسکن کرده است، بنابراین دستگاه لیست داده‌های زیر را ذخیره می‌کند:
1. DG1: جزئیات شخصی. این شامل اطلاعات بیوگرافی اولیه دارنده گذرنامه مانند نام، تاریخ تولد، ملیت و شماره گذرنامه است. این اطلاعات بسیاری از اطلاعات چاپ شده در صفحه داده‌های گذرنامه را منعکس می‌کند.
2. DG2: عکس چهره. این شامل پرتره دارنده گذرنامه است. در آینده، می‌توان روش حفاظت مبتنی بر آن را با تشخیص چهره و اثبات‌های ZKML گسترش داد.
3. DG7: امضا/تصویر دارنده. این گروه داده تصویر اسکن شده امضای دارنده گذرنامه را ذخیره می‌کند.
4. DG15: کلید عمومی احراز هویت فعال. این شامل کلید عمومی است که برای احراز هویت فعال استفاده می‌شود، یک ویژگی امنیتی برای جلوگیری از کپی غیرمجاز داده‌های گذرنامه.
5. مقادیر هش سایر DGها.
6. امضای سند که SOD (مقادیر هش همه DGها) را پوشش می‌دهد.
7. گواهی امضاکننده سند (CDS).

بیایید توجه کنیم که در آینده (یا برای برخی کشورها هم اکنون)، لیست گروه‌های داده بیومتریک می‌تواند گسترش یابد؛ DG2 و DG7 (پرتره و عکس امضای فیزیکی) در حال حاضر بیشترین حمایت را در گذرنامه‌ها دارند.

تمامی اقدامات در این فرآیند به صورت محلی و بدون دسترسی به اینترنت انجام می‌شود (مسیر تأیید نیز می‌تواند در دستگاه تأیید شود اگر برنامه مجموعه‌ای از گواهی‌های معتبر مرجع‌های اعتماد را ذخیره کند). هیچ داده شخصی به هیچ جایی به اشتراک گذاشته نمی‌شود یا در دسترس طرف‌های خارجی قرار نمی‌گیرد.

*توجه. ما این فرآیند را "ورود پروفایل" نامیده‌ایم، زیرا فرآیندهای ثبت‌نام، ورود و بازیابی وجود ندارند. کاربران می‌توانند پروفایل منحصربه‌فرد خود را فقط با استفاده از گذرنامه بیومتریک و فقط با خواندن داده‌ها از آن وارد کنند.*

### ایجاد کلیدها برای هویت دیجیتال
حالا، کاربر باید جفت کلید را برای مدیریت هویت ایجاد کند. اثبات صلاحیت کاربر به هویت ایجاد شده متصل خواهد شد و کلیدها برای تأیید اقدامات کاربر بر روی قراردادهای هوشمند استفاده خواهند شد. شما می‌توانید آن را به عنوان یک گواهی صادر شده توسط کاربر و واگذاری حقوق نمایندگی آن‌ها در لایه وب3 تصور کنید.

برای اهداف ذکر شده (و برای حفاظت از MITM)، کاربر باید تأیید کند که کلید تعریف شده توسط آن‌ها ایجاد و کنترل می‌شود. و دوباره از گذرنامه یا جریان احراز هویت فعال استفاده می‌کنند تا این امر ممکن شود.

این جریان شامل تولید یک چالش و امضای آن با کلید خصوصی ذخیره شده در قسمت امن گذرنامه است. کلید عمومی مربوطه در DG15 قرار دارد. به جای چالش، کاربر شناسه DID تولید شده را ارائه می‌دهد و درخواست امضای آن را می‌کند. شما می‌توانید این را به عنوان یک گواهی PK خودامضا شده با استفاده از راز گذرنامه تصور کنید.

<img src="images/tech-doc-en/2.png" />

بنابراین، هنگام انتقال DID به یک مصرف‌کننده خارجی (ارائه‌دهنده هویت یا قرارداد هوشمند)، تأییدکننده مطمئن خواهد شد که کاربر کلیدهای هویت خود را کنترل می‌کند. DID بر اساس استاندارد Iden3 تولید می‌شود[2].

### تولید اثبات صلاحیت
پس از ایجاد پروفایل رای‌گیری محلی، باید به مدارک قابل تأیید عمومی مرتبط شود که قراردادهای زنجیره‌ای می‌توانند آن را بدون افشای داده‌های شخصی تأیید کنند. ما تأیید صلاحیت را به شرح زیر تعریف می‌کنیم:
1. تأیید اینکه گذرنامه توسط یکی از مقامات مجاز صادر شده است (تأیید امض

ای SOD).
2. بررسی اینکه گروه DG1 شامل یک فیلد با شهروندی خاص است.
3. بررسی اینکه گروه DG1 شامل یک فیلد با تاریخ تولدی است که معیارهای لازم را برآورده می‌کند (18+).
4. بررسی اینکه گذرنامه منقضی نشده است.
5. تأیید اینکه DG1 که داده‌های شخصی را نگه می‌دارد، داده‌ها و DGهایی که داده‌های بیومتریک را نگه می‌دارند در SOD گنجانده شده‌اند.
6. تأیید اینکه DG15 در SOD گنجانده شده و کاربر از کلید خصوصی صحیح برای امضای DID استفاده کرده است (کنترل گذرنامه).

همه این تأییدیه‌ها می‌توانند بر روی قراردادها انجام شوند، اما برخی از داده‌ها منتشر خواهند شد (و تولید اثبات‌های مربوطه برای دستگاه‌های کاربر کار بسیار دشواری است). بنابراین، کاربر باید با یکی از ارائه‌دهندگان هویت تماس بگیرد و تأیید مشخص شده را انجام دهد (البته بدون افشای اطلاعات حساس).

برای این کار، کاربر یکی از ارائه‌دهندگان را انتخاب کرده و مجموعه داده‌های زیر را به آن‌ها ارسال می‌کند:
- DID + امضا توسط کلید خصوصی گذرنامه.
- کلید عمومی احراز هویت (DG15).
- هش‌های DG1، DG2 و DG7.
- اثبات اینکه DG1، DG2، DG7 و DG15 در SOD گنجانده شده‌اند (همه هش‌های دیگر یا zkp).
- اثبات بدون دانش (zero-knowledge) اینکه شهروندی در DG1 گنجانده شده است.
- اثبات بدون دانش (zero-knowledge) اینکه کاربر بالای 18 سال است: تاریخ تولد تعریف شده در DG1 کمتر از یک حد است.
- اثبات بدون دانش (zero-knowledge) اینکه تاریخ انقضای DG1 منقضی نشده است.
- امضای SOD و گواهی امضاکننده سند (CDS).

<img src="images/tech-doc-en/3.png" />

## دریافت مدارک قابل تأیید
وقتی ارائه‌دهنده هویت مجموعه داده مذکور را دریافت می‌کند، فرایند تأیید را آغاز می‌کند. اگر همه تأییدیه‌ها (که در بالا بحث شد) به درستی انجام شود، ارائه‌دهنده هویت مدارک قابل تأیید (**VC**) بر اساس استانداردهای W3C به کاربر صادر می‌کند. VC شامل موارد زیر است:
- مقادیر هش Poseidon از هش‌های DG2 و DG7.
- امضای SOD تولید شده توسط مرجع گواهی.
- گواهی امضاکننده سند (CDS).
- تاریخ انقضای گواهی.

<img src="images/tech-doc-en/4.png" />

این داده‌ها در دستگاه کاربر ذخیره می‌شوند. در همان زمان، ارائه‌دهنده هویت موارد زیر را ذخیره می‌کند:
- داده‌های SOD
- مقادیر هش Poseidon از هش‌های DG2 و DG7
- امضای SOD تولید شده توسط مرجع گواهی.
- گواهی امضاکننده سند (CDS).

اگر سوءرفتار دولتی رخ دهد، می‌توان از این داده‌ها برای اثبات آن استفاده کرد. وکتورهای حمله و روش‌های حفاظت در زیر (در بخش ثبت رای) بحث شده‌اند.

به عنوان یک پلتفرم اساسی برای صدور مدارک قابل تأیید، ما پیشنهاد می‌کنیم از پروتکل Rarimo[4] استفاده کنید. این پروتکل اجازه می‌دهد مدارک قابل تأیید صادر شوند و بعداً بتوان آن‌ها را به بلاکچین مورد نیاز منتقل کرد. این ویژگی بسیار مهمی است زیرا سازمان دهنده رای‌گیری ممکن است ایده‌ای نداشته باشد که فرآیند نهایی رای‌گیری در کجا انجام خواهد شد اما می‌خواهد کاربران بتوانند از پیش ثبت‌نام کنند. Rarimo اجازه می‌دهد وضعیت هویت جهانی را با یک پیام بین‌زنجیره‌ای منتقل کند اما نه اینکه هر VC جداگانه منتقل شود. در عین حال، فرآیند کاملاً غیرمتمرکز است - تنها حد نصاب مورد نیاز از اعتبارسنجان Rarimo (آستانه) باید پیام را امضا کنند تا آن را در شبکه مقصد تأیید کنند.

رویکرد مذکور اجازه می‌دهد تا استخرهای رای‌گیری به صورت انعطاف‌پذیر ساخته شوند با جدا کردن فرآیندهای مختلف و دریافت حداکثر ارزش از ترکیب تکنولوژی‌ها و شبکه‌ها (برخی از آن‌ها می‌توانند فرصت‌های منحصر به فردی برای سازماندهی فرآیند رای‌گیری دقیقاً در پشته فنی خود ارائه دهند - مانند کمک‌های مالی، و غیره).

## ایجاد استخر

در این بخش، ما به بررسی چگونگی ایجاد یک نمونه استخر می‌پردازیم. منظور ما از نمونه، مجموعه‌ای از قراردادهایی است که به کاربران اجازه می‌دهد از فرآیند رای‌گیری عبور کنند، از ایجاد استخر پاداش برای نودها و ثبت‌نام در رجیستری رای‌گیری تا رای‌گیری ناشناس و محاسبه نتایج.

### اجزای زیرساخت قرارداد رای‌گیری
هر کسی می‌تواند یک استخر ایجاد کند. برای این کار، باید متد کارخانه استخر را فراخوانی کنید و پارامترهای لازم را منتقل کنید. فراخوانی این متد ایجاد سه سیستم قرارداد را آغاز می‌کند:
1. قرارداد سرمایه‌گذاری در رای‌گیری (INV). برای جمع‌آوری بودجه برای جبران تأیید تراکنش‌های کاربران توسط نودهای پروکسی مستقل لازم است.
2. قرارداد ثبت‌نام رای‌دهندگان در استخر (REG). برای تأیید مالکیت کاربران از مدارک لازم و اضافه کردن یک موجودیت ناشناس به رجیستری رای‌دهندگان لازم است.
3. قرارداد رای‌گیری (VOT). برای ارسال رای‌های ناشناس و شمارش نتایج رای‌گیری لازم است.

<img src="images/tech-doc-en/5.png" />

## پارامترهای رای‌گیری

برای شروع ایجاد قراردادها، باید پارامترهای زیر را تعریف کنید:
1. بازه زمانی برای عملکرد هر یک از قراردادها. مهم است که درک کنید که قراردادها در مراحل مختلف رای‌گیری شرکت می‌کنند و به ترتیب اجرا می‌شوند INV-\>REG-\>VOT-\>INV. در پایان هر مرحله، یک شرط می‌تواند قرارداد را از شرکت در مرحله بعدی مسدود کند.
2. تعداد کل رای‌دهندگان (حداکثر) و **حداقل آستانه قابل قبول** - حداقل آستانه تعداد کل رای‌دهندگان؛ با رسیدن به تعداد ثبت‌نام‌ها، تصمیمی (به طور خودکار) برای رای‌گیری گرفته خواهد شد. حداقل تعداد رای‌دهندگان لازم برای تصمیم‌گیری نیز به طور جداگانه تعیین می‌شود (تعداد احزاب ثبت‌نام شده ممکن است بیش از تعداد رای‌دهندگان واقعی باشد).
3. هزینه متوسط تخمینی تراکنش‌های تعامل با قراردادها: ثبت‌نام در استخر و رای‌گیری.
4. نرخ پاداش نودها. این پارامتر می‌تواند بسته به میزان سرمایه‌گذاری در INV و تعداد رای‌دهندگان تنظیم شود.
5. گزینه‌های رای‌گیری و سایر گزینه‌ها (از جمله گزینه‌های چندگانه).
6. لیست ارائه‌دهندگان هویت معتمد که می‌توانند مدارک قابل تأیید به رای‌دهندگان صادر کنند و صلاحیت آن‌ها را تأیید کنند.
7. نوع مدارک مورد نیاز (طرح‌ها).

### جریان شروع قراردادها
مقادیر softcap و hardcap تعریف شده در قرارداد INV بر اساس پارامترهای تنظیم شده محاسبه خواهند شد. با رسیدن به تاریخ شروع شرکت سرمایه‌گذاری جمعی، می‌توانید متد مناسب در قرارداد INV را فراخوانی کرده و مقدار دلخواهی از وجوه را واریز کنید. وجوه به طور خودکار بین استخرها توزیع خواهند شد بسته به نسبت هزینه‌های تراکنش.

اگر با رسیدن به زمان تکمیل شرکت، softcap برآورده نشده باشد، قرارداد ثبت‌نام مستقر نمی‌شود و وجوه به سرمایه‌گذاران بازگردانده می‌شود. اگر در زمان تکمیل شرکت، softcap برآورده شده باشد (یا hardcap از پیش برآورده شده باشد)، این شروع ایجاد قرارداد REG را آغاز می‌کند.

پس از تاریخ شروع ثبت‌نام، کاربران خود (یا با استفاده از نودها) می‌توانند متدی را برای افزودن آن‌ها به لیست رای‌دهندگان فراخوانی کنند (لیست ناشناس است، اما بیشتر در مورد آن بعداً). در عین حال، کاربران پارامترهای سری را تعریف می‌کنند که به آن‌ها اجازه می‌دهد در آینده ثابت کنند که به لیست اضافه شده‌اند. در این مرحله، خروجی فرآیند ثبت‌نام لیست رای‌دهندگان ثبت‌نام شده است. اگر تعداد کاربران ثبت‌نام شده از یک حداقل آستانه قابل قبول کمتر باشد، استقرار قرارداد برای رای‌گیری واقعی رد می‌شود (به دلایلی که ممکن است این به طور اضافی بر رفع ناشناس بودن کاربران تأثیر بگذارد). با این حال، بسته به تعداد تراکنش‌های تأیید شده، نودها می‌توانند وجوه را از قرارداد INV بازپرداخت کنند.

قرارداد VOT به طور خودکار اگر حداقل آستانه قابل قبول برآورده شود، مستقر می‌شود. با

 استفاده از این قرارداد، کاربر می‌تواند رای نهایی را با اثبات ثبت‌نام ارسال کند. همان قرارداد نتایج نهایی رای‌گیری را محاسبه می‌کند، مگر اینکه گزینه‌ای برای افشای نتایج فقط پس از انجام فرآیند رای‌گیری وجود داشته باشد (با این حال، چنین فرآیندی نیاز به تنظیم کلید آستانه برای رمزگذاری آراء و اختیاری است).

### کاربر چگونه استخر مورد نیاز را پیدا می‌کند؟
برای ارائه اطلاعات به کاربر در مورد استخر رای‌گیری، کافی است آدرس قرارداد اصلی و شناسه استخر را ارائه دهید (به عنوان مثال، به شکل یک کد QR). برنامه باید از رابط کاربری صحیح برای ارتباط با متدهای قرارداد مناسب پشتیبانی کند.

## نودها
در شرایطی که ما می‌خواهیم از سیستم‌های غیرمتمرکز استفاده کنیم و حقوق رای‌گیری را به هر فرد واجد شرایط ارائه دهیم، یک لیست از چالش‌هایی که باید حل کنیم وجود دارد:
1. کاربران باید اقدامات قابل بازرسی و محافظت شده‌ای را انجام دهند که دارای برچسب زمانی هستند و نمی‌توان آن‌ها را حذف یا تغییر داد. اکنون، این با بلاکچین‌های عمومی ممکن است (با استفاده از تراکنش‌هایی با تماس‌های قرارداد هوشمند مناسب).
2. کاربران نمی‌خواهند (یا نمی‌توانند) هزینه تراکنش را بپردازند. علاوه بر این، برخی از کاربران (اکثریت) درباره وب3 اطلاعاتی ندارند - نصب MM و خرید ارز بومی برای آن‌ها یک چالش اضافی است.
3. برخی از خدمات می‌توانند تراکنش‌ها را به جای کاربران ارسال کنند (آن‌ها نمی‌توانند امضاها یا اثبات‌ها را تغییر دهند). راه‌اندازی یک سرویس نود تنها یک راه حل ممکن است اما قابل اعتماد نیست (احتمال بالای DoS).
4. اجازه دادن به هر طرف علاقه‌مند برای انتقال تراکنش‌های کاربران امکان‌پذیر است. اما بدیهی است که این نودها نمی‌خواهند هزینه کسی دیگر را بپردازند اگر سودآور نباشد.

در حالی که نودهای غیرمتمرکز امیدوار کننده به نظر می‌رسند، یک سوال حیاتی مطرح می‌شود: آیا می‌توانیم یک طرح ایجاد کنیم که خدمات پروکسی برخی پاداش‌ها یا مزایا را دریافت کنند وقتی که تراکنش‌های کاربران را تأیید می‌کنند؟

در همان زمان، برخی سازمان‌ها (ما آن‌ها را **سرمایه‌گذاران** زیر خواهیم نامید) می‌توانند کمک‌های مالی تحت شرایط زیر ارائه دهند:
- سرمایه‌گذاران باید علاقه‌مند به اقدامات انجام شده توسط کاربران نهایی باشند (درگیر کردن یک مخاطب بزرگ در برخی فرآیندها، مانند رای‌گیری).
- سرمایه‌گذاران باید مطمئن باشند که وجوه ارائه شده به طور منطقی و متناسب با درگیری نودها توزیع می‌شود.
- سرمایه‌گذاران باید بتوانند بررسی کنند که نودها فقط برای انجام اقدامات صحیح پاداش دریافت می‌کنند (تأیید تراکنش‌های معتبر که متدهای مربوط به برخی قراردادهای هوشمند را فراخوانی می‌کنند) و فقط پس از تأیید آن‌ها.

سرمایه‌گذاران، که در این زمینه به عنوان سرمایه‌گذاری جمعی عمل می‌کنند، مایل به ارائه حمایت مالی با انتظار برگزاری یک رویداد رای‌گیری عادلانه هستند. برای حل این چالش، ضروری است یک راه حل ایجاد کنیم که به کاربران، خدمات پروکسی و سرمایه‌گذاران به طور یکسان سود ببخشد، اطمینان حاصل شود که هر شرکت‌کننده‌ای ارزش را در این چرخه متصل پیدا کند.

بیایید ببینیم چگونه این به عنوان یک مؤلفه از ابزارهای رای‌گیری ما کار می‌کند.

### انگیزه‌دهی به نودها
پیش‌نیازها:
- یک رویداد رای‌گیری وجود دارد که ما می‌خواهیم تعداد زیادی رای‌دهنده داشته باشیم (نه فقط وب3).
- قرارداد رای‌گیری در بلاکچین عمومی وجود دارد و هر تراکنش با رای نیاز به پرداخت هزینه دارد.
- ما تعداد تقریبی کاربران را می‌دانیم - "**تعداد رای‌دهندگان مورد انتظار**".
- ما میانگین قیمت رای را می‌دانیم - "**قیمت متوسط رای**".
  - قیمت متوسط رای می‌تواند به صورت (مقدار گاز برای رای) \* (میانگین قیمت گاز برای مدتی) محاسبه شود.
  - در صورت انتخابات بزرگ، می‌تواند بر عملکرد کلی شبکه تأثیر بگذارد و قیمت متوسط رای را افزایش دهد (با رقابت برای جایگاه در بلاک).
- به علاوه، می‌توان یک ضریب ضریب را تنظیم کرد - این ضریب نمایش‌دهنده سودآوری تأیید رای خاص توسط نود است "**ضریب انگیزه**".

راه حل برای نودها به این شکل عمل می‌کند:
1. فرایند با ایجاد استخر با پاداش‌ها آغاز می‌شود که بین نودها توزیع می‌شود. پارامترهای زیر برای ایجاد استخر استفاده می‌شوند:
  1. تاریخ و زمانی که رای‌گیری آغاز می‌شود (یا تاریخ و زمان فرایند ثبت‌نام اگر وجود داشته باشد)
  2. softcap = **تعداد رای‌دهندگان مورد انتظار \* قیمت متوسط رای \* ضریب انگیزه**
    1. حداقل مقدار وجوه مورد نیاز برای شروع فرایند رای‌گیری.
  3. hardcap (در صورت نیاز)
    1. حداکثر مقدار وجوه مورد نیاز برای شروع فرایند رای‌گیری.
  4. پارامترهای قرارداد رای‌گیری (آدرس قرارداد، نام‌های متدها، و غیره).
2. سپس، سرمایه‌گذاران می‌توانند وجوه را به استخر اهدا کنند اگر با تمام داده‌های تعریف شده موافق باشند. فرآیند اهدا شبیه به یک کمپین سرمایه‌گذاری جمعی است: فرآیند رای‌گیری فقط در صورتی آغاز می‌شود که سقف نرم (softcap) برآورده شود. وجوه به حساب سرمایه‌گذاران بازگردانده می‌شود اگر سقف نرم در طول فرآیند رای‌گیری برآورده نشود.

<img src="images/tech-doc-en/6.png" />

3. هنگامی که فرآیند رای‌گیری آغاز می‌شود، کاربران رای‌های معتبر (می‌توانند ناشناس باشند) با امضاها/اثبات‌ها تولید می‌کنند و آن‌ها را به نودها ارسال می‌کنند. آن‌ها می‌توانند رای‌ها را به نودهای از پیش تعیین شده که به آن‌ها اعتماد دارند ارسال کنند یا اثبات را به شبکه ارسال کنند، جایی که هر نودی می‌تواند آن را بگیرد و در نهایت آن را به بلاکچین ارسال کند.

> <img src="images/tech-doc-en/7.png" />

4. در این شرایط، برای نودها سودآور نیست که منتظر بمانند تا بتوانند MEV را بر اساس هزینه تأیید تراکنش دریافت کنند اگر هزینه فعلی کمتر از پاداشی باشد که از استخر سرمایه‌گذاری دریافت می‌کنند (این مقدار برای همه واضح و قابل مشاهده است). هر نودی که تراکنش را ارسال می‌کند - سود خواهد برد.
  1. نودها می‌توانند با یکدیگر رقابت کنند - اشکالی ندارد. مهم‌ترین چیز - وجود حداقل یک نود است که می‌تواند ارزش را از تراکنش تأیید شده استخراج کند.
  2. نودها می‌توانند توافق کنند، فقط یک تراکنش را تأیید کنند و درآمد را بین همه نودها تقسیم کنند (بدون پرداخت هزینه‌ها). اما نمی‌توانند به یکدیگر اعتماد کنند که کسی تراکنش‌های دیگر را تأیید نکند و سهم خود را در استخر افزایش ندهد.
  3. در طول رای‌گیری، ممکن است نقطه‌ای وجود داشته باشد که ارسال تراکنش‌ها برای نودها غیرسودآور شود زیرا کل پاداش‌های استخر کمتر از کل هزینه گاز تراکنش‌ها است. پروکسی‌ها ممکن است همچنان به ارسال تراکنش‌ها ادامه دهند تا سهم بیشتری کسب کنند و ضررها را کاهش دهند. اما بهتر است یک ضریب انگیزه (INCENTIVE_COEFF) پایه‌ای داشته باشید که معقول باشد و به درستی محاسبه شود.
  4. هر پروکسی یک استراتژی برای چگونگی و زمان ارسال تراکنش‌ها برای استخراج حداکثر ارزش ایجاد می‌کند. اما بهتر است منتظر نماند - هر تراکنش تأیید شده سهم در استخر را افزایش می‌دهد و به پاداش‌های بالاتری منجر می‌شود.
5. پس از پایان فرآیند رای‌گیری، استخر پاداش بین تمام حساب‌هایی که تراکنش‌ها را در طول فرآیند رای‌گیری ارسال کرده‌اند تقسیم می‌شود. اندازه سهم به تعداد تراکنش‌های ارسال شده بستگی دارد.
  1. هر نود باید درخواست پاداش‌ها را آغاز کند، اما قرارداد می‌تواند به طور خودکار محاسبه کند که کدام EOAs تراکنش‌های مورد نیاز را ارسال کرده‌اند.

<img src="images/tech-doc-en/8.png" />

همچنین، یک توضیح کلی وجود دارد که چگونه عملیات وب3 می‌تواند بازپرداخت شود. اما گاهی اوقات، تعداد تراکنش‌ها در یک فرآیند بیشتر از یکی است. به عنوان

 مثال، ابزارهای آزادی نیاز دارند:
- تراکنش برای ایجاد VC (به طور بالقوه می‌تواند توسط ارائه‌دهندگان هویت پرداخت شود).
- تراکنش برای ثبت‌نام در استخر رای‌گیری (باید توسط نودها ارسال شود).
- تراکنش با رای (همچنین باید توسط نودها ارسال شود).

هزینه تراکنش‌ها در مراحل متفاوت است، بنابراین تقسیم استخر به دو زیر استخر با رابطه‌ای که بستگی به نوع تراکنش‌های ارسال شده توسط نودها دارد منطقی است.

به هر حال، رویکرد توضیح داده شده یک قرص نیست که تعامل بین کاربران و بلاکچین‌ها را جایگزین کند. تنها درها را برای استفاده از قابلیت‌های بلاکچین توسط کاربران که از کیف پول‌ها استفاده نمی‌کنند و در منطقه وب3 نیستند، باز می‌کند. جالب است که هر کاربر می‌تواند به عنوان نود عمل کند اگر بخواهد - در این صورت نیز برای تراکنش‌های خود بازپرداخت خواهند شد.

روش نودها به سختی به مشکلات مواجه شده در رای‌گیری غیرمتمرکز زنجیره‌ای پاسخ می‌دهد. این شامل سرمایه‌گذاری جمعی از سرمایه‌گذاران برای غلبه بر تردید کاربران در پوشش هزینه‌های تراکنش است. این رویکرد حداقل حد رای‌دهندگان را تعیین می‌کند، هدف سرمایه‌گذاری جمعی انعطاف‌پذیر را تنظیم می‌کند و اطمینان می‌دهد که رای‌گیری تنها زمانی شروع می‌شود که حمایت عمومی کافی وجود دارد. در طول رای، شرکت‌کنندگان تراکنش‌های خود را از طریق واسطه‌ها ارسال می‌کنند. استخر پاداش تشکیل شده به این ترتیب بر اساس حجم تراکنش‌ها به اشتراک گذاشته می‌شود. این استراتژی به طور مؤثر مسائل هزینه تراکنش را حل می‌کند و در عین حال مشارکت و نوآوری بیشتری را ترویج می‌دهد. این یک گزینه جذاب برای مدیریت رای‌گیری غیرمتمرکز زنجیره‌ای در حوزه بلاکچین ارائه می‌دهد.

## ثبت‌نام به عنوان رای‌دهنده در استخر
این روش برای ناشناس‌سازی رای‌های کاربران بعدی طراحی شده است - در نهایت، هیچ‌کس نمی‌تواند افزودن تراکنش‌ها به لیست رای‌دهندگان را با تراکنش‌های رای‌ها مرتبط کند[5]. برای افزودن کاربر به رجیستری، مراحل زیر را دنبال کنید:
1. کاربر **Nullifier** و **Secret** - دو مقدار خصوصی تولید می‌کند.
2. کاربر **Identifier** = Poseidon(Nullifier, Secret) را محاسبه می‌کند.
3. کاربر اثبات اینکه حق رای دارد (مدرک قابل تأیید معتبر و غیر منقضی) و لیست داده‌های زیر را ارسال می‌کند:
  1. مقادیر هش Poseidon از هش‌های DG2 و DG7. این داده‌ها برای بررسی یکتایی کاربر لازم است و می‌توان از آن به عنوان اثبات تقلب استفاده کرد اگر کسی بخواهد رای کاربر را خراب کند.
  2. اثبات دانش هش‌های DG2 و DG7. برای این کاربر باید از داده‌های SOD گذرنامه استفاده کند.
  3. امضای SOD تولید شده توسط مرجع گواهی.
  4. گواهی امضاکننده سند (CDS).
4. کاربر شناسه‌ای را ارائه می‌دهد که به لیست درخت مرکل افزوده می‌شود (اگر همه تأییدیه‌ها گذرانده شوند).
5. ریشه درخت مرکل به‌روزرسانی می‌شود.

<img src="images/tech-doc-en/9.png" />

در این مرحله، باید توجه داشت که کاربر باید مقادیر Nullifier و Secret را در دستگاه ذخیره کند - دانستن آن‌ها به کاربر اجازه می‌دهد در مرحله نهایی رای دهد. مهم است که توجه داشته باشید که پس از افزودن یک برگ به درخت، کاربر می‌تواند تمام داده‌های مرتبط با گذرنامه خود را حذف کند و حتی از یک دستگاه جداگانه که به داده‌های گذرنامه او دسترسی نداشته است برای مرحله نهایی رای‌دهی استفاده کند. تنها چیزی که برای این کار نیاز دارد، دانش Nullifier و Secret است.

## فرآیند رای‌گیری
برای ارسال رای، کاربر باید اقدامات زیر را انجام دهد:
1. تشکیل بدن رای، که نشان دهنده گزینه انتخاب شده رای است (رای).
2. محاسبه شاخه مرکل برای برگ افزوده شده به دلیل ثبت‌نام کاربر.
3. محاسبه اثبات بدون دانش:
  1. Nullifier، ریشه مرکل و رای به عنوان ورودی‌های عمومی؛
  2. شناسه، شاخه مرکل و سری به عنوان ورودی‌های خصوصی.
  3. منطق تأیید:
    1. شناسه == Poseidon(Nullifier, Secret)؛
    2. شامل شدن شناسه در درخت مرکل با ریشه مربوطه با استفاده از شاخه مرکل.
4. اثبات را به همراه بدن رای تجمیع کرده و آن‌ها را به یکی از نودها ارسال می‌کند. نود اثبات رای را در یک تراکنش بسته‌بندی کرده و به شبکه ارسال می‌کند.
5. قرارداد VOT اثبات را تأیید می‌کند و رای را در نظر می‌گیرد اگر درست باشد.

<img src="images/tech-doc-en/10.png" />

> توجه: پارامتر رای به طور مستقیم در فرآیند تأیید شرکت نمی‌کند. از آن برای افزودن یک محدودیت و اتصال رای به اثبات استفاده می‌شود. تغییر رای باعث بی‌اعتباری کل اثبات خواهد شد. در غیر این صورت، طرف‌های مخرب می‌توانند یک اثبات را رهگیری کرده و رای را با یک رای جدید جایگزین کنند.

## محاسبه نتایج
نتایج رای‌گیری توسط حالت قرارداد هوشمند مربوطه ذخیره می‌شود. اگر بلاکچین بدون اجازه به عنوان زیرساخت برای استقرار استخر استفاده شود، این بدان معناست که هر کسی می‌تواند آن را بررسی کند و مطمئن باشد که نتیجه نهایی با تمام تراکنش‌های انجام شده مطابقت دارد.

یک حالت وجود دارد که اجازه می‌دهد نتایج رای‌گیری قبل از پایان آن پنهان شود. این رویکرد نیاز به تنظیم اعتماد بین حد نصاب شرکت‌کنندگان دارد. این حد نصاب کلید عمومی برای رمزگذاری آراء توسط کاربران نهایی تشکیل می‌دهد. هنگامی که فرآیند رای‌گیری به پایان رسید، این طرف‌ها می‌توانند اسرار خود را فاش کنند و هر کسی (اگر حد نصاب برآورده شود) می‌تواند آراء را رمزگشایی کند و نتیجه نهایی رای‌گیری را محاسبه کند.

اگر نتایج به طور مداوم باز باشند، منطق اضافی بر اساس حالت نهایی قرارداد رای‌گیری ساخته می‌شود، به عنوان مثال، راه‌اندازی یک اقدام. گزینه رمزگذاری نیز ممکن است، اما نیاز به یک راه حل پیچیده‌تر، مانند رمزگذاری همومورفیک دارد.

## ادعاها و فرضیات امنیتی
لیستی از ادعاها و فرضیات امنیتی ابزارهای آزادی وجود دارد:
- فقط شخصی که فیزیکی صاحب گذرنامه بیومتریک است می‌تواند مالکیت DID را تأیید کند.
- فقط کاربران ثبت‌نام شده در قرارداد REG (با برگ‌های درخت مناسب) می‌توانند در رای‌گیری شرکت کنند.
- ثبت‌نام و رای‌دهی می‌تواند بر روی دستگاه‌های جداگانه انجام شود (از طریق صادرات Nullifier و Secret). در این صورت، ترمینال رای‌دهی هیچ اطلاعی از شخص ندارد جز اینکه حق رای دارد.
- کاربران نمی‌توانند دو بار با استفاده از همان برگ در درخت رای دهند.
- کاربران نمی‌توانند در استخر با استفاده از هش‌های هرگونه اعتبار بیومتریک یا با امضای همان مرجع گواهی ثبت‌نام شوند.
- اگر کلید احراز هویت در گذرنامه تکراری جایگزین شده باشد - مالک واقعی می‌تواند آن را اثبات کند و مرجع گواهی را بی‌اعتبار کند.
- رای تنها با دانش Nullifier و Secret قابل ارسال است. اگر کاربر آن را از دست بدهد - هیچ راهی برای بازیابی رای وجود ندارد.
- رای نمی‌تواند ارسال شود اگر Nullifier یا Secret ناشناخته باشد.
- امکان جایگزینی بدن رای در رای وجود ندارد در حالی که اثبات سازگاری حفظ شود.
- هیچ راهی برای ردیابی ارتباط بین ثبت‌نام و رای‌گیری وجود ندارد اگر EOAs / نودهای مختلف استفاده شوند.
- ارائه‌دهندگان هویت نمی‌توانند داده‌های شخصی کاربران را بدون دسترسی به پایگاه‌های داده مناسب بازیابی کنند (حمله دیکشنری).

## لینک‌ها

[1] Doc 9303 Machine Readable Travel Documents
[2] Iden3
[3] W3C
[4] Rarimo
[5] Tornado Cash