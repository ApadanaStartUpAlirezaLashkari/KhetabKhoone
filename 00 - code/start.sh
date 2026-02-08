#!/bin/bash

echo "================================"
echo "کتابخانه آنلاین - راه‌اندازی"
echo "================================"
echo ""

# بررسی نصب Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نیست!"
    echo "لطفاً از https://nodejs.org دانلود و نصب کنید"
    exit 1
fi

echo "✅ Node.js نصب است: $(node --version)"
echo ""

# بررسی نصب npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm نصب نیست!"
    exit 1
fi

echo "✅ npm نصب است: $(npm --version)"
echo ""

# نصب وابستگی‌ها
echo "📦 در حال نصب وابستگی‌ها..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ خطا در نصب وابستگی‌ها"
    exit 1
fi

echo ""
echo "✅ وابستگی‌ها نصب شدند"
echo ""

# اجرای سرور
echo "🚀 در حال راه‌اندازی سرور..."
echo ""
npm start
