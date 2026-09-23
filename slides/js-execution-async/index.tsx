import type { CSSProperties, ReactNode } from 'react';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import callbackHellImage from './assets/callback-hell.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F3EB', text: '#252620', accent: '#F1D54A' },
  fonts: {
    display: '"Helvetica Neue", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Helvetica Neue", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 144, body: 36 },
  radius: 8,
};

const ink = 'var(--osd-text)';
const paper = 'var(--osd-bg)';
const yellow = 'var(--osd-accent)';
const muted = '#74766A';
const rule = '#D4D4C8';
const surface = '#EAE9DF';
const codeBg = '#282B26';
const mono = '"SFMono-Regular", Consolas, "Liberation Mono", monospace';
const body: CSSProperties = { fontSize: 'var(--osd-size-body)', lineHeight: 1.55, margin: 0 };
const label: CSSProperties = { fontSize: 23, fontFamily: mono, letterSpacing: 1.5, lineHeight: 1.3 };
const root: CSSProperties = {
  width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box',
  background: paper, color: ink, fontFamily: 'var(--osd-font-body)',
};

export const transition: SlideTransition = {
  duration: 200,
  exit: { duration: 140, easing: 'ease-in', keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 200, delay: 60, easing: 'ease-out', keyframes: [{ opacity: 0 }, { opacity: 1 }] },
};

const Footer = ({ section }: { section: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer style={{ position: 'absolute', left: 120, right: 120, bottom: 48, borderTop: `1px solid ${rule}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: muted, fontSize: 22 }}>
      <span>DAY 01 / KYLEN <span style={{ marginLeft: 36 }}>{section}</span></span>
      <span style={{ fontFamily: mono }}>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
};

const Frame = ({ eyebrow, title, children, section = 'JAVASCRIPT', titleSize = 76 }: { eyebrow: string; title: ReactNode; children: ReactNode; section?: string; titleSize?: number }) => (
  <section style={root}>
    <header style={{ position: 'absolute', left: 120, right: 120, top: 106 }}>
      <div style={{ ...label, color: muted, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 30, height: 12, background: yellow }} />{eyebrow}
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: titleSize, fontWeight: 800, letterSpacing: -2.4, lineHeight: 1.15, margin: '26px 0 0' }}>{title}</h1>
    </header>
    <main style={{ position: 'absolute', left: 120, right: 120, top: 304, bottom: 136 }}>{children}</main>
    <Footer section={section} />
  </section>
);

const Code = ({ children, title = 'JAVASCRIPT', language = 'JS', size = 32, style }: { children: string; title?: string; language?: 'JS' | 'TS' | 'JSON'; size?: number; style?: CSSProperties }) => (
  <div style={{ background: codeBg, color: '#F5F3EB', borderRadius: 'var(--osd-radius)', padding: '28px 32px 30px', boxSizing: 'border-box', ...style }}>
    <div style={{ ...label, fontSize: 22, color: '#BCBFB1', borderBottom: '1px solid #494D41', paddingBottom: 15, marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
      <span>{title}</span><span style={{ color: yellow }}>{language}</span>
    </div>
    <pre style={{ margin: 0, fontFamily: mono, fontSize: size, lineHeight: 1.4, whiteSpace: 'pre', fontWeight: 400, tabSize: 2 }}><code>{children}</code></pre>
  </div>
);

const Note = ({ tag, title, children }: { tag: string; title: ReactNode; children?: ReactNode }) => (
  <div style={{ borderTop: `3px solid ${ink}`, paddingTop: 24 }}>
    <div style={{ ...label, color: muted, marginBottom: 22 }}>{tag}</div>
    <h3 style={{ fontSize: 40, lineHeight: 1.35, margin: '0 0 22px', fontWeight: 750 }}>{title}</h3>
    {children && <div style={{ ...body, color: muted }}>{children}</div>}
  </div>
);

const Strip = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ background: yellow, color: '#252620', padding: '18px 28px', fontSize: 34, lineHeight: 1.45, ...style }}>{children}</div>
);

const Arrow = ({ vertical = false }: { vertical?: boolean }) => <span aria-hidden="true" style={{ color: muted, fontSize: 44, lineHeight: 1 }}>{vertical ? '↓' : '→'}</span>;

const QueueItem = ({ children, accent = false }: { children: ReactNode; accent?: boolean }) => (
  <div style={{ border: `1px solid ${accent ? '#C5AE37' : rule}`, padding: '20px 24px', background: accent ? yellow : paper, fontSize: 32, lineHeight: 1.4, fontFamily: mono }}>{children}</div>
);

const Result = ({ value, kind }: { value: string; kind: string }) => (
  <div style={{ borderTop: `4px solid ${ink}`, paddingTop: 24, minWidth: 220 }}>
    <div style={{ fontFamily: mono, fontSize: 126, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
    <div style={{ ...label, color: muted, marginTop: 18 }}>{kind}</div>
  </div>
);

const Process = ({ n, title, children, accent = false }: { n: string; title: string; children: ReactNode; accent?: boolean }) => (
  <div style={{ background: accent ? yellow : surface, padding: 32, boxSizing: 'border-box', minHeight: 310 }}>
    <div style={{ ...label, color: accent ? '#6C5F1D' : muted, marginBottom: 30 }}>{n}</div>
    <h3 style={{ fontSize: 40, lineHeight: 1.3, margin: '0 0 20px' }}>{title}</h3>
    <p style={{ ...body, fontSize: 32 }}>{children}</p>
  </div>
);

// The teaching order connects asynchronous execution, error handling, and data contracts.
const Cover: Page = () => (
  <section style={root}>
    <div style={{ position: 'absolute', top: 128, left: 120, ...label, color: muted }}>DAY 01 / 給初次接觸 JS 的後端工程師 / KYLEN</div>
    <div aria-hidden="true" style={{ position: 'absolute', top: 270, right: 120, width: 260, height: 420, background: yellow, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24, boxSizing: 'border-box', fontFamily: mono, fontSize: 110, fontWeight: 800, color: '#252620' }}>JS</div>
    <h1 style={{ position: 'absolute', top: 298, left: 120, maxWidth: 1350, margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 850, lineHeight: 1.15, letterSpacing: -5 }}>JavaScript 執行<br />TypeScript 型別</h1>
    <p style={{ position: 'absolute', left: 126, top: 742, margin: 0, fontSize: 36, lineHeight: 1.5, color: muted }}>判斷非同步效能、錯誤傳遞，以及資料契約是否可靠。</p>
    <Footer section="從 Event Loop 到 TypeScript" />
  </section>
);

const Agenda: Page = () => (
  <Frame eyebrow="今天的路線 / 60 分鐘" title="讀懂語法，再判斷工程上的取捨。" section="JAVASCRIPT → TYPESCRIPT">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 20 }}>
      <Process n="01 / 非同步流程 · 25 MIN" title="怎麼寫，怎麼取捨？">基礎寫法 18 分鐘<br />並行與錯誤 7 分鐘</Process><Arrow />
      <Process n="02 / 執行順序 · 10 MIN" title="何時執行，誰被卡住？">Event Loop<br />非同步與同步計算</Process><Arrow />
      <Process n="03 / 型別契約 · 20 MIN" title="哪些資料假設可信？" accent>API 結果建模<br />型別檢查與 runtime 驗證</Process>
    </div>
    <Strip style={{ marginTop: 58 }}>JavaScript 35 分鐘 · TypeScript 20 分鐘 · Q&A／緩衝 5 分鐘</Strip>
  </Frame>
);

const CallbackBasics: Page = () => (
  <Frame eyebrow="01 / 用一個例子看懂 CALLBACK" title="傳函式，與現在呼叫函式，是兩件事。" titleSize={70} section="CALLBACK">
    <div style={{ display: 'grid', gridTemplateColumns: '1060px 1fr', gap: 64 }}>
      <Code title="把 multiNum 當成 callback 傳入" size={32}>{`const multiNum = num => console.log(num * 10);

function addNum(a, b, callback) {
  callback(a + b);
}
addNum(6, 2, multiNum);`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 28 }}>
        <Note tag="multiNum" title="把函式交出去">由 addNum 決定何時呼叫。</Note>
        <Note tag="multiNum(8)" title="立刻呼叫，印出 80">此例 callback(8) 就是它。</Note>
      </div>
    </div>
    <Strip style={{ marginTop: 28 }}>這個 callback 直接執行；callback 本身不代表非同步。</Strip>
  </Frame>
);

const TimerCallback: Page = () => (
  <Frame eyebrow="01 / 從直接呼叫，到稍後執行" title="setTimeout：先安排，稍後再呼叫函式。" titleSize={70} section="同步與非同步">
    <div style={{ display: 'grid', gridTemplateColumns: '1070px 1fr', gap: 64 }}>
      <Code size={36} title="相同的傳函式方式，這次交給計時器">{`console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("4");`}</Code>
      <Note tag="setTimeout(函式, 延遲毫秒)" title="把計時交給瀏覽器">() =&gt; ... 是沒有參數的函式。<br /><br />到時候要做的事：<br />印出 2。</Note>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 48, marginTop: 40 }}>
      <span style={{ ...body, color: muted }}>執行結果</span><strong style={{ fontFamily: mono, fontSize: 80, lineHeight: 1.1 }}>1 → 4 → 2</strong>
    </div>
    <Strip style={{ marginTop: 32 }}>0 毫秒也要等目前程式跑完；不會在這一行停住等 callback。</Strip>
  </Frame>
);

const MainThread: Page = () => (
  <Frame eyebrow="01 / 接上執行模型" title="瀏覽器主執行緒，同一時間執行一段 JS。" titleSize={68} section="同步與非同步">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 1fr', gap: 24, alignItems: 'center' }}>
      <div style={{ padding: 36, background: surface, height: 360, boxSizing: 'border-box' }}>
        <div style={{ ...label, color: muted }}>主執行緒 / MAIN THREAD</div>
        <h2 style={{ fontSize: 48, lineHeight: 1.3, margin: '28px 0 24px' }}>先完成目前程式。</h2>
        <p style={body}>呼叫堆疊（Call Stack）<br />記錄目前函式呼叫的執行進度。</p>
      </div><Arrow />
      <div style={{ padding: 36, border: `2px solid ${rule}`, height: 360, boxSizing: 'border-box' }}>
        <div style={{ ...label, color: muted }}>瀏覽器提供的功能 / WEB APIs</div>
        <h2 style={{ fontSize: 48, lineHeight: 1.3, margin: '28px 0 24px' }}>處理計時、網路等工作。</h2>
        <p style={body}>條件就緒後，安排後續程式，<br />等主執行緒能執行時再接續。</p>
      </div>
    </div>
    <Strip style={{ marginTop: 52 }}>UI 為什麼卡住？同步工作一直占住主執行緒，畫面與互動就得等待。</Strip>
  </Frame>
);

const DependentCallbacks: Page = () => (
  <Frame eyebrow="01 / 相依流程：把下一步放進 CALLBACK" title="第二步需要第一步的結果，必須依序做。" titleSize={72} section="CALLBACK">
    <Code size={30} title="原版 API：成功與失敗都透過 callback 通知">{`doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(\`Got the final result: \${finalResult}\`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 30 }}>
      <p style={{ ...body, fontSize: 32 }}><strong>成功：往內一層，做下一步。</strong><br />步驟越多，縮排越深：callback hell。</p>
      <p style={{ ...body, fontSize: 32 }}><strong>失敗：呼叫 failureCallback。</strong><br />這是教材中負責處理錯誤的函式。</p>
    </div>
  </Frame>
);

const CallbackHellVisual: Page = () => (
  <Frame eyebrow="01 / CALLBACK HELL：當巢狀越來越深" title="下一步一直往裡面接，就會長成這樣。" titleSize={72} section="CALLBACK HELL">
    <img
      src={callbackHellImage}
      alt="多層 callback 一路向右縮排，形成金字塔形狀；左側搭配角色發出波動拳的趣味圖片。"
      width={721}
      height={420}
      style={{ display: 'block', height: 520, width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: 'var(--osd-radius)', margin: '0 auto' }}
    />
    <Strip style={{ marginTop: 28 }}>Callback Hell：巢狀越深，流程與錯誤處理越難追。</Strip>
  </Frame>
);

const PromiseMeaning: Page = () => (
  <Frame eyebrow="01 / PROMISE 是什麼" title="同一個工作，API 改成回傳 Promise。" titleSize={68} section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginTop: 16 }}>
      <Code title="原版 / 接收成功與失敗 callback" size={32}>{`doSomething(
  successCallback,
  failureCallback
);`}</Code>
      <Code title="改寫後 / 回傳 Promise" size={32}>{`const promise = doSomething();
promise
  .then(successCallback)
  .catch(failureCallback);`}</Code>
    </div>
    <p style={{ ...body, marginTop: 36 }}>Promise 是表示工作結果的物件；結果可能還在等待中。</p>
    <Strip style={{ marginTop: 36 }}>doSomething／doSomethingElse／doThirdThing：後續都使用 Promise 版本。</Strip>
  </Frame>
);

const PromiseResolve: Page = () => (
  <Frame eyebrow="01 / 誰提供完成的結果" title="resolve：告訴 Promise「成功了，值是這個」。" titleSize={64} section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1120px 1fr', gap: 64 }}>
      <Code size={34} title="改寫後的 API：回傳 Promise 的 doSomething">{`function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 36 }}>
        <Note tag="new Promise(...)" title="立即安排計時">內部函式現在執行；<br />安排後才回傳 Promise。</Note>
        <Note tag="resolve(網址)" title="稍後提供成功值">計時器 callback 執行時，<br />才提供網址字串。</Note>
      </div>
    </div>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 24 }}>這裡用 200 毫秒的計時器示意一段需要等待的工作。</p>
  </Frame>
);

const PromiseChain: Page = () => (
  <Frame eyebrow="01 / 把同一個流程攤平" title="用 return 接上下一步，結果就能往下傳。" titleSize={70} section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1190px 1fr', gap: 56 }}>
      <Code size={30} title="每個 .then() 收到上一步成功的值">{`doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log(\`Got the final result: \${finalResult}\`);
  })
  .catch(failureCallback);`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 36 }}>
        <Note tag="第一步 → 第二步 → 第三步" title="依序傳遞結果">下一步需要前一步的值。</Note>
        <Note tag="閱讀與維護" title="一次看一個步驟">不必沿著一層層縮排，<br />找下一個操作。</Note>
      </div>
    </div>
  </Frame>
);

const PromiseFailure: Page = () => (
  <Frame eyebrow="01 / 如果中途失敗呢" title="跳過後面的成功處理，交給 catch。" section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 18 }}>
      <Process n="假設第二步" title="發生錯誤">doSomethingElse<br />沒有成功完成。</Process><Arrow />
      <Process n="後續成功 callback" title="先跳過">不執行第三步，<br />也不印成功的結果。</Process><Arrow />
      <Process n=".catch(failureCallback)" title="處理錯誤" accent>由 failureCallback<br />接到錯誤。</Process>
    </div>
    <Strip style={{ marginTop: 54 }}>先看錯誤怎麼到 catch；稍後再追 catch 之後，呼叫端看到什麼。</Strip>
  </Frame>
);

const AsyncAwait: Page = () => (
  <Frame eyebrow="01 / 同一個 PROMISE 流程，改用 AWAIT" title="await 讓相依步驟由上往下讀。" section="ASYNC / AWAIT">
    <div style={{ display: 'grid', gridTemplateColumns: '1190px 1fr', gap: 56 }}>
      <Code size={30} title="async function foo()：呼叫後回傳 Promise">{`async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(\`Got the final result: \${finalResult}\`);
  } catch (error) {
    failureCallback(error);
  }
}`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 40 }}>
        <Note tag="成功" title="依序取得三個結果">result → newResult<br />→ finalResult</Note>
        <Note tag="失敗" title="跳到 catch (error)">error 是接到的錯誤；<br />交給 failureCallback。</Note>
      </div>
    </div>
  </Frame>
);

const AwaitMeaning: Page = () => (
  <Frame eyebrow="01 / 等待的是誰" title="await 暫停 foo 的後續，呼叫端呢？" titleSize={72} section="ASYNC / AWAIT">
    <div style={{ display: 'grid', gridTemplateColumns: '1060px 1fr', gap: 64 }}>
      <div>
        <Code size={34} title="一起追蹤 foo 與呼叫端">{`async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("C");
}
const work = foo();
console.log("B");`}</Code>
        <p style={{ ...body, fontSize: 30, color: muted, marginTop: 20 }}>Promise.resolve()：已成功完成的 Promise。</p>
      </div>
      <div style={{ display: 'grid', alignContent: 'start', gap: 24 }}>
        <Steps>
          <Step><QueueItem>A / 先進入 foo<br />同步執行到 await。</QueueItem></Step>
          <Step><QueueItem>B / 呼叫端繼續<br />work 是 Promise。</QueueItem></Step>
          <Step>
            <QueueItem accent>C / 稍後接續 foo<br />已完成也不會立即接續。</QueueItem>
            <Strip style={{ marginTop: 24, fontFamily: mono, fontSize: 44 }}>A → B → C</Strip>
          </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

const IndependentRequests: Page = () => (
  <Frame eyebrow="01 / 工程判斷：獨立工作需要依序等嗎" title="先發出兩個請求，再一起等待。" section="並行請求">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <div>
        <Code title="依序 await / async 函式內" size={28}>{`const user =
  await getUser(userId);
const orders =
  await getOrders(userId);`}</Code>
        <div style={{ fontFamily: mono, fontSize: 50, lineHeight: 1.25, marginTop: 26 }}>200 + 300 ≈ 500 ms</div>
      </div>
      <div>
        <Code title="兩個呼叫先發出 / async 函式內" size={28}>{`const [user, orders] = await Promise.all([
  getUser(userId),
  getOrders(userId),
]);`}</Code>
        <div style={{ fontFamily: mono, fontSize: 50, lineHeight: 1.25, marginTop: 26, background: yellow }}>max(200, 300) ≈ 300 ms</div>
      </div>
    </div>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 34 }}>假設 userId 已知、請求彼此獨立，耗時固定且忽略額外成本；數字是估算。</p>
    <Strip style={{ marginTop: 24 }}>呼叫 API 啟動工作；Promise.all 彙整結果，不會新增 JS 執行緒。</Strip>
  </Frame>
);

const ParallelConditions: Page = () => (
  <Frame eyebrow="01 / 工程判斷：能不能改成 PROMISE.ALL" title="需要前一步的結果，就保留相依順序。" titleSize={70} section="並行的條件">
    <div style={{ display: 'grid', gridTemplateColumns: '1050px 1fr', gap: 64 }}>
      <Code title="async 函式內 / 訂單 API 需要查回來的 accountId" size={34}>{`const user = await getUser(userId);
const orders =
  await getOrders(user.accountId);`}</Code>
      <Note tag="先問資料從哪裡來" title="accountId 此時才知道">第二個請求需要 user；<br />不能在第一個完成前發出。</Note>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 50 }}>
      <Note tag="資料相依" title="輸入是否已經備妥？">不能為了省等待，把未知值傳出去。</Note>
      <Note tag="副作用與容量" title="業務是否允許同時進行？">先確認操作順序、限流與資源負載。</Note>
    </div>
  </Frame>
);

const ParallelFailure: Page = () => (
  <Frame eyebrow="01 / PROMISE.ALL：失敗代表什麼" title="一個失敗，整組 reject；其他工作仍可能繼續。" titleSize={64} section="錯誤與取消">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 18 }}>
      <Process n="0 MS / 已發出" title="兩個請求都開始">getUser(userId)<br />getOrders(userId)</Process><Arrow />
      <Process n="200 MS / 使用者請求失敗" title="Promise.all reject" accent>呼叫端可進入 catch。<br />不用等所有結果都回來。</Process><Arrow />
      <Process n="300 MS / 訂單請求" title="仍可能完成">失敗不會自動取消<br />另一個已發出的請求。</Process>
    </div>
    <Strip style={{ marginTop: 42 }}>fail-fast 決定整組何時失敗；取消與回滾，需要另外設計。</Strip>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 28 }}>需要每一項的成功／失敗結果時，可以考慮 Promise.allSettled。</p>
  </Frame>
);

const CatchOutcome: Page = () => (
  <Frame eyebrow="01 / CATCH 之後，呼叫端看到什麼" title="記錄錯誤之後，要恢復，還是繼續失敗？" titleSize={70} section="錯誤傳遞">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <div>
        <Code title="假設 getUser reject / 正常返回" size={30}>{`getUser(userId)
  .catch(error => {
    console.error(error);
  });`}</Code>
        <Strip style={{ marginTop: 26, fontSize: 30 }}>回傳的 Promise → fulfilled(undefined)</Strip>
      </div>
      <div>
        <Code title="假設 getUser reject / 重新拋出" size={30}>{`getUser(userId)
  .catch(error => {
    console.error(error);
    throw error;
  });`}</Code>
        <Strip style={{ marginTop: 26, fontSize: 30 }}>回傳的 Promise → rejected(error)</Strip>
      </div>
    </div>
    <p style={{ ...body, marginTop: 34 }}>這一層能提供有意義的備援值，就 return；需要上層處理，就 throw。</p>
    <p style={{ ...body, fontSize: 28, color: muted, marginTop: 18 }}>左邊假設記錄成功、沒有拋錯；這兩種處理也適用於 async 函式裡的 catch。</p>
  </Frame>
);

const TwoQueues: Page = () => (
  <Frame eyebrow="02 / 現在來看：誰先執行" title="準備好的後續程式，會進入不同的佇列。" titleSize={70} section="EVENT LOOP">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
      <div>
        <div style={{ ...label, color: muted }}>TASK / 任務（也常稱 MACROTASK）</div>
        <h2 style={{ fontSize: 46, margin: '26px 0 30px' }}>這裡先記計時器的 callback。</h2>
        <QueueItem>setTimeout 的 callback</QueueItem>
        <p style={{ ...body, fontSize: 32, color: muted, marginTop: 30 }}>就是前面「稍後印出 2」的函式。</p>
      </div>
      <div>
        <div style={{ ...label, color: muted }}>MICROTASK / 微任務</div>
        <h2 style={{ fontSize: 46, margin: '26px 0 30px' }}>Promise 的後續處理。</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <QueueItem accent>.then() 裡的 callback</QueueItem>
          <QueueItem accent>await 後面的程式</QueueItem>
        </div>
        <p style={{ ...body, fontSize: 32, color: muted, marginTop: 30 }}>先前印出 C，就是 await 的後續。<br />Promise 結果確定後，安排為 microtask。</p>
      </div>
    </div>
    <p style={{ ...body, fontSize: 32, color: muted, marginTop: 44 }}>佇列（queue）：放著準備好、等待執行的工作。</p>
  </Frame>
);

const LoopRule: Page = () => (
  <Frame eyebrow="02 / EVENT LOOP：安排接下來的執行" title="目前的 task 結束，先清空 microtask。" titleSize={72} section="EVENT LOOP">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 22 }}>
      <Process n="01 / 先做完現在這段" title="目前的 task">例如：目前這段 script。<br />等 Call Stack 清空。</Process><Arrow />
      <Process n="02 / 接著處理" title="Microtask" accent>把已排入的微任務做完，<br />直到佇列清空。</Process><Arrow />
      <Process n="03 / 再繼續" title="下一個 task">例如：準備好的<br />計時器 callback。</Process>
    </div>
    <p style={{ ...body, marginTop: 58 }}>Event Loop（事件迴圈）持續安排：主執行緒接下來執行哪個工作。</p>
    <p style={{ fontSize: 28, color: muted, lineHeight: 1.5, marginTop: 24 }}>此為瀏覽器的簡化模型；不同 task 來源不保證單一全域 FIFO 順序。</p>
  </Frame>
);

const OrderAnswer: Page = () => (
  <Frame eyebrow="02 / 把剛才的觀念合起來" title="先預測輸出，再說出每一步的理由。" section="EVENT LOOP">
    <Code size={32} title="Promise.resolve()：取得一個已成功完成的 Promise">{`console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 44, marginTop: 46 }}>
      <Steps>
        <Step><Result value="1" kind="直接執行" /></Step>
        <Step><Result value="4" kind="先做完目前程式" /></Step>
        <Step><Result value="3" kind="先處理 MICROTASK" /></Step>
        <Step><Result value="2" kind="再處理計時器 TASK" /></Step>
      </Steps>
    </div>
  </Frame>
);

const FetchBoundary: Page = () => (
  <Frame eyebrow="02 / 換成網路請求時" title="fetch 負責發請求，Promise 接續處理結果。" titleSize={66} section="EVENT LOOP">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 24 }}>
      <Process n="fetch()" title="發出網路請求">回傳 Promise，<br />網路工作由瀏覽器處理。</Process><Arrow />
      <Process n="Promise 結果確定" title="有結果可處理">安排對應的後續程式。</Process><Arrow />
      <Process n="MICROTASK" title="接續執行" accent>例如 .then() 的 callback、<br />await 後面的程式。</Process>
    </div>
    <Strip style={{ marginTop: 56 }}>microtask 的順序規則，不代表網路請求會立刻完成。</Strip>
    <p style={{ ...body, fontSize: 32, color: muted, marginTop: 32 }}>要分開看「外部工作何時完成」與「完成後的程式何時執行」。</p>
  </Frame>
);

const AsyncCpu: Page = () => (
  <Frame eyebrow="02 / 工程判斷：加 ASYNC，畫面就不會卡嗎" title="同步計算不會因為 async 而移到別處。" titleSize={70} section="CPU 與主執行緒">
    <div style={{ display: 'grid', gridTemplateColumns: '1020px 1fr', gap: 64 }}>
      <Code title="假設 crunch() 是耗時的同步計算" size={34}>{`async function buildReport() {
  return crunch();
}

buildReport();
console.log("next");`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 20 }}>
        <Steps>
          <Step><Note tag="先預測" title="next 要等 crunch 結束"><div style={{ fontSize: 30, lineHeight: 1.5 }}>同步運算仍占住主執行緒；<br />async 只保證回傳 Promise。</div></Note></Step>
          <Step><Note tag="工程上的處理" title="移走，或切開計算"><div style={{ fontSize: 30, lineHeight: 1.5 }}>Web Worker，或分批計算；<br />在批次間讓出執行機會。</div></Note></Step>
        </Steps>
      </div>
    </div>
    <Strip style={{ marginTop: 24 }}>加上 await Promise.resolve()，也不保證瀏覽器能先繪製畫面。</Strip>
  </Frame>
);

const Recap: Page = () => (
  <Frame eyebrow="02 / JAVASCRIPT 回顧" title="讀程式時，先回答這四個問題。" section="JAVASCRIPT → TYPESCRIPT">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '44px 72px' }}>
      <Note tag="相依性" title="這兩個工作能一起開始嗎？">看輸入、業務順序與資源限制。</Note>
      <Note tag="錯誤傳遞" title="catch 之後，上層看到什麼？">回傳一般值就恢復；throw 繼續失敗。</Note>
      <Note tag="執行順序" title="等待外部工作，還是執行後續？">網路工作與 microtask 分開判斷。</Note>
      <Note tag="執行負擔" title="現在是誰占住主執行緒？">async 不會把同步計算移到別處。</Note>
    </div>
    <Strip style={{ marginTop: 40 }}>接著看資料契約：TypeScript 能提前檢查什麼？哪些要等 runtime 驗證？</Strip>
  </Frame>
);


// Part 3: one API result model, static checking, and an explicit runtime boundary (20 minutes).
const TypeScriptBoundary: Page = () => (
  <Frame eyebrow="03 / TYPESCRIPT / 執行前的型別檢查" title="多了型別，程式的執行方式會改變嗎？" titleSize={72} section="TYPESCRIPT">
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 64px 1fr', gap: 24, alignItems: 'center' }}>
      <Code title="執行前 / STATIC TYPE CHECKING" language="TS" size={30}>{`function add(a: number, b: number): number {
  return a + b;
}`}</Code>
      <Arrow />
      <Code title="移除型別後 / JAVASCRIPT" size={30}>{`function add(a, b) {
  return a + b;
}`}</Code>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 32 }}>
      <Note tag="執行前多一道檢查" title="呼叫時，有沒有傳錯型別？"><div style={{ fontSize: 32 }}>add("1", 2) 會收到型別錯誤。</div></Note>
      <Note tag="RUNTIME 沿用剛才的模型" title="執行的仍然是 JavaScript。"><div style={{ fontSize: 32, lineHeight: 1.5 }}>Event Loop、Promise、async / await<br />都沿用剛才的執行機制。</div></Note>
    </div>
    <Strip style={{ marginTop: 18 }}>型別註記在執行前參與檢查；不會變成 runtime 的參數驗證。</Strip>
  </Frame>
);

const TypeInference: Page = () => (
  <Frame eyebrow="03 / TYPE INFERENCE / 從程式碼取得線索" title="看得出來的型別，不必每次重寫。" section="TYPE INFERENCE">
    <div style={{ display: 'grid', gridTemplateColumns: '970px 1fr', gap: 64 }}>
      <Code title="輸入標明型別，回傳值可以推斷" language="TS" size={36}>{`let userName = "Kylen";
let age = 20;

function add(a: number, b: number) {
  return a + b;
}`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 28 }}>
        <Note tag="從初始值推斷" title="userName → string">age → number</Note>
        <Note tag="從 RETURN 推斷" title="add 的回傳 → number">沒有寫回傳型別，不代表 any。</Note>
      </div>
    </div>
    <Strip style={{ marginTop: 36 }}>局部值交給 inference；對外的函式契約，可以明確標示。</Strip>
  </Frame>
);

const StructuralTyping: Page = () => (
  <Frame eyebrow="03 / STRUCTURAL TYPING / 後端工程師要換的視角" title="沒有 implements User，為什麼也能傳入？" titleSize={68} section="STRUCTURAL TYPING">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <Code title="函式需要的結構 / SHAPE" language="TS" size={32}>{`interface User {
  id: number;
  name: string;
}
function printUser(user: User) {
  console.log(user.name);
}`}</Code>
      <Code title="呼叫端已經有的資料" language="TS" size={32}>{`const data = {
  id: 1,
  name: "Kylen",
  email: "kylen@example.com"
};

printUser(data); // OK`}</Code>
    </div>
    <Strip style={{ marginTop: 28 }}>至少有需要的欄位，且型別相容；不要求正式宣告屬於 User。</Strip>
    <p style={{ ...body, fontSize: 28, color: muted, marginTop: 16 }}>直接傳入新寫的 object literal，另有多餘屬性檢查；這裡傳的是既有變數 data。</p>
  </Frame>
);

const InterfaceAndType: Page = () => (
  <Frame eyebrow="03 / INTERFACE 與 TYPE / 替型別命名" title="先命名 User，接下來共用這個契約。" titleSize={72} section="INTERFACE / TYPE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <Code title="INTERFACE / 描述 OBJECT SHAPE" language="TS" size={36}>{`interface User {
  id: number;
  name: string;
}`}</Code>
      <Code title="TYPE / 也能描述同一個 SHAPE" language="TS" size={36}>{`type User = {
  id: number;
  name: string;
};`}</Code>
    </div>
    <Strip style={{ marginTop: 42 }}>兩欄是替代寫法。後面沿用 interface User；type 用來命名聯合型別。</Strip>
    <p style={{ ...body, fontSize: 32, color: muted, marginTop: 32 }}>命名型別不會建立 runtime 類別，也不會替外部資料轉型。</p>
  </Frame>
);

const UnionType: Page = () => (
  <Frame eyebrow="03 / UNION / 把 API 結果的兩條路徑寫清楚" title="成功有 data，失敗有 error。" section="API RESULT / UNION">
    <Code title="沿用 USER：ID 是 NUMBER，NAME 是 STRING" language="TS" size={38}>{`type UserResult =
  | { ok: true; data: User }
  | { ok: false; error: string };`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 36 }}>
      <Note tag="OK: TRUE" title="成功分支才保證有 data。"><div style={{ fontSize: 32 }}>true 是特定值，不是任意 boolean。</div></Note>
      <Note tag="OK: FALSE" title="失敗分支保證有 error。"><div style={{ fontSize: 32 }}>| 讀成「或」：兩種結果其中一種。</div></Note>
    </div>
    <Steps>
      <Step><Strip style={{ marginTop: 28 }}>還沒判斷 ok，可以直接讀 result.data 嗎？</Strip></Step>
    </Steps>
  </Frame>
);

const TypeNarrowing: Page = () => (
  <Frame eyebrow="03 / NARROWING / 用共同欄位分辨結果" title="判斷 ok，這一行的型別就確定了。" titleSize={72} section="API RESULT / NARROWING">
    <div style={{ display: 'grid', gridTemplateColumns: '1080px 1fr', gap: 56 }}>
      <Code title="USERRESULT 沿用上一頁的兩種結果" language="TS" size={34}>{`function showUser(result: UserResult) {
  if (result.ok) {
    console.log(result.data.name.toUpperCase());
  } else {
    console.error(result.error);
  }
}`}</Code>
      <div>
        <Steps>
          <Step><Note tag="IF / OK 是 TRUE" title="data 是 User。"><div style={{ fontSize: 32 }}>name 是 string，<br />可用 toUpperCase()。</div></Note></Step>
          <Step><div style={{ marginTop: 28 }}><Note tag="ELSE / OK 是 FALSE" title="error 是 string。"><div style={{ fontSize: 32 }}>這裡不保證有 data。</div></Note></div></Step>
        </Steps>
      </div>
    </div>
    <Strip style={{ marginTop: 30 }}>Discriminated union：用共同欄位的特定值，區分不同的資料結構。</Strip>
  </Frame>
);

const GenericResponse: Page = () => (
  <Frame eyebrow="03 / GENERICS / 保留成功資料的型別" title="同一種結果包裝，讓 data 的型別可替換。" titleSize={68} section="API RESULT / GENERICS">
    <Code title="從 USERRESULT，把 USER 抽成型別參數 T" language="TS" size={38}>{`type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 34 }}>
      <Code title="單筆 API 結果" language="TS" size={30}>{`type UserResult = ApiResult<User>;`}</Code>
      <Code title="清單 API 結果 / USER[] 是陣列" language="TS" size={30}>{`type UserListResult = ApiResult<User[]>;`}</Code>
    </div>
    <Strip style={{ marginTop: 26 }}>先判斷 ok；成功後，data 仍精確地是 User 或 User[]，不必退回 any。</Strip>
  </Frame>
);

const RuntimeValidation: Page = () => (
  <Frame eyebrow="03 / RUNTIME BOUNDARY / JSON 語法正確，不代表 SHAPE 正確" title="API 回來的值，還不能直接信任。" section="RUNTIME VALIDATION">
    <div style={{ display: 'grid', gridTemplateColumns: '1020px 1fr', gap: 56 }}>
      <div>
        <Code title="ASYNC 函式內的節錄 / HTTP 已成功" language="TS" size={32}>{`const raw: unknown = await response.json();

// 直接讀 raw.name？型別檢查不允許。
// 先檢查，才能把 raw 當成 User。`}</Code>
        <p style={{ ...body, fontSize: 32, color: muted, marginTop: 30 }}>unknown 接得住任何值，<br />但使用前必須先確認它的結構。</p>
      </div>
      <Code title="合法 JSON / 不符合 USER" language="JSON" size={36}>{`{
  "id": "ABC",
  "name": null
}`}</Code>
    </div>
    <Strip style={{ marginTop: 34 }}>unknown 本身不驗證資料。下一步要真的檢查 id 與 name。</Strip>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 22 }}>外部 JSON → unknown → 執行欄位檢查 → 通過後才當作 User 使用</p>
  </Frame>
);

const ParseUser: Page = () => (
  <Frame eyebrow="03 / RUNTIME VALIDATION / 把檢查寫成可執行的程式" title="檢查不通過就拋錯，通過才回傳 User。" titleSize={70} section="RUNTIME VALIDATION">
    <div style={{ display: 'grid', gridTemplateColumns: '1120px 1fr', gap: 56 }}>
      <Code title="最小驗證器 / 不做型別斷言" language="TS" size={28}>{`function parseUser(value: unknown): User {
  if (
    typeof value !== "object" || value === null ||
    !("id" in value) ||
    typeof value.id !== "number" ||
    !("name" in value) ||
    typeof value.name !== "string"
  ) {
    throw new Error("Invalid User");
  }
  return { id: value.id, name: value.name };
}`}</Code>
      <div>
        <Note tag="不符合就中止" title="缺欄位、型別錯誤 → throw"><div style={{ fontSize: 30, lineHeight: 1.5 }}>typeof、in、null 判斷<br />都真的會在 runtime 執行。</div></Note>
        <div style={{ marginTop: 36 }}><Note tag="走到 RETURN" title="id 與 name 已確認。"><div style={{ fontSize: 30, lineHeight: 1.5 }}>回傳的物件符合 User。<br />下一頁處理被拋出的錯誤。</div></Note></div>
      </div>
    </div>
  </Frame>
);

const ValidateAtBoundary: Page = () => (
  <Frame eyebrow="03 / 把邊界接回 APIRESULT / 成功與失敗都有出口" title="驗證成功回 data；失敗回明確的 error。" titleSize={68} section="API RESULT / RUNTIME BOUNDARY">
    <div style={{ display: 'grid', gridTemplateColumns: '1120px 1fr', gap: 56 }}>
      <Code title="ENDPOINT 回 USER JSON；此函式包成 APIRESULT" language="TS" size={28}>{`async function loadUser(): Promise<ApiResult<User>> {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) throw new Error("HTTP error");
    const raw: unknown = await response.json();
    return { ok: true, data: parseUser(raw) };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "使用者載入失敗" };
  }
}`}</Code>
      <div>
        <Note tag="成功 / OK: TRUE" title="先 parseUser，才有 data。"><div style={{ fontSize: 30, lineHeight: 1.5 }}>呼叫端 await 後，<br />先判斷 result.ok 再使用。</div></Note>
        <div style={{ marginTop: 32 }}><Note tag="失敗 / OK: FALSE" title="四種失敗，進同一個出口。"><div style={{ fontSize: 30, lineHeight: 1.5 }}>網路、HTTP、JSON 語法、<br />User 欄位檢查。</div></Note></div>
      </div>
    </div>
    <p style={{ ...body, fontSize: 28, color: muted, marginTop: 18 }}>此處 catch 正常回傳 ApiResult：Promise 會 fulfilled，呼叫端仍須檢查 ok。</p>
  </Frame>
);

const FullSessionRecap: Page = () => (
  <Frame eyebrow="03 / 整場回顧 / 回到後端工程的三個判斷" title="安排工作、保留錯誤、確認資料契約。" titleSize={72} section="JAVASCRIPT → TYPESCRIPT">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 36, marginTop: 8 }}>
      <Process n="非同步流程" title="哪些工作可以並行？">先看資料相依性。<br />Promise.all 不自動取消。<br />catch 要決定如何回傳。</Process>
      <Process n="執行模型" title="目前執行緒會卡住嗎？">await 暫停函式的後續。<br />async 不會搬走同步計算。<br />Promise 後續用 microtask。</Process>
      <Process n="資料契約" title="資料真的符合宣告嗎？" accent>Union 描述成功與失敗。<br />Generic 保留 data 型別。<br />外部資料先實際驗證。</Process>
    </div>
    <Strip style={{ marginTop: 48 }}>判斷是否能並行；說清楚錯誤交給誰；在資料進入系統時落實檢查。</Strip>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 28 }}>55:00 完成主線 · 最後 5 分鐘 Q&A／緩衝</p>
  </Frame>
);


export const meta: SlideMeta = {
  title: 'Day 1｜JavaScript 執行、非同步與 TypeScript 型別 — Kylen',
  createdAt: '2026-09-15T03:11:44.021Z',
};

// Speaker notes: 35 minutes JavaScript, 20 minutes TypeScript, and 5 minutes Q&A.
export const notes: (string | undefined)[] = [
  "00:00–00:30｜30 秒\n開場：聽眾已有後端開發經驗，但可以第一次接觸 JavaScript／TypeScript。今天先補足讀程式所需的 JS 寫法，再往前推一步：判斷獨立請求如何重疊等待、錯誤是否真的交給呼叫端，以及資料契約在哪裡成立。執行模型以瀏覽器主執行緒為主，不把這個簡化模型直接當成 Node.js 的所有階段。封面只交代學習目標，下一頁再安排時間。",
  "00:30–01:00｜30 秒\n路線：非同步基礎連同開場共 18 分鐘，並行請求與錯誤傳遞 7 分鐘；Event Loop、同步計算與 JS 回顧 10 分鐘。35:00 切入 TypeScript，用 API 結果模型與 runtime 驗證串起 20 分鐘，55:00 留 5 分鐘 Q&A／緩衝。今日不是背語法清單，而是能說出程式在等什麼、失敗傳到哪裡、哪些資料假設仍需要驗證。",
  "01:00–03:00｜2 分鐘\n核心：函式可以當參數；callback 是否非同步，取決於接收方何時呼叫它。先用 20 秒讀 multiNum：收到數字，印出它的十倍。再問 addNum(6, 2, multiNum) 的第三個參數是函式還是執行結果？答案是函式；沒有括號，不是在這裡執行 multiNum。沿 addNum 裡的 callback(a + b) 追一次：6 + 2 是 8，callback(8) 呼叫的正是 multiNum(8)，因此印 80。與右側 multiNum(8) 對照，後者會立即呼叫。本頁簡化原本條件分支，只留下傳函式與呼叫函式的差異。停 5 秒問「這裡有等稍後嗎？」答案沒有，callback 在 addNum 返回之前就完成。callback 是角色，不是非同步關鍵字。銜接：換成瀏覽器計時器，仍然傳函式，執行時間卻不同。",
  "03:00–04:30｜1 分 30 秒\n核心：安排計時器不會暫停目前程式。先請聽眾預測三行輸出，再由上往下讀：印 1；setTimeout 收到要稍後做的函式與延遲毫秒，這裡只是安排；目前程式繼續印 4；後來 callback 才印 2。答案 1 → 4 → 2。0 毫秒不是精確執行時間，更不能打斷正在執行的同步程式。此處先建立直覺，不提前背 task／microtask 名稱。() => ... 是無參數函式。這個範例在瀏覽器的一次同步執行中觀察，不加入其他程式的輸出。",
  "04:30–05:30｜1 分鐘\n核心：瀏覽器主執行緒同時執行一段 JS，計時與網路等待可由瀏覽器處理。Call Stack 表示目前函式呼叫的執行進度；外部工作就緒後，後續程式仍要等主執行緒能執行。問「計時器到期時，若目前同步工作還沒結束，能插隊嗎？」答案不能。範圍是主執行緒，不宣稱整個瀏覽器只有一條執行緒，也不把 JavaScript 與所有後端語言的執行方式混在一起。先記下 UI 卡住與同步工作占用的關係，後面會用 async 包住 CPU 計算檢查理解。",
  "05:30–07:00｜1 分 30 秒\n核心：資料相依使步驟必須依序開始；callback 寫法把下一步放進成功函式裡。三個 doSomething 名稱都是示意 API，這一頁採成功與失敗 callback 介面，不是 JS 內建函式。由 result → newResult → finalResult 追一次：第二步需要第一步的結果，第三步需要第二步的結果。function(result) 是接收結果後要做的事。問「把三個呼叫放在外面一起發出，可以嗎？」答案不行，後兩步所需輸入尚未取得。每層的 failureCallback 負責接到該步失敗；本頁不展開 callback 契約實作。這裡三層還能讀，下一頁用原有圖片快速觀察更多層次的代價。",
  "07:00–07:30｜30 秒\n核心：相依流程一層包一層，會讓閱讀與錯誤處理越來越難追。保留使用者提供的 callback hell 圖片，停 5 秒看向右擴張的縮排，再用一句話點出維護成本。不要逐行讀圖片或介紹圖片裡的套件；callback 本身仍是正常工具，不能用數量直接判定好壞。銜接：能否保留相依關係，把成功與失敗的後續攤平？下一頁會改用回傳 Promise 的 API 版本。",
  "07:30–09:00｜1 分 30 秒\n核心：Promise 是表示工作結果的物件，API 需要真的回傳它，才可接 then／catch。左欄是 callback 介面；右欄是假設已改寫成回傳 Promise 的替代版本。後續 doSomethingElse 與 doThirdThing 同樣採 Promise 版本，不能直接在原 callback API 尾端加 .then()。成功值交給 then，失敗交給 catch；結果可能仍在 pending，也可能已經 fulfilled 或 rejected。Promise 不等於最終資料，更不代表新增 JS 執行緒。問「const promise 拿到的是網址字串嗎？」答案是 Promise 物件；成功時才經由後續處理拿到字串。下一頁短看它如何產生成功值。",
  "09:00–10:30｜1 分 30 秒\n核心：new Promise 的 executor 立即執行，而範例中的成功值稍後提供。從 return new Promise 往內看：executor 現在安排 200ms 計時器，結束後 doSomething 才回傳 Promise。稍後計時器 callback 執行，印訊息並 resolve 網址字串；該字串就是 then 收到的結果。問「建立 Promise 就等於把 executor 移到背景嗎？」答案不是。這裡的等待來自 setTimeout，200ms 也不是精準執行時間保證。不要求聽眾記住手寫 Promise 的所有細節，不展開 resolve another Promise、thenable 或完整 callback 包裝。大部分使用端可直接接既有 Promise API。",
  "10:30–12:00｜1 分 30 秒\n核心：then callback 收到前一步成功值；return 下一步的 Promise，才把等待與錯誤留在同一條鏈。三個 API 都已採 Promise 版本，沿 result → newResult → finalResult 讀一次。第一個 then 使用 result 呼叫第二步並 return；第二個 then 同樣接第三步；最後只印結果。問「為什麼前兩段有 return？」答案是讓外面的鏈等待下一個操作，接到其成功值或失敗。不是讓三個工作同時跑，原本資料相依仍在。若缺少 return，鏈可能提前繼續，內部失敗也可能不再沿這條鏈傳遞；只口頭提醒，不另開 detached Promise 範例。下一頁追失敗如何到尾端。",
  "12:00–13:00｜1 分鐘\n核心：這條鏈的 then 都只有成功處理；中途 throw 或返回 rejected Promise，會跳過後續成功 callback，交給末端 catch。假設第二步失敗，問第三步會不會被呼叫？答案不會，成功輸出也跳過。failureCallback 在此只是接收錯誤的示意處理器，沒有宣稱它一定讓整條鏈繼續失敗；這正是稍後要追的問題。先記住錯誤到達 catch 的路徑，不在此提前背 catch 的所有回傳規則。",
  "13:00–15:30｜2 分 30 秒\n核心：async／await 把同一個 Promise 相依流程寫成由上往下；呼叫 async 函式仍拿到 Promise。用約 50 秒對照前面 chain：每個 await 取得成功值，再傳給下一步；原來的相依關係完全保留。try 中的 await 若遇到 rejection，就以丟出錯誤的方式進入 catch，後續相依步驟跳過；同步 throw 也會被這個 try/catch 接到。用約 40 秒問「foo() 直接回傳 finalResult 嗎？」答案不是，是 Promise；這個範例沒有 return finalResult，正常結束的成功值是 undefined。failureCallback 若正常返回，catch 結束後 foo 也會恢復成功；若它拋錯，foo 才會 rejected。先點出這個待會會展開的差異，避免誤教 catch 只要印錯誤就自動向上傳播。本頁只宣告函式，沒有真的發出工作。剩餘時間銜接：await 到底暫停誰？\n參考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
  "15:30–18:00｜2 分 30 秒\n核心：foo 先同步執行到第一個 await；等待的是 foo 的後續，呼叫端先取得 Promise 再繼續。先解釋 Promise.resolve() 得到已成功完成的 Promise，沒有額外網路等待。請聽眾先投票 A、B、C 的順序，再按三次右鍵：第一步進入 foo 先印 A；到 await 後暫停 foo 的後續，const work 拿到 Promise，呼叫端印 B；目前同步程式結束後，才接續印 C。答案 A → B → C。即使被 await 的 Promise 已完成，後續也不會在這一行立刻繼續。work 仍是代表 foo 完成的 Promise，不是字串，也不是外部請求資料。不把 async 當開執行緒，await 也不是阻塞整個主執行緒。最後用 20 秒提問：如果有兩個互不相依的工作，真的需要等第一個結束才發第二個嗎？\n參考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
  "18:00–19:30｜1 分 30 秒\n核心：兩個獨立的 I/O 等待可重疊；差別在發出工作的時機。getUser／getOrders 是示意 Promise API，假設呼叫時立即啟動請求、userId 已知、兩者獨立，且都成功。兩欄都是 async 函式內的替代片段，不是一起執行。先讓聽眾估算 200ms 與 300ms：左邊第一個 await 後才發第二個，約 500ms；右邊求值陣列時依序快速呼叫兩個 API，再由 Promise.all 彙整，理想約 300ms。JS 呼叫本身仍有先後，重疊的是外部等待，不是同時執行兩段同步 JS。數字忽略啟動、排程、服務競爭等成本，不能當真實效能保證。[user, orders] 是依輸入順序取回陣列結果，不是依完成順序；用 10 秒讀過即可。Promise.all 本身不負責啟動這些函式，傳入的是已呼叫後回傳的 Promise。\n參考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
  "19:30–21:00｜1 分 30 秒\n核心：能否並行，先看資料與業務相依，再看資源限制。這頁特意改變 API 契約：getOrders 現在需要 getUser 查回來的 user.accountId，不是上一頁已知的 userId。先請聽眾指出還沒知道的值，答案是 accountId，因此兩個呼叫不能原樣一起發出。畫面是 async 函式內的相依範例，省略錯誤處理但沒有取消錯誤傳遞。再問「輸入都已知，就一定該同時執行嗎？」答案還要看副作用順序，例如確認付款成功才能出貨，以及限流、連線／資源容量。本課只比較兩個請求，不推廣成把大量資料全部丟進 Promise.all；可限制並行數是後續工程設計議題。",
  "21:00–22:30｜1 分 30 秒\n核心：Promise.all 在任一輸入失敗時，以該錯誤 reject；其他已啟動的工作不會因此被自動取消。沿時間走：0ms 發出兩個請求；假設使用者請求 200ms reject，整組就可讓等待它的呼叫端進入 catch；訂單請求仍可能在 300ms 完成。問「catch 執行了，代表伺服器另一項工作停止嗎？」答案不代表。fail-fast 是整組 Promise 的失敗時機，不是 transaction、取消或 rollback。若確實需要取消，可再設計支援取消的 API／AbortSignal；即使取消客戶端等待也不等於撤銷已發生的伺服器副作用，此處不展開 API。若業務需要所有成功與失敗結果，Promise.allSettled 是選項，先給名稱不用再讀一段語法。下一頁追收到錯誤後，自己的 catch 對呼叫端造成什麼影響。\n參考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
  "22:30–25:00｜2 分 30 秒\n核心：catch 回傳的是新的 Promise；handler 的回傳與拋錯決定後續狀態。假設兩欄 getUser 都 reject，console.error 成功且不拋錯。先問「兩欄都印出錯誤，呼叫端看到的狀態一樣嗎？」停 10 秒。左邊 handler 正常結束、沒有 return，所以新的 Promise 以 undefined fulfilled；右邊重新 throw 原錯誤，所以新的 Promise rejected。不是把 getUser 原本失敗的 Promise 改成成功，而是後續鏈已恢復。接回 async 範例：async 函式的 catch 正常返回，也會讓函式回傳的 Promise 成功；throw 才把失敗繼續交上去。工程判斷：這層能給有意義的備援值，可 return 該值；不能履行契約時，throw 交上層處理，避免只記錄就讓呼叫端誤當成功。若 catch 回傳另一個 Promise，後續會跟隨其結果，不是所有 return 都立即成功；本頁只比較正常返回 undefined 與同步 throw。範例為了展示只印 log，但實務要選定紀錄責任，避免每層重複紀錄同一錯誤。\n參考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
  "25:00–26:30｜1 分 30 秒\n核心：外部條件就緒後的後續程式，會以不同類型的工作排程。左側 task 對應先前 timer 印 2；右側 microtask 對應 then callback 與 await 後印 C。queue 是等待執行的工作，pending Promise 並不是不斷在 microtask 佇列裡輪詢；它的結果確定，相關後續才有機會排入。請聽眾配對：「setTimeout callback 是哪類？await 後面是哪類？」答案依序為 task、microtask。不要求背更多 API；macrotask 是常見稱呼，規範的名詞是 task。Promise executor 仍是同步執行，不能把所有包含 Promise 的程式都說成 microtask。\n參考：https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide",
  "26:30–27:30｜1 分鐘\n核心：用瀏覽器簡化模型讀順序：目前 task 的同步程式完成，進到 microtask checkpoint，清空微任務後才繼續下一個 task。清空包含執行途中新增的 microtask，因此不斷產生微任務也可能延後其他工作與繪製。問「把工作丟進 microtask，就保證畫面先更新嗎？」答案不保證。瀏覽器是否繪製還取決於 rendering opportunity，此圖不是完整規範排程圖。不同 task 來源不存在此頁承諾的單一全域 FIFO，不把 timer、使用者事件、網路 callback 任意混排出保證順序。接著只用同一段 script、單一 timer 與已完成 Promise 來追。\n參考：https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide",
  "27:30–29:30｜2 分鐘\n核心：先完成同步程式，再處理已排入的 Promise 後續，最後執行本例的 timer callback。先留 15 秒讓聽眾自己預測，再按四次右鍵逐步揭露：直接印 1；timer 只安排稍後，then 也只安排 microtask，接著直接印 4；script 結束後 microtask 印 3；最後 timer task 印 2。答案 1 → 4 → 3 → 2。每次揭露都請聽眾說它屬於哪一類，不只是背數字。Promise.resolve() 已 fulfilled 也不會同步呼叫 then。這個例子不含未完成的網路請求，也沒有其他程式輸出；不能推論所有 Promise 都比任意 timer 更早完成。",
  "29:30–31:00｜1 分 30 秒\n核心：fetch 的網路工作與 Promise 後續是不同階段。fetch 呼叫發起瀏覽器處理的請求，先回傳 Promise；其結果確定後，相應的 then／await 後續才以 microtask 執行。問「網路請求本身是 microtask，所以一定比計時器快嗎？」答案不是，網路多久完成與已準備好後續的排程要分開判斷。補充邊界：fetch 的 Promise 在回應可用時 fulfilled，不等於 response body 已全部讀完；response.json() 也回傳 Promise。HTTP 404／500 通常不會自動讓 fetch reject，應檢查 response.ok；網路錯誤等才會 reject。這些只作講者備用，避免引入新語法打斷主線。銜接：外部等待可以交給瀏覽器，那自己的同步計算能靠 async 解決嗎？",
  "31:00–33:00｜2 分鐘\n核心：async 不會把同步計算搬到別的執行緒。假設 crunch() 是會正常返回的耗時同步函式；先讓聽眾判斷 next 是先印，還是要等計算完。按第一步揭露答案：buildReport 呼叫後先同步執行 crunch，完成才把結果包在 Promise 裡回傳，所以 next 要等。即使呼叫端沒有 await，也已經被前面的同步運算拖住，畫面互動也可能被阻塞。按第二步討論作法：適合的 CPU 計算可移到 Web Worker，或切批，並在批次間透過合適的排程方式讓出執行機會；不在此引入 Worker 實作。問「在 crunch 前面加 await Promise.resolve() 就能保證不卡嗎？」答案不行，它只把後續安排成 microtask，計算仍在主執行緒，還可能在繪製之前執行。不必以此推論所有 await 都毫無價值，重點是區分等待 I/O 與實際消耗 CPU。\n參考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function\n參考：https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide",
  "33:00–35:00｜2 分鐘\n用四個工程提問回顧，不加新語法。請不同聽眾各答一句：一、兩個各需 200／300ms 的獨立請求，先發再等理想約多久？約 300ms，但有相依或資源限制就不能直接套用。二、catch 只 log 並正常結束，上層看到什麼？新的 Promise 成功，值 undefined；throw 才繼續失敗。三、fetch 網路工作是不是 microtask？不是，結果確定後的 then／await 接續才是。四、把同步計算包進 async 會自動解決卡住嗎？不會，計算仍占住目前執行緒。若卡住，可回到 callback 是傳函式、Promise 是結果物件、await 暫停目前函式後續這三句定位，別多開例子。35:00 轉場：執行時序與失敗語意已經知道，接下來資料的成功／失敗狀態如何寫進契約？哪些檢查在執行前完成，哪些仍要 runtime 驗證？",
  "35:00–36:30｜1 分 30 秒｜執行前的型別檢查\n核心：TypeScript 增加靜態型別檢查；本例移除型別註記後，仍按剛才的 JavaScript 模型執行。\n講法：先花 30 秒對照左右 add，指出參數與回傳值的 number 會移除，a + b 仍保留。問「add(\"1\", 2) 能通過型別檢查嗎？」等 5 秒，答案是不行，第一個參數是 string。再花 25 秒連回 Event Loop、Promise、async／await：型別不會改變它們的執行順序。最後 30 秒讀黃色結論，將注意力轉到檢查發生的時機。\n邊界：這些 annotation 不會自動生成 runtime 驗證，也不會把字串轉成數字。執行前檢查包括編輯器與型別檢查器；輸出 JS 與檢查型別可由不同工具完成，不能把型別錯誤當成 runtime 防護。本頁只討論會移除的型別語法，不宣稱所有 TS 語法都只會被刪掉。\n銜接：知道型別能提前檢查後，下一頁回答哪些地方需要手寫型別。\n參考：https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types",
  "36:30–37:30｜1 分鐘｜Type inference\n核心：省略 annotation 不代表 any；程式碼已經提供足夠線索時，TS 會推斷型別。\n講法：前 20 秒由 userName 的字串初值、age 的數字初值，對到 string、number。再花 20 秒看 add 的兩個 number 參數，問「沒寫回傳型別，是否代表回傳 any？」停 5 秒後回答：不是，a + b 的結果推斷為 number。最後 15 秒說明局部值可交給 inference，對外函式仍可明確標示回傳契約。\n邊界：普通獨立函式的參數不會只因後面有人呼叫就回推，所以保留 a、b 的 annotation。不展開 literal widening、const、contextual typing 或 tsconfig。\n銜接：物件也能從欄位推斷出 shape；接下來的 data 沒寫 User，也可能符合需要 User 的函式。\n參考：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables",
  "37:30–39:30｜2 分鐘｜Structural typing\n核心：TypeScript 主要比較所需 shape 的相容性，不要求物件先正式宣告屬於某個型別。\n講法：先用 30 秒讀 User 的 id: number、name: string 與 printUser。再看 data 的三個欄位，問「沒有 implements User，printUser(data) 為什麼可以？」停 5 秒，逐一配對 id、name 都存在且型別相容。用約 40 秒對照 Java／C# 常見的 interface 身分判定：TS 在此看結構，多出的 email 不妨礙既有變數相容。最後約 45 秒說明頁底的 object literal 邊界與下一頁命名方式。\n邊界：不是 runtime 自動做 duck typing 檢查，也沒有複製、轉型或刪掉 email；函式內只知道 User 宣告的成員。直接把新寫的 object literal 傳進去，會有 excess property checking，因此此例刻意用既有 data 變數。不能推論任何額外欄位都永遠被接受。\n不延伸：不講 branding、private／protected 例外或 soundness；與後端語言比較只限 Java／C# 常見情境。\n銜接：接下來用一分鐘整理 interface 與 type，之後整段都沿用同一個 User。\n參考：https://www.typescriptlang.org/docs/handbook/type-compatibility.html",
  "39:30–40:30｜1 分鐘｜Interface 與 type\n核心：User 這個一般物件 shape，用 interface 或 type 都可以；後續用 type 命名聯合型別。\n講法：用 25 秒左右對照同樣的 id、name，指出只是兩種替代寫法，不要在同一作用域重複宣告兩個 User。問「type User 會在 runtime 建立一個 User 類別嗎？」停 5 秒，答案是不會；它只是型別的名字。再用 20 秒交代後面沿用左邊的 interface User，而 type 用來描述「成功或失敗」。最後 10 秒銜接 API 結果。\n邊界：兩者對一般 object shape 經常都能用，不表示所有功能完全相同。declaration merging、extends、intersection 留待被問到時再補，不列入主線。不把命名型別當成轉型或驗證。\n銜接：一個 API 結果可能成功，也可能失敗；用 union 把兩種結構分清楚。\n參考：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
  "40:30–42:30｜2 分鐘｜用 API 結果理解 union\n核心：聯合型別描述兩種可能的結構：成功有 User，失敗有錯誤訊息。\n講法：先用 40 秒讀 type UserResult，將 | 讀成「或」。逐一指出 ok: true 與 data: User 成一組，ok: false 與 error: string 成另一組。這裡的 true／false 是特定值的型別，保留了欄位間的關聯；如果只有 ok: boolean 加上兩個 optional 欄位，就沒有同樣清楚的保證。這個對比只口頭提一句，不額外寫第三種模型。\n互動：用約 25 秒確認成功分支保證哪些欄位，然後按右鍵揭露問題：「還沒判斷 ok，可以直接讀 result.data 嗎？」停 5 秒。答案是不行，因為可能是失敗分支，根本不保證有 data。剩餘 50 秒用問題帶到下一頁的 if。\n邊界：這是我們在程式中約定的 service 結果模型，不是 fetch 的 Response 或 JavaScript 的 Promise 狀態；ok: false 不代表 Promise 必然 rejected。Union 不會在 runtime 驗證外部 JSON，也不會移除額外欄位；此處只講每個分支保證可用哪些欄位。\n銜接：用真正會執行的 if 判斷 ok，讓 TS 知道現在是哪個分支。\n參考：https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
  "42:30–44:30｜2 分鐘｜Narrowing 與 discriminated union\n核心：共同欄位 ok 的特定值，可以區分 union；TS 跟著 if／else，確認每一行能讀取的欄位。\n講法：先花 30 秒從 showUser 的 UserResult 輸入讀到 if (result.ok)。問「這裡還可能是失敗結果嗎？」停 5 秒後按右鍵揭露成功說明：不可能，所以 data 是 User、name 是 string，可以用 toUpperCase()。再花 30 秒讀 else，第二次揭露：ok 是 false，所以 error 是 string，這裡不能直接取 data。\n互動：用約 20 秒追問「如果把 result.data.name 放到 if 前面，會怎樣？」答案是型別檢查會指出 data 不是每一個分支都有。最後約 35 秒讀黃色結論並命名 discriminated union：共用一個欄位，但它的特定值會分辨不同結構。\n邊界：if 是保留並執行的 JavaScript；TS 在執行前分析這條控制流程。Narrowing 不會替資料轉型，也不會把所有外部值驗證成 User。範例在 strict 型別檢查下使用；不用 as 強制跳過檢查。\n銜接：如果使用者清單也需要相同成功／失敗包裝，下一頁讓成功資料型別可替換。\n參考：https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
  "44:30–46:30｜2 分鐘｜同一個 ApiResult<T>\n核心：泛型把成功資料的型別保留下來；union 的成功／失敗關係保持不變。\n講法：先用 40 秒把上一頁 UserResult 的 User 換成 T，讀 ApiResult<T>：成功的 data 是 T，失敗的 error 仍是 string。再用 30 秒讀兩個實例，ApiResult<User> 的成功資料是一個 User；ApiResult<User[]> 的成功資料是 User 陣列，[] 在這裡表示陣列型別。UserResult 這行是改寫先前的定義，不是在同一作用域宣告第二個同名 alias。\n互動：問「對 ApiResult<User[]>，是不是一拿到 result 就能讀 data.length？」停 5 秒。答案是仍要先判斷 ok；成功分支才保證 data 是陣列。若直接使用 any，就失去這個位置的檢查，例如 data.naem 拼錯也可能不被阻止。最後約 45 秒連回 T 只是可替換的型別位置，並轉向資料來源。\n邊界：T 不是 runtime 參數，寫 ApiResult<User> 不會建立、轉型或驗證 User。泛型仍需遵守已經看過的 narrowing；不教 conditional types、infer 或複雜約束。\n銜接：如果 User 是我們自己建立，TS 看得見欄位；如果它來自網路，這些保證從哪裡來？\n參考：https://www.typescriptlang.org/docs/handbook/2/generics.html",
  "46:30–48:00｜1 分 30 秒｜未知外部資料\n核心：合法 JSON 與符合 User shape 是兩件事；unknown 要求先檢查，卻不會自己執行驗證。\n講法：先用 25 秒指右側回應，問「這是合法 JSON 嗎？符合 User 嗎？」等 5 秒，答案是 JSON 語法合法，但 id 是字串、name 是 null，與 User 不符。接著用 30 秒讀左側 const raw: unknown = await response.json()，強調將值接到 unknown，會阻止我們未檢查就讀 raw.name。對照舊寫法 const user: User = await response.json()：標準 DOM 型別讓解析結果成為 any，any 能指派給 User，所以編譯時可通過，卻沒有驗證。改用 unknown 就是主動把這條寬鬆路徑截住，要求後續先檢查；換成 as User 也不會多出驗證。\n邊界：這段節錄假設 HTTP 已成功；下一頁之後會補完整邊界。標準 DOM 型別的 response.json() 回傳 Promise<any>，將 await 後的值明確接成 unknown，可以避免 any 繼續向內傳。unknown 接受任何值，但它是靜態型別，並不是驗證器。response.json() 只解析 JSON；非法 JSON 仍可能拋錯。\n銜接：最後 30 秒讀底部流程：外部 JSON → unknown → 真的執行欄位檢查 → User。下一頁打開檢查函式，不把解法停在名詞。\n參考：https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown",
  "48:00–51:00｜3 分鐘｜parseUser 的實際欄位檢查\n核心：以實際 JavaScript 條件拒絕不符合 User 的值；只有檢查通過才回傳 User。\n講法：先花 30 秒讀輸入 unknown、回傳 User，指出回傳註記是要達成的契約，真正的驗證在函式內。接著花 70 秒逐段看條件：typeof 確認物件且排除 null；in 確認欄位存在；再檢查 id 的 typeof 是 number、name 的 typeof 是 string。|| 是「任一不符合就失敗」，短路會讓前面不符合時停止，不會對 null 再做 in。typeof null 會得到 object，因此必須另外排除 null。\n互動：用 30 秒問兩個輸入結果：{ id: 1, name: \"Kylen\" } 會回傳 User；{ id: \"ABC\", name: null } 會拋 Invalid User，不會走到 return。缺少 name 也會失敗。可讓聽眾各說一個拒絕原因。\n講法續：再花 30 秒看最後 return，它建立一個只含已確認 id 與 name 的新物件。TS 沿檢查流程知道這兩個欄位型別，這裡沒有使用型別斷言或虛假的 type predicate。最後 20 秒提醒此頁的 throw 還需要上層接住。\n邊界：此例只落實 User 的兩個欄位型別；不承諾 id 為正整數、name 非空、唯一性、權限或完整業務規則。那些若是契約，需另加檢查。in 可以看見繼承欄位；這不是嚴格限定 plain object 或自有屬性的完整 schema validator，重點是檢查來源為 JSON 的最小 User shape。正式系統可用 schema 工具集中維護，但這裡不新增依賴或教工具語法。\n銜接：下一頁把 HTTP、JSON 解析、這個驗證函式串起來，並明確處理成功與失敗。\n參考：https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
  "51:00–53:30｜2 分 30 秒｜邊界回傳 ApiResult<User>\n核心：驗證成功才產生 ok: true；失敗在這層轉成明確的 ok: false，讓呼叫端處理。\n講法：先用 30 秒定位 loadUser(): Promise<ApiResult<User>>：async 函式回 Promise，await 後拿到我們定義的結果；endpoint 本身回的是 User JSON，ApiResult 包裝由這個函式建立。接著用 45 秒由上到下讀 try：fetch 取得 Response，先檢查 response.ok；解析 JSON 並接成 unknown；parseUser 通過後才放入 data。response.ok 是 HTTP 是否為 2xx，與回傳物件上的 ok 分屬不同物件，命名相同但角色不同。\n互動：問「如果 HTTP 200，但 name 是 null，最後會走哪裡？」停 5 秒，答案是 parseUser 拋錯，進 catch，回傳 ok: false。用約 25 秒列出四種失敗來源：網路拒絕、非 2xx 的 HTTP、JSON 語法錯誤、User shape 不符。fetch 不會只因 404／500 自動 reject，因此 HTTP 判斷不可省略。\n錯誤責任：再用 30 秒連回前半場 catch：這裡刻意把錯誤轉為有型別的結果，不是只 log 後回 undefined。catch 正常回傳後，Promise 是 fulfilled；呼叫端必須檢查 result.ok，才能使用 data 或顯示 error。可以口頭說 await loadUser() 的結果直接交給之前的 showUser，兩者契約相同。不要把 fulfilled 當成業務成功。\n邊界：這是教學用的統一錯誤訊息，原始錯誤記錄在 console；實際服務可依需求分類或交給上層。假設 console.error 本身正常執行。不展開 timeout、取消、重試或 HTTP 錯誤分類，以維持 20 分鐘主線。\n銜接：最後 15 秒指出 API 結果模型、narrowing、generic、unknown 與 runtime validation 現在串成同一條流程，進入全場回顧。\n參考：https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_response_status",
  "53:30–55:00｜1 分 30 秒｜整場回顧\n核心：後端工程師讀 JS／TS 時，持續問三件事：工作是否相依、錯誤交給誰、資料是否真的符合契約。\n講法：用 20 秒讀第一欄，相依工作仍要依序，獨立 I/O 才考慮並行；Promise.all 失敗不會替其他工作取消。再用 20 秒讀第二欄，async 不會把同步計算搬到另一個執行緒；await 暫停目前函式的後續，Promise 後續仍循 microtask 規則。用 20 秒讀第三欄：union 描述成功與失敗，generic 保留 data 的型別；外部資料需要可執行的檢查。\n互動：剩餘 30 秒快速問「catch 回 ok: false，Promise 是 rejected 嗎？」答案是否，正常 return 會 fulfilled；再問「把 API JSON 標成 User 就完成驗證了嗎？」答案是否，必須實際執行 parseUser 這類檢查。讀黃色行動句完成教學。\n邊界：靜態型別檢查與 runtime validation 是互補責任；並行與額外執行緒也不是同一件事。不要在回顧加入新工具或新語法。\n收尾：55:00 結束主線，55:00–60:00 保留原訂 5 分鐘 Q&A／緩衝。TypeScript 段含本頁共 20 分鐘，互動停頓已包含在各頁配時。"
];

export default [
  Cover,
  Agenda,
  CallbackBasics,
  TimerCallback,
  MainThread,
  DependentCallbacks,
  CallbackHellVisual,
  PromiseMeaning,
  PromiseResolve,
  PromiseChain,
  PromiseFailure,
  AsyncAwait,
  AwaitMeaning,
  IndependentRequests,
  ParallelConditions,
  ParallelFailure,
  CatchOutcome,
  TwoQueues,
  LoopRule,
  OrderAnswer,
  FetchBoundary,
  AsyncCpu,
  Recap,
  TypeScriptBoundary,
  TypeInference,
  StructuralTyping,
  InterfaceAndType,
  UnionType,
  TypeNarrowing,
  GenericResponse,
  RuntimeValidation,
  ParseUser,
  ValidateAtBoundary,
  FullSessionRecap
] satisfies Page[];
