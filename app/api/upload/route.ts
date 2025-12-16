import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// POST - Upload file
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); // Fixed space: request. formData -> request.formData
        const file = formData.get('file') as File | null;
        const folder = formData.get('folder') as string || 'uploads';
        const studentId = formData.get('studentId') as string;
        const submissionId = formData.get('submissionId') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 }); // Fixed space: status:  400
        }

        // Allowed file types
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/zip',
            'application/x-rar-compressed',
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'File type not allowed. Allowed: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, Images, ZIP, RAR'
            }, { status: 400 });
        }

        // Create upload directory structure
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder); // Fixed space: path. join -> path.join

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const ext = path.extname(file.name); // Fixed space: file. name -> file.name
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(ext, '');
        const fileName = `${studentId || 'file'}_${submissionId || 'sub'}_${timestamp}_${randomStr}${ext}`;

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // Generate URL
        const fileUrl = `/uploads/${folder}/${fileName}`;

        return NextResponse.json({
            success: true,
            file: {
                name: file.name,
                originalName: file.name,
                fileName: fileName,
                type: file.type,
                size: file.size,
                url: fileUrl,
            }
        });
    } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 }); // Fixed space: status:  500
    }
}