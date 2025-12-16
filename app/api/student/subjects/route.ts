import { NextRequest, NextResponse } from 'next/server';
import { getDb } from "@/lib/db";
import { RowDataPacket } from 'mysql2';

// GET - Fetch subjects enrolled by a student
export async function GET(request: NextRequest) {
    try {
        const pool = await getDb();
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const semester = searchParams.get('semester');
        const year = searchParams.get('year'); // Fixed space: searchParams. get -> searchParams.get

        if (!studentId) {
            return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
        }

        // Build query with optional filters
        let query = `
      SELECT 
        sub.id,
        sub.name,
        sub.code,
        sec.id as section_id,
        sec.name as section_name,
        gl.id as grade_level_id,
        gl.name as grade_level_name,
        sem.id as semester_id,
        sem.name as semester_name,
        sy.id as school_year_id,
        sy.year as school_year,
        ss.enrolled_at,
        (
          SELECT GROUP_CONCAT(
            CONCAT(
              COALESCE(p.first_name, ''), ' ',
              COALESCE(p.last_name, u.username)
            )
            SEPARATOR ', '
          )
          FROM subject_instructors si
          JOIN users u ON si.instructor_id = u.id
          LEFT JOIN profiles p ON u.id = p.user_id
          WHERE si.subject_id = sub.id
        ) as instructors,
        (
          SELECT COUNT(*) FROM subject_submissions 
          WHERE subject_id = sub.id AND is_visible = 1
        ) as total_submissions,
        (
          SELECT COUNT(*) FROM student_submissions stu_sub
          JOIN subject_submissions sub_sub ON stu_sub.submission_id = sub_sub.id
          WHERE sub_sub.subject_id = sub.id AND stu_sub.student_id = ss.student_id
        ) as completed_submissions
      FROM subject_students ss
      JOIN subjects sub ON ss.subject_id = sub.id
      JOIN sections sec ON sub.section_id = sec.id
      JOIN grade_levels gl ON sec.grade_level_id = gl.id
      JOIN semesters sem ON gl.semester_id = sem.id
      JOIN school_years sy ON sem.school_year_id = sy.id
      WHERE ss.student_id = ?
    `;

        const params: any[] = [studentId]; // Fixed double space

        if (semester && semester !== 'all') {
            query += ` AND sem.name = ?`;
            params.push(semester);
        }

        if (year && year !== 'all') {
            query += ` AND sy.year = ?`;
            params.push(year);
        }

        query += ` ORDER BY sy.year DESC, sem.name, sub.name`;

        const [subjects] = await pool.execute<RowDataPacket[]>(query, params);

        // Get unique semesters and years for filters
        const [filterData] = await pool.execute<RowDataPacket[]>(`
      SELECT DISTINCT sem.name as semester_name, sy.year as school_year
      FROM subject_students ss
      JOIN subjects sub ON ss.subject_id = sub.id
      JOIN sections sec ON sub.section_id = sec.id
      JOIN grade_levels gl ON sec.grade_level_id = gl.id
      JOIN semesters sem ON gl.semester_id = sem.id
      JOIN school_years sy ON sem.school_year_id = sy.id
      WHERE ss.student_id = ?
      ORDER BY sy.year DESC, sem.name
    `, [studentId]); // Fixed spaces in SQL: sec. id -> sec.id and sy. year -> sy.year

        const semesters = [...new Set(filterData.map((f) => f.semester_name))]; // Fixed space: ... new -> ...new
        const years = [...new Set(filterData.map((f) => f.school_year))];

        // Color palette for subjects
        const colors = [
            "from-blue-500 to-blue-600",
            "from-purple-500 to-purple-600",
            "from-green-500 to-green-600",
            "from-orange-500 to-orange-600",
            "from-red-500 to-red-600",
            "from-cyan-500 to-cyan-600",
            "from-pink-500 to-pink-600",
            "from-indigo-500 to-indigo-600",
        ];

        const mappedSubjects = subjects.map((subject, index) => {
            const totalSubmissions = parseInt(String(subject.total_submissions || 0), 10);
            const completedSubmissions = parseInt(String(subject.completed_submissions || 0), 10);
            const progress = totalSubmissions > 0
                ? Math.round((completedSubmissions / totalSubmissions) * 100)
                : 0;

            return {
                id: subject.id,
                name: subject.name,
                code: subject.code || `SUB-${subject.id}`,
                sectionId: subject.section_id,
                sectionName: subject.section_name,
                gradeLevelId: subject.grade_level_id,
                gradeLevelName: subject.grade_level_name,
                semesterId: subject.semester_id,
                semesterName: subject.semester_name, // Fixed space: subject. semester_name -> subject.semester_name
                schoolYearId: subject.school_year_id,
                schoolYear: subject.school_year, // Fixed double space
                instructors: subject.instructors || 'No instructor assigned',
                enrolledAt: subject.enrolled_at,
                totalSubmissions,
                completedSubmissions,
                progress,
                color: colors[index % colors.length],
            };
        });

        return NextResponse.json({
            success: true,
            subjects: mappedSubjects,
            filters: {
                semesters,
                years,
            },
        });
    } catch (error) {
        console.error('Fetch student subjects error:', error);
        return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
    }
}