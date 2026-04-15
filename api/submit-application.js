const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Create email content
    const emailBody = `
      <h2>New Educational Support Application</h2>
      
      <h3>Personal Information</h3>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      
      <h3>Parents Information</h3>
      <p><strong>Mother's Name:</strong> ${data.motherName}</p>
      <p><strong>Father's Name:</strong> ${data.fatherName}</p>
      <p><strong>Parents' Address:</strong> ${data.parentsAddress}</p>
      <p><strong>Mother's Occupation:</strong> ${data.motherOccupation}</p>
      <p><strong>Father's Occupation:</strong> ${data.fatherOccupation}</p>
      <p><strong>Parents' Phone:</strong> ${data.parentsPhone}</p>
      
      <h3>Academic Information</h3>
      <p><strong>Education Level:</strong> ${data.educationLevel}</p>
      ${data.schoolName ? `<p><strong>School Name:</strong> ${data.schoolName}</p>` : ''}
      ${data.schoolAddress ? `<p><strong>School Address:</strong> ${data.schoolAddress}</p>` : ''}
      ${data.university ? `<p><strong>University:</strong> ${data.university}</p>` : ''}
      ${data.matricNumber ? `<p><strong>Matric Number:</strong> ${data.matricNumber}</p>` : ''}
      ${data.department ? `<p><strong>Department:</strong> ${data.department}</p>` : ''}
      ${data.referee1Name ? `<p><strong>Referee 1:</strong> ${data.referee1Name} (${data.referee1Email})</p>` : ''}
      ${data.referee2Name ? `<p><strong>Referee 2:</strong> ${data.referee2Name} (${data.referee2Email})</p>` : ''}
      
      <h3>Personal Story</h3>
      <p>${data.personalStory}</p>
      
      <p><em>Note: Attached files are included in this email.</em></p>
    `;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'support@swapprocessing.io',
        pass: 'pan03>c9N'
      }
    });

    // Prepare attachments from base64 files
    const attachments = [];
    if (data.files && Array.isArray(data.files)) {
      data.files.forEach(file => {
        if (file.content && file.filename) {
          attachments.push({
            filename: file.filename,
            content: file.content.split(',')[1], // Remove data:image/png;base64, prefix
            encoding: 'base64'
          });
        }
      });
    }

    // Email options
    const mailOptions = {
      from: '"Makinde Twins Foundation" <support@swapprocessing.io>',
      to: 'shamuelmoses@gmail.com',
      subject: `New Application: ${data.fullName} - ${data.educationLevel}`,
      html: emailBody,
      text: emailBody.replace(/<[^>]*>/g, ''),
      attachments: attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to submit application',
      message: error.message 
    });
  }
};
