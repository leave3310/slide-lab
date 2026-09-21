import type { CSSProperties, ReactNode } from 'react';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

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

// The teaching order introduces functions and Promise before using them to explain the event loop.
// All examples are excerpts or annotated adaptations of the two supplied notes.
const Cover: Page = () => (
  <section style={root}>
    <div style={{ position: 'absolute', top: 128, left: 120, ...label, color: muted }}>DAY 01 / 給初次接觸 JS 的後端工程師 / KYLEN</div>
    <div aria-hidden="true" style={{ position: 'absolute', top: 270, right: 120, width: 260, height: 420, background: yellow, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24, boxSizing: 'border-box', fontFamily: mono, fontSize: 110, fontWeight: 800, color: '#252620' }}>JS</div>
    <h1 style={{ position: 'absolute', top: 298, left: 120, margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 850, lineHeight: 1.15, letterSpacing: -5 }}>JavaScript<br />執行與非同步</h1>
    <p style={{ position: 'absolute', left: 126, top: 742, margin: 0, fontSize: 36, lineHeight: 1.5, color: muted }}>從看懂一個函式，到理解非同步程式的執行順序。</p>
    <Footer section="從 Event Loop 到 TypeScript" />
  </section>
);

const Agenda: Page = () => (
  <Frame eyebrow="今天的路線" title="你已經會寫程式，先接上 JS 的寫法。" titleSize={72}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 20 }}>
      <Process n="01 / 先看懂" title="函式怎麼傳？">從參數、呼叫，<br />讀懂 callback。</Process><Arrow />
      <Process n="02 / 再整理" title="下一步怎麼接？">從巢狀 callback，<br />到 Promise、await。</Process><Arrow />
      <Process n="03 / 最後追蹤" title="什麼時候執行？" accent>用已經看懂的程式，<br />理解 Event Loop。</Process>
    </div>
    <Strip style={{ marginTop: 58 }}>本段約 35 分鐘 · TypeScript 預留 20 分鐘 · 緩衝 5 分鐘</Strip>
  </Frame>
);

const ReadFunction: Page = () => (
  <Frame eyebrow="01 / 先看懂函式" title="這個函式：收一個數字，印出它的十倍。" titleSize={70} section="讀懂範例">
    <Code title="教材的 multiNum 函式" size={40}>{`const multiNum = (num) => console.log(num * 10);`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginTop: 46 }}>
      <Note tag="const multiNum =" title="替函式取名">把這個函式存到<br />multiNum 這個名稱。</Note>
      <Note tag="(num) => ..." title="輸入與要做的事">num 是參數；<br />箭頭後面是函式內容。</Note>
      <Note tag="console.log(...)" title="把值印出來">在這裡可以理解成<br />「印出 num × 10」。</Note>
    </div>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 30 }}>這裡的 =&gt; 是「箭頭函式」寫法；先讀成「收到 num，就做後面的事」。</p>
  </Frame>
);

const PassFunction: Page = () => (
  <Frame eyebrow="01 / CALLBACK 是什麼" title="函式也能當參數：把要做的事傳進去。" titleSize={70} section="CALLBACK">
    <Code title="先看呼叫端" size={48}>{`addNum(6, 2, multiNum);`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginTop: 50 }}>
      <Note tag="6、2" title="前兩個參數是數字">交給 addNum 做加法。</Note>
      <Note tag="multiNum" title="第三個參數是一個函式">交給 addNum 決定何時呼叫。<br />這個角色就叫 callback（回呼）。</Note>
    </div>
    <Strip style={{ marginTop: 28 }}>multiNum：把函式傳過去　／　multiNum(8)：現在呼叫它</Strip>
  </Frame>
);

const CallbackTrace: Page = () => (
  <Frame eyebrow="01 / 沿著一次呼叫看" title="加完、判斷完，再呼叫傳進來的函式。" titleSize={70} section="CALLBACK">
    <div style={{ display: 'grid', gridTemplateColumns: '1120px 1fr', gap: 64 }}>
      <Code size={34} title="callback 參數會接到剛才的 multiNum">{`const addNum = (a, b, callback) => {
  const plusNum = a + b;
  if (plusNum > 5) {
    callback(plusNum);
  } else {
    console.log('the plusNum < 5');
  }
};
addNum(6, 2, multiNum);`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 36 }}>
        <Note tag="① 相加，再判斷" title={<>6 + 2 = 8<br />8 &gt; 5</>} />
        <div style={{ padding: 28, background: yellow }}><div style={{ ...label, marginBottom: 16 }}>② callback(8)</div><div style={{ fontSize: 36, lineHeight: 1.5 }}>執行 multiNum(8)<br />印出 <strong style={{ fontFamily: mono, fontSize: 52 }}>80</strong></div></div>
      </div>
    </div>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 20 }}>這一例會直接呼叫 callback；callback 這個名稱，本身不代表非同步。</p>
  </Frame>
);

const TimerCallback: Page = () => (
  <Frame eyebrow="01 / 從直接呼叫，到稍後執行" title="setTimeout：先安排，稍後再呼叫函式。" titleSize={70} section="同步與非同步">
    <div style={{ display: 'grid', gridTemplateColumns: '1070px 1fr', gap: 64 }}>
      <Code size={36} title="先從 Event Loop 範例抽出三行">{`console.log("1");
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

const DependentWork: Page = () => (
  <Frame eyebrow="02 / 你熟悉的相依流程" title="第二步，要用第一步的結果。" section="相依工作">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 20 }}>
      <Process n="doSomething" title="第一步">取得 result。</Process><Arrow />
      <Process n="doSomethingElse" title="第二步">使用 result，<br />產生 newResult。</Process><Arrow />
      <Process n="doThirdThing" title="第三步" accent>使用 newResult，<br />產生 finalResult。</Process>
    </div>
    <p style={{ ...body, marginTop: 52 }}>如果每一步都要等工作完成，要怎麼把「接下來做什麼」寫清楚？</p>
    <p style={{ fontSize: 26, color: muted, marginTop: 30 }}>這三個名稱是教材的示意函式；不是 JavaScript 內建 API。</p>
  </Frame>
);

const CallbackHell: Page = () => (
  <Frame eyebrow="02 / CALLBACK：把下一步放進去" title="完成第一步後，再做第二步、第三步。" titleSize={72} section="CALLBACK">
    <Code size={32} title="讀法：每一層函式，都是上一步完成後要做的事">{`doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(\`Got the final result: \${finalResult}\`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 38 }}>
      <p style={{ ...body, fontSize: 32 }}><strong>成功：往內一層，做下一步。</strong><br />步驟越多，縮排越深：callback hell。</p>
      <p style={{ ...body, fontSize: 32 }}><strong>失敗：呼叫 failureCallback。</strong><br />這是教材中負責處理錯誤的函式。</p>
    </div>
  </Frame>
);

const PromiseMeaning: Page = () => (
  <Frame eyebrow="02 / PROMISE 是什麼" title="先拿到 Promise，再接續處理工作的結果。" titleSize={68} section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginTop: 16 }}>
      <div style={{ background: surface, padding: 40, minHeight: 344, boxSizing: 'border-box' }}>
        <div style={{ ...label, color: muted }}>呼叫端現在拿到</div>
        <h2 style={{ fontSize: 72, margin: '28px 0' }}>Promise</h2>
        <p style={body}>一個表示工作結果的物件。<br />結果可能還在等待中。</p>
      </div>
      <div style={{ borderTop: `4px solid ${ink}`, paddingTop: 40 }}>
        <div style={{ ...label, color: muted }}>接下來怎麼用</div>
        <h2 style={{ fontSize: 48, lineHeight: 1.35, margin: '28px 0' }}>成功拿到值 → .then()<br />發生錯誤 → .catch()</h2>
        <p style={body}>把後續工作，接在 Promise 上。</p>
      </div>
    </div>
    <Strip style={{ marginTop: 56 }}>例如：doSomething() 先回傳 Promise，完成時才提供網址字串。</Strip>
  </Frame>
);

const PromiseResolve: Page = () => (
  <Frame eyebrow="02 / 誰提供完成的結果" title="resolve：告訴 Promise「成功了，值是這個」。" titleSize={64} section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1120px 1fr', gap: 64 }}>
      <Code size={34} title="function doSomething() 宣告一個名叫 doSomething 的函式">{`function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 36 }}>
        <Note tag="return new Promise(...)" title="先回傳 Promise">裡面的函式用來安排工作。</Note>
        <Note tag="resolve(網址)" title="成功時提供網址">resolve 是 Promise<br />提供的函式。</Note>
      </div>
    </div>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 24 }}>這裡用 200 毫秒的計時器示意一段需要等待的工作。</p>
  </Frame>
);

const ReadThen: Page = () => (
  <Frame eyebrow="02 / 先看一個 .then()" title="then 裡的函式，收到上一步成功的結果。" titleSize={68} section="PROMISE">
    <Code size={42} title="從完整 Promise chain 抽出第一段">{`doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  });`}</Code>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 44 }}>
      <Note tag="function (result) { ... }" title="這也是一個 callback">result 是上一步交過來的值。</Note>
      <Note tag="return doSomethingElse(result)" title="把下一步的工作接上">回傳值會交給後續的 .then()。</Note>
    </div>
  </Frame>
);

const PromiseChain: Page = () => (
  <Frame eyebrow="02 / 把同一個流程攤平" title="用 return 接上下一步，結果就能往下傳。" titleSize={70} section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1190px 1fr', gap: 56 }}>
      <Code size={30} title="每一段 .then() 都沿用上一頁的讀法">{`doSomething()
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
  <Frame eyebrow="02 / 如果中途失敗呢" title="跳過後面的成功處理，交給 catch。" section="PROMISE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 18 }}>
      <Process n="假設第二步" title="發生錯誤">doSomethingElse<br />沒有成功完成。</Process><Arrow />
      <Process n="後續成功 callback" title="先跳過">不執行第三步，<br />也不印成功的結果。</Process><Arrow />
      <Process n=".catch(failureCallback)" title="處理錯誤" accent>由 failureCallback<br />接到錯誤。</Process>
    </div>
    <Strip style={{ marginTop: 54 }}>這條鏈把錯誤處理集中在尾端，讓成功流程更容易閱讀。</Strip>
  </Frame>
);

const AwaitCompare: Page = () => (
  <Frame eyebrow="02 / ASYNC、AWAIT 改善哪裡" title="同樣等上一步，但可以由上往下讀。" titleSize={72} section="ASYNC / AWAIT">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <Code size={30} title="用 .then() 接下一步">{`doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  });`}</Code>
      <Code size={30} title="在 async 函式裡，用 await 接下一步">{`const result =
  await doSomething();
const newResult =
  await doSomethingElse(result);`}</Code>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 42 }}>
      <p style={body}>「成功後，呼叫這個函式。」</p>
      <p style={body}>「等到結果，再執行下一行。」</p>
    </div>
    <Strip style={{ marginTop: 46 }}>await：等待這一步的 Promise 結果；這裡把它寫在 async 函式裡。</Strip>
  </Frame>
);

const AsyncAwait: Page = () => (
  <Frame eyebrow="02 / 加回完整的成功與失敗流程" title="try 寫正常步驟，catch 接住錯誤。" section="ASYNC / AWAIT">
    <div style={{ display: 'grid', gridTemplateColumns: '1190px 1fr', gap: 56 }}>
      <Code size={30} title="async function foo()：宣告這個非同步函式">{`async function foo() {
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
  <Frame eyebrow="02 / 等待的是誰" title="await 等待結果，主執行緒仍能處理其他工作。" titleSize={64} section="ASYNC / AWAIT">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginTop: 12 }}>
      <div style={{ background: surface, padding: 40, minHeight: 344, boxSizing: 'border-box' }}>
        <div style={{ ...label, color: muted }}>目前這個 async 函式</div>
        <h2 style={{ fontSize: 52, lineHeight: 1.3, margin: '28px 0' }}>後面的步驟<br />等結果回來再繼續。</h2>
        <p style={{ ...body, fontSize: 32 }}>例如：第二步需要第一步的 result。</p>
      </div>
      <div style={{ borderTop: `4px solid ${ink}`, paddingTop: 40 }}>
        <div style={{ ...label, color: muted }}>瀏覽器主執行緒</div>
        <h2 style={{ fontSize: 52, lineHeight: 1.3, margin: '28px 0' }}>等待期間，<br />可以接續其他工作。</h2>
        <p style={{ ...body, fontSize: 32 }}>不用停住整個 JavaScript 執行緒。</p>
      </div>
    </div>
    <Strip style={{ marginTop: 56 }}>async / await 沿用 Promise 機制，把相同流程改成較好讀的寫法。</Strip>
  </Frame>
);

const TwoQueues: Page = () => (
  <Frame eyebrow="03 / 現在來看：誰先執行" title="準備好的後續程式，會進入不同的佇列。" titleSize={70} section="EVENT LOOP">
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
        <p style={{ ...body, fontSize: 32, color: muted, marginTop: 30 }}>對應的 Promise 結果確定後，<br />才安排這些後續程式。</p>
      </div>
    </div>
    <p style={{ ...body, fontSize: 32, color: muted, marginTop: 44 }}>佇列（queue）：放著準備好、等待執行的工作。</p>
  </Frame>
);

const LoopRule: Page = () => (
  <Frame eyebrow="03 / EVENT LOOP：安排接下來的執行" title="目前的 task 結束，先清空 microtask。" titleSize={72} section="EVENT LOOP">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 22 }}>
      <Process n="01 / 先做完現在這段" title="目前的 task">例如：目前這段 script。<br />等 Call Stack 清空。</Process><Arrow />
      <Process n="02 / 接著處理" title="Microtask" accent>把已排入的微任務做完，<br />直到佇列清空。</Process><Arrow />
      <Process n="03 / 再繼續" title="下一個 task">例如：準備好的<br />計時器 callback。</Process>
    </div>
    <p style={{ ...body, marginTop: 58 }}>Event Loop（事件迴圈）持續安排：主執行緒接下來執行哪個工作。</p>
    <p style={{ fontSize: 28, color: muted, lineHeight: 1.5, marginTop: 24 }}>這裡用教材的簡化流程理解順序；佇列內的工作依先進先出（FIFO）處理。</p>
  </Frame>
);

const OrderAnswer: Page = () => (
  <Frame eyebrow="03 / 把剛才的觀念合起來" title="現在，一起讀懂 1 → 4 → 3 → 2。" section="EVENT LOOP">
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
  <Frame eyebrow="03 / 換成網路請求時" title="fetch 負責發請求，Promise 接續處理結果。" titleSize={66} section="EVENT LOOP">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr 64px 1fr', gap: 16, alignItems: 'center', marginTop: 24 }}>
      <Process n="fetch()" title="發出網路請求">回傳 Promise，<br />網路工作由瀏覽器處理。</Process><Arrow />
      <Process n="Promise 結果確定" title="有結果可處理">安排對應的後續程式。</Process><Arrow />
      <Process n="MICROTASK" title="接續執行" accent>例如 .then() 的 callback、<br />await 後面的程式。</Process>
    </div>
    <Strip style={{ marginTop: 56 }}>microtask 的順序規則，不代表網路請求會立刻完成。</Strip>
    <p style={{ ...body, fontSize: 32, color: muted, marginTop: 32 }}>要分開看「外部工作何時完成」與「完成後的程式何時執行」。</p>
  </Frame>
);

const Recap: Page = () => (
  <Frame eyebrow="回顧 / 帶走這四個讀法" title="下次看到這些寫法，就知道在處理什麼。" titleSize={70}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '44px 72px' }}>
      <Note tag="CALLBACK" title="把接下來要做的事，傳給別人。">看誰會呼叫這個函式。</Note>
      <Note tag="PROMISE" title="把成功與失敗的後續接起來。">看 .then() 怎麼回傳、.catch() 怎麼處理。</Note>
      <Note tag="ASYNC / AWAIT" title="等到需要的結果，再往下做。">等待的是目前函式的後續步驟。</Note>
      <Note tag="EVENT LOOP" title="理解準備好的工作，何時執行。">目前 task → 清空 microtask → 下個 task。</Note>
    </div>
    <p style={{ fontSize: 22, lineHeight: 1.5, color: muted, marginTop: 42 }}>教材：〈js Event loop〉、〈從 Callback 到 Promise 再到 async、await 的演進歷史〉</p>
  </Frame>
);

// Part 3: nine questions, 20 minutes. Reuse the runtime model; add static checking.
const TypeScriptBoundary: Page = () => (
  <Frame eyebrow="PART 3 / TYPESCRIPT / 01" title="多了型別，程式的執行方式會改變嗎？" titleSize={72} section="TYPESCRIPT">
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
      <Note tag="執行前多一道檢查" title="呼叫時，有沒有傳錯型別？">例如 add("1", 2)，會收到型別錯誤。</Note>
      <Note tag="RUNTIME 沿用剛才的模型" title="執行的仍然是 JavaScript。"><div style={{ fontSize: 32, lineHeight: 1.5 }}>Event Loop、Call Stack、Promise、<br />async / await、task / microtask 都不變。</div></Note>
    </div>
    <Strip style={{ marginTop: 20 }}>這些型別在 compile time 參與檢查；runtime 不會保留型別註記。</Strip>
  </Frame>
);

const TypeInference: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 02 / 從程式碼看得出來的事" title="每個地方，都要手動標型別嗎？" section="TYPE INFERENCE">
    <div style={{ display: 'grid', gridTemplateColumns: '970px 1fr', gap: 64 }}>
      <Code title="只標明函式的輸入" language="TS" size={36}>{`const name = "Kylen";
const age = 20;

function add(a: number, b: number) {
  return a + b;
}`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 36 }}>
        <Note tag="① 從初始值推斷 / LITERAL TYPE" title="const 保留更精確的型別。">name → "Kylen"（string）<br />age → 20（number）</Note>
        <Note tag="② 從 return 推斷" title="add 的回傳型別 → number">兩個 number 相加，結果也是 number。</Note>
      </div>
    </div>
    <Strip style={{ marginTop: 36 }}>Type inference（型別推斷）：能從程式碼知道的，不必重複 annotation。</Strip>
  </Frame>
);

const StructuralTyping: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 03 / 後端工程師最需要換的視角" title="沒有 implements User，為什麼也能傳入？" titleSize={68} section="STRUCTURAL TYPING">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <Code title="函式需要的結構 / SHAPE" language="TS" size={32}>{`interface User {
  id: number;
  name: string;
}
function printUser(user: User) {
  console.log(user.name);
}`}</Code>
      <div>
        <Code title="呼叫端已經有的資料" language="TS" size={32}>{`const data = {
  id: 1,
  name: "Kylen",
  email: "kylen@example.com"
};

printUser(data); // OK`}</Code>
      </div>
    </div>
    <Strip style={{ marginTop: 30 }}>Structural typing：主要看「至少具有需要的 shape」，不要求正式宣告屬於 User。</Strip>
    <p style={{ ...body, fontSize: 28, color: muted, marginTop: 16 }}>直接傳入新寫的 object literal，另有多餘屬性檢查；這裡傳的是既有變數 data。</p>
  </Frame>
);

const UnionType: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 04 / 同一個輸入有兩種可能" title="ID 可能是字串，也可能是數字，怎麼寫？" titleSize={70} section="UNION TYPE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
      <Code title="先把可能性寫出來" language="TS" size={36}>{`function printId(id: string | number) {
  console.log(id);
}

printId("A12");
printId(12);`}</Code>
      <Note tag="STRING | NUMBER" title="其中一種，就符合輸入要求。">這就是 union type（聯合型別）。<br /><br />進到函式時，還不知道這次<br />收到的是哪一種。</Note>
    </div>
    <Steps>
      <Step><Strip style={{ marginTop: 42 }}>這時直接呼叫 id.toUpperCase()？還不行，因為 id 也可能是 number。</Strip></Step>
    </Steps>
  </Frame>
);

const TypeNarrowing: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 05 / 先判斷，再使用" title="進到這個分支，id 還可能是數字嗎？" titleSize={72} section="NARROWING">
    <div style={{ display: 'grid', gridTemplateColumns: '1050px 1fr', gap: 64 }}>
      <Code title="沿著 JavaScript 的 control flow 往下讀" language="TS" size={34}>{`function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}`}</Code>
      <div style={{ display: 'grid', alignContent: 'start', gap: 30 }}>
        <Steps>
          <Step><Note tag="IF 成立 / 只剩 STRING" title="可以用 toUpperCase()。">typeof 是實際執行的 JS 判斷。</Note></Step>
          <Step><Note tag="ELSE / 排除 STRING" title="這裡只剩 number。">TS 在檢查時追蹤這個分支。</Note></Step>
        </Steps>
      </div>
    </div>
    <Strip style={{ marginTop: 36 }}>Narrowing（型別縮小）：跟著流程，判斷這一行的值還可能是哪些型別。</Strip>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 12 }}>前半場追蹤「什麼時候執行」；現在追蹤「這一行可能是什麼型別」。</p>
  </Frame>
);

const InterfaceAndType: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 06 / 替型別命名" title="同一個 User shape，可以怎麼描述？" titleSize={72} section="INTERFACE / TYPE">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <div>
        <Code title="INTERFACE / 描述 OBJECT SHAPE" language="TS" size={30}>{`interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}`}</Code>
        <p style={{ ...body, fontSize: 30, marginTop: 24 }}>用 extends 擴充 shape。<br />也支援同名宣告合併（declaration merging）。</p>
      </div>
      <div>
        <Code title="TYPE / 同樣能描述 USER，也能組合型別" language="TS" size={30}>{`type User = {
  id: number;
  name: string;
};

type ID = string | number;
type Status =
  | "pending" | "success" | "error";`}</Code>
        <p style={{ ...body, fontSize: 30, marginTop: 24 }}>替型別命名，也能表達 union、intersection。<br />一般 object shape，兩者很多時候都可以。</p>
      </div>
    </div>
  </Frame>
);

const GenericResponse: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 07 / 沿用 USER：ID + NAME" title="共用 API 包裝，怎麼保留 data 的型別？" titleSize={70} section="GENERICS">
    <div style={{ display: 'grid', gridTemplateColumns: '700px 1fr', gap: 48 }}>
      <div>
        <Code title="先看這個版本：DATA 是 ANY" language="TS" size={30}>{`interface ApiResponse {
  data: any;
  message: string;
}`}</Code>
        <p style={{ ...body, fontSize: 30, marginTop: 24 }}>any 不會擋下 data.naem 的拼字錯誤。</p>
        <div style={{ marginTop: 32 }}><Note tag="GENERICS / 泛型" title="T：先保留一個型別的位置。">填入 User，data 就是 User。</Note></div>
      </div>
      <Steps>
        <Step>
          <Code title="填入 USER，後續仍然知道 NAME 是 STRING" language="TS" size={30}>{`interface ApiResponse<T> {
  data: T;
  message: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "Kylen" },
  message: "success"
};

response.data.name.toUpperCase();`}</Code>
        </Step>
      </Steps>
    </div>
  </Frame>
);

const RuntimeValidation: Page = () => (
  <Frame eyebrow="TYPESCRIPT / 08 / 回到剛才的 FETCH" title="API 回傳的資料，真的就是 User 嗎？" titleSize={72} section="RUNTIME BOUNDARY">
    <div style={{ display: 'grid', gridTemplateColumns: '970px 1fr', gap: 56 }}>
      <div>
        <Code title="ASYNC 函式內的節錄 / 編譯時通過" language="TS" size={30}>{`interface User {
  id: number;
  name: string;
}
const user: User = await fetch("/api/user")
  .then(res => res.json());
user.name.toUpperCase();`}</Code>
        <p style={{ ...body, fontSize: 30, color: muted, marginTop: 22 }}>此處 res.json() 的型別是 any；標註 User 沒有驗證資料。</p>
      </div>
      <Steps>
        <Step>
          <div>
            <Code title="API 實際回傳 / 合法 JSON" language="JSON" size={34}>{`{
  "id": "ABC",
  "name": null
}`}</Code>
            <div style={{ marginTop: 28 }}><Note tag="INTERFACE 已移除 / 不會驗證" title="null 無法使用這個方法。" /></div>
          </div>
        </Step>
      </Steps>
    </div>
    <Strip style={{ marginTop: 26 }}>外部資料 → runtime schema validation → 再作為 User 使用</Strip>
  </Frame>
);

const FullSessionRecap: Page = () => (
  <Frame eyebrow="整場回顧 / 三個問題，三個責任" title="從執行順序，到資料進入系統的邊界。" titleSize={72} section="JAVASCRIPT → TYPESCRIPT">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 36, marginTop: 8 }}>
      <Process n="JAVASCRIPT" title="程式怎麼執行？">Event Loop<br />Promise<br />async / await</Process>
      <Process n="TYPESCRIPT" title="執行前能知道什麼？">Type / 資料的 shape<br />Narrowing / 流程中的型別<br />Generic / 保留型別資訊</Process>
      <Process n="RUNTIME BOUNDARY" title="外部資料符合型別嗎？" accent>Runtime validation<br />API response / localStorage<br />URL params / user input</Process>
    </div>
    <p style={{ ...body, fontSize: 30, color: muted, marginTop: 28 }}>邊界可用 Zod、JSON Schema validator 等做驗證；API contract 也需要實際落實檢查。</p>
    <Strip style={{ marginTop: 30 }}>JavaScript 決定怎麼跑；TypeScript 在執行前描述與檢查資料的 shape。<br />外部資料進入系統時，仍需要 runtime validation。</Strip>
  </Frame>
);

export const meta: SlideMeta = {
  title: 'Day 1｜JavaScript 執行與非同步 — Kylen',
  createdAt: '2026-09-15T03:11:44.021Z',
};

// Speaker notes preserve source details while the main path stays accessible to JS beginners.
// A: /Users/athena/Desktop/群組筆記/筆記/Source/Post/js Event loop.md
// B: /Users/athena/Desktop/群組筆記/筆記/Source/Post/從 Callback 到 Promise 再到 async、await 的演進歷史.md
export const notes: (string | undefined)[] = [
  "00:00–00:30｜30 秒\n開場：這次假設聽眾會寫後端程式，但沒寫過 JavaScript。不要求先認得 JS 的符號，也不一開始就考輸出順序。先看懂教材的函式，再把相依流程寫清楚，最後用 Event Loop 解釋執行時機。來源：使用者的受眾修正與兩份教材。",
  "00:30–01:00｜30 秒\n交代三段路線：看懂 callback；整理相依非同步工作；回頭理解 Event Loop。共 35 分鐘，另外留 TS 20 分鐘與緩衝 5 分鐘。這是排練目標，現場互動使用緩衝時間。接著用 9 頁 TypeScript，把執行順序接到執行前的型別檢查。",
  "01:00–02:30｜1 分 30 秒\n來源 B 的 multiNum。只解讀本例必需的 JS 寫法，不擴充完整語法課：const 在這裡宣告名稱，等號右邊是一個函式；num 是參數；箭頭後面做乘法與輸出；console.log 可以理解成印出。提醒：宣告函式與呼叫函式是兩件事，這行先建立 multiNum，還沒印出數字。",
  "02:30–04:00｜1 分 30 秒\n來源 B 的 addNum 呼叫。強調參數不限於數字：multiNum 這個函式也能傳入。callback 是參數扮演的角色，不是特殊關鍵字。multiNum 沒有括號，代表把函式本身傳入；multiNum(8) 代表現在呼叫它。這個對照只是解讀原例，不引入額外的業務範例。",
  "04:00–05:30｜1 分 30 秒\n來源 B 的 addNum。接回上一頁已宣告的 multiNum，沿著 6 + 2 → 8 > 5 → callback(8) → multiNum(8) → 印 80 讀一次。a、b、callback 依序接到 6、2、multiNum。只講成立的分支；保留原稿 else 字串。這個例子同步呼叫 callback，callback 本身不等於非同步。",
  "05:30–07:30｜2 分鐘\n來源 A 的四行程式，暫時抽掉 Promise 那一行，先看計時器。setTimeout 收到函式與延遲毫秒數；() => ... 是無參數的箭頭函式。主程式安排計時後繼續往下，先印 1、4；稍後 callback 印 2。0 不代表立刻插隊。這裡不先講 task 與 microtask。",
  "07:30–09:00｜1 分 30 秒\n來源 A 技術修正與使用者大綱。範圍是瀏覽器主執行緒，不是宣稱整個瀏覽器只有一條執行緒，也不假設所有後端框架都用相同執行方式。Call Stack 用白話解讀成目前函式呼叫的執行進度；Web APIs 是瀏覽器提供的計時、網路等功能。同步工作占住主執行緒時，畫面和互動得等待。",
  "09:00–10:00｜1 分鐘\n來源 B 三個相依操作。先用聽眾熟悉的資料相依性讀流程：第二步需要第一步的 result，第三步需要第二步的 newResult。doSomething、doSomethingElse、doThirdThing 都是教材示意函式，不是 JS 內建 API；此時不要發明新的業務情境。",
  "10:00–12:00｜2 分鐘\n來源 B callback hell 程式。第一次看到 function (result) { ... } 時，先說這也是函式寫法：收到 result，就執行大括號裡的程式。按縮排逐層讀，不一次掃完。failureCallback 是處理失敗的示意函式；最後一行 console.log 用反引號與 ${finalResult} 把結果放進輸出文字，不需額外教字串語法。問題是流程一長，閱讀與錯誤處理散在巢狀結構中。",
  "12:00–13:30｜1 分 30 秒\n來源 B Summary 與 Promise 例子。Promise 是表示工作結果的物件，結果可能還在等待；它不是最後那個網址字串，也不代表新增一條 JavaScript 執行緒。先建立使用者看得懂的目的：成功時接 then，失敗接 catch。實際提供值的方法留到下一頁。",
  "13:30–15:30｜2 分鐘\n來源 B doSomething 的 Promise 建構例子。只追兩個動作：return new Promise 先把 Promise 交給呼叫端；200ms 計時器 callback 執行時，resolve(網址) 提供成功值。function doSomething() 是具名函式寫法，resolve 是 Promise 提供給內部函式的參數。new Promise 內的函式會立即執行並安排計時，不把它說成稍後才呼叫。此頁省去原稿英文註解，未改流程。",
  "15:30–17:30｜2 分鐘\n來源 B Promise chain 第一段。先解讀一個 then：它接收成功結果 result；傳給 doSomethingElse；用 return 把這一步串入後續流程。若回傳下一個 Promise，後續 then 就接續等待它的結果。不要跳到完整鏈之前就假設聽眾理解 return 的作用。",
  "17:30–19:30｜2 分鐘\n來源 B 完整 Promise chain。沿 result → newResult → finalResult 讀下去。前兩段 return 串起後續工作，最後一段只是印出結果，沒有 return 新工作。指出流程仍然相依，改變的是把多層巢狀改成往下接。不要把它說成平行呼叫 API。",
  "19:30–21:00｜1 分 30 秒\n來源 B 最後一段 Promise 說明。這條鏈每個 then 都只有成功處理；假設第二步拋錯或回傳的 Promise 失敗，就跳過第三步及最後的成功輸出，錯誤沿鏈傳到 catch(failureCallback)。不擴展到 catch 後續鏈的其他用法。",
  "21:00–22:30｜1 分 30 秒\n來源 B then 與 async/await 範例的前兩步。左邊先完成再呼叫 callback；右邊 await 取得 result，再傳到下一步。右邊是 async 函式內的節錄，不能照這個節錄誤解成任何函式裡都能用 await。只改換行以方便投影，語意與教材相同。",
  "22:30–24:30｜2 分鐘\n來源 B 完整 async function foo。async 標示這個非同步函式，內部用 await 依序取得三個結果。try 是正常流程；catch(error) 接到錯誤並交給 failureCallback。遇到錯誤跳到 catch，後續相依操作不繼續執行。這裡是函式定義，不是已經呼叫 foo；若口頭示範執行，需說明呼叫端會呼叫它。",
  "24:30–26:00｜1 分 30 秒\n來源 B Summary。await 等待的是目前 async 函式的後續，主執行緒在等待期間仍能做其他工作。把這件事連回計時器例子：外部工作未完成時，不必停住整個 JavaScript。不要推論「加上 async 就能讓大量同步計算不卡 UI」。這是同一個 Promise 流程較好讀的寫法。",
  "26:00–28:00｜2 分鐘\n來源 A 的兩類佇列。先定義 queue 是等待執行的工作，再分 task 與 microtask。主線只保留已見過的 setTimeout、then、await，避免第一次接觸 JS 就記 API 清單。Promise 結果確定後才安排對應的後續處理。補充備用：原稿還列出 setInterval、使用者事件 callback、MutationObserver、queueMicrotask；本次不要求背誦，也不把後兩者說成必須 Promise resolve 才能排入。",
  "28:00–29:30｜1 分 30 秒\n來源 A Cards 與技術修正。Event Loop 是安排主執行緒後續工作的事件迴圈。這裡使用原稿簡化模型：目前 task 結束、Call Stack 清空，先清空 microtask，再執行下一個 task。FIFO 指各佇列內的處理，不宣稱所有 task 來源都有單一全域順序。microtask checkpoint 是這段清空流程的名稱，放在講者備註即可。",
  "29:30–32:00｜2 分 30 秒\n來源 A 完整四行程式。先補一個已成功完成的 Promise：Promise.resolve()。它的 then 仍然安排為 microtask，並非在這一行直接執行 callback。由上一頁向前進入，按右鍵逐一揭露：直接印 1；timer 安排稍後；then 安排 microtask；直接印 4；目前 script 結束，微任務印 3，再由 timer task 印 2。可讓聽眾一起解讀，不作成尚未教完的突襲測驗。",
  "32:00–33:30｜1 分 30 秒\n來源 A fetch 技術修正。fetch 是發送網路請求的 API，先回傳 Promise；網路工作本身不是 microtask，Promise 結果確定後的 then／await 後續才以 microtask 接續。先後規則不代表請求在下一次點擊前就完成。備用原稿 click 範例：button.addEventListener(\"click\", () => { state.user = user; Promise.resolve().then(() => { state.ready = true; }); }); 使用者點擊後先設定 user，再由微任務設定 ready。此例留在備註，不在主線加入 state 物件與事件 API 的額外閱讀負擔。microtask 也不能消除所有非同步資料競爭；取消、過期回應、順序控制此處不展開。",
  "33:30–35:00｜1 分 30 秒\n用四個白話讀法結束：callback 傳要做的事，Promise 串後續成功或失敗，await 讀成等待本步結果，Event Loop 解釋執行順序。可口頭回問「multiNum 與 multiNum(8) 差在哪」「await 等待的是哪段程式」確認理解，不加入新例子。兩份教材中的細節收在講者備註，TS 20 分鐘與緩衝 5 分鐘保留。轉場：剛才回答的是程式怎麼執行；接下來看執行前，我們能先檢查哪些資料假設。",
  `35:00–37:00｜2 分鐘｜TypeScript 01
核心：JavaScript 決定怎麼執行；TypeScript 在執行前增加 static type checking，最後仍以 JavaScript 執行。
講法與讀碼：先用 15 秒接上一頁的執行順序，再指左邊 add 的兩個參數、回傳型別、return。對照右邊由上到下：型別註記移除，運算仍是 a + b。用 add("1", 2) 口頭說明會收到型別診斷，不必真的執行錯誤例子。最後指回 Event Loop、Call Stack、Promise、async / await、task / microtask：加上型別不改變這些執行機制。
易誤解：不像 JVM／CLR 裡某些型別資訊會留在 runtime；本例的 annotation 不會生成參數驗證，也不會把字串轉成數字。compile time 在此泛指執行前的靜態檢查，編輯器也能即時做；轉出 JS 與是否執行型別檢查是可分開的工具步驟。型別錯誤不等於 runtime 已經替你阻止輸入。
不延伸：不講編譯器架構、建置工具、tsconfig、降版輸出；也不把「所有 TS 語法都只會被刪掉」當成通則。本段只使用會被移除的型別語法。
銜接：既然型別用來提前檢查，是不是每個地方都要自己寫？下一頁用同一個 add 回答。
參考：https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types`,
  `37:00–38:30｜1 分 30 秒｜TypeScript 02
核心：TypeScript 會從程式碼推斷型別，不需要每個位置都手動 annotation。
講法與讀碼：由上到下看 name 的字串初值、age 的數字初值，再看 add 的 number 參數與 return a + b。問「沒有寫回傳型別，是否代表 any？」短停後指出推斷結果仍是 number，這就叫 type inference。
易誤解：此處 const name 精確推斷為 "Kylen"、age 為 20，是 string／number 的 literal type；不要把編輯器顯示的精確型別說錯。只花約 15 秒說它保留了更精確的已知值。普通獨立函式的參數不會只因後面有呼叫就自動回推，所以本例保留參數 annotation。此片段視為模組中的程式碼，不混入瀏覽器全域 name 宣告衝突。
不延伸：不教 widening、as const、完整 primitive type 或 contextual typing；不主張一律刪除回傳型別，公開 API 仍可明確標示契約。
銜接：推斷不只處理單一值，也會看 object 的欄位；下一頁問一個沒有宣告 User 身分的物件能不能傳入。
參考：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types`,
  `38:30–41:30｜3 分鐘｜TypeScript 03
核心：TypeScript 主要比較 shape 的相容性，不要求 nominal identity。
講法與讀碼：先用約 40 秒讀左欄 interface User 的 id、name，再讀 printUser 的輸入與實際使用的 name。接著讀右欄 data 的三個欄位，停在 printUser(data) 問標題問題。逐一配對 id: number、name: string，約 60 秒解釋符合函式要求就能傳入；多出的 email 不妨礙這個既有變數相容。最後給名稱 structural typing，用剩餘時間對照 Java／C# 常見的 interface nominal identity：通常需要類別正式宣告實作關係。
易誤解：User 描述「至少需要哪些結構」，不是 object 必須正式屬於某個類別；欄位的型別也要相容，不只是名稱一樣。傳入時沒有複製、轉型或刪掉 email；在 printUser 內只知道 User 描述的成員。此處不是 runtime duck typing 的自動檢查。
邊界提醒：直接寫 printUser({ id: 1, name: "Kylen", email: "..." }) 這種新鮮 object literal 會觸發 excess property checking；因此保留 data 變數版，口頭配合頁底提醒，不示範繞過檢查。
不延伸：不講 class、private／protected 例外、branding、soundness 或語言理論；比較限於 Java／C# 常見的 interface 相容性，不泛指所有後端語言。
銜接：shape 描述需要哪些欄位；但某個值本身可能有不只一種型別，下一頁看 ID。
參考：https://www.typescriptlang.org/docs/handbook/type-compatibility.html`,
  `41:30–43:00｜1 分 30 秒｜TypeScript 04
核心：union 表達多種可能；在還沒區分前，操作必須對目前每一種可能都成立。
講法與讀碼：先读 printId 的 id: string | number，將 | 讀成「或」；再讀 console.log 與下面兩次呼叫，指出字串和數字都符合。先不背功能名稱，理解需求後再指出 union type。最後按右鍵揭露黄色問題：如果改用 id.toUpperCase() 會怎樣？停 5 秒，回答數字不保證有這個方法，因此靜態檢查會擋下。
易誤解：不是把值同時轉成兩種型別，不是 runtime 的 | 位元運算，也不等同 any；TypeScript 仍保留這兩種可能，並約束可用操作。console.log 同時能接受字串與數字，所以本頁程式有效。
不延伸：不加第三種型別、overload 或複雜 union；不以 type assertion 強行消除錯誤。
銜接：與其要求 TS 相信我們，下一頁使用真的 JavaScript 判斷，確定現在進到哪個分支。
參考：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types`,
  `43:00–45:30｜2 分 30 秒｜TypeScript 05
核心：TypeScript 會依 JavaScript control flow 追蹤這一行仍可能有哪些型別，這就是 narrowing。
講法與讀碼：由函式入口的 string | number 往下讀 typeof id === "string"。停在 if 內，問「這裡還可能是 number 嗎？」按一次右鍵揭露第一個說明：只剩 string，所以 toUpperCase 成立。再讀 else，按第二次右鍵：排除 string 後只剩 number。最後讀黃色結論，對照前半場追蹤執行時序、現在追蹤每一行可能的型別。
易誤解：typeof 是會保留並實際執行的 JS 程式；TypeScript 在執行前分析這個條件帶來的型別資訊。narrowing 不是型別轉換，不是跑到這一行才啟動 TS 編譯器，也不是把函式參數的整體宣告永遠改成 string。
不延伸：不加自訂 type guard、discriminated union、exhaustiveness 或 typeof null 陷阱；只用已知的 string／number 兩條路徑。
銜接：現在已經能描述 shape、可能性與分支；下一頁整理替這些型別命名的兩種常見寫法。
參考：https://www.typescriptlang.org/docs/handbook/2/narrowing.html`,
  `45:30–47:30｜2 分鐘｜TypeScript 06
核心：一般 object shape 多半能用 interface 或 type；依要表達的內容理解差異，不爭哪個比較好。
講法與讀碼：先比較兩欄最上方相同的 id／name，左邊 interface User、右邊 type User = { ... }，說兩欄是替代方案，不要貼在同一個作用域重複宣告。接著左欄往下讀 Admin extends User，表示保留 User 欄位再加 permissions；string[] 只讀成字串陣列。補一句 interface 支援同名 declaration merging。右欄接著讀 ID 的 union，再讀 Status 的三個合法字串值，說 type 能為 union 與 intersection 等型別組合命名。
易誤解：interface 的 extends 在這裡擴充型別描述，不產生 runtime 繼承物件；type 也能描述 object，並非只有 interface 能用在物件。type alias 本身不支援同名 declaration merging。不要因為使用 interface 就推論它有 runtime 身分或 API 驗證能力。
不延伸：不現場示範 merging、intersection 語法細節、團隊風格辯論或完整比較表；Status 只用來延續 union，不擴充狀態機教學。
銜接：假設團隊用 interface 描述 API 的包裝，裡面 data 每個 endpoint 都不同，要怎麼保留它的型別？
參考：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces`,
  `47:30–50:00｜2 分 30 秒｜TypeScript 07
核心：泛型保留可替換的型別位置，讓共同結構重用時不丟掉內部資料的型別。
講法與讀碼：先用約 40 秒讀左側 ApiResponse 的 data: any 與 message，指出 any 讓 data.naem 拼錯也不報錯。按右鍵揭露右邊替代版本，從 ApiResponse<T> 的 T 一路對到 data: T。再讀 response: ApiResponse<User>：把這個位置填成 User。User 沿用前面的 interface，id 是 number、name 是 string；看 data 的兩個值、message，再到最後 name.toUpperCase()，這時仍保有 string 的型別資訊。最後用一句話把泛型連到聽眾熟悉的容器型別。
易誤解：左右兩個 ApiResponse 是改寫前後，並非要同時宣告。T 是型別參數，不是呼叫時傳入的 runtime 變數；寫 ApiResponse<User> 不會建立或驗證 User。any 也不是「會安全接受所有型別」的保證，而是放寬這個位置的檢查。此頁 data 是自己在程式碼中建立，與外部 JSON 的信任程度不同。
不延伸：不講 conditional type、infer、複雜 generic constraints、variance 或泛型函式大全。
銜接：自己建立的 data 能檢查；如果 data 是網路回來的，我們標上 User 就真的安全了嗎？下一頁回到前半場的 fetch。
參考：https://www.typescriptlang.org/docs/handbook/2/generics.html`,
  `50:00–53:00｜3 分鐘｜TypeScript 08
核心：TypeScript ≠ runtime validation；型別註記不能保證外部世界真的符合它。
講法與讀碼：先讀 User 的 id／name，再讀 async 函式內的 fetch、then、res.json()、await，接回前半場：Promise 完成後繼續，不改變 task／microtask 機制。約 50 秒後停在 user.name.toUpperCase()，問 API 是否一定符合宣告。按右鍵揭露實際 JSON，由 id 的字串讀到 name 的 null；JSON 語法有效但 shape 不符合 User，最後一行 runtime 會拋 TypeError。再花約 60 秒解释 res.json() 的標準 DOM 型別是 Promise<any>，any 可被指派成 User，因此這段程式靜態檢查通過；加 annotation 沒有做任何 runtime 檢查，也沒有轉換資料。
易誤解：若在程式碼直接把這份錯誤物件指派給 User，TS 本來能指出不一致；本例漏洞在外部資料與 any。不要教成 TS 對 null 或欄位型別一概無能為力。改寫成 as User 也不會補上驗證，不需要另教斷言語法。
落地：外部資料先經可執行的 schema validation，通過後才當 User 使用，失敗就拒絕或處理錯誤。API response、localStorage、URL params、user input 都是邊界；可簡提 Zod 或 JSON Schema validator。API contract 文件、schema 本身、產生的 TS 型別都不等於驗證已經執行。
不延伸：不做 Zod 教學、不加 HTTP 錯誤處理支線、不講驗證工具比較；講者若被問到 unknown，可口頭說它要求先檢查再使用，留待 Q&A。
銜接：把 runtime 執行、static checking、外部資料邊界分成三個問題，最後一頁收回整場。
參考：https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types
參考：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any`,
  `53:00–55:00｜2 分鐘｜TypeScript 09
核心：JS 管執行；TS 在執行前描述與檢查 shape；外部資料的可信度由 runtime validation 建立。
講法與讀圖：本頁沒有新程式碼，依三欄從左到右、各欄由上往下讀。左欄用約 25 秒回顧 Event Loop、Promise、async／await，回答怎麼執行。中欄用約 30 秒回顧型別、narrowing、generic，回答執行前能知道什麼。右欄約 25 秒回到 API response、localStorage、URL params、user input，回答外部資料是否符合型別。指向頁底工具名稱只作定位，不教語法。
易誤解：三欄是互補的責任，不是所有程式都必須依左到右跑過三個階段；static checking 與 runtime validation 不能互相取代。API contract 必須有實際檢查機制，才有對應的 runtime 保證。
不延伸：不加新 feature、工具安裝或語法補遺。用剩下約 40 秒口頭回問「加上 TypeScript 會改變 1 → 4 → 3 → 2 嗎？」「API JSON 標上 User，就已經驗證了嗎？」各等幾秒後給答案。
收尾銜接：讀黃色結論，55:00 結束教學，剩餘 5 分鐘留給原本安排的緩衝／Q&A。第三部分合计 20 分鐘，互動停頓已計入各頁預算。`,
];

export default [
  Cover, Agenda, ReadFunction, PassFunction, CallbackTrace, TimerCallback,
  MainThread, DependentWork, CallbackHell, PromiseMeaning, PromiseResolve,
  ReadThen, PromiseChain, PromiseFailure, AwaitCompare, AsyncAwait,
  AwaitMeaning, TwoQueues, LoopRule, OrderAnswer, FetchBoundary, Recap,
  TypeScriptBoundary, TypeInference, StructuralTyping, UnionType, TypeNarrowing,
  InterfaceAndType, GenericResponse, RuntimeValidation, FullSessionRecap,
] satisfies Page[];
