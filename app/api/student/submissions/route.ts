import { NextRequest, NextResponse } from 'next/server';
import { getDb } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// POST - Create a new student submission
export async function POST(request: NextRequest) {
    try {
        const pool = await getDb();
        const body = await request.json();
        const { submissionId, studentId, files } = body;

        if (!submissionId || !studentId) {
            return NextResponse.json({ error: 'Submission ID and Student ID are required' }, { status: 400 }); // Fixed space: status: 400
        }

        // Get submission details
        const [submissions] = await pool.execute<RowDataPacket[]>(`
      SELECT 
        ss.id,
        ss.subject_id,
        ss.max_attempts,
        ss.due_date,
        ss.due_time
      FROM subject_submissions ss
      WHERE ss.id = ?
    `, [submissionId]); // Fixed space: ss. id -> ss.id

        if (submissions.length === 0) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
        }

        const submission = submissions[0];

        // Check if student is enrolled in the subject
        const [enrollment] = await pool.execute<RowDataPacket[]>(
            'SELECT id FROM subject_students WHERE subject_id = ? AND student_id = ?',
            [submission.subject_id, studentId]
        );

        if (enrollment.length === 0) {
            return NextResponse.json({ error: 'You are not enrolled in this subject' }, { status: 403 });
        }

        // Check attempt count
        const [attempts] = await pool.execute<RowDataPacket[]>(
            'SELECT COUNT(*) as count FROM student_submissions WHERE submission_id = ? AND student_id = ?',
            [submissionId, studentId]
        );

        const attemptCount = parseInt(String(attempts[0]?.count || 0), 10);

        if (attemptCount >= submission.max_attempts) {
            return NextResponse.json({
                error: `Maximum attempts (${submission.max_attempts}) reached`
            }, { status: 400 });
        }

        // Create student submission
        const [result] = await pool.execute<ResultSetHeader>(`
      INSERT INTO student_submissions (submission_id, student_id, attempt_number, submitted_at)
      VALUES (?, ?, ?, NOW())
    `, [submissionId, studentId, attemptCount + 1]);

        const studentSubmissionId = result.insertId;

        // Insert files if any
        if (files && files.length > 0) {
            for (const file of files) {
                await pool.execute(
                    `INSERT INTO student_submission_files 
            (student_submission_id, file_name, file_type, file_url) 
           VALUES (?, ?, ?, ?)`,
                    [studentSubmissionId, file.name, file.type, file.url] // Fixed space: file. type -> file.type
                );
            }
        }

        return NextResponse.json({
            success: true,
            submission: {
                id: studentSubmissionId,
                submissionId,
                studentId,
                attemptNumber: attemptCount + 1,
                files: files || [],
            }
        });
    } catch (error) {
        console.error('Create student submission error:', error);
        return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
    }
}

// GET - Get student's submission for a specific task
export async function GET(request: NextRequest) {
    try {
        const pool = await getDb();
        const { searchParams } = new URL(request.url);
        const submissionId = searchParams.get('submissionId');
        const studentId = searchParams.get('studentId');

        if (!submissionId || !studentId) {
            return NextResponse.json({ error: 'Submission ID and Student ID are required' }, { status: 400 });
        }

        // Get student's submissions for this task
        const [submissions] = await pool.execute<RowDataPacket[]>(`
      SELECT 
        ss.id,
        ss.submission_id,
        ss.attempt_number,
        ss.submitted_at,
        ss.grade,
        ss.feedback,
        ss.graded_at
      FROM student_submissions ss
      WHERE ss.submission_id = ? AND ss.student_id = ?
      ORDER BY ss.submitted_at DESC
    `, [submissionId, studentId]);

        // Get files for each submission
        const submissionsWithFiles = await Promise.all(
            submissions.map(async (sub) => {
                const [files] = await pool.execute<RowDataPacket[]>(`
          SELECT id, file_name, file_type, file_url
          FROM student_submission_files
          WHERE student_submission_id = ?
        `, [sub.id]);

                return {
                    id: sub.id,
                    submissionId: sub.submission_id,
                    attemptNumber: sub.attempt_number,
                    submittedAt: sub.submitted_at, // Fixed double space
                    grade: sub.grade,
                    feedback: sub.feedback,
                    gradedAt: sub.graded_at,
                    files: files.map(f => ({ // Fixed space: files. map -> files.map
                        id: f.id,
                        name: f.file_name,
                        type: f.file_type,
                        url: f.file_url,
                    })),
                };
            })
        );

        return NextResponse.json({
            success: true,
            submissions: submissionsWithFiles,
        });
    } catch (error) {
        console.error('Get student submissions error:', error);
        return NextResponse.json({ error: 'Failed to get submissions' }, { status: 500 });
    }
}