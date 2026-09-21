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

const Code = ({ children, title = 'JAVASCRIPT', size = 32, style }: { children: string; title?: string; size?: number; style?: CSSProperties }) => (
  <div style={{ background: codeBg, color: '#F5F3EB', borderRadius: 'var(--osd-radius)', padding: '28px 32px 30px', boxSizing: 'border-box', ...style }}>
    <div style={{ ...label, fontSize: 22, color: '#BCBFB1', borderBottom: '1px solid #494D41', paddingBottom: 15, marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
      <span>{title}</span><span style={{ color: yellow }}>JS</span>
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

export const meta: SlideMeta = {
  title: 'Day 1｜JavaScript 執行與非同步 — Kylen',
  createdAt: '2026-09-15T03:11:44.021Z',
};

// Speaker notes preserve source details while the main path stays accessible to JS beginners.
// A: /Users/athena/Desktop/群組筆記/筆記/Source/Post/js Event loop.md
// B: /Users/athena/Desktop/群組筆記/筆記/Source/Post/從 Callback 到 Promise 再到 async、await 的演進歷史.md
export const notes: (string | undefined)[] = [
  "00:00–00:30｜30 秒\n開場：這次假設聽眾會寫後端程式，但沒寫過 JavaScript。不要求先認得 JS 的符號，也不一開始就考輸出順序。先看懂教材的函式，再把相依流程寫清楚，最後用 Event Loop 解釋執行時機。來源：使用者的受眾修正與兩份教材。",
  "00:30–01:00｜30 秒\n交代三段路線：看懂 callback；整理相依非同步工作；回頭理解 Event Loop。共 35 分鐘，另外留 TS 20 分鐘與緩衝 5 分鐘。這是排練目標，現場互動使用緩衝時間。TS 內容未製作。",
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
  "33:30–35:00｜1 分 30 秒\n用四個白話讀法結束：callback 傳要做的事，Promise 串後續成功或失敗，await 讀成等待本步結果，Event Loop 解釋執行順序。可口頭回問「multiNum 與 multiNum(8) 差在哪」「await 等待的是哪段程式」確認理解，不加入新例子。兩份教材中的細節收在講者備註，TS 20 分鐘與緩衝 5 分鐘保留。",
];

export default [
  Cover, Agenda, ReadFunction, PassFunction, CallbackTrace, TimerCallback,
  MainThread, DependentWork, CallbackHell, PromiseMeaning, PromiseResolve,
  ReadThen, PromiseChain, PromiseFailure, AwaitCompare, AsyncAwait,
  AwaitMeaning, TwoQueues, LoopRule, OrderAnswer, FetchBoundary, Recap,
] satisfies Page[];
