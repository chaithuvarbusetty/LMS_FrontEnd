import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'

// Instructor Pages
import CreateCourse from '../pages/instructor/CreateCourse'
import MyCourses from '../pages/instructor/MyCourses'
import InstructorAssignments from '../pages/instructor/Assignments'
import Submissions from '../pages/instructor/Submissions'

// Student Pages
import StudentEnrollments from '../pages/student/MyEnrollments'
import StudentAssignments from '../pages/student/Assignments'
import AssignSubmit from '../pages/student/SubmitAssignment'

// Admin Pages
import AdminUsers from '../pages/admin/Users'
import AdminFiles from '../pages/admin/Files'

// File Upload
import UploadFile from '../pages/FileUpload'

// Protected Routes
import { Protected, RoleProtected } from './ProtectedRoute'

export default function AppRouter(){
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Common protected pages */}
            <Route path="/" element={<Protected><Dashboard /></Protected>} />
            <Route path="/courses" element={<Protected><Courses /></Protected>} />
            <Route path="/courses/:id" element={<Protected><CourseDetails /></Protected>} />

            {/* Instructor-only */}
            <Route
                path="/instructor/create-course"
                element={
                    <RoleProtected roles={["ROLE_INSTRUCTOR", "ROLE_ADMIN"]}>
                        <CreateCourse />
                    </RoleProtected>
                }
            />
            <Route
                path="/instructor/courses"
                element={
                    <RoleProtected roles={["ROLE_INSTRUCTOR", "ROLE_ADMIN"]}>
                        <MyCourses />
                    </RoleProtected>
                }
            />
            <Route
                path="/instructor/assignments"
                element={
                    <RoleProtected roles={["ROLE_INSTRUCTOR", "ROLE_ADMIN"]}>
                        <InstructorAssignments />
                    </RoleProtected>
                }
            />
            <Route
                path="/instructor/assignments/:id/submissions"
                element={
                    <RoleProtected roles={["ROLE_INSTRUCTOR", "ROLE_ADMIN"]}>
                        <Submissions />
                    </RoleProtected>
                }
            />

            {/* Student-only */}
            <Route
                path="/student/my-courses"
                element={
                    <RoleProtected roles={["ROLE_STUDENT"]}>
                        <StudentEnrollments />
                    </RoleProtected>
                }
            />
            <Route
                path="/student/assignments"
                element={
                    <RoleProtected roles={["ROLE_STUDENT"]}>
                        <StudentAssignments />
                    </RoleProtected>
                }
            />
            <Route
                path="/student/assignments/:id/submit"
                element={
                    <RoleProtected roles={["ROLE_STUDENT"]}>
                        <AssignSubmit />
                    </RoleProtected>
                }
            />

            {/* File Upload (any logged in user) */}
            <Route path="/files/upload" element={<Protected><UploadFile /></Protected>} />

            {/* Admin-only */}
            <Route
                path="/admin/users"
                element={
                    <RoleProtected roles={["ROLE_ADMIN"]}>
                        <AdminUsers />
                    </RoleProtected>
                }
            />
            <Route
                path="/admin/files"
                element={
                    <RoleProtected roles={["ROLE_ADMIN"]}>
                        <AdminFiles />
                    </RoleProtected>
                }
            />

            {/* 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}