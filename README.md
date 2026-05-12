# 🚀 GitHub Training Project

Website hướng dẫn Git & GitHub teamwork dành cho học sinh và người mới bắt đầu.

Project được xây dựng nhằm mô phỏng quy trình làm việc nhóm thực tế khi phát triển phần mềm bằng GitHub.

# 📚 Nội dung project

Project bao gồm:

* Quy cách đặt tên Repository
* Quy cách đặt tên Branch
* Hướng dẫn tạo `.gitignore`
* Workflow làm việc nhóm với Git
* Flow branch thực tế
* Quy tắc teamwork với GitHub
* Các lỗi teamwork thường gặp
* Quy tắc đặt Commit Message
* Khu vực lưu và thực hành lệnh Git

# 🧩 Công nghệ sử dụng

* HTML5
* CSS3
* JavaScript
* Git
* GitHub

# 📂 Cấu trúc project

```txt
GithubTraining/
│
├── index.html
├── pages/
│   └── gitcode.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── cmd.js
│   └── local.js
│
└── README.md
```

# 🐙 Mục tiêu project

Project được tạo ra để:

* Hướng dẫn học sinh sử dụng GitHub
* Thực hành branch & merge
* Thực hành teamwork
* Hiểu workflow làm việc nhóm
* Làm quen Pull Request
* Giải quyết conflict
* Tập commit message đúng chuẩn

# 🌳 Quy trình làm việc nhóm

```txt
feature/* 
    ↓
member/*
    ↓
develop
    ↓
main
```

Mỗi thành viên làm việc trên branch riêng.

Sau khi hoàn thành:

* Commit code
* Push branch
* Tạo Pull Request
* Review code
* Merge vào develop

# 📌 Quy tắc teamwork

* Không commit trực tiếp vào `main`
* Luôn pull code mới nhất trước khi push
* Mỗi người phải có branch riêng
* Commit message phải rõ nghĩa
* Không push code lỗi
* Không tự ý sửa file người khác
* Luôn kiểm tra conflict trước khi merge

# 📝 Quy tắc Commit Message

```bash
feat(scope): thêm chức năng mới
fix(scope): sửa lỗi
docs(scope): cập nhật tài liệu
style(scope): chỉnh giao diện
refactor(scope): tối ưu code
```

Ví dụ:

```bash
feat(login): add login UI
fix(api): validate email
docs(readme): update installation guide
```

# ⚠️ Các lỗi thường gặp

* Merge conflict
* Quên pull trước khi push
* Push nhầm lên main
* Commit quá nhiều file rác
* Đặt tên branch không rõ ràng
* Nhiều người sửa cùng 1 file

# ▶️ Cách chạy project

1. Clone project

```bash
git clone <repository-url>
```

2. Mở bằng VSCode

3. Cài extension Live Server

4. Chạy `index.html` hoặc `gitcode.html`

# 👨‍💻 Dành cho học sinh

Project này được dùng để:

* luyện Git cơ bản
* luyện GitHub teamwork
* luyện branch workflow
* luyện Pull Request
* luyện resolve conflict

Khuyến khích:

* chia task rõ ràng
* commit thường xuyên
* pull code đều đặn
* trao đổi trước khi merge

# 📄 License

Project dùng cho mục đích học tập và đào tạo nội bộ.
