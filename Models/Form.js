//Backend/Models/Form.js

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  formData: {
    تاريخ: String,
    الكشف_تاريخ: String,
    الكشف_رقم:{ type: String,  unique: true,required:true },
    شركة_العمرة_اسم: String,
    شركة_العمرة_رقم: String,
    الجنسية: String,
    المعتمرين_عدد: Number,
    الرحلة_رقم: String,
    من: String,
    الرحلة_تاريخ: String,
    الناقل: String,
    المنفذ: String,
    الرحلة_وقت: String,
    إلى: String,
    السائق_اسم: String,
    السائق_جنسية: String,
    السائق_جوال: String,
    السائق_هوية_رقم: String,
    اللوحة_رقم: String,
    المركبة_رقم: String,
    شركة_النقل_اسم: String,
  },
  passengers: [{
    رقم_المعتمر: String,
    اسم_المعتمر: String,
    جنسية: String
  }]
});

module.exports = mongoose.model('Form', formSchema);
