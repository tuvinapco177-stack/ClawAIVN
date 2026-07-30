-- ==========================================
-- DATABASE SCHEMA FOR EDUSHAREPRO (POSTGRESQL)
-- ==========================================

-- Kích hoạt extension hỗ trợ tìm kiếm text và UUID nếu cần
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng Vai trò Người dùng (Sử dụng Enum cho phân quyền)
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'member');

-- 2. Bảng Trạng thái tài liệu (Sử dụng Enum cho kiểm duyệt)
CREATE TYPE document_status AS ENUM ('pending', 'approved', 'rejected');

-- 3. Bảng Người dùng (Users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    role user_role DEFAULT 'member',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index cho email để tối ưu hóa đăng nhập
CREATE INDEX idx_users_email ON users(email);

-- 4. Bảng Danh mục Học liệu (Categories - Hỗ trợ phân cấp cha/con)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    icon_svg TEXT, -- Chứa mã SVG inline để hiển thị icon giao diện
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- Chèn dữ liệu danh mục mẫu
INSERT INTO categories (name, slug, description, icon_svg, display_order) VALUES
('Tiểu học (Lớp 1-5)', 'tieu-hoc', 'Học liệu, giáo án và bài tập cho học sinh tiểu học', '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>', 1),
('THCS (Lớp 6-9)', 'thcs', 'Tài liệu ôn thi, đề kiểm tra và đề cương học tập bậc Trung học cơ sở', '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>', 2),
('THPT (Lớp 10-12)', 'thpt', 'Tài liệu ôn thi THPT Quốc gia, đề thi thử và chuyên đề nâng cao', '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>', 3),
('Đại học & Cao đẳng', 'dai-hoc', 'Giáo trình, bài giảng, đề án tốt nghiệp và slide môn học các ngành', '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>', 4);

-- 5. Bảng Tài liệu / Học liệu (Documents)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(270) UNIQUE NOT NULL,
    description TEXT,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(20) NOT NULL, -- e.g., 'pdf', 'docx', 'pptx', 'xlsx', 'zip'
    file_size BIGINT NOT NULL, -- Lưu dung lượng bằng bytes
    page_count INT DEFAULT 0,
    preview_pages TEXT[], -- Mảng chứa URL ảnh xem trước cho các trang đầu của tài liệu
    view_count INT DEFAULT 0,
    download_count INT DEFAULT 0,
    status document_status DEFAULT 'pending',
    rejection_reason TEXT, -- Lý do nếu tài liệu bị từ chối duyệt
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_category ON documents(category_id);
CREATE INDEX idx_documents_status ON documents(status);

-- Tối ưu tìm kiếm tài liệu bằng Full-Text Search (tiếng Việt không dấu & có dấu cơ bản)
CREATE INDEX idx_documents_title_desc_fts ON documents USING gin(to_tsvector('simple', title || ' ' || COALESCE(description, '')));

-- 6. Bảng Bình luận & Đánh giá (Comments & Ratings)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE SET NULL, -- Hỗ trợ thảo luận phân cấp (reply)
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Điểm đánh giá (nếu có) từ 1 đến 5 sao
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_document ON comments(document_id);

-- 7. Bảng Lịch sử Tải về (Downloads Log - để phân tích thống kê)
CREATE TABLE downloads (
    id SERIAL PRIMARY KEY,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Có thể cho phép người dùng ẩn danh tải
    ip_address VARCHAR(45),
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_downloads_document ON downloads(document_id);
CREATE INDEX idx_downloads_user ON downloads(user_id);

-- ==========================================
-- MỘT SỐ TRIGGER TỰ ĐỘNG CẬP NHẬT THỜI GIAN VÀ BÁO CÁO
-- ==========================================

-- Trigger cập nhật updated_at tự động cho bảng users và documents
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_documents_modtime BEFORE UPDATE ON documents FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
