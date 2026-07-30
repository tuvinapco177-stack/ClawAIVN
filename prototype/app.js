// EduSharePro Prototype Logic

// Dữ liệu học liệu mặc định khởi tạo ban đầu
const DEFAULT_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Đề thi thử THPT Quốc Gia môn Toán 2026 - Chuyên Lê Hồng Phong",
    category: "THPT (Lớp 10-12)",
    categorySlug: "thpt",
    fileType: "pdf",
    fileSize: "1.8 MB",
    pages: 12,
    author: "Thầy Nguyễn Hùng",
    views: 1240,
    downloads: 850,
    status: "approved",
    description: "Đề thi thử chất lượng cao từ trường Chuyên Lê Hồng Phong cấu trúc sát đề minh họa Bộ Giáo Dục kèm lời giải chi tiết giúp học sinh ôn tập chuẩn xác.",
    previewContent: "TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG\nĐỀ THI THỬ TỐT NGHIỆP THPT NĂM 2026\nMôn thi: TOÁN HỌC\nThời gian làm bài: 90 phút (không kể thời gian phát đề)\n\nCâu 1. Cho hàm số y = f(x) có bảng biến thiên như sau...\nCâu 2. Trong không gian Oxyz, cho mặt cầu (S)...",
    date: "2026-07-15"
  },
  {
    id: "doc-2",
    title: "Giáo án Ngữ Văn lớp 6 - Bộ sách Kết nối tri thức (Học kỳ 1)",
    category: "THCS (Lớp 6-9)",
    categorySlug: "thcs",
    fileType: "docx",
    fileSize: "4.5 MB",
    pages: 48,
    author: "Cô Mai Chi",
    views: 930,
    downloads: 710,
    status: "approved",
    description: "Giáo án Ngữ Văn lớp 6 chi tiết thiết kế theo định hướng phát triển năng lực học sinh, biên soạn đầy đủ các tiết học kỳ 1.",
    previewContent: "KẾ HOẠCH BÀI DẠY MÔN NGỮ VĂN LỚP 6\nBỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG\n\nBài 1: TÔI VÀ CÁC BẠN (Thời lượng: 12 tiết)\nI. MỤC TIÊU CẦN ĐẠT:\n1. Về năng lực: Nhận biết được các yếu tố của truyện truyền thuyết...",
    date: "2026-07-14"
  },
  {
    id: "doc-3",
    title: "Slide bài giảng Toán tư duy cho học sinh lớp 1 - Học đếm số",
    category: "Tiểu học (Lớp 1-5)",
    categorySlug: "tieu-hoc",
    fileType: "pptx",
    fileSize: "8.2 MB",
    pages: 25,
    author: "Cô Nguyễn Lan",
    views: 520,
    downloads: 320,
    status: "approved",
    description: "Slide Powerpoint thiết kế màu sắc sống động, trực quan giúp học sinh lớp 1 làm quen với các con số và phép cộng đơn giản thông qua trò chơi vui nhộn.",
    previewContent: "CHÀO MỪNG CÁC CON ĐẾN VỚI LỚP TOÁN TƯ DUY!\nChủ đề: Bé vui học đếm từ 1 đến 10\n\nHình ảnh minh họa quả táo, con thỏ sinh động.\nTrò chơi 1: Tìm nhà cho các bạn thú...\nTrò chơi 2: Đếm số lượng hoa quả...",
    date: "2026-07-16"
  },
  {
    id: "doc-4",
    title: "Đề cương ôn tập học kỳ 2 Vật lý 11 - Tóm tắt công thức và bài tập tự luyện",
    category: "THPT (Lớp 10-12)",
    categorySlug: "thpt",
    fileType: "pdf",
    fileSize: "2.1 MB",
    pages: 15,
    author: "Thầy Trần Nam",
    views: 890,
    downloads: 640,
    status: "approved",
    description: "Tóm tắt đầy đủ lý thuyết và hệ thống công thức Vật lý 11 học kỳ 2 phần Quang hình học, Khúc xạ ánh sáng kèm 100 câu bài tập trắc nghiệm chọn lọc.",
    previewContent: "ĐỀ CƯƠNG ÔN TẬP VẬT LÝ 11 - HỌC KỲ II\nTÓM TẮT CÔNG THỨC & BÀI TẬP TỰ LUYỆN\n\nPhần I: Quang hình học\n1. Khúc xạ ánh sáng: Định luật khúc xạ n1.sin(i) = n2.sin(r)\n2. Phản xạ toàn phần: Điều kiện phản xạ sin(igh) = n2/n1...",
    date: "2026-07-12"
  },
  {
    id: "doc-5",
    title: "Tập bản đồ tự nhiên và kinh tế xã hội Việt Nam học phần Địa lý",
    category: "Đại học & Cao đẳng",
    categorySlug: "dai-hoc",
    fileType: "pdf",
    fileSize: "12.4 MB",
    pages: 35,
    author: "TS. Lê Mạnh",
    views: 410,
    downloads: 180,
    status: "approved",
    description: "Tài liệu tham khảo chuyên ngành Địa lý học, tổng hợp bản đồ hành chính, địa hình tự nhiên và phân bố kinh tế các vùng trọng điểm của Việt Nam.",
    previewContent: "BẢN ĐỒ KINH TẾ XÃ HỘI VIỆT NAM\nTài liệu giảng dạy giảng đường Đại học\n\nChương 1: Địa lý tự nhiên Việt Nam (Địa hình, khí hậu, sông ngòi)\nChương 2: Địa lý dân cư và phân bố lao động\nChương 3: Cơ cấu ngành kinh tế...",
    date: "2026-07-10"
  },
  {
    id: "doc-6",
    title: "Tài liệu hướng dẫn thực hành lập trình Python cơ bản cho sinh viên CNTT",
    category: "Đại học & Cao đẳng",
    categorySlug: "dai-hoc",
    fileType: "pdf",
    fileSize: "3.5 MB",
    pages: 20,
    author: "Lê Minh Tuấn",
    views: 310,
    downloads: 150,
    status: "pending", // Đang chờ duyệt
    description: "Tài liệu lập trình thực hành Python từ cơ bản đến cấu trúc dữ liệu và giải thuật cơ bản cho người mới học.",
    previewContent: "THỰC HÀNH LẬP TRÌNH PYTHON CƠ BẢN\nKhoa Công nghệ thông tin\n\nBài 1: Giới thiệu biến, kiểu dữ liệu nguyên, thực, chuỗi.\nBài 2: Cấu trúc rẽ nhánh if-else và vòng lặp for/while.\nBài 3: Định nghĩa hàm (def) và cách gọi hàm...",
    date: "2026-07-17"
  }
];

// Quản lý State của Ứng dụng qua localStorage
const State = {
  getDocuments() {
    let docs = localStorage.getItem('edushare_docs');
    if (!docs) {
      localStorage.setItem('edushare_docs', JSON.stringify(DEFAULT_DOCUMENTS));
      return DEFAULT_DOCUMENTS;
    }
    return JSON.parse(docs);
  },

  saveDocuments(docs) {
    localStorage.setItem('edushare_docs', JSON.stringify(docs));
  },

  getCurrentUser() {
    let user = localStorage.getItem('edushare_current_user');
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('edushare_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edushare_current_user');
    }
  },

  // Đăng ký người dùng mới
  registerUser(email, password, fullName, role = 'member') {
    let users = JSON.parse(localStorage.getItem('edushare_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email này đã tồn tại trên hệ thống!" };
    }
    const newUser = { id: 'user-' + Date.now(), email, password, fullName, role };
    users.push(newUser);
    localStorage.setItem('edushare_users', JSON.stringify(users));
    return { success: true, user: newUser };
  },

  // Đăng nhập
  loginUser(email, password) {
    // Tài khoản admin mặc định để test
    if (email === 'admin@edushare.vn' && password === 'admin123') {
      const adminUser = { id: 'admin-1', email, fullName: 'Quản trị viên Hệ thống', role: 'admin' };
      this.setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }
    // Tài khoản kiểm duyệt viên mẫu
    if (email === 'mod@edushare.vn' && password === 'mod123') {
      const modUser = { id: 'mod-1', email, fullName: 'Kiểm duyệt viên', role: 'moderator' };
      this.setCurrentUser(modUser);
      return { success: true, user: modUser };
    }

    let users = JSON.parse(localStorage.getItem('edushare_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: "Email hoặc mật khẩu không chính xác!" };
  }
};

// Khởi tạo tài khoản hệ thống mẫu vào DB giả lập nếu trống
if (!localStorage.getItem('edushare_users')) {
  localStorage.setItem('edushare_users', JSON.stringify([
    { id: 'user-0', email: 'user@edushare.vn', password: 'user123', fullName: 'Nguyễn Văn Học', role: 'member' }
  ]));
}

// Hàm hiển thị thông báo Toast đẹp mắt
function showToast(message, type = 'info') {
  const existingToast = document.querySelector('.notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'notification';
  
  let borderColor = '#0891b2'; // Primary
  if (type === 'success') borderColor = '#22c55e'; // Green
  if (type === 'error') borderColor = '#ef4444'; // Red
  
  toast.style.borderLeftColor = borderColor;
  toast.innerHTML = `
    <div style="font-weight: 700; color: #164e63;">${message}</div>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Quản lý đóng mở Modal chung
function setupModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('show');
    });
  });

  const closeButtons = document.querySelectorAll('.close-btn, .btn-close-modal');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.remove('show');
    });
  });

  // Đóng modal khi click ra ngoài vùng nội dung
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  });
}

// Xử lý Giao diện Đăng nhập / Đăng ký
function setupAuth() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('[name="email"]').value;
      const password = loginForm.querySelector('[name="password"]').value;
      
      const result = State.loginUser(email, password);
      if (result.success) {
        showToast(`Đăng nhập thành công! Chào mừng ${result.user.fullName}`, 'success');
        document.getElementById('login-modal').classList.remove('show');
        updateHeaderAuth();
        // Nếu là Admin hoặc Moderator thì chuyển hướng/hiển thị nút vào trang quản lý
        if (result.user.role === 'admin' || result.user.role === 'moderator') {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        showToast(result.message, 'error');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm.querySelector('[name="email"]').value;
      const password = signupForm.querySelector('[name="password"]').value;
      const fullName = signupForm.querySelector('[name="fullName"]').value;
      
      const result = State.registerUser(email, password, fullName);
      if (result.success) {
        showToast("Đăng ký thành công! Đang đăng nhập tự động...", 'success');
        State.loginUser(email, password);
        document.getElementById('signup-modal').classList.remove('show');
        updateHeaderAuth();
      } else {
        showToast(result.message, 'error');
      }
    });
  }
}

// Cập nhật trạng thái hiển thị của Auth trên Header
function updateHeaderAuth() {
  const authContainer = document.getElementById('header-auth-container');
  if (!authContainer) return;

  const currentUser = State.getCurrentUser();
  if (currentUser) {
    let adminLink = '';
    if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
      adminLink = `<a href="admin.html"><svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> Quản lý Admin</a>`;
    }

    authContainer.innerHTML = `
      <div class="user-menu-container">
        <button class="user-avatar-btn" id="user-menu-trigger">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" alt="avatar">
          <span style="font-weight:700;color:var(--color-text-main);">${currentUser.fullName}</span>
        </button>
        <div class="user-dropdown" id="user-dropdown-menu">
          <div class="user-info-header">
            <div>${currentUser.fullName}</div>
            <div class="user-info-role">${currentUser.role === 'admin' ? 'Quản trị viên' : (currentUser.role === 'moderator' ? 'Kiểm duyệt viên' : 'Thành viên')}</div>
          </div>
          ${adminLink}
          <a href="#" id="logout-btn">Đăng xuất</a>
        </div>
      </div>
    `;

    // Dropdown toggle
    const trigger = document.getElementById('user-menu-trigger');
    const menu = document.getElementById('user-dropdown-menu');
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('show');
      });
      document.addEventListener('click', () => menu.classList.remove('show'));
    }

    // Xử lý Đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        State.setCurrentUser(null);
        showToast("Đã đăng xuất!", "success");
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      });
    }
  } else {
    // Chưa đăng nhập
    authContainer.innerHTML = `
      <button class="btn btn-secondary btn-sm" data-modal="login-modal">Đăng nhập</button>
      <button class="btn btn-primary btn-sm" data-modal="signup-modal">Đăng ký</button>
    `;
    setupModals(); // Thiết lập lại click modal cho các nút vừa tạo mới
  }
}

// Xử lý Đăng tài liệu (Upload)
function setupUpload() {
  const uploadForm = document.getElementById('upload-form');
  const dropzone = document.getElementById('upload-dropzone');
  
  if (dropzone) {
    dropzone.addEventListener('click', () => {
      showToast("Mở trình chọn tệp tin máy tính (Giả lập). Đã nhận file.");
    });
  }

  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentUser = State.getCurrentUser();
      if (!currentUser) {
        showToast("Vui lòng đăng nhập trước khi tải lên học liệu!", "error");
        document.getElementById('upload-modal').classList.remove('show');
        document.getElementById('login-modal').classList.add('show');
        return;
      }

      const title = uploadForm.querySelector('[name="title"]').value;
      const category = uploadForm.querySelector('[name="category"]').value;
      const description = uploadForm.querySelector('[name="description"]').value;
      const fileType = uploadForm.querySelector('[name="fileType"]').value;
      
      const newDoc = {
        id: 'doc-' + Date.now(),
        title,
        category,
        categorySlug: category === 'THPT (Lớp 10-12)' ? 'thpt' : (category === 'THCS (Lớp 6-9)' ? 'thcs' : (category === 'Tiểu học (Lớp 1-5)' ? 'tieu-hoc' : 'dai-hoc')),
        fileType,
        fileSize: (Math.random() * 5 + 1).toFixed(1) + ' MB',
        pages: Math.floor(Math.random() * 20 + 5),
        author: currentUser.fullName,
        views: 0,
        downloads: 0,
        status: 'pending', // Chờ duyệt
        description,
        previewContent: `NỘI DUNG TÀI LIỆU: ${title.toUpperCase()}\nTác giả: ${currentUser.fullName}\n\nTài liệu hướng dẫn chi tiết dành cho người tự học và nghiên cứu...\n[Dòng xem trước trang 1]\n[Dòng xem trước trang 2]`,
        date: new Date().toISOString().split('T')[0]
      };

      let docs = State.getDocuments();
      docs.unshift(newDoc);
      State.saveDocuments(docs);

      showToast("Đã tải học liệu lên hệ thống! Đang chờ phê duyệt của Ban quản trị.", "success");
      uploadForm.reset();
      document.getElementById('upload-modal').classList.remove('show');
      
      // Nếu đang ở trang chủ, cập nhật lại danh sách nếu cần
      if (typeof renderHomepageDocs === 'function') {
        renderHomepageDocs();
      }
    });
  }
}

// Cập nhật lượt tải khi bấm nút Tải xuống
function trackDownload(docId) {
  let docs = State.getDocuments();
  let doc = docs.find(d => d.id === docId);
  if (doc) {
    doc.downloads += 1;
    State.saveDocuments(docs);
    showToast("Bắt đầu tải file xuống máy của bạn...", "success");
    
    // Cập nhật lại số liệu trên giao diện chi tiết nếu có
    const downCountSpan = document.getElementById('detail-download-count');
    if (downCountSpan) {
      downCountSpan.textContent = doc.downloads + ' lượt';
    }
  }
}

// Khởi tạo chạy chính
document.addEventListener('DOMContentLoaded', () => {
  setupModals();
  setupAuth();
  updateHeaderAuth();
  setupUpload();
});
