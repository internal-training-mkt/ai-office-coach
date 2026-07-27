(() => {
  const LANGS = ['English', '繁體中文', '简体中文', '日本語', '한국어'];
  const COPY = {
    English: { chapter: 'Next chapter', workshop: 'Microsoft Copilot Workshop', top: 'Prompt Library top', home: 'Return Home', next: 'Next chapter', ready: 'Professional Profile is ready. Review your department, grade and AI role.' },
    '繁體中文': { chapter: '下一章', workshop: 'Microsoft Copilot 工作坊', top: '返回提示詞庫頂部', home: '返回主頁', next: '下一章', ready: '專業設定已準備好。請檢查你的部門、職級及 AI 角色。' },
    '简体中文': { chapter: '下一章', workshop: 'Microsoft Copilot 工作坊', top: '返回提示词库顶部', home: '返回主页', next: '下一章', ready: '专业设置已准备好。请检查你的部门、职级和 AI 角色。' },
    '日本語': { chapter: '次の章', workshop: 'Microsoft Copilot ワークショップ', top: 'プロンプトライブラリの先頭へ', home: 'ホームに戻る', next: '次の章', ready: '専門プロフィールを設定しました。部門、役職、AIの役割を確認してください。' },
    '한국어': { chapter: '다음 장', workshop: 'Microsoft Copilot 워크숍', top: '프롬프트 라이브러리 맨 위로', home: '홈으로 돌아가기', next: '다음 장', ready: '전문 프로필이 준비되었습니다. 부서, 직급 및 AI 역할을 확인하세요.' }
  };
  const DEPARTMENT_MAP = [0, 1, 3, 4, 5, 6, 10];
  const lang = () => document.querySelector('.ui-language select')?.value || 'English';
  const words = () => COPY[lang()] || COPY.English;
  let transitionTimer = 0;

  function transitionElement() {
    let el = document.querySelector('.ux-page-transition35');
    if (!el) { el = document.createElement('div'); el.className = 'ux-page-transition35'; el.setAttribute('aria-hidden', 'true'); document.body.append(el); }
    return el;
  }
  window.AIOfficeEffects = {
    begin() { clearTimeout(transitionTimer); transitionTimer = setTimeout(() => transitionElement().classList.add('show'), 80); },
    end() { clearTimeout(transitionTimer); const el = transitionElement(); requestAnimationFrame(() => el.classList.remove('show')); }
  };

  function cleanLegacyPractice() {
    document.querySelectorAll('.portal-card-grid > *').forEach((card, index) => { if (index >= 3) { card.hidden = true; card.setAttribute('aria-hidden', 'true'); card.setAttribute('inert', ''); } });
    document.querySelectorAll('.portal-nav .nav-menu').forEach((menu, index) => { if (index >= 3) { menu.hidden = true; menu.setAttribute('aria-hidden', 'true'); menu.setAttribute('inert', ''); } });
    const legacy = document.querySelector('.training-hub');
    if (legacy) { legacy.hidden = true; legacy.setAttribute('aria-hidden', 'true'); legacy.setAttribute('inert', ''); }
  }

  function promptTop() {
    const target = document.querySelector('.tasks-section .ux-hero25') || document.querySelector('.tasks-section');
    target?.scrollIntoView({ behavior: 'auto', block: 'start' });
    history.pushState(null, '', '#tasks');
  }
  function goHome() {
    window.AIOfficeEffects.begin();
    document.querySelector('.portal-nav > button')?.click();
    history.pushState(null, '', `${location.pathname}${location.search}`);
    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'auto' }); window.AIOfficeEffects.end(); }, 90);
  }

  function goWorkshopTop() {
    window.AIOfficeEffects.begin();
    document.querySelectorAll('.portal-nav .nav-menu > button')[2]?.click();
    let attempts = 0;
    const settle = () => {
      const workshop = document.querySelector('#workshop-legacy');
      if ((!workshop || !workshop.getClientRects().length) && attempts++ < 40) { setTimeout(settle, 60); return; }
      if (!workshop) { window.AIOfficeEffects.end(); return; }
      history.pushState(null, '', '#workshop');
      const focusTop = () => {
        const current = document.querySelector('#workshop-legacy');
        if (!current?.getClientRects().length) return;
        const headerOffset = Math.min(96, document.querySelector('.portal-nav')?.getBoundingClientRect().height || 0);
        const top = current.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      };
      focusTop();
      [100, 260].forEach(delay => setTimeout(focusTop, delay));
      setTimeout(() => window.AIOfficeEffects.end(), 180);
    };
    setTimeout(settle, 50);
  }

  function promptFooter() {
    const examples = document.querySelector('.examples-section');
    if (!examples) return;
    let footer = document.querySelector('.ux-prompt-footer35');
    if (!footer) { footer = document.createElement('section'); footer.className = 'ux-prompt-footer35'; examples.after(footer); }
    const key = lang();
    if (footer.dataset.key === key) return;
    footer.dataset.key = key;
    const w = words();
    footer.innerHTML = `<a href="#workshop" class="ux-prompt-destination35" data-prompt-workshop><small>${w.chapter}</small><h2>${w.workshop}</h2></a><nav><button type="button" data-prompt-top>↑ ${w.top}</button><button type="button" data-prompt-home>⌂ ${w.home}</button><button type="button" class="primary" data-prompt-next>${w.next}<span>→</span></button></nav>`;
    footer.querySelector('[data-prompt-workshop]').onclick = event => { event.preventDefault(); goWorkshopTop(); };
    footer.querySelector('[data-prompt-top]').onclick = promptTop;
    footer.querySelector('[data-prompt-home]').onclick = goHome;
    footer.querySelector('[data-prompt-next]').onclick = goWorkshopTop;
  }

  function showReady() {
    let toast = document.querySelector('.ux-department-ready35');
    if (!toast) { toast = document.createElement('div'); toast.className = 'ux-department-ready35'; toast.setAttribute('role', 'status'); document.body.append(toast); }
    toast.textContent = words().ready;
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function setDepartment(index) {
    const mapped = DEPARTMENT_MAP[index] ?? 0;
    let current = {};
    try { current = JSON.parse(sessionStorage.getItem('uxProfile25') || '{}'); } catch {}
    sessionStorage.setItem('uxProfile25', JSON.stringify({ dept: mapped, grade: Number(current.grade) || 0 }));
    window.AIOfficeNavigation?.navigate('prompt', 0);
    let attempts = 0;
    const focusProfile = () => {
      const profile = document.querySelector('.ux-profile25');
      if (!profile || !profile.getClientRects().length) return;
      const headerOffset = Math.min(96, document.querySelector('.portal-nav')?.getBoundingClientRect().height || 0);
      const top = profile.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };
    const apply = () => {
      const profile = document.querySelector('.ux-profile25');
      const select = profile?.querySelector('[data-profile="dept"]');
      if ((!profile || !select || !profile.getClientRects().length) && attempts++ < 40) { setTimeout(apply, 60); return; }
      if (!profile || !select) return;
      select.value = String(mapped);
      select.dispatchEvent(new Event('change', { bubbles: true }));
      history.replaceState(null, '', '#prompt-profile');
      focusProfile();
      [100, 260, 520].forEach(delay => setTimeout(focusProfile, delay));
      profile.classList.add('ux-section-focus32');
      setTimeout(() => profile.classList.remove('ux-section-focus32'), 1300);
      setTimeout(showReady, 300);
    };
    setTimeout(apply, 80);
  }

  function bindDepartments() {
    if (document.documentElement.dataset.departments35) return;
    document.documentElement.dataset.departments35 = '1';
    document.addEventListener('click', event => {
      const button = event.target.closest('.role-paths button');
      if (!button) return;
      const buttons = [...button.closest('.role-paths').querySelectorAll('button')];
      const index = buttons.indexOf(button);
      if (index < 0) return;
      event.preventDefault(); event.stopImmediatePropagation();
      setDepartment(index);
    }, true);
    document.addEventListener('change', event => { if (event.target.closest('.ui-language')) setTimeout(refresh, 80); });
  }

  let refreshScheduled = false;
  function refresh() {
    if (refreshScheduled) return;
    refreshScheduled = true;
    requestAnimationFrame(() => { refreshScheduled = false; cleanLegacyPractice(); promptFooter(); });
  }
  bindDepartments();
  refresh();
  new MutationObserver(refresh).observe(document.documentElement, { childList: true, subtree: true });
  [120, 500, 1200].forEach(delay => setTimeout(refresh, delay));
})();
