(() => {
  const ROUTES = ['home', 'learn', 'prompt', 'workshop'];
  const CONTENT = {
    English: {
      sub: {
        home: ['What do you want to achieve today?', 'Try an AI workflow'],
        learn: ['Learn four habits for better AI work', 'Short lessons for safer everyday work', 'Start with work that feels familiar'],
        prompt: ['Professional Profile', 'Choose Your Work', 'Brief AI', 'Practice With Real Work'],
        workshop: ['Know Your Access', 'Explore the Tools', 'Workshop Practice']
      },
      essentials: '4 essentials you should know',
      missing: 'This section could not be opened. Please refresh and try again.'
    },
    '繁體中文': {
      sub: {
        home: ['你今天想完成甚麼？', '試用 AI 工作流程'],
        learn: ['學習四個有效運用 AI 的習慣', '更安全處理日常工作的短課程', '從熟悉的工作開始'],
        prompt: ['專業設定', '選擇你的工作', '向 AI 說明要求', '以真實工作練習'],
        workshop: ['了解你的使用權限', '探索工具', '工作坊練習']
      },
      essentials: '你應該知道的 4 個要點',
      missing: '無法開啟此部分，請重新整理後再試。'
    },
    '简体中文': {
      sub: {
        home: ['你今天想完成什么？', '试用 AI 工作流程'],
        learn: ['学习四个有效使用 AI 的习惯', '更安全处理日常工作的短课程', '从熟悉的工作开始'],
        prompt: ['专业设置', '选择你的工作', '向 AI 说明要求', '用真实工作练习'],
        workshop: ['了解你的使用权限', '探索工具', '工作坊练习']
      },
      essentials: '你应该知道的 4 个要点',
      missing: '无法打开此部分，请刷新后重试。'
    },
    '日本語': {
      sub: {
        home: ['今日は何を達成しますか？', 'AIワークフローを試す'],
        learn: ['AIを上手に使う4つの習慣', '日常業務を安全にする短いレッスン', '身近な業務から始める'],
        prompt: ['専門プロフィール', '業務を選ぶ', 'AIへの指示', '実務で練習'],
        workshop: ['利用範囲を確認', 'ツールを探索', 'ワークショップ演習']
      },
      essentials: '知っておくべき4つのポイント',
      missing: 'このセクションを開けませんでした。更新してもう一度お試しください。'
    },
    '한국어': {
      sub: {
        home: ['오늘 무엇을 달성하고 싶으신가요?', 'AI 업무 흐름 체험'],
        learn: ['AI를 잘 활용하는 네 가지 습관', '안전한 일상 업무를 위한 짧은 학습', '익숙한 업무부터 시작'],
        prompt: ['전문 프로필', '업무 선택', 'AI에 업무 설명', '실제 업무로 연습'],
        workshop: ['사용 권한 확인', '도구 살펴보기', '워크숍 실습']
      },
      essentials: '알아야 할 4가지 핵심',
      missing: '이 섹션을 열 수 없습니다. 새로고침한 뒤 다시 시도하세요.'
    }
  };

  const TARGETS = {
    home: ['.ux-goals', '.ux-modern-play'],
    learn: ['.learning-centre .ux-hero25, .learning-centre .portal-section-heading', '.learning-centre .lesson-grid', '.learning-centre .role-paths'],
    prompt: ['.ux-profile25', '.tasks-section .task-grid', '.builder-section', '.examples-section'],
    workshop: ['#workshop-legacy #know-access, #workshop-legacy .access-lab', '#workshop-legacy #explore-tools, #workshop-legacy .tools-lab', '#workshop-legacy .ux-practice-compact31']
  };
  const HASHES = {
    home: ['home-goals', 'home-workflow'], learn: ['learn-essentials', 'learn-lessons', 'learn-familiar'],
    prompt: ['prompt-profile', 'prompt-work', 'prompt-brief', 'prompt-examples'], workshop: ['workshop-access', 'workshop-tools', 'workshop-practice']
  };
  const hashMap = {};
  Object.entries(HASHES).forEach(([route, hashes]) => hashes.forEach((hash, index) => { hashMap[hash] = [route, index]; }));
  const lang = () => document.querySelector('.ui-language select')?.value || 'English';
  const words = () => CONTENT[lang()] || CONTENT.English;
  const isVisible = el => !!el && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
  const routeVisible = route => route === 'home' ? isVisible(document.querySelector('.portal-home')) : route === 'learn' ? isVisible(document.querySelector('.learning-centre')) : route === 'prompt' ? isVisible(document.querySelector('.tasks-section')) : isVisible(document.querySelector('#workshop-legacy'));

  function closeDrawer() {
    document.querySelector('.ux-drawer25')?.classList.remove('open');
    document.querySelector('.ux-drawer-scrim25')?.classList.remove('open');
  }

  function openRoute(route, done, attempt = 0) {
    if (routeVisible(route)) { done?.(); return; }
    if (attempt > 24) { toast(words().missing); return; }
    if (route === 'home') {
      document.querySelector('.portal-nav > button')?.click();
      setTimeout(() => openRoute(route, done, attempt + 1), 50);
      return;
    }
    const index = { learn: 0, prompt: 1, workshop: 2 }[route];
    const directButton = document.querySelectorAll('.portal-nav .nav-menu > button')[index];
    if (directButton) directButton.click();
    else document.querySelectorAll('.portal-card-grid > button, .portal-card-grid > a')[index]?.click();
    setTimeout(() => openRoute(route, done, attempt + 1), 45);
  }

  function targetFor(route, index) {
    const selectors = TARGETS[route] || [];
    return document.getElementById(HASHES[route]?.[index]) || document.querySelector(selectors[index]);
  }

  function focusTarget(route, index, writeHash = true, attempt = 0, done) {
    refreshAnchors();
    const target = targetFor(route, index);
    if (!target && attempt < 50) { setTimeout(() => focusTarget(route, index, writeHash, attempt + 1, done), 80); return; }
    if (!target) {
      const routeRoot = route === 'workshop' ? document.querySelector('#workshop-legacy') : route === 'prompt' ? document.querySelector('.tasks-section') : route === 'learn' ? document.querySelector('.learning-centre') : document.querySelector('.portal-home');
      if (routeRoot && routeVisible(route)) { routeRoot.scrollIntoView({ behavior: 'auto', block: 'start' }); return; }
      toast(words().missing); return;
    }
    document.querySelectorAll('.ux-section-focus32').forEach(el => el.classList.remove('ux-section-focus32'));
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    if (writeHash) {
      const nextHash = `#${HASHES[route][index]}`;
      if (location.hash !== nextHash) history.pushState(null, '', nextHash);
    }
    requestAnimationFrame(() => {
      target.classList.add('ux-section-focus32');
      setTimeout(() => target.classList.remove('ux-section-focus32'), 1500);
    });
    done?.(target);
  }

  function navigate(route, index, writeHash = true) {
    closeDrawer();
    window.AIOfficeEffects?.begin();
    openRoute(route, () => focusTarget(route, index, writeHash, 0, () => window.AIOfficeEffects?.end()));
  }

  function refreshAnchors() {
    Object.entries(TARGETS).forEach(([route, selectors]) => selectors.forEach((selector, index) => {
      const target = document.querySelector(selector);
      if (target) target.id = HASHES[route][index];
    }));
  }

  function refreshDrawer() {
    const drawer = document.querySelector('.ux-drawer25');
    if (!drawer) return;
    ROUTES.forEach(route => {
      const group = drawer.querySelector(`[data-route="${route}"]`)?.closest('.ux-menu-group25');
      const host = group?.querySelector(':scope > div');
      if (!host) return;
      const renderKey = `${lang()}-${route}`;
      if (host.dataset.navigation32Key === renderKey) return;
      host.dataset.navigation32Key = renderKey;
      host.replaceChildren(...words().sub[route].map((label, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.subroute = route;
        button.dataset.subindex = String(index);
        const number = document.createElement('em');
        number.textContent = String(index + 1);
        button.append(number, document.createTextNode(label));
        return button;
      }));
    });
  }

  function refreshDesktopDropdowns() {
    const menus = document.querySelectorAll('.portal-nav .nav-menu');
    ['learn', 'prompt', 'workshop'].forEach((route, routeIndex) => {
      const dropdown = menus[routeIndex]?.querySelector('.nav-dropdown');
      if (!dropdown) return;
      const renderKey = `${lang()}-${route}`;
      const expectedFirst = `01 · ${words().sub[route][0]}`;
      if (dropdown.dataset.navigation32Key === renderKey && dropdown.querySelector('button')?.textContent === expectedFirst && dropdown.querySelectorAll('button').length === words().sub[route].length) return;
      dropdown.dataset.navigation32Key = renderKey;
      dropdown.replaceChildren(...words().sub[route].map((label, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.uxSub32 = route;
        button.dataset.uxIndex32 = String(index);
        button.textContent = `${String(index + 1).padStart(2, '0')} · ${label}`;
        return button;
      }));
    });
  }

  function updateEssentialsLabel() {
    const replacements = new Set(['Learn the 3-step method', '4 essentials you should know', '你應該知道的 4 個要點', '你应该知道的 4 个要点', '知っておくべき4つのポイント', '알아야 할 4가지 핵심']);
    document.querySelectorAll('a.text-button, button, a').forEach(el => {
      const text = el.childNodes[0]?.nodeValue?.trim() || el.textContent.trim().replace(/[↓→]$/, '').trim();
      if (!replacements.has(text)) return;
      const arrow = el.querySelector('span');
      if (el.childNodes[0]?.nodeType === Node.TEXT_NODE) el.childNodes[0].nodeValue = `${words().essentials} `;
      else el.textContent = words().essentials;
      if (arrow && !el.contains(arrow)) el.append(arrow);
    });
  }

  function goBrief(done) { openRoute('prompt', () => focusTarget('prompt', 2, true, 0, done)); }

  function bind() {
    if (document.documentElement.dataset.navigation32) return;
    document.documentElement.dataset.navigation32 = '1';
    document.addEventListener('click', event => {
      const sub = event.target.closest('.ux-drawer25 [data-subroute]');
      if (sub) {
        event.preventDefault(); event.stopImmediatePropagation();
        navigate(sub.dataset.subroute, Number(sub.dataset.subindex));
        return;
      }
      const desktopSub = event.target.closest('.portal-nav [data-ux-sub32]');
      if (desktopSub) {
        event.preventDefault(); event.stopImmediatePropagation();
        navigate(desktopSub.dataset.uxSub32, Number(desktopSub.dataset.uxIndex32));
        return;
      }
      const example = event.target.closest('.example-card');
      if (example) { setTimeout(() => focusTarget('prompt', 2), 170); return; }
      const heroPrompt = event.target.closest('.tasks-section .ux-hero25 [data-hero-action]');
      if (heroPrompt) { event.preventDefault(); event.stopImmediatePropagation(); goBrief(); return; }
      const button = event.target.closest('button, a');
      if (!button || button.closest('.ux-drawer25, .portal-nav, .prompt-panel') || button.matches('.copy-button')) return;
      const text = button.textContent.trim().toLowerCase();
      const isPromptAction = /create a prompt|start building a prompt|build practice prompt|open in prompt builder|open prompt setting|建立提示詞|建立提示词|プロンプトを作|프롬프트 만들/.test(text);
      if (isPromptAction && !button.closest('.exercise-card')) {
        event.preventDefault(); event.stopImmediatePropagation(); goBrief();
      }
    }, true);
    document.addEventListener('change', event => {
      if (event.target.closest('.ui-language')) setTimeout(refresh, 100);
    });
    window.addEventListener('hashchange', handleHash);
  }

  function toast(message) {
    let el = document.querySelector('.ux-nav-toast32');
    if (!el) { el = document.createElement('div'); el.className = 'ux-nav-toast32'; el.setAttribute('role', 'status'); document.body.append(el); }
    el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2500);
  }

  function handleHash() {
    const match = hashMap[location.hash.slice(1)];
    if (match) navigate(match[0], match[1], false);
  }

  let scheduled = false;
  function refresh() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refreshAnchors(); refreshDrawer(); refreshDesktopDropdowns(); updateEssentialsLabel();
    });
  }

  bind();
  window.AIOfficeNavigation = { navigate, openBrief: goBrief, routeVisible };
  new MutationObserver(refresh).observe(document.documentElement, { childList: true, subtree: true });
  [80, 300, 800, 1600].forEach(delay => setTimeout(refresh, delay));
  setTimeout(handleHash, 500);
})();
