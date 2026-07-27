(() => {
  const LANGS = ['English', '繁體中文', '简体中文', '日本語', '한국어'];
  const workshopText = {
    'MICROSOFT COPILOT WORKSHOP': ['MICROSOFT COPILOT WORKSHOP', 'MICROSOFT COPILOT 工作坊', 'MICROSOFT COPILOT 工作坊', 'MICROSOFT COPILOT ワークショップ', 'MICROSOFT COPILOT 워크숍'],
    'Understand it. Try it. Check it.': ['Understand it. Try it. Check it.', '了解、嘗試、再核實。', '了解、尝试、再核实。', '理解し、試し、確認する。', '이해하고, 시도하고, 확인하세요.'],
    'Understand it. Try it.': ['Understand it. Try it.', '了解並嘗試。', '了解并尝试。', '理解して試す。', '이해하고 시도하세요.'],
    'Check it.': ['Check it.', '再核實。', '再核实。', '確認する。', '확인하세요.'],
    'Copilot can help you draft, summarise, analyse and organise work. It saves time when you give it clear instructions—and apply human judgement to the result.': ['Copilot can help you draft, summarise, analyse and organise work. It saves time when you give it clear instructions—and apply human judgement to the result.', 'Copilot 可協助你草擬、摘要、分析及整理工作。清晰說明要求並由人員判斷結果，才能真正節省時間。', 'Copilot 可协助你起草、总结、分析及整理工作。清楚说明要求并由人员判断结果，才能真正节省时间。', 'Copilot は下書き、要約、分析、整理を支援します。明確に指示し、人が結果を判断することで時間を節約できます。', 'Copilot은 초안 작성, 요약, 분석, 정리를 지원합니다. 명확히 지시하고 사람이 결과를 판단해야 시간을 절약할 수 있습니다.'],
    'Ask': ['Ask', '提問', '提问', '質問', '질문'], 'Generate': ['Generate', '生成', '生成', '生成', '생성'], 'Check': ['Check', '核實', '核实', '確認', '확인'], 'Improve': ['Improve', '改善', '改进', '改善', '개선'], 'Apply': ['Apply', '應用', '应用', '活用', '적용'],
    '01 · KNOW YOUR ACCESS': ['01 · KNOW YOUR ACCESS', '01 · 了解你的使用權限', '01 · 了解你的使用权限', '01 · 利用範囲を確認', '01 · 사용 권한 확인'],
    'What can your Copilot do?': ['What can your Copilot do?', '你的 Copilot 可以做甚麼？', '你的 Copilot 可以做什么？', 'Copilot で何ができますか？', 'Copilot으로 무엇을 할 수 있나요?'],
    'Start with what everyone can practise, then see what becomes possible when your organisation assigns Microsoft 365 Copilot.': ['Start with what everyone can practise, then see what becomes possible when your organisation assigns Microsoft 365 Copilot.', '先了解所有同事都可練習的功能，再查看公司指派 Microsoft 365 Copilot 授權後可使用的功能。', '先了解所有同事都可练习的功能，再查看公司分配 Microsoft 365 Copilot 许可后可使用的功能。', '全員が練習できる機能から始め、Microsoft 365 Copilot ライセンスで可能になることを確認します。', '모두가 연습할 수 있는 기능부터 시작하고 Microsoft 365 Copilot 라이선스로 가능한 기능을 확인하세요.'],
    'Included': ['Included', '已包括', '已包括', '利用可能', '포함'], 'Licensed': ['Licensed', '需授權', '需许可', 'ライセンス', '라이선스'],
    'Availability depends on your organisation’s licence, settings and permissions.': ['Availability depends on your organisation’s licence, settings and permissions.', '實際功能視乎公司的授權、設定及權限。', '实际功能取决于公司的许可、设置和权限。', '利用可否は組織のライセンス、設定、権限によります。', '사용 가능 여부는 조직의 라이선스, 설정 및 권한에 따라 달라집니다.'],
    'A smart starting point for everyday work.': ['A smart starting point for everyday work.', '日常工作的實用起點。', '日常工作的实用起点。', '日常業務の便利な出発点。', '일상 업무를 위한 실용적인 시작점입니다.'],
    'Ask questions and brainstorm ideas': ['Ask questions and brainstorm ideas', '提問及構思意念', '提问及构思创意', '質問とアイデア出し', '질문 및 아이디어 발상'],
    'Draft, rewrite and summarise supplied content': ['Draft, rewrite and summarise supplied content', '草擬、改寫及摘要已提供內容', '起草、改写及总结已提供内容', '提供内容の下書き・書き換え・要約', '제공된 내용 초안·재작성·요약'],
    'Create outlines, formulas and prompt ideas': ['Create outlines, formulas and prompt ideas', '建立大綱、公式及提示詞構思', '建立大纲、公式及提示词构思', '構成、数式、プロンプト案の作成', '개요, 수식 및 프롬프트 아이디어 작성'],
    'Use the website prompt builder, then paste into Copilot': ['Use the website prompt builder, then paste into Copilot', '使用網站提示詞建立器，再貼到 Copilot', '使用网站提示词生成器，再粘贴到 Copilot', 'サイトでプロンプトを作成し Copilot に貼り付ける', '웹사이트에서 프롬프트를 만든 뒤 Copilot에 붙여 넣기'],
    'For both: Copilot drafts. You verify and decide.': ['For both: Copilot drafts. You verify and decide.', '兩者均一樣：Copilot 負責草擬，由你核實及決定。', '两者均一样：Copilot 负责起草，由你核实及决定。', 'どちらも、Copilot が下書きし、あなたが確認・判断します。', '두 경우 모두 Copilot이 초안을 만들고 사용자가 확인·결정합니다.'],
    'For both:': ['For both:', '兩者均一樣：', '两者均一样：', 'どちらも：', '두 경우 모두:'],
    'Copilot drafts. You verify and decide.': ['Copilot drafts. You verify and decide.', 'Copilot 負責草擬，由你核實及決定。', 'Copilot 负责起草，由你核实及决定。', 'Copilot が下書きし、あなたが確認・判断します。', 'Copilot이 초안을 만들고 사용자가 확인·결정합니다.'],
    '02 · EXPLORE THE TOOLS': ['02 · EXPLORE THE TOOLS', '02 · 探索 MICROSOFT 工具', '02 · 探索 MICROSOFT 工具', '02 · MICROSOFT ツールを確認', '02 · MICROSOFT 도구 살펴보기'],
    'Where can AI save you time?': ['Where can AI save you time?', 'AI 可以在哪些工作節省時間？', 'AI 可以在哪些工作节省时间？', 'AI はどの業務を効率化できますか？', 'AI는 어떤 업무에서 시간을 절약할 수 있나요?'],
    'Select an app to compare everyday prompting with deeper Microsoft 365 integration.': ['Select an app to compare everyday prompting with deeper Microsoft 365 integration.', '選擇應用程式，比較一般 Copilot Chat 與 Microsoft 365 深度整合功能。', '选择应用程序，比较一般 Copilot Chat 与 Microsoft 365 深度集成功能。', 'アプリを選び、通常のプロンプト利用と Microsoft 365 連携を比較します。', '앱을 선택하여 일반 프롬프트와 Microsoft 365 통합 기능을 비교하세요.'],
    'EVERYDAY PROMPTING': ['EVERYDAY PROMPTING', '日常提示詞應用', '日常提示词应用', '日常のプロンプト活用', '일상 프롬프트 활용'],
    'WITH MICROSOFT 365 COPILOT': ['WITH MICROSOFT 365 COPILOT', '使用 MICROSOFT 365 COPILOT', '使用 MICROSOFT 365 COPILOT', 'MICROSOFT 365 COPILOT の場合', 'MICROSOFT 365 COPILOT 사용'],
    'Start with Copilot Chat': ['Start with Copilot Chat', '從 Copilot Chat 開始', '从 Copilot Chat 开始', 'Copilot Chat から始める', 'Copilot Chat으로 시작'],
    'Work inside the app': ['Work inside the app', '直接在應用程式內工作', '直接在应用程序内工作', 'アプリ内で作業', '앱 안에서 작업'],
    'Suggest and explain formulas': ['Suggest and explain formulas', '建議及解釋公式', '建议及解释公式', '数式の提案と説明', '수식 제안 및 설명'],
    'Plan an analysis': ['Plan an analysis', '規劃分析方法', '规划分析方法', '分析計画の作成', '분석 계획 수립'],
    'Recommend useful charts': ['Recommend useful charts', '建議實用圖表', '建议实用图表', '有用なグラフを提案', '유용한 차트 추천'],
    'Analyse workbook data': ['Analyse workbook data', '分析工作簿數據', '分析工作簿数据', 'ブックのデータを分析', '통합 문서 데이터 분석'],
    'Create formulas and PivotTables': ['Create formulas and PivotTables', '建立公式及樞紐分析表', '建立公式及数据透视表', '数式とピボットテーブルを作成', '수식 및 피벗 테이블 작성'],
    'Find trends, risks and outliers': ['Find trends, risks and outliers', '找出趨勢、風險及異常值', '找出趋势、风险及异常值', '傾向・リスク・外れ値を特定', '추세, 위험 및 이상치 찾기'],
    'MISSION': ['MISSION', '任務', '任务', 'ミッション', '미션'], 'WORK MISSION': ['WORK MISSION', '工作任務', '工作任务', '業務ミッション', '업무 미션'],
    'Practice settings are ready. Review or edit them before copying.': ['Practice settings are ready. Review or edit them before copying.', '練習設定已準備好。複製前請檢查或修改內容。', '练习设置已准备好。复制前请检查或修改内容。', '演習設定の準備ができました。コピーする前に確認または編集してください。', '실습 설정이 준비되었습니다. 복사하기 전에 검토하거나 수정하세요.']
  };

  const presets = {
    excel: {
      task: ['Analyse the fictional hospital sales workbook and identify revenue, gross margin, conversion, overdue follow-up, payment risks and priority actions.', '分析虛構醫院銷售工作簿，找出收入、毛利、轉換率、逾期跟進、付款風險及優先行動。', '分析虚构医院销售工作簿，找出收入、毛利、转化率、逾期跟进、付款风险及优先行动。', '架空の病院営業ブックを分析し、売上、粗利益、転換率、フォロー遅延、支払リスク、優先アクションを特定してください。', '가상 병원 영업 통합 문서를 분석하여 매출, 총마진, 전환율, 지연된 후속 조치, 결제 위험 및 우선 조치를 파악하세요.'],
      source: ['Use the downloaded AI Workshop Fictional Raw Data workbook. Keep the raw-data sheet unchanged and use only information contained in the workbook.', '使用已下載的 AI 工作坊虛構原始數據工作簿。保持原始數據工作表不變，只使用工作簿內的資料。', '使用已下载的 AI 工作坊虚构原始数据工作簿。保持原始数据工作表不变，只使用工作簿内的数据。', 'ダウンロードした AI ワークショップ架空元データブックを使用し、元データシートは変更せず、ブック内の情報だけを使用してください。', '다운로드한 AI 워크숍 가상 원본 데이터 통합 문서를 사용하세요. 원본 데이터 시트를 변경하지 말고 통합 문서의 정보만 사용하세요.'],
      rules: ['State the exact date range. Show Sales Amount USD and Quantity with totals. Exclude Inter-Company transactions and Nittu. Do not invent explanations. Separate pipeline from confirmed revenue and flag missing information.', '列明確實日期範圍；以總計顯示 Sales Amount USD 及 Quantity；排除 Inter-Company 交易及 Nittu；不得虛構解釋；把銷售管道與已確認收入分開，並標示缺失資料。', '列明确切日期范围；以总计显示 Sales Amount USD 和 Quantity；排除 Inter-Company 交易及 Nittu；不得虚构解释；把销售管道与已确认收入分开，并标记缺失数据。', '正確な期間、Sales Amount USD と Quantity の合計を示し、Inter-Company 取引と Nittu を除外してください。説明を捏造せず、パイプラインと確定売上を分け、不足情報を明示してください。', '정확한 기간과 Sales Amount USD 및 Quantity 합계를 표시하고 Inter-Company 거래와 Nittu를 제외하세요. 설명을 꾸며내지 말고 파이프라인과 확정 매출을 구분하며 누락 정보를 표시하세요.'],
      output: ['Management-ready table with totals, five verified findings, three risks, priority actions and two chart recommendations.', '供管理層使用的表格，包括總計、五項已核實發現、三項風險、優先行動及兩項圖表建議。', '供管理层使用的表格，包括总计、五项已核实发现、三项风险、优先行动及两项图表建议。', '合計、確認済みの発見5件、リスク3件、優先アクション、グラフ提案2件を含む経営向け表。', '합계, 검증된 발견 5개, 위험 3개, 우선 조치 및 차트 추천 2개가 포함된 경영진용 표.'],
      role: ['senior sales performance analyst', '高級銷售表現分析師', '高级销售绩效分析师', 'シニア営業実績アナリスト', '시니어 영업 성과 분석가']
    },
    powerpoint: {
      task: ['Create a concise six-slide management presentation from the verified Hospital Sales Analysis findings.', '根據已核實的醫院銷售分析結果，建立精簡的六頁管理層簡報。', '根据已核实的医院销售分析结果，建立简洁的六页管理层演示文稿。', '確認済みの病院営業分析結果から、簡潔な6枚の経営資料を作成してください。', '검증된 병원 영업 분석 결과를 바탕으로 간결한 6장 경영진 프레젠테이션을 만드세요.'],
      source: ['Paste the verified Excel output here: KPI table, revenue and margin calculations, conversion results, follow-up and payment risks, chart-ready data and confirmed limitations.', '在此貼上已核實 Excel 結果：KPI 表格、收入及毛利計算、轉換結果、跟進及付款風險、可製圖數據及已確認限制。', '在此粘贴已核实 Excel 结果：KPI 表格、收入及毛利计算、转化结果、跟进及付款风险、可制图数据及已确认限制。', '確認済みの Excel 結果（KPI表、売上・粗利益計算、転換結果、フォロー・支払リスク、グラフ用データ、確認済み制約）をここに貼り付けてください。', '검증된 Excel 결과(KPI 표, 매출 및 마진 계산, 전환 결과, 후속 조치 및 결제 위험, 차트용 데이터, 확인된 제한 사항)를 여기에 붙여 넣으세요.'],
      rules: ['Use only verified Excel findings. Do not invent causes, customer facts, approvals or commitments. Keep pipeline separate from confirmed revenue. Label missing information and make every chart traceable.', '只使用已核實 Excel 結果。不得虛構原因、客戶資料、批准或承諾。把銷售管道與已確認收入分開，標示缺失資料，並確保每個圖表均可追溯。', '只使用已核实 Excel 结果。不得虚构原因、客户资料、批准或承诺。把销售管道与已确认收入分开，标记缺失数据，并确保每个图表均可追溯。', '確認済み Excel 結果のみを使用し、原因、顧客情報、承認、約束を捏造しないでください。パイプラインと確定売上を分け、不足情報を示し、各グラフを追跡可能にしてください。', '검증된 Excel 결과만 사용하고 원인, 고객 정보, 승인 또는 약속을 꾸며내지 마세요. 파이프라인과 확정 매출을 구분하고 누락 정보를 표시하며 모든 차트를 추적 가능하게 하세요.'],
      output: ['Six slides: executive summary; revenue and margin; conversion and pipeline; customer and follow-up risks; recommended actions; decisions and owners. Include chart guidance and speaker notes.', '六頁簡報：執行摘要；收入及毛利；轉換及銷售管道；客戶及跟進風險；建議行動；決定及負責人。包括圖表指引及講者備註。', '六页演示：执行摘要；收入及毛利；转化及销售管道；客户及跟进风险；建议行动；决定及负责人。包括图表指引及演讲者备注。', '6枚：要約、売上と粗利益、転換とパイプライン、顧客とフォローのリスク、推奨アクション、意思決定と担当者。グラフ案と発表者ノートを含めます。', '6장: 요약, 매출 및 마진, 전환 및 파이프라인, 고객 및 후속 조치 위험, 권장 조치, 결정 및 담당자. 차트 지침과 발표자 노트를 포함하세요.'],
      role: ['senior management presentation specialist', '高級管理層簡報專家', '高级管理层演示专家', 'シニア経営プレゼンテーション専門家', '시니어 경영진 프레젠테이션 전문가']
    },
    word: {
      task: ['Turn the fictional customer meeting conversation into a factual meeting report with decisions, actions, owners, deadlines and confirmation points.', '把虛構客戶會議對話整理成事實會議報告，包括決定、行動、負責人、期限及待確認事項。', '把虚构客户会议对话整理成事实会议报告，包括决定、行动、负责人、期限及待确认事项。', '架空の顧客会議会話を、決定事項、アクション、担当者、期限、要確認事項を含む事実ベースの報告書にしてください。', '가상 고객 회의 대화를 결정 사항, 조치, 담당자, 기한 및 확인 항목이 포함된 사실 기반 회의 보고서로 작성하세요.'],
      source: ['Use only the downloaded Word Customer Meeting Conversation document. Treat customer interest, samples, claims, pricing, stock and lead time as unconfirmed unless explicitly confirmed in the source.', '只使用已下載的 Word 客戶會議對話文件。除非來源明確確認，否則客戶興趣、樣品、聲稱、價格、庫存及交貨期均視為待確認。', '只使用已下载的 Word 客户会议对话文件。除非来源明确确认，否则客户兴趣、样品、声明、价格、库存及交货期均视为待确认。', 'ダウンロードした Word 顧客会議会話文書だけを使用し、出典で明示されない限り、関心、サンプル、主張、価格、在庫、納期は未確認として扱ってください。', '다운로드한 Word 고객 회의 대화 문서만 사용하세요. 출처에서 명시적으로 확인되지 않은 고객 관심, 샘플, 클레임, 가격, 재고 및 리드타임은 미확인으로 처리하세요.'],
      rules: ['Do not invent approvals, commitments, owners or dates. Separate confirmed facts from pending items. Flag missing information and preserve product names exactly.', '不得虛構批准、承諾、負責人或日期。區分已確認事實與待處理事項，標示缺失資料，並準確保留產品名稱。', '不得虚构批准、承诺、负责人或日期。区分已确认事实与待处理事项，标记缺失数据，并准确保留产品名称。', '承認、約束、担当者、日付を捏造せず、確認済み事実と保留事項を分け、不足情報を示し、製品名を正確に保持してください。', '승인, 약속, 담당자 또는 날짜를 꾸며내지 말고 확정 사실과 보류 항목을 구분하며 누락 정보를 표시하고 제품명을 정확히 유지하세요.'],
      output: ['Factual meeting report with executive summary, confirmed facts, pending questions and an action table showing owner, deadline and status.', '事實會議報告，包括執行摘要、已確認事實、待確認問題，以及列明負責人、期限及狀態的行動表。', '事实会议报告，包括执行摘要、已确认事实、待确认问题，以及列明负责人、期限及状态的行动表。', '要約、確認済み事実、保留質問、担当者・期限・状態を示すアクション表を含む事実ベースの会議報告書。', '요약, 확정 사실, 보류 질문 및 담당자·기한·상태가 포함된 실행 표로 구성된 사실 기반 회의 보고서.'],
      role: ['senior customer meeting report specialist', '高級客戶會議報告專家', '高级客户会议报告专家', 'シニア顧客会議報告専門家', '시니어 고객 회의 보고서 전문가']
    }
  };

  const languageIndex = () => Math.max(0, LANGS.indexOf(document.querySelector('.ui-language select')?.value || 'English'));
  let pendingPractice = '';
  let fillingPractice = false;
  const localized = (entry) => Array.isArray(entry) ? entry[languageIndex()] : entry;
  const fire = (el) => { el?.dispatchEvent(new Event('input', { bubbles: true })); el?.dispatchEvent(new Event('change', { bubbles: true })); };
  const setValue = (el, value) => { if (!el) return; const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set; setter ? setter.call(el, value) : (el.value = value); fire(el); };
  const choose = (select, index) => { if (!select || !select.options.length) return; select.selectedIndex = Math.min(index, select.options.length - 1); fire(select); };

  function removeUnwantedExercises() {
    ['#practice-email', '#practice-risk'].forEach(selector => document.querySelector(selector)?.remove());
  }

  function translateWorkshop() {
    const host = document.querySelector('#workshop-legacy');
    if (!host) return;
    const reverse = new Map();
    Object.entries(workshopText).forEach(([key, values]) => values.forEach(value => reverse.set(value, key)));
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue.trim();
      const key = reverse.get(raw);
      if (!key) continue;
      node.nodeValue = node.nodeValue.replace(raw, workshopText[key][languageIndex()]);
    }
  }

  function showPresetNotice(builder) {
    let notice = builder.querySelector('.ux-preset-notice29');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'ux-preset-notice29';
      builder.prepend(notice);
    }
    notice.textContent = localized(workshopText['Practice settings are ready. Review or edit them before copying.']);
  }

  function applyPracticePreset(kind) {
    const preset = presets[kind];
    if (!preset) return;
    const categoryIndex = { excel: 3, powerpoint: 1, word: 2 }[kind];
    const card = document.querySelectorAll('.task-card')[categoryIndex];
    if (card && !card.classList.contains('selected')) card.click();
    setTimeout(() => {
      const builder = document.querySelector('.builder-section');
      if (!builder) return;
      const profile = document.querySelector('.ux-profile25');
      choose(profile?.querySelector('[data-profile="dept"]'), 1);
      choose(profile?.querySelector('[data-profile="grade"]'), 4);
      setValue(profile?.querySelector('[data-profile="role"]'), localized(preset.role));
      const request = [...builder.querySelectorAll('textarea')].find(item => !item.classList.contains('source-area') && !item.closest('.rules-library'));
      setValue(request, localized(preset.task));
      setValue(builder.querySelector('textarea.source-area'), localized(preset.source));
      setValue(builder.querySelector('.rules-library textarea'), localized(preset.rules));
      setValue(builder.querySelector('.compact-library input'), localized(preset.output));
      const subcategory = document.querySelector('.subcategory-panel select');
      choose(subcategory, kind === 'powerpoint' ? 2 : 1);
      choose(builder.querySelector('.library-field select'), kind === 'powerpoint' ? 2 : 1);
      const selects = [...builder.querySelectorAll('select')];
      selects.slice(1).forEach((select, index) => { if (select.selectedIndex < 0) choose(select, 0); });
      if (kind === 'powerpoint') {
        const slideSelect = [...selects].find(select => [...select.options].some(option => option.value === '5') && [...select.options].some(option => option.value === '8'));
        if (slideSelect) {
          const custom = [...slideSelect.options].find(option => option.value === 'Custom');
          if (custom) { slideSelect.value = custom.value; fire(slideSelect); }
          setTimeout(() => {
            const number = [...builder.querySelectorAll('input')].find(input => /18|slide/i.test(input.placeholder || ''));
            setValue(number, '6');
          }, 120);
        }
      }
      showPresetNotice(builder);
      history.replaceState(null, '', '#prompt-brief');
      builder.classList.add('ux-preset-highlight30');
      builder.scrollIntoView({ behavior: 'auto', block: 'start' });
      setTimeout(() => builder.classList.remove('ux-preset-highlight30'), 1500);
    }, 420);
  }

  function completePendingPractice() {
    if (!pendingPractice || fillingPractice) return;
    const builder = document.querySelector('.builder-section');
    if (!builder || builder.classList.contains('view-hidden')) return;
    fillingPractice = true;
    applyPracticePreset(pendingPractice);
    setTimeout(() => {
      pendingPractice = '';
      fillingPractice = false;
    }, 900);
  }

  function bindPracticeBuilder() {
    if (document.documentElement.dataset.workshopPreset29) return;
    document.documentElement.dataset.workshopPreset29 = '1';
    document.addEventListener('click', event => {
      const button = event.target.closest('#practice-excel .exercise-actions button, #practice-slides .exercise-actions button, #practice-document .exercise-actions button');
      if (!button) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const card = button.closest('.exercise-card');
      const kind = card?.id === 'practice-slides' ? 'powerpoint' : card?.id === 'practice-document' ? 'word' : 'excel';
      pendingPractice = kind;
      fillingPractice = false;
      const home = document.querySelector('.portal-nav > button');
      const openPrompt = () => {
        const cards = document.querySelectorAll('.portal-card-grid > button, .portal-card-grid > a');
        cards[1]?.click();
      };
      if (document.querySelector('.portal-home')?.classList.contains('view-hidden')) {
        home?.click();
        setTimeout(openPrompt, 100);
      } else openPrompt();
      setTimeout(completePendingPractice, 180);
    }, true);
  }

  function improveWorkshop() {
    removeUnwantedExercises();
    translateWorkshop();
    bindPracticeBuilder();
    completePendingPractice();
  }

  document.addEventListener('change', event => {
    if (event.target.closest('.ui-language')) setTimeout(improveWorkshop, 160);
  });
  new MutationObserver(() => improveWorkshop()).observe(document.documentElement, { childList: true, subtree: true });
  [100, 500, 1200, 2500].forEach(delay => setTimeout(improveWorkshop, delay));
})();
