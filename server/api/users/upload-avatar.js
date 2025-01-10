import formidable from 'formidable';
import Database from 'better-sqlite3';
import path from 'path';

export default defineEventHandler(async (event) => {
  const form = formidable({ multiples: false, uploadDir: './public/images/avatars', keepExtensions: true });
  const db = new Database('database.db', { verbose: console.log });


  return new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err);
        reject({ success: false, message: 'File upload failed' });
        return;
      }

      // Access the file using the correct key
      const file = files.avatar; // No array or additional keys
      if (!file || file.length === 0 || !file[0].filepath) {
        console.error('Filepath is undefined:', file);
        reject({ success: false, message: 'Invalid file upload' });
        return;
      }

      const fileName = path.basename(file[0].filepath);
      const filePath = `/images/avatars/${fileName}`;

      // Update user's avatar path in the database
      const userId = fields.userId;
      try {
        db.prepare(`
          UPDATE users
          SET avatar = ?
          WHERE id = ?
        `).run(filePath, userId);

        resolve({ success: true, filePath });
      } catch (dbErr) {
        console.error('Database error:', dbErr);
        reject({ success: false, message: 'Database update failed' });
      }
    });
  });
});


