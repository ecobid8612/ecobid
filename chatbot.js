/* ECOBID 챗봇 상담 — 회사명·연락처·이메일·관심 아이템·상담 내용을 받아 이메일로 접수 */
(function () {
  var RECEIVER = 'ecobid8612@gmail.com';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + RECEIVER;

  var T = {
    ko: {
      title: '에코비드 챗봇 상담', sub: '빠른 시일 내 연락드리겠습니다',
      hello: '안녕하세요, 에코비드입니다. 😊<br>회사명, 연락처와 이메일, 관심 아이템, 상담하고 싶은 내용을 간단히 남겨주시면 빠른 시일 내 연락드리겠습니다.',
      q: ['먼저 회사명(기관명)을 알려주세요.', '담당자 연락처(전화번호)를 알려주세요.', '회신받으실 이메일 주소를 알려주세요.', '관심 있는 아이템을 선택하거나 직접 입력해 주세요. (여러 개 선택 가능)', '상담하고 싶은 내용을 간단히 남겨주세요.'],
      labels: ['회사명', '연락처', '이메일', '관심 아이템', '상담 내용'],
      ph: ['예) 에코비드', '예) 010-1234-5678', '예) name@company.com', '직접 입력 후 Enter', '내용을 입력해 주세요'],
      badPhone: '연락처를 다시 확인해 주세요. (숫자 8자리 이상)', badEmail: '이메일 형식을 다시 확인해 주세요.', empty: '내용을 입력해 주세요.',
      itemsDone: '선택 완료', summary: '아래 내용으로 상담을 접수할까요?',
      consent: '[필수] 개인정보 수집·이용 동의 — 수집 항목: 회사명, 연락처, 이메일 / 목적: 상담 회신 / 보유 기간: 상담 종료 후 1년',
      send: '상담 접수하기', edit: '처음부터 다시', sending: '접수 중입니다…',
      ok: '접수되었습니다. 감사합니다! 담당자가 빠른 시일 내 연락드리겠습니다.',
      fail: '전송에 실패했습니다. 아래 버튼으로 이메일을 보내주시거나 대표전화 070-7797-8611로 연락 부탁드립니다.',
      mail: '이메일로 보내기', needConsent: '개인정보 수집·이용에 동의해 주세요.', cardT: '챗봇 상담', cardD: '견적·납품·제품 문의 접수', fab: '상담'
    },
    en: {
      title: 'ECOBID Chat Inquiry', sub: 'We will contact you as soon as possible',
      hello: 'Hello, this is ECOBID. 😊<br>Please leave your company name, phone and email, items of interest and a short message — we will contact you as soon as possible.',
      q: ['What is your company (organization) name?', 'Your contact phone number?', 'Your email address for our reply?', 'Select or type the items you are interested in (multiple allowed).', 'Please briefly describe your inquiry.'],
      labels: ['Company', 'Phone', 'Email', 'Items of interest', 'Message'],
      ph: ['e.g. ECOBID', 'e.g. +82-10-1234-5678', 'e.g. name@company.com', 'Type and press Enter', 'Your message'],
      badPhone: 'Please check the phone number (at least 8 digits).', badEmail: 'Please check the email format.', empty: 'Please enter a value.',
      itemsDone: 'Done', summary: 'Submit the inquiry below?',
      consent: '[Required] I agree to the collection and use of my personal data (company, phone, email) for replying to this inquiry; kept for 1 year after the inquiry is closed.',
      send: 'Submit inquiry', edit: 'Start over', sending: 'Sending…',
      ok: 'Thank you! Your inquiry has been received and we will contact you shortly.',
      fail: 'Sending failed. Please email us using the button below or call +82-70-7797-8611.',
      mail: 'Send by email', needConsent: 'Please agree to the personal data notice.', cardT: 'Chat Inquiry', cardD: 'Quotes, supply & product questions', fab: 'Chat'
    },
    zh: {
      title: 'ECOBID 在线咨询', sub: '我们会尽快与您联系',
      hello: '您好，这里是 ECOBID。😊<br>请留下公司名称、联系电话和邮箱、感兴趣的产品及简要咨询内容，我们会尽快与您联系。',
      q: ['请告诉我们公司（机构）名称。', '请留下联系电话。', '请留下用于回复的电子邮箱。', '请选择或输入感兴趣的产品（可多选）。', '请简要描述咨询内容。'],
      labels: ['公司名称', '联系电话', '电子邮箱', '感兴趣的产品', '咨询内容'],
      ph: ['例：ECOBID', '例：+82-10-1234-5678', '例：name@company.com', '输入后按 Enter', '请输入内容'],
      badPhone: '请检查电话号码（至少 8 位数字）。', badEmail: '请检查邮箱格式。', empty: '请输入内容。',
      itemsDone: '选择完成', summary: '确认提交以下咨询内容吗？',
      consent: '[必选] 同意收集和使用个人信息（公司名称、电话、邮箱），仅用于回复咨询，咨询结束后保存 1 年。',
      send: '提交咨询', edit: '重新填写', sending: '提交中…',
      ok: '提交成功，谢谢！我们会尽快与您联系。',
      fail: '发送失败。请点击下方按钮发送邮件，或致电 +82-70-7797-8611。',
      mail: '通过邮件发送', needConsent: '请同意个人信息收集与使用。', cardT: '在线咨询', cardD: '报价、供货及产品咨询', fab: '咨询'
    }
  };

  function lang() { return (window.currentLang && T[window.currentLang]) ? window.currentLang : (document.body.className.replace('lang-', '') in T ? document.body.className.replace('lang-', '') : 'ko'); }
  function itemList() {
    var out = [];
    document.querySelectorAll('#services .card h3').forEach(function (h) { var t = h.textContent.trim(); if (t && out.indexOf(t) < 0 && !h.closest('.chat-card')) out.push(t); });
    return out;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var css = '' +
    '.chat-fab{position:fixed;right:20px;bottom:20px;z-index:2500;background:#FF6600;color:#fff;border:none;border-radius:30px;padding:14px 20px;font:700 15px "Noto Sans KR",sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.4);cursor:pointer;display:flex;align-items:center;gap:8px}' +
    '.chat-fab svg{width:20px;height:20px}' +
    '.chat-panel{position:fixed;right:20px;bottom:84px;z-index:2600;width:380px;max-width:calc(100vw - 32px);height:600px;max-height:calc(100vh - 110px);background:#fff;color:#222;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;font-family:"Noto Sans KR",sans-serif}' +
    '.chat-panel.open{display:flex}' +
    '.chat-head{background:#2E7D32;color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}' +
    '.chat-head b{font-size:16px;display:block}.chat-head small{opacity:.85;font-size:12px}' +
    '.chat-x{background:none;border:none;color:#fff;font-size:26px;cursor:pointer;line-height:1}' +
    '.chat-body{flex:1;overflow-y:auto;padding:14px;background:#f4f6f4}' +
    '.msg{max-width:85%;padding:10px 13px;border-radius:12px;margin:6px 0;font-size:14px;line-height:1.55;word-break:break-word}' +
    '.msg.bot{background:#fff;border:1px solid #e2e2e2;border-top-left-radius:3px}' +
    '.msg.me{background:#FF6600;color:#fff;margin-left:auto;border-top-right-radius:3px}' +
    '.msg.err{background:#fdecea;color:#b3261e;border:1px solid #f5c2c0}' +
    '.chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}' +
    '.chip{border:1px solid #2E7D32;color:#2E7D32;background:#fff;border-radius:16px;padding:5px 11px;font-size:13px;cursor:pointer}' +
    '.chip.on{background:#2E7D32;color:#fff}' +
    '.chip.done{background:#FF6600;border-color:#FF6600;color:#fff;font-weight:700}' +
    '.sum{background:#fff;border:1px solid #ddd;border-radius:10px;padding:10px 12px;font-size:13px;margin:6px 0}' +
    '.sum div{margin:3px 0}.sum span{color:#777;display:inline-block;min-width:78px}' +
    '.consent{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:#444;margin:8px 0;line-height:1.5}' +
    '.consent input{margin-top:3px}' +
    '.cbtn{display:inline-block;border:none;border-radius:8px;padding:10px 14px;font:700 14px "Noto Sans KR",sans-serif;cursor:pointer;margin:4px 6px 4px 0;text-decoration:none}' +
    '.cbtn.pri{background:#2E7D32;color:#fff}.cbtn.sec{background:#e9e9e9;color:#333}' +
    '.chat-foot{display:flex;gap:8px;padding:10px;border-top:1px solid #e5e5e5;background:#fff}' +
    '.chat-foot textarea{flex:1;resize:none;border:1px solid #ccc;border-radius:8px;padding:9px 10px;font:14px "Noto Sans KR",sans-serif;height:42px;box-sizing:border-box}' +
    '.chat-foot button{background:#FF6600;color:#fff;border:none;border-radius:8px;padding:0 16px;font-weight:700;cursor:pointer}' +
    '.chat-foot.hide{display:none}' +
    '#services .chat-card img.thumb{object-fit:contain;padding:12%;box-sizing:border-box;background:#fff}' +
    '@media (max-width:600px){.chat-panel{right:8px;left:8px;width:auto;max-width:none;bottom:76px;height:calc(100vh - 100px)}.chat-fab{right:12px;bottom:12px;padding:12px 16px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.3A8 8 0 1 1 21 12z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>';

  var fab = document.createElement('button'); fab.className = 'chat-fab'; fab.type = 'button';
  var panel = document.createElement('div'); panel.className = 'chat-panel'; panel.setAttribute('role', 'dialog');
  panel.innerHTML = '<div class="chat-head"><div><b id="chat-title"></b><small id="chat-sub"></small></div><div style="display:flex;gap:4px;align-items:center"><button class="chat-x chat-re" type="button" aria-label="restart" title="restart" style="font-size:20px">&#8635;</button><button class="chat-x chat-close" type="button" aria-label="close">&times;</button></div></div>' +
    '<div class="chat-body" id="chat-body"></div>' +
    '<div class="chat-foot" id="chat-foot"><textarea id="chat-in" rows="1"></textarea><button type="button" id="chat-send">➤</button></div>';
  document.body.appendChild(fab); document.body.appendChild(panel);

  var body = panel.querySelector('#chat-body'), foot = panel.querySelector('#chat-foot'), input = panel.querySelector('#chat-in');
  var step = 0, data = {}, picked = [], L = 'ko';

  function say(html, cls) { var d = document.createElement('div'); d.className = 'msg ' + (cls || 'bot'); d.innerHTML = html; body.appendChild(d); body.scrollTop = body.scrollHeight; return d; }
  function block(el) { body.appendChild(el); body.scrollTop = body.scrollHeight; }
  function setLabels() {
    L = lang(); var t = T[L];
    fab.innerHTML = icon + '<span>' + t.fab + '</span>';
    panel.querySelector('#chat-title').textContent = t.title;
    panel.querySelector('#chat-sub').textContent = t.sub;
    var c = document.querySelector('.chat-card'); if (c) { c.querySelector('h3').textContent = t.cardT; c.querySelector('p').textContent = t.cardD; }
  }
  function ask() {
    var t = T[L];
    foot.classList.remove('hide'); input.value = ''; input.placeholder = t.ph[step] || '';
    input.style.height = step === 4 ? '70px' : '42px';
    say(t.q[step]);
    if (step === 3) {
      picked = [];
      var box = document.createElement('div'); box.className = 'chips';
      itemList().concat(['기타 / Other']).forEach(function (name) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = name;
        b.onclick = function () { var i = picked.indexOf(name); if (i < 0) { picked.push(name); b.classList.add('on'); } else { picked.splice(i, 1); b.classList.remove('on'); } };
        box.appendChild(b);
      });
      var done = document.createElement('button'); done.type = 'button'; done.className = 'chip done'; done.textContent = t.itemsDone;
      done.onclick = function () { var extra = input.value.trim(); if (extra) picked.push(extra); if (!picked.length) { say(t.empty, 'err'); return; } box.querySelectorAll('button').forEach(function (x) { x.disabled = true; }); accept(picked.join(', ')); };
      box.appendChild(done); block(box);
    }
    setTimeout(function () { input.focus(); }, 50);
  }
  function accept(v) {
    var t = T[L];
    if (step === 1 && (v.replace(/\D/g, '').length < 8)) { say(t.badPhone, 'err'); return; }
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { say(t.badEmail, 'err'); return; }
    say(esc(v), 'me');
    data[['company', 'phone', 'email', 'items', 'message'][step]] = v;
    step++;
    if (step < 5) ask(); else review();
  }
  function review() {
    var t = T[L]; foot.classList.add('hide');
    say(t.summary);
    var keys = ['company', 'phone', 'email', 'items', 'message'];
    var s = document.createElement('div'); s.className = 'sum';
    s.innerHTML = keys.map(function (k, i) { return '<div><span>' + t.labels[i] + '</span> ' + esc(data[k]) + '</div>'; }).join('');
    block(s);
    var c = document.createElement('label'); c.className = 'consent'; c.innerHTML = '<input type="checkbox" id="chat-ok"><span>' + t.consent + '</span>'; block(c);
    var w = document.createElement('div');
    var send = document.createElement('button'); send.type = 'button'; send.className = 'cbtn pri'; send.textContent = t.send;
    var again = document.createElement('button'); again.type = 'button'; again.className = 'cbtn sec'; again.textContent = t.edit;
    again.onclick = start;
    send.onclick = function () {
      if (!document.getElementById('chat-ok').checked) { say(t.needConsent, 'err'); return; }
      send.disabled = true; submit(function (ok) { if (!ok) send.disabled = false; else again.disabled = true; });
    };
    w.appendChild(send); w.appendChild(again); block(w);
  }
  function mailtoLink() {
    var t = T[L];
    var lines = ['company', 'phone', 'email', 'items', 'message'].map(function (k, i) { return t.labels[i] + ': ' + data[k]; }).join('\n');
    return 'mailto:' + RECEIVER + '?subject=' + encodeURIComponent('[ECOBID 챗봇 상담] ' + data.company) + '&body=' + encodeURIComponent(lines);
  }
  function submit(done) {
    var t = T[L]; var wait = say(t.sending);
    var payload = {
      _subject: '[ECOBID 챗봇 상담] ' + data.company + ' / ' + data.items,
      _template: 'table', _captcha: 'false', _replyto: data.email,
      '회사명 Company': data.company, '연락처 Phone': data.phone, '이메일 Email': data.email,
      '관심 아이템 Items': data.items, '상담 내용 Message': data.message,
      '접수 언어 Language': L, '개인정보 동의 Consent': 'Y', '접수 페이지 Page': location.href
    };
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) === 'false') throw new Error(j.message || ('HTTP ' + r.status)); }); })
      .then(function () { wait.remove(); say(t.ok); if (done) done(true); })
      .catch(function (e) {
        wait.remove();
        if (window.console) console.warn('[ECOBID chatbot] send failed:', e && e.message);
        say(t.fail, 'err');
        var w = document.createElement('div');
        var a = document.createElement('a'); a.className = 'cbtn pri'; a.href = mailtoLink(); a.textContent = t.mail;
        var again = document.createElement('button'); again.type = 'button'; again.className = 'cbtn sec'; again.textContent = t.edit; again.onclick = start;
        w.appendChild(a); w.appendChild(again); block(w);
        if (done) done(false);
      });
  }
  function start() { setLabels(); body.innerHTML = ''; step = 0; data = {}; say(T[L].hello); ask(); }
  function open() { panel.classList.add('open'); if (!body.childElementCount || L !== lang()) start(); }
  function close() { panel.classList.remove('open'); }

  fab.onclick = function () { panel.classList.contains('open') ? close() : open(); };
  panel.querySelector('.chat-close').onclick = close;
  panel.querySelector('.chat-re').onclick = start;
  panel.querySelector('#chat-send').onclick = function () { if (step === 3) { var v = input.value.trim(); if (v) { picked.push(v); input.value = ''; say(esc(v), 'me'); } return; } var v2 = input.value.trim(); if (!v2) { say(T[L].empty, 'err'); return; } accept(v2); };
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); panel.querySelector('#chat-send').click(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  window.openChatbot = open;
  // 언어 버튼을 누르면 버튼/카드 문구 갱신
  document.querySelectorAll('.lang-btn').forEach(function (b) { b.addEventListener('click', function () { setTimeout(setLabels, 0); }); });
  setLabels();
})();
