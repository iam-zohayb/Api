
const mongoose = require('mongoose');

const driverDetailsSchema = new mongoose.Schema({
  السائق_اسم: { type: String },
  السائق_جنسية: { type: String },
  السائق_جوال: { type: String },
  السائق_هوية_رقم: { type: String,  unique: true,required:true },
  اللوحة_رقم: { type: String },
  المركبة_رقم: { type: String },
  شركة_النقل_اسم: { type: String }
});

module.exports = mongoose.model('DriverDetails', driverDetailsSchema);
