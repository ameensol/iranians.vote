<template>
  <div class="faq">
    <h2 class="faq__title">
      {{ $t('faq.title') }}
    </h2>

    <div class="faq__content">
      <template
        v-for="(item, idx) in faqContent.slice(0, questionsToShow)"
        :key="idx"
      >
        <div class="faq__item">
          <accordion :key="idx" class="faq__accordion">
            <template #head="{ accordion }">
              <div class="faq__accordion-head" @click="accordion.toggle">
                <div class="faq__accordion-head-text">
                  {{ item.head }}
                </div>
                <div class="faq__accordion-head-indicator">
                  <icon
                    class="faq__accordion-head-indicator-icon"
                    :class="{
                      'faq__accordion-head-indicator-icon--active':
                        accordion.isOpen,
                    }"
                    :name="$icons.chevronDown"
                  />
                </div>
              </div>
            </template>
            <template #default>
              <div class="faq__accordion-body">
                <vue-markdown
                  class="faq__accordion-body-text"
                  :source="item.body"
                  :plugins="plugins"
                  :options="{
                    html: true,
                    breaks: true,
                    typographer: true,
                    linkify: true,
                  }"
                />
              </div>
            </template>
          </accordion>
          <div class="faq__divider" />
        </div>
      </template>

      <collapse :is-shown="isAllQuestionsShown">
        <div class="faq__content-hidden-questions">
          <template
            v-for="(item, idx) in faqContent.slice(
              questionsToShow,
              faqContent.length - 1,
            )"
            :key="idx"
          >
            <div class="faq__item">
              <accordion :key="idx" class="faq__accordion">
                <template #head="{ accordion }">
                  <div class="faq__accordion-head" @click="accordion.toggle">
                    <div class="faq__accordion-head-text">
                      {{ item.head }}
                    </div>
                    <div class="faq__accordion-head-indicator">
                      <icon
                        class="faq__accordion-head-indicator-icon"
                        :class="{
                          'faq__accordion-head-indicator-icon--active':
                            accordion.isOpen,
                        }"
                        :name="$icons.chevronDown"
                      />
                    </div>
                  </div>
                </template>
                <template #default>
                  <div class="faq__accordion-body">
                    <vue-markdown
                      class="faq__accordion-body-text"
                      :source="item.body"
                      :plugins="plugins"
                      :options="{
                        html: true,
                        breaks: true,
                        typographer: true,
                        linkify: true,
                      }"
                    />
                  </div>
                </template>
              </accordion>
              <div class="faq__divider" />
            </div>
          </template>
        </div>
      </collapse>

      <button
        class="faq__show-btn"
        @click="isAllQuestionsShown = !isAllQuestionsShown"
      >
        {{ isAllQuestionsShown ? $t('faq.hide-more-btn') : $t('faq.more-btn') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Accordion, Collapse, Icon } from '@/common'
import VueMarkdown from 'vue-markdown-render'
import MarkdownItAnchor from 'markdown-it-anchor'
import { ref } from 'vue'

const questionsToShow = 5

const isAllQuestionsShown = ref(false)

const plugins = [MarkdownItAnchor]

const faqContent = [
  {
    head: 'کدام گذرنامه برای رای‌گیری قابل استفاده است؟',
    body: 'فقط گذرنامه بیومتریک خارجی که اعتبار آن در تاریخ رای‌گیری به پایان نمی‌رسد، برای رای‌گیری قابل استفاده است. گذرنامه عادی به دلیل فرآیند پیچیده تایید اصالت قابل استفاده نیست.',
  },
  {
    head: 'چه داده‌هایی از گذرنامه برای ایجاد گذرنامه پردازش می‌شود؟',
    body: 'فقط داده‌های زیر برای ثبت‌نام رای‌گیری استفاده می‌شود: ملیت؛ اثبات بر اساس [Zero-Knowledge](https://en.wikipedia.org/wiki/Zero-knowledge_proof) که شما در زمان رای‌گیری بیش از ۱۸ سال دارید؛ گواهی صادر کننده. نام، نام خانوادگی، تاریخ تولد و سایر داده‌های شخصی شما منتقل نمی‌شود و فقط روی تلفن شما باقی می‌ماند.',
  },
  {
    head: 'منظور از ناشناس‌سازی داده‌های گذرنامه چیست؟',
    body: 'هنگام دریافت گذرنامه پس از ثبت‌نام در سرویس رای‌گیری، داده‌های گذرنامه با استفاده از [هش](https://en.wikipedia.org/wiki/Hash_function) و [نمک رمزنگاری](https://en.wikipedia.org/wiki/Salt_(cryptography)) هش می‌شوند. این امر امکان بررسی یکتایی گذرنامه را بدون امکان ردیابی داده‌های شخصی رای‌دهندگان فراهم می‌کند.',
  },
  {
    head: 'آیا ممکن است با دانستن داده‌های گذرنامه، متوجه شویم که فرد برای رای‌گیری ثبت‌نام کرده است؟',
    body: 'خیر، زیرا داده‌ها در سرویس ثبت‌نام ناشناس‌سازی می‌شوند (نگاه کنید به بالا). حتی با دسترسی به کل پایگاه داده گذرنامه‌ها، امکان شناسایی رای‌دهندگان ثبت‌نام‌شده وجود ندارد.',
  },
  {
    head: 'بلاکچین چیست و چرا به عنوان پلتفرم رای‌گیری استفاده می‌شود؟',
    body: 'به زبان ساده، بلاکچین یک پایگاه داده عمومی غیرمتمرکز است که تاریخچه اقدامات در آن قابل جعل نیست. بلاکچین برای رای‌گیری بسیار مناسب است زیرا تقریباً امکان جعل رای‌ها در آن وجود ندارد و نتایج رای‌گیری شفاف و برای همه قابل دسترسی است.',
  },
  {
    head: 'چه نوع تلفنی برای اسکن گذرنامه مناسب است؟',
    body: 'برای اسکن گذرنامه، به یک تلفن اندروید یا iOS با تراشه NFC داخلی نیاز دارید (که برای پرداخت‌های بدون تماس در فروشگاه‌ها استفاده می‌شود).',
  },
  {
    head: 'چرا دوربین را روی صفحه گذرنامه قرار دهید اگر داده‌ها روی تراشه هستند؟',
    body: 'داده‌های گذرنامه روی تراشه رمزگذاری شده‌اند و برنامه از کد روی صفحه گذرنامه با عکس برای رمزگشایی استفاده می‌کند.',
  },
  {
    head: 'آیا ممکن است گذرنامه در حین اسکن جعل شود؟',
    body: 'برای تایید اصالت گذرنامه، از یک ثبت عمومی از صادرکنندگان گذرنامه استفاده می‌شود (سیستمی مشابه در فرودگاه‌ها استفاده می‌شود). برای جعل گذرنامه، نیاز به دسترسی به مرجع صادر کننده گذرنامه است.',
  },
  {
    head: 'آیا ممکن است متوجه شویم که یک کاربر ناشناس خاص به کدام کاندیدا رای داده است؟',
    body: 'خیر، رای کاربر با سایر آرا در رای‌گیری مخلوط می‌شود. حتی خود رای‌دهنده نیز نمی‌تواند ببیند که به چه کسی رای داده است اگر از برنامه خارج شود یا آن را حذف کند.',
  },
  {
    head: 'کدام بلاکچین برای رای‌گیری استفاده می‌شود؟',
    body: 'پروتکل [Rarimo](https://docs.rarimo.com/) برای شناسایی و ناشناس‌سازی داده‌ها استفاده می‌شود و هر بلاکچین EVM برای رای‌گیری قابل استفاده است.',
  },
  {
    head: 'آیا ممکن است با یک گذرنامه اما تلفن‌های مختلف دو بار رای داد؟',
    body: 'خیر، زیرا هنگام ثبت‌نام برای رای‌گیری، داده‌های ناشناس گذرنامه برای یکتایی بررسی می‌شود، بنابراین امکان دو بار رای دادن وجود ندارد. علاوه بر این، اگر شما برای رای‌گیری ثبت‌نام کرده و دسترسی به تلفن خود را از دست بدهید، نمی‌توانید در این رای‌گیری با تلفن دیگری شرکت کنید.',
  },
  {
    head: 'چه کسی رای‌گیری را ایجاد کرده و لیست کاندیداها را تعیین می‌کند؟',
    body: 'سازمان‌دهنده رای‌گیری حق دارد برگه رای با کاندیداها را به صورت آنلاین منتشر کند که سپس در برنامه به رای‌دهندگان نمایش داده می‌شود. کاربران مخرب نمی‌توانند لیست رای‌ها را جعل کرده یا اسپم کنند.',
  },
  {
    head: 'تراکنش‌های بلاکچین هزینه دارند؛ چه کسی هزینه رای‌گیری را پرداخت می‌کند؟',
    body: 'هزینه‌ها توسط سرور پروکسی (سازمان‌دهنده رای‌گیری) پرداخت می‌شود که تراکنش‌ها را تشکیل داده و به شبکه ارسال می‌کند. سرور نمی‌تواند هویت رای‌دهنده را فاش کرده یا انتخاب او را تغییر دهد، زیرا رای رای‌دهنده با ادغام در اثبات رمزنگاری محافظت می‌شود. هرگونه تلاش برای تغییر رای به‌طور خودکار این اثبات را باطل می‌کند.',
  },
]
</script>

<style lang="scss">
.faq {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: toRem(68) 0;
}

.faq__title {
  text-align: center;
}

.faq__content {
  display: flex;
  flex-direction: column;
  margin: toRem(48) auto 0;
  max-width: toRem(840);
  width: 100%;
  border: toRem(1) solid rgba(0, 0, 0, 0.05);
  border-radius: toRem(8);
  padding: toRem(24);
}

.faq__item {
  display: flex;
  flex-direction: column;
}

.faq__accordion {
  width: 100%;
}

.faq__accordion-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: toRem(20) 0;
  font-size: toRem(16);
  line-height: 1.25;
  font-weight: 700;
}

.faq__accordion-head-indicator-icon {
  transition: transform 0.3s;

  @include static-size(toRem(16));

  &--active {
    transform: rotate(180deg);
  }
}

.faq__accordion-body {
  padding-bottom: toRem(20);
}

.faq__accordion-body-text {
  font-size: toRem(14);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-primary-main);

  a {
    font: inherit;
    color: inherit;
    text-decoration: underline;
    font-weight: 600;
  }

  p {
    font: inherit;
    color: inherit;
  }
}

.faq__divider {
  width: 100%;
  height: toRem(1);
  background: rgba(var(--black-rgb), 0.1);
}

.faq__show-btn {
  font-family: 'Vazir';
  align-self: center;
  color: var(--text-primary-main);
  font-size: toRem(16);
  font-weight: 400;
  line-height: 1.2;
  margin: toRem(24) auto;
}
</style>
