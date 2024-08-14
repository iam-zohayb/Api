const QRCode = require('qrcode'); 
const PDFDocument = require('pdfkit');
const fs = require('fs'); 
const path = require('path');
const generatePDFBuffer = async (form) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 0 }); 
        const buffers = [];
    
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
    
        // Add the custom Arabic font
       
    
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const margin = 40; // Margin for the border
        const borderThickness = 2; // Set the border thickness

        // Set the line width for the border
        doc.lineWidth(borderThickness);
    
        // Draw border
        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin).stroke();

        // Generate QR code and add it on the left side of the image
        QRCode.toDataURL(`https://apii-cyan.vercel.app/api/forms/${form._id}/pdf`, async (err, url) => {
            if (err) return reject(err);
    
            const qrWidth = 70;
            const qrHeight = 70;
            const qrX = margin + 450; // Adjust for margin
            const qrY = margin + 10; // Adjust for margin
            const number = 4031295038;

            // Add an image at the top of the PDF
         

            // Construct the path to the image
         
            const imageHeight = 110;

            // Adjust for margins and reduce left/right width by setting a specific value
            const leftRightReduction = 40; // Adjust this value to reduce the left and right margins
            const imageWidth = pageWidth - 2 * margin - leftRightReduction; // New width calculation

            // Set the new X position for the image
            const xxPosition = margin + leftRightReduction / 2; // Center the image by adjusting both sides
            
            doc.image(imagePath, xxPosition, margin + borderThickness, { width: imageWidth, height: imageHeight });

            // Move down to avoid overlap with the image
            doc.moveDown(8);
            const Title1 = ' ايرام عقد عمل ';

         // Center the title
           
            doc.fontSize(16).text(' ايرام عقد عمل ', { align:'center',underline: true });
            doc.moveDown(2);
    const date=form.formData.تاريخ
    const date1='الموافق'
            // Add the provided text
            const providedText = ` ${date}     ${date1}                   ءاربعا للا يوم في انه
            : من كل بين الاتفاق تم لقد
            البري للنقل اليسرا شركه / الاول الطرف
            النقليات المستقبل تلاقي مؤسسة / الثاني الطرف
            ${number}  : رقم السجل                  
            تقديم و المركبات تشغيل و البري للنقل اليسرا شركه ها تقدم الكترونية خدمة بتقديم
            راحة لافضل تقديم و المدن بين الزوار و المعتمرين نقل و التوصيل خدمات
            المستقبل تلاقي مؤسسة الثافي للطرف الزوار و المعتمرين`;
            doc.fontSize(12).text(providedText, { align: 'right', width: pageWidth - 2 * margin });
    
            // Calculate position for the new image
            doc.moveDown(2); // Space after the text
        // Path to the new image
            const imageBelowTextWidth = pageWidth - 2 * (margin + 20); // Keep your current width calculation
            const imageBelowTextHeight = 230; // Adjust the height as needed

            // Set the desired left margin for the image
            const leftMarginReduction = 10; // Adjust this value to reduce the left margin
            const xPosition = margin + leftMarginReduction; // Calculate new X position for the image

            // Add the image below the text
            //doc.image(imagePathBelowText, xPosition, doc.y, { width: imageBelowTextWidth, height: imageBelowTextHeight });

            // Move down to avoid overlap with the image
            doc.moveDown(2);
    
            // Start a new page for the remaining content
            doc.addPage();
            const pageWidth1 = doc.page.width;
            const pageHeight1 = doc.page.height;
    
            // Set the line width for the new page's border
            doc.lineWidth(borderThickness);
            doc.rect(margin, margin, pageWidth1 - 2 * margin, pageHeight1 - 2 * margin).stroke();
    
            
            const imageHeight1 = 100;
            // Adjust for margins and reduce left/right width by setting a specific value
            const leftRightReduction1 = 4; // Adjust this value to reduce the left and right margins
            const imageWidth1 = pageWidth1 - 2 * margin - leftRightReduction1; // New width calculation
            
            // Set the new X position for the image
            const xPosition1 = margin + leftRightReduction1 / 2; // Center the image by adjusting both sides
            
            // Draw the image
            //doc.image(imagePath1, xPosition1, margin + borderThickness, { width: imageWidth1, height: imageHeight1 });
            // Adjust Y position to avoid border
            //doc.image(url, qrX, qrY + borderThickness, { width: qrWidth, height: qrHeight });

            doc.moveDown(6);
    
            // Add form data with headings and styling
            const fields = {
                'الكشف تاريخ ': form.formData.الكشف_تاريخ|| '      ',
                'الكشف رقم ': form.formData.الكشف_رقم|| '      ',
                'العمرة شركة اسم ': form.formData.شركة_العمرة_اسم|| '      ',
                'العمرة شركة رقم ': form.formData.شركة_العمرة_رقم|| '      ',
                'الجنسية ': form.formData.الجنسية|| '      ',
                'المعتمرين عدد ': form.formData.المعتمرين_عدد|| '      ',
                'الرحلة رقم ': form.formData.الرحلة_رقم|| '      ',
                'من ': form.formData.من|| '      ',
                'الرحلة تاريخ ': form.formData.الرحلة_تاريخ|| '      ',
                'الناقل ': form.formData.الناقل|| '      ',
                'المنفذ ': form.formData.المنفذ|| '      ',
                'الرحلة وقت ': form.formData.الرحلة_وقت|| '      ',
                'إلى ': form.formData.إلى|| '      '
            };
            const driverFields = {
                'اسم السائق ': form.formData.السائق_اسم || '        ',
                'جنسية السائق ': form.formData.السائق_جنسية || '        ',
                'جوال السائق ': form.formData.السائق_جوال || '       ',
                'رقم هوية السائق ': form.formData.السائق_هوية_رقم || '       ',
                'رقم اللوحة ': form.formData.اللوحة_رقم || '        ',
                'رقم المركبة ': form.formData.المركبة_رقم || '       ',
                'اسم شركة النقل ': form.formData.شركة_النقل_اسم || '      '
            };
    
            // Combine fields for the table
            const allFields = { ...fields, ...driverFields };
    
            const fieldKeys = Object.keys(fields);
            // Adjust the column width for the "تفاصيل كشف التفويج" table
            const columnWidth = (pageWidth1 - 2 * margin) / 2; // Adjusting for 2 columns
    
            // Add the heading "تفاصيل كشف التفويج" centered
            // Define the table structure without headers
            const table = {
                rows: fieldKeys.map((key) => [key, allFields[key]]), // Each row contains key-value pairs
            };
            
            // Define the number of columns (2 in this case for key-value pairs)
            const numberOfColumns = 2;

            // Draw table rows
            const startX = margin;
            let startY = doc.y;
            doc.moveDown(0.8);
            //doc.fontSize(12).text('التفويج كشف تفاصيل', { align: 'center', width: pageWidth1 - 2 * margin+10 });
            const Title = 'التفويج كشف تفاصيل';

            const TitleWidth = doc.widthOfString(Title);
            const TitleX = (pageWidth1 - TitleWidth) / 2; // Center the title
            
            doc.fontSize(12).text(Title,TitleX, doc.y);
            startY += 40; // Move down after the title

            table.rows.forEach((row) => {
                row.forEach((cell, i) => {
                    // Adjust the position to reverse columns
                    const columnIndex = (i === 0) ? 1 : 0; // Swap the column index
                    doc.text(cell || '', startX + columnIndex * columnWidth, startY, { width: columnWidth, align: 'center' });
                });
                startY += 20; // Adjust for row height

                // Draw row lines
                doc.moveTo(startX, startY - 20)
                    .lineTo(startX + numberOfColumns * columnWidth, startY - 20)
                    .stroke();

                // Draw an additional row line after each row
                doc.moveTo(startX, startY)
                    .lineTo(startX + numberOfColumns * columnWidth, startY)
                    .stroke();
            });

            // Draw column lines for the rows
            for (let i = 1; i < numberOfColumns; i++) {
                doc.moveTo(startX + i * columnWidth, doc.y - (table.rows.length * 20))
                    .lineTo(startX + i * columnWidth, startY)
                    .stroke();
            }

            // Draw right border of the table
            doc.moveTo(startX + numberOfColumns * columnWidth, doc.y - (table.rows.length * 20 + 20))
                .lineTo(startX + numberOfColumns * columnWidth, startY)
                .stroke();

            // Draw bottom border of the table
            doc.moveTo(startX, startY - 20)
                .lineTo(startX + numberOfColumns * columnWidth, startY - 20)
                .stroke();

            // Draw bottom enclosing line
            doc.moveTo(startX, startY - 20)
                .lineTo(startX + numberOfColumns * columnWidth, startY - 20)
                .stroke();

            // Driver Details
            const driverTitle = 'السائق تفاصيل';

            const driverTitleWidth = doc.widthOfString(driverTitle);
            const driverTitleX = (pageWidth1 - driverTitleWidth) / 2; // Center the title
            
            doc.fontSize(12).text(driverTitle, driverTitleX, doc.y);
    
            // Define a smaller column width for the driver table
            const driverColumnWidth = (pageWidth1 - 2 * margin) / 7; // Adjusting for 7 columns
            
            const driverTable = {
                headers: ['النقل شركة اسم ', 'المركبة رقم ', 'اللوحة رقم ', 'السائق هوية رقم ', 'السائق جوال ', 'السائق جنسية ', 'السائق اسم '],
                rows: [
                    [
                        form.formData.شركة_النقل_اسم || '      ', 
                        form.formData.المركبة_رقم || '       ',    
                        form.formData.اللوحة_رقم || '        ',    
                        form.formData.السائق_هوية_رقم || '        ', 
                        form.formData.السائق_جوال || '        ',     
                        form.formData.السائق_جنسية || '        ',    
                        form.formData.السائق_اسم || '         '      
                    ]
                ],
            };
            
            // Draw table headers for driver
            let driverStartY = doc.y;
            
            // Draw top enclosing line for driver table
            doc.moveTo(startX, driverStartY)
                .lineTo(startX + driverTable.headers.length * driverColumnWidth, driverStartY)
                .stroke();
            
            driverTable.headers.forEach((header, i) => {
                doc.text(header, startX + i * driverColumnWidth, driverStartY, { width: driverColumnWidth, align: 'center' });
            });
            
            driverStartY += 20; // Adjust for row height
            driverTable.rows.forEach((row) => {
                row.forEach((cell, i) => {
                    doc.text(cell || '', startX + i * driverColumnWidth, driverStartY, { width: driverColumnWidth, align: 'center' });
                });
                driverStartY += 20; // Adjust for row height
            
                // Draw row lines for driver
                doc.moveTo(startX, driverStartY - 20)
                    .lineTo(startX + driverTable.headers.length * driverColumnWidth, driverStartY - 20)
                    .stroke();
            
                // Draw an additional row line after each driver row
                doc.moveTo(startX, driverStartY)
                    .lineTo(startX + driverTable.headers.length * driverColumnWidth, driverStartY)
                    .stroke();
            });
            
            // Draw column lines for driver
            driverTable.headers.forEach((header, i) => {
                doc.moveTo(startX + i * driverColumnWidth, doc.y - (driverTable.rows.length * 20 + 20))
                    .lineTo(startX + i * driverColumnWidth, driverStartY)
                    .stroke();
            });
            
            // Draw right border of the table for driver
            doc.moveTo(startX + driverTable.headers.length * driverColumnWidth, doc.y - (driverTable.rows.length * 20 + 20))
                .lineTo(startX + driverTable.headers.length * driverColumnWidth, driverStartY - 20)
                .stroke();
            
            // Draw bottom border of the table for driver
            doc.moveTo(startX, driverStartY - 20)
                .lineTo(startX + driverTable.headers.length * driverColumnWidth, driverStartY - 20)
                .stroke();
            
            // Draw bottom enclosing line for driver
            doc.moveTo(startX, driverStartY - 20)
                .lineTo(startX + driverTable.headers.length * driverColumnWidth, driverStartY - 20)
                .stroke();
    
            // Passengers Table
            const passengersColumnWidth = (pageWidth1 - 2 * margin) / 3; // Adjusting for 3 columns
            const passengersTitle = 'المعتمرين تفاصيل';

            const passengersTitleWidth = doc.widthOfString(passengersTitle);
            const passengersTitleX = (pageWidth1 - passengersTitleWidth) / 2; // Center the title

            doc.fontSize(12).text(passengersTitle, passengersTitleX, doc.y); // Use the calculated X position

            // Define the passengers table structure
            const passengersTable = {
                headers: ['المعتمر رقم', 'المعتمر اسم', 'الجنسية'],
                rows: form.passengers.map((passenger) => [
                    passenger.رقم_المعتمر || '       ', // Passenger ID
                    passenger.اسم_المعتمر || '     ',    // Passenger Name
                    passenger.جنسية || '         ',      // Nationality
                ]),
            };
            
            // Draw table headers for passengers
            let passengerStartY = doc.y;

            // Draw top enclosing line for passengers
            doc.moveTo(startX, passengerStartY)
                .lineTo(startX + passengersTable.headers.length * passengersColumnWidth, passengerStartY)
                .stroke();

            passengersTable.headers.forEach((header, i) => {
                doc.text(header, startX + i * passengersColumnWidth, passengerStartY, { width: passengersColumnWidth, align: 'center' });
            });

            // Draw table rows for passengers
            passengerStartY += 20; // Adjust for row height
            passengersTable.rows.forEach((row) => {
                row.forEach((cell, i) => {
                    doc.text(cell || '   ', startX + i * passengersColumnWidth, passengerStartY, { width: passengersColumnWidth, align: 'center' });
                });
                passengerStartY += 20; // Adjust for row height

                // Draw row lines for passengers
                doc.moveTo(startX, passengerStartY - 20)
                    .lineTo(startX + passengersTable.headers.length * passengersColumnWidth, passengerStartY - 20)
                    .stroke();

                // Draw an additional row line after each passenger row
                doc.moveTo(startX, passengerStartY)
                    .lineTo(startX + passengersTable.headers.length * passengersColumnWidth, passengerStartY)
                    .stroke();
            });

            // Draw column lines for passengers
            passengersTable.headers.forEach((header, i) => {
                doc.moveTo(startX + i * passengersColumnWidth, doc.y - (passengersTable.rows.length * 20 + 20))
                    .lineTo(startX + i * passengersColumnWidth, passengerStartY)
                    .stroke();
            });

            // Draw right border of the table for passengers
            doc.moveTo(startX + passengersTable.headers.length * passengersColumnWidth, doc.y - (passengersTable.rows.length * 20 + 20))
                .lineTo(startX + passengersTable.headers.length * passengersColumnWidth, passengerStartY - 20)
                .stroke();

            // Draw bottom border of the table for passengers
            doc.moveTo(startX, passengerStartY - 20)
                .lineTo(startX + passengersTable.headers.length * passengersColumnWidth, passengerStartY - 20)
                .stroke();

            // Draw bottom enclosing line for passengers
            doc.moveTo(startX, passengerStartY - 20)
                .lineTo(startX + passengersTable.headers.length * passengersColumnWidth, passengerStartY - 20)
                .stroke();
    
            doc.end();
        });
    });
};

module.exports = { generatePDFBuffer };
