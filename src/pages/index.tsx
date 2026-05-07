import React, { useEffect, useState, useRef } from 'react';

const IndexPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('basic-policy');
  const sidebarRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['basic-policy', 'reimbursement', 'hospital-list', 'faq', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset as needed
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection('basic-policy');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll sidebar active item into view (H5)
  useEffect(() => {
    if (activeSection && sidebarRef.current) {
      const activeItem = itemRefs.current[activeSection];
      if (activeItem) {
        const sidebar = sidebarRef.current;
        // Only scroll if the sidebar is scrollable (H5 horizontal mode)
        if (sidebar.scrollWidth > sidebar.clientWidth) {
          const itemLeft = activeItem.offsetLeft;
          const itemWidth = activeItem.offsetWidth;
          const sidebarWidth = sidebar.clientWidth;
          
          // Calculate center position
          const scrollLeft = itemLeft - (sidebarWidth / 2) + (itemWidth / 2);
          
          sidebar.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Manually set active to avoid lag
      setActiveSection(id);
    }
  };

  const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
    const question = e.currentTarget;
    const answer = question.nextElementSibling as HTMLElement;
    const icon = question.querySelector('.faq-icon');
    
    if (answer) {
      answer.classList.toggle('show');
      if (answer.classList.contains('show')) {
        if (icon) icon.textContent = '▲';
      } else {
        if (icon) icon.textContent = '▼';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8 px-6 shadow-md relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">医保政策解读与就医指南</h1>
          <p className="text-lg opacity-90">为您提供全面的医保政策说明与就医指引服务</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content flex flex-col min-[750px]:flex-row max-w-7xl mx-auto mt-6 px-4 gap-6">
        {/* Sidebar */}
        <aside 
          ref={sidebarRef}
          className="sidebar w-full min-[750px]:w-[250px] h-auto min-[750px]:h-[350px] sticky top-0 min-[750px]:top-6 z-20 flex-shrink-0 bg-white shadow-md rounded-lg p-4 self-start flex flex-row min-[750px]:flex-col items-center min-[750px]:items-stretch overflow-x-auto min-[750px]:overflow-visible no-scrollbar"
        >
          <h2 className="text-xl font-bold text-blue-600 mb-0 min-[750px]:mb-4 border-b-0 min-[750px]:border-b pb-0 min-[750px]:pb-2 mr-4 min-[750px]:mr-0 whitespace-nowrap">导航菜单</h2>
          <ul className="nav-menu flex flex-row min-[750px]:flex-col space-x-4 min-[750px]:space-x-0 space-y-0 min-[750px]:space-y-2">
            {[
              { id: 'basic-policy', label: '基本医保政策' },
              { id: 'reimbursement', label: '报销流程' },
              { id: 'hospital-list', label: '定点医院查询' },
              { id: 'faq', label: '常见问题' },
              { id: 'contact', label: '联系我们' },
            ].map((item) => (
              <li 
                key={item.id} 
                className="nav-item flex-shrink-0"
                ref={(el) => { itemRefs.current[item.id] = el; }}
              >
                <a
                  href={`#${item.id}`}
                  className={`nav-link block px-4 py-2 rounded transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    activeSection === item.id ? 'active' : 'hover:bg-blue-50 text-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <main className="content flex-1 space-y-8 pb-10 w-full">
          {/* Basic Policy */}
          <section id="basic-policy" className="policy-section bg-white p-6 rounded-lg shadow-md min-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b">基本医保政策</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                基本医疗保险制度是指按照国家规定缴纳一定比例的医疗保险费，在参保人员因病需要就医时，由医疗保险基金支付一定比例的医疗费用，个人承担剩余部分的社会保险制度。
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">覆盖范围</h3>
              <p>
                包括城镇职工基本医疗保险、城乡居民基本医疗保险等，覆盖所有用人单位职工、城乡居民、在校学生等群体。
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">缴费标准</h3>
              <p>
                职工医保由单位和个人共同缴纳；居民医保由个人缴费和政府补助相结合。具体标准根据当地经济发展水平动态调整。
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">待遇享受</h3>
              <p>
                参保人员在定点医疗机构就医发生的符合规定的医疗费用，可按规定比例报销。包括门诊统筹、住院报销、大病保险等。
              </p>
            </div>
          </section>

          {/* Reimbursement */}
          <section id="reimbursement" className="policy-section bg-white p-6 rounded-lg shadow-md min-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b">报销流程</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex flex-col min-[750px]:flex-row gap-4 items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">1.就医登记</h3>
                  <p className="mt-2">持医保卡/社保卡在定点医院挂号就诊，告知医保身份。</p>
                </div>
                <div className="hidden min-[750px]:block text-blue-300 text-2xl">→</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">2.费用结算</h3>
                  <p className="mt-2">出院或门诊结算时，只需支付个人自付部分，统筹支付部分由医院与医保中心直接结算。</p>
                </div>
                <div className="hidden min-[750px]:block text-blue-300 text-2xl">→</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">3.异地就医</h3>
                  <p className="mt-2">需提前办理异地备案手续，备案后可在异地联网定点医院直接结算。</p>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2">注意事项：</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-900">
                  <li>请务必携带有效身份证件和社保卡/医保电子凭证。</li>
                  <li>急诊、意外伤害等特殊情况需保留好相关病历和发票，以便手工报销。</li>
                  <li>转诊转院需经具备资格的定点医疗机构办理转诊手续。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hospital List */}
          <section id="hospital-list" className="policy-section bg-white p-6 rounded-lg shadow-md min-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b">定点医院查询</h2>
            <div className="hospital-list grid grid-cols-1 min-[750px]:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: '市第一人民医院', level: '三级甲等', type: '综合医院', address: '市中心大道1号' },
                { name: '市中心医院', level: '三级甲等', type: '综合医院', address: '建设路88号' },
                { name: '市中医院', level: '三级甲等', type: '中医医院', address: '健康路66号' },
                { name: '市妇幼保健院', level: '三级乙等', type: '专科医院', address: '爱心路12号' },
                { name: '区人民医院', level: '二级甲等', type: '综合医院', address: '便民街33号' },
                { name: '社区卫生服务中心', level: '一级', type: '基层医疗', address: '幸福小区旁' },
              ].map((hospital, index) => (
                <div 
                  key={index} 
                  className="hospital-card bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
                  onClick={() => alert('你点击了该卡片')}
                >
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 mb-2">{hospital.name}</h3>
                  <div className="hospital-info text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">等级：</span>{hospital.level}</p>
                    <p><span className="font-medium">类型：</span>{hospital.type}</p>
                    <p><span className="font-medium">地址：</span>{hospital.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="policy-section bg-white p-6 rounded-lg shadow-md min-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b">常见问题</h2>
            <div className="space-y-4">
              {[
                { q: '医保卡丢了怎么办？', a: '请立即拨打12333挂失，并前往当地社保中心或通过手机APP申请补办。挂失期间发生的费用需自行垫付后手工报销。' },
                { q: '如何查询医保个人账户余额？', a: '可以通过国家医保服务平台APP、支付宝/微信城市服务、当地人社局官网或拨打12333热线查询。' },
                { q: '异地就医如何备案？', a: '可通过“国家医保服务平台”APP、“国家异地就医备案”小程序线上办理，或持社保卡到参保地医保经办机构窗口办理。' },
                { q: '门诊费用可以报销吗？', a: '可以。职工医保门诊统筹已全面建立，居民医保在基层医疗机构就医也可享受门诊报销待遇，具体起付线和报销比例视当地政策而定。' },
              ].map((item, index) => (
                <div key={index} className="faq-item border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="faq-question bg-gray-50 p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors"
                    onClick={toggleFaq}
                  >
                    <span className="font-semibold text-gray-800">{item.q}</span>
                    <span className="faq-icon text-gray-500 text-sm">▼</span>
                  </div>
                  <div className="faq-answer p-4 bg-white text-gray-600 border-t border-gray-100">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="policy-section bg-white p-6 rounded-lg shadow-md min-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b">联系我们</h2>
            <div className="grid grid-cols-1 min-[750px]:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">联系方式</h3>
                <p className="text-gray-600">如有任何医保政策疑问，欢迎通过以下方式联系我们：</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="font-bold w-20">咨询热线：</span>
                    <span className="text-blue-600">12333 / 12345</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold w-20">办公地址：</span>
                    <span>XX市XX区市民服务中心医保窗口</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold w-20">服务时间：</span>
                    <span>周一至周五 9:00-17:00</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold w-20">官方网站：</span>
                    <a href="#" className="text-blue-600 hover:underline">www.ybBj.gov.cn</a>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-white border-2 border-blue-200 mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://www.ybBj.gov.cn')}&color=1e88e5`} 
                    alt="扫码关注" 
                    className="w-full h-full p-1"
                  />
                </div>
                <p className="text-sm text-gray-600">扫描关注“XX医保”公众号</p>
                <p className="text-xs text-gray-500 mt-1">获取最新政策资讯与便民服务</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4 text-gray-400">© 2026 医保政策解读与就医指南平台 版权所有</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="footer-link hover:text-blue-400 transition-colors">关于我们</a>
            <a href="#" className="footer-link hover:text-blue-400 transition-colors">免责声明</a>
            <a href="#" className="footer-link hover:text-blue-400 transition-colors">隐私政策</a>
            <a href="#" className="footer-link hover:text-blue-400 transition-colors">帮助中心</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
