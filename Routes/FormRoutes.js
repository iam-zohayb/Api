//Backend/Routes/FormRotes.js
const express = require('express');
const router = express.Router();
const Form = require('../Models/Form');
const { generatePDFBuffer } = require('../utils/pdfGenerator');

router.post('/', async (req, res) => {
  try {
    const newForm = new Form(req.body);
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/pdf', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const pdfBuffer = await generatePDFBuffer(form);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=form.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/driver/:iqamaNo', async (req, res) => {
  try {
    const iqamaNo = req.params.iqamaNo;
    const form = await Form.findOne({ 'formData.السائق_هوية_رقم': iqamaNo });
    if (!form) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/driver/:iqamaNo', async (req, res) => {
  try {
    const iqamaNo = req.params.iqamaNo;
    const updatedDriverData = req.body;

    // Find the form with the given iqama number
    const form = await Form.findOne({ 'formData.السائق_هوية_رقم': iqamaNo });
    if (!form) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Merge existing formData with the incoming updatedDriverData
    const newFormData = {
      ...form.formData,
      ...updatedDriverData
    };

   
    form.formData = newFormData;
    const updatedForm = await form.save();

    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:statementNo', async (req, res) => {
  try {
    const statementNo = req.params.statementNo;
    const form = await Form.findOne({ 'formData.الكشف_رقم': statementNo });
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/:statementNo', async (req, res) => {
  try {
    const statementNo = req.params.statementNo;
    const updatedData = req.body;

    const updatedForm = await Form.findOneAndUpdate(
      { 'formData.الكشف_رقم': statementNo },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Assuming Express.js backend
router.put('/update-driver/:iqamaNo', async (req, res) => {
  const { iqamaNo } = req.params;
  const updatedDriverDetails = req.body;

  try {
    // Update all forms where the driver with matching iqamaNo exists
    await Form.updateMany(
      { 'formData.السائق_هوية_رقم': iqamaNo },
      { $set: { 
        'formData.السائق_اسم': updatedDriverDetails.السائق_اسم,
        'formData.السائق_جنسية': updatedDriverDetails.السائق_جنسية,
        'formData.السائق_جوال': updatedDriverDetails.السائق_جوال,
        'formData.اللوحة_رقم': updatedDriverDetails.اللوحة_رقم,
        'formData.المركبة_رقم': updatedDriverDetails.المركبة_رقم,
        'formData.شركة_النقل_اسم': updatedDriverDetails.شركة_النقل_اسم
      } }
    );
    res.status(200).send('Forms updated successfully');
  } catch (error) {
    console.error('Error updating forms:', error);
    res.status(500).send('Error updating forms');
  }
});


// Add this route to your FormRoutes.js
router.get('/', async (req, res) => {
  try {
    // Get the total count of forms in the database
    const totalFormsCount = await Form.countDocuments();
    // The next statement number will be the total count plus 1
    const nextStatementNo = totalFormsCount + 1;
    
    res.json({ nextStatementNo });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the statement number count' });
  }
});

// Example Node.js with Express route
router.delete('/:statementNo', async (req, res) => {
  try {
    const statementNo = req.params.statementNo;
    const deletedForm = await Form.findOneAndDelete({ 'formData.الكشف_رقم': statementNo });

    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully', deletedForm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
