(() => {
  const LANGS = ['English', '繁體中文', '简体中文', '日本語', '한국어'];
  const text = {
    title: ['Workshop Practice', '工作坊練習', '工作坊练习', 'ワークショップ演習', '워크숍 실습'],
    intro: ['Choose an exercise, download its files, then open the prepared prompt settings.', '選擇練習、下載相關檔案，然後開啟已準備好的提示詞設定。', '选择练习、下载相关文件，然后打开已准备好的提示词设置。', '演習を選び、必要なファイルをダウンロードして、準備済みのプロンプト設定を開きます。', '실습을 선택하고 관련 파일을 다운로드한 뒤 준비된 프롬프트 설정을 여세요.'],
    files: ['Exercise files', '練習檔案', '练习文件', '演習ファイル', '실습 파일'],
    excel: ['Download Excel raw-data workbook', '下載 Excel 原始數據工作簿', '下载 Excel 原始数据工作簿', 'Excel 元データブックをダウンロード', 'Excel 원본 데이터 통합 문서 다운로드'],
    ppt: ['Download PowerPoint source pack', '下載 PowerPoint 資料包', '下载 PowerPoint 资料包', 'PowerPoint 資料パックをダウンロード', 'PowerPoint 자료 팩 다운로드'],
    word: ['Download customer-meeting conversation', '下載客戶會議對話紀錄', '下载客户会议对话记录', '顧客会議の会話記録をダウンロード', '고객 회의 대화 기록 다운로드'],
    safety: ['Use only the fictional exercise files. Do not add real company or customer data.', '只使用虛構練習檔案，切勿加入真實公司或客戶資料。', '只使用虚构练习文件，切勿加入真实公司或客户数据。', '架空の演習ファイルのみを使用し、実在する会社・顧客データは追加しないでください。', '가상 실습 파일만 사용하고 실제 회사나 고객 데이터를 추가하지 마세요.'],
    six: ['Create a six-slide outline', '建立六頁簡報大綱', '建立六页演示大纲', '6枚構成のアウトラインを作る', '6장 개요 만들기']
  };
  const langIndex = () => Math.max(0, LANGS.indexOf(document.querySelector('.ui-language select')?.value || 'English'));
  const t = key => text[key][langIndex()];

  function compactHeading() {
    const list = document.querySelector('#workshop-legacy .exercise-list');
    if (!list) return;
    let heading = document.querySelector('.ux-practice-compact31');
    if (!heading) {
      heading = document.createElement('header');
      heading.className = 'ux-practice-compact31';
      list.before(heading);
    }
    if (heading.dataset.language === LANGS[langIndex()]) return;
    heading.dataset.language = LANGS[langIndex()];
    heading.innerHTML = `<small>03</small><div><h2>${t('title')}</h2><p>${t('intro')}</p></div>`;
  }

  function resourceLink(href, label, icon) {
    return `<a href="${href}" download><span>${icon}</span><b>${label}</b><small>Download ↓</small></a>`;
  }

  function exerciseDownloads(card, kind) {
    const body = card?.querySelector('.exercise-body');
    if (!body) return;
    let resources = body.querySelector('.ux-exercise-downloads31');
    if (!resources) {
      resources = document.createElement('aside');
      resources.className = 'ux-exercise-downloads31';
      const actions = body.querySelector('.exercise-actions');
      actions ? actions.before(resources) : body.prepend(resources);
    }
    const key = `${kind}-${LANGS[langIndex()]}`;
    if (resources.dataset.renderKey === key) return;
    resources.dataset.renderKey = key;
    const links = kind === 'excel'
      ? resourceLink('./downloads/AI-Workshop-Fictional-Raw-Data.xlsx', t('excel'), 'X')
      : kind === 'powerpoint'
        ? resourceLink('./downloads/AI-Workshop-Fictional-Raw-Data.xlsx', t('excel'), 'X') + resourceLink('./downloads/PowerPoint-Practice-Brief.docx', t('ppt'), 'P')
        : resourceLink('./downloads/Word-Customer-Meeting-Conversation.docx', t('word'), 'W');
    resources.innerHTML = `<small>${t('files')}</small>${links}`;
    let safety = body.querySelector('.ux-exercise-safety31');
    if (!safety) {
      safety = document.createElement('p');
      safety.className = 'ux-exercise-safety31';
      body.append(safety);
    }
    safety.textContent = t('safety');
  }

  function fixSlideCount() {
    const card = document.querySelector('#practice-slides');
    if (!card) return;
    const translations = ['Create a five-slide outline', '建立五頁簡報大綱', '建立五页演示大纲', '5枚構成のアウトラインを作る', '5장 개요 만들기'];
    card.querySelectorAll('li').forEach(item => {
      if (translations.includes(item.textContent.trim()) || item.dataset.sixSlides31) {
        item.dataset.sixSlides31 = '1';
        const badge = item.querySelector('span');
        badge ? item.replaceChildren(badge, document.createTextNode(t('six'))) : (item.textContent = t('six'));
      }
    });
  }

  function cleanPractice() {
    compactHeading();
    exerciseDownloads(document.querySelector('#practice-excel'), 'excel');
    exerciseDownloads(document.querySelector('#practice-slides'), 'powerpoint');
    exerciseDownloads(document.querySelector('#practice-document'), 'word');
    fixSlideCount();
    document.querySelectorAll('.ux-linked-flow25, .ux-ppt-preset25').forEach(item => item.remove());
  }

  document.addEventListener('change', event => {
    if (event.target.closest('.ui-language')) setTimeout(cleanPractice, 160);
  });
  new MutationObserver(cleanPractice).observe(document.documentElement, { childList: true, subtree: true });
  [100, 450, 1000].forEach(delay => setTimeout(cleanPractice, delay));
})();
